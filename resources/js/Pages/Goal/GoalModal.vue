<script setup>
import { ref, watch, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { X, Upload, Target, Calendar, Award, Zap, CheckCircle2, Heart, DollarSign, Briefcase, GraduationCap, Sparkles, Users, Plane, Palette, HelpCircle } from 'lucide-vue-next';
import { trans } from 'laravel-vue-i18n';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import GoalDatePicker from './GoalDatePicker.vue';
import MilestoneItem from './MilestoneItem.vue';
import { Plus } from 'lucide-vue-next';
import Swal from 'sweetalert2';

const props = defineProps({
    show: Boolean,
    goal: Object,
    onClose: Function,
    onSave: Function,
    onUploadImage: Function,
    processing: Boolean,
    errors: { type: Object, default: () => ({}) }
});

const emit = defineEmits(['close', 'save']);
const page = usePage();

// State Form
const form = ref({
    title: '',
    color: '#6366f1',
    type: 'daily',
    status: 'active',
    priority: 'important',
    reward: '',
    target_value: 0,
    current_value: 0,
    start_date: dayjs().format('YYYY-MM-DD'),
    end_date: null,
    cover_image_url: '',
    cover_image_path: '',
    milestones: []
});

// UI State
const imagePreview = ref(null);
const isUploading = ref(false);
const fileInput = ref(null);
const showStartPicker = ref(false);
const showEndPicker = ref(false);

const archetypes = [
    { id: 'fitness', icon: Heart, color: '#f43f5e', label: 'goal_type_fitness' },
    { id: 'wealth', icon: DollarSign, color: '#10b981', label: 'goal_type_wealth' },
    { id: 'career', icon: Briefcase, color: '#6366f1', label: 'goal_type_career' },
    { id: 'learning', icon: GraduationCap, color: '#8b5cf6', label: 'goal_type_learning' },
    { id: 'spiritual', icon: Sparkles, color: '#f59e0b', label: 'goal_type_spiritual' },
    { id: 'social', icon: Users, color: '#0ea5e9', label: 'goal_type_social' },
    { id: 'travel', icon: Plane, color: '#ec4899', label: 'goal_type_travel' },
    { id: 'creative', icon: Palette, color: '#f97316', label: 'goal_type_creative' },
    { id: 'other', icon: HelpCircle, color: '#64748b', label: 'Other' },
];

const selectedArchetype = ref(null);

const selectArchetype = (arch) => {
    selectedArchetype.value = arch.id;
    form.value.color = arch.color;
    // We can also store the icon if needed, but for now we use it for visual template
};

// Formatting untuk tampilan tombol tanggal
const dateDisplay = (date) => {
    if (!date) return t('goal_ph_date', 'Pilih Tanggal');
    const loc = page.props.locale || 'id';
    return dayjs(date).locale(loc).format('DD MMM YYYY');
};

watch(() => props.goal, (newGoal) => {
    if (newGoal) {
        form.value = JSON.parse(JSON.stringify(newGoal));
        imagePreview.value = newGoal.cover_image_url || null;
    }
}, { immediate: true });

// --- Methods ---
const handleClose = () => emit('close');

const handleSave = () => {
    if (!form.value.title?.trim()) {
        Swal.fire({
            ...swalTheme,
            title: t('warn_empty_title', 'Judul Wajib Diisi!'),
            text: t('warn_empty_title_text', 'Masa impian nggak ada namanya? Kasih judul dong!'),
            icon: 'warning',
            confirmButtonText: t('btn_ok', 'Siap!'),
        });
        return;
    }
    emit('save', form.value);
};

const triggerFileInput = () => fileInput.value.click();

const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    isUploading.value = true;
    try {
        const result = await props.onUploadImage(form.value.id, file);
        if (result.success) {
            form.value.cover_image_url = result.url;
            form.value.cover_image_path = result.path;
            imagePreview.value = result.url;
            // Removed redundant Swal.fire to prevent double alerts
        }
    } catch (err) { 
        console.error(err); 
    } finally { 
        isUploading.value = false; 
    }
};

const swalTheme = {
    customClass: {
        popup: 'rounded-[2.5rem] p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl transition-colors duration-500',
        title: 'text-2xl font-black text-slate-800 dark:text-white mb-2 font-sans',
        htmlContainer: 'text-slate-600 dark:text-slate-400 font-medium',
        confirmButton: 'bg-indigo-600 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl active:scale-95 transition-all outline-none mx-2 tracking-wide',
    },
    buttonsStyling: false
};

const t = (key, fallback) => {
    const res = trans(key);
    return res !== key ? res : fallback;
};
</script>

