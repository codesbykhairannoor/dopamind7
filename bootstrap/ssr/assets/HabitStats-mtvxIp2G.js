import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { Line } from "vue-chartjs";
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
          label: "Progres",
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
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.localHabits.length) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "mt-16 pb-16 w-full" }, _attrs))} data-v-15890991><div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 px-4 md:px-0 md:max-w-[95%] mx-auto" data-v-15890991><div class="md:col-span-5 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 relative overflow-hidden" data-v-15890991><div class="relative z-10" data-v-15890991><span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1" data-v-15890991>${ssrInterpolate(_ctx.$t("label_consistency"))}</span><div class="flex items-end gap-1" data-v-15890991><span class="text-4xl font-black text-slate-800" data-v-15890991>${ssrInterpolate(__props.overallPercentage)}</span><span class="text-sm font-bold text-indigo-500 mb-1.5" data-v-15890991>%</span></div></div><div class="absolute inset-x-0 bottom-0 h-24" data-v-15890991>`);
        _push(ssrRenderComponent(unref(Line), {
          data: chartData.value,
          options: chartOptions
        }, null, _parent));
        _push(`</div></div><div class="md:col-span-3 bg-indigo-600 rounded-[2.5rem] p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden" data-v-15890991>`);
        if (topHabit.value) {
          _push(`<div data-v-15890991><span class="text-[10px] font-black uppercase tracking-widest text-indigo-200 block mb-3" data-v-15890991>${ssrInterpolate(_ctx.$t("label_mvp_habit"))}</span><div class="text-3xl mb-1" data-v-15890991>${ssrInterpolate(topHabit.value.icon)}</div><div class="text-lg font-black truncate" data-v-15890991>${ssrInterpolate(topHabit.value.name)}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-4 flex justify-between items-center" data-v-15890991><span class="text-[10px] font-bold uppercase text-indigo-200" data-v-15890991>${ssrInterpolate(_ctx.$t("label_checkins"))}</span><span class="text-xl font-black" data-v-15890991>${ssrInterpolate(__props.totalCompletions)}</span></div></div><div class="md:col-span-4 relative" data-v-15890991><button class="w-full h-full bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm flex items-center gap-5 text-left" data-v-15890991><div class="${ssrRenderClass([__props.currentMoodData.color, "w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-inner"])}" data-v-15890991>${ssrInterpolate(__props.currentMoodData.icon)}</div><div class="flex-1 min-w-0" data-v-15890991><span class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1" data-v-15890991>${ssrInterpolate(_ctx.$t("label_mood_status"))}</span><div class="text-xl font-black truncate uppercase" data-v-15890991>${ssrInterpolate(_ctx.$t(__props.currentMoodData.label_key))}</div></div></button>`);
        if (showMoodDropdownLocal.value) {
          _push(`<div class="absolute bottom-full mb-4 left-0 w-full bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-3 z-30 grid grid-cols-2 gap-2" data-v-15890991><!--[-->`);
          ssrRenderList(__props.moodOptions, (m) => {
            _push(`<button class="${ssrRenderClass([__props.savedMood === m.code ? "bg-indigo-50" : "", "flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50"])}" data-v-15890991><span class="text-xl" data-v-15890991>${ssrInterpolate(m.icon)}</span><span class="font-bold text-[10px] uppercase truncate" data-v-15890991>${ssrInterpolate(_ctx.$t(m.label_key).split(" ")[0])}</span></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></section>`);
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
const HabitStats = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-15890991"]]);
export {
  HabitStats as default
};
