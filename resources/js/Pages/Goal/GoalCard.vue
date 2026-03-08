<script setup>
import { computed, watch } from 'vue';
import { 
    Target, Calendar, Award, Trash2, Edit3, 
    MoreVertical, ChevronRight, Zap, CheckCircle2 
} from 'lucide-vue-next';
import MilestoneItem from './MilestoneItem.vue';
import { usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import confetti from 'canvas-confetti';

const props = defineProps({
    goal: Object,
    onEdit: Function,
    onDelete: Function,
    onToggleMilestone: Function,
    onAddMilestone: Function,
    onSaveMilestone: Function,
    onDeleteMilestone: Function
});

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
        vital: { text: 'Vital', class: 'bg-rose-50 text-rose-600 border-rose-100' },
        important: { text: 'Important', class: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
        optional: { text: 'Optional', class: 'bg-slate-50 text-slate-400 border-slate-100' }
    }[p];
});
</script>

<template>
    <div class="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col overflow-hidden h-full">
        
        <!-- Vision Banner / Header -->
        <div class="relative h-44 shrink-0 overflow-hidden bg-slate-50">
            <template v-if="goal.cover_image_url">
                <img :src="goal.cover_image_url" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </template>
            <div v-else class="w-full h-full flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Target :size="100" />
                <div class="absolute inset-0 bg-gradient-to-br from-slate-100 to-indigo-50/30"></div>
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
                <h3 class="text-xl font-black truncate drop-shadow-sm" :class="goal.cover_image_url ? 'text-white' : 'text-slate-800'">
                    {{ goal.title }}
                </h3>
            </div>

            <!-- Quick Actions Overlay -->
            <div class="absolute top-4 right-4 flex gap-2">
                <button @click="onEdit(goal)" class="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-indigo-600 transition-all shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 delay-75">
                    <Edit3 :size="14" />
                </button>
                <button @click="onDelete(goal.id)" class="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 delay-150">
                    <Trash2 :size="14" />
                </button>
            </div>
        </div>

        <!-- Progress Body -->
        <div class="p-6 flex flex-col flex-1">
            <div class="flex items-center justify-between mb-4">
                <div class="flex flex-col">
                    <span class="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Manifestation</span>
                    <span class="text-xs font-black text-slate-800 tabular-nums">{{ progress }}% Completed</span>
                </div>
                <div class="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <Zap :size="14" :class="progress === 100 ? 'text-amber-400 animate-pulse' : 'text-slate-300'" />
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="h-1.5 w-full bg-slate-100 rounded-full mb-6 overflow-hidden p-0.5">
                <div 
                    class="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                    :style="{ width: progress + '%', backgroundColor: goal.color || '#6366f1' }"
                ></div>
            </div>

            <!-- Milestones Section -->
            <div class="flex-1">
                <div class="flex items-center justify-between mb-3 px-1">
                    <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Mastery Steps</h4>
                    <button @click="onAddMilestone(goal)" class="text-[9px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-widest transition-colors">
                        + New Step
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
                    
                    <div v-if="!goal.milestones?.length" class="py-10 text-center border-2 border-dashed border-slate-50 rounded-[2rem] flex flex-col items-center">
                        <div class="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                            <ChevronRight :size="16" class="text-slate-300" />
                        </div>
                        <p class="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No active steps</p>
                    </div>
                </div>
            </div>

            <!-- Footer: Reward -->
            <div v-if="goal.reward" class="mt-6 pt-4 border-t border-slate-50 flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100/50">
                    <Award :size="14" class="text-amber-500" />
                </div>
                <div class="flex flex-col min-w-0">
                    <span class="text-[8px] font-black text-amber-500/80 uppercase tracking-widest">Victory Reward</span>
                    <p class="text-[11px] font-bold text-slate-600 truncate italic">"{{ goal.reward }}"</p>
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
.custom-milestone-list::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
</style>