<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage, Link } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { useGating } from '@/Composables/useGating';
import {
    Sparkles,
    Target,
    Zap,
    TrendingUp,
    Brain,
    ArrowRight,
    Gem,
    Plus,
    ChevronRight,
    LayoutDashboard,
    Wallet,
    BookOpen,
    CalendarDays,
} from 'lucide-vue-next';

const { isExplorer, isAiEnabled, demandAccess } = useGating();

const page = usePage();
const props = defineProps({
    synergy: Object,
    trend: {
        type: Array,
        default: () => [],
    },
    stats: {
        type: Object,
        default: () => ({}),
    },
});

const globalInsight = ref(null);
const loadingInsight = ref(false);

const fetchInsight = async () => {
    if (loadingInsight.value || !isAiEnabled.value) {
        return;
    }

    loadingInsight.value = true;
    try {
        const response = await axios.get(route('dashboard.insight'));
        globalInsight.value = response.data;
    } catch (error) {
        console.error('Failed to fetch neural insight:', error);
    } finally {
        loadingInsight.value = false;
    }
};

defineOptions({ layout: AuthenticatedLayout });

const greetingKey = computed(() => {
    const hour = new Date().getHours();
    if (hour < 11) {
        return 'dash_greet_morning';
    }
    if (hour < 15) {
        return 'dash_greet_afternoon';
    }
    if (hour < 19) {
        return 'dash_greet_evening';
    }
    return 'dash_greet_night';
});

const firstName = computed(() => {
    const name = page.props.auth?.user?.name;
    return name ? name.split(' ')[0] : '';
});

const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(number ?? 0);
};

const overallScore = computed(() => {
    if (!props.synergy) {
        return 0;
    }

    const scores = [props.synergy.habits.percent, props.synergy.planner.percent];

    if (!isExplorer.value) {
        if (props.synergy.goals.top_goal) {
            scores.push(props.synergy.goals.top_goal.percent);
        }
        scores.push(props.synergy.journal.is_written ? 100 : 0);
    }

    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
});

const trendMax = computed(() => {
    if (!props.trend?.length) {
        return 100;
    }
    return Math.max(...props.trend.map((d) => d.score ?? 0), 1);
});

const plannerTaskCount = computed(() => props.synergy?.planner?.total ?? 0);

onMounted(() => {
    if (isAiEnabled.value) {
        fetchInsight();
    }
});
</script>

