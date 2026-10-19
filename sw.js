// sw.js — Service Worker de Asadero Lizaola PWA
const NOMBRE_CACHE = "asadero-lizaola-v2";

// Lista del "app shell": todos los recursos reales que componen la PWA
const APP_SHELL = [
  "./",
  "./index.html",
  "./css/estilos.css",
  "./js/app.js",
  "./js/carrito.js",
  "./js/csr.js",
  "./catalogo.json",
  "./manifest.json",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/logo-lizaola1.png",
  "./img/agua.jpg",
  "./img/arrachera.jpg",
  "./img/burro_percheron.jpg",
  "./img/cerveza.jpg",
  "./img/cocacola.jpg",
  "./img/costilla_cargada.jpg",
  "./img/diezmillo.jpg",
  "./img/frijoles_maneados.jpg",
  "./img/guacamole.jpg",
  "./img/horchata.jpg",
  "./img/limonada.jpg",
  "./img/naranjada.jpg",
  "./img/papa_asada.jpg",
  "./img/plato_de_asada.jpg",
  "./img/quesadilla_de_asada.jpg",
  "./img/rib_eye.jpg",
  "./img/salchicha_asada.jpg",
  "./img/salsa_de_molcajete.jpg"
];

// Evento "install": almacena en caché todos los archivos del app shell
self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(NOMBRE_CACHE).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

// Evento "activate": limpia cachés viejas para que no ocupen espacio
self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((nombresGuardados) =>
      Promise.all(
        nombresGuardados
          .filter((nombre) => nombre !== NOMBRE_CACHE)
          .map((nombre) => caches.delete(nombre))
      )
    )
  );
  self.clients.claim();
});

// Evento "fetch": estrategia Cache-First con respaldo de red
self.addEventListener("fetch", (evento) => {
  if (evento.request.method !== "GET") return;
  if (!evento.request.url.startsWith("http")) return;

  evento.respondWith(
    caches.match(evento.request).then((respuestaGuardada) => {
      if (respuestaGuardada) return respuestaGuardada;

      return fetch(evento.request)
        .then((respuestaDeRed) => {
          if (!respuestaDeRed || respuestaDeRed.status !== 200 || respuestaDeRed.type !== "basic") {
            return respuestaDeRed;
          }
          const copia = respuestaDeRed.clone();
          caches.open(NOMBRE_CACHE).then((cache) => cache.put(evento.request, copia));
          return respuestaDeRed;
        })
        .catch(() => respuestaGuardada);
    })
  );
});