<script setup>
import { computed, ref } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import PremiumPreviewModal from '@/Components/PremiumPreviewModal.vue';
import { Gem, Sparkles, ArrowRight, Zap, Target, Briefcase, Calendar, BookText, Settings, ShieldCheck } from 'lucide-vue-next';
import { useGating } from '@/Composables/useGating';

const { isExplorer, isArchitect, isQuantum, isLegendary, canUse } = useGating();

const isPreviewOpen = ref(false);
const activePreviewModule = ref('Journal');

const handleFeatureClick = (feature, targetRoute, moduleKey) => {
    if (canUse(feature)) {
        router.visit(targetRoute);
    } else {
        activePreviewModule.value = moduleKey;
        isPreviewOpen.value = true;
    }
};

const ctaConfig = computed(() => {
    if (isLegendary.value) return null;
    if (isQuantum.value) return {
        label: 'Quantum Status Active',
        title: 'Neural access granted.',
        desc: 'You have full access to the OneForMind Neural Ecosystem.',
        btnText: 'Manage Subscription',
        route: 'billing'
    };
    if (isArchitect.value) return {
        label: 'Upgrade to Quantum',
        title: 'Unlock Neural Power.',
        desc: 'Access AI-powered insights, neural forecasting, and automated manifest tools.',
        btnText: 'Get Quantum Access',
        route: 'billing'
    };
    return {
        label: 'Become an Architect',
        title: 'Desain Hidup Tanpa Batas.',
        desc: 'Buka akses ke Platinum Suite dan ekosistem performa tinggi.',
        btnText: 'Join the Elite Tier',
        route: 'billing'
    };
});
</script>

