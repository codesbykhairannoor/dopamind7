import { mergeProps, useSSRContext, ref, withCtx, createTextVNode, toDisplayString, unref, createVNode, withKeys, nextTick } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as _sfc_main$5 } from "./InputError-CjMsDEOH.js";
import { _ as _sfc_main$3 } from "./InputLabel-BgCYZe1F.js";
import { _ as _sfc_main$2 } from "./Modal-b6JySqy_.js";
import { _ as _sfc_main$6 } from "./SecondaryButton-BgIg9sGF.js";
import { _ as _sfc_main$4 } from "./TextInput-xTq3OG6l.js";
import { useForm } from "@inertiajs/vue3";
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</button>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DangerButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DangerButton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "DeleteUserForm",
  __ssrInlineRender: true,
  setup(__props) {
    const confirmingUserDeletion = ref(false);
    const passwordInput = ref(null);
    const form = useForm({
      password: ""
    });
    const confirmUserDeletion = () => {
      confirmingUserDeletion.value = true;
      nextTick(() => passwordInput.value.focus());
    };
    const deleteUser = () => {
      form.delete(route("profile.destroy"), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset()
      });
    };
    const closeModal = () => {
      confirmingUserDeletion.value = false;
      form.reset();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><header><h2 class="text-lg font-black text-rose-600 dark:text-rose-400 tracking-tight flex items-center gap-2 transition-colors duration-500"> ⚠️ ${ssrInterpolate(_ctx.$t("delete_account_title", "Hapus Akun"))}</h2><p class="mt-1 text-sm text-rose-500/80 dark:text-rose-400/80 font-medium transition-colors duration-500">${ssrInterpolate(_ctx.$t("delete_account_desc", "Setelah akun Anda dihapus, semua data dan sumber daya yang terkait akan dihapus secara permanen. Pastikan Anda telah mengunduh data apa pun yang ingin Anda simpan."))}</p></header>`);
      _push(ssrRenderComponent(DangerButton, {
        onClick: confirmUserDeletion,
        class: "!rounded-xl !py-3.5 !px-8 !bg-rose-500 hover:!bg-rose-600 !shadow-lg !shadow-rose-200 dark:!shadow-none !text-[11px] !font-black !tracking-wide transition-all active:scale-95 transition-colors duration-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("delete_account_btn", "Hapus Akun Permanen"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("delete_account_btn", "Hapus Akun Permanen")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        show: confirmingUserDeletion.value,
        onClose: closeModal,
        maxWidth: "md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-8 bg-white dark:bg-slate-900 rounded-[2rem] transition-colors duration-500"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-3xl mb-6 mx-auto transition-colors duration-500"${_scopeId}> 🚨 </div><h2 class="text-xl font-black text-slate-800 dark:text-slate-100 text-center mb-2 leading-tight transition-colors duration-500"${_scopeId}>${ssrInterpolate(_ctx.$t("delete_account_confirm_title", "Apakah Anda yakin ingin menghapus akun Anda?"))}</h2><p class="text-sm text-slate-500 dark:text-slate-400 text-center mb-6 font-medium transition-colors duration-500"${_scopeId}>${ssrInterpolate(_ctx.$t("delete_account_confirm_desc", "Tindakan ini tidak dapat dibatalkan. Masukkan sandi Anda untuk mengonfirmasi."))}</p><div class="mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "password",
              value: _ctx.$t("your_password", "Sandi Anda"),
              class: "sr-only"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "password",
              ref_key: "passwordInput",
              ref: passwordInput,
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-full !rounded-xl !border-slate-200 dark:!border-slate-800 focus:!border-rose-500 focus:!ring-0 font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 h-14 px-4 text-center transition-colors duration-500",
              placeholder: _ctx.$t("enter_password_placeholder", "Masukkan sandi..."),
              onKeyup: deleteUser
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.password,
              class: "mt-2 text-center"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-6 flex gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              onClick: closeModal,
              class: "flex-1 !py-3.5 !rounded-xl !border-2 !border-slate-200 dark:!border-slate-700 !text-slate-500 dark:!text-slate-400 hover:!bg-slate-50 dark:hover:!bg-slate-800 hover:!text-slate-700 dark:hover:!text-slate-200 justify-center !text-[11px] !font-black !tracking-wide transition-colors duration-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("cancel", "Batal"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("cancel", "Batal")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(DangerButton, {
              class: ["flex-1 justify-center !rounded-xl !py-3.5 !bg-rose-600 hover:!bg-rose-700 !text-[11px] !font-black !tracking-wide shadow-lg shadow-rose-200 dark:shadow-none transition-colors duration-500", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: deleteUser
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("yes_delete", "Ya, Hapus"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("yes_delete", "Ya, Hapus")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-8 bg-white dark:bg-slate-900 rounded-[2rem] transition-colors duration-500" }, [
                createVNode("div", { class: "w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-3xl mb-6 mx-auto transition-colors duration-500" }, " 🚨 "),
                createVNode("h2", { class: "text-xl font-black text-slate-800 dark:text-slate-100 text-center mb-2 leading-tight transition-colors duration-500" }, toDisplayString(_ctx.$t("delete_account_confirm_title", "Apakah Anda yakin ingin menghapus akun Anda?")), 1),
                createVNode("p", { class: "text-sm text-slate-500 dark:text-slate-400 text-center mb-6 font-medium transition-colors duration-500" }, toDisplayString(_ctx.$t("delete_account_confirm_desc", "Tindakan ini tidak dapat dibatalkan. Masukkan sandi Anda untuk mengonfirmasi.")), 1),
                createVNode("div", { class: "mt-6" }, [
                  createVNode(_sfc_main$3, {
                    for: "password",
                    value: _ctx.$t("your_password", "Sandi Anda"),
                    class: "sr-only"
                  }, null, 8, ["value"]),
                  createVNode(_sfc_main$4, {
                    id: "password",
                    ref_key: "passwordInput",
                    ref: passwordInput,
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-full !rounded-xl !border-slate-200 dark:!border-slate-800 focus:!border-rose-500 focus:!ring-0 font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 h-14 px-4 text-center transition-colors duration-500",
                    placeholder: _ctx.$t("enter_password_placeholder", "Masukkan sandi..."),
                    onKeyup: withKeys(deleteUser, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                  createVNode(_sfc_main$5, {
                    message: unref(form).errors.password,
                    class: "mt-2 text-center"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-6 flex gap-3" }, [
                  createVNode(_sfc_main$6, {
                    onClick: closeModal,
                    class: "flex-1 !py-3.5 !rounded-xl !border-2 !border-slate-200 dark:!border-slate-700 !text-slate-500 dark:!text-slate-400 hover:!bg-slate-50 dark:hover:!bg-slate-800 hover:!text-slate-700 dark:hover:!text-slate-200 justify-center !text-[11px] !font-black !tracking-wide transition-colors duration-500"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("cancel", "Batal")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(DangerButton, {
                    class: ["flex-1 justify-center !rounded-xl !py-3.5 !bg-rose-600 hover:!bg-rose-700 !text-[11px] !font-black !tracking-wide shadow-lg shadow-rose-200 dark:shadow-none transition-colors duration-500", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: deleteUser
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("yes_delete", "Ya, Hapus")), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/DeleteUserForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
