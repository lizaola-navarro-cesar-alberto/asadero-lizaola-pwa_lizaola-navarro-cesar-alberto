// csr.js — Renderizado en el Cliente (CSR)
const contenedorCatalogo = document.getElementById("catalogo");
const tituloCatalogo = document.getElementById("titulo-catalogo");
let todosLosProductos = [];

// Función para pintar la lista de productos dentro del contenedor #catalogo
function renderizarProductos(productos) {
  if (!contenedorCatalogo) return;
  contenedorCatalogo.innerHTML = "";

  productos.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "producto";

    tarjeta.innerHTML = `
      <img class="producto__foto" src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
      <strong>${producto.nombre}</strong>
      <span class="precio">$${producto.precio}</span>
      <p>Stock: ${producto.stock}</p>
      <button type="button" data-id="${producto.id}">Agregar al carrito</button>
    `;

    // Conectar el botón con carrito.js
    tarjeta.querySelector("button").addEventListener("click", () => {
      agregarAlCarrito(producto);
    });

    contenedorCatalogo.appendChild(tarjeta);
  });
}

// Función para filtrar por categoría
function filtrarCategoria(categoria, elemento) {
  // 1) Actualizar estilo visual del botón activo
  const botones = document.querySelectorAll(".filtro-btn");
  botones.forEach((btn) => btn.classList.remove("activo"));
  if (elemento) {
    elemento.classList.add("activo");
  }

  // 2) Filtrar según la categoría seleccionada
  if (categoria === "comida") {
    if (tituloCatalogo) tituloCatalogo.textContent = "🥩 Cortes y Carnes";
    const filtrados = todosLosProductos.filter(
      (p) => p.categoria === "Cortes y Comida" || (p.id >= 1 && p.id <= 6)
    );
    renderizarProductos(filtrados);
  } else if (categoria === "bebidas") {
    if (tituloCatalogo) tituloCatalogo.textContent = "🥤 Bebidas";
    const filtrados = todosLosProductos.filter(
      (p) => p.categoria === "Bebidas" || (p.id >= 11 && p.id <= 15)
    );
    renderizarProductos(filtrados);
  } else if (categoria === "extras") {
    if (tituloCatalogo) tituloCatalogo.textContent = "🔥 Guarniciones y Extras";
    const filtrados = todosLosProductos.filter(
      (p) => p.categoria === "Guarniciones y Extras" || (p.id >= 7 && p.id <= 10)
    );
    renderizarProductos(filtrados);
  } else {
    if (tituloCatalogo) tituloCatalogo.textContent = "🍽️ Todo el Menú";
    renderizarProductos(todosLosProductos);
  }
}

function seleccionarNav(elemento) {
  filtrarCategoria("todos", elemento);
}

// Carga inicial del catálogo desde catalogo.json
fetch("catalogo.json")
  .then((respuesta) => respuesta.json())
  .then((productos) => {
    todosLosProductos = productos;
    renderizarProductos(todosLosProductos);
  })
  .catch((error) => {
    if (contenedorCatalogo) {
      contenedorCatalogo.innerHTML = "<p>No se pudo cargar el catálogo. Intenta más tarde.</p>";
    }
    console.error("Error al cargar catálogo:", error);
  });