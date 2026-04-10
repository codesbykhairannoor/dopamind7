<script setup>
import { ref, watch, onMounted } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import { useJournalForm } from '@/Composables/Journal/useJournalForm';
import ThemeToggle from '@/Components/ThemeToggle.vue';
import { useAppearance } from '@/Composables/useAppearance';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
    journal: Object,
    date: String
});

// 🔥 Panggil currentImageUrl dari composable
const { form, isSaving, currentImageUrl, handleImageUpload, removeImage, silentSave } = useJournalForm(props.journal, props.date);
import { useGating } from '@/Composables/useGating';
const { canUse, isExplorer } = useGating();

const { initTheme } = useAppearance();

onMounted(() => {
    initTheme();
});

const fileInputRef = ref(null);

const moods = [
    { slug: 'awesome', emoji: '🤩', label: 'Luar Biasa' },
    { slug: 'good', emoji: '😊', label: 'Senang' },
    { slug: 'okay', emoji: '😐', label: 'Biasa Saja' },
    { slug: 'sad', emoji: '😢', label: 'Sedih' },
    { slug: 'angry', emoji: '😡', label: 'Marah' },
];

const editor = useEditor({
    content: props.journal?.content || '',
    extensions: [
        StarterKit,
        Placeholder.configure({ placeholder: 'Mulai menulis cerita harimu...' })
    ],
    editorProps: {
        attributes: { class: 'prose prose-slate prose-lg md:prose-xl dark:prose-invert max-w-none focus:outline-none min-h-[50vh] text-slate-700 dark:text-slate-300 font-medium leading-relaxed pb-20 transition-colors duration-500' }
    },
    onUpdate: ({ editor }) => {
        form.content = editor.getHTML();
    }
});

const triggerFileInput = () => fileInputRef.value.click();
</script>

