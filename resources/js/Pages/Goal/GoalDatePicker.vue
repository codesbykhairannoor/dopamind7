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
    <div v-if="show" class="absolute z-[100] mt-2 left-0 sm:left-auto sm:right-0">
        <!-- Backdrop to close -->
        <div class="fixed inset-0 z-40 bg-transparent" @click="emit('close')"></div>

        <div class="relative z-50 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-6 w-[320px] animate-in fade-in zoom-in-95 duration-200">
            
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
                <button @click.prevent="prevMonth" class="p-2.5 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all active:scale-90">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <div class="text-center">
                    <h4 class="font-black text-slate-800 capitalize tracking-tight">{{ formattedHeader }}</h4>
                    <div class="w-8 h-1 bg-indigo-500 rounded-full mx-auto mt-1 opacity-20"></div>
                </div>
                <button @click.prevent="nextMonth" class="p-2.5 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all active:scale-90">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>

            <!-- Weekdays -->
            <div class="grid grid-cols-7 mb-4 text-center">
                <span v-for="dayName in weekDays" :key="dayName" class="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                    {{ dayName }}
                </span>
            </div>

            <!-- Days Grid -->
            <div class="grid grid-cols-7 gap-2">
                <div v-for="n in startDayOfWeek" :key="'blank-'+n"></div>

                <button 
                    v-for="day in daysInMonth" 
                    :key="day"
                    @click.prevent="selectDate(day)"
                    class="h-9 w-9 rounded-xl flex items-center justify-center transition-all relative group"
                    :class="[
                        isSelected(day) 
                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 font-black scale-105' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600 font-bold',
                        isToday(day) && !isSelected(day) ? 'bg-indigo-50/80 text-indigo-700' : ''
                    ]"
                >
                    <span class="text-sm font-bold">{{ day }}</span>
                    
                    <span v-if="isToday(day)" 
                          class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                          :class="isSelected(day) ? 'bg-white' : 'bg-indigo-500'"></span>

                    <span v-if="isToday(day) && !isSelected(day)" class="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                </button>
            </div>
            
            <!-- Quick Links / Footer -->
            <div class="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between">
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
