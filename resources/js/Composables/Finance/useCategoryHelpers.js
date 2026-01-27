import { computed } from 'vue';

export function useCategoryHelpers(props) {
    const availableCategories = computed(() => {
        const defaults = ['food', 'transport', 'bills', 'shopping', 'others'];
        const fromBudgets = props.budgets ? props.budgets.map(b => b.category) : [];
        return [...new Set([...defaults, ...fromBudgets])];
    });

    return { availableCategories };
}