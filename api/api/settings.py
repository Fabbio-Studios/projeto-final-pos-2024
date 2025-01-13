import os
from pathlib import Path

# Defina BASE_DIR para apontar para o diretório base do projeto
BASE_DIR = Path(__file__).resolve().parent.parent

# ...existing code...
INSTALLED_APPS = [
    # ...existing apps...
    'django.contrib.admin',  # Adicione esta linha
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'apps.user',  # Certifique-se de que o app está listado aqui
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',  # Adicione esta linha
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # Adicione esta linha
    'django.contrib.messages.middleware.MessageMiddleware',  # Adicione esta linha
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# ...existing code...

DEBUG = True  # Certifique-se de que o DEBUG está definido como True para desenvolvimento

ALLOWED_HOSTS = ['localhost', '127.0.0.1']  # Adicione os hosts permitidos

STATIC_URL = '/static/'  # Adicione esta linha

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

ROOT_URLCONF = 'api.urls'  # Certifique-se de que este caminho está correto

# ...existing code...