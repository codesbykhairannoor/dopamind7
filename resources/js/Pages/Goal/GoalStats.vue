<script setup>
defineProps({
    stats: Object
});
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <!-- MASTER PROGRESS -->
        <div class="md:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200 group">
            <div class="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <p class="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{{ $t('goal_stats_master_progress', 'Master Progress') }}</p>
                    <div class="flex items-baseline gap-3">
                        <h3 class="text-6xl font-black">{{ stats.avg_progress }}<span class="text-2xl text-slate-500">%</span></h3>
                        <span class="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">{{ $t('goal_stats_overall', 'Overall Progress') }}</span>
                    </div>
                </div>
                
                <div class="mt-8">
                    <div class="h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                        <div 
                            class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                            :style="{ width: stats.avg_progress + '%' }"
                        ></div>
                    </div>
                </div>
            </div>
            <!-- Decorative Elements -->
            <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
            <div class="absolute -right-5 -top-5 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-700"></div>
        </div>

        <!-- TOP MOMENTUM -->
        <div class="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
            <div>
                <div class="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🔥</div>
                <p class="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{{ $t('goal_stats_focus', 'Focus Project') }}</p>
                <h3 class="text-lg font-black text-slate-800 line-clamp-2 leading-tight">
                    {{ stats.top_goal_title || $t('goal_empty_title', 'No Active Project') }}
                </h3>
            </div>
            <div v-if="stats.top_goal_title" class="mt-4 pt-4 border-t border-slate-50">
                <span class="text-[0.6rem] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    {{ $t('goal_stats_top_momentum', 'Highest Momentum') }}
                </span>
            </div>
        </div>

        <!-- PROJECT PULSE -->
        <div class="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
            <div>
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📈</div>
                <p class="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{{ $t('goal_stats_pulse', 'Project Pulse') }}</p>
                <div class="flex items-baseline gap-2">
                    <h3 class="text-4xl font-black text-slate-800">{{ stats.milestones_completed }}</h3>
                    <span class="text-sm font-bold text-slate-300">/ {{ stats.milestones_total }}</span>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-50">
                <p class="text-[0.6rem] font-black text-emerald-500 uppercase tracking-widest line-clamp-1">
                    {{ stats.active }} {{ $t('goal_status_active', 'Active Projects') }}
                </p>
            </div>
        </div>
    </div>
</template>
