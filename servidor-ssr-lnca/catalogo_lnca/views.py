from django.shortcuts import render

PRODUCTOS = [
    {"id": 1, "nombre": "Arrachera (kg)", "precio": 480, "stock": 20, "categoria": "Cortes y Comida", "imagen": "img/arrachera.jpg"},
    {"id": 2, "nombre": "Rib eye (kg)", "precio": 620, "stock": 15, "categoria": "Cortes y Comida", "imagen": "img/rib_eye.jpg"},
    {"id": 3, "nombre": "Diezmillo (kg)", "precio": 320, "stock": 25, "categoria": "Cortes y Comida", "imagen": "img/diezmillo.jpg"},
    {"id": 4, "nombre": "Costilla cargada", "precio": 280, "stock": 30, "categoria": "Cortes y Comida", "imagen": "img/costilla_cargada.jpg"},
    {"id": 5, "nombre": "Burro percherón", "precio": 130, "stock": 50, "categoria": "Cortes y Comida", "imagen": "img/burro_percheron.jpg"},
    {"id": 6, "nombre": "Quesadilla de asada", "precio": 95, "stock": 45, "categoria": "Cortes y Comida", "imagen": "img/quesadilla_de_asada.jpg"},
    {"id": 7, "nombre": "Guacamole", "precio": 60, "stock": 50, "categoria": "Guarniciones y Extras", "imagen": "img/guacamole.jpg"},
    {"id": 8, "nombre": "Frijoles maneados", "precio": 45, "stock": 40, "categoria": "Guarniciones y Extras", "imagen": "img/frijoles_maneados.jpg"},
    {"id": 9, "nombre": "Salsa de molcajete", "precio": 25, "stock": 60, "categoria": "Guarniciones y Extras", "imagen": "img/salsa_de_molcajete.jpg"},
    {"id": 10, "nombre": "Salchicha asada", "precio": 25, "stock": 50, "categoria": "Guarniciones y Extras", "imagen": "img/salchicha_asada.jpg"},
    {"id": 11, "nombre": "CocaCola", "precio": 30, "stock": 100, "categoria": "Bebidas", "imagen": "img/cocacola.jpg"},
    {"id": 12, "nombre": "Horchata", "precio": 35, "stock": 60, "categoria": "Bebidas", "imagen": "img/horchata.jpg"},
    {"id": 13, "nombre": "Limonada", "precio": 35, "stock": 60, "categoria": "Bebidas", "imagen": "img/limonada.jpg"},
    {"id": 14, "nombre": "Cerveza", "precio": 45, "stock": 80, "categoria": "Bebidas", "imagen": "img/cerveza.jpg"},
    {"id": 15, "nombre": "Agua", "precio": 20, "stock": 100, "categoria": "Bebidas", "imagen": "img/agua.jpg"}
]


def vista_ssr(request):
    """
    Vista con Renderizado en Servidor (SSR).

    request: el objeto que representa la petición que hizo el navegador.

    render() hace tres cosas:
      1) toma la plantilla 'catalogo_lnca/catalogo_ssr.html'
      2) le inyecta el diccionario de "contexto" (aquí: la lista de productos)
      3) devuelve el HTML final, YA CON LOS DATOS DENTRO, listo para el navegador.

    Por eso es "servidor": el HTML que llega al navegador ya trae escritos
    los nombres y precios. Si haces clic derecho > "Ver código fuente de la
    página" verás los productos en el HTML, aunque JavaScript esté desactivado.
    Compáralo con la vista CSR de la Parte B, donde el HTML llega vacío y es
    JavaScript quien dibuja los productos DESPUÉS, ya en el navegador.
    """
    contexto = {"productos": PRODUCTOS}
    return render(request, 'catalogo_lnca/catalogo_ssr.html', contexto)