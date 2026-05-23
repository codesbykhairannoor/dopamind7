<script setup>
import { ref, computed } from 'vue';
import { trans } from 'laravel-vue-i18n';
import { Head, useForm, router, Link } from '@inertiajs/vue3';
import { Trash2, BookOpen, PlusCircle, ArrowLeft, FileText, ExternalLink, X, Upload, ChevronDown, ChevronUp, GraduationCap, School, Book, Sparkles, ChevronRight } from 'lucide-vue-next';

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

const setupForm = useForm({
    education_level: ''
});

const submitSetup = (level) => {
    localEduLevel.value = level;
    setupForm.education_level = level;
    setupForm.post(route('study.academic.setup'), { 
        preserveScroll: true, 
        preserveState: true 
    });
};


const termMap = {
    kuliah: {
        semester: 'Semester',
        course: 'Mata Kuliah',
        sks: 'SKS',
        grade: 'Nilai Grade',
        meeting: 'Pertemuan',
        ipk: 'IPK',
        ips: 'IPS',
        total_sks: 'Total SKS'
    },
    sma: {
        semester: 'Kelas',
        course: 'Mata Pelajaran',
        sks: 'Jam Pelajaran (JP)',
        grade: 'Skor Akhir',
        meeting: 'Bab / Topik',
        ipk: 'Rata-rata Total',
        ips: 'Rata-rata Kelas',
        total_sks: 'Total JP'
    },
    smp: {
        semester: 'Kelas',
        course: 'Mata Pelajaran',
        sks: 'Jam Pelajaran (JP)',
        grade: 'Skor Akhir',
        meeting: 'Bab / Topik',
        ipk: 'Rata-rata Total',
        ips: 'Rata-rata Kelas',
        total_sks: 'Total JP'
    },
    sd: {
        semester: 'Kelas',
        course: 'Pelajaran',
        sks: 'Bobot',
        grade: 'Nilai',
        meeting: 'Tema',
        ipk: 'Rata-rata Total',
        ips: 'Rata-rata Kelas',
        total_sks: 'Total Bobot'
    },
    lainnya: {
        semester: 'Level',
        course: 'Subjek',
        sks: 'Bobot',
        grade: 'Skor',
        meeting: 'Bagian',
        ipk: 'Total Score',
        ips: 'Level Score',
        total_sks: 'Total Bobot'
    }
};

const terms = computed(() => termMap[eduLevel.value || 'kuliah']);

// --- Semester Selection Logic ---
const availableSemesters = computed(() => {
    let sems = props.academicStats.semesters.map(s => s.semester);
    for(let i=1; i<=8; i++) {
        if(!sems.includes(i)) sems.push(i);
    }
    return sems.sort((a,b) => a - b);
});

const selectedSemester = ref(props.academicStats.current_semester || 1);

const filteredCourses = computed(() => {
    return props.academicRecords.filter(r => r.semester === selectedSemester.value);
});

const currentSemesterStats = computed(() => {
    return props.academicStats.semesters.find(s => s.semester === selectedSemester.value) || { ips: 0, total_sks: 0 };
});

// --- Course Form Logic ---
const form = useForm({
    course_name: '',
    semester: selectedSemester.value,
    sks: '',
    grade: ''
});

const changeSemester = (sem) => {
    selectedSemester.value = sem;
    form.semester = sem;
};

const submitCourse = () => {
    form.post(route('study.academic.store'), {
        preserveScroll: true,
        onSuccess: () => {
            form.course_name = '';
            form.sks = '';
            form.grade = '';
        },
    });
};

const deleteRecord = (id) => {
    if (confirm(trans('study_delete_course_confirm', { course: terms.value.course }))) {
        router.delete(route('study.academic.destroy', id), { preserveScroll: true });
    }
};

// --- Drawer & Pertemuan Logic ---
const selectedCourse = ref(null);
const isDrawerOpen = ref(false);
const expandedMeeting = ref(null); 

const openDrawer = (course) => {
    selectedCourse.value = course;
    isDrawerOpen.value = true;
};

const closeDrawer = () => {
    isDrawerOpen.value = false;
    setTimeout(() => { selectedCourse.value = null; expandedMeeting.value = null; }, 300);
};

const toggleMeeting = (meetingNum) => {
    expandedMeeting.value = expandedMeeting.value === meetingNum ? null : meetingNum;
};

