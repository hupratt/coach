from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()
for user in User.objects.all():
    Token.objects.get_or_create(user=user)

