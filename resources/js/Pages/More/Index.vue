<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const page = usePage();
const user = computed(() => page.props.auth.user);

const showModule = (moduleName) => {
    return user.value?.settings?.modules?.[moduleName] !== false;
};
</script>

<template>
    <AuthenticatedLayout>
        <div class="min-h-screen bg-[#F8FAFC] pb-40 animate-in fade-in duration-700 px-6">
            <!-- Launchpad Header -->
            <div class="pt-16 pb-12">
                <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">
                    {{ $t('more_launcher_title', 'App Launcher') }}
                </h1>
                <p class="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                    {{ $t('more_launcher_subtitle', 'Pilih alat produktivitas Anda') }}
                </p>
            </div>

            <!-- Productivity Tools Grid -->
            <div class="grid grid-cols-2 gap-4">
                <!-- Daily Planner -->
                <Link v-if="showModule('planner')" :href="route('planner.index')" 
                        class="bg-white p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-4 active:scale-95 transition-all group">
                    <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        <OneForMindIcon name="planner" size="24" stroke-width="2.5" />
                    </div>
                    <div>
                        <span class="block font-black text-slate-800 text-base leading-none mb-1">{{ $t('nav_planner', 'Planner') }}</span>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{{ $t('more_desc_planner', 'Kelola Jadwal') }}</span>
                    </div>
                </Link>

                <!-- Digital Journal -->
                <Link v-if="showModule('journal')" :href="route('journal.index')" 
                        class="bg-white p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-4 active:scale-95 transition-all group">
                    <div class="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                        <OneForMindIcon name="journal" size="24" stroke-width="2.5" />
                    </div>
                    <div>
                        <span class="block font-black text-slate-800 text-base leading-none mb-1">{{ $t('nav_journal', 'Journal') }}</span>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{{ $t('more_desc_journal', 'Refleksi Diri') }}</span>
                    </div>
                </Link>

                <!-- Calendar -->
                <Link v-if="showModule('calendar')" :href="route('calendar.index')" 
                        class="bg-white p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-4 active:scale-95 transition-all group">
                    <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                        <OneForMindIcon name="calendar" size="24" stroke-width="2.5" />
                    </div>
                    <div>
                        <span class="block font-black text-slate-800 text-base leading-none mb-1">{{ $t('nav_calendar', 'Calendar') }}</span>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{{ $t('more_desc_calendar', 'Blokir Waktu') }}</span>
                    </div>
                </Link>

                <!-- Job Tracker -->
                <Link v-if="showModule('job')" :href="route('jobs.index')" 
                        class="bg-white p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-4 active:scale-95 transition-all group">
                    <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <OneForMindIcon name="job" size="24" stroke-width="2.5" />
                    </div>
                    <div>
                        <span class="block font-black text-slate-800 text-base leading-none mb-1">{{ $t('nav_jobs', 'Jobs') }}</span>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{{ $t('more_desc_jobs', 'Pantau Karir') }}</span>
                    </div>
                </Link>

                <!-- Goal Tracker -->
                <Link v-if="showModule('goal')" :href="route('goals.index')" 
                        class="bg-white p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-4 active:scale-95 transition-all group lg:col-span-1 col-span-2">
                    <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                        <OneForMindIcon name="goal" size="24" stroke-width="2.5" />
                    </div>
                    <div>
                        <span class="block font-black text-slate-800 text-base leading-none mb-1">{{ $t('nav_goals', 'Goals') }}</span>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{{ $t('more_desc_goals', 'Capai Impian') }}</span>
                    </div>
                </Link>
            </div>

            <!-- Promotion / Tip Placeholder -->
            <div class="mt-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/4 -translate-y-1/4"></div>
                <h4 class="text-xl font-black mb-2">{{ $t('more_promo_title', 'Stay Sharp') }}</h4>
                <p class="text-indigo-100 text-sm font-bold opacity-80 leading-relaxed">{{ $t('more_promo_desc', 'Gunakan Planner setiap pagi untuk hasil maksimal.') }}</p>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.animate-in {
    animation-duration: 0.6s;
    animation-fill-mode: both;
}
.fade-in {
    animation-name: fadeIn;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
