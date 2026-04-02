import { ref, onMounted, computed, unref, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-XnqvYLta.js";
import { usePage, Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./OneForMindIcon-P6BN87YE.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
    const user = usePage().props.auth.user;
    const props = __props;
    const globalInsight = ref(null);
    const loadingInsight = ref(true);
    const fetchInsight = async () => {
      try {
        const response = await axios.get(route("dashboard.insight"));
        globalInsight.value = response.data;
      } catch (error) {
        console.error("Failed to fetch neural insight:", error);
      } finally {
        loadingInsight.value = false;
      }
    };
    onMounted(() => {
      fetchInsight();
    });
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("nav_dashboard")
      }, null, _parent));
      _push(`<div class="w-full lg:max-w-[96%] mx-auto p-4 md:p-8 space-y-8 lg:space-y-12 pb-32" data-v-fa75fc1d>`);
      if (__props.synergy) {
        _push(`<header class="relative group" data-v-fa75fc1d><div class="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-14 border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none transition-all duration-500" data-v-fa75fc1d><div class="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]" data-v-fa75fc1d></div><div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10" data-v-fa75fc1d><div class="flex-1 space-y-5 text-center md:text-left" data-v-fa75fc1d><div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700" data-v-fa75fc1d><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" data-v-fa75fc1d></span><span class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest" data-v-fa75fc1d>${ssrInterpolate(__props.synergy.date_formatted)}</span></div><h1 class="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]" data-v-fa75fc1d>${ssrInterpolate(_ctx.$t(greetingKey.value))},<br data-v-fa75fc1d><span class="text-indigo-600 dark:text-indigo-400" data-v-fa75fc1d>${ssrInterpolate(unref(user).name)}</span></h1></div><div class="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center" data-v-fa75fc1d><svg class="absolute w-full h-full -rotate-90" viewBox="0 0 100 100" data-v-fa75fc1d><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="4" class="text-slate-50 dark:text-slate-800" data-v-fa75fc1d></circle><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", 276)}${ssrRenderAttr("stroke-dashoffset", 276 - 276 * overallScore.value / 100)} class="text-indigo-600 dark:text-indigo-500 transition-all duration-[1500ms] shadow-indigo-500 drop-shadow-md" data-v-fa75fc1d></circle></svg><div class="text-center" data-v-fa75fc1d><span class="block text-5xl md:text-6xl font-black text-slate-900 dark:text-white tabular-nums" data-v-fa75fc1d>${ssrInterpolate(overallScore.value)}%</span><span class="text-[9px] font-black uppercase tracking-widest text-slate-400" data-v-fa75fc1d>${ssrInterpolate(_ctx.$t("dash_synergy_today"))}</span></div></div></div></div></header>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.synergy) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10" data-v-fa75fc1d>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("habits.index"),
          class: "col-span-1 md:col-span-6 lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between overflow-hidden relative"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (_push2) {
              _push2(`<div class="relative z-10 space-y-6" data-v-fa75fc1d${_scopeId}><div class="flex justify-between items-start" data-v-fa75fc1d${_scopeId}><div class="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 group-hover:scale-110 transition-transform" data-v-fa75fc1d${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "habit",
                size: "28",
                "stroke-width": "3"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 px-4 py-1.5 rounded-xl text-xs font-black tracking-widest uppercase" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(__props.synergy.habits.completed)} / ${ssrInterpolate(__props.synergy.habits.total)}</div></div><h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(_ctx.$t("dash_habit_title"))}</h3>`);
              if (loadingInsight.value || ((_b = (_a = globalInsight.value) == null ? void 0 : _a.categories) == null ? void 0 : _b.habits)) {
                _push2(`<div class="bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100/50 dark:border-indigo-500/10 p-5 rounded-2xl" data-v-fa75fc1d${_scopeId}><div class="flex items-center gap-2 mb-2" data-v-fa75fc1d${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  name: "sparkles",
                  size: "14",
                  class: ["text-indigo-500", { "animate-spin": loadingInsight.value }]
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-[9px] font-black uppercase tracking-widest text-indigo-400" data-v-fa75fc1d${_scopeId}>Neural Sync</span></div>`);
                if (loadingInsight.value) {
                  _push2(`<p class="text-xs font-bold text-slate-400 animate-pulse tracking-tight italic" data-v-fa75fc1d${_scopeId}>Calibrating routines...</p>`);
                } else {
                  _push2(`<p class="text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug" data-v-fa75fc1d${_scopeId}>${ssrInterpolate((_d = (_c = globalInsight.value) == null ? void 0 : _c.categories) == null ? void 0 : _d.habits)}</p>`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mt-8 space-y-3" data-v-fa75fc1d${_scopeId}><div class="w-full bg-slate-50 dark:bg-slate-800 h-3 rounded-full overflow-hidden" data-v-fa75fc1d${_scopeId}><div class="bg-indigo-600 h-full rounded-full transition-all duration-1000" style="${ssrRenderStyle(`width: ${__props.synergy.habits.percent}%`)}" data-v-fa75fc1d${_scopeId}></div></div><div class="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400" data-v-fa75fc1d${_scopeId}><span data-v-fa75fc1d${_scopeId}>${ssrInterpolate(_ctx.$t("dash_progress"))}</span><span class="text-indigo-600" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(__props.synergy.habits.percent)}%</span></div></div>`);
            } else {
              return [
                createVNode("div", { class: "relative z-10 space-y-6" }, [
                  createVNode("div", { class: "flex justify-between items-start" }, [
                    createVNode("div", { class: "w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 group-hover:scale-110 transition-transform" }, [
                      createVNode(_sfc_main$1, {
                        name: "habit",
                        size: "28",
                        "stroke-width": "3"
                      })
                    ]),
                    createVNode("div", { class: "bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 px-4 py-1.5 rounded-xl text-xs font-black tracking-widest uppercase" }, toDisplayString(__props.synergy.habits.completed) + " / " + toDisplayString(__props.synergy.habits.total), 1)
                  ]),
                  createVNode("h3", { class: "text-3xl font-black text-slate-900 dark:text-white tracking-tighter" }, toDisplayString(_ctx.$t("dash_habit_title")), 1),
                  loadingInsight.value || ((_f = (_e = globalInsight.value) == null ? void 0 : _e.categories) == null ? void 0 : _f.habits) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100/50 dark:border-indigo-500/10 p-5 rounded-2xl"
                  }, [
                    createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                      createVNode(_sfc_main$1, {
                        name: "sparkles",
                        size: "14",
                        class: ["text-indigo-500", { "animate-spin": loadingInsight.value }]
                      }, null, 8, ["class"]),
                      createVNode("span", { class: "text-[9px] font-black uppercase tracking-widest text-indigo-400" }, "Neural Sync")
                    ]),
                    loadingInsight.value ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs font-bold text-slate-400 animate-pulse tracking-tight italic"
                    }, "Calibrating routines...")) : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug"
                    }, toDisplayString((_h = (_g = globalInsight.value) == null ? void 0 : _g.categories) == null ? void 0 : _h.habits), 1))
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "mt-8 space-y-3" }, [
                  createVNode("div", { class: "w-full bg-slate-50 dark:bg-slate-800 h-3 rounded-full overflow-hidden" }, [
                    createVNode("div", {
                      class: "bg-indigo-600 h-full rounded-full transition-all duration-1000",
                      style: `width: ${__props.synergy.habits.percent}%`
                    }, null, 4)
                  ]),
                  createVNode("div", { class: "flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400" }, [
                    createVNode("span", null, toDisplayString(_ctx.$t("dash_progress")), 1),
                    createVNode("span", { class: "text-indigo-600" }, toDisplayString(__props.synergy.habits.percent) + "%", 1)
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("planner.index"),
          class: "col-span-1 md:col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between overflow-hidden relative"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (_push2) {
              _push2(`<div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8" data-v-fa75fc1d${_scopeId}><div class="space-y-6" data-v-fa75fc1d${_scopeId}><div class="flex items-center gap-5" data-v-fa75fc1d${_scopeId}><div class="w-14 h-14 bg-slate-50 dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm" data-v-fa75fc1d${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "28",
                "stroke-width": "3"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-fa75fc1d${_scopeId}><h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(_ctx.$t("dash_planner_title"))}</h3><p class="text-sm font-bold text-slate-400" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(__props.synergy.planner.completed)} / ${ssrInterpolate(__props.synergy.planner.total)} ${ssrInterpolate(_ctx.$t("dash_tasks_done"))}</p></div></div>`);
              if (loadingInsight.value || ((_b = (_a = globalInsight.value) == null ? void 0 : _a.categories) == null ? void 0 : _b.planner)) {
                _push2(`<div class="bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100/50 dark:border-emerald-500/10 p-5 rounded-2xl" data-v-fa75fc1d${_scopeId}><div class="flex items-center gap-2 mb-2" data-v-fa75fc1d${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  name: "sparkles",
                  size: "14",
                  class: ["text-emerald-500", { "animate-spin": loadingInsight.value }]
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-[9px] font-black uppercase tracking-widest text-emerald-500/70" data-v-fa75fc1d${_scopeId}>Efficiency Boost</span></div>`);
                if (loadingInsight.value) {
                  _push2(`<p class="text-xs font-bold text-slate-400 animate-pulse tracking-tight italic" data-v-fa75fc1d${_scopeId}>Analyzing task density...</p>`);
                } else {
                  _push2(`<p class="text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug" data-v-fa75fc1d${_scopeId}>${ssrInterpolate((_d = (_c = globalInsight.value) == null ? void 0 : _c.categories) == null ? void 0 : _d.planner)}</p>`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 h-full" data-v-fa75fc1d${_scopeId}><h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(_ctx.$t("dash_upcoming"))}</h4>`);
              if (__props.synergy.planner.upcoming.length > 0) {
                _push2(`<div class="space-y-3" data-v-fa75fc1d${_scopeId}><!--[-->`);
                ssrRenderList(__props.synergy.planner.upcoming, (task) => {
                  _push2(`<div class="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-transparent hover:border-indigo-100 transition-all truncate text-left" data-v-fa75fc1d${_scopeId}><span class="text-xs font-black text-indigo-600 tabular-nums" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(task.start_time || "--:--")}</span><span class="text-xs font-bold text-slate-700 dark:text-slate-300 truncate" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(task.title)}</span></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="text-center py-6 text-slate-400 text-xs font-bold" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(_ctx.$t("dash_all_tasks_done"))}</div>`);
              }
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8" }, [
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "flex items-center gap-5" }, [
                      createVNode("div", { class: "w-14 h-14 bg-slate-50 dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm" }, [
                        createVNode(_sfc_main$1, {
                          name: "planner",
                          size: "28",
                          "stroke-width": "3"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-3xl font-black text-slate-900 dark:text-white tracking-tighter" }, toDisplayString(_ctx.$t("dash_planner_title")), 1),
                        createVNode("p", { class: "text-sm font-bold text-slate-400" }, toDisplayString(__props.synergy.planner.completed) + " / " + toDisplayString(__props.synergy.planner.total) + " " + toDisplayString(_ctx.$t("dash_tasks_done")), 1)
                      ])
                    ]),
                    loadingInsight.value || ((_f = (_e = globalInsight.value) == null ? void 0 : _e.categories) == null ? void 0 : _f.planner) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100/50 dark:border-emerald-500/10 p-5 rounded-2xl"
                    }, [
                      createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                        createVNode(_sfc_main$1, {
                          name: "sparkles",
                          size: "14",
                          class: ["text-emerald-500", { "animate-spin": loadingInsight.value }]
                        }, null, 8, ["class"]),
                        createVNode("span", { class: "text-[9px] font-black uppercase tracking-widest text-emerald-500/70" }, "Efficiency Boost")
                      ]),
                      loadingInsight.value ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs font-bold text-slate-400 animate-pulse tracking-tight italic"
                      }, "Analyzing task density...")) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug"
                      }, toDisplayString((_h = (_g = globalInsight.value) == null ? void 0 : _g.categories) == null ? void 0 : _h.planner), 1))
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "bg-slate-50 dark:bg-slate-950/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 h-full" }, [
                    createVNode("h4", { class: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4" }, toDisplayString(_ctx.$t("dash_upcoming")), 1),
                    __props.synergy.planner.upcoming.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.synergy.planner.upcoming, (task) => {
                        return openBlock(), createBlock("div", {
                          key: task.id,
                          class: "flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-transparent hover:border-indigo-100 transition-all truncate text-left"
                        }, [
                          createVNode("span", { class: "text-xs font-black text-indigo-600 tabular-nums" }, toDisplayString(task.start_time || "--:--"), 1),
                          createVNode("span", { class: "text-xs font-bold text-slate-700 dark:text-slate-300 truncate" }, toDisplayString(task.title), 1)
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-6 text-slate-400 text-xs font-bold"
                    }, toDisplayString(_ctx.$t("dash_all_tasks_done")), 1))
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("finance.index"),
          class: "col-span-1 md:col-span-12 lg:col-span-5 bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (_push2) {
              _push2(`<div class="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-1000" data-v-fa75fc1d${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "finance",
                size: "240"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="relative z-10 flex flex-col gap-6 text-left" data-v-fa75fc1d${_scopeId}><div class="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20" data-v-fa75fc1d${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "finance",
                size: "28",
                "stroke-width": "3"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="space-y-4" data-v-fa75fc1d${_scopeId}><h3 class="text-3xl font-black tracking-tighter" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(_ctx.$t("dash_finance_title"))}</h3>`);
              if (loadingInsight.value || ((_b = (_a = globalInsight.value) == null ? void 0 : _a.categories) == null ? void 0 : _b.finance)) {
                _push2(`<div class="bg-black/20 p-5 rounded-2xl border border-white/10" data-v-fa75fc1d${_scopeId}>`);
                if (loadingInsight.value) {
                  _push2(`<p class="text-xs font-bold text-indigo-200 animate-pulse tracking-tight italic" data-v-fa75fc1d${_scopeId}>Auditing variables...</p>`);
                } else {
                  _push2(`<p class="text-sm font-bold leading-snug italic" data-v-fa75fc1d${_scopeId}>${ssrInterpolate((_d = (_c = globalInsight.value) == null ? void 0 : _c.categories) == null ? void 0 : _d.finance)}</p>`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="relative z-10 mt-10 grid grid-cols-2 gap-4" data-v-fa75fc1d${_scopeId}><div class="bg-white/10 rounded-2xl p-6 border border-white/5" data-v-fa75fc1d${_scopeId}><p class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-1" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(_ctx.$t("dash_expense"))}</p><h4 class="text-2xl font-black truncate" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(formatRupiah(__props.synergy.finance.expense))}</h4></div><div class="bg-white/10 rounded-2xl p-6 border border-white/5" data-v-fa75fc1d${_scopeId}><p class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-1" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(_ctx.$t("dash_income"))}</p><h4 class="text-2xl font-black text-emerald-300 tabular-nums lining-nums" data-v-fa75fc1d${_scopeId}>+${ssrInterpolate(formatRupiah(__props.synergy.finance.income))}</h4></div></div>`);
            } else {
              return [
                createVNode("div", { class: "absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-1000" }, [
                  createVNode(_sfc_main$1, {
                    name: "finance",
                    size: "240"
                  })
                ]),
                createVNode("div", { class: "relative z-10 flex flex-col gap-6 text-left" }, [
                  createVNode("div", { class: "w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20" }, [
                    createVNode(_sfc_main$1, {
                      name: "finance",
                      size: "28",
                      "stroke-width": "3"
                    })
                  ]),
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("h3", { class: "text-3xl font-black tracking-tighter" }, toDisplayString(_ctx.$t("dash_finance_title")), 1),
                    loadingInsight.value || ((_f = (_e = globalInsight.value) == null ? void 0 : _e.categories) == null ? void 0 : _f.finance) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-black/20 p-5 rounded-2xl border border-white/10"
                    }, [
                      loadingInsight.value ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs font-bold text-indigo-200 animate-pulse tracking-tight italic"
                      }, "Auditing variables...")) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-sm font-bold leading-snug italic"
                      }, toDisplayString((_h = (_g = globalInsight.value) == null ? void 0 : _g.categories) == null ? void 0 : _h.finance), 1))
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "relative z-10 mt-10 grid grid-cols-2 gap-4" }, [
                  createVNode("div", { class: "bg-white/10 rounded-2xl p-6 border border-white/5" }, [
                    createVNode("p", { class: "text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-1" }, toDisplayString(_ctx.$t("dash_expense")), 1),
                    createVNode("h4", { class: "text-2xl font-black truncate" }, toDisplayString(formatRupiah(__props.synergy.finance.expense)), 1)
                  ]),
                  createVNode("div", { class: "bg-white/10 rounded-2xl p-6 border border-white/5" }, [
                    createVNode("p", { class: "text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-1" }, toDisplayString(_ctx.$t("dash_income")), 1),
                    createVNode("h4", { class: "text-2xl font-black text-emerald-300 tabular-nums lining-nums" }, "+" + toDisplayString(formatRupiah(__props.synergy.finance.income)), 1)
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: __props.synergy.journal.is_written ? _ctx.route("journal.write", __props.synergy.journal.id) : _ctx.route("journal.index"),
          class: "col-span-1 md:col-span-7 lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-lg hover:-translate-y-2 transition-all duration-500 group overflow-hidden relative"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="p-4 flex flex-col justify-between h-full relative z-10 space-y-8 text-left" data-v-fa75fc1d${_scopeId}><div class="space-y-6" data-v-fa75fc1d${_scopeId}><div class="w-14 h-14 bg-slate-50 dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700" data-v-fa75fc1d${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "journal",
                size: "28",
                "stroke-width": "3"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(_ctx.$t("dash_journal_title"))}</h3></div><div class="flex-1 flex flex-col justify-end" data-v-fa75fc1d${_scopeId}>`);
              if (__props.synergy.journal.is_written) {
                _push2(`<div class="bg-emerald-500 text-white p-6 rounded-2xl shadow-lg" data-v-fa75fc1d${_scopeId}><p class="font-bold text-lg leading-snug" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(_ctx.$t("dash_journal_written"))} ✨</p></div>`);
              } else {
                _push2(`<div class="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100" data-v-fa75fc1d${_scopeId}><p class="font-bold text-lg italic text-slate-500" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(_ctx.$t("dash_journal_prompt"))}</p></div>`);
              }
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "p-4 flex flex-col justify-between h-full relative z-10 space-y-8 text-left" }, [
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "w-14 h-14 bg-slate-50 dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700" }, [
                      createVNode(_sfc_main$1, {
                        name: "journal",
                        size: "28",
                        "stroke-width": "3"
                      })
                    ]),
                    createVNode("h3", { class: "text-3xl font-black text-slate-900 dark:text-white tracking-tighter" }, toDisplayString(_ctx.$t("dash_journal_title")), 1)
                  ]),
                  createVNode("div", { class: "flex-1 flex flex-col justify-end" }, [
                    __props.synergy.journal.is_written ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-emerald-500 text-white p-6 rounded-2xl shadow-lg"
                    }, [
                      createVNode("p", { class: "font-bold text-lg leading-snug" }, toDisplayString(_ctx.$t("dash_journal_written")) + " ✨", 1)
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100"
                    }, [
                      createVNode("p", { class: "font-bold text-lg italic text-slate-500" }, toDisplayString(_ctx.$t("dash_journal_prompt")), 1)
                    ]))
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="col-span-1 md:col-span-5 lg:col-span-3 space-y-6" data-v-fa75fc1d>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("jobs.index"),
          class: "block bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-lg hover:bg-slate-50 transition-all text-left"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-4 mb-6" data-v-fa75fc1d${_scopeId}><div class="w-10 h-10 bg-indigo-50 dark:bg-slate-800 text-indigo-600 rounded-xl flex items-center justify-center" data-v-fa75fc1d${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "job",
                size: "20",
                "stroke-width": "3"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-xl font-black text-slate-900 dark:text-white" data-v-fa75fc1d${_scopeId}>Career</h3></div><div class="flex gap-4 text-center" data-v-fa75fc1d${_scopeId}><div class="flex-1 p-4 bg-slate-50 dark:bg-black rounded-2xl" data-v-fa75fc1d${_scopeId}><p class="text-[9px] font-black text-slate-400 uppercase mb-1" data-v-fa75fc1d${_scopeId}>Active</p><p class="text-2xl font-black text-slate-900 dark:text-white" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(__props.synergy.jobs.active)}</p></div><div class="flex-1 p-4 bg-indigo-600 rounded-2xl text-white" data-v-fa75fc1d${_scopeId}><p class="text-[9px] font-black text-indigo-200 uppercase mb-1" data-v-fa75fc1d${_scopeId}>Interview</p><p class="text-2xl font-black" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(__props.synergy.jobs.interviews)}</p></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-4 mb-6" }, [
                  createVNode("div", { class: "w-10 h-10 bg-indigo-50 dark:bg-slate-800 text-indigo-600 rounded-xl flex items-center justify-center" }, [
                    createVNode(_sfc_main$1, {
                      name: "job",
                      size: "20",
                      "stroke-width": "3"
                    })
                  ]),
                  createVNode("h3", { class: "text-xl font-black text-slate-900 dark:text-white" }, "Career")
                ]),
                createVNode("div", { class: "flex gap-4 text-center" }, [
                  createVNode("div", { class: "flex-1 p-4 bg-slate-50 dark:bg-black rounded-2xl" }, [
                    createVNode("p", { class: "text-[9px] font-black text-slate-400 uppercase mb-1" }, "Active"),
                    createVNode("p", { class: "text-2xl font-black text-slate-900 dark:text-white" }, toDisplayString(__props.synergy.jobs.active), 1)
                  ]),
                  createVNode("div", { class: "flex-1 p-4 bg-indigo-600 rounded-2xl text-white" }, [
                    createVNode("p", { class: "text-[9px] font-black text-indigo-200 uppercase mb-1" }, "Interview"),
                    createVNode("p", { class: "text-2xl font-black" }, toDisplayString(__props.synergy.jobs.interviews), 1)
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("goals.index"),
          class: "block bg-slate-900 dark:bg-black rounded-3xl p-8 text-white shadow-xl hover:-translate-x-2 transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex justify-between items-center mb-6" data-v-fa75fc1d${_scopeId}><h3 class="text-xl font-black" data-v-fa75fc1d${_scopeId}>Goals</h3><span class="text-[9px] font-black bg-emerald-500 px-3 py-1 rounded-full" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(__props.synergy.goals.active)} Active</span></div>`);
              if (__props.synergy.goals.top_goal) {
                _push2(`<div data-v-fa75fc1d${_scopeId}><p class="text-xs font-bold text-slate-400 mb-2 truncate" data-v-fa75fc1d${_scopeId}>${ssrInterpolate(__props.synergy.goals.top_goal.title)}</p><div class="w-full bg-white/10 h-2 rounded-full overflow-hidden" data-v-fa75fc1d${_scopeId}><div class="bg-emerald-400 h-full" style="${ssrRenderStyle(`width: ${__props.synergy.goals.top_goal.percent}%`)}" data-v-fa75fc1d${_scopeId}></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                  createVNode("h3", { class: "text-xl font-black" }, "Goals"),
                  createVNode("span", { class: "text-[9px] font-black bg-emerald-500 px-3 py-1 rounded-full" }, toDisplayString(__props.synergy.goals.active) + " Active", 1)
                ]),
                __props.synergy.goals.top_goal ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("p", { class: "text-xs font-bold text-slate-400 mb-2 truncate" }, toDisplayString(__props.synergy.goals.top_goal.title), 1),
                  createVNode("div", { class: "w-full bg-white/10 h-2 rounded-full overflow-hidden" }, [
                    createVNode("div", {
                      class: "bg-emerald-400 h-full",
                      style: `width: ${__props.synergy.goals.top_goal.percent}%`
                    }, null, 4)
                  ])
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10" data-v-fa75fc1d><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="bg-white dark:bg-slate-900 rounded-[2rem] animate-pulse p-10 h-80 col-span-12 lg:col-span-4" data-v-fa75fc1d><div class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8" data-v-fa75fc1d></div><div class="h-10 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6" data-v-fa75fc1d></div><div class="h-24 w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl" data-v-fa75fc1d></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
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
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa75fc1d"]]);
export {
  Dashboard as default
};
