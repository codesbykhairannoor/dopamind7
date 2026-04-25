<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\FinanceApiController;
use App\Http\Controllers\Api\HabitApiController;
use App\Http\Controllers\Api\PlannerApiController;
use App\Http\Controllers\Api\V1\GoalApiController;
use App\Http\Controllers\Api\V1\GoalMilestoneApiController;
use App\Http\Controllers\Api\V1\JobApiController;

/*
|--------------------------------------------------------------------------
| API Routes - OneForMind v1
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    
    // Public Routes
    Route::post('/login', [AuthApiController::class, 'login']);

    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        
        // User Profile
        Route::get('/user', [AuthApiController::class, 'me']);
        Route::post('/logout', [AuthApiController::class, 'logout']);

        // Finance Module
        Route::prefix('finance')->group(function () {
            Route::get('/', [FinanceApiController::class, 'index']);
            Route::post('/transaction', [FinanceApiController::class, 'store']);
        });

        // Habit Module
        Route::prefix('habits')->group(function () {
            Route::get('/', [HabitApiController::class, 'index']);
            Route::post('/{habit}/log', [HabitApiController::class, 'log']);
        });

        // Planner Module
        Route::prefix('planner')->group(function () {
            Route::get('/', [PlannerApiController::class, 'index']);
            Route::post('/task', [PlannerApiController::class, 'store']);
            Route::post('/task/{plannerTask}/toggle', [PlannerApiController::class, 'toggle']);
        });

        // Goal Module
        Route::prefix('goals')->group(function () {
            Route::get('/', [GoalApiController::class, 'index']);
            Route::get('/stats', [GoalApiController::class, 'stats']);
            Route::post('/', [GoalApiController::class, 'store']);
            Route::get('/{goal}', [GoalApiController::class, 'show']);
            Route::patch('/{goal}', [GoalApiController::class, 'update']);
            Route::delete('/{goal}', [GoalApiController::class, 'destroy']);
            
            // Milestones
            Route::post('/{goal}/milestones', [GoalMilestoneApiController::class, 'store']);
            Route::patch('/{goal}/milestones/{milestone}', [GoalMilestoneApiController::class, 'update']);
            Route::post('/{goal}/milestones/{milestone}/toggle', [GoalMilestoneApiController::class, 'toggle']);
            Route::delete('/{goal}/milestones/{milestone}', [GoalMilestoneApiController::class, 'destroy']);
        });

        // Job Module
        Route::prefix('jobs')->group(function () {
            Route::get('/', [JobApiController::class, 'index']);
            Route::get('/stats', [JobApiController::class, 'stats']);
            Route::get('/titles', [JobApiController::class, 'titles']);
            Route::post('/', [JobApiController::class, 'store']);
            Route::get('/{job}', [JobApiController::class, 'show']);
            Route::patch('/{job}', [JobApiController::class, 'update']);
            Route::delete('/{job}', [JobApiController::class, 'destroy']);
        });

    });

});

// Keep legacy stress test routes for backward compatibility if needed, 
// but it's recommended to migrate them to v1 later.
Route::middleware('auth:sanctum')->prefix('stress')->group(function () {
    Route::post('/transaction', function (Request $request) {
        $category = $request->user()->financeCategories()->first();
        if (!$category) {
            $category = \App\Models\FinanceCategory::create([
                'user_id' => $request->user()->id,
                'name'    => 'Auto Generated Category',
                'slug'    => 'auto-' . uniqid(),
                'type'    => 'expense',
                'icon'    => '💰',
            ]);
        }
        return \App\Models\FinanceTransaction::create([
            'user_id' => $request->user()->id,
            'finance_category_id' => $category->id,
            'amount' => rand(10000, 100000),
            'type' => 'expense',
            'description' => 'Transaksi Stress Test - ' . uniqid(),
            'date' => now(),
        ]);
    });
});