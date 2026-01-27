<?php

namespace App\Traits;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

trait HasUserTimezone
{
    /**
     * Otomatis mengonversi waktu dari UTC (DB) ke Timezone User.
     */
    protected function serializeDate(\DateTimeInterface $date)
    {
        $timezone = Auth::user()?->timezone ?? config('app.timezone');
        
        return Carbon::instance($date)
            ->timezone($timezone)
            ->format('Y-m-d H:i:s');
    }

    /**
     * Helper untuk mendapatkan Carbon instance waktu lokal user.
     */
    public function getLocalTime($column)
    {
        $timezone = Auth::user()?->timezone ?? config('app.timezone');
        return Carbon::parse($this->attributes[$column])->timezone($timezone);
    }
}