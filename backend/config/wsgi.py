"""
WSGI config for knboard project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os, sys, dotenv

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")


if os.environ.get("DJANGO_DEVELOPMENT") == "True":
    dotenv.read_dotenv(
        os.path.join(
            "/hdd/Dev/coach/backend",
            ".env.development",
        )
    )
else:
    dotenv.read_dotenv(
        os.path.join(
            "/hdd/Dev/coach/backend", ".env"
        )
    )

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "home.settings")

application = get_wsgi_application()
