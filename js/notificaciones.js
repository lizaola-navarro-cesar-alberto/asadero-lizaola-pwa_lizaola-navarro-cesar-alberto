// notificaciones.js — Notification API
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btn-notificar");
  const mensaje = document.getElementById("notificaciones-mensaje");

  if (!boton) return;

  boton.addEventListener("click", (e) => {
    e.preventDefault(); // Evita cualquier recarga o comportamiento de formulario

    if (!("Notification" in window)) {
      if (mensaje) mensaje.textContent = "Este navegador no soporta notificaciones.";
      return;
    }

    Notification.requestPermission().then((permiso) => {
      if (permiso === "granted") {
        new Notification("Asadero Lizaola", {
          body: "Te avisaremos cuando haya nuevas ofertas.",
          icon: "icons/logo2-lizaola.png",
        });
        if (mensaje) mensaje.textContent = "Notificaciones activadas.";
      } else {
        if (mensaje) mensaje.textContent = "Permisos no habilitados";
      }
    });
  });
});