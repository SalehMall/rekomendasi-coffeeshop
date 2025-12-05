<?php

namespace App\Filament\Widgets;

use App\Models\CoffeeShop; // PENTING: Panggil Model Database
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?string $pollingInterval = '15s';
    protected static ?int $sort = 1;
    protected int | string | array $columnSpan = 'full';

    protected function getStats(): array
    {
        $totalKafe = CoffeeShop::count();
        $rataHarga = CoffeeShop::avg('harga');
        $ratingTertinggi = CoffeeShop::max('rating');
        $ratingTerendah = CoffeeShop::min('rating');
        $rataRating = CoffeeShop::avg('rating');
        
        $kecamatanTerbanyak = CoffeeShop::selectRaw('kecamatan, COUNT(*) as total')
            ->groupBy('kecamatan')
            ->orderBy('total', 'desc')
            ->first();
        
        $kafeBaruBulanIni = CoffeeShop::whereMonth('created_at', now()->month)->count();
        $pertumbuhanPersen = $totalKafe > 0 ? round(($kafeBaruBulanIni / $totalKafe) * 100, 1) : 0;

        return [
            Stat::make('Total Kafe Terdaftar', $totalKafe)
                ->description($kafeBaruBulanIni > 0 ? "+{$kafeBaruBulanIni} baru bulan ini" : 'Tidak ada penambahan bulan ini')
                ->descriptionIcon($kafeBaruBulanIni > 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-minus')
                ->color('success')
                ->chart([5, 7, 9, 11, 14, 16, $totalKafe])
                ->icon('heroicon-o-building-storefront'),

            Stat::make('Rata-rata Harga Kafe', 'Rp ' . number_format($rataHarga, 0, ',', '.'))
                ->description('Estimasi biaya per orang')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color('warning')
                ->icon('heroicon-o-banknotes'),

            Stat::make('Rating Kafe', number_format($rataRating, 1) . '/10')
                ->description("Tertinggi {$ratingTertinggi} · Terendah {$ratingTerendah}")
                ->descriptionIcon('heroicon-m-sparkles')
                ->color('primary')
                ->chart([3.5, 4.0, 4.2, 4.5, 4.7, 4.8, $rataRating])
                ->icon('heroicon-o-star'),

            Stat::make('Area Terpopuler', $kecamatanTerbanyak?->kecamatan ?? 'Belum ada data')
                ->description($kecamatanTerbanyak ? "{$kecamatanTerbanyak->total} kafe tersebar di area ini" : 'Tambahkan kafe untuk melihat data')
                ->descriptionIcon('heroicon-m-map')
                ->color('info')
                ->icon('heroicon-o-map-pin'),
        ];
    }
}