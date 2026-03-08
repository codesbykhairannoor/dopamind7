import { computed, ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { usePage } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "GoalDatePicker",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    show: Boolean
  },
  emits: ["update:modelValue", "close"],
  setup(__props, { emit: __emit }) {
    dayjs.extend(localeData);
    const props = __props;
    const page = usePage();
    const currentLocale = computed(() => {
      return page.props.locale || "id";
    });
    const weekDays = computed(() => {
      try {
        const instance = dayjs().locale(currentLocale.value);
        return instance.localeData().weekdaysShort();
      } catch (e) {
        return ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
      }
    });
    const currentMonth = ref(dayjs(props.modelValue || void 0));
    watch(() => props.modelValue, (newVal) => {
      if (newVal) currentMonth.value = dayjs(newVal);
    });
    const daysInMonth = computed(() => currentMonth.value.daysInMonth());
    const startDayOfWeek = computed(() => currentMonth.value.startOf("month").day());
    const formattedHeader = computed(() => {
      try {
        return currentMonth.value.locale(currentLocale.value).format("MMMM YYYY");
      } catch (e) {
        return currentMonth.value.format("MMMM YYYY");
      }
    });
    const isSelected = (day) => {
      if (!props.modelValue) return false;
      return props.modelValue === currentMonth.value.date(day).format("YYYY-MM-DD");
    };
    const isToday = (day) => {
      return dayjs().format("YYYY-MM-DD") === currentMonth.value.date(day).format("YYYY-MM-DD");
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-[300px] max-w-[95vw]" }, _attrs))} data-v-956a14eb><div class="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-slate-200/60 p-6 animate-in fade-in zoom-in-95 duration-200" data-v-956a14eb><div class="flex items-center justify-between mb-5 px-1" data-v-956a14eb><button class="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90" data-v-956a14eb><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-956a14eb><path d="m15 18-6-6 6-6" data-v-956a14eb></path></svg></button><div class="text-center" data-v-956a14eb><h4 class="font-black text-slate-800 capitalize tracking-tight text-base" data-v-956a14eb>${ssrInterpolate(formattedHeader.value)}</h4></div><button class="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90" data-v-956a14eb><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-956a14eb><path d="m9 18 6-6-6-6" data-v-956a14eb></path></svg></button></div><div class="grid grid-cols-7 mb-4 text-center" data-v-956a14eb><!--[-->`);
        ssrRenderList(weekDays.value, (dayName) => {
          _push(`<span class="text-[10px] font-black text-slate-400 uppercase tracking-widest" data-v-956a14eb>${ssrInterpolate(dayName.slice(0, 3))}</span>`);
        });
        _push(`<!--]--></div><div class="grid grid-cols-7 gap-2" data-v-956a14eb><!--[-->`);
        ssrRenderList(startDayOfWeek.value, (n) => {
          _push(`<div class="h-9 w-9" data-v-956a14eb></div>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(daysInMonth.value, (day) => {
          _push(`<button class="${ssrRenderClass([[
            isSelected(day) ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105 z-10" : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600",
            isToday(day) && !isSelected(day) ? "text-indigo-600 ring-1 ring-indigo-100" : ""
          ], "h-9 w-9 flex items-center justify-center rounded-2xl text-sm font-bold transition-all relative group"])}" data-v-956a14eb>${ssrInterpolate(day)} `);
          if (isToday(day)) {
            _push(`<span class="${ssrRenderClass([isSelected(day) ? "bg-white" : "bg-indigo-500", "absolute bottom-1 w-1 h-1 rounded-full"])}" data-v-956a14eb></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div><div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between px-1" data-v-956a14eb><button class="text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all" data-v-956a14eb>${ssrInterpolate(_ctx.$t("datepicker_today"))}</button><button class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-all" data-v-956a14eb>${ssrInterpolate(_ctx.$t("btn_cancel"))}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/GoalDatePicker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GoalDatePicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-956a14eb"]]);
export {
  GoalDatePicker as default
};
