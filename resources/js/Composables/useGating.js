import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

export const useGating = () => {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    const tier = computed(() => user.value?.tier || 1);

    /**
     * Tiers:
     * 1: Explorer (Free)
     * 2: Architect (Pro)
     * 3: Quantum (Elite)
     * 4: Legendary (Infinite)
     */

    const canUse = (feature) => {
        switch (feature) {
            // HABITS
            case 'unlimited_habits':
            case 'habit_categories':
                return tier.value >= 2;
            case 'habit_ai_stacking':
            case 'habit_mood_correlation':
                return tier.value >= 3;
            case 'habit_systemic_triggers':
                return tier.value >= 4;

            // FINANCE
            case 'finance_budgeting':
            case 'finance_charts':
                return tier.value >= 2;
            case 'finance_ai_audit':
            case 'finance_predictive_burn':
            case 'finance_csv_import':
                return tier.value >= 3;
            case 'finance_net_worth':
            case 'finance_investment_sim':
                return tier.value >= 4;

            // PLANNER / JOURNAL
            case 'planner_multiview':
            case 'planner_recurring':
                return tier.value >= 2;
            case 'planner_ai_scheduling':
            case 'journal_ai_search':
                return tier.value >= 3;
            case 'planner_focus_mode':
            case 'planner_war_room':
                return tier.value >= 4;

            default:
                return true;
        }
    };

    return {
        tier,
        canUse,
        isExplorer: computed(() => tier.value === 1),
        isArchitect: computed(() => tier.value === 2),
        isQuantum: computed(() => tier.value === 3),
        isLegendary: computed(() => tier.value === 4),
    };
};
