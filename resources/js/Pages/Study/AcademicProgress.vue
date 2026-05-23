<script setup>
import { computed } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import { Trash2, BookOpen, Activity, PlusCircle, FileText, ExternalLink } from 'lucide-vue-next';

const props = defineProps({
    academicRecords: { type: Array, default: () => [] },
    academicStats: { type: Object, default: () => ({ ipk: 0, total_sks: 0, current_semester: 1, semesters: [] }) },
});

const form = useForm({
    course_name: '',
    semester: '',
    sks: '',
    grade: '',
    file: null,
    link_url: ''
});

const submit = () => {
    form.post(route('study.academic.store'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
};

const deleteRecord = (id) => {
    if (confirm('Are you sure you want to delete this record?')) {
        router.delete(route('study.academic.destroy', id), { preserveScroll: true });
    }
};
</script>

<template>
    <div class="space-y-8">
        <!-- ACADEMIC DASHBOARD HERO CARDS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- IPK Card -->
            <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[2rem] border border-slate-200/60 dark:border-slate-800/80 p-6 flex items-center gap-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:scale-[1.02] transition-transform">
                <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-2xl">
                    {{ props.academicStats.ipk.toFixed(2) }}
                </div>
                <div>
                    <p class="text-[10px] uppercase tracking-widest font-bold text-slate-400">Cumulative GPA (IPK)</p>
                    <h3 class="text-xl font-black text-slate-800 dark:text-slate-100 leading-tight">Prestasi Akademik</h3>
                </div>
            </div>

            <!-- SKS Card -->
            <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[2rem] border border-slate-200/60 dark:border-slate-800/80 p-6 flex items-center gap-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:scale-[1.02] transition-transform">
                <div class="h-16 w-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center border border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 font-black text-2xl">
                    {{ props.academicStats.total_sks }}
                </div>
                <div>
                    <p class="text-[10px] uppercase tracking-widest font-bold text-slate-400">Total Credits</p>
                    <h3 class="text-xl font-black text-slate-800 dark:text-slate-100 leading-tight">SKS Ditempuh</h3>
                </div>
            </div>

            <!-- Semester Card -->
            <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[2rem] border border-slate-200/60 dark:border-slate-800/80 p-6 flex items-center gap-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:scale-[1.02] transition-transform">
                <div class="h-16 w-16 rounded-2xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center border border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400 font-black text-2xl">
                    {{ props.academicStats.current_semester }}
                </div>
                <div>
                    <p class="text-[10px] uppercase tracking-widest font-bold text-slate-400">Current Position</p>
                    <h3 class="text-xl font-black text-slate-800 dark:text-slate-100 leading-tight">Semester Aktif</h3>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Form Card -->
            <div class="lg:col-span-1 space-y-6">
                <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[2rem] border border-slate-200/60 dark:border-slate-800/80 p-6 shadow-sm">
                    <h3 class="text-lg font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                        <PlusCircle class="h-5 w-5 text-indigo-500" />
                        Tambah Nilai Matkul
                    </h3>
                    
                    <form @submit.prevent="submit" class="space-y-4">
                        <div>
                            <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Nama Mata Kuliah *</label>
                            <input v-model="form.course_name" type="text" required
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Semester *</label>
                                <input v-model="form.semester" type="number" min="1" max="14" required
                                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                            </div>
                            
                            <div>
                                <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">SKS *</label>
                                <input v-model="form.sks" type="number" min="1" max="10" required
                                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Nilai Grade (0-100) *</label>
                            <input v-model="form.grade" type="number" step="0.01" min="0" max="100" required
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                        </div>

                        <div>
                            <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Upload Arsip (Opsional, PDF max 5MB)</label>
                            <input @input="form.file = $event.target.files[0]" type="file" accept=".pdf"
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                        </div>

                        <div>
                            <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Link Eksternal (Opsional, Drive/Notion)</label>
                            <input v-model="form.link_url" type="url" placeholder="https://..."
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                        </div>

                        <button type="submit" :disabled="form.processing"
                            class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-colors disabled:opacity-50 mt-2">
                            Simpan Nilai
                        </button>
                    </form>
                </div>
            </div>

            <!-- List Card -->
            <div class="lg:col-span-2">
                <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[2rem] border border-slate-200/60 dark:border-slate-800/80 p-6 shadow-sm min-h-full">
                    <h3 class="text-lg font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                        <BookOpen class="h-5 w-5 text-emerald-500" />
                        Kartu Hasil Studi (KHS)
                    </h3>
                    
                    <div v-if="props.academicStats.semesters.length === 0" class="py-12 text-center text-slate-500">
                        <div class="text-4xl mb-4">📝</div>
                        <p class="text-sm font-semibold">Belum ada data nilai.</p>
                        <p class="text-xs">Silakan tambahkan data nilai mata kuliah di form sebelah kiri.</p>
                    </div>

                    <div v-else class="space-y-8">
                        <div v-for="group in props.academicStats.semesters" :key="group.semester" class="space-y-4">
                            <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                <h4 class="text-md font-black text-slate-800 dark:text-slate-100">Semester {{ group.semester }}</h4>
                                <div class="text-xs font-bold text-slate-500">
                                    <span class="mr-3">IPS: <span class="text-indigo-600 dark:text-indigo-400 text-sm">{{ group.ips.toFixed(2) }}</span></span>
                                    <span>SKS: <span class="text-emerald-600 dark:text-emerald-400 text-sm">{{ group.total_sks }}</span></span>
                                </div>
                            </div>
                            
                            <div class="space-y-3">
                                <div v-for="record in props.academicRecords.filter(r => r.semester === group.semester)" :key="record.id" 
                                    class="p-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-900 rounded-xl flex items-center justify-between">
                                    
                                    <div>
                                        <h5 class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ record.course_name }}</h5>
                                        <div class="flex gap-3 text-[10px] font-bold text-slate-400 mt-1">
                                            <span>SKS: {{ record.sks }}</span>
                                            <span class="text-emerald-500">Grade: {{ record.grade }}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center gap-2">
                                        <a v-if="record.file_path" :href="'/storage/' + record.file_path" target="_blank"
                                           class="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                           title="Lihat PDF">
                                            <FileText class="h-4 w-4" />
                                        </a>
                                        <a v-if="record.link_url" :href="record.link_url" target="_blank"
                                           class="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                           title="Buka Link">
                                            <ExternalLink class="h-4 w-4" />
                                        </a>
                                        <button @click="deleteRecord(record.id)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Hapus Data">
                                            <Trash2 class="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
