from django.shortcuts import render

# Productos reales del Asadero Lizaola
PRODUCTOS = [
    {"id": 1, "nombre": "Arrachera (kg)", "precio": 480, "categoria": "Cortes y Comida"},
    {"id": 2, "nombre": "Rib eye (kg)", "precio": 520, "categoria": "Cortes y Comida"},
    {"id": 3, "nombre": "Guacamole", "precio": 65, "categoria": "Extras"},
    {"id": 4, "nombre": "Coca Cola 600ml", "precio": 35, "categoria": "Bebidas"},
]


def vista_ssr(request):
    """
    Vista con Renderizado en Servidor (SSR).
    Devuelve el HTML ya con los datos renderizados.
    """
    contexto = {"productos": PRODUCTOS}
    return render(request, 'catalogo/productos.html', contexto)