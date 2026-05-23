<script setup>
import { ref, computed } from 'vue';
import { trans } from 'laravel-vue-i18n';
import { Head, useForm, router, Link } from '@inertiajs/vue3';
import { 
    Trash2, BookOpen, Plus, PlusCircle, ArrowLeft, FileText, 
    ExternalLink, X, Upload, ChevronDown, ChevronUp, GraduationCap, 
    School, Book, Sparkles, ChevronRight, Download, Link2 
} from 'lucide-vue-next';

const props = defineProps({
    academicRecords: { type: Array, default: () => [] },
    academicStats: { type: Object, default: () => ({ ipk: 0, total_sks: 0, current_semester: 1, semesters: [] }) },
    user: { type: Object, required: true }
});

// --- Dynamic Terminology & Setup Wizard ---
const userSettings = computed(() => props.user.settings || {});
const localEduLevel = ref(null);
const eduLevel = computed(() => localEduLevel.value || userSettings.value.education_level);
const showSetupModal = computed(() => !eduLevel.value);

const setupForm = useForm({ education_level: '' });

const submitSetup = (level) => {
    localEduLevel.value = level;
    setupForm.education_level = level;
    setupForm.post(route('study.academic.setup'), { preserveScroll: true, preserveState: true });
};

const termMap = {
    kuliah: { semester: 'Semester', course: 'Mata Kuliah', sks: 'SKS', grade: 'Nilai Grade', meeting: 'Pertemuan', ipk: 'IPK', ips: 'IPS', total_sks: 'Total SKS' },
    sma: { semester: 'Kelas', course: 'Mata Pelajaran', sks: 'Jam Pelajaran (JP)', grade: 'Skor Akhir', meeting: 'Bab / Topik', ipk: 'Rata-rata Total', ips: 'Rata-rata Kelas', total_sks: 'Total JP' },
    smp: { semester: 'Kelas', course: 'Mata Pelajaran', sks: 'Jam Pelajaran (JP)', grade: 'Skor Akhir', meeting: 'Bab / Topik', ipk: 'Rata-rata Total', ips: 'Rata-rata Kelas', total_sks: 'Total JP' },
    sd: { semester: 'Kelas', course: 'Pelajaran', sks: 'Bobot', grade: 'Nilai', meeting: 'Tema', ipk: 'Rata-rata Total', ips: 'Rata-rata Kelas', total_sks: 'Total Bobot' },
    lainnya: { semester: 'Level', course: 'Subjek', sks: 'Bobot', grade: 'Skor', meeting: 'Bagian', ipk: 'Total Score', ips: 'Level Score', total_sks: 'Total Bobot' }
};

const terms = computed(() => termMap[eduLevel.value || 'kuliah']);

// --- Semester Selection Logic ---
const availableSemesters = computed(() => {
    let sems = props.academicStats.semesters.map(s => s.semester);
    for(let i=1; i<=8; i++) { if(!sems.includes(i)) sems.push(i); }
    return sems.sort((a,b) => a - b);
});

const selectedSemester = ref(props.academicStats.current_semester || 1);

const filteredCourses = computed(() => {
    return props.academicRecords.filter(r => r.semester === selectedSemester.value);
});

const currentSemesterStats = computed(() => {
    return props.academicStats.semesters.find(s => s.semester === selectedSemester.value) || { ips: 0, total_sks: 0 };
});

const changeSemester = (sem) => {
    selectedSemester.value = sem;
    form.semester = sem;
};

// --- Course Form Logic ---
const isAddCourseModalOpen = ref(false);
const form = useForm({
    course_name: '',
    semester: selectedSemester.value,
    sks: '',
    grade: ''
});

const submitCourse = () => {
    form.post(route('study.academic.store'), {
        preserveScroll: true,
        onSuccess: () => {
            form.course_name = '';
            form.sks = '';
            form.grade = '';
            isAddCourseModalOpen.value = false;
        },
    });
};

const deleteRecord = (id) => {
    if (confirm(trans('study_delete_course_confirm', { course: terms.value.course }))) {
        router.delete(route('study.academic.destroy', id), { preserveScroll: true, preserveState: true });
        // if deleting the currently open course, close it
        if (selectedCourse.value && selectedCourse.value.id === id) {
            closeCourse();
        }
    }
};

// --- Level 2 (Course Detail) Logic ---
const selectedCourse = ref(null);
const activeMeeting = ref(1);

