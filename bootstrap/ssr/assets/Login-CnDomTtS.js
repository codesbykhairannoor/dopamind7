import { ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderDynamicModel, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./InputError-CjMsDEOH.js";
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
    const showPassword = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent));
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
      _push(`</div><div class="text-center mb-8"><h1 class="text-2xl font-black text-slate-900 mb-1.5 tracking-tight">${ssrInterpolate(_ctx.$t("auth_login_title", "Welcome back!"))}</h1><p class="text-sm font-medium text-slate-500">${ssrInterpolate(_ctx.$t("auth_no_account", "Don't have an account?"))} `);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("register"),
        class: "text-indigo-600 hover:text-indigo-800 transition font-bold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("auth_link_register", "Sign up"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("auth_link_register", "Sign up")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div>`);
      if (__props.status) {
        _push(`<div class="mb-6 font-bold text-sm text-indigo-600 bg-indigo-50 p-4 rounded-xl border border-indigo-100/50 flex items-center gap-3"><span class="text-lg">✨</span> ${ssrInterpolate(__props.status)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="flex items-center justify-center w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm bg-white hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 mb-6 group active:scale-[0.98]"><svg class="w-5 h-5 mr-3" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg><span class="font-bold text-slate-700 text-sm">${ssrInterpolate(_ctx.$t("auth_btn_google_in", "Lanjutkan dengan Google"))}</span></button><div class="relative flex items-center justify-center mb-6"><div class="border-t border-slate-200 w-full"></div><span class="bg-white px-3 text-[10px] font-black uppercase text-slate-400 absolute tracking-wider">or</span></div><form class="space-y-4"><div><input id="email" type="email"${ssrRenderAttr("value", unref(form).email)}${ssrRenderAttr("placeholder", _ctx.$t("auth_placeholder_email", "Work email"))} class="${ssrRenderClass([unref(form).errors.email ? "border-red-400 focus:ring-red-100 focus:border-red-500" : "focus:border-indigo-500 focus:ring-indigo-500/10", "w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 transition-all outline-none"])}">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mt-1.5 ml-1",
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><div class="relative"><input id="password"${ssrRenderAttr("type", showPassword.value ? "text" : "password")}${ssrRenderDynamicModel(showPassword.value ? "text" : "password", unref(form).password, null)}${ssrRenderAttr("placeholder", _ctx.$t("auth_placeholder_pass", "Password"))} class="${ssrRenderClass([unref(form).errors.password ? "border-red-400 focus:ring-red-100 focus:border-red-500" : "focus:border-indigo-500 focus:ring-indigo-500/10", "w-full pl-4 pr-10 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 transition-all outline-none"])}"><button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none">`);
      if (!showPassword.value) {
        _push(`<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`);
      } else {
        _push(`<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mt-1.5 ml-1",
        message: unref(form).errors.password
      }, null, _parent));
      _push(`</div><div class="flex justify-end mt-1">`);
      if (__props.canResetPassword) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("password.request"),
          class: "text-[11px] font-black uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("auth_forgot_pass", "Forgot Password?"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("auth_forgot_pass", "Forgot Password?")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="w-full mt-2 bg-indigo-600 text-white font-black py-3 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-75 flex items-center justify-center gap-2"><span>${ssrInterpolate(_ctx.$t("auth_btn_login", "Sign in with Email"))}</span>`);
      if (!unref(form).processing) {
        _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></form><div class="mt-10 text-center font-medium"><p class="text-[11px] text-slate-500 leading-relaxed"> By continuing, you agree to our <a href="#" class="text-slate-700 font-bold hover:text-indigo-600 transition-colors">Terms of Service</a> and <a href="#" class="text-slate-700 font-bold hover:text-indigo-600 transition-colors">Privacy Policy</a>. <a href="#" class="text-slate-700 font-bold hover:text-indigo-600 transition-colors ml-1">Need help?</a></p></div></div></div><!--]-->`);
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
