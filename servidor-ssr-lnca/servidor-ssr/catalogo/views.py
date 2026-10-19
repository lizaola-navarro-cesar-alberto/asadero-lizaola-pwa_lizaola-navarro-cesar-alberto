from django.shortcuts import render

PRODUCTOS = [
    { "id": 1, "nombre": "Arrachera (kg)", "precio": 480, "stock": 20, "imagen": "img/arrachera.jpg" },
    { "id": 2, "nombre": "Rib eye (kg)", "precio": 620, "stock": 15, "imagen": "img/rib_eye.jpg" },
    { "id": 3, "nombre": "Diezmillo (kg)", "precio": 320, "stock": 25, "imagen": "img/diezmillo.jpg" },
    { "id": 4, "nombre": "Costilla cargada", "precio": 280, "stock": 30, "imagen": "img/costilla_cargada.jpg" },
    { "id": 5, "nombre": "Burro percherón", "precio": 130, "stock": 50, "imagen": "img/burro_percheron.jpg" },
    { "id": 6, "nombre": "Quesadilla de asada", "precio": 95, "stock": 45, "imagen": "img/quesadilla_de_asada.jpg" },
    { "id": 7, "nombre": "Guacamole", "precio": 60, "stock": 50, "imagen": "img/guacamole.jpg" },
    { "id": 8, "nombre": "Frijoles maneados", "precio": 45, "stock": 40, "imagen": "img/frijoles_maneados.jpg" },
    { "id": 9, "nombre": "Salsa de molcajete", "precio": 25, "stock": 60, "imagen": "img/salsa_de_molcajete.jpg" },
    { "id": 10, "nombre": "Salchicha asada", "precio": 25, "stock": 50, "imagen": "img/salchicha_asada.jpg" },
    { "id": 11, "nombre": "CocaCola", "precio": 30, "stock": 100, "imagen": "img/cocacola.jpg" },
    { "id": 12, "nombre": "Horchata", "precio": 35, "stock": 60, "imagen": "img/horchata.jpg" },
    { "id": 13, "nombre": "Limonada", "precio": 35, "stock": 60, "imagen": "img/limonada.jpg" },
    { "id": 14, "nombre": "Cerveza", "precio": 45, "stock": 80, "imagen": "img/cerveza.jpg" },
    { "id": 15, "nombre": "Agua", "precio": 20, "stock": 100, "imagen": "img/agua.jpg" }
]

def vista_ssr(request):
    """
    Vista con Renderizado en Servidor (SSR).
    Devuelve el HTML ya con los datos renderizados.
    """
    contexto = {"productos": PRODUCTOS}
    return render(request, 'catalogo/productos.html', contexto)