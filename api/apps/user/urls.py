from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)  # Aqui, 'users' é a URL base para acessar os usuários

urlpatterns = router.urls
