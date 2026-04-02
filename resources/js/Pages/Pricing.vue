<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const isAnnual = ref(true);

const plans = computed(() => [
    {
        name: 'pricing_l1_name',
        slug: 'explorer',
        price: '0',
        period: 'pricing_forever',
        desc: 'pricing_l1_desc',
        features: [
            'pricing_feat_l1_habits',
            'pricing_feat_l1_finance'
        ],
        buttonText: 'pricing_free_btn',
        buttonLink: '#',
        highlight: false,
        theme: 'slate'
    },
    {
        name: 'pricing_l2_name',
        slug: 'architect',
        price: isAnnual.value ? 'Rp 59k' : 'Rp 89k',
        initial: 'pricing_l2_initial',
        recurring: 'pricing_l2_recurring',
        desc: 'pricing_l2_desc',
        features: [
            'pricing_feat_l2_habits',
            'pricing_feat_l2_finance',
            'pricing_feat_month_trial'
        ],
        buttonText: 'pricing_pro_btn',
        buttonLink: '#',
        highlight: false,
        theme: 'indigo'
    },
    {
        name: 'pricing_l3_name',
        slug: 'quantum',
        price: isAnnual.value ? 'Rp 99k' : 'Rp 129k',
        initial: 'pricing_l3_initial',
        recurring: 'pricing_l3_recurring',
        desc: 'pricing_l3_desc',
        features: [
            'pricing_feat_l3_ai_coach',
            'pricing_feat_l3_wealth',
            'pricing_feat_l3_insights'
        ],
        buttonText: 'pricing_ai_btn',
        buttonLink: '#',
        highlight: true,
        theme: 'premium',
        badge: 'pricing_ai_badge'
    },
    {
        name: 'pricing_l4_name',
        slug: 'lifetime',
        price: isAnnual.value ? 'Rp 159k' : 'Rp 199k',
        initial: 'pricing_l4_initial',
        recurring: 'pricing_l4_recurring',
        desc: 'pricing_l4_desc',
        features: [
            'pricing_feat_l4_triggers',
            'pricing_feat_l4_war_room',
            'pricing_feat_l4_vip'
        ],
        buttonText: 'pricing_l4_btn',
        buttonLink: '#',
        highlight: false,
        theme: 'dark',
        badge: 'pricing_l4_badge'
    }
]);

