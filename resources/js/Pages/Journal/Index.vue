<script setup>
import { ref } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

import JournalHeader from './JournalHeader.vue';
import JournalCard from './JournalCard.vue';
import NeuralBridge from '@/Components/NeuralBridge.vue';
import PremiumPreviewModal from '@/Components/PremiumPreviewModal.vue';
import { useGating } from '@/Composables/useGating';

const props = defineProps({
    journals: Array,
    todayDate: String,
    synergy: Object
});

const { isExplorer } = useGating();

defineOptions({ layout: AuthenticatedLayout });

const fireToast = (icon, message) => {
    Swal.fire({
        toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true,
        background: '#4f46e5', iconColor: '#ffffff', icon: icon,
        title: `<span style="color: white; font-weight: 900; font-size: 14px; line-height: 1.2;">${message}</span>`,
        customClass: {
            container: '!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end',
            popup: '!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !m-0 !w-auto !min-w-[280px]',
            timerProgressBar: '!bg-white/40 !h-1 !rounded-b-full'
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
            fireToast('success', props.t?.('success_deleted') || 'Berhasil dihapus!');
            router.delete(route('journal.destroy', id), {
                preserveScroll: true, preserveState: true, progress: false, 
            });
        }
    });
};
const createEntry = () => {
    router.get(route('journal.write'));
};

const isPreviewOpen = ref(false);
const openPremiumPreview = () => isPreviewOpen.value = true;
</script>

<template>
    <Head :title="$t('journal_title', 'Journal Dashboard')" />

    <div class="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-12 transition-colors duration-500">
        
        <JournalHeader 
            :todayDate="todayDate" 
            :synergy="synergy" 
        />

        <div class="w-full px-4 py-8 sm:px-6 lg:px-8 md:py-12 space-y-8">
            <NeuralBridge module="Journal" />
            
            <div class="flex items-center justify-between">
                <h3 class="text-xl font-black text-slate-800 dark:text-white transition-colors duration-500">{{ $t('journal_history', 'Story History') }}</h3>
            </div>

            <div v-if="journals.length === 0" class="py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-sm dark:shadow-none mt-4 transition-all duration-500">
                <div class="flex flex-col items-center gap-4">
                    <span class="text-5xl animate-bounce">📓</span>
                    <h4 class="text-lg font-black text-slate-800 dark:text-slate-100 transition-colors duration-500">{{ $t('journal_empty_title', 'Belum ada cerita.') }}</h4>
                    <p class="text-sm font-bold text-slate-400 dark:text-slate-500 px-8 transition-colors duration-500">
                        {{ $t('journal_empty_subtitle', 'Mulai tulis jurnal pertamamu hari ini!') }}
                    </p>
                    <button @click="createEntry" class="mt-2 bg-indigo-600 text-white font-black py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 active:scale-95 transition-all outline-none">
                        + {{ $t('journal_add', 'Tambah jurnal') }}
                    </button>
                </div>
            </div>

            <div v-else class="grid items-start grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <JournalCard 
                    v-for="journal in journals" 
                    :key="journal.id" 
                    :journal="journal"
                    :isExplorer="isExplorer"
                    @delete="deleteJournal"
                    @open-preview="openPremiumPreview"
                />
            </div>

            <PremiumPreviewModal 
                :isOpen="isPreviewOpen" 
                module="Journal"
                @close="isPreviewOpen = false" 
            />
        </div>
    </div>
</template>