from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/get_posts/', views.get_posts, name='get_posts'),
    path('api/new_post/', views.new_post, name='new_post')

]