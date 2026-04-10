<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import { useGating } from '@/Composables/useGating';

const { appLocale } = useFinanceFormat();
const { user, tier: userTier } = useGating();

const isAnnual = ref(true);

const plans = computed(() => {
    return [
        {
            name: 'pricing_l1_name',
            slug: 'explorer',
            tier: 1,
            price: 'Free',
            period: 'pricing_forever',
            desc: 'pricing_l1_desc',
            features: [
                'pricing_feat_habits_limit',
                'pricing_feat_planner_basic',
                'pricing_feat_finance_basic'
            ],
            buttonText: 'pricing_free_btn',
            theme: 'slate'
        },
        {
            name: 'pricing_l2_name',
            slug: 'architect',
            tier: 2,
            price: isAnnual.value 
                ? (appLocale.value === 'id' ? 'Rp 79k' : '$4.99') 
                : (appLocale.value === 'id' ? 'Rp 99k' : '$6.99'),
            initial: 'pricing_l2_initial',
            recurring: 'pricing_l2_recurring',
            desc: 'pricing_l2_desc',
            features: [
                'pricing_feat_unlock_all',
                'pricing_feat_planner_batch',
                'pricing_feat_finance_adv',
                'pricing_feat_no_ai'
            ],
            buttonText: 'pricing_pro_btn',
            theme: 'indigo'
        },
        {
            name: 'pricing_l3_name',
            slug: 'quantum',
            tier: 3,
            price: isAnnual.value 
                ? (appLocale.value === 'id' ? 'Rp 109k' : '$6.99') 
                : (appLocale.value === 'id' ? 'Rp 159k' : '$9.99'),
            initial: 'pricing_l3_initial',
            recurring: 'pricing_l3_recurring',
            desc: 'pricing_l3_desc',
            features: [
                'pricing_feat_ai_chat',
                'pricing_feat_automated_insights',
                'pricing_feat_all_architect'
            ],
            buttonText: 'pricing_ai_btn',
            highlight: true,
            theme: 'premium',
            badge: 'pricing_ai_badge',
            icon: 'sparkles'
        },
        {
            name: 'pricing_l4_name',
            slug: 'legendary',
            tier: 4,
            price: (appLocale.value === 'id' ? 'Rp 899k' : '$59.00'),
            initial: 'pricing_l4_initial',
            recurring: 'pricing_l4_recurring',
            desc: 'pricing_l4_desc',
            features: [
                'pricing_feat_lifetime_access',
                'pricing_feat_calendar_unlocked',
                'pricing_feat_ai_trial',
                'pricing_feat_ai_discount'
            ],
            buttonText: 'pricing_l4_btn',
            theme: 'dark',
            badge: 'pricing_l4_badge',
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
    <Head :title="$t('pricing_meta_title')" />

    <AuthenticatedLayout>
        <div class="py-12 px-6 lg:px-12 max-w-[1600px] mx-auto min-h-screen">
            <!-- Header Section -->
            <div class="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div class="max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white font-black text-[9px] mb-4 uppercase tracking-[0.2em] shadow-lg shadow-indigo-200 dark:shadow-none">
                        {{ $t('pricing_sub_os') }}
                    </div>
                    <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
                        {{ $t('pricing_boost_potential') }}
                    </h1>
                    <p class="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                        {{ $t('pricing_subtitle') }}
                    </p>
                </div>

                <!-- Billing Toggle -->
                <div class="flex items-center gap-4 bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm shrink-0">
                    <button @click="isAnnual = false" 
                        class="px-6 py-2.5 rounded-xl text-xs font-black transition-all"
                        :class="!isAnnual ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'">
                        {{ $t('pricing_monthly') }}
                    </button>
                    <button @click="isAnnual = true" 
                        class="px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2"
                        :class="isAnnual ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'">
                        {{ $t('pricing_yearly') }}
                        <span class="px-1.5 py-0.5 rounded-md bg-emerald-500 text-[8px] text-white">-40%</span>
                    </button>
                </div>
            </div>

            <!-- Pricing Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div 
                    v-for="(plan, index) in plans" 
                    :key="index"
                    class="group relative flex flex-col p-8 rounded-[2.5rem] border transition-all duration-700"
                    :class="[
                        plan.tier === userTier ? 'ring-4 ring-indigo-600/20 dark:ring-indigo-400/20 bg-indigo-50/10 dark:bg-indigo-500/5' : 'bg-white dark:bg-slate-800/50',
                        plan.highlight ? 'border-indigo-500 shadow-2xl shadow-indigo-100 dark:shadow-none' : 'border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none',
                        plan.theme === 'dark' ? 'dark:bg-black' : ''
                    ]"
                >
                    <!-- Badges -->
                    <div v-if="plan.tier === userTier" class="absolute -top-3 left-8 px-4 py-1 rounded-full bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest shadow-lg">
                        {{ $t('pricing_active_now') }}
                    </div>
                    <div v-else-if="plan.badge" class="absolute -top-3 left-8 px-4 py-1 rounded-full bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest shadow-lg">
                        {{ $t(plan.badge) }}
                    </div>

                    <div class="mb-10 flex justify-between items-start">
                        <div>
                            <h3 class="text-[10px] font-black tracking-[0.2em] mb-4 uppercase opacity-50">{{ $t(plan.name) }}</h3>
                            <div class="flex items-baseline gap-1">
                                <span class="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{{ plan.price }}</span>
                                <span v-if="plan.slug !== 'legendary' && plan.slug !== 'explorer'" class="text-xs font-bold text-slate-400">/bln</span>
                            </div>
                        </div>
                        <div v-if="plan.icon" class="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                            <OneForMindIcon :name="plan.icon" size="24" stroke-width="2.5" />
                        </div>
                    </div>

                    <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-8 leading-relaxed min-h-[44px]">
                        {{ $t(plan.desc) }}
                    </p>

                    <div class="space-y-4 mb-10 flex-grow border-t border-slate-50 dark:border-slate-800 pt-8">
                        <div v-for="feat in plan.features" :key="feat" class="flex items-start gap-3">
                            <div class="mt-0.5 w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                                <OneForMindIcon name="check" size="10" class="text-indigo-600 dark:text-indigo-400" stroke-width="4" />
                            </div>
                            <span class="text-[11px] font-black leading-[1.3] text-slate-700 dark:text-slate-200">{{ $t(feat) }}</span>
                        </div>
                    </div>

                    <button 
                        @click="checkout(plan)"
                        :disabled="plan.tier <= userTier"
                        class="w-full py-5 rounded-[1.75rem] font-black text-xs transition-all duration-300 transform active:scale-95 shadow-xl"
                        :class="[
                            plan.tier === userTier 
                                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 cursor-default opacity-100' 
                                : plan.tier < userTier
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-50 cursor-not-allowed'
                                    : plan.highlight 
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100 dark:shadow-none' 
                                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02]'
                        ]"
                    >
                        {{ plan.tier === userTier ? $t('pricing_already_active') : plan.tier < userTier ? $t('pricing_basic_level') : $t(plan.buttonText) }}
                    </button>
                    
                    <p v-if="plan.tier > userTier && plan.initial" class="text-center mt-4 text-[9px] font-bold text-indigo-500 animate-pulse">
                        {{ $t(plan.initial) }}
                    </p>
                </div>
            </div>

            <!-- Internal System Gating Comparison -->
            <div class="mt-32 max-w-4xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-2xl font-black text-slate-900 dark:text-white mb-2">{{ $t('pricing_matrix_title') }}</h2>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{{ $t('pricing_matrix_subtitle') }}</p>
                </div>

                <div class="space-y-3">
                    <div v-for="f in [
                        { name: 'feat_habit_capacity', explorer: '5', architect: 'Unlimited', quantum: 'Unlimited' },
                        { name: 'feat_planner_batch_unlocked', explorer: 'Standard', architect: 'Terbuka', quantum: 'Terbuka' },
                        { name: 'feat_finance_adv_unlocked', explorer: 'Standard', architect: 'Terbuka', quantum: 'Terbuka' },
                        { name: 'feat_neural_coaching_unlocked', explorer: '—', architect: '—', quantum: 'Terbuka' }
                    ]" :key="f.name" class="flex items-center justify-between p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group hover:border-indigo-200 dark:hover:border-indigo-800 transition-all">
                        <span class="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter">{{ $t(f.name) }}</span>
                        <div class="flex gap-4 sm:gap-12">
                            <div class="flex flex-col items-center">
                                <span class="text-[8px] font-bold text-slate-400 uppercase">Free</span>
                                <span class="text-[10px] font-black text-slate-600 dark:text-slate-400">{{ f.explorer }}</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span class="text-[8px] font-bold text-indigo-400 uppercase">Arch</span>
                                <span class="text-[10px] font-black text-indigo-600 dark:text-indigo-400">{{ f.architect }}</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span class="text-[8px] font-bold text-amber-500 uppercase">Quant</span>
                                <span class="text-[10px] font-black text-amber-600 dark:text-amber-500">{{ f.quantum }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>