<template>
    <AuthenticatedLayout>
        <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 animate-in fade-in duration-700 px-6 transition-colors duration-500">
            
            <!-- Launchpad Header (Redesigned for Premium Look) -->
            <div class="pt-16 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div class="flex items-center gap-2 mb-3">
                        <span class="w-8 h-[2px] bg-indigo-500 rounded-full"></span>
                        <p class="text-indigo-500 dark:text-indigo-400 font-black uppercase tracking-[0.3em] text-[9px]">
                            {{ isLegendary ? 'Legendary OS' : isQuantum ? 'Quantum OS' : isArchitect ? 'Architect OS' : 'Explorer OS' }}
                        </p>
                    </div>
                    <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors duration-500">
                         Universal Terminal
                    </h1>
                </div>

                <div v-if="isLegendary" class="flex items-center gap-3 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md cursor-default group">
                    <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none transition-transform group-hover:scale-110">
                        <Gem :size="20" stroke-width="2.5" />
                    </div>
                    <div class="text-left">
                        <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Lifetime</p>
                        <p class="text-xs font-black text-slate-800 dark:text-white leading-none">Legendary Tier</p>
                    </div>
                </div>
            </div>

            <!-- Core Grid (High Density) -->
            <div class="space-y-10">
                <!-- Productivity Essentials -->
                <div>
                    <div class="px-1 mb-5 flex items-center justify-between">
                         <span class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                             <Target :size="12" /> Productivity Essentials
                         </span>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <!-- Habits -->
                        <Link :href="route('habits.index')" 
                              class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group overflow-hidden relative">
                            <div class="absolute -right-4 -bottom-4 text-indigo-500/5 group-hover:scale-150 transition-transform duration-700">
                                <OneForMindIcon name="habit" size="80" />
                            </div>
                            <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-50 transition-all duration-300 relative z-10">
                                <OneForMindIcon name="habit" size="24" stroke-width="2.5" />
                            </div>
                            <div class="relative z-10">
                                <span class="block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1">Habits</span>
                                <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500">Architecture</span>
                            </div>
                        </Link>

                        <!-- Planner -->
                        <Link :href="route('planner.index')" 
                              class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group overflow-hidden relative">
                            <div class="absolute -right-4 -bottom-4 text-purple-500/5 group-hover:scale-150 transition-transform duration-700">
                                <OneForMindIcon name="planner" size="80" />
                            </div>
                            <div class="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 dark:group-hover:bg-purple-50 transition-all duration-300 relative z-10">
                                <OneForMindIcon name="planner" size="24" stroke-width="2.5" />
                            </div>
                            <div class="relative z-10">
                                <span class="block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1">Planner</span>
                                <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500">Daily Flow</span>
                            </div>
                        </Link>

                        <!-- Finance -->
                        <Link :href="route('finance.index')" 
                              class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group overflow-hidden relative">
                            <div class="absolute -right-4 -bottom-4 text-emerald-500/5 group-hover:scale-150 transition-transform duration-700">
                                <OneForMindIcon name="finance" size="80" />
                            </div>
                            <div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 dark:group-hover:bg-emerald-50 transition-all duration-300 relative z-10">
                                <OneForMindIcon name="finance" size="24" stroke-width="2.5" />
                            </div>
                            <div class="relative z-10">
                                <span class="block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1">Finance</span>
                                <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500">Asset Control</span>
                            </div>
                        </Link>

                        <!-- Goals -->
                         <div @click="handleFeatureClick('goal', route('goals.index'), 'Goal')" 
                              class="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 active:scale-95 transition-all group overflow-hidden relative cursor-pointer">
                            <div v-if="isExplorer" class="absolute top-4 right-4 text-amber-500/40">
                                <Gem :size="14" />
                            </div>
                            <div class="absolute -right-4 -bottom-4 text-amber-500/5 group-hover:scale-150 transition-transform duration-700">
                                <OneForMindIcon name="goal" size="80" />
                            </div>
                            <div class="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 dark:group-hover:bg-amber-50 transition-all duration-300 relative z-10">
                                <OneForMindIcon name="goal" size="24" stroke-width="2.5" />
                            </div>
                            <div class="relative z-10">
                                <span class="block font-black text-slate-800 dark:text-slate-100 text-sm md:text-base leading-none mb-1">Goal Lab</span>
                                <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500">Strategic Target</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Platinum Extensions -->
                <div>
                    <div class="px-1 mb-5 flex items-center justify-between">
                         <span class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                             <Sparkles :size="12" /> Platinum Extensions
                         </span>
                    </div>

                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                         <!-- Journal -->
                        <div @click="handleFeatureClick('journal', route('journal.index'), 'Journal')" 
                              class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:border-indigo-500/30 transition-all cursor-pointer group active:scale-95">
                            <div class="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <BookText :size="20" />
                            </div>
                            <div>
                                <h4 class="text-sm font-black text-slate-800 dark:text-white leading-none mb-1">Journal</h4>
                                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Self Review</p>
                            </div>
                            <div v-if="isExplorer" class="ml-auto opacity-30"><Gem :size="12" /></div>
                        </div>

                        <!-- Calendar -->
                        <div @click="handleFeatureClick('calendar', route('calendar.index'), 'Calendar')" 
                              class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:border-indigo-500/30 transition-all cursor-pointer group active:scale-95">
                            <div class="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Calendar :size="20" />
                            </div>
                            <div>
                                <h4 class="text-sm font-black text-slate-800 dark:text-white leading-none mb-1">Schedule</h4>
                                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Master Plan</p>
                            </div>
                            <div v-if="isExplorer" class="ml-auto opacity-30"><Gem :size="12" /></div>
                        </div>

                        <!-- Job Tracker -->
                        <div @click="handleFeatureClick('job', route('jobs.index'), 'Jobs')" 
                              class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:border-indigo-500/30 transition-all cursor-pointer group active:scale-95">
                            <div class="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Briefcase :size="20" />
                            </div>
                            <div>
                                <h4 class="text-sm font-black text-slate-800 dark:text-white leading-none mb-1">Career</h4>
                                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Job Tracker</p>
                            </div>
                            <div v-if="isExplorer" class="ml-auto opacity-30"><Gem :size="12" /></div>
                        </div>

                         <!-- Profile Settings (Quick Access) -->
                        <Link :href="route('profile.edit')" 
                              class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5 hover:border-indigo-500/30 transition-all group active:scale-95">
                            <div class="w-12 h-12 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 dark:group-hover:bg-white dark:group-hover:text-slate-900 group-hover:text-white transition-all">
                                <Settings :size="20" />
                            </div>
                            <div>
                                <h4 class="text-sm font-black text-slate-800 dark:text-white leading-none mb-1">Settings</h4>
                                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Configuration</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <!-- Premium Lifecycle CTA -->
                <transition enter-active-class="transition-all duration-700 ease-out" enter-from-class="opacity-0 translate-y-10 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100">
                    <Link v-if="ctaConfig" :href="route(ctaConfig.route)" 
                          class="bg-slate-900 dark:bg-indigo-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group active:scale-[0.98] transition-all duration-500 block border border-white/5">
                        
                        <!-- Mesh Gradient Background -->
                        <div class="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-br from-indigo-600/30 via-transparent to-transparent opacity-60"></div>
                        <div class="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                        
                        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                            <div class="max-w-xl">
                                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-black mb-6 uppercase tracking-[0.2em] backdrop-blur-md border border-indigo-500/30 animate-pulse">
                                    <Sparkles :size="12" />
                                    <span>{{ ctaConfig.label }}</span>
                                </div>
                                <h4 class="text-3xl md:text-4xl font-black mb-4 tracking-tighter leading-tight group-hover:translate-x-1 transition-transform">{{ ctaConfig.title }}</h4>
                                <p class="text-indigo-200/60 text-sm font-bold leading-relaxed">
                                    {{ ctaConfig.desc }}
                                </p>
                            </div>
                            
                            <div class="flex flex-col gap-4 shrink-0">
                                <div class="flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-[1.8rem] font-black text-sm shadow-2xl hover:bg-indigo-50 transition-all duration-300">
                                    {{ ctaConfig.btnText }}
                                    <ArrowRight :size="18" stroke-width="3" class="group-hover:translate-x-2 transition-transform duration-500" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <!-- Legendary Terminal Greeting -->
                    <div v-else class="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border-2 border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden group transition-all duration-500 flex flex-col items-center text-center">
                        <div class="absolute inset-0 bg-gradient-to-b from-indigo-50/50 dark:from-indigo-500/5 to-transparent"></div>
                        <div class="relative z-10">
                            <div class="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-2xl shadow-indigo-200 dark:shadow-none mx-auto rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                <ShieldCheck :size="40" stroke-width="2.5" />
                            </div>
                            <p class="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] mb-3">Priority Protocol Active</p>
                            <h4 class="text-3xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">Access Granted, Legendary.</h4>
                            <p class="text-sm font-bold text-slate-400 dark:text-slate-500 max-w-sm mx-auto leading-relaxed">
                                You are operating at the highest architectural tier. Your lifecycle access is secured indefinitely.
                            </p>
                        </div>
                    </div>
                </transition>
            </div>

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
    animation-duration: 0.8s;
    animation-fill-mode: both;
}
.fade-in {
    animation-name: fadeIn;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
