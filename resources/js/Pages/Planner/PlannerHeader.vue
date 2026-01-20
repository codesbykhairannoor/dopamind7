<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import { usePage } from '@inertiajs/vue3'; 

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
</script>

<template>
    <div class="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 sticky top-0 z-30 transition-all">
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
                    @click="resetBoard" 
                    class="px-3 py-2.5 bg-rose-50 text-rose-500 rounded-xl font-bold hover:bg-rose-100 transition border border-rose-100 text-sm"
                    :title="$t('btn_reset_tooltip')"
                >
                    🔄
                </button>
            </div>
        </div>
    </div>
</template>