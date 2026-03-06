import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "GoalTable",
  __ssrInlineRender: true,
  props: {
    goals: Array,
    selectedGoals: Array
  },
  emits: ["toggleSelection", "selectAll", "autoSave", "delete"],
  setup(__props, { emit: __emit }) {
    ref(null);
    const frequencyTypes = [
      { value: "daily", label: "goal_type_daily" },
      { value: "weekly", label: "goal_type_weekly" },
      { value: "specific_days", label: "goal_type_specific_days" },
      { value: "custom_period", label: "goal_type_custom_period" },
      { value: "monthly", label: "goal_type_monthly" },
      { value: "yearly", label: "goal_type_yearly" }
    ];
    const statuses = [
      { value: "active", label: "goal_status_active", class: "text-indigo-600 bg-indigo-50" },
      { value: "completed", label: "goal_status_completed", class: "text-emerald-600 bg-emerald-50" },
      { value: "paused", label: "goal_status_paused", class: "text-amber-600 bg-amber-50" },
      { value: "cancelled", label: "goal_status_cancelled", class: "text-rose-600 bg-rose-50" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden relative" }, _attrs))} data-v-ebcc7518><div class="overflow-x-auto custom-scrollbar min-h-[400px]" data-v-ebcc7518><table class="w-full text-sm border-collapse whitespace-nowrap text-left relative" data-v-ebcc7518><thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-20 shadow-sm" data-v-ebcc7518><tr data-v-ebcc7518><th class="border-r border-slate-200 px-4 py-4 w-12 text-center" data-v-ebcc7518><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedGoals.length === __props.goals.length && __props.goals.length > 0) ? " checked" : ""} class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4" data-v-ebcc7518></th><th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[250px] uppercase tracking-wider text-[0.7rem]" data-v-ebcc7518>${ssrInterpolate(_ctx.$t("goal_col_title"))}</th><th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[150px] uppercase tracking-wider text-[0.7rem]" data-v-ebcc7518>${ssrInterpolate(_ctx.$t("goal_col_category"))}</th><th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[150px] uppercase tracking-wider text-[0.7rem]" data-v-ebcc7518>${ssrInterpolate(_ctx.$t("goal_col_type"))}</th><th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[150px] uppercase tracking-wider text-[0.7rem]" data-v-ebcc7518>${ssrInterpolate(_ctx.$t("goal_col_target"))}</th><th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[150px] uppercase tracking-wider text-[0.7rem]" data-v-ebcc7518>${ssrInterpolate(_ctx.$t("goal_col_current"))}</th><th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[150px] uppercase tracking-wider text-[0.7rem]" data-v-ebcc7518>${ssrInterpolate(_ctx.$t("goal_col_status"))}</th><th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[150px] uppercase tracking-wider text-[0.7rem]" data-v-ebcc7518>${ssrInterpolate(_ctx.$t("goal_start_date"))}</th><th class="border-r border-slate-200 px-6 py-4 font-black text-slate-600 min-w-[150px] uppercase tracking-wider text-[0.7rem]" data-v-ebcc7518>${ssrInterpolate(_ctx.$t("goal_end_date"))}</th><th class="px-4 py-4 text-center font-black text-slate-400 w-14" data-v-ebcc7518>🗑️</th></tr></thead><tbody data-v-ebcc7518><!--[-->`);
      ssrRenderList(__props.goals, (goal, index) => {
        var _a;
        _push(`<tr class="${ssrRenderClass([{ "bg-indigo-50/30": __props.selectedGoals.includes(goal.id) }, "border-b border-slate-100 hover:bg-slate-50/50 focus-within:bg-indigo-50/30 transition-all group"])}" data-v-ebcc7518><td class="border-r border-slate-100 px-4 py-0 text-center align-middle" data-v-ebcc7518><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedGoals.includes(goal.id)) ? " checked" : ""} class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4" data-v-ebcc7518></td><td class="border-r border-slate-100 p-0 relative" data-v-ebcc7518><input${ssrRenderAttr("value", goal.title)} type="text"${ssrRenderAttr("data-nav-row", index)} data-nav-col="0" class="w-full h-full min-h-[64px] px-6 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-slate-800 placeholder-slate-300 transition-all"${ssrRenderAttr("placeholder", _ctx.$t("goal_ph_title"))} data-v-ebcc7518></td><td class="border-r border-slate-100 p-0 relative" data-v-ebcc7518><input${ssrRenderAttr("value", goal.category)} type="text"${ssrRenderAttr("data-nav-row", index)} data-nav-col="1" class="w-full h-full min-h-[64px] px-6 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-medium text-slate-600 placeholder-slate-300 transition-all"${ssrRenderAttr("placeholder", _ctx.$t("goal_ph_category"))} data-v-ebcc7518></td><td class="border-r border-slate-100 p-0 relative" data-v-ebcc7518><select class="w-full h-full min-h-[64px] px-6 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-medium text-slate-600 cursor-pointer appearance-none transition-all" data-v-ebcc7518><!--[-->`);
        ssrRenderList(frequencyTypes, (type) => {
          _push(`<option${ssrRenderAttr("value", type.value)} data-v-ebcc7518${ssrIncludeBooleanAttr(Array.isArray(goal.type) ? ssrLooseContain(goal.type, type.value) : ssrLooseEqual(goal.type, type.value)) ? " selected" : ""}>${ssrInterpolate(_ctx.$t(type.label))}</option>`);
        });
        _push(`<!--]--></select></td><td class="border-r border-slate-100 p-0 relative" data-v-ebcc7518><input${ssrRenderAttr("value", goal.target_value)} type="number"${ssrRenderAttr("data-nav-row", index)} data-nav-col="2" class="w-full h-full min-h-[64px] px-6 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-mono font-bold text-indigo-600 transition-all" data-v-ebcc7518></td><td class="border-r border-slate-100 p-0 relative" data-v-ebcc7518><div class="flex items-center gap-3 px-6 h-full min-h-[64px]" data-v-ebcc7518><input${ssrRenderAttr("value", goal.current_value)} type="number" class="w-16 bg-slate-50 border-none rounded-lg text-center font-mono font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500" data-v-ebcc7518><div class="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden" data-v-ebcc7518><div class="h-full bg-emerald-500 transition-all duration-500" style="${ssrRenderStyle({ width: goal.progress + "%" })}" data-v-ebcc7518></div></div><span class="text-[0.7rem] font-bold text-slate-400 w-8 text-right" data-v-ebcc7518>${ssrInterpolate(goal.progress)}%</span></div></td><td class="border-r border-slate-100 p-0 relative" data-v-ebcc7518><select class="${ssrRenderClass([(_a = statuses.find((s) => s.value === goal.status)) == null ? void 0 : _a.class, "w-full h-full min-h-[64px] px-6 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-black uppercase text-[0.7rem] cursor-pointer appearance-none transition-all"])}" data-v-ebcc7518><!--[-->`);
        ssrRenderList(statuses, (status) => {
          _push(`<option${ssrRenderAttr("value", status.value)} data-v-ebcc7518${ssrIncludeBooleanAttr(Array.isArray(goal.status) ? ssrLooseContain(goal.status, status.value) : ssrLooseEqual(goal.status, status.value)) ? " selected" : ""}>${ssrInterpolate(_ctx.$t(status.label))}</option>`);
        });
        _push(`<!--]--></select></td><td class="border-r border-slate-100 p-0 relative" data-v-ebcc7518><input${ssrRenderAttr("value", goal.start_date)} type="date" class="w-full h-full min-h-[64px] px-6 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-medium text-slate-600 transition-all" data-v-ebcc7518></td><td class="border-r border-slate-100 p-0 relative" data-v-ebcc7518><input${ssrRenderAttr("value", goal.end_date)} type="date" class="w-full h-full min-h-[64px] px-6 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-medium text-slate-600 transition-all" data-v-ebcc7518></td><td class="p-0 text-center align-middle" data-v-ebcc7518><button class="w-full h-full min-h-[64px] flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all" data-v-ebcc7518><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-ebcc7518><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-ebcc7518></path></svg></button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/GoalTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GoalTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ebcc7518"]]);
export {
  GoalTable as default
};
