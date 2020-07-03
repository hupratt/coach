from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework import serializers
from rest_framework.validators import ValidationError

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


class TaskSerializer(serializers.ModelSerializer):
    column = serializers.PrimaryKeyRelatedField(queryset=Column.objects.all())
    labels = serializers.PrimaryKeyRelatedField(
        queryset=Label.objects.all(), many=True, required=False
    )
    assignees = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), many=True, required=False
    )

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


# def EventSerializer(*args, **kwargs):
#     qs = Event.objects.annotate(week=ExtractWeek("created")).values("week", "task", "task__period").annotate(clocked=Count("created"))
#     return qs.values()

class EventSerializer(serializers.Serializer):
    pass
    # data = serializers.SerializerMethodField()
    # tasks = TaskSerializer(many=True, read_only=True)

    # class Meta:
    #     fields = ["data", "tasks"]

    # def get_data(self, obj):
    #     qs = Event.objects.annotate(week=ExtractWeek("created")).annotate(year=ExtractYear("created")).values("year", "week", "task", "task__period").annotate(clocked=Count("created"))
    #     return qs.values()

# {
#         date_start: getDateOfWeek(24,2020),
#         date_end: getDateOfWeek(24,2020),
#         title: "Spot event",
#         color: "#D7421B",
#       },

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
