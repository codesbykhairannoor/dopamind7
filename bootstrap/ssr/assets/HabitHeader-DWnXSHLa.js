import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import dayjs from "dayjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "HabitHeader",
  __ssrInlineRender: true,
  props: {
    user: Object,
    greetingKey: String,
    todayDate: String,
    currentMonth: String,
    currentMonthValue: String,
    todayProgress: [Number, String],
    changeMonth: Function,
    openCreateModal: Function
  },
  setup(__props) {
    const props = __props;
    const isOpen = ref(false);
    const showHint = ref(true);
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];
    const activeYear = computed(
      () => props.currentMonthValue ? dayjs(props.currentMonthValue).year() : dayjs().year()
    );
    const activeMonthNum = computed(
      () => props.currentMonthValue ? dayjs(props.currentMonthValue).month() : dayjs().month()
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white/80 backdrop-blur-xl border-b border-slate-100 md:sticky top-0 z-40 transition-all" }, _attrs))} data-v-65b12d59><div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4" data-v-65b12d59><div class="flex flex-col md:flex-row justify-between items-center gap-6" data-v-65b12d59><div class="flex items-center gap-4 w-full md:w-auto" data-v-65b12d59><div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg shadow-indigo-200 shrink-0" data-v-65b12d59> ✨ </div><div data-v-65b12d59><div class="flex items-center gap-2 mb-0.5" data-v-65b12d59><span class="relative flex h-2 w-2" data-v-65b12d59><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" data-v-65b12d59></span><span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" data-v-65b12d59></span></span><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-65b12d59>${ssrInterpolate(__props.todayDate)}</span></div><h1 class="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none" data-v-65b12d59>${ssrInterpolate(_ctx.$t(__props.greetingKey))}, <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600" data-v-65b12d59>${ssrInterpolate(__props.user.name.split(" ")[0])}</span>! </h1></div></div><div class="flex items-center gap-3 w-full md:w-auto" data-v-65b12d59><div class="relative flex-1 md:flex-none" data-v-65b12d59><button class="w-full flex items-center justify-between gap-4 bg-slate-50 border border-slate-200 pl-4 pr-3 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition-all active:scale-95" data-v-65b12d59><div class="flex flex-col items-start leading-none" data-v-65b12d59><span class="text-[9px] text-slate-400 uppercase tracking-tighter mb-0.5" data-v-65b12d59>${ssrInterpolate(_ctx.$t("label_period"))}</span><span class="text-xs uppercase tracking-wide" data-v-65b12d59>${ssrInterpolate(__props.currentMonth)}</span></div><div class="bg-white p-1 rounded-lg border border-slate-100 shadow-sm" data-v-65b12d59><svg class="${ssrRenderClass([{ "rotate-180": isOpen.value }, "w-3 h-3 text-indigo-500 transition-transform duration-300"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-65b12d59><path d="M19 9l-7 7-7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-65b12d59></path></svg></div></button>`);
      if (isOpen.value) {
        _push(`<div class="absolute right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100 p-4 z-50" data-v-65b12d59><div class="flex items-center justify-between mb-4 px-2" data-v-65b12d59><button class="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition" data-v-65b12d59><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-65b12d59><path d="M15 19l-7-7 7-7" stroke-width="3" data-v-65b12d59></path></svg></button><span class="text-lg font-black text-slate-800 tracking-tighter" data-v-65b12d59>${ssrInterpolate(activeYear.value)}</span><button class="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition" data-v-65b12d59><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-65b12d59><path d="M9 5l7 7-7 7" stroke-width="3" data-v-65b12d59></path></svg></button></div><div class="grid grid-cols-3 gap-2" data-v-65b12d59><!--[-->`);
        ssrRenderList(months, (month, index) => {
          _push(`<button class="${ssrRenderClass([
            "py-3 rounded-2xl text-[10px] font-black transition-all uppercase tracking-widest",
            activeMonthNum.value === index ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "hover:bg-indigo-50 text-slate-500 hover:text-indigo-600"
          ])}" data-v-65b12d59>${ssrInterpolate(month.slice(0, 3))}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden lg:flex items-center gap-3 px-4 border-x border-slate-100/80" data-v-65b12d59><div class="text-right" data-v-65b12d59><p class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1" data-v-65b12d59>${ssrInterpolate(_ctx.$t("label_daily"))}</p><p class="text-lg font-black text-slate-700 leading-none" data-v-65b12d59>${ssrInterpolate(__props.todayProgress)}%</p></div><div class="relative w-10 h-10" data-v-65b12d59><svg class="w-full h-full -rotate-90" viewBox="0 0 36 36" data-v-65b12d59><circle cx="18" cy="18" r="16" fill="none" class="stroke-slate-100" stroke-width="4" data-v-65b12d59></circle><circle cx="18" cy="18" r="16" fill="none" class="stroke-indigo-600 transition-all duration-1000" stroke-width="4" stroke-linecap="round" style="${ssrRenderStyle({ strokeDasharray: `${__props.todayProgress}, 100` })}" data-v-65b12d59></circle></svg></div></div><button class="h-[46px] px-5 flex items-center gap-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-indigo-200 transition-all duration-300" data-v-65b12d59><div class="bg-white/20 rounded-lg p-0.5" data-v-65b12d59><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-65b12d59><path d="M12 4v16m8-8H4" stroke-width="3" stroke-linecap="round" data-v-65b12d59></path></svg></div><span class="hidden md:inline uppercase text-xs tracking-widest" data-v-65b12d59>${ssrInterpolate(_ctx.$t("btn_add_habit"))}</span></button></div></div>`);
      if (showHint.value) {
        _push(`<div class="flex items-center justify-between mt-4 p-2 bg-indigo-50/50 rounded-xl border border-indigo-100/50" data-v-65b12d59><div class="flex items-center gap-6 px-2 overflow-x-auto no-scrollbar" data-v-65b12d59><div class="flex items-center gap-2 shrink-0" data-v-65b12d59><span class="flex items-center justify-center w-5 h-5 bg-indigo-600 text-white text-[8px] rounded-md font-bold shadow-sm md:hidden" data-v-65b12d59>TAP</span><span class="hidden md:flex items-center justify-center w-5 h-5 bg-indigo-600 text-white text-[8px] rounded-md font-bold shadow-sm" data-v-65b12d59>L</span><span class="text-[10px] font-bold text-indigo-900/60 uppercase tracking-tight" data-v-65b12d59><span class="md:hidden" data-v-65b12d59>${ssrInterpolate(_ctx.$t("hint_tap_done"))}</span><span class="hidden md:inline" data-v-65b12d59>${ssrInterpolate(_ctx.$t("hint_click_done"))}</span></span></div><div class="flex items-center gap-2 shrink-0 border-l border-indigo-200/50 pl-6" data-v-65b12d59><span class="flex items-center justify-center w-5 h-5 bg-white text-slate-400 text-[8px] rounded-md font-bold border border-slate-200 shadow-sm md:hidden" data-v-65b12d59>HOLD</span><span class="hidden md:flex items-center justify-center w-5 h-5 bg-white text-slate-400 text-[8px] rounded-md font-bold border border-slate-200 shadow-sm" data-v-65b12d59>R</span><span class="text-[10px] font-bold text-indigo-900/60 uppercase tracking-tight" data-v-65b12d59><span class="md:hidden" data-v-65b12d59>${ssrInterpolate(_ctx.$t("hint_hold_skip"))}</span><span class="hidden md:inline" data-v-65b12d59>${ssrInterpolate(_ctx.$t("hint_click_skip"))}</span></span></div></div><button class="p-1 hover:bg-indigo-100 rounded-lg text-indigo-400 transition" data-v-65b12d59><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-65b12d59><path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" data-v-65b12d59></path></svg></button></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Habits/HabitHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HabitHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-65b12d59"]]);
export {
  HabitHeader as default
};
