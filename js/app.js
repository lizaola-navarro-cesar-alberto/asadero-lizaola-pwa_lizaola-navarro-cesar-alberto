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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((registro) => {
        registro.update();
        console.log("Service Worker registrado con éxito:", registro.scope);
      })
      .catch((error) => {
        console.error("No se pudo registrar el Service Worker:", error);
      });
  });
}