import { ref, computed, onMounted, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DzWwanC6.js";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
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
    const user = usePage().props.auth.user;
    const props = __props;
    const globalInsight = ref(null);
    const loadingInsight = ref(false);
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
    onMounted(() => {
      isMobile.value = window.innerWidth < 768;
      window.addEventListener("resize", () => {
        isMobile.value = window.innerWidth < 768;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("nav_dashboard")
      }, null, _parent));
      _push(`<div class="w-full lg:max-w-[96%] mx-auto p-4 md:p-8 space-y-6 lg:space-y-12 pb-32" data-v-1aed4b62>`);
      if (isMobile.value && __props.synergy) {
        _push(`<!--[--><header id="mobile-dash-header" class="pt-6 pb-4" data-v-1aed4b62><div class="flex items-center justify-between gap-6 mb-10" data-v-1aed4b62><div class="space-y-1 py-2" data-v-1aed4b62><p id="dash-date" class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest" data-v-1aed4b62>${ssrInterpolate(__props.synergy.date_formatted)}</p><h1 id="dash-greeting" class="text-3xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight" data-v-1aed4b62>${ssrInterpolate(_ctx.$t(greetingKey.value))},<br data-v-1aed4b62><span class="text-indigo-600 dark:text-indigo-400" data-v-1aed4b62>${ssrInterpolate(unref(user).name.split(" ")[0])}</span></h1></div><div id="synergy-ring-container" class="relative group active:scale-95 transition-transform duration-500 shrink-0" data-v-1aed4b62><div class="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-2xl animate-pulse" data-v-1aed4b62></div><div class="relative w-28 h-28 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none" data-v-1aed4b62><svg class="absolute w-[90%] h-[90%] -rotate-90" viewBox="0 0 100 100" data-v-1aed4b62><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="5" class="text-slate-50 dark:text-slate-800" data-v-1aed4b62></circle><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", 276)}${ssrRenderAttr("stroke-dashoffset", 276 - 276 * overallScore.value / 100)} class="text-indigo-600 dark:text-indigo-500 transition-all duration-[2000ms]" data-v-1aed4b62></circle></svg><div class="text-center z-10" data-v-1aed4b62><span class="block text-3xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums" data-v-1aed4b62>${ssrInterpolate(overallScore.value)}%</span><span class="text-[8px] font-bold text-slate-400 tracking-widest uppercase" data-v-1aed4b62>SYNERGY</span></div></div></div></div><div id="neural-hub" class="mb-6" data-v-1aed4b62>`);
        if (!globalInsight.value && !loadingInsight.value) {
          _push(`<button id="btn-trigger-neural" class="w-full relative overflow-hidden p-0.5 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 group transition-all" data-v-1aed4b62><div class="bg-white dark:bg-slate-900 rounded-[1.4rem] py-4 px-6 flex items-center justify-between gap-3 active:scale-[0.99] transition-all" data-v-1aed4b62><div class="flex items-center gap-4" data-v-1aed4b62><div class="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12" data-v-1aed4b62>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "sparkles",
            size: "20",
            class: "text-indigo-600 dark:text-indigo-400"
          }, null, _parent));
          _push(`</div><div class="text-left" data-v-1aed4b62><span class="block text-xs font-black text-slate-800 dark:text-slate-100" data-v-1aed4b62>Neural Sync Intelligence</span><span class="text-[9px] font-bold text-slate-400" data-v-1aed4b62>Calibrate your day with AI</span></div></div>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "chevron-right",
            size: "14",
            class: "text-slate-300 group-hover:translate-x-1 transition-transform"
          }, null, _parent));
          _push(`</div></button>`);
        } else {
          _push(`<!---->`);
        }
        if (loadingInsight.value || globalInsight.value) {
          _push(`<div class="bg-indigo-600 dark:bg-indigo-900/40 p-6 rounded-[2rem] text-white shadow-lg shadow-indigo-200 dark:shadow-none border border-indigo-500/20" data-v-1aed4b62><div class="flex items-center gap-3 mb-3" data-v-1aed4b62>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "sparkles",
            size: "16",
            class: "animate-pulse"
          }, null, _parent));
          _push(`<span class="text-[10px] font-black uppercase tracking-widest opacity-80" data-v-1aed4b62>Neural Recommendation</span></div>`);
          if (loadingInsight.value) {
            _push(`<p class="text-sm font-bold animate-pulse italic" data-v-1aed4b62>Connecting to Neural OS...</p>`);
          } else {
            _push(`<p class="text-base font-black leading-tight tracking-tight" data-v-1aed4b62>${ssrInterpolate(((_a = globalInsight.value) == null ? void 0 : _a.summary) || "Synergy looks stable. Focus on your top habit to maximize momentum.")}</p>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></header><div class="grid grid-cols-12 gap-4" data-v-1aed4b62>`);
        _push(ssrRenderComponent(unref(Link), {
          id: "widget-planner",
          href: _ctx.route("planner.index"),
          class: "col-span-12 group bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all relative overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-1000" data-v-1aed4b62${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "140"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex items-center justify-between mb-6 relative z-10" data-v-1aed4b62${_scopeId}><div class="flex items-center gap-4" data-v-1aed4b62${_scopeId}><div class="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center" data-v-1aed4b62${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "24"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-xl font-black text-slate-900 dark:text-white leading-none" data-v-1aed4b62${_scopeId}>Schedule</h3></div><span class="text-[10px] font-black px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-full border border-slate-100 dark:border-slate-700 uppercase" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.planner.upcoming.length)} Pending</span></div><div class="space-y-3 relative z-10" data-v-1aed4b62${_scopeId}>`);
              if (__props.synergy.planner.upcoming.length > 0) {
                _push2(`<div class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100/50 dark:border-white/5" data-v-1aed4b62${_scopeId}><span class="text-xs font-black text-indigo-600 dark:text-indigo-400 tabular-nums" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.planner.upcoming[0].start_time)}</span><span class="text-sm font-black text-slate-700 dark:text-slate-200 truncate" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.planner.upcoming[0].title)}</span></div>`);
              } else {
                _push2(`<div class="text-center py-4 text-slate-400 text-xs font-bold bg-slate-50 dark:bg-black/10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800" data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_all_tasks_done"))}</div>`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-1000" }, [
                  createVNode(_sfc_main$1, {
                    name: "planner",
                    size: "140"
                  })
                ]),
                createVNode("div", { class: "flex items-center justify-between mb-6 relative z-10" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("div", { class: "w-12 h-12 bg-slate-50 dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center" }, [
                      createVNode(_sfc_main$1, {
                        name: "planner",
                        size: "24"
                      })
                    ]),
                    createVNode("h3", { class: "text-xl font-black text-slate-900 dark:text-white leading-none" }, "Schedule")
                  ]),
                  createVNode("span", { class: "text-[10px] font-black px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-full border border-slate-100 dark:border-slate-700 uppercase" }, toDisplayString(__props.synergy.planner.upcoming.length) + " Pending", 1)
                ]),
                createVNode("div", { class: "space-y-3 relative z-10" }, [
                  __props.synergy.planner.upcoming.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center gap-4 p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100/50 dark:border-white/5"
                  }, [
                    createVNode("span", { class: "text-xs font-black text-indigo-600 dark:text-indigo-400 tabular-nums" }, toDisplayString(__props.synergy.planner.upcoming[0].start_time), 1),
                    createVNode("span", { class: "text-sm font-black text-slate-700 dark:text-slate-200 truncate" }, toDisplayString(__props.synergy.planner.upcoming[0].title), 1)
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-4 text-slate-400 text-xs font-bold bg-slate-50 dark:bg-black/10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800"
                  }, toDisplayString(_ctx.$t("dash_all_tasks_done")), 1))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          id: "widget-habits",
          href: _ctx.route("habits.index"),
          class: "col-span-6 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-11 h-11 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-4" data-v-1aed4b62${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "habit",
                size: "22"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="space-y-1" data-v-1aed4b62${_scopeId}><h4 class="text-base font-black text-slate-900 dark:text-white leading-tight" data-v-1aed4b62${_scopeId}>Habits</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.habits.completed)}/${ssrInterpolate(__props.synergy.habits.total)} Done</p></div><div class="mt-4 flex items-center gap-2" data-v-1aed4b62${_scopeId}><div class="flex-grow bg-slate-50 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden" data-v-1aed4b62${_scopeId}><div class="bg-indigo-600 h-full rounded-full transition-all duration-1000" style="${ssrRenderStyle(`width: ${__props.synergy.habits.percent}%`)}" data-v-1aed4b62${_scopeId}></div></div><span class="text-[10px] font-black text-indigo-600" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.habits.percent)}%</span></div>`);
            } else {
              return [
                createVNode("div", { class: "w-11 h-11 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-4" }, [
                  createVNode(_sfc_main$1, {
                    name: "habit",
                    size: "22"
                  })
                ]),
                createVNode("div", { class: "space-y-1" }, [
                  createVNode("h4", { class: "text-base font-black text-slate-900 dark:text-white leading-tight" }, "Habits"),
                  createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest" }, toDisplayString(__props.synergy.habits.completed) + "/" + toDisplayString(__props.synergy.habits.total) + " Done", 1)
                ]),
                createVNode("div", { class: "mt-4 flex items-center gap-2" }, [
                  createVNode("div", { class: "flex-grow bg-slate-50 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden" }, [
                    createVNode("div", {
                      class: "bg-indigo-600 h-full rounded-full transition-all duration-1000",
                      style: `width: ${__props.synergy.habits.percent}%`
                    }, null, 4)
                  ]),
                  createVNode("span", { class: "text-[10px] font-black text-indigo-600" }, toDisplayString(__props.synergy.habits.percent) + "%", 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          id: "widget-journal",
          href: __props.synergy.journal.is_written ? _ctx.route("journal.write", __props.synergy.journal.id) : _ctx.route("journal.index"),
          class: "col-span-6 bg-slate-900 p-6 rounded-[2.5rem] shadow-lg active:scale-[0.98] transition-all relative overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative z-10 h-full flex flex-col justify-between" data-v-1aed4b62${_scopeId}><div class="w-11 h-11 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-4" data-v-1aed4b62${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "journal",
                size: "22"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="space-y-1" data-v-1aed4b62${_scopeId}><h4 class="text-base font-black text-white leading-tight" data-v-1aed4b62${_scopeId}>Journal</h4><p class="${ssrRenderClass([__props.synergy.journal.is_written ? "text-emerald-400" : "text-slate-400 uppercase tracking-widest", "text-[10px] font-bold"])}" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.journal.is_written ? "Written" : "Empty")}</p></div></div>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "journal",
                size: "100",
                class: "absolute -right-8 -bottom-8 opacity-5 text-white"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("div", { class: "relative z-10 h-full flex flex-col justify-between" }, [
                  createVNode("div", { class: "w-11 h-11 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-4" }, [
                    createVNode(_sfc_main$1, {
                      name: "journal",
                      size: "22"
                    })
                  ]),
                  createVNode("div", { class: "space-y-1" }, [
                    createVNode("h4", { class: "text-base font-black text-white leading-tight" }, "Journal"),
                    createVNode("p", {
                      class: ["text-[10px] font-bold", __props.synergy.journal.is_written ? "text-emerald-400" : "text-slate-400 uppercase tracking-widest"]
                    }, toDisplayString(__props.synergy.journal.is_written ? "Written" : "Empty"), 3)
                  ])
                ]),
                createVNode(_sfc_main$1, {
                  name: "journal",
                  size: "100",
                  class: "absolute -right-8 -bottom-8 opacity-5 text-white"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          id: "widget-finance",
          href: _ctx.route("finance.index"),
          class: "col-span-12 group bg-indigo-600 p-8 rounded-[2.8rem] shadow-xl shadow-indigo-100 dark:shadow-none text-white active:scale-[0.98] transition-all relative overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" data-v-1aed4b62${_scopeId}></div><div class="absolute -left-4 -bottom-10 w-24 h-24 bg-black/10 rounded-full" data-v-1aed4b62${_scopeId}></div>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "finance",
                size: "200",
                class: "absolute -right-16 -top-16 opacity-10 group-hover:rotate-12 transition-transform duration-[2000ms]"
              }, null, _parent2, _scopeId));
              _push2(`<div class="relative z-10" data-v-1aed4b62${_scopeId}><div class="flex items-center justify-between mb-8" data-v-1aed4b62${_scopeId}><h3 class="text-2xl font-black tracking-tight" data-v-1aed4b62${_scopeId}>Finance Ops</h3><div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20" data-v-1aed4b62${_scopeId}><span class="text-xs font-black" data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_income"))}</span></div></div><div class="grid grid-cols-2 gap-6" data-v-1aed4b62${_scopeId}><div class="space-y-1" data-v-1aed4b62${_scopeId}><p class="text-[10px] font-bold text-indigo-100 uppercase tracking-widest opacity-80" data-v-1aed4b62${_scopeId}>Expenses</p><p class="text-xl font-black tracking-tight truncate" data-v-1aed4b62${_scopeId}>${ssrInterpolate(formatRupiah(__props.synergy.finance.expense))}</p><div class="w-full bg-white/10 h-1 rounded-full mt-2" data-v-1aed4b62${_scopeId}><div class="bg-white h-full rounded-full" style="${ssrRenderStyle({ "width": "65%" })}" data-v-1aed4b62${_scopeId}></div></div></div><div class="space-y-1" data-v-1aed4b62${_scopeId}><p class="text-[10px] font-bold text-indigo-100 uppercase tracking-widest opacity-80" data-v-1aed4b62${_scopeId}>Revenue</p><p class="text-xl font-black text-emerald-300 tracking-tight truncate" data-v-1aed4b62${_scopeId}>+${ssrInterpolate(formatRupiah(__props.synergy.finance.income))}</p><div class="w-full bg-black/20 h-1 rounded-full mt-2" data-v-1aed4b62${_scopeId}><div class="bg-emerald-400 h-full rounded-full" style="${ssrRenderStyle({ "width": "85%" })}" data-v-1aed4b62${_scopeId}></div></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" }),
                createVNode("div", { class: "absolute -left-4 -bottom-10 w-24 h-24 bg-black/10 rounded-full" }),
                createVNode(_sfc_main$1, {
                  name: "finance",
                  size: "200",
                  class: "absolute -right-16 -top-16 opacity-10 group-hover:rotate-12 transition-transform duration-[2000ms]"
                }),
                createVNode("div", { class: "relative z-10" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-8" }, [
                    createVNode("h3", { class: "text-2xl font-black tracking-tight" }, "Finance Ops"),
                    createVNode("div", { class: "bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20" }, [
                      createVNode("span", { class: "text-xs font-black" }, toDisplayString(_ctx.$t("dash_income")), 1)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-6" }, [
                    createVNode("div", { class: "space-y-1" }, [
                      createVNode("p", { class: "text-[10px] font-bold text-indigo-100 uppercase tracking-widest opacity-80" }, "Expenses"),
                      createVNode("p", { class: "text-xl font-black tracking-tight truncate" }, toDisplayString(formatRupiah(__props.synergy.finance.expense)), 1),
                      createVNode("div", { class: "w-full bg-white/10 h-1 rounded-full mt-2" }, [
                        createVNode("div", {
                          class: "bg-white h-full rounded-full",
                          style: { "width": "65%" }
                        })
                      ])
                    ]),
                    createVNode("div", { class: "space-y-1" }, [
                      createVNode("p", { class: "text-[10px] font-bold text-indigo-100 uppercase tracking-widest opacity-80" }, "Revenue"),
                      createVNode("p", { class: "text-xl font-black text-emerald-300 tracking-tight truncate" }, "+" + toDisplayString(formatRupiah(__props.synergy.finance.income)), 1),
                      createVNode("div", { class: "w-full bg-black/20 h-1 rounded-full mt-2" }, [
                        createVNode("div", {
                          class: "bg-emerald-400 h-full rounded-full",
                          style: { "width": "85%" }
                        })
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          id: "widget-goals",
          href: _ctx.route("goals.index"),
          class: "col-span-12 group bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all flex items-center justify-between gap-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-4" data-v-1aed4b62${_scopeId}><div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" data-v-1aed4b62${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "goal",
                size: "24"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-1aed4b62${_scopeId}><h4 class="text-base font-black text-slate-800 dark:text-white leading-tight" data-v-1aed4b62${_scopeId}>Goal Milestones</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.goals.active)} Active Ambitions</p></div></div>`);
              if (__props.synergy.goals.top_goal) {
                _push2(`<div class="text-right shrink-0" data-v-1aed4b62${_scopeId}><div class="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.goals.top_goal.percent)}%</div></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode("div", { class: "w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" }, [
                    createVNode(_sfc_main$1, {
                      name: "goal",
                      size: "24"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h4", { class: "text-base font-black text-slate-800 dark:text-white leading-tight" }, "Goal Milestones"),
                    createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest" }, toDisplayString(__props.synergy.goals.active) + " Active Ambitions", 1)
                  ])
                ]),
                __props.synergy.goals.top_goal ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-right shrink-0"
                }, [
                  createVNode("div", { class: "text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full" }, toDisplayString(__props.synergy.goals.top_goal.percent) + "%", 1)
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><!--]-->`);
      } else if (__props.synergy) {
        _push(`<!--[--><header class="relative group" data-v-1aed4b62><div class="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-14 border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none transition-all duration-500" data-v-1aed4b62><div class="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]" data-v-1aed4b62></div><div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10" data-v-1aed4b62><div class="flex-1 space-y-5 text-center md:text-left" data-v-1aed4b62><div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700" data-v-1aed4b62><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" data-v-1aed4b62></span><span class="text-xs font-bold text-slate-500 dark:text-slate-400" data-v-1aed4b62>${ssrInterpolate(__props.synergy.date_formatted)}</span></div><h1 class="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]" data-v-1aed4b62>${ssrInterpolate(_ctx.$t(greetingKey.value))},<br data-v-1aed4b62><span class="text-indigo-600 dark:text-indigo-400" data-v-1aed4b62>${ssrInterpolate(unref(user).name)}</span></h1></div><div class="flex flex-col items-center gap-6" data-v-1aed4b62><div class="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center" data-v-1aed4b62><svg class="absolute w-full h-full -rotate-90" viewBox="0 0 100 100" data-v-1aed4b62><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="4" class="text-slate-50 dark:text-slate-800" data-v-1aed4b62></circle><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", 276)}${ssrRenderAttr("stroke-dashoffset", 276 - 276 * overallScore.value / 100)} class="text-indigo-600 dark:text-indigo-500 transition-all duration-[1500ms]" data-v-1aed4b62></circle></svg><div class="text-center" data-v-1aed4b62><span class="block text-5xl md:text-6xl font-black text-slate-900 dark:text-white tabular-nums" data-v-1aed4b62>${ssrInterpolate(overallScore.value)}%</span><span class="text-xs font-bold text-slate-400" data-v-1aed4b62>${ssrInterpolate(_ctx.$t("dash_synergy_today"))}</span></div></div>`);
        if (!globalInsight.value && !loadingInsight.value) {
          _push(`<button class="group/btn relative px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg transition-all active:scale-95 overflow-hidden" data-v-1aed4b62><div class="flex items-center gap-3 relative z-10" data-v-1aed4b62>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "sparkles",
            size: "16",
            class: "text-indigo-600"
          }, null, _parent));
          _push(`<span class="text-xs font-black text-slate-700 dark:text-slate-300" data-v-1aed4b62>Neural Sync Engine</span></div></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></header><div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10" data-v-1aed4b62>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("habits.index"),
          class: "col-span-1 md:col-span-6 lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between overflow-hidden relative"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b, _c, _d, _e, _f, _g, _h;
            if (_push2) {
              _push2(`<div class="relative z-10 space-y-6" data-v-1aed4b62${_scopeId}><div class="flex justify-between items-start" data-v-1aed4b62${_scopeId}><div class="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 group-hover:scale-110 transition-transform" data-v-1aed4b62${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "habit",
                size: "28",
                "stroke-width": "3"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 px-4 py-1.5 rounded-xl text-xs font-black" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.habits.completed)} / ${ssrInterpolate(__props.synergy.habits.total)}</div></div><h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter" data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_habit_title"))}</h3>`);
              if (loadingInsight.value || ((_b = (_a2 = globalInsight.value) == null ? void 0 : _a2.categories) == null ? void 0 : _b.habits)) {
                _push2(`<div class="bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100/50 dark:border-indigo-500/10 p-5 rounded-2xl" data-v-1aed4b62${_scopeId}><div class="flex items-center gap-2 mb-2" data-v-1aed4b62${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  name: "sparkles",
                  size: "14",
                  class: ["text-indigo-500", { "animate-spin": loadingInsight.value }]
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-[9px] font-black text-indigo-400" data-v-1aed4b62${_scopeId}>Neural Sync</span></div>`);
                if (loadingInsight.value) {
                  _push2(`<p class="text-xs font-bold text-slate-400 animate-pulse tracking-tight italic" data-v-1aed4b62${_scopeId}>Calibrating routines...</p>`);
                } else {
                  _push2(`<p class="text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug" data-v-1aed4b62${_scopeId}>${ssrInterpolate((_d = (_c = globalInsight.value) == null ? void 0 : _c.categories) == null ? void 0 : _d.habits)}</p>`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mt-8 space-y-3" data-v-1aed4b62${_scopeId}><div class="w-full bg-slate-50 dark:bg-slate-800 h-3 rounded-full overflow-hidden" data-v-1aed4b62${_scopeId}><div class="bg-indigo-600 h-full rounded-full transition-all duration-1000" style="${ssrRenderStyle(`width: ${__props.synergy.habits.percent}%`)}" data-v-1aed4b62${_scopeId}></div></div><div class="flex justify-between text-[10px] font-black text-slate-400" data-v-1aed4b62${_scopeId}><span data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_progress"))}</span><span class="text-indigo-600" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.habits.percent)}%</span></div></div>`);
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
                    createVNode("div", { class: "bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 px-4 py-1.5 rounded-xl text-xs font-black" }, toDisplayString(__props.synergy.habits.completed) + " / " + toDisplayString(__props.synergy.habits.total), 1)
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
                      createVNode("span", { class: "text-[9px] font-black text-indigo-400" }, "Neural Sync")
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
                  createVNode("div", { class: "flex justify-between text-[10px] font-black text-slate-400" }, [
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
            var _a2, _b, _c, _d, _e, _f, _g, _h;
            if (_push2) {
              _push2(`<div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8" data-v-1aed4b62${_scopeId}><div class="space-y-6" data-v-1aed4b62${_scopeId}><div class="flex items-center gap-5" data-v-1aed4b62${_scopeId}><div class="w-14 h-14 bg-slate-50 dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm" data-v-1aed4b62${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "28",
                "stroke-width": "3"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-1aed4b62${_scopeId}><h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter" data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_planner_title"))}</h3><p class="text-sm font-bold text-slate-400" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.planner.completed)} / ${ssrInterpolate(__props.synergy.planner.total)} ${ssrInterpolate(_ctx.$t("dash_tasks_done"))}</p></div></div>`);
              if (loadingInsight.value || ((_b = (_a2 = globalInsight.value) == null ? void 0 : _a2.categories) == null ? void 0 : _b.planner)) {
                _push2(`<div class="bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100/50 dark:border-emerald-500/10 p-5 rounded-2xl" data-v-1aed4b62${_scopeId}><div class="flex items-center gap-2 mb-2" data-v-1aed4b62${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  name: "sparkles",
                  size: "14",
                  class: ["text-emerald-500", { "animate-spin": loadingInsight.value }]
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-[9px] font-black text-emerald-500/70" data-v-1aed4b62${_scopeId}>Efficiency Boost</span></div>`);
                if (loadingInsight.value) {
                  _push2(`<p class="text-xs font-bold text-slate-400 animate-pulse tracking-tight italic" data-v-1aed4b62${_scopeId}>Analyzing task density...</p>`);
                } else {
                  _push2(`<p class="text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug" data-v-1aed4b62${_scopeId}>${ssrInterpolate((_d = (_c = globalInsight.value) == null ? void 0 : _c.categories) == null ? void 0 : _d.planner)}</p>`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 h-full" data-v-1aed4b62${_scopeId}><h4 class="text-[10px] font-black text-slate-400 mb-4" data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_upcoming"))}</h4>`);
              if (__props.synergy.planner.upcoming.length > 0) {
                _push2(`<div class="space-y-3" data-v-1aed4b62${_scopeId}><!--[-->`);
                ssrRenderList(__props.synergy.planner.upcoming, (task) => {
                  _push2(`<div class="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-transparent hover:border-indigo-100 transition-all truncate text-left" data-v-1aed4b62${_scopeId}><span class="text-xs font-black text-indigo-600 tabular-nums" data-v-1aed4b62${_scopeId}>${ssrInterpolate(task.start_time || "--:--")}</span><span class="text-xs font-bold text-slate-700 dark:text-slate-300 truncate" data-v-1aed4b62${_scopeId}>${ssrInterpolate(task.title)}</span></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="text-center py-6 text-slate-400 text-xs font-bold" data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_all_tasks_done"))}</div>`);
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
                        createVNode("span", { class: "text-[9px] font-black text-emerald-500/70" }, "Efficiency Boost")
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
                    createVNode("h4", { class: "text-[10px] font-black text-slate-400 mb-4" }, toDisplayString(_ctx.$t("dash_upcoming")), 1),
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
            var _a2, _b, _c, _d, _e, _f, _g, _h;
            if (_push2) {
              _push2(`<div class="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-1000" data-v-1aed4b62${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "finance",
                size: "240"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="relative z-10 flex flex-col gap-6 text-left" data-v-1aed4b62${_scopeId}><div class="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20" data-v-1aed4b62${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "finance",
                size: "28",
                "stroke-width": "3"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="space-y-4" data-v-1aed4b62${_scopeId}><h3 class="text-3xl font-black tracking-tighter" data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_finance_title"))}</h3>`);
              if (loadingInsight.value || ((_b = (_a2 = globalInsight.value) == null ? void 0 : _a2.categories) == null ? void 0 : _b.finance)) {
                _push2(`<div class="bg-black/20 p-5 rounded-2xl border border-white/10" data-v-1aed4b62${_scopeId}>`);
                if (loadingInsight.value) {
                  _push2(`<p class="text-xs font-bold text-indigo-200 animate-pulse tracking-tight italic" data-v-1aed4b62${_scopeId}>Auditing variables...</p>`);
                } else {
                  _push2(`<p class="text-sm font-bold leading-snug italic" data-v-1aed4b62${_scopeId}>${ssrInterpolate((_d = (_c = globalInsight.value) == null ? void 0 : _c.categories) == null ? void 0 : _d.finance)}</p>`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="relative z-10 mt-10 grid grid-cols-2 gap-4" data-v-1aed4b62${_scopeId}><div class="bg-white/10 rounded-2xl p-6 border border-white/5" data-v-1aed4b62${_scopeId}><p class="text-[9px] font-bold text-indigo-200 mb-1" data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_expense"))}</p><h4 class="text-2xl font-black truncate" data-v-1aed4b62${_scopeId}>${ssrInterpolate(formatRupiah(__props.synergy.finance.expense))}</h4></div><div class="bg-white/10 rounded-2xl p-6 border border-white/5" data-v-1aed4b62${_scopeId}><p class="text-[9px] font-bold text-indigo-200 mb-1" data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_income"))}</p><h4 class="text-2xl font-black text-emerald-300 tabular-nums lining-nums" data-v-1aed4b62${_scopeId}>+${ssrInterpolate(formatRupiah(__props.synergy.finance.income))}</h4></div></div>`);
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
                    createVNode("p", { class: "text-[9px] font-bold text-indigo-200 mb-1" }, toDisplayString(_ctx.$t("dash_expense")), 1),
                    createVNode("h4", { class: "text-2xl font-black truncate" }, toDisplayString(formatRupiah(__props.synergy.finance.expense)), 1)
                  ]),
                  createVNode("div", { class: "bg-white/10 rounded-2xl p-6 border border-white/5" }, [
                    createVNode("p", { class: "text-[9px] font-bold text-indigo-200 mb-1" }, toDisplayString(_ctx.$t("dash_income")), 1),
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
              _push2(`<div class="p-4 flex flex-col justify-between h-full relative z-10 space-y-8 text-left" data-v-1aed4b62${_scopeId}><div class="space-y-6" data-v-1aed4b62${_scopeId}><div class="w-14 h-14 bg-slate-50 dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700" data-v-1aed4b62${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "journal",
                size: "28",
                "stroke-width": "3"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter" data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_journal_title"))}</h3></div><div class="flex-1 flex flex-col justify-end" data-v-1aed4b62${_scopeId}>`);
              if (__props.synergy.journal.is_written) {
                _push2(`<div class="bg-emerald-500 text-white p-6 rounded-2xl shadow-lg" data-v-1aed4b62${_scopeId}><p class="font-bold text-lg leading-snug" data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_journal_written"))} ✨</p></div>`);
              } else {
                _push2(`<div class="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100" data-v-1aed4b62${_scopeId}><p class="font-bold text-lg italic text-slate-500" data-v-1aed4b62${_scopeId}>${ssrInterpolate(_ctx.$t("dash_journal_prompt"))}</p></div>`);
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
        _push(`<div class="col-span-1 md:col-span-5 lg:col-span-3 space-y-6" data-v-1aed4b62>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("jobs.index"),
          class: "block bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-lg hover:bg-slate-50 transition-all text-left"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-4 mb-6" data-v-1aed4b62${_scopeId}><div class="w-10 h-10 bg-indigo-50 dark:bg-slate-800 text-indigo-600 rounded-xl flex items-center justify-center" data-v-1aed4b62${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "job",
                size: "20",
                "stroke-width": "3"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-xl font-black text-slate-900 dark:text-white" data-v-1aed4b62${_scopeId}>Career</h3></div><div class="flex gap-4 text-center" data-v-1aed4b62${_scopeId}><div class="flex-1 p-4 bg-slate-50 dark:bg-black rounded-2xl" data-v-1aed4b62${_scopeId}><p class="text-[9px] font-black text-slate-400 mb-1" data-v-1aed4b62${_scopeId}>Active</p><p class="text-2xl font-black text-slate-900 dark:text-white" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.jobs.active)}</p></div><div class="flex-1 p-4 bg-indigo-600 rounded-2xl text-white" data-v-1aed4b62${_scopeId}><p class="text-[9px] font-black text-indigo-200 mb-1" data-v-1aed4b62${_scopeId}>Interview</p><p class="text-2xl font-black" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.jobs.interviews)}</p></div></div>`);
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
                    createVNode("p", { class: "text-[9px] font-black text-slate-400 mb-1" }, "Active"),
                    createVNode("p", { class: "text-2xl font-black text-slate-900 dark:text-white" }, toDisplayString(__props.synergy.jobs.active), 1)
                  ]),
                  createVNode("div", { class: "flex-1 p-4 bg-indigo-600 rounded-2xl text-white" }, [
                    createVNode("p", { class: "text-[9px] font-black text-indigo-200 mb-1" }, "Interview"),
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
              _push2(`<div class="flex justify-between items-center mb-6" data-v-1aed4b62${_scopeId}><h3 class="text-xl font-black" data-v-1aed4b62${_scopeId}>Goals</h3><span class="text-[9px] font-black bg-emerald-500 px-3 py-1 rounded-full" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.goals.active)} Active</span></div>`);
              if (__props.synergy.goals.top_goal) {
                _push2(`<div data-v-1aed4b62${_scopeId}><p class="text-xs font-bold text-slate-400 mb-2 truncate" data-v-1aed4b62${_scopeId}>${ssrInterpolate(__props.synergy.goals.top_goal.title)}</p><div class="w-full bg-white/10 h-2 rounded-full overflow-hidden" data-v-1aed4b62${_scopeId}><div class="bg-emerald-400 h-full" style="${ssrRenderStyle(`width: ${__props.synergy.goals.top_goal.percent}%`)}" data-v-1aed4b62${_scopeId}></div></div></div>`);
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
        _push(`</div></div><!--]-->`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10" data-v-1aed4b62><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="bg-white dark:bg-slate-900 rounded-[2rem] animate-pulse p-10 h-80 col-span-12 lg:col-span-4" data-v-1aed4b62><div class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8" data-v-1aed4b62></div><div class="h-10 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6" data-v-1aed4b62></div><div class="h-24 w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl" data-v-1aed4b62></div></div>`);
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
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1aed4b62"]]);
export {
  Dashboard as default
};
