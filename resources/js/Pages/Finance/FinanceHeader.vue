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

// --- LOGIC HARI INI (I18N) ---
const todayDisplay = computed(() => {
    const loc = appLocale.value ? appLocale.value.split('-')[0] : 'id';
    return dayjs().locale(loc).format('dddd, D MMM'); 
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
    <div class="bg-white/90 backdrop-blur-lg border-b border-slate-200 relative md:sticky top-0 z-40 transition-all">
        <div class="max-w-7xl mx-auto px-4 py-3 md:px-6 md:py-4">
            
            <div class="flex items-center justify-between gap-2">
                
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl text-white shadow-lg shadow-indigo-200 shrink-0">
                        💸
                    </div>
                    <div class="min-w-0">
                        <h2 class="text-base md:text-xl font-black text-slate-800 tracking-tight leading-none truncate">
                            {{ $t('finance_plan') }}
                        </h2>
                        <p class="text-indigo-500 font-bold text-[9px] md:text-[10px] uppercase tracking-wider mt-1 opacity-80 truncate">
                            {{ todayDisplay }}
                        </p>
                    </div>
                </div>

                <div class="hidden md:block relative">
                    <button 
                        @click="isDateDropdownOpen = !isDateDropdownOpen"
                        class="flex items-center gap-3 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 transition-all"
                    >
                        <span class="text-slate-400 text-sm">📅</span>
                        <span class="text-sm font-black text-slate-700 capitalize">{{ currentMonth }}</span>
                        <svg class="w-4 h-4 text-slate-400 transition-transform" :class="{'rotate-180': isDateDropdownOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                </div>

                <div class="flex items-center gap-2">
                    <div class="relative">
                        <button 
                            @click="isCurrencyDropdownOpen = !isCurrencyDropdownOpen"
                            class="p-2 md:px-3 md:py-2.5 bg-white border border-slate-200 rounded-xl md:rounded-2xl flex items-center gap-2 hover:border-indigo-300 transition-all shadow-sm"
                        >
                            <span class="text-base">{{ activeCurrencyDetails.icon }}</span>
                            <span class="hidden md:inline text-xs font-black text-slate-600">{{ activeCurrency }}</span>
                        </button>

                        <Transition name="slide-fade">
                            <div v-if="isCurrencyDropdownOpen" class="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                                <button 
                                    v-for="c in supportedCurrencies" :key="c.code"
                                    @click="setCurrency(c.code); isCurrencyDropdownOpen = false"
                                    class="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-xl transition-colors"
                                    :class="activeCurrency === c.code ? 'bg-indigo-50' : ''"
                                >
                                    <span>{{ c.icon }}</span>
                                    <div class="text-left">
                                        <p class="text-[10px] font-black text-slate-800">{{ c.code }}</p>
                                        <p class="text-[9px] text-slate-400 font-medium">{{ c.label }}</p>
                                    </div>
                                </button>
                            </div>
                        </Transition>
                        <div v-if="isCurrencyDropdownOpen" @click="isCurrencyDropdownOpen = false" class="fixed inset-0 z-40"></div>
                    </div>

                    <button 
                        @click="onAddClick" 
                        class="px-4 py-2 md:px-6 md:py-2.5 bg-indigo-600 text-white rounded-xl md:rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95"
                    >
                        <span class="text-lg leading-none">+</span>
                        <span class="hidden md:inline text-sm">{{ $t('btn_transaction') }}</span>
                        <span class="md:hidden text-[10px] uppercase tracking-tighter">{{ $t('btn_transaction').split(' ')[0] }}</span>
                    </button>
                </div>
            </div>

            <div class="mt-3 md:hidden flex items-center bg-slate-50 border border-slate-100 p-1 rounded-2xl">
                <button 
                    @click="isDateDropdownOpen = !isDateDropdownOpen"
                    class="flex-1 flex items-center justify-between px-4 py-2.5 text-xs font-black text-slate-700 capitalize"
                >
                    <div class="flex items-center gap-2">
                        <span class="opacity-50">📅</span>
                        {{ currentMonth }}
                    </div>
                    <svg class="w-4 h-4 text-slate-400 transition-transform" :class="{'rotate-180': isDateDropdownOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                </button>
            </div>

            <Transition name="slide-fade">
                <div v-if="isDateDropdownOpen" class="absolute left-4 right-4 md:left-auto md:right-auto md:translate-x-0 top-full mt-3 md:w-72 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-4 z-50">
                    <div class="flex justify-between items-center mb-4 px-2">
                        <button @click.stop="changeYear(-1)" class="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full text-slate-400 font-bold">❮</button>
                        <span class="font-black text-slate-800 text-lg">{{ activeYear }}</span>
                        <button @click.stop="changeYear(1)" class="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full text-slate-400 font-bold">❯</button>
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                        <button v-for="(m, i) in months" :key="m.name" 
                            @click="selectMonth(i)"
                            class="text-xs font-bold py-3 rounded-xl transition-all"
                            :class="(activeMonthNum === i) 
                                ? 'bg-indigo-600 text-white shadow-lg' 
                                : 'text-slate-500 hover:bg-indigo-50'"
                        >
                            {{ $t(m.name).slice(0,3) }}
                        </button>
                    </div>
                </div>
            </Transition>
            <div v-if="isDateDropdownOpen" @click="isDateDropdownOpen = false" class="fixed inset-0 z-40"></div>

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