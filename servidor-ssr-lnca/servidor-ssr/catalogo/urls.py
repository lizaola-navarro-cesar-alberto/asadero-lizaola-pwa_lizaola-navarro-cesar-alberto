from django.urls import path
from . import views

urlpatterns = [
    path('menu/', views.vista_ssr, name='catalogo_ssr'),
]