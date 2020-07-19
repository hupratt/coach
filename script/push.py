from webpush.models import Group, PushInformation, SubscriptionInfo
from webpush import send_user_notification
from webpush import send_group_notification
from django.contrib.auth import get_user_model

User = get_user_model()
admin = User.objects.first()
g = Group.objects.create(name="gg")

payload = {
    "head": "Welcome!",
    "body": "Hello World",
    "icon": "https://i.imgur.com/dRDxiCQ.png",
    "url": "https://www.example.com",
}

send_group_notification(group_name="gg", payload=payload, ttl=1000)
