from allauth.account.signals import user_signed_up
from django.dispatch import receiver
from django.core.files import File
from tempfile import NamedTemporaryFile
import urllib
import os
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model


@receiver(user_signed_up)
def _user_signed_up(request, user, sociallogin=None, **kwargs):
    """
    When a social account is created successfully and this signal is received,
    django-allauth passes in the sociallogin param, giving access to metadata on the remote account, e.g.:
 
    sociallogin.account.provider  # e.g. 'twitter' 
    sociallogin.account.get_avatar_url()
    sociallogin.account.get_profile_url()
    sociallogin.account.extra_data['screen_name']
 
    See the socialaccount_socialaccount table for more in the 'extra_data' field.
    """

    import pdb

    pdb.set_trace()
    if sociallogin:
        User = get_user_model()

        # Extract first / last names from social nets and store on User record
        if sociallogin.account.provider == "google":
            pass
        if sociallogin.account.provider == "github":
            new = ""
            name = sociallogin.account.extra_data["name"]
            if " " in name:
                first_name, last_name = name.split(" ")
                new, _ = User.objects.get_or_create(
                    first_name=name, last_name=last_name
                )
                # User.objects.get_or_create(avatar=new)
            else:
                new = User.objects.get_or_create(first_name=name)
            picture_path = sociallogin.account.get_avatar_url()
            if picture_path is not None or picture_path is not "None":
                result = urllib.request.urlretrieve(picture_path)
                from accounts.models import Avatar

                img, success = Avatar.objects.get_or_create(
                    photo=File(open(result[0], "rb"))
                )
                new.image = img
                new.save()
