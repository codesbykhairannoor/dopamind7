import { computed, reactive } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import dayjs from 'dayjs';

// Global state for gating modal
const gatingState = reactive({
    isOpen: false,
    activeFeature: null,
    requiredPlan: 'architect',
});

// Feature → tier mapping
const FEATURE_TIERS = {
    // Free (Explorer)
    dashboard:     'explorer',
    habit:         'explorer',
    finance:       'explorer',
    planner:       'explorer',

    // Architect
    journal:       'architect',
    calendar:      'architect',
    job:           'architect',
    goals:         'architect',
    finance_budget: 'architect',
    finance_export: 'architect',

    // Quantum / AI
    ai_coach:         'quantum',
    neural_os:        'quantum',
    journal_analyze:  'quantum',
    finance_audit:    'quantum',
};

const PLAN_LABELS = {
    explorer:  'Explorer',
    architect: 'Architect',
    quantum:   'Quantum',
    legendary: 'Legendary',
};

export const useGating = () => {
    const page = usePage();
    const user = computed(() => page.props.auth.user);

    const tier = computed(() => {
        const plans = {
            'explorer':  1,
            'architect': 2,
            'quantum':   3,
            'legendary': 4,
        };
        return plans[user.value?.plan_type] || 1;
    });

    // --- Plan booleans ---
    const isExplorer  = computed(() => tier.value === 1);
    const isArchitect = computed(() => tier.value >= 2);
    const isQuantum   = computed(() => tier.value === 3);
    const isLegendary = computed(() => tier.value === 4);

    // --- AI: quantum + legendary 2 bulan ---
    const isAiEnabled = computed(() => {
        if (!user.value) return false;
        if (user.value.plan_type === 'quantum') return true;
        if (user.value.plan_type === 'legendary') {
            const createdAt = dayjs(user.value.created_at);
            return dayjs().isBefore(createdAt.add(2, 'month'));
        }
        return false;
    });

    /**
     * Returns true if the current user can access the given feature.
     * @param {string} feature - key from FEATURE_TIERS
     */
    const canUse = (feature) => {
        const required = FEATURE_TIERS[feature] ?? 'architect';

        if (required === 'explorer') return true;

        if (required === 'quantum' || required === 'ai') {
            return isAiEnabled.value;
        }

        // architect, legendary all included
        return isArchitect.value;
    };

    /**
     * Navigate to route IF user has access, else open upgrade modal.
     * @param {string} feature
     * @param {string|null} targetRoute
     */
    const demandAccess = (feature, targetRoute = null) => {
        if (canUse(feature)) {
            if (targetRoute) router.visit(targetRoute);
            return true;
        }

        // Determine which plan is required
        const required = FEATURE_TIERS[feature] ?? 'architect';
        gatingState.requiredPlan = ['quantum', 'ai'].includes(required) ? 'quantum' : 'architect';
        gatingState.activeFeature = feature;
        gatingState.isOpen = true;
        return false;
    };

    const closeGating = () => {
        gatingState.isOpen = false;
        gatingState.activeFeature = null;
    };

    return {
        gatingState,
        demandAccess,
        closeGating,
        tier,
        canUse,
        isAiEnabled,
        isExplorer,
        isArchitect,
        isQuantum,
        isLegendary,
        user,
        PLAN_LABELS,
    };
};
