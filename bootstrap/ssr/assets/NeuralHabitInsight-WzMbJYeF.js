import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import axios from "axios";
import { router } from "@inertiajs/vue3";
import { u as useGating } from "./useGating-Dlt-HuEc.js";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import "sweetalert2";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
    const auditData = ref(null);
    const showAudit = ref(false);
    const stagnantData = ref(null);
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
    const runAudit = async (habitId) => {
      if (!isQuantum.value) {
        router.visit(route("billing"), { data: { from: "habit_ai_audit" } });
        return;
      }
      isAnalyzing.value = true;
      showAudit.value = true;
      try {
        const res = await axios.post(route("coach.habit.audit"), { habit_id: habitId });
        auditData.value = res.data;
      } catch (e) {
        console.error(e);
      } finally {
        isAnalyzing.value = false;
      }
    };
    __expose({ runAudit, getMoodAdvisory });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[95%] mx-auto space-y-6 px-2" }, _attrs))} data-v-5fb5f782>`);
      if (stagnantData.value) {
        _push(`<div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-rose-100 dark:border-rose-500/20 shadow-2xl shadow-rose-100 dark:shadow-none mb-8 relative overflow-hidden group transition-all duration-500" data-v-5fb5f782><div class="absolute -right-10 -top-10 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" data-v-5fb5f782></div><div class="flex items-start gap-6 relative z-10" data-v-5fb5f782><div class="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0 shadow-sm border border-rose-100/50 dark:border-rose-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500" data-v-5fb5f782>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "activity",
          size: "28",
          class: "animate-pulse"
        }, null, _parent));
        _push(`</div><div class="flex-1" data-v-5fb5f782><div class="flex items-center gap-3 mb-2" data-v-5fb5f782><span class="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-[10px] font-black text-rose-600 dark:text-rose-400 tracking-wider" data-v-5fb5f782>Neural alert</span><h4 class="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wide" data-v-5fb5f782>${ssrInterpolate(stagnantData.value.title)}</h4></div><p class="text-xl font-black text-slate-800 dark:text-white leading-tight mb-4" data-v-5fb5f782>&quot;${ssrInterpolate(stagnantData.value.message)}&quot;</p><div class="bg-slate-50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-inner" data-v-5fb5f782><div class="flex items-center gap-2 mb-2" data-v-5fb5f782><span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" data-v-5fb5f782></span><p class="text-[10px] font-black text-rose-500 dark:text-rose-400 tracking-widest" data-v-5fb5f782>Recovery protocol</p></div><p class="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed" data-v-5fb5f782>${ssrInterpolate(stagnantData.value.action)}</p></div></div><button class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-90" data-v-5fb5f782>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "x",
          size: "20",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!showStack.value) {
        _push(`<div class="flex flex-col md:flex-row items-center justify-center gap-6 py-8 relative" data-v-5fb5f782><button${ssrIncludeBooleanAttr(isAnalyzing.value) ? " disabled" : ""} class="group relative overflow-hidden flex items-center gap-5 px-10 py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-[2rem] shadow-2xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50 min-w-[280px]" data-v-5fb5f782><div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" data-v-5fb5f782></div><div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 shadow-inner" data-v-5fb5f782>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "24",
          class: "group-hover:rotate-12 transition-transform duration-500"
        }, null, _parent));
        _push(`</div><div class="text-left" data-v-5fb5f782><span class="block text-sm font-black tracking-tight leading-none mb-1" data-v-5fb5f782>${ssrInterpolate(_ctx.$t("habit_btn_alchemy"))}</span><span class="block text-[10px] font-bold text-indigo-300 tracking-tight" data-v-5fb5f782>AI stacking protocol</span></div></button><button${ssrIncludeBooleanAttr(isAnalyzing.value) ? " disabled" : ""} class="group flex items-center gap-5 px-10 py-5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none hover:scale-105 transition-all active:scale-95 border border-slate-100 dark:border-slate-800 disabled:opacity-50 min-w-[280px]" data-v-5fb5f782><div class="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-100/50 dark:border-rose-500/10 shadow-sm" data-v-5fb5f782>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "activity",
          size: "24",
          class: "text-rose-500 group-hover:scale-110 transition-transform"
        }, null, _parent));
        _push(`</div><div class="text-left" data-v-5fb5f782><span class="block text-sm font-black tracking-tight leading-none mb-1" data-v-5fb5f782>Audit habit health</span><span class="block text-[10px] font-bold text-slate-400 tracking-tight" data-v-5fb5f782>Friction analysis</span></div></button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showStack.value) {
        _push(`<div class="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-100/40 dark:shadow-none p-1 md:p-2 transition-all duration-500" data-v-5fb5f782><div class="bg-slate-50/50 dark:bg-slate-800/30 rounded-[2.8rem] p-6 md:p-10 relative overflow-hidden" data-v-5fb5f782><div class="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full" data-v-5fb5f782></div><div class="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full" data-v-5fb5f782></div><div class="flex items-center justify-between mb-10 relative z-10" data-v-5fb5f782><div class="flex items-center gap-6" data-v-5fb5f782><div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 dark:bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-200 dark:shadow-none rotate-6 group-hover:rotate-0 transition-transform duration-500" data-v-5fb5f782>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "32"
        }, null, _parent));
        _push(`</div><div data-v-5fb5f782><h3 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5" data-v-5fb5f782>${ssrInterpolate(_ctx.$t("habit_neural_title"))}</h3><p class="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-[0.2em]" data-v-5fb5f782>${ssrInterpolate(_ctx.$t("habit_neural_protocol"))}</p></div></div><button class="w-12 h-12 rounded-[1.25rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-all active:scale-90" data-v-5fb5f782>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "x",
          size: "24",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</button></div>`);
        if (isAnalyzing.value && !stackData.value) {
          _push(`<div class="flex flex-col items-center py-20 gap-6" data-v-5fb5f782><div class="relative" data-v-5fb5f782><div class="w-16 h-16 border-[6px] border-indigo-50 dark:border-indigo-500/5 border-t-indigo-600 rounded-full animate-spin" data-v-5fb5f782></div><div class="absolute inset-0 flex items-center justify-center" data-v-5fb5f782><div class="w-6 h-6 bg-indigo-600 rounded-full animate-pulse" data-v-5fb5f782></div></div></div><p class="text-xs font-black text-slate-400 tracking-widest animate-pulse" data-v-5fb5f782>${ssrInterpolate(_ctx.$t("habit_analyzing"))}</p></div>`);
        } else if (stackData.value) {
          _push(`<div class="space-y-8 animate-in fade-in zoom-in-95 duration-700" data-v-5fb5f782><div class="group/stack bg-white dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none relative overflow-hidden" data-v-5fb5f782><div class="absolute top-0 right-0 p-6 opacity-5 group-hover/stack:opacity-10 transition-opacity" data-v-5fb5f782>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "sparkles",
            size: "80"
          }, null, _parent));
          _push(`</div><span class="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-widest mb-6 border border-indigo-100/50 dark:border-indigo-500/20 shadow-sm" data-v-5fb5f782>Neural suggestion</span><p class="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight" data-v-5fb5f782>&quot;${ssrInterpolate(stackData.value.stack)}&quot;</p></div><div class="flex gap-4 items-start px-4" data-v-5fb5f782><div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100/50 dark:border-emerald-500/10 shadow-sm" data-v-5fb5f782>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "info",
            size: "20"
          }, null, _parent));
          _push(`</div><div data-v-5fb5f782><h5 class="text-[10px] font-black text-slate-400 tracking-widest mb-1.5" data-v-5fb5f782>Architecture logic</h5><p class="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic" data-v-5fb5f782>${ssrInterpolate(stackData.value.reason)}</p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (moodAdvisory.value) {
        _push(`<div class="fixed inset-x-4 bottom-24 md:bottom-10 md:right-10 md:left-auto md:w-[400px] z-[100] bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-indigo-100/50 dark:border-white/5 p-7 overflow-hidden transition-all" data-v-5fb5f782><div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" data-v-5fb5f782></div><div class="relative z-10" data-v-5fb5f782><div class="flex items-center gap-4 mb-5" data-v-5fb5f782><div class="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-none" data-v-5fb5f782>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "20"
        }, null, _parent));
        _push(`</div><div class="flex-1" data-v-5fb5f782><h4 class="text-xs font-black text-slate-900 dark:text-white leading-none" data-v-5fb5f782>${ssrInterpolate(_ctx.$t("habit_mod_title"))}</h4><p class="text-[9px] font-bold text-slate-400 tracking-widest mt-1" data-v-5fb5f782>Real-time state adaptive</p></div><button class="text-slate-300 hover:text-rose-500 transition-colors" data-v-5fb5f782>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "x",
          size: "14",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button></div><p class="text-sm font-bold text-slate-600 dark:text-slate-300 mb-6 leading-relaxed italic border-l-4 border-emerald-500 pl-4" data-v-5fb5f782>&quot;${ssrInterpolate(moodAdvisory.value.message)}&quot;</p><div class="space-y-3" data-v-5fb5f782><!--[-->`);
        ssrRenderList(moodAdvisory.value.suggestions, (s) => {
          _push(`<div class="group p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1" data-v-5fb5f782><div class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm" data-v-5fb5f782>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "zap",
            size: "14"
          }, null, _parent));
          _push(`</div><div class="min-w-0 flex-1" data-v-5fb5f782><p class="text-[9px] font-black text-indigo-600 dark:text-indigo-400 tracking-widest mb-1" data-v-5fb5f782>${ssrInterpolate(s.habit)}</p><p class="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate" data-v-5fb5f782>${ssrInterpolate(s.adjustment)}</p></div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showAudit.value) {
        _push(`<div class="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all" data-v-5fb5f782><div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-10 overflow-hidden scale-in" data-v-5fb5f782><div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-indigo-500 to-emerald-400 animate-gradient-x" data-v-5fb5f782></div><div class="flex flex-col items-center text-center gap-8" data-v-5fb5f782><div class="w-20 h-20 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center shadow-2xl rotate-3 relative overflow-hidden group" data-v-5fb5f782><div class="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-transparent opacity-40" data-v-5fb5f782></div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "36",
          class: "relative z-10"
        }, null, _parent));
        _push(`</div>`);
        if (isAnalyzing.value && !auditData.value) {
          _push(`<div class="py-10" data-v-5fb5f782><div class="w-14 h-14 border-[6px] border-indigo-50 border-t-indigo-600 rounded-full animate-spin" data-v-5fb5f782></div><p class="text-xs font-black tracking-widest text-slate-400 mt-6 animate-pulse" data-v-5fb5f782>${ssrInterpolate(_ctx.$t("habit_audit_running"))}</p></div>`);
        } else if (auditData.value) {
          _push(`<div class="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700" data-v-5fb5f782><div data-v-5fb5f782><h3 class="text-xs font-black text-slate-400 tracking-[0.2em] mb-4" data-v-5fb5f782>${ssrInterpolate(_ctx.$t("habit_audit_title"))}</h3><p class="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-2" data-v-5fb5f782>&quot;${ssrInterpolate(auditData.value.audit_question)}&quot;</p></div><div class="bg-indigo-50/50 dark:bg-indigo-500/10 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-500/20 text-left relative group/solution" data-v-5fb5f782><div class="absolute -right-2 -top-2 w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg rotate-12 group-hover/solution:rotate-0 transition-transform" data-v-5fb5f782>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "zap",
            size: "14"
          }, null, _parent));
          _push(`</div><p class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-widest mb-3" data-v-5fb5f782>Neural solution found:</p><p class="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed" data-v-5fb5f782>${ssrInterpolate(auditData.value.solution)}</p></div><button class="w-full py-6 bg-slate-900 dark:bg-indigo-600 text-white rounded-[2rem] font-black text-xs tracking-[0.2em] shadow-2xl hover:bg-slate-800 dark:hover:bg-indigo-700 active:scale-95 transition-all outline-none" data-v-5fb5f782>${ssrInterpolate(_ctx.$t("habit_btn_audit_close"))}</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
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
const NeuralHabitInsight = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5fb5f782"]]);
export {
  NeuralHabitInsight as default
};
