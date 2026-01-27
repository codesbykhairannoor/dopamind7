<script setup>
// Gunakan memoization jika localHabits sangat banyak untuk performa mobile
import { computed } from 'vue';

const props = defineProps({
    localHabits: Array,
    monthDates: Array,
    hasPrevHabits: Boolean,
    
    // Actions
    toggleStatus: Function,
    handleGridNav: Function,
    getStatus: Function,
    editHabit: Function,
    confirmDelete: Function,
    openCreateModal: Function, 
    openCopyModal: Function,   
});
</script>

<template>
    <div class="w-full md:max-w-[98%] mx-auto md:px-2 pt-4 md:pt-8 pb-24">

        <div v-if="localHabits.length > 0" 
             class="bg-white md:rounded-3xl shadow-sm md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-y md:border border-slate-100 overflow-hidden relative">

            <div class="overflow-x-auto custom-scrollbar relative overscroll-x-contain">
                <div class="min-w-max">

                    <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 flex">
                        <div class="sticky left-0 z-40 bg-white w-36 md:w-72 border-r border-slate-100 p-3 md:p-4 flex items-center font-black text-slate-400 text-[10px] md:text-xs uppercase tracking-tighter md:tracking-wider">
                            <span class="truncate">{{ $t('habit_name') }}</span>
                        </div>

                        <div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5">
                            <div v-for="day in monthDates" :key="day.dateString" 
                                 class="w-8 flex flex-col items-center gap-0.5 md:gap-1">
                                <span class="text-[8px] md:text-[10px] font-bold text-slate-400 capitalize">
                                    {{ day.dayName.substring(0, 3) }} </span>
                                <span class="text-[10px] md:text-xs font-black p-1 transition-all" 
                                      :class="day.isToday ? 'text-indigo-600 bg-indigo-50 rounded-full scale-110 ring-1 ring-indigo-100' : 'text-slate-600'">
                                    {{ day.dayNumber }}
                                </span>
                            </div>
                        </div>

                        <div class="hidden md:flex sticky right-0 z-40 bg-white/90 backdrop-blur-sm w-32 p-4 border-l border-slate-100 items-center justify-end font-bold text-slate-400 text-xs uppercase tracking-wider shadow-[-10px_0_15px_rgba(255,255,255,0.9)]">
                            {{ $t('habit_table_total') }}
                        </div>
                    </div>

                    <div class="divide-y divide-slate-50">
                        <div v-for="(habit, hIndex) in localHabits" :key="habit.id" 
                             class="flex hover:bg-indigo-50/20 transition-colors group">

                            <div class="sticky left-0 z-20 w-36 md:w-72 bg-white group-hover:bg-slate-50 transition-colors border-r border-slate-100 p-3 md:p-4 flex items-center gap-2 md:gap-4 flex-shrink-0">
                                <div class="w-8 h-8 md:w-11 md:h-11 rounded-lg md:rounded-2xl flex items-center justify-center text-base md:text-xl bg-slate-50 border border-slate-100 shrink-0 shadow-sm" 
                                     :style="{ color: habit.color, backgroundColor: habit.color + '10' }">
                                    {{ habit.icon }}
                                </div>
                                <div class="min-w-0 flex-1 relative">
                                    <h4 class="font-bold text-slate-700 truncate text-[11px] md:text-sm leading-tight">
                                        {{ habit.name }}
                                    </h4>
                                    <div class="flex items-center gap-2 mt-1">
                                        <div class="h-1 w-full bg-slate-100 rounded-full overflow-hidden max-w-[60px] md:max-w-[100px]">
                                            <div class="h-full rounded-full transition-all duration-700" 
                                                 :style="{ width: habit.progress_percent + '%', backgroundColor: habit.color }"></div>
                                        </div>
                                        <span class="text-[8px] md:text-[10px] font-bold text-slate-400">{{ Math.round(habit.progress_percent) }}%</span>
                                    </div>
                                    
                                    <div class="absolute -right-1 top-1/2 -translate-y-1/2 flex md:hidden">
                                         <button @click="editHabit(habit)" class="p-1 text-slate-300 active:text-indigo-600">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke-width="2.5"></path></svg>
                                         </button>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5">
                                <div v-for="(day, dIndex) in monthDates" :key="day.dateString" class="w-8 flex justify-center">
                                    <button 
                                        :id="`cell-${hIndex}-${dIndex}`"
                                        @click="toggleStatus(habit.id, day.dateString)" 
                                        @contextmenu.prevent="toggleStatus(habit.id, day.dateString, 'skipped')"
                                        @keydown="handleGridNav($event, hIndex, dIndex, habit.id, day.dateString)"
                                        :disabled="day.isFuture"
                                        class="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl flex items-center justify-center relative outline-none transition-all duration-150 active:scale-75 focus:ring-2 focus:ring-indigo-400 focus:z-10" 
                                        :class="{
                                            'shadow-[0_4px_12px_-2px_rgba(0,0,0,0.1)] text-white border-transparent': getStatus(habit, day.dateString) === 'completed',
                                            'bg-slate-100 text-slate-400': getStatus(habit, day.dateString) === 'skipped',
                                            'bg-white border border-slate-200 hover:border-indigo-300': getStatus(habit, day.dateString) === 'empty' && !day.isFuture,
                                            'bg-slate-50/50 border-none opacity-20 cursor-not-allowed': day.isFuture,
                                            'ring-2 ring-indigo-500 ring-offset-1 ring-offset-white scale-105 z-10': day.isToday
                                        }"
                                        :style="getStatus(habit, day.dateString) === 'completed' ? { backgroundColor: habit.color, shadowColor: habit.color } : {}"
                                    >
                                        <span v-if="getStatus(habit, day.dateString) === 'completed'" class="text-[10px] md:text-xs font-black">✓</span>
                                        <span v-if="getStatus(habit, day.dateString) === 'skipped'" class="text-[10px] md:text-xs font-bold">-</span>
                                        
                                        <div v-if="day.isToday && getStatus(habit, day.dateString) === 'empty'" class="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></div>
                                    </button>
                                </div>
                            </div>

                            <div class="hidden md:flex sticky right-0 z-20 w-32 bg-white/90 backdrop-blur-sm group-hover:bg-slate-50 transition-colors border-l border-slate-100 p-4 flex-col justify-center shadow-[-10px_0_15px_rgba(255,255,255,0.9)]">
                                <div class="flex justify-between items-end">
                                    <span class="text-lg font-black text-slate-700 leading-none">{{ habit.progress_count }}</span>
                                    <span class="text-[9px] font-bold text-slate-400 uppercase">{{ $t('habit_days') }}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="bg-white rounded-[2rem] p-10 md:p-20 text-center shadow-xl shadow-slate-200/50 border border-slate-100 mt-6 mx-4 md:mx-0 transition-all hover:shadow-2xl">
            <div class="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-indigo-50 to-white text-indigo-500 rounded-3xl flex items-center justify-center text-4xl md:text-5xl mx-auto mb-6 shadow-sm rotate-3">🌱</div>
            <h3 class="text-xl md:text-2xl font-black text-slate-800 tracking-tight">{{ $t('habit_empty_title') }}</h3>
            <p class="text-sm md:text-base text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">{{ $t('habit_empty_desc') }}</p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button @click="openCreateModal" class="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">
                    + {{ $t('habit_btn_new') }}
                </button>
                <button v-if="hasPrevHabits" @click="openCopyModal" class="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-all active:scale-95">
                    📂 {{ $t('habit_salin_btn') }}
                </button>
            </div>
        </div>

    </div>
</template>

<style scoped>
/* Custom scrollbar yang lebih halus untuk global user */
.custom-scrollbar::-webkit-scrollbar { height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }

/* Menghilangkan blue highlight saat tap di mobile */
button { -webkit-tap-highlight-color: transparent; }
</style>