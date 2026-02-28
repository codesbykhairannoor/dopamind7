<script setup>
defineProps({
    localHabits: Array,
    monthDates: Array,
    hasPrevHabits: Boolean,
    toggleStatus: Function,
    handleGridNav: Function,
    getStatus: Function,
    editHabit: Function,
    confirmDelete: Function,
    openCreateModal: Function, // Untuk tombol empty state
    openCopyModal: Function,   // Untuk tombol empty state
});
</script>

<template>
    <div class="w-full md:max-w-[95%] mx-auto md:px-2 pt-4 md:pt-8 pb-20">

        <div v-if="localHabits.length > 0" class="bg-white dark:bg-slate-900 md:rounded-3xl shadow-sm md:shadow-[0_2px_20px_rgba(0,0,0,0.04)] border-y md:border border-slate-100 overflow-hidden relative">

            <div class="overflow-x-auto custom-scrollbar relative">
                <div class="min-w-max">

                    <div class="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-100 flex shadow-sm">
                        <div class="sticky left-0 z-40 bg-white dark:bg-slate-900 w-36 md:w-72 border-r border-slate-100 p-3 md:p-4 flex items-center font-bold text-slate-400 text-[10px] md:text-xs uppercase tracking-wider">
                            <span class="truncate"> {{ $t('habit_name') }}</span>
                        </div>

                        <div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5">
                            <div v-for="day in monthDates" :key="day.dateString" class="w-8 flex flex-col items-center gap-1">
                                <span class="text-[9px] md:text-[10px] font-bold text-slate-400 capitalize">
                                    {{ day.dayName }}
                                </span>
                                <span class="text-[10px] md:text-xs font-black text-slate-600" :class="day.isToday ? 'text-indigo-600 bg-indigo-50 px-1.5 rounded' : ''">
                                    {{ day.dayNumber }}
                                </span>
                            </div>
                        </div>

                        <div class="hidden md:flex sticky right-0 z-40 bg-white dark:bg-slate-900 w-32 p-4 border-l border-slate-100 items-center justify-end font-bold text-slate-400 text-xs uppercase tracking-wider shadow-[-10px_0_20px_rgba(255,255,255,0.8)]">
                            {{ $t('habit_table_total') }}
                        </div>
                    </div>

                    <div class="divide-y divide-slate-50">
                        <div v-for="(habit, hIndex) in localHabits" :key="habit.id" class="flex hover:bg-slate-50/50 transition-colors group">

                            <div class="sticky left-0 z-20 w-36 md:w-72 bg-white dark:bg-slate-900 group-hover:bg-slate-50 transition-colors border-r border-slate-100 p-3 md:p-4 flex items-center gap-3 md:gap-4 flex-shrink-0">
                                <div class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center text-base md:text-xl bg-slate-50 border border-slate-100" :style="{ color: habit.color }">
                                    {{ habit.icon }}
                                </div>
                                <div class="min-w-0 flex-1">
                                    <h4 class="font-bold text-slate-700 truncate text-xs md:text-sm">
                                        {{ habit.name }}
                                    </h4>
                                    <div class="flex items-center gap-1 text-[10px] font-medium text-slate-400 mb-1.5 mt-0.5">
                                        <span>🎯 Target: {{ habit.monthly_target }}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <div class="h-1 md:h-1.5 w-10 md:w-16 bg-slate-100 rounded-full overflow-hidden">
                                            <div class="h-full rounded-full transition-all duration-300" :style="{ width: habit.progress_percent + '%', backgroundColor: habit.color }"></div>
                                        </div>
                                        
                                        <button @click="editHabit(habit)" class="md:hidden text-slate-400 hover:text-indigo-600 px-1 active:scale-95 transition">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                        </button>
                                        
                                        <div class="hidden md:flex opacity-0 group-hover:opacity-100 transition items-center gap-1 bg-white dark:bg-slate-900/80 backdrop-blur-sm px-1 rounded-md absolute right-2 top-1/2 -translate-y-1/2 shadow-sm border border-slate-100 z-50">
                                            <button @click="editHabit(habit)" class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="Edit">
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                            </button>
                                            <button @click="confirmDelete(habit)" class="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition" title="Hapus">
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        </div>
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
    tabindex="0"
    class="scroll-mt-32 md:scroll-ml-72 w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg flex items-center justify-center relative outline-none transition-all duration-200 hover:scale-110 hover:z-20 active:scale-75 focus:ring-4 focus:ring-indigo-400 focus:z-30 focus:shadow-lg" 
    :class="{
        /* KONDISI: BERHASIL/CENTANG */
        'shadow-md text-white border-transparent z-10': getStatus(habit, day.dateString) === 'completed',
        
        /* KONDISI: SKIP (-) */
        'bg-slate-100 text-slate-400 border-slate-200': getStatus(habit, day.dateString) === 'skipped',
        
        /* KONDISI: KOSONG (BISA DIISI) */
        'bg-white dark:bg-slate-900 border border-slate-200 hover:border-indigo-400': getStatus(habit, day.dateString) === 'empty' && !day.isFuture,
        
        /* KONDISI: MASA DEPAN (LOCKED) */
        'bg-slate-50 border-slate-50 opacity-30 cursor-not-allowed': day.isFuture,
        
        /* KONDISI: HARI INI (INDICATOR) */
        'ring-2 ring-indigo-600 ring-offset-2': day.isToday && getStatus(habit, day.dateString) !== 'completed'
    }"
    :style="getStatus(habit, day.dateString) === 'completed' ? { backgroundColor: habit.color } : {}"
>
    <span v-if="getStatus(habit, day.dateString) === 'completed'" 
          class="text-[10px] md:text-xs font-black drop-shadow-sm animate-in zoom-in duration-300">
          ✓
    </span>
    
    <span v-if="getStatus(habit, day.dateString) === 'skipped'" 
          class="text-[10px] md:text-xs font-bold animate-in fade-in duration-300">
          -
    </span>
</button>
                                </div>
                            </div>

                            <div class="hidden md:flex sticky right-0 z-20 w-32 bg-white dark:bg-slate-900 group-hover:bg-slate-50 transition-colors border-l border-slate-100 p-4 flex-col justify-center shadow-[-10px_0_20px_rgba(255,255,255,0.8)]">
                                <div class="flex justify-between items-end mb-1">
                                    <span class="text-lg font-black text-slate-700">{{ habit.progress_count }}</span>
                                    <span class="text-[10px] font-bold text-slate-400 mb-1">{{ Math.round(habit.progress_percent) }}%</span>
                                </div>
                                <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                    <div class="h-full rounded-full transition-all duration-500" :style="{ width: habit.progress_percent + '%', backgroundColor: habit.color }"></div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div v-else class="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 text-center shadow-lg border border-slate-100 mt-6 mx-4 md:mx-0">
            <div class="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-3xl md:text-4xl mx-auto mb-4">🌱</div>
            <h3 class="text-lg md:text-xl font-bold text-slate-800">{{ $t('habit_empty_title') }}</h3>
            <p class="text-sm md:text-base text-slate-500 mb-6">{{ $t('habit_empty_desc') }}</p>
            <div class="flex flex-col md:flex-row items-center justify-center gap-4">
                <button @click="openCreateModal" class="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition transform hover:-translate-y-1">
                    + {{ $t('habit_btn_new') }}
                </button>
                <button v-if="hasPrevHabits" @click="openCopyModal" class="px-6 py-3 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition">
                    📂 {{ $t('habit_salin_btn') }}
                </button>
            </div>
        </div>

    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
button { -webkit-tap-highlight-color: transparent; }
</style>