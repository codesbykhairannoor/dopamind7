<script setup>
import { watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { trans } from 'laravel-vue-i18n';
import { X, Upload, Link2 } from 'lucide-vue-next';

const props = defineProps({
    isOpen: { type: Boolean, required: true },
    prefillTag: { type: String, default: '' },
    course: { type: Object, required: true },
    terms: { type: Object, required: true }
});

const emit = defineEmits(['close', 'optimistic-add', 'rollback-add', 'fire-toast']);

const archiveForm = useForm({
    academic_record_id: '',
    meeting_tag: '',
    file: null,
    link_url: '',
    type: 'Modul'
});

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        archiveForm.reset();
        archiveForm.academic_record_id = props.course.id;
        archiveForm.meeting_tag = props.prefillTag || '';
        archiveForm.type = 'Modul';
    }
});

const handleClose = () => {
    emit('close');
};

const submitArchive = () => {
    if (!props.course) return;
    if (!archiveForm.meeting_tag.trim()) {
        return emit('fire-toast', 'error', trans('study_meeting_tag_empty_alert'));
    }
    if (!archiveForm.file && !archiveForm.link_url.trim()) {
        return emit('fire-toast', 'error', trans('study_archive_file_or_link_alert'));
    }

    const tempArchiveId = 'temp_arc_' + Date.now();
    
    // Emit the optimistic addition to the parent state
    emit('optimistic-add', {
        id: tempArchiveId,
        academic_record_id: props.course.id,
        file_name: archiveForm.file ? archiveForm.file.name : null,
        file_path: archiveForm.file ? 'pending' : null,
        link_url: archiveForm.link_url,
        meeting_tag: archiveForm.meeting_tag,
        type: archiveForm.type
    });

    emit('close');

    archiveForm.academic_record_id = props.course.id;
    
    archiveForm.post(route('study.academic.archive.store'), {
        preserveScroll: true,
        preserveState: true,
        progress: false,
        onError: (err) => {
            emit('rollback-add', {
                tempId: tempArchiveId,
                tag: archiveForm.meeting_tag,
                error: Object.values(err)[0] || 'Gagal mengunggah berkas.'
            });
        }
    });
};
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div class="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 dark:border-slate-800 transform animate-in zoom-in-95 duration-300 relative">
                <button @click="handleClose" class="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 transition-colors">
                    <X class="h-5 w-5" />
                </button>
                
                <div class="mb-6 flex items-center gap-4">
                    <div class="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500">
                        <Upload class="h-6 w-6" />
                    </div>
                    <div>
                        <h3 class="text-xl font-black text-slate-800 dark:text-white">{{ $t('study_input_material') }}</h3>
                        <p class="text-xs text-slate-500 capitalize">{{ course.course_name }}</p>
                    </div>
                </div>

                <form @submit.prevent="submitArchive" class="space-y-5">
                    <div>
                        <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">{{ $t('study_meeting_tag_label') }}</label>
                        <input v-model="archiveForm.meeting_tag" type="text" :placeholder="$t('study_meeting_placeholder', { meeting: terms.meeting })" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div class="col-span-2 sm:col-span-1">
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">{{ $t('study_content_type') }}</label>
                            <select v-model="archiveForm.type" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="Modul">{{ $t('study_type_modul') }}</option>
                                <option value="Soal">{{ $t('study_type_soal') }}</option>
                                <option value="Jawaban">{{ $t('study_type_jawaban') }}</option>
                                <option value="Referensi">{{ $t('study_type_referensi') }}</option>
                                <option value="Catatan">{{ $t('study_type_catatan') }}</option>
                            </select>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">{{ $t('study_upload_pdf') }}</label>
                            <input @input="archiveForm.file = $event.target.files[0]" type="file" accept=".pdf" class="w-full text-xs file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-indigo-100 file:text-indigo-700 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-1.5 px-2 cursor-pointer" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">{{ $t('study_or_link') }}</label>
                        <div class="relative">
                            <Link2 class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input v-model="archiveForm.link_url" type="url" placeholder="https://..." class="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    </div>

                    <button type="submit" :disabled="archiveForm.processing" class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-lg transition-all mt-4">
                        {{ $t('study_upload_save') }}
                    </button>
                </form>
            </div>
        </div>
    </Teleport>
</template>
