<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

const props = defineProps({
    journals: Array,
    todayDate: String,
    synergy: Object
});

const { formatMoney } = useFinanceFormat();

defineOptions({ layout: AuthenticatedLayout });

const formatDate = (date) => dayjs(date).locale('id').format('dddd, DD MMM YYYY');

// 🔥 CONFIG: TOAST NOTIFIKASI MEWAH (Sama dengan Finance) 🔥
const fireToast = (icon, message) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#4f46e5', // Warna Indigo khas
        iconColor: '#ffffff',
        icon: icon,
        title: `<span style="color: white; font-weight: 900; font-size: 14px; line-height: 1.2;">${message}</span>`,
        customClass: {
            container: '!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end',
            popup: '!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !m-0 !w-auto !min-w-[280px]',
            timerProgressBar: '!bg-white/40 !h-1 !rounded-b-full'
        }
    });
};

// 🔥 FUNGSI HAPUS JURNAL DENGAN ALERT & TOAST SUKSES 🔥
const deleteJournal = (id, event) => {
    // Cegah trigger pindah halaman
    event.preventDefault();
    event.stopPropagation();

    Swal.fire({
        title: props.t?.('journal_confirm_delete') || 'Hapus Jurnal?',
        text: props.t?.('journal_delete_warn') || 'Data ini akan hilang selamanya.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: props.t?.('btn_yes_delete') || 'Ya, Hapus',
        cancelButtonText: props.t?.('btn_cancel') || 'Batal',
        customClass: {
            confirmButton: 'bg-rose-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl active:scale-95 transition-all outline-none mx-2 tracking-wide',
            cancelButton: 'bg-slate-50 text-slate-400 font-bold py-3.5 px-8 rounded-2xl hover:bg-slate-100 active:scale-95 transition-all outline-none mx-2 tracking-wide',
            popup: 'rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl',
            title: 'text-2xl font-black text-slate-800 mb-2 font-sans',
            actions: 'mt-6 gap-3',
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {
            // Muncullah Toast Keren!
            fireToast('success', props.t?.('success_deleted') || 'Berhasil Dihapus!');

            router.delete(route('journal.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                progress: false, // Mematikan loading bar biru 0ms effect
            });
        }
    });
};
</script>

<template>
    <Head :title="$t('journal_title', 'Journal Dashboard')" />

    <div class="w-full min-h-screen bg-slate-50/50 p-6 md:p-12">
        <div class="max-w-6xl mx-auto">
            
            <div class="bg-indigo-600 rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl shadow-indigo-200 relative overflow-hidden mb-12 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div class="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div class="relative z-10 w-full lg:w-auto text-center lg:text-left">
                    <p class="text-indigo-200 font-black uppercase tracking-widest text-xs mb-2">
                        {{ dayjs(todayDate).locale('id').format('dddd, DD MMMM YYYY') }}
                    </p>
                    <h1 class="text-3xl md:text-5xl font-black tracking-tight mb-4">{{ $t('journal_title', 'My Journal 📓') }}</h1>
                    <p class="text-indigo-100 font-medium">{{ $t('journal_subtitle', 'Rekam jejak pikiran dan perasaanmu setiap hari.') }}</p>
                </div>

                <div class="relative z-10 flex flex-wrap justify-center lg:justify-end gap-3 md:gap-6 w-full lg:w-auto">
                    <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[100px]">
                        <div class="text-2xl mb-1">📅</div>
                        <p class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">{{ $t('journal_tasks', 'Tugas') }}</p>
                        <p class="text-lg font-black">{{ synergy.tasks_completed }}<span class="text-sm opacity-50">/{{ synergy.tasks_total }}</span></p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[100px]">
                        <div class="text-2xl mb-1">🌱</div>
                        <p class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">{{ $t('journal_habit', 'Habit') }}</p>
                        <p class="text-lg font-black">{{ synergy.habits_completed }} <span class="text-[10px] uppercase opacity-70">{{ $t('journal_habit_done', 'Selesai') }}</span></p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[100px]">
                        <div class="text-2xl mb-1">💸</div>
                        <p class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">{{ $t('journal_expense', 'Keluar') }}</p>
                        <p class="text-lg font-black font-mono">{{ formatMoney(synergy.expense_total) }}</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-between mb-8">
                <h3 class="text-xl font-black text-slate-800">{{ $t('journal_history', 'Riwayat Cerita') }}</h3>
                
                <Link :href="route('journal.write')" class="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-5 py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <span>✏️</span> <span class="hidden sm:inline">{{ $t('journal_add', 'Tambah Jurnal') }}</span>
                </Link>
            </div>

            <div v-if="journals.length === 0" class="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                <div class="text-5xl mb-4 opacity-50">🌱</div>
                <h3 class="text-xl font-black text-slate-700 mb-2">{{ $t('journal_empty_title', 'Belum ada cerita.') }}</h3>
                <p class="text-slate-400 font-medium">{{ $t('journal_empty_subtitle', 'Mulai tulis jurnal pertamamu hari ini!') }}</p>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                <Link v-for="journal in journals" :key="journal.id" :href="route('journal.write', journal.id)" 
                    class="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group relative">
                    
                    <button @click="(e) => deleteJournal(journal.id, e)" 
                        class="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-md text-rose-500 rounded-full flex items-center justify-center shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100 md:scale-90 md:group-hover:scale-100 hover:bg-rose-500 hover:text-white active:scale-95 sm:opacity-80">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>

                    <div v-if="journal.image_path" class="w-full h-48 bg-slate-100 overflow-hidden relative">
                        <img :src="`/storage/${journal.image_path}`" alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
            </div>

        </div>
    </div>
</template>