import { computed, ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "PlannerDatePicker",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    tasks: { type: Array, default: () => [] },
    show: Boolean
  },
  emits: ["update:modelValue", "close"],
  setup(__props, { emit: __emit }) {
    dayjs.extend(localeData);
    const props = __props;
    const appLocale = computed(() => usePage().props.locale || "id");
    const currentLocale = computed(() => appLocale.value.split("-")[0]);
    const activityMap = computed(() => {
      const map = {};
      props.tasks.forEach((task) => {
        const dateKey = dayjs(task.date).format("YYYY-MM-DD");
        if (!map[dateKey]) map[dateKey] = { total: 0, completed: 0 };
        map[dateKey].total++;
        if (task.is_completed) map[dateKey].completed++;
      });
      return map;
    });
    const getDayActivity = (day) => activityMap.value[currentMonth.value.date(day).format("YYYY-MM-DD")];
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
    const formattedHeader = computed(() => currentMonth.value.locale(currentLocale.value).format("MMMM YYYY"));
    const isSelected = (day) => props.modelValue === currentMonth.value.date(day).format("YYYY-MM-DD");
    const isToday = (day) => dayjs().format("YYYY-MM-DD") === currentMonth.value.date(day).format("YYYY-MM-DD");
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-[280px] sm:w-[320px]" }, _attrs))}><div class="fixed inset-0 z-40"></div><div class="relative z-50 bg-white rounded-3xl shadow-xl border border-slate-100 p-5"><div class="flex items-center justify-between mb-4"><button class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">◀</button><h4 class="font-bold text-slate-700 capitalize text-sm">${ssrInterpolate(formattedHeader.value)}</h4><button class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">▶</button></div><div class="grid grid-cols-7 mb-2 text-center"><!--[-->`);
        ssrRenderList(weekDays.value, (dayName) => {
          _push(`<span class="text-[10px] font-bold text-slate-400 uppercase">${ssrInterpolate(dayName)}</span>`);
        });
        _push(`<!--]--></div><div class="grid grid-cols-7 gap-1"><!--[-->`);
        ssrRenderList(startDayOfWeek.value, (n) => {
          _push(`<div></div>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(daysInMonth.value, (day) => {
          _push(`<button class="${ssrRenderClass([[
            isSelected(day) ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600",
            isToday(day) && !isSelected(day) ? "ring-1 ring-indigo-200 bg-indigo-50/50" : ""
          ], "h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex flex-col items-center justify-center transition-all relative group"])}"><span class="text-xs sm:text-sm font-bold leading-none">${ssrInterpolate(day)}</span>`);
          if (getDayActivity(day)) {
            _push(`<div class="mt-1 flex gap-0.5">`);
            if (getDayActivity(day).completed < getDayActivity(day).total) {
              _push(`<span class="${ssrRenderClass([isSelected(day) ? "bg-indigo-200" : "", "w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-sm"])}"></span>`);
            } else {
              _push(`<span class="${ssrRenderClass([isSelected(day) ? "bg-emerald-200" : "", "w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm"])}"></span>`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (isToday(day) && !isSelected(day)) {
            _push(`<span class="absolute -top-1 -right-1 flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div><div class="mt-4 pt-3 border-t border-slate-50 text-center"><button class="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition">Ke Hari Ini</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Planner/PlannerDatePicker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
