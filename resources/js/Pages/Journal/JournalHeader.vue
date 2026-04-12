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
    <div class="relative z-[60] transition-all bg-white dark:bg-slate-900 border-b shadow-sm border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div class="flex w-full min-w-0 flex-col items-stretch justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4 md:flex-row md:items-center">
            
            <div class="flex items-center gap-2 w-full min-w-0 md:w-auto md:max-w-[min(100%,28rem)]">
                <p class="shrink-0 text-[10px] font-black capitalize tracking-wide text-slate-400 dark:text-slate-600 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4">
                    {{ $t('journal_title', 'My Journal') }}
                </p>
                <div class="flex min-w-0 flex-1 items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50 overflow-hidden">
                    <OneForMindIcon name="calendar" size="14" class="text-indigo-500 shrink-0" />
                    <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 capitalize truncate">{{ todayDisplay }}</span>
                </div>
            </div>

            <div class="flex min-w-0 flex-wrap items-center w-full gap-3 md:w-auto md:flex-nowrap md:justify-end">
                
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

                <Link :href="route('journal.write')" class="flex min-w-0 items-center justify-center flex-1 h-12 px-6 text-sm font-black text-white transition shadow-lg md:flex-none md:shrink-0 bg-indigo-600 rounded-2xl hover:bg-indigo-700 shadow-indigo-100 dark:shadow-none gap-2 active:scale-95 whitespace-nowrap">
                    <OneForMindIcon name="plus" size="18" stroke-width="3" />
                    <span class="tracking-tight md:inline">{{ $t('journal_add', 'Tambah jurnal') }}</span>
                </Link>

            </div>
        </div>
    </div>
</template>