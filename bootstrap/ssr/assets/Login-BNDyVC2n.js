import { computed, mergeProps, useSSRContext, withCtx, unref, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, withModifiers } from "vue";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./GuestLayout-bYjoOeSH.js";
import { _ as _sfc_main$5 } from "./InputError-CjMsDEOH.js";
import { _ as _sfc_main$3 } from "./InputLabel-BgCYZe1F.js";
import { _ as _sfc_main$4 } from "./TextInput-BNWZnSh4.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main$1 = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      required: true
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
        class: "rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: { type: Boolean },
    status: { type: String }
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false,
      timezone: ""
    });
    const submit = () => {
      form.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden"${_scopeId}><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/70 rounded-full blur-[100px] -z-10"${_scopeId}></div><div class="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10"${_scopeId}><div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm"${_scopeId}> 👋 </div><div class="text-center mb-8"${_scopeId}><h2 class="text-3xl font-black text-indigo-950 tracking-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_login_title"))}</h2><p class="text-gray-500 mt-2 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_login_subtitle"))}</p></div>`);
            if (__props.status) {
              _push2(`<div class="mb-6 font-medium text-sm text-green-700 bg-green-50 p-4 rounded-xl border border-green-100 text-center"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-5"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "email",
              value: _ctx.$t("auth_label_email"),
              class: "font-bold text-gray-700 ml-1 mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              placeholder: _ctx.$t("auth_placeholder_email")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><div class="flex justify-between items-center mb-1 ml-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "password",
              value: _ctx.$t("auth_label_password"),
              class: "font-bold text-gray-700"
            }, null, _parent2, _scopeId));
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "text-xs text-indigo-600 hover:text-indigo-800 font-bold"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("auth_forgot_pass"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("auth_forgot_pass")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="block"${_scopeId}><label class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "remember",
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event,
              class: "text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            }, null, _parent2, _scopeId));
            _push2(`<span class="ms-2 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_remember"))}</span></label></div><button class="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 disabled:opacity-75"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.$t("auth_btn_login"))}</button><div class="relative my-6"${_scopeId}><div class="absolute inset-0 flex items-center"${_scopeId}><div class="w-full border-t border-gray-200"${_scopeId}></div></div><div class="relative flex justify-center text-xs uppercase font-bold text-gray-400"${_scopeId}><span class="px-2 bg-white"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_divider"))}</span></div></div><a href="/auth/google" class="flex items-center justify-center w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition group"${_scopeId}><svg class="w-5 h-5 mr-3" viewBox="0 0 24 24"${_scopeId}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"${_scopeId}></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"${_scopeId}></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"${_scopeId}></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"${_scopeId}></path></svg><span class="font-bold text-gray-700"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_btn_google_in"))}</span></a><div class="text-center mt-6 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_no_account"))} `);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "text-indigo-600 font-bold hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("auth_link_register"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("auth_link_register")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Log in" }),
              createVNode("div", { class: "min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden" }, [
                createVNode("div", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/70 rounded-full blur-[100px] -z-10" }),
                createVNode("div", { class: "w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10" }, [
                  createVNode("div", { class: "w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm" }, " 👋 "),
                  createVNode("div", { class: "text-center mb-8" }, [
                    createVNode("h2", { class: "text-3xl font-black text-indigo-950 tracking-tight" }, toDisplayString(_ctx.$t("auth_login_title")), 1),
                    createVNode("p", { class: "text-gray-500 mt-2 text-sm" }, toDisplayString(_ctx.$t("auth_login_subtitle")), 1)
                  ]),
                  __props.status ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-6 font-medium text-sm text-green-700 bg-green-50 p-4 rounded-xl border border-green-100 text-center"
                  }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-5"
                  }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$3, {
                        for: "email",
                        value: _ctx.$t("auth_label_email"),
                        class: "font-bold text-gray-700 ml-1 mb-1"
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$4, {
                        id: "email",
                        type: "email",
                        class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
                        modelValue: unref(form).email,
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        required: "",
                        autofocus: "",
                        placeholder: _ctx.$t("auth_placeholder_email")
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.email
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "flex justify-between items-center mb-1 ml-1" }, [
                        createVNode(_sfc_main$3, {
                          for: "password",
                          value: _ctx.$t("auth_label_password"),
                          class: "font-bold text-gray-700"
                        }, null, 8, ["value"]),
                        __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: _ctx.route("password.request"),
                          class: "text-xs text-indigo-600 hover:text-indigo-800 font-bold"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("auth_forgot_pass")), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ]),
                      createVNode(_sfc_main$4, {
                        id: "password",
                        type: "password",
                        class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.password
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "block" }, [
                      createVNode("label", { class: "flex items-center" }, [
                        createVNode(_sfc_main$1, {
                          name: "remember",
                          checked: unref(form).remember,
                          "onUpdate:checked": ($event) => unref(form).remember = $event,
                          class: "text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode("span", { class: "ms-2 text-sm text-gray-600" }, toDisplayString(_ctx.$t("auth_remember")), 1)
                      ])
                    ]),
                    createVNode("button", {
                      class: "w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 disabled:opacity-75",
                      disabled: unref(form).processing
                    }, toDisplayString(_ctx.$t("auth_btn_login")), 9, ["disabled"]),
                    createVNode("div", { class: "relative my-6" }, [
                      createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                        createVNode("div", { class: "w-full border-t border-gray-200" })
                      ]),
                      createVNode("div", { class: "relative flex justify-center text-xs uppercase font-bold text-gray-400" }, [
                        createVNode("span", { class: "px-2 bg-white" }, toDisplayString(_ctx.$t("auth_divider")), 1)
                      ])
                    ]),
                    createVNode("a", {
                      href: "/auth/google",
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
                      createVNode("span", { class: "font-bold text-gray-700" }, toDisplayString(_ctx.$t("auth_btn_google_in")), 1)
                    ]),
                    createVNode("div", { class: "text-center mt-6 text-sm text-gray-500" }, [
                      createTextVNode(toDisplayString(_ctx.$t("auth_no_account")) + " ", 1),
                      createVNode(unref(Link), {
                        href: _ctx.route("register"),
                        class: "text-indigo-600 font-bold hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("auth_link_register")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
