<script setup>
import { watch } from 'vue';
import { useChainSyncDrawer } from '@/Composables/useChainSyncDrawer';

const {
    drawerState,
    searchQuery,
    searchResults,
    links,
    timeline,
    loading,
    loadingSearch,
    currentStep,
    selectedModule,
    selectedItem,
    thresholdConfig,
    plannerConfig,
    financeConfig,
    closeDrawer,
    fetchSearchOptions,
    selectModule,
    selectItem,
    goToStep,
    connectMultiStep,
} = useChainSyncDrawer();

let searchTimer = null;
const weekdays = [
    { id: 1, label: 'Mon' },
    { id: 2, label: 'Tue' },
    { id: 3, label: 'Wed' },
    { id: 4, label: 'Thu' },
    { id: 5, label: 'Fri' },
    { id: 6, label: 'Sat' },
    { id: 7, label: 'Sun' },
];

const moduleInstructions = {
    goals: 'Goal mode: tentukan setiap berapa kali habit selesai, progress goal bertambah.',
    planner: 'Planner mode: atur task timeline otomatis, jam berapa dan pola harinya.',
    finance: 'Finance mode: pilih transaksi otomatis atau langsung tambah tabungan.',
};

watch(searchQuery, (value) => {
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        const typeMap = {
            goals: ['goal'],
            planner: ['planner_task'],
            finance: ['finance_category', 'finance_saving'],
            habit: ['habit'],
        };
        fetchSearchOptions(value, typeMap[selectedModule.value] || ['goal', 'planner_task', 'finance_category', 'finance_saving'], selectedModule.value);
    }, 350);
});

const moduleOptions = [
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'planner', label: 'Planner', icon: '🗓️' },
    { id: 'finance', label: 'Finance', icon: '💸' },
    { id: 'habit', label: 'Habit', icon: '🔥' },
];
</script>

