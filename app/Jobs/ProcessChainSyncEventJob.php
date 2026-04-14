<?php

namespace App\Jobs;

use App\Services\ChainSyncService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessChainSyncEventJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public function __construct(
        public int $userId,
        public string $eventName,
        public string $sourceType,
        public int $sourceId,
        public array $context = [],
    ) {
    }

    public function handle(ChainSyncService $chainSyncService): void
    {
        $chainSyncService->processEvent(
            $this->userId,
            $this->eventName,
            $this->sourceType,
            $this->sourceId,
            $this->context,
        );
    }
}
