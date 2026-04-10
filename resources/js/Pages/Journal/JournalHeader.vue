<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import { computed } from 'vue';

const props = defineProps({
    todayDate: String,
    synergy: Object
});

const page = usePage();
const { formatMoney, appLocale } = useFinanceFormat();

const todayDisplay = computed(() => {
    const currentLocale = (appLocale?.value ? appLocale.value.split('-')[0] : (page.props.locale || 'id'));
    return dayjs(props.todayDate).locale(currentLocale).format('dddd, D MMMM YYYY');
});
</script>

<template>
    <div class="relative z-[60] px-4 py-4 transition-all bg-white dark:bg-slate-900 border-b shadow-sm border-slate-200 dark:border-slate-800 sm:px-6 lg:px-8 md:sticky md:top-0">
        <div class="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
            
            <div class="flex items-center w-full gap-4 md:w-auto">
                <div class="flex items-center justify-center text-white shadow-lg w-12 h-12 bg-indigo-600 rounded-xl shadow-indigo-200 dark:shadow-none shrink-0">
                    <OneForMindIcon name="journal" size="28" />
                </div>
                <div>
                    <h2 class="text-xl md:text-2xl font-black leading-tight tracking-tight text-slate-800 dark:text-white transition-colors duration-500">{{ $t('journal_title', 'My journal') }}</h2>
                    <p class="mt-0.5 text-sm font-medium capitalize text-slate-500 dark:text-slate-400 transition-colors duration-500">{{ todayDisplay }}</p>
                </div>
            </div>

            <div class="flex items-center w-full gap-3 md:w-auto">
                
                <div class="hidden lg:flex items-center gap-5 px-5 border-x border-slate-200 dark:border-slate-800 h-10 transition-colors duration-500">
                    <div class="flex flex-col justify-center">
                        <span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 leading-none mb-1 transition-colors duration-500">{{ $t('journal_tasks', 'Tugas') }}</span>
                        <span class="text-sm font-black text-slate-700 dark:text-slate-300 leading-none transition-colors duration-500">{{ synergy.tasks_completed }}/{{ synergy.tasks_total }}</span>
                    </div>
                    <div class="flex flex-col justify-center">
                        <span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 leading-none mb-1 transition-colors duration-500">{{ $t('journal_habit', 'Habit') }}</span>
                        <span class="text-sm font-black text-slate-700 dark:text-slate-300 leading-none transition-colors duration-500">{{ synergy.habits_completed }}</span>
                    </div>
                    <div class="flex flex-col justify-center">
                        <span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 leading-none mb-1 transition-colors duration-500">{{ $t('journal_expense', 'Keluar') }}</span>
                        <span class="text-sm font-black text-slate-700 dark:text-slate-300 leading-none font-mono transition-colors duration-500">{{ formatMoney(synergy.expense_total) }}</span>
                    </div>
                </div>

                <Link :href="route('journal.write')" class="flex items-center justify-center flex-1 h-12 px-6 text-sm font-black text-white transition shadow-lg md:flex-none bg-indigo-600 rounded-2xl hover:bg-indigo-700 shadow-indigo-100 dark:shadow-none gap-2 active:scale-95 whitespace-nowrap">
                    <OneForMindIcon name="plus" size="18" stroke-width="3" />
                    <span class="tracking-tight md:inline">{{ $t('journal_add', 'Tambah jurnal') }}</span>
                </Link>

            </div>
        </div>
    </div>
</template>