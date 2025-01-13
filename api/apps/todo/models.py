from django.db import models
from api.apps.user.models import User

class ToDo(models.Model):
    user = models.ForeignKey(User, related_name='todos', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
