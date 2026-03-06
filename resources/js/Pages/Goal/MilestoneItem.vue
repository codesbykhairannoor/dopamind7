<script setup>
import { ref } from 'vue';

const props = defineProps({
    milestone: Object,
    goal: Object,
    onToggle: Function,
    onDelete: Function,
    onSave: Function
});

const isEditing = ref(false);
const editTitle = ref(props.milestone.title);

const startEdit = () => {
    isEditing.value = true;
    editTitle.value = props.milestone.title;
};

const handleSave = () => {
    if (editTitle.value.trim() !== props.milestone.title) {
        props.onSave(props.goal, { ...props.milestone, title: editTitle.value });
    }
    isEditing.value = false;
};

const handleKeydown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
        isEditing.value = false;
        editTitle.value = props.milestone.title;
    }
};
</script>

<template>
    <div class="flex items-center group gap-3 py-2 px-1 hover:bg-white/50 rounded-xl transition-colors">
        <!-- Checkbox -->
        <button 
            @click="onToggle(goal, milestone)"
            class="flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300"
            :class="milestone.completed 
                ? 'bg-indigo-500 border-indigo-500 text-white' 
                : 'border-slate-200 bg-white hover:border-indigo-400'"
        >
            <svg v-if="milestone.completed" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
        </button>

        <!-- Title -->
        <div class="flex-grow min-w-0">
            <input 
                v-if="isEditing || milestone.is_new"
                v-model="editTitle"
                @blur="handleSave"
                @keydown="handleKeydown"
                autofocus
                :placeholder="$t('milestone_placeholder', 'Langkah baru...')"
                class="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-medium text-slate-700 placeholder-slate-400"
            />
            <span 
                v-else 
                @click="startEdit"
                class="block text-sm font-medium transition-all duration-300 cursor-text truncate"
                :class="milestone.completed ? 'text-slate-400 line-through' : 'text-slate-700'"
            >
                {{ milestone.title || $t('milestone_edit_placeholder', 'Klik untuk mengedit...') }}
            </span>
        </div>

        <!-- Delete Button -->
        <button 
            @click="onDelete(goal, milestone.id)"
            class="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-all rounded-lg hover:bg-rose-50"
        >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
    </div>
</template>