const checkout = async (plan) => {
    if (plan.slug === 'explorer') return;

    try {
        Swal.fire({
            title: 'Preparing Secure Checkout...',
            html: 'Connecting to Duitku safe gateway',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await axios.post(route('payment.checkout'), {
            plan: plan.slug
        });

        if (response.data.paymentUrl) {
            window.location.href = response.data.paymentUrl;
        } else {
            throw new Error('Failed to get payment URL');
        }
    } catch (error) {
        console.error('Checkout error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Payment Error',
            text: error.response?.data?.error || 'Sedang terjadi gangguan pada server pembayaran. Mohon coba beberapa saat lagi.',
            confirmButtonColor: '#4f46e5'
        });
    }
};
</script>

<template>
    <Head :title="$t('pricing_meta_title')" />

    <AuthenticatedLayout>
        <div class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen bg-slate-50/30 dark:bg-slate-900/10">
            <!-- Header Section -->
            <div class="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-black text-[10px] mb-6 uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                    ✨ {{ $t('pricing_badge') }}
                </div>
                <h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                    {{ $t('pricing_title_1') }} <span class="text-indigo-600 dark:text-indigo-400">{{ $t('pricing_title_2') }}</span>
                </h1>
                <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-bold">
                    {{ $t('pricing_subtitle') }}
                </p>

                <!-- Billing Toggle -->
                <div class="flex items-center justify-center gap-6">
                    <span class="text-sm font-black transition-colors duration-300" :class="!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'">
                        {{ $t('pricing_monthly') }}
                    </span>
                    <button 
                        @click="isAnnual = !isAnnual"
                        class="relative w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-800 p-1 transition-all duration-500 hover:ring-4 hover:ring-indigo-100 dark:hover:ring-indigo-900/30"
                    >
                        <div 
                            class="w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-lg transform transition-transform duration-500 ease-in-out"
                            :class="isAnnual ? 'translate-x-8' : 'translate-x-0'"
                        ></div>
                    </button>
                    <span class="text-sm font-black transition-colors duration-300" :class="isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'">
                        {{ $t('pricing_yearly') }}
                    </span>
                    <div class="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-tighter border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
                        {{ $t('pricing_save_amount') }}
                    </div>
                </div>
            </div>            <!-- Pricing Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                <div 
                    v-for="(plan, index) in plans" 
                    :key="index"
                    class="group relative flex flex-col p-6 rounded-[2.5rem] transition-all duration-500 border hover:-translate-y-2"
                    :class="[
                        plan.highlight 
                            ? 'bg-white dark:bg-slate-800 border-indigo-600 dark:border-indigo-500 shadow-2xl shadow-indigo-100 dark:shadow-none scale-105 z-10' 
                            : 'bg-white/70 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-100 dark:shadow-none',
                        plan.theme === 'premium' ? 'ring-4 ring-indigo-600/5 dark:ring-indigo-400/5' : '',
                        plan.theme === 'dark' ? 'bg-slate-900 dark:bg-black text-white border-slate-800' : ''
                    ]"
                >
                    <!-- Best Service Tag -->
                    <div v-if="plan.badge" class="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white text-[8px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap">
                        {{ $t(plan.badge) }}
                    </div>

                    <div class="mb-6">
                        <h3 class="text-[10px] font-black uppercase tracking-widest mb-3" :class="plan.theme === 'dark' ? 'text-indigo-400' : 'text-slate-400 dark:text-slate-500'">{{ $t(plan.name) }}</h3>
                        <div class="flex items-baseline gap-2">
                            <span class="text-3xl font-black tracking-tighter" :class="plan.theme === 'dark' ? 'text-white' : 'text-slate-900 dark:text-white'">{{ plan.price }}</span>
                            <span class="font-bold text-xs" :class="plan.theme === 'dark' ? 'text-slate-500' : 'text-slate-400 dark:text-slate-500'">/{{ $t(plan.period || 'pricing_month') }}</span>
                        </div>
                        <div v-if="plan.initial" class="mt-2 space-y-0.5">
                            <p class="text-[10px] font-black uppercase tracking-tight" :class="plan.theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600 dark:text-indigo-400'">{{ $t(plan.initial) }}</p>
                            <p class="text-[9px] font-bold italic" :class="plan.theme === 'dark' ? 'text-slate-600' : 'text-slate-400 dark:text-slate-500'">{{ $t(plan.recurring) }}</p>
                        </div>
                    </div>

                    <p class="text-xs font-medium mb-8 leading-relaxed min-h-[40px]" :class="plan.theme === 'dark' ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'">
                        {{ $t(plan.desc) }}
                    </p>

                    <ul class="space-y-3 mb-8 flex-grow">
                        <li v-for="feat in plan.features" :key="feat" class="flex items-start gap-3">
                            <div class="mt-1 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0" :class="plan.theme === 'dark' ? 'bg-indigo-500/20' : 'bg-emerald-50 dark:bg-emerald-500/10'">
                                <OneForMindIcon name="check" size="8" :class="plan.theme === 'dark' ? 'text-indigo-400' : 'text-emerald-500'" stroke-width="4" />
                            </div>
                            <span class="text-[11px] font-bold leading-tight" :class="plan.theme === 'dark' ? 'text-slate-300' : 'text-slate-700 dark:text-slate-300'">{{ $t(feat) }}</span>
                        </li>
                    </ul>

                    <button 
                        @click="checkout(plan)"
                        class="w-full py-4 rounded-3xl font-black text-xs transition-all duration-300 transform active:scale-95 shadow-lg"
                        :class="[
                            plan.highlight 
                                ? 'bg-indigo-600 dark:bg-indigo-50 text-white dark:text-indigo-600 hover:bg-indigo-700 dark:hover:bg-white' 
                                : plan.theme === 'dark'
                                    ? 'bg-white text-slate-900 hover:bg-indigo-50 shadow-white/10'
                                    : plan.theme === 'premium'
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-black dark:hover:bg-indigo-50'
                                        : 'bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                        ]"
                    >
                        {{ $t(plan.buttonText) }}
                    </button>
                </div>
            </div>

            <!-- Comparison Table -->
            <div class="mt-32 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-4">{{ $t('compare_title') }}</h2>
                    <p class="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">{{ $t('pricing_trust_3_title') }}</p>
                </div>

                <div class="overflow-hidden rounded-[3rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50/50 dark:bg-slate-800/50">
                                <th class="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 w-1/3">{{ $t('compare_feature') }}</th>
                                <th class="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 text-center">{{ $t('compare_explorer') }}</th>
                                <th class="p-6 text-[10px] font-black uppercase tracking-widest text-indigo-600 border-b border-slate-100 dark:border-slate-800 text-center">{{ $t('compare_architect') }}</th>
                                <th class="p-6 text-[10px] font-black uppercase tracking-widest text-amber-500 border-b border-slate-100 dark:border-slate-800 text-center">{{ $t('compare_quantum') }}</th>
                                <th class="p-6 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 text-center">{{ $t('compare_legendary') }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">
                            <!-- Group: Habits -->
                            <tr class="bg-indigo-50/10 dark:bg-indigo-500/5">
                                <td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800">{{ $t('group_habits') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_habit_limit') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-400">{{ $t('feat_habit_limit_val_l1') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_habit_limit_val_l2') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_habit_limit_val_l2') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_habit_limit_val_l2') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_detailed_analytics') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-400">{{ $t('feat_val_basic') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_val_advanced') }}</td>
                                <td class="p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400">{{ $t('feat_val_predictive') }}</td>
                                <td class="p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400">{{ $t('feat_val_predictive') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_detailed_analytics') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-400">{{ $t('feat_val_basic') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_val_advanced') }}</td>
                                <td class="p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400">{{ $t('feat_val_predictive') }}</td>
                                <td class="p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400">{{ $t('feat_val_predictive') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_habit_freeze') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_ai_stacking') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>

                            <!-- Group: Finance -->
                            <tr class="bg-indigo-50/10 dark:bg-indigo-500/5">
                                <td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800">{{ $t('group_finance') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_finance_entry') }}</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_budgeting') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_receipt_scanning') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_multi_currency') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_net_worth') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_shared_wallet') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_ai_audit') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>

                            <!-- Group: Planner -->
                            <tr class="bg-indigo-50/10 dark:bg-indigo-500/5">
                                <td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800">{{ $t('group_planner') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_planner_view') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-400">{{ $t('feat_planner_view_val_l1') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_planner_view_val_l2') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_planner_view_val_l2') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_planner_view_val_l2') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_recurring_tasks') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_kanban_board') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_focus_timer') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_energy_scheduling') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>

                            <!-- Group: Journal -->
                            <tr class="bg-indigo-50/10 dark:bg-indigo-500/5">
                                <td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800">{{ $t('group_journal') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_journal_type') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-400">{{ $t('feat_journal_type_val_l1') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_journal_type_val_l2') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_journal_type_val_l2') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_journal_type_val_l2') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_sentiment_ai') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_journal_lock') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>

                            <!-- Group: Goals & Job -->
                            <tr class="bg-indigo-50/10 dark:bg-indigo-500/5">
                                <td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800">{{ $t('group_goals') }} & {{ $t('group_jobs') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_goal_limit') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-400">{{ $t('feat_goal_limit_val_l1') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_goal_limit_val_l2') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_goal_limit_val_l2') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_goal_limit_val_l2') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_job_limit') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-400">{{ $t('feat_job_limit_val_l1') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_job_limit_val_l2') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_job_limit_val_l2') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('feat_job_limit_val_l2') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_resume_ai') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_vision_board') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>

                            <!-- Group: Calendar -->
                            <tr class="bg-indigo-50/10 dark:bg-indigo-500/5">
                                <td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800">{{ $t('group_calendar') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_calendar_timeline') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_ai_scheduling') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>

                            <!-- Group: Support -->
                            <tr class="bg-indigo-50/10 dark:bg-indigo-500/5">
                                <td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800">{{ $t('group_support') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_support_priority') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-400">{{ $t('support_standard') }}</td>
                                <td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white">{{ $t('support_standard') }}</td>
                                <td class="p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400">{{ $t('support_priority') }}</td>
                                <td class="p-6 text-xs font-black text-center text-amber-500">{{ $t('support_vip') }}</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_early_beta') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                            <tr>
                                <td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300">{{ $t('feat_data_export') }}</td>
                                <td class="p-6 text-center text-slate-200 dark:text-slate-800">✕</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                                <td class="p-6 text-center text-emerald-500 font-black">✓</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Elite Experience Highlight -->
            <div class="mt-40 relative overflow-hidden rounded-[4rem] bg-slate-900 border border-slate-800 p-8 md:p-20 group">
                <!-- Background decorative elements -->
                <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                <div class="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full"></div>
                
                <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest mb-6">
                            LEADERSHIP & PERFORMANCE
                        </div>
                        <h2 class="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
                            {{ $t('quantum_feature') }} <br/>
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">{{ $t('pricing_elite_title') }}</span>
                        </h2>
                        <div class="space-y-6">
                            <div v-for="i in 3" :key="i" class="flex gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-xl">
                                    {{ i === 1 ? '🧠' : i === 2 ? '⚡' : '🌈' }}
                                </div>
                                <div>
                                    <h4 class="text-white font-black text-sm mb-1">
                                        {{ $t(`pricing_elite_feat${i}_title`) }}
                                    </h4>
                                    <p class="text-slate-400 text-xs leading-relaxed font-bold">
                                        {{ $t(`pricing_elite_feat${i}_desc`) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative group/card">
                        <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-amber-500/20 blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                        <div class="relative aspect-square rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-8 shadow-2xl overflow-hidden">
                            <div class="absolute top-0 right-0 p-8 transform rotate-12 group-hover/card:rotate-0 transition-transform duration-700">
                                <OneForMindIcon name="shield-check" size="120" class="text-amber-400/10" />
                            </div>
                            <div class="h-full flex flex-col justify-end">
                                <div class="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                                    <div class="flex items-center gap-4 mb-4">
                                        <div class="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-black">Q</div>
                                        <div>
                                            <p class="text-white font-black text-xs">{{ $t('pricing_elite_card_title') }}</p>
                                            <p class="text-[10px] text-slate-500 font-bold uppercase">{{ $t('pricing_elite_card_status') }}</p>
                                        </div>
                                    </div>
                                    <div class="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div class="h-full w-2/3 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- FAQ Section -->
            <div class="mt-40 max-w-3xl mx-auto pb-32">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-4">{{ $t('faq_title') }}</h2>
                    <p class="text-slate-500 dark:text-slate-400 font-bold text-sm">{{ $t('pricing_subtitle') }}</p>
                </div>

                <div class="space-y-4">
                    <div v-for="i in 4" :key="i" class="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 transition-all hover:shadow-lg hover:shadow-slate-100 dark:hover:shadow-none">
                        <h4 class="text-lg font-black text-slate-900 dark:text-white mb-3 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs">Q</span>
                            {{ $t(`faq_${i}_q`) }}
                        </h4>
                        <p class="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed pl-11">
                            {{ $t(`faq_${i}_a`) }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Trust Section -->
            <div class="pt-24 border-t border-slate-100 dark:border-slate-800">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div v-for="i in 3" :key="i" class="p-4">
                        <div class="w-16 h-16 rounded-3xl bg-white dark:bg-slate-800 shadow-xl shadow-slate-100 dark:shadow-none border border-slate-50 dark:border-slate-700 flex items-center justify-center text-3xl mx-auto mb-6">
                            {{ i === 1 ? '🔒' : i === 2 ? '⚡' : '✨' }}
                        </div>
                        <h4 class="text-lg font-black text-slate-900 dark:text-white mb-2">{{ $t(`pricing_trust_${i}_title`) }}</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            {{ $t(`pricing_trust_${i}_desc`) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
@keyframes slide-up {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
.pricing-card {
    animation: slide-up 0.5s ease-out forwards;
}
</style>
