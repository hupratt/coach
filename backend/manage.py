#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os, dotenv
import sys


def main():
    if os.environ.get("DJANGO_DEVELOPMENT") == "True":
        dotenv.read_dotenv(
            os.path.join(os.path.dirname(__file__), ".env.development")
        )
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
    else:
        dotenv.read_dotenv(
            os.path.join(os.path.dirname(__file__), ".env")
        )
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
