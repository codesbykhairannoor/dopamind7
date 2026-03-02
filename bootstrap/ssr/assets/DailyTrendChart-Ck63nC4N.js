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
  emits: ["day-click"],
  setup(__props, { emit: __emit }) {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
    const props = __props;
    const emit = __emit;
    const isMounted = ref(false);
    const { chartData, chartOptions } = useFinanceChart(props);
    const { formatMoney } = useFinanceFormat();
    chartOptions.onClick = (event, elements, chart) => {
      if (!elements || elements.length === 0) return;
      const dataIndex = elements[0].index;
      const dayOfMonth = chartData.value.labels[dataIndex];
      const rawDate = dayjs(props.currentDate).date(dayOfMonth).format("YYYY-MM-DD");
      handleDateClick(rawDate);
    };
    chartOptions.onHover = (event, chartElement) => {
      event.native.target.style.cursor = chartElement[0] ? "pointer" : "default";
    };
    onMounted(() => {
      isMounted.value = true;
    });
    const handleDateClick = (rawDate) => {
      if (!rawDate || rawDate === "-") return;
      const dayTrx = props.transactions.filter((t) => t.date === rawDate);
      if (dayTrx.length === 0) return;
      const totalInc = dayTrx.filter((t) => t.type === "income").reduce((sum, t) => sum + Number(t.amount), 0);
      const totalExp = dayTrx.filter((t) => t.type === "expense").reduce((sum, t) => sum + Number(t.amount), 0);
      emit("day-click", {
        date: rawDate,
        dateObj: dayjs(rawDate),
        // Samakan persis dengan buatan useFinanceHistory
        transactions: dayTrx,
        total_income: totalInc,
        total_expense: totalExp
      });
    };
    const monthInsights = computed(() => {
      if (!props.transactions || props.transactions.length === 0) return null;
      let totalOut = 0;
      let trxCountByDate = {};
      let expenseByDate = {};
      props.transactions.forEach((t) => {
        trxCountByDate[t.date] = (trxCountByDate[t.date] || 0) + 1;
        if (t.type === "expense") {
          totalOut += Number(t.amount);
          expenseByDate[t.date] = (expenseByDate[t.date] || 0) + Number(t.amount);
        }
      });
      let busiestDate = { date: "-", count: 0 };
      for (const [date, count] of Object.entries(trxCountByDate)) {
        if (count > busiestDate.count) {
          busiestDate = { date, count };
        }
      }
      let highestExpenseDay = { date: "-", amount: 0 };
      for (const [date, amount] of Object.entries(expenseByDate)) {
        if (amount > highestExpenseDay.amount) {
          highestExpenseDay = { date, amount };
        }
      }
      const targetDate = dayjs(props.currentDate);
      const isCurrentMonth = targetDate.isSame(dayjs(), "month");
      const daysDivisor = isCurrentMonth ? dayjs().date() : targetDate.daysInMonth();
      const safeDivisor = daysDivisor > 0 ? daysDivisor : 1;
      const avgSpend = totalOut / safeDivisor;
      return {
        busiestDateRaw: busiestDate.date,
        busiestDate: busiestDate.date !== "-" ? dayjs(busiestDate.date).format("DD MMM") : "-",
        busiestCount: busiestDate.count,
        highestExpenseDateRaw: highestExpenseDay.date,
        highestExpenseDate: highestExpenseDay.date !== "-" ? dayjs(highestExpenseDay.date).format("DD MMM") : "-",
        highestExpenseAmount: highestExpenseDay.amount,
        avgSpend
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200 w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700" }, _attrs))} data-v-92fbf6e1><div class="flex justify-between items-start mb-6" data-v-92fbf6e1><div data-v-92fbf6e1><h3 class="font-black text-slate-800 text-sm md:text-base uppercase tracking-wider" data-v-92fbf6e1>${ssrInterpolate(_ctx.$t("finance_trend", "Trend Keuangan"))}</h3><p class="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1" data-v-92fbf6e1>${ssrInterpolate(_ctx.$t("daily_chart", "Grafik 30 Hari"))}</p></div><div class="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100" data-v-92fbf6e1><span class="flex h-2 w-2 relative" data-v-92fbf6e1><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" data-v-92fbf6e1></span><span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" data-v-92fbf6e1></span></span><span class="text-[9px] font-black text-indigo-600 uppercase tracking-widest" data-v-92fbf6e1>${ssrInterpolate(_ctx.$t("status_active", "Active"))}</span></div></div><div class="relative w-full overflow-x-auto overflow-y-hidden custom-scrollbar pb-2 mb-6" data-v-92fbf6e1><div class="h-[280px] min-w-[600px] md:min-w-full relative" data-v-92fbf6e1>`);
      if (isMounted.value) {
        _push(ssrRenderComponent(unref(Line), {
          data: unref(chartData),
          options: unref(chartOptions)
        }, null, _parent));
      } else {
        _push(`<div class="absolute inset-0 w-full h-full bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 animate-pulse" data-v-92fbf6e1><div class="flex gap-2 items-end h-32 opacity-50" data-v-92fbf6e1><div class="w-4 bg-indigo-200 h-10 rounded-t-sm" data-v-92fbf6e1></div><div class="w-4 bg-indigo-200 h-20 rounded-t-sm" data-v-92fbf6e1></div><div class="w-4 bg-indigo-300 h-16 rounded-t-sm" data-v-92fbf6e1></div><div class="w-4 bg-indigo-400 h-24 rounded-t-sm" data-v-92fbf6e1></div><div class="w-4 bg-indigo-300 h-12 rounded-t-sm" data-v-92fbf6e1></div></div><span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]" data-v-92fbf6e1>${ssrInterpolate(_ctx.$t("preparing_analytics", "Preparing Analytics..."))}</span></div>`);
      }
      _push(`</div></div>`);
      if (monthInsights.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-slate-100 pt-6 mt-2" data-v-92fbf6e1><div class="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 flex flex-col justify-center" data-v-92fbf6e1><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1" data-v-92fbf6e1>${ssrInterpolate(_ctx.$t("avg_daily_spend", "Rata-Rata Harian"))}</span><h4 class="text-sm font-black text-slate-700" data-v-92fbf6e1>${ssrInterpolate(unref(formatMoney)(monthInsights.value.avgSpend))} <span class="text-[10px] font-bold text-slate-400" data-v-92fbf6e1>${ssrInterpolate(_ctx.$t("per_day", "/ hari"))}</span></h4></div><div class="bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50 flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:bg-rose-100 transition-colors" data-v-92fbf6e1><div class="relative z-10" data-v-92fbf6e1><div class="flex items-center gap-2 mb-1" data-v-92fbf6e1><span class="text-[10px] font-bold text-rose-400 uppercase tracking-widest" data-v-92fbf6e1>${ssrInterpolate(_ctx.$t("most_wasteful", "Paling Boros"))}</span><span class="text-[9px] bg-white border border-rose-100 text-rose-500 font-bold px-1.5 py-0.5 rounded shadow-sm" data-v-92fbf6e1>${ssrInterpolate(monthInsights.value.highestExpenseDate)}</span></div><h4 class="text-sm font-black text-rose-600" data-v-92fbf6e1>${ssrInterpolate(unref(formatMoney)(monthInsights.value.highestExpenseAmount))}</h4></div><span class="absolute right-2 bottom-0 text-3xl opacity-[0.05] group-hover:scale-110 transition-transform" data-v-92fbf6e1>📉</span></div><div class="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50 flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:bg-emerald-100 transition-colors" data-v-92fbf6e1><div class="relative z-10" data-v-92fbf6e1><div class="flex items-center gap-2 mb-1" data-v-92fbf6e1><span class="text-[10px] font-bold text-emerald-500/70 uppercase tracking-widest" data-v-92fbf6e1>${ssrInterpolate(_ctx.$t("busiest_day", "Paling Sibuk"))}</span><span class="text-[9px] bg-white border border-emerald-100 text-emerald-600 font-bold px-1.5 py-0.5 rounded shadow-sm" data-v-92fbf6e1>${ssrInterpolate(monthInsights.value.busiestDate)}</span></div><h4 class="text-sm font-black text-emerald-700" data-v-92fbf6e1>${ssrInterpolate(monthInsights.value.busiestCount)} ${ssrInterpolate(_ctx.$t("transactions_count", "Transaksi"))}</h4></div><span class="absolute right-2 bottom-0 text-3xl opacity-[0.05] group-hover:scale-110 transition-transform" data-v-92fbf6e1>⚡</span></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/DailyTrendChart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DailyTrendChart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-92fbf6e1"]]);
export {
  DailyTrendChart as default
};
