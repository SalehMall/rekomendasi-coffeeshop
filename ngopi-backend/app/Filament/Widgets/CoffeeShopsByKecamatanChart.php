<?php

namespace App\Filament\Widgets;

use App\Models\CoffeeShop;
use Filament\Widgets\ChartWidget;

class CoffeeShopsByKecamatanChart extends ChartWidget
{
    protected static ?string $heading = '📍 Sebaran Kafe per Wilayah';
    protected static ?string $description = 'Distribusi kafe berdasarkan kecamatan';
    protected static ?int $sort = 2;
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
        $kecamatanData = CoffeeShop::selectRaw('kecamatan, COUNT(*) as total')
            ->groupBy('kecamatan')
            ->orderBy('total', 'desc')
            ->pluck('total', 'kecamatan');

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Kafe',
                    'data' => $kecamatanData->values()->toArray(),
                    'backgroundColor' => [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(251, 146, 60, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(250, 204, 21, 0.8)',
                    ],
                    'borderColor' => [
                        'rgb(59, 130, 246)',
                        'rgb(34, 197, 94)',
                        'rgb(251, 146, 60)',
                        'rgb(168, 85, 247)',
                        'rgb(236, 72, 153)',
                        'rgb(250, 204, 21)',
                    ],
                    'borderWidth' => 2,
                ],
            ],
            'labels' => $kecamatanData->keys()->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
