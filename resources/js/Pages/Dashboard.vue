<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage, Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const user = usePage().props.auth.user;

// Waktu sapaan dinamis berdasarkan jam
const greetingKey = computed(() => {
    const hour = new Date().getHours();
    if (hour < 11) return 'dash_greet_morning';
    if (hour < 15) return 'dash_greet_afternoon';
    if (hour < 19) return 'dash_greet_evening';
    return 'dash_greet_night';
});
</script>

<template>
    <Head :title="$t('nav_dashboard')" />

    <AuthenticatedLayout>
        <div class="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
            
            <div class="relative overflow-hidden bg-indigo-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl shadow-indigo-200">
                <div class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
                
                <div class="relative z-10">
                    <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-3">
                        {{ $t(greetingKey) }}, {{ user.name }}! 👋
                    </h2>
                    <p class="text-indigo-100 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                        {{ $t('dash_welcome_sub') }}
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <Link :href="route('habits.index')" class="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🌱</div>
                    <h3 class="text-xl font-black text-slate-800 mb-2">{{ $t('habit_page_title') }}</h3>
                    <p class="text-slate-500 text-sm font-medium mb-6 leading-relaxed">{{ $t('dash_habit_desc') }}</p>
                    <div class="text-emerald-600 font-bold text-sm flex items-center gap-2">
                        {{ $t('dash_open_module') }} 
                        <span class="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>

                <Link :href="route('planner.index')" class="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div class="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📅</div>
                    <h3 class="text-xl font-black text-slate-800 mb-2">Daily Planner</h3>
                    <p class="text-slate-500 text-sm font-medium mb-6 leading-relaxed">{{ $t('dash_planner_desc') }}</p>
                    <div class="text-amber-600 font-bold text-sm flex items-center gap-2">
                        {{ $t('dash_open_module') }} 
                        <span class="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>

                <Link :href="route('finance.index')" class="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">💸</div>
                    <h3 class="text-xl font-black text-slate-800 mb-2">Finance</h3>
                    <p class="text-slate-500 text-sm font-medium mb-6 leading-relaxed">{{ $t('dash_finance_desc') }}</p>
                    <div class="text-blue-600 font-bold text-sm flex items-center gap-2">
                        {{ $t('dash_open_module') }} 
                        <span class="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>

            </div>

            <div class="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30">
                        <span class="animate-pulse">✨</span>
                    </div>
                    <div>
                        <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">{{ $t('dash_status_label') }}</p>
                        <p class="text-xl font-black">Free Plan User</p>
                    </div>
                </div>
                <Link :href="route('settings.index')" class="bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-xl font-bold transition text-sm">
                    {{ $t('nav_settings') }}
                </Link>
            </div>
        </div>
    </AuthenticatedLayout>
</template>