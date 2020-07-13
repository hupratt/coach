from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework import serializers
from rest_framework.validators import ValidationError
from datetime import datetime, timedelta
import pytz

from accounts.serializers import BoardMemberSerializer
from .models import Board, Task, Column, Label, Event

from django.http import JsonResponse

from django.db.models.functions.datetime import Extract, ExtractWeek, ExtractYear
from django.db.models import Q, Count

User = get_user_model()


class BoardModelSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        if self.context["request"].user not in validated_data["board"].members.all():
            raise serializers.ValidationError("Must be a member of the board!")
        return super().create(validated_data)


class BoardSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Board
        fields = ["id", "name", "owner"]


class EventSerializer(serializers.ModelSerializer):
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all())

    class Meta:
        model = Event
        fields = ("id", "created", "status", "task", "done")


class TaskSerializer(serializers.ModelSerializer):
    column = serializers.PrimaryKeyRelatedField(queryset=Column.objects.all())
    events_in_week = serializers.SerializerMethodField()
    title = serializers.CharField(required=False)
    labels = serializers.PrimaryKeyRelatedField(
        queryset=Label.objects.all(), many=True, required=False
    )
    assignees = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), many=True, required=False
    )

    def get_events_in_week(self, obj):
        qs = (
            Event.objects.filter(task__id=obj.id)
            .annotate(week=ExtractWeek("done"))
            .values("week")
        )
        week_list = [week["week"] for week in qs]
        return set(week_list)

    def extra_validation(self, board=None, labels=None, assignees=None, user=None):
        if labels and board:
            for label in labels:
                if label.board != board:
                    raise serializers.ValidationError(
                        "Can't set a label that doesn't belong to the board!"
                    )
        if assignees and board:
            for assignee in assignees:
                if assignee not in board.members.all():
                    raise serializers.ValidationError(
                        "Can't assign someone who isn't a board member!"
                    )
        if user and user not in board.members.all():
            raise serializers.ValidationError("Must be a member of the board!")

    def update(self, instance, validated_data):
        labels = validated_data.get("labels")
        assignees = validated_data.get("assignees")
        board = instance.column.board
        # create an event for the task for today
        _week_string = f"2020-W{validated_data['week']}"
        _date_time = datetime.strptime(_week_string + "-1", "%Y-W%W-%w") - timedelta(
            days=7
        )
        tz = pytz.timezone("Europe/Luxembourg")
        today = tz.localize(_date_time)
        if validated_data["column"].title == "To do":
            e = Event.objects.filter(
                task=instance,
                status="DONE",
                done__year=today.year,
                done__month=today.month,
                done__day=today.day,
            ).first()
            if isinstance(e, Event) is True:
                e.status = "TODO"
                e.save()
        elif validated_data["column"].title == "Done":
            e = Event.objects.filter(
                task=instance,
                status="DONE",
                done__year=today.year,
                done__month=today.month,
                done__day=today.day,
            ).first()
            if isinstance(e, Event) is False:
                Event.objects.create(
                    task=instance,
                    status="DONE",
                    done=today,
                    creator=User.objects.get(id=board.owner_id),
                )

        self.extra_validation(board=board, labels=labels, assignees=assignees)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        user = self.context["request"].user
        board = validated_data["column"].board
        labels = validated_data["labels"]
        assignees = validated_data["assignees"]
        self.extra_validation(
            board=board, labels=labels, assignees=assignees, user=user
        )
        return super().create(validated_data)

    class Meta:
        model = Task
        fields = [
            "id",
            "created",
            "modified",
            "title",
            "description",
            "priority",
            "labels",
            "assignees",
            "task_order",
            "column",
            "period",
            "events_in_week",
            "week",
        ]


class ColumnSerializer(BoardModelSerializer):
    board = serializers.PrimaryKeyRelatedField(queryset=Board.objects.all())
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Column
        fields = ["id", "title", "tasks", "column_order", "board"]


class LabelSerializer(BoardModelSerializer):
    board = serializers.PrimaryKeyRelatedField(queryset=Board.objects.all())

    def update(self, instance, validated_data):
        try:
            return super().update(instance, validated_data)
        except IntegrityError:
            raise ValidationError("Label already exists")

    class Meta:
        model = Label
        fields = ["id", "name", "color", "board"]


class BoardDetailSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    columns = ColumnSerializer(many=True, read_only=True)
    members = BoardMemberSerializer(many=True, read_only=True)
    labels = LabelSerializer(many=True, read_only=True)

    class Meta:
        model = Board
        fields = ["id", "name", "owner", "members", "columns", "labels"]


class MemberSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
