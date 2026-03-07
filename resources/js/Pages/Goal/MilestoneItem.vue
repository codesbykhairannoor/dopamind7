<script setup>
import { ref } from 'vue';
import GoalDatePicker from './GoalDatePicker.vue';
import { Check, Trash2, Calendar, Target, Edit3, Clock } from 'lucide-vue-next';

const props = defineProps({
    milestone: Object
});

const emit = defineEmits(['save', 'toggle', 'delete']);

const isEditing = ref(false);
const editTitle = ref(props.milestone.title);
const editTargetDate = ref(props.milestone.target_date);
const showDatePicker = ref(false);

const startEdit = () => {
    isEditing.value = true;
    editTitle.value = props.milestone.title;
    editTargetDate.value = props.milestone.target_date;
};

const handleSave = () => {
    if (editTitle.value.trim() !== props.milestone.title || editTargetDate.value !== props.milestone.target_date) {
        emit('save', { title: editTitle.value, target_date: editTargetDate.value });
    }
    isEditing.value = false;
};

const handleKeydown = (e) => {
    if (e.key === 'Enter' && !showDatePicker.value) handleSave();
    if (e.key === 'Escape') {
        isEditing.value = false;
    }
};
</script>

<template>
    <div class="flex items-center group gap-4 py-3 px-4 bg-slate-50/50 hover:bg-white rounded-2xl transition-all duration-300 border border-transparent hover:border-slate-100 hover:shadow-lg hover:shadow-indigo-500/5">
        <!-- Checkbox -->
        <button 
            @click="emit('toggle')"
            class="flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300"
            :class="milestone.completed 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'border-slate-200 bg-white hover:border-indigo-400'"
        >
            <Check v-if="milestone.completed" :size="14" stroke-width="4" />
        </button>

        <!-- Title & Date -->
        <div class="flex-grow min-w-0">
            <div v-if="isEditing || milestone.is_new" class="flex flex-col gap-2">
                <input 
                    v-model="editTitle"
                    @keydown="handleKeydown"
                    autofocus
                    :placeholder="$t('milestone_placeholder', 'Nama langkah...')"
                    class="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-bold text-slate-700 placeholder:text-slate-300"
                />
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <button 
                            @click="showDatePicker = !showDatePicker"
                            class="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all flex items-center gap-2"
                        >
                            <Calendar :size="10" />
                            {{ editTargetDate || $t('milestone_target_date', 'Set Date') }}
                        </button>
                        <GoalDatePicker 
                            :show="showDatePicker" 
                            v-model="editTargetDate" 
                            @close="showDatePicker = false" 
                        />
                    </div>
                    <button @click="handleSave" class="text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:tracking-[0.15em] transition-all">
                        {{ $t('btn_save', 'Save') }}
                    </button>
                </div>
            </div>
            <div v-else @click="startEdit" class="cursor-pointer group/text relative py-0.5">
                <span 
                    class="block text-sm font-bold transition-all duration-300 truncate"
                    :class="milestone.completed ? 'text-slate-300 line-through' : 'text-slate-700 group-hover/text:text-indigo-600'"
                >
                    {{ milestone.title || $t('milestone_edit_placeholder', 'Untitled Step') }}
                </span>
                <span v-if="milestone.target_date" class="text-[9px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5 mt-1">
                    <Clock :size="10" />
                    {{ milestone.target_date }}
                </span>
                
                <!-- Hover Edit Indicator -->
                <div class="absolute -right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/text:opacity-100 transition-opacity">
                    <Edit3 :size="12" class="text-indigo-400" />
                </div>
            </div>
        </div>

        <!-- Delete Button -->
        <button 
            @click="emit('delete')"
            class="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all rounded-xl hover:bg-rose-50"
        >
            <Trash2 :size="14" />
        </button>
    </div>
</template>

