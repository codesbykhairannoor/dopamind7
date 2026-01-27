<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FinanceTransactionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => (string) $this->title,
            'amount' => (float) $this->amount, // Pastikan jadi angka, bukan string
            'type' => (string) $this->type, // 'income' atau 'expense'
            'category' => (string) $this->category,
            'date' => $this->date->format('Y-m-d'), // Format tanggal standar ISO
            'notes' => (string) $this->notes,
            'created_at_human' => $this->created_at->diffForHumans(), // Bonus buat UI
        ];
    }
}