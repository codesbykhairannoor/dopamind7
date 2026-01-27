<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

// Terima data settingan dari Controller
const props = defineProps({ userSettings: Object });

// Setup Form
const form = useForm({
    settings: {
        modules: {
            habit: props.userSettings?.modules?.habit ?? true, 
            planner: props.userSettings?.modules?.planner ?? true,
            finance: props.userSettings?.modules?.finance ?? true, // Pastikan ini ada
        }
    }
});

// Fungsi Simpan Otomatis pas diklik
const saveSettings = () => {
    form.post(route('settings.update'), { 
        preserveScroll: true,
    });
};
</script>

<template>
    <Head title="Pengaturan" />

    <AuthenticatedLayout>
        <div class="max-w-2xl mx-auto py-12 px-4">
            
            <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h2 class="text-2xl font-black text-slate-800 mb-2">Atur Aplikasi Kamu</h2>
                <p class="text-slate-400 mb-8">Pilih fitur mana saja yang ingin kamu tampilkan di sidebar.</p>
                
                <form class="space-y-4">
                    
                    <div class="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 transition hover:border-indigo-200">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">🌱</div>
                            <div>
                                <h4 class="font-bold text-slate-700 text-lg">Habit Tracker</h4>
                                <p class="text-xs text-slate-400">Pantau kebiasaan harianmu</p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="form.settings.modules.habit" class="sr-only peer" @change="saveSettings">
                            <div class="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500"></div>
                        </label>
                    </div>

                    <div class="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 transition hover:border-indigo-200">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">📅</div>
                            <div>
                                <h4 class="font-bold text-slate-700 text-lg">Daily Planner</h4>
                                <p class="text-xs text-slate-400">Jadwal & Agenda Harian</p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="form.settings.modules.planner" class="sr-only peer" @change="saveSettings">
                            <div class="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500"></div>
                        </label>
                    </div>

                    <div class="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 transition hover:border-indigo-200">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">💸</div>
                            <div>
                                <h4 class="font-bold text-slate-700 text-lg">Finance Management</h4>
                                <p class="text-xs text-slate-400">Atur budget & pengeluaran</p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="form.settings.modules.finance" class="sr-only peer" @change="saveSettings">
                            <div class="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500"></div>
                        </label>
                    </div>

                    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <div v-if="form.recentlySuccessful" class="text-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg text-sm font-bold border border-emerald-100 mt-4">
                            ✨ Pengaturan tersimpan otomatis!
                        </div>
                    </transition>

                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>