<template>
    <Teleport to="body">
        <div v-if="drawerState.isOpen" class="fixed inset-0 z-[90]">
            <button class="absolute inset-0 bg-slate-900/35 backdrop-blur-[1px]" @click="closeDrawer" />
            <aside class="absolute right-0 top-0 h-full w-full max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl p-5 flex flex-col">
                <div class="flex items-start justify-between gap-3 mb-4">
                    <div>
                        <p class="text-xs font-black uppercase tracking-widest text-indigo-500">ChainSync</p>
                        <h3 class="text-lg font-black text-slate-800 dark:text-slate-100">{{ drawerState.source?.title || $t('chainsync_drawer_engine', 'Connection Engine') }}</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400">{{ drawerState.source?.type }} #{{ drawerState.source?.id }}</p>
                    </div>
                    <button @click="closeDrawer" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">✕</button>
                </div>

                <div class="space-y-2">
                    <div class="w-full rounded-xl bg-slate-100 dark:bg-slate-800 p-1 grid grid-cols-3 text-[11px] font-bold">
                        <div class="text-center py-1 rounded-lg" :class="currentStep >= 1 ? 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200' : 'text-slate-400'">1. Module</div>
                        <div class="text-center py-1 rounded-lg" :class="currentStep >= 2 ? 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200' : 'text-slate-400'">2. Target</div>
                        <div class="text-center py-1 rounded-lg" :class="currentStep >= 3 ? 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200' : 'text-slate-400'">3. Action</div>
                    </div>
                    <p v-if="selectedModule" class="text-xs text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/30 rounded-xl p-2">
                        {{ moduleInstructions[selectedModule] }}
                    </p>
                </div>

                <section class="mt-4 flex-1 min-h-0 space-y-3">
                    <div class="flex items-center gap-2">
                        <button v-if="currentStep > 1" @click="goToStep(currentStep - 1)" class="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">←</button>
                        <p class="text-xs font-black uppercase tracking-widest text-slate-400">
                            Step {{ currentStep }} / 3
                        </p>
                    </div>

                    <div v-if="drawerState.source?.type !== 'habit'" class="text-xs text-amber-600 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-xl border border-amber-200/60 dark:border-amber-500/30">
                        Habit-first flow is active for this phase.
                    </div>

                    <div v-if="currentStep === 1" class="grid grid-cols-2 gap-2">
                        <button
                            v-for="module in moduleOptions"
                            :key="module.id"
                            @click="selectModule(module.id)"
                            :disabled="drawerState.source?.type !== 'habit' || !['goals','planner','finance'].includes(module.id)"
                            class="p-3 rounded-xl border text-left transition"
                            :class="['goals','planner','finance'].includes(module.id) && drawerState.source?.type === 'habit'
                                ? 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                                : 'border-slate-100 dark:border-slate-800 opacity-40 cursor-not-allowed'"
                        >
                            <p class="text-lg">{{ module.icon }}</p>
                            <p class="text-sm font-bold text-slate-700 dark:text-slate-200">{{ module.label }}</p>
                        </button>
                    </div>

                    <div v-else-if="currentStep === 2" class="space-y-2">
                        <input v-model="searchQuery" type="text" :placeholder="$t('chainsync_drawer_search', 'Search target...')" class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm" />
                        <h4 class="text-xs font-black uppercase tracking-widest text-slate-400">{{ $t('chainsync_drawer_search_results', 'Search Results') }}</h4>
                        <div v-if="loadingSearch" class="text-xs text-slate-400">Loading target options...</div>
                        <div class="space-y-2 overflow-y-auto custom-scrollbar max-h-64">
                            <button
                                v-for="item in searchResults"
                                :key="`${item.type}-${item.id}`"
                                @click="selectItem(item)"
                                class="w-full text-left p-2 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                <p class="text-sm font-bold text-slate-700 dark:text-slate-200">{{ item.title }}</p>
                                <p class="text-[11px] text-slate-500">{{ item.subtitle }}</p>
                            </button>
                        </div>
                    </div>

                    <div v-else-if="currentStep === 3" class="space-y-3">
                        <div class="p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                            <p class="text-xs font-bold text-slate-500 uppercase">{{ selectedModule }}</p>
                            <p class="text-sm font-black text-slate-800 dark:text-slate-100">{{ selectedItem?.title }}</p>
                        </div>

                        <div v-if="selectedModule === 'goals'" class="space-y-2 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                            <p class="text-xs font-black uppercase tracking-widest text-slate-400">Threshold Sync</p>
                            <div class="grid grid-cols-2 gap-2">
                                <input v-model.number="thresholdConfig.threshold" type="number" min="1" class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Every N checks" />
                                <input v-model.number="thresholdConfig.increment" type="number" min="1" class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Add progress X" />
                            </div>
                        </div>

                        <div v-if="selectedModule === 'planner'" class="space-y-2 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                            <p class="text-xs font-black uppercase tracking-widest text-slate-400">Auto-Timeline</p>
                            <p class="text-[11px] text-slate-500">Buat card planner otomatis saat habit ini dicentang.</p>
                            <div class="grid grid-cols-2 gap-2">
                                <input v-model="plannerConfig.start_time" type="time" class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
                                <input v-model="plannerConfig.end_time" type="time" class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
                                <input v-model.number="plannerConfig.days_ahead" type="number" min="1" max="30" class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Days ahead" />
                                <input v-model.number="plannerConfig.duration_days" type="number" min="1" max="7" class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Duration days" />
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                <label class="text-xs flex items-center gap-2">
                                    <input v-model="plannerConfig.weekdays_mode" type="radio" value="daily">
                                    Setiap hari
                                </label>
                                <label class="text-xs flex items-center gap-2">
                                    <input v-model="plannerConfig.weekdays_mode" type="radio" value="specific">
                                    Hari tertentu
                                </label>
                            </div>
                            <div v-if="plannerConfig.weekdays_mode === 'specific'" class="flex flex-wrap gap-2">
                                <label v-for="day in weekdays" :key="day.id" class="text-xs px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                                    <input v-model="plannerConfig.weekdays" type="checkbox" :value="day.id" class="mr-1">
                                    {{ day.label }}
                                </label>
                            </div>
                        </div>

                        <div v-if="selectedModule === 'finance'" class="space-y-2 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                            <p class="text-xs font-black uppercase tracking-widest text-slate-400">Finance Automation</p>
                            <div class="grid grid-cols-2 gap-2">
                                <label class="text-xs flex items-center gap-2">
                                    <input v-model="financeConfig.mode" type="radio" value="transaction">
                                    Transaksi otomatis
                                </label>
                                <label class="text-xs flex items-center gap-2">
                                    <input v-model="financeConfig.mode" type="radio" value="saving">
                                    Tambah tabungan
                                </label>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                <input v-model.number="financeConfig.amount" type="number" min="1" class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Amount" />
                                <select v-model="financeConfig.type" class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
                                    <option value="expense">Kurangi uang (expense/deposit)</option>
                                    <option value="income">Tambah uang (income/withdraw)</option>
                                </select>
                            </div>
                        </div>

                        <button @click="connectMultiStep" class="w-full py-2.5 rounded-xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 transition">
                            Save ChainSync Rule
                        </button>
                    </div>
                </section>

                <section class="mt-4 grid grid-cols-2 gap-3 min-h-0">
                    <div class="rounded-xl border border-slate-100 dark:border-slate-700 p-3">
                        <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('chainsync_drawer_connections', 'Connections') }}</h4>
                        <div v-if="loading" class="text-xs text-slate-400">{{ $t('chainsync_loading', 'Loading...') }}</div>
                        <div class="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                            <p v-for="link in links" :key="link.id" class="text-xs text-slate-600 dark:text-slate-300">{{ link.target_type }} #{{ link.target_id }}</p>
                        </div>
                    </div>
                    <div class="rounded-xl border border-slate-100 dark:border-slate-700 p-3">
                        <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('chainsync_timeline_title', 'Timeline') }}</h4>
                        <div class="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                            <p v-for="item in timeline" :key="item.id" class="text-xs text-slate-600 dark:text-slate-300">{{ item.event_name }} · {{ item.status }}</p>
                        </div>
                    </div>
                </section>
            </aside>
        </div>
    </Teleport>
</template>
