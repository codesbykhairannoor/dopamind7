<script setup>
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData'; 
import 'dayjs/locale/id'; 
import 'dayjs/locale/en'; 
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

// Aktifkan plugin localeData
dayjs.extend(localeData);

const props = defineProps({
    modelValue: String, 
    transactions: { // Menerima data transaksi
        type: Array,
        default: () => []
    },
    show: Boolean,
    close: Function
});

const emit = defineEmits(['update:modelValue', 'close']);

// --- FORMATTER & LOGIC ---
const { appLocale, formatMoney } = useFinanceFormat();

const currentLocale = computed(() => {
    if (!appLocale || !appLocale.value) return 'id'; 
    return appLocale.value.split('-')[0];
});

// --- HITUNG DUIT PER TANGGAL (THE BRAIN) ---
const dailyMap = computed(() => {
    const map = {};
    
    // Loop semua transaksi yang dikirim dari props
    props.transactions.forEach(trx => {
        // Format tanggal transaksi jadi YYYY-MM-DD biar jadi Key
        const dateKey = dayjs(trx.date).format('YYYY-MM-DD');
        
        if (!map[dateKey]) {
            map[dateKey] = { income: 0, expense: 0, net: 0, count: 0 };
        }

        const amount = Number(trx.amount);
        
        if (trx.type === 'income') {
            map[dateKey].income += amount;
            map[dateKey].net += amount;
        } else {
            map[dateKey].expense += amount;
            map[dateKey].net -= amount;
        }
        map[dateKey].count++;
    });

    return map;
});

// Helper buat ambil data hari tertentu
const getDayStats = (day) => {
    const dateStr = currentMonth.value.date(day).format('YYYY-MM-DD');
    return dailyMap.value[dateStr];
};

// --- LOGIC TANGGAL ---
const weekDays = computed(() => {
    try {
        const instance = dayjs().locale(currentLocale.value);
        if (typeof instance.localeData !== 'function') return ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
        return instance.localeData().weekdaysShort(); 
    } catch (e) {
        return ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    }
});

const currentMonth = ref(dayjs(props.modelValue || undefined));

watch(() => props.modelValue, (newVal) => {
    if (newVal) currentMonth.value = dayjs(newVal);
});

const daysInMonth = computed(() => currentMonth.value.daysInMonth());
const startDayOfWeek = computed(() => currentMonth.value.startOf('month').day());

const formattedHeader = computed(() => {
    try {
        return currentMonth.value.locale(currentLocale.value).format('MMMM YYYY');
    } catch (e) {
        return currentMonth.value.format('MMMM YYYY');
    }
});

const prevMonth = () => currentMonth.value = currentMonth.value.subtract(1, 'month');
const nextMonth = () => currentMonth.value = currentMonth.value.add(1, 'month');

const selectDate = (day) => {
    const selectedDate = currentMonth.value.date(day).format('YYYY-MM-DD');
    emit('update:modelValue', selectedDate);
    emit('close');
};

const isSelected = (day) => {
    if (!props.modelValue) return false;
    return props.modelValue === currentMonth.value.date(day).format('YYYY-MM-DD');
};

const isToday = (day) => {
    return dayjs().format('YYYY-MM-DD') === currentMonth.value.date(day).format('YYYY-MM-DD');
};
</script>

<template>
    <div v-if="show" class="w-full sm:w-[320px]">
        <div class="fixed inset-0 z-40" @click="emit('close')"></div>

        <div class="relative z-50 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 p-5 animate-in fade-in zoom-in-95 duration-200">
            
            <div class="flex items-center justify-between mb-4">
                <button @click.prevent="prevMonth" class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">◀</button>
                <h4 class="font-bold text-slate-700 capitalize">{{ formattedHeader }}</h4>
                <button @click.prevent="nextMonth" class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">▶</button>
            </div>

            <div class="grid grid-cols-7 mb-2 text-center">
                <span v-for="dayName in weekDays" :key="dayName" class="text-[10px] font-bold text-slate-400 uppercase">
                    {{ dayName }}
                </span>
            </div>

            <div class="grid grid-cols-7 gap-1">
                <div v-for="n in startDayOfWeek" :key="'blank-'+n"></div>

                <button 
                    v-for="day in daysInMonth" 
                    :key="day"
                    @click.prevent="selectDate(day)"
                    class="h-9 w-9 rounded-xl flex flex-col items-center justify-center transition-all relative group"
                    :class="[
                        isSelected(day) 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600',
                        isToday(day) && !isSelected(day) ? 'ring-1 ring-indigo-200 bg-indigo-50/50' : ''
                    ]"
                    :title="getDayStats(day) ? `${formatMoney(getDayStats(day).net)} (${getDayStats(day).count} Trx)` : 'Tidak ada transaksi'"
                >
                    <span class="text-sm font-bold leading-none">{{ day }}</span>
                    
                    <div v-if="getDayStats(day)" class="mt-1 flex gap-0.5">
                        <span v-if="getDayStats(day).net > 0" class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm"></span>
                        <span v-else-if="getDayStats(day).net < 0" class="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-sm"></span>
                        <span v-else class="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    </div>

                    <span v-if="isToday(day) && !isSelected(day)" class="absolute -top-1 -right-1 flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>