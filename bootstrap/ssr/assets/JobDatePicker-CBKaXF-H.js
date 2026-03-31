import { ref, computed, watch, resolveComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
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
      const _component_OneForMindIcon = resolveComponent("OneForMindIcon");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative w-full h-full flex items-center px-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
        ref_key: "containerRef",
        ref: containerRef
      }, _attrs))}><span class="text-slate-600 dark:text-slate-300 font-bold text-sm flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_OneForMindIcon, {
        name: "calendar",
        size: "14",
        class: "text-slate-400 dark:text-slate-500"
      }, null, _parent));
      _push(` ${ssrInterpolate(displayDate.value)}</span>`);
      if (isOpen.value) {
        _push(`<div class="fixed sm:absolute top-1/2 sm:top-full left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 sm:translate-y-0 mt-0 sm:mt-2 w-[280px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 p-5 z-[100]"><div class="sm:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm -z-10"></div><div class="flex items-center justify-between mb-4"><button class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 transition">◀</button><h4 class="font-bold text-slate-700 dark:text-slate-200 capitalize text-sm">${ssrInterpolate(formattedHeader.value)}</h4><button class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 transition">▶</button></div><div class="grid grid-cols-7 mb-2 text-center"><!--[-->`);
        ssrRenderList(weekDays.value, (dayName) => {
          _push(`<span class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase">${ssrInterpolate(dayName)}</span>`);
        });
        _push(`<!--]--></div><div class="grid grid-cols-7 gap-1"><!--[-->`);
        ssrRenderList(startDayOfWeek.value, (n) => {
          _push(`<div></div>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(daysInMonth.value, (day) => {
          _push(`<button class="${ssrRenderClass([isSelected(day) ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400", "h-8 w-8 rounded-xl flex items-center justify-center transition-all text-sm font-bold relative"])}">${ssrInterpolate(day)} `);
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
