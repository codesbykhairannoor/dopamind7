<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChainSyncEventRaised
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public int $userId,
        public string $eventName,
        public string $sourceType,
        public int $sourceId,
        public array $context = [],
    ) {
    }
}
