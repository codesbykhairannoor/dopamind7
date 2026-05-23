<script setup>
import { ref, computed } from 'vue';
import { Head, useForm, router, Link } from '@inertiajs/vue3';
import { Trash2, BookOpen, PlusCircle, ArrowLeft, FileText, ExternalLink, X, Upload, ChevronDown, ChevronUp } from 'lucide-vue-next';

const props = defineProps({
    academicRecords: { type: Array, default: () => [] },
    academicStats: { type: Object, default: () => ({ ipk: 0, total_sks: 0, current_semester: 1, semesters: [] }) },
    user: { type: Object, required: true }
});

// --- Semester Selection Logic ---
// We extract available semesters from the stats, or default to [1,2,3,4,5,6,7,8]
const availableSemesters = computed(() => {
    let sems = props.academicStats.semesters.map(s => s.semester);
    for(let i=1; i<=8; i++) {
        if(!sems.includes(i)) sems.push(i);
    }
    return sems.sort((a,b) => a - b);
});

// State for globally selected semester
const selectedSemester = ref(props.academicStats.current_semester || 1);

// Computed list of courses for the selected semester
const filteredCourses = computed(() => {
    return props.academicRecords.filter(r => r.semester === selectedSemester.value);
});

// Get stats for the selected semester
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

// Sync form semester when selectedSemester changes
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
    if (confirm('Yakin ingin menghapus mata kuliah ini? Semua arsip di dalamnya akan ikut terhapus.')) {
        router.delete(route('study.academic.destroy', id), { preserveScroll: true });
    }
};

// --- Drawer & Pertemuan Logic ---
const selectedCourse = ref(null);
const isDrawerOpen = ref(false);
const expandedMeeting = ref(null); // Track which meeting accordion is open

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
    archiveForm.meeting_tag = 'Pertemuan ' + meetingNum;
    
    archiveForm.post(route('study.academic.archive.store'), {
        preserveScroll: true,
        onSuccess: () => {
            archiveForm.reset('file', 'link_url');
        },
    });
};

const deleteArchive = (id) => {
    if (confirm('Hapus arsip ini?')) {
        router.delete(route('study.academic.archive.destroy', id), { preserveScroll: true });
    }
};

// Array of 14 meetings
const meetings = Array.from({length: 14}, (_, i) => i + 1);

const getArchivesForMeeting = (course, meetingNum) => {
    if (!course || !course.archives) return [];
    return course.archives.filter(a => a.meeting_tag === ('Pertemuan ' + meetingNum));
};

const getTypeColor = (type) => {
    if (type === 'Modul') return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
    if (type === 'Soal') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    if (type === 'Jawaban') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
    return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200 dark:border-slate-800';
};
</script>

