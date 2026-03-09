import { ref, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./InputError-CjMsDEOH.js";
import { _ as _sfc_main$1 } from "./InputLabel-BgCYZe1F.js";
import { P as PrimaryButton } from "./PrimaryButton-4NJ7Yqx3.js";
import { _ as _sfc_main$2 } from "./TextInput-BNWZnSh4.js";
import { useForm } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "UpdatePasswordForm",
  __ssrInlineRender: true,
  setup(__props) {
    const passwordInput = ref(null);
    const currentPasswordInput = ref(null);
    const form = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-black text-slate-800 uppercase tracking-widest flex items-center gap-2"> 🔒 ${ssrInterpolate(_ctx.$t("password_security_title", "Keamanan Sandi"))}</h2><p class="mt-1 text-sm text-slate-500 font-medium">${ssrInterpolate(_ctx.$t("password_security_desc", "Pastikan akun Anda menggunakan kata sandi acak yang panjang agar tetap aman."))}</p></header><form class="mt-8 space-y-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "current_password",
        value: _ctx.$t("current_password", "Sandi Saat Ini"),
        class: "!text-[10px] !font-black !uppercase !tracking-widest !text-slate-400 mb-2"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "current_password",
        ref_key: "currentPasswordInput",
        ref: currentPasswordInput,
        modelValue: unref(form).current_password,
        "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
        type: "password",
        class: "mt-1 block w-full !rounded-xl !border-slate-200 focus:!border-indigo-500 focus:!ring-0 font-bold text-slate-700 h-12 px-4",
        autocomplete: "current-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form).errors.current_password,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "password",
        value: _ctx.$t("new_password", "Sandi Baru"),
        class: "!text-[10px] !font-black !uppercase !tracking-widest !text-slate-400 mb-2"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "password",
        ref_key: "passwordInput",
        ref: passwordInput,
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        type: "password",
        class: "mt-1 block w-full !rounded-xl !border-slate-200 focus:!border-indigo-500 focus:!ring-0 font-bold text-slate-700 h-12 px-4",
        autocomplete: "new-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form).errors.password,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "password_confirmation",
        value: _ctx.$t("confirm_new_password", "Konfirmasi Sandi Baru"),
        class: "!text-[10px] !font-black !uppercase !tracking-widest !text-slate-400 mb-2"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "password_confirmation",
        modelValue: unref(form).password_confirmation,
        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
        type: "password",
        class: "mt-1 block w-full !rounded-xl !border-slate-200 focus:!border-indigo-500 focus:!ring-0 font-bold text-slate-700 h-12 px-4",
        autocomplete: "new-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form).errors.password_confirmation,
        class: "mt-2"
      }, null, _parent));
      _push(`</div></div><div class="flex items-center gap-4 pt-4">`);
      _push(ssrRenderComponent(PrimaryButton, {
        disabled: unref(form).processing,
        class: "!rounded-xl !py-3.5 !px-8 !bg-slate-800 hover:!bg-slate-900 !shadow-lg !shadow-slate-200 !text-[11px] !font-black !uppercase !tracking-widest transition-all active:scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("update_password", "Perbarui Sandi"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("update_password", "Perbarui Sandi")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(form).recentlySuccessful) {
        _push(`<p class="text-[11px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> ${ssrInterpolate(_ctx.$t("password_updated", "Sandi Berubah"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdatePasswordForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
