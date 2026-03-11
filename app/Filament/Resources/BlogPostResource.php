<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogPost;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;

class BlogPostResource extends Resource
{
    protected static ?string  = BlogPost::class;

    protected static ?string  = 'heroicon-o-document-text';

    protected static ?string  = 'Content Management';

    protected static ?string  = 'title';

    public static function form(Form ): Form
    {
        return 
            ->schema([
                Forms\Components\Grid::make(3)
                    ->schema([
                        Forms\Components\Group::make()
                            ->schema([
                                Forms\Components\Tabs::make('Post Details')
                                    ->tabs([
                                        Forms\Components\Tabs\Tab::make('Content')
                                            ->icon('heroicon-m-document-text')
                                            ->schema([
                                                Forms\Components\TextInput::make('title')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->live(onBlur: true)
                                                    ->afterStateUpdated(fn (Forms\Set , ?string ) => ('slug', Str::slug())),
                                                
                                                Forms\Components\TextInput::make('slug')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->unique(ignoreRecord: true)
                                                    ->hint('URL path of the post'),

                                                Forms\Components\RichEditor::make('content')
                                                    ->required()
                                                    ->columnSpanFull()
                                                    ->fileAttachmentsDirectory('blog-content'),

                                                Forms\Components\Textarea::make('excerpt')
                                                    ->rows(3)
                                                    ->maxLength(65535)
                                                    ->columnSpanFull()
                                                    ->helperText('Short summary for listing pages'),
                                            ]),

                                        Forms\Components\Tabs\Tab::make('SEO')
                                            ->icon('heroicon-m-magnifying-glass')
                                            ->schema([
                                                Forms\Components\TextInput::make('meta_title')
                                                    ->maxLength(255)
                                                    ->placeholder('Keep it under 60 characters'),
                                                
                                                Forms\Components\Textarea::make('meta_description')
                                                    ->maxLength(65535)
                                                    ->placeholder('Keep it under 160 characters'),
                                                
                                                Forms\Components\TextInput::make('meta_keywords')
                                                    ->maxLength(255)
                                                    ->placeholder('comma, separated, keywords'),
                                            ]),

                                        Forms\Components\Tabs\Tab::make('Location')
                                            ->icon('heroicon-m-map-pin')
                                            ->schema([
                                                Forms\Components\TextInput::make('location_name')
                                                    ->maxLength(255),
                                                Forms\Components\Grid::make(2)
                                                    ->schema([
                                                        Forms\Components\TextInput::make('latitude')
                                                            ->numeric()
                                                            ->step(0.00000001),
                                                        Forms\Components\TextInput::make('longitude')
                                                            ->numeric()
                                                            ->step(0.00000001),
                                                    ]),
                                            ]),
                                    ]),
                            ])
                            ->columnSpan(['lg' => 2]),

                        Forms\Components\Group::make()
                            ->schema([
                                Forms\Components\Section::make('Status & Visibility')
                                    ->schema([
                                        Forms\Components\Select::make('status')
                                            ->options([
                                                'draft' => 'Draft',
                                                'published' => 'Published',
                                            ])
                                            ->default('draft')
                                            ->required()
                                            ->native(false),

                                        Forms\Components\DateTimePicker::make('published_at')
                                            ->placeholder('Optional (current time if published)'),
                                    ]),

                                Forms\Components\Section::make('Featured Image')
                                    ->schema([
                                        Forms\Components\FileUpload::make('featured_image')
                                            ->image()
                                            ->imageEditor()
                                            ->directory('blog-images')
                                            ->maxSize(2048),
                                    ]),
                            ])
                            ->columnSpan(['lg' => 1]),
                    ]),
            ]);
    }

    public static function table(Table ): Table
    {
        return 
            ->columns([
                Tables\Columns\ImageColumn::make('featured_image')
                    ->circular(),
                
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->wrap(),
                
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string ): string => match () {
                        'draft' => 'gray',
                        'published' => 'success',
                        default => 'gray',
                    })
                    ->sortable(),

                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable()
                    ->description(fn (BlogPost ): string => ->published_at ? ->published_at->diffForHumans() : ''),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ]),
                Tables\Filters\Filter::make('published_at')
                    ->form([
                        Forms\Components\DatePicker::make('published_from'),
                        Forms\Components\DatePicker::make('published_until'),
                    ])
                    ->query(function (Builder , array ): Builder {
                        return 
                            ->when(
                                ['published_from'],
                                fn (Builder , ): Builder => ->whereDate('published_at', '>=', ),
                            )
                            ->when(
                                ['published_until'],
                                fn (Builder , ): Builder => ->whereDate('published_at', '<=', ),
                            );
                    })
            ])
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
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit' => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }
}
