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
    <div class="mx-auto flex w-full min-w-0 flex-col items-stretch justify-between gap-3 px-4 md:px-6 lg:px-8 py-4 md:flex-row md:items-center lg:max-w-[96%]">
      
      <div class="flex items-center gap-2 w-full min-w-0 md:w-auto md:max-w-[min(100%,28rem)]">
        <p class="shrink-0 text-[13px] font-black capitalize tracking-wide text-slate-700 dark:text-slate-300 mr-2 pr-4">
            {{ $t('goal_page_title', 'Goal Tracker') }}
        </p>
      </div>

      <div class="flex items-center w-full min-w-0 gap-2 md:w-auto md:justify-end mt-1 md:mt-0">
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
