<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(['close']);

const searchQuery = ref('');
const inputRef = ref(null);
const activeFilter = ref('all');

// Filters ala Asana
const filters = [
    { key: 'all', label: 'All', icon: 'zap' },
    { key: 'habit', label: 'Habits', icon: 'habit' },
    { key: 'task', label: 'Tasks', icon: 'planner' },
    { key: 'people', label: 'People', icon: 'avatar' },
];

const navigation = [
    { name: 'Dashboard', icon: 'zap', href: route('dashboard'), type: 'all' },
    { name: 'Habit Tracker', icon: 'habit', href: route('habits.index'), type: 'habit' },
    { name: 'Daily Planner', icon: 'planner', href: route('planner.index'), type: 'task' },
    { name: 'Finance Manager', icon: 'finance', href: route('finance.index'), type: 'all' },
];

const filteredResults = computed(() => {
    let items = navigation;
    
    // Filter by type
    if (activeFilter.value !== 'all') {
        items = items.filter(i => i.type === activeFilter.value);
    }

    // Filter by search query
    if (!searchQuery.value) return items;
    return items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

watch(() => props.isOpen, (val) => {
    if (val) {
        setTimeout(() => inputRef.value?.focus(), 50);
    } else {
        searchQuery.value = '';
        activeFilter.value = 'all';
    }
});

</script>

<template>
    <div v-if="isOpen" class="absolute left-0 top-full mt-2 z-[100] w-full min-w-[320px] max-w-2xl origin-top transition-all duration-200">
        <!-- Backdrop (Transparent for closing) -->
        <div class="fixed inset-0 z-[-1]" @click="emit('close')"></div>

        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800 overflow-hidden">
            
            <!-- Search Input Area (In-dropdown) -->
            <div class="p-4 border-b border-slate-100 dark:border-slate-800">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <OneForMindIcon name="zap" size="16" class="text-indigo-500" />
                    </div>
                    <input 
                        ref="inputRef"
                        type="text" 
                        v-model="searchQuery"
                        class="w-full pl-10 pr-12 py-2.5 bg-slate-50 dark:bg-slate-800 border-transparent focus:border-indigo-500 rounded-xl text-sm font-bold text-slate-700 dark:text-white placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                        placeholder="Type to search..."
                        @keydown.esc="emit('close')"
                    >
                </div>

                <!-- Filter Pills (Asana Style) -->
                <div class="flex items-center gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar">
                    <button 
                        v-for="filter in filters" :key="filter.key"
                        @click="activeFilter = filter.key"
                        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black tracking-wide transition-all border shrink-0"
                        :class="activeFilter === filter.key 
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none' 
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-700'"
                    >
                        <OneForMindIcon :name="filter.icon" size="12" />
                        {{ filter.label }}
                    </button>
                </div>
            </div>

            <!-- Results List -->
            <div class="max-h-[380px] overflow-y-auto py-2">
                <div v-if="filteredResults.length > 0">
                    <Link 
                        v-for="item in filteredResults" 
                        :key="item.name"
                        :href="item.href"
                        @click="emit('close')"
                        class="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                    >
                        <div class="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-indigo-600 transition-all shadow-sm">
                            <OneForMindIcon :name="item.icon" size="18" />
                        </div>
                        <div class="flex-1">
                            <p class="text-[14px] font-bold text-slate-700 dark:text-slate-200 leading-none">{{ item.name }}</p>
                            <p class="text-[11px] text-slate-400 mt-1 whitespace-nowrap">Go to {{ item.name }} component</p>
                        </div>
                        <OneForMindIcon name="arrow-right" size="14" class="text-slate-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </Link>
                </div>

                <!-- Empty State -->
                <div v-else class="py-12 px-6 text-center">
                    <div class="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <OneForMindIcon name="zap" size="20" class="text-slate-400 opacity-50" />
                    </div>
                    <p class="text-[13px] font-black text-slate-600 dark:text-slate-300">No matching results</p>
                    <p class="text-[11px] text-slate-400 mt-1">Try switching filters or different keywords.</p>
                </div>
            </div>

            <!-- Footer Hints -->
            <div class="px-5 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div class="flex items-center gap-4 text-[10px] text-slate-400 font-bold tracking-wide">
                    <span>↑↓ Navigate</span>
                    <span>⏎ Select</span>
                </div>
                <div class="flex items-center gap-1">
                    <span class="text-[9px] font-black text-indigo-400 dark:text-indigo-500">OneForMind</span>
                </div>
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
