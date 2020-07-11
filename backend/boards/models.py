from adminsortable.fields import SortableForeignKey
from adminsortable.models import SortableMixin
from django.contrib.auth import get_user_model
from django.db import models
from model_utils.models import TimeStampedModel

User = get_user_model()


class Board(models.Model):
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="owned_boards"
    )
    members = models.ManyToManyField(User, related_name="boards")

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.name

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        is_new = self.pk is None
        super().save(force_insert, force_update, using, update_fields)
        if is_new:
            self.members.add(self.owner)


class Column(SortableMixin):
    title = models.CharField(max_length=255)
    board = models.ForeignKey("Board", related_name="columns", on_delete=models.CASCADE)
    column_order = models.PositiveIntegerField(default=0, editable=False, db_index=True)

    class Meta:
        ordering = ["column_order"]

    def __str__(self):
        return f"{self.title}"


class Label(models.Model):
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=7)
    board = models.ForeignKey("Board", related_name="labels", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["name", "board"], name="unique_name_board")
        ]


class Priority(models.TextChoices):
    HIGH = "H", "High"
    MEDIUM = "M", "Medium"
    LOW = "L", "Low"


class Period(models.IntegerChoices):
    WORKDAY = 5
    EVERYDAY = 7
    HOLIDAY = 1


class Status(models.TextChoices):
    DONE = "DONE", "Done"
    TODO = "TODO", "To-do"


class Task(SortableMixin, TimeStampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    priority = models.CharField(
        max_length=1, choices=Priority.choices, default=Priority.MEDIUM
    )
    labels = models.ManyToManyField(Label, related_name="tasks")
    assignees = models.ManyToManyField(User, related_name="tasks")
    column = SortableForeignKey(Column, related_name="tasks", on_delete=models.CASCADE)
    task_order = models.PositiveIntegerField(default=0, editable=False, db_index=True)
    period = models.CharField(
        max_length=2, choices=Period.choices, default=Period.WORKDAY
    )
    week = models.PositiveIntegerField(choices=[(x, str(x)) for x in range(1, 53)])
    color = models.CharField(max_length=7, default="#D7421B")
    created = models.DateTimeField(
        auto_now_add=True, help_text="(automatic) created date"
    )
    updated = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return f"{self.id} - {self.title}"

    class Meta:
        ordering = ["task_order"]


class Event(TimeStampedModel):
    status = models.CharField(max_length=4, choices=Status.choices, default=Status.TODO)
    task = SortableForeignKey(
        Task, related_name="event_tasks", on_delete=models.CASCADE, blank=True
    )
    created = models.DateTimeField(
        auto_now_add=True, help_text="(automatic) created date"
    )
