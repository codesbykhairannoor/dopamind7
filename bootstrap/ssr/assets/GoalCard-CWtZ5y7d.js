import { computed, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Target, Calendar, Edit3, Trash2, Zap, Sparkles, ChevronRight, Award } from "lucide-vue-next";
import MilestoneItem from "./MilestoneItem-pDR5JZap.js";
import { usePage } from "@inertiajs/vue3";
import dayjs from "dayjs";
import confetti from "canvas-confetti";
import { trans } from "laravel-vue-i18n";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "dayjs/locale/id.js";
import "./GoalDatePicker-Di7v62U2.js";
import "dayjs/plugin/localeData.js";
import "dayjs/locale/en.js";
const _sfc_main = {
  __name: "GoalCard",
  __ssrInlineRender: true,
  props: {
    goal: Object,
    onEdit: Function,
    onDelete: Function,
    onToggleMilestone: Function,
    onAddMilestone: Function,
    onSaveMilestone: Function,
    onDeleteMilestone: Function,
    isExplorer: Boolean
  },
  emits: ["openPreview"],
  setup(__props, { emit: __emit }) {
    const t = (key, fallback) => {
      const res = trans(key);
      return res !== key ? res : fallback;
    };
    const props = __props;
    const page = usePage();
    const progress = computed(() => {
      const ms = props.goal.milestones || [];
      if (ms.length === 0) return 0;
      const comp = ms.filter((m) => m.is_completed || m.completed).length;
      return Math.round(comp / ms.length * 100);
    });
    watch(progress, (newVal, oldVal) => {
      if (newVal === 100 && oldVal < 100) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: [props.goal.color || "#6366f1", "#ffffff", "#ffd700"]
        });
      }
    });
    const dateDisplay = (date) => {
      if (!date) return null;
      return dayjs(date).locale(page.props.locale || "id").format("DD MMM");
    };
    const priorityLabel = computed(() => {
      const p = props.goal.priority || "important";
      return {
        vital: { text: "Vital", class: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20" },
        important: { text: "Important", class: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20" },
        optional: { text: "Optional", class: "bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-700" }
      }[p];
    });
    const meshGradient = computed(() => {
      const color = props.goal.color || "#6366f1";
      return {
        background: `radial-gradient(at 0% 0%, ${color}33 0px, transparent 50%),
                    radial-gradient(at 100% 0%, ${color}66 0px, transparent 50%),
                    radial-gradient(at 100% 100%, ${color}33 0px, transparent 50%),
                    radial-gradient(at 0% 100%, ${color}1a 0px, transparent 50%),
                    ${color}05`
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 transition-all duration-500 flex flex-col overflow-hidden h-full" }, _attrs))} data-v-b870d376><div class="relative h-32 md:h-44 shrink-0 overflow-hidden bg-slate-50 dark:bg-slate-950" data-v-b870d376>`);
      if (__props.goal.cover_image_url) {
        _push(`<!--[--><img${ssrRenderAttr("src", __props.goal.cover_image_url)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-v-b870d376><div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" data-v-b870d376></div><!--]-->`);
      } else {
        _push(`<div style="${ssrRenderStyle(meshGradient.value)}" class="w-full h-full flex items-center justify-center transition-transform duration-700 relative group-hover:scale-105" data-v-b870d376><div class="absolute inset-0 backdrop-blur-[2px]" data-v-b870d376></div><div class="relative z-10 w-16 h-16 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10 flex items-center justify-center text-white shadow-xl" data-v-b870d376>`);
        _push(ssrRenderComponent(unref(Target), {
          size: 32,
          "stroke-width": "2.5",
          style: { color: __props.goal.color }
        }, null, _parent));
        _push(`</div></div>`);
      }
      _push(`<div class="absolute inset-x-5 bottom-4 flex flex-col" data-v-b870d376><div class="flex items-center gap-2 mb-1.5" data-v-b870d376><span class="${ssrRenderClass(["px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md transition-colors", __props.goal.cover_image_url ? "bg-white/10 text-white" : priorityLabel.value.class])}" data-v-b870d376>${ssrInterpolate(priorityLabel.value.text)}</span>`);
      if (__props.goal.end_date) {
        _push(`<span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-black/20 text-white border border-white/10 backdrop-blur-md flex items-center gap-1" data-v-b870d376>`);
        _push(ssrRenderComponent(unref(Calendar), { size: 8 }, null, _parent));
        _push(` ${ssrInterpolate(dateDisplay(__props.goal.end_date))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h3 class="${ssrRenderClass([__props.goal.cover_image_url ? "text-white" : "text-slate-800 dark:text-white", "text-xl font-black truncate drop-shadow-sm transition-colors duration-500"])}" data-v-b870d376>${ssrInterpolate(__props.goal.title)}</h3></div><div class="absolute top-4 right-4 flex gap-2" data-v-b870d376><button class="w-8 h-8 rounded-full bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white dark:hover:bg-indigo-600 hover:text-indigo-600 dark:hover:text-white transition-all shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 delay-75" data-v-b870d376>`);
      _push(ssrRenderComponent(unref(Edit3), { size: 14 }, null, _parent));
      _push(`</button><button class="w-8 h-8 rounded-full bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 delay-150" data-v-b870d376>`);
      _push(ssrRenderComponent(unref(Trash2), { size: 14 }, null, _parent));
      _push(`</button></div></div><div class="p-6 flex flex-col flex-1" data-v-b870d376><div class="flex items-center justify-between mb-4" data-v-b870d376><div class="flex flex-col" data-v-b870d376><span class="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-0.5" data-v-b870d376>${ssrInterpolate(t("goal_manifestation", "Manifestation"))}</span><span class="text-xs font-black text-slate-800 dark:text-white tabular-nums" data-v-b870d376>${ssrInterpolate(unref(trans)("goal_completed_pct", { count: progress.value }))}</span></div><div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center relative" data-v-b870d376>`);
      _push(ssrRenderComponent(unref(Zap), {
        size: 14,
        class: progress.value === 100 ? "text-amber-400 animate-pulse" : "text-slate-300 dark:text-slate-600"
      }, null, _parent));
      if (__props.goal.is_saving) {
        _push(`<div class="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center" data-v-b870d376><div class="w-1.5 h-1.5 border border-white dark:border-slate-200 border-t-transparent rounded-full animate-spin" data-v-b870d376></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mb-6 overflow-hidden p-0.5" data-v-b870d376><div class="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.2)]" style="${ssrRenderStyle({ width: progress.value + "%", backgroundColor: __props.goal.color || "#6366f1" })}" data-v-b870d376></div></div>`);
      if (__props.isExplorer) {
        _push(`<div class="mb-6 p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 relative overflow-hidden group/strategy cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all" data-v-b870d376><div class="flex items-center justify-between mb-3" data-v-b870d376><div class="flex items-center gap-2" data-v-b870d376>`);
        _push(ssrRenderComponent(unref(Sparkles), {
          size: 14,
          class: "text-indigo-500 animate-pulse"
        }, null, _parent));
        _push(`<span class="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest" data-v-b870d376>AI Strategy Lab</span></div><div class="px-1.5 py-0.5 rounded bg-indigo-500 text-white text-[7px] font-black uppercase tracking-widest" data-v-b870d376>Elite</div></div><div class="space-y-2 blur-[1.5px] opacity-30 group-hover:opacity-50 transition-all" data-v-b870d376><div class="flex items-center gap-2" data-v-b870d376><div class="w-3 h-3 rounded-full bg-indigo-400" data-v-b870d376></div><div class="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full" data-v-b870d376></div></div><div class="flex items-center gap-2" data-v-b870d376><div class="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" data-v-b870d376></div><div class="h-1.5 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-full" data-v-b870d376></div></div></div><div class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-50 dark:from-slate-800 to-transparent flex items-center justify-center" data-v-b870d376><span class="text-[9px] font-black text-indigo-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all" data-v-b870d376>Generate Strategy</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex-1" data-v-b870d376><div class="flex items-center justify-between mb-3 px-1" data-v-b870d376><h4 class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.1em]" data-v-b870d376>${ssrInterpolate(t("goal_mastery_steps", "Mastery Steps"))}</h4><button class="text-[9px] font-black text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 uppercase tracking-widest transition-colors" data-v-b870d376>${ssrInterpolate(t("goal_new_step", "+ New Step"))}</button></div><div class="space-y-1.5 custom-milestone-list max-h-[220px] overflow-y-auto pr-1" data-v-b870d376><!--[-->`);
      ssrRenderList(__props.goal.milestones, (m) => {
        _push(ssrRenderComponent(MilestoneItem, {
          key: m._key || m.id,
          milestone: m,
          onToggle: ($event) => __props.onToggleMilestone(__props.goal, m),
          onSave: (data) => __props.onSaveMilestone(__props.goal, data),
          onDelete: ($event) => __props.onDeleteMilestone(__props.goal, m.id)
        }, null, _parent));
      });
      _push(`<!--]-->`);
      if (!((_a = __props.goal.milestones) == null ? void 0 : _a.length)) {
        _push(`<div class="py-10 text-center border-2 border-dashed border-slate-50 dark:border-slate-800 rounded-[2rem] flex flex-col items-center" data-v-b870d376><div class="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3" data-v-b870d376>`);
        _push(ssrRenderComponent(unref(ChevronRight), {
          size: 16,
          class: "text-slate-300 dark:text-slate-600"
        }, null, _parent));
        _push(`</div><p class="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest" data-v-b870d376>${ssrInterpolate(t("goal_no_steps", "No active steps"))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.goal.reward) {
        _push(`<div class="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center gap-3" data-v-b870d376><div class="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-100/50 dark:border-amber-500/20" data-v-b870d376>`);
        _push(ssrRenderComponent(unref(Award), {
          size: 14,
          class: "text-amber-500 dark:text-amber-400"
        }, null, _parent));
        _push(`</div><div class="flex flex-col min-w-0" data-v-b870d376><span class="text-[8px] font-black text-amber-500/80 dark:text-amber-400 uppercase tracking-widest" data-v-b870d376>${ssrInterpolate(t("goal_victory_reward", "Victory Reward"))}</span><p class="text-[11px] font-bold text-slate-600 dark:text-slate-400 truncate italic" data-v-b870d376>&quot;${ssrInterpolate(__props.goal.reward)}&quot;</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/GoalCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GoalCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b870d376"]]);
export {
  GoalCard as default
};
