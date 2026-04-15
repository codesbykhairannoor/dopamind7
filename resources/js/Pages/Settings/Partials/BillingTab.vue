<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { ArrowRight, Sparkles } from 'lucide-vue-next';
import { useGating } from '@/Composables/useGating';

const page = usePage();
const user = computed(() => page.props.auth.user);
const { isExplorer, PLAN_LABELS } = useGating();

const planLabel = computed(() => {
    const pt = user.value?.plan_type;
    if (pt && PLAN_LABELS[pt]) return PLAN_LABELS[pt];
    return 'Explorer';
});

const premiumUntilFormatted = computed(() => {
    const raw = user.value?.premium_until;
    if (!raw) return null;
    const locale = page.props.locale === 'id' ? 'id-ID' : 'en-US';
    return new Date(raw).toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
});
</script>

<template>
    <div class="space-y-8">
        <div>
            <h3 class="text-lg font-bold text-slate-800 dark:text-white tracking-tight">
                {{ $t('settings_billing_section_title', 'Plan & billing') }}
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {{ $t('settings_billing_section_desc', 'Your subscription status. Compare plans and upgrade on the pricing page.') }}
            </p>
        </div>

        <!-- Current plan (Notion / ClickUp style: one summary card) -->
        <div
            class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/40 p-6 sm:p-8"
        >
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                <div class="space-y-3 min-w-0">
                    <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {{ $t('settings_billing_current_label', 'Current plan') }}
                    </p>
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-2xl font-bold text-slate-900 dark:text-white">{{ planLabel }}</span>
                        <span
                            v-if="user?.is_premium"
                            class="inline-flex items-center gap-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300"
                        >
                            <Sparkles class="w-3.5 h-3.5" />
                            {{ $t('settings_billing_active_badge', 'Active') }}
                        </span>
                    </div>
                    <p v-if="premiumUntilFormatted" class="text-sm text-slate-600 dark:text-slate-300">
                        <span class="text-slate-500 dark:text-slate-400">{{ $t('billing_valid_until', 'Valid until') }}:</span>
                        {{ premiumUntilFormatted }}
                    </p>
                    <p v-else-if="!isExplorer && user?.is_premium" class="text-sm text-slate-600 dark:text-slate-300">
                        {{ $t('settings_billing_no_expiry', 'Enjoy full access.') }}
                    </p>
                </div>

                <Link
                    :href="route('billing')"
                    class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200/40 transition hover:bg-indigo-700 dark:shadow-none"
                >
                    {{ $t('settings_billing_open_pricing', 'Compare plans & upgrade') }}
                    <ArrowRight class="w-4 h-4" />
                </Link>
            </div>

            <p class="mt-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-600/50 pt-4">
                {{ $t('settings_billing_pricing_note', 'Payment is handled securely. All plan details and checkout live on the pricing page.') }}
            </p>
        </div>
    </div>
</template>
