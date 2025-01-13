from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/albums/', include('api.apps.album.urls')),
    path('api/users/', include('api.apps.user.urls')),  # Corrigido para refletir o caminho de users
    path('api/todos/', include('api.apps.todo.urls')),
]
