<script setup>
import { ref } from 'vue';
import PlannerDatePicker from './PlannerDatePicker.vue'; 

const props = defineProps({
    currentDate: String,
    formattedDate: String, 
    tasks: Array, 
    openModal: Function,
    resetBoard: Function,
    stats: Object
});

const emit = defineEmits(['change-date', 'change-day']);
const showDatePicker = ref(false);

const closeDatePicker = () => {
    showDatePicker.value = false;
};
</script>

<template>
    <div class="relative z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-200 transition-all md:sticky md:top-0">
        <div class="px-4 sm:px-6 lg:px-8 py-4">
            
            <div class="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                
                <div class="flex items-center gap-4 w-full md:w-auto">
                    <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg shadow-indigo-200 shrink-0">
                        📅
                    </div>
                    
                    <div>
                        <h2 class="text-xl font-black text-slate-800 tracking-tight leading-tight">
                            {{ $t('header_title', 'Daily Planner') }}
                        </h2>
                        
                        <div class="flex items-center gap-1 mt-1 relative">
                            <button @click="emit('change-day', 'prev')" class="text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded px-1.5 py-0.5 transition">
                                ◀
                            </button>
                            
                            <div class="relative">
                                <button 
                                    @click="showDatePicker = !showDatePicker" 
                                    class="text-slate-600 hover:text-indigo-600 font-bold text-xs md:text-sm capitalize transition-colors flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-50"
                                    :class="{'bg-indigo-50 text-indigo-700': showDatePicker}"
                                >
                                    {{ formattedDate }} 
                                    <span class="text-[8px] text-slate-400 transition-transform duration-300" :class="{'rotate-180': showDatePicker}">▼</span>
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

                            <button @click="emit('change-day', 'next')" class="text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded px-1.5 py-0.5 transition">
                                ▶
                            </button>
                        </div>
                    </div>
                </div>

                <div class="flex-1 w-full md:px-12 max-w-4xl order-3 md:order-none mt-2 md:mt-0"> 
                    <div class="flex justify-between text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-widest">
                        <span>{{ $t('header_progress', 'Progress') }}</span>
                        <span class="text-indigo-600">{{ stats.percent }}%</span>
                    </div>
                    <div class="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-inner">
                        <div 
                            class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                            :style="{ width: `${stats.percent}%` }"
                        ></div>
                    </div>
                    <div class="flex gap-4 mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
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
                        class="flex-1 md:flex-none px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 text-xs uppercase tracking-widest active:scale-95"
                    >
                        <span class="text-lg leading-none">+</span> {{ $t('btn_add_task', 'Tambah') }}
                    </button>
                    
                    <button 
                        @click="resetBoard" 
                        class="w-12 h-[46px] md:h-auto flex items-center justify-center bg-rose-50 text-rose-500 rounded-2xl font-black hover:bg-rose-100 transition border border-rose-100 active:scale-95 shadow-sm shrink-0"
                        :title="$t('btn_reset_tooltip', 'Reset Board')"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>