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

const saveHeader = () => {
    if (editTitle.value !== props.goal.title || editCategory.value !== props.goal.category) {
        props.onAutoSave({ 
            ...props.goal, 
            title: editTitle.value, 
            category: editCategory.value 
        });
    }
    isEditingHeader.value = false;
};
</script>

<template>
    <div 
        class="bg-white rounded-[2rem] border-2 transition-all duration-500 overflow-hidden group/card relative flex flex-col h-full"
        :class="[
            selected ? 'border-indigo-500 ring-4 ring-indigo-50 shadow-xl scale-[1.02]' : 'border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-200'
        ]"
    >
        <!-- Card Header & Progress -->
        <div class="p-6 pb-4 space-y-4">
            <div class="flex justify-between items-start gap-4">
                <!-- Selection & Icon -->
                <div class="flex items-center gap-3">
                    <input 
                        type="checkbox" 
                        :checked="selected"
                        @change="onToggleSelection(goal.id)"
                        class="rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500 w-5 h-5 cursor-pointer transition-all"
                    />
                    <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">
                        {{ currentType.icon }}
                    </div>
                </div>

                <!-- Status Badge -->
                <select 
                    v-model="goal.status" 
                    @change="onAutoSave(goal)"
                    class="px-3 py-1.5 rounded-full text-[0.65rem] font-black uppercase tracking-wider border cursor-pointer transition-all focus:ring-0 focus:outline-none"
                    :class="currentStatus.class"
                >
                    <option v-for="s in statuses" :key="s.value" :value="s.value">{{ $t(s.label) }}</option>
                </select>
            </div>

            <!-- Title & Category -->
            <div class="space-y-1">
                <input 
                    v-if="isEditingHeader || !goal.title"
                    v-model="editTitle"
                    @blur="saveHeader"
                    @keyup.enter="$event.target.blur()"
                    class="w-full bg-transparent border-none focus:ring-0 p-0 text-xl font-black text-slate-800 placeholder-slate-300"
                    :placeholder="$t('goal_ph_title', 'Judul Goal...')"
                    autofocus
                />
                <h3 
                    v-else 
                    @click="isEditingHeader = true"
                    class="text-xl font-black text-slate-800 cursor-text truncate group-hover/card:text-indigo-600 transition-colors"
                >
                    {{ goal.title }}
                </h3>
                
                <div class="flex items-center flex-wrap gap-2">
                    <span class="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-100 rounded-md">{{ goal.category || $t('common.no_category', 'NO CATEGORY') }}</span>
                    <span class="w-1 h-1 rounded-full bg-slate-200"></span>
                    <span class="text-[0.65rem] font-bold text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-widest">{{ $t(currentType.label) }}</span>
                    <span v-if="goal.target_value > 0" class="text-[0.65rem] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-widest">Target: {{ goal.target_value }}</span>
                </div>
            </div>

            <!-- Large Progress Bar -->
            <div class="space-y-2">
                <div class="flex justify-between items-end">
                    <span class="text-[0.65rem] font-black text-slate-400 uppercase tracking-wider">{{ $t('goal_progress', 'Progress') }}</span>
                    <span class="text-xl font-black text-indigo-600">{{ goal.progress }}<span class="text-[0.6rem] ml-0.5">%</span></span>
                </div>
                <div class="h-4 bg-slate-50 rounded-full overflow-hidden p-1 border border-slate-100">
                    <div 
                        class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700 ease-out relative shadow-sm"
                        :style="{ width: goal.progress + '%' }"
                    >
                        <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Milestones Area -->
        <div class="flex-grow p-6 pt-2 bg-slate-50/50 space-y-2 border-t border-dashed border-slate-200">
            <div class="max-h-[200px] overflow-y-auto custom-scrollbar space-y-1 pr-1">
                <MilestoneItem 
                    v-for="m in goal.milestones" 
                    :key="m.id"
                    :milestone="m"
                    :goal="goal"
                    :onToggle="onToggleMilestone"
                    :onDelete="onDeleteMilestone"
                    :onSave="onSaveMilestone"
                />
            </div>

            <!-- Quick Add Milestone -->
            <button 
                @click="onAddMilestone(goal)"
                class="w-full py-2 px-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold hover:border-indigo-300 hover:text-indigo-500 transition-all flex items-center justify-center gap-2 hover:bg-white"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                </svg>
                {{ $t('milestone_add', 'Tambah Langkah') }}
            </button>
        </div>

        <!-- Card Footer -->
        <div class="p-4 bg-white border-t border-slate-100 flex justify-between items-center opacity-0 group-hover/card:opacity-100 transition-opacity">
            <div class="text-[0.6rem] font-bold text-slate-300 uppercase tracking-widest">
                <span v-if="goal.is_saving" class="flex items-center gap-2 text-indigo-400 italic">
                    <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
                    {{ $t('status_saving', 'Saving...') }}
                </span>
                <span v-else>
                    {{ goal.start_date || $t('common.no_date', 'NO DATE') }}
                </span>
            </div>
            <button 
                @click="onDelete(goal.id, goal.is_new)"
                class="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
