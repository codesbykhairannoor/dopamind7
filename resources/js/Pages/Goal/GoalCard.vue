<script setup>
import { 
    MoreHorizontal, Trash2, Calendar, Target, Award, 
    ChevronDown, ChevronUp, Plus, Edit2, Zap, AlertTriangle, 
    CheckCircle2, Clock, TrendingUp, ListFilter
} from 'lucide-vue-next';
import { ref, computed, watch } from 'vue';
import { trans } from 'laravel-vue-i18n';
import MilestoneItem from './MilestoneItem.vue';
import confetti from 'canvas-confetti';

const props = defineProps({
    goal: Object
});

const emit = defineEmits([
    'edit', 'delete', 'add-milestone', 'save-milestone', 'toggle-milestone', 'delete-milestone'
]);

const showMilestones = ref(true);
const dropdownOpen = ref(false);

const progress = computed(() => props.goal.progress || 0);

// Celebration Logic
watch(() => props.goal.progress, (newVal, oldVal) => {
    if (newVal === 100 && oldVal < 100) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4f46e5', '#818cf8', '#6366f1']
        });
    }
});

const statusConfig = {
    active: { icon: Zap, class: 'bg-emerald-500', bg: 'bg-emerald-50 text-emerald-600', label: 'goal_status_active' },
    completed: { icon: CheckCircle2, class: 'bg-indigo-600', bg: 'bg-indigo-50 text-indigo-600', label: 'goal_status_completed' },
    paused: { icon: Clock, class: 'bg-amber-500', bg: 'bg-amber-50 text-amber-600', label: 'goal_status_paused' },
    cancelled: { icon: AlertTriangle, class: 'bg-slate-400', bg: 'bg-slate-50 text-slate-500', label: 'goal_status_cancelled' }
};

const priorityConfig = {
    vital: 'bg-rose-500',
    important: 'bg-indigo-500',
    optional: 'bg-slate-400'
};

const t = (key, fallback) => {
    const res = trans(key);
    return res !== key ? res : fallback;
};
</script>

<template>
    <div class="group h-full bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-500 flex flex-col">
        
        <!-- Top Vision Board Banner -->
        <div class="relative h-28 shrink-0 overflow-hidden bg-slate-100 rounded-t-[2.5rem]">
            <template v-if="goal.cover_image_url">
                <img :src="goal.cover_image_url" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            </template>
            <div v-else class="w-full h-full bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center">
                <Target :size="40" class="text-indigo-200" stroke-width="1.5" />
            </div>

            <!-- Absolute Floaters -->
            <div class="absolute top-3.5 left-4 flex gap-2">
                <div :class="[priorityConfig[goal.priority], 'w-2 h-2 rounded-full shadow-lg pulse-priority']"></div>
            </div>

            <div class="absolute top-3.5 right-4 flex gap-1.5">
                <button @click="emit('edit')" class="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition-all sm:opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                    <Edit2 :size="12" />
                </button>
                <div class="relative">
                    <button @click="dropdownOpen = !dropdownOpen" class="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-all sm:opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 delay-75">
                        <MoreHorizontal :size="12" />
                    </button>
                    <!-- Small Dropdown -->
                    <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                        <button @click="emit('delete')" class="w-full flex items-center gap-2.5 px-3 py-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors text-[9px] font-black uppercase tracking-wider">
                            <Trash2 :size="14" /> {{ t('goal_btn_delete', 'Hapus Vision') }}
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="goal.reward" class="absolute bottom-3.5 left-4 right-4">
                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/90 backdrop-blur-md text-white text-[9px] font-black shadow-lg">
                    <Award :size="12" /> {{ goal.reward }}
                </div>
            </div>
        </div>

        <!-- Content Body -->
        <div class="p-5 flex flex-col flex-1">
            <h3 class="text-lg font-black text-slate-800 line-clamp-2 leading-tight mb-3.5">{{ goal.title }}</h3>

            <div class="space-y-3.5 flex-1">
                <!-- Progress Stats -->
                <div>
                    <div class="flex justify-between items-end mb-2">
                        <div class="flex items-center gap-1.5">
                            <TrendingUp :size="14" class="text-indigo-500" />
                            <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ t('common_progress', 'Momentum') }}</span>
                        </div>
                        <span class="text-base font-black text-indigo-600">{{ progress }}%</span>
                    </div>
                    <div class="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/50 shadow-inner">
                        <div class="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 transition-all duration-1000 ease-out relative"
                             :style="{ width: `${progress}%` }">
                            <div class="absolute inset-0 bg-white/20 w-full animate-shimmer"></div>
                        </div>
                    </div>
                </div>

                <!-- Footer Info -->
                <div class="flex items-center justify-between pt-1">
                    <div class="flex items-center gap-4">
                        <div class="flex flex-col">
                            <span class="text-[8px] font-black text-slate-300 uppercase tracking-widest">{{ t('common_deadline', 'Target') }}</span>
                            <span class="text-[11px] font-black text-slate-600 flex items-center gap-1.5">
                                <Calendar :size="11" class="text-slate-400" />
                                {{ goal.end_date || t('no_date', 'No Deadline') }}
                            </span>
                        </div>
                    </div>
                    <div :class="[statusConfig[goal.status]?.bg, 'px-3 py-1 rounded-full flex items-center gap-1.5 border border-current opacity-70']">
                        <component :is="statusConfig[goal.status]?.icon" :size="10" />
                        <span class="text-[8px] font-black uppercase tracking-wider">{{ t(statusConfig[goal.status]?.label, goal.status) }}</span>
                    </div>
                </div>

                <!-- Milestones Section Toggle -->
                <div class="pt-3.5 border-t border-slate-50">
                    <button @click="showMilestones = !showMilestones" class="w-full flex items-center justify-between text-slate-400 hover:text-indigo-500 transition-colors group/milestone">
                        <div class="flex items-center gap-1.5">
                            <ListFilter :size="14" />
                            <span class="text-[9px] font-black uppercase tracking-[0.2em]">{{ t('goal_milestones_title', 'Mastery Steps') }}</span>
                        </div>
                        <ChevronUp v-if="showMilestones" :size="14" />
                        <ChevronDown v-else :size="14" />
                    </button>

                    <div v-show="showMilestones" class="mt-3 space-y-2">
                        <MilestoneItem 
                            v-for="m in goal.milestones" 
                            :key="m.id" 
                            :milestone="m"
                            @save="(data) => emit('save-milestone', data)"
                            @toggle="emit('toggle-milestone', m)"
                            @delete="emit('delete-milestone', m.id)"
                        />
                        
                        <button @click="emit('add-milestone')" 
                                class="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-100 text-slate-300 hover:border-indigo-100 hover:text-indigo-400 hover:bg-indigo-50/10 transition-all flex items-center justify-center gap-1.5 group/add">
                            <Plus :size="14" class="group-hover/add:rotate-90 transition-transform" />
                            <span class="text-[9px] font-black uppercase tracking-widest">{{ t('goal_btn_add_milestone', 'Add Step') }}</span>
                        </button>
                    </div>
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

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
</style>
