<?php

use Laravel\Octane\Contracts\OperationTerminated;
use Laravel\Octane\Events\RequestHandled;
use Laravel\Octane\Events\RequestReceived;
use Laravel\Octane\Events\RequestTerminated;
use Laravel\Octane\Events\TaskTerminated;
use Laravel\Octane\Events\TickTerminated;
use Laravel\Octane\Events\WorkerErrorOccurred;
use Laravel\Octane\Events\WorkerStarting;
use Laravel\Octane\Events\WorkerStopping;

return [

    /*
    |--------------------------------------------------------------------------
    | Octane Server
    |--------------------------------------------------------------------------
    |
    | This value determines the default "server" that will be used by Octane
    | when starting, reloading, or stopping your application. You are
    | free to change this to any of the supported servers you wish.
    |
    | Supported: "swoole", "roadrunner"
    |
    */

    'server' => env('OCTANE_SERVER', 'roadrunner'),

    /*
    |--------------------------------------------------------------------------
    | Force HTTPS
    |--------------------------------------------------------------------------
    |
    | When this configuration value is set to true, Octane will inform the
    | framework that all absolute links must be generated using the
    | HTTPS protocol. Otherwise your links may use the HTTP protocol.
    |
    */

    'https' => env('OCTANE_HTTPS', false),

    /*
    |--------------------------------------------------------------------------
    | Octane Listeners
    |--------------------------------------------------------------------------
    |
    | All of the event listeners for Octane's internal events are defined
    | below. These listeners are responsible for managing the lifecycle
    | of the application, including handling errors and state reset.
    |
    */

    'listeners' => [
        WorkerStarting::class => [
            \Laravel\Octane\Listeners\PrepareApplicationForWorker::class,
        ],

        RequestReceived::class => [
            \Laravel\Octane\Listeners\CreateSandbox::class,
            \Laravel\Octane\Listeners\GiveEnvironmentVariablesToTheSandbox::class,
            \Laravel\Octane\Listeners\GiveConfigToTheSandbox::class,
        ],

        RequestHandled::class => [
            \Laravel\Octane\Listeners\ReleaseSandbox::class,
        ],

        RequestTerminated::class => [
            // \Laravel\Octane\Listeners\TerminateApplication::class,
        ],

        TaskTerminated::class => [
            // \Laravel\Octane\Listeners\TerminateApplication::class,
        ],

        TickTerminated::class => [
            // \Laravel\Octane\Listeners\TerminateApplication::class,
        ],

        OperationTerminated::class => [
            \Laravel\Octane\Listeners\FlushTemporaryContainerInstances::class,
            // \Laravel\Octane\Listeners\TerminateApplication::class,
        ],

        WorkerErrorOccurred::class => [
            \Laravel\Octane\Listeners\ReportWorkerError::class,
        ],

        WorkerStopping::class => [
            \Laravel\Octane\Listeners\PrepareApplicationForWorkerStopping::class,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Warm-up List
    |--------------------------------------------------------------------------
    |
    | The services listed below will be warmed up when a worker starts. This
    | allows the services to be instantly available when a request comes
    | in. You may add your own services to this list as you see fit.
    |
    */

    'warm' => [
        'auth',
        'cache',
        'cache.store',
        'config',
        'cookie',
        'db',
        'db.factory',
        'db.transactions',
        'encrypter',
        'files',
        'hash',
        'log',
        'router',
        'routes',
        'session',
        'session.store',
        'translator',
        'url',
        'view',
    ],

    /*
    |--------------------------------------------------------------------------
    | Flush List
    |--------------------------------------------------------------------------
    |
    | The services listed below will be flushed from the container after
    | each request. This allows you to reset the state of the service
    | after each request. You may add your own services to this list.
    |
    */

    'flush' => [
        //
    ],

    /*
    |--------------------------------------------------------------------------
    | Garbage Collection Threshold
    |--------------------------------------------------------------------------
    |
    | When using Swoole, you may specify how many requests a worker should
    | handle before being terminated. This can help prevent memory leaks.
    | If this value is set to 0, workers will never be terminated.
    |
    */

    'max_requests' => 250,

];
