<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { ref } from 'vue';

defineProps({ canRegister: Boolean });

// State buat FAQ Accordion
const activeFaq = ref(null);
const toggleFaq = (index) => {
    activeFaq.value = activeFaq.value === index ? null : index;
};
</script>

<template>
    <Head title="Monthly Life Operating System" />
    <GuestLayout>
        
        <header class="pt-32 pb-24 px-6 text-center relative overflow-hidden">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/80 to-white rounded-full blur-[100px] -z-10"></div>
            
            <div class="max-w-5xl mx-auto animate-fade-in-up">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-600 font-bold text-xs mb-8 uppercase tracking-wider">
                    ✨ v1.0: The Anti-Burnout System
                </div>
                
                <h1 class="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight text-gray-900">
                    Atur Hidup.<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        Reset Tiap Bulan.
                    </span>
                </h1>
                
                <p class="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
                    Sistem operasi hidup yang otomatis membersihkan dirinya sendiri setiap tanggal 1. 
                    <span class="text-gray-900 font-medium">Fokus ke bulan ini, lupakan beban bulan lalu.</span>
                </p>
                
                <div v-if="!$page.props.auth.user" class="flex flex-col sm:flex-row justify-center gap-4">
                    <Link :href="route('register')" class="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                        Mulai Gratis Sekarang
                    </Link>
                    <Link :href="route('about')" class="bg-white text-gray-700 border border-gray-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition">
                        Pelajari Filosofinya
                    </Link>
                </div>
                <div v-else>
                    <Link :href="route('dashboard')" class="inline-block bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-xl transition">
                        Buka Dashboard Saya
                    </Link>
                </div>

                <div class="mt-20 relative mx-auto max-w-5xl">
                    <div class="bg-gray-900 rounded-t-[2rem] p-4 pb-0 shadow-2xl border border-gray-800">
                        <div class="bg-gray-800 rounded-t-xl p-6 h-48 md:h-80 flex items-end justify-center overflow-hidden relative">
                             <div class="absolute top-10 left-10 right-10 flex gap-4">
                                <div class="w-1/4 h-32 bg-gray-700/50 rounded-xl animate-pulse"></div>
                                <div class="w-1/4 h-32 bg-gray-700/50 rounded-xl animate-pulse delay-75"></div>
                                <div class="w-2/4 h-32 bg-gray-700/50 rounded-xl animate-pulse delay-150"></div>
                             </div>
                             <div class="text-gray-600 font-mono text-sm">Dashboard Preview</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <section class="py-24 bg-white">
            <div class="max-w-6xl mx-auto px-6 space-y-32">
                
                <div class="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div class="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6">📉</div>
                        <h2 class="text-4xl font-black mb-6 text-gray-900">Masalah: "Dosa" Masa Lalu</h2>
                        <p class="text-gray-500 text-lg leading-relaxed mb-6">
                            Aplikasi biasa menyimpan semua kegagalan lo. Checklist yang gak dicentang bulan lalu masih nongol hari ini. Itu bukan motivasi, itu <strong>beban mental</strong>.
                        </p>
                        <ul class="space-y-3 text-gray-600 font-medium">
                            <li class="flex items-center gap-3">
                                <span class="text-red-500">✕</span> Notifikasi "Overdue" yang numpuk.
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-red-500">✕</span> Streak putus bikin males lanjut.
                            </li>
                        </ul>
                    </div>
                    <div class="relative h-[400px] bg-gray-50 rounded-[3rem] border border-gray-100 p-8 flex items-center justify-center overflow-hidden">
                        <div class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                        
                        <div class="bg-white p-4 rounded-xl shadow-lg border border-red-100 absolute top-20 left-10 transform -rotate-6 w-48">
                            <div class="h-2 bg-red-200 w-1/2 rounded mb-2"></div>
                            <div class="text-xs text-red-500 font-bold">⚠️ Overdue 12 days</div>
                        </div>
                        <div class="bg-white p-4 rounded-xl shadow-lg border border-gray-100 absolute bottom-20 right-10 transform rotate-3 w-56">
                            <div class="h-2 bg-gray-200 w-3/4 rounded mb-2"></div>
                            <div class="text-xs text-gray-400">Task from 2024...</div>
                        </div>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-16 items-center">
                    <div class="order-2 md:order-1 relative h-[400px] bg-indigo-900 rounded-[3rem] p-8 flex items-center justify-center overflow-hidden">
                        <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-40"></div>
                        
                        <div class="grid grid-cols-2 gap-4 w-64">
                            <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                                <div class="text-2xl mb-2">💰</div>
                                <div class="text-xs text-white/70">Excel</div>
                            </div>
                            <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                                <div class="text-2xl mb-2">✅</div>
                                <div class="text-xs text-white/70">Todo</div>
                            </div>
                            <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center col-span-2">
                                <div class="text-2xl mb-2">🤯</div>
                                <div class="text-xs text-white/70">Too Many Apps</div>
                            </div>
                        </div>
                    </div>

                    <div class="order-1 md:order-2">
                        <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🧩</div>
                        <h2 class="text-4xl font-black mb-6 text-gray-900">Masalah: Otak Lo Capek Switch App</h2>
                        <p class="text-gray-500 text-lg leading-relaxed mb-6">
                            Habit di HP, Keuangan di Laptop, Jurnal di Buku. Energi lo habis cuma buat inget harus buka aplikasi yang mana.
                        </p>
                        <p class="text-indigo-600 font-bold text-lg">
                            DopMyMind menggabungkan Habit & Keuangan dalam satu Dashboard simpel.
                        </p>
                    </div>
                </div>

            </div>
        </section>

        <section class="py-32 bg-gray-50 border-y border-gray-200">
            <div class="max-w-7xl mx-auto px-6">
                <div class="text-center max-w-3xl mx-auto mb-20">
                    <h2 class="text-indigo-600 font-bold tracking-widest uppercase mb-4 text-sm">Solusi Kami</h2>
                    <h3 class="text-4xl font-black mb-6 text-gray-900">Satu Bulan. Satu Sistem.</h3>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300">
                        <div class="w-16 h-16 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center text-3xl mb-8">🌱</div>
                        <h4 class="text-2xl font-bold mb-4 text-gray-900">Habit Tracker</h4>
                        <p class="text-gray-500 leading-relaxed">
                            Ceklis harian tanpa ribet. Lacak progress lo visual. Hijau artinya jalan, abu-abu artinya skip. Simpel.
                        </p>
                    </div>

                    <div class="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300">
                        <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-3xl mb-8">💸</div>
                        <h4 class="text-2xl font-bold mb-4 text-gray-900">Money Flow</h4>
                        <p class="text-gray-500 leading-relaxed">
                            Input pengeluaran cuma 3 detik. "Kopi - 25k". Selesai. Liat kemana duit lo bocor bulan ini.
                        </p>
                    </div>

                    <div class="bg-indigo-600 p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-200 text-white relative overflow-hidden group">
                        <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition"></div>
                        <div class="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-3xl mb-8">🔄</div>
                        <h4 class="text-2xl font-bold mb-4">The Auto Reset</h4>
                        <p class="text-indigo-100 leading-relaxed">
                            Setiap tanggal 1 jam 00:00, sistem akan mengarsipkan data lama. Lo dapet lembaran baru yang bersih.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 bg-white">
            <div class="max-w-3xl mx-auto px-6">
                <h2 class="text-3xl font-black text-center mb-12">Yang Sering Ditanyain</h2>
                
                <div class="space-y-4">
                    <div class="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300" :class="activeFaq === 1 ? 'bg-gray-50 shadow-md' : 'bg-white'">
                        <button @click="toggleFaq(1)" class="flex justify-between items-center w-full p-6 text-left font-bold text-gray-900">
                            <span>Apakah data bulan lalu hilang selamanya?</span>
                            <span class="text-indigo-600 transition-transform" :class="activeFaq === 1 ? 'rotate-180' : ''">▼</span>
                        </button>
                        <div v-show="activeFaq === 1" class="px-6 pb-6 text-gray-500 leading-relaxed">
                            Enggak dong. Data lo aman tersimpan di <strong>Arsip History</strong>. Lo bisa liat kapan aja buat evaluasi. Tapi di halaman utama (Dashboard), mereka disembunyikan biar lo gak terbebani.
                        </div>
                    </div>

                    <div class="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300" :class="activeFaq === 2 ? 'bg-gray-50 shadow-md' : 'bg-white'">
                        <button @click="toggleFaq(2)" class="flex justify-between items-center w-full p-6 text-left font-bold text-gray-900">
                            <span>Ini beneran gratis?</span>
                            <span class="text-indigo-600 transition-transform" :class="activeFaq === 2 ? 'rotate-180' : ''">▼</span>
                        </button>
                        <div v-show="activeFaq === 2" class="px-6 pb-6 text-gray-500 leading-relaxed">
                            Yes. Fitur Habit & Finance Tracker yang lo liat sekarang itu <strong>GRATIS</strong>. Nanti kami akan rilis fitur Premium (misal: Export Excel, Analitik Tahunan), tapi fitur dasar akan selalu gratis.
                        </div>
                    </div>

                    <div class="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300" :class="activeFaq === 3 ? 'bg-gray-50 shadow-md' : 'bg-white'">
                        <button @click="toggleFaq(3)" class="flex justify-between items-center w-full p-6 text-left font-bold text-gray-900">
                            <span>Bisa dipake di HP gak?</span>
                            <span class="text-indigo-600 transition-transform" :class="activeFaq === 3 ? 'rotate-180' : ''">▼</span>
                        </button>
                        <div v-show="activeFaq === 3" class="px-6 pb-6 text-gray-500 leading-relaxed">
                            Bisa banget! Website ini responsif. Lo buka di Chrome/Safari HP, tampilannya bakal kayak aplikasi native. Coba aja!
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 px-6 text-center">
            <div class="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl">
                <div class="absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-30"></div>
                <div class="absolute bottom-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-30"></div>

                <div class="relative z-10">
                    <h2 class="text-4xl md:text-6xl font-black mb-8 leading-tight">Siap Reset Hidup Lo?</h2>
                    <p class="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
                        Jangan nunggu tahun baru buat mulai. Mulai sekarang, evaluasi bulan depan. Tanpa resiko.
                    </p>
                    <Link :href="route('register')" class="inline-block bg-white text-gray-900 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl">
                        Bikin Akun Gratis
                    </Link>
                    <p class="mt-8 text-sm text-gray-500 font-medium">✨ Bergabung dengan 100+ Early Adopters</p>
                </div>
            </div>
        </section>

    </GuestLayout>
</template>