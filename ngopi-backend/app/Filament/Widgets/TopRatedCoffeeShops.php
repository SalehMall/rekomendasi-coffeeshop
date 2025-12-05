<?php

namespace App\Filament\Widgets;

use App\Models\CoffeeShop;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class TopRatedCoffeeShops extends BaseWidget
{
    protected static ?int $sort = 4;
    protected int | string | array $columnSpan = [
        'default' => 12,
        'sm' => 12,
        'md' => 6,
        'lg' => 6,
        'xl' => 6,
    ];

    public function table(Table $table): Table
    {
        return $table
            ->heading('⭐ Top 5 Kafe Rating Tertinggi')
            ->description('Kafe dengan ulasan terbaik dari pengunjung')
            ->query(
                CoffeeShop::query()
                    ->orderBy('rating', 'desc')
                    ->limit(5)
            )
            ->columns([
                Tables\Columns\ImageColumn::make('gambar')
                    ->circular()
                    ->size(50)
                    ->label(''),
                Tables\Columns\TextColumn::make('nama')
                    ->searchable()
                    ->weight('bold')
                    ->size('sm')
                    ->label('Nama Kafe')
                    ->limit(30)
                    ->wrap(),
                Tables\Columns\TextColumn::make('kecamatan')
                    ->badge()
                    ->color('success')
                    ->icon('heroicon-m-map-pin')
                    ->size('sm')
                    ->label('Lokasi'),
                Tables\Columns\TextColumn::make('rating')
                    ->icon('heroicon-m-star')
                    ->color('warning')
                    ->weight('bold')
                    ->size('md')
                    ->label('Rating')
                    ->suffix('/10'),
                Tables\Columns\TextColumn::make('harga')
                    ->money('IDR')
                    ->color('gray')
                    ->size('sm')
                    ->label('Harga'),
            ])
            ->paginated(false);
    }
}
