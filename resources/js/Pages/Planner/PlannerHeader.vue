<script setup>
import { ref } from 'vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import PlannerDatePicker from './PlannerDatePicker.vue'; 

const props = defineProps({
    currentDate: String,
    formattedDate: String, 
    tasks: Array, 
    openModal: Function,
    resetBoard: Function,
    stats: Object
});

// 'change-day' dihilangkan dari emit karena tombolnya sudah dihapus
const emit = defineEmits(['change-date']);
const showDatePicker = ref(false);

const closeDatePicker = () => {
    showDatePicker.value = false;
};
</script>

<template>
    <div class="relative z-[60] transition-all bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div class="px-4 md:px-8 py-4 max-w-7xl mx-auto">
            
            <div class="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                
                <div class="flex items-center gap-2 w-full md:w-auto">
                    <p class="text-[10px] font-black capitalize tracking-wide text-slate-400 dark:text-slate-600 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4">
                        {{ $t('header_title', 'Daily Planner') }}
                    </p>
                    
                    <div>
                        <div class="flex items-center relative">
                            <div class="relative">
                                <button 
                                    @click="showDatePicker = !showDatePicker" 
                                    class="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs capitalize transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50"
                                    :class="{'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400': showDatePicker}"
                                >
                                    <OneForMindIcon name="calendar" size="14" class="text-indigo-500" />
                                    {{ formattedDate }} 
                                    <OneForMindIcon name="chevron-down" size="10" stroke-width="3" class="text-slate-400 dark:text-slate-600 transition-transform duration-300" :class="{'rotate-180': showDatePicker}" />
                                </button>

                                <transition
                                    enter-active-class="transition ease-out duration-200"
                                    enter-from-class="opacity-0 translate-y-2 scale-95"
                                    enter-to-class="opacity-100 translate-y-0 scale-100"
                                    leave-active-class="transition ease-in duration-150"
                                    leave-from-class="opacity-100 translate-y-0 scale-100"
                                    leave-to-class="opacity-0 translate-y-2 scale-95"
                                >
                                    <div v-if="showDatePicker" class="absolute left-0 top-full mt-3 z-[100] origin-top-left">
                                        <div class="fixed inset-0 z-[-1]" @click="closeDatePicker"></div>
                                        
                                        <PlannerDatePicker 
                                            :show="showDatePicker"
                                            :modelValue="currentDate"
                                            :tasks="tasks"
                                            @update:modelValue="(val) => emit('change-date', val)"
                                            @close="closeDatePicker"
                                        />
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex-1 w-full md:px-12 max-w-4xl order-3 md:order-none mt-2 md:mt-0"> 
                    <div class="flex justify-between text-[11px] font-black text-slate-400 dark:text-slate-500 mb-1.5 transition-colors duration-500">
                        <span>{{ $t('header_progress', 'Progress') }}</span>
                        <span class="text-indigo-600 dark:text-indigo-400">{{ stats.percent }}%</span>
                    </div>
                    <div class="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-50 dark:border-slate-700 shadow-inner transition-colors duration-500">
                        <div 
                            class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                            :style="{ width: `${stats.percent}%` }"
                        ></div>
                    </div>
                    <div class="flex gap-4 mt-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 transition-colors duration-500">
                        <span class="flex items-center gap-1">
                            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                            {{ stats.completed }} {{ $t('header_completed', 'Selesai') }}
                        </span>
                        <span class="flex items-center gap-1">
                            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                            {{ (stats.total - stats.completed) }} {{ $t('header_pending', 'Tertunda') }}
                        </span>
                    </div>
                </div>

                <div class="flex gap-3 w-full md:w-auto order-2 md:order-none shrink-0">
                    <button 
                        @click="openModal()" 
                        class="flex-1 md:flex-none px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 text-xs active:scale-95"
                    >
                        <OneForMindIcon name="plus" size="16" stroke-width="3" /> {{ $t('btn_add_task', 'Tambah') }}
                    </button>
                    
                    <button 
                        @click="resetBoard" 
                        class="w-12 h-[46px] md:h-auto flex items-center justify-center bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 rounded-2xl font-black hover:bg-rose-100 dark:hover:bg-rose-500/20 transition border border-rose-100 dark:border-rose-500/20 active:scale-95 shadow-sm dark:shadow-none shrink-0"
                        :title="$t('btn_reset_tooltip', 'Reset Board')"
                    >
                        <OneForMindIcon name="refresh" size="18" stroke-width="2.5" />
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>