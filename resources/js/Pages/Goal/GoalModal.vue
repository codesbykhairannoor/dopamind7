<script setup>
import { ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { X, Upload, Image as ImageIcon, Target, Calendar, Award, Zap, CheckCircle2 } from 'lucide-vue-next';
import { trans } from 'laravel-vue-i18n';
import GoalDatePicker from './GoalDatePicker.vue';
import Swal from 'sweetalert2';

const props = defineProps({
    show: Boolean,
    goal: Object,
    onClose: Function,
    onSave: Function,
    onUploadImage: Function
});

const emit = defineEmits(['close', 'save']);

const form = ref({
    title: '',
    category: '',
    type: 'daily',
    status: 'active',
    priority: 'important',
    reward: '',
    target_value: 0,
    current_value: 0,
    start_date: new Date().toISOString().split('T')[0],
    end_date: null,
    cover_image_url: '',
    cover_image_path: '',
    milestones: []
});

const imagePreview = ref(null);
const isUploading = ref(false);
const fileInput = ref(null);
const showStartPicker = ref(false);
const showEndPicker = ref(false);

watch(() => props.goal, (newGoal) => {
    if (newGoal) {
        form.value = { ...JSON.parse(JSON.stringify(newGoal)) };
        imagePreview.value = newGoal.cover_image_url || null;
    }
}, { immediate: true });

const handleClose = () => {
    emit('close');
};

const handleSave = () => {
    if (!form.value.title) return;
    emit('save', form.value);
};

const triggerFileInput = () => {
    fileInput.value.click();
};

const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await uploadImage(file);
};

const uploadImage = async (file) => {
    isUploading.value = true;
    try {
        const result = await props.onUploadImage(form.value.id, file);
        if (result.success) {
            form.value.cover_image_url = result.url;
            form.value.cover_image_path = result.path;
            imagePreview.value = result.url;
            
            Swal.fire({
                toast: true, position: 'top-end', showConfirmButton: false, timer: 3000,
                background: '#4f46e5', iconColor: '#ffffff', icon: 'success',
                title: `<span style="color: white; font-weight: 700; font-size: 14px;">${t('img_upload_success', 'Gambar berhasil diunggah!')}</span>`,
                customClass: { popup: '!rounded-xl !shadow-lg !m-4' }
            });
        }
    } catch (err) {
        console.error(err);
    } finally {
        isUploading.value = false;
    }
};

const t = (key, fallback) => {
    const res = trans(key);
    return res !== key ? res : fallback;
};
</script>

<template>
    <Teleport to="body">
        <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" @click="handleClose"></div>

            <!-- Modal Content -->
            <div class="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-visible animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
                
                <!-- Header with Vision Board Preview -->
                <div class="relative h-48 bg-slate-100 shrink-0 group rounded-t-[2.5rem] overflow-hidden">
                    <div v-if="imagePreview" class="absolute inset-0">
                        <img :src="imagePreview" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div v-else class="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <div class="text-white/20 scale-150">
                            <Target :size="120" stroke-width="1.5" />
                        </div>
                    </div>

                    <div class="absolute inset-x-8 bottom-6 flex justify-between items-end">
                        <div class="flex-grow">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-2">
                                 {{ goal?.is_new ? t('goal_new', 'New Vision') : t('goal_edit', 'Edit Vision') }}
                            </span>
                            <h2 class="text-3xl font-black text-white drop-shadow-lg truncate pr-4">
                                {{ form.title || t('goal_placeholder_title', 'What is your dream?') }}
                            </h2>
                        </div>
                        
                        <button @click="triggerFileInput" 
                                class="shrink-0 w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center text-white hover:bg-white/40 transition-all hover:scale-110 active:scale-95 group/btn">
                            <Upload v-if="!isUploading" :size="20" />
                            <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        </button>
                        <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="onFileChange" />
                    </div>

                    <!-- Close Button -->
                    <button @click="handleClose" class="absolute top-6 right-6 w-10 h-10 bg-black/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
                        <X :size="20" />
                    </button>
                </div>

                <!-- Body -->
                <div class="p-8 overflow-y-auto custom-scrollbar space-y-8">
                    
                    <!-- Main Info -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ t('goal_label_title', 'Goal Title') }}</label>
                            <div class="relative">
                                <input v-model="form.title" type="text" 
                                       class="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-300 transition-all"
                                       :placeholder="t('goal_placeholder_title', 'Nama impianmu...')" />
                                <Target :size="20" class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ t('goal_label_category', 'Category') }}</label>
                            <div class="relative">
                                <select v-model="form.category" 
                                        class="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer pr-12">
                                    <option value="">{{ t('no_category', 'Uncategorized') }}</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Career">Career</option>
                                    <option value="Health">Health</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Growth">Growth</option>
                                </select>
                                <div class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Priority & Reward -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ t('goal_label_priority', 'Priority') }}</label>
                            <div class="flex gap-2">
                                <button v-for="p in ['vital', 'important', 'optional']" :key="p"
                                        @click="form.priority = p"
                                        :class="[
                                            'flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2',
                                            form.priority === p 
                                                ? (p === 'vital' ? 'bg-rose-50 border-rose-200 text-rose-600' : p === 'important' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-slate-50 border-slate-200 text-slate-600')
                                                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                        ]">
                                    {{ t(`priority_${p}`, p) }}
                                </button>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ t('goal_label_reward', 'Self Reward') }}</label>
                            <div class="relative">
                                <input v-model="form.reward" type="text" 
                                       class="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-300 transition-all"
                                       :placeholder="t('goal_placeholder_reward', 'Treat yourself!')" />
                                <Award :size="20" class="absolute right-5 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <!-- Dates with Custom Picker -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2 relative">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ t('goal_label_start', 'Start Date') }}</label>
                            <div class="relative">
                                <button @click="showStartPicker = !showStartPicker"
                                        class="w-full bg-slate-50 text-left border-none rounded-2xl px-5 py-4 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all">
                                    {{ form.start_date || t('goal_ph_start', 'Set Start Date') }}
                                </button>
                                <Calendar :size="20" class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                            </div>
                            <GoalDatePicker 
                                :show="showStartPicker" 
                                v-model="form.start_date" 
                                @close="showStartPicker = false" 
                                class="!left-0 !right-auto bottom-full mb-2"
                            />
                        </div>

                        <div class="space-y-2 relative">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ t('goal_label_end', 'Target Deadline') }}</label>
                            <div class="relative">
                                <button @click="showEndPicker = !showEndPicker"
                                        class="w-full bg-slate-50 text-left border-none rounded-2xl px-5 py-4 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all">
                                    {{ form.end_date || t('goal_ph_end', 'Set Deadline') }}
                                </button>
                                <Zap :size="20" class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                            </div>
                            <GoalDatePicker 
                                :show="showEndPicker" 
                                v-model="form.end_date" 
                                @close="showEndPicker = false" 
                                class="!left-0 !right-auto bottom-full mb-2 sm:!left-auto sm:!right-0"
                            />
                        </div>
                    </div>

                </div>

                <!-- Footer -->
                <div class="p-8 bg-slate-50 rounded-b-[2.5rem] shrink-0 flex items-center justify-between">
                    <button @click="handleClose" class="text-sm font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
                        {{ t('btn_cancel', 'Cancel') }}
                    </button>
                    <button @click="handleSave" 
                            class="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                        <CheckCircle2 :size="18" />
                        {{ goal?.is_new ? t('goal_btn_create', 'Manifest Goal') : t('goal_btn_save', 'Update Vision') }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #cbd5e1;
}

@keyframes animate-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
</style>
