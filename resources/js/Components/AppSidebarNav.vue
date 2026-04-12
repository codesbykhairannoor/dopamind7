<script setup>
import { Link } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { useGating } from '@/Composables/useGating';
import { computed } from 'vue';

const props = defineProps({
    variant: {
        type: String,
        default: 'sidebar',
        validator: (v) => ['sidebar', 'drawer'].includes(v),
    },
    /** Desktop sidebar only: icon-only rail */
    collapsed: { type: Boolean, default: false },
    coreExpanded: { type: Boolean, default: true },
    platinumExpanded: { type: Boolean, default: true },
});

const emit = defineEmits(['toggle-core', 'toggle-platinum', 'navigate']);

const { isExplorer, canUse, demandAccess, user } = useGating();

const showModule = (moduleName) => user.value?.settings?.modules?.[moduleName] !== false;

const isActive = (pattern) => route().current(pattern);

const isDrawer = computed(() => props.variant === 'drawer');
const showLabels = computed(() => isDrawer.value || !props.collapsed);

const itemLayout = computed(() => {
    if (isDrawer.value) return 'px-3 py-3 gap-3 min-h-[48px]';
    if (props.collapsed) return 'justify-center px-0 py-2.5';
    return 'px-2.5 py-2 gap-3';
});

const onNav = () => {
    emit('navigate');
};

const goJournal = () => {
    demandAccess('journal', route('journal.index'));
    onNav();
};
const goCalendar = () => {
    demandAccess('calendar', route('calendar.index'));
    onNav();
};
const goJob = () => {
    demandAccess('job', route('jobs.index'));
    onNav();
};
const goGoal = () => {
    demandAccess('goal', route('goals.index'));
    onNav();
};
const goCoach = () => {
    demandAccess('ai_coach', route('coach.index'));
    onNav();
};
</script>

