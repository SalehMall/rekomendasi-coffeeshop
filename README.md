# ☕ Sistem Rekomendasi Coffee Shop

Selamat datang di repository **Sistem Rekomendasi Coffee Shop**. Aplikasi ini dirancang untuk membantu pengguna menemukan tempat ngopi terbaik berdasarkan preferensi, lokasi, dan ulasan.

Aplikasi ini dibangun menggunakan arsitektur **Monorepo** (atau terpisah antara folder `client` dan `server`) dengan teknologi modern.

## 🚀 Teknologi yang Digunakan

Proyek ini terbagi menjadi dua bagian utama:

### **Frontend (Tampilan Pengguna)**
- **ReactJS**: Library JavaScript untuk membangun antarmuka yang interaktif.
- **Tailwind CSS**: Framework CSS utility-first untuk desain yang cepat dan responsif.
- **Vite**: Build tool yang super cepat.
- **Axios**: Untuk melakukan request ke API Backend.

### **Backend (API & Server)**
- **Laravel**: Framework PHP yang powerful untuk membuat RESTful API.
- **MySQL**: Database untuk menyimpan data coffee shop, user, dan ulasan.
- **Laravel Sanctum**: Untuk otentikasi (Login/Register).

## ✨ Fitur Utama
- 🔍 **Pencarian & Filter**: Cari coffee shop berdasarkan nama, harga, atau fasilitas (WiFi, Smoking Area).
- ⭐ **Rating & Review**: Pengguna bisa memberikan ulasan.
- 🗺️ **Lokasi**: Integrasi peta (opsional/jika ada).
- 📱 **Responsif**: Tampilan nyaman di HP maupun Desktop.

## 📂 Struktur Folder
```bash
rekomendasi-coffeeshop/
├── backend/    # Kode sumber API (Laravel)
├── frontend/   # Kode sumber UI (ReactJS)
└── README.md   # File ini

📦 Cara Menjalankan Proyek
Silakan masuk ke folder masing-masing untuk melihat panduan instalasi detail:
Dokumentasi Frontend
Dokumentasi Backend
Dibuat oleh [Nama Kamu/Tim Kamu]
code
Code
---

### 2. Frontend README (Untuk Folder Frontend)
Simpan file ini di dalam folder `frontend/README.md`. Ini khusus menjelaskan cara instalasi React.

```markdown
# ☕ Frontend - Rekomendasi Coffee Shop

Bagian ini adalah antarmuka pengguna (Client-side) yang dibangun menggunakan **ReactJS** dan **Tailwind CSS**.

## 🛠️ Prasyarat
Pastikan kamu sudah menginstal:
- [Node.js](https://nodejs.org/) (Versi 16 atau lebih baru)
- NPM atau Yarn

## ⚙️ Cara Instalasi

1. **Masuk ke folder frontend:**
   ```bash
   cd frontend
Instal dependencies:
code
Bash
npm install
# atau
yarn install
Konfigurasi Environment:
Salin file .env.example menjadi .env (jika ada) dan sesuaikan URL Backend:
code
Env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
Jalankan aplikasi (Mode Development):
code
Bash
npm run dev
Akses aplikasi di http://localhost:5173.
🎨 Struktur Project React
src/components: Komponen ulang-pakai (Button, Card, Navbar).
src/pages: Halaman utama (Home, DetailShop, Login).
src/services: Konfigurasi API (Axios).
src/assets: Gambar dan icon.
💅 Tailwind CSS
Styling dilakukan menggunakan utility class. Contoh komponen tombol:
code
Jsx
<button className="bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded">
  Cari Kopi
</button>
code
Code
---

### 3. Backend README (Untuk Folder Backend)
Simpan file ini di dalam folder `backend/README.md`. Ini khusus menjelaskan cara instalasi Laravel API.

```markdown
# ☕ Backend API - Rekomendasi Coffee Shop

Bagian ini adalah server-side yang menangani logika bisnis, database, dan API endpoint menggunakan **Laravel**.

## 🛠️ Prasyarat
Pastikan kamu sudah menginstal:
- [PHP](https://www.php.net/) (Versi 8.1 atau lebih baru)
- [Composer](https://getcomposer.org/)
- [MySQL](https://www.mysql.com/)

## ⚙️ Cara Instalasi

1. **Masuk ke folder backend:**
   ```bash
   cd backend
Instal dependencies PHP:
code
Bash
composer install
Konfigurasi Environment:
Salin file .env.example menjadi .env:
code
Bash
cp .env.example .env
Buka file .env dan atur koneksi database:
code
Env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rekomendasi_coffeeshop
DB_USERNAME=root
DB_PASSWORD=
Generate Application Key:
code
Bash
php artisan key:generate
Migrasi dan Seeding Database:
Membuat tabel dan mengisi data dummy awal:
code
Bash
php artisan migrate --seed
Jalankan Server:
code
Bash
php artisan serve
API akan berjalan di http://127.0.0.1:8000.
🔌 Dokumentasi Endpoint API
Berikut adalah beberapa endpoint utama yang tersedia:
Method	Endpoint	Deskripsi
GET	/api/coffeeshops	Mendapatkan semua daftar coffee shop
GET	/api/coffeeshops/{id}	Detail coffee shop
POST	/api/login	Login user
POST	/api/register	Daftar user baru