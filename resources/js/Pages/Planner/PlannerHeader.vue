<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import { usePage } from '@inertiajs/vue3'; // Pake ini aja, pasti ada karena lu pake Inertia

const props = defineProps({
    openModal: Function,
    resetBoard: Function,
    stats: Object
});

// Ambil locale langsung dari shared data Inertia (yang dikirim Laravel)
const page = usePage();

const todayDate = computed(() => {
    // Lu cek di sini, biasanya Laravel kirim locale di props.locale
    // Kalau lokasinya beda (misal: props.auth.locale), tinggal sesuaikan path-nya
    const currentLocale = page.props.locale || 'id'; 
    
    return dayjs()
        .locale(currentLocale) 
        .format('dddd, D MMMM YYYY');
});
</script>


<template>
    <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div class="flex items-center gap-4 w-full md:w-auto">
            <div class="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg shadow-indigo-200">
                📅
            </div>
            <div>
                <h2 class="text-2xl font-black text-slate-800 tracking-tight">{{ $t('header_title') }}</h2>
                <p class="text-slate-500 font-medium text-sm capitalize">{{ todayDate }}</p>
            </div>
        </div>

        <div class="flex-1 w-full md:px-12">
            <div class="flex justify-between text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">
                <span>{{ $t('header_progress') }}</span>
                <span>{{ stats.percent }}% {{ $t('header_done_suffix') }}</span>
            </div>
            <div class="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                    class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                    :style="{ width: `${stats.percent}%` }"
                ></div>
            </div>
            <div class="flex gap-4 mt-2 text-xs font-medium text-slate-500">
                <span>⚡ {{ stats.completed }} {{ $t('header_completed') }}</span>
                <span>⏳ {{ stats.pending }} {{ $t('header_pending') }}</span>
            </div>
        </div>

        <div class="flex gap-3 w-full md:w-auto">
            <button 
                @click="openModal()" 
                class="flex-1 md:flex-none px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
                <span>+</span> {{ $t('btn_add_task') }}
            </button>
            <button 
                @click="resetBoard" 
                class="px-4 py-3 bg-rose-50 text-rose-500 rounded-xl font-bold hover:bg-rose-100 transition border border-rose-100"
                :title="$t('btn_reset_tooltip')"
            >
                🔄 {{ $t('btn_reset') }}
            </button>
        </div>
    </div>
</template>