<template>
    <Teleport to="body">
        <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md transition-opacity" @click="handleClose"></div>

            <div class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh] transition-colors duration-500">
                
                <div class="relative h-44 bg-slate-100 dark:bg-slate-950 shrink-0 group rounded-t-[2.5rem] overflow-hidden">
                    <div v-if="imagePreview" class="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                        <img :src="imagePreview" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>
                    <div v-else class="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white/10">
                        <Target :size="100" stroke-width="1" class="animate-pulse" />
                    </div>

                    <div class="absolute inset-x-6 bottom-5 flex justify-between items-end">
                        <div class="flex-grow min-w-0">
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest mb-1.5">
                                 {{ goal?.id ? t('goal_edit', 'Update Vision') : t('goal_new', 'Create New Vision') }}
                            </span>
                            <h2 class="text-2xl font-black text-white drop-shadow-md truncate pr-4">
                                {{ form.title || t('goal_placeholder_title', 'What is your dream?') }}
                            </h2>
                        </div>
                        
                        <button @click="triggerFileInput" type="button"
                                class="shrink-0 w-11 h-11 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110 active:scale-95 shadow-xl">
                            <Upload v-if="!isUploading" :size="18" />
                            <div v-else class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        </button>
                        <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="onFileChange" />
                    </div>

                    <button @click="handleClose" class="absolute top-5 right-5 w-9 h-9 bg-black/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-10">
                        <X :size="18" />
                    </button>
                </div>

                <div class="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-6 pb-40">
                    
                    <div class="space-y-2">
                        <label class="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">{{ t('goal_label_title', 'Goal Title') }}</label>
                        <div class="relative group">
                            <input v-model="form.title" type="text" 
                                    class="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl px-5 py-5 text-slate-700 dark:text-white font-bold focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-all text-lg shadow-sm"
                                    :class="{'!border-rose-300 !bg-rose-50 !text-rose-600 dark:!bg-rose-500/10 dark:!text-rose-400': errors.title}"
                                    :placeholder="t('goal_placeholder_title', 'Tuliskan impianmu disini...')" />
                            <Target :size="20" class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
                        </div>
                        <p v-if="errors.title" class="text-[10px] font-bold text-rose-500 ml-1">{{ errors.title[0] }}</p>
                    </div>

                    <!-- Archetype Selection -->
                    <div class="space-y-3">
                        <label class="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">{{ t('goal_archetypes', 'Choose Template') }}</label>
                        <div class="grid grid-cols-3 sm:grid-cols-5 gap-3">
                            <button v-for="arch in archetypes" :key="arch.id"
                                    @click="selectArchetype(arch)"
                                    type="button"
                                    class="flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 group"
                                    :class="selectedArchetype === arch.id 
                                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-lg shadow-indigo-500/10' 
                                        : 'border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-slate-200 dark:hover:border-slate-700'">
                                <component :is="arch.icon" :size="20" 
                                           :class="selectedArchetype === arch.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'" />
                                <span class="text-[8px] font-black uppercase text-center mt-2 leading-tight transition-colors"
                                      :class="selectedArchetype === arch.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-600'">
                                    {{ t(arch.label, arch.id) }}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">{{ t('goal_label_priority', 'Priority') }}</label>
                            <div class="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
                                <button v-for="p in ['vital', 'important', 'optional']" :key="p"
                                        @click="form.priority = p"
                                        :class="[
                                            'flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
                                            form.priority === p 
                                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md' 
                                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                        ]">
                                    {{ t(`priority_${p}`, p) }}
                                </button>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">{{ t('goal_label_reward', 'Self Reward') }}</label>
                            <div class="relative group">
                                <input v-model="form.reward" type="text" 
                                       class="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl px-5 py-4 text-slate-700 dark:text-white font-bold focus:bg-white dark:focus:bg-slate-800 focus:border-amber-500/20 focus:ring-4 focus:ring-amber-500/5 transition-all shadow-sm"
                                       :class="{'!border-rose-300 !bg-rose-50 dark:!bg-rose-500/10 !text-rose-600 dark:!text-rose-400': errors.reward}"
                                       :placeholder="t('goal_placeholder_reward', 'Rayakan saat tercapai!')" />
                                <Award :size="20" class="absolute right-5 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none" />
                            </div>
                            <p v-if="errors.reward" class="text-[10px] font-bold text-rose-500 ml-1">{{ errors.reward[0] }}</p>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">{{ t('goal_label_color', 'Goal Color Theme') }}</label>
                        <div class="flex flex-wrap gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100/50 dark:border-slate-800 shadow-inner transition-colors duration-500">
                            <button v-for="c in ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#0ea5e9', '#0f172a']" :key="c"
                                    @click="form.color = c"
                                    type="button"
                                    class="w-10 h-10 rounded-2xl transition-all group relative flex items-center justify-center overflow-hidden hover:scale-110 active:scale-90"
                                    :style="{ backgroundColor: c }"
                                    :class="form.color === c ? 'ring-4 ring-offset-4 dark:ring-offset-slate-800 ring-indigo-500/20 shadow-xl' : 'opacity-60 hover:opacity-100 dark:ring-offset-slate-900'">
                                <div v-if="form.color === c" class="text-white dark:text-slate-100 drop-shadow-md">
                                    <CheckCircle2 :size="20" />
                                </div>
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-50">
                        <div class="space-y-2 relative">
                            <label class="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">{{ t('goal_label_start', 'Start Date') }}</label>
                            <div class="relative">
                                <button type="button" @click="showStartPicker = !showStartPicker; showEndPicker = false"
                                        class="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/20 rounded-2xl px-5 py-4 text-slate-700 dark:text-slate-200 font-bold text-left transition-all flex justify-between items-center group shadow-sm"
                                        :class="{'!border-rose-300 !bg-rose-50 dark:!bg-rose-500/10': errors.start_date}">
                                    <span>{{ dateDisplay(form.start_date) }}</span>
                                    <Calendar :size="18" class="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500" />
                                </button>
                                <p v-if="errors.start_date" class="text-[10px] font-bold text-rose-500 ml-1 mt-1">{{ errors.start_date[0] }}</p>
                                
                                <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                                    <GoalDatePicker 
                                        v-if="showStartPicker"
                                        :show="true" 
                                        :teleport="true"
                                        :modelValue="form.start_date" 
                                        @update:modelValue="(val) => { form.start_date = val; showStartPicker = false }" 
                                        @close="showStartPicker = false"
                                    />
                                </transition>
                            </div>
                        </div>

                        <div class="space-y-2 relative">
                            <label class="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">{{ t('goal_label_end', 'Target Deadline') }}</label>
                            <div class="relative">
                                <button type="button" @click="showEndPicker = !showEndPicker; showStartPicker = false"
                                        class="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent hover:border-rose-100 dark:hover:border-rose-500/20 rounded-2xl px-5 py-4 text-slate-700 dark:text-slate-200 font-bold text-left transition-all flex justify-between items-center group shadow-sm"
                                        :class="{'!border-rose-300 !bg-rose-50 dark:!bg-rose-500/10': errors.end_date}">
                                    <span :class="!form.end_date ? 'text-slate-300 dark:text-slate-600' : ''">{{ dateDisplay(form.end_date) }}</span>
                                    <Zap :size="18" :class="form.end_date ? 'text-rose-500' : 'text-slate-300 dark:text-slate-600 group-hover:text-rose-400'" />
                                </button>
                                <p v-if="errors.end_date" class="text-[10px] font-bold text-rose-500 ml-1 mt-1">{{ errors.end_date[0] }}</p>
                                
                                <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                                    <GoalDatePicker 
                                        v-if="showEndPicker"
                                        :show="true" 
                                        :teleport="true"
                                        :modelValue="form.end_date" 
                                        @update:modelValue="(val) => { form.end_date = val; showEndPicker = false }" 
                                        @close="showEndPicker = false"
                                    />
                                </transition>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Milestones Section in Modal -->
                    <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
                        <div class="flex items-center justify-between px-1">
                            <label class="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">{{ t('goal_milestones_title', 'Mastery Steps') }}</label>
                            <span class="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-lg">
                                {{ trans('goal_steps_count', { count: form.milestones?.length || 0 }) }}
                            </span>
                        </div>

                        <div class="space-y-3">
                            <MilestoneItem 
                                v-for="(m, idx) in form.milestones" 
                                :key="m.id || idx" 
                                :milestone="m"
                                @save="(data) => Object.assign(m, data)"
                                @toggle="m.completed = !m.completed"
                                @delete="form.milestones.splice(idx, 1)"
                            />
                            
                            <button type="button" @click="() => {
                                if (!form.milestones) form.milestones = [];
                                form.milestones.push({
                                    id: null,
                                    title: t('goal_untitled_step', 'Untitled Step'),
                                    is_completed: false,
                                    target_date: null,
                                    is_editing: true
                                });
                            }" 
                                class="w-full py-4 rounded-2xl border-2 border-dashed border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:border-indigo-100 dark:hover:border-indigo-500/30 hover:text-indigo-50 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2 group/add shadow-sm">
                                <Plus :size="16" class="group-hover/add:rotate-90 transition-transform" />
                                <span class="text-[11px] font-black uppercase tracking-widest">{{ t('goal_btn_add_milestone', 'Add Step') }}</span>
                            </button>
                        </div>
                    </div>

                </div>

                <div class="p-6 bg-slate-50/80 dark:bg-slate-900/90 backdrop-blur-sm shrink-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 relative z-50 transition-colors duration-500">
                    <button @click="handleClose" class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest hover:text-rose-500 dark:hover:text-rose-400 transition-colors px-4 py-2">
                        {{ t('btn_cancel', 'Cancel') }}
                    </button>
                    <button @click="handleSave"
                            class="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-600/20 dark:shadow-indigo-900/40 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                        <CheckCircle2 :size="16" />
                        {{ goal?.id ? t('goal_btn_save', 'Update Vision') : t('goal_btn_create', 'Manifest Goal') }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }

.animate-in { animation: animate-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes animate-in {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>