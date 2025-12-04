// src/TesRute.jsx

import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Perbaikan ikon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Komponen Internal untuk Menggambar Rute
function RouteDrawer() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Titik awal dan akhir yang sudah ditentukan (hardcoded)
    const startPoint = L.latLng(-3.992500, 122.515200); // The Park Kendari
    const endPoint = L.latLng(-4.006120, 122.542310);   // Mise Coffee

    const routingControl = L.Routing.control({
      waypoints: [startPoint, endPoint],
      // Gunakan proxy Vite yang sudah kita atur
      router: L.Routing.osrmv1({ serviceUrl: '/osrm/route/v1/bike/' }),
      lineOptions: { styles: [{ color: "#F97316", weight: 6, opacity: 0.8 }] },
      show: false, // Jangan tampilkan panel instruksi
      addWaypoints: false,
    }).addTo(map);

    console.log("Mencoba membuat rute...");

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}

// Komponen Utama Tes
function TesRute() {
  const defaultCenter = [-3.992500, 122.515200];

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapContainer center={defaultCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />
        <RouteDrawer />
      </MapContainer>
    </div>
  );
}

export default TesRute;