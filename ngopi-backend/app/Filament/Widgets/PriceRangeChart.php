<?php

namespace App\Filament\Widgets;

use App\Models\CoffeeShop;
use Filament\Widgets\ChartWidget;

class PriceRangeChart extends ChartWidget
{
    protected static ?string $heading = '💰 Kategori Harga Kafe';
    protected static ?string $description = 'Distribusi kafe berdasarkan range harga';
    protected static ?int $sort = 3;
    protected int | string | array $columnSpan = [
        'default' => 12,
        'sm' => 12,
        'md' => 6,
        'lg' => 6,
        'xl' => 6,
    ];
    
    protected static ?string $maxHeight = '280px';

    protected function getData(): array
    {
        $shops = CoffeeShop::orderBy('harga')->get();

        $ranges = [
            '< 20k' => 0,
            '20k - 40k' => 0,
            '40k - 60k' => 0,
            '60k - 80k' => 0,
            '> 80k' => 0,
        ];

        foreach ($shops as $shop) {
            if ($shop->harga < 20000) {
                $ranges['< 20k']++;
            } elseif ($shop->harga < 40000) {
                $ranges['20k - 40k']++;
            } elseif ($shop->harga < 60000) {
                $ranges['40k - 60k']++;
            } elseif ($shop->harga < 80000) {
                $ranges['60k - 80k']++;
            } else {
                $ranges['> 80k']++;
            }
        }

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Kafe',
                    'data' => array_values($ranges),
                    'backgroundColor' => [
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(251, 146, 60, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                    ],
                    'borderColor' => [
                        'rgb(34, 197, 94)',
                        'rgb(59, 130, 246)',
                        'rgb(251, 146, 60)',
                        'rgb(239, 68, 68)',
                        'rgb(168, 85, 247)',
                    ],
                    'borderWidth' => 2,
                    'borderRadius' => 8,
                ],
            ],
            'labels' => array_keys($ranges),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
