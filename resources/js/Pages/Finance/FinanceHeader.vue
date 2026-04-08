<script setup>
import { ref, computed } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import { router, usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import 'dayjs/locale/id';
import 'dayjs/locale/en';

const props = defineProps({
  currentMonth: String,
  currentMonthKey: String,
  onChangeDate: Function,
  onAddClick: Function,
  aiAudit: String,
  isExplorer: Boolean
});

// State & Composables
const page = usePage();
const { activeCurrency, supportedCurrencies, setCurrency, appLocale } = useFinanceFormat();
const isDateDropdownOpen = ref(false);
const isCurrencyDropdownOpen = ref(false);
const isExportDropdownOpen = ref(false);
const isAiAuditLoading = ref(false);

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

const handleCurrencySelect = (code) => {
    const target = supportedCurrencies.find(c => c.code === code);
    if (target) {
        setCurrency(code);
        // Persist ke DB
        router.post(route('finance.settings.currency'), {
            currency: target.code,
            currency_symbol: target.code === 'IDR' ? 'Rp' : (target.code === 'USD' ? '$' : (target.code === 'GBP' ? '£' : '€'))
        }, { preserveScroll: true });
    }
    isCurrencyDropdownOpen.value = false;
};

const exportExcel = async () => {
    try {
        const response = await fetch(route('finance.export.excel', { month: props.currentMonthKey }));
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `OneForMind_Finance_${props.currentMonthKey}.xls`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download failed', error);
        // Fallback
        window.location.href = route('finance.export.excel', { month: props.currentMonthKey });
    }
};

const runAiAudit = () => {
    if (props.isExplorer) {
        router.visit(route('billing'), { data: { from: 'finance_ai_audit' } });
        return;
    }
    isAiAuditLoading.value = true;
    router.post(route('finance.export.audit'), {
        month: props.currentMonthKey
    }, {
        onFinish: () => {
            isAiAuditLoading.value = false;
        }
    });
};

</script>

<template>
  <div class="relative z-[60] px-4 py-4 transition-all bg-white dark:bg-slate-900/80 backdrop-blur-md border-b shadow-sm dark:shadow-none border-slate-200 dark:border-slate-800 sm:px-6 lg:px-8 md:sticky md:top-0 transition-colors duration-500">
    <div class="flex flex-col items-center justify-between w-full gap-3 md:flex-row">
      
      <div class="flex items-center justify-between w-full md:w-auto transition-colors duration-500">
        <div class="flex items-center gap-3 md:gap-4">
            <div class="flex items-center justify-center text-white shadow-lg dark:shadow-none w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl shadow-indigo-200 dark:shadow-indigo-900/20 shrink-0">
                <OneForMindIcon name="finance" size="24" stroke-width="2.5" class="md:hidden" />
                <OneForMindIcon name="finance" size="30" stroke-width="2" class="hidden md:block" />
            </div>
            <div>
              <h2 class="text-xl md:text-2xl font-black leading-tight tracking-tight text-slate-800 dark:text-white transition-colors duration-500">{{ $t('finance_plan') }}</h2>
              <p class="mt-0.5 text-sm font-medium capitalize text-slate-500 dark:text-slate-400 transition-colors duration-500">{{ todayDisplay }}</p>
            </div>
        </div>
      </div>

      <div class="flex items-center w-full gap-2 md:w-auto mt-1 md:mt-0">
        
        <div class="relative shrink-0 transition-colors duration-500">
          <button 
            @click="isDateDropdownOpen = !isDateDropdownOpen; isCurrencyDropdownOpen = false" 
            class="flex items-center justify-center w-[90px] md:w-auto md:px-4 h-11 transition border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl gap-1.5 hover:bg-white dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/40 shadow-sm dark:shadow-none group transition-colors duration-300"
            :class="{'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20': isDateDropdownOpen}"
          >
            <span class="text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest whitespace-nowrap transition-colors duration-300">
                <span class="md:hidden">{{ shortMonthDisplay }}</span>
                <span class="hidden md:inline">{{ currentMonth }}</span>
            </span>
            <OneForMindIcon name="chevron-down" size="12" stroke-width="3" class="text-slate-400 group-hover:text-indigo-500 transition-transform shrink-0" :class="{'rotate-180': isDateDropdownOpen}" />
          </button>

          <Transition name="slide-fade">
            <div v-if="isDateDropdownOpen" 
                 class="absolute left-0 md:left-auto md:right-0 top-full mt-2 w-[260px] bg-white dark:bg-slate-800 rounded-[1.5rem] shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-700 p-4 z-[100] origin-top-left md:origin-top-right transition-colors duration-500">
              
              <div class="fixed inset-0 z-[-1]" @click="isDateDropdownOpen = false"></div>
              
              <div class="relative z-10 flex items-center justify-between px-1 mb-3">
                <button @click.stop="changeYear(-1)" class="p-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500">
                    <OneForMindIcon name="chevron-left" size="14" stroke-width="3" />
                </button>
                <span class="font-black text-slate-800 dark:text-white transition-colors duration-500">{{ activeYear }}</span>
                <button @click.stop="changeYear(1)" class="p-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500">
                    <OneForMindIcon name="chevron-right" size="14" stroke-width="3" />
                </button>
              </div>

              <div class="relative z-10 grid grid-cols-3 gap-1.5">
                <button 
                  v-for="(m, i) in months" 
                  :key="m.name" 
                  @click="selectMonth(i)" 
                  class="text-[11px] font-bold py-2.5 rounded-lg transition-all uppercase tracking-wider" 
                  :class="(activeMonthNum === i) ? 'bg-indigo-600 text-white shadow-md dark:shadow-none' : 'text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors'"
                >
                  {{ $t(m.name).slice(0,3) }}
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <div class="relative shrink-0 transition-colors duration-500">
          <button 
            @click="isCurrencyDropdownOpen = !isCurrencyDropdownOpen; isDateDropdownOpen = false" 
            class="flex items-center justify-center h-11 px-2.5 transition border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl gap-1 hover:bg-white dark:hover:bg-slate-700 shadow-sm dark:shadow-none group transition-colors duration-300"
          >
            <span class="text-base">{{ activeCurrencyDetails.icon }}</span>
            <span class="text-[9px] font-black text-slate-600 dark:text-slate-300">{{ activeCurrency }}</span>
          </button>

          <Transition name="slide-fade">
            <div v-if="isCurrencyDropdownOpen" class="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-700 p-1.5 z-[100] origin-top-right transition-colors duration-500">
              <div class="fixed inset-0 z-[-1]" @click="isCurrencyDropdownOpen = false"></div>
              <div class="relative z-10">
                <button 
                  v-for="c in supportedCurrencies" 
                  :key="c.code" 
                  @click="handleCurrencySelect(c.code)" 
                  class="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors duration-300" 
                  :class="activeCurrency === c.code ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'"
                >
                  <span class="text-lg">{{ c.icon }}</span>
                  <span class="text-[11px] font-bold">{{ c.code }}</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Export Actions -->
        <div class="relative shrink-0 transition-colors duration-500">
          <button 
            @click="isExportDropdownOpen = !isExportDropdownOpen; isCurrencyDropdownOpen = false; isDateDropdownOpen = false" 
            class="flex items-center justify-center h-11 px-3 transition border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl gap-2 hover:bg-white dark:hover:bg-slate-700 shadow-sm dark:shadow-none group transition-colors duration-300"
            :class="{'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20': isExportDropdownOpen}"
          >
            <OneForMindIcon name="download" size="14" stroke-width="3" class="text-slate-400 group-hover:text-indigo-500" />
            <span class="text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest hidden lg:inline">{{ $t('export') }}</span>
          </button>

          <Transition name="slide-fade">
            <div v-if="isExportDropdownOpen" class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-700 p-1.5 z-[100] origin-top-right transition-colors duration-500">
              <div class="fixed inset-0 z-[-1]" @click="isExportDropdownOpen = false"></div>
              <div class="relative z-10 space-y-0.5">
                <button 
                  @click="isExplorer ? router.visit(route('billing'), { data: { from: 'finance_export_excel' } }) : exportExcel(); isExportDropdownOpen = false" 
                  class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all group/item"
                >
                  <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover/item:scale-110 transition-transform">
                    <OneForMindIcon :name="isExplorer ? 'lock' : 'excel'" size="14" stroke-width="2.5" :class="isExplorer ? 'text-amber-500' : ''" />
                  </div>
                  <div class="text-left">
                    <p class="text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                        Export Excel
                    </p>
                    <p class="text-[9px] text-slate-400 font-medium">Buka di Excel / Sheets</p>
                  </div>
                </button>
                <button 
                  @click="isExplorer ? router.visit(route('billing'), { data: { from: 'finance_export_tax' } }) : exportTax(); isExportDropdownOpen = false" 
                  class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all group/item"
                >
                  <div class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover/item:scale-110 transition-transform">
                    <OneForMindIcon :name="isExplorer ? 'lock' : 'pdf'" size="14" stroke-width="2.5" :class="isExplorer ? 'text-amber-500' : ''" />
                  </div>
                  <div class="text-left">
                    <p class="text-[11px] font-bold text-slate-700 dark:text-slate-200 text-left">Laporan Pajak</p>
                    <p class="text-[9px] text-slate-400 font-medium font-mono">Format Fiscal PDF</p>
                  </div>
                </button>
                <div class="h-px bg-slate-100 dark:bg-slate-700 mx-3 my-1"></div>
                <button 
                  @click="runAiAudit(); isExportDropdownOpen = false" 
                  :disabled="isAiAuditLoading"
                  class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all group/item disabled:opacity-50"
                  :title="isExplorer ? 'Quantum AI Subscription Required' : ''"
                >
                  <div class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover/item:scale-110 transition-transform">
                    <OneForMindIcon :name="isExplorer ? 'lock' : (isAiAuditLoading ? 'refresh' : 'sparkles')" size="14" stroke-width="2.5" :class="isExplorer ? 'text-amber-500' : ''" />
                  </div>
                  <div class="text-left">
                    <p class="text-[11px] font-bold text-slate-700 dark:text-slate-200">AI Financial Audit</p>
                    <p class="text-[9px] text-slate-400 font-medium">Auto-review dari asisten AI</p>
                  </div>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <button 
          @click="onAddClick" 
          class="flex items-center justify-center flex-1 h-11 px-3 md:px-6 transition shadow-lg dark:shadow-none bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-indigo-100 dark:shadow-indigo-900/40 gap-2 active:scale-95 whitespace-nowrap min-w-0 transition-colors duration-500"
        >
          <OneForMindIcon name="plus" size="16" stroke-width="3" class="text-white" />
          <span class="text-[11px] font-black text-white tracking-tight uppercase truncate">{{ $t('btn_transaction') }}</span>
        </button>

      </div>
    </div>
  </div>

  <!-- AI Audit Highlight -->
  <div v-if="aiAudit" class="px-4 mt-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="relative overflow-hidden rounded-[2.5rem] bg-slate-900 dark:bg-indigo-600 p-8 text-white shadow-2xl shadow-indigo-100 dark:shadow-none animate-in fade-in slide-in-from-top-6 duration-700 border border-white/10">
        <div class="absolute top-0 right-0 p-8 opacity-10">
            <OneForMindIcon name="sparkles" size="120" />
        </div>
        <div class="relative z-10">
            <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-indigo-400 dark:text-white">
                    <OneForMindIcon name="sparkles" size="20" />
                </div>
                <div>
                    <h3 class="text-xl font-black tracking-tight leading-none text-white">Automated AI Fiscal Audit</h3>
                    <p class="text-[10px] uppercase font-black tracking-widest text-indigo-100 opacity-60 mt-1.5 font-mono tracking-tighter">Powered by Google Gemini 1.5 • Beta Experience</p>
                </div>
                <button @click="$page.clearAiAudit = true" class="ml-auto w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                    <OneForMindIcon name="close" size="14" />
                </button>
            </div>
            <div class="max-w-none">
                <div v-html="aiAudit.replace(/\n/g, '<br>')" class="text-[13px] font-bold leading-relaxed opacity-90 text-slate-200 dark:text-white"></div>
            </div>
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