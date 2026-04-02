import { ref, computed, onUnmounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "PlannerSidebar",
  __ssrInlineRender: true,
  props: {
    stats: { type: Object, default: () => ({ percent: 0, completed: 0, total: 0 }) },
    localNotes: String,
    localMeals: { type: Object, default: () => ({ breakfast: "", lunch: "", dinner: "" }) },
    localWater: { type: Number, default: 0 },
    localTaskBox: { type: Array, default: () => [] }
  },
  emits: ["update:localNotes", "update:localMeals", "update:localWater", "update:localTaskBox"],
  setup(__props, { emit: __emit }) {
    const getTaskIcon = (type) => {
      switch (type) {
        case 1:
          return { icon: "🔥", style: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20" };
        case 2:
          return { icon: "⚡", style: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20" };
        case 3:
          return { icon: "☕", style: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20" };
        default:
          return { icon: "📝", style: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700" };
      }
    };
    const pomodoroTime = ref(25 * 60);
    const isTimerRunning = ref(false);
    let timerInterval = null;
    const formattedTimer = computed(() => {
      const minutes = Math.floor(pomodoroTime.value / 60);
      const seconds = pomodoroTime.value % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    });
    onUnmounted(() => clearInterval(timerInterval));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-6 pb-10 select-none" }, _attrs))}><div class="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group transition-colors duration-500"><div class="absolute -right-24 -top-24 w-64 h-64 border-[40px] border-slate-50 dark:border-slate-800/50 rounded-full pointer-events-none group-hover:scale-105 transition-all duration-1000"></div><div class="relative z-10 flex flex-col"><div class="w-full flex justify-between items-start mb-6"><div><h3 class="font-black text-slate-800 dark:text-white text-sm tracking-tight flex items-center gap-2 transition-colors duration-500"><span class="${ssrRenderClass([isTimerRunning.value ? "bg-indigo-500 animate-pulse" : "bg-slate-300 dark:bg-slate-700", "w-2 h-2 rounded-full"])}"></span> ${ssrInterpolate(_ctx.$t("sidebar_pomodoro_title", "Focus Session"))}</h3></div><button${ssrRenderAttr("title", _ctx.$t("sidebar_pomodoro_reset"))} class="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button></div><div class="flex justify-center items-center py-4 text-center"><div class="text-6xl md:text-7xl font-black text-slate-800 dark:text-white tracking-tighter tabular-nums transition-colors duration-500" style="${ssrRenderStyle({ "font-variant-numeric": "tabular-nums" })}">${ssrInterpolate(formattedTimer.value)}</div></div><div class="mt-6 flex justify-center"><button class="${ssrRenderClass([isTimerRunning.value ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20", "w-full py-4 rounded-2xl font-black tracking-widest uppercase transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"])}">`);
      if (isTimerRunning.value) {
        _push(`<span class="flex items-center gap-2"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg> ${ssrInterpolate(_ctx.$t("sidebar_pomodoro_pause", "Jeda"))}</span>`);
      } else {
        _push(`<span class="flex items-center gap-2"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg> ${ssrInterpolate(_ctx.$t("sidebar_pomodoro_start", "Mulai Fokus"))}</span>`);
      }
      _push(`</button></div></div></div><div class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-500"><div class="flex justify-between items-center mb-5"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-xl">📥</div><div><h3 class="font-black text-slate-800 dark:text-white text-sm tracking-tight transition-colors duration-500">${ssrInterpolate(_ctx.$t("sidebar_inbox_title"))}</h3><p class="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter italic transition-colors duration-500">${ssrInterpolate(_ctx.$t("sidebar_persistent"))}</p></div></div><button class="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition-all active:scale-90 shadow-md"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M12 4v16m8-8H4"></path></svg></button></div>`);
      if (!(__props.localTaskBox || []).length) {
        _push(`<div class="text-center py-10 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem] bg-slate-50/30 dark:bg-slate-800/10 transition-colors duration-500"><p class="text-xs text-slate-400 dark:text-slate-500 font-black italic tracking-widest">${ssrInterpolate(_ctx.$t("sidebar_inbox_empty"))}</p></div>`);
      } else {
        _push(`<div class="space-y-3 max-h-[350px] overflow-y-auto pr-1 scrollbar-none"><!--[-->`);
        ssrRenderList(__props.localTaskBox, (task) => {
          _push(`<div class="${ssrRenderClass([{ "opacity-50 grayscale-[0.5] bg-slate-50 dark:bg-slate-800/50": task.is_completed }, "group flex items-center justify-between gap-3 p-3 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all"])}"><div class="flex items-center gap-3 min-w-0 flex-1"><button class="${ssrRenderClass([task.is_completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-200 hover:border-indigo-400", "w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all"])}">`);
          if (task.is_completed) {
            _push(`<svg class="w-4 h-4 stroke-[4]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button><button class="${ssrRenderClass([getTaskIcon(task.type).style, "w-8 h-8 rounded-xl border flex items-center justify-center text-sm transition active:scale-90 flex-shrink-0"])}">${ssrInterpolate(getTaskIcon(task.type).icon)}</button><input${ssrRenderAttr("value", task.title)} class="${ssrRenderClass([{ "line-through text-slate-400 dark:text-slate-600": task.is_completed }, "flex-1 bg-transparent border-0 focus:ring-0 p-0 text-sm font-black text-slate-700 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-700 truncate transition-colors duration-500"])}" placeholder="..."></div><button class="opacity-0 group-hover:opacity-100 text-rose-300 hover:text-rose-600 transition-all flex-shrink-0"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="bg-yellow-50 dark:bg-yellow-950/20 p-1 rounded-[2.5rem] shadow-sm border border-yellow-200 dark:border-yellow-900/40 transform rotate-1 transition-all hover:rotate-0 duration-500"><div class="bg-yellow-100/50 dark:bg-yellow-900/20 p-6 rounded-[2.2rem] border-dashed border-2 border-yellow-200/60 dark:border-yellow-900/40"><h3 class="text-[10px] font-black text-yellow-700/70 uppercase tracking-widest mb-3 flex items-center gap-2"> 📌 ${ssrInterpolate(_ctx.$t("sidebar_notes_title"))}</h3><textarea class="w-full bg-transparent border-0 focus:ring-0 text-sm font-medium text-slate-700 dark:text-yellow-200 placeholder-yellow-400/50 dark:placeholder-yellow-700 p-0 h-32 resize-none leading-[24px] transition-colors duration-500" style="${ssrRenderStyle({ "background-image": "linear-gradient(transparent, transparent 23px, #eab30820 24px)", "background-size": "100% 24px" })}"${ssrRenderAttr("placeholder", _ctx.$t("sidebar_notes_placeholder"))}>${ssrInterpolate(__props.localNotes)}</textarea></div></div><div class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-500"><h3 class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 transition-colors duration-500"><span class="bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 p-1.5 rounded-lg text-xs">🍽️</span> ${ssrInterpolate(_ctx.$t("sidebar_meal_title"))}</h3><div class="space-y-3"><!--[-->`);
      ssrRenderList({ breakfast: "🍳", lunch: "🍱", dinner: "🥗" }, (icon, key) => {
        var _a;
        _push(`<div class="flex items-center gap-3 p-3 rounded-2xl bg-orange-50/30 dark:bg-orange-500/5 border border-orange-50 dark:border-orange-900/20 focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:border-orange-200 dark:focus-within:border-orange-500/40 transition-all"><span class="text-xl flex-shrink-0">${ssrInterpolate(icon)}</span><input${ssrRenderAttr("value", (_a = __props.localMeals) == null ? void 0 : _a[key])} class="w-full text-xs font-black border-0 focus:ring-0 p-0 bg-transparent text-slate-700 dark:text-slate-200 placeholder-orange-200 dark:placeholder-orange-900 transition-colors duration-500"${ssrRenderAttr("placeholder", _ctx.$t("placeholder_" + key))}></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-500"><div class="flex justify-between items-center mb-4"><h3 class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 transition-colors duration-500"><span class="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 p-1.5 rounded-lg text-xs">💧</span> ${ssrInterpolate(_ctx.$t("sidebar_water_title"))}</h3><span class="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-full transition-colors duration-500">${ssrInterpolate(__props.localWater)} / 8</span></div><div class="grid grid-cols-4 gap-2 p-1 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 transition-colors duration-500"><!--[-->`);
      ssrRenderList(8, (glass) => {
        _push(`<button type="button" class="${ssrRenderClass([glass <= __props.localWater ? "bg-white dark:bg-slate-700 shadow-md" : "opacity-20 grayscale dark:opacity-30", "h-10 flex items-center justify-center transition-all duration-300 transform active:scale-75 rounded-xl"])}"><span class="text-lg">💧</span></button>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Planner/PlannerSidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
