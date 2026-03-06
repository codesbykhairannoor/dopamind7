<script setup>
import { ref, computed } from 'vue';
import MilestoneItem from './MilestoneItem.vue';

const props = defineProps({
    goal: Object,
    selected: Boolean,
    onToggleSelection: Function,
    onAutoSave: Function,
    onDelete: Function,
    onAddMilestone: Function,
    onSaveMilestone: Function,
    onToggleMilestone: Function,
    onDeleteMilestone: Function
});

const isEditingHeader = ref(false);
const editTitle = ref(props.goal.title);
const editCategory = ref(props.goal.category);
const editStartDate = ref(props.goal.start_date);
const editEndDate = ref(props.goal.end_date);

const frequencyTypes = [
    { value: 'daily', label: 'goal_type_daily', icon: '📅' },
    { value: 'weekly', label: 'goal_type_weekly', icon: '📊' },
    { value: 'specific_days', label: 'goal_type_specific_days', icon: '📌' },
    { value: 'custom_period', label: 'goal_type_custom_period', icon: '⏳' },
    { value: 'monthly', label: 'goal_type_monthly', icon: '🏢' },
    { value: 'yearly', label: 'goal_type_yearly', icon: '🏆' },
];

const statuses = [
    { value: 'active', label: 'goal_status_active', class: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { value: 'completed', label: 'goal_status_completed', class: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { value: 'paused', label: 'goal_status_paused', class: 'text-amber-600 bg-amber-50 border-amber-100' },
    { value: 'cancelled', label: 'goal_status_cancelled', class: 'text-rose-600 bg-rose-50 border-rose-100' },
];

const currentStatus = computed(() => statuses.find(s => s.value === props.goal.status) || statuses[0]);
const currentType = computed(() => frequencyTypes.find(t => t.value === props.goal.type) || frequencyTypes[0]);

const deadlineBadge = computed(() => {
    if (!props.goal.end_date) return null;
    
    if (props.goal.is_overdue) {
        return { text: 'goal_overdue', class: 'bg-rose-500 text-white animate-pulse' };
    }
    
    if (props.goal.days_remaining === 0) {
        return { text: 'goal_ending_today', class: 'bg-amber-500 text-white' };
    }
    
    if (props.goal.days_remaining <= 3) {
        return { text: 'goal_days_left', params: { days: props.goal.days_remaining }, class: 'bg-amber-100 text-amber-700' };
    }
    
    return { text: 'goal_days_left', params: { days: props.goal.days_remaining }, class: 'bg-emerald-50 text-emerald-700' };
});

const saveHeader = () => {
    if (
        editTitle.value !== props.goal.title || 
        editCategory.value !== props.goal.category ||
        editStartDate.value !== props.goal.start_date ||
        editEndDate.value !== props.goal.end_date
    ) {
        props.onAutoSave({ 
            ...props.goal, 
            title: editTitle.value, 
            category: editCategory.value,
            start_date: editStartDate.value,
            end_date: editEndDate.value
        });
    }
    isEditingHeader.value = false;
};
</script>

<template>
    <div 
        class="bg-white rounded-[2.5rem] border-2 transition-all duration-700 overflow-hidden group/card relative flex flex-col h-full"
        :class="[
            selected ? 'border-indigo-500 ring-8 ring-indigo-50 shadow-2xl scale-[1.02]' : 'border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-200'
        ]"
    >
        <!-- Deadline Overlays -->
        <div v-if="deadlineBadge" class="absolute top-6 right-6 z-10">
            <div :class="['px-4 py-1.5 rounded-full text-[0.65rem] font-black uppercase tracking-widest shadow-lg transition-all duration-500', deadlineBadge.class]">
                {{ $t(deadlineBadge.text, deadlineBadge.params) }}
            </div>
        </div>

        <!-- Card Header & Progress -->
        <div class="p-8 pb-4 space-y-6">
            <div class="flex justify-between items-start">
                <!-- Selection & Icon -->
                <div class="flex items-center gap-4">
                    <div class="relative">
                        <input 
                            type="checkbox" 
                            :checked="selected"
                            @change="onToggleSelection(goal.id)"
                            class="absolute -top-2 -left-2 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500 w-6 h-6 cursor-pointer transition-all z-20 shadow-md"
                        />
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-3xl shadow-inner border border-indigo-50/50">
                            {{ currentType.icon }}
                        </div>
                    </div>
                    <div>
                        <select 
                            v-model="goal.status" 
                            @change="onAutoSave(goal)"
                            class="px-4 py-2 rounded-xl text-[0.7rem] font-black uppercase tracking-wider border-2 cursor-pointer transition-all focus:ring-4 focus:ring-indigo-50 focus:outline-none appearance-none hover:shadow-md"
                            :class="currentStatus.class"
                        >
                            <option v-for="s in statuses" :key="s.value" :value="s.value">{{ $t(s.label) }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Title & Category -->
            <div class="space-y-3">
                <div v-if="isEditingHeader || !goal.title" class="space-y-4 bg-slate-50 p-6 rounded-3xl border-2 border-indigo-100 shadow-inner">
                    <input 
                        v-model="editTitle"
                        class="w-full bg-transparent border-none focus:ring-0 p-0 text-xl font-black text-slate-800 placeholder-slate-300"
                        :placeholder="$t('goal_ph_title', 'Judul Goal...')"
                        autofocus
                    />
                    <input 
                        v-model="editCategory"
                        class="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-bold text-slate-500 placeholder-slate-300"
                        :placeholder="$t('goal_ph_category', 'Kategori...')"
                    />
                    <div class="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                        <div class="space-y-1">
                            <label class="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">{{ $t('goal_start_date') }}</label>
                            <input type="date" v-model="editStartDate" class="w-full bg-white border-2 border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 focus:border-indigo-400 focus:ring-0 transition-all" />
                        </div>
                        <div class="space-y-1">
                            <label class="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">{{ $t('goal_end_date') }}</label>
                            <input type="date" v-model="editEndDate" class="w-full bg-white border-2 border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 focus:border-indigo-400 focus:ring-0 transition-all" />
                        </div>
                    </div>
                    <button @click="saveHeader" class="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                        {{ $t('btn_save') }}
                    </button>
                </div>
                <div v-else @click="isEditingHeader = true" class="cursor-pointer group/title">
                    <h3 class="text-2xl font-black text-slate-800 leading-tight group-hover/title:text-indigo-600 transition-colors">
                        {{ goal.title }}
                    </h3>
                    <div class="flex items-center flex-wrap gap-2 mt-2">
                        <span class="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.15em] px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">{{ goal.category || $t('common.no_category', 'NO CATEGORY') }}</span>
                        <span class="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                        <span class="text-[0.65rem] font-black text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-[0.15em] border border-indigo-100/50">{{ $t(currentType.label) }}</span>
                        <span v-if="goal.target_value > 0" class="text-[0.65rem] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-[0.15em] border border-emerald-100/50">Target: {{ goal.target_value }}</span>
                    </div>
                </div>
            </div>

            <!-- Double Progress Bars -->
            <div class="space-y-5 py-2">
                <!-- Achievement Progress -->
                <div class="space-y-2">
                    <div class="flex justify-between items-end">
                        <div class="flex items-center gap-2">
                            <span class="text-xl">🏆</span>
                            <span class="text-[0.7rem] font-black text-slate-500 uppercase tracking-[0.2em]">{{ $t('goal_progress', 'Progress') }}</span>
                        </div>
                        <span class="text-2xl font-black text-indigo-600 tabular-nums">{{ goal.progress }}<span class="text-[0.8rem] ml-1 opacity-50">%</span></span>
                    </div>
                    <div class="h-5 bg-slate-50 rounded-full overflow-hidden p-1.5 border-2 border-slate-100/50 shadow-inner">
                        <div 
                            class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-1000 ease-out relative shadow-lg shadow-indigo-200"
                            :style="{ width: goal.progress + '%' }"
                        >
                            <div class="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                            <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>
                    </div>
                </div>

                <!-- Time Progress (If Deadline exists) -->
                <div v-if="goal.end_date" class="space-y-2 opacity-80 scale-95 origin-left">
                    <div class="flex justify-between items-end">
                        <div class="flex items-center gap-2">
                            <span class="text-lg">⏳</span>
                            <span class="text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">{{ $t('goal_time_progress') }}</span>
                        </div>
                        <span class="text-sm font-black text-slate-500 tabular-nums">{{ goal.time_progress }}%</span>
                    </div>
                    <div class="h-3 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100 shadow-inner">
                        <div 
                            class="h-full rounded-full bg-slate-300 transition-all duration-1000 ease-out"
                            :class="{'!bg-rose-400': goal.is_overdue, '!bg-amber-400': goal.time_progress > 80 && !goal.is_overdue}"
                            :style="{ width: goal.time_progress + '%' }"
                        ></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Milestones Area -->
        <div class="flex-grow p-8 pt-4 bg-gradient-to-b from-slate-50/50 to-white space-y-4 border-t border-dashed border-slate-200">
            <div class="flex items-center justify-between mb-2">
                <h4 class="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.2em]">{{ $t('milestone_title', 'Rencana Langkah') }}</h4>
                <div v-if="goal.milestones?.length" class="text-[0.6rem] font-black text-indigo-400 bg-white px-2 py-0.5 rounded-md border border-slate-100">
                    {{ goal.milestones.filter(m => m.completed).length }}/{{ goal.milestones.length }}
                </div>
            </div>
            
            <div class="max-h-[250px] overflow-y-auto custom-scrollbar space-y-2 pr-2">
                <transition-group name="list" tag="div" class="space-y-2">
                    <MilestoneItem 
                        v-for="m in goal.milestones" 
                        :key="m.id"
                        :milestone="m"
                        :goal="goal"
                        :onToggle="onToggleMilestone"
                        :onDelete="onDeleteMilestone"
                        :onSave="onSaveMilestone"
                    />
                </transition-group>
            </div>

            <!-- Quick Add Milestone -->
            <button 
                @click="onAddMilestone(goal)"
                class="w-full py-4 px-4 border-2 border-dashed border-slate-200 rounded-[1.5rem] text-slate-400 text-[0.7rem] font-black uppercase tracking-widest hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-3 hover:bg-white hover:shadow-xl hover:shadow-indigo-50 active:scale-95"
            >
                <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-50 transition-colors">
                    <span class="text-lg leading-none">+</span>
                </div>
                {{ $t('milestone_add', 'Tambah Langkah') }}
            </button>
        </div>

        <!-- Card Footer -->
        <div class="p-6 bg-white border-t border-slate-50 flex justify-between items-center transition-all">
            <div class="flex flex-col gap-0.5">
                <div v-if="goal.is_saving" class="flex items-center gap-2 text-indigo-500 font-black text-[0.65rem] italic uppercase tracking-[0.2em]">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    {{ $t('status_saving', 'Saving...') }}
                </div>
                <div v-else class="flex items-center gap-3">
                    <div class="flex flex-col">
                        <span class="text-[0.55rem] font-black text-slate-300 uppercase tracking-tighter">{{ $t('goal_start_date') }}</span>
                        <span class="text-[0.7rem] font-bold text-slate-400">{{ goal.start_date || '-' }}</span>
                    </div>
                    <div class="w-4 h-px bg-slate-100"></div>
                    <div class="flex flex-col">
                        <span class="text-[0.55rem] font-black text-slate-300 uppercase tracking-tighter">{{ $t('goal_end_date') }}</span>
                        <span class="text-[0.7rem] font-bold text-slate-400" :class="{'text-rose-400': goal.is_overdue}">{{ goal.end_date || '-' }}</span>
                    </div>
                </div>
            </div>
            
            <button 
                @click="onDelete(goal.id, goal.is_new)"
                class="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all active:scale-90"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; border: 1px solid white; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }

.list-enter-active, .list-leave-active { transition: all 0.5s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(30px); }

/* Animation for overdue pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(0.95); }
}
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
</style>
