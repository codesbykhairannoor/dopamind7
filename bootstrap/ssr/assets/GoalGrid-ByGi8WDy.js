import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import GoalCard from "./GoalCard-BeZZOPSn.js";
import "lucide-vue-next";
import "./MilestoneItem-BI8g_9CP.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
import "dayjs";
import "dayjs/locale/id.js";
import "./GoalDatePicker-Di7v62U2.js";
import "dayjs/plugin/localeData.js";
import "dayjs/locale/en.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "canvas-confetti";
const _sfc_main = {
  __name: "GoalGrid",
  __ssrInlineRender: true,
  props: {
    goals: Array,
    onAutoSave: Function,
    onDelete: Function,
    onAddMilestone: Function,
    onSaveMilestone: Function,
    onToggleMilestone: Function,
    onDeleteMilestone: Function
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.goals, (goal) => {
        _push(ssrRenderComponent(GoalCard, {
          key: goal._key,
          goal,
          onAutoSave: __props.onAutoSave,
          onDelete: __props.onDelete,
          onAddMilestone: __props.onAddMilestone,
          onSaveMilestone: __props.onSaveMilestone,
          onToggleMilestone: __props.onToggleMilestone,
          onDeleteMilestone: __props.onDeleteMilestone
        }, null, _parent));
      });
      _push(`<!--]-->`);
      if (__props.goals.length === 0) {
        _push(`<div class="col-span-full py-20 bg-white/50 border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-4"><div class="text-6xl">🚀</div><div class="space-y-1"><h3 class="text-xl font-black text-slate-800">${ssrInterpolate(_ctx.$t("goal_empty_title", "Belum ada target!"))}</h3><p class="text-sm font-medium text-slate-400">${ssrInterpolate(_ctx.$t("goal_empty_desc", "Mulai buat proyek perubahan lu sekarang."))}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/GoalGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
