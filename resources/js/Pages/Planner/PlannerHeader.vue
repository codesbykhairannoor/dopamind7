<script setup>
import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import { usePage } from '@inertiajs/vue3'; 
import Modal from '@/Components/Modal.vue'; // Import Modal bawaan Jetstream

const props = defineProps({
    openModal: Function,
    resetBoard: Function,
    stats: Object
});

const page = usePage();

const todayDate = computed(() => {
    const currentLocale = page.props.locale || 'id'; 
    return dayjs()
        .locale(currentLocale) 
        .format('dddd, D MMMM YYYY');
});

// --- LOGIC KONFIRMASI RESET ---
const isConfirmingReset = ref(false);

const confirmReset = () => {
    isConfirmingReset.value = true;
};

const closeResetModal = () => {
    isConfirmingReset.value = false;
};

const executeReset = () => {
    props.resetBoard();
    isConfirmingReset.value = false;
};
</script>

<template>
    <div class="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 md:sticky top-0 z-30 transition-all">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div class="flex items-center gap-4 w-full md:w-auto">
                <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg shadow-indigo-200">
                    📅
                </div>
                <div>
                    <h2 class="text-xl font-black text-slate-800 tracking-tight">{{ $t('header_title') }}</h2>
                    <p class="text-slate-500 font-medium text-xs capitalize">{{ todayDate }}</p>
                </div>
            </div>

            <div class="flex-1 w-full md:px-12">
                <div class="flex justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                    <span>{{ $t('header_progress') }}</span>
                    <span>{{ stats.percent }}% {{ $t('header_done_suffix') }}</span>
                </div>
                <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                        :style="{ width: `${stats.percent}%` }"
                    ></div>
                </div>
                <div class="flex gap-4 mt-1.5 text-[10px] font-medium text-slate-500">
                    <span>⚡ {{ stats.completed }} {{ $t('header_completed') }}</span>
                    <span>⏳ {{ stats.pending }} {{ $t('header_pending') }}</span>
                </div>
            </div>

            <div class="flex gap-3 w-full md:w-auto">
                <button 
                    @click="openModal()" 
                    class="flex-1 md:flex-none px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 text-sm"
                >
                    <span>+</span> {{ $t('btn_add_task') }}
                </button>
                
                <button 
                    @click="confirmReset" 
                    class="px-3 py-2.5 bg-rose-50 text-rose-500 rounded-xl font-bold hover:bg-rose-100 transition border border-rose-100 text-sm"
                    :title="$t('btn_reset_tooltip')"
                >
                    🔄
                </button>
            </div>
        </div>

        <Modal :show="isConfirmingReset" @close="closeResetModal" maxWidth="sm">
            <div class="bg-white rounded-2xl relative overflow-hidden p-6 text-center">
                
                <div class="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                <div class="relative z-10">
                    <div class="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    
                    <h3 class="text-lg font-black text-slate-800 mb-2">{{ $t('modal_reset_title') || 'Reset Semua?' }}</h3>
                    
                    <p class="text-slate-500 text-xs mb-6 px-4 leading-relaxed">
                        {{ $t('modal_reset_desc') || 'Semua task yang sudah selesai akan dihapus dan task yang belum selesai akan kembali ke Inbox. Yakin?' }}
                    </p>

                    <div class="flex gap-3 justify-center">
                        <button 
                            @click="closeResetModal" 
                            class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition"
                        >
                            {{ $t('btn_cancel') || 'Batal' }}
                        </button>
                        
                        <button 
                            @click="executeReset" 
                            class="px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition transform active:scale-95"
                        >
                            {{ $t('btn_confirm_reset') || 'Ya, Reset Board' }}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>