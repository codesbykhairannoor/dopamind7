<script setup>
import { ref, watch, onMounted } from 'vue';
import { X, Target, Save, Trash2, CheckCircle2 } from 'lucide-vue-next';

const props = defineProps({
    show: Boolean,
    saving: Object,
    onClose: Function,
    onSave: Function,
    onDelete: Function,
    processing: Boolean
});

const emit = defineEmits(['close', 'save']);

const form = ref({
    id: null,
    title: '',
    target_amount: 0,
    icon: '🏦',
    color: '#6366f1'
});

const colors = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#0ea5e9', '#0f172a'];
const icons = ['🏦', '💍', '🏠', '🚗', '🎓', '✈️', '💻', '👶', '🎁', '🏥', '🍱', '💼'];

watch(() => props.saving, (newVal) => {
    if (newVal) {
        form.value = { ...newVal };
    } else {
        form.value = { id: null, title: '', target_amount: 0, icon: '🏦', color: '#6366f1' };
    }
}, { immediate: true });

const handleClose = () => emit('close');
const handleSave = () => emit('save', form.value);
</script>

<template>
    <Teleport to="body">
        <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md transition-opacity" @click="handleClose"></div>

            <div class="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
                
                <!-- Quick Header -->
                <div class="px-8 pt-8 flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-black text-slate-800 dark:text-white">{{ saving?.id ? 'Edit Saving Goal' : 'New Saving Goal' }}</h2>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Configure your vault</p>
                    </div>
                    <button @click="handleClose" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all active:scale-95">
                        <X :size="20" />
                    </button>
                </div>

                <div class="p-8 space-y-6 overflow-y-auto">
                    <!-- Title -->
                    <div class="space-y-2">
                        <label class="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Goal Name</label>
                        <input v-model="form.title" type="text" 
                                class="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl px-5 py-4 text-slate-700 dark:text-white font-bold focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm"
                                placeholder="e.g. Dream Wedding, New Laptop..." />
                    </div>

                    <!-- Target Amount -->
                    <div class="space-y-2">
                        <label class="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Target Amount (IDR)</label>
                        <input v-model="form.target_amount" type="number" 
                                class="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl px-5 py-4 text-slate-700 dark:text-white font-bold focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm" />
                    </div>

                    <!-- Icon Picker -->
                    <div class="space-y-2">
                        <label class="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Icon</label>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="i in icons" :key="i"
                                    @click="form.icon = i"
                                    class="w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all active:scale-90"
                                    :class="form.icon === i ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'">
                                {{ i }}
                            </button>
                        </div>
                    </div>

                    <!-- Color Picker -->
                    <div class="space-y-2">
                        <label class="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Color Theme</label>
                        <div class="flex flex-wrap gap-3">
                            <button v-for="c in colors" :key="c"
                                    @click="form.color = c"
                                    class="w-10 h-10 rounded-2xl transition-all flex items-center justify-center"
                                    :style="{ backgroundColor: c }"
                                    :class="form.color === c ? 'ring-4 ring-offset-4 dark:ring-offset-slate-900 ring-indigo-500/30' : 'opacity-60 hover:opacity-100'">
                                <CheckCircle2 v-if="form.color === c" :size="16" class="text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="p-8 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 transition-colors">
                    <button @click="handleClose" class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest px-4 py-2 hover:text-rose-500 transition-colors">
                        Cancel
                    </button>
                    <button @click="handleSave"
                            :disabled="processing"
                            class="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                        {{ processing ? 'Manifesting...' : (saving?.id ? 'Update Vault' : 'Create Vault') }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>
