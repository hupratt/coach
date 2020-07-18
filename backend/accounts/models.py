import os

from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UnicodeUsernameValidator
from django.core.validators import MinLengthValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from allauth.account.signals import user_signed_up
from django.dispatch import receiver
from django.core.files import File
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from urllib.parse import urlparse
import requests


class Avatar(models.Model):
    photo = models.ImageField(upload_to="avatars")
    name = models.CharField(max_length=150)

    def __str__(self):
        return os.path.basename(self.photo.name)


class User(AbstractUser):
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[UnicodeUsernameValidator(), MinLengthValidator(3)],
        error_messages={"unique": _("A user with that username already exists."),},
    )
    avatar = models.ForeignKey(
        "Avatar", null=True, blank=True, on_delete=models.CASCADE
    )
    is_guest = models.BooleanField(default=False)

    class Meta:
        ordering = ["-id"]


@receiver(user_signed_up)
def populate_db(request, user, sociallogin=None, **kwargs):
    """
    When a social account is created successfully and this signal is received,
    django-allauth passes in the sociallogin param, giving access to metadata on the remote account, e.g.:
 
    sociallogin.account.provider  # e.g. 'twitter' 
    sociallogin.account.get_avatar_url()
    sociallogin.account.get_profile_url()
    sociallogin.account.extra_data['screen_name']
 
    See the socialaccount_socialaccount table for more in the 'extra_data' field.
    """
    if sociallogin.account.provider == "google":
        picture_path = sociallogin.account.get_avatar_url()
        if picture_path is not None and picture_path is not "None":
            response = requests.get(picture_path)
            name = urlparse(picture_path).path.split("/")[-1]
            if response.status_code == 200:
                new_avatar = Avatar()
                new_avatar.photo.save(name=name, content=ContentFile(response.content))
                user.avatar = new_avatar
                user.save()
    if sociallogin.account.provider == "github":
        new = ""
        name = sociallogin.account.extra_data["name"]
        if " " in name:
            first_name, last_name = name.split(" ", 1)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
        else:
            user.name = first_name
            user.save()
        if sociallogin.account.extra_data["email"] is not None:
            user.email = sociallogin.account.extra_data["email"]
            user.save()
        if sociallogin.account.extra_data["login"] is not None:
            user.username = f'gh-{sociallogin.account.extra_data["login"]}'
            user.save()

        picture_path = sociallogin.account.get_avatar_url()
        if picture_path is not None and picture_path is not "None":
            response = requests.get(picture_path)
            name = urlparse(picture_path).path.split("/")[-1]
            if response.status_code == 200:
                new_avatar = Avatar()
                new_avatar.photo.save(name=name, content=ContentFile(response.content))
                user.avatar = new_avatar
                user.save()
