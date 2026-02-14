import { ref, computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, withDirectives, vShow, createCommentVNode, withModifiers, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./GuestLayout-BACFuTxy.js";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "Welcome",
  __ssrInlineRender: true,
  props: { canRegister: Boolean },
  setup(__props) {
    const activeFaq = ref(null);
    const toggleFaq = (index) => {
      activeFaq.value = activeFaq.value === index ? null : index;
    };
    const form = useForm({
      email: ""
    });
    const successMessage = computed(() => {
      var _a;
      return (_a = usePage().props.flash) == null ? void 0 : _a.success;
    });
    const submitWaitlist = () => {
      form.post(route("waitlist.store"), {
        preserveScroll: true,
        onSuccess: () => form.reset()
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Monthly Life Operating System" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header class="pt-32 pb-24 px-6 text-center relative overflow-hidden"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/80 to-white rounded-full blur-[100px] -z-10 animate-pulse duration-[5000ms]"${_scopeId}></div><div class="max-w-5xl mx-auto"${_scopeId}><div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-600 font-bold text-xs mb-8 uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700"${_scopeId}>${ssrInterpolate(_ctx.$t("hero_badge"))}</div><h1 class="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight text-gray-900 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both"${_scopeId}>${ssrInterpolate(_ctx.$t("hero_title_1"))}<br${_scopeId}><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"${_scopeId}>${ssrInterpolate(_ctx.$t("hero_title_2"))}</span></h1><p class="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-3xl mx-auto font-light animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both"${_scopeId}>${ssrInterpolate(_ctx.$t("hero_desc"))}</p><div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both"${_scopeId}>`);
            if (!_ctx.$page.props.auth.user) {
              _push2(`<div class="flex flex-col sm:flex-row justify-center gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("register"),
                class: "bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("hero_cta_primary"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("hero_cta_primary")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("about"),
                class: "bg-white text-gray-700 border border-gray-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("hero_cta_secondary"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("hero_cta_secondary")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("dashboard"),
                class: "inline-block bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-xl transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("nav_dashboard"))} → `);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("nav_dashboard")) + " → ", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div></div></header><section class="py-24 bg-gray-50 border-y border-gray-200"${_scopeId}><div class="max-w-7xl mx-auto px-6"${_scopeId}><div class="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both"${_scopeId}><h2 class="text-indigo-600 font-bold tracking-widest uppercase mb-4 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_badge"))}</h2><h3 class="text-4xl md:text-5xl font-black text-gray-900 mb-6"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_title"))}</h3><p class="text-xl text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_desc"))}</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"${_scopeId}><div class="col-span-1 sm:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both"${_scopeId}><div class="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-green-100 transition"${_scopeId}></div><div class="relative z-10"${_scopeId}><div class="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6"${_scopeId}>🌱</div><h4 class="text-xl font-bold mb-2 text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_habit_title"))}</h4><p class="text-gray-500 text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_habit_desc"))}</p></div></div><div class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both"${_scopeId}><div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6"${_scopeId}>💸</div><h4 class="text-xl font-bold mb-2 text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_finance_title"))}</h4><p class="text-gray-500 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_finance_desc"))}</p></div><div class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both"${_scopeId}><div class="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6"${_scopeId}>📝</div><h4 class="text-xl font-bold mb-2 text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_daily_title"))}</h4><p class="text-gray-500 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_daily_desc"))}</p></div><div class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 fill-mode-both"${_scopeId}><div class="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6"${_scopeId}>🎯</div><h4 class="text-xl font-bold mb-2 text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_goal_title"))}</h4><p class="text-gray-500 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_goal_desc"))}</p></div><div class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both"${_scopeId}><div class="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center text-3xl mb-6"${_scopeId}>📔</div><h4 class="text-xl font-bold mb-2 text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_journal_title"))}</h4><p class="text-gray-500 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_journal_desc"))}</p></div><div class="col-span-1 sm:col-span-2 bg-indigo-950 text-white p-8 rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-600 fill-mode-both"${_scopeId}><div class="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[80px] opacity-40"${_scopeId}></div><div class="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center"${_scopeId}><div class="flex-1"${_scopeId}><div class="flex gap-4 mb-4"${_scopeId}><span class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl"${_scopeId}>💼</span><span class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl"${_scopeId}>🎨</span></div><h4 class="text-xl font-bold mb-2"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_job_title"))}</h4><p class="text-indigo-200 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_job_desc"))}</p></div><div class="bg-white/10 px-4 py-2 rounded-lg text-xs font-bold text-indigo-200 border border-white/10"${_scopeId}>${ssrInterpolate(_ctx.$t("eco_coming_soon"))}</div></div></div></div></div></section><section class="py-24 bg-white overflow-hidden"${_scopeId}><div class="max-w-6xl mx-auto px-6 space-y-32"${_scopeId}><div class="grid md:grid-cols-2 gap-16 items-center"${_scopeId}><div class="animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both"${_scopeId}><div class="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6"${_scopeId}>📉</div><h2 class="text-4xl font-black mb-6 text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("prob_1_title"))}</h2><p class="text-gray-500 text-lg leading-relaxed mb-6"${_scopeId}>${ssrInterpolate(_ctx.$t("prob_1_desc"))}</p><ul class="space-y-3 text-gray-600 font-medium"${_scopeId}><li class="flex items-center gap-3"${_scopeId}><span class="text-red-500"${_scopeId}>✕</span> ${ssrInterpolate(_ctx.$t("prob_1_point_1"))}</li><li class="flex items-center gap-3"${_scopeId}><span class="text-red-500"${_scopeId}>✕</span> ${ssrInterpolate(_ctx.$t("prob_1_point_2"))}</li></ul></div><div class="relative h-[400px] bg-gray-50 rounded-[3rem] border border-gray-100 p-8 flex items-center justify-center overflow-hidden animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both"${_scopeId}><div class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"${_scopeId}></div><div class="bg-white p-4 rounded-xl shadow-lg border border-red-100 absolute top-20 left-10 transform -rotate-6 w-48 animate-pulse"${_scopeId}><div class="h-2 bg-red-200 w-1/2 rounded mb-2"${_scopeId}></div><div class="text-xs text-red-500 font-bold"${_scopeId}>⚠️ Overdue 12 days</div></div><div class="bg-white p-4 rounded-xl shadow-lg border border-gray-100 absolute bottom-20 right-10 transform rotate-3 w-56"${_scopeId}><div class="h-2 bg-gray-200 w-3/4 rounded mb-2"${_scopeId}></div><div class="text-xs text-gray-500"${_scopeId}>Task from 2024...</div></div></div></div><div class="grid md:grid-cols-2 gap-16 items-center"${_scopeId}><div class="order-2 md:order-1 relative h-[400px] bg-indigo-900 rounded-[3rem] p-8 flex items-center justify-center overflow-hidden animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both"${_scopeId}><div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-40"${_scopeId}></div><div class="grid grid-cols-2 gap-4 w-64"${_scopeId}><div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center"${_scopeId}><div class="text-2xl mb-2"${_scopeId}>💰</div><div class="text-xs text-white/70"${_scopeId}>Excel</div></div><div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center"${_scopeId}><div class="text-2xl mb-2"${_scopeId}>✅</div><div class="text-xs text-white/70"${_scopeId}>Todo</div></div><div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center col-span-2"${_scopeId}><div class="text-2xl mb-2"${_scopeId}>🤯</div><div class="text-xs text-white/70"${_scopeId}>Chaos</div></div></div></div><div class="order-1 md:order-2 animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both"${_scopeId}><div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6"${_scopeId}>🧩</div><h2 class="text-4xl font-black mb-6 text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("prob_2_title"))}</h2><p class="text-gray-500 text-lg leading-relaxed mb-6"${_scopeId}>${ssrInterpolate(_ctx.$t("prob_2_desc"))}</p><p class="text-indigo-600 font-bold text-lg"${_scopeId}>${ssrInterpolate(_ctx.$t("prob_2_solution"))}</p></div></div></div></section><section class="py-32 bg-gray-50 border-y border-gray-200"${_scopeId}><div class="max-w-7xl mx-auto px-6"${_scopeId}><div class="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"${_scopeId}><h2 class="text-indigo-600 font-bold tracking-widest uppercase mb-4 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("sol_badge"))}</h2><h3 class="text-4xl font-black mb-6 text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("sol_title"))}</h3></div><div class="grid md:grid-cols-3 gap-8"${_scopeId}><div class="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both"${_scopeId}><div class="w-16 h-16 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center text-3xl mb-8"${_scopeId}>🌱</div><h4 class="text-2xl font-bold mb-4 text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("sol_card_1_title"))}</h4><p class="text-gray-500 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("sol_card_1_desc"))}</p></div><div class="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both"${_scopeId}><div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-3xl mb-8"${_scopeId}>💸</div><h4 class="text-2xl font-bold mb-4 text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("sol_card_2_title"))}</h4><p class="text-gray-500 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("sol_card_2_desc"))}</p></div><div class="bg-indigo-600 p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-200 text-white relative overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both"${_scopeId}><div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition"${_scopeId}></div><div class="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-3xl mb-8"${_scopeId}>🔄</div><h4 class="text-2xl font-bold mb-4"${_scopeId}>${ssrInterpolate(_ctx.$t("sol_card_3_title"))}</h4><p class="text-indigo-100 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("sol_card_3_desc"))}</p></div></div></div></section><section class="py-24 bg-white"${_scopeId}><div class="max-w-3xl mx-auto px-6"${_scopeId}><h2 class="text-3xl font-black text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"${_scopeId}>${ssrInterpolate(_ctx.$t("faq_title"))}</h2><div class="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both"${_scopeId}><!--[-->`);
            ssrRenderList([1, 2, 3], (faq, index) => {
              _push2(`<div class="${ssrRenderClass([activeFaq.value === faq ? "bg-gray-50 shadow-md" : "bg-white", "border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"])}"${_scopeId}><button class="flex justify-between items-center w-full p-6 text-left font-bold text-gray-900 hover:text-indigo-600 transition"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t(`faq_q${faq}`))}</span><span class="${ssrRenderClass([activeFaq.value === faq ? "rotate-180" : "", "text-indigo-600 transition-transform"])}"${_scopeId}>▼</span></button><div class="px-6 pb-6 text-gray-500 leading-relaxed animate-in slide-in-from-top-2 duration-200" style="${ssrRenderStyle(activeFaq.value === faq ? null : { display: "none" })}"${_scopeId}>${ssrInterpolate(_ctx.$t(`faq_a${faq}`))}</div></div>`);
            });
            _push2(`<!--]--></div></div></section><section class="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden"${_scopeId}><div class="max-w-7xl mx-auto px-6"${_scopeId}><div class="relative bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-indigo-100 border border-indigo-50 overflow-hidden flex flex-col md:flex-row items-center gap-12"${_scopeId}><div class="absolute -right-20 -top-20 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-60"${_scopeId}></div><div class="w-full md:w-1/2 relative flex justify-center"${_scopeId}><div class="relative w-64 h-[500px] bg-slate-900 rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden transform md:-rotate-6 hover:rotate-0 transition-transform duration-500"${_scopeId}><div class="absolute top-0 w-full h-6 bg-slate-800 flex justify-center items-center"${_scopeId}><div class="w-16 h-4 bg-slate-900 rounded-full"${_scopeId}></div></div><div class="p-4 mt-8 space-y-4"${_scopeId}><div class="h-32 bg-indigo-600/20 rounded-2xl animate-pulse"${_scopeId}></div><div class="space-y-2"${_scopeId}><div class="h-4 w-3/4 bg-slate-700 rounded-full"${_scopeId}></div><div class="h-4 w-1/2 bg-slate-700 rounded-full"${_scopeId}></div></div><div class="grid grid-cols-2 gap-2 mt-8"${_scopeId}><div class="h-20 bg-emerald-500/20 rounded-xl"${_scopeId}></div><div class="h-20 bg-blue-500/20 rounded-xl"${_scopeId}></div></div></div><div class="absolute bottom-8 w-full px-6"${_scopeId}><div class="h-12 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/50 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-widest"${_scopeId}>OneForMind App</div></div></div><div class="absolute top-10 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-indigo-50 animate-bounce"${_scopeId}><span class="text-2xl"${_scopeId}>📱</span></div></div><div class="w-full md:w-1/2 text-center md:text-left relative z-10"${_scopeId}><span class="inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6"${_scopeId}> Coming Soon </span><h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("waitlist_title"))}</h2><p class="text-gray-500 text-lg mb-10 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("waitlist_desc"))}</p><form class="flex flex-col sm:flex-row gap-3"${_scopeId}><div class="flex-1"${_scopeId}><input${ssrRenderAttr("value", unref(form).email)} type="email"${ssrRenderAttr("placeholder", _ctx.$t("waitlist_input_placeholder"))} class="${ssrRenderClass([{ "border-red-500 bg-red-50": unref(form).errors.email }, "w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-medium transition-all"])}" required${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(`<div class="text-red-500 text-xs mt-1 ml-2 font-bold text-left"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Sending..." : _ctx.$t("waitlist_btn"))}</button></form>`);
            if (successMessage.value) {
              _push2(`<div class="mt-4 p-4 bg-green-50 border border-green-100 text-green-700 rounded-2xl font-bold text-sm animate-in fade-in slide-in-from-bottom-2"${_scopeId}> ✅ ${ssrInterpolate(successMessage.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-4 text-xs text-gray-500 font-medium"${_scopeId}>${ssrInterpolate(_ctx.$t("waitlist_note"))}</p></div></div></div></section><section class="py-24 px-6 text-center"${_scopeId}><div class="max-w-5xl mx-auto bg-indigo-950 rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-1000 delay-200 fill-mode-both"${_scopeId}><div class="absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse duration-[4000ms]"${_scopeId}></div><div class="absolute bottom-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse duration-[4000ms]"${_scopeId}></div><div class="relative z-10"${_scopeId}><h2 class="text-4xl md:text-6xl font-black mb-8 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("cta_final_title"))}</h2><p class="text-indigo-200 text-xl mb-12 max-w-2xl mx-auto"${_scopeId}>${ssrInterpolate(_ctx.$t("cta_final_desc"))}</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "inline-block bg-white text-indigo-950 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("cta_final_btn"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("cta_final_btn")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p class="mt-8 text-sm text-indigo-300 font-medium"${_scopeId}>${ssrInterpolate(_ctx.$t("cta_final_sub"))}</p></div></div></section>`);
          } else {
            return [
              createVNode("header", { class: "pt-32 pb-24 px-6 text-center relative overflow-hidden" }, [
                createVNode("div", { class: "absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/80 to-white rounded-full blur-[100px] -z-10 animate-pulse duration-[5000ms]" }),
                createVNode("div", { class: "max-w-5xl mx-auto" }, [
                  createVNode("div", { class: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-600 font-bold text-xs mb-8 uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700" }, toDisplayString(_ctx.$t("hero_badge")), 1),
                  createVNode("h1", { class: "text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight text-gray-900 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both" }, [
                    createTextVNode(toDisplayString(_ctx.$t("hero_title_1")), 1),
                    createVNode("br"),
                    createVNode("span", { class: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600" }, toDisplayString(_ctx.$t("hero_title_2")), 1)
                  ]),
                  createVNode("p", { class: "text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-3xl mx-auto font-light animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both" }, toDisplayString(_ctx.$t("hero_desc")), 1),
                  createVNode("div", { class: "animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both" }, [
                    !_ctx.$page.props.auth.user ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col sm:flex-row justify-center gap-4"
                    }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("register"),
                        class: "bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("hero_cta_primary")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("about"),
                        class: "bg-white text-gray-700 border border-gray-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("hero_cta_secondary")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("dashboard"),
                        class: "inline-block bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-xl transition"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("nav_dashboard")) + " → ", 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]))
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-gray-50 border-y border-gray-200" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both" }, [
                    createVNode("h2", { class: "text-indigo-600 font-bold tracking-widest uppercase mb-4 text-sm" }, toDisplayString(_ctx.$t("eco_badge")), 1),
                    createVNode("h3", { class: "text-4xl md:text-5xl font-black text-gray-900 mb-6" }, toDisplayString(_ctx.$t("eco_title")), 1),
                    createVNode("p", { class: "text-xl text-gray-500" }, toDisplayString(_ctx.$t("eco_desc")), 1)
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" }, [
                    createVNode("div", { class: "col-span-1 sm:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both" }, [
                      createVNode("div", { class: "absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-green-100 transition" }),
                      createVNode("div", { class: "relative z-10" }, [
                        createVNode("div", { class: "w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6" }, "🌱"),
                        createVNode("h4", { class: "text-xl font-bold mb-2 text-gray-900" }, toDisplayString(_ctx.$t("eco_habit_title")), 1),
                        createVNode("p", { class: "text-gray-500 text-sm leading-relaxed" }, toDisplayString(_ctx.$t("eco_habit_desc")), 1)
                      ])
                    ]),
                    createVNode("div", { class: "bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both" }, [
                      createVNode("div", { class: "w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6" }, "💸"),
                      createVNode("h4", { class: "text-xl font-bold mb-2 text-gray-900" }, toDisplayString(_ctx.$t("eco_finance_title")), 1),
                      createVNode("p", { class: "text-gray-500 text-sm" }, toDisplayString(_ctx.$t("eco_finance_desc")), 1)
                    ]),
                    createVNode("div", { class: "bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both" }, [
                      createVNode("div", { class: "w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6" }, "📝"),
                      createVNode("h4", { class: "text-xl font-bold mb-2 text-gray-900" }, toDisplayString(_ctx.$t("eco_daily_title")), 1),
                      createVNode("p", { class: "text-gray-500 text-sm" }, toDisplayString(_ctx.$t("eco_daily_desc")), 1)
                    ]),
                    createVNode("div", { class: "bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 fill-mode-both" }, [
                      createVNode("div", { class: "w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6" }, "🎯"),
                      createVNode("h4", { class: "text-xl font-bold mb-2 text-gray-900" }, toDisplayString(_ctx.$t("eco_goal_title")), 1),
                      createVNode("p", { class: "text-gray-500 text-sm" }, toDisplayString(_ctx.$t("eco_goal_desc")), 1)
                    ]),
                    createVNode("div", { class: "bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both" }, [
                      createVNode("div", { class: "w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center text-3xl mb-6" }, "📔"),
                      createVNode("h4", { class: "text-xl font-bold mb-2 text-gray-900" }, toDisplayString(_ctx.$t("eco_journal_title")), 1),
                      createVNode("p", { class: "text-gray-500 text-sm" }, toDisplayString(_ctx.$t("eco_journal_desc")), 1)
                    ]),
                    createVNode("div", { class: "col-span-1 sm:col-span-2 bg-indigo-950 text-white p-8 rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-600 fill-mode-both" }, [
                      createVNode("div", { class: "absolute bottom-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[80px] opacity-40" }),
                      createVNode("div", { class: "relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center" }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("div", { class: "flex gap-4 mb-4" }, [
                            createVNode("span", { class: "w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl" }, "💼"),
                            createVNode("span", { class: "w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl" }, "🎨")
                          ]),
                          createVNode("h4", { class: "text-xl font-bold mb-2" }, toDisplayString(_ctx.$t("eco_job_title")), 1),
                          createVNode("p", { class: "text-indigo-200 text-sm" }, toDisplayString(_ctx.$t("eco_job_desc")), 1)
                        ]),
                        createVNode("div", { class: "bg-white/10 px-4 py-2 rounded-lg text-xs font-bold text-indigo-200 border border-white/10" }, toDisplayString(_ctx.$t("eco_coming_soon")), 1)
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-white overflow-hidden" }, [
                createVNode("div", { class: "max-w-6xl mx-auto px-6 space-y-32" }, [
                  createVNode("div", { class: "grid md:grid-cols-2 gap-16 items-center" }, [
                    createVNode("div", { class: "animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both" }, [
                      createVNode("div", { class: "w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6" }, "📉"),
                      createVNode("h2", { class: "text-4xl font-black mb-6 text-gray-900" }, toDisplayString(_ctx.$t("prob_1_title")), 1),
                      createVNode("p", { class: "text-gray-500 text-lg leading-relaxed mb-6" }, toDisplayString(_ctx.$t("prob_1_desc")), 1),
                      createVNode("ul", { class: "space-y-3 text-gray-600 font-medium" }, [
                        createVNode("li", { class: "flex items-center gap-3" }, [
                          createVNode("span", { class: "text-red-500" }, "✕"),
                          createTextVNode(" " + toDisplayString(_ctx.$t("prob_1_point_1")), 1)
                        ]),
                        createVNode("li", { class: "flex items-center gap-3" }, [
                          createVNode("span", { class: "text-red-500" }, "✕"),
                          createTextVNode(" " + toDisplayString(_ctx.$t("prob_1_point_2")), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "relative h-[400px] bg-gray-50 rounded-[3rem] border border-gray-100 p-8 flex items-center justify-center overflow-hidden animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both" }, [
                      createVNode("div", { class: "absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" }),
                      createVNode("div", { class: "bg-white p-4 rounded-xl shadow-lg border border-red-100 absolute top-20 left-10 transform -rotate-6 w-48 animate-pulse" }, [
                        createVNode("div", { class: "h-2 bg-red-200 w-1/2 rounded mb-2" }),
                        createVNode("div", { class: "text-xs text-red-500 font-bold" }, "⚠️ Overdue 12 days")
                      ]),
                      createVNode("div", { class: "bg-white p-4 rounded-xl shadow-lg border border-gray-100 absolute bottom-20 right-10 transform rotate-3 w-56" }, [
                        createVNode("div", { class: "h-2 bg-gray-200 w-3/4 rounded mb-2" }),
                        createVNode("div", { class: "text-xs text-gray-500" }, "Task from 2024...")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-2 gap-16 items-center" }, [
                    createVNode("div", { class: "order-2 md:order-1 relative h-[400px] bg-indigo-900 rounded-[3rem] p-8 flex items-center justify-center overflow-hidden animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both" }, [
                      createVNode("div", { class: "absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-40" }),
                      createVNode("div", { class: "grid grid-cols-2 gap-4 w-64" }, [
                        createVNode("div", { class: "bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center" }, [
                          createVNode("div", { class: "text-2xl mb-2" }, "💰"),
                          createVNode("div", { class: "text-xs text-white/70" }, "Excel")
                        ]),
                        createVNode("div", { class: "bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center" }, [
                          createVNode("div", { class: "text-2xl mb-2" }, "✅"),
                          createVNode("div", { class: "text-xs text-white/70" }, "Todo")
                        ]),
                        createVNode("div", { class: "bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center col-span-2" }, [
                          createVNode("div", { class: "text-2xl mb-2" }, "🤯"),
                          createVNode("div", { class: "text-xs text-white/70" }, "Chaos")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "order-1 md:order-2 animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both" }, [
                      createVNode("div", { class: "w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6" }, "🧩"),
                      createVNode("h2", { class: "text-4xl font-black mb-6 text-gray-900" }, toDisplayString(_ctx.$t("prob_2_title")), 1),
                      createVNode("p", { class: "text-gray-500 text-lg leading-relaxed mb-6" }, toDisplayString(_ctx.$t("prob_2_desc")), 1),
                      createVNode("p", { class: "text-indigo-600 font-bold text-lg" }, toDisplayString(_ctx.$t("prob_2_solution")), 1)
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-32 bg-gray-50 border-y border-gray-200" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" }, [
                    createVNode("h2", { class: "text-indigo-600 font-bold tracking-widest uppercase mb-4 text-sm" }, toDisplayString(_ctx.$t("sol_badge")), 1),
                    createVNode("h3", { class: "text-4xl font-black mb-6 text-gray-900" }, toDisplayString(_ctx.$t("sol_title")), 1)
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-3 gap-8" }, [
                    createVNode("div", { class: "bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both" }, [
                      createVNode("div", { class: "w-16 h-16 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center text-3xl mb-8" }, "🌱"),
                      createVNode("h4", { class: "text-2xl font-bold mb-4 text-gray-900" }, toDisplayString(_ctx.$t("sol_card_1_title")), 1),
                      createVNode("p", { class: "text-gray-500 leading-relaxed" }, toDisplayString(_ctx.$t("sol_card_1_desc")), 1)
                    ]),
                    createVNode("div", { class: "bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both" }, [
                      createVNode("div", { class: "w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-3xl mb-8" }, "💸"),
                      createVNode("h4", { class: "text-2xl font-bold mb-4 text-gray-900" }, toDisplayString(_ctx.$t("sol_card_2_title")), 1),
                      createVNode("p", { class: "text-gray-500 leading-relaxed" }, toDisplayString(_ctx.$t("sol_card_2_desc")), 1)
                    ]),
                    createVNode("div", { class: "bg-indigo-600 p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-200 text-white relative overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both" }, [
                      createVNode("div", { class: "absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition" }),
                      createVNode("div", { class: "w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-3xl mb-8" }, "🔄"),
                      createVNode("h4", { class: "text-2xl font-bold mb-4" }, toDisplayString(_ctx.$t("sol_card_3_title")), 1),
                      createVNode("p", { class: "text-indigo-100 leading-relaxed" }, toDisplayString(_ctx.$t("sol_card_3_desc")), 1)
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-white" }, [
                createVNode("div", { class: "max-w-3xl mx-auto px-6" }, [
                  createVNode("h2", { class: "text-3xl font-black text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" }, toDisplayString(_ctx.$t("faq_title")), 1),
                  createVNode("div", { class: "space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both" }, [
                    (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3], (faq, index) => {
                      return createVNode("div", {
                        key: index,
                        class: ["border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300", activeFaq.value === faq ? "bg-gray-50 shadow-md" : "bg-white"]
                      }, [
                        createVNode("button", {
                          onClick: ($event) => toggleFaq(faq),
                          class: "flex justify-between items-center w-full p-6 text-left font-bold text-gray-900 hover:text-indigo-600 transition"
                        }, [
                          createVNode("span", null, toDisplayString(_ctx.$t(`faq_q${faq}`)), 1),
                          createVNode("span", {
                            class: ["text-indigo-600 transition-transform", activeFaq.value === faq ? "rotate-180" : ""]
                          }, "▼", 2)
                        ], 8, ["onClick"]),
                        withDirectives(createVNode("div", { class: "px-6 pb-6 text-gray-500 leading-relaxed animate-in slide-in-from-top-2 duration-200" }, toDisplayString(_ctx.$t(`faq_a${faq}`)), 513), [
                          [vShow, activeFaq.value === faq]
                        ])
                      ], 2);
                    }), 64))
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-gray-50 border-t border-gray-100 overflow-hidden" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "relative bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-indigo-100 border border-indigo-50 overflow-hidden flex flex-col md:flex-row items-center gap-12" }, [
                    createVNode("div", { class: "absolute -right-20 -top-20 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-60" }),
                    createVNode("div", { class: "w-full md:w-1/2 relative flex justify-center" }, [
                      createVNode("div", { class: "relative w-64 h-[500px] bg-slate-900 rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden transform md:-rotate-6 hover:rotate-0 transition-transform duration-500" }, [
                        createVNode("div", { class: "absolute top-0 w-full h-6 bg-slate-800 flex justify-center items-center" }, [
                          createVNode("div", { class: "w-16 h-4 bg-slate-900 rounded-full" })
                        ]),
                        createVNode("div", { class: "p-4 mt-8 space-y-4" }, [
                          createVNode("div", { class: "h-32 bg-indigo-600/20 rounded-2xl animate-pulse" }),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "h-4 w-3/4 bg-slate-700 rounded-full" }),
                            createVNode("div", { class: "h-4 w-1/2 bg-slate-700 rounded-full" })
                          ]),
                          createVNode("div", { class: "grid grid-cols-2 gap-2 mt-8" }, [
                            createVNode("div", { class: "h-20 bg-emerald-500/20 rounded-xl" }),
                            createVNode("div", { class: "h-20 bg-blue-500/20 rounded-xl" })
                          ])
                        ]),
                        createVNode("div", { class: "absolute bottom-8 w-full px-6" }, [
                          createVNode("div", { class: "h-12 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/50 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-widest" }, "OneForMind App")
                        ])
                      ]),
                      createVNode("div", { class: "absolute top-10 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-indigo-50 animate-bounce" }, [
                        createVNode("span", { class: "text-2xl" }, "📱")
                      ])
                    ]),
                    createVNode("div", { class: "w-full md:w-1/2 text-center md:text-left relative z-10" }, [
                      createVNode("span", { class: "inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6" }, " Coming Soon "),
                      createVNode("h2", { class: "text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight" }, toDisplayString(_ctx.$t("waitlist_title")), 1),
                      createVNode("p", { class: "text-gray-500 text-lg mb-10 leading-relaxed" }, toDisplayString(_ctx.$t("waitlist_desc")), 1),
                      createVNode("form", {
                        onSubmit: withModifiers(submitWaitlist, ["prevent"]),
                        class: "flex flex-col sm:flex-row gap-3"
                      }, [
                        createVNode("div", { class: "flex-1" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            placeholder: _ctx.$t("waitlist_input_placeholder"),
                            class: ["w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-medium transition-all", { "border-red-500 bg-red-50": unref(form).errors.email }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue", "placeholder"]), [
                            [vModelText, unref(form).email]
                          ]),
                          unref(form).errors.email ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-red-500 text-xs mt-1 ml-2 font-bold text-left"
                          }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("button", {
                          disabled: unref(form).processing,
                          class: "bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        }, toDisplayString(unref(form).processing ? "Sending..." : _ctx.$t("waitlist_btn")), 9, ["disabled"])
                      ], 32),
                      successMessage.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-4 p-4 bg-green-50 border border-green-100 text-green-700 rounded-2xl font-bold text-sm animate-in fade-in slide-in-from-bottom-2"
                      }, " ✅ " + toDisplayString(successMessage.value), 1)) : createCommentVNode("", true),
                      createVNode("p", { class: "mt-4 text-xs text-gray-500 font-medium" }, toDisplayString(_ctx.$t("waitlist_note")), 1)
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 px-6 text-center" }, [
                createVNode("div", { class: "max-w-5xl mx-auto bg-indigo-950 rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-1000 delay-200 fill-mode-both" }, [
                  createVNode("div", { class: "absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse duration-[4000ms]" }),
                  createVNode("div", { class: "absolute bottom-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse duration-[4000ms]" }),
                  createVNode("div", { class: "relative z-10" }, [
                    createVNode("h2", { class: "text-4xl md:text-6xl font-black mb-8 leading-tight" }, toDisplayString(_ctx.$t("cta_final_title")), 1),
                    createVNode("p", { class: "text-indigo-200 text-xl mb-12 max-w-2xl mx-auto" }, toDisplayString(_ctx.$t("cta_final_desc")), 1),
                    createVNode(unref(Link), {
                      href: _ctx.route("register"),
                      class: "inline-block bg-white text-indigo-950 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("cta_final_btn")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("p", { class: "mt-8 text-sm text-indigo-300 font-medium" }, toDisplayString(_ctx.$t("cta_final_sub")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
