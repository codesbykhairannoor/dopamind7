<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { trans } from 'laravel-vue-i18n';
import Swal from 'sweetalert2';
import { Head, router, Link, useForm } from '@inertiajs/vue3';
import { 
    Trash2, BookOpen, Plus, ArrowLeft, FileText, 
    ExternalLink, X, Upload, GraduationCap, 
    School, Book, Sparkles, ChevronRight, Link2, PlusCircle, FolderOpen, Calendar, ChevronDown, MoreVertical, Edit3, Settings, Info, Check
} from 'lucide-vue-next';

const props = defineProps({
    academicRecords: { type: Array, default: () => [] },
    academicStats: { type: Object, default: () => ({ ipk: 0, total_sks: 0, current_semester: 1, semesters: [] }) },
    user: { type: Object, required: true }
});

// --- Dynamic Terminology & User Settings ---
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

// Global toast notifier
const fireToast = (icon, message) => {
    Swal.fire({
        toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true,
        background: icon === 'error' ? '#ef4444' : '#4f46e5', iconColor: '#ffffff', icon: icon,
        title: `<span style="color: white; font-weight: 900; font-size: 14px; line-height: 1.2;">${message}</span>`,
        customClass: {
            container: '!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end',
            popup: '!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !m-0 !w-auto !min-w-[280px]',
            timerProgressBar: '!bg-white/40 !h-1 !rounded-b-full'
        }
    });
};

// --- Setup Modal Logic ---
const showSetupModal = ref(false);
const setupForm = useForm({ 
    education_level: 'kuliah',
    major: '',
    student_id: '',
    current_semester: 1
});

const openSetup = () => {
    setupForm.education_level = userSettings.value.education_level || 'kuliah';
    setupForm.major = userSettings.value.major || '';
    setupForm.student_id = userSettings.value.student_id || '';
    setupForm.current_semester = userSettings.value.current_semester || 1;
    showSetupModal.value = true;
};

const submitSetup = () => {
    if (!setupForm.education_level) {
        return fireToast('error', trans('study_select_edu_level_alert'));
    }
    if (!setupForm.current_semester) {
        return fireToast('error', trans('study_semester_empty_alert'));
    }
    localEduLevel.value = setupForm.education_level;
    setupForm.post(route('study.academic.setup'), { 
        preserveScroll: true, 
        preserveState: true,
        onSuccess: () => {
            showSetupModal.value = false;
            fireToast('success', trans('success_saved', 'Tersimpan!'));
        }
    });
};

// --- Semester Navigation State ---
const maxSemesterAdded = ref(0);
const selectedSemester = ref(1);

const availableSemesters = computed(() => {
    const semsFromRecords = props.academicStats.semesters.map(s => s.semester);
    const semsFromSetup = parseInt(userSettings.value.current_semester) || 1;
    let maxSem = Math.max(semsFromSetup, maxSemesterAdded.value, ...semsFromRecords, 1);
    
    let sems = [];
    for(let i=1; i<=maxSem; i++) { sems.push(i); }
    return sems;
});

// Calculate semester SKS / IPS locally
const getSemesterStatsSummary = (sem) => {
    const semData = props.academicStats.semesters.find(s => s.semester === sem);
    if (!semData) return `0 ${terms.value.sks} • ${terms.value.ips} 0.00`;
    return `${semData.total_sks} ${terms.value.sks} • ${terms.value.ips} ${semData.ips.toFixed(2)}`;
};

