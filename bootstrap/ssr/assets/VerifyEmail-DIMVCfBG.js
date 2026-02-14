import { computed, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-BACFuTxy.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({});
    const submit = () => {
      form.post(route("verification.send"));
    };
    const verificationLinkSent = computed(() => props.status === "verification-link-sent");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Verifikasi Email" }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden"${_scopeId}><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50/70 rounded-full blur-[100px] -z-10"${_scopeId}></div><div class="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10 text-center"${_scopeId}><div class="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm"${_scopeId}> 📩 </div><h2 class="text-2xl font-black text-gray-900 mb-3"${_scopeId}>Cek Inbox Lo!</h2><p class="text-gray-500 text-sm leading-relaxed mb-6"${_scopeId}> Makasih udah daftar! Satu langkah lagi nih. <br${_scopeId}> Tolong klik link verifikasi yang baru aja kami kirim ke email lo biar akunnya aktif. </p>`);
            if (verificationLinkSent.value) {
              _push2(`<div class="mb-6 font-bold text-sm text-green-700 bg-green-50 p-4 rounded-xl border border-green-200"${_scopeId}> ✨ Link verifikasi baru udah dikirim. Cek inbox atau folder spam ya! </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-4"${_scopeId}><button class="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 disabled:opacity-75"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Kirim Ulang Verifikasi </button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "text-sm text-gray-400 font-bold hover:text-gray-900 transition underline decoration-gray-300 underline-offset-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log Out / Ganti Akun `);
                } else {
                  return [
                    createTextVNode(" Log Out / Ganti Akun ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Verifikasi Email" }),
              createVNode("div", { class: "min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden" }, [
                createVNode("div", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50/70 rounded-full blur-[100px] -z-10" }),
                createVNode("div", { class: "w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10 text-center" }, [
                  createVNode("div", { class: "w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm" }, " 📩 "),
                  createVNode("h2", { class: "text-2xl font-black text-gray-900 mb-3" }, "Cek Inbox Lo!"),
                  createVNode("p", { class: "text-gray-500 text-sm leading-relaxed mb-6" }, [
                    createTextVNode(" Makasih udah daftar! Satu langkah lagi nih. "),
                    createVNode("br"),
                    createTextVNode(" Tolong klik link verifikasi yang baru aja kami kirim ke email lo biar akunnya aktif. ")
                  ]),
                  verificationLinkSent.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-6 font-bold text-sm text-green-700 bg-green-50 p-4 rounded-xl border border-green-200"
                  }, " ✨ Link verifikasi baru udah dikirim. Cek inbox atau folder spam ya! ")) : createCommentVNode("", true),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("button", {
                      class: "w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 disabled:opacity-75",
                      disabled: unref(form).processing
                    }, " Kirim Ulang Verifikasi ", 8, ["disabled"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("logout"),
                      method: "post",
                      as: "button",
                      class: "text-sm text-gray-400 font-bold hover:text-gray-900 transition underline decoration-gray-300 underline-offset-4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Log Out / Ganti Akun ")
                      ]),
                      _: 1
                    }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
