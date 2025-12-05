<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CoffeeShopResource\Pages;
use App\Models\CoffeeShop;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CoffeeShopResource extends Resource
{
    protected static ?string $model = CoffeeShop::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-storefront';
    
    protected static ?string $navigationLabel = 'Data Kafe';
    protected static ?string $pluralModelLabel = 'Data Kafe';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('nama')
                    ->required()
                    ->label('Nama Kafe'),

                Forms\Components\Select::make('kecamatan')
                    ->options([
                        'Kambu' => 'Kambu',
                        'Baruga' => 'Baruga',
                        'Mandonga' => 'Mandonga',
                        'Wua-Wua' => 'Wua-Wua',
                        'Kadia' => 'Kadia',
                        'Poasia' => 'Poasia',
                    ])->required(),

                Forms\Components\TextInput::make('harga')
                    ->required()
                    ->numeric()
                    ->prefix('Rp')
                    ->label('Harga Rata-rata'),

                Forms\Components\TextInput::make('rating')
                    ->required()
                    ->numeric()
                    ->step(0.1)
                    ->maxValue(10),

                Forms\Components\Grid::make(2)
                    ->schema([
                        Forms\Components\TextInput::make('latitude')->required()->numeric(),
                        Forms\Components\TextInput::make('longitude')->required()->numeric(),
                    ]),

                Forms\Components\Textarea::make('alamat')
                    ->required()
                    ->columnSpanFull(),

                Forms\Components\FileUpload::make('gambar')
                    ->image()
                    ->directory('shops')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('gambar')->circular(),
                Tables\Columns\TextColumn::make('nama')->searchable()->weight('bold'),
                Tables\Columns\TextColumn::make('kecamatan')->sortable()->badge(),
                Tables\Columns\TextColumn::make('harga')->money('IDR'),
                Tables\Columns\TextColumn::make('rating')->icon('heroicon-m-star')->color('warning'),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCoffeeShops::route('/'),
            'create' => Pages\CreateCoffeeShop::route('/create'),
            'edit' => Pages\EditCoffeeShop::route('/{record}/edit'),
        ];
    }
}