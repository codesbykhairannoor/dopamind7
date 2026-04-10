<script setup>
import { computed } from 'vue';
import { useGating } from '@/Composables/useGating';
import Modal from '@/Components/Modal.vue';
import { 
    Gem, Sparkles, BookText, Target, Briefcase, 
    Calendar, Zap, TrendingUp, X, Sparkle, ArrowRight,
    CheckCircle2, Box, Layers, Cpu
} from 'lucide-vue-next';
import { Link } from '@inertiajs/vue3';

const { gatingState, closeGating } = useGating();

const featureConfig = computed(() => {
    const feature = gatingState.activeFeature;
    
    const themes = {
        'journal': {
            icon: BookText,
            color: 'text-rose-500',
            bg: 'bg-rose-50 dark:bg-rose-950/30',
            accent: 'bg-rose-500',
            pattern: 'pattern-organic',
            glow: 'shadow-rose-500/20'
        },
        'goal': {
            icon: Target,
            color: 'text-amber-500',
            bg: 'bg-amber-50 dark:bg-amber-950/30',
            accent: 'bg-amber-500',
            pattern: 'pattern-circles',
            glow: 'shadow-amber-500/20'
        },
        'job': {
            icon: Briefcase,
            color: 'text-blue-500',
            bg: 'bg-blue-50 dark:bg-blue-950/30',
            accent: 'bg-blue-500',
            pattern: 'pattern-grid',
            glow: 'shadow-blue-500/20'
        },
        'calendar': {
            icon: Calendar,
            color: 'text-indigo-500',
            bg: 'bg-indigo-50 dark:bg-indigo-950/30',
            accent: 'bg-indigo-500',
            pattern: 'pattern-timeline',
            glow: 'shadow-indigo-500/20'
        },
        'planner_batch': {
            icon: Zap,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50 dark:bg-emerald-950/30',
            accent: 'bg-emerald-500',
            pattern: 'pattern-motion',
            glow: 'shadow-emerald-500/20'
        },
        'habit_batch': {
            icon: Zap,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50 dark:bg-emerald-950/30',
            accent: 'bg-emerald-500',
            pattern: 'pattern-motion',
            glow: 'shadow-emerald-500/20'
        },
        'ai_coach': {
            icon: Sparkles,
            color: 'text-violet-400',
            bg: 'bg-slate-950',
            accent: 'bg-violet-600',
            pattern: 'pattern-quantum',
            glow: 'shadow-violet-500/40',
            isPremium: true
        },
        'finance_trends': {
            icon: TrendingUp,
            color: 'text-cyan-500',
            bg: 'bg-cyan-50 dark:bg-cyan-950/30',
            accent: 'bg-cyan-500',
            pattern: 'pattern-data',
            glow: 'shadow-cyan-500/20'
        }
    };

    return themes[feature] || {
        icon: Gem,
        color: 'text-indigo-500',
        bg: 'bg-indigo-50 dark:bg-indigo-950/30',
        accent: 'bg-indigo-500',
        pattern: 'pattern-default',
        glow: 'shadow-indigo-500/20'
    };
});

const tKey = (key) => {
    const feature = gatingState.activeFeature;
    // Map habit_batch to planner_batch for translations to avoid duplication
    const translationFeature = feature === 'habit_batch' ? 'planner_batch' : feature;
    return `gating.${translationFeature}.${key}`;
};
</script>

