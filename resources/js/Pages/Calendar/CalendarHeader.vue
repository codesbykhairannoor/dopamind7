<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
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
    <div class="relative z-50 transition-all bg-white dark:bg-slate-900 border-b shadow-sm dark:shadow-none border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div class="w-full min-w-0 px-4 py-2 sm:px-6 lg:px-8">
            
            <div class="flex flex-col items-stretch justify-between w-full min-w-0 gap-3 md:flex-row md:items-center">
                
                <div class="flex items-center gap-2 w-full min-w-0 md:w-auto md:max-w-[min(100%,22rem)]">
                    <p class="shrink-0 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4">
                        {{ $t('calendar_title', 'Master Calendar') }}
                    </p>
                    <div class="flex min-w-0 flex-1 items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50 overflow-hidden">
                        <OneForMindIcon name="calendar" size="14" class="text-indigo-500 shrink-0" />
                        <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 capitalize truncate">{{ displayMonth }}</span>
                    </div>
                </div>

                <div class="flex min-w-0 flex-wrap items-center w-full gap-3 md:w-auto md:flex-nowrap md:justify-end">
                    
                    <div class="relative min-w-0 flex-1 md:flex-none md:max-w-xs">
                        <button 
                            @click="isOpen = !isOpen" 
                            class="w-full min-w-0 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-4 pr-3 py-2 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all active:scale-95 transition-colors duration-500"
                        >
                            <div class="flex min-w-0 flex-1 flex-col items-start leading-none text-left">
                                <span class="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-widest leading-none">{{ $t('label_period', 'Period') }}</span>
                                <span class="w-full truncate text-[11px] font-black leading-none mt-1">{{ displayMonth }}</span>
                            </div>
                             <div class="p-1 bg-white dark:bg-slate-800 border shadow-sm dark:shadow-none rounded-lg border-slate-100 dark:border-slate-700 flex items-center justify-center transition-colors duration-500">
                                <OneForMindIcon name="chevron-down" size="12" stroke-width="3" class="text-indigo-500 transition-transform duration-300" :class="{'rotate-180': isOpen}" />
                            </div>
                        </button>

                        <Transition name="slide-fade">
                            <div v-if="isOpen" class="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 z-[60] origin-top-right transition-colors duration-500">
                                <div class="fixed inset-0 z-[-1]" @click="isOpen = false"></div>
                                
                                <div class="relative z-10">
                                    <div class="flex items-center justify-between px-3 mb-6 bg-slate-50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-slate-800 rounded-[1.5rem] py-2 transition-colors duration-500">
                                        <button @click.stop="changeYear(-1)" class="p-2.5 transition rounded-xl hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm dark:shadow-none bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                            <OneForMindIcon name="chevron-left" size="16" stroke-width="3" />
                                        </button>
                                        <span class="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 transition-colors duration-500">{{ activeYear }}</span>
                                        <button @click.stop="changeYear(1)" class="p-2.5 transition rounded-xl hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm dark:shadow-none bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                            <OneForMindIcon name="chevron-right" size="16" stroke-width="3" />
                                        </button>
                                    </div>
                                    
                                    <div class="grid grid-cols-3 gap-3">
                                        <button 
                                            v-for="(month, index) in monthsList" 
                                            :key="month" 
                                            @click="selectMonth(index)"
                                            :class="[
                                                'py-4 rounded-2xl text-[11px] font-black transition-all transition-colors duration-500',
                                                activeMonthNum === index 
                                                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none scale-105' 
                                                    : 'hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900'
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
                        class="h-11 px-6 flex items-center gap-3 bg-indigo-600 text-white rounded-xl font-black hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/40 transition-all duration-500 shrink-0"
                    >
                        <OneForMindIcon name="plus" size="16" stroke-width="4" class="text-white" />
                        <span class="hidden md:inline text-[11px] tracking-wide font-black">{{ $t('btn_add_event', 'Add event') }}</span>
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