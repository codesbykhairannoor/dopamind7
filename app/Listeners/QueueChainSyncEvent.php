<?php

namespace App\Listeners;

use App\Events\ChainSyncEventRaised;
use App\Jobs\ProcessChainSyncEventJob;

class QueueChainSyncEvent
{
    public function handle(ChainSyncEventRaised $event): void
    {
        ProcessChainSyncEventJob::dispatch(
            $event->userId,
            $event->eventName,
            $event->sourceType,
            $event->sourceId,
            $event->context,
        );
    }
}