const deleteSpecificSemester = (sem) => {
    Swal.fire({
        title: `<span class="text-xl font-black text-slate-800 dark:text-white">${trans('study_delete_semester_title', { num: sem })}</span>`,
        html: `<p class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">${trans('study_delete_semester_text')}</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: trans('study_delete_confirm_yes'),
        cancelButtonText: trans('study_delete_confirm_cancel'),
        customClass: {
            popup: '!rounded-[2rem] !p-8 !border !border-slate-100 dark:!border-slate-800 !shadow-2xl dark:!shadow-none dark:!bg-slate-900 transition-colors duration-500',
            confirmButton: '!bg-rose-500 !text-white !font-bold !py-3.5 !px-6 !rounded-xl !shadow-lg dark:!shadow-none shadow-rose-200 dark:!shadow-rose-900/20 !text-xs !uppercase !tracking-widest !w-full sm:!w-auto transition-all duration-300',
            cancelButton: '!bg-slate-100 dark:!bg-slate-800 !text-slate-500 dark:!text-slate-400 !font-bold !py-3.5 !px-6 !rounded-xl !text-xs !uppercase !tracking-widest !w-full sm:!w-auto transition-all duration-300',
            actions: '!mt-8 flex flex-col-reverse sm:flex-row !gap-3'
        },
        backdrop: `rgba(15, 23, 42, 0.6) `,
        buttonsStyling: false
    }).then((res) => {
        if (res.isConfirmed) {
            router.delete(route('study.academic.semester.destroy', sem), {
                preserveScroll: true,
                onSuccess: () => {
                    fireToast('success', trans('study_delete_success', 'Berhasil dihapus!'));
                    if (selectedSemester.value === sem) {
                        selectedSemester.value = Math.max(1, sem - 1);
                    }
                }
            });
        }
    });
};

const isAddSemesterModalOpen = ref(false);
const newSemesterValue = ref('');

const promptNewSemester = () => {
    newSemesterValue.value = '';
    isAddSemesterModalOpen.value = true;
};

const submitNewSemester = () => {
    const val = parseInt(newSemesterValue.value);
    if (val && val >= 1) {
        maxSemesterAdded.value = Math.max(maxSemesterAdded.value, val);
        selectedSemester.value = val;
        isAddSemesterModalOpen.value = false;
        fireToast('success', trans('success_saved', 'Tersimpan!'));
    }
};

// --- Course Inline CRUD Logic ---
const localCourses = ref([]);
const showArchivesMap = ref({});
const newArchiveForms = ref({});

watch(() => props.academicRecords, (newRecords) => {
    localCourses.value = JSON.parse(JSON.stringify(newRecords || []));
}, { immediate: true, deep: true });

const filteredCourses = computed(() => {
    return localCourses.value.filter(r => r.semester === selectedSemester.value);
});

const activeSemesterStats = computed(() => {
    const sem = selectedSemester.value;
    const semData = props.academicStats.semesters.find(s => s.semester === sem);
    return semData || { total_sks: 0, ips: 0 };
});

const addCourseRow = () => {
    router.post(route('study.academic.store'), {
        course_name: trans('study_new_course_placeholder', 'Mata Kuliah Baru'),
        sks: 2,
        grade: 'A',
        semester: selectedSemester.value
    }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            fireToast('success', trans('success_saved', 'Tersimpan!'));
        }
    });
};

const saveCourseSilent = (course) => {
    if (!course.course_name || !course.course_name.trim()) {
        fireToast('error', trans('study_course_name_empty_alert', { course: terms.value.course }));
        return;
    }
    if (course.grade) {
        course.grade = course.grade.toUpperCase().trim();
    }
    
    router.put(route('study.academic.update', course.id), {
        course_name: course.course_name,
        sks: course.sks,
        grade: course.grade,
        semester: course.semester
    }, {
        preserveScroll: true,
        preserveState: true,
        only: ['academicRecords', 'academicStats']
    });
};

const deleteRecord = (id) => {
    Swal.fire({
        title: `<span class="text-xl font-black text-slate-800 dark:text-white">${trans('study_delete_course_confirm_title', { course: terms.value.course })}</span>`,
        html: `<p class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">${trans('study_delete_course_confirm', { course: terms.value.course })}</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: trans('study_delete_confirm_yes'),
        cancelButtonText: trans('study_delete_confirm_cancel'),
        customClass: {
            popup: '!rounded-[2rem] !p-8 !border !border-slate-100 dark:!border-slate-800 !shadow-2xl dark:!shadow-none dark:!bg-slate-900 transition-colors duration-500',
            confirmButton: '!bg-rose-500 !text-white !font-bold !py-3.5 !px-6 !rounded-xl !shadow-lg dark:!shadow-none shadow-rose-200 dark:!shadow-rose-900/20 !text-xs !uppercase !tracking-widest !w-full sm:!w-auto transition-all duration-300',
            cancelButton: '!bg-slate-100 dark:!bg-slate-800 !text-slate-500 dark:!text-slate-400 !font-bold !py-3.5 !px-6 !rounded-xl !text-xs !uppercase !tracking-widest !w-full sm:!w-auto transition-all duration-300',
            actions: '!mt-8 flex flex-col-reverse sm:flex-row !gap-3'
        },
        backdrop: `rgba(15, 23, 42, 0.6) `,
        buttonsStyling: false
    }).then((res) => {
        if (res.isConfirmed) {
            router.delete(route('study.academic.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    fireToast('success', trans('study_delete_success', 'Berhasil dihapus!'));
                }
            });
        }
    });
};

// --- Expandable Inline Archives Logic ---
const toggleArchives = (courseId) => {
    showArchivesMap.value[courseId] = !showArchivesMap.value[courseId];
    if (showArchivesMap.value[courseId] && !newArchiveForms.value[courseId]) {
        initNewArchiveForm(courseId);
    }
};

const initNewArchiveForm = (courseId) => {
    newArchiveForms.value[courseId] = {
        meeting_tag: '',
        type: 'Modul',
        file: null,
        link_url: '',
        processing: false
    };
};

const getGroupedArchives = (archives) => {
    if (!archives) return {};
    const groups = {};
    archives.forEach(arc => {
        const tag = arc.meeting_tag || 'Umum';
        if (!groups[tag]) groups[tag] = [];
        groups[tag].push(arc);
    });
    return groups;
};

