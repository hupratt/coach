from django.templatetags.static import static
from django.urls import reverse
from django.views.generic import TemplateView
from django.shortcuts import render
from django.conf import settings
import datetime, uuid


def index(request):
    if len(settings.POSTHOG_KEY) > 0:
        context = {
            "POSTHOG_KEY": settings.POSTHOG_KEY,
            "POSTHOG_DOMAIN": settings.POSTHOG_DOMAIN,
        }
        return render(request, "frontend/index.html", context=context)
    return render(request, "frontend/index.html")
