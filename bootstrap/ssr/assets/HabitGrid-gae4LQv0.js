import { computed, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, Fragment, renderList, withModifiers, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import draggable from "vuedraggable";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "HabitGrid",
  __ssrInlineRender: true,
  props: {
    localHabits: Array,
    monthDates: Array,
    hasPrevHabits: Boolean,
    toggleStatus: Function,
    handleGridNav: Function,
    getStatus: Function,
    editHabit: Function,
    confirmDelete: Function,
    openCreateModal: Function,
    openCopyModal: Function,
    handleMouseDown: Function,
    handleMouseEnter: Function,
    isCellSelected: Function,
    // 🔥 FUNGSI SAVE DARI DRAGGABLE 🔥
    saveHabitOrder: Function
  },
  setup(__props) {
    const props = __props;
    const draggableHabits = computed({
      get: () => props.localHabits,
      set: (newVal) => {
        if (props.saveHabitOrder) props.saveHabitOrder(newVal);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full md:max-w-[95%] mx-auto md:px-2 pt-4 md:pt-8 pb-20" }, _attrs))} data-v-e77f4ecc>`);
      if (__props.localHabits.length > 0) {
        _push(`<div class="bg-white md:rounded-3xl shadow-sm md:shadow-[0_2px_20px_rgba(0,0,0,0.04)] border-y md:border border-slate-100 overflow-hidden relative" data-v-e77f4ecc><div class="overflow-x-auto custom-scrollbar relative select-none" data-v-e77f4ecc><div class="min-w-max" data-v-e77f4ecc><div class="sticky top-0 z-30 bg-white border-b border-slate-100 flex shadow-sm" data-v-e77f4ecc><div class="sticky left-0 z-40 bg-white w-40 md:w-72 border-r border-slate-100 p-3 md:p-4 flex items-center font-bold text-slate-400 text-[10px] md:text-xs uppercase tracking-wider" data-v-e77f4ecc><div class="w-6 md:w-8 shrink-0" data-v-e77f4ecc></div><span class="truncate" data-v-e77f4ecc>${ssrInterpolate(_ctx.$t("habit_name"))}</span></div><div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5" data-v-e77f4ecc><!--[-->`);
        ssrRenderList(__props.monthDates, (day) => {
          _push(`<div class="w-8 flex flex-col items-center gap-1" data-v-e77f4ecc><span class="text-[9px] md:text-[10px] font-bold text-slate-400 capitalize" data-v-e77f4ecc>${ssrInterpolate(day.dayName)}</span><span class="${ssrRenderClass([day.isToday ? "text-indigo-600 bg-indigo-50 px-1.5 rounded" : "", "text-[10px] md:text-xs font-black text-slate-600"])}" data-v-e77f4ecc>${ssrInterpolate(day.dayNumber)}</span></div>`);
        });
        _push(`<!--]--></div><div class="hidden md:flex sticky right-0 z-40 bg-white w-32 p-4 border-l border-slate-100 items-center justify-end font-bold text-slate-400 text-xs uppercase tracking-wider shadow-[-10px_0_20px_rgba(255,255,255,0.8)]" data-v-e77f4ecc>${ssrInterpolate(_ctx.$t("habit_table_total"))}</div></div>`);
        _push(ssrRenderComponent(unref(draggable), {
          modelValue: draggableHabits.value,
          "onUpdate:modelValue": ($event) => draggableHabits.value = $event,
          "item-key": "id",
          handle: ".drag-handle",
          animation: "250",
          "ghost-class": "opacity-40",
          class: "divide-y divide-slate-50"
        }, {
          item: withCtx(({ element: habit, index: hIndex }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex transition-colors duration-200 group relative bg-white hover:bg-slate-50/50" data-v-e77f4ecc${_scopeId}><div class="sticky left-0 z-20 w-40 md:w-72 bg-inherit border-r border-slate-100 p-3 md:p-4 flex items-center gap-2 md:gap-3 flex-shrink-0" data-v-e77f4ecc${_scopeId}><div class="drag-handle cursor-grab active:cursor-grabbing text-slate-300 hover:text-indigo-500 opacity-30 group-hover:opacity-100 transition-opacity p-1 md:-ml-2 shrink-0" data-v-e77f4ecc${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-e77f4ecc${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" data-v-e77f4ecc${_scopeId}></path></svg></div><div class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center text-base md:text-xl bg-slate-50 border border-slate-100 shrink-0" style="${ssrRenderStyle({ color: habit.color })}" data-v-e77f4ecc${_scopeId}>${ssrInterpolate(habit.icon)}</div><div class="min-w-0 flex-1" data-v-e77f4ecc${_scopeId}><h4 class="font-bold text-slate-700 truncate text-xs md:text-sm" data-v-e77f4ecc${_scopeId}>${ssrInterpolate(habit.name)}</h4><div class="flex items-center gap-1 text-[10px] font-medium text-slate-400 mb-1.5 mt-0.5" data-v-e77f4ecc${_scopeId}><span data-v-e77f4ecc${_scopeId}>🎯 Target: ${ssrInterpolate(habit.monthly_target)}</span></div><div class="flex items-center gap-2" data-v-e77f4ecc${_scopeId}><div class="h-1 md:h-1.5 w-10 md:w-16 bg-slate-100 rounded-full overflow-hidden" data-v-e77f4ecc${_scopeId}><div class="h-full rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: habit.progress_percent + "%", backgroundColor: habit.color })}" data-v-e77f4ecc${_scopeId}></div></div><button class="md:hidden text-slate-400 hover:text-indigo-600 px-1 active:scale-95 transition" data-v-e77f4ecc${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-e77f4ecc${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-v-e77f4ecc${_scopeId}></path></svg></button><div class="hidden md:flex opacity-0 group-hover:opacity-100 transition items-center gap-1 bg-white/80 backdrop-blur-sm px-1 rounded-md absolute right-2 top-1/2 -translate-y-1/2 shadow-sm border border-slate-100 z-50" data-v-e77f4ecc${_scopeId}><button class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="Edit" data-v-e77f4ecc${_scopeId}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-e77f4ecc${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-v-e77f4ecc${_scopeId}></path></svg></button><button class="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition" title="Hapus" data-v-e77f4ecc${_scopeId}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-e77f4ecc${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-e77f4ecc${_scopeId}></path></svg></button></div></div></div></div><div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5 pointer-events-auto" data-v-e77f4ecc${_scopeId}><!--[-->`);
              ssrRenderList(__props.monthDates, (day, dIndex) => {
                _push2(`<div class="w-8 flex justify-center" data-v-e77f4ecc${_scopeId}><button${ssrRenderAttr("id", `cell-${hIndex}-${dIndex}`)}${ssrIncludeBooleanAttr(day.isFuture) ? " disabled" : ""} tabindex="0" class="${ssrRenderClass([{
                  "ring-4 ring-indigo-400 scale-110 z-20 shadow-lg !bg-indigo-50 !border-indigo-400": __props.isCellSelected && __props.isCellSelected(habit.id, day.dateString),
                  "shadow-md text-white border-transparent z-10": __props.getStatus(habit, day.dateString) === "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                  "bg-slate-100 text-slate-400 border-slate-200": __props.getStatus(habit, day.dateString) === "skipped" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                  "bg-white border border-slate-200 hover:border-indigo-400": __props.getStatus(habit, day.dateString) === "empty" && !day.isFuture && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                  "bg-slate-50 border-slate-50 opacity-30 cursor-not-allowed": day.isFuture,
                  "ring-2 ring-indigo-600 ring-offset-2": day.isToday && __props.getStatus(habit, day.dateString) !== "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString))
                }, "scroll-mt-32 md:scroll-ml-72 w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg flex items-center justify-center relative outline-none transition-all duration-200 hover:scale-110 hover:z-20 active:scale-75 focus:ring-4 focus:ring-indigo-400 focus:z-30 focus:shadow-lg"])}" style="${ssrRenderStyle(__props.getStatus(habit, day.dateString) === "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)) ? { backgroundColor: habit.color } : {})}" data-v-e77f4ecc${_scopeId}>`);
                if (__props.getStatus(habit, day.dateString) === "completed") {
                  _push2(`<span class="text-[10px] md:text-xs font-black drop-shadow-sm animate-in zoom-in duration-300" data-v-e77f4ecc${_scopeId}>✓</span>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.getStatus(habit, day.dateString) === "skipped") {
                  _push2(`<span class="text-[10px] md:text-xs font-bold animate-in fade-in duration-300" data-v-e77f4ecc${_scopeId}>-</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</button></div>`);
              });
              _push2(`<!--]--></div><div class="hidden md:flex sticky right-0 z-20 w-32 bg-inherit border-l border-slate-100 p-4 flex-col justify-center shadow-[-10px_0_20px_rgba(255,255,255,0.8)]" data-v-e77f4ecc${_scopeId}><div class="flex justify-between items-end mb-1" data-v-e77f4ecc${_scopeId}><span class="text-lg font-black text-slate-700" data-v-e77f4ecc${_scopeId}>${ssrInterpolate(habit.progress_count)}</span><span class="text-[10px] font-bold text-slate-400 mb-1" data-v-e77f4ecc${_scopeId}>${ssrInterpolate(Math.round(habit.progress_percent))}%</span></div><div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden" data-v-e77f4ecc${_scopeId}><div class="h-full rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: habit.progress_percent + "%", backgroundColor: habit.color })}" data-v-e77f4ecc${_scopeId}></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex transition-colors duration-200 group relative bg-white hover:bg-slate-50/50" }, [
                  createVNode("div", { class: "sticky left-0 z-20 w-40 md:w-72 bg-inherit border-r border-slate-100 p-3 md:p-4 flex items-center gap-2 md:gap-3 flex-shrink-0" }, [
                    createVNode("div", { class: "drag-handle cursor-grab active:cursor-grabbing text-slate-300 hover:text-indigo-500 opacity-30 group-hover:opacity-100 transition-opacity p-1 md:-ml-2 shrink-0" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2.5"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M4 8h16M4 16h16"
                        })
                      ]))
                    ]),
                    createVNode("div", {
                      class: "w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center text-base md:text-xl bg-slate-50 border border-slate-100 shrink-0",
                      style: { color: habit.color }
                    }, toDisplayString(habit.icon), 5),
                    createVNode("div", { class: "min-w-0 flex-1" }, [
                      createVNode("h4", { class: "font-bold text-slate-700 truncate text-xs md:text-sm" }, toDisplayString(habit.name), 1),
                      createVNode("div", { class: "flex items-center gap-1 text-[10px] font-medium text-slate-400 mb-1.5 mt-0.5" }, [
                        createVNode("span", null, "🎯 Target: " + toDisplayString(habit.monthly_target), 1)
                      ]),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "h-1 md:h-1.5 w-10 md:w-16 bg-slate-100 rounded-full overflow-hidden" }, [
                          createVNode("div", {
                            class: "h-full rounded-full transition-all duration-300",
                            style: { width: habit.progress_percent + "%", backgroundColor: habit.color }
                          }, null, 4)
                        ]),
                        createVNode("button", {
                          onClick: ($event) => __props.editHabit(habit),
                          class: "md:hidden text-slate-400 hover:text-indigo-600 px-1 active:scale-95 transition"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "stroke-width": "2.5"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            })
                          ]))
                        ], 8, ["onClick"]),
                        createVNode("div", { class: "hidden md:flex opacity-0 group-hover:opacity-100 transition items-center gap-1 bg-white/80 backdrop-blur-sm px-1 rounded-md absolute right-2 top-1/2 -translate-y-1/2 shadow-sm border border-slate-100 z-50" }, [
                          createVNode("button", {
                            onClick: ($event) => __props.editHabit(habit),
                            class: "p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition",
                            title: "Edit"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-3.5 h-3.5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2.5"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              })
                            ]))
                          ], 8, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => __props.confirmDelete(habit),
                            class: "p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition",
                            title: "Hapus"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-3.5 h-3.5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              "stroke-width": "2.5"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              })
                            ]))
                          ], 8, ["onClick"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5 pointer-events-auto" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.monthDates, (day, dIndex) => {
                      return openBlock(), createBlock("div", {
                        key: day.dateString,
                        class: "w-8 flex justify-center"
                      }, [
                        createVNode("button", {
                          id: `cell-${hIndex}-${dIndex}`,
                          onClick: ($event) => __props.toggleStatus(habit.id, day.dateString),
                          onContextmenu: withModifiers(($event) => __props.toggleStatus(habit.id, day.dateString, "skipped"), ["prevent"]),
                          onKeydown: ($event) => __props.handleGridNav($event, hIndex, dIndex, habit.id, day.dateString),
                          onMousedown: ($event) => __props.handleMouseDown && __props.handleMouseDown(habit.id, day.dateString),
                          onMouseenter: ($event) => __props.handleMouseEnter && __props.handleMouseEnter(habit.id, day.dateString),
                          disabled: day.isFuture,
                          tabindex: "0",
                          class: ["scroll-mt-32 md:scroll-ml-72 w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg flex items-center justify-center relative outline-none transition-all duration-200 hover:scale-110 hover:z-20 active:scale-75 focus:ring-4 focus:ring-indigo-400 focus:z-30 focus:shadow-lg", {
                            "ring-4 ring-indigo-400 scale-110 z-20 shadow-lg !bg-indigo-50 !border-indigo-400": __props.isCellSelected && __props.isCellSelected(habit.id, day.dateString),
                            "shadow-md text-white border-transparent z-10": __props.getStatus(habit, day.dateString) === "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                            "bg-slate-100 text-slate-400 border-slate-200": __props.getStatus(habit, day.dateString) === "skipped" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                            "bg-white border border-slate-200 hover:border-indigo-400": __props.getStatus(habit, day.dateString) === "empty" && !day.isFuture && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                            "bg-slate-50 border-slate-50 opacity-30 cursor-not-allowed": day.isFuture,
                            "ring-2 ring-indigo-600 ring-offset-2": day.isToday && __props.getStatus(habit, day.dateString) !== "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString))
                          }],
                          style: __props.getStatus(habit, day.dateString) === "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)) ? { backgroundColor: habit.color } : {}
                        }, [
                          __props.getStatus(habit, day.dateString) === "completed" ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-[10px] md:text-xs font-black drop-shadow-sm animate-in zoom-in duration-300"
                          }, "✓")) : createCommentVNode("", true),
                          __props.getStatus(habit, day.dateString) === "skipped" ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-[10px] md:text-xs font-bold animate-in fade-in duration-300"
                          }, "-")) : createCommentVNode("", true)
                        ], 46, ["id", "onClick", "onContextmenu", "onKeydown", "onMousedown", "onMouseenter", "disabled"])
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "hidden md:flex sticky right-0 z-20 w-32 bg-inherit border-l border-slate-100 p-4 flex-col justify-center shadow-[-10px_0_20px_rgba(255,255,255,0.8)]" }, [
                    createVNode("div", { class: "flex justify-between items-end mb-1" }, [
                      createVNode("span", { class: "text-lg font-black text-slate-700" }, toDisplayString(habit.progress_count), 1),
                      createVNode("span", { class: "text-[10px] font-bold text-slate-400 mb-1" }, toDisplayString(Math.round(habit.progress_percent)) + "%", 1)
                    ]),
                    createVNode("div", { class: "w-full bg-slate-200 rounded-full h-1.5 overflow-hidden" }, [
                      createVNode("div", {
                        class: "h-full rounded-full transition-all duration-500",
                        style: { width: habit.progress_percent + "%", backgroundColor: habit.color }
                      }, null, 4)
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<div class="bg-white rounded-3xl p-8 md:p-12 text-center shadow-lg border border-slate-100 mt-6 mx-4 md:mx-0" data-v-e77f4ecc><div class="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-3xl md:text-4xl mx-auto mb-4" data-v-e77f4ecc>🌱</div><h3 class="text-lg md:text-xl font-bold text-slate-800" data-v-e77f4ecc>${ssrInterpolate(_ctx.$t("habit_empty_title"))}</h3><p class="text-sm md:text-base text-slate-500 mb-6" data-v-e77f4ecc>${ssrInterpolate(_ctx.$t("habit_empty_desc"))}</p><div class="flex flex-col md:flex-row items-center justify-center gap-4" data-v-e77f4ecc><button class="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition transform hover:-translate-y-1" data-v-e77f4ecc>+ ${ssrInterpolate(_ctx.$t("habit_btn_new"))}</button>`);
        if (__props.hasPrevHabits) {
          _push(`<button class="px-6 py-3 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition" data-v-e77f4ecc>📂 ${ssrInterpolate(_ctx.$t("habit_salin_btn"))}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Habits/HabitGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HabitGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e77f4ecc"]]);
export {
  HabitGrid as default
};
