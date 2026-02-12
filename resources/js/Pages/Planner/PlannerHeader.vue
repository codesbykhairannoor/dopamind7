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
    <div class="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 md:sticky top-0 z-30 transition-all">
        
        <div class="w-full flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div class="flex items-center gap-4 w-full md:w-auto">
                <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg shadow-indigo-200">
                    📅
                </div>
                <div>
                    <h2 class="text-xl font-black text-slate-800 tracking-tight">{{ $t('header_title') }}</h2>
                    <p class="text-slate-500 font-medium text-xs capitalize">{{ todayDate }}</p>
                </div>
            </div>

            <div class="flex-1 w-full md:px-12 max-w-4xl"> 
                <div class="flex justify-between text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">
                    <span>{{ $t('header_progress') }}</span>
                    <span class="text-indigo-600">{{ stats.percent }}%</span>
                </div>
                <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                    <div 
                        class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                        :style="{ width: `${stats.percent}%` }"
                    ></div>
                </div>
                <div class="flex gap-4 mt-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                    <span>⚡ {{ stats.completed }} {{ $t('header_completed') }}</span>
                    <span class="text-slate-300">|</span>
                    <span>⏳ {{ stats.pending }} {{ $t('header_pending') }}</span>
                </div>
            </div>

            <div class="flex gap-3 w-full md:w-auto">
                <button 
                    @click="openModal()" 
                    class="flex-1 md:flex-none px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 text-sm active:scale-95"
                >
                    <span>+</span> {{ $t('btn_add_task') }}
                </button>
                
                <button 
                    @click="resetBoard" 
                    class="px-4 py-3 bg-rose-50 text-rose-500 rounded-2xl font-black hover:bg-rose-100 transition border border-rose-100 text-sm active:scale-95 shadow-sm"
                    :title="$t('btn_reset_tooltip')"
                >
                    🔄
                </button>
            </div>
        </div>
    </div>
</template>