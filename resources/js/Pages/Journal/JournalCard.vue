<script setup>
import { Link } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

const props = defineProps({
    journal: Object
});

const emit = defineEmits(['delete']);

const formatDate = (date) => dayjs(date).locale('id').format('dddd, DD MMM YYYY');

const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    emit('delete', props.journal.id);
};
</script>

<template>
    <Link :href="route('journal.write', journal.id)" 
        class="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group relative">
        
        <button @click="handleDelete" 
            class="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-md text-rose-500 rounded-full flex items-center justify-center shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100 md:scale-90 md:group-hover:scale-100 hover:bg-rose-500 hover:text-white active:scale-95 sm:opacity-80">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>

        <div v-if="journal.image_url" class="w-full h-48 bg-slate-100 overflow-hidden relative">
            <img :src="journal.image_url" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        </div>

        <div class="p-6 md:p-8 flex flex-col flex-1">
            <div class="flex items-center justify-between mb-4">
                <span class="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg">
                    {{ formatDate(journal.date) }}
                </span>
                <span v-if="journal.mood" class="text-2xl" title="Mood">{{ 
                    journal.mood === 'awesome' ? '🤩' : 
                    journal.mood === 'good' ? '😊' : 
                    journal.mood === 'okay' ? '😐' : 
                    journal.mood === 'sad' ? '😢' : '😡' 
                }}</span>
            </div>

            <h3 class="text-xl font-black text-slate-800 mb-3 line-clamp-2">
                {{ journal.title || $t('journal_untitled', 'Cerita Hari Ini') }}
            </h3>
            
            <p class="text-sm font-medium text-slate-500 line-clamp-4 flex-1 leading-relaxed" 
               v-html="journal.content ? journal.content.replace(/<[^>]*>?/gm, '') : $t('journal_no_content', 'Tidak ada teks...')">
            </p>
        </div>
    </Link>
</template>