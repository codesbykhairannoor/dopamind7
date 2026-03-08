<script setup>
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData'; 
import 'dayjs/locale/id'; 
import 'dayjs/locale/en'; 
import { usePage } from '@inertiajs/vue3';
import { useClickOutside } from '@/Composables/Job/useJobUI';

dayjs.extend(localeData);

const props = defineProps({ modelValue: String });
const emit = defineEmits(['update:modelValue', 'save']);

const isOpen = ref(false);
const containerRef = useClickOutside(() => { isOpen.value = false; });

const appLocale = computed(() => usePage().props.locale || 'id');
const currentLocale = computed(() => appLocale.value.split('-')[0]);

const currentMonth = ref(dayjs(props.modelValue || undefined));
watch(() => props.modelValue, (newVal) => { if (newVal) currentMonth.value = dayjs(newVal); });

const weekDays = computed(() => {
    try {
        return dayjs().locale(currentLocale.value).localeData().weekdaysShort(); 
    } catch (e) {
        return ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    }
});

const daysInMonth = computed(() => currentMonth.value.daysInMonth());
const startDayOfWeek = computed(() => currentMonth.value.startOf('month').day());
const formattedHeader = computed(() => currentMonth.value.locale(currentLocale.value).format('MMMM YYYY'));

const displayDate = computed(() => props.modelValue ? dayjs(props.modelValue).locale(currentLocale.value).format('DD MMM YYYY') : '-');

const selectDate = (day) => {
    const selected = currentMonth.value.date(day).format('YYYY-MM-DD');
    emit('update:modelValue', selected);
    emit('save');
    isOpen.value = false;
};

const isSelected = (day) => props.modelValue === currentMonth.value.date(day).format('YYYY-MM-DD');
const isToday = (day) => dayjs().format('YYYY-MM-DD') === currentMonth.value.date(day).format('YYYY-MM-DD');
</script>

<template>
    <div class="relative w-full h-full flex items-center px-4 cursor-pointer hover:bg-slate-50 transition-colors" ref="containerRef" @click="isOpen = !isOpen">
        <span class="text-slate-600 font-medium text-sm flex items-center gap-2">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {{ displayDate }}
        </span>

        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
            <div v-if="isOpen" class="fixed sm:absolute top-1/2 sm:top-full left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 sm:translate-y-0 mt-0 sm:mt-2 w-[280px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 z-[100]" @click.stop>
                <!-- Backdrop for mobile modal feel -->
                <div class="sm:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm -z-10" @click="isOpen = false"></div>
                
                <div class="flex items-center justify-between mb-4">
                    <button @click="currentMonth = currentMonth.subtract(1, 'month')" class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">◀</button>
                    <h4 class="font-bold text-slate-700 capitalize text-sm">{{ formattedHeader }}</h4>
                    <button @click="currentMonth = currentMonth.add(1, 'month')" class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">▶</button>
                </div>

                <div class="grid grid-cols-7 mb-2 text-center">
                    <span v-for="dayName in weekDays" :key="dayName" class="text-[10px] font-bold text-slate-400 uppercase">{{ dayName }}</span>
                </div>

                <div class="grid grid-cols-7 gap-1">
                    <div v-for="n in startDayOfWeek" :key="'blank-'+n"></div>
                    <button v-for="day in daysInMonth" :key="day" @click="selectDate(day)"
                        class="h-8 w-8 rounded-xl flex items-center justify-center transition-all text-sm font-bold relative"
                        :class="isSelected(day) ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'">
                        {{ day }}
                        <span v-if="isToday(day) && !isSelected(day)" class="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>