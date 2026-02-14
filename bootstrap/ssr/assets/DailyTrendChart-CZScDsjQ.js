import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Line } from "vue-chartjs";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import dayjs from "dayjs";
import { u as useFinanceFormat } from "./useFinanceFormat-DRbxJZsx.js";
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
  props: { transactions: Array, currentDate: String },
  setup(__props) {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
    const props = __props;
    const { chartData, chartOptions } = useFinanceChart(props);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white p-6 rounded-2xl shadow-sm border border-slate-200 w-full mt-8" }, _attrs))}><div class="flex justify-between items-center mb-6"><h3 class="font-bold text-slate-700 text-sm uppercase tracking-wider">${ssrInterpolate(_ctx.$t("finance_trend"))}</h3><span class="text-xs text-slate-400">${ssrInterpolate(_ctx.$t("daily_chart"))}</span></div><div class="h-[300px] w-full">`);
      _push(ssrRenderComponent(unref(Line), {
        data: unref(chartData),
        options: unref(chartOptions)
      }, null, _parent));
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
export {
  _sfc_main as default
};
