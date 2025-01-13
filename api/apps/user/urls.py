from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import UserViewSet, update_user, delete_user, create_user

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = router.urls + [
    path('users/<int:pk>/', update_user, name='update_user'),
    path('users/<int:pk>/', delete_user, name='delete_user'),
    path('users/', create_user, name='create_user'),
]
