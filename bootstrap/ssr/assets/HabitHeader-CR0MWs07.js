import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import dayjs from "dayjs";
import "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BvGLCgx4.js";
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
    openCreateModal: Function,
    isExplorer: Boolean,
    habitsCount: Number
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-50 transition-all bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-500" }, _attrs))} data-v-34934c4a><div class="max-w-7xl px-4 md:px-8 py-4 mx-auto" data-v-34934c4a><div class="flex flex-col items-center justify-between gap-4 md:flex-row" data-v-34934c4a><div class="flex items-center gap-2 w-full md:w-auto" data-v-34934c4a><p class="text-[10px] font-black capitalize tracking-wide text-slate-400 dark:text-slate-600 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4" data-v-34934c4a>${ssrInterpolate(_ctx.$t("habit_page_title", "Habit Tracker"))}</p><div class="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50" data-v-34934c4a>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "calendar",
        size: "14",
        class: "text-indigo-500"
      }, null, _parent));
      _push(`<span class="text-[11px] font-bold text-slate-600 dark:text-slate-300" data-v-34934c4a>${ssrInterpolate(__props.todayDate)}</span></div></div><div class="flex items-center w-full gap-3 md:w-auto" data-v-34934c4a><div class="relative flex-1 md:flex-none" data-v-34934c4a><button class="w-full flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-4 pr-3 py-2.5 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-sm transition-all active:scale-95" data-v-34934c4a><div class="flex flex-col items-start leading-none" data-v-34934c4a><span class="text-[9px] text-slate-400 dark:text-slate-500 mb-0.5" data-v-34934c4a>${ssrInterpolate(_ctx.$t("label_period"))}</span><span class="text-xs" data-v-34934c4a>${ssrInterpolate(__props.currentMonth)}</span></div><div class="p-1 bg-white dark:bg-slate-800 border shadow-sm rounded-lg border-slate-100 dark:border-slate-700 flex items-center justify-center" data-v-34934c4a>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "chevron-down",
        size: "12",
        "stroke-width": "3",
        class: ["text-indigo-500 transition-transform duration-300", { "rotate-180": isOpen.value }]
      }, null, _parent));
      _push(`</div></button>`);
      if (isOpen.value) {
        _push(`<div class="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 p-4 z-[60] origin-top-right" data-v-34934c4a><div class="fixed inset-0 z-[-1]" data-v-34934c4a></div><div class="relative z-10" data-v-34934c4a><div class="flex items-center justify-between px-2 mb-4" data-v-34934c4a><button class="p-2 transition rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400" data-v-34934c4a>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "chevron-left",
          size: "16",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button><span class="text-lg font-black tracking-tighter text-slate-800 dark:text-slate-100" data-v-34934c4a>${ssrInterpolate(activeYear.value)}</span><button class="p-2 transition rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400" data-v-34934c4a>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "chevron-right",
          size: "16",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button></div><div class="grid grid-cols-3 gap-2" data-v-34934c4a><!--[-->`);
        ssrRenderList(months, (month, index) => {
          _push(`<button class="${ssrRenderClass([
            "py-3 rounded-2xl text-[10px] font-black transition-all",
            activeMonthNum.value === index ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none" : "hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          ])}" data-v-34934c4a>${ssrInterpolate(month.slice(0, 3))}</button>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.isExplorer) {
        _push(`<div class="hidden lg:flex flex-col items-end gap-1 px-4 border-l border-slate-100/80 dark:border-slate-800/80" data-v-34934c4a><div class="flex items-center gap-2" data-v-34934c4a><span class="text-[9px] font-black capitalize tracking-wide text-slate-400" data-v-34934c4a>${ssrInterpolate(_ctx.$t("label_usage_limit", "Limit"))}</span><span class="${ssrRenderClass([__props.habitsCount >= 5 ? "text-rose-500" : "text-slate-700 dark:text-slate-300", "text-[10px] font-black"])}" data-v-34934c4a>${ssrInterpolate(__props.habitsCount)}/5</span></div><div class="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden" data-v-34934c4a><div class="${ssrRenderClass([__props.habitsCount >= 5 ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]" : "bg-indigo-600", "h-full transition-all duration-500"])}" style="${ssrRenderStyle({ width: Math.min(__props.habitsCount, 5) / 5 * 100 + "%" })}" data-v-34934c4a></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="hidden lg:flex items-center gap-3 px-4 border-l border-slate-100/80 dark:border-slate-800/80" data-v-34934c4a><div class="text-right" data-v-34934c4a><p class="text-[9px] font-black text-slate-400 dark:text-slate-500 leading-none mb-1 capitalize" data-v-34934c4a>${ssrInterpolate(_ctx.$t("label_daily"))}</p><p class="text-lg font-black text-slate-700 dark:text-slate-200 leading-none" data-v-34934c4a>${ssrInterpolate(__props.todayProgress)}%</p></div><div class="relative w-10 h-10" data-v-34934c4a><svg class="w-full h-full -rotate-90" viewBox="0 0 36 36" data-v-34934c4a><circle cx="18" cy="18" r="16" fill="none" class="stroke-slate-100 dark:stroke-slate-800" stroke-width="4" data-v-34934c4a></circle><circle cx="18" cy="18" r="16" fill="none" class="stroke-indigo-600 transition-all duration-1000" stroke-width="4" stroke-linecap="round" style="${ssrRenderStyle({ strokeDasharray: `${__props.todayProgress}, 100` })}" data-v-34934c4a></circle></svg></div></div><button class="${ssrRenderClass([__props.isExplorer && __props.habitsCount >= 5 ? "bg-gradient-to-r from-rose-500 to-rose-600 shadow-rose-200 dark:shadow-rose-900/20" : "bg-indigo-600 shadow-indigo-100 dark:shadow-indigo-900/40 hover:bg-indigo-700", "h-[46px] px-5 flex items-center gap-3 text-white rounded-xl font-bold hover:-translate-y-0.5 active:translate-y-0 shadow-lg transition-all duration-300 whitespace-nowrap"])}" data-v-34934c4a><div class="bg-white/20 rounded-lg p-0.5 flex items-center justify-center" data-v-34934c4a>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: __props.isExplorer && __props.habitsCount >= 5 ? "premium" : "plus",
        size: "16",
        "stroke-width": "3"
      }, null, _parent));
      _push(`</div><span class="hidden md:inline text-xs capitalize tracking-wide font-black" data-v-34934c4a>${ssrInterpolate(__props.isExplorer && __props.habitsCount >= 5 ? _ctx.$t("btn_upgrade_limit", "Upgrade Limit") : _ctx.$t("btn_add_habit"))}</span></button></div></div>`);
      if (__props.isExplorer && __props.habitsCount >= 5) {
        _push(`<div class="mt-4 p-3 bg-rose-50 dark:bg-rose-550/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl flex items-center justify-between text-[10px] md:text-xs" data-v-34934c4a><div class="flex items-center gap-3" data-v-34934c4a><span class="text-xl" data-v-34934c4a>⚠️</span><p class="font-bold text-rose-600 dark:text-rose-400" data-v-34934c4a>${ssrInterpolate(_ctx.$t("habit_limit_reached", "Anda telah mencapai batas 5 habit untuk akun Explorer."))}</p></div><button class="bg-indigo-600 text-white px-4 py-1.5 rounded-lg font-black capitalize tracking-wide text-[9px] hover:bg-indigo-700 transition" data-v-34934c4a>Upgrade</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showHint.value) {
        _push(`<div class="flex items-center justify-between mt-4 p-2 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100/50 dark:border-indigo-500/20" data-v-34934c4a><div class="flex items-center gap-6 px-2 overflow-x-auto no-scrollbar" data-v-34934c4a><div class="flex items-center gap-2 shrink-0" data-v-34934c4a><span class="flex items-center justify-center w-5 h-5 bg-indigo-600 text-white text-[8px] rounded-md font-bold shadow-sm md:hidden px-1" data-v-34934c4a>Tap</span><span class="hidden md:flex items-center justify-center w-5 h-5 bg-indigo-600 text-white text-[8px] rounded-md font-bold shadow-sm" data-v-34934c4a>L</span><span class="text-[10px] font-bold text-indigo-900/60 dark:text-indigo-400 capitalize tracking-tight" data-v-34934c4a><span class="md:hidden" data-v-34934c4a>${ssrInterpolate(_ctx.$t("hint_tap_done"))}</span><span class="hidden md:inline" data-v-34934c4a>${ssrInterpolate(_ctx.$t("hint_click_done"))}</span></span></div><div class="flex items-center gap-2 shrink-0 border-l border-indigo-200/50 dark:border-indigo-800 pl-6" data-v-34934c4a><span class="flex items-center justify-center px-1 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[8px] rounded-md font-bold border border-slate-200 dark:border-slate-700 shadow-sm md:hidden" data-v-34934c4a>Hold</span><span class="hidden md:flex items-center justify-center w-5 h-5 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[8px] rounded-md font-bold border border-slate-200 dark:border-slate-700 shadow-sm" data-v-34934c4a>R</span><span class="text-[10px] font-bold text-indigo-900/60 dark:text-indigo-400 capitalize tracking-tight" data-v-34934c4a><span class="md:hidden" data-v-34934c4a>${ssrInterpolate(_ctx.$t("hint_hold_skip"))}</span><span class="hidden md:inline" data-v-34934c4a>${ssrInterpolate(_ctx.$t("hint_click_skip"))}</span></span></div></div><button class="p-1 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg text-indigo-400 transition flex items-center justify-center" data-v-34934c4a>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "x",
          size: "14",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button></div>`);
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
const HabitHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-34934c4a"]]);
export {
  HabitHeader as default
};
