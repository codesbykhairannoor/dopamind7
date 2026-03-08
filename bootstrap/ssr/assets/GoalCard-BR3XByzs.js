import { ref, computed, watch, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderVNode, ssrRenderList } from "vue/server-renderer";
import { Target, Edit2, MoreHorizontal, Trash2, Award, TrendingUp, Calendar, AlertTriangle, Clock, CheckCircle2, Zap, ListFilter, ChevronUp, ChevronDown, Plus } from "lucide-vue-next";
import { trans } from "laravel-vue-i18n";
import _sfc_main$1 from "./MilestoneItem-Bai7ZY72.js";
import confetti from "canvas-confetti";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
import "dayjs";
import "./GoalDatePicker-BSC27_Du.js";
import "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
const _sfc_main = {
  __name: "GoalCard",
  __ssrInlineRender: true,
  props: {
    goal: Object
  },
  emits: [
    "edit",
    "delete",
    "add-milestone",
    "save-milestone",
    "toggle-milestone",
    "delete-milestone"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const showMilestones = ref(true);
    const dropdownOpen = ref(false);
    const progress = computed(() => props.goal.progress || 0);
    watch(() => props.goal.progress, (newVal, oldVal) => {
      if (newVal === 100 && oldVal < 100) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#4f46e5", "#818cf8", "#6366f1"]
        });
      }
    });
    const statusConfig = {
      active: { icon: Zap, class: "bg-emerald-500", bg: "bg-emerald-50 text-emerald-600", label: "goal_status_active" },
      completed: { icon: CheckCircle2, class: "bg-indigo-600", bg: "bg-indigo-50 text-indigo-600", label: "goal_status_completed" },
      paused: { icon: Clock, class: "bg-amber-500", bg: "bg-amber-50 text-amber-600", label: "goal_status_paused" },
      cancelled: { icon: AlertTriangle, class: "bg-slate-400", bg: "bg-slate-50 text-slate-500", label: "goal_status_cancelled" }
    };
    const priorityConfig = {
      vital: "bg-rose-500",
      important: "bg-indigo-500",
      optional: "bg-slate-400"
    };
    const t = (key, fallback) => {
      const res = trans(key);
      return res !== key ? res : fallback;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group h-full bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-500 flex flex-col" }, _attrs))} data-v-34b03d23><div class="relative h-28 shrink-0 overflow-hidden bg-slate-100 rounded-t-[2.5rem]" data-v-34b03d23>`);
      if (__props.goal.cover_image_url) {
        _push(`<!--[--><img${ssrRenderAttr("src", __props.goal.cover_image_url)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" data-v-34b03d23><div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" data-v-34b03d23></div><!--]-->`);
      } else {
        _push(`<div class="w-full h-full bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center" data-v-34b03d23>`);
        _push(ssrRenderComponent(unref(Target), {
          size: 40,
          class: "text-indigo-200",
          "stroke-width": "1.5"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`<div class="absolute top-3.5 left-4 flex gap-2" data-v-34b03d23><div class="${ssrRenderClass([priorityConfig[__props.goal.priority], "w-2 h-2 rounded-full shadow-lg pulse-priority"])}" data-v-34b03d23></div></div><div class="absolute top-3.5 right-4 flex gap-1.5" data-v-34b03d23><button class="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition-all sm:opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100" data-v-34b03d23>`);
      _push(ssrRenderComponent(unref(Edit2), { size: 12 }, null, _parent));
      _push(`</button><div class="relative" data-v-34b03d23><button class="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-all sm:opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 delay-75" data-v-34b03d23>`);
      _push(ssrRenderComponent(unref(MoreHorizontal), { size: 12 }, null, _parent));
      _push(`</button>`);
      if (dropdownOpen.value) {
        _push(`<div class="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-20 animate-in fade-in slide-in-from-top-2 duration-200" data-v-34b03d23><button class="w-full flex items-center gap-2.5 px-3 py-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors text-[9px] font-black uppercase tracking-wider" data-v-34b03d23>`);
        _push(ssrRenderComponent(unref(Trash2), { size: 14 }, null, _parent));
        _push(` ${ssrInterpolate(t("goal_btn_delete", "Hapus Vision"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.goal.reward) {
        _push(`<div class="absolute bottom-3.5 left-4 right-4" data-v-34b03d23><div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/90 backdrop-blur-md text-white text-[9px] font-black shadow-lg" data-v-34b03d23>`);
        _push(ssrRenderComponent(unref(Award), { size: 12 }, null, _parent));
        _push(` ${ssrInterpolate(__props.goal.reward)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-5 flex flex-col flex-1" data-v-34b03d23><h3 class="text-lg font-black text-slate-800 line-clamp-2 leading-tight mb-3.5" data-v-34b03d23>${ssrInterpolate(__props.goal.title)}</h3><div class="space-y-3.5 flex-1" data-v-34b03d23><div data-v-34b03d23><div class="flex justify-between items-end mb-2" data-v-34b03d23><div class="flex items-center gap-1.5" data-v-34b03d23>`);
      _push(ssrRenderComponent(unref(TrendingUp), {
        size: 14,
        class: "text-indigo-500"
      }, null, _parent));
      _push(`<span class="text-[9px] font-black text-slate-400 uppercase tracking-widest" data-v-34b03d23>${ssrInterpolate(t("common_progress", "Momentum"))}</span></div><span class="text-base font-black text-indigo-600" data-v-34b03d23>${ssrInterpolate(progress.value)}%</span></div><div class="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/50 shadow-inner" data-v-34b03d23><div class="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 transition-all duration-1000 ease-out relative" style="${ssrRenderStyle({ width: `${progress.value}%` })}" data-v-34b03d23><div class="absolute inset-0 bg-white/20 w-full animate-shimmer" data-v-34b03d23></div></div></div></div><div class="flex items-center justify-between pt-1" data-v-34b03d23><div class="flex items-center gap-4" data-v-34b03d23><div class="flex flex-col" data-v-34b03d23><span class="text-[8px] font-black text-slate-300 uppercase tracking-widest" data-v-34b03d23>${ssrInterpolate(t("common_deadline", "Target"))}</span><span class="text-[11px] font-black text-slate-600 flex items-center gap-1.5" data-v-34b03d23>`);
      _push(ssrRenderComponent(unref(Calendar), {
        size: 11,
        class: "text-slate-400"
      }, null, _parent));
      _push(` ${ssrInterpolate(__props.goal.end_date || t("no_date", "No Deadline"))}</span></div></div><div class="${ssrRenderClass([(_a = statusConfig[__props.goal.status]) == null ? void 0 : _a.bg, "px-3 py-1 rounded-full flex items-center gap-1.5 border border-current opacity-70"])}" data-v-34b03d23>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent((_b = statusConfig[__props.goal.status]) == null ? void 0 : _b.icon), { size: 10 }, null), _parent);
      _push(`<span class="text-[8px] font-black uppercase tracking-wider" data-v-34b03d23>${ssrInterpolate(t((_c = statusConfig[__props.goal.status]) == null ? void 0 : _c.label, __props.goal.status))}</span></div></div><div class="pt-3.5 border-t border-slate-50" data-v-34b03d23><button class="w-full flex items-center justify-between text-slate-400 hover:text-indigo-500 transition-colors group/milestone" data-v-34b03d23><div class="flex items-center gap-1.5" data-v-34b03d23>`);
      _push(ssrRenderComponent(unref(ListFilter), { size: 14 }, null, _parent));
      _push(`<span class="text-[9px] font-black uppercase tracking-[0.2em]" data-v-34b03d23>${ssrInterpolate(t("goal_milestones_title", "Mastery Steps"))}</span></div>`);
      if (showMilestones.value) {
        _push(ssrRenderComponent(unref(ChevronUp), { size: 14 }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(ChevronDown), { size: 14 }, null, _parent));
      }
      _push(`</button><div class="mt-3 space-y-2" style="${ssrRenderStyle(showMilestones.value ? null : { display: "none" })}" data-v-34b03d23><!--[-->`);
      ssrRenderList(__props.goal.milestones, (m) => {
        _push(ssrRenderComponent(_sfc_main$1, {
          key: m.id,
          milestone: m,
          onSave: (data) => emit("save-milestone", data),
          onToggle: ($event) => emit("toggle-milestone", m),
          onDelete: ($event) => emit("delete-milestone", m.id)
        }, null, _parent));
      });
      _push(`<!--]--><button class="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-100 text-slate-300 hover:border-indigo-100 hover:text-indigo-400 hover:bg-indigo-50/10 transition-all flex items-center justify-center gap-1.5 group/add" data-v-34b03d23>`);
      _push(ssrRenderComponent(unref(Plus), {
        size: 14,
        class: "group-hover/add:rotate-90 transition-transform"
      }, null, _parent));
      _push(`<span class="text-[9px] font-black uppercase tracking-widest" data-v-34b03d23>${ssrInterpolate(t("goal_btn_add_milestone", "Add Step"))}</span></button></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/GoalCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GoalCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-34b03d23"]]);
export {
  GoalCard as default
};
