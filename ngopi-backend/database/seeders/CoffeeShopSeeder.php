<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoffeeShopSeeder extends Seeder
{
    public function run(): void
    {
        $shops = [
            ['nama' => 'Sinar Heritage', 'kecamatan' => 'Kambu', 'alamat' => 'Jl. Martandu', 'latitude' => -4.011180276, 'longitude' => 122.5349, 'harga' => 25000, 'rating' => 3.8, 'gambar' => 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=80'],
            ['nama' => 'Eroko Coffee', 'kecamatan' => 'Kambu', 'alamat' => 'Jl. Prof. Dr. Abdurrauf Tarimana', 'latitude' => -4.012296399, 'longitude' => 122.5309, 'harga' => 13000, 'rating' => 5.0, 'gambar' => 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80'],
            ['nama' => 'Beryl coffee & chill', 'kecamatan' => 'Kambu', 'alamat' => 'Jl. Prof. Dr. Abdurrauf Tarimana', 'latitude' => -4.002768526, 'longitude' => 122.5277, 'harga' => 17000, 'rating' => 3.3, 'gambar' => 'https://images.unsplash.com/photo-1507133750069-b6d338dd0974?w=500&q=80'],
            ['nama' => 'Degan Coffee & Studio', 'kecamatan' => 'Baruga', 'alamat' => 'Lrg. Daeng Manabba', 'latitude' => -4.021413817, 'longitude' => 122.5123, 'harga' => 25000, 'rating' => 4.2, 'gambar' => 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&q=80'],
            ['nama' => 'Rumpang coffee & space', 'kecamatan' => 'Kambu', 'alamat' => 'Jl. Jenderal M.t. Haryono', 'latitude' => -3.994899218, 'longitude' => 122.5147, 'harga' => 25000, 'rating' => 5.5, 'gambar' => 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80'],
            ['nama' => 'Treecoffee', 'kecamatan' => 'Mandonga', 'alamat' => 'Jl. Buburanda', 'latitude' => -3.977265629, 'longitude' => 122.5267, 'harga' => 25000, 'rating' => 4.8, 'gambar' => 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=500&q=80'],
            ['nama' => 'Manual Coffee Kendari', 'kecamatan' => 'Mandonga', 'alamat' => 'Jl. Buburanda', 'latitude' => -3.97731525, 'longitude' => 122.5269, 'harga' => 25000, 'rating' => 4.7, 'gambar' => 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=500&q=80'],
            ['nama' => 'D\'BATAS KOTA CAFE', 'kecamatan' => 'Baruga', 'alamat' => 'Jl. Poros Bandara Halu Oleo', 'latitude' => -4.036686014, 'longitude' => 122.4725, 'harga' => 15000, 'rating' => 4.5, 'gambar' => 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500&q=80'],
            ['nama' => 'Konoki cafe', 'kecamatan' => 'Baruga', 'alamat' => 'Jl. Brigjen Katamso', 'latitude' => -4.038502576, 'longitude' => 122.4946, 'harga' => 25000, 'rating' => 4.6, 'gambar' => 'https://images.unsplash.com/photo-1442512595331-e89e7385a861?w=500&q=80'],
            ['nama' => 'MERONA COFFEE', 'kecamatan' => 'Wua-Wua', 'alamat' => 'Jl. Chairil Anwar', 'latitude' => -3.976861246, 'longitude' => 122.4909, 'harga' => 20000, 'rating' => 5.0, 'gambar' => 'https://images.unsplash.com/photo-1507914372368-b2b085b925a1?w=500&q=80'],
        ];

        foreach ($shops as $shop) {
            DB::table('coffee_shops')->insert(array_merge($shop, ['created_at' => now(), 'updated_at' => now()]));
        }
    }
}