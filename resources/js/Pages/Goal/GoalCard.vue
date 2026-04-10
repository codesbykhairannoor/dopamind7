<script setup>
import { computed, watch } from 'vue';
import { 
    Target, Calendar, Award, Trash2, Edit3, 
    MoreVertical, ChevronRight, Zap, CheckCircle2, Sparkles, ArrowRight
} from 'lucide-vue-next';
import MilestoneItem from './MilestoneItem.vue';
import { usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import confetti from 'canvas-confetti';
import { trans } from 'laravel-vue-i18n';

const t = (key, fallback) => {
    const res = trans(key);
    return res !== key ? res : fallback;
};

const props = defineProps({
    goal: Object,
    onEdit: Function,
    onDelete: Function,
    onToggleMilestone: Function,
    onAddMilestone: Function,
    onSaveMilestone: Function,
    onDeleteMilestone: Function,
    isExplorer: Boolean
});

const emit = defineEmits(['openPreview']);

const page = usePage();

// Progress calculation is now reactive from milestones
const progress = computed(() => {
    const ms = props.goal.milestones || [];
    if (ms.length === 0) return 0;
    const comp = ms.filter(m => m.is_completed || m.completed).length;
    return Math.round((comp / ms.length) * 100);
});

// Celebration logic
watch(progress, (newVal, oldVal) => {
    if (newVal === 100 && oldVal < 100) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: [props.goal.color || '#6366f1', '#ffffff', '#ffd700']
        });
    }
});

const dateDisplay = (date) => {
    if (!date) return null;
    return dayjs(date).locale(page.props.locale || 'id').format('DD MMM');
};

