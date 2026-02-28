<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import { usePage } from '@inertiajs/vue3';

const props = defineProps({
    currentMonth: String
});

const emit = defineEmits(['change-month', 'add-event']);
const page = usePage();

// State untuk Dropdown
const isOpen = ref(false);

const monthsList = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Computed Properties
const displayMonth = computed(() => {
    const currentLocale = page.props.locale || 'id';
    return dayjs(props.currentMonth).locale(currentLocale).format('MMMM YYYY');
});

const activeYear = computed(() => dayjs(props.currentMonth).year());
const activeMonthNum = computed(() => dayjs(props.currentMonth).month());

// Methods
const selectMonth = (monthIndex) => {
    const month = String(monthIndex + 1).padStart(2, '0');
    const payload = `${activeYear.value}-${month}`;
    isOpen.value = false;
    emit('change-month', payload);
};

const changeYear = (offset) => {
    const payload = `${activeYear.value + offset}-${String(activeMonthNum.value + 1).padStart(2, '0')}`;
    emit('change-month', payload);
};
</script>

<template>
    <div class="relative z-[60] transition-all bg-white dark:bg-slate-900/80 backdrop-blur-xl border-b shadow-sm border-slate-200 md:sticky md:top-0">
        <div class="max-w-full px-4 py-4 mx-auto sm:px-6 lg:px-8">
            
            <div class="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
                
                <div class="flex items-center w-full gap-4 md:w-auto">
                    <div class="flex items-center justify-center text-2xl text-white shadow-lg w-12 h-12 bg-indigo-600 rounded-xl shadow-indigo-200 shrink-0">
                        🗓️
                    </div>
                    <div>
                        <h2 class="text-xl font-black leading-tight tracking-tight text-slate-800">{{ $t('calendar_title', 'Master Calendar') }}</h2>
                        <p class="mt-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ $t('calendar_subtitle', 'Your bird-eye view') }}</p>
                    </div>
                </div>

                <div class="flex items-center w-full gap-3 md:w-auto">
                    
                    <div class="relative flex-1 md:flex-none">
                        <button 
                            @click="isOpen = !isOpen" 
                            class="w-full flex items-center justify-between gap-4 bg-slate-50 border border-slate-200 pl-4 pr-3 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-white dark:bg-slate-900 hover:border-indigo-300 hover:shadow-sm transition-all active:scale-95"
                        >
                            <div class="flex flex-col items-start leading-none">
                                <span class="text-[9px] text-slate-400 uppercase tracking-tighter mb-0.5">{{ $t('label_period', 'Periode') }}</span>
                                <span class="text-xs uppercase tracking-wide whitespace-nowrap">{{ displayMonth }}</span>
                            </div>
                            <div class="p-1 bg-white dark:bg-slate-900 border shadow-sm rounded-lg border-slate-100">
                                <svg class="w-3 h-3 text-indigo-500 transition-transform duration-300" :class="{'rotate-180': isOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </div>
                        </button>

                        <Transition name="slide-fade">
                            <div v-if="isOpen" class="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 p-4 z-[60] origin-top-right">
                                <div class="fixed inset-0 z-[-1]" @click="isOpen = false"></div>
                                
                                <div class="relative z-10">
                                    <div class="flex items-center justify-between px-2 mb-4 bg-slate-50 rounded-2xl py-1">
                                        <button @click.stop="changeYear(-1)" class="p-2 transition rounded-xl hover:bg-white dark:bg-slate-900 text-slate-400 hover:text-indigo-600 shadow-sm">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="3"></path></svg>
                                        </button>
                                        <span class="text-lg font-black tracking-tighter text-slate-800">{{ activeYear }}</span>
                                        <button @click.stop="changeYear(1)" class="p-2 transition rounded-xl hover:bg-white dark:bg-slate-900 text-slate-400 hover:text-indigo-600 shadow-sm">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="3"></path></svg>
                                        </button>
                                    </div>
                                    
                                    <div class="grid grid-cols-3 gap-2">
                                        <button 
                                            v-for="(month, index) in monthsList" 
                                            :key="month" 
                                            @click="selectMonth(index)"
                                            :class="[
                                                'py-3 rounded-2xl text-[10px] font-black transition-all uppercase tracking-widest',
                                                activeMonthNum === index 
                                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                                                    : 'hover:bg-indigo-50 text-slate-500 hover:text-indigo-600'
                                            ]"
                                        >
                                            {{ month.slice(0, 3) }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>

                    <button 
                        @click="emit('add-event')" 
                        class="h-[46px] px-5 flex items-center gap-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-indigo-200 transition-all duration-300 shrink-0"
                    >
                        <div class="bg-white dark:bg-slate-900/20 rounded-lg p-0.5">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke-width="3" stroke-linecap="round"></path></svg>
                        </div>
                        <span class="hidden md:inline uppercase text-xs tracking-widest">{{ $t('btn_add_event', 'Acara') }}</span>
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* ANIMASI DROPDOWN */
.slide-fade-enter-active { transition: all 0.2s ease-out; }
.slide-fade-leave-active { transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1); }
.slide-fade-enter-from, .slide-fade-leave-to { 
  transform: translateY(10px); 
  opacity: 0; 
}
</style>