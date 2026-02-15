import { computed, ref, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Line } from "vue-chartjs";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import dayjs from "dayjs";
import { u as useFinanceFormat } from "./useFinanceFormat-CRSb1fg_.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
function useFinanceChart(props) {
  const { formatMoney } = useFinanceFormat();
  const t = (key, fallback) => {
    if (typeof window.trans === "function") {
      const result = window.trans(key);
      return result !== key ? result : fallback;
    }
    return fallback;
  };
  const chartData = computed(() => {
    if (!props.currentDate) return { labels: [], datasets: [] };
    const daysInMonth = dayjs(props.currentDate).daysInMonth();
    const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const incomeData = new Array(daysInMonth).fill(0);
    const expenseData = new Array(daysInMonth).fill(0);
    props.transactions.forEach((t2) => {
      const dayIndex = dayjs(t2.date).date() - 1;
      if (t2.type === "income") {
        incomeData[dayIndex] += Number(t2.amount);
      } else {
        expenseData[dayIndex] += Number(t2.amount);
      }
    });
    return {
      labels,
      datasets: [
        {
          // Pakai helper t() biar aman & i18n support
          label: t("income", "Income"),
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          borderColor: "#10b981",
          data: incomeData,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6
        },
        {
          // Pakai helper t() biar aman & i18n support
          label: t("expense", "Expense"),
          backgroundColor: "rgba(244, 63, 94, 0.1)",
          borderColor: "#f43f5e",
          data: expenseData,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6
        }
      ]
    };
  });
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: { usePointStyle: true, boxWidth: 8 }
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          // FORMAT UANG DINAMIS ($ / Rp)
          label: (context) => ` ${context.dataset.label}: ${formatMoney(context.raw)}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#f1f5f9", borderDash: [5, 5] },
        // Format angka sumbu Y (misal 10k, 20k)
        ticks: { callback: (val) => val / 1e3 + "k" }
      },
      x: { grid: { display: false } }
    },
    interaction: { mode: "nearest", axis: "x", intersect: false }
  };
  return { chartData, chartOptions };
}
const _sfc_main = {
  __name: "DailyTrendChart",
  __ssrInlineRender: true,
  props: {
    transactions: Array,
    currentDate: String
  },
  setup(__props) {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
    const props = __props;
    const isMounted = ref(false);
    const { chartData, chartOptions } = useFinanceChart(props);
    onMounted(() => {
      isMounted.value = true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 w-full mt-8" }, _attrs))} data-v-6de8d020><div class="flex justify-between items-center mb-6 px-2" data-v-6de8d020><div data-v-6de8d020><h3 class="font-black text-slate-800 text-sm uppercase tracking-wider" data-v-6de8d020>${ssrInterpolate(_ctx.$t("finance_trend"))}</h3><p class="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1" data-v-6de8d020>${ssrInterpolate(_ctx.$t("daily_chart"))}</p></div><div class="flex items-center gap-1.5" data-v-6de8d020><span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" data-v-6de8d020></span><span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest" data-v-6de8d020>Live</span></div></div><div class="relative h-[300px] w-full" data-v-6de8d020>`);
      if (isMounted.value) {
        _push(ssrRenderComponent(unref(Line), {
          data: unref(chartData),
          options: unref(chartOptions)
        }, null, _parent));
      } else {
        _push(`<div class="absolute inset-0 w-full h-full bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 animate-pulse" data-v-6de8d020><div class="flex gap-2 items-end h-32" data-v-6de8d020><div class="w-4 bg-slate-200 h-10 rounded-t-sm" data-v-6de8d020></div><div class="w-4 bg-slate-200 h-20 rounded-t-sm" data-v-6de8d020></div><div class="w-4 bg-slate-200 h-16 rounded-t-sm" data-v-6de8d020></div><div class="w-4 bg-slate-200 h-24 rounded-t-sm" data-v-6de8d020></div><div class="w-4 bg-slate-200 h-12 rounded-t-sm" data-v-6de8d020></div></div><span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]" data-v-6de8d020>Preparing Analytics...</span></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/DailyTrendChart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DailyTrendChart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6de8d020"]]);
export {
  DailyTrendChart as default
};
