<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

defineProps({
    searchQuery: { type: String, required: true },
    activeFilter: { type: String, required: true },
    filters: { type: Array, required: true },
    filteredResults: { type: Array, required: true },
    isNarrow: { type: Boolean, default: false },
    searchPlaceholder: { type: String, default: '' },
});

const emit = defineEmits(['update:searchQuery', 'update:activeFilter', 'close']);

const inputEl = ref(null);

defineExpose({
    focusInput: () => inputEl.value?.focus(),
});
</script>

<template>
    <div
        class="relative z-10 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_25px_60px_rgba(0,0,0,0.2)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
        :class="isNarrow ? 'mx-auto w-full max-w-lg max-h-[min(78vh,calc(100dvh-5rem))]' : ''"
    >
        <div class="border-b border-slate-100 p-4 dark:border-slate-800">
            <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <OneForMindIcon name="search" size="16" class="text-indigo-500" />
                </div>
                <input
                    ref="inputEl"
                    type="text"
                    class="w-full rounded-xl border-transparent bg-slate-50 py-2.5 pl-10 pr-12 text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                    :value="searchQuery"
                    :placeholder="searchPlaceholder"
                    @input="emit('update:searchQuery', $event.target.value)"
                    @keydown.esc="emit('close')"
                />
            </div>

            <div class="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto pb-1">
                <button
                    v-for="filter in filters"
                    :key="filter.key"
                    type="button"
                    class="flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-black tracking-wide transition-all"
                    :class="
                        activeFilter === filter.key
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-700'
                    "
                    @click="emit('update:activeFilter', filter.key)"
                >
                    <OneForMindIcon :name="filter.icon" size="12" />
                    {{ filter.label }}
                </button>
            </div>
        </div>

        <div
            class="overflow-y-auto py-2"
            :class="isNarrow ? 'max-h-[min(48vh,420px)] min-h-0 flex-1' : 'max-h-[380px]'"
        >
            <div v-if="filteredResults.length > 0">
                <Link
                    v-for="item in filteredResults"
                    :key="item.name"
                    :href="item.href"
                    class="group flex items-center gap-4 px-5 py-3.5 transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
                    @click="emit('close')"
                >
                    <div
                        class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-400 shadow-sm transition-all group-hover:bg-white group-hover:text-indigo-600 dark:bg-slate-800 dark:group-hover:bg-slate-700"
                    >
                        <OneForMindIcon :name="item.icon" size="18" />
                    </div>
                    <div class="flex-1">
                        <p class="text-[14px] font-bold leading-none text-slate-700 dark:text-slate-200">{{ item.name }}</p>
                        <p class="mt-1 whitespace-nowrap text-[11px] text-slate-400">Go to {{ item.name }} component</p>
                    </div>
                    <OneForMindIcon
                        name="arrow-right"
                        size="14"
                        class="-translate-x-2 text-slate-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                </Link>
            </div>

            <div v-else class="px-6 py-12 text-center">
                <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <OneForMindIcon name="zap" size="20" class="text-slate-400 opacity-50" />
                </div>
                <p class="text-[13px] font-black text-slate-600 dark:text-slate-300">No matching results</p>
                <p class="mt-1 text-[11px] text-slate-400">Try switching filters or different keywords.</p>
            </div>
        </div>

        <div
            class="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-2.5 dark:border-slate-800 dark:bg-slate-800/50"
        >
            <div class="flex items-center gap-4 text-[10px] font-bold tracking-wide text-slate-400">
                <span>↑↓ Navigate</span>
                <span>⏎ Select</span>
            </div>
            <span class="text-[9px] font-black text-indigo-400 dark:text-indigo-500">OneForMind</span>
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
