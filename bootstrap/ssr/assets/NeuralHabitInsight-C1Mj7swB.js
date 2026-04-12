import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import axios from "axios";
import "@inertiajs/vue3";
import { u as useGating } from "./useGating-DZoi6H2L.js";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BiMr3Mnd.js";
import "sweetalert2";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "dayjs";
const _sfc_main = {
  __name: "NeuralHabitInsight",
  __ssrInlineRender: true,
  props: {
    currentMood: String
  },
  setup(__props, { expose: __expose }) {
    const { isQuantum } = useGating();
    const isAnalyzing = ref(false);
    const showStack = ref(false);
    const stackData = ref(null);
    const moodAdvisory = ref(null);
    ref(null);
    const getMoodAdvisory = async (mood) => {
      if (!mood) return;
      if (!isQuantum.value) return;
      isAnalyzing.value = true;
      try {
        const res = await axios.post(route("coach.habit.mood"), { mood });
        moodAdvisory.value = res.data;
      } catch (e) {
        console.error(e);
      } finally {
        isAnalyzing.value = false;
      }
    };
    __expose({ getMoodAdvisory });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[95%] mx-auto space-y-6 px-2" }, _attrs))} data-v-337ae6a5>`);
      if (!showStack.value) {
        _push(`<div class="space-y-8 animate-in fade-in duration-700" data-v-337ae6a5><div class="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[3rem] overflow-hidden shadow-2xl group/hero border border-slate-100 dark:border-slate-800" data-v-337ae6a5><img src="/images/neural_habit_ai.png" class="w-full h-full object-cover transition-transform duration-[10s] group-hover/hero:scale-110" alt="Neural AI Visual" data-v-337ae6a5><div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-8 md:p-12" data-v-337ae6a5><div class="flex items-center gap-3 mb-3" data-v-337ae6a5><span class="w-2 h-2 rounded-full bg-indigo-500 animate-ping" data-v-337ae6a5></span><span class="text-[10px] font-black text-indigo-400 tracking-[0.3em] uppercase" data-v-337ae6a5>Core intelligence</span></div><h2 class="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight max-w-xl" data-v-337ae6a5> Map your habits through the <span class="text-indigo-400 underline decoration-indigo-500/30" data-v-337ae6a5>neural pathways</span>. </h2></div></div><div class="flex flex-col md:flex-row items-center justify-center gap-6 py-4 relative" data-v-337ae6a5><button${ssrIncludeBooleanAttr(isAnalyzing.value) ? " disabled" : ""} class="group relative overflow-hidden flex items-center gap-5 px-10 py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-[2rem] shadow-2xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50 min-w-[280px]" data-v-337ae6a5><div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" data-v-337ae6a5></div><div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 shadow-inner" data-v-337ae6a5>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "24",
          class: "group-hover:rotate-12 transition-transform duration-500"
        }, null, _parent));
        _push(`</div><div class="text-left" data-v-337ae6a5><span class="block text-sm font-black tracking-tight leading-none mb-1" data-v-337ae6a5>${ssrInterpolate(_ctx.$t("habit_btn_alchemy"))}</span><span class="block text-[10px] font-bold text-indigo-300 tracking-tight" data-v-337ae6a5>AI stacking protocol</span></div></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showStack.value) {
        _push(`<div class="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-100/40 dark:shadow-none p-1 md:p-2 transition-all duration-500" data-v-337ae6a5><div class="bg-slate-50/50 dark:bg-slate-800/30 rounded-[2.8rem] p-6 md:p-10 relative overflow-hidden" data-v-337ae6a5><div class="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full" data-v-337ae6a5></div><div class="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full" data-v-337ae6a5></div><div class="flex items-center justify-between mb-10 relative z-10" data-v-337ae6a5><div class="flex items-center gap-6" data-v-337ae6a5><div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 dark:bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-200 dark:shadow-none rotate-6 group-hover:rotate-0 transition-transform duration-500" data-v-337ae6a5>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "32"
        }, null, _parent));
        _push(`</div><div data-v-337ae6a5><h3 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5" data-v-337ae6a5>${ssrInterpolate(_ctx.$t("habit_neural_title"))}</h3><p class="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-[0.2em]" data-v-337ae6a5>${ssrInterpolate(_ctx.$t("habit_neural_protocol"))}</p></div></div><button class="w-12 h-12 rounded-[1.25rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-all active:scale-90" data-v-337ae6a5>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "x",
          size: "24",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</button></div>`);
        if (isAnalyzing.value && !stackData.value) {
          _push(`<div class="flex flex-col items-center py-20 gap-6" data-v-337ae6a5><div class="relative" data-v-337ae6a5><div class="w-16 h-16 border-[6px] border-indigo-50 dark:border-indigo-500/5 border-t-indigo-600 rounded-full animate-spin" data-v-337ae6a5></div><div class="absolute inset-0 flex items-center justify-center" data-v-337ae6a5><div class="w-6 h-6 bg-indigo-600 rounded-full animate-pulse" data-v-337ae6a5></div></div></div><p class="text-xs font-black text-slate-400 tracking-widest animate-pulse" data-v-337ae6a5>${ssrInterpolate(_ctx.$t("habit_analyzing"))}</p></div>`);
        } else if (stackData.value) {
          _push(`<div class="space-y-8 animate-in fade-in zoom-in-95 duration-700" data-v-337ae6a5><div class="group/stack bg-white dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none relative overflow-hidden" data-v-337ae6a5><div class="absolute top-0 right-0 p-6 opacity-5 group-hover/stack:opacity-10 transition-opacity" data-v-337ae6a5>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "sparkles",
            size: "80"
          }, null, _parent));
          _push(`</div><span class="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-widest mb-6 border border-indigo-100/50 dark:border-indigo-500/20 shadow-sm" data-v-337ae6a5>Neural suggestion</span><p class="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight" data-v-337ae6a5>&quot;${ssrInterpolate(stackData.value.stack)}&quot;</p></div><div class="flex gap-4 items-start px-4" data-v-337ae6a5><div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100/50 dark:border-emerald-500/10 shadow-sm" data-v-337ae6a5>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "info",
            size: "20"
          }, null, _parent));
          _push(`</div><div data-v-337ae6a5><h5 class="text-[10px] font-black text-slate-400 tracking-widest mb-1.5" data-v-337ae6a5>Architecture logic</h5><p class="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic" data-v-337ae6a5>${ssrInterpolate(stackData.value.reason)}</p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Habits/NeuralHabitInsight.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NeuralHabitInsight = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-337ae6a5"]]);
export {
  NeuralHabitInsight as default
};
