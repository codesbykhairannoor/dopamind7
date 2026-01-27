<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
// Import helper date yang tadi kita bahas (Opsional jika ingin format di sini)
// import { formatToLocal } from '@/Utils/date';

const props = defineProps({
    user: Object,
    greetingKey: String,
    todayDate: String, // Pastikan ini dikirim dalam format terlokalisasi dari parent/backend
    currentMonth: String,
    todayProgress: [Number, String],
    changeMonth: Function,
    openCreateModal: Function,
});

// Optimization: Ambil timezone untuk keperluan format jika perlu
const userTz = computed(() => usePage().props.auth.user.timezone);
</script>

<template>
    <div class="bg-white/95 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-40 transition-all">
        <div class="max-w-full mx-auto px-4 py-3 md:py-6">

            <div class="flex flex-col md:flex-row justify-between items-center gap-4">

                <div class="w-full md:w-auto text-left">
                    <div class="inline-flex items-center gap-2 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">
                        <span class="text-base">📅</span>
                        <span>{{ todayDate }}</span>
                    </div>

                    <h1 class="text-xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
                        {{ $t(greetingKey) }},
                        <span class="text-indigo-600 block sm:inline"> {{ user.name.split(' ')[0] }}
                        </span>!
                    </h1>

                    <p class="text-slate-500 text-sm mt-1 hidden md:block">
                        {{ $t('greet_subtitle') }}
                    </p>
                </div>

                <div class="flex items-center justify-between w-full md:w-auto gap-2 md:gap-4">

                    <div class="flex items-center bg-slate-50 rounded-2xl border border-slate-200 p-1 flex-1 md:flex-none justify-between md:justify-center">
                        <button @click="changeMonth('prev')" 
                                class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-white hover:shadow-sm active:scale-95 transition">
                            <span class="text-lg">‹</span>
                        </button>

                        <span class="px-2 md:px-4 text-[10px] md:text-xs font-extrabold text-slate-700 uppercase tracking-widest min-w-[90px] text-center">
                            {{ currentMonth }}
                        </span>

                        <button @click="changeMonth('next')" 
                                class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-white hover:shadow-sm active:scale-95 transition">
                            <span class="text-lg">›</span>
                        </button>
                    </div>

                    <div class="hidden lg:flex flex-col items-end mr-2">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter"> {{ $t('today_is') }}</span>
                        <div class="flex items-center gap-2">
                            <div class="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div class="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-out" 
                                     :style="{ width: todayProgress + '%' }"></div>
                            </div>
                            <span class="text-xs font-black text-slate-700">{{ todayProgress }}%</span>
                        </div>
                    </div>

                    <button @click="openCreateModal" 
                            class="flex-shrink-0 h-11 w-11 md:h-auto md:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white md:px-5 md:py-3 rounded-2xl font-bold text-sm shadow-indigo-200 shadow-lg hover:bg-indigo-700 active:scale-95 transition-all">
                        <span class="text-xl md:text-sm">+</span>
                        <span class="hidden sm:inline">{{ $t('habit_btn_new') }}</span>
                    </button>

                </div>
            </div>

            <div class="border-t border-slate-50 pt-3 mt-4 flex items-center gap-5 md:gap-8 overflow-x-auto no-scrollbar pb-1">
                <span class="text-[9px] font-black text-slate-300 uppercase tracking-widest shrink-0">
                    {{ $t('legend_instruction') }}
                </span>

                <div v-for="(item, index) in [
                    { icon: '✓', color: 'bg-indigo-600', text: 'legend_left_click', textCol: 'text-white' },
                    { icon: '-', color: 'bg-slate-100', text: 'legend_right_click', textCol: 'text-slate-400', border: 'border border-slate-200' },
                ]" :key="index" class="flex items-center gap-2 shrink-0">
                    <div :class="[item.color, item.textCol, item.border, 'w-5 h-5 rounded-lg flex items-center justify-center text-[10px] shadow-sm font-bold']">
                        {{ item.icon }}
                    </div>
                    <span class="text-[10px] md:text-xs text-slate-600 font-bold tracking-tight italic md:not-italic">
                        {{ $t(item.text) }}
                    </span>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
/* Menghilangkan scrollbar agar tetap clean di mobile tapi bisa digeser */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>