import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { Line } from "vue-chartjs";
import dayjs from "dayjs";
import { Chart, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from "chart.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "HabitStats",
  __ssrInlineRender: true,
  props: {
    localHabits: Array,
    overallPercentage: Number,
    totalCompletions: Number,
    currentMoodData: Object,
    moodOptions: Array,
    savedMood: String,
    selectMood: Function
  },
  setup(__props) {
    Chart.register(
      Title,
      Tooltip,
      Legend,
      LineElement,
      CategoryScale,
      LinearScale,
      PointElement,
      Filler
    );
    const props = __props;
    const showMoodDropdownLocal = ref(false);
    const chartData = computed(() => ({
      labels: ["", "", "", "", "", "", ""],
      datasets: [
        {
          label: "Progress",
          data: [40, 60, 45, 70, 55, 80, props.overallPercentage],
          borderColor: "#818cf8",
          backgroundColor: (ctx) => {
            const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 100);
            g.addColorStop(0, "rgba(129,140,248,0.4)");
            g.addColorStop(1, "rgba(129,140,248,0)");
            return g;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 3
        }
      ]
    }));
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        x: { display: false },
        y: { display: false, min: 0, max: 100 }
      }
    };
    const topHabit = computed(() => {
      var _a;
      if (!((_a = props.localHabits) == null ? void 0 : _a.length)) return null;
      return [...props.localHabits].sort(
        (a, b) => b.progress_count - a.progress_count
      )[0];
    });
    const currentStreak = computed(() => {
      var _a;
      if (!((_a = props.localHabits) == null ? void 0 : _a.length)) return 0;
      let streak = 0;
      let date = dayjs();
      let todayDone = props.localHabits.some((h) => h.logs && h.logs[date.format("YYYY-MM-DD")] === "completed");
      if (!todayDone) {
        date = date.subtract(1, "day");
      }
      while (true) {
        const dStr = date.format("YYYY-MM-DD");
        const isDone = props.localHabits.some((h) => h.logs && h.logs[dStr] === "completed");
        if (isDone) {
          streak++;
          date = date.subtract(1, "day");
        } else {
          break;
        }
      }
      return streak;
    });
    const perfectDaysCount = computed(() => {
      var _a;
      if (!((_a = props.localHabits) == null ? void 0 : _a.length)) return 0;
      let count = 0;
      const allDates = /* @__PURE__ */ new Set();
      props.localHabits.forEach((h) => {
        if (h.logs) Object.keys(h.logs).forEach((d) => allDates.add(d));
      });
      allDates.forEach((date) => {
        const isPerfect = props.localHabits.every((h) => h.logs && h.logs[date] === "completed");
        if (isPerfect) count++;
      });
      return count;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.localHabits.length) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "mt-16 pb-16 w-full" }, _attrs))} data-v-9396ba54><div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 px-4 md:px-0 md:max-w-[95%] mx-auto" data-v-9396ba54><div class="md:col-span-5 bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden" data-v-9396ba54><div class="relative z-10" data-v-9396ba54><span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1" data-v-9396ba54>${ssrInterpolate(_ctx.$t("label_consistency", "Konsistensi Bulan Ini"))}</span><div class="flex items-end gap-1" data-v-9396ba54><span class="text-4xl font-black text-slate-800 dark:text-slate-100" data-v-9396ba54>${ssrInterpolate(__props.overallPercentage)}</span><span class="text-sm font-bold text-indigo-500 mb-1.5" data-v-9396ba54>%</span></div></div><div class="absolute inset-x-0 bottom-0 h-24" data-v-9396ba54>`);
        _push(ssrRenderComponent(unref(Line), {
          data: chartData.value,
          options: chartOptions
        }, null, _parent));
        _push(`</div></div><div class="md:col-span-3 bg-indigo-600 rounded-[2.5rem] p-6 text-white shadow-xl shadow-indigo-100 dark:shadow-none flex flex-col justify-between group overflow-hidden relative" data-v-9396ba54><div class="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" data-v-9396ba54></div>`);
        if (topHabit.value) {
          _push(`<div class="relative z-10" data-v-9396ba54><span class="text-[10px] font-black uppercase tracking-widest text-indigo-200 block mb-3" data-v-9396ba54> 🏆 ${ssrInterpolate(_ctx.$t("label_mvp_habit", "Habit Terbaik"))}</span><div class="text-3xl mb-1" data-v-9396ba54>${ssrInterpolate(topHabit.value.icon)}</div><div class="text-lg font-black truncate" data-v-9396ba54>${ssrInterpolate(topHabit.value.name)}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (topHabit.value) {
          _push(`<div class="mt-4 flex justify-between items-end relative z-10" data-v-9396ba54><span class="text-[10px] font-bold uppercase text-indigo-200 leading-none" data-v-9396ba54>${ssrInterpolate(_ctx.$t("label_completed", "Selesai"))}</span><span class="text-2xl font-black leading-none" data-v-9396ba54>${ssrInterpolate(topHabit.value.progress_count)}<span class="text-sm text-indigo-200" data-v-9396ba54>x</span></span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="md:col-span-4 relative" data-v-9396ba54><button class="w-full h-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5 text-left transition hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:shadow-md dark:hover:shadow-none" data-v-9396ba54><div class="${ssrRenderClass([[_ctx.isDark ? "bg-slate-800 shadow-slate-950/50" : __props.currentMoodData.color], "w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-inner shrink-0"])}" data-v-9396ba54>${ssrInterpolate(__props.currentMoodData.icon)}</div><div class="flex-1 min-w-0" data-v-9396ba54><span class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1" data-v-9396ba54>${ssrInterpolate(_ctx.$t("label_mood_status", "Mood Bulan Ini"))}</span><div class="text-xl font-black truncate uppercase text-slate-800 dark:text-slate-100" data-v-9396ba54>${ssrInterpolate(_ctx.$t(__props.currentMoodData.label_key))}</div></div></button>`);
        if (showMoodDropdownLocal.value) {
          _push(`<div class="absolute bottom-full mb-4 left-0 w-full bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 p-3 z-30 grid grid-cols-2 gap-2" data-v-9396ba54><!--[-->`);
          ssrRenderList(__props.moodOptions, (m) => {
            _push(`<button class="${ssrRenderClass([__props.savedMood === m.code ? "bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/30" : "border border-transparent", "flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition"])}" data-v-9396ba54><span class="text-xl" data-v-9396ba54>${ssrInterpolate(m.icon)}</span><span class="font-bold text-[10px] uppercase truncate text-slate-600 dark:text-slate-300" data-v-9396ba54>${ssrInterpolate(_ctx.$t(m.label_key).split(" ")[0])}</span></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="md:col-span-4 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-[2.5rem] p-6 flex items-center gap-5 shadow-sm transform hover:-translate-y-1 transition duration-300" data-v-9396ba54><div class="w-14 h-14 bg-white dark:bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm text-orange-500 shrink-0" data-v-9396ba54> 🔥 </div><div data-v-9396ba54><div class="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-1" data-v-9396ba54>${ssrInterpolate(_ctx.$t("label_current_streak", "Aktif Beruntun"))}</div><div class="text-2xl font-black text-orange-600 dark:text-orange-400 leading-none" data-v-9396ba54>${ssrInterpolate(currentStreak.value)} <span class="text-sm font-bold opacity-70" data-v-9396ba54>${ssrInterpolate(_ctx.$t("label_days", "Hari"))}</span></div></div></div><div class="md:col-span-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-[2.5rem] p-6 flex items-center gap-5 shadow-sm transform hover:-translate-y-1 transition duration-300" data-v-9396ba54><div class="w-14 h-14 bg-white dark:bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm text-emerald-500 shrink-0" data-v-9396ba54> 🌟 </div><div data-v-9396ba54><div class="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1" data-v-9396ba54>${ssrInterpolate(_ctx.$t("label_perfect_days", "Hari Sempurna"))}</div><div class="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none" data-v-9396ba54>${ssrInterpolate(perfectDaysCount.value)} <span class="text-sm font-bold opacity-70" data-v-9396ba54>${ssrInterpolate(_ctx.$t("label_days", "Hari"))}</span></div></div></div><div class="md:col-span-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-[2.5rem] p-6 flex items-center gap-5 shadow-sm transform hover:-translate-y-1 transition duration-300" data-v-9396ba54><div class="w-14 h-14 bg-white dark:bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm text-blue-500 shrink-0" data-v-9396ba54> 📝 </div><div data-v-9396ba54><div class="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1" data-v-9396ba54>${ssrInterpolate(_ctx.$t("label_total_checkins", "Total Eksekusi"))}</div><div class="text-2xl font-black text-blue-600 dark:text-blue-400 leading-none" data-v-9396ba54>${ssrInterpolate(__props.totalCompletions)} <span class="text-sm font-bold opacity-70" data-v-9396ba54>${ssrInterpolate(_ctx.$t("label_times", "Kali"))}</span></div></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Habits/HabitStats.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HabitStats = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9396ba54"]]);
export {
  HabitStats as default
};