const priorityLabel = computed(() => {
    const p = props.goal.priority || 'important';
    return {
        vital: { text: 'Vital', class: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20' },
        important: { text: 'Important', class: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20' },
        optional: { text: 'Optional', class: 'bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-700' }
    }[p];
});

// Mesh Gradient Generator for Empty Covers
const meshGradient = computed(() => {
    const color = props.goal.color || '#6366f1';
    return {
        background: `radial-gradient(at 0% 0%, ${color}33 0px, transparent 50%),
                    radial-gradient(at 100% 0%, ${color}66 0px, transparent 50%),
                    radial-gradient(at 100% 100%, ${color}33 0px, transparent 50%),
                    radial-gradient(at 0% 100%, ${color}1a 0px, transparent 50%),
                    ${color}05`
    };
});
</script>

<template>
    <div class="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 transition-all duration-500 flex flex-col overflow-hidden h-full">
        
        <!-- Vision Banner / Header -->
        <div class="relative h-32 md:h-44 shrink-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
            <template v-if="goal.cover_image_url">
                <img :src="goal.cover_image_url" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </template>
            <div v-else :style="meshGradient" class="w-full h-full flex items-center justify-center transition-transform duration-700 relative group-hover:scale-105">
                <div class="absolute inset-0 backdrop-blur-[2px]"></div>
                <div class="relative z-10 w-16 h-16 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10 flex items-center justify-center text-white shadow-xl">
                    <Target :size="32" stroke-width="2.5" :style="{ color: goal.color }" />
                </div>
            </div>

            <!-- Header Content Overlay -->
            <div class="absolute inset-x-5 bottom-4 flex flex-col">
                <div class="flex items-center gap-2 mb-1.5">
                    <span :class="['px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md transition-colors', goal.cover_image_url ? 'bg-white/10 text-white' : priorityLabel.class]">
                        {{ priorityLabel.text }}
                    </span>
                    <span v-if="goal.end_date" class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-black/20 text-white border border-white/10 backdrop-blur-md flex items-center gap-1">
                        <Calendar :size="8" />
                        {{ dateDisplay(goal.end_date) }}
                    </span>
                </div>
                <h3 class="text-xl font-black truncate drop-shadow-sm transition-colors duration-500" :class="goal.cover_image_url ? 'text-white' : 'text-slate-800 dark:text-white'">
                    {{ goal.title }}
                </h3>
            </div>

            <!-- Quick Actions Overlay -->
            <div class="absolute top-4 right-4 flex gap-2">
                <button @click="onEdit(goal)" class="w-8 h-8 rounded-full bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white dark:hover:bg-indigo-600 hover:text-indigo-600 dark:hover:text-white transition-all shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 delay-75">
                    <Edit3 :size="14" />
                </button>
                <button @click="onDelete(goal.id)" class="w-8 h-8 rounded-full bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 delay-150">
                    <Trash2 :size="14" />
                </button>
            </div>
        </div>

        <!-- Progress Body -->
        <div class="p-6 flex flex-col flex-1">
            <div class="flex items-center justify-between mb-4">
                <div class="flex flex-col">
                    <span class="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-0.5">{{ t('goal_manifestation', 'Manifestation') }}</span>
                    <span class="text-xs font-black text-slate-800 dark:text-white tabular-nums">{{ trans('goal_completed_pct', { count: progress }) }}</span>
                </div>
                <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center relative">
                    <Zap :size="14" :class="progress === 100 ? 'text-amber-400 animate-pulse' : 'text-slate-300 dark:text-slate-600'" />
                    <div v-if="goal.is_saving" class="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
                        <div class="w-1.5 h-1.5 border border-white dark:border-slate-200 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mb-6 overflow-hidden p-0.5">
                <div 
                    class="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                    :style="{ width: progress + '%', backgroundColor: goal.color || '#6366f1' }"
                ></div>
            </div>

            <!-- 🧠 NEW: AI STRATEGY LAB SKELETAL UI (FOR FREE USERS) -->
            <div v-if="isExplorer" @click="emit('openPreview', 'Goal')" 
                 class="mb-6 p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 relative overflow-hidden group/strategy cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <Sparkles :size="14" class="text-indigo-500 animate-pulse" />
                        <span class="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest">AI Strategy Lab</span>
                    </div>
                    <div class="px-1.5 py-0.5 rounded bg-indigo-500 text-white text-[7px] font-black uppercase tracking-widest">Elite</div>
                </div>

                <!-- Skeletal Strategy Steps -->
                <div class="space-y-2 blur-[1.5px] opacity-30 group-hover:opacity-50 transition-all">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-indigo-400"></div>
                        <div class="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        <div class="h-1.5 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                    </div>
                </div>

                <div class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-50 dark:from-slate-800 to-transparent flex items-center justify-center">
                    <span class="text-[9px] font-black text-indigo-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">Generate Strategy</span>
                </div>
            </div>

            <!-- Milestones Section -->
            <div class="flex-1">
                <div class="flex items-center justify-between mb-3 px-1">
                    <h4 class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.1em]">{{ t('goal_mastery_steps', 'Mastery Steps') }}</h4>
                    <button @click="onAddMilestone(goal)" class="text-[9px] font-black text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 uppercase tracking-widest transition-colors">
                        {{ t('goal_new_step', '+ New Step') }}
                    </button>
                </div>

                <div class="space-y-1.5 custom-milestone-list max-h-[220px] overflow-y-auto pr-1">
                    <MilestoneItem 
                        v-for="m in goal.milestones" 
                        :key="m._key || m.id" 
                        :milestone="m"
                        @toggle="onToggleMilestone(goal, m)"
                        @save="(data) => onSaveMilestone(goal, data)"
                        @delete="onDeleteMilestone(goal, m.id)"
                    />
                    
                    <div v-if="!goal.milestones?.length" class="py-10 text-center border-2 border-dashed border-slate-50 dark:border-slate-800 rounded-[2rem] flex flex-col items-center">
                        <div class="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                            <ChevronRight :size="16" class="text-slate-300 dark:text-slate-600" />
                        </div>
                        <p class="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">{{ t('goal_no_steps', 'No active steps') }}</p>
                    </div>
                </div>
            </div>

            <!-- Footer: Reward -->
            <div v-if="goal.reward" class="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-100/50 dark:border-amber-500/20">
                    <Award :size="14" class="text-amber-500 dark:text-amber-400" />
                </div>
                <div class="flex flex-col min-w-0">
                    <span class="text-[8px] font-black text-amber-500/80 dark:text-amber-400 uppercase tracking-widest">{{ t('goal_victory_reward', 'Victory Reward') }}</span>
                    <p class="text-[11px] font-bold text-slate-600 dark:text-slate-400 truncate italic">"{{ goal.reward }}"</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}
.animate-shimmer {
    animation: shimmer 3s infinite linear;
}

.pulse-priority {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: .7; transform: scale(1.2); }
}

.custom-milestone-list::-webkit-scrollbar { width: 4px; }
.custom-milestone-list::-webkit-scrollbar-track { background: transparent; }
.custom-milestone-list::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
.dark .custom-milestone-list::-webkit-scrollbar-thumb { background: #1e293b; }
.custom-milestone-list::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
.dark .custom-milestone-list::-webkit-scrollbar-thumb:hover { background: #334155; }
</style>