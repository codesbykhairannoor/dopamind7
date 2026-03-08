import { ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, withModifiers, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./OneForMindIcon-Dwf7AvKJ.js";
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
    saveHabitOrder: Function
  },
  setup(__props) {
    const props = __props;
    const draggableList = ref([...props.localHabits]);
    watch(() => props.localHabits, (newVal) => {
      draggableList.value = [...newVal];
    }, { deep: true });
    const handleDragEnd = () => {
      if (props.saveHabitOrder) {
        props.saveHabitOrder(draggableList.value);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full md:max-w-[95%] mx-auto md:px-2 pt-4 md:pt-8 pb-20" }, _attrs))} data-v-fd93244e>`);
      if (__props.localHabits.length > 0) {
        _push(`<div class="bg-white md:rounded-3xl shadow-sm md:shadow-[0_2px_20px_rgba(0,0,0,0.04)] border-y md:border border-slate-100 overflow-hidden relative" data-v-fd93244e><div class="overflow-x-auto custom-scrollbar relative select-none" data-v-fd93244e><div class="min-w-max" data-v-fd93244e><div class="sticky top-0 z-30 bg-white border-b border-slate-100 flex shadow-sm" data-v-fd93244e><div class="sticky left-0 z-40 bg-white w-40 md:w-72 border-r border-slate-100 p-3 md:p-4 flex items-center font-bold text-slate-400 text-[10px] md:text-xs uppercase tracking-wider" data-v-fd93244e><div class="w-6 md:w-8 shrink-0" data-v-fd93244e></div><span class="truncate" data-v-fd93244e>${ssrInterpolate(_ctx.$t("habit_name"))}</span></div><div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5" data-v-fd93244e><!--[-->`);
        ssrRenderList(__props.monthDates, (day) => {
          _push(`<div class="w-8 flex flex-col items-center gap-1" data-v-fd93244e><span class="text-[9px] md:text-[10px] font-bold text-slate-400 capitalize" data-v-fd93244e>${ssrInterpolate(day.dayName)}</span><span class="${ssrRenderClass([day.isToday ? "text-indigo-600 bg-indigo-50 px-1.5 rounded" : "", "text-[10px] md:text-xs font-black text-slate-600"])}" data-v-fd93244e>${ssrInterpolate(day.dayNumber)}</span></div>`);
        });
        _push(`<!--]--></div><div class="hidden md:flex sticky right-0 z-40 bg-white w-32 p-4 border-l border-slate-100 items-center justify-end font-bold text-slate-400 text-xs uppercase tracking-wider shadow-[-10px_0_20px_rgba(255,255,255,0.8)]" data-v-fd93244e>${ssrInterpolate(_ctx.$t("habit_table_total"))}</div></div>`);
        _push(ssrRenderComponent(unref(draggable), {
          modelValue: draggableList.value,
          "onUpdate:modelValue": ($event) => draggableList.value = $event,
          onEnd: handleDragEnd,
          "item-key": "id",
          handle: ".drag-handle",
          animation: "250",
          "ghost-class": "opacity-40",
          class: "divide-y divide-slate-50"
        }, {
          item: withCtx(({ element: habit, index: hIndex }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex transition-colors duration-200 group relative bg-white hover:bg-slate-50/50" data-v-fd93244e${_scopeId}><div class="sticky left-0 z-20 w-40 md:w-72 bg-inherit border-r border-slate-100 p-3 md:p-4 flex items-center gap-2 md:gap-3 flex-shrink-0" data-v-fd93244e${_scopeId}><div class="drag-handle cursor-grab active:cursor-grabbing text-slate-300 hover:text-indigo-500 opacity-30 group-hover:opacity-100 transition-opacity p-1 md:-ml-2 shrink-0" data-v-fd93244e${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "menu",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center text-base md:text-xl bg-slate-50 border border-slate-100 shrink-0" style="${ssrRenderStyle({ color: habit.color })}" data-v-fd93244e${_scopeId}>${ssrInterpolate(habit.icon)}</div><div class="min-w-0 flex-1" data-v-fd93244e${_scopeId}><h4 class="font-bold text-slate-700 truncate text-xs md:text-sm" data-v-fd93244e${_scopeId}>${ssrInterpolate(habit.name)}</h4><div class="flex items-center gap-1 text-[10px] font-medium text-slate-400 mb-1.5 mt-0.5" data-v-fd93244e${_scopeId}><span data-v-fd93244e${_scopeId}>🎯 Target: ${ssrInterpolate(habit.monthly_target)}</span></div><div class="flex items-center gap-2" data-v-fd93244e${_scopeId}><div class="h-1 md:h-1.5 w-10 md:w-16 bg-slate-100 rounded-full overflow-hidden" data-v-fd93244e${_scopeId}><div class="h-full rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: habit.progress_percent + "%", backgroundColor: habit.color })}" data-v-fd93244e${_scopeId}></div></div><button class="md:hidden text-slate-400 hover:text-indigo-600 px-1 active:scale-95 transition" data-v-fd93244e${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "14",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</button><div class="hidden md:flex opacity-0 group-hover:opacity-100 transition items-center gap-1 bg-white/80 backdrop-blur-sm px-1 rounded-md absolute right-2 top-1/2 -translate-y-1/2 shadow-sm border border-slate-100 z-50" data-v-fd93244e${_scopeId}><button class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="Edit" data-v-fd93244e${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "14",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</button><button class="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition" title="Hapus" data-v-fd93244e${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "trash",
                size: "14",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</button></div></div></div></div><div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5 pointer-events-auto" data-v-fd93244e${_scopeId}><!--[-->`);
              ssrRenderList(__props.monthDates, (day, dIndex) => {
                _push2(`<div class="w-8 flex justify-center" data-v-fd93244e${_scopeId}><button${ssrRenderAttr("id", `cell-${hIndex}-${dIndex}`)}${ssrIncludeBooleanAttr(day.isFuture) ? " disabled" : ""} tabindex="0" class="${ssrRenderClass([{
                  "ring-4 ring-indigo-400 scale-110 z-20 shadow-lg !bg-indigo-50 !border-indigo-400": __props.isCellSelected && __props.isCellSelected(habit.id, day.dateString),
                  "shadow-md text-white border-transparent z-10": __props.getStatus(habit, day.dateString) === "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                  "bg-slate-100 text-slate-400 border-slate-200": __props.getStatus(habit, day.dateString) === "skipped" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                  "bg-white border border-slate-200 hover:border-indigo-400": __props.getStatus(habit, day.dateString) === "empty" && !day.isFuture && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                  "bg-slate-50 border-slate-50 opacity-30 cursor-not-allowed": day.isFuture,
                  "ring-2 ring-indigo-600 ring-offset-2": day.isToday && __props.getStatus(habit, day.dateString) !== "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString))
                }, "scroll-mt-32 md:scroll-ml-72 w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg flex items-center justify-center relative outline-none transition-all duration-200 hover:scale-110 hover:z-20 active:scale-75 focus:ring-4 focus:ring-indigo-400 focus:z-30 focus:shadow-lg"])}" style="${ssrRenderStyle(__props.getStatus(habit, day.dateString) === "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)) ? { backgroundColor: habit.color } : {})}" data-v-fd93244e${_scopeId}>`);
                if (__props.getStatus(habit, day.dateString) === "completed") {
                  _push2(ssrRenderComponent(_sfc_main$1, {
                    name: "check",
                    size: "14",
                    "stroke-width": "4",
                    class: "text-white animate-in zoom-in duration-300"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (__props.getStatus(habit, day.dateString) === "skipped") {
                  _push2(`<span class="text-[10px] md:text-xs font-bold animate-in fade-in duration-300" data-v-fd93244e${_scopeId}>-</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</button></div>`);
              });
              _push2(`<!--]--></div><div class="hidden md:flex sticky right-0 z-20 w-32 bg-inherit border-l border-slate-100 p-4 flex-col justify-center shadow-[-10px_0_20px_rgba(255,255,255,0.8)]" data-v-fd93244e${_scopeId}><div class="flex justify-between items-end mb-1" data-v-fd93244e${_scopeId}><span class="text-lg font-black text-slate-700" data-v-fd93244e${_scopeId}>${ssrInterpolate(habit.progress_count)}</span><span class="text-[10px] font-bold text-slate-400 mb-1" data-v-fd93244e${_scopeId}>${ssrInterpolate(Math.round(habit.progress_percent))}%</span></div><div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden" data-v-fd93244e${_scopeId}><div class="h-full rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: habit.progress_percent + "%", backgroundColor: habit.color })}" data-v-fd93244e${_scopeId}></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex transition-colors duration-200 group relative bg-white hover:bg-slate-50/50" }, [
                  createVNode("div", { class: "sticky left-0 z-20 w-40 md:w-72 bg-inherit border-r border-slate-100 p-3 md:p-4 flex items-center gap-2 md:gap-3 flex-shrink-0" }, [
                    createVNode("div", { class: "drag-handle cursor-grab active:cursor-grabbing text-slate-300 hover:text-indigo-500 opacity-30 group-hover:opacity-100 transition-opacity p-1 md:-ml-2 shrink-0" }, [
                      createVNode(_sfc_main$1, {
                        name: "menu",
                        size: "20"
                      })
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
                          createVNode(_sfc_main$1, {
                            name: "planner",
                            size: "14",
                            "stroke-width": "2.5"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", { class: "hidden md:flex opacity-0 group-hover:opacity-100 transition items-center gap-1 bg-white/80 backdrop-blur-sm px-1 rounded-md absolute right-2 top-1/2 -translate-y-1/2 shadow-sm border border-slate-100 z-50" }, [
                          createVNode("button", {
                            onClick: ($event) => __props.editHabit(habit),
                            class: "p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition",
                            title: "Edit"
                          }, [
                            createVNode(_sfc_main$1, {
                              name: "planner",
                              size: "14",
                              "stroke-width": "2.5"
                            })
                          ], 8, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => __props.confirmDelete(habit),
                            class: "p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition",
                            title: "Hapus"
                          }, [
                            createVNode(_sfc_main$1, {
                              name: "trash",
                              size: "14",
                              "stroke-width": "2.5"
                            })
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
                          onMousedown: ($event) => __props.handleMouseDown && __props.handleMouseDown($event, habit.id, day.dateString),
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
                          __props.getStatus(habit, day.dateString) === "completed" ? (openBlock(), createBlock(_sfc_main$1, {
                            key: 0,
                            name: "check",
                            size: "14",
                            "stroke-width": "4",
                            class: "text-white animate-in zoom-in duration-300"
                          })) : createCommentVNode("", true),
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
        _push(`<div class="bg-white rounded-3xl p-8 md:p-12 text-center shadow-lg border border-slate-100 mt-6 mx-4 md:mx-0" data-v-fd93244e><div class="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4" data-v-fd93244e>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "habit",
          size: "48",
          "stroke-width": "1.5"
        }, null, _parent));
        _push(`</div><h3 class="text-lg md:text-xl font-bold text-slate-800" data-v-fd93244e>${ssrInterpolate(_ctx.$t("habit_empty_title"))}</h3><p class="text-sm md:text-base text-slate-500 mb-6" data-v-fd93244e>${ssrInterpolate(_ctx.$t("habit_empty_desc"))}</p><div class="flex flex-col md:flex-row items-center justify-center gap-4" data-v-fd93244e><button class="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition transform hover:-translate-y-1 flex items-center gap-2" data-v-fd93244e>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "plus",
          size: "18",
          "stroke-width": "3"
        }, null, _parent));
        _push(` ${ssrInterpolate(_ctx.$t("habit_btn_new"))}</button>`);
        if (__props.hasPrevHabits) {
          _push(`<button class="px-6 py-3 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition" data-v-fd93244e>📂 ${ssrInterpolate(_ctx.$t("habit_salin_btn"))}</button>`);
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
const HabitGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fd93244e"]]);
export {
  HabitGrid as default
};
