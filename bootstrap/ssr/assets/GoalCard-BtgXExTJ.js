import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./MilestoneItem-DUTUDKm8.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "GoalCard",
  __ssrInlineRender: true,
  props: {
    goal: Object,
    selected: Boolean,
    onToggleSelection: Function,
    onAutoSave: Function,
    onDelete: Function,
    onAddMilestone: Function,
    onSaveMilestone: Function,
    onToggleMilestone: Function,
    onDeleteMilestone: Function
  },
  setup(__props) {
    const props = __props;
    const isEditingHeader = ref(false);
    const editTitle = ref(props.goal.title);
    const editCategory = ref(props.goal.category);
    const editStartDate = ref(props.goal.start_date);
    const editEndDate = ref(props.goal.end_date);
    const frequencyTypes = [
      { value: "daily", label: "goal_type_daily", icon: "📅" },
      { value: "weekly", label: "goal_type_weekly", icon: "📊" },
      { value: "specific_days", label: "goal_type_specific_days", icon: "📌" },
      { value: "custom_period", label: "goal_type_custom_period", icon: "⏳" },
      { value: "monthly", label: "goal_type_monthly", icon: "🏢" },
      { value: "yearly", label: "goal_type_yearly", icon: "🏆" }
    ];
    const statuses = [
      { value: "active", label: "goal_status_active", class: "text-indigo-600 bg-indigo-50 border-indigo-100" },
      { value: "completed", label: "goal_status_completed", class: "text-emerald-600 bg-emerald-50 border-emerald-100" },
      { value: "paused", label: "goal_status_paused", class: "text-amber-600 bg-amber-50 border-amber-100" },
      { value: "cancelled", label: "goal_status_cancelled", class: "text-rose-600 bg-rose-50 border-rose-100" }
    ];
    const currentStatus = computed(() => statuses.find((s) => s.value === props.goal.status) || statuses[0]);
    const currentType = computed(() => frequencyTypes.find((t) => t.value === props.goal.type) || frequencyTypes[0]);
    const deadlineBadge = computed(() => {
      if (!props.goal.end_date) return null;
      if (props.goal.is_overdue) {
        return { text: "goal_overdue", class: "bg-rose-500 text-white animate-pulse" };
      }
      if (props.goal.days_remaining === 0) {
        return { text: "goal_ending_today", class: "bg-amber-500 text-white" };
      }
      if (props.goal.days_remaining <= 3) {
        return { text: "goal_days_left", params: { days: props.goal.days_remaining }, class: "bg-amber-100 text-amber-700" };
      }
      return { text: "goal_days_left", params: { days: props.goal.days_remaining }, class: "bg-emerald-50 text-emerald-700" };
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["bg-white rounded-[2.5rem] border-2 transition-all duration-700 overflow-hidden group/card relative flex flex-col h-full", [
          __props.selected ? "border-indigo-500 ring-8 ring-indigo-50 shadow-2xl scale-[1.02]" : "border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-200"
        ]]
      }, _attrs))} data-v-6a7828ae>`);
      if (deadlineBadge.value) {
        _push(`<div class="absolute top-6 right-6 z-10" data-v-6a7828ae><div class="${ssrRenderClass(["px-4 py-1.5 rounded-full text-[0.65rem] font-black uppercase tracking-widest shadow-lg transition-all duration-500", deadlineBadge.value.class])}" data-v-6a7828ae>${ssrInterpolate(_ctx.$t(deadlineBadge.value.text, deadlineBadge.value.params))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="p-8 pb-4 space-y-6" data-v-6a7828ae><div class="flex justify-between items-start" data-v-6a7828ae><div class="flex items-center gap-4" data-v-6a7828ae><div class="relative" data-v-6a7828ae><input type="checkbox"${ssrIncludeBooleanAttr(__props.selected) ? " checked" : ""} class="absolute -top-2 -left-2 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500 w-6 h-6 cursor-pointer transition-all z-20 shadow-md" data-v-6a7828ae><div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-3xl shadow-inner border border-indigo-50/50" data-v-6a7828ae>${ssrInterpolate(currentType.value.icon)}</div></div><div data-v-6a7828ae><select class="${ssrRenderClass([currentStatus.value.class, "px-4 py-2 rounded-xl text-[0.7rem] font-black uppercase tracking-wider border-2 cursor-pointer transition-all focus:ring-4 focus:ring-indigo-50 focus:outline-none appearance-none hover:shadow-md"])}" data-v-6a7828ae><!--[-->`);
      ssrRenderList(statuses, (s) => {
        _push(`<option${ssrRenderAttr("value", s.value)} data-v-6a7828ae${ssrIncludeBooleanAttr(Array.isArray(__props.goal.status) ? ssrLooseContain(__props.goal.status, s.value) : ssrLooseEqual(__props.goal.status, s.value)) ? " selected" : ""}>${ssrInterpolate(_ctx.$t(s.label))}</option>`);
      });
      _push(`<!--]--></select></div></div></div><div class="space-y-3" data-v-6a7828ae>`);
      if (isEditingHeader.value || !__props.goal.title) {
        _push(`<div class="space-y-4 bg-slate-50 p-6 rounded-3xl border-2 border-indigo-100 shadow-inner" data-v-6a7828ae><input${ssrRenderAttr("value", editTitle.value)} class="w-full bg-transparent border-none focus:ring-0 p-0 text-xl font-black text-slate-800 placeholder-slate-300"${ssrRenderAttr("placeholder", _ctx.$t("goal_ph_title", "Judul Goal..."))} autofocus data-v-6a7828ae><input${ssrRenderAttr("value", editCategory.value)} class="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-bold text-slate-500 placeholder-slate-300"${ssrRenderAttr("placeholder", _ctx.$t("goal_ph_category", "Kategori..."))} data-v-6a7828ae><div class="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200" data-v-6a7828ae><div class="space-y-1" data-v-6a7828ae><label class="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest" data-v-6a7828ae>${ssrInterpolate(_ctx.$t("goal_start_date"))}</label><input type="date"${ssrRenderAttr("value", editStartDate.value)} class="w-full bg-white border-2 border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 focus:border-indigo-400 focus:ring-0 transition-all" data-v-6a7828ae></div><div class="space-y-1" data-v-6a7828ae><label class="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest" data-v-6a7828ae>${ssrInterpolate(_ctx.$t("goal_end_date"))}</label><input type="date"${ssrRenderAttr("value", editEndDate.value)} class="w-full bg-white border-2 border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 focus:border-indigo-400 focus:ring-0 transition-all" data-v-6a7828ae></div></div><button class="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200" data-v-6a7828ae>${ssrInterpolate(_ctx.$t("btn_save"))}</button></div>`);
      } else {
        _push(`<div class="cursor-pointer group/title" data-v-6a7828ae><h3 class="text-2xl font-black text-slate-800 leading-tight group-hover/title:text-indigo-600 transition-colors" data-v-6a7828ae>${ssrInterpolate(__props.goal.title)}</h3><div class="flex items-center flex-wrap gap-2 mt-2" data-v-6a7828ae><span class="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.15em] px-3 py-1 bg-slate-50 border border-slate-100 rounded-full" data-v-6a7828ae>${ssrInterpolate(__props.goal.category || _ctx.$t("common.no_category", "NO CATEGORY"))}</span><span class="w-1.5 h-1.5 rounded-full bg-slate-200" data-v-6a7828ae></span><span class="text-[0.65rem] font-black text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-[0.15em] border border-indigo-100/50" data-v-6a7828ae>${ssrInterpolate(_ctx.$t(currentType.value.label))}</span>`);
        if (__props.goal.target_value > 0) {
          _push(`<span class="text-[0.65rem] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-[0.15em] border border-emerald-100/50" data-v-6a7828ae>Target: ${ssrInterpolate(__props.goal.target_value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div><div class="space-y-5 py-2" data-v-6a7828ae><div class="space-y-2" data-v-6a7828ae><div class="flex justify-between items-end" data-v-6a7828ae><div class="flex items-center gap-2" data-v-6a7828ae><span class="text-xl" data-v-6a7828ae>🏆</span><span class="text-[0.7rem] font-black text-slate-500 uppercase tracking-[0.2em]" data-v-6a7828ae>${ssrInterpolate(_ctx.$t("goal_progress", "Progress"))}</span></div><span class="text-2xl font-black text-indigo-600 tabular-nums" data-v-6a7828ae>${ssrInterpolate(__props.goal.progress)}<span class="text-[0.8rem] ml-1 opacity-50" data-v-6a7828ae>%</span></span></div><div class="h-5 bg-slate-50 rounded-full overflow-hidden p-1.5 border-2 border-slate-100/50 shadow-inner" data-v-6a7828ae><div class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-1000 ease-out relative shadow-lg shadow-indigo-200" style="${ssrRenderStyle({ width: __props.goal.progress + "%" })}" data-v-6a7828ae><div class="absolute inset-0 bg-white/20 animate-pulse rounded-full" data-v-6a7828ae></div><div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" data-v-6a7828ae></div></div></div></div>`);
      if (__props.goal.end_date) {
        _push(`<div class="space-y-2 opacity-80 scale-95 origin-left" data-v-6a7828ae><div class="flex justify-between items-end" data-v-6a7828ae><div class="flex items-center gap-2" data-v-6a7828ae><span class="text-lg" data-v-6a7828ae>⏳</span><span class="text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]" data-v-6a7828ae>${ssrInterpolate(_ctx.$t("goal_time_progress"))}</span></div><span class="text-sm font-black text-slate-500 tabular-nums" data-v-6a7828ae>${ssrInterpolate(__props.goal.time_progress)}%</span></div><div class="h-3 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100 shadow-inner" data-v-6a7828ae><div class="${ssrRenderClass([{ "!bg-rose-400": __props.goal.is_overdue, "!bg-amber-400": __props.goal.time_progress > 80 && !__props.goal.is_overdue }, "h-full rounded-full bg-slate-300 transition-all duration-1000 ease-out"])}" style="${ssrRenderStyle({ width: __props.goal.time_progress + "%" })}" data-v-6a7828ae></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex-grow p-8 pt-4 bg-gradient-to-b from-slate-50/50 to-white space-y-4 border-t border-dashed border-slate-200" data-v-6a7828ae><div class="flex items-center justify-between mb-2" data-v-6a7828ae><h4 class="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.2em]" data-v-6a7828ae>${ssrInterpolate(_ctx.$t("milestone_title", "Rencana Langkah"))}</h4>`);
      if ((_a = __props.goal.milestones) == null ? void 0 : _a.length) {
        _push(`<div class="text-[0.6rem] font-black text-indigo-400 bg-white px-2 py-0.5 rounded-md border border-slate-100" data-v-6a7828ae>${ssrInterpolate(__props.goal.milestones.filter((m) => m.completed).length)}/${ssrInterpolate(__props.goal.milestones.length)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="max-h-[250px] overflow-y-auto custom-scrollbar space-y-2 pr-2" data-v-6a7828ae><div${ssrRenderAttrs({
        name: "list",
        class: "space-y-2"
      })} data-v-6a7828ae>`);
      ssrRenderList(__props.goal.milestones, (m) => {
        _push(ssrRenderComponent(_sfc_main$1, {
          key: m.id,
          milestone: m,
          goal: __props.goal,
          onToggle: __props.onToggleMilestone,
          onDelete: __props.onDeleteMilestone,
          onSave: __props.onSaveMilestone
        }, null, _parent));
      });
      _push(`</div></div><button class="w-full py-4 px-4 border-2 border-dashed border-slate-200 rounded-[1.5rem] text-slate-400 text-[0.7rem] font-black uppercase tracking-widest hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-3 hover:bg-white hover:shadow-xl hover:shadow-indigo-50 active:scale-95" data-v-6a7828ae><div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-50 transition-colors" data-v-6a7828ae><span class="text-lg leading-none" data-v-6a7828ae>+</span></div> ${ssrInterpolate(_ctx.$t("milestone_add", "Tambah Langkah"))}</button></div><div class="p-6 bg-white border-t border-slate-50 flex justify-between items-center transition-all" data-v-6a7828ae><div class="flex flex-col gap-0.5" data-v-6a7828ae>`);
      if (__props.goal.is_saving) {
        _push(`<div class="flex items-center gap-2 text-indigo-500 font-black text-[0.65rem] italic uppercase tracking-[0.2em]" data-v-6a7828ae><span class="relative flex h-2 w-2" data-v-6a7828ae><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" data-v-6a7828ae></span><span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" data-v-6a7828ae></span></span> ${ssrInterpolate(_ctx.$t("status_saving", "Saving..."))}</div>`);
      } else {
        _push(`<div class="flex items-center gap-3" data-v-6a7828ae><div class="flex flex-col" data-v-6a7828ae><span class="text-[0.55rem] font-black text-slate-300 uppercase tracking-tighter" data-v-6a7828ae>${ssrInterpolate(_ctx.$t("goal_start_date"))}</span><span class="text-[0.7rem] font-bold text-slate-400" data-v-6a7828ae>${ssrInterpolate(__props.goal.start_date || "-")}</span></div><div class="w-4 h-px bg-slate-100" data-v-6a7828ae></div><div class="flex flex-col" data-v-6a7828ae><span class="text-[0.55rem] font-black text-slate-300 uppercase tracking-tighter" data-v-6a7828ae>${ssrInterpolate(_ctx.$t("goal_end_date"))}</span><span class="${ssrRenderClass([{ "text-rose-400": __props.goal.is_overdue }, "text-[0.7rem] font-bold text-slate-400"])}" data-v-6a7828ae>${ssrInterpolate(__props.goal.end_date || "-")}</span></div></div>`);
      }
      _push(`</div><button class="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all active:scale-90" data-v-6a7828ae><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6a7828ae><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-6a7828ae></path></svg></button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/GoalCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GoalCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6a7828ae"]]);
export {
  GoalCard as default
};
