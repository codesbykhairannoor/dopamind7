import { ref, computed, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "GuestLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenuOpen = ref(false);
    const activeMenu = ref(null);
    const activeAccordion = ref(null);
    const scrolled = ref(false);
    const page = usePage();
    const user = computed(() => {
      var _a;
      return (_a = page.props.auth) == null ? void 0 : _a.user;
    });
    const currentLang = computed(() => page.props.locale || "id");
    const handleScroll = () => {
      scrolled.value = window.scrollY > 20;
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 relative" }, _attrs))}><nav class="${ssrRenderClass([scrolled.value || mobileMenuOpen.value ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm" : "bg-transparent", "fixed top-0 w-full z-[100] transition-all duration-300"])}"><div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative"><a${ssrRenderAttr("href", _ctx.route("home"))} class="group flex items-center gap-2.5 z-[110]"><div class="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-200"><img src="/favicon.svg?v=2" alt="Logo" class="w-6 h-6 brightness-0 invert"></div><span class="text-xl font-black tracking-tighter text-slate-900">OneForMind<span class="text-indigo-600">.</span></span></a><div class="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"><div class="relative group"><button class="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all flex items-center gap-1 group-hover:text-indigo-600">${ssrInterpolate(_ctx.$t("nav_features", "Features"))} <svg class="${ssrRenderClass([activeMenu.value === "features" ? "rotate-180" : "", "w-4 h-4 opacity-50 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="absolute top-full left-0 w-[500px] pt-4 z-50" style="${ssrRenderStyle(activeMenu.value === "features" ? null : { display: "none" })}"><div class="bg-white border border-slate-100 shadow-2xl rounded-[2rem] overflow-hidden p-4"><div class="grid grid-cols-2 gap-2 text-left"><a${ssrRenderAttr("href", _ctx.route("features.habit"))} class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item"><span class="text-xl group-hover/item:scale-110 transition-transform">🌱</span><div><h4 class="font-bold text-slate-900 text-sm">Habit Tracker</h4><p class="text-[11px] font-medium text-slate-500">Build consistency every day.</p></div></a><a${ssrRenderAttr("href", _ctx.route("features.finance"))} class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item"><span class="text-xl group-hover/item:scale-110 transition-transform">💰</span><div><h4 class="font-bold text-slate-900 text-sm">Finance</h4><p class="text-[11px] font-medium text-slate-500">Master your cash flow.</p></div></a><a${ssrRenderAttr("href", _ctx.route("features.planner"))} class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item"><span class="text-xl group-hover/item:scale-110 transition-transform">🎯</span><div><h4 class="font-bold text-slate-900 text-sm">Planner</h4><p class="text-[11px] font-medium text-slate-500">Organize your daily tasks.</p></div></a><a${ssrRenderAttr("href", _ctx.route("features.journal"))} class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item"><span class="text-xl group-hover/item:scale-110 transition-transform">📔</span><div><h4 class="font-bold text-slate-900 text-sm">Journal</h4><p class="text-[11px] font-medium text-slate-500">Clear your mental clutter.</p></div></a><a${ssrRenderAttr("href", _ctx.route("features.calendar"))} class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item"><span class="text-xl group-hover/item:scale-110 transition-transform">📅</span><div><h4 class="font-bold text-slate-900 text-sm">Calendar</h4><p class="text-[11px] font-medium text-slate-500">Visual time management.</p></div></a></div></div></div></div><div class="relative group"><button class="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1 group-hover:text-indigo-600">${ssrInterpolate(_ctx.$t("nav_solutions", "Solutions"))} <svg class="${ssrRenderClass([activeMenu.value === "solutions" ? "rotate-180" : "", "w-4 h-4 opacity-50 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="absolute top-full left-0 w-[280px] pt-4 z-50" style="${ssrRenderStyle(activeMenu.value === "solutions" ? null : { display: "none" })}"><div class="p-3 bg-white border border-slate-100 shadow-2xl rounded-[1.5rem] flex flex-col gap-1 text-left"><a${ssrRenderAttr("href", _ctx.route("solutions.student"))} class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item"><span class="text-lg group-hover/item:scale-110 transition-transform">🎓</span><div><h4 class="font-bold text-slate-900 text-sm">For Students</h4></div></a><a${ssrRenderAttr("href", _ctx.route("solutions.freelancer"))} class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item"><span class="text-lg group-hover/item:scale-110 transition-transform">💻</span><div><h4 class="font-bold text-slate-900 text-sm">For Freelancers</h4></div></a><a${ssrRenderAttr("href", _ctx.route("solutions.personalgrowth"))} class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item"><span class="text-lg group-hover/item:scale-110 transition-transform">🚀</span><div><h4 class="font-bold text-slate-900 text-sm">Personal Growth</h4></div></a></div></div></div><div class="relative group"><button class="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1 group-hover:text-indigo-600">${ssrInterpolate(_ctx.$t("nav_resources", "Resources"))} <svg class="${ssrRenderClass([activeMenu.value === "resources" ? "rotate-180" : "", "w-4 h-4 opacity-50 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="absolute top-full left-0 w-[280px] pt-4 z-50 text-left" style="${ssrRenderStyle(activeMenu.value === "resources" ? null : { display: "none" })}"><div class="p-3 bg-white border border-slate-100 shadow-2xl rounded-[1.5rem] flex flex-col gap-1"><a${ssrRenderAttr("href", _ctx.route("resources.guide"))} class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item"><span class="text-lg group-hover/item:scale-110 transition-transform">📖</span><div><h4 class="font-bold text-slate-900 text-sm">User Guide</h4></div></a><a${ssrRenderAttr("href", _ctx.route("resources.blog"))} class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item"><span class="text-lg group-hover/item:scale-110 transition-transform">✍️</span><div><h4 class="font-bold text-slate-900 text-sm">Blog</h4></div></a><a${ssrRenderAttr("href", _ctx.route("resources.stories"))} class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item"><span class="text-lg group-hover/item:scale-110 transition-transform">✨</span><div><h4 class="font-bold text-slate-900 text-sm">User Stories</h4></div></a></div></div></div><a${ssrRenderAttr("href", _ctx.route("pricing"))} class="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition">${ssrInterpolate(_ctx.$t("nav_pricing", "Pricing"))}</a></div><div class="hidden lg:flex items-center gap-4"><div class="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 mr-2"><button class="${ssrRenderClass([currentLang.value === "id" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500", "px-3 py-1 rounded-full text-[10px] font-black transition-all"])}">ID</button><button class="${ssrRenderClass([currentLang.value === "en" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500", "px-3 py-1 rounded-full text-[10px] font-black transition-all"])}">EN</button></div>`);
      if (user.value) {
        _push(`<div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("dashboard"),
          class: "px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Dashboard`);
            } else {
              return [
                createTextVNode("Dashboard")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "text-sm font-bold text-slate-600 hover:text-indigo-600 transition"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("nav_login", "Log in"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("nav_login", "Log in")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          class: "px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5 active:scale-95"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("nav_register", "Get Started"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("nav_register", "Get Started")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div><button class="lg:hidden p-2 text-slate-900 relative z-[110] focus:outline-none"><div class="w-6 flex flex-col items-end gap-1.5"><span class="${ssrRenderClass([mobileMenuOpen.value ? "rotate-45 translate-y-2 w-6" : "w-6", "h-0.5 bg-current transition-all duration-300"])}"></span><span class="${ssrRenderClass([mobileMenuOpen.value ? "opacity-0" : "w-4", "h-0.5 bg-current transition-all duration-300"])}"></span><span class="${ssrRenderClass([mobileMenuOpen.value ? "-rotate-45 -translate-y-2 w-6" : "w-5", "h-0.5 bg-current transition-all duration-300"])}"></span></div></button></div><div class="lg:hidden fixed inset-0 top-0 bg-white z-[100] pt-24 px-6 pb-10 flex flex-col h-screen overflow-y-auto" style="${ssrRenderStyle(mobileMenuOpen.value ? null : { display: "none" })}"><div class="flex-grow space-y-2"><div class="border-b border-slate-50"><button class="w-full py-5 flex justify-between items-center text-xl font-black text-slate-900"><span>${ssrInterpolate(_ctx.$t("nav_features", "Features"))}</span><svg class="${ssrRenderClass([activeAccordion.value === "features" ? "rotate-180" : "", "w-5 h-5 text-slate-400 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="grid grid-cols-1 gap-1 pb-4" style="${ssrRenderStyle(activeAccordion.value === "features" ? null : { display: "none" })}"><a${ssrRenderAttr("href", _ctx.route("features.habit"))} class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">🌱 Habit Tracker</a><a${ssrRenderAttr("href", _ctx.route("features.finance"))} class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">💰 Finance Tracker</a><a${ssrRenderAttr("href", _ctx.route("features.planner"))} class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">🎯 Daily Planner</a><a${ssrRenderAttr("href", _ctx.route("features.journal"))} class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">📔 Mindful Journal</a><a${ssrRenderAttr("href", _ctx.route("features.calendar"))} class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">📅 Calendar</a></div></div><div class="border-b border-slate-50"><button class="w-full py-5 flex justify-between items-center text-xl font-black text-slate-900"><span>${ssrInterpolate(_ctx.$t("nav_solutions", "Solutions"))}</span><svg class="${ssrRenderClass([activeAccordion.value === "solutions" ? "rotate-180" : "", "w-5 h-5 text-slate-400 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="grid grid-cols-1 gap-1 pb-4 text-left" style="${ssrRenderStyle(activeAccordion.value === "solutions" ? null : { display: "none" })}"><a${ssrRenderAttr("href", _ctx.route("solutions.student"))} class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">🎓 For Students</a><a${ssrRenderAttr("href", _ctx.route("solutions.freelancer"))} class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">💻 For Freelancers</a><a${ssrRenderAttr("href", _ctx.route("solutions.personalgrowth"))} class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">🚀 Personal Growth</a></div></div><div class="border-b border-slate-50"><button class="w-full py-5 flex justify-between items-center text-xl font-black text-slate-900"><span>${ssrInterpolate(_ctx.$t("nav_resources", "Resources"))}</span><svg class="${ssrRenderClass([activeAccordion.value === "resources" ? "rotate-180" : "", "w-5 h-5 text-slate-400 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="grid grid-cols-1 gap-1 pb-4 text-left" style="${ssrRenderStyle(activeAccordion.value === "resources" ? null : { display: "none" })}"><a${ssrRenderAttr("href", _ctx.route("resources.guide"))} class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">📖 User Guide</a><a${ssrRenderAttr("href", _ctx.route("resources.blog"))} class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">✍️ Blog</a><a${ssrRenderAttr("href", _ctx.route("resources.stories"))} class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">✨ User Stories</a></div></div><a${ssrRenderAttr("href", _ctx.route("pricing"))} class="block py-5 text-xl font-black text-slate-900 border-b border-slate-50">${ssrInterpolate(_ctx.$t("nav_pricing", "Pricing"))}</a></div><div class="pt-8 space-y-6"><div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"><span class="text-sm font-bold text-slate-500">Language</span><div class="flex gap-2"><button class="${ssrRenderClass([currentLang.value === "id" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-400", "px-3 py-1 rounded-lg text-xs font-black transition-all"])}">ID</button><button class="${ssrRenderClass([currentLang.value === "en" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-400", "px-3 py-1 rounded-lg text-xs font-black transition-all"])}">EN</button></div></div>`);
      if (!user.value) {
        _push(`<div class="grid grid-cols-1 gap-3">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "w-full py-4 text-center font-bold text-slate-900 bg-white border border-slate-200 rounded-2xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("nav_login", "Log in"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("nav_login", "Log in")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          class: "w-full py-4 text-center font-black text-white bg-indigo-600 rounded-2xl shadow-xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("nav_register", "Get Started free"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("nav_register", "Get Started free")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("dashboard"),
          class: "block w-full py-4 text-center font-black text-white bg-slate-900 rounded-2xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Go to Dashboard`);
            } else {
              return [
                createTextVNode("Go to Dashboard")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div></nav><main class="flex-grow pt-20">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-slate-50 border-t border-slate-100 pt-20 pb-10 mt-auto"><div class="max-w-7xl mx-auto px-6"><div class="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16 text-left"><div class="col-span-2 md:col-span-1"><a${ssrRenderAttr("href", _ctx.route("home"))} class="flex items-center gap-2 mb-6"><img src="/favicon.svg?v=2" alt="Logo" class="w-7 h-7"><span class="text-lg font-black tracking-tighter">OneForMind</span></a><p class="text-sm text-slate-500 leading-relaxed"> The unified productivity system designed to bring clarity to your life, habits, and finances. </p></div><div><h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Product</h3><ul class="space-y-4 text-sm font-bold text-slate-500"><li><a${ssrRenderAttr("href", _ctx.route("features.habit"))} class="hover:text-indigo-600 transition">Habit Tracker</a></li><li><a${ssrRenderAttr("href", _ctx.route("features.finance"))} class="hover:text-indigo-600 transition">Finance Tracker</a></li><li><a${ssrRenderAttr("href", _ctx.route("features.planner"))} class="hover:text-indigo-600 transition">Daily Planner</a></li><li><a${ssrRenderAttr("href", _ctx.route("pricing"))} class="hover:text-indigo-600 transition">Pricing</a></li></ul></div><div><h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Compare</h3><ul class="space-y-4 text-sm font-bold text-slate-500"><li><a${ssrRenderAttr("href", _ctx.route("compare.paper"))} class="hover:text-indigo-600 transition">vs Paper Planner</a></li><li><a${ssrRenderAttr("href", _ctx.route("compare.sheets"))} class="hover:text-indigo-600 transition">vs Spreadsheets</a></li><li><a${ssrRenderAttr("href", _ctx.route("compare.management-tools"))} class="hover:text-indigo-600 transition">vs Task Tools</a></li><li><a${ssrRenderAttr("href", _ctx.route("compare.habit-apps"))} class="hover:text-indigo-600 transition">vs Habit Apps</a></li></ul></div><div><h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Company</h3><ul class="space-y-4 text-sm font-bold text-slate-500"><li><a${ssrRenderAttr("href", _ctx.route("about"))} class="hover:text-indigo-600 transition">About Us</a></li><li><a${ssrRenderAttr("href", _ctx.route("company.privacy"))} class="hover:text-indigo-600 transition">Privacy Policy</a></li><li><a${ssrRenderAttr("href", _ctx.route("company.terms"))} class="hover:text-indigo-600 transition">Terms of Service</a></li></ul></div><div><h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Connect</h3><div class="flex gap-4"><a href="#" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm">𝕏</a><a href="#" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm">📸</a></div></div></div><div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-600"><p>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} OneForMind. All rights reserved.</p><p>Made with ✨ by Dopamind7 Team</p></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