<template>
    <Head :title="`Menulis Jurnal - ${date}`" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 relative selection:bg-indigo-100 dark:selection:bg-indigo-900/40 pb-32 transition-colors duration-500">
        <div class="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 md:px-6 py-4 flex items-center justify-between shadow-sm transition-colors duration-500">
            <Link :href="route('journal.index')" class="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-3 md:px-4 py-2 rounded-xl">
                <span>←</span> <span class="hidden sm:inline">{{ $t('btn_back_dashboard', 'Kembali ke Dashboard') }}</span>
            </Link>

            <div class="flex items-center gap-4">
                <div class="w-10 h-10 md:w-32">
                    <ThemeToggle :collapsed="true" />
                </div>
                <div class="text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl flex items-center gap-2 transition-colors duration-500">
                    <span v-if="isSaving" class="text-indigo-500 dark:text-indigo-400 animate-pulse flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                        <span class="hidden sm:inline">{{ $t('status_saving', 'Saving...') }}</span>
                    </span>
                    <span v-else class="text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" stroke-width="2.5"></path></svg>
                        <span class="hidden sm:inline">{{ $t('status_saved', 'Saved') }}</span>
                    </span>
                </div>

                <button @click="silentSave(true)" :disabled="isSaving" class="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-[10px] md:text-xs font-black tracking-widest px-4 md:px-6 py-2 md:py-2.5 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 disabled:opacity-50">
                    {{ $t('btn_save_manual', 'Save') }}
                </button>
            </div>
        </div>

        <div class="max-w-3xl mx-auto w-full px-4 py-8 md:py-12">
            <div class="bg-white dark:bg-slate-900 p-6 md:p-14 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative transition-colors duration-500">
                <div class="text-[10px] font-black tracking-[0.2em] text-indigo-400 mb-6 flex items-center gap-2">
                    <span>📅</span> {{ dayjs(date).locale($page.props.locale || 'id').format('dddd, DD MMMM YYYY') }}
                </div>

                <input v-model="form.title" type="text" :placeholder="$t('journal_title_placeholder', 'Beri judul harimu...')" class="w-full text-3xl md:text-5xl font-black text-slate-800 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-700 border-none bg-transparent focus:ring-0 p-0 mb-8 tracking-tight leading-tight transition-colors duration-500" />

                <div class="flex flex-wrap items-center gap-3 mb-10">
                    <span class="text-[9px] font-black tracking-widest text-slate-400 dark:text-slate-500 mr-2">{{ $t('journal_mood_label', 'Mood hari ini:') }}</span>
                    <button v-for="mood in moods" :key="mood.slug" @click="form.mood = mood.slug" class="w-10 h-10 md:w-12 md:h-12 rounded-2xl text-xl md:text-2xl flex items-center justify-center transition-all border-2" :class="form.mood === mood.slug ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/50 scale-110 shadow-sm' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 grayscale hover:grayscale-0'" :title="mood.label">
                        {{ mood.emoji }}
                    </button>
                </div>

                <div class="mb-10 group relative">
                    <input type="file" ref="fileInputRef" class="hidden" accept="image/jpeg, image/png, image/webp" @change="handleImageUpload" />
                    
                    <div v-if="currentImageUrl" class="relative rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-500">
                        <img :src="currentImageUrl" alt="Journal Image" class="w-full h-auto max-h-[500px] object-cover" />
                        
                        <button @click="removeImage" type="button" class="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur text-rose-500 rounded-full flex items-center justify-center shadow-lg hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 z-10 cursor-pointer">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>

                    <button v-else @click="triggerFileInput" class="w-full py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer relative overflow-hidden group">
                        <div v-if="isExplorer" class="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                            <span class="text-xl mb-1">🔒</span>
                            <span class="text-[8px] font-black text-indigo-600 dark:text-indigo-400 tracking-[0.2em]">{{ $t('premium_badge', 'Architect feature') }}</span>
                        </div>
                        <span class="text-2xl mb-2">📸</span>
                        <span class="text-[9px] font-black tracking-widest">{{ $t('journal_add_photo', 'Sisipkan foto jurnal') }}</span>
                    </button>
                </div>

                <div v-if="editor" class="sticky top-20 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex gap-1 mb-10 w-fit transition-all duration-300">
                    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'bg-indigo-600 text-white shadow-lg shadow-indigo-100': editor.isActive('bold') }" class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95">
                        <OneForMindIcon name="bold" size="18" stroke-width="3" />
                    </button>
                    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'bg-indigo-600 text-white shadow-lg shadow-indigo-100': editor.isActive('italic') }" class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95">
                        <OneForMindIcon name="italic" size="18" stroke-width="3" />
                    </button>
                    <div class="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1 self-center"></div>
                    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'bg-indigo-600 text-white shadow-lg shadow-indigo-100': editor.isActive('heading', { level: 2 }) }" class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95">
                        <OneForMindIcon name="heading" size="18" stroke-width="3" />
                    </button>
                    <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'bg-indigo-600 text-white shadow-lg shadow-indigo-100': editor.isActive('bulletList') }" class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95">
                        <OneForMindIcon name="list" size="18" stroke-width="3" />
                    </button>
                </div>

                <editor-content :editor="editor" />

            </div>
        </div>
    </div>
</template>

<style>
.tiptap p.is-editor-empty:first-child::before { color: #cbd5e1; content: attr(data-placeholder); float: left; height: 0; pointer-events: none; }
.tiptap h2 { font-weight: 900; margin-top: 1.5em; margin-bottom: 0.5em; color: #1e293b; font-size: 1.5em; }
.tiptap ul { list-style-type: disc; padding-left: 1.5em; margin-top: 0.5em; margin-bottom: 0.5em; }
.tiptap li { margin-bottom: 0.25em; }
.tiptap b, .tiptap strong { font-weight: 900; color: #1e293b; }
.tiptap:focus { outline: none; }

.dark .tiptap h2 { color: #f8fafc; }
.dark .tiptap b, .dark .tiptap strong { color: #f8fafc; }
.dark .tiptap p.is-editor-empty:first-child::before { color: #475569; }
</style>