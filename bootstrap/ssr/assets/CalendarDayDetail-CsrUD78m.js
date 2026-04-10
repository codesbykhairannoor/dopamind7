import { computed, unref, withCtx, createVNode, createBlock, toDisplayString, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import dayjs from "dayjs";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "CalendarDayDetail",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    date: String,
    calendarDays: Array
  },
  emits: ["close", "edit-event", "delete-event"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const page = usePage();
    const dayData = computed(() => {
      if (!props.date) return null;
      return props.calendarDays.find((d) => d.date === props.date) || null;
    });
    const rawData = computed(() => page.props.data || {});
    const dailyJournal = computed(() => {
      var _a;
      return ((_a = rawData.value.journals) == null ? void 0 : _a[props.date]) || null;
    });
    const dailyFinance = computed(() => {
      var _a;
      return ((_a = rawData.value.finances) == null ? void 0 : _a[props.date]) || 0;
    });
    const dailyHabitCount = computed(() => {
      var _a;
      return ((_a = rawData.value.habits) == null ? void 0 : _a[props.date]) || 0;
    });
    const dailyPlanner = computed(() => {
      if (!rawData.value.planners) return null;
      return rawData.value.planners[props.date] || null;
    });
    const dailyMilestones = computed(() => {
      var _a;
      return ((_a = rawData.value.milestones) == null ? void 0 : _a[props.date]) || [];
    });
    const displayDate = computed(() => {
      const locale = page.props.locale || "id";
      return props.date ? dayjs(props.date).locale(locale).format("dddd, DD MMMM YYYY") : "";
    });
    const formatCurrency = (angka) => {
      const locale = page.props.locale || "id";
      return new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", { style: "currency", currency: locale === "id" ? "IDR" : "USD", maximumFractionDigits: 0 }).format(angka);
    };
    const plannerProgress = computed(() => {
      if (!dailyPlanner.value || dailyPlanner.value.total_tasks === 0) return 0;
      return Math.round(dailyPlanner.value.completed_tasks / dailyPlanner.value.total_tasks * 100);
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        var _a, _b;
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"><div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"></div><div class="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl dark:shadow-none overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-white/50 dark:ring-slate-800 transition-colors duration-500"><div class="px-6 py-6 sm:px-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 relative overflow-hidden transition-colors duration-500"><div class="absolute inset-0 bg-gradient-to-r from-indigo-50/50 dark:from-indigo-900/10 to-transparent"></div><div class="relative z-10 flex items-center gap-5"><div class="w-14 h-14 bg-indigo-600 text-white rounded-[1.25rem] flex items-center justify-center text-2xl shadow-xl shadow-indigo-200 dark:shadow-none font-black transition-all duration-500 transform hover:scale-105">${ssrInterpolate(unref(dayjs)(props.date).format("DD"))}</div><div><p class="text-indigo-600 dark:text-indigo-400 text-[11px] font-bold tracking-widest mb-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("calendar_day_overview", "Command center"))}</p><h2 class="text-xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-none transition-colors duration-500">${ssrInterpolate(displayDate.value)}</h2></div></div><button class="relative z-10 w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 shadow-sm hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950/50 transition-colors duration-500"><div class="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16"><div class="lg:col-span-3 space-y-10"><div class="flex items-center justify-between border-b border-slate-100/80 dark:border-slate-800/80 pb-5 transition-colors duration-500"><h3 class="text-base font-black text-slate-800 dark:text-white flex items-center gap-3 transition-colors duration-500"><span class="text-xl">📅</span> ${ssrInterpolate(_ctx.$t("calendar_events_schedule", "Events schedule"))}</h3><span class="text-[11px] font-black text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-3 py-1.5 rounded-xl shadow-sm transition-colors duration-500 tracking-widest">${ssrInterpolate(((_a = dayData.value) == null ? void 0 : _a.events.length) || 0)} ${ssrInterpolate(_ctx.$t("calendar_events_count", "events"))}</span></div>`);
          if (((_b = dayData.value) == null ? void 0 : _b.events.length) === 0) {
            _push2(`<div class="bg-white dark:bg-slate-900 rounded-[3rem] p-16 border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm dark:shadow-none transition-colors duration-500"><div class="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6 text-5xl transition-colors duration-500">🍃</div><h4 class="text-lg font-black text-slate-800 dark:text-white mb-2 transition-colors duration-500">${ssrInterpolate(_ctx.$t("calendar_no_events_title", "Empty day"))}</h4><p class="text-sm font-bold text-slate-400 dark:text-slate-500 max-w-[280px] leading-relaxed transition-colors duration-500">${ssrInterpolate(_ctx.$t("calendar_no_events_desc", "Use this time to rest or focus on your personal life OS."))}</p></div>`);
          } else {
            _push2(`<div class="relative border-l-[3px] border-slate-100 dark:border-slate-800 ml-6 space-y-10 transition-colors duration-500"><div class="absolute -top-3 -left-[6.5px] w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-500"></div><!--[-->`);
            ssrRenderList(dayData.value.events, (ev) => {
              _push2(`<div class="relative pl-10 group"><div class="absolute top-2 -left-[9px] w-4 h-4 rounded-full border-[3px] border-white dark:border-slate-950 shadow-xl ring-4 ring-slate-100/50 dark:ring-slate-800/50 transition-all duration-500 group-hover:scale-125" style="${ssrRenderStyle(`background-color: ${ev.color}`)}"></div><div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none group-hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden"><div class="absolute top-0 left-0 w-2 h-full" style="${ssrRenderStyle(`background-color: ${ev.color}`)}"></div><div class="flex justify-between items-start gap-6"><div class="flex-1"><h4 class="font-black text-slate-800 dark:text-white text-lg sm:text-xl leading-tight transition-colors duration-500">${ssrInterpolate(ev.title)}</h4><div class="flex items-center gap-4 mt-3">`);
              if (ev.start_time) {
                _push2(`<span class="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2 transition-colors duration-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(ev.start_time)} `);
                if (ev.end_time) {
                  _push2(`<span class="mx-1.5 opacity-50">•</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(` ${ssrInterpolate(ev.end_time)}</span>`);
              } else if (ev.is_all_day) {
                _push2(`<span class="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-500/20 transition-colors duration-500 tracking-widest">All day</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (ev.description) {
                _push2(`<div class="mt-5 text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-800/50 p-5 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 transition-colors duration-500">${ssrInterpolate(ev.description)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0"><button class="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-100 dark:border-slate-700 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white rounded-2xl shadow-sm transition-all active:scale-95"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button><button class="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-slate-100 dark:border-slate-700 hover:bg-rose-600 dark:hover:bg-rose-500 hover:text-white rounded-2xl shadow-sm transition-all active:scale-95"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
          }
          _push2(`</div><div class="lg:col-span-2 space-y-6"><div class="border-b border-slate-100/80 dark:border-slate-800/80 pb-5 mb-3 transition-colors duration-500"><h3 class="text-base font-black text-slate-800 dark:text-white flex items-center gap-3 transition-colors duration-500"><span class="text-xl">⚡</span> ${ssrInterpolate(_ctx.$t("calendar_life_os_summary", "Life OS summary"))}</h3></div><div class="grid grid-cols-1 gap-5">`);
          _push2(ssrRenderComponent(unref(Link), {
            href: _ctx.route("goals.index"),
            class: "bg-orange-500 rounded-[3rem] p-6 text-white relative overflow-hidden group shadow-2xl shadow-orange-200 dark:shadow-none hover:-translate-y-2 transition-all duration-500"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`<div class="absolute -right-6 -top-6 text-9xl opacity-20 group-hover:rotate-12 transition-transform duration-700"${_scopeId}>🎯</div><div class="relative z-10"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><span class="text-[11px] font-black tracking-widest bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/20"${_scopeId}>${ssrInterpolate(_ctx.$t("calendar_goals", "Goals & milestones"))}</span><div class="w-8 h-8 rounded-full bg-white/20 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-orange-500 transition-all duration-500"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"${_scopeId}></path></svg></div></div>`);
                if (dailyMilestones.value.length > 0) {
                  _push3(`<div${_scopeId}><div class="space-y-3"${_scopeId}><!--[-->`);
                  ssrRenderList(dailyMilestones.value, (ms) => {
                    _push3(`<div class="bg-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl flex items-center justify-between border border-white/10 group-hover:border-white/30 transition-all shadow-lg"${_scopeId}><div class="min-w-0 pr-4"${_scopeId}><p class="text-[10px] font-bold tracking-widest text-orange-100/80 mb-0.5 leading-none"${_scopeId}>${ssrInterpolate(ms.goal_title)}</p><p class="text-[13px] font-black text-white truncate leading-tight"${_scopeId}>${ssrInterpolate(ms.title)}</p></div>`);
                    if (ms.completed) {
                      _push3(`<span class="text-[10px] font-black bg-emerald-500/80 text-white px-2 py-1 rounded-lg ml-2 shrink-0 shadow-sm"${_scopeId}>DONE</span>`);
                    } else {
                      _push3(`<span class="text-[10px] font-black bg-white/20 text-white px-2 py-1 rounded-lg ml-2 shrink-0"${_scopeId}>PENDING</span>`);
                    }
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></div></div>`);
                } else {
                  _push3(`<div class="py-4"${_scopeId}><p class="text-sm font-bold text-orange-50 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("calendar_empty_goals", "No milestones due for this date."))}</p></div>`);
                }
                _push3(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "absolute -right-6 -top-6 text-9xl opacity-20 group-hover:rotate-12 transition-transform duration-700" }, "🎯"),
                  createVNode("div", { class: "relative z-10" }, [
                    createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                      createVNode("span", { class: "text-[11px] font-black tracking-widest bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/20" }, toDisplayString(_ctx.$t("calendar_goals", "Goals & milestones")), 1),
                      createVNode("div", { class: "w-8 h-8 rounded-full bg-white/20 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-orange-500 transition-all duration-500" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "3",
                            d: "M14 5l7 7m0 0l-7 7m7-7H3"
                          })
                        ]))
                      ])
                    ]),
                    dailyMilestones.value.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(dailyMilestones.value, (ms) => {
                          return openBlock(), createBlock("div", {
                            key: ms.id,
                            class: "bg-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl flex items-center justify-between border border-white/10 group-hover:border-white/30 transition-all shadow-lg"
                          }, [
                            createVNode("div", { class: "min-w-0 pr-4" }, [
                              createVNode("p", { class: "text-[10px] font-bold tracking-widest text-orange-100/80 mb-0.5 leading-none" }, toDisplayString(ms.goal_title), 1),
                              createVNode("p", { class: "text-[13px] font-black text-white truncate leading-tight" }, toDisplayString(ms.title), 1)
                            ]),
                            ms.completed ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-[10px] font-black bg-emerald-500/80 text-white px-2 py-1 rounded-lg ml-2 shrink-0 shadow-sm"
                            }, "DONE")) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "text-[10px] font-black bg-white/20 text-white px-2 py-1 rounded-lg ml-2 shrink-0"
                            }, "PENDING"))
                          ]);
                        }), 128))
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "py-4"
                    }, [
                      createVNode("p", { class: "text-sm font-bold text-orange-50 leading-relaxed" }, toDisplayString(_ctx.$t("calendar_empty_goals", "No milestones due for this date.")), 1)
                    ]))
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(unref(Link), {
            href: _ctx.route("planner.index", { date: props.date }),
            class: "bg-blue-600 rounded-[3rem] p-6 text-white relative overflow-hidden group shadow-2xl shadow-blue-200 dark:shadow-none hover:-translate-y-2 transition-all duration-500"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`<div class="absolute -right-6 -top-6 text-9xl opacity-20 group-hover:rotate-12 transition-transform duration-700"${_scopeId}>✅</div><div class="relative z-10"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><span class="text-[11px] font-black tracking-widest bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/20"${_scopeId}>${ssrInterpolate(_ctx.$t("calendar_planner", "Daily planner"))}</span><div class="w-8 h-8 rounded-full bg-white/20 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all duration-500"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"${_scopeId}></path></svg></div></div>`);
                if (dailyPlanner.value && dailyPlanner.value.total_tasks > 0) {
                  _push3(`<div${_scopeId}><div class="flex items-end gap-3 mb-4"${_scopeId}><span class="text-5xl font-black leading-none drop-shadow-md"${_scopeId}>${ssrInterpolate(dailyPlanner.value.completed_tasks)}</span><span class="text-blue-100 font-bold mb-1.5 text-base"${_scopeId}>/ ${ssrInterpolate(dailyPlanner.value.total_tasks)} tasks completed</span></div><div class="w-full bg-white/20 rounded-full h-4 mt-4 overflow-hidden border border-white/10 backdrop-blur-sm"${_scopeId}><div class="bg-white h-4 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.5)]" style="${ssrRenderStyle({ width: `${plannerProgress.value}%` })}"${_scopeId}></div></div></div>`);
                } else {
                  _push3(`<div class="py-4"${_scopeId}><p class="text-sm font-bold text-blue-50 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("calendar_empty_planner", "No tasks recorded for this period."))}</p></div>`);
                }
                _push3(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "absolute -right-6 -top-6 text-9xl opacity-20 group-hover:rotate-12 transition-transform duration-700" }, "✅"),
                  createVNode("div", { class: "relative z-10" }, [
                    createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                      createVNode("span", { class: "text-[11px] font-black tracking-widest bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/20" }, toDisplayString(_ctx.$t("calendar_planner", "Daily planner")), 1),
                      createVNode("div", { class: "w-8 h-8 rounded-full bg-white/20 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all duration-500" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "3",
                            d: "M14 5l7 7m0 0l-7 7m7-7H3"
                          })
                        ]))
                      ])
                    ]),
                    dailyPlanner.value && dailyPlanner.value.total_tasks > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", { class: "flex items-end gap-3 mb-4" }, [
                        createVNode("span", { class: "text-5xl font-black leading-none drop-shadow-md" }, toDisplayString(dailyPlanner.value.completed_tasks), 1),
                        createVNode("span", { class: "text-blue-100 font-bold mb-1.5 text-base" }, "/ " + toDisplayString(dailyPlanner.value.total_tasks) + " tasks completed", 1)
                      ]),
                      createVNode("div", { class: "w-full bg-white/20 rounded-full h-4 mt-4 overflow-hidden border border-white/10 backdrop-blur-sm" }, [
                        createVNode("div", {
                          class: "bg-white h-4 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.5)]",
                          style: { width: `${plannerProgress.value}%` }
                        }, null, 4)
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "py-4"
                    }, [
                      createVNode("p", { class: "text-sm font-bold text-blue-50 leading-relaxed" }, toDisplayString(_ctx.$t("calendar_empty_planner", "No tasks recorded for this period.")), 1)
                    ]))
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`<div class="grid grid-cols-2 gap-5">`);
          _push2(ssrRenderComponent(unref(Link), {
            href: _ctx.route("habits.index"),
            class: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-slate-200/20 dark:shadow-none min-h-[160px] flex flex-col justify-between"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`<div class="absolute -right-3 -bottom-3 text-6xl opacity-[0.05] group-hover:scale-125 transition-transform duration-700"${_scopeId}>🌱</div><div${_scopeId}><span class="text-[11px] font-black tracking-widest text-emerald-500 mb-3 block leading-none"${_scopeId}>${ssrInterpolate(_ctx.$t("calendar_habits", "Habits"))}</span>`);
                if (dailyHabitCount.value > 0) {
                  _push3(`<div${_scopeId}><span class="text-5xl font-black text-slate-800 dark:text-white block leading-none mb-2"${_scopeId}>${ssrInterpolate(dailyHabitCount.value)}</span><span class="text-[11px] font-bold text-slate-400 tracking-wide"${_scopeId}>${ssrInterpolate(_ctx.$t("calendar_habits_done", "Items completed"))}</span></div>`);
                } else {
                  _push3(`<div class="mt-4"${_scopeId}><p class="text-xs font-bold text-slate-400 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("calendar_empty_habit", "No habits logged."))}</p></div>`);
                }
                _push3(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "absolute -right-3 -bottom-3 text-6xl opacity-[0.05] group-hover:scale-125 transition-transform duration-700" }, "🌱"),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-[11px] font-black tracking-widest text-emerald-500 mb-3 block leading-none" }, toDisplayString(_ctx.$t("calendar_habits", "Habits")), 1),
                    dailyHabitCount.value > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("span", { class: "text-5xl font-black text-slate-800 dark:text-white block leading-none mb-2" }, toDisplayString(dailyHabitCount.value), 1),
                      createVNode("span", { class: "text-[11px] font-bold text-slate-400 tracking-wide" }, toDisplayString(_ctx.$t("calendar_habits_done", "Items completed")), 1)
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-4"
                    }, [
                      createVNode("p", { class: "text-xs font-bold text-slate-400 leading-relaxed" }, toDisplayString(_ctx.$t("calendar_empty_habit", "No habits logged.")), 1)
                    ]))
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(unref(Link), {
            href: _ctx.route("finance.index"),
            class: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-slate-200/20 dark:shadow-none min-h-[160px] flex flex-col justify-between"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`<div class="absolute -right-3 -bottom-3 text-6xl opacity-[0.05] group-hover:scale-125 transition-transform duration-700"${_scopeId}>💸</div><div${_scopeId}><span class="text-[11px] font-black tracking-widest text-rose-500 mb-3 block leading-none"${_scopeId}>${ssrInterpolate(_ctx.$t("calendar_finance", "Finance"))}</span>`);
                if (dailyFinance.value > 0) {
                  _push3(`<div${_scopeId}><h4 class="text-xl font-black text-slate-800 dark:text-white leading-tight mb-1 truncate"${_scopeId}>${ssrInterpolate(formatCurrency(dailyFinance.value))}</h4><span class="text-[11px] font-bold text-slate-400 tracking-wide"${_scopeId}>Daily spend</span></div>`);
                } else {
                  _push3(`<div class="mt-4"${_scopeId}><p class="text-xs font-bold text-slate-400 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("calendar_empty_finance", "No transactions."))}</p></div>`);
                }
                _push3(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "absolute -right-3 -bottom-3 text-6xl opacity-[0.05] group-hover:scale-125 transition-transform duration-700" }, "💸"),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-[11px] font-black tracking-widest text-rose-500 mb-3 block leading-none" }, toDisplayString(_ctx.$t("calendar_finance", "Finance")), 1),
                    dailyFinance.value > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("h4", { class: "text-xl font-black text-slate-800 dark:text-white leading-tight mb-1 truncate" }, toDisplayString(formatCurrency(dailyFinance.value)), 1),
                      createVNode("span", { class: "text-[11px] font-bold text-slate-400 tracking-wide" }, "Daily spend")
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-4"
                    }, [
                      createVNode("p", { class: "text-xs font-bold text-slate-400 leading-relaxed" }, toDisplayString(_ctx.$t("calendar_empty_finance", "No transactions.")), 1)
                    ]))
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div>`);
          _push2(ssrRenderComponent(unref(Link), {
            href: _ctx.route("journal.index"),
            class: "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-slate-200/20 dark:shadow-none min-h-[160px]"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`<div class="absolute -right-3 -bottom-3 text-8xl opacity-[0.05] group-hover:rotate-12 transition-transform duration-700"${_scopeId}>📓</div><div class="flex justify-between items-center mb-5"${_scopeId}><span class="text-[11px] font-black tracking-widest text-purple-500 leading-none"${_scopeId}>${ssrInterpolate(_ctx.$t("calendar_journal", "Personal journal"))}</span>`);
                if (dailyJournal.value) {
                  _push3(`<div class="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-lg shadow-sm border border-purple-100 dark:border-purple-800/50"${_scopeId}>${ssrInterpolate(dailyJournal.value.mood === "Happy" ? "😊" : dailyJournal.value.mood === "Sad" ? "😢" : dailyJournal.value.mood === "Angry" ? "😠" : "😌")}</div>`);
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</div>`);
                if (dailyJournal.value) {
                  _push3(`<div class="relative z-10"${_scopeId}><h4 class="font-black text-slate-800 dark:text-white text-lg truncate mb-1 leading-tight transition-colors duration-500"${_scopeId}>${ssrInterpolate(dailyJournal.value.title || "Daily Entry")}</h4><p class="text-[11px] font-bold text-purple-400 dark:text-purple-300 tracking-widest transition-colors duration-500"${_scopeId}>Mood score: ${ssrInterpolate(dailyJournal.value.mood || "Neutral")}</p></div>`);
                } else {
                  _push3(`<div class="mt-4"${_scopeId}><p class="text-sm font-bold text-slate-400 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("calendar_empty_journal", "Empty page. Time to reflect?"))}</p></div>`);
                }
              } else {
                return [
                  createVNode("div", { class: "absolute -right-3 -bottom-3 text-8xl opacity-[0.05] group-hover:rotate-12 transition-transform duration-700" }, "📓"),
                  createVNode("div", { class: "flex justify-between items-center mb-5" }, [
                    createVNode("span", { class: "text-[11px] font-black tracking-widest text-purple-500 leading-none" }, toDisplayString(_ctx.$t("calendar_journal", "Personal journal")), 1),
                    dailyJournal.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-lg shadow-sm border border-purple-100 dark:border-purple-800/50"
                    }, toDisplayString(dailyJournal.value.mood === "Happy" ? "😊" : dailyJournal.value.mood === "Sad" ? "😢" : dailyJournal.value.mood === "Angry" ? "😠" : "😌"), 1)) : createCommentVNode("", true)
                  ]),
                  dailyJournal.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "relative z-10"
                  }, [
                    createVNode("h4", { class: "font-black text-slate-800 dark:text-white text-lg truncate mb-1 leading-tight transition-colors duration-500" }, toDisplayString(dailyJournal.value.title || "Daily Entry"), 1),
                    createVNode("p", { class: "text-[11px] font-bold text-purple-400 dark:text-purple-300 tracking-widest transition-colors duration-500" }, "Mood score: " + toDisplayString(dailyJournal.value.mood || "Neutral"), 1)
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-4"
                  }, [
                    createVNode("p", { class: "text-sm font-bold text-slate-400 leading-relaxed" }, toDisplayString(_ctx.$t("calendar_empty_journal", "Empty page. Time to reflect?")), 1)
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Calendar/CalendarDayDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
