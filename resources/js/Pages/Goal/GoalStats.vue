<script setup>
defineProps({
    stats: Object
});
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <!-- MASTER PROGRESS (Top Left) -->
        <div class="md:col-span-2 bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-100 group">
            <div class="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <p class="text-[0.7rem] font-black text-indigo-200 uppercase tracking-[0.2em] mb-2">{{ $t('goal_stats_master_progress') }}</p>
                    <div class="flex items-baseline gap-3">
                        <h3 class="text-6xl font-black tabular-nums">{{ stats.avg_progress }}<span class="text-2xl text-indigo-300/50">%</span></h3>
                        <span class="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/20">{{ $t('goal_stats_overall') }}</span>
                    </div>
                </div>
                
                <div class="mt-8">
                    <div class="h-3 bg-black/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <div 
                            class="h-full rounded-full bg-gradient-to-r from-white/40 via-white/80 to-white transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                            :style="{ width: stats.avg_progress + '%' }"
                        ></div>
                    </div>
                </div>
            </div>
            <!-- Decorative Elements -->
            <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div class="absolute -left-10 -top-10 w-24 h-24 bg-indigo-400/20 rounded-full blur-2xl group-hover:bg-indigo-400/30 transition-all duration-700"></div>
        </div>

        <!-- TOP MOMENTUM (Top Right) -->
        <div class="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
            <div>
                <div class="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🔥</div>
                <p class="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{{ $t('goal_stats_focus') }}</p>
                <h3 class="text-lg font-black text-slate-800 line-clamp-2 leading-tight">
                    {{ stats.top_goal_title || $t('goal_empty_title') }}
                </h3>
            </div>
            <div v-if="stats.top_goal_title" class="mt-4 pt-4 border-t border-slate-50">
                <span class="text-[0.6rem] font-bold text-indigo-500 uppercase tracking-widest flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    {{ $t('goal_stats_top_momentum') }}
                </span>
            </div>
        </div>

        <!-- URGENT / DEADLINES (Bottom Left) -->
        <div class="md:col-span-2 bg-gradient-to-br from-rose-500 to-rose-600 p-8 rounded-[2.5rem] shadow-xl shadow-rose-100 flex flex-col justify-between group relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl text-white">⏰</div>
                        <p class="text-[0.65rem] font-black text-rose-100 uppercase tracking-[0.2em]">{{ $t('goal_stats_urgent', 'Most Urgent') }}</p>
                    </div>
                    <h3 class="text-2xl font-black text-white line-clamp-1 leading-tight">
                        {{ stats.urgent_goal_title || $t('goal_no_deadlines', 'No upcoming deadlines') }}
                    </h3>
                </div>
                <div class="bg-white/20 backdrop-blur-md rounded-3xl p-4 px-6 border border-white/20">
                    <div class="text-[0.6rem] font-black text-rose-100 uppercase tracking-widest mb-1">{{ $t('goal_stats_upcoming', 'This Week') }}</div>
                    <div class="flex items-baseline gap-2 text-white">
                        <span class="text-3xl font-black">{{ stats.upcoming_deadlines_count }}</span>
                        <span class="text-[0.7rem] font-bold opacity-80">{{ $t('goal_deadlines_label', 'Deadlines') }}</span>
                    </div>
                </div>
            </div>
            <!-- Decorative circle -->
            <div class="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
        </div>

        <!-- PROJECT PULSE (Bottom Right) -->
        <div class="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
            <div>
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📈</div>
                <p class="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{{ $t('goal_stats_pulse') }}</p>
                <div class="flex items-baseline gap-2">
                    <h3 class="text-4xl font-black text-slate-800">{{ stats.milestones_completed }}</h3>
                    <span class="text-sm font-bold text-slate-300">/ {{ stats.milestones_total }}</span>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-50">
                <p class="text-[0.6rem] font-black text-emerald-500 uppercase tracking-widest line-clamp-1">
                    {{ stats.active }} {{ $t('goal_status_active') }}
                </p>
            </div>
        </div>
    </div>
</template>
