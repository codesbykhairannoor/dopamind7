import { ref, watch, computed, nextTick, onMounted, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./OneForMindIcon-Dc5dmmrC.js";
import "@inertiajs/vue3";
import draggable from "vuedraggable";
import dayjs from "dayjs";
import { u as useAppearance } from "./useAppearance-rDoGVD4_.js";
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
    const { isDark } = useAppearance();
    const props = __props;
    const draggableList = ref([...props.localHabits]);
    watch(() => props.localHabits, (newVal) => {
      draggableList.value = [...newVal];
    }, { deep: true });
    const handleDragEnd = () => {
      if (props.saveHabitOrder) props.saveHabitOrder(draggableList.value);
    };
    const todayStr = dayjs().format("YYYY-MM-DD");
    const selectedDate = ref(todayStr);
    const dayStripRef = ref(null);
    ref(false);
    const todayInMonth = computed(() => props.monthDates.find((d) => d.dateString === todayStr));
    watch(() => props.monthDates, () => {
      var _a, _b;
      if (!props.monthDates.find((d) => d.dateString === selectedDate.value)) {
        selectedDate.value = ((_a = todayInMonth.value) == null ? void 0 : _a.dateString) || ((_b = props.monthDates[props.monthDates.length - 1]) == null ? void 0 : _b.dateString);
      }
      nextTick(() => scrollToSelected());
    });
    computed(() => props.monthDates.find((d) => d.dateString === selectedDate.value));
    const scrollToSelected = () => {
      if (!dayStripRef.value) return;
      const active = dayStripRef.value.querySelector(".day-active");
      if (active) {
        active.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      }
    };
    onMounted(() => {
      setTimeout(() => scrollToSelected(), 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full md:max-w-[95%] mx-auto md:px-2 pt-2 md:pt-8 pb-20" }, _attrs))} data-v-d957abd6>`);
      if (__props.localHabits.length > 0) {
        _push(`<div class="md:hidden space-y-6" data-v-d957abd6><div class="relative" data-v-d957abd6><div class="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth px-4 py-2" data-v-d957abd6><!--[-->`);
        ssrRenderList(__props.monthDates, (day) => {
          _push(`<button class="${ssrRenderClass([[
            selectedDate.value === day.dateString ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none scale-110 day-active" : "bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700"
          ], "flex-shrink-0 w-12 py-3 rounded-2xl flex flex-col items-center gap-1 transition-all duration-300"])}" data-v-d957abd6><span class="text-[10px] font-bold uppercase tracking-tighter opacity-80" data-v-d957abd6>${ssrInterpolate(day.dayName)}</span><span class="text-sm font-black" data-v-d957abd6>${ssrInterpolate(day.dayNumber)}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="space-y-3 px-4" data-v-d957abd6><!--[-->`);
        ssrRenderList(__props.localHabits, (habit) => {
          _push(`<div class="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-all active:scale-[0.98]" data-v-d957abd6><div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style="${ssrRenderStyle({ backgroundColor: habit.color + "15", color: habit.color })}" data-v-d957abd6>${ssrInterpolate(habit.icon)}</div><div class="flex-1 min-w-0" data-v-d957abd6><h4 class="font-bold text-slate-700 truncate" data-v-d957abd6>${ssrInterpolate(habit.name)}</h4><div class="flex items-center gap-2 mt-1" data-v-d957abd6><div class="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden" data-v-d957abd6><div class="h-full rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: habit.progress_percent + "%", backgroundColor: habit.color })}" data-v-d957abd6></div></div><span class="text-[10px] font-black text-slate-400 dark:text-slate-500" data-v-d957abd6>${ssrInterpolate(Math.round(habit.progress_percent))}%</span></div></div><button class="${ssrRenderClass([[
            __props.getStatus(habit, selectedDate.value) === "completed" ? "shadow-lg text-white" : __props.getStatus(habit, selectedDate.value) === "skipped" ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500" : "bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600"
          ], "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"])}" style="${ssrRenderStyle(__props.getStatus(habit, selectedDate.value) === "completed" ? { backgroundColor: habit.color, boxShadow: __props.getStatus(habit, selectedDate.value) === "completed" && !unref(isDark) ? `0 8px 16px ${habit.color}30` : "none" } : {})}" data-v-d957abd6>`);
          if (__props.getStatus(habit, selectedDate.value) === "completed") {
            _push(ssrRenderComponent(_sfc_main$1, {
              name: "check",
              size: "20",
              "stroke-width": "4"
            }, null, _parent));
          } else if (__props.getStatus(habit, selectedDate.value) === "skipped") {
            _push(`<span class="text-xl font-black" data-v-d957abd6>-</span>`);
          } else {
            _push(ssrRenderComponent(_sfc_main$1, {
              name: "plus",
              size: "20",
              "stroke-width": "3"
            }, null, _parent));
          }
          _push(`</button></div>`);
        });
        _push(`<!--]--></div><p class="text-[10px] text-center text-slate-400 font-medium px-10 leading-relaxed" data-v-d957abd6> 💡 ${ssrInterpolate(_ctx.$t("habit_mobile_hint", "Tekan sekali untuk SELESAI, tahan (hold) untuk SKIP keesokan harinya."))}</p></div>`);
      } else {
        _push(`<div class="md:hidden py-16 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col items-center gap-4" data-v-d957abd6><span class="text-5xl animate-bounce" data-v-d957abd6>🌱</span><p class="text-xs font-bold text-slate-400 dark:text-slate-500 px-10" data-v-d957abd6>${ssrInterpolate(_ctx.$t("habit_empty", "Belum ada habit aktif. Tambah satu yuk!"))}</p><button class="mt-2 bg-indigo-600 text-white font-black py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 active:scale-95 transition-all outline-none" data-v-d957abd6> + ${ssrInterpolate(_ctx.$t("habit_btn_add", "Tambah Habit"))}</button></div>`);
      }
      if (__props.localHabits.length > 0) {
        _push(`<div class="hidden md:block bg-white dark:bg-slate-900 md:rounded-[2.5rem] shadow-sm md:shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden relative" data-v-d957abd6><div class="overflow-x-auto custom-scrollbar relative select-none" data-v-d957abd6><div class="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex shadow-sm" data-v-d957abd6><div class="sticky left-0 z-40 bg-white dark:bg-slate-900 w-72 border-r border-slate-100 dark:border-slate-800 p-4 flex items-center font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider" data-v-d957abd6><div class="w-8 shrink-0" data-v-d957abd6></div><span class="truncate" data-v-d957abd6>${ssrInterpolate(_ctx.$t("habit_name"))}</span></div><div class="flex items-center px-4 py-3 gap-1.5" data-v-d957abd6><!--[-->`);
        ssrRenderList(__props.monthDates, (day) => {
          _push(`<div class="w-8 flex flex-col items-center gap-1" data-v-d957abd6><span class="text-[10px] font-bold text-slate-400 capitalize" data-v-d957abd6>${ssrInterpolate(day.dayName)}</span><span class="${ssrRenderClass([day.isToday ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 rounded" : "", "text-xs font-black text-slate-600 dark:text-slate-300"])}" data-v-d957abd6>${ssrInterpolate(day.dayNumber)}</span></div>`);
        });
        _push(`<!--]--></div><div class="flex sticky right-0 z-40 bg-white dark:bg-slate-900 w-32 p-4 border-l border-slate-100 dark:border-slate-800 items-center justify-end font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider shadow-[-10px_0_20px_rgba(255,255,255,0.8)] dark:shadow-[-10px_0_20px_rgba(15,23,42,0.8)]" data-v-d957abd6>${ssrInterpolate(_ctx.$t("habit_table_total"))}</div></div>`);
        _push(ssrRenderComponent(unref(draggable), {
          modelValue: draggableList.value,
          "onUpdate:modelValue": ($event) => draggableList.value = $event,
          onEnd: handleDragEnd,
          "item-key": "id",
          handle: ".drag-handle",
          animation: "250",
          "ghost-class": "opacity-40",
          class: "divide-y divide-slate-50 dark:divide-slate-800"
        }, {
          item: withCtx(({ element: habit, index: hIndex }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex transition-colors duration-200 group relative bg-white dark:bg-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-800/50" data-v-d957abd6${_scopeId}><div class="sticky left-0 z-20 w-72 bg-inherit border-r border-slate-100 dark:border-slate-800 p-4 flex items-center gap-3 flex-shrink-0" data-v-d957abd6${_scopeId}><div class="drag-handle cursor-grab active:cursor-grabbing text-slate-300 dark:text-slate-700 hover:text-indigo-500 opacity-30 group-hover:opacity-100 transition-opacity p-1 -ml-2 shrink-0" data-v-d957abd6${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "menu",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 shrink-0" style="${ssrRenderStyle({ color: habit.color })}" data-v-d957abd6${_scopeId}>${ssrInterpolate(habit.icon)}</div><div class="min-w-0 flex-1" data-v-d957abd6${_scopeId}><h4 class="font-bold text-slate-700 dark:text-slate-200 truncate text-sm flex items-center gap-1.5" data-v-d957abd6${_scopeId}>${ssrInterpolate(habit.name)} `);
              if (habit.streak > 1) {
                _push2(`<span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-[10px] font-black animate-pulse shadow-sm border border-orange-100/50 dark:border-orange-500/20" data-v-d957abd6${_scopeId}>${ssrInterpolate(habit.streak)} <span class="text-xs" data-v-d957abd6${_scopeId}>🔥</span></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</h4><div class="flex items-center gap-1 text-[10px] font-medium text-slate-400 dark:text-slate-500 mb-1.5 mt-0.5" data-v-d957abd6${_scopeId}><span data-v-d957abd6${_scopeId}>🎯 Target: ${ssrInterpolate(habit.monthly_target)}</span></div><div class="flex items-center gap-2" data-v-d957abd6${_scopeId}><div class="h-1.5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden" data-v-d957abd6${_scopeId}><div class="h-full rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: habit.progress_percent + "%", backgroundColor: habit.color })}" data-v-d957abd6${_scopeId}></div></div><div class="hidden md:flex opacity-0 group-hover:opacity-100 transition items-center gap-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-1 rounded-md absolute right-2 top-1/2 -translate-y-1/2 shadow-sm border border-slate-100 dark:border-slate-700 z-50" data-v-d957abd6${_scopeId}><button class="p-1.5 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition" title="Edit" data-v-d957abd6${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "planner",
                size: "14",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</button><button class="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition" title="Hapus" data-v-d957abd6${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "trash",
                size: "14",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`</button></div></div></div></div><div class="flex items-center px-4 py-3 gap-1.5 pointer-events-auto" data-v-d957abd6${_scopeId}><!--[-->`);
              ssrRenderList(__props.monthDates, (day, dIndex) => {
                _push2(`<div class="w-8 flex justify-center" data-v-d957abd6${_scopeId}><button${ssrRenderAttr("id", `cell-${hIndex}-${dIndex}`)}${ssrIncludeBooleanAttr(day.isFuture) ? " disabled" : ""} tabindex="0" class="${ssrRenderClass([{
                  "ring-4 ring-indigo-400 scale-110 z-20 shadow-lg !bg-indigo-50 dark:!bg-indigo-500/10 !border-indigo-400": __props.isCellSelected && __props.isCellSelected(habit.id, day.dateString),
                  "shadow-md text-white border-transparent z-10": __props.getStatus(habit, day.dateString) === "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                  "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700": __props.getStatus(habit, day.dateString) === "skipped" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                  "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400": __props.getStatus(habit, day.dateString) === "empty" && !day.isFuture && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                  "bg-slate-50 dark:bg-slate-950 border-slate-50 dark:border-slate-900 opacity-30 cursor-not-allowed": day.isFuture,
                  "ring-2 ring-indigo-600 ring-offset-2": day.isToday && __props.getStatus(habit, day.dateString) !== "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString))
                }, "scroll-mt-32 w-8 h-8 rounded-lg flex items-center justify-center relative outline-none transition-all duration-200 hover:scale-110 hover:z-20 active:scale-75 focus:ring-4 focus:ring-indigo-400 focus:z-30 focus:shadow-lg"])}" style="${ssrRenderStyle(__props.getStatus(habit, day.dateString) === "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)) ? { backgroundColor: habit.color, boxShadow: __props.getStatus(habit, day.dateString) === "completed" && !unref(isDark) ? `0 4px 12px ${habit.color}30` : "none" } : {})}" data-v-d957abd6${_scopeId}>`);
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
                  _push2(`<span class="text-xs font-bold animate-in fade-in duration-300" data-v-d957abd6${_scopeId}>-</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</button></div>`);
              });
              _push2(`<!--]--></div><div class="flex sticky right-0 z-20 w-32 bg-inherit border-l border-slate-100 dark:border-slate-800 p-4 flex-col justify-center shadow-[-10px_0_20px_rgba(255,255,255,0.8)] dark:shadow-[-10px_0_20px_rgba(15,23,42,0.8)]" data-v-d957abd6${_scopeId}><div class="flex justify-between items-end mb-1" data-v-d957abd6${_scopeId}><span class="text-lg font-black text-slate-700 dark:text-slate-200" data-v-d957abd6${_scopeId}>${ssrInterpolate(habit.progress_count)}</span><span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1" data-v-d957abd6${_scopeId}>${ssrInterpolate(Math.round(habit.progress_percent))}%</span></div><div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden" data-v-d957abd6${_scopeId}><div class="h-full rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: habit.progress_percent + "%", backgroundColor: habit.color })}" data-v-d957abd6${_scopeId}></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex transition-colors duration-200 group relative bg-white dark:bg-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-800/50" }, [
                  createVNode("div", { class: "sticky left-0 z-20 w-72 bg-inherit border-r border-slate-100 dark:border-slate-800 p-4 flex items-center gap-3 flex-shrink-0" }, [
                    createVNode("div", { class: "drag-handle cursor-grab active:cursor-grabbing text-slate-300 dark:text-slate-700 hover:text-indigo-500 opacity-30 group-hover:opacity-100 transition-opacity p-1 -ml-2 shrink-0" }, [
                      createVNode(_sfc_main$1, {
                        name: "menu",
                        size: "20"
                      })
                    ]),
                    createVNode("div", {
                      class: "w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 shrink-0",
                      style: { color: habit.color }
                    }, toDisplayString(habit.icon), 5),
                    createVNode("div", { class: "min-w-0 flex-1" }, [
                      createVNode("h4", { class: "font-bold text-slate-700 dark:text-slate-200 truncate text-sm flex items-center gap-1.5" }, [
                        createTextVNode(toDisplayString(habit.name) + " ", 1),
                        habit.streak > 1 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-[10px] font-black animate-pulse shadow-sm border border-orange-100/50 dark:border-orange-500/20"
                        }, [
                          createTextVNode(toDisplayString(habit.streak) + " ", 1),
                          createVNode("span", { class: "text-xs" }, "🔥")
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex items-center gap-1 text-[10px] font-medium text-slate-400 dark:text-slate-500 mb-1.5 mt-0.5" }, [
                        createVNode("span", null, "🎯 Target: " + toDisplayString(habit.monthly_target), 1)
                      ]),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "h-1.5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden" }, [
                          createVNode("div", {
                            class: "h-full rounded-full transition-all duration-300",
                            style: { width: habit.progress_percent + "%", backgroundColor: habit.color }
                          }, null, 4)
                        ]),
                        createVNode("div", { class: "hidden md:flex opacity-0 group-hover:opacity-100 transition items-center gap-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-1 rounded-md absolute right-2 top-1/2 -translate-y-1/2 shadow-sm border border-slate-100 dark:border-slate-700 z-50" }, [
                          createVNode("button", {
                            onClick: ($event) => __props.editHabit(habit),
                            class: "p-1.5 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition",
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
                            class: "p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition",
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
                  createVNode("div", { class: "flex items-center px-4 py-3 gap-1.5 pointer-events-auto" }, [
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
                          class: ["scroll-mt-32 w-8 h-8 rounded-lg flex items-center justify-center relative outline-none transition-all duration-200 hover:scale-110 hover:z-20 active:scale-75 focus:ring-4 focus:ring-indigo-400 focus:z-30 focus:shadow-lg", {
                            "ring-4 ring-indigo-400 scale-110 z-20 shadow-lg !bg-indigo-50 dark:!bg-indigo-500/10 !border-indigo-400": __props.isCellSelected && __props.isCellSelected(habit.id, day.dateString),
                            "shadow-md text-white border-transparent z-10": __props.getStatus(habit, day.dateString) === "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                            "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700": __props.getStatus(habit, day.dateString) === "skipped" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                            "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400": __props.getStatus(habit, day.dateString) === "empty" && !day.isFuture && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)),
                            "bg-slate-50 dark:bg-slate-950 border-slate-50 dark:border-slate-900 opacity-30 cursor-not-allowed": day.isFuture,
                            "ring-2 ring-indigo-600 ring-offset-2": day.isToday && __props.getStatus(habit, day.dateString) !== "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString))
                          }],
                          style: __props.getStatus(habit, day.dateString) === "completed" && !(__props.isCellSelected && __props.isCellSelected(habit.id, day.dateString)) ? { backgroundColor: habit.color, boxShadow: __props.getStatus(habit, day.dateString) === "completed" && !unref(isDark) ? `0 4px 12px ${habit.color}30` : "none" } : {}
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
                            class: "text-xs font-bold animate-in fade-in duration-300"
                          }, "-")) : createCommentVNode("", true)
                        ], 46, ["id", "onClick", "onContextmenu", "onKeydown", "onMousedown", "onMouseenter", "disabled"])
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "flex sticky right-0 z-20 w-32 bg-inherit border-l border-slate-100 dark:border-slate-800 p-4 flex-col justify-center shadow-[-10px_0_20px_rgba(255,255,255,0.8)] dark:shadow-[-10px_0_20px_rgba(15,23,42,0.8)]" }, [
                    createVNode("div", { class: "flex justify-between items-end mb-1" }, [
                      createVNode("span", { class: "text-lg font-black text-slate-700 dark:text-slate-200" }, toDisplayString(habit.progress_count), 1),
                      createVNode("span", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1" }, toDisplayString(Math.round(habit.progress_percent)) + "%", 1)
                    ]),
                    createVNode("div", { class: "w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden" }, [
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
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.localHabits.length === 0) {
        _push(`<div class="hidden md:flex justify-center w-full px-4" data-v-d957abd6><div class="py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-sm mt-4 w-full max-w-4xl" data-v-d957abd6><div class="flex flex-col items-center gap-4" data-v-d957abd6><span class="text-5xl animate-bounce" data-v-d957abd6>🌱</span><p class="text-sm font-bold text-slate-400 dark:text-slate-500 px-8" data-v-d957abd6>${ssrInterpolate(_ctx.$t("habit_empty", "Belum ada habit aktif. Tambah satu yuk!"))}</p><button class="mt-2 bg-indigo-600 text-white font-black py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 active:scale-95 transition-all outline-none" data-v-d957abd6> + ${ssrInterpolate(_ctx.$t("habit_btn_add", "Tambah Habit"))}</button></div>`);
        if (__props.hasPrevHabits) {
          _push(`<div class="mt-8 flex justify-center" data-v-d957abd6><button class="px-6 py-3 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition" data-v-d957abd6>📂 ${ssrInterpolate(_ctx.$t("habit_salin_btn"))}</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
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
const HabitGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d957abd6"]]);
export {
  HabitGrid as default
};
