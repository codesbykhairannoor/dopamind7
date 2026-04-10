import { ref, computed, onMounted, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-B-DYe1pG.js";
import { usePage, Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import { u as useGating } from "./useGating-_5WV009x.js";
import { Plus, TrendingUp, Zap, Brain, Clock, ArrowRight, Sparkles, LayoutDashboard, Wallet, Gem, Target, ChevronRight } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ThemeToggle-ByQSx4Ee.js";
import "./useAppearance-rDoGVD4_.js";
import "./Modal-b6JySqy_.js";
import "dayjs";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AuthenticatedLayout }, {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    synergy: Object,
    trend: Array,
    stats: Object
  },
  setup(__props) {
    const { isExplorer } = useGating();
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
      if (!isExplorer.value) {
        if (props.synergy.goals.top_goal) scores.push(props.synergy.goals.top_goal.percent);
        scores.push(props.synergy.journal.is_written ? 100 : 0);
      }
      return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    });
    const isMobile = ref(false);
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
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("nav_dashboard")
      }, null, _parent));
      _push(`<div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 transition-colors duration-500" data-v-f5227db8><div class="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10" data-v-f5227db8></div><div class="w-full lg:max-w-[1400px] mx-auto p-4 md:p-8 lg:p-12" data-v-f5227db8><header class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pt-8" data-v-f5227db8><div data-v-f5227db8><div class="flex items-center gap-2 mb-3" data-v-f5227db8><span class="w-8 h-[2px] bg-indigo-500 rounded-full" data-v-f5227db8></span><p class="text-indigo-500 dark:text-indigo-400 font-black uppercase tracking-[0.3em] text-[9px]" data-v-f5227db8>${ssrInterpolate((_a = __props.synergy) == null ? void 0 : _a.date_formatted)}</p></div><h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none" data-v-f5227db8>${ssrInterpolate(_ctx.$t(greetingKey.value))},<br class="md:hidden" data-v-f5227db8><span class="text-indigo-600 dark:text-indigo-400" data-v-f5227db8>${ssrInterpolate(unref(user).name.split(" ")[0])}</span></h1></div><div class="flex items-center gap-6 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-700 active:scale-95 group cursor-default ultra-shadow" data-v-f5227db8><div class="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center" data-v-f5227db8><svg class="absolute w-full h-full -rotate-90" viewBox="0 0 100 100" data-v-f5227db8><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="6" class="text-slate-50 dark:text-slate-800" data-v-f5227db8></circle><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", 276)}${ssrRenderAttr("stroke-dashoffset", 276 - 276 * overallScore.value / 100)} class="text-indigo-500 dark:text-indigo-400 transition-all duration-[2000ms]" data-v-f5227db8></circle></svg><span class="text-xl md:text-2xl font-black text-slate-900 dark:text-white" data-v-f5227db8>${ssrInterpolate(overallScore.value)}%</span></div><div data-v-f5227db8><p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5" data-v-f5227db8>${ssrInterpolate(_ctx.$t("dash_synergy"))}</p><p class="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight" data-v-f5227db8> System Balance<br data-v-f5227db8>Optimized </p></div></div></header><div class="mb-12 overflow-x-auto no-scrollbar scroll-smooth" data-v-f5227db8><div class="flex items-center gap-3 w-max" data-v-f5227db8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("planner.index"),
        class: "flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Plus), {
              size: 14,
              "stroke-width": "3"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(_ctx.$t("btn_add_task", "New Task"))}`);
          } else {
            return [
              createVNode(unref(Plus), {
                size: 14,
                "stroke-width": "3"
              }),
              createTextVNode(" " + toDisplayString(_ctx.$t("btn_add_task", "New Task")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("finance.index"),
        class: "flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-indigo-400 px-5 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-indigo-500/10 transition-all shadow-sm active:scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TrendingUp), {
              size: 14,
              "stroke-width": "3"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(_ctx.$t("btn_log_expense", "Record Cash"))}`);
          } else {
            return [
              createVNode(unref(TrendingUp), {
                size: 14,
                "stroke-width": "3"
              }),
              createTextVNode(" " + toDisplayString(_ctx.$t("btn_log_expense", "Record Cash")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("habits.index"),
        class: "flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-indigo-400 px-5 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-indigo-500/10 transition-all shadow-sm active:scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Zap), {
              size: 14,
              "stroke-width": "3"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(_ctx.$t("btn_check_habit", "Daily Streak"))}`);
          } else {
            return [
              createVNode(unref(Zap), {
                size: 14,
                "stroke-width": "3"
              }),
              createTextVNode(" " + toDisplayString(_ctx.$t("btn_check_habit", "Daily Streak")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!unref(isExplorer)) {
        _push(`<div class="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 px-5 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20 hover:bg-indigo-100 transition-all cursor-pointer shadow-sm active:scale-95" data-v-f5227db8>`);
        _push(ssrRenderComponent(unref(Brain), {
          size: 14,
          "stroke-width": "3"
        }, null, _parent));
        _push(` ${ssrInterpolate(_ctx.$t("btn_journal", "Self Reflect"))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="grid grid-cols-12 gap-6 md:gap-8" data-v-f5227db8><div class="col-span-12 lg:col-span-8 space-y-8" data-v-f5227db8><div class="bento-card p-8 md:p-10 relative overflow-hidden group" data-v-f5227db8><div class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" data-v-f5227db8></div><div class="relative z-10" data-v-f5227db8><div class="flex items-center justify-between mb-10" data-v-f5227db8><div class="flex items-center gap-4" data-v-f5227db8><div class="w-12 h-12 bg-slate-900 dark:bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 dark:shadow-none" data-v-f5227db8>`);
      _push(ssrRenderComponent(unref(Clock), { size: 24 }, null, _parent));
      _push(`</div><div data-v-f5227db8><h3 class="text-xl font-black text-slate-900 dark:text-white tracking-tighter" data-v-f5227db8>${ssrInterpolate(_ctx.$t("dash_schedule"))}</h3><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-f5227db8>${ssrInterpolate((_b = __props.synergy) == null ? void 0 : _b.planner.total)} Active Protocols</p></div></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("planner.index"),
        class: "w-10 h-10 rounded-full border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowRight), { size: 16 }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ArrowRight), { size: 16 })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (((_c = __props.synergy) == null ? void 0 : _c.planner.upcoming.length) > 0) {
        _push(`<div class="space-y-4" data-v-f5227db8><!--[-->`);
        ssrRenderList(__props.synergy.planner.upcoming, (task) => {
          _push(`<div class="flex items-center justify-between p-5 bg-slate-50/50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-white/10 transition-all" data-v-f5227db8><div class="flex items-center gap-4" data-v-f5227db8><div class="w-2 h-10 bg-indigo-500 rounded-full" data-v-f5227db8></div><div data-v-f5227db8><p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1" data-v-f5227db8>${ssrInterpolate(task.start_time || "--:--")}</p><h4 class="font-black text-slate-800 dark:text-white tracking-tight" data-v-f5227db8>${ssrInterpolate(task.task)}</h4></div></div><div class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg" data-v-f5227db8> In Progress </div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="py-12 text-center" data-v-f5227db8><p class="text-sm font-bold text-slate-400" data-v-f5227db8>${ssrInterpolate(_ctx.$t("dash_all_tasks_done"))}</p></div>`);
      }
      _push(`</div></div>`);
      if (!unref(isExplorer)) {
        _push(`<div class="bento-card p-10 bg-slate-900 dark:bg-indigo-950 text-white relative overflow-hidden group cursor-pointer" data-v-f5227db8><div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" data-v-f5227db8></div><div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10" data-v-f5227db8><div class="max-w-xl" data-v-f5227db8><div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-indigo-300 text-[9px] font-black mb-6 uppercase tracking-[0.2em] backdrop-blur-md border border-white/5 animate-pulse" data-v-f5227db8>`);
        _push(ssrRenderComponent(unref(Sparkles), { size: 12 }, null, _parent));
        _push(`<span data-v-f5227db8>${ssrInterpolate(_ctx.$t("dash_neural_active"))}</span></div><h4 class="text-3xl font-black mb-4 tracking-tighter leading-tight group-hover:translate-x-1 transition-transform" data-v-f5227db8>${ssrInterpolate(((_d = globalInsight.value) == null ? void 0 : _d.summary) || _ctx.$t("dash_neural_default_summary"))}</h4><p class="text-indigo-200/60 text-xs font-bold uppercase tracking-widest" data-v-f5227db8>Tap to open Neural Hub `);
        _push(ssrRenderComponent(unref(ArrowRight), {
          size: 10,
          class: "inline ml-1"
        }, null, _parent));
        _push(`</p></div><div class="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center border border-white/10 group-hover:rotate-12 transition-all duration-700" data-v-f5227db8>`);
        _push(ssrRenderComponent(unref(Brain), {
          size: 40,
          class: "text-indigo-300"
        }, null, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<div class="bento-card p-10 flex flex-col items-center text-center group" data-v-f5227db8><div class="w-16 h-16 bg-slate-50 dark:bg-indigo-500/10 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 dark:group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 mb-6 shrink-0" data-v-f5227db8>`);
        _push(ssrRenderComponent(unref(LayoutDashboard), { size: 32 }, null, _parent));
        _push(`</div><h4 class="text-2xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter" data-v-f5227db8>${ssrInterpolate(_ctx.$t("dash_explorer_rank"))}</h4><p class="text-sm font-bold text-slate-400 dark:text-slate-500 max-w-sm mb-8" data-v-f5227db8>${ssrInterpolate(_ctx.$t("dash_explorer_desc"))}</p>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("billing"),
          class: "px-8 py-3.5 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100 dark:shadow-none transition-all active:scale-95"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("dash_upgrade_tier"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("dash_upgrade_tier")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div><div class="col-span-12 lg:col-span-4 space-y-6 md:space-y-8" data-v-f5227db8><div class="bento-card p-8 group" data-v-f5227db8><div class="flex items-center justify-between mb-8" data-v-f5227db8><div class="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" data-v-f5227db8>`);
      _push(ssrRenderComponent(unref(Zap), { size: 20 }, null, _parent));
      _push(`</div><span class="text-[9px] font-black text-slate-400 uppercase tracking-widest" data-v-f5227db8>${ssrInterpolate((_e = __props.synergy) == null ? void 0 : _e.habits.completed)}/${ssrInterpolate((_f = __props.synergy) == null ? void 0 : _f.habits.total)} Done</span></div><h4 class="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight" data-v-f5227db8>${ssrInterpolate(_ctx.$t("dash_habit_systems"))}</h4><p class="text-xs font-bold text-slate-400 mb-8" data-v-f5227db8>${ssrInterpolate(_ctx.$t("dash_habit_systems_desc"))}</p><div class="w-full h-2 bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden mb-2" data-v-f5227db8><div class="h-full bg-indigo-600 transition-all duration-[1500ms]" style="${ssrRenderStyle(`width: ${(_g = __props.synergy) == null ? void 0 : _g.habits.percent}%`)}" data-v-f5227db8></div></div></div><div class="bento-card p-8 group cursor-pointer active:scale-[0.98]" data-v-f5227db8><div class="flex items-center justify-between mb-8" data-v-f5227db8><div class="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" data-v-f5227db8>`);
      _push(ssrRenderComponent(unref(Wallet), { size: 20 }, null, _parent));
      _push(`</div> &lt; TrendingUp :size=&quot;16&quot; class=&quot;text-slate-300&quot; /&gt; </div><h4 class="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight" data-v-f5227db8>${ssrInterpolate(_ctx.$t("dash_finance_overview"))}</h4>`);
      if (!unref(isExplorer)) {
        _push(`<div class="space-y-4" data-v-f5227db8><div data-v-f5227db8><p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1" data-v-f5227db8>${ssrInterpolate(_ctx.$t("dash_total_expenses"))}</p><p class="text-2xl font-black text-slate-900 dark:text-white tabular-nums" data-v-f5227db8>${ssrInterpolate(formatRupiah((_h = __props.synergy) == null ? void 0 : _h.finance.expense))}</p></div></div>`);
      } else {
        _push(`<div class="space-y-4" data-v-f5227db8><div class="h-20 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center opacity-40" data-v-f5227db8>`);
        _push(ssrRenderComponent(unref(Gem), {
          size: 24,
          class: "text-indigo-500 animate-pulse"
        }, null, _parent));
        _push(`</div><p class="text-[9px] font-black text-indigo-500 uppercase tracking-widest" data-v-f5227db8>${ssrInterpolate(_ctx.$t("dash_unlock_arch"))}</p></div>`);
      }
      _push(`</div>`);
      if (!unref(isExplorer)) {
        _push(`<div class="bento-card p-8 group cursor-pointer active:scale-[0.98]" data-v-f5227db8><div class="flex items-center justify-between mb-8" data-v-f5227db8><div class="w-10 h-10 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" data-v-f5227db8>`);
        _push(ssrRenderComponent(unref(Target), { size: 20 }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(unref(ChevronRight), {
          size: 16,
          class: "text-slate-300"
        }, null, _parent));
        _push(`</div><h4 class="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight" data-v-f5227db8>${ssrInterpolate(_ctx.$t("dash_goal_progress"))}</h4>`);
        if ((_i = __props.synergy) == null ? void 0 : _i.goals.top_goal) {
          _push(`<div class="space-y-3" data-v-f5227db8><p class="text-xs font-bold text-slate-400 line-clamp-1" data-v-f5227db8>${ssrInterpolate(__props.synergy.goals.top_goal.title)}</p><div class="w-full h-1.5 bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden" data-v-f5227db8><div class="h-full bg-amber-500 transition-all duration-[2000ms]" style="${ssrRenderStyle(`width: ${__props.synergy.goals.top_goal.percent}%`)}" data-v-f5227db8></div></div></div>`);
        } else {
          _push(`<p class="text-xs font-bold text-slate-400" data-v-f5227db8>Assemble your first mission lab.</p>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(isExplorer)) {
        _push(`<div class="mt-12 group" data-v-f5227db8>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("billing"),
          class: "block bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-12 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden active:scale-[0.99] ultra-shadow"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/5 to-transparent hidden md:block" data-v-f5227db8${_scopeId}></div><div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10" data-v-f5227db8${_scopeId}><div class="flex items-center gap-6" data-v-f5227db8${_scopeId}><div class="w-16 h-16 bg-indigo-600 rounded-[1.8rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200 dark:shadow-none shrink-0 group-hover:rotate-12 transition-transform duration-700" data-v-f5227db8${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "premium",
                size: "32"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-f5227db8${_scopeId}><h3 class="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tighter mb-2" data-v-f5227db8${_scopeId}>${ssrInterpolate(_ctx.$t("dash_upgrade_tier_title"))}</h3><p class="text-sm font-bold text-slate-400 dark:text-slate-500 max-w-md leading-relaxed" data-v-f5227db8${_scopeId}>${ssrInterpolate(_ctx.$t("dash_upgrade_tier_desc"))}</p></div></div><div class="px-10 py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl flex items-center gap-3 transition-transform group-hover:scale-105" data-v-f5227db8${_scopeId}>${ssrInterpolate(_ctx.$t("dash_view_new_plans"))} `);
              _push2(ssrRenderComponent(unref(ArrowRight), {
                size: 16,
                "stroke-width": "3"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/5 to-transparent hidden md:block" }),
                createVNode("div", { class: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10" }, [
                  createVNode("div", { class: "flex items-center gap-6" }, [
                    createVNode("div", { class: "w-16 h-16 bg-indigo-600 rounded-[1.8rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200 dark:shadow-none shrink-0 group-hover:rotate-12 transition-transform duration-700" }, [
                      createVNode(_sfc_main$1, {
                        name: "premium",
                        size: "32"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tighter mb-2" }, toDisplayString(_ctx.$t("dash_upgrade_tier_title")), 1),
                      createVNode("p", { class: "text-sm font-bold text-slate-400 dark:text-slate-500 max-w-md leading-relaxed" }, toDisplayString(_ctx.$t("dash_upgrade_tier_desc")), 1)
                    ])
                  ]),
                  createVNode("div", { class: "px-10 py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl flex items-center gap-3 transition-transform group-hover:scale-105" }, [
                    createTextVNode(toDisplayString(_ctx.$t("dash_view_new_plans")) + " ", 1),
                    createVNode(unref(ArrowRight), {
                      size: 16,
                      "stroke-width": "3"
                    })
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f5227db8"]]);
export {
  Dashboard as default
};
