<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create("chain_executions", function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained()->cascadeOnDelete();
            $table->string("execution_uuid", 64)->index();
            $table->unsignedTinyInteger("depth")->default(1);
            $table->string("event_name", 120);
            $table->string("source_type", 50);
            $table->unsignedBigInteger("source_id");
            $table->string("status", 20)->default("running");
            $table->json("context")->nullable();
            $table->timestamps();
        });

        Schema::create("chain_effects", function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained()->cascadeOnDelete();
            $table->foreignId("chain_link_id")->nullable()->constrained("chain_links")->nullOnDelete();
            $table->foreignId("chain_rule_id")->nullable()->constrained("chain_rules")->nullOnDelete();
            $table->string("idempotency_key", 191)->unique();
            $table->string("event_ref", 191)->index();
            $table->string("effect_type", 120);
            $table->string("target_type", 50);
            $table->unsignedBigInteger("target_id");
            $table->decimal("effect_delta", 15, 4)->nullable();
            $table->json("effect_payload")->nullable();
            $table->boolean("is_reverted")->default(false);
            $table->timestamps();
        });

        Schema::create("goal_contributions", function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained()->cascadeOnDelete();
            $table->foreignId("goal_id")->constrained("goals")->cascadeOnDelete();
            $table->foreignId("chain_rule_id")->nullable()->constrained("chain_rules")->nullOnDelete();
            $table->string("source_type", 50);
            $table->unsignedBigInteger("source_id");
            $table->string("event_ref", 191)->index();
            $table->decimal("value_delta", 15, 4)->default(0);
            $table->timestamps();

            $table->unique(["goal_id", "event_ref", "chain_rule_id"], "goal_contrib_unique_event_rule");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("goal_contributions");
        Schema::dropIfExists("chain_effects");
        Schema::dropIfExists("chain_executions");
    }
};
