import { ref, computed, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { usePage } from "@inertiajs/vue3";
import { u as useClickOutside } from "./useJobUI-ByDCvN_C.js";
const _sfc_main = {
  __name: "JobDatePicker",
  __ssrInlineRender: true,
  props: { modelValue: String },
  emits: ["update:modelValue", "save"],
  setup(__props, { emit: __emit }) {
    dayjs.extend(localeData);
    const props = __props;
    const isOpen = ref(false);
    const containerRef = useClickOutside(() => {
      isOpen.value = false;
    });
    const appLocale = computed(() => usePage().props.locale || "id");
    const currentLocale = computed(() => appLocale.value.split("-")[0]);
    const currentMonth = ref(dayjs(props.modelValue || void 0));
    watch(() => props.modelValue, (newVal) => {
      if (newVal) currentMonth.value = dayjs(newVal);
    });
    const weekDays = computed(() => {
      try {
        return dayjs().locale(currentLocale.value).localeData().weekdaysShort();
      } catch (e) {
        return ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
      }
    });
    const daysInMonth = computed(() => currentMonth.value.daysInMonth());
    const startDayOfWeek = computed(() => currentMonth.value.startOf("month").day());
    const formattedHeader = computed(() => currentMonth.value.locale(currentLocale.value).format("MMMM YYYY"));
    const displayDate = computed(() => props.modelValue ? dayjs(props.modelValue).locale(currentLocale.value).format("DD MMM YYYY") : "-");
    const isSelected = (day) => props.modelValue === currentMonth.value.date(day).format("YYYY-MM-DD");
    const isToday = (day) => dayjs().format("YYYY-MM-DD") === currentMonth.value.date(day).format("YYYY-MM-DD");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative w-full h-full flex items-center px-4 cursor-pointer hover:bg-slate-50 transition-colors",
        ref_key: "containerRef",
        ref: containerRef
      }, _attrs))}><span class="text-slate-600 font-medium text-sm flex items-center gap-2"><svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> ${ssrInterpolate(displayDate.value)}</span>`);
      if (isOpen.value) {
        _push(`<div class="absolute top-full left-0 mt-2 w-[280px] bg-white rounded-3xl shadow-xl border border-slate-100 p-5 z-50"><div class="flex items-center justify-between mb-4"><button class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">◀</button><h4 class="font-bold text-slate-700 capitalize text-sm">${ssrInterpolate(formattedHeader.value)}</h4><button class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">▶</button></div><div class="grid grid-cols-7 mb-2 text-center"><!--[-->`);
        ssrRenderList(weekDays.value, (dayName) => {
          _push(`<span class="text-[10px] font-bold text-slate-400 uppercase">${ssrInterpolate(dayName)}</span>`);
        });
        _push(`<!--]--></div><div class="grid grid-cols-7 gap-1"><!--[-->`);
        ssrRenderList(startDayOfWeek.value, (n) => {
          _push(`<div></div>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(daysInMonth.value, (day) => {
          _push(`<button class="${ssrRenderClass([isSelected(day) ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600", "h-8 w-8 rounded-xl flex items-center justify-center transition-all text-sm font-bold relative"])}">${ssrInterpolate(day)} `);
          if (isToday(day) && !isSelected(day)) {
            _push(`<span class="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Job/JobDatePicker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
