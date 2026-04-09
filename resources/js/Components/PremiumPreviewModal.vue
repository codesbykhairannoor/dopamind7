<script setup>
import { computed } from 'vue';
import { router } from '@inertiajs/vue3';
import { Lock, CheckCircle2, ArrowRight, Sparkles, Zap, ShieldCheck, RefreshCcw, Layout, FileSearch2, Send, Rocket } from 'lucide-vue-next';

const props = defineProps({
    isOpen: Boolean,
    module: { type: String, default: 'Journal' },
    onClose: Function
});

const benefits = computed(() => {
    if (props.module === 'Journal') {
        return [
            { icon: Sparkles, text: 'preview_journal_benefit_1', color: 'text-indigo-500' },
            { icon: Zap, text: 'preview_journal_benefit_2', color: 'text-amber-500' },
            { icon: ShieldCheck, text: 'preview_journal_benefit_3', color: 'text-emerald-500' }
        ];
    }
    if (props.module === 'Calendar') {
        return [
            { icon: RefreshCcw, text: 'preview_calendar_benefit_1', color: 'text-indigo-500' },
            { icon: Zap, text: 'preview_calendar_benefit_2', color: 'text-orange-500' },
            { icon: Layout, text: 'preview_calendar_benefit_3', color: 'text-purple-500' }
        ];
    }
    if (props.module === 'Jobs') {
        return [
            { icon: FileSearch2, text: 'preview_job_benefit_1', color: 'text-indigo-500' },
            { icon: Send, text: 'preview_job_benefit_2', color: 'text-emerald-500' },
            { icon: Rocket, text: 'preview_job_benefit_3', color: 'text-amber-500' }
        ];
    }
    return [];
});

const handleViewPlans = () => {
    router.visit(route('billing'), { data: { from: `preview_${props.module.toLowerCase()}` } });
};

const handleGoBack = () => {
    if (props.onClose) {
        props.onClose();
    } else {
        router.visit(route('dashboard'));
    }
};
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500" @click="handleGoBack"></div>

        <!-- Modal Container -->
        <div class="relative w-full max-w-lg bg-white dark:bg-slate-950 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-800/50 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
            
            <!-- Animated Background Glow -->
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
            <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full"></div>

            <div class="p-8 md:p-12">
                <!-- Header Section -->
                <div class="flex flex-col items-center text-center mb-10">
                    <div class="w-20 h-20 rounded-[2rem] bg-indigo-600 shadow-2xl shadow-indigo-200 dark:shadow-none flex items-center justify-center mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
                        <Lock :size="32" class="text-white" />
                    </div>
                    
                    <h2 class="text-2xl md:text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter mb-3 leading-tight">
                        {{ $t('preview_modal_title') }}
                    </h2>
                    <p class="text-[11px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] leading-relaxed max-w-[280px]">
                        {{ $t('preview_modal_desc') }}
                    </p>
                </div>

                <!-- Benefits List -->
                <div class="space-y-4 mb-10">
                    <h3 class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest pl-2">
                        {{ $t('preview_benefit_title') }}
                    </h3>
                    
                    <div class="space-y-3">
                        <div v-for="benefit in benefits" :key="benefit.text" 
                             class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all hover:translate-x-1 group">
                             <div :class="benefit.color" class="shrink-0 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                 <component :is="benefit.icon" :size="16" />
                             </div>
                             <p class="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">
                                 {{ $t(benefit.text) }}
                             </p>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col gap-3">
                    <button @click="handleViewPlans" 
                            class="group w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2">
                        {{ $t('preview_view_plans') }}
                        <ArrowRight :size="16" class="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button @click="handleGoBack" 
                            class="w-full py-4 text-slate-400 dark:text-slate-600 font-black text-[10px] uppercase tracking-[0.2em] hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                        ← Not now, maybe later
                    </button>
                </div>
            </div>

            <!-- Decorative corner accent -->
            <div class="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Sparkles :size="80" class="text-indigo-500" />
            </div>
        </div>
    </div>
</template>
