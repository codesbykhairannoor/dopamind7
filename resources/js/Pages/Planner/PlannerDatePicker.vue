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
    tasks: { type: Array, default: () => [] },
    show: Boolean
});

const emit = defineEmits(['update:modelValue', 'close']);

const appLocale = computed(() => usePage().props.locale || 'id');
const currentLocale = computed(() => appLocale.value.split('-')[0]);

// THE BRAIN: Indikator Task per hari
const activityMap = computed(() => {
    const map = {};
    props.tasks.forEach(task => {
        const dateKey = dayjs(task.date).format('YYYY-MM-DD');
        if (!map[dateKey]) map[dateKey] = { total: 0, completed: 0 };
        map[dateKey].total++;
        if (task.is_completed) map[dateKey].completed++;
    });
    return map;
});

const getDayActivity = (day) => activityMap.value[currentMonth.value.date(day).format('YYYY-MM-DD')];

const weekDays = computed(() => {
    try {
        const instance = dayjs().locale(currentLocale.value);
        return instance.localeData().weekdaysShort(); 
    } catch (e) {
        return ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    }
});

const currentMonth = ref(dayjs(props.modelValue || undefined));
watch(() => props.modelValue, (newVal) => { if (newVal) currentMonth.value = dayjs(newVal); });

const daysInMonth = computed(() => currentMonth.value.daysInMonth());
const startDayOfWeek = computed(() => currentMonth.value.startOf('month').day());
const formattedHeader = computed(() => currentMonth.value.locale(currentLocale.value).format('MMMM YYYY'));

const prevMonth = () => currentMonth.value = currentMonth.value.subtract(1, 'month');
const nextMonth = () => currentMonth.value = currentMonth.value.add(1, 'month');

const selectDate = (day) => {
    emit('update:modelValue', currentMonth.value.date(day).format('YYYY-MM-DD'));
    emit('close');
};

const isSelected = (day) => props.modelValue === currentMonth.value.date(day).format('YYYY-MM-DD');
const isToday = (day) => dayjs().format('YYYY-MM-DD') === currentMonth.value.date(day).format('YYYY-MM-DD');
</script>

<template>
    <div v-if="show" class="w-[280px] sm:w-[320px]">
        <div class="fixed inset-0 z-40" @click="emit('close')"></div>

        <div class="relative z-50 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 p-5">
            <div class="flex items-center justify-between mb-4">
                <button @click.prevent="prevMonth" class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">◀</button>
                <h4 class="font-bold text-slate-700 capitalize text-sm">{{ formattedHeader }}</h4>
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
                    v-for="day in daysInMonth" :key="day"
                    @click.prevent="selectDate(day)"
                    class="h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex flex-col items-center justify-center transition-all relative group"
                    :class="[
                        isSelected(day) ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600',
                        isToday(day) && !isSelected(day) ? 'ring-1 ring-indigo-200 bg-indigo-50/50' : ''
                    ]"
                >
                    <span class="text-xs sm:text-sm font-bold leading-none">{{ day }}</span>
                    
                    <div v-if="getDayActivity(day)" class="mt-1 flex gap-0.5">
                        <span v-if="getDayActivity(day).completed < getDayActivity(day).total" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-sm" :class="isSelected(day) ? 'bg-indigo-200' : ''"></span>
                        <span v-else class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm" :class="isSelected(day) ? 'bg-emerald-200' : ''"></span>
                    </div>

                    <span v-if="isToday(day) && !isSelected(day)" class="absolute -top-1 -right-1 flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                </button>
            </div>
            
            <div class="mt-4 pt-3 border-t border-slate-50 text-center">
                <button @click.prevent="currentMonth = dayjs()" class="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition">Ke Hari Ini</button>
            </div>
        </div>
    </div>
</template>