const archiveForm = useForm({
    academic_record_id: '',
    file: null,
    link_url: '',
    meeting_tag: '',
    type: 'Modul'
});

const submitArchive = (meetingNum) => {
    if (!selectedCourse.value) return;
    archiveForm.academic_record_id = selectedCourse.value.id;
    archiveForm.meeting_tag = terms.value.meeting + ' ' + meetingNum;
    
    archiveForm.post(route('study.academic.archive.store'), {
        preserveScroll: true,
        onSuccess: () => {
            archiveForm.reset('file', 'link_url');
        },
    });
};

const deleteArchive = (id) => {
    if (confirm(trans('study_delete_confirm_desc') || 'Hapus arsip ini?')) {
        router.delete(route('study.academic.archive.destroy', id), { preserveScroll: true });
    }
};

const meetings = Array.from({length: 14}, (_, i) => i + 1);

const getArchivesForMeeting = (course, meetingNum) => {
    if (!course || !course.archives) return [];
    return course.archives.filter(a => a.meeting_tag === (terms.value.meeting + ' ' + meetingNum));
};

const getTypeColor = (type) => {
    if (type === 'Modul') return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
    if (type === 'Soal') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    if (type === 'Jawaban') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
    return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200 dark:border-slate-800';
};
</script>

<template>
    <Head :title="$t('study_academic_binder_title', 'Academic Binder')" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors">
        
        <!-- SETUP WIZARD MODAL -->
        <div v-if="showSetupModal" class="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div class="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2rem] shadow-2xl p-8 border border-slate-200 dark:border-slate-800 transform animate-in zoom-in-95 duration-300">
                <div class="h-20 w-20 mx-auto mb-6 bg-indigo-500/20 rounded-[1.5rem] flex items-center justify-center">
                    <GraduationCap class="h-10 w-10 text-indigo-500" />
                </div>
                <h2 class="text-2xl font-black text-center text-slate-800 dark:text-white mb-2">{{ $t('study_setup_title', 'Pilih Jenjang Pendidikan') }}</h2>
                <p class="text-sm text-center text-slate-500 mb-8 max-w-sm mx-auto">{{ $t('study_setup_desc', 'Istilah (Semester, Matkul, SKS) akan disesuaikan otomatis agar Anda lebih nyaman menggunakan fitur ini.') }}</p>
                
                <div class="space-y-3">
                    <button @click="submitSetup('kuliah')" class="w-full p-4 flex items-center gap-4 bg-slate-50 dark:bg-slate-950 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl group transition-colors">
                        <GraduationCap class="h-6 w-6 text-slate-400 group-hover:text-indigo-500" />
                        <div class="text-left flex-1">
                            <h4 class="font-bold text-slate-800 dark:text-slate-200">{{ $t('study_setup_uni', 'Universitas / Perguruan Tinggi') }}</h4>
                            <p class="text-[10px] text-slate-500">{{ $t('study_setup_uni_desc', 'Semester, SKS, Mata Kuliah, IPK') }}</p>
                        </div>
                    </button>
                    <button @click="submitSetup('sma')" class="w-full p-4 flex items-center gap-4 bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl group transition-colors">
                        <School class="h-6 w-6 text-slate-400 group-hover:text-emerald-500" />
                        <div class="text-left flex-1">
                            <h4 class="font-bold text-slate-800 dark:text-slate-200">{{ $t('study_setup_hs', 'SMA / SMK / Sederajat') }}</h4>
                            <p class="text-[10px] text-slate-500">{{ $t('study_setup_hs_desc', 'Kelas, JP, Mata Pelajaran, Rata-rata') }}</p>
                        </div>
                    </button>
                    <button @click="submitSetup('smp')" class="w-full p-4 flex items-center gap-4 bg-slate-50 dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl group transition-colors">
                        <School class="h-6 w-6 text-slate-400 group-hover:text-blue-500" />
                        <div class="text-left flex-1">
                            <h4 class="font-bold text-slate-800 dark:text-slate-200">{{ $t('study_setup_ms', 'SMP / Sederajat') }}</h4>
                            <p class="text-[10px] text-slate-500">{{ $t('study_setup_hs_desc', 'Kelas, JP, Mata Pelajaran, Rata-rata') }}</p>
                        </div>
                    </button>
                    <button @click="submitSetup('sd')" class="w-full p-4 flex items-center gap-4 bg-slate-50 dark:bg-slate-950 hover:bg-amber-50 dark:hover:bg-amber-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl group transition-colors">
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

        <!-- Header -->
        <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
            <div class="flex items-center gap-4">
                <Link :href="route('home')" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500" :title="$t('study_back', 'Kembali')">
                    <ArrowLeft class="h-5 w-5" />
                </Link>
                <div>
                    <h1 class="text-xl font-black text-slate-800 dark:text-white">{{ $t('study_academic_binder_title', 'Academic Binder') }}</h1>
                    <p class="text-xs font-bold text-emerald-500 uppercase tracking-widest">{{ $t('study_academic_subtitle', 'Ruang Arsip Pembelajaran') }}</p>
                </div>
            </div>
            
            <!-- Global Stats -->
            <div class="flex items-center gap-4 bg-slate-100 dark:bg-slate-950 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div class="text-right">
                    <p class="text-[9px] uppercase tracking-widest font-bold text-slate-400">{{ terms.total_sks }}</p>
                    <p class="text-sm font-black text-slate-800 dark:text-slate-200">{{ props.academicStats.total_sks }}</p>
                </div>
                <div class="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                <div class="text-right">
                    <p class="text-[9px] uppercase tracking-widest font-bold text-slate-400">{{ terms.ipk }}</p>
                    <p class="text-sm font-black text-indigo-600 dark:text-indigo-400">{{ props.academicStats.ipk.toFixed(2) }}</p>
                </div>
            </div>
        </header>

        
        <div class="max-w-7xl mx-auto px-4 pt-8 pb-4">
            <!-- Neural Portfolio Banner -->
            <Link :href="route('study.portfolio')" class="group relative flex items-center justify-between p-6 bg-slate-900 overflow-hidden rounded-[2rem] border border-slate-800 transition-all hover:border-indigo-500/50 shadow-xl">
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="relative z-10 flex items-center gap-4">
                    <div class="h-12 w-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <Sparkles class="h-6 w-6" />
                    </div>
                    <div>
                        <h3 class="text-white font-black text-lg">{{ $t('study_neural_portfolio_title', 'Neural Portfolio') }}</h3>
                        <p class="text-slate-400 text-xs hidden md:block">{{ $t('study_neural_portfolio_desc', 'Unggah karya Anda dan biarkan AI merangkai portofolio kompetensi publik yang memukau.') }}</p>
                    </div>
                </div>
                <div class="relative z-10 text-indigo-400 group-hover:translate-x-2 transition-transform font-bold text-sm flex items-center gap-2">
                    <span class="hidden md:inline">{{ $t('study_neural_portfolio_open', 'Masuk Ruang AI') }}</span>
                    <ChevronRight class="h-5 w-5" />
                </div>
            </Link>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-4 space-y-8">

            
            <!-- Semester Selector -->
            <div class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-2 shadow-sm flex flex-wrap gap-2 justify-center">
                <button v-for="sem in availableSemesters" :key="sem" @click="changeSemester(sem)"
                    class="px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border"
                    :class="selectedSemester === sem 
                        ? 'bg-emerald-500 text-white border-emerald-400 shadow-md transform scale-105' 
                        : 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent'">
                    {{ terms.semester }} {{ sem }}
                </button>
            </div>

            <!-- MAIN CONTENT FOR SELECTED SEMESTER -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <!-- Left: Form Tambah Matkul -->
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <h3 class="text-lg font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                            <PlusCircle class="h-5 w-5 text-indigo-500" />
                            {{ $t('study_add_in', 'Tambah di') }} {{ terms.semester }} {{ selectedSemester }}
                        </h3>
                        
                        <form @submit.prevent="submitCourse" class="space-y-4">
                            <div>
                                <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{{ $t('study_name', 'Nama') }} {{ terms.course }} *</label>
                                <input v-model="form.course_name" type="text" required
                                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition" />
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{{ terms.sks }} *</label>
                                    <input v-model="form.sks" type="number" min="1" max="10" required
                                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition" />
                                </div>
                                <div>
                                    <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{{ terms.grade }} *</label>
                                    <input v-model="form.grade" type="number" step="0.01" min="0" max="100" required
                                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition" />
                                </div>
                            </div>

                            <button type="submit" :disabled="form.processing"
                                class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-colors mt-2">
                                {{ $t('study_save', 'Simpan') }} {{ terms.course }}
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Right: {{ $t('study_list', 'Daftar') }} Matkul Grid -->
                <div class="lg:col-span-2">
                    <div class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm min-h-[500px]">
                        <div class="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                            <h3 class="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <BookOpen class="h-5 w-5 text-emerald-500" />
                                {{ $t('study_list', 'Daftar') }} {{ terms.course }}
                            </h3>
                            <div class="text-xs font-bold text-slate-500 flex gap-4">
                                <span>{{ terms.ips }} {{ terms.semester }} {{ selectedSemester }}: <span class="text-indigo-600 dark:text-indigo-400">{{ currentSemesterStats.ips.toFixed(2) }}</span></span>
                                <span>{{ terms.total_sks }}: <span class="text-emerald-600 dark:text-emerald-400">{{ currentSemesterStats.total_sks }}</span></span>
                            </div>
                        </div>
                        
                        <div v-if="filteredCourses.length === 0" class="py-12 text-center text-slate-500 flex flex-col items-center justify-center h-64">
                            <div class="text-5xl mb-4 opacity-50">📂</div>
                            <p class="text-base font-semibold">{{ terms.semester }} {{ selectedSemester }} {{ $t('study_is_empty', 'Masih Kosong') }}</p>
                            <p class="text-xs mt-2 max-w-xs">{{ $t('study_please_add', 'Silakan tambahkan') }} {{ terms.course.toLowerCase() }} {{ $t('study_to_start_saving', 'di form sebelah kiri untuk mulai menyimpan arsip.') }}</p>
                        </div>

                        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div v-for="record in filteredCourses" :key="record.id" 
                                @click="openDrawer(record)"
                                class="relative p-5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/50 dark:hover:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between cursor-pointer transition-all group overflow-hidden">
                                
                                <div class="absolute inset-0 bg-gradient-to-br from-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div class="relative z-10 flex justify-between items-start mb-4">
                                    <h5 class="text-md font-black text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 transition-colors pr-8 leading-tight">{{ record.course_name }}</h5>
                                    <button @click.stop="deleteRecord(record.id)" class="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors p-1.5 absolute right-0 top-0">
                                        <Trash2 class="h-4 w-4" />
                                    </button>
                                </div>
                                
                                <div class="relative z-10 flex justify-between items-end">
                                    <div class="flex gap-4 text-xs font-bold text-slate-400">
                                        <span>{{ terms.sks }}: {{ record.sks }}</span>
                                        <span class="text-emerald-500">{{ terms.grade }}: {{ record.grade }}</span>
                                    </div>
                                    <div class="text-[10px] font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800/50 flex items-center gap-1 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                        <FileText class="h-3 w-3" /> {{ record.archives?.length || 0 }} {{ $t('study_archive', 'Arsip') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- DRAWER OVERLAY -->
        <div v-if="isDrawerOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity" @click="closeDrawer"></div>

        <!-- DRAWER PANEL: Pertemuan Accordions -->
        <div class="fixed inset-y-0 right-0 w-full max-w-md bg-slate-50 dark:bg-slate-950 shadow-2xl z-50 transform transition-transform duration-300 border-l border-slate-200 dark:border-slate-800 flex flex-col"
             :class="isDrawerOpen ? 'translate-x-0' : 'translate-x-full'">
            
            <div v-if="selectedCourse" class="flex-1 flex flex-col h-full overflow-hidden">
                <!-- Drawer Header -->
                <div class="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start bg-white dark:bg-slate-900 shadow-sm relative z-10">
                    <div>
                        <p class="text-[10px] uppercase tracking-widest font-black text-emerald-500 mb-1">{{ terms.course }} {{ terms.semester }} {{ selectedCourse.semester }}</p>
                        <h3 class="text-xl font-black text-slate-800 dark:text-white leading-tight pr-4">{{ selectedCourse.course_name }}</h3>
                        <p class="text-xs text-slate-400 mt-1 font-semibold">{{ $t('study_total', 'Total') }} {{ selectedCourse.archives?.length || 0 }} {{ $t('study_archives_saved', 'arsip tersimpan') }}</p>
                    </div>
                    <button @click="closeDrawer" class="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                        <X class="h-5 w-5" />
                    </button>
                </div>

                <!-- Drawer Body: Accordion Pertemuan -->
                <div class="flex-1 overflow-y-auto p-4 space-y-3 relative">
                    
                    <div v-for="meetingNum in meetings" :key="meetingNum" class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <!-- Accordion Header -->
                        <button @click="toggleMeeting(meetingNum)" class="w-full px-5 py-4 flex items-center justify-between bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div class="flex items-center gap-3">
                                <div class="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-black flex items-center justify-center text-xs">
                                    {{ meetingNum }}
                                </div>
                                <h4 class="text-sm font-black text-slate-800 dark:text-slate-200">{{ terms.meeting }} {{ meetingNum }}</h4>
                            </div>
                            <div class="flex items-center gap-3">
                                <span v-if="getArchivesForMeeting(selectedCourse, meetingNum).length > 0" class="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-md">
                                    {{ getArchivesForMeeting(selectedCourse, meetingNum).length }} {{ $t('study_item', 'item') }}
                                </span>
                                <ChevronDown v-if="expandedMeeting !== meetingNum" class="h-4 w-4 text-slate-400" />
                                <ChevronUp v-else class="h-4 w-4 text-indigo-500" />
                            </div>
                        </button>

                        <!-- Accordion Body -->
                        <div v-show="expandedMeeting === meetingNum" class="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                            
                            <div class="space-y-2 mb-4 mt-2">
                                <div v-for="arc in getArchivesForMeeting(selectedCourse, meetingNum)" :key="arc.id" 
                                    class="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col gap-2">
                                    
                                    <div class="flex items-start justify-between">
                                        <div class="flex items-center gap-2 overflow-hidden">
                                            <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase border" :class="getTypeColor(arc.type)">
                                                {{ arc.type }}
                                            </span>
                                            <p class="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate" :title="arc.file_name || arc.link_url">
                                                {{ arc.file_name || arc.link_url || 'Arsip' }}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center gap-1 justify-end">
                                        <a v-if="arc.file_path" :href="'/storage/' + arc.file_path" target="_blank" class="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-500 hover:text-emerald-500 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 rounded-lg transition-colors">
                                            <FileText class="h-3 w-3" /> {{ $t('study_open_pdf', 'Buka PDF') }}
                                        </a>
                                        <a v-if="arc.link_url" :href="arc.link_url" target="_blank" class="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-500 hover:text-blue-500 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 rounded-lg transition-colors">
                                            <ExternalLink class="h-3 w-3" /> {{ $t('study_open_link', 'Buka Link') }}
                                        </a>
                                        <button @click="deleteArchive(arc.id)" class="px-2 py-1 text-[10px] font-bold text-slate-500 hover:text-red-500 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 rounded-lg transition-colors">
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                                <div v-if="getArchivesForMeeting(selectedCourse, meetingNum).length === 0" class="text-center py-4">
                                    <p class="text-[10px] font-bold text-slate-400">{{ $t('study_no_file_in', 'Belum ada file di') }} {{ terms.meeting }} {{ $t('study_this', 'ini.') }}</p>
                                </div>
                            </div>

                            <!-- Upload Form -->
                            <div class="bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-3">
                                <h5 class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider flex items-center gap-1">
                                    <Upload class="h-3 w-3" /> {{ $t('study_add_file', 'Tambah File') }}
                                </h5>
                                <form @submit.prevent="submitArchive(meetingNum)" class="space-y-2">
                                    <div class="flex gap-2">
                                        <select v-model="archiveForm.type" class="w-1/3 px-2 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-indigo-500">
                                            <option value="Modul">📖 {{ $t('study_module', 'Modul') }}</option>
                                            <option value="Soal">📝 {{ $t('study_question', 'Soal') }}</option>
                                            <option value="Jawaban">✅ {{ $t('study_answer', 'Jawaban') }}</option>
                                            <option value="Referensi">🔗 {{ $t('study_reference', 'Referensi') }}</option>
                                        </select>
                                        <input @input="archiveForm.file = $event.target.files[0]" type="file" accept=".pdf"
                                            class="w-2/3 text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200" />
                                    </div>
                                    <div>
                                        <input v-model="archiveForm.link_url" type="url" :placeholder="$t('study_paste_link')"
                                            class="w-full px-2 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px]" />
                                    </div>
                                    <button type="submit" :disabled="archiveForm.processing"
                                        class="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold rounded-lg transition-colors mt-1">
                                        {{ $t('study_upload', 'Upload') }}
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>