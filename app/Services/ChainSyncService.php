<?php

namespace App\Services;

use App\Models\CalendarEvent;
use App\Models\ChainEffect;
use App\Models\ChainExecution;
use App\Models\ChainLink;
use App\Models\ChainRule;
use App\Models\ChainSyncLog;
use App\Models\FinanceCategory;
use App\Models\FinanceSaving;
use App\Models\FinanceTransaction;
use App\Models\Goal;
use App\Models\Habit;
use App\Models\Job;
use App\Models\Journal;
use App\Models\PlannerTask;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ChainSyncService
{
    /**
     * @var array<string, class-string<Model>>
     */
    private array $entityMap = [
        "habit" => Habit::class,
        "goal" => Goal::class,
        "planner_task" => PlannerTask::class,
        "finance_transaction" => FinanceTransaction::class,
        "finance_saving" => FinanceSaving::class,
        "journal" => Journal::class,
        "job" => Job::class,
        "calendar_event" => CalendarEvent::class,
    ];

    public function listLinks(int $userId, array $filters = [])
    {
        return ChainLink::ofUser($userId)
            ->with("rules")
            ->when(
                !empty($filters["source_type"]) && !empty($filters["source_id"]),
                fn ($query) => $query
                    ->where("source_type", $filters["source_type"])
                    ->where("source_id", $filters["source_id"]),
            )
            ->when(
                !empty($filters["target_type"]) && !empty($filters["target_id"]),
                fn ($query) => $query
                    ->where("target_type", $filters["target_type"])
                    ->where("target_id", $filters["target_id"]),
            )
            ->latest()
            ->get();
    }

    public function createLink(int $userId, array $data): ChainLink
    {
        $isSourceWildcard = $this->isWildcardSource($data["source_type"], (int) $data["source_id"]);
        $source = $isSourceWildcard
            ? null
            : $this->resolveOwnedEntity($userId, $data["source_type"], (int) $data["source_id"]);
        $isTargetWildcard = $this->isWildcardTarget($data["target_type"], (int) $data["target_id"]);
        $target = $isTargetWildcard
            ? null
            : $this->resolveOwnedEntity($userId, $data["target_type"], (int) $data["target_id"]);

        if ($source && $target && $source->is($target)) {
            abort(422, "Source and target cannot be the same record.");
        }

        return DB::transaction(function () use ($userId, $data) {
            $link = ChainLink::updateOrCreate(
                [
                    "user_id" => $userId,
                    "source_type" => $data["source_type"],
                    "source_id" => (int) $data["source_id"],
                    "target_type" => $data["target_type"],
                    "target_id" => (int) $data["target_id"],
                    "relation_type" => $data["relation_type"] ?? "related_to",
                ],
                [
                    "is_active" => true,
                ],
            );

            $ruleData = Arr::get($data, "rule");
            if (is_array($ruleData) && !empty($ruleData["trigger_event"]) && !empty($ruleData["action_type"])) {
                $link->rules()->create([
                    "trigger_event" => $ruleData["trigger_event"],
                    "action_type" => $ruleData["action_type"],
                    "conditions" => Arr::get($ruleData, "conditions"),
                    "action_payload" => Arr::get($ruleData, "action_payload"),
                    "is_active" => Arr::get($ruleData, "is_active", true),
                ]);
            }

            return $link->load("rules");
        });
    }

    public function removeLink(int $userId, ChainLink $link): void
    {
        abort_unless($link->user_id === $userId, 403, "Unauthorized chain link access.");
        $link->delete();
    }

    public function quickCreateTarget(int $userId, array $data): array
    {
        $targetType = $data["target_type"];
        $targetTitle = trim($data["target_title"]);
        $payload = Arr::get($data, "target_payload", []);

        $target = DB::transaction(function () use ($userId, $targetType, $targetTitle, $payload) {
            if ($targetType === "goal") {
                return Goal::create([
                    "user_id" => $userId,
                    "title" => $targetTitle,
                    "type" => Arr::get($payload, "type", "monthly"),
                    "target_value" => (float) Arr::get($payload, "target_value", 10),
                    "current_value" => (float) Arr::get($payload, "current_value", 0),
                    "status" => Arr::get($payload, "status", "active"),
                ]);
            }

            if ($targetType === "planner_task") {
                return PlannerTask::create([
                    "user_id" => $userId,
                    "title" => $targetTitle,
                    "date" => Arr::get($payload, "date", now()->format("Y-m-d")),
                    "type" => (int) Arr::get($payload, "type", 1),
                    "notes" => Arr::get($payload, "notes"),
                    "is_completed" => false,
                ]);
            }

            if ($targetType === "journal") {
                return Journal::create([
                    "user_id" => $userId,
                    "title" => $targetTitle,
                    "content" => Arr::get($payload, "content", ""),
                    "date" => Arr::get($payload, "date", now()->format("Y-m-d")),
                ]);
            }

            abort(422, "Unsupported quick target type: {$targetType}");
        });

        $link = null;
        if (!empty($data["source_type"]) && !empty($data["source_id"])) {
            $link = $this->createLink($userId, [
                "source_type" => $data["source_type"],
                "source_id" => (int) $data["source_id"],
                "target_type" => $targetType,
                "target_id" => (int) $target->id,
                "relation_type" => Arr::get($data, "relation_type", "related_to"),
                "rule" => Arr::get($data, "rule"),
            ]);
        }

        return [
            "target" => $target,
            "link" => $link,
        ];
    }

    public function getTimelineForEntity(int $userId, string $entityType, int $entityId, int $limit = 30)
    {
        return ChainSyncLog::query()
            ->where("user_id", $userId)
            ->where(function ($query) use ($entityType, $entityId) {
                $query
                    ->whereHas("link", fn ($linkQuery) => $linkQuery
                        ->where("source_type", $entityType)
                        ->where("source_id", $entityId))
                    ->orWhereHas("link", fn ($linkQuery) => $linkQuery
                        ->where("target_type", $entityType)
                        ->where("target_id", $entityId));
            })
            ->with(["link", "rule"])
            ->latest()
            ->limit($limit)
            ->get();
    }

    public function searchOptions(int $userId, string $query = "", array $types = []): array
    {
        $allowedTypes = array_merge(array_keys($this->entityMap), ["finance_category"]);
        $requestedTypes = empty($types) ? $allowedTypes : array_values(array_intersect($types, $allowedTypes));
        $needle = trim($query);

        $results = [];
        foreach ($requestedTypes as $type) {
            if ($type === "finance_category") {
                $categories = FinanceCategory::query()
                    ->where("user_id", $userId)
                    ->when($needle !== "", fn ($queryBuilder) => $queryBuilder->where("name", "like", "%{$needle}%"))
                    ->orderBy("name")
                    ->limit(30)
                    ->get();

                foreach ($categories as $category) {
                    $results[] = [
                        "id" => $category->id,
                        "type" => "finance_category",
                        "title" => (string) $category->name,
                        "subtitle" => (string) $category->slug,
                        "meta" => [
                            "slug" => $category->slug,
                            "icon" => $category->icon,
                        ],
                    ];
                }

                continue;
            }

            if ($type === "finance_saving") {
                $savings = FinanceSaving::query()
                    ->where("user_id", $userId)
                    ->when($needle !== "", fn ($queryBuilder) => $queryBuilder->where("title", "like", "%{$needle}%"))
                    ->orderBy("title")
                    ->limit(30)
                    ->get();

                foreach ($savings as $saving) {
                    $results[] = [
                        "id" => $saving->id,
                        "type" => "finance_saving",
                        "title" => (string) $saving->title,
                        "subtitle" => "Saving Goal",
                    ];
                }

                continue;
            }

            $className = $this->entityMap[$type];
            $items = $className::query()
                ->where("user_id", $userId)
                ->when(
                    $needle !== "",
                    function ($queryBuilder) use ($needle, $type) {
                        $labelColumn = $this->labelColumn($type);
                        $queryBuilder->where($labelColumn, "like", "%{$needle}%");
                    },
                )
                ->latest()
                ->limit(20)
                ->get();

            foreach ($items as $item) {
                $results[] = [
                    "id" => $item->id,
                    "type" => $type,
                    "title" => (string) ($item->{$this->labelColumn($type)} ?? "{$type} #{$item->id}"),
                    "subtitle" => (string) ($item->updated_at?->format("Y-m-d H:i") ?? ""),
                ];
            }
        }

        return $results;
    }

    public function suggestConnections(int $userId, string $sourceType, int $sourceId): array
    {
        $suggestions = [];

        if ($sourceType === "habit") {
            $goal = Goal::query()->where("user_id", $userId)->latest()->first();
            if ($goal) {
                $suggestions[] = [
                    "title" => "Connect this habit to a goal progress",
                    "target_type" => "goal",
                    "target_id" => $goal->id,
                    "relation_type" => "supports_goal",
                    "template_action" => "goal.increment_current_value",
                ];
            }
        }

        if ($sourceType === "planner_task") {
            $journal = Journal::query()->where("user_id", $userId)->latest()->first();
            if ($journal) {
                $suggestions[] = [
                    "title" => "Append planner reflection to latest journal",
                    "target_type" => "journal",
                    "target_id" => $journal->id,
                    "relation_type" => "reflects_on",
                    "template_action" => "journal.append_prompt",
                ];
            }
        }

        return $suggestions;
    }

    public function processEvent(
        int $userId,
        string $eventName,
        string $sourceType,
        int $sourceId,
        array $context = [],
    ): void {
        $executionUuid = (string) Arr::get($context, "execution_uuid", (string) Str::uuid());
        $depth = (int) Arr::get($context, "depth", 1);
        $visited = Arr::get($context, "visited_signatures", []);
        $signature = "{$eventName}|{$sourceType}|{$sourceId}";

        if ($depth > 5 || in_array($signature, $visited, true)) {
            return;
        }
        $visited[] = $signature;

        $execution = ChainExecution::create([
            "user_id" => $userId,
            "execution_uuid" => $executionUuid,
            "depth" => $depth,
            "event_name" => $eventName,
            "source_type" => $sourceType,
            "source_id" => $sourceId,
            "status" => "running",
            "context" => $context,
        ]);

        if ((bool) Arr::get($context, "is_reversal", false)) {
            $this->revertEffectsByEventRef($userId, (string) Arr::get($context, "event_ref", ""));
        }

        $links = ChainLink::ofUser($userId)
            ->where("source_type", $sourceType)
            ->whereIn("source_id", [$sourceId, 0])
            ->where("is_active", true)
            ->with(["rules" => fn ($query) => $query->where("is_active", true)->orderBy("position")])
            ->get();

        foreach ($links as $link) {
            foreach ($link->rules as $rule) {
                if ($rule->trigger_event !== $eventName) {
                    continue;
                }

                if (!$this->conditionsMatch($rule->conditions ?? [], $context)) {
                    continue;
                }

                try {
                    $this->runAction($userId, $link, $rule, $context, $eventName);
                    $this->writeLog($userId, $link, $rule, $eventName, "success", null, $context);
                } catch (\Throwable $exception) {
                    $this->writeLog($userId, $link, $rule, $eventName, "failed", $exception->getMessage(), $context);
                }
            }
        }

        $execution->update(["status" => "done"]);
    }

    private function runAction(int $userId, ChainLink $link, ChainRule $rule, array $context, string $eventName): void
    {
        $eventRef = (string) Arr::get($context, "event_ref", "{$eventName}:{$link->id}:{$rule->id}");
        $idempotencyKey = sha1("{$eventRef}|{$rule->id}|{$link->target_type}|{$link->target_id}");

        if (ChainEffect::query()->where("idempotency_key", $idempotencyKey)->exists()) {
            return;
        }

        if ($rule->action_type === "goal.increment_current_value" && $link->target_type === "goal") {
            $goal = $this->resolveOwnedEntity($userId, "goal", $link->target_id);
            $increment = (float) Arr::get($rule->action_payload ?? [], "increment", 1);
            $appliedDelta = $this->applyGoalDelta($goal, $increment);
            $this->recordEffect($userId, $link, $rule, $idempotencyKey, $eventRef, "goal.delta", "goal", (int) $goal->id, $appliedDelta);
            return;
        }

        if ($rule->action_type === "goal.threshold_increment" && $link->target_type === "goal") {
            $goal = $this->resolveOwnedEntity($userId, "goal", $link->target_id);
            $threshold = max(1, (int) Arr::get($rule->action_payload ?? [], "threshold", 5));
            $increment = (float) Arr::get($rule->action_payload ?? [], "increment", 1);
            $habitId = (int) Arr::get($context, "habit_id", $link->source_id);
            $completedCount = Habit::query()->where("user_id", $userId)->find($habitId)?->logs()->where("status", "completed")->count() ?? 0;
            if ($completedCount > 0 && $completedCount % $threshold === 0) {
                $appliedDelta = $this->applyGoalDelta($goal, $increment);
                $this->recordEffect($userId, $link, $rule, $idempotencyKey, $eventRef, "goal.delta", "goal", (int) $goal->id, $appliedDelta);
            }
            return;
        }

        if ($rule->action_type === "planner.mark_completed" && $link->target_type === "planner_task") {
            $plannerTask = $this->resolveOwnedEntity($userId, "planner_task", $link->target_id);
            $oldValue = (bool) $plannerTask->is_completed;
            if (!$plannerTask->is_completed) {
                $plannerTask->update(["is_completed" => true]);
            }
            $this->recordEffect(
                $userId,
                $link,
                $rule,
                $idempotencyKey,
                $eventRef,
                "planner.mark_completed",
                "planner_task",
                (int) $plannerTask->id,
                null,
                ["old_is_completed" => $oldValue],
            );
            return;
        }

        if ($rule->action_type === "goal.increment_by_transaction_amount" && $link->target_type === "goal") {
            $goal = $this->resolveOwnedEntity($userId, "goal", $link->target_id);
            $amount = (float) Arr::get($context, "amount", 0);
            $multiplier = (float) Arr::get($rule->action_payload ?? [], "multiplier", 1);
            $increment = max(0, $amount * $multiplier);
            $appliedDelta = $this->applyGoalDelta($goal, $increment);
            $this->recordEffect($userId, $link, $rule, $idempotencyKey, $eventRef, "goal.delta", "goal", (int) $goal->id, $appliedDelta);
            return;
        }

        if ($rule->action_type === "journal.append_prompt" && $link->target_type === "journal") {
            $journal = $this->resolveOwnedEntity($userId, "journal", $link->target_id);
            $promptPrefix = (string) Arr::get($rule->action_payload ?? [], "prefix", "Planner reflection:");
            $taskTitle = (string) Arr::get($context, "title", "Task");
            $eventDate = (string) Arr::get($context, "date", Carbon::now()->format("Y-m-d"));
            $line = sprintf("- %s %s (%s)", $promptPrefix, $taskTitle, $eventDate);

            $current = trim((string) ($journal->content ?? ""));
            $nextContent = $current === "" ? $line : ($current . PHP_EOL . $line);
            $journal->update(["content" => $nextContent]);
            $this->recordEffect(
                $userId,
                $link,
                $rule,
                $idempotencyKey,
                $eventRef,
                "journal.append_prompt",
                "journal",
                (int) $journal->id,
                null,
                ["appended_line" => $line],
            );
            return;
        }

        if ($rule->action_type === "habit.mark_completed_today" && $link->target_type === "habit") {
            $habit = $this->resolveOwnedEntity($userId, "habit", $link->target_id);
            $date = (string) Arr::get($context, "date", Carbon::now()->format("Y-m-d"));
            $oldLog = $habit->logs()->where("date", $date)->first();
            $habit->logs()->updateOrCreate(["date" => $date], ["status" => "completed"]);
            $this->recordEffect(
                $userId,
                $link,
                $rule,
                $idempotencyKey,
                $eventRef,
                "habit.mark_completed",
                "habit",
                (int) $habit->id,
                null,
                ["date" => $date, "old_status" => $oldLog?->status],
            );
            return;
        }

        if ($rule->action_type === "planner.auto_timeline" && $link->target_type === "planner_task") {
            $startDate = Carbon::parse((string) Arr::get($context, "date", Carbon::now()->format("Y-m-d")));
            $daysAhead = max(1, min(30, (int) Arr::get($rule->action_payload ?? [], "days_ahead", 14)));
            $durationDays = max(1, min(7, (int) Arr::get($rule->action_payload ?? [], "duration_days", 1)));
            $startTime = (string) Arr::get($rule->action_payload ?? [], "start_time", "07:00");
            $endTime = (string) Arr::get($rule->action_payload ?? [], "end_time", "08:00");
            $title = (string) Arr::get($rule->action_payload ?? [], "title", Arr::get($context, "source_title", "ChainSync Task"));
            $weekdays = Arr::get($rule->action_payload ?? [], "weekdays", []);

            $createdIds = [];
            for ($i = 1; $i <= $daysAhead; $i++) {
                $date = $startDate->copy()->addDays($i);
                if (!empty($weekdays) && !in_array((int) $date->dayOfWeekIso, $weekdays, true)) {
                    continue;
                }

                for ($j = 0; $j < $durationDays; $j++) {
                    $taskDate = $date->copy()->addDays($j);
                    $task = PlannerTask::create([
                        "user_id" => $userId,
                        "date" => $taskDate->format("Y-m-d"),
                        "title" => $title,
                        "start_time" => $startTime,
                        "end_time" => $endTime,
                        "type" => 1,
                        "notes" => "Auto generated by ChainSync",
                        "is_completed" => false,
                    ]);
                    $createdIds[] = $task->id;
                }
            }

            $this->recordEffect(
                $userId,
                $link,
                $rule,
                $idempotencyKey,
                $eventRef,
                "planner.auto_timeline",
                "planner_task",
                0,
                null,
                ["created_task_ids" => $createdIds],
            );
            return;
        }

        if ($rule->action_type === "finance.create_transaction" && $link->target_type === "finance_transaction") {
            $amount = (float) Arr::get($rule->action_payload ?? [], "amount", 20000);
            $type = (string) Arr::get($rule->action_payload ?? [], "type", "expense");
            $category = (string) Arr::get($rule->action_payload ?? [], "category", "habits");
            $habitName = (string) Arr::get($context, "source_title", "Habit");
            $title = (string) Arr::get($rule->action_payload ?? [], "title", "Auto {$habitName}");
            $date = (string) Arr::get($context, "date", Carbon::now()->format("Y-m-d"));

            $transaction = FinanceTransaction::create([
                "user_id" => $userId,
                "date" => $date,
                "title" => $title,
                "type" => in_array($type, ["income", "expense"], true) ? $type : "expense",
                "category" => $category,
                "amount" => $amount,
                "notes" => "Auto generated by ChainSync",
            ]);

            $this->recordEffect(
                $userId,
                $link,
                $rule,
                $idempotencyKey,
                $eventRef,
                "finance.create_transaction",
                "finance_transaction",
                (int) $transaction->id,
                $amount,
                ["transaction_id" => (int) $transaction->id],
            );
            return;
        }

        if ($rule->action_type === "finance.adjust_saving" && $link->target_type === "finance_saving") {
            $saving = $this->resolveOwnedEntity($userId, "finance_saving", $link->target_id);
            $amount = max(0, (float) Arr::get($rule->action_payload ?? [], "amount", 20000));
            $direction = (string) Arr::get($rule->action_payload ?? [], "direction", "deposit");
            $date = (string) Arr::get($context, "date", Carbon::now()->format("Y-m-d"));
            $habitName = (string) Arr::get($context, "source_title", "Habit");
            $oldCurrentAmount = (float) $saving->current_amount;

            $transaction = null;
            if ($direction === "withdraw") {
                $withdrawAmount = min($amount, (float) $saving->current_amount);
                $saving->decrement("current_amount", $withdrawAmount);
                $transaction = FinanceTransaction::create([
                    "user_id" => $userId,
                    "date" => $date,
                    "title" => "Auto Withdraw {$habitName}",
                    "type" => "income",
                    "category" => "saving",
                    "amount" => $withdrawAmount,
                    "notes" => "Auto generated by ChainSync",
                ]);
            } else {
                $saving->increment("current_amount", $amount);
                $transaction = FinanceTransaction::create([
                    "user_id" => $userId,
                    "date" => $date,
                    "title" => "Auto Save {$habitName}",
                    "type" => "expense",
                    "category" => "saving",
                    "amount" => $amount,
                    "notes" => "Auto generated by ChainSync",
                ]);
            }

            $this->recordEffect(
                $userId,
                $link,
                $rule,
                $idempotencyKey,
                $eventRef,
                "finance.adjust_saving",
                "finance_saving",
                (int) $saving->id,
                $amount,
                [
                    "saving_id" => (int) $saving->id,
                    "old_current_amount" => $oldCurrentAmount,
                    "transaction_id" => (int) ($transaction?->id ?? 0),
                ],
            );
            return;
        }

        throw new \RuntimeException("Unsupported ChainSync action: {$rule->action_type}");
    }

    private function conditionsMatch(array $conditions, array $context): bool
    {
        foreach ($conditions as $key => $value) {
            if (Arr::get($context, $key) != $value) {
                return false;
            }
        }

        return true;
    }

    private function resolveOwnedEntity(int $userId, string $type, int $id): Model
    {
        $className = $this->entityMap[$type] ?? null;
        if (!$className) {
            abort(422, "Unsupported entity type: {$type}");
        }

        /** @var Model|null $entity */
        $entity = $className::query()->where("user_id", $userId)->find($id);
        abort_if(!$entity, 404, "Entity not found or inaccessible: {$type}#{$id}");

        return $entity;
    }

    private function isWildcardSource(string $sourceType, int $sourceId): bool
    {
        return $sourceId === 0 && in_array($sourceType, ["finance_transaction"], true);
    }

    private function isWildcardTarget(string $targetType, int $targetId): bool
    {
        return $targetId === 0 && in_array($targetType, ["finance_transaction"], true);
    }

    private function labelColumn(string $type): string
    {
        return match ($type) {
            "habit" => "name",
            "finance_saving" => "title",
            "goal", "planner_task", "finance_transaction", "journal", "job", "calendar_event" => "title",
            default => "id",
        };
    }

    private function applyGoalDelta(Goal $goal, float $delta): float
    {
        $nextValue = (float) $goal->current_value + $delta;
        $nextValue = max(0, min($nextValue, (float) $goal->target_value));
        $appliedDelta = $nextValue - (float) $goal->current_value;
        $goal->update(["current_value" => $nextValue]);
        return $appliedDelta;
    }

    private function recordEffect(
        int $userId,
        ChainLink $link,
        ChainRule $rule,
        string $idempotencyKey,
        string $eventRef,
        string $effectType,
        string $targetType,
        int $targetId,
        ?float $delta = null,
        array $payload = [],
    ): void {
        ChainEffect::create([
            "user_id" => $userId,
            "chain_link_id" => $link->id,
            "chain_rule_id" => $rule->id,
            "idempotency_key" => $idempotencyKey,
            "event_ref" => $eventRef,
            "effect_type" => $effectType,
            "target_type" => $targetType,
            "target_id" => $targetId,
            "effect_delta" => $delta,
            "effect_payload" => $payload,
            "is_reverted" => false,
        ]);
    }

    private function revertEffectsByEventRef(int $userId, string $eventRef): void
    {
        if ($eventRef === "") {
            return;
        }

        $effects = ChainEffect::query()
            ->where("user_id", $userId)
            ->where("event_ref", $eventRef)
            ->where("is_reverted", false)
            ->get();

        foreach ($effects as $effect) {
            if ($effect->effect_type === "goal.delta" && $effect->target_type === "goal") {
                $goal = Goal::query()->where("user_id", $userId)->find($effect->target_id);
                if ($goal) {
                    $this->applyGoalDelta($goal, -((float) ($effect->effect_delta ?? 0)));
                }
            }

            if ($effect->effect_type === "planner.mark_completed" && $effect->target_type === "planner_task") {
                $task = PlannerTask::query()->where("user_id", $userId)->find($effect->target_id);
                if ($task) {
                    $oldValue = (bool) Arr::get($effect->effect_payload ?? [], "old_is_completed", false);
                    $task->update(["is_completed" => $oldValue]);
                }
            }

            if ($effect->effect_type === "journal.append_prompt" && $effect->target_type === "journal") {
                $journal = Journal::query()->where("user_id", $userId)->find($effect->target_id);
                if ($journal) {
                    $line = (string) Arr::get($effect->effect_payload ?? [], "appended_line", "");
                    if ($line !== "") {
                        $content = (string) ($journal->content ?? "");
                        $journal->update(["content" => trim(str_replace(PHP_EOL . $line, "", str_replace($line, "", $content)))]);
                    }
                }
            }

            if ($effect->effect_type === "habit.mark_completed" && $effect->target_type === "habit") {
                $habit = Habit::query()->where("user_id", $userId)->find($effect->target_id);
                if ($habit) {
                    $date = (string) Arr::get($effect->effect_payload ?? [], "date", "");
                    $oldStatus = Arr::get($effect->effect_payload ?? [], "old_status");
                    if ($date !== "") {
                        if ($oldStatus) {
                            $habit->logs()->updateOrCreate(["date" => $date], ["status" => $oldStatus]);
                        } else {
                            $habit->logs()->where("date", $date)->delete();
                        }
                    }
                }
            }

            if ($effect->effect_type === "planner.auto_timeline") {
                $createdIds = Arr::get($effect->effect_payload ?? [], "created_task_ids", []);
                if (is_array($createdIds) && !empty($createdIds)) {
                    PlannerTask::query()->where("user_id", $userId)->whereIn("id", $createdIds)->delete();
                }
            }

            if ($effect->effect_type === "finance.create_transaction") {
                $transactionId = (int) Arr::get($effect->effect_payload ?? [], "transaction_id", $effect->target_id);
                if ($transactionId > 0) {
                    FinanceTransaction::query()->where("user_id", $userId)->where("id", $transactionId)->delete();
                }
            }

            if ($effect->effect_type === "finance.adjust_saving") {
                $savingId = (int) Arr::get($effect->effect_payload ?? [], "saving_id", $effect->target_id);
                $oldCurrentAmount = (float) Arr::get($effect->effect_payload ?? [], "old_current_amount", 0);
                $transactionId = (int) Arr::get($effect->effect_payload ?? [], "transaction_id", 0);

                if ($savingId > 0) {
                    FinanceSaving::query()->where("user_id", $userId)->where("id", $savingId)->update([
                        "current_amount" => $oldCurrentAmount,
                    ]);
                }
                if ($transactionId > 0) {
                    FinanceTransaction::query()->where("user_id", $userId)->where("id", $transactionId)->delete();
                }
            }

            $effect->update(["is_reverted" => true]);
        }
    }

    private function writeLog(
        int $userId,
        ChainLink $link,
        ChainRule $rule,
        string $eventName,
        string $status,
        ?string $message,
        array $context,
    ): void {
        ChainSyncLog::create([
            "user_id" => $userId,
            "chain_link_id" => $link->id,
            "chain_rule_id" => $rule->id,
            "event_name" => $eventName,
            "status" => $status,
            "message" => $message,
            "context" => $context,
        ]);
    }
}
