<script setup>
import { Head, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Swal from 'sweetalert2';

import JournalHeader from './JournalHeader.vue';
import JournalCard from './JournalCard.vue';

const props = defineProps({
    journals: Array,
    todayDate: String,
    synergy: Object
});

defineOptions({ layout: AuthenticatedLayout });

const fireToast = (icon, message) => {
    Swal.fire({
        toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true,
        background: '#4f46e5', iconColor: '#ffffff', icon: icon,
        title: `<span style="color: white; font-weight: 900; font-size: 14px; line-height: 1.2;">${message}</span>`,
        customClass: {
            container: '!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end',
            popup: '!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !m-0 !w-auto !min-w-[280px]',
            timerProgressBar: '!bg-white dark:bg-slate-900/40 !h-1 !rounded-b-full'
        }
    });
};

const deleteJournal = (id) => {
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
            fireToast('success', props.t?.('success_deleted') || 'Berhasil Dihapus!');
            router.delete(route('journal.destroy', id), {
                preserveScroll: true, preserveState: true, progress: false, 
            });
        }
    });
};
</script>

<template>
    <Head :title="$t('journal_title', 'Journal Dashboard')" />

    <div class="w-full min-h-screen bg-slate-50/50 pb-12">
        
        <JournalHeader 
            :todayDate="todayDate" 
            :synergy="synergy" 
        />

        <div class="w-full px-4 py-8 sm:px-6 lg:px-8 md:py-12">
            
            <div class="flex items-center justify-between mb-8">
                <h3 class="text-xl font-black text-slate-800">{{ $t('journal_history', 'Story History') }}</h3>
            </div>

            <div v-if="journals.length === 0" class="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-200 max-w-4xl mx-auto">
                <div class="mb-4 text-5xl opacity-50">🌱</div>
                <h3 class="mb-2 text-xl font-black text-slate-700">{{ $t('journal_empty_title', 'Belum ada cerita.') }}</h3>
                <p class="font-medium text-slate-400">{{ $t('journal_empty_subtitle', 'Mulai tulis jurnal pertamamu hari ini!') }}</p>
            </div>

            <div v-else class="grid items-start grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <JournalCard 
                    v-for="journal in journals" 
                    :key="journal.id" 
                    :journal="journal"
                    @delete="deleteJournal"
                />
            </div>

        </div>
    </div>
</template>