// js/carrito.js — Almacenamiento local y sincronización del carrito
const CLAVE_CARRITO = "asadero-lizaola-carrito";

// 1. Lee el carrito guardado en localStorage (o regresa un array vacío)
function leerCarrito() {
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  return guardado ? JSON.parse(guardado) : [];
}

// 2. Guarda el array del carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// 3. Agrega un producto al carrito (o incrementa su cantidad si ya existe)
function agregarAlCarrito(producto) {
  const carrito = leerCarrito();
  const existente = carrito.find((item) => item.id === producto.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    });
  }

  guardarCarrito(carrito);
  pintarCarrito();
}

// 4. Cambia la cantidad (+1 / -1) y elimina el producto si llega a 0
function cambiarCantidad(id, delta) {
  const carrito = leerCarrito();
  const item = carrito.find((item) => item.id === id);
  if (!item) return;

  item.cantidad += delta;
  const actualizado =
    item.cantidad <= 0 ? carrito.filter((item) => item.id !== id) : carrito;

  guardarCarrito(actualizado);
  pintarCarrito();
}

// 5. Quita un producto del carrito sin importar su cantidad
function quitarDelCarrito(id) {
  const carrito = leerCarrito().filter((item) => item.id !== id);
  guardarCarrito(carrito);
  pintarCarrito();
}

// 6. Dibuja el carrito en el HTML y actualiza el total
function pintarCarrito() {
  const carrito = leerCarrito();
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("carrito-total");

  if (!lista || !total) return;

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    suma += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
      <span class="carrito-nombre">${item.nombre}</span>
      <span class="carrito-cantidad">
        <button type="button" data-accion="restar" data-id="${item.id}" aria-label="Quitar una unidad de ${item.nombre}">−</button>
        <span class="carrito-cantidad__valor">${item.cantidad}</span>
        <button type="button" data-accion="sumar" data-id="${item.id}" aria-label="Agregar una unidad de ${item.nombre}">+</button>
      </span>
      <span class="carrito-precio">$${subtotal}</span>
      <button type="button" class="carrito-quitar" data-accion="quitar" data-id="${item.id}">Quitar</button>
    `;
    lista.appendChild(li);
  });

  total.textContent = suma;
}

// 7. Manejo delegated de clics para los botones (+, -, Quitar)
function manejarClicCarrito(evento) {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton) return;

  const id = Number(boton.dataset.id);
  if (boton.dataset.accion === "sumar") cambiarCantidad(id, 1);
  if (boton.dataset.accion === "restar") cambiarCantidad(id, -1);
  if (boton.dataset.accion === "quitar") quitarDelCarrito(id);
}

// 8. Sincronización offline / online
function sincronizarCarrito() {
  const mensaje = document.getElementById("carrito-mensaje");
  if (!mensaje) return;

  if (!navigator.onLine) {
    mensaje.textContent =
      "Sin conexión: el carrito se sincronizará cuando vuelva el internet.";
    return;
  }

  mensaje.textContent = "Carrito sincronizado con el servidor (simulado). ✓";
}

// Inicialización de eventos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  pintarCarrito();

  const lista = document.getElementById("carrito-lista");
  if (lista) {
    lista.addEventListener("click", manejarClicCarrito);
  }

  const btnSincronizar = document.getElementById("btn-sincronizar");
  if (btnSincronizar) {
    btnSincronizar.addEventListener("click", sincronizarCarrito);
  }

  window.addEventListener("online", sincronizarCarrito);
  window.addEventListener("offline", () => {
    const mensaje = document.getElementById("carrito-mensaje");
    if (mensaje) {
      mensaje.textContent = "Se perdió la conexión.";
    }
  });
});