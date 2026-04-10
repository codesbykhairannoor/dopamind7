import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import dayjs from "dayjs";
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
  const isAiEnabled = computed(() => {
    if (!user.value) return false;
    if (user.value.plan_type === "quantum") return true;
    if (user.value.plan_type === "legendary") {
      const createdAt = dayjs(user.value.created_at);
      const bonusExpiry = createdAt.add(2, "month");
      return dayjs().isBefore(bonusExpiry);
    }
    return false;
  });
  const isExplorer = computed(() => tier.value === 1);
  const isArchitect = computed(() => tier.value >= 2);
  const isQuantum = computed(() => tier.value === 3);
  const isLegendary = computed(() => tier.value === 4);
  const canUse = (feature) => {
    if (!user.value) return false;
    switch (feature) {
      case "unlimited_habits":
        return isArchitect.value;
      case "planner_batch":
        return isArchitect.value;
      case "finance_savings":
      case "finance_trends":
      case "finance_investment":
      case "finance_budgeting":
      case "finance_export":
        return isArchitect.value;
      case "journal":
      case "goal":
      case "job":
      case "calendar":
        return isArchitect.value;
      case "ai_coach":
      case "ai_analysis":
      case "ai_insight":
      case "ai_habit_stacking":
      case "ai_mood_correlation":
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
export {
  useGating as u
};
