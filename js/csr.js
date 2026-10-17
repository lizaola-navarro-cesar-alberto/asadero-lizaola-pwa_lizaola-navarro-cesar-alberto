// csr.js — Renderizado en el Cliente (CSR) con clasificación automática por ID

// 1) Buscamos los contenedores por categoría en index.html
const contenedorComida = document.getElementById("catalogo-comida");
const contenedorBebidas = document.getElementById("catalogo-bebidas");
const contenedorExtras = document.getElementById("catalogo-extras");

function seleccionarNav(elemento) {
  // Apaga todos los botones del menú
  const links = document.querySelectorAll('nav a');
  links.forEach(l => {
    l.style.background = '#1c1a1a';
    l.style.color = '#9ca3af';
    l.style.fontWeight = '600';
  });
  // Enciende únicamente al que le diste clic
  elemento.style.background = '#7d3636';
  elemento.style.color = '#fff';
  elemento.style.fontWeight = '700';
}

// 2) Pedimos el archivo catalogo.json al servidor
fetch("catalogo.json")
  .then((respuesta) => respuesta.json())
  .then((productos) => {
    // 3) Limpiamos los contenedores antes de renderizar
    if (contenedorComida) contenedorComida.innerHTML = "";
    if (contenedorBebidas) contenedorBebidas.innerHTML = "";
    if (contenedorExtras) contenedorExtras.innerHTML = "";

    productos.forEach((producto) => {
      // Creamos la tarjeta del producto
      const tarjeta = document.createElement("div");
      tarjeta.className = "producto";

      tarjeta.innerHTML = `
        <img class="producto__foto" src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        <strong>${producto.nombre}</strong>
        <span class="precio">$${producto.precio}</span>
        <p>Stock: ${producto.stock}</p>
        <button type="button" data-id="${producto.id}">Agregar al carrito</button>
      `;

      // Conectamos el botón con la función agregarAlCarrito() de carrito.js
      tarjeta.querySelector("button").addEventListener("click", () => {
        agregarAlCarrito(producto);
      });

      // 4) Clasificación automática según los IDs de tu JSON:
      // IDs del 1 al 8: Cortes y Comida (Arrachera, Rib eye, Diezmillo, Burro percherón, etc.)
      // IDs del 9 al 12: Guarniciones y Extras (Guacamole, Frijoles maneados, Salsa, Salchicha)
      // IDs del 13 al 18: Bebidas (CocaCola, Horchata, Limonada, Cerveza, etc.)
      
      if (producto.id >= 1 && producto.id <= 6) {
        if (contenedorComida) contenedorComida.appendChild(tarjeta);
      } else if (producto.id >= 7 && producto.id <= 10) {
        if (contenedorExtras) contenedorExtras.appendChild(tarjeta);
      } else if (producto.id >= 11 && producto.id <= 15) {
        if (contenedorBebidas) contenedorBebidas.appendChild(tarjeta);
      } else {
        // Por defecto si hubiera algún otro ID
        if (contenedorComida) contenedorComida.appendChild(tarjeta);
      }
    });
  })
  .catch((error) => {
    const mensajeError = "<p>No se pudo cargar el catálogo. Intenta más tarde.</p>";
    if (contenedorComida) contenedorComida.innerHTML = mensajeError;
    console.error("Error al cargar catálogo:", error);
  });