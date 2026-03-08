<script setup>
import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import GoalDatePicker from './GoalDatePicker.vue';
import { Check, Trash2, Calendar, Edit3, Clock } from 'lucide-vue-next';
import { trans } from 'laravel-vue-i18n';

const props = defineProps({
    milestone: Object
});

const emit = defineEmits(['save', 'toggle', 'delete']);
const page = usePage();

const t = (key, fallback) => {
    const res = trans(key);
    return res !== key ? res : fallback;
};

const isEditing = ref(props.milestone.is_new || false);
const editTitle = ref(props.milestone.title || '');
const editTargetDate = ref(props.milestone.target_date || null);
const showDatePicker = ref(false);

const startEdit = () => {
    isEditing.value = true;
    editTitle.value = props.milestone.title;
    editTargetDate.value = props.milestone.target_date;
};

const handleSave = () => {
    // Hanya save kalau ada judul yang diisi
    if (editTitle.value.trim() !== '') {
        // Cek apakah ada perubahan
        if (editTitle.value.trim() !== props.milestone.title || editTargetDate.value !== props.milestone.target_date) {
            emit('save', { 
                ...props.milestone, 
                title: editTitle.value.trim(), 
                target_date: editTargetDate.value 
            });
        }
        isEditing.value = false;
    }
};

const handleDatePick = (val) => {
    editTargetDate.value = val;
    showDatePicker.value = false;
    handleSave(); // Auto-save saat tanggal dipilih
};

const handleKeydown = (e) => {
    if (e.key === 'Enter') handleSave(); // Auto-save saat tekan Enter
    if (e.key === 'Escape') isEditing.value = false;
};

const dateDisplay = computed(() => {
    if (!editTargetDate.value) return t('milestone_target_date', 'Set Date');
    const loc = page.props.locale || 'id';
    return dayjs(editTargetDate.value).locale(loc).format('DD MMM YYYY');
});
</script>

<template>
    <div class="flex items-center group gap-3 py-2 px-3 bg-slate-50/50 hover:bg-white rounded-xl transition-all duration-300 border border-transparent hover:border-slate-100 hover:shadow-md hover:shadow-indigo-500/5 relative">
        <button 
            @click="emit('toggle')"
            class="flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300"
            :class="milestone.completed 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'border-slate-200 bg-white hover:border-indigo-400'"
        >
            <Check v-if="milestone.completed" :size="12" stroke-width="4" />
        </button>

        <div class="flex-grow min-w-0">
            <div v-if="isEditing" class="flex flex-col">
                <input 
                    v-model="editTitle"
                    @keydown="handleKeydown"
                    @blur="handleSave"
                    autofocus
                    :placeholder="t('milestone_placeholder', 'Nama langkah...')"
                    class="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-bold text-slate-700 placeholder:text-slate-300"
                />
                <div class="flex items-center gap-2.5 mt-1">
                    <div class="relative">
                        <button type="button"
                            @mousedown.prevent="showDatePicker = !showDatePicker"
                            class="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all flex items-center gap-1.5"
                        >
                            <Calendar :size="9" />
                            {{ dateDisplay }}
                        </button>
                        
                        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                            <div v-if="showDatePicker" class="absolute top-full left-0 mt-2 z-[9999]">
                                <GoalDatePicker 
                                    :show="true" 
                                    :modelValue="editTargetDate" 
                                    @update:modelValue="handleDatePick"
                                    @close="showDatePicker = false"
                                />
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
            <div v-else @click="startEdit" class="cursor-pointer group/text relative py-0.5">
                <span 
                    class="block text-xs font-bold transition-all duration-300 truncate"
                    :class="milestone.completed ? 'text-slate-300 line-through' : 'text-slate-700 group-hover/text:text-indigo-600'"
                >
                    {{ milestone.title || t('milestone_edit_placeholder', 'Untitled Step') }}
                </span>
                <span v-if="milestone.target_date" class="text-[8px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                    <Clock :size="8" />
                    {{ dayjs(milestone.target_date).locale($page.props.locale || 'id').format('DD MMM YYYY') }}
                </span>
                
                <div class="absolute -right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/text:opacity-100 transition-opacity">
                    <Edit3 :size="10" class="text-indigo-400" />
                </div>
            </div>
        </div>

        <button 
            @click="emit('delete')"
            class="opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-rose-500 transition-all rounded-lg hover:bg-rose-50"
        >
            <Trash2 :size="12" />
        </button>
    </div>
</template>