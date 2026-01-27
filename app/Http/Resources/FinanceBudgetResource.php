<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FinanceBudgetResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Kita hitung pemakaian di sini biar Frontend/Mobile terima jadi
        // $this->spent dikirim manual dari Controller nanti (lihat Controller di bawah)
        
        $spent = $this->spent ?? 0;
        $percentage = $this->limit_amount > 0 ? round(($spent / $this->limit_amount) * 100) : 0;

        return [
            'id' => $this->id,
            'category' => (string) $this->category,
            'limit_amount' => (float) $this->limit_amount,
            'spent_amount' => (float) $spent,
            'remaining_amount' => (float) ($this->limit_amount - $spent),
            'percentage' => $percentage > 100 ? 100 : $percentage,
            'is_over_budget' => $spent > $this->limit_amount,
            'month' => $this->month,
        ];
    }
}