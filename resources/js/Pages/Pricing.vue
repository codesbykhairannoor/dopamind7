<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import { useGating } from '@/Composables/useGating';
import { 
    Check, Sparkles, Zap, Shield, Globe, 
    ArrowRight, Star, Infinity, ShieldCheck,
    Cloud, MousePointer2, ListChecks, Wallet,
    TrendingUp, Calendar, Brain, MessageSquare,
    Lock
} from 'lucide-vue-next';

const { appLocale } = useFinanceFormat();
const { user, tier: userTier } = useGating();

const isAnnual = ref(true);

const plans = computed(() => {
    return [
        {
            name: 'Explorer',
            slug: 'explorer',
            tier: 1,
            price: 'Free',
            period: 'pricing_forever',
            desc: 'pricing_explorer_desc',
            features: [
                { text: 'pricing_f_habit_open', icon: ListChecks },
                { text: 'pricing_f_batch_habit_locked', icon: Lock, isLocked: true },
                { text: 'pricing_f_planner_tab_open', icon: Calendar },
                { text: 'pricing_f_batch_planner_locked', icon: Lock, isLocked: true },
                { text: 'pricing_f_vault_locked', icon: Lock, isLocked: true },
                { text: 'pricing_f_lab_locked', icon: Lock, isLocked: true },
                { text: 'pricing_f_trends_locked', icon: Lock, isLocked: true }
            ],
            buttonText: 'pricing_btn_current',
            theme: 'slate'
        },
        {
            name: 'Architect',
            slug: 'architect',
            tier: 2,
            price: isAnnual.value 
                ? (appLocale.value === 'id' ? 'Rp 79k' : '$4.99') 
                : (appLocale.value === 'id' ? 'Rp 99k' : '$6.99'),
            period: 'pricing_per_year',
            desc: 'pricing_architect_desc',
            features: [
                { text: 'pricing_feature_header_explorer_plus', isHeader: true },
                { text: 'pricing_f_all_tabs_open', icon: ListChecks },
                { text: 'pricing_f_batch_unlocked', icon: Zap },
                { text: 'pricing_f_financial_ecosystem', icon: Wallet },
                { text: 'pricing_f_custom_themes', icon: MousePointer2 },
                { text: 'pricing_f_ai_coach_locked', icon: Lock, isLocked: true }
            ],
            buttonText: 'pricing_btn_upgrade',
            theme: 'indigo'
        },
        {
            name: 'Quantum',
            slug: 'quantum',
            tier: 3,
            price: isAnnual.value 
                ? (appLocale.value === 'id' ? 'Rp 109k' : '$6.99') 
                : (appLocale.value === 'id' ? 'Rp 159k' : '$9.99'),
            period: 'pricing_per_year',
            desc: 'pricing_quantum_desc',
            features: [
                { text: 'pricing_feature_header_architect_plus', isHeader: true },
                { text: 'pricing_f_ai_full_access', icon: Sparkles },
                { text: 'pricing_f_ai_insights', icon: Brain },
                { text: 'pricing_f_ai_finance_insights', icon: Star },
                { text: 'pricing_f_neural_sync', icon: Infinity },
                { text: 'pricing_f_early_access', icon: Globe }
            ],
            buttonText: 'pricing_btn_unleash',
            highlight: true,
            theme: 'premium',
            badge: 'pricing_badge_popular',
            icon: 'sparkles'
        },
        {
            name: 'Legendary',
            slug: 'legendary',
            tier: 4,
            price: (appLocale.value === 'id' ? 'Rp 899k' : '$59.00'),
            period: 'pricing_lifetime',
            desc: 'pricing_legendary_desc',
            features: [
                { text: 'pricing_feature_header_quantum_plus', isHeader: true },
                { text: 'pricing_f_lifetime_access', icon: Infinity },
                { text: 'pricing_f_legendary_trial_ai', icon: Zap },
                { text: 'pricing_f_vvip_support', icon: Shield },
                { text: 'pricing_f_founder_badge', icon: ShieldCheck },
                { text: 'pricing_f_onboarding', icon: MessageSquare }
            ],
            buttonText: 'pricing_btn_legendary',
            theme: 'dark',
            badge: 'pricing_badge_limited',
            icon: 'infinity'
        }
    ];
});

