<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create("chain_links", function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained()->cascadeOnDelete();
            $table->string("source_type", 50);
            $table->unsignedBigInteger("source_id");
            $table->string("target_type", 50);
            $table->unsignedBigInteger("target_id");
            $table->string("relation_type", 100)->default("related_to");
            $table->boolean("is_active")->default(true);
            $table->timestamps();

            $table->index(["user_id", "source_type", "source_id"], "chain_links_source_idx");
            $table->index(["user_id", "target_type", "target_id"], "chain_links_target_idx");
            $table->unique(
                ["user_id", "source_type", "source_id", "target_type", "target_id", "relation_type"],
                "chain_links_unique_relation"
            );
        });

        Schema::create("chain_rules", function (Blueprint $table) {
            $table->id();
            $table->foreignId("chain_link_id")->constrained("chain_links")->cascadeOnDelete();
            $table->string("trigger_event", 100);
            $table->string("action_type", 100);
            $table->json("conditions")->nullable();
            $table->json("action_payload")->nullable();
            $table->unsignedTinyInteger("position")->default(1);
            $table->boolean("is_active")->default(true);
            $table->timestamps();

            $table->index(["trigger_event", "is_active"], "chain_rules_trigger_idx");
        });

        Schema::create("chain_sync_logs", function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained()->cascadeOnDelete();
            $table->foreignId("chain_link_id")->nullable()->constrained("chain_links")->nullOnDelete();
            $table->foreignId("chain_rule_id")->nullable()->constrained("chain_rules")->nullOnDelete();
            $table->string("event_name", 100);
            $table->string("status", 20)->default("success");
            $table->text("message")->nullable();
            $table->json("context")->nullable();
            $table->timestamps();

            $table->index(["user_id", "event_name"], "chain_sync_logs_user_event_idx");
            $table->index(["created_at"], "chain_sync_logs_created_idx");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("chain_sync_logs");
        Schema::dropIfExists("chain_rules");
        Schema::dropIfExists("chain_links");
    }
};
