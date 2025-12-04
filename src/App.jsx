import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom"; 
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Coffee, MapPin, DollarSign, Star, Search, Timer, X, Map, Satellite, Mountain, Menu, List } from "lucide-react";

// Import komponen Routing
import RoutingMachine from "./RoutingMachine";

// --- CUSTOM ICONS ---
const coffeeIcon = L.divIcon({
  html: `
    <div style="background-color: #ea580c; padding: 6px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.3);">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg);">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
        <line x1="6" y1="2" x2="6" y2="4"></line>
        <line x1="10" y1="2" x2="10" y2="4"></line>
        <line x1="14" y1="2" x2="14" y2="4"></line>
      </svg>
    </div>
  `,
  className: '', 
  iconSize: [36, 36],
  iconAnchor: [18, 18], 
  popupAnchor: [0, -20] 
});

const userIcon = L.divIcon({
  html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg pulse-marker"></div>`,
  className: '', iconSize: [16, 16], iconAnchor: [8, 8],
});

// Helper: Hitung Jarak
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; 
  const φ1 = lat1 * Math.PI/180, φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180, Δλ = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const tileLayers = {
  street: { name: "Street", url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", attribution: '&copy; OpenStreetMap', icon: Map },
  satellite: { name: "Satellite", url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", attribution: 'Tiles &copy; Esri', icon: Satellite },
  topo: { name: "Topografi", url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", attribution: 'Map data: &copy; OpenTopoMap', icon: Mountain }
};

function App() {
  const defaultCenter = [-3.992500, 122.515200];
  const [userLocation, setUserLocation] = useState(defaultCenter);
  const [shopsWithRoutes, setShopsWithRoutes] = useState([]);
  const [filter, setFilter] = useState("nearest");
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLayer, setActiveLayer] = useState('street');
  
  // STATE BARU: Untuk kontrol Sidebar di Mobile
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const markerRefs = useRef({});
  const location = useLocation();

  // 1. Fetch Data
  useEffect(() => {
    const fetchDataAndLocation = async (userLat, userLng) => {
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/shops');
        if (!response.ok) throw new Error("Gagal koneksi ke API");
        const apiData = await response.json();

        const shopsWithData = apiData.map((shop) => {
           const dist = calculateHaversineDistance(userLat, userLng, shop.lat, shop.lng);
           return { ...shop, travelDistance: dist, travelTime: null };
        });
        
        setShopsWithRoutes(shopsWithData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => { 
        const { latitude, longitude } = position.coords;
        const newLocation = [latitude, longitude];
        setUserLocation(newLocation); 
        fetchDataAndLocation(latitude, longitude); 
      }, 
      () => { fetchDataAndLocation(defaultCenter[0], defaultCenter[1]); }, 
      { timeout: 8000 } 
    );
  }, []);

  // 2. Logic Tangkap ID dari Landing Page
  useEffect(() => {
    if (location.state && location.state.shopId && shopsWithRoutes.length > 0) {
      const targetShop = shopsWithRoutes.find(s => s.id === location.state.shopId);
      if (targetShop) {
        setDestination(targetShop);
        window.history.replaceState({}, document.title); 
      }
    }
  }, [location, shopsWithRoutes]);

  const filteredAndSortedShops = useMemo(() => {
    let result = [...shopsWithRoutes];
    if (search) result = result.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));
    if (filter === "nearest") result.sort((a, b) => a.travelDistance - b.travelDistance);
    else if (filter === "cheapest") result.sort((a, b) => a.price - b.price);
    else if (filter === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [shopsWithRoutes, search, filter]);
  
  // 3. Auto Open Popup & Tutup Sidebar (Mobile)
  useEffect(() => {
    if (destination) {
      // Tutup sidebar jika di mobile agar peta terlihat
      setSidebarOpen(false); 
      
      if (markerRefs.current[destination.id]) {
        markerRefs.current[destination.id].openPopup(); 
      }
    }
  }, [destination]);

  const formatDistance = (meters) => meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(1)} km`;

  return (
    <div className="flex h-screen font-sans antialiased text-slate-800 bg-slate-50 relative overflow-hidden">
      
      {/* --- MOBILE OVERLAY (Backdrop gelap saat sidebar buka) --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* --- SIDEBAR RESPONSIVE --- */}
      <aside 
        className={`
          fixed md:relative z-40 h-full w-[85%] md:w-[400px] bg-white shadow-2xl md:shadow-none border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Tombol Close Sidebar (Hanya Mobile) */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200"
        >
          <X size={20} />
        </button>

        <header className="p-5 border-b border-slate-100 shrink-0 bg-white">
          <h1 className="text-2xl font-extrabold flex items-center gap-2 tracking-tight text-slate-800">
            <Coffee className="text-orange-600" strokeWidth={2.5} /> Ngopi<span className="font-light text-slate-500">Kendari</span>
          </h1>
          <div className="mt-4 relative group">
            <input 
              type="text" 
              placeholder="Cari kedai..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-slate-100 border-none focus:ring-2 focus:ring-orange-500 transition-all group-hover:bg-slate-50" 
              onChange={(e) => setSearch(e.target.value)} 
            />
            <Search className="absolute left-3 top-3 text-slate-400" size={18}/>
          </div>
        </header>

        <nav className="flex p-2 gap-2 bg-white border-b shrink-0 overflow-x-auto">
          {[{ key: 'nearest', label: 'Dekat', icon: Timer }, { key: 'cheapest', label: 'Murah', icon: DollarSign }, { key: 'rating', label: 'Hits', icon: Star }].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setFilter(key)} className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${filter === key ? "bg-orange-50 text-orange-600 ring-1 ring-orange-200" : "text-slate-500 hover:bg-slate-50"}`}>
              <Icon size={14} strokeWidth={2.5} /> {label}
            </button>
          ))}
        </nav>

        <main className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-200 pb-20 md:pb-3">
          {isLoading && <div className="text-center p-10 text-slate-400 text-sm animate-pulse">Memuat...</div>}
          {!isLoading && filteredAndSortedShops.map((shop) => (
            <article key={shop.id} onClick={() => setDestination(shop)} className={`flex gap-3 p-2.5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group ${destination?.id === shop.id ? "ring-2 ring-orange-500 border-transparent bg-orange-50/30" : ""}`}>
              <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden relative">
                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }} />
              </div>
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-800 leading-tight truncate pr-2">{shop.name}</h3>
                  <div className="flex items-center gap-1 text-[10px] font-bold bg-yellow-50 text-yellow-600 px-1.5 py-0.5 rounded"><Star size={10} fill="currentColor" /> {shop.rating}</div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 truncate"><MapPin size={10} /> {shop.address}</p>
                <div className="flex justify-between items-center mt-2.5">
                  <span className="text-xs font-bold text-green-600">Rp {parseInt(shop.price).toLocaleString()}</span>
                  <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1"><MoveIcon size={10}/> {formatDistance(shop.travelDistance)}</span>
                </div>
              </div>
            </article>
          ))}
        </main>
      </aside>

      {/* --- MAP SECTION --- */}
      <section className="flex-1 h-full z-10 relative">
        
        {/* TOMBOL BUKA SIDEBAR (Hanya muncul di Mobile) */}
        <button 
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 left-4 z-[400] md:hidden bg-white text-slate-700 p-3 rounded-xl shadow-lg border border-slate-200 hover:bg-orange-50 hover:text-orange-600 transition-colors"
        >
          <List size={24} strokeWidth={2.5} />
        </button>

        <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom className="h-full w-full outline-none">
          <TileLayer key={activeLayer} url={tileLayers[activeLayer].url} attribution={tileLayers[activeLayer].attribution} />
          
          <Marker position={userLocation} icon={userIcon}>
            <Popup className="custom-popup"><div className="p-3 text-center font-bold text-slate-700">Lokasi Anda</div></Popup>
          </Marker>
          
          {filteredAndSortedShops.map((shop) => (
            <Marker key={shop.id} position={[shop.lat, shop.lng]} icon={coffeeIcon} ref={(el) => { if (el) markerRefs.current[shop.id] = el; }} eventHandlers={{ click: () => setDestination(shop) }}>
              <Popup className="custom-popup" closeButton={true}>
                <div className="flex flex-col font-sans">
                  <div className="relative h-28 w-full">
                    <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0"></div>
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1"><Star size={10} className="text-orange-500 fill-orange-500"/><span className="text-[10px] font-bold text-slate-800">{shop.rating}</span></div>
                  </div>
                  <div className="p-3 bg-white">
                    <h3 className="text-sm font-bold text-slate-800 leading-tight mb-1">{shop.name}</h3>
                    <div className="flex items-start gap-1.5"><MapPin size={12} className="text-slate-400 shrink-0 mt-0.5" /><p className="text-[10px] text-slate-500 leading-snug line-clamp-2">{shop.address}</p></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {destination && <RoutingMachine userLocation={userLocation} destination={destination} />}
        </MapContainer>

        {/* Floating Layer Control */}
        <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur rounded-lg shadow-lg p-1 flex flex-col gap-1 border border-slate-200">
          {Object.entries(tileLayers).map(([key, layer]) => { 
            const Icon = layer.icon; 
            return (<button key={key} onClick={() => setActiveLayer(key)} className={`p-2 rounded-md transition-all ${activeLayer === key ? 'bg-orange-100 text-orange-600' : 'text-slate-500 hover:bg-slate-100'}`} title={layer.name}><Icon size={20} /></button>) 
          })}
        </div>

        {/* Tombol Tutup Rute */}
        {destination && (
          <button onClick={() => setDestination(null)} className="absolute bottom-8 left-4 md:left-auto md:right-4 z-[400] bg-white text-slate-700 px-4 py-2 rounded-full shadow-xl hover:bg-slate-50 font-bold text-xs flex items-center gap-2 border border-slate-200"><X size={16}/> Tutup Rute</button>
        )}
      </section>
    </div>
  );
}

function MoveIcon({ size = 16, className }) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>)
}

export default App;