<template>
    <Head title="Academic Binder" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors">
        <!-- Header -->
        <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
            <div class="flex items-center gap-4">
                <Link :href="route('study.index')" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                    <ArrowLeft class="h-5 w-5" />
                </Link>
                <div>
                    <h1 class="text-xl font-black text-slate-800 dark:text-white">Academic Binder</h1>
                    <p class="text-xs font-bold text-emerald-500 uppercase tracking-widest">Ruang Arsip Kuliah</p>
                </div>
            </div>
            
            <!-- Global Stats (IPK & SKS) -->
            <div class="flex items-center gap-4 bg-slate-100 dark:bg-slate-950 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div class="text-right">
                    <p class="text-[9px] uppercase tracking-widest font-bold text-slate-400">Total SKS</p>
                    <p class="text-sm font-black text-slate-800 dark:text-slate-200">{{ props.academicStats.total_sks }}</p>
                </div>
                <div class="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                <div class="text-right">
                    <p class="text-[9px] uppercase tracking-widest font-bold text-slate-400">IPK</p>
                    <p class="text-sm font-black text-indigo-600 dark:text-indigo-400">{{ props.academicStats.ipk.toFixed(2) }}</p>
                </div>
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 py-8 space-y-8">
            
            <!-- Semester Selector -->
            <div class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-2 shadow-sm flex flex-wrap gap-2 justify-center">
                <button v-for="sem in availableSemesters" :key="sem" @click="changeSemester(sem)"
                    class="px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border"
                    :class="selectedSemester === sem 
                        ? 'bg-emerald-500 text-white border-emerald-400 shadow-md transform scale-105' 
                        : 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent'">
                    Semester {{ sem }}
                </button>
            </div>

            <!-- MAIN CONTENT FOR SELECTED SEMESTER -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <!-- Left: Form Tambah Matkul -->
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <h3 class="text-lg font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                            <PlusCircle class="h-5 w-5 text-indigo-500" />
                            Tambah di Sem {{ selectedSemester }}
                        </h3>
                        
                        <form @submit.prevent="submitCourse" class="space-y-4">
                            <div>
                                <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Nama Mata Kuliah *</label>
                                <input v-model="form.course_name" type="text" required
                                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition" />
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">SKS *</label>
                                    <input v-model="form.sks" type="number" min="1" max="10" required
                                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition" />
                                </div>
                                <div>
                                    <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Nilai (0-100) *</label>
                                    <input v-model="form.grade" type="number" step="0.01" min="0" max="100" required
                                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition" />
                                </div>
                            </div>

                            <button type="submit" :disabled="form.processing"
                                class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-colors mt-2">
                                Simpan Matkul
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Right: Daftar Matkul Grid -->
                <div class="lg:col-span-2">
                    <div class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm min-h-[500px]">
                        <div class="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                            <h3 class="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <BookOpen class="h-5 w-5 text-emerald-500" />
                                Daftar Mata Kuliah
                            </h3>
                            <div class="text-xs font-bold text-slate-500 flex gap-4">
                                <span>IPS Sem {{ selectedSemester }}: <span class="text-indigo-600 dark:text-indigo-400">{{ currentSemesterStats.ips.toFixed(2) }}</span></span>
                                <span>Total SKS: <span class="text-emerald-600 dark:text-emerald-400">{{ currentSemesterStats.total_sks }}</span></span>
                            </div>
                        </div>
                        
                        <div v-if="filteredCourses.length === 0" class="py-12 text-center text-slate-500 flex flex-col items-center justify-center h-64">
                            <div class="text-5xl mb-4 opacity-50">📂</div>
                            <p class="text-base font-semibold">Semester {{ selectedSemester }} Masih Kosong</p>
                            <p class="text-xs mt-2 max-w-xs">Silakan tambahkan mata kuliah di form sebelah kiri untuk mulai menyimpan arsip.</p>
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
                                        <span>SKS: {{ record.sks }}</span>
                                        <span class="text-emerald-500">Grade: {{ record.grade }}</span>
                                    </div>
                                    <div class="text-[10px] font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800/50 flex items-center gap-1 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                        <FileText class="h-3 w-3" /> {{ record.archives?.length || 0 }} Arsip
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
                        <p class="text-[10px] uppercase tracking-widest font-black text-emerald-500 mb-1">Mata Kuliah Semester {{ selectedCourse.semester }}</p>
                        <h3 class="text-xl font-black text-slate-800 dark:text-white leading-tight pr-4">{{ selectedCourse.course_name }}</h3>
                        <p class="text-xs text-slate-400 mt-1 font-semibold">Total {{ selectedCourse.archives?.length || 0 }} arsip tersimpan</p>
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
                                <h4 class="text-sm font-black text-slate-800 dark:text-slate-200">Pertemuan {{ meetingNum }}</h4>
                            </div>
                            <div class="flex items-center gap-3">
                                <!-- Badge for items count -->
                                <span v-if="getArchivesForMeeting(selectedCourse, meetingNum).length > 0" class="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-md">
                                    {{ getArchivesForMeeting(selectedCourse, meetingNum).length }} item
                                </span>
                                <ChevronDown v-if="expandedMeeting !== meetingNum" class="h-4 w-4 text-slate-400" />
                                <ChevronUp v-else class="h-4 w-4 text-indigo-500" />
                            </div>
                        </button>

                        <!-- Accordion Body -->
                        <div v-show="expandedMeeting === meetingNum" class="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                            
                            <!-- List of Archives in this Meeting -->
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
                                            <FileText class="h-3 w-3" /> Lihat PDF
                                        </a>
                                        <a v-if="arc.link_url" :href="arc.link_url" target="_blank" class="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-500 hover:text-blue-500 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 rounded-lg transition-colors">
                                            <ExternalLink class="h-3 w-3" /> Buka Link
                                        </a>
                                        <button @click="deleteArchive(arc.id)" class="px-2 py-1 text-[10px] font-bold text-slate-500 hover:text-red-500 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 rounded-lg transition-colors">
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                                <div v-if="getArchivesForMeeting(selectedCourse, meetingNum).length === 0" class="text-center py-4">
                                    <p class="text-[10px] font-bold text-slate-400">Belum ada file di Pertemuan ini.</p>
                                </div>
                            </div>

                            <!-- Upload Form for this meeting -->
                            <div class="bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-3">
                                <h5 class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider flex items-center gap-1">
                                    <Upload class="h-3 w-3" /> Tambah File ke Pert. {{ meetingNum }}
                                </h5>
                                <form @submit.prevent="submitArchive(meetingNum)" class="space-y-2">
                                    <div class="flex gap-2">
                                        <select v-model="archiveForm.type" class="w-1/3 px-2 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-indigo-500">
                                            <option value="Modul">📖 Modul</option>
                                            <option value="Soal">📝 Soal</option>
                                            <option value="Jawaban">✅ Jawaban</option>
                                            <option value="Referensi">🔗 Referensi</option>
                                        </select>
                                        <input @input="archiveForm.file = $event.target.files[0]" type="file" accept=".pdf"
                                            class="w-2/3 text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200" />
                                    </div>
                                    <div>
                                        <input v-model="archiveForm.link_url" type="url" placeholder="Atau paste link eksternal (Drive/Notion)"
                                            class="w-full px-2 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px]" />
                                    </div>
                                    <button type="submit" :disabled="archiveForm.processing"
                                        class="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold rounded-lg transition-colors mt-1">
                                        Upload
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