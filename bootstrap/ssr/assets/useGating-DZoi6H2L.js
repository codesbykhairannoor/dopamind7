import { computed, reactive } from "vue";
import { usePage, router } from "@inertiajs/vue3";
import dayjs from "dayjs";
const gatingState = reactive({
  isOpen: false,
  activeFeature: null,
  requiredPlan: "architect"
});
const FEATURE_TIERS = {
  // Free (Explorer)
  dashboard: "explorer",
  habit: "explorer",
  finance: "explorer",
  planner: "explorer",
  // Architect
  journal: "architect",
  calendar: "architect",
  job: "architect",
  goals: "architect",
  finance_budget: "architect",
  finance_export: "architect",
  // Quantum / AI
  ai_coach: "quantum",
  neural_os: "quantum",
  journal_analyze: "quantum",
  finance_audit: "quantum"
};
const PLAN_LABELS = {
  explorer: "Explorer",
  architect: "Architect",
  quantum: "Quantum",
  legendary: "Legendary"
};
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
  const isExplorer = computed(() => tier.value === 1);
  const isArchitect = computed(() => tier.value >= 2);
  const isQuantum = computed(() => tier.value === 3);
  const isLegendary = computed(() => tier.value === 4);
  const isAiEnabled = computed(() => {
    if (!user.value) return false;
    if (user.value.plan_type === "quantum") return true;
    if (user.value.plan_type === "legendary") {
      const createdAt = dayjs(user.value.created_at);
      return dayjs().isBefore(createdAt.add(2, "month"));
    }
    return false;
  });
  const canUse = (feature) => {
    const required = FEATURE_TIERS[feature] ?? "architect";
    if (required === "explorer") return true;
    if (required === "quantum" || required === "ai") {
      return isAiEnabled.value;
    }
    return isArchitect.value;
  };
  const demandAccess = (feature, targetRoute = null) => {
    if (canUse(feature)) {
      if (targetRoute) router.visit(targetRoute);
      return true;
    }
    const required = FEATURE_TIERS[feature] ?? "architect";
    gatingState.requiredPlan = ["quantum", "ai"].includes(required) ? "quantum" : "architect";
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
    PLAN_LABELS
  };
};
export {
  useGating as u
};
