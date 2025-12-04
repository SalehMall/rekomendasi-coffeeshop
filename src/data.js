// Lokasi: src/data.js

const rawData = [
  // Data ini telah diverifikasi ulang dengan Google Maps per November 2025
  { "id": 1, "name": "momoyo", "district": "Mandonga", "address": "Jl. Malik Raya No.45, Korumba", "latitude": -3.966673852196607, "longitude": 122.48632250652474, "rating": 4.6, "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=500&auto=format&fit=crop" },
  { "id": 2, "name": "froze", "district": "Mandonga", "address": "Jl. Edi Sabara No.30 (By Pass)", "latitude": -3.9654751261230414, "longitude": 122.4779111123861, "rating": 4.7, "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500&auto=format&fit=crop" },
  { "id": 3, "name": "Filosofi Kopi Kendari", "district": "Mandonga", "address": "Jl. Edi Sabara, Lahundape", "latitude": -3.9731327207463107, "longitude": 122.48496222569148, "rating": 4.5, "image": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=500&auto=format&fit=crop" },
  { "id": 4, "name": "Tuantana Coffee", "district": "Kadia", "address": "Jl. Pasaeno No.1, Bende", "latitude": -3.984511, "longitude": 122.516890, "rating": 4.5, "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=500&auto=format&fit=crop" },
  { "id": 5, "name": "Rich-O Donuts & Coffee", "district": "Kadia", "address": "Jl. Sao-Sao No.189, Bende", "latitude": -3.982440, "longitude": 122.522150, "rating": 4.6, "image": "https://images.unsplash.com/photo-1507133750069-b6d338dd0974?q=80&w=500&auto=format&fit=crop" },
  { "id": 6, "name": "Mise Coffee", "district": "Poasia", "address": "Citraland Kendari, Anduonohu", "latitude": -4.006120, "longitude": 122.542310, "rating": 4.8, "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=500&auto=format&fit=crop" },
  { "id": 7, "name": "Dua Sisi Coffee (2SIS)", "district": "Baruga", "address": "Jl. Kapten Piere Tendean, Baruga", "latitude": -4.018220, "longitude": 122.486750, "rating": 4.4, "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=500&auto=format&fit=crop" },
  { "id": 8, "name": "Dialog Coffee", "district": "Wua-Wua", "address": "Jl. Sorumba No.12, Wua-Wua", "latitude": -3.998200, "longitude": 122.512500, "rating": 4.6, "image": "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=500&auto=format&fit=crop" },
  { "id": 9, "name": "X.O Coffee", "district": "Kambu", "address": "Jl. MT Haryono No.102, Lalolara", "latitude": -3.998550, "longitude": 122.518220, "rating": 4.3, "image": "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=500&auto=format&fit=crop" },
  { "id": 10, "name": "Fore Coffee - The Park", "district": "Kadia", "address": "The Park Kendari, Jl. Brigjen M. Yoenoes", "latitude": -3.992500, "longitude": 122.515200, "rating": 4.7, "image": "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=500&auto=format&fit=crop" },
  { "id": 11, "name": "Kopi Goolla", "district": "Mandonga", "address": "Jl. Made Sabara, Korumba", "latitude": -3.965580, "longitude": 122.524810, "rating": 4.4, "image": "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=500&auto=format&fit=crop" },
  { "id": 12, "name": "Early 10.2", "district": "Kadia", "address": "Jl. Antero Hamra, Bende", "latitude": -3.981250, "longitude": 122.506540, "rating": 4.3, "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500&auto=format&fit=crop" },
  { "id": 13, "name": "Kopi Daeng", "district": "Wua-Wua", "address": "Jl. Ir. H. Alala, Wua-Wua", "latitude": -3.995050, "longitude": 122.508010, "rating": 4.4, "image": "https://images.unsplash.com/photo-1442512595331-e89e7385a861?q=80&w=500&auto=format&fit=crop" },
  { "id": 14, "name": "Janji Jiwa (Jilid Sao-Sao)", "district": "Kadia", "address": "Jl. Sao-Sao, Bende", "latitude": -3.981560, "longitude": 122.522540, "rating": 4.4, "image": "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?q=80&w=500&auto=format&fit=crop" },
  { "id": 15, "name": "Sempatkan Coffee", "district": "Mandonga", "address": "Jl. H. Supu Yusuf, Korumba", "latitude": -3.970510, "longitude": 122.521080, "rating": 4.5, "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop" },
  { "id": 16, "name": "Kopi 41", "district": "Kadia", "address": "Jl. Sao-Sao No. 222, Bende", "latitude": -3.983100, "longitude": 122.522900, "rating": 4.3, "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=500&auto=format&fit=crop" },
  { "id": 17, "name": "Warkop Haji Anto", "district": "Mandonga", "address": "Jl. Made Sabara No.9, Korumba", "latitude": -3.965820, "longitude": 122.525230, "rating": 4.5, "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500&auto=format&fit=crop" },
  { "id": 18, "name": "Arome Coffee", "district": "Mandonga", "address": "Jl. Buburanda, Korumba", "latitude": -3.973500, "longitude": 122.526800, "rating": 4.6, "image": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=500&auto=format&fit=crop" },
  { "id": 19, "name": "Sanctuary Coffee", "district": "Kadia", "address": "Jl. Jend. Ahmad Yani No.117, Anaiwoi", "latitude": -3.974550, "longitude": 122.510520, "rating": 4.4, "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=500&auto=format&fit=crop" },
  { "id": 20, "name": "Tropical Point", "district": "Mandonga", "address": "Jl. H. Supu Yusuf No.18, Korumba", "latitude": -3.971200, "longitude": 122.520800, "rating": 4.2, "image": "https://images.unsplash.com/photo-1507133750069-b6d338dd0974?q=80&w=500&auto=format&fit=crop" },
  { "id": 21, "name": "Kopi Wayong", "district": "Kadia", "address": "Jl. Wayong, Pondokambea", "latitude": -3.990210, "longitude": 122.501550, "rating": 4.5, "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=500&auto=format&fit=crop" },
  { "id": 22, "name": "Anakia Coffee", "district": "Wua-Wua", "address": "Jl. Ahmad Yani, Wua-Wua", "latitude": -3.992800, "longitude": 122.509100, "rating": 4.2, "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=500&auto=format&fit=crop" },
  { "id": 23, "name": "Rood Food & Coffee", "district": "Kambu", "address": "Jl. MT Haryono, Lalolara", "latitude": -3.999100, "longitude": 122.519500, "rating": 4.5, "image": "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=500&auto=format&fit=crop" },
  { "id": 24, "name": "Kopi Kenangan - Lippo", "district": "Kambu", "address": "Lippo Plaza Kendari, Lt. Dasar", "latitude": -3.999500, "longitude": 122.519800, "rating": 4.6, "image": "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=500&auto=format&fit=crop" },
  { "id": 25, "name": "Point Coffee (Indomaret Laode Hadi)", "district": "Wua-Wua", "address": "Jl. Laode Hadi (By Pass)", "latitude": -3.997500, "longitude": 122.513000, "rating": 4.5, "image": "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=500&auto=format&fit=crop" },
  { "id": 26, "name": "Faffeine Coffee", "district": "Kadia", "address": "Jl. Antero Hamra No. 12", "latitude": -3.980500, "longitude": 122.507200, "rating": 4.3, "image": "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=500&auto=format&fit=crop" },
  { "id": 27, "name": "Excelso Coffee", "district": "Mandonga", "address": "Claro Hotel Kendari, Jl. Edi Sabara", "latitude": -3.968000, "longitude": 122.531500, "rating": 4.6, "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500&auto=format&fit=crop" },
  { "id": 28, "name": "Kopi Senja", "district": "Poasia", "address": "Jl. H.E.A Mokodompit (Depan Kampus UHO)", "latitude": -4.008500, "longitude": 122.525500, "rating": 4.2, "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop" },
  { "id": 29, "name": "Kopi Kalima", "district": "Kadia", "address": "Jl. Wua-Wua No. 5", "latitude": -3.985500, "longitude": 122.518000, "rating": 4.3, "image": "https://images.unsplash.com/photo-1442512595331-e89e7385a861?q=80&w=500&auto=format&fit=crop" },
  { "id": 30, "name": "Maxx Coffee", "district": "Kambu", "address": "Lippo Plaza Kendari", "latitude": -3.999600, "longitude": 122.519900, "rating": 4.4, "image": "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?q=80&w=500&auto=format&fit=crop" }
];

// Transformasi data agar cocok dengan struktur yang sudah ada di App.jsx
export const coffeeShops = rawData.map(shop => ({
  id: shop.id,
  name: shop.name,
  category: shop.district,
  // Harga acak (simulasi) karena tidak ada di data asli
  price: Math.floor(Math.random() * (45 - 10 + 1) + 10) * 1000,
  rating: shop.rating,
  lat: shop.latitude,
  lng: shop.longitude,
  address: shop.address,
  image: shop.image
}));