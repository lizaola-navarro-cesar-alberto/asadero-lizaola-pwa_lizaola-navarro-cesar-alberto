"""
Rutas propias de la app "catalogo".
"""
from django.urls import path
from . import views

urlpatterns = [
    # http://127.0.0.1:8000/menu/ -> ejecuta vista_ssr
    path('menu/', views.vista_ssr, name='catalogo_ssr'),
]