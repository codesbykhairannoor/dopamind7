<script setup>
import { ref, watch } from 'vue';
import { X } from 'lucide-vue-next';

const props = defineProps({
    isOpen: { type: Boolean, required: true },
    isEdit: { type: Boolean, default: false },
    course: { type: Object, default: null },
    terms: { type: Object, required: true },
    selectedSemester: { type: [Number, String], required: true }
});

const emit = defineEmits(['close', 'submit']);

const courseName = ref('');
const sks = ref(1);
const grade = ref('');

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        if (props.isEdit && props.course) {
            courseName.value = props.course.course_name;
            sks.value = props.course.sks;
            grade.value = props.course.grade || '';
        } else {
            courseName.value = '';
            sks.value = '';
            grade.value = '';
        }
    }
});

const handleClose = () => {
    emit('close');
};

const handleSubmit = () => {
    emit('submit', {
        course_name: courseName.value,
        sks: parseInt(sks.value),
        grade: grade.value
    });
};
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div class="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 dark:border-slate-800 transform animate-in zoom-in-95 duration-300 relative">
                <button @click="handleClose" class="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 transition-colors">
                    <X class="h-5 w-5" />
                </button>
                
                <div class="mb-6">
                    <h3 class="text-xl font-black text-slate-800 dark:text-white">
                        {{ isEdit ? $t('study_edit_course', { course: terms.course }) : $t('study_add_new_data') }}
                    </h3>
                    <p class="text-xs font-bold text-indigo-500 capitalize tracking-wide mt-1">
                        {{ $t('study_for_semester_dynamic', { semester: terms.semester, num: selectedSemester }) }}
                    </p>
                </div>

                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div>
                        <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">{{ $t('study_course_name_dynamic', { course: terms.course }) }}</label>
                        <input v-model="courseName" type="text" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">{{ terms.sks }} *</label>
                            <input v-model="sks" type="number" min="1" max="20" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div>
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">{{ $t('study_grade_target_required', { grade: terms.grade }) }}</label>
                            <input v-model="grade" type="text" :placeholder="$t('study_grade_placeholder')" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    </div>
                    <button type="submit" class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-lg transition-all mt-2">
                        {{ isEdit ? $t('study_save_changes') : $t('study_save_data') }}
                    </button>
                </form>
            </div>
        </div>
    </Teleport>
</template>
