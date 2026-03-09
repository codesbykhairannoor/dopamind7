import { withCtx, unref, createTextVNode, toDisplayString, createVNode, withModifiers, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-BW7DNuDy.js";
import { _ as _sfc_main$4 } from "./InputError-CjMsDEOH.js";
import { _ as _sfc_main$2 } from "./InputLabel-BgCYZe1F.js";
import { _ as _sfc_main$3 } from "./TextInput-BNWZnSh4.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      timezone: ""
    });
    const submit = () => {
      form.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    const loginWithGoogle = () => {
      window.location.href = "/auth/google";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Daftar Akun" }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden"${_scopeId}><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50/70 rounded-full blur-[100px] -z-10"${_scopeId}></div><div class="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10"${_scopeId}><div class="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm"${_scopeId}> 🚀 </div><div class="text-center mb-8"${_scopeId}><h2 class="text-3xl font-black text-indigo-950 tracking-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_register_title"))}</h2><p class="text-gray-500 mt-2 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_register_subtitle"))}</p></div><form class="space-y-5"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "name",
              value: _ctx.$t("auth_label_name"),
              class: "font-bold text-gray-700 ml-1 mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "name",
              type: "text",
              class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              autofocus: "",
              placeholder: _ctx.$t("auth_placeholder_name")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "email",
              value: _ctx.$t("auth_label_email"),
              class: "font-bold text-gray-700 ml-1 mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              placeholder: _ctx.$t("auth_placeholder_email")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password",
              value: _ctx.$t("auth_label_password"),
              class: "font-bold text-gray-700 ml-1 mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              placeholder: _ctx.$t("auth_placeholder_pass")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password_confirmation",
              value: _ctx.$t("auth_label_pass_confirm"),
              class: "font-bold text-gray-700 ml-1 mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div><button class="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 disabled:opacity-75"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.$t("auth_btn_register"))}</button></form><div class="relative my-6"${_scopeId}><div class="absolute inset-0 flex items-center"${_scopeId}><div class="w-full border-t border-gray-200"${_scopeId}></div></div><div class="relative flex justify-center text-xs uppercase font-bold text-gray-400"${_scopeId}><span class="px-2 bg-white"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_divider"))}</span></div></div><button type="button" class="flex items-center justify-center w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition group"${_scopeId}><svg class="w-5 h-5 mr-3" viewBox="0 0 24 24"${_scopeId}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"${_scopeId}></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"${_scopeId}></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"${_scopeId}></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"${_scopeId}></path></svg><span class="font-bold text-gray-700"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_btn_google_up"))}</span></button><div class="text-center mt-6 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_has_account"))} `);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "text-indigo-600 font-bold hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("auth_link_login"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("auth_link_login")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Daftar Akun" }),
              createVNode("div", { class: "min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden" }, [
                createVNode("div", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50/70 rounded-full blur-[100px] -z-10" }),
                createVNode("div", { class: "w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10" }, [
                  createVNode("div", { class: "w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm" }, " 🚀 "),
                  createVNode("div", { class: "text-center mb-8" }, [
                    createVNode("h2", { class: "text-3xl font-black text-indigo-950 tracking-tight" }, toDisplayString(_ctx.$t("auth_register_title")), 1),
                    createVNode("p", { class: "text-gray-500 mt-2 text-sm" }, toDisplayString(_ctx.$t("auth_register_subtitle")), 1)
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-5"
                  }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, {
                        for: "name",
                        value: _ctx.$t("auth_label_name"),
                        class: "font-bold text-gray-700 ml-1 mb-1"
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$3, {
                        id: "name",
                        type: "text",
                        class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        required: "",
                        autofocus: "",
                        placeholder: _ctx.$t("auth_placeholder_name")
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.name
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, {
                        for: "email",
                        value: _ctx.$t("auth_label_email"),
                        class: "font-bold text-gray-700 ml-1 mb-1"
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$3, {
                        id: "email",
                        type: "email",
                        class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
                        modelValue: unref(form).email,
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        required: "",
                        placeholder: _ctx.$t("auth_placeholder_email")
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.email
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, {
                        for: "password",
                        value: _ctx.$t("auth_label_password"),
                        class: "font-bold text-gray-700 ml-1 mb-1"
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$3, {
                        id: "password",
                        type: "password",
                        class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: "",
                        placeholder: _ctx.$t("auth_placeholder_pass")
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.password
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, {
                        for: "password_confirmation",
                        value: _ctx.$t("auth_label_pass_confirm"),
                        class: "font-bold text-gray-700 ml-1 mb-1"
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$3, {
                        id: "password_confirmation",
                        type: "password",
                        class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
                        modelValue: unref(form).password_confirmation,
                        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.password_confirmation
                      }, null, 8, ["message"])
                    ]),
                    createVNode("button", {
                      class: "w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 disabled:opacity-75",
                      disabled: unref(form).processing
                    }, toDisplayString(_ctx.$t("auth_btn_register")), 9, ["disabled"])
                  ], 32),
                  createVNode("div", { class: "relative my-6" }, [
                    createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                      createVNode("div", { class: "w-full border-t border-gray-200" })
                    ]),
                    createVNode("div", { class: "relative flex justify-center text-xs uppercase font-bold text-gray-400" }, [
                      createVNode("span", { class: "px-2 bg-white" }, toDisplayString(_ctx.$t("auth_divider")), 1)
                    ])
                  ]),
                  createVNode("button", {
                    type: "button",
                    onClick: loginWithGoogle,
                    class: "flex items-center justify-center w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition group"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 mr-3",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                        fill: "#4285F4"
                      }),
                      createVNode("path", {
                        d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                        fill: "#34A853"
                      }),
                      createVNode("path", {
                        d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z",
                        fill: "#FBBC05"
                      }),
                      createVNode("path", {
                        d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                        fill: "#EA4335"
                      })
                    ])),
                    createVNode("span", { class: "font-bold text-gray-700" }, toDisplayString(_ctx.$t("auth_btn_google_up")), 1)
                  ]),
                  createVNode("div", { class: "text-center mt-6 text-sm text-gray-500" }, [
                    createTextVNode(toDisplayString(_ctx.$t("auth_has_account")) + " ", 1),
                    createVNode(unref(Link), {
                      href: _ctx.route("login"),
                      class: "text-indigo-600 font-bold hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("auth_link_login")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
