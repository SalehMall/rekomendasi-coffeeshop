import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Coffee, MapPin, Navigation, Star, ArrowRight, Smartphone, Pointer, Search, CornerUpRight } from "lucide-react";

export default function LandingPage() {
  const [topShops, setTopShops] = useState([]);

  // FETCH DATA DARI LARAVEL SAAT LOAD
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/shops')
      .then(res => res.json())
      .then(data => {
        // Sort rating tertinggi, ambil 3 data
        const sorted = data.sort((a, b) => b.rating - a.rating).slice(0, 3);
        setTopShops(sorted);
      })
      .catch(err => console.error("Gagal load data landing page:", err));
  }, []);

  return (
    <div className="font-sans text-slate-800 bg-white">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="text-orange-600" strokeWidth={2.5} />
            <span className="text-xl font-extrabold tracking-tight">
              Ngopi<span className="text-slate-500 font-light">Kendari</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#fitur" className="hover:text-orange-600 transition-colors">Fitur</a>
            <a href="#lokasi" className="hover:text-orange-600 transition-colors">Lokasi Populer</a>
            <a href="#cara-pakai" className="hover:text-orange-600 transition-colors">Cara Pakai</a>
          </div>
          <Link to="/map">
            <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/20">
              Buka Peta
            </button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold mb-6 animate-fade-in-up">
              <Star size={12} fill="currentColor" /> #1 Aplikasi Pencari Kopi di Kendari
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
              Temukan <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Kopi Terbaik</span> di Dekatmu.
            </h1>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              Bingung mau nongkrong di mana? Temukan rekomendasi coffee shop terbaik di Kendari lengkap dengan rute, estimasi harga, dan ulasan jujur.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/map" className="w-full sm:w-auto">
                <button className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-700 transition-all shadow-xl hover:shadow-orange-600/30 hover:-translate-y-1">
                  Cari Kopi Sekarang <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
           <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
           <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </header>

      {/* --- FITUR SECTION --- */}
      <section id="fitur" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Kenapa NgopiKendari?</h2>
            <p className="text-slate-500 mt-2">Fitur canggih untuk pengalaman ngopi yang lebih baik.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6"><Navigation size={24} /></div>
              <h3 className="text-xl font-bold mb-3">Rute Anti Nyasar</h3>
              <p className="text-slate-500">Dapatkan rute tercepat menggunakan mobil, motor (lewat lorong), atau jalan kaki.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6"><Smartphone size={24} /></div>
              <h3 className="text-xl font-bold mb-3">Info Lengkap</h3>
              <p className="text-slate-500">Lihat foto tempat, estimasi harga, rating, dan fasilitas sebelum kamu berangkat.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-6"><MapPin size={24} /></div>
              <h3 className="text-xl font-bold mb-3">Filter Cerdas</h3>
              <p className="text-slate-500">Cari berdasarkan "Terdekat", "Termurah", atau "Rating Tertinggi" sesuai mood kamu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOKASI POPULER (DARI API) --- */}
      <section id="lokasi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Lokasi Terpopuler</h2>
              <p className="text-slate-500 mt-2">Kedai kopi yang paling sering dikunjungi minggu ini.</p>
            </div>
            <Link to="/map" className="text-orange-600 font-bold hover:underline hidden md:block">Lihat Semua ➔</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topShops.length === 0 ? (
                <div className="col-span-3 text-center text-slate-400 py-10">Memuat data populer...</div>
            ) : (
                topShops.map((shop) => (
                <div key={shop.id} className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                    <div className="h-48 overflow-hidden relative">
                    <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }} />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                        <Star size={12} className="text-orange-500 fill-orange-500" /> {shop.rating}
                    </div>
                    </div>
                    <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{shop.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mb-4">
                        <MapPin size={14} /> {shop.category}
                    </p>
                    <div className="flex justify-between items-center border-t border-slate-50 pt-4">
                        <span className="text-sm font-bold text-green-600">Rp {parseInt(shop.price).toLocaleString()}</span>
                        
                        {/* TOMBOL LIHAT RUTE (Kirim ID ke Map) */}
                        <Link to="/map" state={{ shopId: shop.id }}>
                            <button className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors">
                            Lihat Rute
                            </button>
                        </Link>
                    </div>
                    </div>
                </div>
                ))
            )}
          </div>
        </div>
      </section>

      {/* --- CARA PAKAI --- */}
      <section id="cara-pakai" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Cara Menggunakan</h2>
            <p className="text-slate-400 mt-2">3 Langkah mudah menemukan kopi favoritmu.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-all">
                <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6"><Search size={32} /></div>
                <h3 className="text-xl font-bold mb-3">1. Cari Lokasi</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Buka peta dan cari nama kedai kopi atau filter berdasarkan "Terdekat".</p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-all">
                <div className="w-16 h-16 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-6"><Pointer size={32} /></div>
                <h3 className="text-xl font-bold mb-3">2. Pilih Kedai</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Klik marker di peta untuk melihat foto, harga, dan rating tempat.</p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-all">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6"><CornerUpRight size={32} /></div>
                <h3 className="text-xl font-bold mb-3">3. Navigasi</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Lihat rute otomatis. Pilih mode motor untuk jalan tikus atau mobil.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Coffee className="text-slate-800" size={20} />
            <span className="font-bold text-slate-800">NgopiKendari</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2025 NgopiKendari. Dibuat dengan ☕ dan React.
          </p>
        </div>
      </footer>
    </div>
  );
}