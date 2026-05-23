<script setup>
import { ref, computed } from 'vue';
import { Head, useForm, router, Link } from '@inertiajs/vue3';
import { Trash2, BookOpen, PlusCircle, ArrowLeft, FileText, ExternalLink, X, Upload } from 'lucide-vue-next';

const props = defineProps({
    academicRecords: { type: Array, default: () => [] },
    academicStats: { type: Object, default: () => ({ ipk: 0, total_sks: 0, current_semester: 1, semesters: [] }) },
    user: { type: Object, required: true }
});

const form = useForm({
    course_name: '',
    semester: '',
    sks: '',
    grade: ''
});

const submitCourse = () => {
    form.post(route('study.academic.store'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
};

const deleteRecord = (id) => {
    if (confirm('Yakin ingin menghapus mata kuliah ini? Semua arsip di dalamnya akan ikut terhapus.')) {
        router.delete(route('study.academic.destroy', id), { preserveScroll: true });
    }
};

// --- Drawer Logic for Archives ---
const selectedCourse = ref(null);
const isDrawerOpen = ref(false);

const openDrawer = (course) => {
    selectedCourse.value = course;
    isDrawerOpen.value = true;
};

const closeDrawer = () => {
    isDrawerOpen.value = false;
    setTimeout(() => { selectedCourse.value = null; }, 300);
};

const archiveForm = useForm({
    academic_record_id: '',
    file: null,
    link_url: '',
    meeting_tag: ''
});

const submitArchive = () => {
    if (!selectedCourse.value) return;
    archiveForm.academic_record_id = selectedCourse.value.id;
    archiveForm.post(route('study.academic.archive.store'), {
        preserveScroll: true,
        onSuccess: () => {
            archiveForm.reset();
            // In a real app, you might want to refresh just the data or let Inertia handle it
        },
    });
};

const deleteArchive = (id) => {
    if (confirm('Hapus arsip ini?')) {
        router.delete(route('study.academic.archive.destroy', id), { preserveScroll: true });
    }
};
</script>

<template>
    <Head title="Academic Binder" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors">
        <!-- Header -->
        <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center gap-4 sticky top-0 z-40">
            <Link :href="route('study.index')" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                <ArrowLeft class="h-5 w-5" />
            </Link>
            <div>
                <h1 class="text-xl font-black text-slate-800 dark:text-white">Academic Binder</h1>
                <p class="text-xs font-bold text-emerald-500 uppercase tracking-widest">Ruang Arsip Kuliah</p>
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <!-- HERO CARDS -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- IPK Card -->
                <div class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 flex items-center gap-6 shadow-sm">
                    <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg text-white font-black text-2xl">
                        {{ props.academicStats.ipk.toFixed(2) }}
                    </div>
                    <div>
                        <p class="text-[10px] uppercase tracking-widest font-bold text-slate-400">Cumulative GPA (IPK)</p>
                        <h3 class="text-xl font-black text-slate-800 dark:text-slate-100 leading-tight">Prestasi Akademik</h3>
                    </div>
                </div>

                <!-- SKS Card -->
                <div class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 flex items-center gap-6 shadow-sm">
                    <div class="h-16 w-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center border border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 font-black text-2xl">
                        {{ props.academicStats.total_sks }}
                    </div>
                    <div>
                        <p class="text-[10px] uppercase tracking-widest font-bold text-slate-400">Total Credits</p>
                        <h3 class="text-xl font-black text-slate-800 dark:text-slate-100 leading-tight">SKS Ditempuh</h3>
                    </div>
                </div>

                <!-- Semester Card -->
                <div class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 flex items-center gap-6 shadow-sm">
                    <div class="h-16 w-16 rounded-2xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center border border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400 font-black text-2xl">
                        {{ props.academicStats.current_semester }}
                    </div>
                    <div>
                        <p class="text-[10px] uppercase tracking-widest font-bold text-slate-400">Current Position</p>
                        <h3 class="text-xl font-black text-slate-800 dark:text-slate-100 leading-tight">Semester Aktif</h3>
                    </div>
                </div>
            </div>

            <!-- MAIN CONTENT -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Form Card -->
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <h3 class="text-lg font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                            <PlusCircle class="h-5 w-5 text-indigo-500" />
                            Tambah Mata Kuliah
                        </h3>
                        
                        <form @submit.prevent="submitCourse" class="space-y-4">
                            <div>
                                <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Nama Mata Kuliah *</label>
                                <input v-model="form.course_name" type="text" required
                                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition" />
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Semester *</label>
                                    <input v-model="form.semester" type="number" min="1" max="14" required
                                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition" />
                                </div>
                                
                                <div>
                                    <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">SKS *</label>
                                    <input v-model="form.sks" type="number" min="1" max="10" required
                                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition" />
                                </div>
                            </div>

                            <div>
                                <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Nilai Grade (0-100) *</label>
                                <input v-model="form.grade" type="number" step="0.01" min="0" max="100" required
                                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 transition" />
                            </div>

                            <button type="submit" :disabled="form.processing"
                                class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-colors mt-2">
                                Simpan Matkul
                            </button>
                        </form>
                    </div>
                </div>

                <!-- List Card -->
                <div class="lg:col-span-2">
                    <div class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm min-h-[500px]">
                        <h3 class="text-lg font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                            <BookOpen class="h-5 w-5 text-emerald-500" />
                            Daftar Matkul & Folder Arsip
                        </h3>
                        
                        <div v-if="props.academicStats.semesters.length === 0" class="py-12 text-center text-slate-500">
                            <div class="text-4xl mb-4">📚</div>
                            <p class="text-sm font-semibold">Belum ada mata kuliah.</p>
                        </div>

                        <div v-else class="space-y-8">
                            <div v-for="group in props.academicStats.semesters" :key="group.semester" class="space-y-4">
                                <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                    <h4 class="text-md font-black text-slate-800 dark:text-slate-100">Semester {{ group.semester }}</h4>
                                    <div class="text-xs font-bold text-slate-500">
                                        <span class="mr-3">IPS: <span class="text-indigo-600 dark:text-indigo-400">{{ group.ips.toFixed(2) }}</span></span>
                                        <span>SKS: <span class="text-emerald-600 dark:text-emerald-400">{{ group.total_sks }}</span></span>
                                    </div>
                                </div>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div v-for="record in props.academicRecords.filter(r => r.semester === group.semester)" :key="record.id" 
                                        @click="openDrawer(record)"
                                        class="p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/50 dark:hover:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between cursor-pointer transition-all group">
                                        
                                        <div class="flex justify-between items-start mb-2">
                                            <h5 class="text-sm font-black text-slate-800 dark:text-slate-200 group-hover:text-indigo-500 transition-colors">{{ record.course_name }}</h5>
                                            <button @click.stop="deleteRecord(record.id)" class="text-slate-400 hover:text-red-500 transition-colors p-1">
                                                <Trash2 class="h-4 w-4" />
                                            </button>
                                        </div>
                                        
                                        <div class="flex justify-between items-end">
                                            <div class="flex gap-3 text-[10px] font-bold text-slate-400">
                                                <span>SKS: {{ record.sks }}</span>
                                                <span class="text-emerald-500">Grade: {{ record.grade }}</span>
                                            </div>
                                            <div class="text-[10px] font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">
                                                {{ record.archives?.length || 0 }} Arsip
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- DRAWER OVERLAY -->
        <div v-if="isDrawerOpen" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity" @click="closeDrawer"></div>

        <!-- DRAWER PANEL -->
        <div class="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 border-l border-slate-200 dark:border-slate-800 flex flex-col"
             :class="isDrawerOpen ? 'translate-x-0' : 'translate-x-full'">
            
            <div v-if="selectedCourse" class="flex-1 flex flex-col h-full overflow-hidden">
                <!-- Drawer Header -->
                <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
                    <div>
                        <p class="text-[10px] uppercase tracking-widest font-bold text-indigo-500 mb-1">Folder Arsip Matkul</p>
                        <h3 class="text-lg font-black text-slate-800 dark:text-white">{{ selectedCourse.course_name }}</h3>
                    </div>
                    <button @click="closeDrawer" class="p-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                        <X class="h-5 w-5" />
                    </button>
                </div>

                <!-- Drawer Body -->
                <div class="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    <!-- Upload Form -->
                    <div class="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-4">
                        <h4 class="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-wider flex items-center gap-1">
                            <Upload class="h-3 w-3" /> Tambah Arsip Baru
                        </h4>
                        <form @submit.prevent="submitArchive" class="space-y-3">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 mb-1">File PDF (Maks 5MB)</label>
                                <input @input="archiveForm.file = $event.target.files[0]" type="file" accept=".pdf"
                                    class="w-full text-xs file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200" />
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 mb-1">Atau Link Eksternal</label>
                                <input v-model="archiveForm.link_url" type="url" placeholder="https://..."
                                    class="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs" />
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 mb-1">Tag Keterangan (Opsional)</label>
                                <input v-model="archiveForm.meeting_tag" type="text" placeholder="Cth: Pertemuan 3, Tugas Kelompok..."
                                    class="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs" />
                            </div>
                            <button type="submit" :disabled="archiveForm.processing"
                                class="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors mt-1">
                                Simpan Arsip
                            </button>
                        </form>
                    </div>

                    <!-- Archive List -->
                    <div>
                        <h4 class="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Isi Folder ({{ selectedCourse.archives?.length || 0 }})</h4>
                        
                        <div v-if="!selectedCourse.archives || selectedCourse.archives.length === 0" class="text-center py-8 text-slate-400">
                            <p class="text-xs font-bold">Folder masih kosong.</p>
                        </div>
                        
                        <div v-else class="space-y-3">
                            <div v-for="arc in selectedCourse.archives" :key="arc.id" 
                                class="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                                
                                <div class="overflow-hidden pr-2">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span v-if="arc.meeting_tag" class="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded text-[9px] font-bold uppercase">{{ arc.meeting_tag }}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <FileText v-if="arc.file_path" class="h-4 w-4 text-emerald-500 shrink-0" />
                                        <ExternalLink v-else-if="arc.link_url" class="h-4 w-4 text-blue-500 shrink-0" />
                                        <p class="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                                            {{ arc.file_name || arc.link_url || 'Arsip Tanpa Nama' }}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-1 shrink-0">
                                    <a v-if="arc.file_path" :href="'/storage/' + arc.file_path" target="_blank" class="p-1.5 text-slate-400 hover:text-emerald-500 bg-slate-50 dark:bg-slate-900 hover:bg-emerald-50 rounded-lg">
                                        <FileText class="h-3 w-3" />
                                    </a>
                                    <a v-if="arc.link_url" :href="arc.link_url" target="_blank" class="p-1.5 text-slate-400 hover:text-blue-500 bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 rounded-lg">
                                        <ExternalLink class="h-3 w-3" />
                                    </a>
                                    <button @click="deleteArchive(arc.id)" class="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-900 hover:bg-red-50 rounded-lg">
                                        <Trash2 class="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>
