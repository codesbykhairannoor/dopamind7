<script setup>
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData'; 
import 'dayjs/locale/id'; 
import 'dayjs/locale/en'; 
import { usePage } from '@inertiajs/vue3';

// Aktifkan plugin localeData
dayjs.extend(localeData);

const props = defineProps({
    modelValue: String, 
    show: Boolean
});

const emit = defineEmits(['update:modelValue', 'close']);

const page = usePage();
const currentLocale = computed(() => {
    return page.props.auth.user.locale || 'id';
});

const weekDays = computed(() => {
    try {
        const instance = dayjs().locale(currentLocale.value);
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
    <div v-if="show" class="absolute z-[60] mt-2 left-0 sm:left-auto sm:right-0">
        <!-- Backdrop to close -->
        <div class="fixed inset-0 z-40" @click="emit('close')"></div>

        <div class="relative z-50 bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 w-[280px] animate-in fade-in zoom-in-95 duration-200">
            
            <div class="flex items-center justify-between mb-4">
                <button @click.prevent="prevMonth" class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">◀</button>
                <h4 class="font-bold text-slate-700 capitalize text-sm">{{ formattedHeader }}</h4>
                <button @click.prevent="nextMonth" class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">▶</button>
            </div>

            <div class="grid grid-cols-7 mb-2 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span v-for="dayName in weekDays" :key="dayName">
                    {{ dayName }}
                </span>
            </div>

            <div class="grid grid-cols-7 gap-1">
                <div v-for="n in startDayOfWeek" :key="'blank-'+n"></div>

                <button 
                    v-for="day in daysInMonth" 
                    :key="day"
                    @click.prevent="selectDate(day)"
                    class="h-8 w-8 rounded-xl flex items-center justify-center transition-all relative group"
                    :class="[
                        isSelected(day) 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600',
                        isToday(day) && !isSelected(day) ? 'ring-1 ring-indigo-200 bg-indigo-50/50' : ''
                    ]"
                >
                    <span class="text-xs font-bold">{{ day }}</span>
                    
                    <span v-if="isToday(day) && !isSelected(day)" class="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                    </span>
                </button>
            </div>
            
            <div class="mt-4 pt-3 border-t border-slate-50 flex justify-center">
                <button @click="emit('close')" class="text-[0.6rem] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition">
                    {{ $t('btn_close', 'Close') }}
                </button>
            </div>
        </div>
    </div>
</template>
