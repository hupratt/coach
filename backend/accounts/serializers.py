from pathlib import Path

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_auth.serializers import TokenSerializer
from rest_auth.models import TokenModel

from .models import Avatar

User = get_user_model()


class AvatarSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Avatar
        fields = ["id", "photo", "name"]

    def get_name(self, obj):
        return Path(obj.photo.name).stem


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class UserSearchSerializer(serializers.ModelSerializer):
    avatar = AvatarSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "avatar"]


class UserDetailSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())], required=False
    )

    class Meta:
        model = User
        fields = (
            "pk",
            "username",
            "email",
            "first_name",
            "last_name",
            "token",
            "avatar",
        )
        read_only_fields = ("email", "token", "avatar")

    def get_token(self, user):
        return TokenSerializer(TokenModel.objects.get(user=user)).data["key"]

    def get_avatar(self, user):
        return Avatar.objects.get(id=user.avatar.id).thumbnail.name


class BoardOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id"]


class BoardMemberSerializer(serializers.ModelSerializer):
    avatar = AvatarSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "avatar"]

