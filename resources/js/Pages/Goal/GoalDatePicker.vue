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
    return page.props.locale || 'id';
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
    <div v-if="show" class="w-[300px] max-w-[95vw]">
        <!-- High-Density Premium Glassmorphism Card -->
        <div class="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-slate-200/60 p-6 animate-in fade-in zoom-in-95 duration-200">
            
            <!-- Header -->
            <div class="flex items-center justify-between mb-5 px-1">
                <button @click.prevent="prevMonth" class="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <div class="text-center">
                    <h4 class="font-black text-slate-800 capitalize tracking-tight text-base">{{ formattedHeader }}</h4>
                </div>
                <button @click.prevent="nextMonth" class="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>

            <!-- Weekdays -->
            <div class="grid grid-cols-7 mb-4 text-center">
                <span v-for="dayName in weekDays" :key="dayName" class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {{ dayName.slice(0, 3) }}
                </span>
            </div>

            <!-- Days Grid -->
            <div class="grid grid-cols-7 gap-2">
                <div v-for="n in startDayOfWeek" :key="'blank-'+n" class="h-9 w-9"></div>
                <button 
                  v-for="day in daysInMonth" 
                  :key="day" 
                  @click.prevent="selectDate(day)"
                  class="h-9 w-9 flex items-center justify-center rounded-2xl text-sm font-bold transition-all relative group"
                  :class="[
                    isSelected(day) 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105 z-10' 
                        : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600',
                    isToday(day) && !isSelected(day) ? 'text-indigo-600 ring-1 ring-indigo-100' : ''
                  ]"
                >
                    {{ day }}
                    <span v-if="isToday(day)" 
                          class="absolute bottom-1 w-1 h-1 rounded-full"
                          :class="isSelected(day) ? 'bg-white' : 'bg-indigo-500'"></span>
                </button>
            </div>

            <!-- Footer -->
            <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between px-1">
                <button @click="currentMonth = dayjs()" class="text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all">
                    {{ $t('datepicker_today') }}
                </button>
                <button @click="emit('close')" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-all">
                    {{ $t('btn_cancel') }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-in {
    animation: animate-in 0.2s ease-out;
}

@keyframes animate-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
</style>