<template>
    <Head :title="$t('nav_dashboard')" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors duration-500">
        <div
            class="pointer-events-none fixed inset-x-0 top-0 h-48 bg-gradient-to-b from-indigo-500/[0.06] to-transparent dark:from-indigo-500/10"
        />

        <div class="relative mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8 lg:px-8">
            <!-- Hero: ringkas -->
            <header class="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div class="min-w-0">
                    <p
                        class="mb-1 text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400"
                    >
                        {{ synergy?.date_formatted }}
                    </p>
                    <h1
                        class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl"
                    >
                        {{ $t(greetingKey) }},
                        <span class="text-indigo-600 dark:text-indigo-400">{{ firstName }}</span>
                    </h1>
                    <p class="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
                        {{ $t('dash_today_subtitle') }}
                    </p>
                </div>

                <div
                    class="flex shrink-0 items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-900/90"
                    role="status"
                    :aria-label="$t('dash_synergy') + ' ' + overallScore + '%'"
                >
                    <div class="relative flex h-14 w-14 items-center justify-center md:h-16 md:w-16">
                        <svg class="absolute h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                            <circle
                                cx="50"
                                cy="50"
                                r="42"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="5"
                                class="text-slate-100 dark:text-slate-800"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="42"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="6"
                                stroke-linecap="round"
                                :stroke-dasharray="264"
                                :stroke-dashoffset="264 - (264 * overallScore) / 100"
                                class="text-indigo-500 transition-all duration-1000 dark:text-indigo-400"
                            />
                        </svg>
                        <span class="text-base font-bold tabular-nums text-slate-900 dark:text-white md:text-lg">{{
                            overallScore
                        }}%</span>
                    </div>
                    <div class="min-w-0 pr-1">
                        <p class="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            {{ $t('dash_synergy') }}
                        </p>
                        <p class="text-xs font-medium leading-snug text-slate-600 dark:text-slate-300">
                            {{ $t('dash_pulse_desc') }}
                        </p>
                    </div>
                </div>
            </header>

            <!-- Quick actions -->
            <div class="mb-8 overflow-x-auto scroll-smooth no-scrollbar">
                <div class="flex w-max items-center gap-2">
                    <Link
                        :href="route('planner.index')"
                        class="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                    >
                        <Plus :size="14" stroke-width="2.5" />
                        {{ $t('btn_add_task') }}
                    </Link>
                    <Link
                        :href="route('finance.index')"
                        class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <TrendingUp :size="14" stroke-width="2.5" />
                        {{ $t('btn_log_expense') }}
                    </Link>
                    <Link
                        :href="route('habits.index')"
                        class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <Zap :size="14" stroke-width="2.5" />
                        {{ $t('btn_check_habit') }}
                    </Link>
                    <button
                        type="button"
                        class="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 active:scale-[0.98] dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200 dark:hover:bg-indigo-500/20"
                        @click="demandAccess('journal', route('journal.index'))"
                    >
                        <Brain :size="14" stroke-width="2.5" />
                        {{ $t('btn_journal') }}
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                <!-- Kolom utama: fokus hari ini -->
                <div class="space-y-6 lg:col-span-8">
                    <section
                        class="bento-card bento-card-hover !rounded-2xl border-slate-200/80 p-5 shadow-sm dark:border-slate-800 md:p-6"
                    >
                        <div class="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                            <div>
                                <h2 class="text-lg font-bold text-slate-900 dark:text-white">
                                    {{ $t('dash_today') }}
                                </h2>
                                <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                    {{ $t('dash_planner_tasks_today', { count: plannerTaskCount }) }}
                                </p>
                            </div>
                            <Link
                                :href="route('planner.index')"
                                class="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                            >
                                {{ $t('dash_schedule') }}
                                <ArrowRight :size="14" />
                            </Link>
                        </div>

                        <div v-if="synergy?.planner?.upcoming?.length > 0" class="space-y-2">
                            <div
                                v-for="task in synergy.planner.upcoming"
                                :key="task.id"
                                class="flex items-center justify-between gap-3 rounded-xl border border-transparent bg-slate-50/80 px-3 py-3 transition hover:border-slate-200 dark:bg-white/[0.04] dark:hover:border-white/10"
                            >
                                <div class="flex min-w-0 items-center gap-3">
                                    <span
                                        class="shrink-0 rounded-lg bg-white px-2 py-1 font-mono text-[11px] font-semibold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300"
                                    >
                                        {{ task.start_time || '—' }}
                                    </span>
                                    <p class="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                                        {{ task.title }}
                                    </p>
                                </div>
                                <span
                                    class="shrink-0 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
                                >
                                    {{ $t('dash_task_scheduled') }}
                                </span>
                            </div>
                        </div>
                        <div v-else class="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-4 py-10 text-center dark:border-white/10 dark:bg-white/[0.02]">
                            <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
                                {{ $t('dash_all_tasks_done') }}
                            </p>
                            <Link
                                :href="route('planner.index')"
                                class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
                            >
                                <Plus :size="14" />
                                {{ $t('btn_add_task') }}
                            </Link>
                        </div>

                        <div
                            class="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 dark:border-white/5 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div class="min-w-0 flex-1">
                                <div class="mb-2 flex items-center justify-between gap-2">
                                    <span class="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                                        <Zap class="text-indigo-500" :size="16" />
                                        {{ $t('dash_habit_title') }}
                                    </span>
                                    <span class="text-[11px] font-medium text-slate-500">
                                        {{ synergy?.habits?.completed ?? 0 }}/{{ synergy?.habits?.total ?? 0 }}
                                        {{ $t('dash_done') }}
                                    </span>
                                </div>
                                <div class="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                    <div
                                        class="h-full rounded-full bg-indigo-600 transition-all duration-700 dark:bg-indigo-400"
                                        :style="`width: ${synergy?.habits?.percent ?? 0}%`"
                                    />
                                </div>
                            </div>
                            <Link
                                :href="route('habits.index')"
                                class="inline-flex shrink-0 items-center justify-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                            >
                                {{ $t('btn_check_habit') }}
                                <ChevronRight :size="14" />
                            </Link>
                        </div>
                    </section>

                    <!-- AI: hanya tier dengan AI -->
                    <div
                        v-if="isAiEnabled"
                        class="bento-card bento-card-hover !cursor-pointer !rounded-2xl border-indigo-200/60 bg-gradient-to-br from-slate-900 to-indigo-950 p-5 text-white shadow-md dark:border-indigo-500/20 md:p-6"
                        role="button"
                        tabindex="0"
                        @click="demandAccess('ai_coach', route('coach.index'))"
                        @keydown.enter="demandAccess('ai_coach', route('coach.index'))"
                    >
                        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div class="min-w-0 flex-1">
                                <div
                                    class="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-indigo-200"
                                >
                                    <Sparkles :size="12" class="text-indigo-300" />
                                    {{ $t('dash_neural_active') }}
                                </div>
                                <p class="text-base font-bold leading-snug md:text-lg">
                                    {{
                                        loadingInsight
                                            ? $t('dash_neural_default_summary')
                                            : globalInsight?.summary || $t('dash_neural_default_summary')
                                    }}
                                </p>
                                <p class="mt-2 text-xs font-medium text-indigo-200/80">
                                    {{ $t('dash_open_hub') }}
                                    <ArrowRight :size="12" class="inline align-middle" />
                                </p>
                            </div>
                            <div
                                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                            >
                                <Brain :size="28" class="text-indigo-200" />
                            </div>
                        </div>
                    </div>

                    <!-- Explorer: ajakan upgrade ringkas -->
                    <div
                        v-else-if="isExplorer"
                        class="bento-card !rounded-2xl border-slate-200/80 p-5 dark:border-slate-800 md:flex md:items-center md:justify-between md:gap-6 md:p-6"
                    >
                        <div class="flex gap-4">
                            <div
                                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-indigo-500/15 dark:text-indigo-300"
                            >
                                <LayoutDashboard :size="24" />
                            </div>
                            <div class="min-w-0">
                                <h3 class="text-base font-bold text-slate-900 dark:text-white">
                                    {{ $t('dash_explorer_rank') }}
                                </h3>
                                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    {{ $t('dash_explorer_desc') }}
                                </p>
                            </div>
                        </div>
                        <Link
                            :href="route('billing')"
                            class="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 md:mt-0 md:w-auto dark:bg-indigo-600 dark:hover:bg-indigo-500"
                        >
                            {{ $t('dash_upgrade_tier') }}
                        </Link>
                    </div>

                    <!-- Architect tanpa AI: utilitas pro -->
                    <div
                        v-else
                        class="bento-card !rounded-2xl border-slate-200/80 p-5 dark:border-slate-800 md:p-6"
                    >
                        <h3 class="text-base font-bold text-slate-900 dark:text-white">
                            {{ $t('dash_architect_brief_title') }}
                        </h3>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {{ $t('dash_architect_brief_desc') }}
                        </p>
                        <p class="mt-3 text-xs text-indigo-600 dark:text-indigo-400">
                            {{ $t('dash_quantum_teaser') }}
                        </p>
                        <div class="mt-5 grid gap-2 sm:grid-cols-2">
                            <Link
                                :href="route('journal.index')"
                                class="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/10"
                            >
                                <BookOpen class="text-indigo-500" :size="18" />
                                {{ $t('dash_journal_title') }}
                                <ChevronRight class="ml-auto text-slate-400" :size="16" />
                            </Link>
                            <Link
                                :href="route('goals.index')"
                                class="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/10"
                            >
                                <Target class="text-amber-500" :size="18" />
                                {{ $t('dash_goal_progress') }}
                                <ChevronRight class="ml-auto text-slate-400" :size="16" />
                            </Link>
                            <Link
                                :href="route('calendar.index')"
                                class="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/10 sm:col-span-2"
                            >
                                <CalendarDays class="text-emerald-500" :size="18" />
                                {{ $t('dash_calendar_title') }}
                                <ChevronRight class="ml-auto text-slate-400" :size="16" />
                            </Link>
                        </div>
                    </div>
                </div>

                <!-- Sisi: ringkas + per tier -->
                <aside class="space-y-4 lg:col-span-4">
                    <div class="bento-card !rounded-2xl p-4 md:p-5">
                        <h3 class="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {{ $t('dash_weekly_rhythm') }}
                        </h3>
                        <div v-if="trend?.length" class="mt-4 flex h-28 items-end justify-between gap-1">
                            <div
                                v-for="(day, idx) in trend"
                                :key="idx"
                                class="flex min-w-0 flex-1 flex-col items-center justify-end gap-1"
                            >
                                <div
                                    class="w-full max-w-[28px] rounded-t bg-indigo-500/85 dark:bg-indigo-400/80"
                                    :style="{ height: `${Math.max(8, (day.score / trendMax) * 100)}%` }"
                                    :title="String(day.score)"
                                />
                                <span class="truncate text-[9px] font-medium text-slate-400">{{ day.day }}</span>
                            </div>
                        </div>
                        <p v-else class="mt-4 text-xs text-slate-400">{{ $t('dash_weekly_rhythm_empty') }}</p>
                    </div>

                    <div
                        class="bento-card bento-card-hover !rounded-2xl p-4 md:p-5"
                        :class="isExplorer ? 'cursor-default' : 'cursor-pointer'"
                        @click="isExplorer ? null : demandAccess('finance_trends', route('finance.index'))"
                    >
                        <div class="mb-3 flex items-center justify-between">
                            <span class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                <Wallet class="text-emerald-600 dark:text-emerald-400" :size="18" />
                                {{ $t('dash_finance_overview') }}
                            </span>
                            <TrendingUp v-if="!isExplorer" :size="14" class="text-slate-400" />
                        </div>
                        <template v-if="!isExplorer">
                            <div class="space-y-3">
                                <div>
                                    <p class="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        {{ $t('dash_total_expenses') }}
                                    </p>
                                    <p class="text-lg font-bold tabular-nums text-slate-900 dark:text-white">
                                        {{ formatRupiah(synergy?.finance?.expense) }}
                                    </p>
                                </div>
                                <div
                                    v-if="(synergy?.finance?.income ?? 0) > 0"
                                    class="border-t border-slate-100 pt-3 dark:border-white/5"
                                >
                                    <p class="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        {{ $t('dash_income') }}
                                    </p>
                                    <p class="text-sm font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                                        {{ formatRupiah(synergy?.finance?.income) }}
                                    </p>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div
                                class="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-8 dark:border-white/10"
                            >
                                <Gem :size="22" class="text-indigo-500" />
                                <p class="mt-3 text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                    {{ $t('dash_unlock_arch') }}
                                </p>
                                <Link
                                    :href="route('billing')"
                                    class="mt-3 text-[11px] font-semibold text-slate-500 underline dark:text-slate-400"
                                >
                                    {{ $t('dash_view_new_plans') }}
                                </Link>
                            </div>
                        </template>
                    </div>

                    <div
                        v-if="!isExplorer"
                        class="bento-card bento-card-hover !cursor-pointer !rounded-2xl p-4 md:p-5"
                        @click="demandAccess('goal', route('goals.index'))"
                    >
                        <div class="mb-3 flex items-center justify-between">
                            <span class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                                <Target class="text-amber-600 dark:text-amber-400" :size="18" />
                                {{ $t('dash_goal_progress') }}
                            </span>
                            <ChevronRight :size="14" class="text-slate-400" />
                        </div>
                        <template v-if="synergy?.goals?.top_goal">
                            <p class="line-clamp-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                                {{ synergy.goals.top_goal.title }}
                            </p>
                            <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                <div
                                    class="h-full rounded-full bg-amber-500 transition-all duration-700"
                                    :style="`width: ${synergy.goals.top_goal.percent}%`"
                                />
                            </div>
                        </template>
                        <p v-else class="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {{ $t('dash_goal_empty_cta') }}
                        </p>
                    </div>

                    <div v-if="!isExplorer" class="bento-card !rounded-2xl p-4 md:p-5">
                        <div class="flex items-center justify-between gap-2">
                            <span class="text-sm font-bold text-slate-900 dark:text-white">{{
                                $t('dash_journal_title')
                            }}</span>
                            <span
                                class="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase"
                                :class="
                                    synergy?.journal?.is_written
                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
                                        : 'bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                                "
                            >
                                {{
                                    synergy?.journal?.is_written
                                        ? $t('dash_journal_written_status')
                                        : $t('dash_pending')
                                }}
                            </span>
                        </div>
                        <Link
                            v-if="synergy?.journal?.is_written && synergy?.journal?.id"
                            :href="route('journal.write', synergy.journal.id)"
                            class="mt-3 inline-flex text-xs font-semibold text-indigo-600 dark:text-indigo-400"
                        >
                            {{ $t('dash_journal_continue') }}
                        </Link>
                        <Link
                            v-else
                            :href="route('journal.index')"
                            class="mt-3 inline-flex text-xs font-semibold text-indigo-600 dark:text-indigo-400"
                        >
                            {{ $t('dash_journal_start') }}
                        </Link>
                    </div>
                </aside>
            </div>

            <div v-if="isExplorer" class="mt-10">
                <Link
                    :href="route('billing')"
                    class="bento-card bento-card-hover !flex !rounded-2xl items-center gap-4 border-indigo-100/80 p-5 shadow-sm transition md:gap-6 md:p-6 dark:border-indigo-500/20"
                >
                    <div
                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white md:h-14 md:w-14"
                    >
                        <OneForMindIcon name="premium" size="26" />
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="text-base font-bold text-slate-900 dark:text-white md:text-lg">
                            {{ $t('dash_upgrade_tier_title') }}
                        </h3>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {{ $t('dash_upgrade_tier_desc') }}
                        </p>
                    </div>
                    <span
                        class="hidden shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white sm:inline-flex dark:bg-indigo-600"
                    >
                        {{ $t('dash_view_new_plans') }}
                        <ArrowRight :size="14" />
                    </span>
                </Link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
