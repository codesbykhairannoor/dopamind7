import { withCtx, unref, createVNode, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-DzhHOkcN.js";
import { _ as _sfc_main$4 } from "./InputError-CjMsDEOH.js";
import { _ as _sfc_main$2 } from "./InputLabel-BgCYZe1F.js";
import { _ as _sfc_main$3 } from "./TextInput-BNWZnSh4.js";
import { useForm, Head } from "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    email: { type: String, required: true },
    token: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("password.store"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: _ctx.$t("reset_page_title")
            }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden"${_scopeId}><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50/70 rounded-full blur-[100px] -z-10"${_scopeId}></div><div class="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10"${_scopeId}><div class="text-center mb-8"${_scopeId}><div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm"${_scopeId}> 🔑 </div><h2 class="text-2xl font-black text-indigo-950"${_scopeId}>${ssrInterpolate(_ctx.$t("reset_title"))}</h2><p class="text-gray-500 mt-2 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("reset_desc"))}</p></div><form class="space-y-5"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "email",
              value: _ctx.$t("reset_label_email"),
              class: "font-bold text-gray-700 ml-1 mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full rounded-xl bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed py-3",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              readonly: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password",
              value: _ctx.$t("reset_label_pass"),
              class: "font-bold text-gray-700 ml-1 mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autofocus: "",
              autocomplete: "new-password",
              placeholder: _ctx.$t("reset_placeholder_pass")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password_confirmation",
              value: _ctx.$t("reset_label_confirm"),
              class: "font-bold text-gray-700 ml-1 mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div><button class="w-full bg-indigo-950 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-900 transition transform hover:-translate-y-0.5 disabled:opacity-75"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.$t("reset_btn"))}</button></form></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: _ctx.$t("reset_page_title")
              }, null, 8, ["title"]),
              createVNode("div", { class: "min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden" }, [
                createVNode("div", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50/70 rounded-full blur-[100px] -z-10" }),
                createVNode("div", { class: "w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10" }, [
                  createVNode("div", { class: "text-center mb-8" }, [
                    createVNode("div", { class: "w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm" }, " 🔑 "),
                    createVNode("h2", { class: "text-2xl font-black text-indigo-950" }, toDisplayString(_ctx.$t("reset_title")), 1),
                    createVNode("p", { class: "text-gray-500 mt-2 text-sm" }, toDisplayString(_ctx.$t("reset_desc")), 1)
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-5"
                  }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, {
                        for: "email",
                        value: _ctx.$t("reset_label_email"),
                        class: "font-bold text-gray-700 ml-1 mb-1"
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$3, {
                        id: "email",
                        type: "email",
                        class: "mt-1 block w-full rounded-xl bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed py-3",
                        modelValue: unref(form).email,
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        required: "",
                        readonly: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.email
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, {
                        for: "password",
                        value: _ctx.$t("reset_label_pass"),
                        class: "font-bold text-gray-700 ml-1 mb-1"
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$3, {
                        id: "password",
                        type: "password",
                        class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: "",
                        autofocus: "",
                        autocomplete: "new-password",
                        placeholder: _ctx.$t("reset_placeholder_pass")
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.password
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, {
                        for: "password_confirmation",
                        value: _ctx.$t("reset_label_confirm"),
                        class: "font-bold text-gray-700 ml-1 mb-1"
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$3, {
                        id: "password_confirmation",
                        type: "password",
                        class: "mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3",
                        modelValue: unref(form).password_confirmation,
                        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                        required: "",
                        autocomplete: "new-password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        class: "mt-2",
                        message: unref(form).errors.password_confirmation
                      }, null, 8, ["message"])
                    ]),
                    createVNode("button", {
                      class: "w-full bg-indigo-950 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-900 transition transform hover:-translate-y-0.5 disabled:opacity-75",
                      disabled: unref(form).processing
                    }, toDisplayString(_ctx.$t("reset_btn")), 9, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
