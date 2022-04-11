from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('discugraph/', include('discugraph.urls')),
    path('admin/', admin.site.urls),
]