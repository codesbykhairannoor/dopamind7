<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, usePage, router } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({ userSettings: Object });
const page = usePage();

// Dapatkan bahasa saat ini dari global props
const currentLang = computed(() => page.props.locale || 'id');

const form = useForm({
    settings: {
        modules: {
            habit: props.userSettings?.modules?.habit ?? true, 
            planner: props.userSettings?.modules?.planner ?? true,
            finance: props.userSettings?.modules?.finance ?? true, 
            journal: props.userSettings?.modules?.journal ?? true, 
            calendar: props.userSettings?.modules?.calendar ?? true, 
        }
    }
});

const saveSettings = () => {
    form.post(route('settings.update'), { 
        preserveScroll: true,
    });
};

// Fungsi Ganti Bahasa Pindah ke Sini
const switchLang = (lang) => {
    if (currentLang.value === lang) return;
    router.get(route('lang.switch', lang), {}, {
        preserveState: false,
        preserveScroll: false,
        replace: true
    });
};
</script>

<template>
    <Head :title="$t('settings_title', 'Pengaturan')" />

    <AuthenticatedLayout>
        <div class="max-w-3xl mx-auto py-12 px-4 sm:px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div>
                <h1 class="text-3xl font-black text-slate-800 tracking-tight">{{ $t('settings_title', 'Pengaturan') }}</h1>
                <p class="text-sm font-medium text-slate-500 mt-1">{{ $t('settings_desc', 'Sesuaikan pengalaman aplikasi Oneformind Anda.') }}</p>
            </div>

            <div class="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-sm border border-slate-100">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">🌐</div>
                    <div>
                        <h2 class="text-lg font-black text-slate-800 leading-tight">{{ $t('settings_language_title', 'Bahasa Aplikasi') }}</h2>
                        <p class="text-xs font-bold text-slate-400">{{ $t('settings_language_desc', 'Pilih bahasa antarmuka aplikasi.') }}</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button @click="switchLang('id')" class="relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300"
                        :class="currentLang === 'id' ? 'border-indigo-600 bg-indigo-50/50 shadow-md' : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50'">
                        <span class="text-4xl mb-2 drop-shadow-sm">🇮🇩</span>
                        <span class="font-black text-sm" :class="currentLang === 'id' ? 'text-indigo-800' : 'text-slate-600'">Indonesia</span>
                        <div v-if="currentLang === 'id'" class="absolute top-3 right-3 text-indigo-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                    </button>
                    
                    <button @click="switchLang('en')" class="relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300"
                        :class="currentLang === 'en' ? 'border-indigo-600 bg-indigo-50/50 shadow-md' : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50'">
                        <span class="text-4xl mb-2 drop-shadow-sm">🇬🇧</span>
                        <span class="font-black text-sm" :class="currentLang === 'en' ? 'text-indigo-800' : 'text-slate-600'">English</span>
                        <div v-if="currentLang === 'en'" class="absolute top-3 right-3 text-indigo-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                    </button>
                </div>
            </div>
            
            <div class="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-sm border border-slate-100">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">🧩</div>
                    <div>
                        <h2 class="text-lg font-black text-slate-800 leading-tight">{{ $t('settings_modules_title', 'Modul Aplikasi') }}</h2>
                        <p class="text-xs font-bold text-slate-400">{{ $t('settings_modules_desc', 'Aktifkan atau nonaktifkan fitur yang ingin kamu gunakan.') }}</p>
                    </div>
                </div>
                
                <form class="space-y-4">
                    
                    <div class="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-indigo-200 transition-colors">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">🌱</div>
                            <div>
                                <h4 class="font-black text-slate-700 text-sm sm:text-base">{{ $t('habit_page_title', 'Habit Tracker') }}</h4>
                                <p class="text-[11px] font-medium text-slate-500">{{ $t('module_habit_desc', 'Pantau kebiasaan harianmu') }}</p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="form.settings.modules.habit" class="sr-only peer" @change="saveSettings">
                            <div class="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 shadow-inner"></div>
                        </label>
                    </div>

                    <div class="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-indigo-200 transition-colors">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">📋</div>
                            <div>
                                <h4 class="font-black text-slate-700 text-sm sm:text-base">Daily Planner</h4>
                                <p class="text-[11px] font-medium text-slate-500">{{ $t('module_planner_desc', 'Jadwal & Agenda Harian') }}</p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="form.settings.modules.planner" class="sr-only peer" @change="saveSettings">
                            <div class="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 shadow-inner"></div>
                        </label>
                    </div>

                    <div class="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-indigo-200 transition-colors">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">💸</div>
                            <div>
                                <h4 class="font-black text-slate-700 text-sm sm:text-base">Finance Management</h4>
                                <p class="text-[11px] font-medium text-slate-500">{{ $t('module_finance_desc', 'Atur budget & pengeluaran') }}</p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="form.settings.modules.finance" class="sr-only peer" @change="saveSettings">
                            <div class="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 shadow-inner"></div>
                        </label>
                    </div>

                     <div class="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-indigo-200 transition-colors">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">📓</div>
                            <div>
                                <h4 class="font-black text-slate-700 text-sm sm:text-base">Journal</h4>
                                <p class="text-[11px] font-medium text-slate-500">{{ $t('module_journal_desc', 'Catat kegiatan harian') }}</p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="form.settings.modules.journal" class="sr-only peer" @change="saveSettings">
                            <div class="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 shadow-inner"></div>
                        </label>
                    </div>

                     <div class="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-indigo-200 transition-colors">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">📅</div>
                            <div>
                                <h4 class="font-black text-slate-700 text-sm sm:text-base">Calendar</h4>
                                <p class="text-[11px] font-medium text-slate-500">Jadwal Kalender Global</p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="form.settings.modules.calendar" class="sr-only peer" @change="saveSettings">
                            <div class="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 shadow-inner"></div>
                        </label>
                    </div>

                    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <div v-if="form.recentlySuccessful" class="text-center bg-emerald-50 text-emerald-600 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100 mt-6 shadow-sm">
                            ✨ {{ $t('settings_saved', 'Pengaturan tersimpan otomatis!') }}
                        </div>
                    </transition>

                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>