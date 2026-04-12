<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { trans } from 'laravel-vue-i18n';
import CommandPalettePanel from '@/Components/CommandPalettePanel.vue';

const props = defineProps({
    isOpen: Boolean,
    /** Optional placeholder override */
    searchPlaceholder: { type: String, default: '' },
});

const emit = defineEmits(['close']);

const isNarrowViewport = ref(false);
let mediaQuery;

const updateViewport = () => {
    isNarrowViewport.value = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
};

const searchQuery = ref('');
const activeFilter = ref('all');
const panelRef = ref(null);

const filters = [
    { key: 'all', label: 'All', icon: 'search' },
    { key: 'habit', label: 'Habits', icon: 'habit' },
    { key: 'task', label: 'Tasks', icon: 'planner' },
    { key: 'people', label: 'People', icon: 'avatar' },
];

const navigation = [
    { name: 'Dashboard', icon: 'dashboard', href: route('dashboard'), type: 'all' },
    { name: 'Habit Tracker', icon: 'habit', href: route('habits.index'), type: 'habit' },
    { name: 'Daily Planner', icon: 'planner', href: route('planner.index'), type: 'task' },
    { name: 'Finance Manager', icon: 'finance', href: route('finance.index'), type: 'all' },
];

const filteredResults = computed(() => {
    let items = navigation;

    if (activeFilter.value !== 'all') {
        items = items.filter((i) => i.type === activeFilter.value);
    }

    if (!searchQuery.value) {
        return items;
    }
    return items.filter((item) => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const placeholderText = computed(() => {
    if (props.searchPlaceholder) {
        return props.searchPlaceholder;
    }
    const t = trans('nav_search_placeholder');
    return t !== 'nav_search_placeholder' ? t : 'Search modules…';
});

watch(
    () => props.isOpen,
    (val) => {
        updateViewport();
        if (val) {
            nextTick(() => {
                setTimeout(() => panelRef.value?.focusInput(), 50);
            });
        } else {
            searchQuery.value = '';
            activeFilter.value = 'all';
        }
    }
);

onMounted(() => {
    updateViewport();
    mediaQuery = window.matchMedia('(max-width: 767px)');
    mediaQuery.addEventListener('change', updateViewport);
});

onUnmounted(() => {
    mediaQuery?.removeEventListener('change', updateViewport);
});
</script>

<template>
    <Teleport to="body" :disabled="!isNarrowViewport">
        <div
            v-if="isOpen"
            class="flex flex-col"
            :class="
                isNarrowViewport
                    ? 'fixed inset-x-0 bottom-0 top-16 z-[100] px-3 pt-3'
                    : 'absolute left-0 top-full z-[100] mt-2 w-full min-w-[320px] max-w-2xl origin-top transition-all duration-200'
            "
        >
            <div
                aria-hidden="true"
                :class="
                    isNarrowViewport
                        ? 'absolute inset-0 z-0 bg-slate-950/60'
                        : 'fixed inset-0 z-[90] bg-transparent'
                "
                @click="emit('close')"
            ></div>

            <CommandPalettePanel
                ref="panelRef"
                :search-query="searchQuery"
                :active-filter="activeFilter"
                :filters="filters"
                :filtered-results="filteredResults"
                :is-narrow="isNarrowViewport"
                :search-placeholder="placeholderText"
                class="relative z-[100]"
                @update:search-query="(v) => (searchQuery = v)"
                @update:active-filter="(v) => (activeFilter = v)"
                @close="emit('close')"
            />
        </div>
    </Teleport>
</template>
