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
    <div v-if="show" class="fixed inset-0 sm:absolute sm:inset-auto z-[100] flex items-center justify-center sm:block">
        <!-- Backdrop to close -->
        <div class="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none" @click="emit('close')"></div>

        <div class="relative z-50 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 w-[340px] animate-in fade-in zoom-in-95 duration-200">
            
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
                <button @click.prevent="prevMonth" class="p-3 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all active:scale-90 border border-transparent hover:border-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <div class="text-center">
                    <h4 class="font-black text-slate-800 capitalize tracking-tight text-lg">{{ formattedHeader }}</h4>
                    <div class="w-10 h-1.5 bg-indigo-500 rounded-full mx-auto mt-1 opacity-20"></div>
                </div>
                <button @click.prevent="nextMonth" class="p-3 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all active:scale-90 border border-transparent hover:border-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>

            <!-- Weekdays -->
            <div class="grid grid-cols-7 mb-6 text-center">
                <span v-for="dayName in weekDays" :key="dayName" class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {{ dayName.slice(0, 3) }}
                </span>
            </div>

            <!-- Days Grid -->
            <div class="grid grid-cols-7 gap-3">
                <div v-for="n in startDayOfWeek" :key="'blank-'+n"></div>
                <button 
                  v-for="day in daysInMonth" 
                  :key="day" 
                  @click.prevent="selectDate(day)"
                  class="h-10 w-10 flex items-center justify-center rounded-2xl text-[13px] font-bold transition-all relative group"
                  :class="[
                    isSelected(day) 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110 z-10' 
                        : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600',
                    isToday(day) && !isSelected(day) ? 'text-indigo-600' : ''
                  ]"
                >
                    {{ day }}
                    <span v-if="isToday(day)" 
                          class="absolute bottom-1 w-1 h-1 rounded-full bg-current"
                          :class="isSelected(day) ? 'bg-white' : 'bg-indigo-500'"></span>
                </button>
            </div>

            <!-- Quick Links / Footer -->
            <div class="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <button @click="currentMonth = dayjs()" class="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all">
                    {{ $t('datepicker_today', 'Hari Ini') }}
                </button>
                <button @click="emit('close')" class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-all">
                    {{ $t('btn_close', 'Tutup') }}
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
    from { opacity: 0; transform: scale(0.95) translateY(-10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
