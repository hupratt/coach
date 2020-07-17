from django.apps import AppConfig
from django.db.models.signals import post_save

# from socialaccounts.signals import user_signed_up


class SocialAccountConfig(AppConfig):
    name = "socialaccounts"
    verbose_name = "User Social Accounts"

    # def ready(self):
    #     post_save.connect(user_signed_up, sender="accounts.User")

