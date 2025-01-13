from rest_framework import serializers
from .models import User  # Certifique-se de que o modelo User está correto

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # Ou uma lista de campos específicos, por exemplo: ['id', 'username', 'email']
