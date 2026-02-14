import { computed, ref, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { u as useFinanceFormat } from "./useFinanceFormat-DRbxJZsx.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "FinanceDatePicker",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    transactions: {
      // Menerima data transaksi
      type: Array,
      default: () => []
    },
    show: Boolean,
    close: Function
  },
  emits: ["update:modelValue", "close"],
  setup(__props, { emit: __emit }) {
    dayjs.extend(localeData);
    const props = __props;
    const { appLocale, formatMoney } = useFinanceFormat();
    const currentLocale = computed(() => {
      if (!appLocale || !appLocale.value) return "id";
      return appLocale.value.split("-")[0];
    });
    const dailyMap = computed(() => {
      const map = {};
      props.transactions.forEach((trx) => {
        const dateKey = dayjs(trx.date).format("YYYY-MM-DD");
        if (!map[dateKey]) {
          map[dateKey] = { income: 0, expense: 0, net: 0, count: 0 };
        }
        const amount = Number(trx.amount);
        if (trx.type === "income") {
          map[dateKey].income += amount;
          map[dateKey].net += amount;
        } else {
          map[dateKey].expense += amount;
          map[dateKey].net -= amount;
        }
        map[dateKey].count++;
      });
      return map;
    });
    const getDayStats = (day) => {
      const dateStr = currentMonth.value.date(day).format("YYYY-MM-DD");
      return dailyMap.value[dateStr];
    };
    const weekDays = computed(() => {
      try {
        const instance = dayjs().locale(currentLocale.value);
        if (typeof instance.localeData !== "function") return ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full sm:w-[320px]" }, _attrs))}><div class="fixed inset-0 z-40"></div><div class="relative z-50 bg-white rounded-3xl shadow-xl border border-slate-100 p-5 animate-in fade-in zoom-in-95 duration-200"><div class="flex items-center justify-between mb-4"><button class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">◀</button><h4 class="font-bold text-slate-700 capitalize">${ssrInterpolate(formattedHeader.value)}</h4><button class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition">▶</button></div><div class="grid grid-cols-7 mb-2 text-center"><!--[-->`);
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
          ], "h-9 w-9 rounded-xl flex flex-col items-center justify-center transition-all relative group"])}"${ssrRenderAttr("title", getDayStats(day) ? `${unref(formatMoney)(getDayStats(day).net)} (${getDayStats(day).count} Trx)` : "Tidak ada transaksi")}><span class="text-sm font-bold leading-none">${ssrInterpolate(day)}</span>`);
          if (getDayStats(day)) {
            _push(`<div class="mt-1 flex gap-0.5">`);
            if (getDayStats(day).net > 0) {
              _push(`<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm"></span>`);
            } else if (getDayStats(day).net < 0) {
              _push(`<span class="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-sm"></span>`);
            } else {
              _push(`<span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span>`);
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
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/FinanceDatePicker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
