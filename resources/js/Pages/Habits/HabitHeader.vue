<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
  user: Object,
  greetingKey: String,
  todayDate: String,
  currentMonth: String,
  currentMonthValue: String,
  todayProgress: [Number, String],
  changeMonth: Function,
  openCreateModal: Function,
});

const isOpen = ref(false);
const showHint = ref(true);

const months = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Computed
const activeYear = computed(() =>
  props.currentMonthValue ? dayjs(props.currentMonthValue).year() : dayjs().year()
);

const activeMonthNum = computed(() =>
  props.currentMonthValue ? dayjs(props.currentMonthValue).month() : dayjs().month()
);

// Methods
const selectMonth = (monthIndex) => {
  const month = String(monthIndex + 1).padStart(2, '0');
  const payload = `${activeYear.value}-${month}`;
  isOpen.value = false;
  props.changeMonth(payload);
};

const changeYear = (offset) => {
  const payload = `${activeYear.value + offset}-${String(activeMonthNum.value + 1).padStart(2, '0')}`;
  props.changeMonth(payload);
};
</script>

<template>
  <div class="relative md:sticky md:top-0 z-50 transition-all bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
    <div class="max-w-full px-4 py-4 mx-auto sm:px-6 lg:px-8">
      
      <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
        
        <div class="flex items-center w-full gap-4 md:w-auto">
          <div class="flex items-center justify-center text-white shadow-lg w-12 h-12 bg-indigo-600 rounded-xl shadow-indigo-200 dark:shadow-none shrink-0">
            <OneForMindIcon name="habit" size="28" />
          </div>

          <div>
            <h1 class="text-xl font-black leading-tight tracking-tight md:text-2xl text-slate-800 dark:text-slate-100">
              {{ $t('habit_page_title', 'Habit Tracker') }}
            </h1>
            <p class="mt-0.5 text-sm font-medium capitalize text-slate-500 dark:text-slate-400">{{ todayDate }}</p>
          </div>
        </div>

        <div class="flex items-center w-full gap-3 md:w-auto">
          
          <div class="relative flex-1 md:flex-none">
            <button 
              @click="isOpen = !isOpen" 
              class="w-full flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-4 pr-3 py-2.5 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-sm transition-all active:scale-95"
            >
              <div class="flex flex-col items-start leading-none">
                <span class="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-tighter mb-0.5">{{ $t('label_period') }}</span>
                <span class="text-xs uppercase tracking-wide">{{ currentMonth }}</span>
              </div>
              <div class="p-1 bg-white dark:bg-slate-800 border shadow-sm rounded-lg border-slate-100 dark:border-slate-700 flex items-center justify-center">
                <OneForMindIcon name="chevron-down" size="12" stroke-width="3" class="text-indigo-500 transition-transform duration-300" :class="{'rotate-180': isOpen}" />
              </div>
            </button>

            <Transition name="slide-fade">
              <div v-if="isOpen" class="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 p-4 z-[60] origin-top-right">
                <div class="fixed inset-0 z-[-1]" @click="isOpen = false"></div>
                
                <div class="relative z-10">
                  <div class="flex items-center justify-between px-2 mb-4">
                    <button @click.stop="changeYear(-1)" class="p-2 transition rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                      <OneForMindIcon name="chevron-left" size="16" stroke-width="3" />
                    </button>
                    <span class="text-lg font-black tracking-tighter text-slate-800 dark:text-slate-100">{{ activeYear }}</span>
                    <button @click.stop="changeYear(1)" class="p-2 transition rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                      <OneForMindIcon name="chevron-right" size="16" stroke-width="3" />
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-3 gap-2">
                    <button 
                      v-for="(month, index) in months" 
                      :key="month" 
                      @click="selectMonth(index)"
                      :class="[
                        'py-3 rounded-2xl text-[10px] font-black transition-all uppercase tracking-widest',
                        activeMonthNum === index 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                          : 'hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                      ]"
                    >
                      {{ month.slice(0, 3) }}
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <div class="hidden lg:flex items-center gap-3 px-4 border-x border-slate-100/80 dark:border-slate-800/80">
            <div class="text-right">
              <p class="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">{{ $t('label_daily') }}</p>
              <p class="text-lg font-black text-slate-700 dark:text-slate-200 leading-none">{{ todayProgress }}%</p>
            </div>
            <div class="relative w-10 h-10">
              <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" class="stroke-slate-100 dark:stroke-slate-800" stroke-width="4"></circle>
                <circle cx="18" cy="18" r="16" fill="none" class="stroke-indigo-600 transition-all duration-1000" stroke-width="4" stroke-linecap="round"
                  :style="{ strokeDasharray: `${todayProgress}, 100` }"></circle>
              </svg>
            </div>
          </div>

          <button 
            @click="openCreateModal" 
            class="h-[46px] px-5 flex items-center gap-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-indigo-200 dark:shadow-none transition-all duration-300"
          >
            <div class="bg-white/20 rounded-lg p-0.5 flex items-center justify-center">
              <OneForMindIcon name="plus" size="16" stroke-width="3" />
            </div>
            <span class="hidden md:inline uppercase text-xs tracking-widest">{{ $t('btn_add_habit') }}</span>
          </button>
        </div>
      </div>

      <Transition name="fade">
        <div v-if="showHint" class="flex items-center justify-between mt-4 p-2 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100/50 dark:border-indigo-500/20">
          <div class="flex items-center gap-6 px-2 overflow-x-auto no-scrollbar">
            <div class="flex items-center gap-2 shrink-0">
              <span class="flex items-center justify-center w-5 h-5 bg-indigo-600 text-white text-[8px] rounded-md font-bold shadow-sm md:hidden">TAP</span>
              <span class="hidden md:flex items-center justify-center w-5 h-5 bg-indigo-600 text-white text-[8px] rounded-md font-bold shadow-sm">L</span>
              <span class="text-[10px] font-bold text-indigo-900/60 dark:text-indigo-400 capitalize tracking-tight">
                <span class="md:hidden">{{ $t('hint_tap_done') }}</span>
                <span class="hidden md:inline">{{ $t('hint_click_done') }}</span>
              </span>
            </div>
            <div class="flex items-center gap-2 shrink-0 border-l border-indigo-200/50 dark:border-indigo-800 pl-6">
              <span class="flex items-center justify-center w-5 h-5 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[8px] rounded-md font-bold border border-slate-200 dark:border-slate-700 shadow-sm md:hidden">HOLD</span>
              <span class="hidden md:flex items-center justify-center w-5 h-5 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[8px] rounded-md font-bold border border-slate-200 dark:border-slate-700 shadow-sm">R</span>
              <span class="text-[10px] font-bold text-indigo-900/60 dark:text-indigo-400 capitalize tracking-tight">
                <span class="md:hidden">{{ $t('hint_hold_skip') }}</span>
                <span class="hidden md:inline">{{ $t('hint_click_skip') }}</span>
              </span>
            </div>
          </div>
          <button @click="showHint = false" class="p-1 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg text-indigo-400 transition flex items-center justify-center">
            <OneForMindIcon name="x" size="14" stroke-width="3" />
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* ANIMASI DROPDOWN */
.slide-fade-enter-active { transition: all 0.2s ease-out; }
.slide-fade-leave-active { transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1); }
.slide-fade-enter-from, .slide-fade-leave-to { 
  transform: translateY(10px); 
  opacity: 0; 
}

/* ANIMASI FADE HINT */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>