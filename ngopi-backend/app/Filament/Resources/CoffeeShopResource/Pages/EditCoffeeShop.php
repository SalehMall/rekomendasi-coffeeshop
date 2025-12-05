<?php

namespace App\Filament\Resources\CoffeeShopResource\Pages;

use App\Filament\Resources\CoffeeShopResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCoffeeShop extends EditRecord
{
    protected static string $resource = CoffeeShopResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
