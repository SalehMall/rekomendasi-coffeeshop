# ☕ Sistem Rekomendasi Coffee Shop

**Sistem Rekomendasi Coffee Shop** adalah aplikasi berbasis web yang dirancang untuk membantu pengguna menemukan tempat ngopi terbaik sesuai preferensi mereka. Aplikasi ini dibangun dengan arsitektur **Fullstack Modern** yang memisahkan antara tampilan (Frontend) dan logika server (Backend).

---

## 🏗️ Arsitektur Sistem

Sistem ini menggunakan pola **Decoupled Architecture**, di mana Frontend dan Backend berdiri sendiri-sendiri dan berkomunikasi melalui **REST API**.

### 1. Tampilan Depan (Frontend)
Bagian ini bertanggung jawab atas interaksi pengguna. Dibangun menggunakan teknologi modern untuk menjamin kecepatan dan kenyamanan visual.

*   **Teknologi:** ReactJS (Vite)
*   **Desain (Styling):** Tailwind CSS
*   **Penjelasan:**
    *   Antarmuka dibangun dengan **ReactJS** untuk menciptakan pengalaman pengguna yang mulus (Single Page Application).
    *   Desain visual menggunakan **Tailwind CSS**, memungkinkan pembuatan tata letak yang *clean*, modern, dan responsif (otomatis menyesuaikan layar HP atau Laptop) tanpa penulisan CSS manual yang berat.
    *   Frontend bertugas mengambil data (JSON) dari Backend dan merendernya menjadi kartu visual yang menarik.

### 2. Sistem Belakang Layar (Backend)
Bagian ini bertindak sebagai "otak" dari aplikasi, menangani pengolahan data, logika bisnis, dan keamanan.

*   **Teknologi:** Laravel (PHP Framework)
*   **Database:** MySQL
*   **Penjelasan:**
    *   **Laravel** berfungsi sebagai penyedia layanan API (API Provider). Backend tidak mengurusi HTML/CSS, melainkan hanya mengirimkan data mentah.
    *   Mengelola seluruh logika database: menyimpan data coffee shop, menghitung rata-rata rating, dan menyimpan ulasan pengguna.
    *   Menangani keamanan akses data dan otentikasi user.

---
## ✨ Fitur Unggulan

*   **☕ Katalog Kafe Interaktif**  
    Menampilkan daftar kurasi coffee shop dengan antarmuka visual (thumbnail), identitas tempat, dan estimasi harga rata-rata yang informatif.

*   **🏢 Detail Fasilitas Terpadu**  
    Menyajikan informasi mendalam terkait penunjang kenyamanan pengunjung, mencakup ketersediaan WiFi, AC, *Smoking Area*, hingga akses parkir.

*   **⭐ Sistem Ulasan & Rating**  
    Fitur interaktif yang memungkinkan pengguna memberikan penilaian bintang dan ulasan tertulis berbasis pengalaman nyata.

*   **🔍 Pencarian & Filter Cerdas**  
    Mekanisme pencarian responsif yang memudahkan pengguna menemukan kafe spesifik atau memfilter berdasarkan kebutuhan dengan cepat.
