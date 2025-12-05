<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CoffeeShop;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index()
    {
        $shops = CoffeeShop::all()->map(function($shop) {
            return [
                'id' => $shop->id,
                'name' => $shop->nama,           // Mapping nama -> name
                'category' => $shop->kecamatan,  // Mapping kecamatan -> category
                'price' => $shop->harga,
                'rating' => (float) $shop->rating,
                'lat' => (float) $shop->latitude,
                'lng' => (float) $shop->longitude,
                'address' => $shop->alamat,
                'image' => str_contains($shop->gambar, 'http') ? $shop->gambar : asset('storage/' . $shop->gambar) 
            ];
        });
        return response()->json($shops);
    }
}