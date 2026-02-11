<script setup>
import { ref, computed } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import dayjs from 'dayjs';

const props = defineProps({
    currentMonth: String, // String: "Februari 2026"
    currentMonthKey: String, // String: "2026-02"
    onChangeDate: Function,
    onAddClick: Function
});

const { activeCurrency, supportedCurrencies, setCurrency } = useFinanceFormat();

// --- LOGIC DROPDOWN TANGGAL ---
const isDropdownOpen = ref(false);

// Menggunakan key kamus agar bisa ditranslasi
const months = [
    { name: 'month_jan', short: 'Jan' }, { name: 'month_feb', short: 'Feb' },
    { name: 'month_mar', short: 'Mar' }, { name: 'month_apr', short: 'Apr' },
    { name: 'month_may', short: 'May' }, { name: 'month_jun', short: 'Jun' },
    { name: 'month_jul', short: 'Jul' }, { name: 'month_aug', short: 'Aug' },
    { name: 'month_sep', short: 'Sep' }, { name: 'month_oct', short: 'Oct' },
    { name: 'month_nov', short: 'Nov' }, { name: 'month_dec', short: 'Dec' }
];

const activeYear = computed(() => 
    props.currentMonthKey ? dayjs(props.currentMonthKey).year() : dayjs().year()
);
const activeMonthNum = computed(() => 
    props.currentMonthKey ? dayjs(props.currentMonthKey).month() : dayjs().month()
);

const selectMonth = (monthIndex) => {
    const month = String(monthIndex + 1).padStart(2, '0');
    const payload = `${activeYear.value}-${month}`;
    isDropdownOpen.value = false;
    props.onChangeDate(payload);
};

const changeYear = (offset) => {
    const newYear = activeYear.value + offset;
    const month = String(activeMonthNum.value + 1).padStart(2, '0');
    props.onChangeDate(`${newYear}-${month}`);
};
</script>

<template>
    <div class="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 md:sticky top-0 z-30 transition-all">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div class="flex items-center gap-4 w-full md:w-auto">
                <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg shadow-indigo-200">
                    💸
                </div>
                <div>
                    <h2 class="text-xl font-black text-slate-800 tracking-tight">{{ $t('finance_plan') }}</h2>
                    
                    <div class="relative">
                        <button 
                            @click="isDropdownOpen = !isDropdownOpen"
                            class="flex items-center gap-1.5 text-slate-500 font-medium text-xs capitalize hover:text-indigo-600 transition-colors mt-0.5"
                        >
                            {{ currentMonth }} 
                            <svg class="w-3 h-3 transition-transform duration-300" :class="{'rotate-180': isDropdownOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                        </button>

                        <Transition name="slide-fade">
                            <div v-if="isDropdownOpen" class="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50">
                                <div class="flex justify-between items-center mb-2 px-1">
                                    <button @click.stop="changeYear(-1)" class="p-1 hover:bg-slate-100 rounded text-slate-400">←</button>
                                    <span class="font-bold text-slate-700 text-sm">{{ activeYear }}</span>
                                    <button @click.stop="changeYear(1)" class="p-1 hover:bg-slate-100 rounded text-slate-400">→</button>
                                </div>
                                <div class="grid grid-cols-3 gap-1">
                                    <button v-for="(m, i) in months" :key="m.name" 
                                        @click="selectMonth(i)"
                                        class="text-[10px] font-bold py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
                                        :class="(activeMonthNum === i) ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500'"
                                    >
                                        {{ $t(m.name).slice(0,3) }}
                                    </button>
                                </div>
                            </div>
                        </Transition>
                        <div v-if="isDropdownOpen" @click="isDropdownOpen = false" class="fixed inset-0 z-40"></div>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-3 w-full md:w-auto">
                <select 
                    :value="activeCurrency" 
                    @change="(e) => setCurrency(e.target.value)"
                    class="bg-white border border-slate-200 hover:border-indigo-300 text-slate-600 text-xs font-bold uppercase rounded-xl px-3 py-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                >
                    <option v-for="c in supportedCurrencies" :key="c.code" :value="c.code">
                        {{ c.icon }} {{ c.code }}
                    </option>
                </select>

                <button 
                    @click="onAddClick" 
                    class="flex-1 md:flex-none px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 text-sm"
                >
                    <span>+</span> {{ $t('btn_transaction') }}
                </button>
            </div>
        </div>
    </div>
</template>