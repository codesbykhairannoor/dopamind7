import { ref, computed, onMounted, resolveComponent, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DfNvF4k3.js";
import { usePage, Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import { u as useGating } from "./useGating-Dlt-HuEc.js";
import { _ as _sfc_main$2 } from "./PremiumPreviewModal-BdH6vUzw.js";
import { Sparkles, ArrowRight, TrendingUp, Target, Brain, Zap } from "lucide-vue-next";
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
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("nav_dashboard")
      }, null, _parent));
      _push(`<div class="w-full lg:max-w-[96%] mx-auto p-4 md:p-8 space-y-6 lg:space-y-12 pb-32" data-v-2d9fa810>`);
      if (isMobile.value && __props.synergy) {
        _push(`<!--[--><header id="mobile-dash-header" class="pt-8 pb-4" data-v-2d9fa810><div class="flex items-center justify-between gap-6 mb-12" data-v-2d9fa810><div class="space-y-1 py-1" data-v-2d9fa810><div class="mb-3" data-v-2d9fa810>`);
        if (unref(isExplorer)) {
          _push(`<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl cursor-pointer active:scale-95 transition-all" data-v-2d9fa810>`);
          _push(ssrRenderComponent(unref(Sparkles), {
            size: 10,
            class: "text-indigo-400"
          }, null, _parent));
          _push(`<span class="text-[8px] font-black text-white uppercase tracking-[0.2em]" data-v-2d9fa810>Upgrade OS</span></div>`);
        } else if (unref(isArchitect)) {
          _push(`<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 shadow-sm" data-v-2d9fa810><span class="w-1.5 h-1.5 rounded-full bg-indigo-500" data-v-2d9fa810></span><span class="text-[8px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest" data-v-2d9fa810>Architect</span></div>`);
        } else if (unref(isQuantum)) {
          _push(`<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950 border border-violet-100 dark:border-violet-900 shadow-sm" data-v-2d9fa810><span class="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" data-v-2d9fa810></span><span class="text-[8px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest" data-v-2d9fa810>Quantum AI</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-1" data-v-2d9fa810>${ssrInterpolate(__props.synergy.date_formatted)}</p><h1 class="text-4xl font-black text-slate-900 dark:text-white leading-[1] tracking-tighter" data-v-2d9fa810>${ssrInterpolate(_ctx.$t(greetingKey.value))},<br data-v-2d9fa810><span class="text-indigo-600 dark:text-indigo-400" data-v-2d9fa810>${ssrInterpolate(unref(user).name.split(" ")[0])}</span></h1></div><div class="relative group active:scale-95 transition-transform duration-500 shrink-0" data-v-2d9fa810><div class="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-2xl animate-pulse" data-v-2d9fa810></div><div class="relative w-32 h-32 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)]" data-v-2d9fa810><svg class="absolute w-[92%] h-[92%] -rotate-90" viewBox="0 0 100 100" data-v-2d9fa810><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="4.5" class="text-slate-50 dark:text-slate-800" data-v-2d9fa810></circle><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", 276)}${ssrRenderAttr("stroke-dashoffset", 276 - 276 * overallScore.value / 100)} class="${ssrRenderClass([unref(isQuantum) ? "text-violet-600 dark:text-violet-500" : "text-indigo-600 dark:text-indigo-500", "transition-all duration-[2000ms]"])}" data-v-2d9fa810></circle></svg><div class="text-center z-10" data-v-2d9fa810><span class="block text-4xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums" data-v-2d9fa810>${ssrInterpolate(overallScore.value)}%</span><span class="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase" data-v-2d9fa810>SYNERGY</span></div></div></div></div><div id="tier-hub" class="mb-10" data-v-2d9fa810>`);
        if (unref(isExplorer)) {
          _push(`<div class="bg-slate-900 p-8 rounded-[3rem] text-white relative overflow-hidden group/discovery cursor-pointer active:scale-[0.98] transition-all shadow-2xl" data-v-2d9fa810><div class="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-transparent" data-v-2d9fa810></div><div class="relative z-10" data-v-2d9fa810><div class="flex items-center justify-between mb-6" data-v-2d9fa810><div class="flex items-center gap-3" data-v-2d9fa810><div class="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/20" data-v-2d9fa810>`);
          _push(ssrRenderComponent(unref(Sparkles), {
            size: 18,
            class: "animate-pulse"
          }, null, _parent));
          _push(`</div><span class="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400" data-v-2d9fa810>Neural Intelligence</span></div><div class="px-3 py-1 bg-white/10 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10" data-v-2d9fa810>Explorer</div></div><div class="space-y-3 blur-[1.5px] opacity-30 group-hover/discovery:opacity-60 transition-all" data-v-2d9fa810><div class="h-2 w-full bg-slate-700 rounded-full" data-v-2d9fa810></div><div class="h-2 w-5/6 bg-slate-700 rounded-full" data-v-2d9fa810></div><div class="h-2 w-4/6 bg-slate-700 rounded-full" data-v-2d9fa810></div></div><div class="mt-8 flex items-center justify-between" data-v-2d9fa810><span class="text-xs font-bold text-slate-400" data-v-2d9fa810>Sync with AI for life insights</span>`);
          _push(ssrRenderComponent(unref(ArrowRight), {
            size: 16,
            class: "text-indigo-400 group-hover/discovery:translate-x-2 transition-transform"
          }, null, _parent));
          _push(`</div></div>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "platinum",
            size: "140",
            class: "absolute -right-6 -bottom-6 opacity-5 rotate-12"
          }, null, _parent));
          _push(`</div>`);
        } else if (unref(isQuantum)) {
          _push(`<div class="bg-violet-600 dark:bg-violet-900/60 p-8 rounded-[3rem] text-white shadow-xl border border-violet-400/20 relative overflow-hidden" data-v-2d9fa810><div class="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl font-black" data-v-2d9fa810></div><div class="relative z-10" data-v-2d9fa810><div class="flex items-center justify-between mb-4" data-v-2d9fa810><div class="flex items-center gap-3" data-v-2d9fa810>`);
          _push(ssrRenderComponent(unref(Sparkles), {
            size: 20,
            class: "animate-pulse"
          }, null, _parent));
          _push(`<span class="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 leading-none" data-v-2d9fa810>Neural Active Insight</span></div></div>`);
          if (loadingInsight.value) {
            _push(`<p class="text-lg font-black animate-pulse italic tracking-tighter" data-v-2d9fa810>Calibrating...</p>`);
          } else {
            _push(`<p class="text-xl font-black leading-tight tracking-tight" data-v-2d9fa810>${ssrInterpolate(((_a = globalInsight.value) == null ? void 0 : _a.summary) || "Synergy looks stable. Focus on deep work today.")}</p>`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></header><div class="grid grid-cols-12 gap-4" data-v-2d9fa810>`);
        _push(ssrRenderComponent(unref(Link), {
          id: "widget-planner",
          href: _ctx.route("planner.index"),
          class: "col-span-12 group bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all relative overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-1000" data-v-2d9fa810${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "140"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex items-center justify-between mb-6 relative z-10" data-v-2d9fa810${_scopeId}><div class="flex items-center gap-4" data-v-2d9fa810${_scopeId}><div class="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center" data-v-2d9fa810${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "24"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-xl font-black text-slate-900 dark:text-white leading-none" data-v-2d9fa810${_scopeId}>Schedule</h3></div><span class="text-[10px] font-black px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-full border border-slate-100 dark:border-slate-700 uppercase" data-v-2d9fa810${_scopeId}>${ssrInterpolate(__props.synergy.planner.upcoming.length)} Pending</span></div><div class="space-y-3 relative z-10" data-v-2d9fa810${_scopeId}>`);
              if (__props.synergy.planner.upcoming.length > 0) {
                _push2(`<div class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100/50 dark:border-white/5" data-v-2d9fa810${_scopeId}><span class="text-xs font-black text-indigo-600 dark:text-indigo-400 tabular-nums" data-v-2d9fa810${_scopeId}>${ssrInterpolate(__props.synergy.planner.upcoming[0].start_time)}</span><span class="text-sm font-black text-slate-700 dark:text-slate-200 truncate" data-v-2d9fa810${_scopeId}>${ssrInterpolate(__props.synergy.planner.upcoming[0].title)}</span></div>`);
              } else {
                _push2(`<div class="text-center py-4 text-slate-400 text-xs font-bold bg-slate-50 dark:bg-black/10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800" data-v-2d9fa810${_scopeId}>${ssrInterpolate(_ctx.$t("dash_all_tasks_done"))}</div>`);
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
              _push2(`<div class="w-11 h-11 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-4" data-v-2d9fa810${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "habit",
                size: "22"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="space-y-1" data-v-2d9fa810${_scopeId}><h4 class="text-base font-black text-slate-900 dark:text-white leading-tight" data-v-2d9fa810${_scopeId}>Habits</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-2d9fa810${_scopeId}>${ssrInterpolate(__props.synergy.habits.completed)}/${ssrInterpolate(__props.synergy.habits.total)} Done</p></div><div class="mt-4 flex items-center gap-2" data-v-2d9fa810${_scopeId}><div class="flex-grow bg-slate-50 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden" data-v-2d9fa810${_scopeId}><div class="bg-indigo-600 h-full rounded-full transition-all duration-1000" style="${ssrRenderStyle(`width: ${__props.synergy.habits.percent}%`)}" data-v-2d9fa810${_scopeId}></div></div><span class="text-[10px] font-black text-indigo-600" data-v-2d9fa810${_scopeId}>${ssrInterpolate(__props.synergy.habits.percent)}%</span></div>`);
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
              _push2(`<div class="relative z-10 h-full flex flex-col justify-between" data-v-2d9fa810${_scopeId}><div class="w-11 h-11 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-4" data-v-2d9fa810${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "journal",
                size: "22"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="space-y-1" data-v-2d9fa810${_scopeId}><h4 class="text-base font-black text-white leading-tight" data-v-2d9fa810${_scopeId}>Journal</h4><p class="${ssrRenderClass([__props.synergy.journal.is_written ? "text-emerald-400" : "text-slate-400 uppercase tracking-widest", "text-[10px] font-bold"])}" data-v-2d9fa810${_scopeId}>${ssrInterpolate(__props.synergy.journal.is_written ? "Written" : "Empty")}</p></div></div>`);
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
        _push(`<div id="widget-finance" class="${ssrRenderClass([unref(isExplorer) ? "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm" : "bg-indigo-600 shadow-xl shadow-indigo-100 dark:shadow-none text-white", "col-span-12 group p-10 rounded-[3rem] transition-all relative overflow-hidden cursor-pointer"])}" data-v-2d9fa810>`);
        if (!unref(isExplorer)) {
          _push(`<!--[--><div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" data-v-2d9fa810></div><div class="absolute -left-4 -bottom-10 w-24 h-24 bg-black/10 rounded-full" data-v-2d9fa810></div>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "finance",
            size: "200",
            class: "absolute -right-16 -top-16 opacity-10 group-hover:rotate-12 transition-transform duration-[2000ms]"
          }, null, _parent));
          _push(`<div class="relative z-10" data-v-2d9fa810><div class="flex items-center justify-between mb-8" data-v-2d9fa810><h3 class="text-3xl font-black tracking-tighter uppercase leading-none" data-v-2d9fa810>Monetary OS</h3><div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20" data-v-2d9fa810>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "finance",
            size: "20"
          }, null, _parent));
          _push(`</div></div><div class="grid grid-cols-2 gap-8" data-v-2d9fa810><div class="space-y-1" data-v-2d9fa810><p class="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] opacity-80" data-v-2d9fa810>Expenses</p><p class="text-2xl font-black tracking-tight truncate tabular-nums" data-v-2d9fa810>${ssrInterpolate(formatRupiah(__props.synergy.finance.expense))}</p></div><div class="space-y-1" data-v-2d9fa810><p class="text-[10px] font-black text-emerald-200 uppercase tracking-[0.2em] opacity-80" data-v-2d9fa810>Income</p><p class="text-2xl font-black text-emerald-300 tracking-tight truncate tabular-nums" data-v-2d9fa810>+${ssrInterpolate(formatRupiah(__props.synergy.finance.income))}</p></div></div></div><!--]-->`);
        } else {
          _push(`<div class="flex flex-col gap-6" data-v-2d9fa810><div class="flex items-center justify-between" data-v-2d9fa810><div data-v-2d9fa810><h3 class="text-xl font-black text-slate-800 dark:text-white leading-none mb-2" data-v-2d9fa810>Neural Wealth Forecast</h3><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-2d9fa810>Architect Premium Insight</p></div><div class="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 flex items-center justify-center" data-v-2d9fa810>`);
          _push(ssrRenderComponent(unref(TrendingUp), { size: 24 }, null, _parent));
          _push(`</div></div><div class="h-20 flex items-end gap-1.5 opacity-20 blur-[1px] group-hover:opacity-40 transition-opacity" data-v-2d9fa810><!--[-->`);
          ssrRenderList([30, 50, 40, 70, 90, 60, 100, 80], (h) => {
            _push(`<div style="${ssrRenderStyle({ height: h + "%" })}" class="flex-1 bg-indigo-500 rounded-t-lg" data-v-2d9fa810></div>`);
          });
          _push(`<!--]--></div><div class="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest" data-v-2d9fa810> Unlock Predictive AI `);
          _push(ssrRenderComponent(unref(ArrowRight), { size: 14 }, null, _parent));
          _push(`</div></div>`);
        }
        _push(`</div><div id="widget-goals" class="col-span-12 group bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all flex flex-col gap-6 cursor-pointer" data-v-2d9fa810><div class="flex items-center justify-between w-full" data-v-2d9fa810><div class="flex items-center gap-5" data-v-2d9fa810><div class="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 border border-emerald-100 dark:border-emerald-500/20" data-v-2d9fa810>`);
        _push(ssrRenderComponent(unref(Target), {
          size: 28,
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</div><div data-v-2d9fa810><h4 class="text-xl font-black text-slate-900 dark:text-white leading-tight mb-1" data-v-2d9fa810>Strategic Milestones</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-2d9fa810>${ssrInterpolate(__props.synergy.goals.active)} Active Operations</p></div></div>`);
        if (__props.synergy.goals.top_goal) {
          _push(`<div class="px-5 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20" data-v-2d9fa810><div class="text-sm font-black text-emerald-600 dark:text-emerald-400 tabular-nums" data-v-2d9fa810>${ssrInterpolate(__props.synergy.goals.top_goal.percent)}%</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(isExplorer)) {
          _push(`<div class="w-full space-y-3 pt-2" data-v-2d9fa810><div class="flex items-center gap-3" data-v-2d9fa810><span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" data-v-2d9fa810></span><span class="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest" data-v-2d9fa810>AI Strategic Forecast</span></div><div class="grid grid-cols-4 gap-2 px-1 blur-[1.5px] opacity-20 group-hover:opacity-40 transition-all" data-v-2d9fa810><!--[-->`);
          ssrRenderList(4, (i) => {
            _push(`<div class="h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full" style="${ssrRenderStyle({ width: 100 - i * 10 + "%" })}" data-v-2d9fa810></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          isOpen: isPreviewOpen.value,
          module: activePreviewModule.value,
          onClose: ($event) => isPreviewOpen.value = false
        }, null, _parent));
        _push(`<!--]-->`);
      } else if (__props.synergy) {
        _push(`<div class="max-w-[1600px] mx-auto px-10 py-16" data-v-2d9fa810><header class="flex items-end justify-between mb-20" data-v-2d9fa810><div class="space-y-4" data-v-2d9fa810><div class="flex items-center gap-3" data-v-2d9fa810>`);
        if (unref(isExplorer)) {
          _push(`<div class="px-4 py-2 bg-slate-900 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl cursor-pointer active:scale-95 transition-all flex items-center gap-2" data-v-2d9fa810>`);
          _push(ssrRenderComponent(unref(Sparkles), {
            size: 12,
            class: "text-indigo-400"
          }, null, _parent));
          _push(` Upgrade System </div>`);
        } else {
          _push(`<div class="px-4 py-2 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 rounded-2xl text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2" data-v-2d9fa810>`);
          _push(ssrRenderComponent(_component_Gem, { size: 12 }, null, _parent));
          _push(` ${ssrInterpolate(unref(isQuantum) ? "Quantum AI Active" : "Architect Core")}</div>`);
        }
        _push(`<span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]" data-v-2d9fa810>${ssrInterpolate(__props.synergy.date_formatted)}</span></div><h1 class="text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]" data-v-2d9fa810>${ssrInterpolate(_ctx.$t(greetingKey.value))},<br data-v-2d9fa810><span class="text-indigo-600 dark:text-indigo-400" data-v-2d9fa810>${ssrInterpolate(unref(user).name)}</span></h1></div><div class="relative group cursor-default" data-v-2d9fa810><div class="absolute inset-0 bg-indigo-500/10 rounded-full blur-[80px] animate-pulse" data-v-2d9fa810></div><div class="relative w-56 h-56 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800/50 shadow-2xl" data-v-2d9fa810><svg class="absolute w-[94%] h-[94%] -rotate-90" viewBox="0 0 100 100" data-v-2d9fa810><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="3" class="text-slate-50 dark:text-slate-800" data-v-2d9fa810></circle><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", 276)}${ssrRenderAttr("stroke-dashoffset", 276 - 276 * overallScore.value / 100)} class="${ssrRenderClass([unref(isQuantum) ? "text-violet-600 dark:text-violet-500" : "text-indigo-600 dark:text-indigo-500", "transition-all duration-[2500ms]"])}" data-v-2d9fa810></circle></svg><div class="text-center" data-v-2d9fa810><span class="block text-6xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums" data-v-2d9fa810>${ssrInterpolate(overallScore.value)}%</span><span class="text-[11px] font-black text-slate-400 tracking-[0.3em] uppercase" data-v-2d9fa810>Life Synergy</span></div></div></div></header><div class="grid grid-cols-12 gap-8" data-v-2d9fa810><div class="col-span-12 lg:col-span-4 space-y-8" data-v-2d9fa810>`);
        if (unref(isExplorer)) {
          _push(`<div class="bg-slate-900 p-10 rounded-[4rem] text-white relative overflow-hidden group/neural cursor-pointer active:scale-[0.99] transition-all shadow-2xl" data-v-2d9fa810><div class="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-transparent to-transparent opacity-0 group-hover/neural:opacity-100 transition-opacity" data-v-2d9fa810></div><div class="relative z-10" data-v-2d9fa810><div class="flex items-center gap-4 mb-8" data-v-2d9fa810><div class="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/20" data-v-2d9fa810>`);
          _push(ssrRenderComponent(unref(Brain), { size: 24 }, null, _parent));
          _push(`</div><span class="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400" data-v-2d9fa810>Neural Commander</span></div><h3 class="text-2xl font-black mb-4 tracking-tight" data-v-2d9fa810>Access Proactive Intelligence</h3><div class="space-y-4 opacity-20 blur-[1.5px]" data-v-2d9fa810><div class="h-2.5 w-full bg-slate-700 rounded-full" data-v-2d9fa810></div><div class="h-2.5 w-3/4 bg-slate-700 rounded-full" data-v-2d9fa810></div><div class="h-2.5 w-5/6 bg-slate-700 rounded-full" data-v-2d9fa810></div></div><div class="mt-10 flex items-center justify-between text-indigo-400 font-black text-xs uppercase tracking-widest" data-v-2d9fa810> Unlock System `);
          _push(ssrRenderComponent(unref(ArrowRight), {
            size: 16,
            class: "group-hover/neural:translate-x-2 transition-transform"
          }, null, _parent));
          _push(`</div></div>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "platinum",
            size: "200",
            class: "absolute -right-10 -bottom-10 opacity-5 rotate-12"
          }, null, _parent));
          _push(`</div>`);
        } else if (unref(isQuantum)) {
          _push(`<div class="bg-violet-600 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden" data-v-2d9fa810><div class="relative z-10" data-v-2d9fa810><div class="flex items-center gap-4 mb-6" data-v-2d9fa810>`);
          _push(ssrRenderComponent(unref(Sparkles), {
            size: 24,
            class: "text-violet-200 animate-pulse"
          }, null, _parent));
          _push(`<span class="text-[11px] font-black uppercase tracking-[0.3em] text-violet-200" data-v-2d9fa810>Neural Sync Active</span></div><p class="text-2xl font-black leading-tight tracking-tight" data-v-2d9fa810>${ssrInterpolate(((_b = globalInsight.value) == null ? void 0 : _b.summary) || "System fully synchronized. High momentum detected in your routine.")}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-white dark:bg-slate-950 p-10 rounded-[4rem] border border-slate-100 dark:border-slate-800/50 shadow-sm group cursor-pointer hover:shadow-xl transition-all" data-v-2d9fa810><div class="flex items-center justify-between mb-8" data-v-2d9fa810><h3 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none" data-v-2d9fa810>Habit Momentum</h3><div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600" data-v-2d9fa810>`);
        _push(ssrRenderComponent(unref(Zap), { size: 24 }, null, _parent));
        _push(`</div></div><div class="space-y-6" data-v-2d9fa810><div class="flex items-end justify-between" data-v-2d9fa810><span class="text-4xl font-black text-slate-900 dark:text-white tabular-nums" data-v-2d9fa810>${ssrInterpolate(__props.synergy.habits.percent)}<span class="text-xl opacity-30" data-v-2d9fa810>%</span></span><span class="text-[10px] font-black text-slate-400 uppercase tracking-widest" data-v-2d9fa810>Global Status</span></div><div class="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden" data-v-2d9fa810><div class="h-full bg-indigo-600 transition-all duration-1000" style="${ssrRenderStyle({ width: __props.synergy.habits.percent + "%" })}" data-v-2d9fa810></div></div><p class="text-xs font-bold text-slate-400 uppercase tracking-widest" data-v-2d9fa810>${ssrInterpolate(__props.synergy.habits.done)} of ${ssrInterpolate(__props.synergy.habits.total)} synchronized</p></div></div></div><div class="col-span-12 lg:col-span-8 flex flex-col gap-8" data-v-2d9fa810><div class="group relative h-[380px] rounded-[4rem] overflow-hidden cursor-pointer" data-v-2d9fa810>`);
        if (!unref(isExplorer)) {
          _push(`<div class="absolute inset-0 bg-indigo-600 text-white p-12 transition-transform duration-700 group-hover:scale-[1.02]" data-v-2d9fa810>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "finance",
            size: "400",
            class: "absolute -right-20 -top-20 opacity-10 rotate-12"
          }, null, _parent));
          _push(`<div class="relative z-10 h-full flex flex-col justify-between" data-v-2d9fa810><div class="flex items-start justify-between" data-v-2d9fa810><div class="space-y-2" data-v-2d9fa810><h3 class="text-5xl font-black tracking-tighter uppercase leading-none" data-v-2d9fa810>Monetary OS</h3><p class="text-sm font-bold text-indigo-200 uppercase tracking-[0.2em] opacity-80" data-v-2d9fa810>Advanced Wealth Tracking</p></div><div class="bg-white/20 backdrop-blur-md p-4 rounded-3xl border border-white/20" data-v-2d9fa810>`);
          _push(ssrRenderComponent(unref(TrendingUp), { size: 32 }, null, _parent));
          _push(`</div></div><div class="grid grid-cols-2 gap-12" data-v-2d9fa810><div class="space-y-3" data-v-2d9fa810><p class="text-xs font-black text-indigo-200 uppercase tracking-widest opacity-60" data-v-2d9fa810>Revenue Current</p><p class="text-5xl font-black tracking-tighter tabular-nums" data-v-2d9fa810>${ssrInterpolate(formatRupiah(__props.synergy.finance.income))}</p></div><div class="space-y-3" data-v-2d9fa810><p class="text-xs font-black text-indigo-200 uppercase tracking-widest opacity-60" data-v-2d9fa810>Burn Current</p><p class="text-5xl font-black tracking-tighter tabular-nums" data-v-2d9fa810>${ssrInterpolate(formatRupiah(__props.synergy.finance.expense))}</p></div></div></div></div>`);
        } else {
          _push(`<div class="absolute inset-0 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50 p-12" data-v-2d9fa810><div class="h-full flex flex-col justify-between" data-v-2d9fa810><div class="flex items-center justify-between" data-v-2d9fa810><div class="space-y-2" data-v-2d9fa810><h3 class="text-4xl font-black text-slate-800 dark:text-white tracking-tighter uppercase leading-none" data-v-2d9fa810>Neural Wealth Engine</h3><p class="text-xs font-bold text-slate-400 uppercase tracking-widest" data-v-2d9fa810>Architect Exclusive Feature</p></div><div class="w-16 h-16 rounded-[2rem] bg-indigo-50 dark:bg-slate-900 text-indigo-600 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/30" data-v-2d9fa810>`);
          _push(ssrRenderComponent(unref(TrendingUp), { size: 32 }, null, _parent));
          _push(`</div></div><div class="flex items-end gap-3 h-32 opacity-20 blur-[2px] group-hover:opacity-40 transition-all" data-v-2d9fa810><!--[-->`);
          ssrRenderList([40, 60, 50, 80, 100, 70, 90, 60, 110, 80], (h) => {
            _push(`<div style="${ssrRenderStyle({ height: h + "%" })}" class="flex-1 bg-indigo-500 rounded-t-2xl" data-v-2d9fa810></div>`);
          });
          _push(`<!--]--></div><div class="flex items-center gap-4 text-indigo-600 dark:text-indigo-400 font-black text-sm uppercase tracking-[0.2em]" data-v-2d9fa810> Unlock Predictive Projections `);
          _push(ssrRenderComponent(unref(ArrowRight), { size: 20 }, null, _parent));
          _push(`</div></div></div>`);
        }
        _push(`</div><div class="bg-white dark:bg-slate-950 p-10 rounded-[4rem] border border-slate-100 dark:border-slate-800/50 shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-xl transition-all" data-v-2d9fa810><div class="flex items-center gap-8" data-v-2d9fa810><div class="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-[2rem] flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20 transition-transform group-hover:scale-110" data-v-2d9fa810>`);
        _push(ssrRenderComponent(unref(Target), { size: 36 }, null, _parent));
        _push(`</div><div class="space-y-1" data-v-2d9fa810><h4 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none" data-v-2d9fa810>Strategic Ambitions</h4><p class="text-[11px] font-black text-slate-400 uppercase tracking-[0.22em]" data-v-2d9fa810>${ssrInterpolate(__props.synergy.goals.active)} Active Missions</p></div></div>`);
        if (__props.synergy.goals.top_goal || unref(isExplorer)) {
          _push(`<div class="flex items-center gap-10" data-v-2d9fa810>`);
          if (unref(isExplorer)) {
            _push(`<div class="space-y-2 text-right" data-v-2d9fa810><p class="text-[10px] font-black text-indigo-600 uppercase tracking-widest" data-v-2d9fa810>Neural Strategic Path</p><div class="flex gap-1.5 blur-[1.5px] opacity-30" data-v-2d9fa810><!--[-->`);
            ssrRenderList(5, (i) => {
              _push(`<div class="w-8 h-1.5 bg-indigo-500 rounded-full" data-v-2d9fa810></div>`);
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (__props.synergy.goals.top_goal) {
            _push(`<div class="px-8 py-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-3xl border border-emerald-100 dark:border-emerald-500/20" data-v-2d9fa810><span class="text-3xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums" data-v-2d9fa810>${ssrInterpolate(__props.synergy.goals.top_goal.percent || 0)}<span class="text-lg opacity-40" data-v-2d9fa810>%</span></span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10" data-v-2d9fa810><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="bg-white dark:bg-slate-900 rounded-[2rem] animate-pulse p-10 h-80 col-span-12 lg:col-span-4" data-v-2d9fa810><div class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8" data-v-2d9fa810></div><div class="h-10 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6" data-v-2d9fa810></div><div class="h-24 w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl" data-v-2d9fa810></div></div>`);
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
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2d9fa810"]]);
export {
  Dashboard as default
};
