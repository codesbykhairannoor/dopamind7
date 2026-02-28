<script setup>
import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';

const props = defineProps({
  currentMonth: String,
  currentMonthKey: String,
  onChangeDate: Function,
  onAddClick: Function
});

// State & Composables
const page = usePage();
const { activeCurrency, supportedCurrencies, setCurrency, appLocale } = useFinanceFormat();
const isDateDropdownOpen = ref(false);
const isCurrencyDropdownOpen = ref(false);

const months = [
  { name: 'month_jan' }, { name: 'month_feb' }, { name: 'month_mar' },
  { name: 'month_apr' }, { name: 'month_may' }, { name: 'month_jun' },
  { name: 'month_jul' }, { name: 'month_aug' }, { name: 'month_sep' },
  { name: 'month_oct' }, { name: 'month_nov' }, { name: 'month_dec' }
];

// Computed Properties
const todayDisplay = computed(() => {
  const currentLocale = (appLocale.value ? appLocale.value.split('-')[0] : (page.props.locale || 'id'));
  return dayjs().locale(currentLocale).format('dddd, D MMMM YYYY');
});

const activeYear = computed(() => 
  props.currentMonthKey ? dayjs(props.currentMonthKey).year() : dayjs().year()
);

const activeMonthNum = computed(() => 
  props.currentMonthKey ? dayjs(props.currentMonthKey).month() : dayjs().month()
);

// Format bulan singkat untuk mobile (misal: "Feb 2026")
const shortMonthDisplay = computed(() => {
    if (!props.currentMonthKey) return '';
    const currentLocale = (appLocale.value ? appLocale.value.split('-')[0] : (page.props.locale || 'id'));
    return dayjs(props.currentMonthKey).locale(currentLocale).format('MMM YYYY');
});

const activeCurrencyDetails = computed(() => 
  supportedCurrencies.find(c => c.code === activeCurrency.value) || supportedCurrencies[0]
);

// Methods
const selectMonth = (monthIndex) => {
  const month = String(monthIndex + 1).padStart(2, '0');
  props.onChangeDate(`${activeYear.value}-${month}`);
  isDateDropdownOpen.value = false;
};

const changeYear = (offset) => {
  const newYear = activeYear.value + offset;
  const month = String(activeMonthNum.value + 1).padStart(2, '0');
  props.onChangeDate(`${newYear}-${month}`);
};

</script>

<template>
  <div class="relative z-[60] px-4 py-4 transition-all bg-white dark:bg-slate-900 border-b shadow-sm border-slate-200 sm:px-6 lg:px-8 md:sticky md:top-0">
    <div class="flex flex-col items-center justify-between w-full gap-3 md:flex-row">
      
      <div class="flex items-center justify-between w-full md:w-auto">
        <div class="flex items-center gap-3 md:gap-4">
            <div class="flex items-center justify-center text-xl md:text-2xl text-white shadow-lg w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl shadow-indigo-200 shrink-0">
            💸
            </div>
            <div>
            <h2 class="text-lg md:text-xl font-black leading-tight tracking-tight text-slate-800">{{ $t('finance_plan') }}</h2>
            <p class="mt-0.5 text-[10px] md:text-xs font-medium capitalize text-slate-500">{{ todayDisplay }}</p>
            </div>
        </div>
      </div>

      <div class="flex items-center w-full gap-2 md:w-auto mt-1 md:mt-0">
        
        <div class="relative shrink-0">
          <button 
            @click="isDateDropdownOpen = !isDateDropdownOpen; isCurrencyDropdownOpen = false" 
            class="flex items-center justify-center w-[90px] md:w-auto md:px-4 h-11 transition border bg-slate-50 border-slate-200 rounded-xl gap-1.5 hover:bg-white dark:bg-slate-900 hover:border-indigo-300 shadow-sm group"
            :class="{'bg-indigo-50 border-indigo-200': isDateDropdownOpen}"
          >
            <span class="text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">
                <span class="md:hidden">{{ shortMonthDisplay }}</span>
                <span class="hidden md:inline">{{ currentMonth }}</span>
            </span>
            <svg 
              class="w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-transform shrink-0" 
              :class="{'rotate-180': isDateDropdownOpen}" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <Transition name="slide-fade">
            <div v-if="isDateDropdownOpen" 
                 class="absolute left-0 md:left-auto md:right-0 top-full mt-2 w-[260px] bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-2xl border border-slate-100 p-4 z-[100] origin-top-left md:origin-top-right">
              
              <div class="fixed inset-0 z-[-1]" @click="isDateDropdownOpen = false"></div>
              
              <div class="relative z-10 flex items-center justify-between px-1 mb-3">
                <button @click.stop="changeYear(-1)" class="p-1 rounded-lg hover:bg-slate-100 text-slate-400">❮</button>
                <span class="font-black text-slate-800">{{ activeYear }}</span>
                <button @click.stop="changeYear(1)" class="p-1 rounded-lg hover:bg-slate-100 text-slate-400">❯</button>
              </div>

              <div class="relative z-10 grid grid-cols-3 gap-1.5">
                <button 
                  v-for="(m, i) in months" 
                  :key="m.name" 
                  @click="selectMonth(i)" 
                  class="text-[9px] sm:text-[10px] font-bold py-2.5 rounded-lg transition-all uppercase tracking-wider" 
                  :class="(activeMonthNum === i) ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-indigo-50'"
                >
                  {{ $t(m.name).slice(0,3) }}
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <div class="relative shrink-0">
          <button 
            @click="isCurrencyDropdownOpen = !isCurrencyDropdownOpen; isDateDropdownOpen = false" 
            class="flex items-center justify-center h-11 px-2.5 transition border bg-slate-50 border-slate-200 rounded-xl gap-1 hover:bg-white dark:bg-slate-900 shadow-sm"
          >
            <span class="text-base">{{ activeCurrencyDetails.icon }}</span>
            <span class="text-[9px] font-black text-slate-600">{{ activeCurrency }}</span>
          </button>

          <Transition name="slide-fade">
            <div v-if="isCurrencyDropdownOpen" class="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 p-1.5 z-[100] origin-top-right">
              <div class="fixed inset-0 z-[-1]" @click="isCurrencyDropdownOpen = false"></div>
              <div class="relative z-10">
                <button 
                  v-for="c in supportedCurrencies" 
                  :key="c.code" 
                  @click="setCurrency(c.code); isCurrencyDropdownOpen = false" 
                  class="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-xl transition" 
                  :class="activeCurrency === c.code ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600'"
                >
                  <span class="text-lg">{{ c.icon }}</span>
                  <span class="text-[11px] font-bold">{{ c.code }}</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <button 
          @click="onAddClick" 
          class="flex items-center justify-center flex-1 h-11 px-3 md:px-6 transition shadow-lg bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-indigo-100 gap-1.5 active:scale-95 whitespace-nowrap min-w-0"
        >
          <span class="text-base font-bold text-white leading-none">+</span>
          <span class="text-[10px] md:text-xs font-black text-white tracking-tight uppercase truncate">{{ $t('btn_transaction') }}</span>
        </button>

      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active { transition: all 0.2s ease-out; }
.slide-fade-leave-active { transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1); }
.slide-fade-enter-from, .slide-fade-leave-to { 
  transform: translateY(10px) scale(0.95); 
  opacity: 0; 
}
</style>