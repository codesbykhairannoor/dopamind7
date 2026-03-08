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
  <div class="relative z-[60] px-4 py-4 transition-all bg-white border-b shadow-sm border-slate-200 sm:px-6 lg:px-8 md:sticky md:top-0">
    <div class="flex flex-col items-center justify-between w-full gap-3 md:flex-row">
      
      <div class="flex items-center justify-between w-full md:w-auto">
        <div class="flex items-center gap-3 md:gap-4">
            <div class="flex items-center justify-center text-white shadow-lg w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl shadow-indigo-200 shrink-0">
                <OneForMindIcon name="goal" size="24" stroke-width="2.5" class="md:hidden" />
                <OneForMindIcon name="goal" size="30" stroke-width="2" class="hidden md:block" />
            </div>
            <div>
            <h2 class="text-xl md:text-2xl font-black leading-tight tracking-tight text-slate-800">{{ $t('goal_page_title', 'Goal Tracker') }}</h2>
            <p class="mt-0.5 text-sm font-medium capitalize text-slate-500">{{ todayDisplay }}</p>
            </div>
        </div>
      </div>

      <div class="flex items-center w-full gap-2 md:w-auto mt-1 md:mt-0">
        <button 
          @click="onAddClick" 
          class="flex items-center justify-center flex-1 h-11 px-3 md:px-6 transition shadow-lg bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-indigo-100 gap-2 active:scale-95 whitespace-nowrap min-w-0"
        >
          <OneForMindIcon name="plus" size="16" stroke-width="3" class="text-white" />
          <span class="text-[11px] font-black text-white tracking-tight uppercase truncate">{{ $t('goal_btn_add', 'Set New Goal') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
