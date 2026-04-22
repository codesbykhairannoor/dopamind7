<script setup>
import { ref, computed } from 'vue';
import { useForm, Head } from '@inertiajs/vue3';
import { 
    ChevronRight, 
    ChevronLeft, 
    Rocket, 
    Target, 
    Wallet, 
    CalendarDays, 
    Brain,
    AlertCircle,
    CheckCircle2,
    Sparkles,
    Gem,
    User,
    ArrowRight
} from 'lucide-vue-next';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const step = ref(0);
const totalSteps = 5;

const form = useForm({
    goal: '',
    pain_point: '',
    ambition: '',
    persona: '',
});

const nextStep = () => {
    if (step.value < totalSteps) {
        step.value++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const prevStep = () => {
    if (step.value > 0) {
        step.value--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const submit = () => {
    form.post(route('onboarding.store'), {
        onSuccess: () => {
            // Meta Pixel Tracking
            if (typeof window.fbq === 'function') {
                window.fbq('track', 'CompleteRegistration', {
                    content_name: 'Onboarding Completed',
                    status: 'success'
                });
            }
        }
    });
};

const progressWidth = computed(() => {
    return `${(step.value / totalSteps) * 100}%`;
});

const isStepValid = computed(() => {
    if (step.value === 1) return !!form.goal;
    if (step.value === 2) return !!form.pain_point;
    if (step.value === 3) return !!form.ambition;
    if (step.value === 4) return !!form.persona;
    if (step.value === 5) return true; // Offer step is always valid
    return true;
});

</script>

<template>
    <Head :title="$t('onboarding.title')" />

    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        <!-- Background Decorations -->
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div class="w-full max-w-2xl relative z-10">
            <!-- Progress Bar -->
            <div v-if="step > 0" class="mb-8">
                <div class="flex justify-between items-center mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>{{ $t('onboarding.btn_next') }} {{ step }} / {{ totalSteps }}</span>
                    <span>{{ Math.round((step / totalSteps) * 100) }}%</span>
                </div>
                <div class="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700 ease-out"
                        :style="{ width: progressWidth }"
                    ></div>
                </div>
            </div>

            <!-- Steps Container -->
            <div class="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                
                <!-- Step 0: Welcome -->
                <div v-if="step === 0" class="text-center animate-in fade-in zoom-in duration-700">
                    <div class="inline-flex p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
                        <Sparkles class="text-indigo-400" :size="40" />
                    </div>
                    <h1 class="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Neural OS
                    </h1>
                    <p class="text-slate-400 text-lg mb-10 leading-relaxed">
                        {{ $t('onboarding.step_goal_desc') }}
                    </p>
                    <button 
                        @click="nextStep"
                        class="group relative flex items-center justify-center gap-3 w-full bg-white text-slate-950 font-bold py-4 rounded-2xl transition hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span>{{ $t('onboarding.btn_next') }}</span>
                        <ChevronRight :size="20" class="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <!-- Step 1: Goal -->
                <div v-if="step === 1" class="animate-in slide-in-from-right-8 duration-500">
                    <h2 class="text-2xl font-black mb-2">{{ $t('onboarding.step_goal_title') }}</h2>
                    <p class="text-slate-400 text-sm mb-8">{{ $t('onboarding.step_goal_desc') }}</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                            v-for="option in [
                                { id: 'habits', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                                { id: 'finance', icon: Wallet, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                                { id: 'planner', icon: CalendarDays, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                                { id: 'journal', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10' }
                            ]"
                            :key="option.id"
                            @click="form.goal = option.id"
                            class="flex flex-col items-start p-5 rounded-3xl border-2 transition-all duration-300 text-left"
                            :class="form.goal === option.id ? 'border-white bg-white/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'"
                        >
                            <div :class="['p-2 rounded-xl mb-4', option.bg]">
                                <component :is="option.icon" :class="option.color" :size="24" />
                            </div>
                            <span class="font-bold text-sm">{{ $t(`onboarding.goal_${option.id}`) }}</span>
                        </button>
                    </div>
                </div>

                <!-- Step 2: Pain Point -->
                <div v-if="step === 2" class="animate-in slide-in-from-right-8 duration-500">
                    <h2 class="text-2xl font-black mb-2">{{ $t('onboarding.step_pain_title') }}</h2>
                    <p class="text-slate-400 text-sm mb-8">{{ $t('onboarding.step_pain_desc') }}</p>
                    
                    <div class="space-y-3">
                        <button 
                            v-for="id in ['procrastination', 'disorganized', 'overspending', 'stress']"
                            :key="id"
                            @click="form.pain_point = id"
                            class="flex items-center gap-4 w-full p-5 rounded-2xl border-2 transition-all duration-300 text-left"
                            :class="form.pain_point === id ? 'border-white bg-white/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'"
                        >
                            <div class="w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center shrink-0">
                                <div v-if="form.pain_point === id" class="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <span class="font-bold text-sm">{{ $t(`onboarding.pain_${id}`) }}</span>
                        </button>
                    </div>
                </div>

                <!-- Step 3: Ambition -->
                <div v-if="step === 3" class="animate-in slide-in-from-right-8 duration-500">
                    <h2 class="text-2xl font-black mb-2">{{ $t('onboarding.step_ambition_title') }}</h2>
                    <p class="text-slate-400 text-sm mb-8">{{ $t('onboarding.step_ambition_desc') }}</p>
                    
                    <div class="space-y-4">
                        <button 
                            v-for="id in ['low', 'medium', 'high']"
                            :key="id"
                            @click="form.ambition = id"
                            class="group flex items-center justify-between w-full p-6 rounded-3xl border-2 transition-all duration-300 text-left"
                            :class="form.ambition === id ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'"
                        >
                            <div>
                                <span class="block font-black text-lg" :class="form.ambition === id ? 'text-white' : 'text-slate-300'">
                                    {{ $t(`onboarding.ambition_${id}`) }}
                                </span>
                            </div>
                            <OneForMindIcon :name="id === 'high' ? 'premium' : 'rocket'" :class="form.ambition === id ? 'text-indigo-400' : 'text-slate-600'" :size="32" />
                        </button>
                    </div>
                </div>

                <!-- Step 4: Persona -->
                <div v-if="step === 4" class="animate-in slide-in-from-right-8 duration-500">
                    <h2 class="text-2xl font-black mb-2">{{ $t('onboarding.step_persona_title') }}</h2>
                    <p class="text-slate-400 text-sm mb-8">{{ $t('onboarding.step_persona_desc') }}</p>
                    
                    <div class="grid grid-cols-2 gap-3">
                        <button 
                            v-for="id in ['student', 'professional', 'entrepreneur', 'other']"
                            :key="id"
                            @click="form.persona = id"
                            class="flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all duration-300 text-center gap-3"
                            :class="form.persona === id ? 'border-purple-500 bg-purple-500/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'"
                        >
                            <User class="text-slate-500" :size="24" :class="form.persona === id ? 'text-purple-400' : ''" />
                            <span class="font-bold text-xs">{{ $t(`onboarding.persona_${id}`) }}</span>
                        </button>
                    </div>
                </div>

                <!-- Step 5: Offer -->
                <div v-if="step === 5" class="animate-in slide-in-from-right-8 duration-500 text-center">
                    <div class="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-4">
                        <Gem class="text-amber-400" :size="32" />
                    </div>
                    <h2 class="text-2xl font-black mb-2">{{ $t('onboarding.step_offer_title') }}</h2>
                    <p class="text-slate-400 text-sm mb-8">{{ $t('onboarding.step_offer_desc') }}</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Explorer (Free) -->
                        <div class="p-6 rounded-3xl border-2 border-white/5 bg-white/[0.02] text-left flex flex-col h-full">
                            <h3 class="font-black text-lg mb-1">{{ $t('onboarding.offer_free_title') }}</h3>
                            <p class="text-xs text-slate-500 mb-6 flex-grow">{{ $t('onboarding.offer_free_desc') }}</p>
                            <button 
                                @click="submit"
                                class="w-full py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-sm hover:bg-white/10 transition"
                            >
                                {{ $t('onboarding.offer_btn_free') }}
                            </button>
                        </div>
                        
                        <!-- Architect (Pro) -->
                        <div class="p-6 rounded-3xl border-2 border-indigo-500/30 bg-indigo-500/5 text-left flex flex-col h-full relative overflow-hidden group">
                            <div class="absolute -right-4 -top-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                            <h3 class="font-black text-lg mb-1 text-white flex items-center gap-2">
                                {{ $t('onboarding.offer_pro_title') }}
                                <Sparkles :size="16" class="text-amber-400" />
                            </h3>
                            <p class="text-xs text-slate-400 mb-6 flex-grow">{{ $t('onboarding.offer_pro_desc') }}</p>
                            <button 
                                @click="() => { /* Logic to pricing? */ submit(); }"
                                class="w-full py-3 rounded-xl bg-indigo-600 font-black text-sm text-white shadow-lg shadow-indigo-900/20 hover:bg-indigo-500 transition"
                            >
                                {{ $t('onboarding.offer_btn_pro') }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Navigation Buttons -->
                <div v-if="step > 0" class="mt-10 flex gap-4">
                    <button 
                        @click="prevStep"
                        class="flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition"
                    >
                        <ChevronLeft :size="20" />
                    </button>
                    
                    <button 
                        v-if="step < totalSteps"
                        @click="nextStep"
                        :disabled="!isStepValid"
                        class="flex-1 flex items-center justify-center gap-2 bg-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition hover:bg-indigo-500 active:scale-[0.98]"
                    >
                        <span>{{ $t('onboarding.btn_next') }}</span>
                        <ChevronRight :size="18" />
                    </button>

                    <div v-else class="flex-1"></div>
                </div>

            </div>

            <!-- Footer Info -->
            <p class="text-center mt-8 text-[10px] text-slate-600 uppercase tracking-widest font-black">
                OneForMind Neural OS &copy; 2026 • Secure & Private
            </p>
        </div>
    </div>
</template>

<style scoped>
.animate-in {
    animation-fill-mode: both;
}
</style>
