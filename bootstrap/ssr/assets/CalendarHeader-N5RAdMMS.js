import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { usePage } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CalendarHeader",
  __ssrInlineRender: true,
  props: {
    currentMonth: String
  },
  emits: ["change-month", "add-event"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const page = usePage();
    const isOpen = ref(false);
    const monthsList = [
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
    const displayMonth = computed(() => {
      const currentLocale = page.props.locale || "id";
      return dayjs(props.currentMonth).locale(currentLocale).format("MMMM YYYY");
    });
    const activeYear = computed(() => dayjs(props.currentMonth).year());
    const activeMonthNum = computed(() => dayjs(props.currentMonth).month());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-[60] transition-all bg-white/80 backdrop-blur-xl border-b shadow-sm border-slate-200 md:sticky md:top-0" }, _attrs))} data-v-563e14b2><div class="max-w-full px-4 py-4 mx-auto sm:px-6 lg:px-8" data-v-563e14b2><div class="flex flex-col items-center justify-between w-full gap-4 md:flex-row" data-v-563e14b2><div class="flex items-center w-full gap-4 md:w-auto" data-v-563e14b2><div class="flex items-center justify-center text-2xl text-white shadow-lg w-12 h-12 bg-indigo-600 rounded-xl shadow-indigo-200 shrink-0" data-v-563e14b2> 🗓️ </div><div data-v-563e14b2><h2 class="text-xl font-black leading-tight tracking-tight text-slate-800" data-v-563e14b2>${ssrInterpolate(_ctx.$t("calendar_title", "Master Calendar"))}</h2><p class="mt-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-563e14b2>${ssrInterpolate(_ctx.$t("calendar_subtitle", "Your bird-eye view"))}</p></div></div><div class="flex items-center w-full gap-3 md:w-auto" data-v-563e14b2><div class="relative flex-1 md:flex-none" data-v-563e14b2><button class="w-full flex items-center justify-between gap-4 bg-slate-50 border border-slate-200 pl-4 pr-3 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition-all active:scale-95" data-v-563e14b2><div class="flex flex-col items-start leading-none" data-v-563e14b2><span class="text-[9px] text-slate-400 uppercase tracking-tighter mb-0.5" data-v-563e14b2>${ssrInterpolate(_ctx.$t("label_period", "Periode"))}</span><span class="text-xs uppercase tracking-wide whitespace-nowrap" data-v-563e14b2>${ssrInterpolate(displayMonth.value)}</span></div><div class="p-1 bg-white border shadow-sm rounded-lg border-slate-100" data-v-563e14b2><svg class="${ssrRenderClass([{ "rotate-180": isOpen.value }, "w-3 h-3 text-indigo-500 transition-transform duration-300"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-563e14b2><path d="M19 9l-7 7-7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-563e14b2></path></svg></div></button>`);
      if (isOpen.value) {
        _push(`<div class="absolute right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-[60] origin-top-right" data-v-563e14b2><div class="fixed inset-0 z-[-1]" data-v-563e14b2></div><div class="relative z-10" data-v-563e14b2><div class="flex items-center justify-between px-2 mb-4 bg-slate-50 rounded-2xl py-1" data-v-563e14b2><button class="p-2 transition rounded-xl hover:bg-white text-slate-400 hover:text-indigo-600 shadow-sm" data-v-563e14b2><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-563e14b2><path d="M15 19l-7-7 7-7" stroke-width="3" data-v-563e14b2></path></svg></button><span class="text-lg font-black tracking-tighter text-slate-800" data-v-563e14b2>${ssrInterpolate(activeYear.value)}</span><button class="p-2 transition rounded-xl hover:bg-white text-slate-400 hover:text-indigo-600 shadow-sm" data-v-563e14b2><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-563e14b2><path d="M9 5l7 7-7 7" stroke-width="3" data-v-563e14b2></path></svg></button></div><div class="grid grid-cols-3 gap-2" data-v-563e14b2><!--[-->`);
        ssrRenderList(monthsList, (month, index) => {
          _push(`<button class="${ssrRenderClass([
            "py-3 rounded-2xl text-[10px] font-black transition-all uppercase tracking-widest",
            activeMonthNum.value === index ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "hover:bg-indigo-50 text-slate-500 hover:text-indigo-600"
          ])}" data-v-563e14b2>${ssrInterpolate(month.slice(0, 3))}</button>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="h-[46px] px-5 flex items-center gap-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-indigo-200 transition-all duration-300 shrink-0" data-v-563e14b2><div class="bg-white/20 rounded-lg p-0.5" data-v-563e14b2><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-563e14b2><path d="M12 4v16m8-8H4" stroke-width="3" stroke-linecap="round" data-v-563e14b2></path></svg></div><span class="hidden md:inline uppercase text-xs tracking-widest" data-v-563e14b2>${ssrInterpolate(_ctx.$t("btn_add_event", "Acara"))}</span></button></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Calendar/CalendarHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CalendarHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-563e14b2"]]);
export {
  CalendarHeader as default
};
