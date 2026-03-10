import { unref, withCtx, createVNode, createBlock, createTextVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./InputError-CjMsDEOH.js";
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Reset Password" }, null, _parent));
      _push(`<div class="relative min-h-screen flex flex-col items-center justify-center bg-white selection:bg-indigo-100 selection:text-indigo-700 p-6 overflow-hidden"><div class="absolute top-0 w-full h-96 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-blue-50/50 blur-3xl -z-10 pointer-events-none"></div><div class="w-full max-w-[420px] flex flex-col relative z-10"><div class="flex justify-center mb-8">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 transition-transform duration-500 hover:rotate-[360deg]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="/favicon.svg?v=2" alt="OneForMind Logo" class="h-8 w-8 brightness-0 invert"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: "/favicon.svg?v=2",
                alt: "OneForMind Logo",
                class: "h-8 w-8 brightness-0 invert"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="text-center mb-8"><h1 class="text-2xl font-black text-slate-900 mb-2 tracking-tight">${ssrInterpolate(_ctx.$t("auth_reset_title", "Reset password"))}</h1><p class="text-sm font-medium text-slate-500 leading-relaxed px-4">${ssrInterpolate(_ctx.$t("auth_reset_desc", "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link."))}</p></div>`);
      if (__props.status) {
        _push(`<div class="mb-6 font-bold text-sm text-indigo-600 bg-indigo-50 p-4 rounded-xl border border-indigo-100/50 flex items-center justify-center gap-3 text-center"><span class="text-lg">📧</span> ${ssrInterpolate(__props.status)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-4"><div><input id="email" type="email"${ssrRenderAttr("value", unref(form).email)}${ssrRenderAttr("placeholder", _ctx.$t("auth_placeholder_email", "Work email"))} class="${ssrRenderClass([unref(form).errors.email ? "border-red-400 focus:ring-red-100 focus:border-red-500" : "focus:border-indigo-500 focus:ring-indigo-500/10", "w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 transition-all outline-none"])}" required autofocus>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mt-1.5 ml-1",
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="w-full mt-4 bg-indigo-600 text-white font-black py-3 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-75 flex items-center justify-center gap-2"><span>${ssrInterpolate(_ctx.$t("auth_btn_reset", "Send Recovery Link"))}</span>`);
      if (!unref(form).processing) {
        _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="text-center mt-6">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("login"),
        class: "text-sm font-bold text-slate-500 hover:text-indigo-600 transition inline-flex items-center justify-center gap-1.5 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> ${ssrInterpolate(_ctx.$t("auth_back_login", "Back to sign in"))}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 transform group-hover:-translate-x-1 transition-transform",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                })
              ])),
              createTextVNode(" " + toDisplayString(_ctx.$t("auth_back_login", "Back to sign in")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form><div class="mt-10 text-center font-medium"><a href="#" class="text-[11px] text-slate-500 hover:text-indigo-600 transition-colors">Need help?</a></div></div></div><!--]-->`);
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
