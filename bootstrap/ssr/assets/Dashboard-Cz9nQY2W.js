import { computed, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-Dr4uklmL.js";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./OneForMindIcon-Dwf7AvKJ.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AuthenticatedLayout }, {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    synergy: Object,
    stats: Object
  },
  setup(__props) {
    const user = usePage().props.auth.user;
    const props = __props;
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
      return Math.round((props.synergy.habits.percent + props.synergy.planner.percent) / 2);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("nav_dashboard")
      }, null, _parent));
      _push(`<div class="w-full lg:max-w-[96%] mx-auto p-4 md:p-6 lg:p-8 space-y-6 lg:space-y-8 pb-24" data-v-0c47be3f><div class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-indigo-600 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border border-indigo-700/50 group" data-v-0c47be3f><div class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px] group-hover:bg-indigo-400/40 transition-colors duration-1000" data-v-0c47be3f></div><div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white/5 rounded-full blur-[80px]" data-v-0c47be3f></div><div class="relative z-10 w-full md:w-2/3" data-v-0c47be3f><div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6 text-sm font-bold text-indigo-100 tracking-wide" data-v-0c47be3f><div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" data-v-0c47be3f></div> ${ssrInterpolate(__props.synergy.date_formatted)}</div><h2 class="text-4xl md:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-white to-white bg-clip-text text-transparent drop-shadow-sm" data-v-0c47be3f>${ssrInterpolate(_ctx.$t(greetingKey.value))}, <br class="hidden md:block" data-v-0c47be3f> ${ssrInterpolate(unref(user).name)}! 👋 </h2><p class="text-whitetext-lg md:text-xl font-medium max-w-2xl leading-relaxed" data-v-0c47be3f>${ssrInterpolate(_ctx.$t("dash_hero_subtitle"))}</p></div><div class="relative z-10 w-full md:w-auto flex justify-start md:justify-end" data-v-0c47be3f><div class="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500" data-v-0c47be3f><svg class="absolute inset-0 w-full h-full -rotate-90 p-4" viewBox="0 0 36 36" data-v-0c47be3f><path class="text-white/10" stroke-width="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" data-v-0c47be3f></path><path class="text-indigo-400 transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]" stroke-dasharray="100, 100"${ssrRenderAttr("stroke-dashoffset", 100 - overallScore.value)} stroke-linecap="round" stroke-width="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" data-v-0c47be3f></path></svg><div class="text-center" data-v-0c47be3f><span class="block text-4xl md:text-5xl font-black text-white drop-shadow-md" data-v-0c47be3f>${ssrInterpolate(overallScore.value)}<span class="text-xl text-indigo-300" data-v-0c47be3f>%</span></span><span class="block text-[10px] uppercase tracking-widest text-indigo-200 font-bold mt-1" data-v-0c47be3f>${ssrInterpolate(_ctx.$t("dash_synergy_today"))}</span></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8" data-v-0c47be3f>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("habits.index"),
        class: "col-span-1 md:col-span-6 lg:col-span-4 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 text-8xl -mt-6 -mr-6 grayscale group-hover:grayscale-0" data-v-0c47be3f${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "habit",
              size: "120",
              "stroke-width": "1.5"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative z-10" data-v-0c47be3f${_scopeId}><div class="flex justify-between items-start mb-6" data-v-0c47be3f${_scopeId}><div class="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 border border-indigo-100" data-v-0c47be3f${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "habit",
              size: "32"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-black tracking-wider shadow-inner" data-v-0c47be3f${_scopeId}>${ssrInterpolate(__props.synergy.habits.completed)} / ${ssrInterpolate(__props.synergy.habits.total)}</div></div><h3 class="text-2xl font-black text-slate-800 mb-2" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_habit_title"))}</h3><p class="text-slate-500 text-sm font-medium leading-relaxed" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_habit_desc"))}</p></div><div class="relative z-10 mt-8" data-v-0c47be3f${_scopeId}><div class="flex justify-between text-xs font-bold mb-3" data-v-0c47be3f${_scopeId}><span class="text-slate-400 uppercase tracking-wider" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_progress"))}</span><span class="text-indigo-600" data-v-0c47be3f${_scopeId}>${ssrInterpolate(__props.synergy.habits.percent)}%</span></div><div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner" data-v-0c47be3f${_scopeId}><div class="bg-indigo-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" style="${ssrRenderStyle(`width: ${__props.synergy.habits.percent}%`)}" data-v-0c47be3f${_scopeId}><div class="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" data-v-0c47be3f${_scopeId}></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 text-8xl -mt-6 -mr-6 grayscale group-hover:grayscale-0" }, [
                createVNode(_sfc_main$1, {
                  name: "habit",
                  size: "120",
                  "stroke-width": "1.5"
                })
              ]),
              createVNode("div", { class: "relative z-10" }, [
                createVNode("div", { class: "flex justify-between items-start mb-6" }, [
                  createVNode("div", { class: "w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 border border-indigo-100" }, [
                    createVNode(_sfc_main$1, {
                      name: "habit",
                      size: "32"
                    })
                  ]),
                  createVNode("div", { class: "bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-black tracking-wider shadow-inner" }, toDisplayString(__props.synergy.habits.completed) + " / " + toDisplayString(__props.synergy.habits.total), 1)
                ]),
                createVNode("h3", { class: "text-2xl font-black text-slate-800 mb-2" }, toDisplayString(_ctx.$t("dash_habit_title")), 1),
                createVNode("p", { class: "text-slate-500 text-sm font-medium leading-relaxed" }, toDisplayString(_ctx.$t("dash_habit_desc")), 1)
              ]),
              createVNode("div", { class: "relative z-10 mt-8" }, [
                createVNode("div", { class: "flex justify-between text-xs font-bold mb-3" }, [
                  createVNode("span", { class: "text-slate-400 uppercase tracking-wider" }, toDisplayString(_ctx.$t("dash_progress")), 1),
                  createVNode("span", { class: "text-indigo-600" }, toDisplayString(__props.synergy.habits.percent) + "%", 1)
                ]),
                createVNode("div", { class: "w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner" }, [
                  createVNode("div", {
                    class: "bg-indigo-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden",
                    style: `width: ${__props.synergy.habits.percent}%`
                  }, [
                    createVNode("div", { class: "absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" })
                  ], 4)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("planner.index"),
        prefetch: "",
        class: "col-span-1 md:col-span-6 lg:col-span-5 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-0c47be3f${_scopeId}><div class="flex justify-between items-center mb-6" data-v-0c47be3f${_scopeId}><div class="flex items-center gap-4" data-v-0c47be3f${_scopeId}><div class="w-14 h-14 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:-rotate-12 transition-transform duration-300 border border-slate-200" data-v-0c47be3f${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "planner",
              size: "32"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-0c47be3f${_scopeId}><h3 class="text-2xl font-black text-slate-800" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_planner_title"))}</h3><p class="text-slate-500 text-sm font-medium mt-1" data-v-0c47be3f${_scopeId}>${ssrInterpolate(__props.synergy.planner.completed)} ${ssrInterpolate(_ctx.$t("dash_from"))} ${ssrInterpolate(__props.synergy.planner.total)} ${ssrInterpolate(_ctx.$t("dash_tasks_done"))}</p></div></div><div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors" data-v-0c47be3f${_scopeId}><svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-0c47be3f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" data-v-0c47be3f${_scopeId}></path></svg></div></div></div><div class="bg-slate-50/80 rounded-[1.5rem] p-5 mt-2 border border-slate-100/50" data-v-0c47be3f${_scopeId}><p class="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_upcoming"))}</p>`);
            if (__props.synergy.planner.upcoming.length > 0) {
              _push2(`<div class="space-y-3" data-v-0c47be3f${_scopeId}><!--[-->`);
              ssrRenderList(__props.synergy.planner.upcoming, (task, index) => {
                _push2(`<div class="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:border-indigo-100 transition-colors" style="${ssrRenderStyle(`transition-delay: ${index * 75}ms`)}" data-v-0c47be3f${_scopeId}><span class="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg shrink-0 border border-indigo-100/50" data-v-0c47be3f${_scopeId}>${ssrInterpolate(task.start_time || "--:--")}</span><span class="text-sm font-bold text-slate-700 truncate" data-v-0c47be3f${_scopeId}>${ssrInterpolate(task.title)}</span></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="flex flex-col items-center justify-center py-6 text-center" data-v-0c47be3f${_scopeId}><div class="text-4xl mb-3 drop-shadow-sm" data-v-0c47be3f${_scopeId}>✨</div><p class="text-slate-500 font-bold text-sm" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_all_tasks_done"))}</p></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("div", { class: "w-14 h-14 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:-rotate-12 transition-transform duration-300 border border-slate-200" }, [
                      createVNode(_sfc_main$1, {
                        name: "planner",
                        size: "32"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-2xl font-black text-slate-800" }, toDisplayString(_ctx.$t("dash_planner_title")), 1),
                      createVNode("p", { class: "text-slate-500 text-sm font-medium mt-1" }, toDisplayString(__props.synergy.planner.completed) + " " + toDisplayString(_ctx.$t("dash_from")) + " " + toDisplayString(__props.synergy.planner.total) + " " + toDisplayString(_ctx.$t("dash_tasks_done")), 1)
                    ])
                  ]),
                  createVNode("div", { class: "w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 group-hover:translate-x-1 transition-transform",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2.5"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M13 7l5 5m0 0l-5 5m5-5H6"
                      })
                    ]))
                  ])
                ])
              ]),
              createVNode("div", { class: "bg-slate-50/80 rounded-[1.5rem] p-5 mt-2 border border-slate-100/50" }, [
                createVNode("p", { class: "text-xs font-black text-indigo-400 uppercase tracking-widest mb-4" }, toDisplayString(_ctx.$t("dash_upcoming")), 1),
                __props.synergy.planner.upcoming.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-3"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.synergy.planner.upcoming, (task, index) => {
                    return openBlock(), createBlock("div", {
                      key: task.id,
                      class: "flex items-center gap-4 bg-white p-3.5 rounded-xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:border-indigo-100 transition-colors",
                      style: `transition-delay: ${index * 75}ms`
                    }, [
                      createVNode("span", { class: "text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg shrink-0 border border-indigo-100/50" }, toDisplayString(task.start_time || "--:--"), 1),
                      createVNode("span", { class: "text-sm font-bold text-slate-700 truncate" }, toDisplayString(task.title), 1)
                    ], 4);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex flex-col items-center justify-center py-6 text-center"
                }, [
                  createVNode("div", { class: "text-4xl mb-3 drop-shadow-sm" }, "✨"),
                  createVNode("p", { class: "text-slate-500 font-bold text-sm" }, toDisplayString(_ctx.$t("dash_all_tasks_done")), 1)
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("finance.index"),
        prefetch: "",
        class: "col-span-1 md:col-span-12 lg:col-span-3 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[2rem] p-8 text-white shadow-lg shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700" data-v-0c47be3f${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "finance",
              size: "160",
              "stroke-width": "1.5"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="relative z-10" data-v-0c47be3f${_scopeId}><div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 transition-transform" data-v-0c47be3f${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "finance",
              size: "28"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="text-xl font-black mb-1" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_finance_title"))}</h3><p class="text-indigo-100 text-sm font-medium opacity-90" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_finance_desc"))}</p></div><div class="relative z-10 mt-8 space-y-4" data-v-0c47be3f${_scopeId}><div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 shadow-inner" data-v-0c47be3f${_scopeId}><p class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_expense"))}</p><h4 class="text-2xl font-black text-white truncate" data-v-0c47be3f${_scopeId}>${ssrInterpolate(formatRupiah(__props.synergy.finance.expense))}</h4></div>`);
            if (__props.synergy.finance.income > 0) {
              _push2(`<div class="bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/5 flex items-center justify-between" data-v-0c47be3f${_scopeId}><span class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_income"))}</span><span class="text-sm font-black text-emerald-400 drop-shadow-sm" data-v-0c47be3f${_scopeId}>+ ${ssrInterpolate(formatRupiah(__props.synergy.finance.income))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700" }, [
                createVNode(_sfc_main$1, {
                  name: "finance",
                  size: "160",
                  "stroke-width": "1.5"
                })
              ]),
              createVNode("div", { class: "relative z-10" }, [
                createVNode("div", { class: "w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 transition-transform" }, [
                  createVNode(_sfc_main$1, {
                    name: "finance",
                    size: "28"
                  })
                ]),
                createVNode("h3", { class: "text-xl font-black mb-1" }, toDisplayString(_ctx.$t("dash_finance_title")), 1),
                createVNode("p", { class: "text-indigo-100 text-sm font-medium opacity-90" }, toDisplayString(_ctx.$t("dash_finance_desc")), 1)
              ]),
              createVNode("div", { class: "relative z-10 mt-8 space-y-4" }, [
                createVNode("div", { class: "bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 shadow-inner" }, [
                  createVNode("p", { class: "text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1" }, toDisplayString(_ctx.$t("dash_expense")), 1),
                  createVNode("h4", { class: "text-2xl font-black text-white truncate" }, toDisplayString(formatRupiah(__props.synergy.finance.expense)), 1)
                ]),
                __props.synergy.finance.income > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/5 flex items-center justify-between"
                }, [
                  createVNode("span", { class: "text-[10px] font-bold text-indigo-200 uppercase tracking-widest" }, toDisplayString(_ctx.$t("dash_income")), 1),
                  createVNode("span", { class: "text-sm font-black text-emerald-400 drop-shadow-sm" }, "+ " + toDisplayString(formatRupiah(__props.synergy.finance.income)), 1)
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: __props.synergy.journal.is_written ? _ctx.route("journal.write", __props.synergy.journal.id) : _ctx.route("journal.index"),
        prefetch: "",
        class: "col-span-1 md:col-span-7 lg:col-span-7 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 group overflow-hidden relative"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-indigo-50/80 to-white/0 pointer-events-none" data-v-0c47be3f${_scopeId}></div><div class="absolute right-0 bottom-0 p-8 opacity-20 translate-x-4 translate-y-4 group-hover:rotate-12 transition-transform duration-700" data-v-0c47be3f${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "journal",
              size: "120",
              "stroke-width": "1.5"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="p-8 md:p-10 flex flex-col justify-between h-full relative z-10" data-v-0c47be3f${_scopeId}><div data-v-0c47be3f${_scopeId}><div class="w-14 h-14 bg-white text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform duration-300 border border-slate-100 shadow-sm" data-v-0c47be3f${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "journal",
              size: "32"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="text-3xl font-black text-slate-800 mb-3" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_journal_title"))}</h3></div><div class="mt-4" data-v-0c47be3f${_scopeId}>`);
            if (__props.synergy.journal.is_written) {
              _push2(`<div class="bg-indigo-50/50 border border-indigo-100/50 p-6 rounded-2xl backdrop-blur-sm" data-v-0c47be3f${_scopeId}><p class="text-slate-600 font-medium leading-relaxed" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_journal_written"))} <span class="text-2xl ml-2 align-middle drop-shadow-sm" data-v-0c47be3f${_scopeId}>${ssrInterpolate(__props.synergy.journal.mood === "happy" ? "😄" : "✨")}</span></p><div class="mt-4 inline-flex items-center text-sm font-black text-indigo-600 tracking-wide uppercase" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_journal_continue"))} <span class="ml-2 group-hover:translate-x-1 transition-transform" data-v-0c47be3f${_scopeId}>→</span></div></div>`);
            } else {
              _push2(`<div class="bg-slate-50 border border-slate-100 p-6 rounded-2xl group-hover:bg-indigo-50/50 group-hover:border-indigo-100/50 transition-colors" data-v-0c47be3f${_scopeId}><p class="text-slate-600 font-medium leading-relaxed italic" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_journal_prompt"))}</p><div class="mt-4 inline-flex items-center text-sm font-black text-indigo-600 tracking-wide uppercase" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_journal_start"))} <span class="ml-2 group-hover:translate-x-1 transition-transform" data-v-0c47be3f${_scopeId}>→</span></div></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-indigo-50/80 to-white/0 pointer-events-none" }),
              createVNode("div", { class: "absolute right-0 bottom-0 p-8 opacity-20 translate-x-4 translate-y-4 group-hover:rotate-12 transition-transform duration-700" }, [
                createVNode(_sfc_main$1, {
                  name: "journal",
                  size: "120",
                  "stroke-width": "1.5"
                })
              ]),
              createVNode("div", { class: "p-8 md:p-10 flex flex-col justify-between h-full relative z-10" }, [
                createVNode("div", null, [
                  createVNode("div", { class: "w-14 h-14 bg-white text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform duration-300 border border-slate-100 shadow-sm" }, [
                    createVNode(_sfc_main$1, {
                      name: "journal",
                      size: "32"
                    })
                  ]),
                  createVNode("h3", { class: "text-3xl font-black text-slate-800 mb-3" }, toDisplayString(_ctx.$t("dash_journal_title")), 1)
                ]),
                createVNode("div", { class: "mt-4" }, [
                  __props.synergy.journal.is_written ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-indigo-50/50 border border-indigo-100/50 p-6 rounded-2xl backdrop-blur-sm"
                  }, [
                    createVNode("p", { class: "text-slate-600 font-medium leading-relaxed" }, [
                      createTextVNode(toDisplayString(_ctx.$t("dash_journal_written")) + " ", 1),
                      createVNode("span", { class: "text-2xl ml-2 align-middle drop-shadow-sm" }, toDisplayString(__props.synergy.journal.mood === "happy" ? "😄" : "✨"), 1)
                    ]),
                    createVNode("div", { class: "mt-4 inline-flex items-center text-sm font-black text-indigo-600 tracking-wide uppercase" }, [
                      createTextVNode(toDisplayString(_ctx.$t("dash_journal_continue")) + " ", 1),
                      createVNode("span", { class: "ml-2 group-hover:translate-x-1 transition-transform" }, "→")
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "bg-slate-50 border border-slate-100 p-6 rounded-2xl group-hover:bg-indigo-50/50 group-hover:border-indigo-100/50 transition-colors"
                  }, [
                    createVNode("p", { class: "text-slate-600 font-medium leading-relaxed italic" }, toDisplayString(_ctx.$t("dash_journal_prompt")), 1),
                    createVNode("div", { class: "mt-4 inline-flex items-center text-sm font-black text-indigo-600 tracking-wide uppercase" }, [
                      createTextVNode(toDisplayString(_ctx.$t("dash_journal_start")) + " ", 1),
                      createVNode("span", { class: "ml-2 group-hover:translate-x-1 transition-transform" }, "→")
                    ])
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("calendar.index"),
        prefetch: "",
        class: "col-span-1 md:col-span-5 lg:col-span-5 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-0c47be3f${_scopeId}><div class="flex justify-between items-center mb-8" data-v-0c47be3f${_scopeId}><div class="flex items-center gap-4" data-v-0c47be3f${_scopeId}><div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-indigo-100" data-v-0c47be3f${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "calendar",
              size: "32"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-0c47be3f${_scopeId}><h3 class="text-2xl font-black text-slate-800" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_calendar_title"))}</h3><p class="text-slate-500 text-sm font-medium mt-1" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_calendar_desc"))}</p></div></div></div></div><div class="bg-slate-50/80 rounded-[1.5rem] p-5 border border-slate-100/50 h-full" data-v-0c47be3f${_scopeId}>`);
            if (__props.synergy.events.length > 0) {
              _push2(`<div class="space-y-4" data-v-0c47be3f${_scopeId}><!--[-->`);
              ssrRenderList(__props.synergy.events, (evt, i) => {
                _push2(`<div class="flex gap-4 items-start bg-white p-3.5 rounded-xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:border-indigo-100 transition-colors" style="${ssrRenderStyle(`transition-delay: ${i * 100}ms`)}" data-v-0c47be3f${_scopeId}><div class="w-3 h-3 rounded-full bg-indigo-500 mt-1.5 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.6)] animate-pulse" data-v-0c47be3f${_scopeId}></div><div data-v-0c47be3f${_scopeId}><p class="text-sm font-black text-slate-700 leading-snug" data-v-0c47be3f${_scopeId}>${ssrInterpolate(evt.title)}</p><p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1" data-v-0c47be3f${_scopeId}>${ssrInterpolate(evt.start_date === evt.end_date ? _ctx.$t("dash_today_only") : _ctx.$t("dash_ongoing"))}</p></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="h-full flex flex-col items-center justify-center py-6 text-center" data-v-0c47be3f${_scopeId}><div class="text-4xl mb-3 opacity-50 grayscale drop-shadow-sm group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" data-v-0c47be3f${_scopeId}>🏖️</div><p class="text-slate-500 font-bold text-sm" data-v-0c47be3f${_scopeId}>${ssrInterpolate(_ctx.$t("dash_no_events"))}</p></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "flex justify-between items-center mb-8" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("div", { class: "w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-indigo-100" }, [
                      createVNode(_sfc_main$1, {
                        name: "calendar",
                        size: "32"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-2xl font-black text-slate-800" }, toDisplayString(_ctx.$t("dash_calendar_title")), 1),
                      createVNode("p", { class: "text-slate-500 text-sm font-medium mt-1" }, toDisplayString(_ctx.$t("dash_calendar_desc")), 1)
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "bg-slate-50/80 rounded-[1.5rem] p-5 border border-slate-100/50 h-full" }, [
                __props.synergy.events.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.synergy.events, (evt, i) => {
                    return openBlock(), createBlock("div", {
                      key: evt.id,
                      class: "flex gap-4 items-start bg-white p-3.5 rounded-xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:border-indigo-100 transition-colors",
                      style: `transition-delay: ${i * 100}ms`
                    }, [
                      createVNode("div", { class: "w-3 h-3 rounded-full bg-indigo-500 mt-1.5 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.6)] animate-pulse" }),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-black text-slate-700 leading-snug" }, toDisplayString(evt.title), 1),
                        createVNode("p", { class: "text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1" }, toDisplayString(evt.start_date === evt.end_date ? _ctx.$t("dash_today_only") : _ctx.$t("dash_ongoing")), 1)
                      ])
                    ], 4);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "h-full flex flex-col items-center justify-center py-6 text-center"
                }, [
                  createVNode("div", { class: "text-4xl mb-3 opacity-50 grayscale drop-shadow-sm group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" }, "🏖️"),
                  createVNode("p", { class: "text-slate-500 font-bold text-sm" }, toDisplayString(_ctx.$t("dash_no_events")), 1)
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
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
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0c47be3f"]]);
export {
  Dashboard as default
};