const openCourse = (course) => {
    selectedCourse.value = course;
    activeMeeting.value = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const closeCourse = () => {
    selectedCourse.value = null;
};

// Make sure selectedCourse remains reactive with new archives added
// We can use a computed property that finds the course from props to keep it reactive
const activeCourseReactive = computed(() => {
    if (!selectedCourse.value) return null;
    return props.academicRecords.find(r => r.id === selectedCourse.value.id) || null;
});

// --- Archive Upload Logic ---
const archiveForm = useForm({
    academic_record_id: '',
    file: null,
    link_url: '',
    meeting_tag: '',
    type: 'Modul'
});

const submitArchive = (meetingNum) => {
    if (!activeCourseReactive.value) return;
    archiveForm.academic_record_id = activeCourseReactive.value.id;
    archiveForm.meeting_tag = terms.value.meeting + ' ' + meetingNum;
    
    archiveForm.post(route('study.academic.archive.store'), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            archiveForm.reset('file', 'link_url');
        },
    });
};

const deleteArchive = (id) => {
    if (confirm(trans('study_delete_confirm_desc') || 'Hapus arsip ini?')) {
        router.delete(route('study.academic.archive.destroy', id), { preserveScroll: true, preserveState: true });
    }
};

const meetings = Array.from({length: 14}, (_, i) => i + 1);

const getArchivesForMeeting = (course, meetingNum) => {
    if (!course || !course.archives) return [];
    return course.archives.filter(a => a.meeting_tag === (terms.value.meeting + ' ' + meetingNum));
};

const getTypeColor = (type) => {
    if (type === 'Modul') return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
    if (type === 'Soal') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    if (type === 'Jawaban') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
    return 'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-400 border-slate-200 dark:border-slate-800';
};
</script>

