<script setup>
import { ref, computed } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import { usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';

const props = defineProps({
    currentMonth: String, 
    currentMonthKey: String, 
    onChangeDate: Function,
    onAddClick: Function
});

const page = usePage();
const { activeCurrency, supportedCurrencies, setCurrency, appLocale } = useFinanceFormat();

// --- LOGIC HARI INI ---
const todayDisplay = computed(() => {
    const currentLocale = (appLocale.value ? appLocale.value.split('-')[0] : (page.props.locale || 'id'));
    return dayjs()
        .locale(currentLocale)
        .format('dddd, D MMMM YYYY'); 
});

// --- LOGIC DROPDOWN TANGGAL ---
const isDateDropdownOpen = ref(false);
const months = [
    { name: 'month_jan' }, { name: 'month_feb' }, { name: 'month_mar' },
    { name: 'month_apr' }, { name: 'month_may' }, { name: 'month_jun' },
    { name: 'month_jul' }, { name: 'month_aug' }, { name: 'month_sep' },
    { name: 'month_oct' }, { name: 'month_nov' }, { name: 'month_dec' }
];

const activeYear = computed(() => 
    props.currentMonthKey ? dayjs(props.currentMonthKey).year() : dayjs().year()
);
const activeMonthNum = computed(() => 
    props.currentMonthKey ? dayjs(props.currentMonthKey).month() : dayjs().month()
);

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

// --- LOGIC DROPDOWN CURRENCY ---
const isCurrencyDropdownOpen = ref(false);
const activeCurrencyDetails = computed(() => 
    supportedCurrencies.find(c => c.code === activeCurrency.value) || supportedCurrencies[0]
);
</script>

<template>
  <div class="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 md:sticky top-0 z-40 transition-all">
    
    <div class="w-full flex flex-col md:flex-row justify-between items-center gap-4">
      
      <div class="flex items-center gap-4 w-full md:w-auto">
        <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg shadow-indigo-200 shrink-0">
          💸
        </div>
        <div>
          <h2 class="text-xl font-black text-slate-800 tracking-tight leading-tight">
            {{ $t('finance_plan') }}
          </h2>
          <p class="text-slate-500 font-medium text-xs capitalize mt-0.5">
            {{ todayDisplay }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto">
        
        <div class="relative">
          <button
            @click="isDateDropdownOpen = !isDateDropdownOpen"
            class="h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-2 hover:bg-white hover:border-indigo-300 transition shadow-sm group w-full md:w-auto justify-between md:justify-start"
          >
            <span class="text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">
              {{ currentMonth }}
            </span>
            <svg class="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-transform"
              :class="{'rotate-180': isDateDropdownOpen}"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <Transition name="slide-fade">
            <div v-if="isDateDropdownOpen"
              class="absolute right-0 top-full mt-2 w-64 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-4 z-50 origin-top-right">
              <div class="flex justify-between items-center mb-3 px-1">
                <button @click.stop="changeYear(-1)" class="p-1 hover:bg-slate-100 rounded-lg text-slate-400">❮</button>
                <span class="font-black text-slate-800">{{ activeYear }}</span>
                <button @click.stop="changeYear(1)" class="p-1 hover:bg-slate-100 rounded-lg text-slate-400">❯</button>
              </div>
              <div class="grid grid-cols-3 gap-1.5">
                <button v-for="(m, i) in months" :key="m.name" @click="selectMonth(i)"
                  class="text-[10px] font-bold py-3 rounded-xl transition-all"
                  :class="(activeMonthNum === i) ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-indigo-50'">
                  {{ $t(m.name).slice(0,3) }}
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <div class="relative">
          <button 
            @click="isCurrencyDropdownOpen = !isCurrencyDropdownOpen"
            class="h-12 px-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-2 hover:bg-white transition shadow-sm"
          >
            <span class="text-lg">{{ activeCurrencyDetails.icon }}</span>
            <span class="text-[10px] font-black text-slate-600">{{ activeCurrency }}</span>
          </button>

          <Transition name="slide-fade">
            <div v-if="isCurrencyDropdownOpen"
              class="absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50 origin-top-right">
              <button v-for="c in supportedCurrencies" :key="c.code"
                @click="setCurrency(c.code); isCurrencyDropdownOpen = false"
                class="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-xl transition"
                :class="activeCurrency === c.code ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600'">
                <span>{{ c.icon }}</span>
                <span class="text-[11px] font-bold">{{ c.code }}</span>
              </button>
            </div>
          </Transition>
        </div>

        <button 
          @click="onAddClick"
          class="flex-1 md:flex-none h-12 px-6 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 text-sm active:scale-95 whitespace-nowrap"
        >
          <span class="text-xl">+</span>
          <span class="uppercase tracking-tight hidden md:inline">{{ $t('btn_transaction') }}</span>
          <span class="uppercase tracking-tight md:hidden">{{ $t('btn_add') || 'ADD' }}</span> </button>

      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active { transition: all 0.3s ease-out; }
.slide-fade-leave-active { transition: all 0.2s ease-in; }
.slide-fade-enter-from, .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
}
</style>