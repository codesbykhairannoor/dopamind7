import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';

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
        if (!user.value) return false;
        
        // AI is strictly Quantum (Tier 3)
        if (user.value.plan_type === 'quantum') return true;
        
        // Legendary (Tier 4) gets 2 months bonus AI upon registration
        if (user.value.plan_type === 'legendary') {
            const createdAt = dayjs(user.value.created_at);
            const bonusExpiry = createdAt.add(2, 'month');
            return dayjs().isBefore(bonusExpiry);
        }

        return false;
    });

    const isExplorer = computed(() => tier.value === 1);
    const isArchitect = computed(() => tier.value >= 2); // Architect, Quantum, and Legendary all count as Architect+
    const isQuantum = computed(() => tier.value === 3);
    const isLegendary = computed(() => tier.value === 4);

    const canUse = (feature) => {
        if (!user.value) return false;

        switch (feature) {
            // HABITS
            case 'unlimited_habits':
                return isArchitect.value;
            
            // PLANNER
            case 'planner_batch':
                return isArchitect.value;

            // FINANCE
            case 'finance_savings':     // Menabung
            case 'finance_trends':      // Trend Chart
            case 'finance_investment':  // Investment Lab
            case 'finance_budgeting':
            case 'finance_export':
                return isArchitect.value;

            // MODULES (Platinum Suite)
            case 'journal':
            case 'goal':
            case 'job':
            case 'calendar':
                return isArchitect.value;

            // AI FEATURES
            case 'ai_coach':
            case 'ai_analysis':
            case 'ai_insight':
            case 'ai_habit_stacking':
            case 'ai_mood_correlation':
                return isAiEnabled.value;

            default:
                return true;
        }
    };

    return {
        tier,
        canUse,
        isAiEnabled,
        isExplorer,
        isArchitect,
        isQuantum,
        isLegendary,
        user
    };
};
