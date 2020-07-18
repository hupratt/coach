"""knboard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from .views import index, ServiceWorkerView

# from rest_framework.authtoken.views import obtain_auth_token

from accounts.api import (
    UserViewSet,
    UserSearchView,
    AvatarViewSet,
    MyUserDetailsView,
)  # , GuestRegistration
from boards.api import (
    BoardViewSet,
    ColumnViewSet,
    LabelViewSet,
    TaskViewSet,
    SortColumn,
    SortTask,
    EventView,
)

router = routers.DefaultRouter()
router.register(r"avatars", AvatarViewSet)
router.register(r"users", UserViewSet)
router.register(r"boards", BoardViewSet)
router.register(r"columns", ColumnViewSet)
router.register(r"labels", LabelViewSet)
router.register(r"tasks", TaskViewSet)

urlpatterns = [
    path("accounts/", include("allauth.urls")),
    path("accounts/", include("socialaccounts.googleurls")),
    path("api/", include(router.urls)),
    path("api/u/search/", UserSearchView.as_view(), name="user-search"),
    path("api/events/", EventView.as_view(), name="event-list"),
    path("api/sort/column/", SortColumn.as_view(), name="sort-column"),
    path("api/sort/task/", SortTask.as_view(), name="sort-task"),
    path("api-auth/", include("rest_framework.urls")),
    path("auth/", include("rest_auth.urls")),
    path("auth/user-with-token/", MyUserDetailsView.as_view()),
    # path("api-token-auth/", obtain_auth_token),
    path("auth/registration/", include("rest_auth.registration.urls")),
    # path("auth/guest/", GuestRegistration.as_view(), name="guest-registration"),
    path("backdoor/", admin.site.urls),
    path("sw.js", ServiceWorkerView.as_view(), name=ServiceWorkerView.name),
]

# make sure this is always last
urlpatterns += [re_path(r"^.*", index, name="home")]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    try:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
    except ModuleNotFoundError:
        pass
