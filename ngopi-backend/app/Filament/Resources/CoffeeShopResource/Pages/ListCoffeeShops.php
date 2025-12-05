<?php

namespace App\Filament\Resources\CoffeeShopResource\Pages;

use App\Filament\Resources\CoffeeShopResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCoffeeShops extends ListRecords
{
    protected static string $resource = CoffeeShopResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
