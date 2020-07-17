from allauth.socialaccount.providers.oauth2.urls import default_urlpatterns

from allauth.socialaccount.providers.github.provider import GitHubProvider


urlpatterns = default_urlpatterns(GitHubProvider)