const checkout = (plan) => {
    if (plan.tier <= userTier.value) return;
    
    router.visit(route('payment.summary'), {
        data: {
            plan: plan.slug,
            billing: isAnnual.value ? 'yearly' : 'monthly'
        }
    });
};

onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const planSlug = urlParams.get('plan');
    if (planSlug) {
        const targetPlan = plans.value.find(p => p.slug === planSlug);
        if (targetPlan && targetPlan.tier > userTier.value) {
            checkout(targetPlan);
        }
    }
});
</script>

<template>
    <Head title="Pricing & Plans" />

    <AuthenticatedLayout>
        <div class="bg-slate-50 dark:bg-slate-950 min-h-screen pb-32 pt-20 px-4 md:px-8">
                            <h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {{ $t('pricing_hero_title') }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{{ $t('pricing_hero_highlight') }}</span>
                </h1>
                <p class="text-slate-500 dark:text-slate-400 font-bold max-w-xl mx-auto leading-relaxed">
                    {{ $t('pricing_hero_desc') }}
                </p>

                <!-- 🗓️ Billing Toggle -->
                <div class="inline-flex items-center p-1 bg-white dark:bg-slate-900 rounded-[1.8rem] border border-slate-100 dark:border-slate-800 shadow-sm mt-8 scale-110">
                    <button @click="isAnnual = false" 
                        class="px-8 py-3 rounded-[1.6rem] text-xs font-black transition-all"
                        :class="!isAnnual ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xl' : 'text-slate-400 hover:text-slate-600'">
                        {{ $t('pricing_billing_monthly') }}
                    </button>
                    <button @click="isAnnual = true" 
                        class="px-8 py-3 rounded-[1.6rem] text-xs font-black transition-all relative flex items-center gap-2"
                        :class="isAnnual ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xl' : 'text-slate-400 hover:text-slate-600'">
                        {{ $t('pricing_billing_yearly') }}
                        <span class="absolute -top-4 -right-2 px-2 py-1 rounded-lg bg-emerald-500 text-[8px] text-white animate-bounce shadow-lg">{{ $t('pricing_billing_save') }}</span>
                    </button>
                </div>

            <!-- 💎 Pricing Grid -->
            <div class="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div 
                    v-for="(plan, index) in plans" 
                    :key="index"
                    class="group relative flex flex-col p-8 rounded-[3rem] border transition-all duration-700 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 hover:shadow-2xl"
                    :class="[
                        plan.highlight ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-100 dark:border-slate-800',
                        plan.theme === 'dark' ? 'dark:bg-indigo-950 border-indigo-900' : ''
                    ]"
                >
                    <!-- Badge Header -->
                    <div v-if="plan.badge" class="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest shadow-xl">
                        {{ $t(plan.badge) }}
                    </div>

                    <!-- Card Header -->
                    <div class="mb-8">
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">{{ plan.name }}</h3>
                        <div class="flex items-baseline gap-2">
                            <span class="text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tighter">{{ plan.price }}</span>
                            <span class="text-[10px] font-bold text-slate-400 mb-1" v-if="plan.tier > 1">{{ $t(plan.period) }}</span>
                        </div>
                    </div>

                    <p class="text-[11px] font-bold text-slate-500 leading-relaxed min-h-[44px] mb-8">
                        {{ $t(plan.desc) }}
                    </p>

                    <!-- Feature List (Stacked Style) -->
                    <div class="space-y-4 mb-10 flex-grow border-t border-slate-50 dark:border-slate-800 pt-8">
                        <div v-for="(feat, fIdx) in plan.features" :key="fIdx" class="flex items-start gap-4" :class="feat.isLocked ? 'opacity-40' : ''">
                            <template v-if="feat.isHeader">
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2 mb-1 w-full">{{ $t(feat.text) }}</p>
                            </template>
                            <template v-else>
                                <div class="mt-1 flex items-center justify-center shrink-0">
                                    <component :is="feat.icon" :size="14" :class="feat.isLocked ? 'text-slate-500' : 'text-indigo-500'" stroke-width="2.5" />
                                </div>
                                <span class="text-[11px] font-black leading-tight" :class="feat.isLocked ? 'text-slate-500' : 'text-slate-700 dark:text-slate-200'">{{ $t(feat.text) }}</span>
                            </template>
                        </div>
                    </div>

                    <!-- Action Button -->
                    <div class="mt-auto">
                        <button 
                            @click="checkout(plan)"
                            :disabled="plan.tier <= userTier"
                            class="w-full py-5 rounded-[2rem] font-black text-xs transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 group/btn shadow-xl shadow-slate-200 dark:shadow-none"
                            :class="[
                                plan.tier === userTier 
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default' 
                                    : plan.highlight 
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/40' 
                                        : 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800'
                            ]"
                        >
                            {{ plan.tier === userTier ? $t('pricing_btn_current') : $t(plan.buttonText) }}
                            <ArrowRight v-if="plan.tier > userTier" :size="16" class="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                        
                        <p v-if="plan.tier > userTier && plan.initial" class="text-center mt-4 text-[9px] font-bold text-indigo-500">
                             Guaranteed Lifetime Access
                        </p>
                    </div>
                </div>
            </div>

            <!-- 📊 Clean Comparison Table -->
            <div class="mt-40 max-w-5xl mx-auto animate-in slide-in-from-bottom-12 duration-1000">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-4">{{ $t('pricing_comparison_title') }}</h2>
                    <p class="text-xs font-bold text-slate-400 capitalize tracking-widest">{{ $t('pricing_comparison_subtitle') }}</p>
                </div>

                <div class="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50 dark:bg-slate-800/50">
                                <th class="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">{{ $t('pricing_feature_col_name') }}</th>
                                <th class="p-8 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white text-center">Explorer</th>
                                <th class="p-8 text-[10px] font-black uppercase tracking-widest text-indigo-500 text-center">Architect</th>
                                <th class="p-8 text-[10px] font-black uppercase tracking-widest text-amber-500 text-center">Quantum</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
                            <tr v-for="row in [
                                { name: $t('pricing_f_active_habits'), explorer: '5 Habits', architect: $t('pricing_v_unlimited'), quantum: $t('pricing_v_unlimited') },
                                { name: $t('pricing_f_planner_engine'), explorer: $t('pricing_v_standard'), architect: $t('pricing_v_batch'), quantum: $t('pricing_v_ai_powered') },
                                { name: $t('pricing_f_vault_savings'), explorer: $t('pricing_v_locked'), architect: $t('pricing_v_unlimited'), quantum: $t('pricing_v_unlimited') },
                                { name: $t('pricing_f_ai_assistant'), explorer: '—', architect: '—', quantum: '24/7 Access' },
                                { name: $t('pricing_f_life_insights'), explorer: 'Basic', architect: $t('pricing_v_advanced'), quantum: $t('pricing_v_predictive') },
                                { name: $t('pricing_f_custom_modules'), explorer: '—', architect: $t('pricing_v_partial'), quantum: $t('pricing_v_full') },
                            ]" :key="row.name" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                <td class="p-8 text-xs font-black text-slate-700 dark:text-slate-200">{{ row.name }}</td>
                                <td class="p-8 text-xs font-bold text-slate-400 text-center">{{ row.explorer }}</td>
                                <td class="p-8 text-xs font-black text-indigo-600 dark:text-indigo-400 text-center">{{ row.architect }}</td>
                                <td class="p-8 text-xs font-black text-amber-600 dark:text-amber-500 text-center">{{ row.quantum }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-16 text-center">
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{{ $t('pricing_infra_badge') }}</p>
                    <div class="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale contrast-125">
                        <div class="flex items-center gap-2"><div class="w-2 h-2 bg-slate-900 dark:bg-white rounded-full"></div><span class="font-black dark:text-white uppercase tracking-tighter text-[10px]">Asana Strength</span></div>
                        <div class="flex items-center gap-2"><div class="w-2 h-2 bg-slate-900 dark:bg-white rounded-full"></div><span class="font-black dark:text-white uppercase tracking-tighter text-[10px]">ClickUp Power</span></div>
                        <div class="flex items-center gap-2"><div class="w-2 h-2 bg-slate-900 dark:bg-white rounded-full"></div><span class="font-black dark:text-white uppercase tracking-tighter text-[10px]">Notion Clarity</span></div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
</style>
