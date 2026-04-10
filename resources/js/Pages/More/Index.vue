<script setup>
import { computed, ref } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import PremiumPreviewModal from '@/Components/PremiumPreviewModal.vue';
import { Gem, Sparkles, ArrowRight } from 'lucide-vue-next';

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

const isPreviewOpen = ref(false);
const activePreviewModule = ref('Journal');

const handleFeatureClick = (feature, targetRoute, moduleKey) => {
    if (canAccess(feature)) {
        router.visit(targetRoute);
    } else {
        activePreviewModule.value = moduleKey;
        isPreviewOpen.value = true;
    }
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

            <div class="grid grid-cols-2 gap-4">
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
                <div v-if="showModule('journal')" @click="handleFeatureClick('journal', route('journal.index'), 'Journal')" 
                        class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group cursor-pointer relative overflow-hidden"
                        :class="!canAccess('journal') ? 'bg-indigo-50/10 dark:bg-indigo-500/5' : ''">
                    <div v-if="!canAccess('journal')" class="absolute top-4 right-4 text-indigo-400 opacity-60">
                        <Gem :size="14" />
                    </div>
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
                </div>

                <!-- Calendar -->
                <div v-if="showModule('calendar')" @click="handleFeatureClick('calendar', route('calendar.index'), 'Calendar')" 
                        class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group cursor-pointer relative overflow-hidden"
                        :class="!canAccess('calendar') ? 'bg-rose-50/10 dark:bg-rose-500/5' : ''">
                    <div v-if="!canAccess('calendar')" class="absolute top-4 right-4 text-rose-400 opacity-60">
                        <Gem :size="14" />
                    </div>
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
                </div>

                <!-- Job Tracker -->
                <div v-if="showModule('job')" @click="handleFeatureClick('job', route('jobs.index'), 'Jobs')" 
                        class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group cursor-pointer relative overflow-hidden"
                        :class="!canAccess('job') ? 'bg-blue-50/10 dark:bg-blue-500/5' : ''">
                    <div v-if="!canAccess('job')" class="absolute top-4 right-4 text-blue-400 opacity-60">
                        <Gem :size="14" />
                    </div>
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
                </div>

                <!-- Goal Tracker -->
                <div v-if="showModule('goal')" @click="handleFeatureClick('goal', route('goals.index'), 'Goal')" 
                        class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group cursor-pointer relative overflow-hidden"
                        :class="!canAccess('goal') ? 'bg-amber-50/10 dark:bg-amber-500/5' : ''">
                    <div v-if="!canAccess('goal')" class="absolute top-4 right-4 text-amber-400 opacity-60">
                        <Gem :size="14" />
                    </div>
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
                </div>

                <!-- Settings removal handled by grid change -->
            </div>

            <!-- Premium Upgrade CTA (System Architect) -->
            <Link :href="route('billing')" class="mt-12 bg-slate-900 dark:bg-indigo-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group active:scale-[0.98] transition-all duration-500 block">
                <!-- Background Accents -->
                <div class="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-transparent opacity-50"></div>
                <div class="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                
                <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div class="max-w-xl">
                        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black mb-6 uppercase tracking-[0.2em] backdrop-blur-md border border-indigo-500/30">
                            <Sparkles :size="12" />
                            <span>Become an Architect</span>
                        </div>
                        <h4 class="text-3xl font-black mb-4 tracking-tighter leading-none">Desain Hidup Tanpa Batas.</h4>
                        <p class="text-slate-400 text-sm font-bold opacity-90 leading-relaxed">
                            Buka akses ke Neural OS, Strategic Discovery, dan ekosistem performa tinggi yang dirancang khusus untuk manifestasi ambisi Anda.
                        </p>
                    </div>
                    
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center gap-3 bg-white text-slate-900 px-8 py-5 rounded-3xl font-black text-sm shadow-xl hover:scale-105 transition-all duration-300">
                            Join the Elite Tier
                            <ArrowRight :size="18" stroke-width="3" />
                        </div>
                        <div class="flex items-center justify-center gap-1.5 opacity-40 text-[9px] font-black uppercase tracking-widest text-indigo-300">
                            <Gem :size="10" />
                            <span>Secure Checkout Enabled</span>
                        </div>
                    </div>
                </div>
            </Link>

            <PremiumPreviewModal 
                :isOpen="isPreviewOpen"
                :module="activePreviewModule"
                @close="isPreviewOpen = false"
            />
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
