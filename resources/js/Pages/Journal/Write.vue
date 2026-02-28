<script setup>
import { ref, watch } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import { useJournalForm } from '@/Composables/Journal/useJournalForm';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

const props = defineProps({
    journal: Object,
    date: String
});

// 🔥 Panggil currentImageUrl dari composable, HAPUS localImagePreview
const { form, isSaving, currentImageUrl, handleImageUpload, removeImage, silentSave } = useJournalForm(props.journal, props.date);

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
        attributes: { class: 'prose prose-slate prose-lg md:prose-xl max-w-none focus:outline-none min-h-[50vh] text-slate-700 font-medium leading-relaxed pb-20' }
    },
    onUpdate: ({ editor }) => {
        form.content = editor.getHTML();
    }
});

const triggerFileInput = () => fileInputRef.value.click();
</script>

<template>
    <Head :title="`Menulis Jurnal - ${date}`" />

    <div class="min-h-screen bg-slate-50 relative selection:bg-indigo-100 pb-32">
        <div class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-6 py-4 flex items-center justify-between shadow-sm">
            <Link :href="route('journal.index')" class="text-xs md:text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2 bg-slate-100 hover:bg-indigo-50 px-3 md:px-4 py-2 rounded-xl">
                <span>←</span> <span class="hidden sm:inline">{{ $t('btn_back_dashboard', 'Kembali ke Dashboard') }}</span>
            </Link>

            <div class="flex items-center gap-3">
                <div class="text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-slate-100 px-3 py-2 rounded-xl flex items-center gap-2">
                    <span v-if="isSaving" class="text-indigo-500 animate-pulse flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                        <span class="hidden sm:inline">{{ $t('status_saving', 'Menyimpan...') }}</span>
                    </span>
                    <span v-else class="text-emerald-500 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <span class="hidden sm:inline">{{ $t('status_saved', 'Tersimpan') }}</span>
                    </span>
                </div>

                <button @click="silentSave(true)" :disabled="isSaving" class="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-4 md:px-6 py-2 md:py-2.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50">
                    {{ $t('btn_save_manual', 'Simpan') }}
                </button>
            </div>
        </div>

        <div class="max-w-3xl mx-auto w-full px-4 py-8 md:py-12">
            <div class="bg-white p-6 md:p-14 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 relative">
                <div class="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6 flex items-center gap-2">
                    <span>📅</span> {{ dayjs(date).locale($page.props.locale || 'id').format('dddd, DD MMMM YYYY') }}
                </div>

                <input v-model="form.title" type="text" :placeholder="$t('journal_title_placeholder', 'Beri judul harimu...')" class="w-full text-3xl md:text-5xl font-black text-slate-800 placeholder:text-slate-200 border-none bg-transparent focus:ring-0 p-0 mb-8 tracking-tight leading-tight" />

                <div class="flex flex-wrap items-center gap-3 mb-10">
                    <span class="text-[9px] font-black uppercase tracking-widest text-slate-400 mr-2">{{ $t('journal_mood_label', 'Mood Hari Ini:') }}</span>
                    <button v-for="mood in moods" :key="mood.slug" @click="form.mood = mood.slug" class="w-10 h-10 md:w-12 md:h-12 rounded-2xl text-xl md:text-2xl flex items-center justify-center transition-all border-2" :class="form.mood === mood.slug ? 'bg-indigo-50 border-indigo-200 scale-110 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50 grayscale hover:grayscale-0'" :title="mood.label">
                        {{ mood.emoji }}
                    </button>
                </div>

                <div class="mb-10 group relative">
                    <input type="file" ref="fileInputRef" class="hidden" accept="image/jpeg, image/png, image/webp" @change="handleImageUpload" />
                    
                    <div v-if="currentImageUrl" class="relative rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm">
                        <img :src="currentImageUrl" alt="Journal Image" class="w-full h-auto max-h-[500px] object-cover" />
                        
                        <button @click="removeImage" type="button" class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur text-rose-500 rounded-full flex items-center justify-center shadow-lg hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 z-10 cursor-pointer">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>

                    <button v-else @click="triggerFileInput" class="w-full py-8 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-pointer">
                        <span class="text-2xl mb-2">📸</span>
                        <span class="text-[9px] font-black uppercase tracking-widest">{{ $t('journal_add_photo', 'Sisipkan Foto Jurnal') }}</span>
                    </button>
                </div>

                <div v-if="editor" class="sticky top-20 z-40 bg-white/90 backdrop-blur p-2 rounded-xl border border-slate-200 shadow-sm flex gap-1 mb-6 w-fit">
                    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'bg-slate-200': editor.isActive('bold') }" class="w-8 h-8 rounded-lg font-black hover:bg-slate-100">B</button>
                    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'bg-slate-200': editor.isActive('italic') }" class="w-8 h-8 rounded-lg italic font-bold hover:bg-slate-100">I</button>
                    <div class="w-px h-5 bg-slate-200 mx-1 self-center"></div>
                    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'bg-slate-200': editor.isActive('heading', { level: 2 }) }" class="px-2 h-8 rounded-lg font-black text-sm hover:bg-slate-100">H2</button>
                    <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'bg-slate-200': editor.isActive('bulletList') }" class="w-8 h-8 rounded-lg font-bold hover:bg-slate-100">•</button>
                </div>

                <editor-content :editor="editor" />

            </div>
        </div>
    </div>
</template>

<style>
/* CSS bawaanmu di sini tidak ada yang saya ubah */
.tiptap p.is-editor-empty:first-child::before { color: #cbd5e1; content: attr(data-placeholder); float: left; height: 0; pointer-events: none; }
.tiptap h2 { font-weight: 900; margin-top: 1.5em; margin-bottom: 0.5em; color: #1e293b; font-size: 1.5em; }
.tiptap ul { list-style-type: disc; padding-left: 1.5em; margin-top: 0.5em; margin-bottom: 0.5em; }
.tiptap li { margin-bottom: 0.25em; }
.tiptap b, .tiptap strong { font-weight: 900; color: #1e293b; }
.tiptap:focus { outline: none; }
</style>