<script setup>
import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import 'dayjs/locale/id';
import 'dayjs/locale/en';

const props = defineProps({
  onAddClick: Function
});

const page = usePage();
const todayDisplay = computed(() => {
  const currentLocale = page.props.locale || 'id';
  return dayjs().locale(currentLocale).format('dddd, D MMMM YYYY');
});
</script>

<template>
  <div class="relative z-[60] transition-all bg-white dark:bg-slate-900 border-b shadow-sm border-slate-100 dark:border-slate-800 transition-colors duration-500">
    <div class="flex flex-col items-center justify-between w-full gap-3 md:flex-row max-w-7xl mx-auto px-4 md:px-8 py-4">
      
      <div class="flex items-center gap-2 w-full md:w-auto">
        <p class="text-[10px] font-black capitalize tracking-wide text-slate-400 dark:text-slate-600 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4">
            {{ $t('goal_page_title', 'Goal Tracker') }}
        </p>
        <div class="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
            <OneForMindIcon name="calendar" size="14" class="text-indigo-500" />
            <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 capitalize">{{ todayDisplay }}</span>
        </div>
      </div>

      <div class="flex items-center w-full gap-2 md:w-auto mt-1 md:mt-0">
        <button 
          @click="onAddClick" 
          class="flex items-center justify-center flex-1 h-11 px-3 md:px-6 transition shadow-lg bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-indigo-100 dark:shadow-indigo-900/40 gap-2 active:scale-95 whitespace-nowrap min-w-0"
        >
          <OneForMindIcon name="plus" size="16" stroke-width="3" class="text-white" />
          <span class="text-[11px] font-black text-white tracking-tight truncate">{{ $t('goal_btn_add', 'Set New Goal') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
