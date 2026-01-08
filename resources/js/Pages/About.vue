<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
</script>

<template>
    <Head title="Manifesto & Filosofi" />
    <GuestLayout>
        
        <div class="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider">
                👋 Hello, Humans.
            </div>
            <h1 class="text-5xl md:text-7xl font-black mb-6 text-gray-900 leading-tight">
                Kami Membuat Ini Karena<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Kami Lelah.</span>
            </h1>
            <p class="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Sebuah cerita jujur tentang burnout, notifikasi merah, dan pencarian kewarasan di dunia digital.
            </p>
        </div>

        <div class="max-w-6xl mx-auto px-6 pb-24 space-y-24">
            
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="order-2 md:order-1">
                    <h2 class="text-3xl font-black mb-6 text-gray-900">Awal Mula Kekacauan</h2>
                    <p class="text-gray-500 text-lg leading-relaxed mb-6">
                        Dulu, HP kami penuh dengan aplikasi produktivitas. Trello buat kerja, Notion buat catat ide, Excel buat keuangan. Kami pikir itu bikin produktif.
                    </p>
                    <p class="text-gray-500 text-lg leading-relaxed mb-6">
                        Kenyataannya? <strong>Kami malah jadi budak aplikasi.</strong> Kami menghabiskan lebih banyak waktu "mengatur" task daripada mengerjakannya.
                    </p>
                    
                    <div class="flex gap-4 mt-8">
                        <div class="bg-red-50 p-4 rounded-2xl w-full text-center border border-red-100">
                            <div class="text-2xl mb-2">🤯</div>
                            <div class="font-bold text-red-800 text-sm">Mental Clutter</div>
                        </div>
                         <div class="bg-orange-50 p-4 rounded-2xl w-full text-center border border-orange-100">
                            <div class="text-2xl mb-2">🔔</div>
                            <div class="font-bold text-orange-800 text-sm">Notif Anxiety</div>
                        </div>
                    </div>
                </div>
                
                <div class="order-1 md:order-2 relative h-96 bg-gray-100 rounded-[3rem] overflow-hidden flex items-center justify-center">
                    <div class="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 opacity-50"></div>
                    <div class="relative z-10 text-center transform rotate-3 transition hover:rotate-0 duration-500">
                        <div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs mx-auto">
                            <div class="flex justify-between text-xs text-gray-400 mb-4 font-bold tracking-widest uppercase">My To-Do List</div>
                            <div class="space-y-3">
                                <div class="h-3 bg-red-200 rounded w-full animate-pulse"></div>
                                <div class="h-3 bg-red-200 rounded w-3/4 animate-pulse"></div>
                                <div class="h-3 bg-red-200 rounded w-5/6 animate-pulse"></div>
                            </div>
                            <div class="mt-4 text-red-500 font-bold text-sm">⚠️ Overdue (99+)</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="relative h-96 bg-gray-100 rounded-[3rem] overflow-hidden flex items-center justify-center">
                    <div class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-100 opacity-50"></div>
                    <div class="text-9xl relative z-10 animate-bounce">🧘‍♂️</div>
                </div>

                <div>
                    <h2 class="text-3xl font-black mb-6 text-gray-900">Manusia Bukan Mesin</h2>
                    <p class="text-gray-500 text-lg leading-relaxed mb-6">
                        Kami sadar ada yang salah. Aplikasi modern memaksa kita lari maraton tanpa garis finish. Kalau lo gagal checklist habit sehari, lo dihukum dengan streak yang putus.
                    </p>
                    <div class="border-l-4 border-indigo-600 pl-6 py-4 bg-indigo-50/50 rounded-r-xl mb-6">
                        <p class="text-indigo-900 font-bold italic text-lg">
                            "Kita butuh sistem yang memaafkan (forgiving), bukan yang menghukum."
                        </p>
                    </div>
                    <p class="text-gray-500 text-lg leading-relaxed">
                        Akhirnya kami menciptakan konsep <strong>Monthly Reset</strong>. Sebuah tombol "Mulai Ulang" yang otomatis ditekan setiap tanggal 1.
                    </p>
                </div>
            </div>

        </div>

        <div class="bg-gray-900 text-white py-24 rounded-t-[3rem] md:rounded-[3rem] md:mx-6 mb-24 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-30 -mr-20 -mt-20"></div>

            <div class="max-w-6xl mx-auto px-6 relative z-10">
                <div class="text-center mb-16">
                    <h2 class="text-indigo-400 font-bold tracking-widest uppercase mb-2 text-sm">Manifesto Kami</h2>
                    <h3 class="text-4xl md:text-5xl font-black">3 Pilar Kewarasan</h3>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-gray-800 p-8 rounded-3xl border border-gray-700 hover:border-indigo-500 transition duration-300 group">
                        <div class="w-14 h-14 bg-gray-700 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 transition">🛡️</div>
                        <h4 class="text-xl font-bold mb-3">Privacy First</h4>
                        <p class="text-gray-400 leading-relaxed">
                            Data lo adalah urusan lo. Kami bukan perusahaan iklan. Kami gak jual data kebiasaan lo ke pihak ketiga.
                        </p>
                    </div>

                    <div class="bg-gray-800 p-8 rounded-3xl border border-gray-700 hover:border-indigo-500 transition duration-300 group">
                        <div class="w-14 h-14 bg-gray-700 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 transition">🔄</div>
                        <h4 class="text-xl font-bold mb-3">Fresh Start</h4>
                        <p class="text-gray-400 leading-relaxed">
                            Bulan baru = Lembaran baru. Data lama diarsipkan. Lo gak perlu bawa beban kegagalan bulan lalu ke bulan ini.
                        </p>
                    </div>

                    <div class="bg-gray-800 p-8 rounded-3xl border border-gray-700 hover:border-indigo-500 transition duration-300 group">
                        <div class="w-14 h-14 bg-gray-700 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 transition">🌱</div>
                        <h4 class="text-xl font-bold mb-3">Less is More</h4>
                        <p class="text-gray-400 leading-relaxed">
                            Anti fitur sampah. Kami cuma masukin fitur yang benar-benar lo butuhin buat hidup teratur. Gak ada gamification norak.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-4xl mx-auto px-6 pb-24 text-center">
            <h2 class="text-3xl font-black mb-12 text-gray-900">Siapa di Balik Layar?</h2>
            
            <div class="flex flex-col md:flex-row items-center justify-center gap-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div class="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-4xl shadow-lg ring-4 ring-indigo-50">
                    👨‍💻
                </div>
                
                <div class="text-left">
                    <h3 class="text-xl font-bold text-gray-900">Lo & Gue (The Community)</h3>
                    <p class="text-indigo-600 font-medium text-sm mb-2">Developer Indie & Early Adopters</p>
                    <p class="text-gray-500 max-w-lg">
                        DopMyMind dibangun oleh developer yang juga berjuang melawan burnout, untuk orang-orang yang merasakan hal yang sama.
                    </p>
                </div>
            </div>
        </div>

        <div class="bg-indigo-50 border-t border-indigo-100 py-24 text-center">
            <div class="max-w-3xl mx-auto px-6">
                <h2 class="text-4xl font-black mb-6 text-indigo-900">Udah Cukup Bacanya?</h2>
                <p class="text-xl text-indigo-700/70 mb-10">
                    Waktunya berhenti scrolling dan mulai atur hidup lo. Cuma butuh 2 menit buat setup.
                </p>
                <div class="flex justify-center gap-4">
                    <Link :href="route('register')" class="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                        Gabung Gratis
                    </Link>
                </div>
                <p class="mt-6 text-sm text-indigo-400">Tanpa Kartu Kredit. Batal kapan aja.</p>
            </div>
        </div>

    </GuestLayout>
</template>