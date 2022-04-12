from django.db import models

# Create your models here.
from django.db import models


class User(models.Model):
    name = models.CharField(max_length=20)


class Topic(models.Model):
    post_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    children = models.CharField(max_length=100)


class Post(models.Model):
    post_text = models.CharField(max_length=500)
    pub_date = models.DateTimeField('date published')
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    children = models.CharField(max_length=100)

    def get_children(self):
        pass
