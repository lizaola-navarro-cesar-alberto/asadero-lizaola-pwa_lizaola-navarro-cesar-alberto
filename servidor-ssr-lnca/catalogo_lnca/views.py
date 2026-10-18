from django.shortcuts import render

# "Base de datos" falsa: los productos reales del Asadero Lizaola
PRODUCTOS = [
    {"id": 1, "nombre": "Arrachera (kg)", "precio": 480, "categoria": "Cortes y Comida"},
    {"id": 2, "nombre": "Rib eye (kg)", "precio": 520, "categoria": "Cortes y Comida"},
    {"id": 3, "nombre": "Guacamole", "precio": 65, "categoria": "Extras"},
    {"id": 4, "nombre": "Coca Cola 600ml", "precio": 35, "categoria": "Bebidas"},
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