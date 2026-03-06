<script setup>
import { ref } from 'vue';

const props = defineProps({
    goals: Array,
    selectedGoals: Array
});

const emit = defineEmits(['toggleSelection', 'selectAll', 'autoSave', 'delete']);

const tableRef = ref(null);

const handleKeyDown = (e, rowIndex, colIndex) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

    const input = e.target;
    if (e.key === 'ArrowLeft' && input.selectionStart > 0) return;
    if (e.key === 'ArrowRight' && input.selectionEnd < input.value.length) return;

    e.preventDefault();

    let nextRow = rowIndex;
    let nextCol = colIndex;

    const totalCols = 3; // title, category, target_value
    const totalRows = props.goals.length;

    if (e.key === 'ArrowUp') nextRow = Math.max(0, rowIndex - 1);
    else if (e.key === 'ArrowDown') nextRow = Math.min(totalRows - 1, rowIndex + 1);
    else if (e.key === 'ArrowLeft') nextCol = Math.max(0, colIndex - 1);
    else if (e.key === 'ArrowRight') nextCol = Math.min(totalCols - 1, colIndex + 1);

    const nextInput = tableRef.value?.querySelector(`input[data-nav-row="${nextRow}"][data-nav-col="${nextCol}"]`);
    if (nextInput) {
        nextInput.focus();
        setTimeout(() => nextInput.select(), 10);
    }
};

const frequencyTypes = [
    { value: 'daily', label: 'goal_type_daily' },
    { value: 'weekly', label: 'goal_type_weekly' },
    { value: 'specific_days', label: 'goal_type_specific_days' },
    { value: 'custom_period', label: 'goal_type_custom_period' },
    { value: 'monthly', label: 'goal_type_monthly' },
    { value: 'yearly', label: 'goal_type_yearly' },
];

const statuses = [
    { value: 'active', label: 'goal_status_active', class: 'text-indigo-600 bg-indigo-50' },
    { value: 'completed', label: 'goal_status_completed', class: 'text-emerald-600 bg-emerald-50' },
    { value: 'paused', label: 'goal_status_paused', class: 'text-amber-600 bg-amber-50' },
    { value: 'cancelled', label: 'goal_status_cancelled', class: 'text-rose-600 bg-rose-50' },
];
</script>

<template>
    <div class="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden relative">
        <div class="overflow-x-auto custom-scrollbar min-h-[400px]" ref="tableRef">
            <table class="w-full text-sm border-collapse whitespace-nowrap text-left relative">
                <thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-20 shadow-sm">
                    <tr>
                        <th class="border-r border-slate-200 px-4 py-4 w-12 text-center">
                            <input type="checkbox" :checked="selectedGoals.length === goals.length && goals.length > 0"
                                @change="emit('selectAll')" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4" />
                        </th>
                        <th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[250px] uppercase tracking-wider text-[0.7rem]">{{ $t('goal_col_title') }}</th>
                        <th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[150px] uppercase tracking-wider text-[0.7rem]">{{ $t('goal_col_category') }}</th>
                        <th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[150px] uppercase tracking-wider text-[0.7rem]">{{ $t('goal_col_type') }}</th>
                        <th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[150px] uppercase tracking-wider text-[0.7rem]">{{ $t('goal_col_target') }}</th>
                        <th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[150px] uppercase tracking-wider text-[0.7rem]">{{ $t('goal_col_current') }}</th>
                        <th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[150px] uppercase tracking-wider text-[0.7rem]">{{ $t('goal_col_status') }}</th>
                        <th class="px-4 py-4 text-center font-black text-slate-400 w-14">🗑️</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(goal, index) in goals" :key="goal._key" 
                        class="border-b border-slate-100 hover:bg-slate-50/50 focus-within:bg-indigo-50/30 transition-all group"
                        :class="{'bg-indigo-50/30': selectedGoals.includes(goal.id)}">
                        
                        <td class="border-r border-slate-100 px-4 py-0 text-center align-middle">
                            <input type="checkbox" :checked="selectedGoals.includes(goal.id)"
                                @change="emit('toggleSelection', goal.id)" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4" />
                        </td>

                        <td class="border-r border-slate-100 p-0 relative">
                            <input v-model="goal.title" type="text" @blur="emit('autoSave', goal)" @keyup.enter="$event.target.blur()"
                                @keydown="handleKeyDown($event, index, 0)" :data-nav-row="index" data-nav-col="0"
                                class="w-full h-full min-h-[64px] px-6 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-slate-800 placeholder-slate-300 transition-all"
                                :placeholder="$t('goal_ph_title')" />
                        </td>

                        <td class="border-r border-slate-100 p-0 relative">
                            <input v-model="goal.category" type="text" @blur="emit('autoSave', goal)" @keyup.enter="$event.target.blur()"
                                @keydown="handleKeyDown($event, index, 1)" :data-nav-row="index" data-nav-col="1"
                                class="w-full h-full min-h-[64px] px-6 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-medium text-slate-600 placeholder-slate-300 transition-all"
                                :placeholder="$t('goal_ph_category')" />
                        </td>

                        <td class="border-r border-slate-100 p-0 relative">
                            <select v-model="goal.type" @change="emit('autoSave', goal)"
                                class="w-full h-full min-h-[64px] px-6 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-medium text-slate-600 cursor-pointer appearance-none transition-all">
                                <option v-for="type in frequencyTypes" :key="type.value" :value="type.value">
                                    {{ $t(type.label) }}
                                </option>
                            </select>
                        </td>

                        <td class="border-r border-slate-100 p-0 relative">
                            <input v-model="goal.target_value" type="number" @blur="emit('autoSave', goal)" @keyup.enter="$event.target.blur()"
                                @keydown="handleKeyDown($event, index, 2)" :data-nav-row="index" data-nav-col="2"
                                class="w-full h-full min-h-[64px] px-6 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-mono font-bold text-indigo-600 transition-all" />
                        </td>

                        <td class="border-r border-slate-100 p-0 relative">
                            <div class="flex items-center gap-3 px-6 h-full min-h-[64px]">
                                <input v-model="goal.current_value" type="number" @blur="emit('autoSave', goal)" @keyup.enter="$event.target.blur()"
                                    class="w-16 bg-slate-50 border-none rounded-lg text-center font-mono font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500" />
                                <div class="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div class="h-full bg-emerald-500 transition-all duration-500" :style="{ width: goal.progress + '%' }"></div>
                                </div>
                                <span class="text-[0.7rem] font-bold text-slate-400 w-8 text-right">{{ goal.progress }}%</span>
                            </div>
                        </td>

                        <td class="border-r border-slate-100 p-0 relative">
                            <select v-model="goal.status" @change="emit('autoSave', goal)"
                                class="w-full h-full min-h-[64px] px-6 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-black uppercase text-[0.7rem] cursor-pointer appearance-none transition-all"
                                :class="statuses.find(s => s.value === goal.status)?.class">
                                <option v-for="status in statuses" :key="status.value" :value="status.value">
                                    {{ $t(status.label) }}
                                </option>
                            </select>
                        </td>

                        <td class="p-0 text-center align-middle">
                            <button @click="emit('delete', goal.id, goal.is_new)"
                                class="w-full h-full min-h-[64px] flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 8px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
