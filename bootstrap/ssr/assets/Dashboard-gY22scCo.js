import { ref, computed, onMounted, resolveComponent, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-Bjuq9qWC.js";
import { usePage, Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import { u as useGating } from "./useGating-Dlt-HuEc.js";
import { _ as _sfc_main$2 } from "./PremiumPreviewModal-BdH6vUzw.js";
import { Sparkles, Brain, ArrowRight, Zap, Target, TrendingUp } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ThemeToggle-ByQSx4Ee.js";
import "./useAppearance-rDoGVD4_.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AuthenticatedLayout }, {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    synergy: Object,
    trend: Array,
    stats: Object
  },
  setup(__props) {
    const { isExplorer, isArchitect, isQuantum, isLegendary } = useGating();
    const user = usePage().props.auth.user;
    const props = __props;
    const globalInsight = ref(null);
    const loadingInsight = ref(false);
    const fetchInsight = async () => {
      if (loadingInsight.value) return;
      loadingInsight.value = true;
      try {
        const response = await axios.get(route("dashboard.insight"));
        globalInsight.value = response.data;
      } catch (error) {
        console.error("Failed to fetch neural insight:", error);
      } finally {
        loadingInsight.value = false;
      }
    };
    const greetingKey = computed(() => {
      const hour = (/* @__PURE__ */ new Date()).getHours();
      if (hour < 11) return "dash_greet_morning";
      if (hour < 15) return "dash_greet_afternoon";
      if (hour < 19) return "dash_greet_evening";
      return "dash_greet_night";
    });
    const formatRupiah = (number) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
    };
    const overallScore = computed(() => {
      if (!props.synergy) return 0;
      let scores = [props.synergy.habits.percent, props.synergy.planner.percent];
      if (props.synergy.goals.top_goal) scores.push(props.synergy.goals.top_goal.percent);
      scores.push(props.synergy.journal.is_written ? 100 : 0);
      return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    });
    const isMobile = ref(false);
    const isPreviewOpen = ref(false);
    const activePreviewModule = ref("Finance");
    onMounted(() => {
      isMobile.value = window.innerWidth < 768;
      window.addEventListener("resize", () => {
        isMobile.value = window.innerWidth < 768;
      });
      if (!isExplorer.value) {
        fetchInsight();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Gem = resolveComponent("Gem");
      const _component_TradingUp = resolveComponent("TradingUp");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("nav_dashboard")
      }, null, _parent));
      _push(`<div class="w-full lg:max-w-[1600px] mx-auto p-4 md:p-10 pb-32" data-v-15ddfefa>`);
      if (isMobile.value && __props.synergy) {
        _push(`<!--[--><header class="pt-8 pb-6" data-v-15ddfefa><div class="mb-6" data-v-15ddfefa><p class="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2" data-v-15ddfefa>${ssrInterpolate(__props.synergy.date_formatted)}</p><h1 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight" data-v-15ddfefa>${ssrInterpolate(_ctx.$t(greetingKey.value))},<br data-v-15ddfefa><span class="text-indigo-600 dark:text-indigo-400" data-v-15ddfefa>${ssrInterpolate(unref(user).name.split(" ")[0])}</span></h1></div><div class="grid grid-cols-2 gap-4 mb-8" data-v-15ddfefa><div class="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center" data-v-15ddfefa><div class="relative w-16 h-16 mb-2 flex items-center justify-center" data-v-15ddfefa><svg class="absolute w-full h-full -rotate-90" viewBox="0 0 100 100" data-v-15ddfefa><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="6" class="text-slate-50 dark:text-slate-800" data-v-15ddfefa></circle><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", 276)}${ssrRenderAttr("stroke-dashoffset", 276 - 276 * overallScore.value / 100)} class="${ssrRenderClass([unref(isQuantum) ? "text-violet-500" : "text-indigo-500", "transition-all duration-[2000ms]"])}" data-v-15ddfefa></circle></svg><span class="text-lg font-bold text-slate-900 dark:text-white" data-v-15ddfefa>${ssrInterpolate(overallScore.value)}%</span></div><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-15ddfefa>Synergy</span></div><div class="bg-slate-900 p-5 rounded-3xl text-white flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-all" data-v-15ddfefa><div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-2" data-v-15ddfefa>`);
        if (unref(isExplorer)) {
          _push(ssrRenderComponent(unref(Sparkles), {
            size: 18,
            class: "text-indigo-400"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_Gem, {
            size: 18,
            class: "text-indigo-400"
          }, null, _parent));
        }
        _push(`</div><span class="text-[10px] font-bold text-white uppercase tracking-widest" data-v-15ddfefa>${ssrInterpolate(unref(isExplorer) ? "Upgrade" : unref(isQuantum) ? "Quantum" : "Architect")}</span></div></div>`);
        if (unref(isExplorer)) {
          _push(`<div class="mb-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 cursor-pointer active:scale-[0.98] transition-all" data-v-15ddfefa><div class="flex items-center justify-between mb-4 text-slate-400" data-v-15ddfefa><div class="flex items-center gap-2" data-v-15ddfefa>`);
          _push(ssrRenderComponent(unref(Brain), { size: 14 }, null, _parent));
          _push(`<span class="text-[10px] font-bold uppercase tracking-widest" data-v-15ddfefa>Neural insight</span></div>`);
          _push(ssrRenderComponent(unref(ArrowRight), { size: 14 }, null, _parent));
          _push(`</div><div class="space-y-2 opacity-30" data-v-15ddfefa><div class="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full" data-v-15ddfefa></div><div class="h-1.5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-full" data-v-15ddfefa></div></div><p class="mt-4 text-[10px] font-semibold text-slate-400" data-v-15ddfefa>Unlock AI Coaching projections</p></div>`);
        } else if (unref(isQuantum)) {
          _push(`<div class="mb-8 bg-violet-600 p-6 rounded-3xl text-white relative overflow-hidden" data-v-15ddfefa><div class="relative z-10" data-v-15ddfefa><div class="flex items-center gap-2 mb-3" data-v-15ddfefa>`);
          _push(ssrRenderComponent(unref(Sparkles), {
            size: 14,
            class: "animate-pulse"
          }, null, _parent));
          _push(`<span class="text-[10px] font-bold uppercase tracking-widest opacity-80" data-v-15ddfefa>Neural Active</span></div><p class="text-lg font-bold leading-tight" data-v-15ddfefa>${ssrInterpolate(((_a = globalInsight.value) == null ? void 0 : _a.summary) || "Your synergy is optimized for deep focus today.")}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</header><div class="grid grid-cols-12 gap-4" data-v-15ddfefa>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("planner.index"),
          class: "col-span-12 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-4" data-v-15ddfefa${_scopeId}><div class="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-indigo-500" data-v-15ddfefa${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-15ddfefa${_scopeId}><h3 class="font-bold text-slate-900 dark:text-white" data-v-15ddfefa${_scopeId}>Schedule</h3><p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest" data-v-15ddfefa${_scopeId}>${ssrInterpolate(__props.synergy.planner.upcoming.length)} Pending</p></div></div>`);
              _push2(ssrRenderComponent(unref(ArrowRight), {
                size: 16,
                class: "text-slate-300"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode("div", { class: "w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-indigo-500" }, [
                    createVNode(_sfc_main$1, {
                      name: "planner",
                      size: "20"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h3", { class: "font-bold text-slate-900 dark:text-white" }, "Schedule"),
                    createVNode("p", { class: "text-[10px] text-slate-400 font-bold uppercase tracking-widest" }, toDisplayString(__props.synergy.planner.upcoming.length) + " Pending", 1)
                  ])
                ]),
                createVNode(unref(ArrowRight), {
                  size: 16,
                  class: "text-slate-300"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("habits.index"),
          class: "col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-9 h-9 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-xl flex items-center justify-center mb-4" data-v-15ddfefa${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Zap), { size: 18 }, null, _parent2, _scopeId));
              _push2(`</div><h4 class="font-bold text-slate-900 dark:text-white" data-v-15ddfefa${_scopeId}>Habits</h4><p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest" data-v-15ddfefa${_scopeId}>${ssrInterpolate(__props.synergy.habits.completed)}/${ssrInterpolate(__props.synergy.habits.total)} done</p>`);
            } else {
              return [
                createVNode("div", { class: "w-9 h-9 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-xl flex items-center justify-center mb-4" }, [
                  createVNode(unref(Zap), { size: 18 })
                ]),
                createVNode("h4", { class: "font-bold text-slate-900 dark:text-white" }, "Habits"),
                createVNode("p", { class: "text-[10px] text-slate-400 font-bold uppercase tracking-widest" }, toDisplayString(__props.synergy.habits.completed) + "/" + toDisplayString(__props.synergy.habits.total) + " done", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("journal.index"),
          class: "col-span-6 bg-slate-900 dark:bg-slate-800/50 p-6 rounded-3xl shadow-sm text-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-9 h-9 bg-white/10 text-white rounded-xl flex items-center justify-center mb-4" data-v-15ddfefa${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Brain), { size: 18 }, null, _parent2, _scopeId));
              _push2(`</div><h4 class="font-bold" data-v-15ddfefa${_scopeId}>Journal</h4><p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest" data-v-15ddfefa${_scopeId}>${ssrInterpolate(__props.synergy.journal.is_written ? "Written" : "Log now")}</p>`);
            } else {
              return [
                createVNode("div", { class: "w-9 h-9 bg-white/10 text-white rounded-xl flex items-center justify-center mb-4" }, [
                  createVNode(unref(Brain), { size: 18 })
                ]),
                createVNode("h4", { class: "font-bold" }, "Journal"),
                createVNode("p", { class: "text-[10px] text-slate-400 font-bold uppercase tracking-widest" }, toDisplayString(__props.synergy.journal.is_written ? "Written" : "Log now"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="col-span-12 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer" data-v-15ddfefa><div class="flex items-center justify-between mb-6" data-v-15ddfefa><h3 class="text-lg font-bold text-slate-900 dark:text-white" data-v-15ddfefa>Finance status</h3>`);
        _push(ssrRenderComponent(_component_TradingUp, {
          size: 18,
          class: "text-indigo-500"
        }, null, _parent));
        _push(`</div>`);
        if (!unref(isExplorer)) {
          _push(`<div class="grid grid-cols-2 gap-4" data-v-15ddfefa><div data-v-15ddfefa><p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest" data-v-15ddfefa>Expense</p><p class="text-xl font-bold tabular-nums" data-v-15ddfefa>${ssrInterpolate(formatRupiah(__props.synergy.finance.expense))}</p></div><div data-v-15ddfefa><p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest" data-v-15ddfefa>Income</p><p class="text-xl font-bold tabular-nums text-emerald-500" data-v-15ddfefa>${ssrInterpolate(formatRupiah(__props.synergy.finance.income))}</p></div></div>`);
        } else {
          _push(`<div class="space-y-3" data-v-15ddfefa><div class="h-10 flex items-end gap-1 px-1 opacity-10" data-v-15ddfefa><!--[-->`);
          ssrRenderList([30, 50, 40, 70, 90, 60], (h) => {
            _push(`<div style="${ssrRenderStyle({ height: h + "%" })}" class="flex-1 bg-slate-400 rounded-t-sm" data-v-15ddfefa></div>`);
          });
          _push(`<!--]--></div><p class="text-[10px] font-bold text-indigo-500 capitalize" data-v-15ddfefa>Unlock Architect projections `);
          _push(ssrRenderComponent(unref(ArrowRight), { size: 10 }, null, _parent));
          _push(`</p></div>`);
        }
        _push(`</div><div class="col-span-12 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer" data-v-15ddfefa><div class="flex items-center justify-between mb-4" data-v-15ddfefa><div class="flex items-center gap-3" data-v-15ddfefa>`);
        _push(ssrRenderComponent(unref(Target), {
          size: 18,
          class: "text-emerald-500"
        }, null, _parent));
        _push(`<h3 class="text-lg font-bold text-slate-900 dark:text-white" data-v-15ddfefa>Goal progress</h3></div><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-15ddfefa>${ssrInterpolate(__props.synergy.goals.active)} Active</span></div>`);
        if (__props.synergy.goals.top_goal) {
          _push(`<div class="w-full bg-slate-50 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden" data-v-15ddfefa><div class="h-full bg-emerald-500 transition-all duration-1000" style="${ssrRenderStyle(`width: ${__props.synergy.goals.top_goal.percent}%`)}" data-v-15ddfefa></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><!--]-->`);
      } else if (__props.synergy) {
        _push(`<!--[--><header class="mb-16" data-v-15ddfefa><div class="flex items-center gap-3 mb-4 text-slate-400" data-v-15ddfefa>`);
        _push(ssrRenderComponent(unref(Brain), { size: 16 }, null, _parent));
        _push(`<span class="text-xs font-semibold uppercase tracking-widest" data-v-15ddfefa>${ssrInterpolate(__props.synergy.date_formatted)}</span></div><h1 class="text-5xl font-bold text-slate-900 dark:text-white tracking-tight" data-v-15ddfefa>${ssrInterpolate(_ctx.$t(greetingKey.value))}, ${ssrInterpolate(unref(user).name.split(" ")[0])}</h1></header><div class="grid grid-cols-12 gap-8" data-v-15ddfefa><div class="col-span-4 space-y-8" data-v-15ddfefa><div class="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm" data-v-15ddfefa><h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10" data-v-15ddfefa>Life synergy status</h3><div class="flex items-center gap-10" data-v-15ddfefa><div class="relative w-32 h-32 flex items-center justify-center" data-v-15ddfefa><svg class="absolute w-full h-full -rotate-90" viewBox="0 0 100 100" data-v-15ddfefa><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="6" class="text-slate-50 dark:text-slate-800" data-v-15ddfefa></circle><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", 276)}${ssrRenderAttr("stroke-dashoffset", 276 - 276 * overallScore.value / 100)} class="${ssrRenderClass([unref(isQuantum) ? "text-violet-500" : "text-indigo-500", "transition-all duration-[2000ms]"])}" data-v-15ddfefa></circle></svg><span class="text-4xl font-bold tabular-nums text-slate-900 dark:text-white" data-v-15ddfefa>${ssrInterpolate(overallScore.value)}%</span></div><div class="space-y-1" data-v-15ddfefa><p class="text-lg font-bold text-slate-900 dark:text-white" data-v-15ddfefa>Productivity pulse</p><p class="text-sm text-slate-400 leading-relaxed" data-v-15ddfefa>System balance is currently optimized for performance.</p></div></div></div><div class="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer group active:scale-[0.99] transition-all" data-v-15ddfefa><div class="flex items-center justify-between mb-8" data-v-15ddfefa><div class="flex items-center gap-3" data-v-15ddfefa>`);
        _push(ssrRenderComponent(unref(Brain), {
          size: 20,
          class: "text-indigo-500"
        }, null, _parent));
        _push(`<h3 class="text-lg font-bold text-slate-900 dark:text-white" data-v-15ddfefa>Neural coach</h3></div>`);
        if (unref(isExplorer)) {
          _push(`<div class="px-2 py-1 bg-indigo-50 text-[10px] font-bold text-indigo-600 rounded" data-v-15ddfefa>PRO</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(isExplorer)) {
          _push(`<div class="space-y-3 opacity-30" data-v-15ddfefa><div class="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full" data-v-15ddfefa></div><div class="h-2 w-4/5 bg-slate-100 dark:bg-slate-800 rounded-full" data-v-15ddfefa></div></div>`);
        } else {
          _push(`<p class="text-sm text-slate-500 leading-relaxed" data-v-15ddfefa>${ssrInterpolate(((_b = globalInsight.value) == null ? void 0 : _b.summary) || "Neural engine active and monitoring your workflows.")}</p>`);
        }
        _push(`<div class="mt-8 flex items-center gap-2 text-indigo-600 text-xs font-bold" data-v-15ddfefa>${ssrInterpolate(unref(isExplorer) ? "Unlock coaching insights" : "Open Neural Hub")} `);
        _push(ssrRenderComponent(unref(ArrowRight), { size: 14 }, null, _parent));
        _push(`</div></div></div><div class="col-span-8 grid grid-cols-2 gap-8" data-v-15ddfefa><div class="col-span-2 bg-slate-900 p-12 rounded-[3.5rem] text-white relative overflow-hidden group cursor-pointer shadow-xl" data-v-15ddfefa><div class="relative z-10 flex items-center justify-between" data-v-15ddfefa><div class="space-y-8" data-v-15ddfefa><h3 class="text-2xl font-bold tracking-tight" data-v-15ddfefa>Finance overview</h3><div class="flex gap-16" data-v-15ddfefa><div data-v-15ddfefa><p class="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1" data-v-15ddfefa>Total expenses</p><p class="text-4xl font-bold tabular-nums" data-v-15ddfefa>${ssrInterpolate(formatRupiah(__props.synergy.finance.expense))}</p></div><div data-v-15ddfefa><p class="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1" data-v-15ddfefa>Current balance</p><p class="text-4xl font-bold text-emerald-400 tabular-nums" data-v-15ddfefa>+${ssrInterpolate(formatRupiah(__props.synergy.finance.income - __props.synergy.finance.expense))}</p></div></div></div><div class="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-700" data-v-15ddfefa>`);
        _push(ssrRenderComponent(unref(TrendingUp), {
          size: 40,
          class: "text-indigo-400"
        }, null, _parent));
        _push(`</div></div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "finance",
          size: "300",
          class: "absolute -right-20 -bottom-20 opacity-5"
        }, null, _parent));
        _push(`</div><div class="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm group cursor-pointer hover:shadow-md transition-all" data-v-15ddfefa><div class="flex items-center justify-between mb-10" data-v-15ddfefa><div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center" data-v-15ddfefa>`);
        _push(ssrRenderComponent(unref(Target), { size: 24 }, null, _parent));
        _push(`</div><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-15ddfefa>${ssrInterpolate(__props.synergy.goals.active)} Active targets</span></div><h4 class="text-xl font-bold text-slate-900 dark:text-white mb-2" data-v-15ddfefa>Goal progress</h4><p class="text-sm text-slate-400 mb-8" data-v-15ddfefa>Tracking your strategic milestones across all categories.</p>`);
        if (__props.synergy.goals.top_goal) {
          _push(`<div class="w-full bg-slate-50 dark:bg-slate-800 h-2 rounded-full overflow-hidden" data-v-15ddfefa><div class="h-full bg-emerald-500 transition-all duration-1000" style="${ssrRenderStyle(`width: ${__props.synergy.goals.top_goal.percent}%`)}" data-v-15ddfefa></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm group cursor-pointer hover:shadow-md transition-all" data-v-15ddfefa><div class="flex items-center justify-between mb-10" data-v-15ddfefa><div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-2xl flex items-center justify-center" data-v-15ddfefa>`);
        _push(ssrRenderComponent(unref(Zap), { size: 24 }, null, _parent));
        _push(`</div><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-15ddfefa>${ssrInterpolate(__props.synergy.habits.completed)} / ${ssrInterpolate(__props.synergy.habits.total)} Today</span></div><h4 class="text-xl font-bold text-slate-900 dark:text-white mb-2" data-v-15ddfefa>Habit systems</h4><p class="text-sm text-slate-400 mb-8" data-v-15ddfefa>Maintain your streaks and build long-term consistency.</p><div class="w-full h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden" data-v-15ddfefa><div class="h-full bg-indigo-500 transition-all duration-1000" style="${ssrRenderStyle(`width: ${__props.synergy.habits.percent}%`)}" data-v-15ddfefa></div></div></div></div></div><!--]-->`);
      } else {
        _push(`<div class="grid grid-cols-12 gap-8" data-v-15ddfefa><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 animate-pulse h-80" data-v-15ddfefa><div class="w-12 h-12 bg-slate-100 rounded-xl mb-8" data-v-15ddfefa></div><div class="h-8 w-3/4 bg-slate-100 rounded-lg mb-4" data-v-15ddfefa></div><div class="h-20 w-full bg-slate-50 rounded-2xl" data-v-15ddfefa></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(ssrRenderComponent(_sfc_main$2, {
        isOpen: isPreviewOpen.value,
        module: activePreviewModule.value,
        onClose: ($event) => isPreviewOpen.value = false
      }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-15ddfefa"]]);
export {
  Dashboard as default
};
