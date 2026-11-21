// geolocalizacion.js — Asadero Lizaola
const SUCURSAL = {
  nombre: "Asadero Lizaola",
  lat: 29.1001,
  lon: -110.9259,
};

function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const radioTierraKm = 6371;
  const aRadianes = (grados) => (grados * Math.PI) / 180;

  const dLat = aRadianes(lat2 - lat1);
  const dLon = aRadianes(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(aRadianes(lat1)) * Math.cos(aRadianes(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radioTierraKm * c;
}

// Obtiene las coordenadas exactas de las calles mediante OSRM
async function obtenerRuta(origenLat, origenLon) {
  // Nota: lon,lat para el servicio OSRM
  const url = `https://router.project-osrm.org/route/v1/driving/${origenLon},${origenLat};${SUCURSAL.lon},${SUCURSAL.lat}?overview=full&geometries=geojson`;

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) return null;
    const datos = await respuesta.json();
    if (datos.code !== "Ok" || !datos.routes || datos.routes.length === 0) return null;

    const ruta = datos.routes[0];
    return {
      // GeoJSON devuelve [lon, lat]; Leaflet requiere [lat, lon]
      coords: ruta.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
      distanciaKm: ruta.distance / 1000,
      duracionMin: ruta.duration / 60,
    };
  } catch (error) {
    console.error("Error al consultar OSRM:", error);
    return null;
  }
}

let mapa;

function dibujarMapa(origenLat, origenLon, coordsRuta) {
  const contenedor = document.getElementById("mapa-ruta");
  contenedor.hidden = false;

  if (!mapa) {
    mapa = L.map(contenedor);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; colaboradores de OpenStreetMap",
      maxZoom: 19,
    }).addTo(mapa);
  } else {
    mapa.eachLayer((capa) => {
      if (capa instanceof L.Marker || capa instanceof L.Polyline) {
        mapa.removeLayer(capa);
      }
    });
  }

  const puntoUsuario = [origenLat, origenLon];
  const puntoSucursal = [SUCURSAL.lat, SUCURSAL.lon];

  L.marker(puntoUsuario).addTo(mapa).bindPopup("Tú estás aquí").openPopup();
  L.marker(puntoSucursal).addTo(mapa).bindPopup(SUCURSAL.nombre);

  const hayRuta = Array.isArray(coordsRuta) && coordsRuta.length > 0;
  
  if (hayRuta) {
    // Dibuja la línea continua siguiendo las calles exactas
    const lineaRuta = L.polyline(coordsRuta, { color: "#7d3636", weight: 6, opacity: 0.85 }).addTo(mapa);
    mapa.fitBounds(lineaRuta.getBounds(), { padding: [40, 40] });
  } else {
    // Respaldo en línea recta si no se logra la conexión con OSRM
    const lineaDirecta = L.polyline([puntoUsuario, puntoSucursal], { color: "#ff7a45", weight: 3, dashArray: "6 6" }).addTo(mapa);
    mapa.fitBounds(lineaDirecta.getBounds(), { padding: [40, 40] });
  }

  setTimeout(() => mapa.invalidateSize(), 100);
}

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btn-ubicacion");
  const mensaje = document.getElementById("ubicacion-mensaje");

  if (!boton) return;

  boton.addEventListener("click", () => {
    if (!("geolocation" in navigator)) {
      mensaje.textContent = "Este dispositivo no reporta ubicación.";
      return;
    }

    mensaje.textContent = "Buscando tu ubicación y calculando calles…";

    navigator.geolocation.getCurrentPosition(
      async (posicion) => {
        const { latitude, longitude } = posicion.coords;
        const mapaUrl = `https://www.openstreetmap.org/directions?from=${latitude}%2C${longitude}&to=${SUCURSAL.lat}%2C${SUCURSAL.lon}`;

        mensaje.textContent = "Trazando ruta vial sobre las calles…";
        
        // Espera de forma síncrona a que OSRM devuelva las calles
        const ruta = await obtenerRuta(latitude, longitude);

        if (ruta && ruta.coords.length > 0) {
          dibujarMapa(latitude, longitude, ruta.coords);
          mensaje.innerHTML =
            `Ruta hasta ${SUCURSAL.nombre}: <strong>${ruta.distanciaKm.toFixed(1)} km</strong> · ` +
            `~${Math.round(ruta.duracionMin)} min en auto. ` +
            `<a href="${mapaUrl}" target="_blank" rel="noopener">Abrir en el mapa</a>`;
        } else {
          dibujarMapa(latitude, longitude, null);
          const distanciaKm = calcularDistanciaKm(latitude, longitude, SUCURSAL.lat, SUCURSAL.lon);
          mensaje.innerHTML =
            `Distancia aproximada: <strong>${distanciaKm.toFixed(1)} km</strong>. ` +
            `<a href="${mapaUrl}" target="_blank" rel="noopener">Abrir en el mapa</a>`;
        }
      },
      (error) => {
        console.error("Error GPS:", error);
        mensaje.textContent = "No se pudo obtener la ubicación. Revisa los permisos del navegador.";
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
});