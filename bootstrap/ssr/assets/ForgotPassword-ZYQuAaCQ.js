import { withCtx, unref, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-BW7DNuDy.js";
import { _ as _sfc_main$4 } from "./InputError-CjMsDEOH.js";
import { _ as _sfc_main$2 } from "./InputLabel-BgCYZe1F.js";
import { _ as _sfc_main$3 } from "./TextInput-BNWZnSh4.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: { type: String }
  },
  setup(__props) {
    const form = useForm({
      email: ""
    });
    const submit = () => {
      form.post(route("password.email"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Reset Password" }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden"${_scopeId}><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-50/70 rounded-full blur-[100px] -z-10"${_scopeId}></div><div class="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10 text-center"${_scopeId}><div class="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6"${_scopeId}> 🔐 </div><h2 class="text-2xl font-black text-indigo-950 mb-2"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_reset_title"))}</h2><p class="text-gray-500 text-sm mb-8 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("auth_reset_desc"))}</p>`);
            if (__props.status) {
              _push2(`<div class="mb-6 font-medium text-sm text-green-700 bg-green-50 p-4 rounded-xl border border-green-100"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="text-left space-y-5"${_scopeId}><div${_scopeId}>`);
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
              autofocus: "",
              placeholder: _ctx.$t("auth_placeholder_email")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><button class="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 disabled:opacity-75"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.$t("auth_btn_reset"))}</button><div class="text-center mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "text-sm text-gray-500 font-bold hover:text-gray-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("auth_back_login"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("auth_back_login")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Reset Password" }),
              createVNode("div", { class: "min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden" }, [
                createVNode("div", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-50/70 rounded-full blur-[100px] -z-10" }),
                createVNode("div", { class: "w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10 text-center" }, [
                  createVNode("div", { class: "w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6" }, " 🔐 "),
                  createVNode("h2", { class: "text-2xl font-black text-indigo-950 mb-2" }, toDisplayString(_ctx.$t("auth_reset_title")), 1),
                  createVNode("p", { class: "text-gray-500 text-sm mb-8 leading-relaxed" }, toDisplayString(_ctx.$t("auth_reset_desc")), 1),
                  __props.status ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-6 font-medium text-sm text-green-700 bg-green-50 p-4 rounded-xl border border-green-100"
                  }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "text-left space-y-5"
                  }, [
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
                        autofocus: "",
                        placeholder: _ctx.$t("auth_placeholder_email")
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.email
                      }, null, 8, ["message"])
                    ]),
                    createVNode("button", {
                      class: "w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 disabled:opacity-75",
                      disabled: unref(form).processing
                    }, toDisplayString(_ctx.$t("auth_btn_reset")), 9, ["disabled"]),
                    createVNode("div", { class: "text-center mt-6" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("login"),
                        class: "text-sm text-gray-500 font-bold hover:text-gray-900"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("auth_back_login")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
