import { computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DzWwanC6.js";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import axios from "axios";
import Swal from "sweetalert2";
import "./ThemeToggle-ByQSx4Ee.js";
import "./useAppearance-rDoGVD4_.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    plan: {
      type: String,
      required: true
    },
    price: String,
    currency: String,
    features: Array
  },
  setup(__props) {
    const props = __props;
    const isQuantum = computed(() => props.plan.toLowerCase() === "quantum");
    const isLegendary = computed(() => props.plan.toLowerCase() === "lifetime");
    const initiatePayment = async (method) => {
      const routeName = method === "paypal" ? "paypal.checkout" : "payment.checkout";
      Swal.fire({
        title: "Redirecting to Gateway...",
        html: `Securing connection to ${method === "paypal" ? "PayPal" : "Duitku"}...`,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      try {
        const response = await axios.post(route(routeName), {
          plan: props.plan.toLowerCase()
        });
        if (response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          throw new Error("No payment URL received");
        }
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Gateway Error",
          text: "Gagal menghubungi server pembayaran. Silakan coba lagi.",
          confirmButtonColor: "#4f46e5"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Checkout Summary" }, null, _parent));
      _push(ssrRenderComponent(AuthenticatedLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen py-12 px-4 bg-slate-50/30 dark:bg-slate-950/20"${_scopeId}><div class="max-w-4xl mx-auto"${_scopeId}><button class="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors mb-8 uppercase tracking-widest"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "chevron-left",
              size: "14",
              "stroke-width": "4"
            }, null, _parent2, _scopeId));
            _push2(` Back to Selection </button><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"${_scopeId}><div class="space-y-6"${_scopeId}><div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"${_scopeId}><h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6"${_scopeId}>Order Summary</h2><div class="flex items-center gap-4 mb-8"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: isQuantum.value || isLegendary.value ? "sparkles" : "shield-check",
              size: "32"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="min-w-0"${_scopeId}><h3 class="text-2xl font-black text-slate-900 dark:text-white truncate"${_scopeId}>OneForMind ${ssrInterpolate(__props.plan)}</h3><p class="text-sm font-bold text-indigo-600 dark:text-indigo-400 capitalize"${_scopeId}>${ssrInterpolate(__props.price)} / ${ssrInterpolate(isLegendary.value ? "Lifetime" : "Yearly")}</p></div></div><div class="space-y-4 pt-6 border-t border-slate-50 dark:border-slate-800"${_scopeId}><!--[-->`);
            ssrRenderList(__props.features, (feat) => {
              _push2(`<div class="flex gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "check",
                size: "14",
                class: "text-emerald-500 shrink-0 mt-0.5",
                "stroke-width": "4"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-xs font-bold text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(feat)}</span></div>`);
            });
            _push2(`<!--]--></div><div class="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700"${_scopeId}><div class="flex justify-between items-center text-slate-800 dark:text-white"${_scopeId}><span class="text-sm font-black"${_scopeId}>Total Amount</span><span class="text-xl font-black tracking-tight"${_scopeId}>${ssrInterpolate(__props.price)}</span></div></div></div><div class="flex items-center justify-center gap-6 opacity-40 grayscale"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "lock",
              size: "24"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[10px] font-black uppercase tracking-widest text-slate-500"${_scopeId}>Bank-Level Security &amp; SSL Encryption</span></div></div><div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"${_scopeId}><h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8"${_scopeId}>Select Payment Method</h2><div class="space-y-4"${_scopeId}><button class="w-full group relative overflow-hidden p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 transition-all text-left"${_scopeId}><div class="flex items-center justify-between relative z-10"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl"${_scopeId}>🇮🇩</div><div${_scopeId}><h4 class="font-black text-slate-800 dark:text-white"${_scopeId}>Duitku (IDR)</h4><p class="text-[10px] font-bold text-slate-400"${_scopeId}>QRIS, Virtual Account, &amp; Bank Transfer</p></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "chevron-right",
              size: "16",
              class: "text-slate-300 group-hover:text-indigo-600 transition-colors",
              "stroke-width": "4"
            }, null, _parent2, _scopeId));
            _push2(`</div></button><button class="w-full group relative overflow-hidden p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 transition-all text-left"${_scopeId}><div class="flex items-center justify-between relative z-10"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl"${_scopeId}>🌍</div><div${_scopeId}><h4 class="font-black text-slate-800 dark:text-white"${_scopeId}>PayPal / Card (USD)</h4><p class="text-[10px] font-bold text-slate-400"${_scopeId}>International Credit Card &amp; PayPal Wallet</p></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "chevron-right",
              size: "16",
              class: "text-slate-300 group-hover:text-indigo-600 transition-colors",
              "stroke-width": "4"
            }, null, _parent2, _scopeId));
            _push2(`</div></button></div><div class="mt-8 text-center text-[10px] font-medium text-slate-400 leading-relaxed italic"${_scopeId}> By clicking a payment method, you will be securely redirected to our payment partner. Your subscription will be active immediately after successful payment. </div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen py-12 px-4 bg-slate-50/30 dark:bg-slate-950/20" }, [
                createVNode("div", { class: "max-w-4xl mx-auto" }, [
                  createVNode("button", {
                    onClick: ($event) => _ctx.window.history.back(),
                    class: "flex items-center gap-2 text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors mb-8 uppercase tracking-widest"
                  }, [
                    createVNode(_sfc_main$1, {
                      name: "chevron-left",
                      size: "14",
                      "stroke-width": "4"
                    }),
                    createTextVNode(" Back to Selection ")
                  ], 8, ["onClick"]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" }, [
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none" }, [
                        createVNode("h2", { class: "text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6" }, "Order Summary"),
                        createVNode("div", { class: "flex items-center gap-4 mb-8" }, [
                          createVNode("div", { class: "w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none" }, [
                            createVNode(_sfc_main$1, {
                              name: isQuantum.value || isLegendary.value ? "sparkles" : "shield-check",
                              size: "32"
                            }, null, 8, ["name"])
                          ]),
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode("h3", { class: "text-2xl font-black text-slate-900 dark:text-white truncate" }, "OneForMind " + toDisplayString(__props.plan), 1),
                            createVNode("p", { class: "text-sm font-bold text-indigo-600 dark:text-indigo-400 capitalize" }, toDisplayString(__props.price) + " / " + toDisplayString(isLegendary.value ? "Lifetime" : "Yearly"), 1)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-4 pt-6 border-t border-slate-50 dark:border-slate-800" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.features, (feat) => {
                            return openBlock(), createBlock("div", {
                              key: feat,
                              class: "flex gap-3"
                            }, [
                              createVNode(_sfc_main$1, {
                                name: "check",
                                size: "14",
                                class: "text-emerald-500 shrink-0 mt-0.5",
                                "stroke-width": "4"
                              }),
                              createVNode("span", { class: "text-xs font-bold text-slate-600 dark:text-slate-400" }, toDisplayString(feat), 1)
                            ]);
                          }), 128))
                        ]),
                        createVNode("div", { class: "mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700" }, [
                          createVNode("div", { class: "flex justify-between items-center text-slate-800 dark:text-white" }, [
                            createVNode("span", { class: "text-sm font-black" }, "Total Amount"),
                            createVNode("span", { class: "text-xl font-black tracking-tight" }, toDisplayString(__props.price), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center justify-center gap-6 opacity-40 grayscale" }, [
                        createVNode(_sfc_main$1, {
                          name: "lock",
                          size: "24"
                        }),
                        createVNode("span", { class: "text-[10px] font-black uppercase tracking-widest text-slate-500" }, "Bank-Level Security & SSL Encryption")
                      ])
                    ]),
                    createVNode("div", { class: "bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none" }, [
                      createVNode("h2", { class: "text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8" }, "Select Payment Method"),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("button", {
                          onClick: ($event) => initiatePayment("duitku"),
                          class: "w-full group relative overflow-hidden p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 transition-all text-left"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between relative z-10" }, [
                            createVNode("div", { class: "flex items-center gap-4" }, [
                              createVNode("div", { class: "w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl" }, "🇮🇩"),
                              createVNode("div", null, [
                                createVNode("h4", { class: "font-black text-slate-800 dark:text-white" }, "Duitku (IDR)"),
                                createVNode("p", { class: "text-[10px] font-bold text-slate-400" }, "QRIS, Virtual Account, & Bank Transfer")
                              ])
                            ]),
                            createVNode(_sfc_main$1, {
                              name: "chevron-right",
                              size: "16",
                              class: "text-slate-300 group-hover:text-indigo-600 transition-colors",
                              "stroke-width": "4"
                            })
                          ])
                        ], 8, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => initiatePayment("paypal"),
                          class: "w-full group relative overflow-hidden p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 transition-all text-left"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between relative z-10" }, [
                            createVNode("div", { class: "flex items-center gap-4" }, [
                              createVNode("div", { class: "w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl" }, "🌍"),
                              createVNode("div", null, [
                                createVNode("h4", { class: "font-black text-slate-800 dark:text-white" }, "PayPal / Card (USD)"),
                                createVNode("p", { class: "text-[10px] font-bold text-slate-400" }, "International Credit Card & PayPal Wallet")
                              ])
                            ]),
                            createVNode(_sfc_main$1, {
                              name: "chevron-right",
                              size: "16",
                              class: "text-slate-300 group-hover:text-indigo-600 transition-colors",
                              "stroke-width": "4"
                            })
                          ])
                        ], 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "mt-8 text-center text-[10px] font-medium text-slate-400 leading-relaxed italic" }, " By clicking a payment method, you will be securely redirected to our payment partner. Your subscription will be active immediately after successful payment. ")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Checkout/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
