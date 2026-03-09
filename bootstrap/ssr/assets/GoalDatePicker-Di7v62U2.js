import { computed, ref, watch, createVNode, resolveDynamicComponent, mergeProps, withCtx, createBlock, createCommentVNode, openBlock, withModifiers, toDisplayString, Fragment, renderList, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderVNode, ssrRenderClass, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "GoalDatePicker",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    show: Boolean,
    teleport: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "close"],
  setup(__props, { emit: __emit }) {
    dayjs.extend(localeData);
    const props = __props;
    const emit = __emit;
    const page = usePage();
    const currentLocale = computed(() => page.props.locale || "id");
    const weekDays = computed(() => {
      try {
        const labels = dayjs().locale(currentLocale.value).localeData().weekdaysShort();
        return labels.map((day) => day.substring(0, 3));
      } catch (e) {
        return ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
      }
    });
    const currentMonth = ref(dayjs(props.modelValue || void 0));
    watch(() => props.modelValue, (newVal) => {
      if (newVal) currentMonth.value = dayjs(newVal);
    });
    const daysInMonth = computed(() => currentMonth.value.daysInMonth());
    const startDayOfWeek = computed(() => currentMonth.value.startOf("month").day());
    const formattedHeader = computed(() => {
      return currentMonth.value.locale(currentLocale.value).format("MMMM YYYY");
    });
    const prevMonth = () => currentMonth.value = currentMonth.value.subtract(1, "month");
    const nextMonth = () => currentMonth.value = currentMonth.value.add(1, "month");
    const selectDate = (day) => {
      const selectedDate = currentMonth.value.date(day).format("YYYY-MM-DD");
      emit("update:modelValue", selectedDate);
      emit("close");
    };
    const isSelected = (day) => {
      if (!props.modelValue) return false;
      return props.modelValue === currentMonth.value.date(day).format("YYYY-MM-DD");
    };
    const isToday = (day) => {
      return dayjs().format("YYYY-MM-DD") === currentMonth.value.date(day).format("YYYY-MM-DD");
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.teleport ? "Teleport" : "div"), mergeProps(__props.teleport ? { to: "body" } : {}, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.show) {
              _push2(`<div class="${ssrRenderClass([
                __props.teleport ? "fixed inset-0 z-[1000] flex items-center justify-center p-4" : "absolute top-full left-0 mt-2 z-[100] shadow-2xl"
              ])}"${_scopeId}>`);
              if (__props.teleport) {
                _push2(`<div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-slate-200 p-6 animate-in fade-in zoom-in-95 duration-200 relative z-10 w-[300px]"${_scopeId}><div class="flex items-center justify-between mb-5 px-1"${_scopeId}><button class="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><path d="m15 18-6-6 6-6"${_scopeId}></path></svg></button><div class="text-center"${_scopeId}><h4 class="font-black text-slate-800 capitalize tracking-tight text-base leading-none"${_scopeId}>${ssrInterpolate(formattedHeader.value)}</h4></div><button class="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><path d="m9 18 6-6-6-6"${_scopeId}></path></svg></button></div><div class="grid grid-cols-7 mb-2 text-center h-8 items-center"${_scopeId}><!--[-->`);
              ssrRenderList(weekDays.value, (dayName) => {
                _push2(`<span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block"${_scopeId}>${ssrInterpolate(dayName)}</span>`);
              });
              _push2(`<!--]--></div><div class="grid grid-cols-7 gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(startDayOfWeek.value, (n) => {
                _push2(`<div class="h-9 w-9"${_scopeId}></div>`);
              });
              _push2(`<!--]--><!--[-->`);
              ssrRenderList(daysInMonth.value, (day) => {
                _push2(`<button class="${ssrRenderClass([[
                  isSelected(day) ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105 z-10" : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600",
                  isToday(day) && !isSelected(day) ? "text-indigo-600 ring-1 ring-indigo-100" : ""
                ], "h-9 w-9 flex items-center justify-center rounded-2xl text-sm font-bold transition-all relative group"])}"${_scopeId}>${ssrInterpolate(day)} `);
                if (isToday(day)) {
                  _push2(`<span class="${ssrRenderClass([isSelected(day) ? "bg-white" : "bg-indigo-500", "absolute bottom-1 w-1 h-1 rounded-full"])}"${_scopeId}></span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</button>`);
              });
              _push2(`<!--]--></div><div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between px-1"${_scopeId}><button class="text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all"${_scopeId}>${ssrInterpolate(_ctx.$t("datepicker_today", "Today"))}</button><button class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-all"${_scopeId}>${ssrInterpolate(_ctx.$t("btn_cancel", "Cancel"))}</button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.show ? (openBlock(), createBlock("div", {
                key: 0,
                class: [
                  __props.teleport ? "fixed inset-0 z-[1000] flex items-center justify-center p-4" : "absolute top-full left-0 mt-2 z-[100] shadow-2xl"
                ]
              }, [
                __props.teleport ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "absolute inset-0 bg-slate-900/40 backdrop-blur-sm",
                  onClick: ($event) => emit("close")
                }, null, 8, ["onClick"])) : createCommentVNode("", true),
                createVNode("div", { class: "bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-slate-200 p-6 animate-in fade-in zoom-in-95 duration-200 relative z-10 w-[300px]" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-5 px-1" }, [
                    createVNode("button", {
                      onClick: withModifiers(prevMonth, ["prevent"]),
                      class: "w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "18",
                        height: "18",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "3",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }, [
                        createVNode("path", { d: "m15 18-6-6 6-6" })
                      ]))
                    ]),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h4", { class: "font-black text-slate-800 capitalize tracking-tight text-base leading-none" }, toDisplayString(formattedHeader.value), 1)
                    ]),
                    createVNode("button", {
                      onClick: withModifiers(nextMonth, ["prevent"]),
                      class: "w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "18",
                        height: "18",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "3",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }, [
                        createVNode("path", { d: "m9 18 6-6-6-6" })
                      ]))
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-7 mb-2 text-center h-8 items-center" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(weekDays.value, (dayName) => {
                      return openBlock(), createBlock("span", {
                        key: dayName,
                        class: "text-[10px] font-black text-slate-400 uppercase tracking-widest block"
                      }, toDisplayString(dayName), 1);
                    }), 128))
                  ]),
                  createVNode("div", { class: "grid grid-cols-7 gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(startDayOfWeek.value, (n) => {
                      return openBlock(), createBlock("div", {
                        key: "blank-" + n,
                        class: "h-9 w-9"
                      });
                    }), 128)),
                    (openBlock(true), createBlock(Fragment, null, renderList(daysInMonth.value, (day) => {
                      return openBlock(), createBlock("button", {
                        key: day,
                        onClick: withModifiers(($event) => selectDate(day), ["prevent"]),
                        class: ["h-9 w-9 flex items-center justify-center rounded-2xl text-sm font-bold transition-all relative group", [
                          isSelected(day) ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105 z-10" : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600",
                          isToday(day) && !isSelected(day) ? "text-indigo-600 ring-1 ring-indigo-100" : ""
                        ]]
                      }, [
                        createTextVNode(toDisplayString(day) + " ", 1),
                        isToday(day) ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: ["absolute bottom-1 w-1 h-1 rounded-full", isSelected(day) ? "bg-white" : "bg-indigo-500"]
                        }, null, 2)) : createCommentVNode("", true)
                      ], 10, ["onClick"]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "mt-4 pt-4 border-t border-slate-100 flex items-center justify-between px-1" }, [
                    createVNode("button", {
                      onClick: ($event) => currentMonth.value = unref(dayjs)(),
                      class: "text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all"
                    }, toDisplayString(_ctx.$t("datepicker_today", "Today")), 9, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => emit("close"),
                      class: "text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-all"
                    }, toDisplayString(_ctx.$t("btn_cancel", "Cancel")), 9, ["onClick"])
                  ])
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/GoalDatePicker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
