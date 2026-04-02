<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        \App\Models\Habit::class => \App\Policies\HabitPolicy::class,
        \App\Models\Journal::class => \App\Policies\JournalPolicy::class,
        \App\Models\CalendarEvent::class => \App\Policies\CalendarEventPolicy::class,
        \App\Models\PlannerTask::class => \App\Policies\PlannerTaskPolicy::class,
        \App\Models\FinanceTransaction::class => \App\Policies\FinanceTransactionPolicy::class,
        \App\Models\FinanceBudget::class => \App\Policies\FinanceBudgetPolicy::class,
        \App\Models\FinanceCategory::class => \App\Policies\FinanceCategoryPolicy::class,
        \App\Models\Job::class => \App\Policies\JobPolicy::class,
        \App\Models\Goal::class => \App\Policies\GoalPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        \Illuminate\Support\Facades\Gate::define('admin', function ($user) {
            return $user->is_admin === true;
        });
    }
}
