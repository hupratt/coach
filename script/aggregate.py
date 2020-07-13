from datetime import datetime
from django.db.models import Count
from django.db.models.functions import Trunc, TruncDay
from django.db.models.functions.datetime import Extract, ExtractWeek
from boards.models import Event, Task, Column, Board
from django.db.models import Q, Count
from datetime import datetime, timedelta, time
import pytz
from django.contrib.auth import get_user_model

tz = pytz.timezone("Europe/Luxembourg")
today = tz.localize(datetime.now())
another_date = tz.localize(datetime(2020, 5, 21))
another_date2 = tz.localize(datetime(2020, 8, 1))

User = get_user_model()
user, _ = User.objects.get_or_create(owner_id=1)
u, _ = User.objects.get_or_create(id=1)

board, _ = Board.objects.get_or_create(owner_id=u.id)
column1, _ = Column.objects.get_or_create(title="To do", board=board)
column2, _ = Column.objects.get_or_create(title="Done", board=board)
task1, _ = Task.objects.get_or_create(title="Do push-ups", column=column1, week=27)
task2, _ = Task.objects.get_or_create(title="Wake up @8:00", column=column1, week=27)

e = Event.objects.create(task=task1, status="DONE")
e.created = another_date
e.save()
e = Event.objects.create(task=task1, status="DONE")
e.created = another_date
e.save()
e = Event.objects.create(task=task1, status="DONE")
e.created = another_date
e.save()
e = Event.objects.create(task=task1, status="DONE")
e.created = another_date
e.save()

e = Event.objects.create(task=task2, status="DONE")
e.created = another_date2
e.save()
e = Event.objects.create(task=task2, status="DONE")
e.created = another_date2
e.save()
e = Event.objects.create(task=task2, status="DONE")
e.created = another_date2
e.save()

e = Event.objects.create(task=task2, status="DONE")
e.created = today
e.save()


Event.objects.annotate(week=ExtractWeek("created")).values(
    "week", "task", "task__period"
).annotate(clocked=Count("created"))


# <QuerySet [
# {'task': 1, 'task__period': '5', 'week': 21, 'clocked': 4},
# {'task': 2, 'task__period': '5', 'week': 18, 'clocked': 3},
# {'task': 2, 'task__period': '5', 'week': 27, 'clocked': 1}
# ]>
