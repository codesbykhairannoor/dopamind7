<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage, Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const user = usePage().props.auth.user;

// Waktu sapaan dinamis
const greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 19) return 'Selamat Sore';
    return 'Selamat Malam';
});
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
            
            <div class="relative overflow-hidden bg-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-indigo-200">
                <div class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
                <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-400 opacity-20 rounded-full blur-2xl"></div>

                <div class="relative z-10">
                    <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-2">
                        {{ greeting }}, {{ user.name }}! 👋
                    </h2>
                    <p class="text-indigo-100 text-lg md:text-xl font-medium max-w-2xl">
                        Siap membuat progres 1% lebih baik hari ini? Yuk cek habit kamu.
                    </p>
                    
                    <div class="mt-8 flex flex-wrap gap-4">
                        <Link :href="route('habits.index')" class="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg transform hover:-translate-y-1">
                            🌱 Buka Habit Tracker
                        </Link>
                        <Link v-if="user.settings?.modules?.planner" :href="route('planner.index')" class="bg-indigo-700/50 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition backdrop-blur-sm">
                            📅 Cek Jadwal
                        </Link>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
                    <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-4">🔥</div>
                    <div class="text-slate-500 font-bold text-xs uppercase tracking-wider">Total Habit</div>
                    <div class="text-3xl font-black text-slate-800 mt-1">
                        5 Habit
                    </div>
                </div>

                <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
                    <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mb-4">⚡</div>
                    <div class="text-slate-500 font-bold text-xs uppercase tracking-wider">Current Streak</div>
                    <div class="text-3xl font-black text-slate-800 mt-1">12 Hari</div>
                </div>

                <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
                    <div class="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-2xl mb-4">❤️</div>
                    <div class="text-slate-500 font-bold text-xs uppercase tracking-wider">Status Member</div>
                    <div class="text-3xl font-black text-slate-800 mt-1">
                        {{ user.is_premium ? 'Premium' : 'Free Plan' }}
                    </div>
                </div>
            </div>

            <div class="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-64 flex flex-col items-center justify-center text-slate-400">
                <span class="text-4xl mb-4">📊</span>
                <p class="font-bold">Grafik Analitik akan muncul di sini</p>
                <p class="text-sm">(Fitur coming soon)</p>
            </div>

        </div>
    </AuthenticatedLayout>
</template>