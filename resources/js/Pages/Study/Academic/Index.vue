<script setup>
import { ref, computed, watch } from 'vue';
import { trans } from 'laravel-vue-i18n';
import Swal from 'sweetalert2';
import { Head, router, Link } from '@inertiajs/vue3';
import { FolderOpen, Trash2, Sparkles, ChevronRight } from 'lucide-vue-next';
import axios from 'axios';


// Modular Child Components
import AcademicSetup from './Components/AcademicSetup.vue';
import SemesterModal from './Components/SemesterModal.vue';
import AcademicHeader from './Components/AcademicHeader.vue';
import CourseCard from './Components/CourseCard.vue';
import CourseModal from './Components/CourseModal.vue';
import ClassroomView from './Components/ClassroomView.vue';
import ArchiveModal from './Components/ArchiveModal.vue';

const props = defineProps({
    academicRecords: { type: Array, default: () => [] },
    academicStats: { type: Object, default: () => ({ ipk: 0, total_sks: 0, current_semester: 1, semesters: [] }) },
    user: { type: Object, required: true }
});

// --- Local Reactive Mirrors ---
const localAcademicRecords = ref([]);
const localAcademicStats = ref({ ipk: 0, total_sks: 0, current_semester: 1, semesters: [] });

if (props.academicRecords) {
    localAcademicRecords.value = JSON.parse(JSON.stringify(props.academicRecords));
}
if (props.academicStats) {
    localAcademicStats.value = JSON.parse(JSON.stringify(props.academicStats));
}

watch(() => props.academicRecords, (newVal) => {
    if (newVal) localAcademicRecords.value = JSON.parse(JSON.stringify(newVal));
}, { deep: true });

watch(() => props.academicStats, (newVal) => {
    if (newVal) localAcademicStats.value = JSON.parse(JSON.stringify(newVal));
}, { deep: true });

// --- Dynamic Terminology & Settings ---
const userSettings = computed(() => props.user.settings || {});
const hasCompletedSetup = computed(() => !!userSettings.value.education_level);

const localEduLevel = ref(null);
const eduLevel = computed(() => localEduLevel.value || userSettings.value.education_level || 'kuliah');

const terms = computed(() => {
    const level = eduLevel.value;
    return {
        semester: trans(`study_term_semester_${level}`),
        course: trans(`study_term_course_${level}`),
        sks: trans(`study_term_sks_${level}`),
        grade: trans(`study_term_grade_${level}`),
        meeting: trans(`study_term_meeting_${level}`),
        ipk: trans(`study_term_ipk_${level}`),
        ips: trans(`study_term_ips_${level}`),
        total_sks: trans(`study_term_total_sks_${level}`)
    };
});

const fireToast = (icon, message) => {
    Swal.fire({
        toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true,
        background: icon === 'error' ? '#ef4444' : '#4f46e5', iconColor: '#ffffff', icon: icon,
        title: `<span style="color: white; font-weight: 900; font-size: 14px; line-height: 1.2;">${message}</span>`,
        customClass: {
            container: '!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end',
            popup: '!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !m-0 !w-auto !min-w-[280px]',
            timerProgressBar: '!bg-white/40 !h-1 !rounded-b-full'
        }
    });
};

const handleSetupCompleted = (level) => {
    localEduLevel.value = level;
};

// --- Semesters Logic ---
const localCurrentSemester = ref(parseInt(userSettings.value.current_semester) || 1);
const maxSemesterAdded = ref(parseInt(userSettings.value.current_semester) || 1);

watch(() => userSettings.value.current_semester, (newVal) => {
    if (newVal) {
        const parsed = parseInt(newVal) || 1;
        localCurrentSemester.value = parsed;
        maxSemesterAdded.value = Math.max(maxSemesterAdded.value, parsed);
    }
});

const availableSemesters = computed(() => {
    const semsFromRecords = localAcademicStats.value.semesters.map(s => s.semester);
    
    // Union of semesters with records and the currently active/selected semester
    const semsSet = new Set([...semsFromRecords, parseInt(selectedSemester.value), localCurrentSemester.value]);
    
    // If the user is on education_level "lainnya", we treat it as discrete terms
    // but for others, we might still want the range 1..max for adding convenience.
    // However, to fix the "delete" issue, we only show what exists + current.
    
    return Array.from(semsSet).sort((a, b) => b - a);
});

