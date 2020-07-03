from datetime import datetime
from django.db.models import Count
from django.db.models.functions import Trunc, TruncDay
from django.db.models.functions.datetime import Extract, ExtractWeek
from boards.models import Event, Task, Column, Board
from django.db.models import Q, Count
from datetime import datetime, timedelta, time
import pytz

tz = pytz.timezone("Europe/Luxembourg")
today = tz.localize(datetime.now())
another_date = tz.localize(datetime(2020, 5, 21))
another_date2 = tz.localize(datetime(2020, 5, 1))

board, _ = Board.objects.get_or_create(owner_id=1)
column1, _ = Column.objects.get_or_create(title="In Progress", board=board)
column2, _ = Column.objects.get_or_create(title="To do", board=board)
task1, _ = Task.objects.get_or_create(title="A title", column=column1)
task2, _ = Task.objects.get_or_create(title="A second title", column=column1)

event1, _ = Event.objects.get_or_create(task=task1, status="TODO")
event1.created = today
event1.save()

event2, _ = Event.objects.get_or_create(task=task1, status="TODO")
event2.created = another_date
event2.save()

event3, _ = Event.objects.get_or_create(task=task2, status="DONE")
event3.created = another_date2
event3.save()


Event.objects.annotate(week=ExtractWeek("created")).values(
    "week", "task", "task__period"
).annotate(clocked=Count("created"))

# <QuerySet [
# {'task': 3, 'week': 25, 'clocked': 1, 'task__period': '5'},
# {'task': 3, 'week': 27, 'clocked': 1, 'task__period': '5'},
# {'task': 4, 'week': 27, 'clocked': 1, 'task__period': '5'}
# ]>
