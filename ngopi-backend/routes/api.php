<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ShopController;

// Route ini otomatis punya awalan "/api"
Route::get('/shops', [ShopController::class, 'index']);