import { ref, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, withDirectives, vModelText, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import "dayjs";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
import { _ as _sfc_main$1 } from "./Modal-BOdkfMB5.js";
import { _ as _sfc_main$2 } from "./OneForMindIcon-BMUpA12P.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "FullArchiveModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    allStats: Array,
    categories: Array,
    close: Function,
    onDelete: Function,
    onEdit: Function
  },
  setup(__props) {
    const props = __props;
    const { formatMoney, getCategoryDetails } = useFinanceFormat();
    const searchQuery = ref("");
    const filteredStats = computed(() => {
      if (!searchQuery.value) return props.allStats;
      const query = searchQuery.value.toLowerCase();
      return props.allStats.map((day) => {
        const matchingTrx = day.transactions.filter(
          (t) => t.title.toLowerCase().includes(query) || t.category.toLowerCase().includes(query)
        );
        if (matchingTrx.length > 0) {
          return { ...day, transactions: matchingTrx };
        }
        return null;
      }).filter((day) => day !== null);
    });
    const totalIncome = computed(() => props.allStats.reduce((sum, d) => sum + d.total_income, 0));
    const totalExpense = computed(() => props.allStats.reduce((sum, d) => sum + d.total_expense, 0));
    const handleEditAction = (trx) => {
      props.close();
      props.onEdit(trx);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        show: __props.show,
        onClose: __props.close,
        maxWidth: "2xl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-slate-50 dark:bg-slate-950 flex flex-col max-h-[90vh] overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-none transition-all duration-500" data-v-b6675d41${_scopeId}><div class="p-6 md:p-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 transition-colors duration-500" data-v-b6675d41${_scopeId}><div class="flex justify-between items-start mb-6" data-v-b6675d41${_scopeId}><div data-v-b6675d41${_scopeId}><h3 class="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1 transition-colors duration-500" data-v-b6675d41${_scopeId}>${ssrInterpolate(_ctx.$t("daily_history"))}</h3><p class="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest" data-v-b6675d41${_scopeId}>${ssrInterpolate(_ctx.$t("monthly_finance_desc"))}</p></div><button class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold" data-v-b6675d41${_scopeId}> ✕ </button></div><div class="grid grid-cols-2 gap-4 mb-6" data-v-b6675d41${_scopeId}><div class="bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-500/20" data-v-b6675d41${_scopeId}><span class="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1" data-v-b6675d41${_scopeId}>Total ${ssrInterpolate(_ctx.$t("income"))}</span><span class="text-lg font-black text-emerald-700 dark:text-emerald-300 font-mono" data-v-b6675d41${_scopeId}>${ssrInterpolate(unref(formatMoney)(totalIncome.value))}</span></div><div class="bg-rose-50 dark:bg-rose-500/10 p-3 rounded-2xl border border-rose-100 dark:border-rose-500/20" data-v-b6675d41${_scopeId}><span class="text-[9px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider block mb-1" data-v-b6675d41${_scopeId}>Total ${ssrInterpolate(_ctx.$t("expense"))}</span><span class="text-lg font-black text-rose-700 dark:text-rose-300 font-mono" data-v-b6675d41${_scopeId}>${ssrInterpolate(unref(formatMoney)(totalExpense.value))}</span></div></div><div class="relative" data-v-b6675d41${_scopeId}><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" data-v-b6675d41${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              name: "search",
              size: "18",
              "stroke-width": "3"
            }, null, _parent2, _scopeId));
            _push2(`</span><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Cari transaksi atau kategori..." class="w-full pl-12 pr-4 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500 focus:ring-0 font-bold text-sm text-slate-700 dark:text-slate-200 transition-all placeholder:text-slate-400 placeholder:font-medium" data-v-b6675d41${_scopeId}></div></div><div class="flex-1 overflow-y-auto custom-scrollbar p-0" data-v-b6675d41${_scopeId}>`);
            if (filteredStats.value.length === 0) {
              _push2(`<div class="py-20 text-center" data-v-b6675d41${_scopeId}><span class="text-5xl block mb-4" data-v-b6675d41${_scopeId}>🔍</span><p class="text-slate-400 font-bold" data-v-b6675d41${_scopeId}>${ssrInterpolate(searchQuery.value ? "Tidak ada transaksi yang cocok" : "Belum ada data")}</p></div>`);
            } else {
              _push2(`<div class="divide-y divide-slate-100 dark:divide-slate-800/50" data-v-b6675d41${_scopeId}><!--[-->`);
              ssrRenderList(filteredStats.value, (day) => {
                _push2(`<div class="px-6 md:px-8 py-6 bg-white dark:bg-slate-900 group transition-colors duration-500" data-v-b6675d41${_scopeId}><div class="flex items-center justify-between mb-4" data-v-b6675d41${_scopeId}><div class="flex items-center gap-3" data-v-b6675d41${_scopeId}><div class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center shadow-sm" data-v-b6675d41${_scopeId}><span class="text-[9px] uppercase font-black text-slate-400 leading-none" data-v-b6675d41${_scopeId}>${ssrInterpolate(day.dateObj.format("MMM"))}</span><span class="text-lg font-black leading-none text-slate-700 dark:text-slate-200 mt-0.5" data-v-b6675d41${_scopeId}>${ssrInterpolate(day.dateObj.format("DD"))}</span></div><h4 class="font-black text-slate-800 dark:text-white capitalize transition-colors duration-500" data-v-b6675d41${_scopeId}>${ssrInterpolate(day.dateObj.format("dddd, D MMMM"))}</h4></div><div class="text-right" data-v-b6675d41${_scopeId}><span class="${ssrRenderClass([day.total_income - day.total_expense >= 0 ? "text-emerald-500" : "text-rose-500", "text-[10px] font-black font-mono"])}" data-v-b6675d41${_scopeId}>${ssrInterpolate(day.total_income - day.total_expense >= 0 ? "+" : "")}${ssrInterpolate(unref(formatMoney)(day.total_income - day.total_expense))}</span></div></div><div class="space-y-1 ml-1" data-v-b6675d41${_scopeId}><!--[-->`);
                ssrRenderList(day.transactions, (trx) => {
                  _push2(`<div class="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-indigo-500/5 transition-all group/row relative" data-v-b6675d41${_scopeId}><div class="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 bg-slate-50 dark:bg-slate-800 group-hover/row:bg-white transition-colors duration-300" data-v-b6675d41${_scopeId}>${ssrInterpolate(unref(getCategoryDetails)(trx.category, __props.categories).icon)}</div><div class="flex-1 min-w-0" data-v-b6675d41${_scopeId}><p class="font-bold text-slate-700 dark:text-slate-200 text-xs truncate transition-colors duration-500" data-v-b6675d41${_scopeId}>${ssrInterpolate(trx.title)}</p><p class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter" data-v-b6675d41${_scopeId}>${ssrInterpolate(unref(getCategoryDetails)(trx.category, __props.categories).name)}</p></div><div class="text-right" data-v-b6675d41${_scopeId}><p class="${ssrRenderClass([trx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-white", "font-bold text-xs font-mono"])}" data-v-b6675d41${_scopeId}>${ssrInterpolate(trx.type === "income" ? "+" : "-")}${ssrInterpolate(unref(formatMoney)(trx.amount))}</p></div><div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm pl-2 rounded-lg" data-v-b6675d41${_scopeId}><button class="p-1.5 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition-all" data-v-b6675d41${_scopeId}>`);
                  _push2(ssrRenderComponent(_sfc_main$2, {
                    name: "edit",
                    size: "14",
                    "stroke-width": "2.5"
                  }, null, _parent2, _scopeId));
                  _push2(`</button><button class="p-1.5 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-all" data-v-b6675d41${_scopeId}>`);
                  _push2(ssrRenderComponent(_sfc_main$2, {
                    name: "trash",
                    size: "14",
                    "stroke-width": "2.5"
                  }, null, _parent2, _scopeId));
                  _push2(`</button></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div><div class="px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center shrink-0 transition-colors duration-500" data-v-b6675d41${_scopeId}><p class="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]" data-v-b6675d41${_scopeId}>${ssrInterpolate(_ctx.$t("status_active", "Arsip Digital Aktif"))}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-slate-50 dark:bg-slate-950 flex flex-col max-h-[90vh] overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-none transition-all duration-500" }, [
                createVNode("div", { class: "p-6 md:p-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 transition-colors duration-500" }, [
                  createVNode("div", { class: "flex justify-between items-start mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1 transition-colors duration-500" }, toDisplayString(_ctx.$t("daily_history")), 1),
                      createVNode("p", { class: "text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest" }, toDisplayString(_ctx.$t("monthly_finance_desc")), 1)
                    ]),
                    createVNode("button", {
                      onClick: __props.close,
                      class: "w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold"
                    }, " ✕ ", 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4 mb-6" }, [
                    createVNode("div", { class: "bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-500/20" }, [
                      createVNode("span", { class: "text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1" }, "Total " + toDisplayString(_ctx.$t("income")), 1),
                      createVNode("span", { class: "text-lg font-black text-emerald-700 dark:text-emerald-300 font-mono" }, toDisplayString(unref(formatMoney)(totalIncome.value)), 1)
                    ]),
                    createVNode("div", { class: "bg-rose-50 dark:bg-rose-500/10 p-3 rounded-2xl border border-rose-100 dark:border-rose-500/20" }, [
                      createVNode("span", { class: "text-[9px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider block mb-1" }, "Total " + toDisplayString(_ctx.$t("expense")), 1),
                      createVNode("span", { class: "text-lg font-black text-rose-700 dark:text-rose-300 font-mono" }, toDisplayString(unref(formatMoney)(totalExpense.value)), 1)
                    ])
                  ]),
                  createVNode("div", { class: "relative" }, [
                    createVNode("span", { class: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" }, [
                      createVNode(_sfc_main$2, {
                        name: "search",
                        size: "18",
                        "stroke-width": "3"
                      })
                    ]),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      type: "text",
                      placeholder: "Cari transaksi atau kategori...",
                      class: "w-full pl-12 pr-4 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500 focus:ring-0 font-bold text-sm text-slate-700 dark:text-slate-200 transition-all placeholder:text-slate-400 placeholder:font-medium"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, searchQuery.value]
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex-1 overflow-y-auto custom-scrollbar p-0" }, [
                  filteredStats.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "py-20 text-center"
                  }, [
                    createVNode("span", { class: "text-5xl block mb-4" }, "🔍"),
                    createVNode("p", { class: "text-slate-400 font-bold" }, toDisplayString(searchQuery.value ? "Tidak ada transaksi yang cocok" : "Belum ada data"), 1)
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "divide-y divide-slate-100 dark:divide-slate-800/50"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredStats.value, (day) => {
                      return openBlock(), createBlock("div", {
                        key: day.date,
                        class: "px-6 md:px-8 py-6 bg-white dark:bg-slate-900 group transition-colors duration-500"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center shadow-sm" }, [
                              createVNode("span", { class: "text-[9px] uppercase font-black text-slate-400 leading-none" }, toDisplayString(day.dateObj.format("MMM")), 1),
                              createVNode("span", { class: "text-lg font-black leading-none text-slate-700 dark:text-slate-200 mt-0.5" }, toDisplayString(day.dateObj.format("DD")), 1)
                            ]),
                            createVNode("h4", { class: "font-black text-slate-800 dark:text-white capitalize transition-colors duration-500" }, toDisplayString(day.dateObj.format("dddd, D MMMM")), 1)
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("span", {
                              class: ["text-[10px] font-black font-mono", day.total_income - day.total_expense >= 0 ? "text-emerald-500" : "text-rose-500"]
                            }, toDisplayString(day.total_income - day.total_expense >= 0 ? "+" : "") + toDisplayString(unref(formatMoney)(day.total_income - day.total_expense)), 3)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-1 ml-1" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(day.transactions, (trx) => {
                            return openBlock(), createBlock("div", {
                              key: trx.id,
                              class: "flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-indigo-500/5 transition-all group/row relative"
                            }, [
                              createVNode("div", { class: "w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 bg-slate-50 dark:bg-slate-800 group-hover/row:bg-white transition-colors duration-300" }, toDisplayString(unref(getCategoryDetails)(trx.category, __props.categories).icon), 1),
                              createVNode("div", { class: "flex-1 min-w-0" }, [
                                createVNode("p", { class: "font-bold text-slate-700 dark:text-slate-200 text-xs truncate transition-colors duration-500" }, toDisplayString(trx.title), 1),
                                createVNode("p", { class: "text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter" }, toDisplayString(unref(getCategoryDetails)(trx.category, __props.categories).name), 1)
                              ]),
                              createVNode("div", { class: "text-right" }, [
                                createVNode("p", {
                                  class: ["font-bold text-xs font-mono", trx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-white"]
                                }, toDisplayString(trx.type === "income" ? "+" : "-") + toDisplayString(unref(formatMoney)(trx.amount)), 3)
                              ]),
                              createVNode("div", { class: "absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm pl-2 rounded-lg" }, [
                                createVNode("button", {
                                  onClick: ($event) => handleEditAction(trx),
                                  class: "p-1.5 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition-all"
                                }, [
                                  createVNode(_sfc_main$2, {
                                    name: "edit",
                                    size: "14",
                                    "stroke-width": "2.5"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => __props.onDelete(trx.id),
                                  class: "p-1.5 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-all"
                                }, [
                                  createVNode(_sfc_main$2, {
                                    name: "trash",
                                    size: "14",
                                    "stroke-width": "2.5"
                                  })
                                ], 8, ["onClick"])
                              ])
                            ]);
                          }), 128))
                        ])
                      ]);
                    }), 128))
                  ]))
                ]),
                createVNode("div", { class: "px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center shrink-0 transition-colors duration-500" }, [
                  createVNode("p", { class: "text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]" }, toDisplayString(_ctx.$t("status_active", "Arsip Digital Aktif")), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/FullArchiveModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FullArchiveModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b6675d41"]]);
export {
  FullArchiveModal as default
};
