import { computed, ref, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Line } from "vue-chartjs";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import dayjs from "dayjs";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
import "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
  const chartOptions = computed(() => {
    const isDark = document.documentElement.classList.contains("dark");
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            color: isDark ? "#94a3b8" : "#64748b",
            font: { weight: "bold", size: 10 }
          }
        },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: isDark ? "#1e293b" : "#ffffff",
          titleColor: isDark ? "#f8fafc" : "#1e293b",
          bodyColor: isDark ? "#cbd5e1" : "#475569",
          borderColor: isDark ? "#334155" : "#e2e8f0",
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: (context) => ` ${context.dataset.label}: ${formatMoney(context.raw)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: isDark ? "rgba(51, 65, 85, 0.5)" : "#f1f5f9",
            borderDash: [5, 5],
            drawBorder: false
          },
          ticks: {
            callback: (val) => val / 1e3 + "k",
            color: isDark ? "#64748b" : "#94a3b8",
            font: { size: 10, weight: "bold" }
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            color: isDark ? "#64748b" : "#94a3b8",
            font: { size: 10, weight: "bold" }
          }
        }
      },
      interaction: { mode: "nearest", axis: "x", intersect: false }
    };
  });
  return { chartData, chartOptions };
}
const _sfc_main = {
  __name: "DailyTrendChart",
  __ssrInlineRender: true,
  props: {
    transactions: Array,
    currentDate: String,
    isExplorer: Boolean
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative group" }, _attrs))} data-v-721b76eb>`);
      if (__props.isExplorer) {
        _push(`<div class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/20 dark:bg-slate-900/20 backdrop-blur-md rounded-[2rem] border border-slate-200 dark:border-slate-800 cursor-pointer group-hover:bg-white/40 dark:group-hover:bg-slate-900/40 transition-all duration-500" data-v-721b76eb><div class="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-3xl mb-4 border border-slate-100 dark:border-slate-700" data-v-721b76eb>🔒</div><h4 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest tracking-tighter" data-v-721b76eb>Advanced Analytics</h4><p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest" data-v-721b76eb>Upgrade to Architect to unlock Trends</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 transition-all duration-500" data-v-721b76eb><div class="flex justify-between items-start mb-6" data-v-721b76eb><div data-v-721b76eb><h3 class="font-black text-slate-800 dark:text-white text-sm md:text-base uppercase tracking-wider transition-colors duration-500" data-v-721b76eb>${ssrInterpolate(_ctx.$t("finance_trend", "Trend Keuangan"))}</h3><p class="text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-tight mt-1 transition-colors duration-500" data-v-721b76eb>${ssrInterpolate(_ctx.$t("daily_chart", "Grafik 30 Hari"))}</p></div><div class="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-500/20 transition-colors duration-500" data-v-721b76eb><span class="flex h-2 w-2 relative" data-v-721b76eb><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" data-v-721b76eb></span><span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" data-v-721b76eb></span></span><span class="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest" data-v-721b76eb>${ssrInterpolate(_ctx.$t("status_active", "Active"))}</span></div></div><div class="relative w-full overflow-x-auto overflow-y-hidden custom-scrollbar pb-2 mb-6" data-v-721b76eb><div class="h-[280px] min-w-[600px] md:min-w-full relative" data-v-721b76eb>`);
      if (isMounted.value) {
        _push(ssrRenderComponent(unref(Line), {
          data: unref(chartData),
          options: unref(chartOptions)
        }, null, _parent));
      } else {
        _push(`<div class="absolute inset-0 w-full h-full bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-3 animate-pulse transition-colors duration-500" data-v-721b76eb><div class="flex gap-2 items-end h-32 opacity-50" data-v-721b76eb><div class="w-4 bg-indigo-200 dark:bg-indigo-900 h-10 rounded-t-sm" data-v-721b76eb></div><div class="w-4 bg-indigo-200 dark:bg-indigo-900 h-20 rounded-t-sm" data-v-721b76eb></div><div class="w-4 bg-indigo-300 dark:bg-indigo-800 h-16 rounded-t-sm" data-v-721b76eb></div><div class="w-4 bg-indigo-400 dark:bg-indigo-700 h-24 rounded-t-sm" data-v-721b76eb></div><div class="w-4 bg-indigo-300 dark:bg-indigo-800 h-12 rounded-t-sm" data-v-721b76eb></div></div><span class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] transition-colors duration-500" data-v-721b76eb>${ssrInterpolate(_ctx.$t("preparing_analytics", "Preparing Analytics..."))}</span></div>`);
      }
      _push(`</div></div>`);
      if (monthInsights.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-slate-100 dark:border-slate-800 pt-6 mt-2 transition-colors duration-500" data-v-721b76eb><div class="bg-slate-50/70 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col justify-center transition-colors duration-500" data-v-721b76eb><span class="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1 transition-colors duration-500" data-v-721b76eb>${ssrInterpolate(_ctx.$t("avg_daily_spend", "Rata-Rata Harian"))}</span><h4 class="text-sm font-black text-slate-700 dark:text-slate-200 transition-colors duration-500" data-v-721b76eb>${ssrInterpolate(unref(formatMoney)(monthInsights.value.avgSpend))} <span class="text-[10px] font-bold text-slate-400 dark:text-slate-600" data-v-721b76eb>${ssrInterpolate(_ctx.$t("per_day", "/ hari"))}</span></h4></div><div class="bg-rose-50/50 dark:bg-rose-500/10 p-4 rounded-2xl border border-rose-100/50 dark:border-rose-500/20 flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all duration-300" data-v-721b76eb><div class="relative z-10" data-v-721b76eb><div class="flex items-center gap-2 mb-1" data-v-721b76eb><span class="text-[10px] font-bold text-rose-400 dark:text-rose-400/80 uppercase tracking-widest transition-colors duration-500" data-v-721b76eb>${ssrInterpolate(_ctx.$t("most_wasteful", "Paling Boros"))}</span><span class="text-[9px] bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-500/30 text-rose-500 dark:text-rose-400 font-bold px-1.5 py-0.5 rounded shadow-sm dark:shadow-none transition-colors duration-500" data-v-721b76eb>${ssrInterpolate(monthInsights.value.highestExpenseDate)}</span></div><h4 class="text-sm font-black text-rose-600 dark:text-rose-400 transition-colors duration-500" data-v-721b76eb>${ssrInterpolate(unref(formatMoney)(monthInsights.value.highestExpenseAmount))}</h4></div><span class="absolute right-2 bottom-0 text-3xl opacity-[0.05] group-hover:scale-110 transition-transform" data-v-721b76eb>📉</span></div><div class="bg-emerald-50/50 dark:bg-emerald-500/10 p-4 rounded-2xl border border-emerald-100/50 dark:border-emerald-500/20 flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all duration-300" data-v-721b76eb><div class="relative z-10" data-v-721b76eb><div class="flex items-center gap-2 mb-1" data-v-721b76eb><span class="text-[10px] font-bold text-emerald-500/70 dark:text-emerald-400/80 uppercase tracking-widest transition-colors duration-500" data-v-721b76eb>${ssrInterpolate(_ctx.$t("busiest_day", "Paling Sibuk"))}</span><span class="text-[9px] bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded shadow-sm dark:shadow-none transition-colors duration-500" data-v-721b76eb>${ssrInterpolate(monthInsights.value.busiestDate)}</span></div><h4 class="text-sm font-black text-emerald-700 dark:text-emerald-400 transition-colors duration-500" data-v-721b76eb>${ssrInterpolate(monthInsights.value.busiestCount)} ${ssrInterpolate(_ctx.$t("transactions_count", "Transaksi"))}</h4></div><span class="absolute right-2 bottom-0 text-3xl opacity-[0.05] group-hover:scale-110 transition-transform" data-v-721b76eb>⚡</span></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/DailyTrendChart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DailyTrendChart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-721b76eb"]]);
export {
  DailyTrendChart as default
};