const getExistingTags = (course) => {
    if (!course.archives) return [];
    const tags = course.archives.map(a => a.meeting_tag).filter(Boolean);
    return [...new Set(tags)];
};

const uploadArchive = (courseId) => {
    const form = newArchiveForms.value[courseId];
    if (!form.meeting_tag.trim()) {
        return fireToast('error', trans('study_meeting_tag_empty_alert'));
    }
    if (!form.file && !form.link_url.trim()) {
        return fireToast('error', trans('study_archive_file_or_link_alert'));
    }

    form.processing = true;
    
    // We send form data
    const formData = new FormData();
    formData.append('academic_record_id', courseId);
    formData.append('meeting_tag', form.meeting_tag.trim());
    formData.append('type', form.type);
    if (form.file) {
        formData.append('file', form.file);
    }
    if (form.link_url) {
        formData.append('link_url', form.link_url.trim());
    }

    router.post(route('study.academic.archive.store'), formData, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            initNewArchiveForm(courseId);
            fireToast('success', trans('success_saved', 'Tersimpan!'));
        },
        onFinish: () => {
            if (newArchiveForms.value[courseId]) {
                newArchiveForms.value[courseId].processing = false;
            }
        }
    });
};

const saveArchiveSilent = (archive) => {
    router.put(route('study.academic.archive.update', archive.id), {
        file_name: archive.file_name,
        link_url: archive.link_url,
        meeting_tag: archive.meeting_tag,
        type: archive.type
    }, {
        preserveScroll: true,
        preserveState: true,
        only: ['academicRecords']
    });
};

