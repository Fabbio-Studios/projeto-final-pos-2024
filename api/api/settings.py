import os
from pathlib import Path

# Defina BASE_DIR para apontar para o diretório base do projeto
BASE_DIR = Path(__file__).resolve().parent.parent

# ...existing code...
INSTALLED_APPS = [
    # ...existing apps...
    'apps.user',  # Certifique-se de que o app está listado aqui
]
# ...existing code...

DEBUG = True  # Certifique-se de que o DEBUG está definido como True para desenvolvimento

ALLOWED_HOSTS = ['localhost', '127.0.0.1']  # Adicione os hosts permitidos

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
# ...existing code...