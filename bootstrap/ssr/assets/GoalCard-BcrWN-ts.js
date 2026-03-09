import { computed, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { Target, Calendar, Edit3, Trash2, Zap, ChevronRight, Award } from "lucide-vue-next";
import MilestoneItem from "./MilestoneItem-k7xkfgWU.js";
import { usePage } from "@inertiajs/vue3";
import dayjs from "dayjs";
import confetti from "canvas-confetti";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "laravel-vue-i18n";
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
    onDeleteMilestone: Function
  },
  setup(__props) {
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
        vital: { text: "Vital", class: "bg-rose-50 text-rose-600 border-rose-100" },
        important: { text: "Important", class: "bg-indigo-50 text-indigo-600 border-indigo-100" },
        optional: { text: "Optional", class: "bg-slate-50 text-slate-400 border-slate-100" }
      }[p];
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col overflow-hidden h-full" }, _attrs))} data-v-04d065c6><div class="relative h-44 shrink-0 overflow-hidden bg-slate-50" data-v-04d065c6>`);
      if (__props.goal.cover_image_url) {
        _push(`<!--[--><img${ssrRenderAttr("src", __props.goal.cover_image_url)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-v-04d065c6><div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" data-v-04d065c6></div><!--]-->`);
      } else {
        _push(`<div class="w-full h-full flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700" data-v-04d065c6>`);
        _push(ssrRenderComponent(unref(Target), { size: 100 }, null, _parent));
        _push(`<div class="absolute inset-0 bg-gradient-to-br from-slate-100 to-indigo-50/30" data-v-04d065c6></div></div>`);
      }
      _push(`<div class="absolute inset-x-5 bottom-4 flex flex-col" data-v-04d065c6><div class="flex items-center gap-2 mb-1.5" data-v-04d065c6><span class="${ssrRenderClass(["px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md transition-colors", __props.goal.cover_image_url ? "bg-white/10 text-white" : priorityLabel.value.class])}" data-v-04d065c6>${ssrInterpolate(priorityLabel.value.text)}</span>`);
      if (__props.goal.end_date) {
        _push(`<span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-black/20 text-white border border-white/10 backdrop-blur-md flex items-center gap-1" data-v-04d065c6>`);
        _push(ssrRenderComponent(unref(Calendar), { size: 8 }, null, _parent));
        _push(` ${ssrInterpolate(dateDisplay(__props.goal.end_date))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h3 class="${ssrRenderClass([__props.goal.cover_image_url ? "text-white" : "text-slate-800", "text-xl font-black truncate drop-shadow-sm"])}" data-v-04d065c6>${ssrInterpolate(__props.goal.title)}</h3></div><div class="absolute top-4 right-4 flex gap-2" data-v-04d065c6><button class="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-indigo-600 transition-all shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 delay-75" data-v-04d065c6>`);
      _push(ssrRenderComponent(unref(Edit3), { size: 14 }, null, _parent));
      _push(`</button><button class="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 delay-150" data-v-04d065c6>`);
      _push(ssrRenderComponent(unref(Trash2), { size: 14 }, null, _parent));
      _push(`</button></div></div><div class="p-6 flex flex-col flex-1" data-v-04d065c6><div class="flex items-center justify-between mb-4" data-v-04d065c6><div class="flex flex-col" data-v-04d065c6><span class="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5" data-v-04d065c6>Manifestation</span><span class="text-xs font-black text-slate-800 tabular-nums" data-v-04d065c6>${ssrInterpolate(progress.value)}% Completed</span></div><div class="p-2 rounded-xl bg-slate-50 border border-slate-100" data-v-04d065c6>`);
      _push(ssrRenderComponent(unref(Zap), {
        size: 14,
        class: progress.value === 100 ? "text-amber-400 animate-pulse" : "text-slate-300"
      }, null, _parent));
      _push(`</div></div><div class="h-1.5 w-full bg-slate-100 rounded-full mb-6 overflow-hidden p-0.5" data-v-04d065c6><div class="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.2)]" style="${ssrRenderStyle({ width: progress.value + "%", backgroundColor: __props.goal.color || "#6366f1" })}" data-v-04d065c6></div></div><div class="flex-1" data-v-04d065c6><div class="flex items-center justify-between mb-3 px-1" data-v-04d065c6><h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]" data-v-04d065c6>Mastery Steps</h4><button class="text-[9px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-widest transition-colors" data-v-04d065c6> + New Step </button></div><div class="space-y-1.5 custom-milestone-list max-h-[220px] overflow-y-auto pr-1" data-v-04d065c6><!--[-->`);
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
        _push(`<div class="py-10 text-center border-2 border-dashed border-slate-50 rounded-[2rem] flex flex-col items-center" data-v-04d065c6><div class="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-3" data-v-04d065c6>`);
        _push(ssrRenderComponent(unref(ChevronRight), {
          size: 16,
          class: "text-slate-300"
        }, null, _parent));
        _push(`</div><p class="text-[10px] font-bold text-slate-300 uppercase tracking-widest" data-v-04d065c6>No active steps</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.goal.reward) {
        _push(`<div class="mt-6 pt-4 border-t border-slate-50 flex items-center gap-3" data-v-04d065c6><div class="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100/50" data-v-04d065c6>`);
        _push(ssrRenderComponent(unref(Award), {
          size: 14,
          class: "text-amber-500"
        }, null, _parent));
        _push(`</div><div class="flex flex-col min-w-0" data-v-04d065c6><span class="text-[8px] font-black text-amber-500/80 uppercase tracking-widest" data-v-04d065c6>Victory Reward</span><p class="text-[11px] font-bold text-slate-600 truncate italic" data-v-04d065c6>&quot;${ssrInterpolate(__props.goal.reward)}&quot;</p></div></div>`);
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
const GoalCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-04d065c6"]]);
export {
  GoalCard as default
};
