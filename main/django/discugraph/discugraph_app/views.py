import datetime
import json
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse

# from discugraph_app.models import Topic, Post
# from discugraph.discugraph_app.models import Topic, Post
from discugraph_app.models import Topic, Post, User


def index(request):
    return HttpResponse("Hello, world. Welcome to the discugraph index.")


def get_posts(request):
    data = [[]]
    for topic in Topic.objects.all():
        topic_json = {
            'id': topic.id,
            'text': topic.post_text,
            'level': 0,
            'parents': False
        }
        data[0].append(topic_json)
    for post in Post.objects.all():
        level = 1  # TODO
        post_json = {
            'id': post.id,
            'text': post.post_text,
            'level': level,
            'parents': False
        }
        if level >= len(data):
            data.append([])
        data[level].append(post_json)
    return JsonResponse(data, safe=False)


def new_post(request):
    data = json.load(request)
    print(data)
    user = User.objects.filter(id=data['user']).first()
    topic = Topic.objects.filter(id=data['topic']).first()
    post = Post(post_text=data['text'], poster=user, topic=topic, children="", pub_date=datetime.datetime.now())
    post.save()
    return HttpResponse(200)
