<script setup>
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { computed } from 'vue';

const props = defineProps({
    stats: Object,
    goals: { type: Array, default: () => [] }
});

const statsData = computed(() => [
    {
        label: 'goal_stats_focus',
        value: props.stats?.top_goal_title || 'Focus Mode',
        icon: 'target',
        color: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100/50 dark:border-indigo-500/20',
        isTitle: true
    },
    {
        label: 'goal_stats_urgent',
        value: props.stats?.upcoming_deadlines_count || 0,
        subValue: 'Upcoming Deadlines',
        icon: 'calendar',
        color: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-50 dark:bg-rose-500/10 border-rose-100/50 dark:border-rose-500/20'
    },
    {
        label: 'goal_stats_pulse',
        value: `${props.stats?.milestones_completed || 0} / ${props.stats?.milestones_total || 0}`,
        subValue: 'Steps Navigated',
        icon: 'finance',
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100/50 dark:border-emerald-500/20'
    }
]);

const masterProgress = computed(() => props.stats?.avg_progress || 0);

// For the circular progress
const circumference = 2 * Math.PI * 34;
const strokeDashoffset = computed(() => circumference - (masterProgress.value / 100) * circumference);
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
        <!-- Master Stats: Circular Bento -->
        <div class="lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2.5rem] p-7 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6 group hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden relative">
            <div class="relative shrink-0">
                <svg class="w-24 h-24 transform -rotate-90">
                    <circle class="text-slate-100 dark:text-slate-800" stroke-width="8" stroke="currentColor" fill="transparent" r="34" cx="48" cy="48" />
                    <circle class="text-indigo-600 transition-all duration-1000 ease-out" stroke-width="8" :stroke-dasharray="circumference" :stroke-dashoffset="strokeDashoffset" stroke-linecap="round" stroke="currentColor" fill="transparent" r="34" cx="48" cy="48" />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-xl font-black text-slate-800 dark:text-white transition-colors duration-500">{{ masterProgress }}%</span>
                </div>
            </div>
            
            <div class="flex flex-col">
                <p class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] mb-1">Momentum</p>
                <h3 class="text-xl font-black text-slate-800 dark:text-white leading-tight transition-colors duration-500">Mastering<br/>Your Vision</h3>
            </div>
            
            <!-- Abstract background shape -->
            <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
        </div>

        <!-- Quick Info Bento Grid -->
        <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div 
                v-for="stat in statsData" 
                :key="stat.label"
                :class="[stat.bg, 'p-6 rounded-[2.5rem] border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between group overflow-hidden relative']"
            >
                <div class="flex items-center justify-between mb-4 relative z-10">
                    <div :class="[stat.color, 'p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3']">
                        <OneForMindIcon :name="stat.icon" size="20" stroke-width="2.5" />
                    </div>
                    <span class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">{{ $t(stat.label) }}</span>
                </div>
                
                <div class="relative z-10">
                    <h4 :class="[stat.isTitle ? 'text-sm line-clamp-1 pr-4' : 'text-2xl', 'font-black text-slate-800 dark:text-white leading-tight transition-colors duration-500']">
                        {{ stat.value }}
                    </h4>
                    <p v-if="stat.subValue" class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5 opacity-60">
                        {{ stat.subValue }}
                    </p>
                </div>

                <!-- Subtle glass highlight -->
                <div class="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent pointer-events-none"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.shadow-indigo-500\/5 {
    box-shadow: 0 20px 40px -15px rgba(79, 70, 229, 0.05);
}
</style>
