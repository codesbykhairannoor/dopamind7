<script setup>
import { ref, computed } from 'vue';
import { trans } from 'laravel-vue-i18n';
import Swal from 'sweetalert2';
import { Head, useForm, router, Link } from '@inertiajs/vue3';
import { 
    Trash2, BookOpen, Plus, ArrowLeft, FileText, 
    ExternalLink, X, Upload, GraduationCap, 
    School, Book, Sparkles, ChevronRight, Link2, PlusCircle, FolderOpen, Calendar
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

const termMap = {
    kuliah: { semester: 'Semester', course: 'Mata Kuliah', sks: 'SKS', grade: 'Nilai/Grade', meeting: 'Materi / Pertemuan', ipk: 'IPK', ips: 'IPS', total_sks: 'Total SKS' },
    sma: { semester: 'Kelas', course: 'Mata Pelajaran', sks: 'JP', grade: 'Skor Akhir', meeting: 'Bab / Topik', ipk: 'Rata-rata Total', ips: 'Rata-rata Kelas', total_sks: 'Total JP' },
    smp: { semester: 'Kelas', course: 'Mata Pelajaran', sks: 'JP', grade: 'Skor Akhir', meeting: 'Bab / Topik', ipk: 'Rata-rata Total', ips: 'Rata-rata Kelas', total_sks: 'Total JP' },
    sd: { semester: 'Kelas', course: 'Pelajaran', sks: 'Bobot', grade: 'Nilai', meeting: 'Tema', ipk: 'Rata-rata Total', ips: 'Rata-rata Kelas', total_sks: 'Total Bobot' },
    lainnya: { semester: 'Level', course: 'Subjek', sks: 'Bobot', grade: 'Skor', meeting: 'Bagian', ipk: 'Total Score', ips: 'Level Score', total_sks: 'Total Bobot' }
};

const terms = computed(() => termMap[eduLevel.value]);


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

// --- Setup Modal Logic ---
const showSetupModal = ref(false);
const setupForm = useForm({ 
    education_level: 'kuliah',
    major: '',
    student_id: '',
    current_semester: 1
});

const openSetup = () => {
    showSetupModal.value = true;
};

const submitSetup = () => {
    if (!setupForm.education_level) {
        return fireToast('error', 'Pilih jenjang pendidikan terlebih dahulu!');
    }
    localEduLevel.value = setupForm.education_level;
    setupForm.post(route('study.academic.setup'), { 
        preserveScroll: true, 
        preserveState: true,
        onSuccess: () => {
            showSetupModal.value = false;
        }
    });
};

// --- Dashboard Logic (Semester Dropdown & Courses) ---
const maxSemesterAdded = ref(0);
const availableSemesters = computed(() => {
    const semsFromRecords = props.academicStats.semesters.map(s => s.semester);
    const semsFromSetup = parseInt(userSettings.value.current_semester) || 1;
    let maxSem = Math.max(semsFromSetup, maxSemesterAdded.value, ...semsFromRecords, 1);
    
    let sems = [];
    for(let i=1; i<=maxSem; i++) { sems.push(i); }
    return sems;
});

const selectedSemester = ref(userSettings.value.current_semester || 1);

const handleSemesterChange = (e) => {
    const val = e.target.value;
    if (val === 'tambah') {
        maxSemesterAdded.value = availableSemesters.value.length + 1;
        selectedSemester.value = maxSemesterAdded.value;
    } else {
        selectedSemester.value = parseInt(val);
    }
};

const filteredCourses = computed(() => {
    return props.academicRecords.filter(r => r.semester === selectedSemester.value);
});

// --- Course Form Logic ---
const isAddCourseModalOpen = ref(false);
const form = useForm({
    course_name: '',
    semester: 1, // dynamically updated before open
    sks: '',
    grade: ''
});

const openAddCourse = () => {
    form.semester = selectedSemester.value;
    form.course_name = '';
    form.sks = '';
    form.grade = '';
    isAddCourseModalOpen.value = false; // Reset first
    setTimeout(() => isAddCourseModalOpen.value = true, 50);
};

const submitCourse = () => {
    if (!form.course_name.trim()) {
        return fireToast('error', `Nama ${terms.value.course} tidak boleh kosong!`);
    }
    if (!form.sks || form.sks < 1) {
        return fireToast('error', `Harap isi ${terms.value.sks} dengan benar!`);
    }
    if (!form.grade || form.grade < 0) {
        return fireToast('error', `Harap isi target ${terms.value.grade} dengan benar!`);
    }
    form.post(route('study.academic.store'), {
        preserveScroll: true,
        onSuccess: () => {
            isAddCourseModalOpen.value = false;
        },
    });
};

const deleteRecord = (id) => {
    if (confirm(trans('study_delete_course_confirm', { course: terms.value.course }) || `Hapus ${terms.value.course} ini?`)) {
        router.delete(route('study.academic.destroy', id), { preserveScroll: true, preserveState: true });
        if (selectedCourse.value && selectedCourse.value.id === id) closeCourse();
    }
};

// --- Level 2 (Course Detail) Logic ---
const selectedCourse = ref(null);
const activeCourseReactive = computed(() => {
    if (!selectedCourse.value) return null;
    return props.academicRecords.find(r => r.id === selectedCourse.value.id) || null;
});

const openCourse = (course) => {
    selectedCourse.value = course;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const closeCourse = () => {
    selectedCourse.value = null;
};

// --- Archive Upload & Dynamic Meetings Logic ---
const isAddMeetingModalOpen = ref(false);
const archiveForm = useForm({
    academic_record_id: '',
    meeting_tag: '',
    file: null,
    link_url: '',
    type: 'Modul'
});

const openAddArchive = (prefillTag = '') => {
    archiveForm.reset();
    archiveForm.meeting_tag = prefillTag;
    archiveForm.type = 'Modul';
    isAddMeetingModalOpen.value = true;
};

const submitArchive = () => {
    if (!activeCourseReactive.value) return;
    if (!archiveForm.meeting_tag.trim()) {
        return fireToast('error', `Nama / Grup pertemuan tidak boleh kosong!`);
    }
    if (!archiveForm.file && !archiveForm.link_url.trim()) {
        return fireToast('error', `Anda harus mengunggah file atau menautkan link!`);
    }

    archiveForm.academic_record_id = activeCourseReactive.value.id;
    
    archiveForm.post(route('study.academic.archive.store'), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            isAddMeetingModalOpen.value = false;
        },
    });
};

