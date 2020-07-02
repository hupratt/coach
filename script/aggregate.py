from datetime import datetime
from django.db.models import Count
from django.db.models.functions import Trunc, TruncDay
from django.db.models.functions.datetime import Extract, ExtractWeek
from boards.models import Event, Task, Column
from django.db.models import Q, Count


column, _ = Column.objects.get_or_create(title="In Progress")
task1, _ = Task.objects.get_or_create(title="A title", column=column)
event1, _ = Event.objects.get_or_create(task=task1, status="TODO")
event2, _ = Event.objects.get_or_create(task=task1, status="TODO")


print(Event.objects.annotate(week=ExtractWeek("created")).values("week", "task"))

# date
# %tasks done for the day
