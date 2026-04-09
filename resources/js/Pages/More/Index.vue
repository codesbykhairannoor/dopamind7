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

const isArchitect = computed(() => ['architect', 'quantum', 'legendary'].includes(user.value?.plan_type));

const canAccess = (feature) => {
    const freeFeatures = ['dashboard', 'habit', 'planner', 'finance'];
    if (freeFeatures.includes(feature)) return true;
    return isArchitect.value;
};
</script>

<template>
    <AuthenticatedLayout>
        <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 animate-in fade-in duration-700 px-6 transition-colors duration-500">
            <!-- Launchpad Header -->
            <div class="pt-16 pb-12">
                <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2 transition-colors duration-500">
                    {{ $t('more_launcher_title') }}
                </h1>
                <p class="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] transition-colors duration-500">
                    {{ $t('more_launcher_subtitle') }}
                </p>
            </div>

            <!-- Productivity Tools Grid (CORE) -->
            <div class="px-1 mb-4">
                <span class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">{{ $t('more_core_tools', 'Productivity Core') }}</span>
            </div>
                <!-- Daily Planner -->
                <Link v-if="showModule('planner')" :href="route('planner.index')" 
                        class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group">
                    <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-50 transition-all duration-300">
                        <OneForMindIcon name="planner" size="24" stroke-width="2.5" />
                    </div>
                    <div>
                        <span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500">{{ $t('nav_item_planner') }}</span>
                        <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500">{{ $t('nav_desc_planner') }}</span>
                    </div>
                </Link>

                <!-- Finance -->
                <Link v-if="showModule('finance')" :href="route('finance.index')" 
                        class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group">
                    <div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 transition-all duration-300">
                        <OneForMindIcon name="finance" size="24" stroke-width="2.5" />
                    </div>
                    <div>
                        <span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500">{{ $t('nav_item_finance') }}</span>
                        <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500">Wealth Tracking</span>
                    </div>
                </Link>
            </div>

            <!-- Platinum Suite Grid (LOCKED/PREMIUM) -->
            <div class="px-1 mt-10 mb-4">
                <span class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">{{ $t('more_premium_tools', 'Platinum Suite') }}</span>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <!-- Digital Journal -->
                <Link v-if="showModule('journal')" :href="canAccess('journal') ? route('journal.index') : route('billing')" 
                        class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                        :class="!canAccess('journal') ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''">
                    <div class="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center group-hover:bg-teal-600 dark:group-hover:bg-teal-500 transition-all duration-300">
                        <OneForMindIcon name="journal" size="24" stroke-width="2.5" />
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500">{{ $t('nav_item_journal') }}</span>
                            <div v-if="!canAccess('journal')" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)] mb-1"></div>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500">{{ $t('nav_desc_journal') }}</span>
                    </div>
                </Link>

                <!-- Calendar -->
                <Link v-if="showModule('calendar')" :href="canAccess('calendar') ? route('calendar.index') : route('billing')" 
                        class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                        :class="!canAccess('calendar') ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''">
                    <div class="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center group-hover:bg-rose-600 dark:group-hover:bg-rose-500 transition-all duration-300">
                        <OneForMindIcon name="calendar" size="24" stroke-width="2.5" />
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500">{{ $t('nav_item_calendar') }}</span>
                            <div v-if="!canAccess('calendar')" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)] mb-1"></div>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500">{{ $t('nav_desc_calendar') }}</span>
                    </div>
                </Link>

                <!-- Job Tracker -->
                <Link v-if="showModule('job')" :href="canAccess('job') ? route('jobs.index') : route('billing')" 
                        class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                        :class="!canAccess('job') ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''">
                    <div class="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-all duration-300">
                        <OneForMindIcon name="job" size="24" stroke-width="2.5" />
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500">{{ $t('nav_item_jobs') }}</span>
                            <div v-if="!canAccess('job')" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)] mb-1"></div>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500">{{ $t('nav_desc_jobs') }}</span>
                    </div>
                </Link>

                <!-- Goal Tracker -->
                <Link v-if="showModule('goal')" :href="canAccess('goal') ? route('goals.index') : route('billing')" 
                        class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group"
                        :class="!canAccess('goal') ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''">
                    <div class="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 dark:group-hover:bg-amber-500 transition-all duration-300">
                        <OneForMindIcon name="goal" size="24" stroke-width="2.5" />
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <span class="block font-black text-slate-800 dark:text-slate-100 text-base leading-none mb-1 transition-colors duration-500">{{ $t('nav_item_goals') }}</span>
                            <div v-if="!canAccess('goal')" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)] mb-1"></div>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500">{{ $t('nav_desc_goals') }}</span>
                    </div>
                </Link>

                <!-- Settings removal handled by grid change -->
            </div>

            <!-- Premium Upgrade CTA -->
            <Link :href="route('billing')" class="mt-12 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-xl dark:shadow-none relative overflow-hidden group active:scale-[0.98] transition-all duration-300 block">
                <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
                <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[9px] font-black mb-4 uppercase tracking-[0.2em] backdrop-blur-md border border-white/10">
                            {{ $t('more_upgrade_badge', 'PREMIUM UPGRADE') }}
                        </div>
                        <h4 class="text-2xl font-black mb-2 tracking-tight">{{ $t('more_upgrade_title', 'Elevate to Elite Performance') }}</h4>
                        <p class="text-indigo-100 text-sm font-bold opacity-90 leading-relaxed max-w-md">
                            {{ $t('more_upgrade_desc', 'Unlock AI-powered life insights, advanced wealth tracking, and seamless external integrations.') }}
                        </p>
                    </div>
                    <div class="flex items-center gap-3 bg-white text-indigo-700 px-6 py-4 rounded-2xl font-black text-sm shadow-xl group-hover:shadow-indigo-500/50 transition-all duration-300">
                        {{ $t('more_upgrade_btn', 'Upgrade Now') }}
                        <OneForMindIcon name="arrow-right" size="18" stroke-width="3" />
                    </div>
                </div>
            </Link>
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