const availableSemestersRange = (max) => {
    const range = [];
    for (let i = 1; i <= max; i++) {
        range.push(i);
    }
    return range;
};

const selectedSemester = ref(userSettings.value.current_semester || 1);
const isAddSemesterModalOpen = ref(false);

const deleteSemester = () => {
    deleteSpecificSemester(selectedSemester.value);
};

const submitNewSemester = (val) => {
    const parsedVal = parseInt(val);
    if (!parsedVal || parsedVal < 1) {
        return fireToast('error', trans('study_invalid_semester_num'));
    }
    
    // 1. Optimistic Update
    maxSemesterAdded.value = Math.max(maxSemesterAdded.value, parsedVal);
    localCurrentSemester.value = Math.max(localCurrentSemester.value, parsedVal);
    selectedSemester.value = parsedVal;
    isAddSemesterModalOpen.value = false;

    // 2. Persist to backend (Academic Binder use settings for current_semester)
    axios.post(route('study.settings'), {
        current_semester: parsedVal
    }).then(() => {
        fireToast('success', trans('study_semester_added_success', { num: parsedVal }));
    }).catch(err => {
        console.error('Failed to save semester:', err);
        fireToast('error', trans('study_save_semester_failed'));
    });
};

const deleteSpecificSemester = (sem) => {
    Swal.fire({
        title: trans('study_delete_semester_title', { num: sem }),
        text: trans('study_delete_semester_text'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: trans('study_delete_confirm_yes'),
        cancelButtonText: trans('study_delete_confirm_cancel'),
        customClass: {
            confirmButton: 'bg-rose-500 text-white font-bold py-3.5 px-8 rounded-2xl mx-2',
            cancelButton: 'bg-slate-100 text-slate-500 font-bold py-3.5 px-8 rounded-2xl mx-2',
            popup: 'rounded-[2.5rem] p-8'
        },
        buttonsStyling: false
    }).then((res) => {
        if (res.isConfirmed) {
            const originalRecords = JSON.parse(JSON.stringify(localAcademicRecords.value));
            const originalStats = JSON.parse(JSON.stringify(localAcademicStats.value));
            const originalSelectedSemester = selectedSemester.value;
            const originalLocalCurrentSemester = localCurrentSemester.value;
            const originalMaxSemesterAdded = maxSemesterAdded.value;

            // 1. Optimistic UI update
            localAcademicRecords.value = localAcademicRecords.value.filter(r => r.semester !== parseInt(sem));
            localAcademicStats.value.semesters = localAcademicStats.value.semesters.filter(s => s.semester !== parseInt(sem));
            
            // Calculate new max semester from remaining data
            const remainingSems = localAcademicStats.value.semesters.map(s => s.semester);
            const maxFromRecords = remainingSems.length > 0 ? Math.max(...remainingSems) : 1;
            
            // Only shrink if we deleted the current/tip semester
            if (parseInt(sem) >= localCurrentSemester.value) {
                localCurrentSemester.value = maxFromRecords;
                maxSemesterAdded.value = maxFromRecords;
            } else {
                // If we deleted a lower semester, maxSemesterAdded might still be the same
                maxSemesterAdded.value = Math.max(localCurrentSemester.value, maxFromRecords);
            }

            // If the selected semester was the one deleted, switch to the new current
            if (selectedSemester.value === parseInt(sem)) {
                selectedSemester.value = localCurrentSemester.value;
            }

            fireToast('success', trans('study_semester_deleted_success'));

            // 2. Perform silent backend DELETE request
            axios.delete(route('study.academic.semester.destroy', sem), {
                headers: { 'Accept': 'application/json' }
            })
                .then((response) => {
                    // Sync backend updated setting if provided
                    if (response.data?.current_semester) {
                        localCurrentSemester.value = parseInt(response.data.current_semester);
                        if (maxSemesterAdded.value > localCurrentSemester.value) {
                             // Keep maxSemesterAdded aligned if records exist, otherwise pull back
                             const semsFromRecords = localAcademicStats.value.semesters.map(s => s.semester);
                             const realMax = Math.max(localCurrentSemester.value, ...semsFromRecords, 1);
                             maxSemesterAdded.value = realMax;
                        }
                    }
                })
                .catch((err) => {
                    console.error('Delete semester failed:', err);
                    // Rollback on failure
                    localAcademicRecords.value = originalRecords;
                    localAcademicStats.value = originalStats;
                    selectedSemester.value = originalSelectedSemester;
                    localCurrentSemester.value = originalLocalCurrentSemester;
                    maxSemesterAdded.value = originalMaxSemesterAdded;
                    
                    const errorMsg = err.response?.data?.message || 'Gagal menghapus semester dari database.';
                    fireToast('error', errorMsg);
                });
        }
    });
};

// --- Courses CRUD Logic ---
const filteredCourses = computed(() => {
    return localAcademicRecords.value.filter(r => r.semester === selectedSemester.value);
});

const isAddCourseModalOpen = ref(false);
const isEditCourseModalOpen = ref(false);
const editingCourse = ref(null);

const openAddCourse = () => {
    isAddCourseModalOpen.value = true;
};

const openEditCourse = (course) => {
    editingCourse.value = course;
    isEditCourseModalOpen.value = true;
};

const submitCourse = (data) => {
    const tempId = 'temp_' + Date.now();
    const newRecord = {
        id: tempId,
        course_name: data.course_name,
        semester: selectedSemester.value,
        sks: data.sks,
        grade: data.grade,
        archives: []
    };

    localAcademicRecords.value.push(newRecord);
    isAddCourseModalOpen.value = false;
    fireToast('success', trans('study_course_added_success'));

    router.post(route('study.academic.store'), {
        course_name: data.course_name,
        semester: selectedSemester.value,
        sks: data.sks,
        grade: data.grade
    }, {
        preserveScroll: true,
        preserveState: true,
        onError: (err) => {
            localAcademicRecords.value = localAcademicRecords.value.filter(r => r.id !== tempId);
            fireToast('error', Object.values(err)[0] || trans('study_add_course_failed'));
        }
    });
};

const submitEditCourse = (data) => {
    const targetId = editingCourse.value.id;
    const index = localAcademicRecords.value.findIndex(r => r.id === targetId);
    let originalRecord = null;
    
    if (index !== -1) {
        originalRecord = JSON.parse(JSON.stringify(localAcademicRecords.value[index]));
        localAcademicRecords.value[index] = {
            ...localAcademicRecords.value[index],
            course_name: data.course_name,
            sks: data.sks,
            grade: data.grade
        };
    }

    isEditCourseModalOpen.value = false;
    fireToast('success', trans('study_changes_saved'));

    router.put(route('study.academic.update', targetId), {
        course_name: data.course_name,
        semester: editingCourse.value.semester,
        sks: data.sks,
        grade: data.grade
    }, {
        preserveScroll: true,
        preserveState: true,
        onError: (err) => {
            if (index !== -1 && originalRecord) {
                localAcademicRecords.value[index] = originalRecord;
            }
            fireToast('error', Object.values(err)[0] || trans('study_save_changes_failed'));
        }
    });
};

const deleteRecord = (id) => {
    if (String(id).startsWith('temp_')) {
        return fireToast('warning', trans('study_wait_sync'));
    }

    Swal.fire({
        title: trans('study_delete_course_confirm_title', { course: terms.value.course }),
        text: trans('study_delete_course_confirm', { course: terms.value.course }),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: trans('study_delete_confirm_yes'),
        cancelButtonText: trans('study_delete_confirm_cancel'),
        customClass: {
            confirmButton: 'bg-rose-500 text-white font-bold py-3.5 px-8 rounded-2xl mx-2',
            cancelButton: 'bg-slate-100 text-slate-500 font-bold py-3.5 px-8 rounded-2xl mx-2',
            popup: 'rounded-[2.5rem] p-8'
        },
        buttonsStyling: false
    }).then((res) => {
        if (res.isConfirmed) {
            const deletedRecord = localAcademicRecords.value.find(r => r.id === id);
            localAcademicRecords.value = localAcademicRecords.value.filter(r => r.id !== id);
            
            if (selectedCourse.value && selectedCourse.value.id === id) {
                closeCourse();
            }
            fireToast('success', trans('study_course_deleted_success'));

            router.delete(route('study.academic.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                progress: false,
                onError: () => {
                    if (deletedRecord) localAcademicRecords.value.push(deletedRecord);
                    fireToast('error', trans('study_delete_course_failed'));
                }
            });
        }
    });
};

// --- Classroom View Logic ---
const selectedCourse = ref(null);
const activeCourseReactive = computed(() => {
    if (!selectedCourse.value) return null;
    return localAcademicRecords.value.find(r => r.id === selectedCourse.value.id) || null;
});

const openCourse = (course) => {
    selectedCourse.value = course;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const closeCourse = () => {
    selectedCourse.value = null;
};

// --- Archives Logic ---
const isAddMeetingModalOpen = ref(false);
const prefillMeetingTag = ref('');

const openAddArchive = (tag = '') => {
    prefillMeetingTag.value = tag;
    isAddMeetingModalOpen.value = true;
};

const handleOptimisticArchiveAdd = (archive) => {
    const recordIndex = localAcademicRecords.value.findIndex(r => r.id === activeCourseReactive.value.id);
    if (recordIndex !== -1) {
        localAcademicRecords.value[recordIndex].archives.push(archive);
    }
    fireToast('success', trans('study_archive_uploaded_success'));
};

const handleRollbackArchiveAdd = ({ tempId, error }) => {
    const recordIndex = localAcademicRecords.value.findIndex(r => r.id === activeCourseReactive.value.id);
    if (recordIndex !== -1) {
        localAcademicRecords.value[recordIndex].archives = localAcademicRecords.value[recordIndex].archives.filter(a => a.id !== tempId);
    }
    fireToast('error', error);
};

const deleteArchive = (id) => {
    if (String(id).startsWith('temp_')) {
        return fireToast('warning', trans('study_wait_upload'));
    }

    Swal.fire({
        title: trans('study_delete_archive_title'),
        text: trans('study_delete_confirm_desc'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: trans('study_delete_confirm_yes'),
        cancelButtonText: trans('study_delete_confirm_cancel'),
        customClass: {
            confirmButton: 'bg-rose-500 text-white font-bold py-3.5 px-8 rounded-2xl mx-2',
            cancelButton: 'bg-slate-100 text-slate-500 font-bold py-3.5 px-8 rounded-2xl mx-2',
            popup: 'rounded-[2.5rem] p-8'
        },
        buttonsStyling: false
    }).then((res) => {
        if (res.isConfirmed) {
            let recordIndex = -1;
            let deletedArchive = null;
            let deletedArchiveIndex = -1;

            localAcademicRecords.value.forEach((r, rIdx) => {
                const aIdx = r.archives.findIndex(a => a.id === id);
                if (aIdx !== -1) {
                    recordIndex = rIdx;
                    deletedArchiveIndex = aIdx;
                    deletedArchive = r.archives[aIdx];
                }
            });

            if (recordIndex !== -1 && deletedArchiveIndex !== -1) {
                localAcademicRecords.value[recordIndex].archives.splice(deletedArchiveIndex, 1);
            }
            fireToast('success', trans('study_archive_deleted_success'));

            router.delete(route('study.academic.archive.destroy', id), {
                preserveScroll: true, 
                preserveState: true,
                progress: false,
                onError: () => {
                    if (recordIndex !== -1 && deletedArchive) {
                        localAcademicRecords.value[recordIndex].archives.splice(deletedArchiveIndex, 0, deletedArchive);
                    }
                    fireToast('error', trans('study_delete_archive_failed'));
                }
            });
        }
    });
};
</script>

<template>
    <Head :title="$t('study_academic_binder_title', 'Academic Binder')" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors font-sans">
        
        <!-- STATE 1: EMPTY STATE & SETUP -->
        <AcademicSetup 
            :user="user"
            :has-completed-setup="hasCompletedSetup"
            @setup-completed="handleSetupCompleted"
            @fire-toast="fireToast" />

        <template v-if="hasCompletedSetup">
            <!-- STATE 2: DASHBOARD (SEMESTER & DAFTAR MATKUL) -->
            <template v-if="!activeCourseReactive">
                <AcademicHeader 
                    :user-settings="userSettings"
                    :terms="terms"
                    :available-semesters="availableSemesters"
                    :selected-semester="selectedSemester"
                    @select-semester="(sem) => selectedSemester = sem"
                    @delete-specific-semester="deleteSpecificSemester"
                    @add-semester-click="isAddSemesterModalOpen = true"
                    @add-course-click="openAddCourse" />

                <div class="max-w-[1600px] w-full md:w-[95%] mx-auto px-4 sm:px-8 py-8">
                    <!-- Banner Portfolio -->
                    <Link :href="route('study.portfolio')" class="group relative flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 overflow-hidden rounded-2xl border border-slate-800 transition-all hover:border-indigo-500/50 shadow-lg mb-8 hover:-translate-y-0.5">
                        <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div class="relative z-10 flex items-center gap-4">
                            <div class="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform border border-indigo-500/30">
                                <Sparkles class="h-5 w-5" />
                            </div>
                            <h3 class="text-white font-bold text-sm sm:text-base tracking-wide">Neural Portfolio 
                                <span class="hidden sm:inline text-slate-400 font-normal ml-2">&mdash; {{ $t('study_portfolio_banner_sub') }}</span>
                            </h3>
                        </div>
                        <ChevronRight class="relative z-10 h-5 w-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div class="flex items-end justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-4 group/header">
                        <h2 class="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
                            <FolderOpen class="h-5 w-5 text-slate-400" />
                            {{ $t('study_course_list_title', { course: terms.course, semester: terms.semester, num: selectedSemester }) }}
                            
                            <button type="button" @click.prevent="deleteSemester" class="ml-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1.5 rounded-lg transition-colors opacity-0 group-hover/header:opacity-100" :title="$t('study_delete_this')">
                                <Trash2 class="h-4 w-4" />
                            </button>
                        </h2>
                    </div>

                    <!-- Grid Mata Kuliah -->
                    <div v-if="filteredCourses.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <CourseCard v-for="record in filteredCourses" :key="record.id"
                            :record="record"
                            :terms="terms"
                            @click="openCourse"
                            @edit="openEditCourse"
                            @delete="deleteRecord" />
                    </div>

                    <div v-else class="py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem]">
                        <div class="h-16 w-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <FolderOpen class="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 class="text-lg font-black text-slate-600 dark:text-slate-300 mb-1">{{ $t('study_no_course_data') }} {{ terms.course }}</h3>
                        <p class="text-sm text-slate-500 mb-6">{{ $t('study_no_course_desc', { course: terms.course, semester: terms.semester, num: selectedSemester }) }}</p>
                        <button @click="openAddCourse" class="px-6 py-2.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 rounded-full font-bold transition-colors">
                            {{ $t('study_add_first_course', { course: terms.course }) }}
                        </button>
                    </div>
                </div>
            </template>

            <!-- STATE 3: RUANG KELAS / DETAIL MATKUL -->
            <template v-else>
                <ClassroomView 
                    :course="activeCourseReactive"
                    :terms="terms"
                    @back="closeCourse"
                    @add-archive-click="openAddArchive"
                    @delete-archive="deleteArchive" />
            </template>

            <!-- MODALS -->
            <SemesterModal 
                :is-open="isAddSemesterModalOpen"
                @close="isAddSemesterModalOpen = false"
                @submit="submitNewSemester" />

            <CourseModal 
                :is-open="isAddCourseModalOpen"
                :is-edit="false"
                :terms="terms"
                :selected-semester="selectedSemester"
                @close="isAddCourseModalOpen = false"
                @submit="submitCourse" />

            <CourseModal 
                :is-open="isEditCourseModalOpen"
                :is-edit="true"
                :course="editingCourse"
                :terms="terms"
                :selected-semester="selectedSemester"
                @close="isEditCourseModalOpen = false"
                @submit="submitEditCourse" />

            <ArchiveModal 
                v-if="activeCourseReactive"
                :is-open="isAddMeetingModalOpen"
                :prefill-tag="prefillMeetingTag"
                :course="activeCourseReactive"
                :terms="terms"
                @close="isAddMeetingModalOpen = false"
                @optimistic-add="handleOptimisticArchiveAdd"
                @rollback-add="handleRollbackArchiveAdd"
                @fire-toast="fireToast" />
        </template>
    </div>
</template>
