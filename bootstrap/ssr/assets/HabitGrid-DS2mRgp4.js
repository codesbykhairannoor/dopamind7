import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "HabitGrid",
  __ssrInlineRender: true,
  props: {
    localHabits: Array,
    monthDates: Array,
    hasPrevHabits: Boolean,
    toggleStatus: Function,
    handleGridNav: Function,
    getStatus: Function,
    editHabit: Function,
    confirmDelete: Function,
    openCreateModal: Function,
    // Untuk tombol empty state
    openCopyModal: Function
    // Untuk tombol empty state
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full md:max-w-[95%] mx-auto md:px-2 pt-4 md:pt-8 pb-20" }, _attrs))} data-v-793cf338>`);
      if (__props.localHabits.length > 0) {
        _push(`<div class="bg-white md:rounded-3xl shadow-sm md:shadow-[0_2px_20px_rgba(0,0,0,0.04)] border-y md:border border-slate-100 overflow-hidden relative" data-v-793cf338><div class="overflow-x-auto custom-scrollbar relative" data-v-793cf338><div class="min-w-max" data-v-793cf338><div class="sticky top-0 z-30 bg-white border-b border-slate-100 flex shadow-sm" data-v-793cf338><div class="sticky left-0 z-40 bg-white w-36 md:w-72 border-r border-slate-100 p-3 md:p-4 flex items-center font-bold text-slate-400 text-[10px] md:text-xs uppercase tracking-wider" data-v-793cf338><span class="truncate" data-v-793cf338>${ssrInterpolate(_ctx.$t("habit_name"))}</span></div><div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5" data-v-793cf338><!--[-->`);
        ssrRenderList(__props.monthDates, (day) => {
          _push(`<div class="w-8 flex flex-col items-center gap-1" data-v-793cf338><span class="text-[9px] md:text-[10px] font-bold text-slate-400 capitalize" data-v-793cf338>${ssrInterpolate(day.dayName)}</span><span class="${ssrRenderClass([day.isToday ? "text-indigo-600 bg-indigo-50 px-1.5 rounded" : "", "text-[10px] md:text-xs font-black text-slate-600"])}" data-v-793cf338>${ssrInterpolate(day.dayNumber)}</span></div>`);
        });
        _push(`<!--]--></div><div class="hidden md:flex sticky right-0 z-40 bg-white w-32 p-4 border-l border-slate-100 items-center justify-end font-bold text-slate-400 text-xs uppercase tracking-wider shadow-[-10px_0_20px_rgba(255,255,255,0.8)]" data-v-793cf338>${ssrInterpolate(_ctx.$t("habit_table_total"))}</div></div><div class="divide-y divide-slate-50" data-v-793cf338><!--[-->`);
        ssrRenderList(__props.localHabits, (habit, hIndex) => {
          _push(`<div class="flex hover:bg-slate-50/50 transition-colors group" data-v-793cf338><div class="sticky left-0 z-20 w-36 md:w-72 bg-white group-hover:bg-slate-50 transition-colors border-r border-slate-100 p-3 md:p-4 flex items-center gap-3 md:gap-4 flex-shrink-0" data-v-793cf338><div class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center text-base md:text-xl bg-slate-50 border border-slate-100" style="${ssrRenderStyle({ color: habit.color })}" data-v-793cf338>${ssrInterpolate(habit.icon)}</div><div class="min-w-0 flex-1" data-v-793cf338><h4 class="font-bold text-slate-700 truncate text-xs md:text-sm" data-v-793cf338>${ssrInterpolate(habit.name)}</h4><div class="flex items-center gap-1 text-[10px] font-medium text-slate-400 mb-1.5 mt-0.5" data-v-793cf338><span data-v-793cf338>🎯 Target: ${ssrInterpolate(habit.monthly_target)}</span></div><div class="flex items-center gap-2" data-v-793cf338><div class="h-1 md:h-1.5 w-10 md:w-16 bg-slate-100 rounded-full overflow-hidden" data-v-793cf338><div class="h-full rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: habit.progress_percent + "%", backgroundColor: habit.color })}" data-v-793cf338></div></div><button class="md:hidden text-slate-400 hover:text-indigo-600 px-1 active:scale-95 transition" data-v-793cf338><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-793cf338><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-v-793cf338></path></svg></button><div class="hidden md:flex opacity-0 group-hover:opacity-100 transition items-center gap-1 bg-white/80 backdrop-blur-sm px-1 rounded-md absolute right-2 top-1/2 -translate-y-1/2 shadow-sm border border-slate-100 z-50" data-v-793cf338><button class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="Edit" data-v-793cf338><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-793cf338><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-v-793cf338></path></svg></button><button class="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition" title="Hapus" data-v-793cf338><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-793cf338><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-793cf338></path></svg></button></div></div></div></div><div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5" data-v-793cf338><!--[-->`);
          ssrRenderList(__props.monthDates, (day, dIndex) => {
            _push(`<div class="w-8 flex justify-center" data-v-793cf338><button${ssrRenderAttr("id", `cell-${hIndex}-${dIndex}`)}${ssrIncludeBooleanAttr(day.isFuture) ? " disabled" : ""} tabindex="0" class="${ssrRenderClass([{
              /* KONDISI: BERHASIL/CENTANG */
              "shadow-md text-white border-transparent z-10": __props.getStatus(habit, day.dateString) === "completed",
              /* KONDISI: SKIP (-) */
              "bg-slate-100 text-slate-400 border-slate-200": __props.getStatus(habit, day.dateString) === "skipped",
              /* KONDISI: KOSONG (BISA DIISI) */
              "bg-white border border-slate-200 hover:border-indigo-400": __props.getStatus(habit, day.dateString) === "empty" && !day.isFuture,
              /* KONDISI: MASA DEPAN (LOCKED) */
              "bg-slate-50 border-slate-50 opacity-30 cursor-not-allowed": day.isFuture,
              /* KONDISI: HARI INI (INDICATOR) */
              "ring-2 ring-indigo-600 ring-offset-2": day.isToday && __props.getStatus(habit, day.dateString) !== "completed"
            }, "scroll-mt-32 md:scroll-ml-72 w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg flex items-center justify-center relative outline-none transition-all duration-200 hover:scale-110 hover:z-20 active:scale-75 focus:ring-4 focus:ring-indigo-400 focus:z-30 focus:shadow-lg"])}" style="${ssrRenderStyle(__props.getStatus(habit, day.dateString) === "completed" ? { backgroundColor: habit.color } : {})}" data-v-793cf338>`);
            if (__props.getStatus(habit, day.dateString) === "completed") {
              _push(`<span class="text-[10px] md:text-xs font-black drop-shadow-sm animate-in zoom-in duration-300" data-v-793cf338> ✓ </span>`);
            } else {
              _push(`<!---->`);
            }
            if (__props.getStatus(habit, day.dateString) === "skipped") {
              _push(`<span class="text-[10px] md:text-xs font-bold animate-in fade-in duration-300" data-v-793cf338> - </span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</button></div>`);
          });
          _push(`<!--]--></div><div class="hidden md:flex sticky right-0 z-20 w-32 bg-white group-hover:bg-slate-50 transition-colors border-l border-slate-100 p-4 flex-col justify-center shadow-[-10px_0_20px_rgba(255,255,255,0.8)]" data-v-793cf338><div class="flex justify-between items-end mb-1" data-v-793cf338><span class="text-lg font-black text-slate-700" data-v-793cf338>${ssrInterpolate(habit.progress_count)}</span><span class="text-[10px] font-bold text-slate-400 mb-1" data-v-793cf338>${ssrInterpolate(Math.round(habit.progress_percent))}%</span></div><div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden" data-v-793cf338><div class="h-full rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: habit.progress_percent + "%", backgroundColor: habit.color })}" data-v-793cf338></div></div></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else {
        _push(`<div class="bg-white rounded-3xl p-8 md:p-12 text-center shadow-lg border border-slate-100 mt-6 mx-4 md:mx-0" data-v-793cf338><div class="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-3xl md:text-4xl mx-auto mb-4" data-v-793cf338>🌱</div><h3 class="text-lg md:text-xl font-bold text-slate-800" data-v-793cf338>${ssrInterpolate(_ctx.$t("habit_empty_title"))}</h3><p class="text-sm md:text-base text-slate-500 mb-6" data-v-793cf338>${ssrInterpolate(_ctx.$t("habit_empty_desc"))}</p><div class="flex flex-col md:flex-row items-center justify-center gap-4" data-v-793cf338><button class="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition transform hover:-translate-y-1" data-v-793cf338> + ${ssrInterpolate(_ctx.$t("habit_btn_new"))}</button>`);
        if (__props.hasPrevHabits) {
          _push(`<button class="px-6 py-3 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition" data-v-793cf338> 📂 ${ssrInterpolate(_ctx.$t("habit_salin_btn"))}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Habits/HabitGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HabitGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-793cf338"]]);
export {
  HabitGrid as default
};
