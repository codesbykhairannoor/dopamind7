import { computed, reactive } from "vue";
import { usePage, router } from "@inertiajs/vue3";
import dayjs from "dayjs";
const gatingState = reactive({
  isOpen: false,
  activeFeature: null
});
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
    return true;
  };
  const demandAccess = (feature, targetRoute) => {
    if (targetRoute) {
      router.visit(targetRoute);
    }
    return true;
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
    user
  };
};
export {
  useGating as u
};