const deleteArchive = (id) => {
    Swal.fire({
        title: `<span class="text-xl font-black text-slate-800 dark:text-white">${trans('study_delete_archive_title')}</span>`,
        html: `<p class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">${trans('study_delete_confirm_desc')}</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: trans('study_delete_confirm_yes'),
        cancelButtonText: trans('study_delete_confirm_cancel'),
        customClass: {
            popup: '!rounded-[2rem] !p-8 !border !border-slate-100 dark:!border-slate-800 !shadow-2xl dark:!shadow-none dark:!bg-slate-900 transition-colors duration-500',
            confirmButton: '!bg-rose-500 !text-white !font-bold !py-3.5 !px-6 !rounded-xl !shadow-lg dark:!shadow-none shadow-rose-200 dark:!shadow-rose-900/20 !text-xs !uppercase !tracking-widest !w-full sm:!w-auto transition-all duration-300',
            cancelButton: '!bg-slate-100 dark:!bg-slate-800 !text-slate-500 dark:!text-slate-400 !font-bold !py-3.5 !px-6 !rounded-xl !text-xs !uppercase !tracking-widest !w-full sm:!w-auto transition-all duration-300',
            actions: '!mt-8 flex flex-col-reverse sm:flex-row !gap-3'
        },
        backdrop: `rgba(15, 23, 42, 0.6) `,
        buttonsStyling: false
    }).then((res) => {
        if (res.isConfirmed) {
            router.delete(route('study.academic.archive.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    fireToast('success', trans('study_delete_success', 'Berhasil dihapus!'));
                }
            });
        }
    });
};

const getTypeColor = (type) => {
    if (type === 'Modul') return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
    if (type === 'Soal') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    if (type === 'Jawaban') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
    return 'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-400 border-slate-200 dark:border-slate-800';
};

onMounted(() => {
    if (hasCompletedSetup.value) {
        selectedSemester.value = userSettings.value.current_semester || 1;
    }
});
</script>

<template>
    <Head :title="$t('study_academic_binder_title', 'Academic Binder')" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors font-sans duration-500">
        
        <!-- ============================================== -->
        <!-- STATE 1: EMPTY STATE & SETUP -->
        <!-- ============================================== -->
        <template v-if="!hasCompletedSetup">
            <div class="max-w-[1600px] w-full md:w-[95%] mx-auto px-4 sm:px-8 py-12">
                <div class="py-24 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 shadow-sm dark:shadow-none transition-all duration-500 max-w-4xl mx-auto mb-12">
                    <div class="flex flex-col items-center gap-5">
                        <span class="text-6xl animate-bounce mb-2">🎓</span>
                        <h4 class="text-2xl font-black text-slate-800 dark:text-slate-100 transition-colors duration-500">{{ $t('study_profile_not_set', 'Profil Studi Belum Diatur') }}</h4>
                        <p class="text-sm font-bold text-slate-400 dark:text-slate-500 px-8 max-w-lg mx-auto transition-colors duration-500 leading-relaxed">
                            {{ $t('study_profile_not_set_desc', 'Mulai organisasikan seluruh modul, tugas, dan target nilai Anda secara cerdas. Mari sesuaikan sistem ini dengan profil akademis Anda sekarang!') }}
                        </p>
                        <button @click="openSetup" class="mt-4 bg-indigo-600 text-white font-black py-3.5 px-8 rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 active:scale-95 transition-all outline-none flex items-center gap-2">
                            {{ $t('study_start_setup', 'Mulai Setup') }} <ChevronRight class="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Portfolio Banner -->
            <div class="max-w-[1600px] w-full md:w-[95%] mx-auto px-6 pb-12">
                <Link :href="route('study.portfolio')" class="group relative flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 bg-white dark:bg-slate-900 overflow-hidden rounded-[2.5rem] border-2 border-indigo-50 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                    <div class="flex items-center gap-6 mb-4 sm:mb-0">
                        <div class="h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                            <Sparkles class="h-8 w-8" />
                        </div>
                        <div class="text-center sm:text-left">
                            <h3 class="text-slate-800 dark:text-white font-black text-xl mb-1">Neural Portfolio</h3>
                            <p class="text-slate-500 dark:text-slate-400 text-sm max-w-xl">{{ $t('study_portfolio_banner_desc') }}</p>
                        </div>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-xl text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center gap-2 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                        {{ $t('study_explore_ai_space') }} <ChevronRight class="h-5 w-5" />
                    </div>
                </Link>
            </div>
        </template>

        <!-- ============================================== -->
        <!-- STATE 2: ACTIVE BINDER DASHBOARD (SPLIT LAYOUT) -->
        <!-- ============================================== -->
        <template v-else>
            <div class="max-w-[1600px] w-full md:w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    <!-- LEFT COLUMN: Profile & Navigation -->
                    <div class="lg:col-span-4 w-full space-y-6 lg:sticky lg:top-24 h-fit">
                        
                        <!-- Card 1: Academic Profile Summary -->
                        <div class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 shadow-sm transition-colors duration-500 relative overflow-hidden group">
                            <div class="absolute -right-16 -top-16 w-40 h-40 border-[20px] border-slate-50 dark:border-slate-800/40 rounded-full pointer-events-none group-hover:scale-105 transition-all duration-1000"></div>
                            
                            <div class="relative z-10 flex items-start justify-between gap-4">
                                <div class="flex items-center gap-4 min-w-0">
                                    <div class="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl shrink-0">
                                        🏫
                                    </div>
                                    <div class="min-w-0">
                                        <h3 class="font-black text-slate-800 dark:text-white text-base tracking-tight truncate">{{ props.user.name }}</h3>
                                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1 capitalize">{{ terms.semester }} {{ selectedSemester }}</p>
                                    </div>
                                </div>
                                <button @click="openEditSetup" class="shrink-0 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-indigo-600 transition-colors">
                                    <Settings class="h-4 w-4" />
                                </button>
                            </div>

                            <div class="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/50 grid grid-cols-2 gap-4">
                                <div class="min-w-0">
                                    <span class="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ $t('study_edu_level_label', 'Jenjang') }}</span>
                                    <span class="block text-xs font-bold text-slate-700 dark:text-slate-200 capitalize truncate">
                                        {{ $t(`study_edu_level_${eduLevel}`) }}
                                    </span>
                                </div>
                                <div class="min-w-0" v-if="userSettings.major">
                                    <span class="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ $t('study_major_label', 'Jurusan') }}</span>
                                    <span class="block text-xs font-bold text-slate-700 dark:text-slate-200 truncate" :title="userSettings.major">
                                        {{ userSettings.major }}
                                    </span>
                                </div>
                                <div class="min-w-0 col-span-2" v-if="userSettings.student_id">
                                    <span class="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">ID / NIM / NIS</span>
                                    <span class="block text-xs font-bold font-mono text-slate-600 dark:text-slate-400 truncate">
                                        {{ userSettings.student_id }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Card 2: Interactive Stats Display -->
                        <div class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 shadow-sm transition-colors duration-500 flex items-center justify-between gap-6 relative overflow-hidden group">
                            <!-- IPK GPA Circle Gauge -->
                            <div class="relative flex items-center justify-center w-28 h-28 shrink-0">
                                <svg class="w-full h-full transform -rotate-90">
                                    <circle cx="56" cy="56" r="48" stroke="currentColor" class="text-slate-100 dark:text-slate-800" stroke-width="8" fill="transparent" />
                                    <circle cx="56" cy="56" r="48" stroke="currentColor" class="text-indigo-600 dark:text-indigo-400 transition-all duration-1000 ease-out" stroke-width="8" fill="transparent"
                                        :stroke-dasharray="2 * Math.PI * 48"
                                        :stroke-dashoffset="2 * Math.PI * 48 * (1 - Math.min(props.academicStats.ipk, 4.0) / 4.0)"
                                        stroke-linecap="round" />
                                </svg>
                                <div class="absolute flex flex-col items-center justify-center">
                                    <span class="text-2xl font-black text-slate-800 dark:text-white leading-none">{{ Number(props.academicStats.ipk).toFixed(2) }}</span>
                                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{{ terms.ipk }}</span>
                                </div>
                            </div>

                            <!-- Right details -->
                            <div class="flex-1 space-y-4">
                                <div>
                                    <span class="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{{ terms.total_sks }}</span>
                                    <span class="text-lg font-black text-slate-800 dark:text-white leading-none">
                                        {{ props.academicStats.total_sks }} <span class="text-xs font-bold text-slate-400">{{ terms.sks }}</span>
                                    </span>
                                </div>
                                <div class="pt-2 border-t border-slate-100 dark:border-slate-800/50">
                                    <span class="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{{ terms.ips }} (Active)</span>
                                    <span class="text-lg font-black text-indigo-600 dark:text-indigo-400 leading-none">
                                        {{ Number(activeSemesterStats.ips).toFixed(2) }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Card 3: Semester Navigation Sidebar -->
                        <div class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 shadow-sm transition-colors duration-500">
                            <div class="flex items-center justify-between mb-4 px-1">
                                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ $t('study_setup_title', 'Semester List') }}</span>
                                <button @click="promptNewSemester" class="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors">
                                    <Plus class="h-4 w-4" />
                                </button>
                            </div>

                            <div class="space-y-1.5 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                                <button 
                                    v-for="sem in availableSemesters" 
                                    :key="sem"
                                    @click="selectedSemester = sem"
                                    class="w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between group transition-all"
                                    :class="[
                                        selectedSemester === sem 
                                            ? 'bg-indigo-600 text-white font-black shadow-lg shadow-indigo-100 dark:shadow-none translate-x-1' 
                                            : 'hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                                    ]"
                                >
                                    <span class="text-xs">{{ terms.semester }} {{ sem }}</span>
                                    <div class="flex items-center gap-3">
                                        <span class="text-[9px] font-bold opacity-60" :class="selectedSemester === sem ? 'text-indigo-100' : 'text-slate-400'">
                                            {{ getSemesterStatsSummary(sem) }}
                                        </span>
                                        <button 
                                            @click.stop="deleteSpecificSemester(sem)" 
                                            class="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all z-20"
                                            :class="{ 'group-hover:text-white': selectedSemester === sem }"
                                        >
                                            <Trash2 class="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>

                    <!-- RIGHT COLUMN: Course Sheet & Archives Manager -->
                    <div class="lg:col-span-8 w-full space-y-6">
                        
                        <!-- Main Sheet Console Panel -->
                        <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 shadow-sm transition-colors duration-500 overflow-hidden flex flex-col min-h-[450px]">
                            
                            <!-- Sheet Header -->
                            <div class="px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 shrink-0 transition-colors">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg dark:shadow-none shadow-indigo-100 dark:shadow-indigo-900/20 text-lg">
                                        📖
                                    </div>
                                    <div class="min-w-0">
                                        <h2 class="text-lg font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1.5 truncate">
                                            {{ terms.semester }} {{ selectedSemester }}
                                        </h2>
                                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">
                                            {{ activeSemesterStats.total_sks }} SKS &bull; IPS {{ Number(activeSemesterStats.ips).toFixed(2) }}
                                        </p>
                                    </div>
                                </div>
                                
                                <button @click="addCourseRow" class="h-[42px] px-5 flex items-center justify-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl font-bold transition-all text-xs shadow-lg shadow-indigo-100 dark:shadow-none">
                                    <Plus class="h-4 w-4" /> {{ $t('study_add_course_btn') }} {{ terms.course }}
                                </button>
                            </div>

                            <!-- Course List / Spreadsheet Area -->
                            <div class="flex-1 overflow-x-auto no-scrollbar">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr class="bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
                                            <th class="py-4 px-6 min-w-[240px]">{{ terms.course }}</th>
                                            <th class="py-4 px-4 w-[110px]">{{ terms.sks }}</th>
                                            <th class="py-4 px-4 w-[140px]">{{ terms.grade }}</th>
                                            <th class="py-4 px-4 w-[110px] text-center">{{ $t('study_archive', 'Berkas') }}</th>
                                            <th class="py-4 px-6 w-[70px] text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100 dark:divide-slate-800/50">
                                        <template v-if="filteredCourses.length === 0">
                                            <tr>
                                                <td colspan="5" class="py-20 text-center">
                                                    <div class="max-w-md mx-auto flex flex-col items-center gap-4">
                                                        <span class="text-4xl">📂</span>
                                                        <h4 class="text-sm font-black text-slate-500 dark:text-slate-400 capitalize">{{ $t('study_no_course_data') }} {{ terms.course }}</h4>
                                                        <p class="text-xs text-slate-400 px-8 leading-relaxed">{{ $t('study_no_course_desc', { course: terms.course, semester: terms.semester, num: selectedSemester }) }}</p>
                                                        <button @click="addCourseRow" class="mt-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold px-6 py-2.5 rounded-xl border border-indigo-100/50 dark:border-indigo-900/20 text-xs transition-all active:scale-95">
                                                            {{ $t('study_add_first_course', { course: terms.course }) }}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </template>
                                        <template v-else v-for="course in filteredCourses" :key="course.id">
                                            <!-- Main Course Row -->
                                            <tr class="group hover:bg-slate-50/30 dark:hover:bg-slate-900/10 transition-colors">
                                                <!-- Course Name input -->
                                                <td class="py-3 px-6">
                                                    <input 
                                                        v-model="course.course_name"
                                                        @blur="saveCourseSilent(course)"
                                                        @keydown.enter="$event.target.blur()"
                                                        class="w-full bg-transparent border-0 focus:ring-0 p-0 text-sm font-black text-slate-800 dark:text-slate-100 placeholder-slate-350 dark:placeholder-slate-700 truncate transition-colors outline-none focus:border-b focus:border-indigo-500 focus:bg-slate-50 dark:focus:bg-slate-800/30 focus:px-2 focus:py-1 rounded" 
                                                        placeholder="..."
                                                    />
                                                </td>
                                                <!-- Credits (SKS) select -->
                                                <td class="py-3 px-4">
                                                    <select 
                                                        v-model="course.sks"
                                                        @change="saveCourseSilent(course)"
                                                        class="bg-transparent border-0 focus:ring-0 p-0 text-xs font-bold text-slate-600 dark:text-slate-350 outline-none cursor-pointer focus:bg-slate-50 dark:focus:bg-slate-800/30 rounded focus:px-2 py-0.5"
                                                    >
                                                        <option v-for="val in 10" :key="val" :value="val">{{ val }} {{ terms.sks }}</option>
                                                    </select>
                                                </td>
                                                <!-- Target Grade input -->
                                                <td class="py-3 px-4">
                                                    <input 
                                                        v-model="course.grade"
                                                        @blur="saveCourseSilent(course)"
                                                        @keydown.enter="$event.target.blur()"
                                                        class="w-full bg-transparent border-0 focus:ring-0 p-0 text-xs font-mono font-black text-emerald-600 dark:text-emerald-400 placeholder-slate-300 dark:placeholder-slate-700 transition-colors outline-none focus:bg-slate-50 dark:focus:bg-slate-800/30 focus:px-2 focus:py-1 rounded"
                                                        :placeholder="$t('study_grade_placeholder')"
                                                    />
                                                </td>
                                                <!-- Archives badge button -->
                                                <td class="py-3 px-4 text-center">
                                                    <button 
                                                        @click="toggleArchives(course.id)"
                                                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-wide transition-all border outline-none active:scale-95"
                                                        :class="[
                                                            showArchivesMap[course.id]
                                                                ? 'bg-indigo-650 text-white border-indigo-650 shadow-md'
                                                                : (course.archives?.length > 0)
                                                                    ? 'bg-indigo-50 border-indigo-100 text-indigo-655 dark:bg-indigo-900/20 dark:border-indigo-900/40 dark:text-indigo-400'
                                                                    : 'bg-slate-50 border-slate-100 text-slate-400 dark:bg-slate-800/50 dark:border-slate-800 dark:text-slate-500'
                                                        ]"
                                                    >
                                                        <FileText class="h-3.5 w-3.5" />
                                                        <span>{{ course.archives?.length || 0 }} Berkas</span>
                                                    </button>
                                                </td>
                                                <!-- Delete Action -->
                                                <td class="py-3 px-6 text-right">
                                                    <button 
                                                        @click="deleteRecord(course.id)"
                                                        class="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                                                    >
                                                        <Trash2 class="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>

                                            <!-- Expanded Archives Row -->
                                            <tr v-if="showArchivesMap[course.id]">
                                                <td colspan="5" class="p-6 bg-slate-50/30 dark:bg-slate-900/5 border-t border-b border-slate-100/80 dark:border-slate-800/80">
                                                    <div class="space-y-6">
                                                        
                                                        <div class="flex items-center justify-between">
                                                            <h4 class="text-xs font-black uppercase tracking-wider text-slate-450 flex items-center gap-2">
                                                                <span>📁 Manajer Berkas</span> &bull; 
                                                                <span class="text-indigo-600 dark:text-indigo-400 normal-case font-bold">{{ course.course_name }}</span>
                                                            </h4>
                                                        </div>

                                                        <!-- Grouped Archives List -->
                                                        <div v-if="!course.archives || course.archives.length === 0" class="text-center py-8 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 border-dashed rounded-[1.5rem]">
                                                            <p class="text-xs text-slate-400 font-bold italic tracking-wide">Belum ada berkas untuk mata kuliah ini.</p>
                                                        </div>
                                                        <div v-else class="space-y-6">
                                                            <div v-for="(archives, groupTag) in getGroupedArchives(course.archives)" :key="groupTag" class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-850 p-4 shadow-sm">
                                                                <div class="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3 border-b border-slate-50 dark:border-slate-800 pb-2">
                                                                    📚 {{ groupTag }}
                                                                </div>
                                                                
                                                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    <div v-for="arc in archives" :key="arc.id" class="group/arc relative p-3.5 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3 hover:border-indigo-200 hover:bg-white dark:hover:bg-slate-900 transition-all">
                                                                        <div class="flex items-center gap-3 min-w-0 flex-1">
                                                                            <select 
                                                                                v-model="arc.type"
                                                                                @change="saveArchiveSilent(arc)"
                                                                                class="w-20 rounded bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-[9px] font-black py-0.5 px-1 outline-none text-slate-500 focus:border-indigo-400"
                                                                            >
                                                                                <option value="Modul">{{ $t('study_type_modul') }}</option>
                                                                                <option value="Soal">{{ $t('study_type_soal') }}</option>
                                                                                <option value="Jawaban">{{ $t('study_type_jawaban') }}</option>
                                                                                <option value="Referensi">{{ $t('study_type_referensi') }}</option>
                                                                                <option value="Catatan">{{ $t('study_type_catatan') }}</option>
                                                                            </select>
                                                                            <input 
                                                                                v-model="arc.file_name"
                                                                                @blur="saveArchiveSilent(arc)"
                                                                                @keydown.enter="$event.target.blur()"
                                                                                class="flex-1 bg-transparent border-0 focus:ring-0 p-0 text-xs font-bold text-slate-700 dark:text-slate-250 truncate outline-none focus:border-b focus:border-indigo-400"
                                                                                placeholder="..."
                                                                            />
                                                                        </div>
                                                                        
                                                                        <div class="flex items-center gap-2">
                                                                            <a v-if="arc.file_path" :href="'/storage/' + arc.file_path" target="_blank" class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-colors" title="Open PDF">
                                                                                <FileText class="h-4 w-4" />
                                                                            </a>
                                                                            <a v-if="arc.link_url" :href="arc.link_url" target="_blank" class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors" title="Visit Link">
                                                                                <ExternalLink class="h-4 w-4" />
                                                                            </a>
                                                                            <button @click="deleteArchive(arc.id)" class="w-8 h-8 rounded-lg hover:bg-rose-50 text-slate-350 hover:text-rose-500 flex items-center justify-center transition-colors">
                                                                                <Trash2 class="h-4 w-4" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Inline Quick Add Archive Form -->
                                                        <div class="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 p-5 rounded-[1.5rem] shadow-sm">
                                                            <span class="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">+ Tambah Berkas / Link</span>
                                                            
                                                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                                                <!-- Tag input with datalist -->
                                                                <div class="space-y-1.5 md:col-span-1">
                                                                    <label class="block text-[9px] font-bold text-slate-400 tracking-wider">Topik / Pertemuan</label>
                                                                    <input 
                                                                        v-model="newArchiveForms[course.id].meeting_tag"
                                                                        :list="'datalist-' + course.id"
                                                                        placeholder="Cth: Pertemuan 1"
                                                                        class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-indigo-500 outline-none"
                                                                    />
                                                                    <datalist :id="'datalist-' + course.id">
                                                                        <option v-for="tag in getExistingTags(course)" :key="tag" :value="tag" />
                                                                    </datalist>
                                                                </div>
                                                                <!-- Type -->
                                                                <div class="space-y-1.5 md:col-span-1">
                                                                    <label class="block text-[9px] font-bold text-slate-400 tracking-wider">Jenis Konten</label>
                                                                    <select 
                                                                        v-model="newArchiveForms[course.id].type"
                                                                        class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-indigo-500 outline-none"
                                                                    >
                                                                        <option value="Modul">{{ $t('study_type_modul') }}</option>
                                                                        <option value="Soal">{{ $t('study_type_soal') }}</option>
                                                                        <option value="Jawaban">{{ $t('study_type_jawaban') }}</option>
                                                                        <option value="Referensi">{{ $t('study_type_referensi') }}</option>
                                                                        <option value="Catatan">{{ $t('study_type_catatan') }}</option>
                                                                    </select>
                                                                </div>
                                                                <!-- File upload & link -->
                                                                <div class="space-y-1.5 md:col-span-2 flex flex-col sm:flex-row gap-3">
                                                                    <div class="flex-1 space-y-1.5">
                                                                        <label class="block text-[9px] font-bold text-slate-400 tracking-wider">File PDF / Tautan URL</label>
                                                                        <div class="flex gap-2">
                                                                            <input 
                                                                                @input="newArchiveForms[course.id].file = $event.target.files[0]" 
                                                                                type="file" 
                                                                                accept=".pdf" 
                                                                                class="flex-1 text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-indigo-50 dark:file:bg-indigo-950/50 file:text-indigo-650 dark:file:text-indigo-400 bg-slate-55 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-1 px-2 cursor-pointer outline-none" 
                                                                            />
                                                                            <span class="text-xs text-slate-350 self-center font-bold">atau</span>
                                                                            <input 
                                                                                v-model="newArchiveForms[course.id].link_url"
                                                                                type="url"
                                                                                placeholder="https://..."
                                                                                class="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-indigo-500 outline-none"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <button 
                                                                        @click="uploadArchive(course.id)"
                                                                        :disabled="newArchiveForms[course.id].processing"
                                                                        class="px-5 h-[36px] self-end shrink-0 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 hover:scale-102 transition-all active:scale-98 disabled:opacity-60"
                                                                    >
                                                                        <span v-if="newArchiveForms[course.id].processing">...</span>
                                                                        <span v-else>+ Tambah</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Neural Portfolio Banner at the bottom -->
                        <Link :href="route('study.portfolio')" class="group relative flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 bg-white dark:bg-slate-900 overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all shadow-md hover:shadow-indigo-500/5 hover:-translate-y-0.5 duration-300">
                            <div class="flex items-center gap-6 mb-4 sm:mb-0">
                                <div class="h-14 w-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 group-hover:scale-105 transition-transform">
                                    <Sparkles class="h-7 w-7" />
                                </div>
                                <div class="text-center sm:text-left">
                                    <h3 class="text-slate-800 dark:text-white font-black text-lg mb-0.5">Neural Portfolio</h3>
                                    <p class="text-slate-500 dark:text-slate-450 text-xs max-w-xl">{{ $t('study_portfolio_banner_desc') }}</p>
                                </div>
                            </div>
                            <div class="bg-slate-50 dark:bg-slate-850 px-5 py-2.5 rounded-xl text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center gap-2 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                {{ $t('study_explore_ai_space') }} <ChevronRight class="h-4 w-4" />
                            </div>
                        </Link>

                    </div>

                </div>
            </div>
        </template>

        <!-- ============================================== -->
        <!-- SETUP & SETTINGS MODAL -->
        <!-- ============================================== -->
        <Teleport to="body">
            <div v-if="showSetupModal" class="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                <div class="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 transform animate-in zoom-in-95 duration-300 relative overflow-hidden flex flex-col max-h-[90vh]">
                    <div class="bg-indigo-600 p-6 text-center relative shrink-0">
                        <button @click="showSetupModal = false" class="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                            <X class="h-5 w-5" />
                        </button>
                        <GraduationCap class="h-12 w-12 text-white/90 mx-auto mb-2" />
                        <h2 class="text-2xl font-black text-white">{{ $t('study_profile_title') }}</h2>
                    </div>
                    
                    <form @submit.prevent="submitSetup" class="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                        <div>
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-2">{{ $t('study_edu_level_label') }}</label>
                            <select v-model="setupForm.education_level" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="kuliah">{{ $t('study_edu_level_uni') }}</option>
                                <option value="sma">{{ $t('study_edu_level_hs') }}</option>
                                <option value="smp">{{ $t('study_edu_level_ms') }}</option>
                                <option value="sd">{{ $t('study_edu_level_es') }}</option>
                                <option value="lainnya">{{ $t('study_edu_level_other') }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-2">{{ $t('study_major_label') }}</label>
                            <input v-model="setupForm.major" type="text" :placeholder="$t('study_major_placeholder')" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-2">{{ $t('study_student_id_label') }}</label>
                                <input v-model="setupForm.student_id" type="text" :placeholder="$t('study_student_id_placeholder')" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-2">{{ $t('study_semester_label') }}</label>
                                <input v-model="setupForm.current_semester" type="number" min="1" max="20" placeholder="1" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>

                        <button type="submit" :disabled="setupForm.processing" class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 mt-2">
                            {{ $t('study_save_start') }}
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>

        <!-- ============================================== -->
        <!-- CUSTOM ADD SEMESTER MODAL -->
        <!-- ============================================== -->
        <Teleport to="body">
            <div v-if="isAddSemesterModalOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <div class="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 dark:border-slate-800 transform animate-in zoom-in-95 duration-300 relative">
                    <button @click="isAddSemesterModalOpen = false" class="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                        <X class="h-5 w-5" />
                    </button>
                    
                    <div class="mb-6">
                        <h3 class="text-xl font-black text-slate-800 dark:text-white">{{ $t('study_add_new_semester_title', 'Tambah Semester Baru') }}</h3>
                        <p class="text-xs text-slate-500 mt-1">{{ $t('study_add_new_semester_text', 'Masukkan angka semester yang ingin ditambahkan (Misal: 7)') }}</p>
                    </div>

                    <form @submit.prevent="submitNewSemester" class="space-y-4">
                        <div>
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">{{ terms.semester }} *</label>
                            <input v-model="newSemesterValue" type="number" min="1" max="50" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <button type="submit" class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-lg transition-all mt-2">
                            {{ $t('study_continue', 'Lanjut') }}
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>

    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #1e293b; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #334155; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
