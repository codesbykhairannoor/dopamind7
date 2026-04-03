<script setup>
import { ref, computed, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { Check, Trash2, Calendar } from 'lucide-vue-next';
import { trans } from 'laravel-vue-i18n';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import GoalDatePicker from './GoalDatePicker.vue';

const props = defineProps({ milestone: Object });
const emit = defineEmits(['toggle', 'delete', 'save']);

const page = usePage();
const t = (key, fallback) => {
    const res = trans(key);
    return res !== key ? res : fallback;
};

const isEditingActive = ref(false);
const isInputFocused = ref(false);
const editTitle = ref(props.milestone?.title || '');
const editTargetDate = ref(props.milestone?.target_date || null);
const showDatePicker = ref(false);

let saveTimeout = null;
const debouncedSave = () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        if (editTitle.value.trim() !== '') {
            emit('save', {
                ...props.milestone,
                title: editTitle.value.trim(),
                target_date: editTargetDate.value
            });
        }
    }, 500);
};

const startEdit = () => {
    isEditingActive.value = true;
    editTitle.value = props.milestone?.title || '';
    editTargetDate.value = props.milestone?.target_date || null;
};

const handleTitleInput = () => {
    // We no longer debounce save on every keystroke to prevent "jumping" UI
};

const handleSave = () => {
    clearTimeout(saveTimeout);
    if (editTitle.value.trim() !== '') {
        emit('save', {
            ...props.milestone,
            title: editTitle.value.trim(),
            target_date: editTargetDate.value
        });
        isEditingActive.value = false;
    }
};

const handleDatePick = (val) => {
    editTargetDate.value = val;
    showDatePicker.value = false;
    handleSave(); 
};

const handleKeydown = (e) => {
    if (e.key === 'Enter') {
        e.target.blur(); 
    }
    if (e.key === 'Escape') {
        isEditingActive.value = false;
        isInputFocused.value = false;
        editTitle.value = props.milestone?.title || ''; 
    }
};

const handleFocus = () => {
    isInputFocused.value = true;
};

const dateDisplay = computed(() => {
    if (!editTargetDate.value) return t('milestone_target_date', 'Set Date');
    const loc = page.props.locale || 'id';
    return dayjs(editTargetDate.value).locale(loc).format('DD MMM YYYY');
});

watch(() => props.milestone?.title, (newTitle) => {
    if (!isInputFocused.value) {
        editTitle.value = newTitle || '';
    }
});

watch(() => props.milestone?.target_date, (newDate) => {
    editTargetDate.value = newDate || null;
});

const handleCheckbox = () => {
    emit('toggle');
};
</script>

<template>
    <div class="flex items-center group/ms gap-3 py-1.5 px-3 bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/5 rounded-2xl transition-all duration-300 relative border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
        :class="milestone.is_saving ? 'opacity-70' : ''">
        
        <button 
            @click="handleCheckbox"
            class="flex-shrink-0 w-[18px] h-[18px] rounded-lg border-2 flex items-center justify-center transition-all duration-300 focus:outline-none"
            :class="milestone.is_completed || milestone.completed
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-900/40' 
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500'"
        >
            <Check v-if="milestone.is_completed || milestone.completed" :size="12" stroke-width="4" />
        </button>

        <div class="flex-grow flex flex-col min-w-0">
            <input 
                v-model="editTitle"
                @input="handleTitleInput"
                @keydown="handleKeydown"
                @blur="() => { isInputFocused.value = false; handleSave(); }"
                @focus="handleFocus"
                :placeholder="t('milestone_placeholder', 'Identify next step...')"
                class="w-full bg-transparent border-none focus:ring-0 p-0 text-sm placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-all font-bold"
                :class="(milestone.is_completed || milestone.completed) ? 'text-slate-400 dark:text-slate-500 line-through font-medium' : 'text-slate-700 dark:text-slate-200 font-black'"
            />
            
            <!-- Removed Date Picker per User Request -->
        </div>

        <button 
            @click="emit('delete')"
            class="opacity-0 group-hover/ms:opacity-100 p-1.5 text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 transition-all rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 focus:outline-none shrink-0"
        >
            <Trash2 :size="14" />
        </button>

        <div v-if="milestone.is_saving" class="absolute right-3 bottom-1">
            <div class="w-2 h-2 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
    </div>
</template>

<style scoped>
/* Custom animations if needed */
</style>