const deleteArchive = (id) => {
    if (confirm(trans('study_delete_confirm_desc') || 'Hapus arsip ini?')) {
        router.delete(route('study.academic.archive.destroy', id), { preserveScroll: true, preserveState: true });
    }
};

// Extract unique meeting tags and group archives
const groupedArchives = computed(() => {
    if (!activeCourseReactive.value || !activeCourseReactive.value.archives) return {};
    const groups = {};
    activeCourseReactive.value.archives.forEach(arc => {
        const tag = arc.meeting_tag || 'Umum';
        if (!groups[tag]) groups[tag] = [];
        groups[tag].push(arc);
    });
    return groups;
});

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
        
        <!-- ============================================== -->
        <!-- STATE 1: EMPTY STATE & SETUP -->
        <!-- ============================================== -->
        <template v-if="!hasCompletedSetup">
            <div class="max-w-[1600px] w-full md:w-[95%] mx-auto px-4 sm:px-8 py-12">
                <div class="py-24 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 shadow-sm dark:shadow-none transition-all duration-500 max-w-4xl mx-auto mb-12">
                    <div class="flex flex-col items-center gap-5">
                        <span class="text-6xl animate-bounce mb-2">🎓</span>
                        <h4 class="text-2xl font-black text-slate-800 dark:text-slate-100 transition-colors duration-500">Profil Studi Belum Diatur</h4>
                        <p class="text-sm font-bold text-slate-400 dark:text-slate-500 px-8 max-w-lg mx-auto transition-colors duration-500 leading-relaxed">
                            Mulai organisasikan seluruh modul, tugas, dan target nilai Anda secara cerdas. Mari sesuaikan sistem ini dengan profil akademis Anda sekarang!
                        </p>
                        <button @click="openSetup" class="mt-4 bg-indigo-600 text-white font-black py-3.5 px-8 rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 active:scale-95 transition-all outline-none flex items-center gap-2">
                            Mulai Setup <ChevronRight class="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Portfolio Banner di Bagian Bawah Layar Kosong -->
            <div class="max-w-[1600px] w-full md:w-[95%] mx-auto px-6 pb-12">
                <Link :href="route('study.portfolio')" class="group relative flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 bg-white dark:bg-slate-900 overflow-hidden rounded-[2.5rem] border-2 border-indigo-50 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                    <div class="flex items-center gap-6 mb-4 sm:mb-0">
                        <div class="h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                            <Sparkles class="h-8 w-8" />
                        </div>
                        <div class="text-center sm:text-left">
                            <h3 class="text-slate-800 dark:text-white font-black text-xl mb-1">Neural Portfolio</h3>
                            <p class="text-slate-500 dark:text-slate-400 text-sm max-w-xl">Bangun portofolio publik elegan menggunakan AI. Bagikan pencapaian Anda ke dunia profesional.</p>
                        </div>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-xl text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center gap-2 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                        Jelajahi Ruang AI <ChevronRight class="h-5 w-5" />
                    </div>
                </Link>
            </div>

            <!-- SETUP WIZARD MODAL -->
            <Teleport to="body">
            <div v-if="showSetupModal" class="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                <div class="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 transform animate-in zoom-in-95 duration-300 relative overflow-hidden flex flex-col max-h-[90vh]">
                    <div class="bg-indigo-600 p-6 text-center relative shrink-0">
                        <button @click="showSetupModal = false" class="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                            <X class="h-5 w-5" />
                        </button>
                        <GraduationCap class="h-12 w-12 text-white/90 mx-auto mb-2" />
                        <h2 class="text-2xl font-black text-white">Profil Studi</h2>
                    </div>
                    
                    <form @submit.prevent="submitSetup" class="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                        <div>
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-2">Jenjang Pendidikan *</label>
                            <select v-model="setupForm.education_level" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="kuliah">University / College / Perguruan Tinggi</option>
                                <option value="sma">High School / SMA / Sederajat</option>
                                <option value="smp">Middle School / SMP / Sederajat</option>
                                <option value="sd">Primary School / SD / Sederajat</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-2">Jurusan / Konsentrasi / Fokus Studi</label>
                            <input v-model="setupForm.major" type="text" placeholder="Misal: Teknik Informatika" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-2">Student ID / NIM / NIS (Opsional)</label>
                                <input v-model="setupForm.student_id" type="text" placeholder="No. Induk" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-2">Semester Berapa?</label>
                                <input v-model="setupForm.current_semester" type="number" min="1" max="20" placeholder="1" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>

                        <button type="submit" :disabled="setupForm.processing" class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 mt-2">
                            Simpan & Mulai
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>
        </template>

        <!-- ============================================== -->
        <!-- STATE 2: DASHBOARD (SEMESTER & DAFTAR MATKUL) -->
        <!-- ============================================== -->
        <template v-else-if="!activeCourseReactive">
            <!-- Header Khusus Study Console -->
            <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-sm">
                <div class="max-w-[1600px] w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <div class="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                            <BookOpen class="h-6 w-6" />
                        </div>
                        <div>
                            <h1 class="text-xl font-black text-slate-800 dark:text-white leading-tight">Academic Binder</h1>
                            <p class="text-xs font-bold text-slate-500">{{ userSettings.major || terms.course }} &bull; {{ userSettings.student_id || '-' }}</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-wrap sm:flex-nowrap items-center gap-3">
                        <!-- Dropdown Semester Dinamis -->
                        <div class="relative w-full sm:w-auto min-w-[180px]">
                            <select :value="selectedSemester" @change="handleSemesterChange" class="w-full pl-10 pr-10 py-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-indigo-600 dark:text-indigo-400 appearance-none outline-none cursor-pointer transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                <option v-for="sem in availableSemesters" :key="sem" :value="sem">{{ terms.semester }} {{ sem }}</option>
                                <option disabled>──────────</option>
                                <option value="tambah">+ Tambah {{ terms.semester }} Baru</option>
                            </select>
                            <Calendar class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-500 pointer-events-none" />
                            <ChevronDown class="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>

                        <!-- Button Tambah Matkul -->
                        <button @click="openAddCourse" class="w-full sm:w-auto px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap">
                            <Plus class="h-5 w-5" /> Tambah {{ terms.course }}
                        </button>
                    </div>
                </div>
            </header>

            <div class="max-w-[1600px] w-full md:w-[95%] mx-auto px-4 sm:px-8 py-8">
                <!-- Banner Portfolio di Bawah Header -->
                <Link :href="route('study.portfolio')" class="group relative flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 overflow-hidden rounded-2xl border border-slate-800 transition-all hover:border-indigo-500/50 shadow-lg mb-8 hover:-translate-y-0.5">
                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div class="relative z-10 flex items-center gap-4">
                        <div class="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform border border-indigo-500/30">
                            <Sparkles class="h-5 w-5" />
                        </div>
                        <h3 class="text-white font-bold text-sm sm:text-base tracking-wide">Neural Portfolio <span class="hidden sm:inline text-slate-400 font-normal ml-2">&mdash; Publikasikan karya akademis Anda</span></h3>
                    </div>
                    <ChevronRight class="relative z-10 h-5 w-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div class="flex items-end justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <h2 class="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
                        <FolderOpen class="h-5 w-5 text-slate-400" />
                        Daftar {{ terms.course }} di {{ terms.semester }} {{ selectedSemester }}
                    </h2>
                </div>

                <!-- Grid Mata Kuliah -->
                <div v-if="filteredCourses.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div v-for="record in filteredCourses" :key="record.id" 
                        @click="openCourse(record)"
                        class="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 rounded-[2rem] p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden flex flex-col justify-between min-h-[180px]">
                        
                        <div class="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-50 dark:bg-indigo-900/20 group-hover:scale-150 transition-transform duration-700 ease-out z-0"></div>

                        <div class="relative z-10 flex justify-between items-start mb-6">
                            <h5 class="text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors pr-8 leading-tight">{{ record.course_name }}</h5>
                            <button @click.stop="deleteRecord(record.id)" class="text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors p-2 absolute right-0 top-0 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                                <Trash2 class="h-4 w-4" />
                            </button>
                        </div>
                        
                        <div class="relative z-10 flex justify-between items-end mt-auto">
                            <div class="flex flex-col gap-1">
                                <span class="text-[10px] font-bold text-slate-400 capitalize tracking-wide">{{ terms.sks }}: <span class="text-slate-600 dark:text-slate-300">{{ record.sks }}</span></span>
                                <span class="text-[10px] font-bold text-slate-400 capitalize tracking-wide">{{ terms.grade }}: <span class="text-emerald-600 dark:text-emerald-400 text-xs">{{ record.grade }}</span></span>
                            </div>
                            <div class="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-2 rounded-xl flex items-center gap-1.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <FileText class="h-4 w-4" /> {{ record.archives?.length || 0 }}
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem]">
                    <div class="h-16 w-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <FolderOpen class="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 class="text-lg font-black text-slate-600 dark:text-slate-300 mb-1">Belum ada data {{ terms.course }}</h3>
                    <p class="text-sm text-slate-500 mb-6">Mulai tambahkan mata kuliah untuk {{ terms.semester }} {{ selectedSemester }} ini.</p>
                    <button @click="openAddCourse" class="px-6 py-2.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 rounded-full font-bold transition-colors">
                        Tambah {{ terms.course }} Pertama
                    </button>
                </div>
            </div>

            <!-- MODAL TAMBAH MATKUL -->
            <Teleport to="body">
            <div v-if="isAddCourseModalOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <div class="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 dark:border-slate-800 transform animate-in zoom-in-95 duration-300 relative">
                    <button @click="isAddCourseModalOpen = false" class="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                        <X class="h-5 w-5" />
                    </button>
                    
                    <div class="mb-6">
                        <h3 class="text-xl font-black text-slate-800 dark:text-white">Tambah Data Baru</h3>
                        <p class="text-xs font-bold text-indigo-500 capitalize tracking-wide mt-1">Untuk {{ terms.semester }} {{ selectedSemester }}</p>
                    </div>

                    <form @submit.prevent="submitCourse" class="space-y-4">
                        <div>
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">Nama {{ terms.course }} *</label>
                            <input v-model="form.course_name" type="text" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">{{ terms.sks }} *</label>
                                <input v-model="form.sks" type="number" min="1" max="20" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">{{ terms.grade }} Target / Akhir *</label>
                                <input v-model="form.grade" type="number" step="0.01" min="0" max="100" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>
                        <button type="submit" :disabled="form.processing" class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-lg transition-all mt-2">
                            Simpan Data
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>
        </template>

        <!-- ============================================== -->
        <!-- STATE 3: RUANG KELAS / DETAIL MATKUL -->
        <!-- ============================================== -->
        <template v-else>
            <!-- Header Mode Kelas -->
            <header class="bg-indigo-600 dark:bg-indigo-900 px-4 sm:px-8 pt-8 pb-16 sm:pb-24 relative overflow-hidden">
                <div class="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div class="max-w-[1600px] w-full md:w-[95%] mx-auto relative z-10">
                    <button @click="closeCourse" class="mb-6 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white text-xs font-bold transition-colors w-max">
                        <ArrowLeft class="h-4 w-4" /> Kembali
                    </button>
                    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div class="flex items-center gap-3 mb-3">
                                <span class="bg-indigo-500/50 text-white text-[10px] font-black capitalize tracking-wide px-3 py-1 rounded-lg border border-white/20">{{ terms.semester }} {{ activeCourseReactive.semester }}</span>
                                <span class="bg-white/10 text-indigo-100 text-[10px] font-bold px-3 py-1 rounded-lg">{{ activeCourseReactive.sks }} {{ terms.sks }}</span>
                            </div>
                            <h1 class="text-3xl sm:text-5xl font-black text-white leading-tight mb-2 max-w-4xl">{{ activeCourseReactive.course_name }}</h1>
                        </div>
                        <div class="shrink-0">
                            <!-- Tombol Input Pertemuan Baru (Dinamis) -->
                            <button @click="openAddArchive('')" class="px-6 py-4 bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl font-black shadow-xl transition-transform hover:scale-105 flex items-center gap-3">
                                <PlusCircle class="h-5 w-5" /> Input {{ terms.meeting }} Baru
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Tampilan Kartu Blok Pertemuan (Dinamis) -->
            <div class="max-w-[1600px] w-full md:w-[95%] mx-auto px-4 sm:px-8 -mt-8 sm:-mt-12 relative z-20 space-y-6 pb-20">
                
                <div v-if="Object.keys(groupedArchives).length === 0" class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 text-center border border-slate-200 dark:border-slate-800 shadow-xl">
                    <div class="h-20 w-20 mx-auto bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                        <FolderOpen class="h-10 w-10 text-slate-300" />
                    </div>
                    <h3 class="text-2xl font-black text-slate-700 dark:text-slate-200 mb-2">Kelas Masih Kosong</h3>
                    <p class="text-slate-500 max-w-md mx-auto">Klik tombol <strong>"Input {{ terms.meeting }} Baru"</strong> di atas untuk mulai membuat grup materi. Anda bebas menamai grup pertemuan sesuka hati.</p>
                </div>

                <!-- Iterate unique meeting tags as Blocks -->
                <div v-for="(archives, groupTag) in groupedArchives" :key="groupTag" class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
                    <!-- Header Blok Pertemuan -->
                    <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <h3 class="font-black text-lg text-slate-800 dark:text-white flex items-center gap-3">
                            <BookOpen class="h-5 w-5 text-indigo-500" /> {{ groupTag }}
                        </h3>
                        <button @click="openAddArchive(groupTag)" class="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                            <Plus class="h-3 w-3" /> Tambah File
                        </button>
                    </div>

                    <!-- Isi File dalam Grup Ini -->
                    <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div v-for="arc in archives" :key="arc.id" class="group relative p-4 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col transition-all hover:border-indigo-300 hover:shadow-md">
                            <div class="flex items-start justify-between gap-3 mb-4">
                                <div class="flex-1 min-w-0">
                                    <span class="inline-block px-2 py-0.5 rounded-md text-[9px] font-black capitalize tracking-wide mb-2" :class="getTypeColor(arc.type)">{{ arc.type }}</span>
                                    <p class="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">{{ arc.file_name || arc.link_url || 'Arsip Tanpa Nama' }}</p>
                                </div>
                                <button @click="deleteArchive(arc.id)" class="text-slate-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 shrink-0">
                                    <Trash2 class="h-4 w-4" />
                                </button>
                            </div>
                            <div class="mt-auto">
                                <a v-if="arc.file_path" :href="'/storage/' + arc.file_path" target="_blank" class="w-full flex justify-center items-center gap-2 px-3 py-2.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-xl transition-colors">
                                    <FileText class="h-4 w-4" /> Buka PDF
                                </a>
                                <a v-if="arc.link_url" :href="arc.link_url" target="_blank" class="w-full flex justify-center items-center gap-2 px-3 py-2.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl transition-colors">
                                    <ExternalLink class="h-4 w-4" /> Kunjungi Link
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL INPUT PERTEMUAN / FILE BARU -->
            <Teleport to="body">
            <div v-if="isAddMeetingModalOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <div class="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 dark:border-slate-800 transform animate-in zoom-in-95 duration-300 relative">
                    <button @click="isAddMeetingModalOpen = false" class="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 transition-colors">
                        <X class="h-5 w-5" />
                    </button>
                    
                    <div class="mb-6 flex items-center gap-4">
                        <div class="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500">
                            <Upload class="h-6 w-6" />
                        </div>
                        <div>
                            <h3 class="text-xl font-black text-slate-800 dark:text-white">Input Materi</h3>
                            <p class="text-xs text-slate-500">{{ activeCourseReactive.course_name }}</p>
                        </div>
                    </div>

                    <form @submit.prevent="submitArchive" class="space-y-5">
                        <div>
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">Nama / Grup Pertemuan *</label>
                            <input v-model="archiveForm.meeting_tag" type="text" :placeholder="'Misal: ' + terms.meeting + ' 1 - Pengantar'" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="col-span-2 sm:col-span-1">
                                <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">Jenis Konten</label>
                                <select v-model="archiveForm.type" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none">
                                    <option value="Modul">Modul / Materi</option>
                                    <option value="Soal">Tugas / Soal</option>
                                    <option value="Jawaban">Jawaban / Pembahasan</option>
                                    <option value="Referensi">Referensi Eksternal</option>
                                    <option value="Catatan">Catatan Singkat</option>
                                </select>
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">Upload PDF</label>
                                <input @input="archiveForm.file = $event.target.files[0]" type="file" accept=".pdf" class="w-full text-xs file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-indigo-100 file:text-indigo-700 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-1.5 px-2 cursor-pointer" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-1.5">Atau Tautkan Link Web</label>
                            <div class="relative">
                                <Link2 class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input v-model="archiveForm.link_url" type="url" placeholder="https://..." class="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>

                        <button type="submit" :disabled="archiveForm.processing" class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-lg transition-all mt-4">
                            Upload & Simpan
                        </button>
                    </form>
                </div>
            </div>
            </Teleport>
        </template>
    </div>
</template>
