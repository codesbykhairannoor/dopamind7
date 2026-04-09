import { onMounted, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BuzclwEd.js";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import confetti from "canvas-confetti";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ThemeToggle-ByQSx4Ee.js";
import "./useAppearance-rDoGVD4_.js";
const _sfc_main = {
  __name: "Success",
  __ssrInlineRender: true,
  props: {
    plan: String,
    userName: String
  },
  setup(__props) {
    onMounted(() => {
      const duration = 5 * 1e3;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }
      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Welcome to the Ecosystem!" }, null, _parent));
      _push(ssrRenderComponent(AuthenticatedLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50/30 dark:bg-slate-950/20" data-v-f8ce2588${_scopeId}><div class="max-w-xl w-full text-center animate-in fade-in zoom-in-95 duration-1000" data-v-f8ce2588${_scopeId}><div class="relative inline-block mb-10" data-v-f8ce2588${_scopeId}><div class="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 scale-150 animate-pulse" data-v-f8ce2588${_scopeId}></div><div class="relative w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-200 dark:shadow-none rotate-6 hover:rotate-0 transition-transform duration-500" data-v-f8ce2588${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "shield-check",
              size: "64"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg animate-bounce" data-v-f8ce2588${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "check",
              size: "20",
              "stroke-width": "4"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><h1 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight" data-v-f8ce2588${_scopeId}>${ssrInterpolate(_ctx.$t("payment_success_title", "Upgrade Complete!"))}</h1><p class="text-lg md:text-xl font-bold text-slate-500 dark:text-slate-400 mb-10" data-v-f8ce2588${_scopeId}>${ssrInterpolate(_ctx.$t("payment_welcome_msg", "Welcome to the elite ecosystem,"))} <span class="text-indigo-600 dark:text-indigo-400" data-v-f8ce2588${_scopeId}>${ssrInterpolate(__props.userName)}</span>. ${ssrInterpolate(_ctx.$t("payment_quantum_praise", "Your potential is now officially expanded."))}</p><div class="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-12" data-v-f8ce2588${_scopeId}><div class="w-2 h-2 rounded-full bg-indigo-500 animate-ping" data-v-f8ce2588${_scopeId}></div><span class="text-xs font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300" data-v-f8ce2588${_scopeId}>${ssrInterpolate(__props.plan)} Membership Active </span></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-f8ce2588${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/dashboard",
              class: "px-8 py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("payment_btn_dashboard", "Go to Dashboard"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("payment_btn_dashboard", "Go to Dashboard")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/coach",
              class: "px-8 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("payment_btn_ai", "Talk to AI Coach"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("payment_btn_ai", "Talk to AI Coach")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-16 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center justify-center gap-4" data-v-f8ce2588${_scopeId}><span class="w-12 h-px bg-slate-200" data-v-f8ce2588${_scopeId}></span> SECURE ACCESS GRANTED <span class="w-12 h-px bg-slate-200" data-v-f8ce2588${_scopeId}></span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50/30 dark:bg-slate-950/20" }, [
                createVNode("div", { class: "max-w-xl w-full text-center animate-in fade-in zoom-in-95 duration-1000" }, [
                  createVNode("div", { class: "relative inline-block mb-10" }, [
                    createVNode("div", { class: "absolute inset-0 bg-indigo-500 blur-3xl opacity-20 scale-150 animate-pulse" }),
                    createVNode("div", { class: "relative w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-200 dark:shadow-none rotate-6 hover:rotate-0 transition-transform duration-500" }, [
                      createVNode(_sfc_main$1, {
                        name: "shield-check",
                        size: "64"
                      })
                    ]),
                    createVNode("div", { class: "absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg animate-bounce" }, [
                      createVNode(_sfc_main$1, {
                        name: "check",
                        size: "20",
                        "stroke-width": "4"
                      })
                    ])
                  ]),
                  createVNode("h1", { class: "text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight" }, toDisplayString(_ctx.$t("payment_success_title", "Upgrade Complete!")), 1),
                  createVNode("p", { class: "text-lg md:text-xl font-bold text-slate-500 dark:text-slate-400 mb-10" }, [
                    createTextVNode(toDisplayString(_ctx.$t("payment_welcome_msg", "Welcome to the elite ecosystem,")) + " ", 1),
                    createVNode("span", { class: "text-indigo-600 dark:text-indigo-400" }, toDisplayString(__props.userName), 1),
                    createTextVNode(". " + toDisplayString(_ctx.$t("payment_quantum_praise", "Your potential is now officially expanded.")), 1)
                  ]),
                  createVNode("div", { class: "inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-12" }, [
                    createVNode("div", { class: "w-2 h-2 rounded-full bg-indigo-500 animate-ping" }),
                    createVNode("span", { class: "text-xs font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300" }, toDisplayString(__props.plan) + " Membership Active ", 1)
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                    createVNode(unref(Link), {
                      href: "/dashboard",
                      class: "px-8 py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("payment_btn_dashboard", "Go to Dashboard")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), {
                      href: "/coach",
                      class: "px-8 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("payment_btn_ai", "Talk to AI Coach")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "mt-16 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center justify-center gap-4" }, [
                    createVNode("span", { class: "w-12 h-px bg-slate-200" }),
                    createTextVNode(" SECURE ACCESS GRANTED "),
                    createVNode("span", { class: "w-12 h-px bg-slate-200" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Payment/Success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Success = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f8ce2588"]]);
export {
  Success as default
};