<template>
    <Modal :show="gatingState.isOpen" @close="closeGating" max-width="md">
        <div class="overflow-hidden relative group transition-all duration-500 z-[100]" :class="featureConfig.bg">
            
            <!-- 🎨 DYNAMIC BACKGROUND PATTERNS -->
            <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
                <!-- Grid Pattern for Jobs -->
                <div v-if="featureConfig.pattern === 'pattern-grid'" class="absolute inset-0" style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;"></div>
                
                <!-- Motion Lines for Batch -->
                <div v-if="featureConfig.pattern === 'pattern-motion'" class="absolute inset-0 overflow-hidden">
                    <div v-for="i in 5" :key="i" class="absolute h-px bg-white w-full rotate-[-45deg] transition-all" :style="`top: ${i*20}%; left: -${i*10}%;`"></div>
                </div>

                <!-- Quantum Particles for AI -->
                <div v-if="featureConfig.pattern === 'pattern-quantum'" class="absolute inset-0 overflow-hidden">
                    <div v-for="i in 15" :key="i" class="quantum-particle" :style="`top: ${Math.random()*100}%; left: ${Math.random()*100}%; animation-delay: ${Math.random()*5}s`"></div>
                </div>
            </div>

            <!-- Header Glow -->
            <div class="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20" :class="featureConfig.accent"></div>

            <div class="p-6 md:p-10 relative z-10">
                <!-- Close -->
                <button @click="closeGating" class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hover:rotate-90">
                    <X :size="20" />
                </button>

                <!-- Icon Container -->
                <div class="relative mb-6 md:mb-8">
                    <div :class="[featureConfig.glow, featureConfig.isPremium ? 'bg-gradient-to-br from-violet-600 to-indigo-600' : 'bg-white dark:bg-slate-800']" class="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-110">
                        <component :is="featureConfig.icon" :size="24" class="md:hidden" :class="featureConfig.isPremium ? 'text-white' : featureConfig.color" stroke-width="2.5" />
                        <component :is="featureConfig.icon" :size="32" class="hidden md:block" :class="featureConfig.isPremium ? 'text-white' : featureConfig.color" stroke-width="2.5" />
                    </div>
                </div>

                <div class="text-center mb-6 md:mb-8">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 backdrop-blur-md mb-3 md:mb-4 border border-white/10 shadow-sm">
                        <Sparkle :size="9" :class="featureConfig.color" fill="currentColor" />
                        <span class="text-[7.5px] md:text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">
                            {{ $t(featureConfig.isPremium ? 'gating.lock_title_ai' : 'gating.lock_title_required') }}
                        </span>
                    </div>

                    <h3 class="text-xl md:text-3xl font-black tracking-tighter mb-2 md:mb-3 leading-tight" :class="featureConfig.isPremium ? 'text-white' : 'text-slate-900 dark:text-white'">
                        {{ $t(tKey('title')) }}
                    </h3>
                    
                    <p class="text-[10px] md:text-[11px] font-bold leading-relaxed max-w-[260px] mx-auto transition-colors" :class="featureConfig.isPremium ? 'text-indigo-200/60' : 'text-slate-500 dark:text-slate-400'">
                        {{ $t(tKey('description')) }}
                    </p>
                </div>

                <!-- 💎 BENEFIT LIST (Compact) -->
                <div class="space-y-1.5 md:space-y-2 mb-8 md:mb-10">
                    <div v-for="i in 3" :key="i" class="flex items-center gap-3 p-3 md:p-3.5 rounded-xl md:rounded-2xl transition-all" :class="featureConfig.isPremium ? 'bg-white/5 hover:bg-white/10 border border-white/5' : 'bg-white dark:bg-slate-800 shadow-sm hover:shadow-md border border-slate-100 dark:border-white/5'">
                        <div class="shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center" :class="featureConfig.isPremium ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-50 dark:bg-slate-700 text-slate-400'">
                            <CheckCircle2 :size="10" class="md:hidden" />
                            <CheckCircle2 :size="12" class="hidden md:block" />
                        </div>
                        <span class="text-[10px] md:text-[11px] font-black tracking-tight" :class="featureConfig.isPremium ? 'text-indigo-100' : 'text-slate-700 dark:text-slate-200'">
                            {{ $t(tKey('benefit_' + i)) }}
                        </span>
                    </div>
                </div>

                <!-- ACTIONS -->
                <div class="space-y-2 md:space-y-3">
                    <Link :href="route('billing')" @click="closeGating" class="block w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-widest text-white shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 group/btn relative overflow-hidden" :class="featureConfig.isPremium ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-slate-900 dark:bg-indigo-600 hover:scale-[1.01]'">
                        <div v-if="featureConfig.isPremium" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                        {{ $t('gating.btn_upgrade') }}
                        <ArrowRight :size="14" stroke-width="3" class="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    
                    <button @click="closeGating" class="block w-full py-1 md:py-2 font-bold text-[8px] md:text-[9px] uppercase tracking-widest transition-colors" :class="featureConfig.isPremium ? 'text-indigo-400/60 hover:text-white' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'">
                        {{ $t('gating.btn_stay') }}
                    </button>
                </div>

                <!-- FOOTER -->
                <div class="mt-8 md:mt-12 pt-6 md:pt-8 border-t flex items-center justify-center gap-6 md:gap-8 opacity-40 transition-colors" :class="featureConfig.isPremium ? 'border-white/5 text-indigo-200' : 'border-slate-100 dark:border-white/5 text-slate-400'">
                    <div class="flex items-center gap-2">
                        <Gem :size="12" class="md:hidden" />
                        <Gem :size="14" class="hidden md:block" />
                        <span class="text-[7px] md:text-[8px] font-black uppercase tracking-widest">{{ $t('gating.tier_platinum') }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Sparkles :size="12" class="md:hidden" />
                        <Sparkles :size="14" class="hidden md:block" />
                        <span class="text-[7px] md:text-[8px] font-black uppercase tracking-widest">{{ $t('gating.tier_neural') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
.quantum-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #818cf8;
    border-radius: 50%;
    filter: blur(1px);
    opacity: 0.3;
    animation: float 5s infinite ease-in-out;
}

@keyframes float {
    0%, 100% { transform: translate(0, 0); opacity: 0.2; }
    50% { transform: translate(20px, -20px); opacity: 0.6; }
}

.pattern-organic {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}
</style>
