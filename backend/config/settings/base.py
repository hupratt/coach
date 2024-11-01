"""
Django settings for knboard project.

Generated by 'django-admin startproject' using Django 2.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BACKEND_DIR = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)

# SECURITY WARNING: don't run with debug turned on in production!
SECRET_KEY = os.environ.get("SECRET_KEY", "")
DEBUG = os.environ.get("DEBUG", False)
ALLOWED_HOSTS = [
    "coach.thekor.eu",
    "127.0.0.1",
    "localhost",
    "10.10.85.100"
]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    # external
    "adminsortable",
    "rest_framework",
    "rest_framework.authtoken",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.github",
    "allauth.socialaccount.providers.facebook",
    "rest_auth",
    "rest_auth.registration",
    "django_extensions",
    "corsheaders",
    # "webpush",
    # internal
    "accounts",
    "boards",
    "frontend",
    "socialaccounts.apps.SocialAccountConfig",
]

CORS_ORIGIN_WHITELIST = (
    "http://localhost:8000",
    "http://localhost:7000",
    "http://localhost:6500",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    "https://posthog.thekor.eu",
)


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": "",
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.template.context_processors.static",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": os.path.join(BACKEND_DIR, "db.sqlite3"),
#     }
# }

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "coach",
        "USER": os.environ.get("dbuser"),
        "PASSWORD": os.environ.get("dbpassword"),
        "HOST": os.environ.get("hostip"),
        "PORT": os.environ.get("pnumber"),
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Europe/Luxembourg"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
STATIC_URL = os.environ.get("DJANGO_STATIC_URL", "/static/")
STATIC_ROOT = os.environ.get(
    "DJANGO_STATIC_ROOT", os.path.join(os.path.dirname(BACKEND_DIR), "static")
)

STATICFILES_DIRS = [
    os.path.join(BACKEND_DIR, "frontend/static"),
]

# Media files
MEDIA_ROOT = os.environ.get(
    "DJANGO_MEDIA_ROOT", os.path.join(os.path.dirname(BACKEND_DIR), "media")
)
MEDIA_URL = "/media/"
THUMB_SIZE = 128, 128

# Fixtures
FIXTURE_DIRS = ["fixtures"]

# Auth user
AUTH_USER_MODEL = "accounts.User"

# Configure django-rest-framework
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    "TEST_REQUEST_DEFAULT_FORMAT": "json",
}

# REST_AUTH_SERIALIZERS = {"TOKEN_SERIALIZER": "accounts.serializers.TokenSerializer"}

# For django.contrib.sites
SITE_ID = 1

# Configure django-allauth
ACCOUNT_EMAIL_REQUIRED = False
ACCOUNT_EMAIL_VERIFICATION = None
ACCOUNT_UNIQUE_EMAIL = True


# Posthog
POSTHOG_KEY = os.environ.get("POSTHOG_KEY", "")
POSTHOG_DOMAIN = os.environ.get("POSTHOG_DOMAIN", "")


CSRF_COOKIE_NAME = "XSRF-TOKEN"

# WEBPUSH_SETTINGS = {
#     "VAPID_PUBLIC_KEY": os.environ.get("VAPID_PUBLIC_KEY", ""),
#     "VAPID_PRIVATE_KEY": os.environ.get("VAPID_PRIVATE_KEY", ""),
#     "VAPID_ADMIN_EMAIL": os.environ.get("VAPID_ADMIN_EMAIL", ""),
# }
