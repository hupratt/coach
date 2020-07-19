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
from django.conf import settings
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from PIL import Image as Img
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile


class Avatar(models.Model):
    photo = models.ImageField(upload_to="avatars")
    name = models.CharField(max_length=150)
    thumbnail = models.ImageField(upload_to="avatar_thumbs", editable=False)

    def __str__(self):
        return os.path.basename(self.photo.name)

    def save(self, *args, **kwargs):

        if not self.make_thumbnail():
            # set to a default thumbnail
            raise Exception("Could not create thumbnail - is the file type valid?")

        super().save(*args, **kwargs)

    def make_thumbnail(self):

        image = Img.open(self.photo)
        image.thumbnail(settings.THUMB_SIZE, Img.ANTIALIAS)

        thumb_name, thumb_extension = os.path.splitext(self.photo.name)
        thumb_extension = thumb_extension.lower()

        thumb_filename = self.photo.name + "_thumb." + image.format

        if image.format is None:
            return False  # Unrecognized file type

        # Save thumbnail to in-memory file as StringIO
        temp_thumb = BytesIO()
        image.save(temp_thumb, image.format)
        temp_thumb.seek(0)

        # set save=False, otherwise it will run in an infinite loop
        self.thumbnail.save(thumb_filename, ContentFile(temp_thumb.read()), save=False)
        temp_thumb.close()

        return True


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


def formatPictureName(picture_path):
    return urlparse(picture_path).path.split("/")[-1]


def createAvatar(sociallogin, user):
    picture_path = sociallogin.account.get_avatar_url()
    if picture_path is not None and picture_path is not "None":
        response = requests.get(picture_path)
        if response.status_code == 200:
            new_avatar = Avatar()
            new_avatar.photo.save(
                name=formatPictureName(picture_path),
                content=ContentFile(response.content),
            )
            user.avatar = new_avatar
            user.save()


def grabGithubData(sociallogin, user):
    name = sociallogin.account.extra_data["name"]
    if " " in name:
        first_name, last_name = name.split(" ", 1)
        user.first_name = first_name
        user.last_name = last_name
    else:
        user.name = first_name
    if sociallogin.account.extra_data["email"] is not None:
        user.email = sociallogin.account.extra_data["email"]
    if sociallogin.account.extra_data["login"] is not None:
        user.username = f'gh-{sociallogin.account.extra_data["login"]}'
    user.save()


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        from boards.models import Board, Column

        board = Board.objects.create(
            owner=instance, name=f"Board of {instance.username}"
        )
        column1 = Column.objects.create(title="To do", board=board)
        column2 = Column.objects.create(title="Done", board=board)


@receiver(user_signed_up)
def scrape_social_login_on_signup(request, user, sociallogin=None, **kwargs):
    """
    When a social account is created successfully and this signal is received,
    django-allauth passes in the sociallogin param, giving access to metadata on the remote account, e.g.:
 
    sociallogin.account.provider  # e.g. 'twitter' 
    sociallogin.account.get_avatar_url()
    sociallogin.account.get_profile_url()
    sociallogin.account.extra_data['screen_name']
 
    See the socialaccount_socialaccount table for more in the 'extra_data' field.
    """
    if sociallogin:
        if sociallogin.account.provider == "google":
            createAvatar(sociallogin, user)
        if sociallogin.account.provider == "facebook":
            createAvatar(sociallogin, user)
        if sociallogin.account.provider == "github":
            grabGithubData(sociallogin, user)
            createAvatar(sociallogin, user)
