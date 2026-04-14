<?php

use App\Models\Goal;
use App\Models\Habit;
use App\Models\User;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test("quantum user can create chain link with rule", function () {
    $user = User::factory()->create([
        "plan_type" => "quantum",
    ]);

    $habit = Habit::create([
        "user_id" => $user->id,
        "name" => "Olahraga Pagi",
        "period" => "2026-04",
        "monthly_target" => 20,
        "icon" => "🏃",
        "color" => "#ffffff",
    ]);

    $goal = Goal::create([
        "user_id" => $user->id,
        "title" => "Turun Berat Badan",
        "type" => "monthly",
        "target_value" => 30,
        "current_value" => 0,
        "status" => "active",
    ]);

    $response = $this->actingAs($user)->postJson("/chainsync/links", [
        "source_type" => "habit",
        "source_id" => $habit->id,
        "target_type" => "goal",
        "target_id" => $goal->id,
        "relation_type" => "supports_goal",
        "rule" => [
            "trigger_event" => "habit.completed",
            "action_type" => "goal.increment_current_value",
            "action_payload" => [
                "increment" => 2,
            ],
        ],
    ]);

    $response->assertCreated()->assertJsonPath("data.source_type", "habit");
    $this->assertDatabaseHas("chain_links", [
        "user_id" => $user->id,
        "source_type" => "habit",
        "source_id" => $habit->id,
        "target_type" => "goal",
        "target_id" => $goal->id,
    ]);
    $this->assertDatabaseHas("chain_rules", [
        "trigger_event" => "habit.completed",
        "action_type" => "goal.increment_current_value",
    ]);
});

test("habit completion can sync linked goal progress", function () {
    $user = User::factory()->create([
        "plan_type" => "quantum",
    ]);

    $habit = Habit::create([
        "user_id" => $user->id,
        "name" => "Workout",
        "period" => "2026-04",
        "monthly_target" => 15,
        "icon" => "🏋️",
        "color" => "#ffffff",
    ]);

    $goal = Goal::create([
        "user_id" => $user->id,
        "title" => "Weight Loss",
        "type" => "monthly",
        "target_value" => 10,
        "current_value" => 1,
        "status" => "active",
    ]);

    $this->actingAs($user)->postJson("/chainsync/links", [
        "source_type" => "habit",
        "source_id" => $habit->id,
        "target_type" => "goal",
        "target_id" => $goal->id,
        "relation_type" => "supports_goal",
        "rule" => [
            "trigger_event" => "habit.completed",
            "action_type" => "goal.increment_current_value",
            "action_payload" => [
                "increment" => 3,
            ],
        ],
    ])->assertCreated();

    $this->actingAs($user)->post("/habits/{$habit->id}/log", [
        "date" => "2026-04-14",
        "status" => "completed",
    ])->assertRedirect();

    $this->assertDatabaseHas("goals", [
        "id" => $goal->id,
        "current_value" => "4.00",
    ]);
    $this->assertDatabaseHas("chain_sync_logs", [
        "user_id" => $user->id,
        "event_name" => "habit.completed",
        "status" => "success",
    ]);
});

test("quick target endpoint can create and connect goal", function () {
    $user = User::factory()->create([
        "plan_type" => "quantum",
    ]);

    $habit = Habit::create([
        "user_id" => $user->id,
        "name" => "Belajar English",
        "period" => "2026-04",
        "monthly_target" => 20,
        "icon" => "📚",
        "color" => "#ffffff",
    ]);

    $response = $this->actingAs($user)->postJson("/chainsync/quick-target", [
        "source_type" => "habit",
        "source_id" => $habit->id,
        "target_type" => "goal",
        "target_title" => "English Fluency",
        "target_payload" => [
            "target_value" => 50,
        ],
    ]);

    $response->assertCreated();
    $this->assertDatabaseHas("goals", [
        "user_id" => $user->id,
        "title" => "English Fluency",
    ]);
    $this->assertDatabaseHas("chain_links", [
        "user_id" => $user->id,
        "source_type" => "habit",
        "source_id" => $habit->id,
        "target_type" => "goal",
    ]);
});
