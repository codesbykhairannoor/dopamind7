import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

export const useGating = () => {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    
    const tier = computed(() => {
        const plans = {
            'explorer': 1,
            'architect': 2,
            'quantum': 3,
            'legendary': 4
        };
        return plans[user.value?.plan_type] || 1;
    });

    /**
     * Tiers:
     * 1: Explorer (Free)
     * 2: Architect (Pro)
     * 3: Quantum (Elite)
     * 4: Legendary (Infinite)
     */

    const isAiEnabled = computed(() => {
        // AI is strictly Quantum (Tier 3)
        // Legendary (Tier 4) is LIFE for core features but DOES NOT include AI by default
        return user.value?.plan_type === 'quantum';
    });

    const canUse = (feature) => {
        switch (feature) {
            // HABITS
            case 'unlimited_habits':
            case 'habit_categories':
                return tier.value >= 2; // Architect, Quantum, Legendary
            case 'habit_ai_stacking':
            case 'habit_mood_correlation':
                return isAiEnabled.value; // Strictly Quantum
            case 'habit_systemic_triggers':
                return tier.value >= 4; // Strictly Legendary (Life feature)

            // FINANCE
            case 'finance_budgeting':
            case 'finance_export':
                return tier.value >= 2;
            case 'finance_ai_audit':
            case 'finance_predictive_burn':
                return isAiEnabled.value; // Strictly Quantum
            case 'finance_net_worth':
            case 'finance_investment_sim':
                return tier.value >= 4;

            // PLANNER / JOURNAL
            case 'planner_multiview':
            case 'planner_recurring':
                return tier.value >= 2;
            case 'planner_ai_scheduling':
            case 'journal_ai_search':
                return isAiEnabled.value; // Strictly Quantum
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
        isAiEnabled,
        isExplorer: computed(() => tier.value === 1),
        isArchitect: computed(() => tier.value === 2),
        isQuantum: computed(() => tier.value === 3),
        isLegendary: computed(() => tier.value === 4),
    };
};
