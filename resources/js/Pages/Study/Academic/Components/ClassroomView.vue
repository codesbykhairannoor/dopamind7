<script setup>
import { computed } from 'vue';
import { ArrowLeft, PlusCircle, FolderOpen, Calendar, Plus, Trash2, FileText, ExternalLink, Download, Loader2 } from 'lucide-vue-next';

const props = defineProps({
    course: { type: Object, required: true },
    terms: { type: Object, required: true }
});

const emit = defineEmits(['back', 'add-archive-click', 'delete-archive']);

const handleBack = () => {
    emit('back');
};

const openAddArchive = (tag = '') => {
    emit('add-archive-click', tag);
};

const deleteArchive = (id) => {
    emit('delete-archive', id);
};

// Extract unique meeting tags and group archives
const groupedArchives = computed(() => {
    if (!props.course || !props.course.archives) return {};
    const groups = {};
    props.course.archives.forEach(arc => {
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
    <div>
        <!-- Header Mode Kelas -->
        <header class="bg-indigo-600 dark:bg-indigo-900 px-4 sm:px-8 pt-8 pb-16 sm:pb-24 relative overflow-hidden">
            <div class="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div class="max-w-[1600px] w-full md:w-[95%] mx-auto relative z-10">
                <button @click="handleBack" class="mb-6 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white text-xs font-bold transition-colors w-max">
                    <ArrowLeft class="h-4 w-4" /> {{ $t('study_back') }}
                </button>
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div class="flex items-center gap-3 mb-3">
                            <span class="bg-indigo-500/50 text-white text-[10px] font-black capitalize tracking-wide px-3 py-1 rounded-lg border border-white/20">{{ terms.semester }} {{ course.semester }}</span>
                            <span class="bg-white/10 text-indigo-100 text-[10px] font-bold px-3 py-1 rounded-lg">{{ course.sks }} {{ terms.sks }}</span>
                        </div>
                        <h1 class="text-3xl sm:text-5xl font-black text-white leading-tight mb-2 max-w-4xl capitalize">{{ course.course_name }}</h1>
                    </div>
                    <div class="shrink-0">
                        <!-- Tombol Input Pertemuan Baru (Dinamis) -->
                        <button @click="openAddArchive('')" class="px-6 py-4 bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl font-black shadow-xl transition-transform hover:scale-105 flex items-center gap-3">
                            <PlusCircle class="h-5 w-5" /> {{ $t('study_input_meeting_new', { meeting: terms.meeting }) }}
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
                <h3 class="text-2xl font-black text-slate-700 dark:text-slate-200 mb-2">{{ $t('study_class_is_empty') }}</h3>
                <p class="text-slate-500 max-w-md mx-auto" v-html="$t('study_empty_class_desc', { meeting: terms.meeting })"></p>
            </div>

            <div v-else v-for="(archives, tag) in groupedArchives" :key="tag" class="bg-slate-100/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/50 rounded-[2.5rem] p-6 sm:p-8">
                <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                    <h4 class="text-lg font-black text-slate-800 dark:text-slate-200 flex items-center gap-3 capitalize">
                        <Calendar class="h-5 w-5 text-indigo-500" /> {{ tag }}
                    </h4>
                    <button @click="openAddArchive(tag)" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 py-2 px-4 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm active:scale-95">
                        <Plus class="h-3.5 w-3.5" /> {{ $t('study_add_file') }}
                    </button>
                </div>

                <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <div v-for="arc in archives" :key="arc.id" class="group relative p-4 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col transition-all hover:border-indigo-300 hover:shadow-md">
                        <div class="flex items-start justify-between gap-3 mb-4">
                            <div class="flex-1 min-w-0">
                                <span class="inline-block px-2 py-0.5 rounded-md text-[9px] font-black capitalize tracking-wide mb-2" :class="getTypeColor(arc.type)">
                                    {{ $t('study_type_' + arc.type.toLowerCase()) }}
                                </span>
                                <p class="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">{{ arc.file_name || arc.link_url || $t('study_untitled_archive') }}</p>
                            </div>
                            <button @click="deleteArchive(arc.id)" class="text-slate-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 shrink-0">
                                <Trash2 class="h-4 w-4" />
                            </button>
                        </div>
                        <div class="mt-auto space-y-2">
                            <!-- Link External -->
                            <a v-if="arc.link_url" :href="arc.link_url" target="_blank" class="w-full flex justify-center items-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl transition-all active:scale-95 border border-blue-100 dark:border-blue-900/50">
                                <ExternalLink class="h-3.5 w-3.5" /> {{ $t('study_visit_link') }}
                            </a>

                            <!-- File Actions -->
                            <div v-if="arc.file_path && arc.file_path !== 'pending'" class="grid grid-cols-2 gap-2">
                                <a :href="route('study.academic.archive.download', { id: arc.id, view: 1 })" target="_blank" class="flex justify-center items-center gap-2 px-2 py-2.5 text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-xl transition-all active:scale-95 border border-indigo-100 dark:border-indigo-900/50">
                                    <FileText class="h-3.5 w-3.5" /> {{ $t('study_view_pdf', 'Lihat') }}
                                </a>
                                <a :href="route('study.academic.archive.download', arc.id)" download class="flex justify-center items-center gap-2 px-2 py-2.5 text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-xl transition-all active:scale-95 border border-emerald-100 dark:border-emerald-900/50">
                                    <Download class="h-3.5 w-3.5" /> {{ $t('study_download_pdf', 'Unduh') }}
                                </a>
                            </div>

                            <span v-else-if="arc.file_path === 'pending'" class="w-full flex justify-center items-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                <Loader2 class="h-3.5 w-3.5 animate-spin" /> {{ $t('study_uploading', 'Mengunggah...') }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