<template>
    <Head :title="$t('study_academic_binder_title', 'Academic Binder')" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors font-sans">
        
        <!-- SETUP WIZARD MODAL -->
        <div v-if="showSetupModal" class="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div class="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 dark:border-slate-800 transform animate-in zoom-in-95 duration-300 relative">
                <button @click="submitSetup('kuliah')" class="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors" :title="$t('study_skip', 'Lewati')">
                    <X class="h-5 w-5" />
                </button>
                <div class="h-20 w-20 mx-auto mb-6 bg-indigo-500/10 rounded-[1.5rem] flex items-center justify-center">
                    <GraduationCap class="h-10 w-10 text-indigo-500" />
                </div>
                <h2 class="text-2xl font-black text-center text-slate-800 dark:text-white mb-2">{{ $t('study_setup_title', 'Pilih Jenjang Pendidikan') }}</h2>
                <p class="text-sm text-center text-slate-500 mb-8 max-w-sm mx-auto">{{ $t('study_setup_desc', 'Istilah (Semester, Matkul, SKS) akan disesuaikan otomatis agar Anda lebih nyaman menggunakan fitur ini.') }}</p>
                
                <div class="space-y-3">
                    <button @click="submitSetup('kuliah')" class="w-full p-4 flex items-center gap-4 bg-slate-50 dark:bg-slate-950 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl group transition-all hover:scale-[1.02]">
                        <GraduationCap class="h-6 w-6 text-slate-400 group-hover:text-indigo-500" />
                        <div class="text-left flex-1">
                            <h4 class="font-bold text-slate-800 dark:text-slate-200">{{ $t('study_setup_uni', 'Universitas / Perguruan Tinggi') }}</h4>
                            <p class="text-[10px] text-slate-500">{{ $t('study_setup_uni_desc', 'Semester, SKS, Mata Kuliah, IPK') }}</p>
                        </div>
                    </button>
                    <button @click="submitSetup('sma')" class="w-full p-4 flex items-center gap-4 bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl group transition-all hover:scale-[1.02]">
                        <School class="h-6 w-6 text-slate-400 group-hover:text-emerald-500" />
                        <div class="text-left flex-1">
                            <h4 class="font-bold text-slate-800 dark:text-slate-200">{{ $t('study_setup_hs', 'SMA / SMK / Sederajat') }}</h4>
                            <p class="text-[10px] text-slate-500">{{ $t('study_setup_hs_desc', 'Kelas, JP, Mata Pelajaran, Rata-rata') }}</p>
                        </div>
                    </button>
                    <button @click="submitSetup('smp')" class="w-full p-4 flex items-center gap-4 bg-slate-50 dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl group transition-all hover:scale-[1.02]">
                        <School class="h-6 w-6 text-slate-400 group-hover:text-blue-500" />
                        <div class="text-left flex-1">
                            <h4 class="font-bold text-slate-800 dark:text-slate-200">{{ $t('study_setup_ms', 'SMP / Sederajat') }}</h4>
                            <p class="text-[10px] text-slate-500">{{ $t('study_setup_hs_desc', 'Kelas, JP, Mata Pelajaran, Rata-rata') }}</p>
                        </div>
                    </button>
                    <button @click="submitSetup('sd')" class="w-full p-4 flex items-center gap-4 bg-slate-50 dark:bg-slate-950 hover:bg-amber-50 dark:hover:bg-amber-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl group transition-all hover:scale-[1.02]">
                        <Book class="h-6 w-6 text-slate-400 group-hover:text-amber-500" />
                        <div class="text-left flex-1">
                            <h4 class="font-bold text-slate-800 dark:text-slate-200">{{ $t('study_setup_es', 'SD / Sederajat') }}</h4>
                            <p class="text-[10px] text-slate-500">{{ $t('study_setup_es_desc', 'Kelas, Bobot, Pelajaran, Rata-rata') }}</p>
                        </div>
                    </button>
                    <button @click="submitSetup('lainnya')" class="w-full p-4 text-center bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        {{ $t('study_setup_other', 'Lainnya / Sistem Kustom Internasional') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- ============================================== -->
        <!-- LEVEL 1: DASHBOARD UTAMA (MATKUL) -->
        <!-- ============================================== -->
        <template v-if="!activeCourseReactive">
            <!-- Header -->
            <header class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-5 sticky top-0 z-40 shadow-sm">
                <div class="max-w-7xl mx-auto flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <Link :href="route('home')" class="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-600 dark:text-slate-300" :title="$t('study_back', 'Kembali')">
                            <ArrowLeft class="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 class="text-2xl font-black text-slate-800 dark:text-white leading-tight">{{ $t('study_academic_binder_title', 'Academic Binder') }}</h1>
                            <p class="text-xs font-bold text-indigo-500 uppercase tracking-widest">{{ $t('study_academic_subtitle', 'Ruang Arsip Pembelajaran') }}</p>
                        </div>
                    </div>
                    
                    <!-- Global Stats -->
                    <div class="hidden sm:flex items-center gap-6 bg-slate-50 dark:bg-slate-950 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                        <div class="text-right">
                            <p class="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">{{ terms.total_sks }}</p>
                            <p class="text-lg font-black text-slate-800 dark:text-slate-200 leading-none">{{ props.academicStats.total_sks }}</p>
                        </div>
                        <div class="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                        <div class="text-right">
                            <p class="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">{{ terms.ipk }}</p>
                            <p class="text-lg font-black text-indigo-600 dark:text-indigo-400 leading-none">{{ props.academicStats.ipk.toFixed(2) }}</p>
                        </div>
                    </div>
                </div>
            </header>

            <div class="max-w-7xl mx-auto px-4 py-8">
                <!-- Neural Portfolio Banner -->
                <Link :href="route('study.portfolio')" class="group relative flex items-center justify-between p-6 bg-gradient-to-r from-slate-900 to-slate-800 overflow-hidden rounded-[2rem] border border-slate-800 transition-all hover:border-indigo-500/50 shadow-2xl mb-10 hover:-translate-y-1">
                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div class="relative z-10 flex items-center gap-5">
                        <div class="h-14 w-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                            <Sparkles class="h-7 w-7" />
                        </div>
                        <div>
                            <h3 class="text-white font-black text-xl mb-1">{{ $t('study_neural_portfolio_title', 'Neural Portfolio') }}</h3>
                            <p class="text-slate-400 text-sm hidden sm:block max-w-xl">{{ $t('study_neural_portfolio_desc', 'Unggah karya Anda dan biarkan AI merangkai portofolio kompetensi publik yang memukau.') }}</p>
                        </div>
                    </div>
                    <div class="relative z-10 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl text-white font-bold text-sm flex items-center gap-2 group-hover:bg-indigo-500 transition-colors">
                        <span class="hidden md:inline">{{ $t('study_neural_portfolio_open', 'Masuk Ruang AI') }}</span>
                        <ChevronRight class="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>

                <!-- Semester Tabs -->
                <div class="flex items-center gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
                    <button v-for="sem in availableSemesters" :key="sem" @click="changeSemester(sem)"
                        class="px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap border"
                        :class="selectedSemester === sem 
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/25 scale-105' 
                            : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'">
                        {{ terms.semester }} {{ sem }}
                    </button>
                </div>

                <!-- Main Course Grid -->
                <div>
                    <div class="flex items-end justify-between mb-6">
                        <h2 class="text-xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                            <BookOpen class="h-6 w-6 text-indigo-500" />
                            {{ $t('study_list', 'Daftar') }} {{ terms.course }}
                        </h2>
                        <div class="text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 shadow-sm flex items-center gap-3">
                            <span>{{ terms.ips }}: <span class="text-indigo-600 dark:text-indigo-400 text-sm ml-1">{{ currentSemesterStats.ips.toFixed(2) }}</span></span>
                            <div class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                            <span>{{ terms.total_sks }}: <span class="text-emerald-600 dark:text-emerald-400 text-sm ml-1">{{ currentSemesterStats.total_sks }}</span></span>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        
                        <!-- Cards List -->
                        <div v-for="record in filteredCourses" :key="record.id" 
                            @click="openCourse(record)"
                            class="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 rounded-[2rem] p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden flex flex-col justify-between min-h-[180px]">
                            
                            <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent dark:from-indigo-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div class="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-50 dark:bg-indigo-900/20 group-hover:scale-150 transition-transform duration-700 ease-out z-0"></div>

                            <div class="relative z-10 flex justify-between items-start mb-6">
                                <h5 class="text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors pr-8 leading-tight line-clamp-3">{{ record.course_name }}</h5>
                                <button @click.stop="deleteRecord(record.id)" class="text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors p-2 absolute right-0 top-0 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                                    <Trash2 class="h-4 w-4" />
                                </button>
                            </div>
                            
                            <div class="relative z-10 flex justify-between items-end mt-auto">
                                <div class="flex flex-col gap-1">
                                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{{ terms.sks }}: <span class="text-slate-600 dark:text-slate-300">{{ record.sks }}</span></span>
                                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{{ terms.grade }}: <span class="text-emerald-600 dark:text-emerald-400 text-xs">{{ record.grade }}</span></span>
                                </div>
                                <div class="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-2 rounded-xl flex items-center gap-1.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <FileText class="h-4 w-4" /> {{ record.archives?.length || 0 }}
                                </div>
                            </div>
                        </div>

                        <!-- Add Course Button Card -->
                        <button @click="isAddCourseModalOpen = true" class="relative bg-slate-50/50 dark:bg-slate-900/20 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 rounded-[2rem] p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group min-h-[180px]">
                            <div class="h-14 w-14 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                <Plus class="h-6 w-6 text-slate-400 group-hover:text-white" />
                            </div>
                            <span class="text-sm font-black text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {{ $t('study_add_in', 'Tambah di') }} {{ terms.semester }} {{ selectedSemester }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- MODAL TAMBAH MATKUL -->
            <div v-if="isAddCourseModalOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <div class="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 dark:border-slate-800 transform animate-in zoom-in-95 duration-300 relative">
                    <button @click="isAddCourseModalOpen = false" class="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                        <X class="h-5 w-5" />
                    </button>
                    
                    <div class="mb-6">
                        <div class="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 mb-4">
                            <PlusCircle class="h-6 w-6" />
                        </div>
                        <h3 class="text-xl font-black text-slate-800 dark:text-white">{{ $t('study_add_in', 'Tambah di') }} {{ terms.semester }} {{ selectedSemester }}</h3>
                        <p class="text-xs text-slate-500">{{ $t('study_fill_details', 'Lengkapi detail') }} {{ terms.course.toLowerCase() }} {{ $t('study_below', 'di bawah ini.') }}</p>
                    </div>

                    <form @submit.prevent="submitCourse" class="space-y-4">
                        <div>
                            <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{{ $t('study_name', 'Nama') }} {{ terms.course }} *</label>
                            <input v-model="form.course_name" type="text" required
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition shadow-sm" />
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{{ terms.sks }} *</label>
                                <input v-model="form.sks" type="number" min="1" max="20" required
                                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition shadow-sm" />
                            </div>
                            <div>
                                <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{{ terms.grade }} *</label>
                                <input v-model="form.grade" type="number" step="0.01" min="0" max="100" required
                                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition shadow-sm" />
                            </div>
                        </div>

                        <button type="submit" :disabled="form.processing"
                            class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-lg shadow-indigo-500/25 transition-all mt-4 hover:-translate-y-0.5">
                            {{ $t('study_save', 'Simpan') }} {{ terms.course }}
                        </button>
                    </form>
                </div>
            </div>
        </template>

        <!-- ============================================== -->
        <!-- LEVEL 2: RUANG KELAS (COURSE DETAIL) -->
        <!-- ============================================== -->
        <template v-else>
            <!-- Course Header Banner -->
            <header class="bg-indigo-600 dark:bg-indigo-900 px-6 py-10 sm:py-14 relative overflow-hidden">
                <!-- Decorative background elements -->
                <div class="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div class="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl"></div>
                
                <div class="max-w-7xl mx-auto relative z-10">
                    <button @click="closeCourse" class="mb-6 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white text-xs font-bold transition-colors w-max">
                        <ArrowLeft class="h-4 w-4" /> {{ $t('study_back_to_dashboard', 'Kembali ke Daftar') }}
                    </button>
                    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div class="flex items-center gap-3 mb-3">
                                <span class="bg-indigo-500/50 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-white/20">{{ terms.semester }} {{ activeCourseReactive.semester }}</span>
                                <span class="bg-white/10 text-indigo-100 text-[10px] font-bold px-3 py-1 rounded-lg backdrop-blur-sm">{{ activeCourseReactive.sks }} {{ terms.sks }}</span>
                                <span class="bg-emerald-500/30 text-emerald-50 text-[10px] font-bold px-3 py-1 rounded-lg border border-emerald-500/30">{{ terms.grade }}: {{ activeCourseReactive.grade }}</span>
                            </div>
                            <h1 class="text-3xl sm:text-5xl font-black text-white leading-tight mb-2 max-w-3xl">{{ activeCourseReactive.course_name }}</h1>
                        </div>
                        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white min-w-[160px]">
                            <p class="text-[10px] font-bold uppercase tracking-widest text-indigo-200 mb-1">{{ $t('study_total_archive', 'Total Arsip') }}</p>
                            <p class="text-3xl font-black flex items-center gap-3">
                                {{ activeCourseReactive.archives?.length || 0 }} <FileText class="h-6 w-6 text-indigo-300 opacity-50" />
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Course Content Split -->
            <div class="max-w-7xl mx-auto px-4 -mt-8 relative z-20 flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
                
                <!-- Left Sidebar: Meetings Navigation -->
                <div class="w-full lg:w-1/4 shrink-0">
                    <div class="bg-white dark:bg-slate-900 rounded-[2rem] p-5 shadow-xl border border-slate-200 dark:border-slate-800 lg:sticky lg:top-24 max-h-none lg:max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col">
                        <h3 class="font-black text-slate-800 dark:text-white mb-4 px-2 flex items-center gap-2">
                            <BookOpen class="h-5 w-5 text-indigo-500" /> {{ $t('study_meetings', 'Daftar Pertemuan') }}
                        </h3>
                        <!-- Horizontal on mobile, vertical on desktop -->
                        <div class="flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-2 lg:gap-1 pr-2 pb-2 lg:pb-0 custom-scrollbar">
                            <button v-for="meetingNum in meetings" :key="meetingNum" 
                                @click="activeMeeting = meetingNum"
                                class="shrink-0 lg:w-full text-left px-5 py-3 rounded-2xl transition-all flex items-center justify-between group"
                                :class="activeMeeting === meetingNum ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-50 dark:bg-slate-950 lg:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'">
                                <span class="font-bold text-sm whitespace-nowrap">{{ terms.meeting }} {{ meetingNum }}</span>
                                <span v-if="getArchivesForMeeting(activeCourseReactive, meetingNum).length > 0" class="text-[10px] font-black px-2 py-0.5 rounded-full ml-3"
                                      :class="activeMeeting === meetingNum ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50'">
                                    {{ getArchivesForMeeting(activeCourseReactive, meetingNum).length }}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Right Main Content: Meeting Details -->
                <div class="w-full lg:w-3/4 space-y-6">
                    
                    <!-- Upload File Box -->
                    <div class="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500">
                                <Upload class="h-5 w-5" />
                            </div>
                            <div>
                                <h3 class="font-black text-lg text-slate-800 dark:text-white">{{ $t('study_add_file', 'Tambah File / Link') }}</h3>
                                <p class="text-xs text-slate-500 font-semibold">{{ $t('study_for', 'Untuk') }} {{ terms.meeting }} {{ activeMeeting }}</p>
                            </div>
                        </div>

                        <form @submit.prevent="submitArchive(activeMeeting)" class="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                            <div class="flex-1 w-full space-y-4">
                                <div class="flex gap-3">
                                    <select v-model="archiveForm.type" class="w-1/3 px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow shadow-sm cursor-pointer">
                                        <option value="Modul">📖 {{ $t('study_module', 'Modul') }}</option>
                                        <option value="Soal">📝 {{ $t('study_question', 'Soal') }}</option>
                                        <option value="Jawaban">✅ {{ $t('study_answer', 'Jawaban') }}</option>
                                        <option value="Referensi">🔗 {{ $t('study_reference', 'Referensi') }}</option>
                                    </select>
                                    <input @input="archiveForm.file = $event.target.files[0]" type="file" accept=".pdf"
                                        class="w-2/3 text-xs file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 dark:file:bg-indigo-900/40 dark:file:text-indigo-300 dark:hover:file:bg-indigo-900/60 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer" />
                                </div>
                                <div>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                            <Link2 class="h-4 w-4 text-slate-400" />
                                        </div>
                                        <input v-model="archiveForm.link_url" type="url" :placeholder="$t('study_paste_link', 'Atau paste link eksternal...')"
                                            class="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow shadow-sm" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" :disabled="archiveForm.processing"
                                class="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 whitespace-nowrap disabled:opacity-50">
                                {{ $t('study_upload', 'Upload') }}
                            </button>
                        </form>
                    </div>

                    <!-- Archives Display Grid -->
                    <div class="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 min-h-[40vh]">
                        <div class="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <h3 class="font-black text-xl text-slate-800 dark:text-white">
                                {{ $t('study_archive', 'Arsip') }} {{ terms.meeting }} {{ activeMeeting }}
                            </h3>
                            <span class="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                                {{ getArchivesForMeeting(activeCourseReactive, activeMeeting).length }} {{ $t('study_item', 'item') }}
                            </span>
                        </div>

                        <div v-if="getArchivesForMeeting(activeCourseReactive, activeMeeting).length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div v-for="arc in getArchivesForMeeting(activeCourseReactive, activeMeeting)" :key="arc.id" 
                                class="group relative p-5 bg-slate-50 hover:bg-white dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700">
                                
                                <div class="flex items-start justify-between gap-4">
                                    <div class="flex-1 min-w-0">
                                        <span class="inline-block px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider mb-2" :class="getTypeColor(arc.type)">
                                            {{ arc.type }}
                                        </span>
                                        <p class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate" :title="arc.file_name || arc.link_url">
                                            {{ arc.file_name || arc.link_url || 'Arsip Tanpa Nama' }}
                                        </p>
                                    </div>
                                    <button @click="deleteArchive(arc.id)" class="text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors p-2 shrink-0 opacity-0 group-hover:opacity-100">
                                        <Trash2 class="h-4 w-4" />
                                    </button>
                                </div>
                                
                                <div class="flex items-center gap-2 mt-auto">
                                    <a v-if="arc.file_path" :href="'/storage/' + arc.file_path" target="_blank" class="flex-1 flex justify-center items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 rounded-xl transition-colors">
                                        <FileText class="h-4 w-4" /> {{ $t('study_open_pdf', 'Buka PDF') }}
                                    </a>
                                    <a v-if="arc.link_url" :href="arc.link_url" target="_blank" class="flex-1 flex justify-center items-center gap-2 px-3 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400 rounded-xl transition-colors">
                                        <ExternalLink class="h-4 w-4" /> {{ $t('study_open_link', 'Buka Link') }}
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div v-else class="text-center py-16 text-slate-400">
                            <div class="h-20 w-20 mx-auto bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                                <FileText class="h-10 w-10 text-slate-300 dark:text-slate-600" />
                            </div>
                            <h4 class="text-lg font-black text-slate-600 dark:text-slate-300 mb-2">{{ $t('study_no_file_in', 'Belum ada file di') }} {{ terms.meeting }} {{ activeMeeting }}</h4>
                            <p class="text-sm">{{ $t('study_please_add', 'Gunakan form di atas untuk mengunggah modul atau menautkan referensi eksternal.') }}</p>
                        </div>
                    </div>

                </div>
            </div>
        </template>

    </div>
</template>
