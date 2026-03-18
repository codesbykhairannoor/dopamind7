import { unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-B7tFTTzr.js";
import _sfc_main$4 from "./DeleteUserForm-CyrrCqd5.js";
import _sfc_main$2 from "./UpdatePasswordForm-BcezI0yx.js";
import _sfc_main$1 from "./UpdateProfileInformationForm-qZ6znVNy.js";
import { Head } from "@inertiajs/vue3";
import _sfc_main$3 from "./PremiumSubscriptionForm-DkItcrRf.js";
import "./OneForMindIcon-BLGVXpxK.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./InputError-CjMsDEOH.js";
import "./InputLabel-BgCYZe1F.js";
import "./Modal-B2rYQMrj.js";
import "./SecondaryButton-BgIg9sGF.js";
import "./TextInput-BNWZnSh4.js";
import "./PrimaryButton-4NJ7Yqx3.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: {
      type: Boolean
    },
    status: {
      type: String
    },
    hasPassword: {
      type: Boolean
    },
    midtrans_client_key: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Profile" }, null, _parent));
      _push(ssrRenderComponent(AuthenticatedLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}>Profile</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, "Profile")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              "must-verify-email": __props.mustVerifyEmail,
              status: __props.status,
              class: "max-w-xl"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.hasPassword) {
              _push2(`<div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, { class: "max-w-xl" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}><section${_scopeId}><header${_scopeId}><h2 class="text-lg font-black text-slate-800 uppercase tracking-widest"${_scopeId}>${ssrInterpolate(_ctx.$t("password_title", "Kata Sandi"))}</h2><p class="mt-1 text-sm text-slate-500 font-medium"${_scopeId}>${ssrInterpolate(_ctx.$t("google_auth_message", "Akun ini terhubung menggunakan Google. Anda tidak memerlukan kata sandi untuk masuk ke aplikasi."))}</p></header><div class="mt-6 flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-sm border border-indigo-100"${_scopeId}><svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor"${_scopeId}><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"${_scopeId}></path></svg> Login via Google Aktif </div></section></div>`);
            }
            _push2(`<div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { "midtrans-client-key": __props.midtrans_client_key }, null, _parent2, _scopeId));
            _push2(`</div><div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, { class: "max-w-xl" }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg" }, [
                    createVNode(_sfc_main$1, {
                      "must-verify-email": __props.mustVerifyEmail,
                      status: __props.status,
                      class: "max-w-xl"
                    }, null, 8, ["must-verify-email", "status"])
                  ]),
                  __props.hasPassword ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                  }, [
                    createVNode(_sfc_main$2, { class: "max-w-xl" })
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                  }, [
                    createVNode("section", null, [
                      createVNode("header", null, [
                        createVNode("h2", { class: "text-lg font-black text-slate-800 uppercase tracking-widest" }, toDisplayString(_ctx.$t("password_title", "Kata Sandi")), 1),
                        createVNode("p", { class: "mt-1 text-sm text-slate-500 font-medium" }, toDisplayString(_ctx.$t("google_auth_message", "Akun ini terhubung menggunakan Google. Anda tidak memerlukan kata sandi untuk masuk ke aplikasi.")), 1)
                      ]),
                      createVNode("div", { class: "mt-6 flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-sm border border-indigo-100" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5 shrink-0",
                          viewBox: "0 0 24 24",
                          fill: "currentColor"
                        }, [
                          createVNode("path", { d: "M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z" })
                        ])),
                        createTextVNode(" Login via Google Aktif ")
                      ])
                    ])
                  ])),
                  createVNode("div", { class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg" }, [
                    createVNode(_sfc_main$3, { "midtrans-client-key": __props.midtrans_client_key }, null, 8, ["midtrans-client-key"])
                  ]),
                  createVNode("div", { class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg" }, [
                    createVNode(_sfc_main$4, { class: "max-w-xl" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
