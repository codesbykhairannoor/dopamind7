import { ref, onMounted, onUnmounted, watch, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
const _sfc_main = {
  __name: "PlannerSidebar",
  __ssrInlineRender: true,
  props: {
    stats: { type: Object, default: () => ({ percent: 0, completed: 0, total: 0 }) },
    localNotes: String,
    localMeals: { type: Object, default: () => ({ breakfast: "", lunch: "", dinner: "" }) }
  },
  emits: ["update:localNotes", "update:localMeals"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const manualTasks = ref([]);
    const waterIntake = ref(0);
    const notesText = ref("");
    const performLocalReset = () => {
      manualTasks.value = [];
      waterIntake.value = 0;
      notesText.value = "";
      localStorage.removeItem("p_manual_tasks");
      localStorage.removeItem("p_water");
      localStorage.removeItem("p_notes");
    };
    onMounted(() => {
      manualTasks.value = JSON.parse(localStorage.getItem("p_manual_tasks")) || [];
      waterIntake.value = Number(localStorage.getItem("p_water")) || 0;
      notesText.value = localStorage.getItem("p_notes") || "";
      window.addEventListener("reset-local-storage", performLocalReset);
    });
    onUnmounted(() => {
      window.removeEventListener("reset-local-storage", performLocalReset);
    });
    watch(manualTasks, (v) => localStorage.setItem("p_manual_tasks", JSON.stringify(v)), { deep: true });
    watch(waterIntake, (v) => localStorage.setItem("p_water", v));
    watch(notesText, (v) => localStorage.setItem("p_notes", v));
    const getTaskIcon = (type) => {
      switch (type) {
        case 1:
          return { icon: "🔥", style: "bg-rose-50 text-rose-600 border-rose-100" };
        case 2:
          return { icon: "⚡", style: "bg-indigo-50 text-indigo-600 border-indigo-100" };
        case 3:
          return { icon: "☕", style: "bg-emerald-50 text-emerald-600 border-emerald-100" };
        default:
          return { icon: "📝", style: "bg-slate-50 text-slate-600 border-slate-100" };
      }
    };
    const combinedStats = computed(() => {
      var _a, _b;
      const dbCompleted = ((_a = props.stats) == null ? void 0 : _a.completed) || 0;
      const dbTotal = ((_b = props.stats) == null ? void 0 : _b.total) || 0;
      const manualCompleted = manualTasks.value.filter((t) => t.is_completed).length;
      const manualTotal = manualTasks.value.length;
      const total = dbTotal + manualTotal;
      const completed = dbCompleted + manualCompleted;
      return {
        percent: total > 0 ? Math.round(completed / total * 100) : 0,
        completed,
        total
      };
    });
    const categoryDistribution = computed(() => {
      return [
        { count: manualTasks.value.filter((t) => t.type === 1).length, color: "bg-rose-400" },
        { count: manualTasks.value.filter((t) => t.type === 2).length, color: "bg-indigo-400" },
        { count: manualTasks.value.filter((t) => t.type === 3).length, color: "bg-emerald-400" }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-6 pb-10 select-none" }, _attrs))}><div class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200 relative overflow-hidden group"><div class="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div><div class="flex justify-between items-start mb-6 relative z-10"><div><h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">${ssrInterpolate(_ctx.$t("sidebar_daily_focus"))}</h3><div class="flex items-baseline gap-1"><span class="text-5xl font-black text-slate-800 tracking-tighter">${ssrInterpolate(combinedStats.value.percent)}<span class="text-xl text-slate-300">%</span></span></div></div><div class="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-600 text-white shadow-lg shadow-indigo-100 transition-transform active:scale-95"><span class="${ssrRenderClass([{ "animate-bounce": combinedStats.value.percent === 100 }, "text-2xl"])}">${ssrInterpolate(combinedStats.value.percent === 100 ? "🏆" : "🚀")}</span></div></div><div class="flex h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4 p-0.5 border border-slate-50"><!--[-->`);
      ssrRenderList(categoryDistribution.value, (stat, idx) => {
        _push(`<div style="${ssrRenderStyle({ width: stat.count / (manualTasks.value.length || 1) * 100 + "%" })}" class="${ssrRenderClass([stat.color, "transition-all duration-1000 h-full first:rounded-l-full last:rounded-r-full"])}"></div>`);
      });
      _push(`<!--]--></div><div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400"><span>${ssrInterpolate(combinedStats.value.completed)} / ${ssrInterpolate(combinedStats.value.total)} ${ssrInterpolate(_ctx.$t("sidebar_done_suffix"))}</span><span class="text-indigo-600">Active</span></div></div><div class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200"><div class="flex justify-between items-center mb-5"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">📥</div><div><h3 class="font-black text-slate-800 text-sm tracking-tight">${ssrInterpolate(_ctx.$t("sidebar_inbox_title"))}</h3><p class="text-[9px] text-slate-400 font-bold uppercase tracking-tighter italic">${ssrInterpolate(_ctx.$t("sidebar_persistent"))}</p></div></div><button class="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition-all active:scale-90 shadow-md"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M12 4v16m8-8H4"></path></svg></button></div>`);
      if (!manualTasks.value.length) {
        _push(`<div class="text-center py-10 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30"><p class="text-xs text-slate-400 font-black italic tracking-widest">${ssrInterpolate(_ctx.$t("sidebar_inbox_empty"))}</p></div>`);
      } else {
        _push(`<div class="space-y-3 max-h-[350px] overflow-y-auto pr-1 scrollbar-none"><!--[-->`);
        ssrRenderList(manualTasks.value, (task) => {
          _push(`<div class="${ssrRenderClass([{ "opacity-50 grayscale-[0.5] bg-slate-50": task.is_completed }, "group flex items-center justify-between gap-3 p-3 rounded-2xl border-2 border-slate-50 bg-white hover:border-indigo-100 transition-all"])}"><div class="flex items-center gap-3 min-w-0 flex-1"><button class="${ssrRenderClass([task.is_completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-200 hover:border-indigo-400", "w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all"])}">`);
          if (task.is_completed) {
            _push(`<svg class="w-4 h-4 stroke-[4]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button><button class="${ssrRenderClass([getTaskIcon(task.type).style, "w-8 h-8 rounded-xl border flex items-center justify-center text-sm transition active:scale-90 flex-shrink-0"])}">${ssrInterpolate(getTaskIcon(task.type).icon)}</button><input${ssrRenderAttr("value", task.title)} class="${ssrRenderClass([{ "line-through text-slate-400": task.is_completed }, "flex-1 bg-transparent border-0 focus:ring-0 p-0 text-sm font-black text-slate-700 placeholder-slate-300 truncate"])}" placeholder="..."></div><button class="opacity-0 group-hover:opacity-100 text-rose-300 hover:text-rose-600 transition-all flex-shrink-0"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="bg-yellow-50 p-1 rounded-[2.5rem] shadow-sm border border-yellow-200 transform rotate-1 transition-transform hover:rotate-0 duration-500"><div class="bg-yellow-100/50 p-6 rounded-[2.2rem] border-dashed border-2 border-yellow-200/60"><h3 class="text-[10px] font-black text-yellow-700/70 uppercase tracking-widest mb-3 flex items-center gap-2"> 📌 ${ssrInterpolate(_ctx.$t("sidebar_notes_title"))}</h3><textarea class="w-full bg-transparent border-0 focus:ring-0 text-sm font-medium text-slate-700 p-0 h-32 resize-none leading-[24px]" style="${ssrRenderStyle({ "background-image": "linear-gradient(transparent, transparent 23px, #eab30820 24px)", "background-size": "100% 24px" })}"${ssrRenderAttr("placeholder", _ctx.$t("sidebar_notes_placeholder"))}>${ssrInterpolate(notesText.value)}</textarea></div></div><div class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200"><h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><span class="bg-orange-100 text-orange-600 p-1.5 rounded-lg text-xs">🍽️</span> ${ssrInterpolate(_ctx.$t("sidebar_meal_title"))}</h3><div class="space-y-3"><!--[-->`);
      ssrRenderList({ breakfast: "🍳", lunch: "🍱", dinner: "🥗" }, (icon, key) => {
        var _a;
        _push(`<div class="flex items-center gap-3 p-3 rounded-2xl bg-orange-50/30 border border-orange-50 focus-within:bg-white focus-within:border-orange-200 transition-all"><span class="text-xl flex-shrink-0">${ssrInterpolate(icon)}</span><input${ssrRenderAttr("value", (_a = __props.localMeals) == null ? void 0 : _a[key])} class="w-full text-xs font-black border-0 focus:ring-0 p-0 bg-transparent text-slate-700 placeholder-orange-200"${ssrRenderAttr("placeholder", _ctx.$t("placeholder_" + key))}></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200"><div class="flex justify-between items-center mb-4"><h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><span class="bg-blue-100 text-blue-600 p-1.5 rounded-lg text-xs">💧</span> ${ssrInterpolate(_ctx.$t("sidebar_water_title"))}</h3><span class="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">${ssrInterpolate(waterIntake.value)} / 8</span></div><div class="grid grid-cols-4 gap-2 p-1 bg-slate-50 rounded-[1.5rem] border border-slate-100"><!--[-->`);
      ssrRenderList(8, (glass) => {
        _push(`<button type="button" class="${ssrRenderClass([glass <= waterIntake.value ? "bg-white shadow-md" : "opacity-20 grayscale", "h-10 flex items-center justify-center transition-all duration-300 transform active:scale-75 rounded-xl"])}"><span class="text-lg">💧</span></button>`);
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
