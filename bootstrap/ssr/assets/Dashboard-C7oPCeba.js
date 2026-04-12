import { ref, computed, onMounted, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-LxN20lxq.js";
import { usePage, Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BiMr3Mnd.js";
import { u as useGating } from "./useGating-DZoi6H2L.js";
import { Plus, TrendingUp, Zap, Brain, ArrowRight, ChevronRight, Sparkles, LayoutDashboard, BookOpen, Target, CalendarDays, Wallet, Gem } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useAppearance-rDoGVD4_.js";
import "laravel-vue-i18n";
import "dayjs";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AuthenticatedLayout }, {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    synergy: Object,
    trend: {
      type: Array,
      default: () => []
    },
    stats: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const { isExplorer, isAiEnabled } = useGating();
    const page = usePage();
    const props = __props;
    const globalInsight = ref(null);
    const loadingInsight = ref(false);
    const fetchInsight = async () => {
      if (loadingInsight.value || !isAiEnabled.value) {
        return;
      }
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
      if (hour < 11) {
        return "dash_greet_morning";
      }
      if (hour < 15) {
        return "dash_greet_afternoon";
      }
      if (hour < 19) {
        return "dash_greet_evening";
      }
      return "dash_greet_night";
    });
    const firstName = computed(() => {
      var _a, _b;
      const name = (_b = (_a = page.props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.name;
      return name ? name.split(" ")[0] : "";
    });
    const formatRupiah = (number) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
      }).format(number ?? 0);
    };
    const overallScore = computed(() => {
      if (!props.synergy) {
        return 0;
      }
      const scores = [props.synergy.habits.percent, props.synergy.planner.percent];
      if (!isExplorer.value) {
        if (props.synergy.goals.top_goal) {
          scores.push(props.synergy.goals.top_goal.percent);
        }
        scores.push(props.synergy.journal.is_written ? 100 : 0);
      }
      return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    });
    const trendMax = computed(() => {
      var _a;
      if (!((_a = props.trend) == null ? void 0 : _a.length)) {
        return 100;
      }
      return Math.max(...props.trend.map((d) => d.score ?? 0), 1);
    });
    const plannerTaskCount = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.synergy) == null ? void 0 : _a.planner) == null ? void 0 : _b.total) ?? 0;
    });
    onMounted(() => {
      if (isAiEnabled.value) {
        fetchInsight();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("nav_dashboard")
      }, null, _parent));
      _push(`<div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors duration-500" data-v-496c3553><div class="pointer-events-none fixed inset-x-0 top-0 h-48 bg-gradient-to-b from-indigo-500/[0.06] to-transparent dark:from-indigo-500/10" data-v-496c3553></div><div class="relative mx-auto w-full max-w-[1600px] px-4 py-6 md:px-6 md:py-8 lg:px-8" data-v-496c3553><header class="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-v-496c3553><div class="min-w-0" data-v-496c3553><p class="mb-1 text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400" data-v-496c3553>${ssrInterpolate((_a = __props.synergy) == null ? void 0 : _a.date_formatted)}</p><h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl" data-v-496c3553>${ssrInterpolate(_ctx.$t(greetingKey.value))}, <span class="text-indigo-600 dark:text-indigo-400" data-v-496c3553>${ssrInterpolate(firstName.value)}</span></h1><p class="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_today_subtitle"))}</p></div><div class="flex shrink-0 items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-900/90" role="status"${ssrRenderAttr("aria-label", _ctx.$t("dash_synergy") + " " + overallScore.value + "%")} data-v-496c3553><div class="relative flex h-14 w-14 items-center justify-center md:h-16 md:w-16" data-v-496c3553><svg class="absolute h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true" data-v-496c3553><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="5" class="text-slate-100 dark:text-slate-800" data-v-496c3553></circle><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", 264)}${ssrRenderAttr("stroke-dashoffset", 264 - 264 * overallScore.value / 100)} class="text-indigo-500 transition-all duration-1000 dark:text-indigo-400" data-v-496c3553></circle></svg><span class="text-base font-bold tabular-nums text-slate-900 dark:text-white md:text-lg" data-v-496c3553>${ssrInterpolate(overallScore.value)}%</span></div><div class="min-w-0 pr-1" data-v-496c3553><p class="text-[10px] font-semibold uppercase tracking-wide text-slate-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_synergy"))}</p><p class="text-xs font-medium leading-snug text-slate-600 dark:text-slate-300" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_pulse_desc"))}</p></div></div></header><div class="mb-8 overflow-x-auto scroll-smooth no-scrollbar" data-v-496c3553><div class="flex w-max items-center gap-2" data-v-496c3553>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("planner.index"),
        class: "flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Plus), {
              size: 14,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(_ctx.$t("btn_add_task"))}`);
          } else {
            return [
              createVNode(unref(Plus), {
                size: 14,
                "stroke-width": "2.5"
              }),
              createTextVNode(" " + toDisplayString(_ctx.$t("btn_add_task")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("finance.index"),
        class: "flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TrendingUp), {
              size: 14,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(_ctx.$t("btn_log_expense"))}`);
          } else {
            return [
              createVNode(unref(TrendingUp), {
                size: 14,
                "stroke-width": "2.5"
              }),
              createTextVNode(" " + toDisplayString(_ctx.$t("btn_log_expense")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("habits.index"),
        class: "flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Zap), {
              size: 14,
              "stroke-width": "2.5"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(_ctx.$t("btn_check_habit"))}`);
          } else {
            return [
              createVNode(unref(Zap), {
                size: 14,
                "stroke-width": "2.5"
              }),
              createTextVNode(" " + toDisplayString(_ctx.$t("btn_check_habit")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="button" class="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 active:scale-[0.98] dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200 dark:hover:bg-indigo-500/20" data-v-496c3553>`);
      _push(ssrRenderComponent(unref(Brain), {
        size: 14,
        "stroke-width": "2.5"
      }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.$t("btn_journal"))}</button></div></div><div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8" data-v-496c3553><div class="space-y-6 lg:col-span-8" data-v-496c3553><section class="bento-card bento-card-hover !rounded-2xl border-slate-200/80 p-5 shadow-sm dark:border-slate-800 md:p-6" data-v-496c3553><div class="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 pb-4 dark:border-white/5" data-v-496c3553><div data-v-496c3553><h2 class="text-lg font-bold text-slate-900 dark:text-white" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_today"))}</h2><p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_planner_tasks_today", { count: plannerTaskCount.value }))}</p></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("planner.index"),
        class: "inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("dash_schedule"))} `);
            _push2(ssrRenderComponent(unref(ArrowRight), { size: 14 }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("dash_schedule")) + " ", 1),
              createVNode(unref(ArrowRight), { size: 14 })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (((_d = (_c = (_b = __props.synergy) == null ? void 0 : _b.planner) == null ? void 0 : _c.upcoming) == null ? void 0 : _d.length) > 0) {
        _push(`<div class="space-y-2" data-v-496c3553><!--[-->`);
        ssrRenderList(__props.synergy.planner.upcoming, (task) => {
          _push(`<div class="flex items-center justify-between gap-3 rounded-xl border border-transparent bg-slate-50/80 px-3 py-3 transition hover:border-slate-200 dark:bg-white/[0.04] dark:hover:border-white/10" data-v-496c3553><div class="flex min-w-0 items-center gap-3" data-v-496c3553><span class="shrink-0 rounded-lg bg-white px-2 py-1 font-mono text-[11px] font-semibold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300" data-v-496c3553>${ssrInterpolate(task.start_time || "—")}</span><p class="truncate text-sm font-semibold text-slate-800 dark:text-slate-100" data-v-496c3553>${ssrInterpolate(task.title)}</p></div><span class="shrink-0 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_task_scheduled"))}</span></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-4 py-10 text-center dark:border-white/10 dark:bg-white/[0.02]" data-v-496c3553><p class="text-sm font-medium text-slate-600 dark:text-slate-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_all_tasks_done"))}</p>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("planner.index"),
          class: "mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Plus), { size: 14 }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(_ctx.$t("btn_add_task"))}`);
            } else {
              return [
                createVNode(unref(Plus), { size: 14 }),
                createTextVNode(" " + toDisplayString(_ctx.$t("btn_add_task")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`<div class="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 dark:border-white/5 sm:flex-row sm:items-center sm:justify-between" data-v-496c3553><div class="min-w-0 flex-1" data-v-496c3553><div class="mb-2 flex items-center justify-between gap-2" data-v-496c3553><span class="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200" data-v-496c3553>`);
      _push(ssrRenderComponent(unref(Zap), {
        class: "text-indigo-500",
        size: 16
      }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.$t("dash_habit_title"))}</span><span class="text-[11px] font-medium text-slate-500" data-v-496c3553>${ssrInterpolate(((_f = (_e = __props.synergy) == null ? void 0 : _e.habits) == null ? void 0 : _f.completed) ?? 0)}/${ssrInterpolate(((_h = (_g = __props.synergy) == null ? void 0 : _g.habits) == null ? void 0 : _h.total) ?? 0)} ${ssrInterpolate(_ctx.$t("dash_done"))}</span></div><div class="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10" data-v-496c3553><div class="h-full rounded-full bg-indigo-600 transition-all duration-700 dark:bg-indigo-400" style="${ssrRenderStyle(`width: ${((_j = (_i = __props.synergy) == null ? void 0 : _i.habits) == null ? void 0 : _j.percent) ?? 0}%`)}" data-v-496c3553></div></div></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("habits.index"),
        class: "inline-flex shrink-0 items-center justify-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("btn_check_habit"))} `);
            _push2(ssrRenderComponent(unref(ChevronRight), { size: 14 }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("btn_check_habit")) + " ", 1),
              createVNode(unref(ChevronRight), { size: 14 })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      if (unref(isAiEnabled)) {
        _push(`<div class="bento-card bento-card-hover !cursor-pointer !rounded-2xl border-indigo-200/60 bg-gradient-to-br from-slate-900 to-indigo-950 p-5 text-white shadow-md dark:border-indigo-500/20 md:p-6" role="button" tabindex="0" data-v-496c3553><div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-v-496c3553><div class="min-w-0 flex-1" data-v-496c3553><div class="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-indigo-200" data-v-496c3553>`);
        _push(ssrRenderComponent(unref(Sparkles), {
          size: 12,
          class: "text-indigo-300"
        }, null, _parent));
        _push(` ${ssrInterpolate(_ctx.$t("dash_neural_active"))}</div><p class="text-base font-bold leading-snug md:text-lg" data-v-496c3553>${ssrInterpolate(loadingInsight.value ? _ctx.$t("dash_neural_default_summary") : ((_k = globalInsight.value) == null ? void 0 : _k.summary) || _ctx.$t("dash_neural_default_summary"))}</p><p class="mt-2 text-xs font-medium text-indigo-200/80" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_open_hub"))} `);
        _push(ssrRenderComponent(unref(ArrowRight), {
          size: 12,
          class: "inline align-middle"
        }, null, _parent));
        _push(`</p></div><div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5" data-v-496c3553>`);
        _push(ssrRenderComponent(unref(Brain), {
          size: 28,
          class: "text-indigo-200"
        }, null, _parent));
        _push(`</div></div></div>`);
      } else if (unref(isExplorer)) {
        _push(`<div class="bento-card !rounded-2xl border-slate-200/80 p-5 dark:border-slate-800 md:flex md:items-center md:justify-between md:gap-6 md:p-6" data-v-496c3553><div class="flex gap-4" data-v-496c3553><div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-indigo-500/15 dark:text-indigo-300" data-v-496c3553>`);
        _push(ssrRenderComponent(unref(LayoutDashboard), { size: 24 }, null, _parent));
        _push(`</div><div class="min-w-0" data-v-496c3553><h3 class="text-base font-bold text-slate-900 dark:text-white" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_explorer_rank"))}</h3><p class="mt-1 text-sm text-slate-500 dark:text-slate-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_explorer_desc"))}</p></div></div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("billing"),
          class: "mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 md:mt-0 md:w-auto dark:bg-indigo-600 dark:hover:bg-indigo-500"
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
      } else {
        _push(`<div class="bento-card !rounded-2xl border-slate-200/80 p-5 dark:border-slate-800 md:p-6" data-v-496c3553><h3 class="text-base font-bold text-slate-900 dark:text-white" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_architect_brief_title"))}</h3><p class="mt-1 text-sm text-slate-500 dark:text-slate-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_architect_brief_desc"))}</p><p class="mt-3 text-xs text-indigo-600 dark:text-indigo-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_quantum_teaser"))}</p><div class="mt-5 grid gap-2 sm:grid-cols-2" data-v-496c3553>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("journal.index"),
          class: "flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/10"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(BookOpen), {
                class: "text-indigo-500",
                size: 18
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(_ctx.$t("dash_journal_title"))} `);
              _push2(ssrRenderComponent(unref(ChevronRight), {
                class: "ml-auto text-slate-400",
                size: 16
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(BookOpen), {
                  class: "text-indigo-500",
                  size: 18
                }),
                createTextVNode(" " + toDisplayString(_ctx.$t("dash_journal_title")) + " ", 1),
                createVNode(unref(ChevronRight), {
                  class: "ml-auto text-slate-400",
                  size: 16
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("goals.index"),
          class: "flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/10"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Target), {
                class: "text-amber-500",
                size: 18
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(_ctx.$t("dash_goal_progress"))} `);
              _push2(ssrRenderComponent(unref(ChevronRight), {
                class: "ml-auto text-slate-400",
                size: 16
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Target), {
                  class: "text-amber-500",
                  size: 18
                }),
                createTextVNode(" " + toDisplayString(_ctx.$t("dash_goal_progress")) + " ", 1),
                createVNode(unref(ChevronRight), {
                  class: "ml-auto text-slate-400",
                  size: 16
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("calendar.index"),
          class: "flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/10 sm:col-span-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CalendarDays), {
                class: "text-emerald-500",
                size: 18
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(_ctx.$t("dash_calendar_title"))} `);
              _push2(ssrRenderComponent(unref(ChevronRight), {
                class: "ml-auto text-slate-400",
                size: 16
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(CalendarDays), {
                  class: "text-emerald-500",
                  size: 18
                }),
                createTextVNode(" " + toDisplayString(_ctx.$t("dash_calendar_title")) + " ", 1),
                createVNode(unref(ChevronRight), {
                  class: "ml-auto text-slate-400",
                  size: 16
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div><aside class="space-y-4 lg:col-span-4" data-v-496c3553><div class="bento-card !rounded-2xl p-4 md:p-5" data-v-496c3553><h3 class="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_weekly_rhythm"))}</h3>`);
      if ((_l = __props.trend) == null ? void 0 : _l.length) {
        _push(`<div class="mt-4 flex h-28 items-end justify-between gap-1" data-v-496c3553><!--[-->`);
        ssrRenderList(__props.trend, (day, idx) => {
          _push(`<div class="flex min-w-0 flex-1 flex-col items-center justify-end gap-1" data-v-496c3553><div class="w-full max-w-[28px] rounded-t bg-indigo-500/85 dark:bg-indigo-400/80" style="${ssrRenderStyle({ height: `${Math.max(8, day.score / trendMax.value * 100)}%` })}"${ssrRenderAttr("title", String(day.score))} data-v-496c3553></div><span class="truncate text-[9px] font-medium text-slate-400" data-v-496c3553>${ssrInterpolate(day.day)}</span></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="mt-4 text-xs text-slate-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_weekly_rhythm_empty"))}</p>`);
      }
      _push(`</div><div class="${ssrRenderClass([unref(isExplorer) ? "cursor-default" : "cursor-pointer", "bento-card bento-card-hover !rounded-2xl p-4 md:p-5"])}" data-v-496c3553><div class="mb-3 flex items-center justify-between" data-v-496c3553><span class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white" data-v-496c3553>`);
      _push(ssrRenderComponent(unref(Wallet), {
        class: "text-emerald-600 dark:text-emerald-400",
        size: 18
      }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.$t("dash_finance_overview"))}</span>`);
      if (!unref(isExplorer)) {
        _push(ssrRenderComponent(unref(TrendingUp), {
          size: 14,
          class: "text-slate-400"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!unref(isExplorer)) {
        _push(`<div class="space-y-3" data-v-496c3553><div data-v-496c3553><p class="text-[10px] font-semibold uppercase tracking-wide text-slate-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_total_expenses"))}</p><p class="text-lg font-bold tabular-nums text-slate-900 dark:text-white" data-v-496c3553>${ssrInterpolate(formatRupiah((_n = (_m = __props.synergy) == null ? void 0 : _m.finance) == null ? void 0 : _n.expense))}</p></div>`);
        if ((((_p = (_o = __props.synergy) == null ? void 0 : _o.finance) == null ? void 0 : _p.income) ?? 0) > 0) {
          _push(`<div class="border-t border-slate-100 pt-3 dark:border-white/5" data-v-496c3553><p class="text-[10px] font-semibold uppercase tracking-wide text-slate-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_income"))}</p><p class="text-sm font-semibold tabular-nums text-emerald-700 dark:text-emerald-400" data-v-496c3553>${ssrInterpolate(formatRupiah((_r = (_q = __props.synergy) == null ? void 0 : _q.finance) == null ? void 0 : _r.income))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-8 dark:border-white/10" data-v-496c3553>`);
        _push(ssrRenderComponent(unref(Gem), {
          size: 22,
          class: "text-indigo-500"
        }, null, _parent));
        _push(`<p class="mt-3 text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_unlock_arch"))}</p>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("billing"),
          class: "mt-3 text-[11px] font-semibold text-slate-500 underline dark:text-slate-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("dash_view_new_plans"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("dash_view_new_plans")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
      if (!unref(isExplorer)) {
        _push(`<div class="bento-card bento-card-hover !cursor-pointer !rounded-2xl p-4 md:p-5" data-v-496c3553><div class="mb-3 flex items-center justify-between" data-v-496c3553><span class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white" data-v-496c3553>`);
        _push(ssrRenderComponent(unref(Target), {
          class: "text-amber-600 dark:text-amber-400",
          size: 18
        }, null, _parent));
        _push(` ${ssrInterpolate(_ctx.$t("dash_goal_progress"))}</span>`);
        _push(ssrRenderComponent(unref(ChevronRight), {
          size: 14,
          class: "text-slate-400"
        }, null, _parent));
        _push(`</div>`);
        if ((_t = (_s = __props.synergy) == null ? void 0 : _s.goals) == null ? void 0 : _t.top_goal) {
          _push(`<!--[--><p class="line-clamp-2 text-xs font-medium text-slate-500 dark:text-slate-400" data-v-496c3553>${ssrInterpolate(__props.synergy.goals.top_goal.title)}</p><div class="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10" data-v-496c3553><div class="h-full rounded-full bg-amber-500 transition-all duration-700" style="${ssrRenderStyle(`width: ${__props.synergy.goals.top_goal.percent}%`)}" data-v-496c3553></div></div><!--]-->`);
        } else {
          _push(`<p class="text-xs font-medium text-slate-500 dark:text-slate-400" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_goal_empty_cta"))}</p>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(isExplorer)) {
        _push(`<div class="bento-card !rounded-2xl p-4 md:p-5" data-v-496c3553><div class="flex items-center justify-between gap-2" data-v-496c3553><span class="text-sm font-bold text-slate-900 dark:text-white" data-v-496c3553>${ssrInterpolate(_ctx.$t("dash_journal_title"))}</span><span class="${ssrRenderClass([
          ((_v = (_u = __props.synergy) == null ? void 0 : _u.journal) == null ? void 0 : _v.is_written) ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400",
          "rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase"
        ])}" data-v-496c3553>${ssrInterpolate(((_x = (_w = __props.synergy) == null ? void 0 : _w.journal) == null ? void 0 : _x.is_written) ? _ctx.$t("dash_journal_written_status") : _ctx.$t("dash_pending"))}</span></div>`);
        if (((_z = (_y = __props.synergy) == null ? void 0 : _y.journal) == null ? void 0 : _z.is_written) && ((_B = (_A = __props.synergy) == null ? void 0 : _A.journal) == null ? void 0 : _B.id)) {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("journal.write", __props.synergy.journal.id),
            class: "mt-3 inline-flex text-xs font-semibold text-indigo-600 dark:text-indigo-400"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("dash_journal_continue"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$t("dash_journal_continue")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("journal.index"),
            class: "mt-3 inline-flex text-xs font-semibold text-indigo-600 dark:text-indigo-400"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("dash_journal_start"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$t("dash_journal_start")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</aside></div>`);
      if (unref(isExplorer)) {
        _push(`<div class="mt-10" data-v-496c3553>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("billing"),
          class: "bento-card bento-card-hover !flex !rounded-2xl items-center gap-4 border-indigo-100/80 p-5 shadow-sm transition md:gap-6 md:p-6 dark:border-indigo-500/20"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white md:h-14 md:w-14" data-v-496c3553${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "premium",
                size: "26"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="min-w-0 flex-1" data-v-496c3553${_scopeId}><h3 class="text-base font-bold text-slate-900 dark:text-white md:text-lg" data-v-496c3553${_scopeId}>${ssrInterpolate(_ctx.$t("dash_upgrade_tier_title"))}</h3><p class="mt-1 text-sm text-slate-500 dark:text-slate-400" data-v-496c3553${_scopeId}>${ssrInterpolate(_ctx.$t("dash_upgrade_tier_desc"))}</p></div><span class="hidden shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white sm:inline-flex dark:bg-indigo-600" data-v-496c3553${_scopeId}>${ssrInterpolate(_ctx.$t("dash_view_new_plans"))} `);
              _push2(ssrRenderComponent(unref(ArrowRight), { size: 14 }, null, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              return [
                createVNode("div", { class: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white md:h-14 md:w-14" }, [
                  createVNode(_sfc_main$1, {
                    name: "premium",
                    size: "26"
                  })
                ]),
                createVNode("div", { class: "min-w-0 flex-1" }, [
                  createVNode("h3", { class: "text-base font-bold text-slate-900 dark:text-white md:text-lg" }, toDisplayString(_ctx.$t("dash_upgrade_tier_title")), 1),
                  createVNode("p", { class: "mt-1 text-sm text-slate-500 dark:text-slate-400" }, toDisplayString(_ctx.$t("dash_upgrade_tier_desc")), 1)
                ]),
                createVNode("span", { class: "hidden shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white sm:inline-flex dark:bg-indigo-600" }, [
                  createTextVNode(toDisplayString(_ctx.$t("dash_view_new_plans")) + " ", 1),
                  createVNode(unref(ArrowRight), { size: 14 })
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
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-496c3553"]]);
export {
  Dashboard as default
};
