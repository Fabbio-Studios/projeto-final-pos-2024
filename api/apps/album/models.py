from django.db import models
from api.apps.user.models import User  # Relacionamento com User

class Album(models.Model):
    user = models.ForeignKey(User, related_name='albums', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class Photo(models.Model):
    album = models.ForeignKey(Album, related_name='photos', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    url = models.URLField()
    thumbnail_url = models.URLField()

    def __str__(self):
        return self.title
