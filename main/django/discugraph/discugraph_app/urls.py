from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_posts/', views.get_posts, name='get_posts')
]