<script setup>
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData'; 
import 'dayjs/locale/id'; 
import 'dayjs/locale/en'; 
import { usePage } from '@inertiajs/vue3';

dayjs.extend(localeData);

const props = defineProps({
    modelValue: String, 
    show: Boolean,
    teleport: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue', 'close']);
const page = usePage();

const currentLocale = computed(() => page.props.locale || 'id');

// Perbaikan: Fallback nama hari yang lebih aman
const weekDays = computed(() => {
    try {
        const labels = dayjs().locale(currentLocale.value).localeData().weekdaysShort();
        // Memastikan selalu 7 hari dan ambil 3 huruf pertama
        return labels.map(day => day.substring(0, 3));
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
    return currentMonth.value.locale(currentLocale.value).format('MMMM YYYY');
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
    <component :is="teleport ? 'Teleport' : 'div'" v-bind="teleport ? { to: 'body' } : {}">
        <div v-if="show" 
             :class="[
                 teleport ? 'fixed inset-0 z-[1000] flex items-center justify-center p-4' : 'absolute top-full left-0 mt-2 z-[100] shadow-2xl'
             ]">
            
            <!-- Backdrop only for Teleport mode -->
            <div v-if="teleport" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="emit('close')"></div>

            <!-- High-Density Premium Glassmorphism Card -->
            <div class="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-slate-200 p-6 animate-in fade-in zoom-in-95 duration-200 relative z-10 w-[300px]">
                
                <div class="flex items-center justify-between mb-5 px-1">
                    <button @click.prevent="prevMonth" class="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <div class="text-center">
                        <h4 class="font-black text-slate-800 capitalize tracking-tight text-base leading-none">{{ formattedHeader }}</h4>
                    </div>
                    <button @click.prevent="nextMonth" class="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                </div>

                <div class="grid grid-cols-7 mb-2 text-center h-8 items-center">
                    <span v-for="dayName in weekDays" :key="dayName" class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        {{ dayName }}
                    </span>
                </div>

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

                <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between px-1">
                    <button @click="currentMonth = dayjs()" class="text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all">
                        {{ $t('datepicker_today', 'Today') }}
                    </button>
                    <button @click="emit('close')" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-all">
                        {{ $t('btn_cancel', 'Cancel') }}
                    </button>
                </div>
            </div>
        </div>
    </component>
</template>
