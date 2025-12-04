import { useEffect, useState, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { Timer, MapPin, Car, Bike, Footprints, Info } from "lucide-react";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const RoutingMachine = ({ userLocation, destination }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  // --- MASUKKAN API KEY OPENROUTESERVICE DI SINI ---
  const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjY3ZTYyZWU3MDYxNDRmOGZhOTZjMmQ0NTg1MmFhNGE3IiwiaCI6Im11cm11cjY0In0="; 
  // ---------------------------------------------------

  const [transportMode, setTransportMode] = useState("driving-car");
  const [activeRouteInfo, setActiveRouteInfo] = useState(null);
  const [totalRoutesFound, setTotalRoutesFound] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Kalibrasi Waktu: Motor diasumsikan 3x lebih cepat dari Sepeda
  const adjustTime = (seconds, mode) => {
    if (!seconds) return 0;
    if (mode === 'cycling-regular') return seconds / 3.0;
    return seconds;
  };

  useEffect(() => {
    if (!map || !userLocation || !destination) return;
    if (ORS_API_KEY.includes("MASUKKAN_API_KEY")) {
       alert("Masukkan API Key di RoutingMachine.jsx dulu!"); return;
    }

    if (routingControlRef.current) map.removeControl(routingControlRef.current);
    setIsLoading(true);

    // Custom Router ORS
    const ORSRouter = L.Class.extend({
      initialize: function (apiKey) { this.apiKey = apiKey; },
      route: function (waypoints, callback, context) {
        const start = waypoints[0].latLng;
        const end = waypoints[1].latLng;
        const url = `https://api.openrouteservice.org/v2/directions/${transportMode}/geojson`;

        fetch(url, {
            method: 'POST',
            headers: { 'Authorization': this.apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                coordinates: [[start.lng, start.lat], [end.lng, end.lat]],
                alternative_routes: { target_count: 3, weight_factor: 1.6, share_factor: 0.6 }
            })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.features) { callback.call(context, { status: -1, message: "No route" }, []); return; }
            const resultRoutes = data.features.map(feature => {
                const coords = feature.geometry.coordinates.map(c => L.latLng(c[1], c[0]));
                const summary = feature.properties.summary;
                return {
                    name: "Rute Alternatif", 
                    summary: { totalDistance: summary.distance, totalTime: adjustTime(summary.duration, transportMode) },
                    coordinates: coords, waypoints: waypoints, inputWaypoints: waypoints, instructions: [] 
                };
            });
            callback.call(context, null, resultRoutes);
        })
        .catch(err => { console.error(err); callback.call(context, { status: -1, message: err.message }, []); });
      }
    });

    const routingControl = L.Routing.control({
      waypoints: [ L.latLng(userLocation[0], userLocation[1]), L.latLng(destination.lat, destination.lng) ],
      showAlternatives: true, fitSelectedRoutes: true, routeWhileDragging: false,
      lineOptions: { styles: [{ color: "#2563eb", opacity: 1, weight: 7 }, { color: "#60a5fa", opacity: 1, weight: 4 }] },
      altLineOptions: { styles: [{ color: "#64748b", opacity: 0.6, weight: 6 }] },
      router: new ORSRouter(ORS_API_KEY),
      createMarker: () => null, containerClassName: 'display-none', 
    });

    routingControl.on('routesfound', function(e) {
      setIsLoading(false);
      const routes = e.routes;
      setTotalRoutesFound(routes.length);
      if (routes.length > 0) setActiveRouteInfo({ distance: routes[0].summary.totalDistance, time: routes[0].summary.totalTime });
    });

    routingControl.on('routeselected', function(e) {
      const r = e.route;
      setActiveRouteInfo({ distance: r.summary.totalDistance, time: r.summary.totalTime });
    });

    routingControl.addTo(map);
    routingControlRef.current = routingControl;
    const container = document.querySelector('.leaflet-routing-container');
    if (container) container.style.display = 'none';

    return () => { if (map && routingControlRef.current) try { map.removeControl(routingControlRef.current); } catch (e) {} };
  }, [map, userLocation, destination, transportMode]);

  const formatDistance = (m) => m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
  const formatTime = (s) => {
    const min = Math.round(s / 60);
    if (min < 60) return `${min} mnt`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h} jam ${m} mnt`;
  };

  if (!activeRouteInfo && !isLoading) return null;

  return (
    <div className="leaflet-bottom leaflet-right" style={{ marginBottom: '20px', marginRight: '10px', pointerEvents: 'auto', zIndex: 1000 }}>
      <div className="bg-white p-4 rounded-xl shadow-2xl border border-slate-200 w-72 animate-in slide-in-from-bottom-5">
        {isLoading ? (
            <div className="flex items-center justify-center py-4 text-slate-500 gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                <span className="text-xs font-bold">Mencari Rute...</span>
            </div>
        ) : (
            <>
                <div className="flex justify-between items-end border-b pb-3 mb-3">
                  <div>
                      <p className="text-4xl font-extrabold text-blue-600 leading-none tracking-tight">{formatTime(activeRouteInfo?.time || 0)}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wide flex items-center gap-1"><Timer size={10}/> Estimasi Waktu</p>
                  </div>
                  <div className="text-right">
                      <p className="text-xl font-bold text-slate-700 leading-none">{formatDistance(activeRouteInfo?.distance || 0)}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wide flex items-center justify-end gap-1"><MapPin size={10}/> Jarak</p>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded mb-3 border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Alternatif</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${totalRoutesFound > 1 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{totalRoutesFound} Jalur Ditemukan</span>
                </div>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
                    {[
                        {id: 'driving-car', label: 'MOBIL', icon: Car},
                        {id: 'cycling-regular', label: 'MOTOR', icon: Bike},
                        {id: 'foot-walking', label: 'KAKI', icon: Footprints}
                    ].map(m => (
                        <button key={m.id} onClick={() => setTransportMode(m.id)} className={`flex flex-col items-center justify-center py-2 rounded-md text-[10px] font-bold transition-all ${transportMode === m.id ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600'}`}>
                            <m.icon size={18} className="mb-1"/> {m.label}
                        </button>
                    ))}
                </div>
                {transportMode === 'cycling-regular' && (
                    <div className="mt-2 flex gap-2 items-start bg-orange-50 p-2 rounded border border-orange-100">
                        <Info size={14} className="text-orange-500 shrink-0 mt-0.5"/>
                        <p className="text-[9px] text-orange-700 leading-tight">Mode Motor menggunakan jalur sepeda (jalan tikus). Waktu dikalibrasi (3x lebih cepat dari sepeda).</p>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
};
export default RoutingMachine;