<template>
    <div class="space-y-0.5" :class="isDrawer ? 'px-1' : ''">
        <!-- Section: Core -->
        <button
            type="button"
            class="w-full flex items-center justify-between px-2 py-1.5 mb-0.5 rounded-lg group transition-all duration-200"
            :class="[!isDrawer && collapsed ? 'justify-center' : '', isDrawer ? 'px-3' : '']"
            @click="emit('toggle-core')"
        >
            <div v-if="!isDrawer && collapsed" class="h-px bg-slate-100 dark:bg-slate-800 w-full my-2"></div>
            <template v-else>
                <span
                    class="text-[9px] font-black text-slate-400 dark:text-slate-600 tracking-wide ml-1 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors"
                >
                    {{ $t('nav_core_modules', 'System Core') }}
                </span>
                <div
                    class="flex items-center justify-center w-4 h-4 text-slate-300 transition-transform duration-200"
                    :class="coreExpanded ? '' : '-rotate-90'"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
            </template>
        </button>

        <Transition
            enter-active-class="transition-all duration-200 ease-out overflow-hidden"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-[1200px]"
            leave-active-class="transition-all duration-150 ease-in overflow-hidden"
            leave-from-class="opacity-100 max-h-[1200px]"
            leave-to-class="opacity-0 max-h-0"
        >
            <div v-show="coreExpanded || (!isDrawer && collapsed)" class="space-y-0.5">
                <Link
                    :href="route('dashboard')"
                    prefetch="hover"
                    view-transition
                    class="nav-item group"
                    :class="[
                        isActive('dashboard') ? 'nav-item-active' : 'nav-item-default',
                        itemLayout,
                    ]"
                    :title="!showLabels ? $t('nav_item_dashboard') : ''"
                    @click="onNav"
                >
                    <div
                        class="nav-icon shrink-0"
                        :class="
                            isActive('dashboard')
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        "
                    >
                        <OneForMindIcon name="dashboard" size="18" />
                    </div>
                    <span v-if="showLabels" class="text-[12px] font-semibold tracking-tight truncate">{{ $t('nav_item_dashboard') }}</span>
                    <div v-if="isActive('dashboard') && showLabels" class="nav-active-bar"></div>
                </Link>

                <Link
                    v-if="showModule('habit')"
                    :href="route('habits.index')"
                    prefetch="hover"
                    view-transition
                    class="nav-item group"
                    :class="[
                        isActive('habits.*') ? 'nav-item-active' : 'nav-item-default',
                        itemLayout,
                    ]"
                    :title="!showLabels ? $t('nav_item_habit') : ''"
                    @click="onNav"
                >
                    <div
                        class="nav-icon shrink-0"
                        :class="
                            isActive('habits.*')
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        "
                    >
                        <OneForMindIcon name="habit" size="18" />
                    </div>
                    <span v-if="showLabels" class="text-[12px] font-semibold tracking-tight truncate">{{ $t('nav_item_habit') }}</span>
                    <div v-if="isActive('habits.*') && showLabels" class="nav-active-bar"></div>
                </Link>

                <Link
                    v-if="showModule('planner')"
                    :href="route('planner.index')"
                    prefetch="hover"
                    view-transition
                    class="nav-item group"
                    :class="[
                        isActive('planner.*') ? 'nav-item-active' : 'nav-item-default',
                        itemLayout,
                    ]"
                    :title="!showLabels ? $t('nav_item_planner') : ''"
                    @click="onNav"
                >
                    <div
                        class="nav-icon shrink-0"
                        :class="
                            isActive('planner.*')
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        "
                    >
                        <OneForMindIcon name="planner" size="18" />
                    </div>
                    <span v-if="showLabels" class="text-[12px] font-semibold tracking-tight truncate">{{ $t('nav_item_planner') }}</span>
                    <div v-if="isActive('planner.*') && showLabels" class="nav-active-bar"></div>
                </Link>

                <Link
                    v-if="showModule('finance')"
                    :href="route('finance.index')"
                    prefetch="hover"
                    view-transition
                    class="nav-item group"
                    :class="[
                        isActive('finance.*') ? 'nav-item-active' : 'nav-item-default',
                        itemLayout,
                    ]"
                    :title="!showLabels ? $t('nav_item_finance') : ''"
                    @click="onNav"
                >
                    <div
                        class="nav-icon shrink-0"
                        :class="
                            isActive('finance.*')
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        "
                    >
                        <OneForMindIcon name="finance" size="18" />
                    </div>
                    <span v-if="showLabels" class="text-[12px] font-semibold tracking-tight truncate">{{ $t('nav_item_finance') }}</span>
                    <div v-if="isActive('finance.*') && showLabels" class="nav-active-bar"></div>
                </Link>
            </div>
        </Transition>

        <div class="h-3"></div>

        <!-- Section: Platinum -->
        <button
            type="button"
            class="w-full flex items-center justify-between px-2 py-1.5 mb-0.5 rounded-lg group transition-all duration-200"
            :class="[!isDrawer && collapsed ? 'justify-center' : '', isDrawer ? 'px-3' : '']"
            @click="emit('toggle-platinum')"
        >
            <div v-if="!isDrawer && collapsed" class="h-px bg-slate-100 dark:bg-slate-800 w-full my-2"></div>
            <template v-else>
                <div class="flex items-center gap-1.5 ml-1">
                    <span class="text-[9px] font-black text-slate-400 dark:text-slate-600 tracking-wide group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                        {{ $t('nav_platinum_suite', 'Platinum Suite') }}
                    </span>
                    <div v-if="isExplorer" class="w-3 h-3 text-slate-300 dark:text-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                </div>
                <div
                    class="flex items-center justify-center w-4 h-4 text-slate-300 transition-transform duration-200"
                    :class="platinumExpanded ? '' : '-rotate-90'"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
            </template>
        </button>

        <Transition
            enter-active-class="transition-all duration-200 ease-out overflow-hidden"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-[1200px]"
            leave-active-class="transition-all duration-150 ease-in overflow-hidden"
            leave-from-class="opacity-100 max-h-[1200px]"
            leave-to-class="opacity-0 max-h-0"
        >
            <div v-show="platinumExpanded || (!isDrawer && collapsed)" class="space-y-0.5">
                <div
                    v-if="showModule('journal')"
                    class="nav-item group cursor-pointer"
                    :class="[
                        isActive('journal.*') ? 'nav-item-active' : 'nav-item-default',
                        itemLayout,
                        !canUse('journal') ? 'opacity-60' : '',
                    ]"
                    :title="!showLabels ? $t('nav_item_journal') : ''"
                    @click="goJournal"
                >
                    <div
                        class="nav-icon shrink-0"
                        :class="
                            isActive('journal.*')
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        "
                    >
                        <OneForMindIcon name="journal" size="18" />
                    </div>
                    <span v-if="showLabels" class="text-[12px] font-semibold tracking-tight truncate flex-1">{{ $t('nav_item_journal') }}</span>
                    <div v-if="!canUse('journal') && showLabels" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.6)]"></div>
                    <div v-if="isActive('journal.*') && showLabels" class="nav-active-bar"></div>
                </div>

                <div
                    v-if="showModule('calendar')"
                    class="nav-item group cursor-pointer"
                    :class="[
                        isActive('calendar.*') ? 'nav-item-active' : 'nav-item-default',
                        itemLayout,
                        !canUse('calendar') ? 'opacity-60' : '',
                    ]"
                    :title="!showLabels ? $t('nav_item_calendar') : ''"
                    @click="goCalendar"
                >
                    <div
                        class="nav-icon shrink-0"
                        :class="
                            isActive('calendar.*')
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        "
                    >
                        <OneForMindIcon name="calendar" size="18" />
                    </div>
                    <span v-if="showLabels" class="text-[12px] font-semibold tracking-tight truncate flex-1">{{ $t('nav_item_calendar') }}</span>
                    <div v-if="!canUse('calendar') && showLabels" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.6)]"></div>
                    <div v-if="isActive('calendar.*') && showLabels" class="nav-active-bar"></div>
                </div>

                <div
                    v-if="showModule('job')"
                    class="nav-item group cursor-pointer"
                    :class="[
                        isActive('jobs.*') ? 'nav-item-active' : 'nav-item-default',
                        itemLayout,
                        !canUse('job') ? 'opacity-60' : '',
                    ]"
                    :title="!showLabels ? $t('nav_item_jobs') : ''"
                    @click="goJob"
                >
                    <div
                        class="nav-icon shrink-0"
                        :class="
                            isActive('jobs.*')
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        "
                    >
                        <OneForMindIcon name="job" size="18" />
                    </div>
                    <span v-if="showLabels" class="text-[12px] font-semibold tracking-tight truncate flex-1">{{ $t('nav_item_jobs') }}</span>
                    <div v-if="!canUse('job') && showLabels" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.6)]"></div>
                    <div v-if="isActive('jobs.*') && showLabels" class="nav-active-bar"></div>
                </div>

                <div
                    v-if="showModule('goal')"
                    class="nav-item group cursor-pointer"
                    :class="[
                        isActive('goals.*') ? 'nav-item-active' : 'nav-item-default',
                        itemLayout,
                        !canUse('goal') ? 'opacity-60' : '',
                    ]"
                    :title="!showLabels ? $t('nav_item_goals') : ''"
                    @click="goGoal"
                >
                    <div
                        class="nav-icon shrink-0"
                        :class="
                            isActive('goals.*')
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        "
                    >
                        <OneForMindIcon name="goal" size="18" />
                    </div>
                    <span v-if="showLabels" class="text-[12px] font-semibold tracking-tight truncate flex-1">{{ $t('nav_item_goals') }}</span>
                    <div v-if="!canUse('goal') && showLabels" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.6)]"></div>
                    <div v-if="isActive('goals.*') && showLabels" class="nav-active-bar"></div>
                </div>
            </div>
        </Transition>

        <div class="h-3"></div>

        <template v-if="!isExplorer">
            <div class="px-2 py-1.5 mb-0.5" :class="isDrawer ? 'px-3' : ''">
                <div v-if="!isDrawer && collapsed" class="h-px bg-slate-100 dark:bg-slate-800 w-full my-2"></div>
                <span v-else class="text-[9px] font-black text-indigo-400/80 dark:text-indigo-600/80 tracking-wide ml-1"> Neural OS </span>
            </div>

            <div
                class="nav-item group cursor-pointer relative overflow-hidden"
                :class="[
                    isActive('coach.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 hover:text-indigo-700 dark:hover:text-indigo-300',
                    itemLayout,
                ]"
                :title="!showLabels ? $t('nav_item_coach', 'AI Coach') : ''"
                @click="goCoach"
            >
                <div class="shrink-0 text-indigo-500">
                    <OneForMindIcon name="sparkles" size="18" />
                </div>
                <span v-if="showLabels" class="text-[12px] font-semibold tracking-tight truncate flex-1">{{ $t('nav_item_coach', 'AI Coach') }}</span>
                <span v-if="showLabels" class="text-[8px] font-black text-indigo-500 uppercase bg-indigo-100 dark:bg-indigo-500/20 px-1.5 py-0.5 rounded-full shrink-0">AI</span>
                <div v-if="isActive('coach.*') && showLabels" class="nav-active-bar bg-indigo-500"></div>
            </div>
        </template>
    </div>
</template>

<style scoped>
.nav-item {
    @apply flex items-center w-full rounded-xl transition-all duration-150 relative;
}

.nav-item-active {
    @apply bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold;
}

.nav-item-default {
    @apply text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium;
}

.nav-active-bar {
    @apply absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-600 rounded-r-full;
}

.nav-icon {
    @apply flex items-center justify-center transition-colors;
}
</style>
