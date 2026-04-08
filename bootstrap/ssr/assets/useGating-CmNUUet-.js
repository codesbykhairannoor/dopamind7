import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";
const useGating = () => {
  const page = usePage();
  const user = computed(() => page.props.auth.user);
  const tier = computed(() => {
    var _a;
    const plans = {
      "explorer": 1,
      "architect": 2,
      "quantum": 3,
      "legendary": 4
    };
    return plans[(_a = user.value) == null ? void 0 : _a.plan_type] || 1;
  });
  const canUse = (feature) => {
    switch (feature) {
      case "unlimited_habits":
      case "habit_categories":
        return tier.value >= 2;
      case "habit_ai_stacking":
      case "habit_mood_correlation":
        return tier.value >= 3;
      case "habit_systemic_triggers":
        return tier.value >= 4;
      case "finance_budgeting":
      case "finance_export":
        return tier.value >= 2;
      case "finance_ai_audit":
      case "finance_predictive_burn":
        return tier.value >= 3;
      case "finance_net_worth":
      case "finance_investment_sim":
        return tier.value >= 4;
      case "planner_multiview":
      case "planner_recurring":
        return tier.value >= 2;
      case "planner_ai_scheduling":
      case "journal_ai_search":
        return tier.value >= 3;
      case "planner_focus_mode":
      case "planner_war_room":
        return tier.value >= 4;
      default:
        return true;
    }
  };
  return {
    tier,
    canUse,
    isExplorer: computed(() => tier.value === 1),
    isArchitect: computed(() => tier.value >= 2),
    // Changed to >= for easier gating
    isQuantum: computed(() => tier.value >= 3),
    isLegendary: computed(() => tier.value === 4)
  };
};
export {
  useGating as u
};
