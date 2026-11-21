// app.js — muestra el estado de conexión (el Service Worker se registra en index.html)

// Actualiza la "píldora" del encabezado según haya o no internet
function actualizarPildoraConexion() {
  const pildora = document.getElementById("estado-conexion");
  if (!pildora) return;

  if (navigator.onLine) {
    pildora.textContent = "conectado";
    pildora.classList.remove("sin-conexion");
  } else {
    pildora.textContent = "sin conexión";
    pildora.classList.add("sin-conexion");
  }
}

document.addEventListener("DOMContentLoaded", actualizarPildoraConexion);
window.addEventListener("online", actualizarPildoraConexion);
window.addEventListener("offline", actualizarPildoraConexion);
