import { ref, mergeProps, unref, useSSRContext } from "vue";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[95%] mx-auto space-y-4 px-2" }, _attrs))} data-v-9aa37228>`);
      if (stagnantData.value) {
        _push(`<div class="bg-gradient-to-r from-rose-500 to-orange-600 rounded-3xl p-5 shadow-xl shadow-rose-100 dark:shadow-none mb-6 relative overflow-hidden group" data-v-9aa37228><div class="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" data-v-9aa37228></div><div class="flex items-start gap-4 relative" data-v-9aa37228><div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner" data-v-9aa37228>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "24",
          class: "animate-pulse"
        }, null, _parent));
        _push(`</div><div class="flex-1" data-v-9aa37228><h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-white/80 mb-1" data-v-9aa37228>${ssrInterpolate(stagnantData.value.title)}</h4><p class="text-sm font-black text-white leading-tight mb-2" data-v-9aa37228>&quot;${ssrInterpolate(stagnantData.value.message)}&quot;</p><div class="bg-black/20 rounded-xl p-3 border border-white/10" data-v-9aa37228><p class="text-[10px] font-bold text-white/90 leading-relaxed italic" data-v-9aa37228><span class="text-orange-300 font-black" data-v-9aa37228>AI RECOVERY STEP:</span> ${ssrInterpolate(stagnantData.value.action)}</p></div></div><button class="text-white/40 hover:text-white transition-colors" data-v-9aa37228>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "x",
          size: "14"
        }, null, _parent));
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!showStack.value) {
        _push(`<div class="flex flex-wrap justify-center gap-4 py-4 relative group" data-v-9aa37228>`);
        if (!unref(isQuantum)) {
          _push(`<div class="absolute inset-0 z-20 flex items-center justify-center bg-white/20 dark:bg-slate-900/20 backdrop-blur-[2px] cursor-pointer rounded-2xl border border-dashed border-indigo-200/50 dark:border-indigo-500/20 hover:backdrop-blur-sm transition-all" data-v-9aa37228><div class="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl" data-v-9aa37228>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "lock",
            size: "12"
          }, null, _parent));
          _push(` Neural OS (Quantum Only) </div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button${ssrIncludeBooleanAttr(isAnalyzing.value) ? " disabled" : ""} class="group flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl shadow-xl hover:scale-105 transition-all active:scale-95 border border-white/10 disabled:opacity-50" data-v-9aa37228><div class="relative" data-v-9aa37228>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "18",
          class: "group-hover:rotate-12 transition-transform"
        }, null, _parent));
        _push(`<span class="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" data-v-9aa37228></span></div><span class="text-xs font-black uppercase tracking-widest" data-v-9aa37228>${ssrInterpolate(_ctx.$t("habit_btn_alchemy"))}</span></button><button${ssrIncludeBooleanAttr(isAnalyzing.value) ? " disabled" : ""} class="group flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl shadow-lg hover:scale-105 transition-all active:scale-95 border border-slate-100 dark:border-slate-700 disabled:opacity-50" data-v-9aa37228>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "activity",
          size: "18",
          class: "text-rose-500"
        }, null, _parent));
        _push(`<span class="text-xs font-black uppercase tracking-widest" data-v-9aa37228>Audit Habit Health</span></button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showStack.value) {
        _push(`<div class="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-100/50 dark:shadow-none p-6 md:p-8" data-v-9aa37228><div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full translate-x-10 -translate-y-10" data-v-9aa37228></div><div class="flex items-start justify-between mb-6" data-v-9aa37228><div class="flex items-center gap-3" data-v-9aa37228><div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white" data-v-9aa37228>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "20"
        }, null, _parent));
        _push(`</div><div data-v-9aa37228><h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight" data-v-9aa37228>${ssrInterpolate(_ctx.$t("habit_neural_title"))}</h3><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-9aa37228>${ssrInterpolate(_ctx.$t("habit_neural_protocol"))}</p></div></div><button class="p-2 text-slate-300 hover:text-slate-500 transition-colors" data-v-9aa37228>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "x",
          size: "16"
        }, null, _parent));
        _push(`</button></div>`);
        if (isAnalyzing.value && !stackData.value) {
          _push(`<div class="flex flex-col items-center py-10 gap-4" data-v-9aa37228><div class="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" data-v-9aa37228></div><p class="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse" data-v-9aa37228>${ssrInterpolate(_ctx.$t("habit_analyzing"))}</p></div>`);
        } else if (stackData.value) {
          _push(`<div class="space-y-6" data-v-9aa37228><div class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800" data-v-9aa37228><p class="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 italic" data-v-9aa37228>Suggested Stack:</p><p class="text-lg md:text-xl font-black text-slate-800 dark:text-white leading-tight" data-v-9aa37228>&quot;${ssrInterpolate(stackData.value.stack)}&quot;</p></div><div class="flex gap-4 items-start px-2" data-v-9aa37228><div class="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" data-v-9aa37228></div><p class="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic" data-v-9aa37228>${ssrInterpolate(stackData.value.reason)}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (moodAdvisory.value) {
        _push(`<div class="fixed inset-x-4 bottom-24 md:bottom-10 md:right-10 md:left-auto md:w-96 z-[100] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-indigo-100 dark:border-indigo-500/20 p-6 overflow-hidden" data-v-9aa37228><div class="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full" data-v-9aa37228></div><div class="relative" data-v-9aa37228><div class="flex items-center gap-3 mb-4" data-v-9aa37228><div class="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white" data-v-9aa37228>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "16"
        }, null, _parent));
        _push(`</div><h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white" data-v-9aa37228>${ssrInterpolate(_ctx.$t("habit_mod_title"))}</h4><button class="ml-auto text-slate-400" data-v-9aa37228>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "x",
          size: "12"
        }, null, _parent));
        _push(`</button></div><p class="text-xs font-bold text-slate-600 dark:text-slate-300 mb-4 leading-relaxed italic" data-v-9aa37228>&quot;${ssrInterpolate(moodAdvisory.value.message)}&quot;</p><div class="space-y-2" data-v-9aa37228><!--[-->`);
        ssrRenderList(moodAdvisory.value.suggestions, (s) => {
          _push(`<div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 transition-transform hover:scale-[1.02]" data-v-9aa37228><span class="text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase shrink-0" data-v-9aa37228>⚡ Adjust:</span><span class="text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate" data-v-9aa37228>${ssrInterpolate(s.habit)}: ${ssrInterpolate(s.adjustment)}</span></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showAudit.value) {
        _push(`<div class="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" data-v-9aa37228><div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-8 overflow-hidden scale-in" data-v-9aa37228><div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-indigo-500 to-emerald-400" data-v-9aa37228></div><div class="flex flex-col items-center text-center gap-6" data-v-9aa37228><div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center shadow-xl rotate-3" data-v-9aa37228>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "32"
        }, null, _parent));
        _push(`</div>`);
        if (isAnalyzing.value && !auditData.value) {
          _push(`<div data-v-9aa37228><div class="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" data-v-9aa37228></div><p class="text-xs font-black uppercase tracking-widest text-slate-400 mt-4 animate-pulse" data-v-9aa37228>${ssrInterpolate(_ctx.$t("habit_audit_running"))}</p></div>`);
        } else if (auditData.value) {
          _push(`<div class="space-y-6 animate-in fade-in slide-in-from-bottom-4" data-v-9aa37228><div data-v-9aa37228><h3 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4" data-v-9aa37228>${ssrInterpolate(_ctx.$t("habit_audit_title"))}</h3><p class="text-lg font-black text-rose-500 leading-tight italic" data-v-9aa37228>&quot;${ssrInterpolate(auditData.value.audit_question)}&quot;</p></div><div class="bg-indigo-50 dark:bg-indigo-500/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 text-left" data-v-9aa37228><p class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2" data-v-9aa37228>${ssrInterpolate(_ctx.$t("habit_audit_solution"))}:</p><p class="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed" data-v-9aa37228>${ssrInterpolate(auditData.value.solution)}</p></div><button class="w-full py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all" data-v-9aa37228>${ssrInterpolate(_ctx.$t("habit_btn_audit_close"))}</button></div>`);
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
const NeuralHabitInsight = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9aa37228"]]);
export {
  NeuralHabitInsight as default
};
