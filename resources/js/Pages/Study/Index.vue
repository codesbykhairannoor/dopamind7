<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { BookOpen, Sparkles, ChevronRight, ArrowLeft } from 'lucide-vue-next';

defineProps({
    user: { type: Object, required: true }
});
</script>

<template>
    <Head title="Study Console Lobby" />

    <div class="h-screen w-full bg-slate-950 flex flex-col md:flex-row overflow-hidden relative">
        <!-- Return Home Button -->
        <Link :href="route('home')" class="absolute top-6 left-6 z-50 text-slate-400 hover:text-white flex items-center gap-2 transition-colors bg-slate-900/50 p-2 rounded-full backdrop-blur-md">
            <ArrowLeft class="h-5 w-5" />
            <span class="text-xs font-bold uppercase tracking-widest hidden md:inline">{{ $t('study_back', 'Kembali') }}</span>
        </Link>

        <!-- {{ $t('study_academic_binder_title', 'Academic Binder') }} Portal -->
        <Link :href="route('study.academic')" class="group relative flex-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 hover:bg-slate-900/50 transition-all duration-500 overflow-hidden cursor-pointer">
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div class="z-10 text-center p-8 transform group-hover:scale-105 transition-transform duration-500">
                <div class="h-24 w-24 mx-auto mb-6 bg-emerald-500/20 rounded-[2rem] flex items-center justify-center border border-emerald-500/30 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all">
                    <BookOpen class="h-12 w-12 text-emerald-400" />
                </div>
                <h2 class="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">{{ $t('study_academic_binder_title', 'Academic Binder') }}</h2>
                <p class="text-slate-400 max-w-sm mx-auto text-sm">
                    {{ $t('study_academic_binder_desc', 'Simpan dan kelola seluruh arsip kuliah, nilai, dan dokumen per mata kuliah dalam satu wadah fleksibel tanpa batas.') }}
                </p>
                <div class="mt-8 flex items-center justify-center gap-2 text-emerald-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    {{ $t('study_academic_binder_open', 'Buka Binder') }} <ChevronRight class="h-5 w-5" />
                </div>
            </div>
        </Link>

        <!-- {{ $t('study_neural_portfolio_title', 'Neural Portfolio') }} Portal -->
        <Link :href="route('study.portfolio')" class="group relative flex-1 flex flex-col items-center justify-center hover:bg-slate-900/50 transition-all duration-500 overflow-hidden cursor-pointer">
            <div class="absolute inset-0 bg-gradient-to-bl from-indigo-500/10 to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div class="z-10 text-center p-8 transform group-hover:scale-105 transition-transform duration-500">
                <div class="h-24 w-24 mx-auto mb-6 bg-indigo-500/20 rounded-[2rem] flex items-center justify-center border border-indigo-500/30 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all">
                    <Sparkles class="h-12 w-12 text-indigo-400" />
                </div>
                <h2 class="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">{{ $t('study_neural_portfolio_title', 'Neural Portfolio') }}</h2>
                <p class="text-slate-400 max-w-sm mx-auto text-sm">
                    {{ $t('study_neural_portfolio_desc', 'Unggah karya Anda dan biarkan AI merangkai portofolio kompetensi publik yang memukau untuk memikat rekruter.') }}
                </p>
                <div class="mt-8 flex items-center justify-center gap-2 text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    {{ $t('study_neural_portfolio_open', 'Masuk Ruang AI') }} <ChevronRight class="h-5 w-5" />
                </div>
            </div>
        </Link>
    </div>
</template>
