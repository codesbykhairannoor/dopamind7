import { computed, mergeProps, withCtx, unref, createBlock, createCommentVNode, openBlock, createVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import dayjs from "dayjs";
import { getActiveLanguage } from "laravel-vue-i18n";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { u as useFinanceFormat } from "./useFinanceFormat-DRbxJZsx.js";
import { _ as _sfc_main$1 } from "./Modal-B2rYQMrj.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "ArchiveModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    dayData: Object,
    categories: Array,
    close: Function,
    onDelete: Function,
    onEdit: Function
  },
  setup(__props) {
    const props = __props;
    const { formatMoney, getCategoryDetails } = useFinanceFormat();
    const formattedDate = computed(() => {
      var _a;
      if (!((_a = props.dayData) == null ? void 0 : _a.date)) return "";
      let lang = getActiveLanguage() || "id";
      if (lang.includes("-")) lang = lang.split("-")[0];
      return dayjs(props.dayData.date).locale(lang).format("dddd, D MMMM YYYY");
    });
    const handleEditAction = (trx) => {
      props.close();
      props.onEdit(trx);
    };
    const handleDeleteAction = (id) => {
      props.onDelete(id, () => {
        props.close();
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        show: __props.show,
        onClose: __props.close,
        maxWidth: "lg"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.dayData) {
              _push2(`<div class="bg-white rounded-2xl overflow-hidden shadow-xl" data-v-4de5cc17${_scopeId}><div class="bg-indigo-600 px-6 py-5 relative overflow-hidden text-white" data-v-4de5cc17${_scopeId}><div class="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" data-v-4de5cc17${_scopeId}></div><div class="relative z-10 flex justify-between items-start" data-v-4de5cc17${_scopeId}><div data-v-4de5cc17${_scopeId}><span class="text-indigo-200 text-[10px] font-bold uppercase tracking-widest" data-v-4de5cc17${_scopeId}>${ssrInterpolate(_ctx.$t("daily_detail"))}</span><h3 class="text-xl font-black mt-0.5 capitalize" data-v-4de5cc17${_scopeId}>${ssrInterpolate(formattedDate.value)}</h3></div><button class="bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition" data-v-4de5cc17${_scopeId}>✕</button></div><div class="flex gap-3 mt-4" data-v-4de5cc17${_scopeId}><div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex-1" data-v-4de5cc17${_scopeId}><span class="text-[10px] text-indigo-100 uppercase block font-bold" data-v-4de5cc17${_scopeId}>${ssrInterpolate(_ctx.$t("income"))}</span><span class="text-sm font-bold text-emerald-300" data-v-4de5cc17${_scopeId}>+ ${ssrInterpolate(unref(formatMoney)(__props.dayData.total_income))}</span></div><div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex-1" data-v-4de5cc17${_scopeId}><span class="text-[10px] text-indigo-100 uppercase block font-bold" data-v-4de5cc17${_scopeId}>${ssrInterpolate(_ctx.$t("expense"))}</span><span class="text-sm font-bold text-rose-300" data-v-4de5cc17${_scopeId}>- ${ssrInterpolate(unref(formatMoney)(__props.dayData.total_expense))}</span></div></div></div><div class="p-0 bg-slate-50 max-h-[60vh] overflow-y-auto custom-scrollbar" data-v-4de5cc17${_scopeId}><div class="divide-y divide-slate-100" data-v-4de5cc17${_scopeId}><!--[-->`);
              ssrRenderList(__props.dayData.transactions, (trx) => {
                _push2(`<div class="bg-white p-4 flex items-center gap-3 hover:bg-slate-50 transition group" data-v-4de5cc17${_scopeId}><div class="${ssrRenderClass([unref(getCategoryDetails)(trx.category, __props.categories).bg || "bg-slate-100", "w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-colors"])}" data-v-4de5cc17${_scopeId}>${ssrInterpolate(unref(getCategoryDetails)(trx.category, __props.categories).icon)}</div><div class="flex-1 min-w-0" data-v-4de5cc17${_scopeId}><p class="font-bold text-slate-700 text-sm truncate" data-v-4de5cc17${_scopeId}>${ssrInterpolate(trx.title)}</p><span class="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded capitalize" data-v-4de5cc17${_scopeId}>${ssrInterpolate(unref(getCategoryDetails)(trx.category, __props.categories).name)}</span></div><div class="text-right" data-v-4de5cc17${_scopeId}><p class="${ssrRenderClass([trx.type === "income" ? "text-emerald-600" : "text-slate-800", "font-bold text-sm font-mono mb-1"])}" data-v-4de5cc17${_scopeId}>${ssrInterpolate(trx.type === "income" ? "+" : "-")} ${ssrInterpolate(unref(formatMoney)(trx.amount))}</p><div class="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity" data-v-4de5cc17${_scopeId}><button class="text-[10px] font-bold text-indigo-500 hover:underline" data-v-4de5cc17${_scopeId}>${ssrInterpolate(_ctx.$t("edit"))}</button><button class="text-[10px] font-bold text-rose-400 hover:text-rose-600" data-v-4de5cc17${_scopeId}>${ssrInterpolate(_ctx.$t("delete"))}</button></div></div></div>`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.dayData ? (openBlock(), createBlock("div", {
                key: 0,
                class: "bg-white rounded-2xl overflow-hidden shadow-xl"
              }, [
                createVNode("div", { class: "bg-indigo-600 px-6 py-5 relative overflow-hidden text-white" }, [
                  createVNode("div", { class: "absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" }),
                  createVNode("div", { class: "relative z-10 flex justify-between items-start" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-indigo-200 text-[10px] font-bold uppercase tracking-widest" }, toDisplayString(_ctx.$t("daily_detail")), 1),
                      createVNode("h3", { class: "text-xl font-black mt-0.5 capitalize" }, toDisplayString(formattedDate.value), 1)
                    ]),
                    createVNode("button", {
                      onClick: __props.close,
                      class: "bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition"
                    }, "✕", 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "flex gap-3 mt-4" }, [
                    createVNode("div", { class: "bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex-1" }, [
                      createVNode("span", { class: "text-[10px] text-indigo-100 uppercase block font-bold" }, toDisplayString(_ctx.$t("income")), 1),
                      createVNode("span", { class: "text-sm font-bold text-emerald-300" }, "+ " + toDisplayString(unref(formatMoney)(__props.dayData.total_income)), 1)
                    ]),
                    createVNode("div", { class: "bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex-1" }, [
                      createVNode("span", { class: "text-[10px] text-indigo-100 uppercase block font-bold" }, toDisplayString(_ctx.$t("expense")), 1),
                      createVNode("span", { class: "text-sm font-bold text-rose-300" }, "- " + toDisplayString(unref(formatMoney)(__props.dayData.total_expense)), 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "p-0 bg-slate-50 max-h-[60vh] overflow-y-auto custom-scrollbar" }, [
                  createVNode("div", { class: "divide-y divide-slate-100" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.dayData.transactions, (trx) => {
                      return openBlock(), createBlock("div", {
                        key: trx.id,
                        class: "bg-white p-4 flex items-center gap-3 hover:bg-slate-50 transition group"
                      }, [
                        createVNode("div", {
                          class: ["w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-colors", unref(getCategoryDetails)(trx.category, __props.categories).bg || "bg-slate-100"]
                        }, toDisplayString(unref(getCategoryDetails)(trx.category, __props.categories).icon), 3),
                        createVNode("div", { class: "flex-1 min-w-0" }, [
                          createVNode("p", { class: "font-bold text-slate-700 text-sm truncate" }, toDisplayString(trx.title), 1),
                          createVNode("span", { class: "text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded capitalize" }, toDisplayString(unref(getCategoryDetails)(trx.category, __props.categories).name), 1)
                        ]),
                        createVNode("div", { class: "text-right" }, [
                          createVNode("p", {
                            class: ["font-bold text-sm font-mono mb-1", trx.type === "income" ? "text-emerald-600" : "text-slate-800"]
                          }, toDisplayString(trx.type === "income" ? "+" : "-") + " " + toDisplayString(unref(formatMoney)(trx.amount)), 3),
                          createVNode("div", { class: "flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity" }, [
                            createVNode("button", {
                              onClick: ($event) => handleEditAction(trx),
                              class: "text-[10px] font-bold text-indigo-500 hover:underline"
                            }, toDisplayString(_ctx.$t("edit")), 9, ["onClick"]),
                            createVNode("button", {
                              onClick: ($event) => handleDeleteAction(trx.id),
                              class: "text-[10px] font-bold text-rose-400 hover:text-rose-600"
                            }, toDisplayString(_ctx.$t("delete")), 9, ["onClick"])
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/ArchiveModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ArchiveModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4de5cc17"]]);
export {
  ArchiveModal as default
};
