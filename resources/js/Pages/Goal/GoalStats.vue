<script setup>
import { computed } from 'vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
    stats: Object,
    goals: { type: Array, default: () => [] }
});

const statsData = computed(() => {
    const s = props.stats || {};
    
    return [
        {
            label: 'goal_stats_north_star',
            value: s.top_goal_title || 'No Active Vision',
            progress: s.top_goal_progress || 0,
            icon: 'goal', // Changed to existing icon
            color: 'text-indigo-600 dark:text-indigo-400',
            bg: 'bg-white dark:bg-slate-900',
            type: 'progress'
        },
        {
            label: 'goal_stats_runway',
            value: s.urgent_goal_title, // Handle fallback in template
            daysLeft: typeof s.urgent_goal_days_left === 'number' ? s.urgent_goal_days_left : null,
            icon: 'calendar',
            color: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-white dark:bg-slate-900',
            type: 'time'
        },
        {
            label: 'goal_stats_mastery',
            value: `${s.milestones_completed || 0} / ${s.milestones_total || 0}`,
            subValue: 'Steps Navigated',
            icon: 'premium', // Changed to existing icon
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-white dark:bg-slate-900',
            type: 'ratio'
        }
    ];
});

const masterProgress = computed(() => props.stats?.avg_progress || 0);

// For the circular progress
const circumference = 2 * Math.PI * 34;
const strokeDashoffset = computed(() => circumference - (masterProgress.value / 100) * circumference);
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
        <!-- Master Stats: Circular Vision Momentum -->
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
                <p class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] mb-1">
                    {{ $t('goal_stats_momentum') }}
                </p>
                <h3 class="text-xl font-black text-slate-800 dark:text-white leading-tight transition-colors duration-500">
                    Mastering<br/>Your Vision
                </h3>
            </div>
            
            <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
        </div>

        <!-- Command Center Cards -->
        <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div 
                v-for="stat in statsData" 
                :key="stat.label"
                class="p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between group overflow-hidden relative"
            >
                <div class="flex items-center justify-between mb-4 relative z-10">
                    <div :class="[stat.color, 'p-2 rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3']">
                        <OneForMindIcon :name="stat.icon" size="18" stroke-width="2.5" />
                    </div>
                    <span class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">{{ $t(stat.label) }}</span>
                </div>
                
                <div class="relative z-10">
                    <!-- Value Display based on type -->
                    <div v-if="stat.type === 'progress'" class="space-y-2">
                        <h4 class="text-sm font-black text-slate-800 dark:text-white line-clamp-1 pr-2">
                            {{ stat.value }}
                        </h4>
                        <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full bg-indigo-500 transition-all duration-1000" :style="{ width: stat.progress + '%' }"></div>
                        </div>
                    </div>

                    <div v-else-if="stat.type === 'time'" class="space-y-1">
                        <h4 class="text-xs font-black text-slate-800 dark:text-white line-clamp-1 opacity-80">
                            {{ stat.value || $t('goal_stats_calm') }}
                        </h4>
                        <p class="text-xl font-black" :class="stat.daysLeft !== null && stat.daysLeft <= 3 ? 'text-rose-500 animate-pulse' : 'text-slate-800 dark:text-white'">
                            {{ typeof stat.daysLeft === 'number' ? $t('goal_stats_day_left', { days: stat.daysLeft }) : $t('goal_stats_calm') }}
                        </p>
                    </div>

                    <div v-else-if="stat.type === 'ratio'">
                        <h4 class="text-2xl font-black text-slate-800 dark:text-white mb-1">
                            {{ stat.value }}
                        </h4>
                        <p class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-60">
                            {{ stat.subValue }}
                        </p>
                    </div>
                </div>

                <!-- Strategic Aesthetic touches -->
                <div class="absolute -right-2 -top-2 w-12 h-12 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.shadow-indigo-500\/5 {
    box-shadow: 0 20px 40px -15px rgba(79, 70, 229, 0.05);
}
</style>
