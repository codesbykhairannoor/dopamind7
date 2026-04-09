import { computed, ref, unref, withCtx, createVNode, resolveDynamicComponent, toDisplayString, createBlock, openBlock, Fragment, renderList, createTextVNode, createCommentVNode, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderVNode } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BuzclwEd.js";
import { _ as _sfc_main$6 } from "./OneForMindIcon-XdjRmiFl.js";
import { usePage, Head, router } from "@inertiajs/vue3";
import _sfc_main$1 from "./GeneralTab-VY_2A7Ae.js";
import _sfc_main$5 from "./ProfileTab-KcGRUnKp.js";
import _sfc_main$4 from "./AppearanceTab-CDLwS7dO.js";
import _sfc_main$3 from "./SecurityTab-CWI_nM13.js";
import _sfc_main$2 from "./BillingTab-DEizwAG-.js";
import LegalTab from "./LegalTab-DoccWlf4.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ThemeToggle-ByQSx4Ee.js";
import "./useAppearance-rDoGVD4_.js";
const __default__ = {
  data() {
    return {
      isMobile: false
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);
  },
  unmounted() {
    window.removeEventListener("resize", this.checkMobile);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 1024;
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    userSettings: Object,
    mustVerifyEmail: Boolean,
    status: String,
    hasPassword: Boolean,
    midtrans_client_key: String
  },
  setup(__props) {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    const currentLocale = computed(() => page.props.locale);
    const activeTab = ref("general");
    const tabs = [
      { id: "general", name: "Umum", icon: "🌐", desc: "Bahasa & Lokasi", tName: "settings_tab_general", tDesc: "settings_tab_general_desc" },
      { id: "profile", name: "Profil Saya", icon: "👤", desc: "Info Akun & Foto", tName: "settings_tab_profile", tDesc: "settings_tab_profile_desc" },
      { id: "appearance", name: "Tampilan", icon: "🧩", desc: "Aktivasi Modul", tName: "settings_tab_appearance", tDesc: "settings_tab_appearance_desc" },
      { id: "security", name: "Keamanan", icon: "🔒", desc: "Password & Privasi", tName: "settings_tab_security", tDesc: "settings_tab_security_desc" },
      { id: "billing", name: "Langganan", icon: "💎", desc: "Upgrade Premium", tName: "settings_tab_billing", tDesc: "settings_tab_billing_desc" },
      { id: "legal", name: "Legal", icon: "📄", desc: "Syarat & Ketentuan", tName: "settings_tab_legal", tDesc: "settings_tab_legal_desc" }
    ];
    const currentTabComponent = computed(() => {
      switch (activeTab.value) {
        case "general":
          return _sfc_main$1;
        case "profile":
          return _sfc_main$5;
        case "appearance":
          return _sfc_main$4;
        case "security":
          return _sfc_main$3;
        case "billing":
          return _sfc_main$2;
        case "legal":
          return LegalTab;
        default:
          return _sfc_main$1;
      }
    });
    const switchLang = (lang) => {
      if (lang === currentLocale.value) return;
      router.get(route("lang.switch", { locale: lang }));
    };
    const confirmLogout = () => {
      router.post(route("logout"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("settings_title", "Account Settings")
      }, null, _parent));
      _push(ssrRenderComponent(AuthenticatedLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(`<div class="max-w-6xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-40 transition-all duration-500" data-v-d902327d${_scopeId}><div class="mb-12 text-center md:text-left" data-v-d902327d${_scopeId}><h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-500" data-v-d902327d${_scopeId}>${ssrInterpolate(_ctx.$t("settings_header", "Account Settings"))}</h1><p class="text-slate-400 dark:text-slate-500 font-bold mt-2 transition-colors duration-500" data-v-d902327d${_scopeId}>${ssrInterpolate(_ctx.$t("settings_subheader", "Customize your productivity experience"))}</p></div><div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-indigo-500/5 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 mb-10 relative overflow-hidden group transition-all duration-500" data-v-d902327d${_scopeId}><div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full translate-x-1/2 -translate-y-1/2" data-v-d902327d${_scopeId}></div><div class="relative shrink-0" data-v-d902327d${_scopeId}>`);
            if ((_a = user.value) == null ? void 0 : _a.avatar_url) {
              _push2(`<img${ssrRenderAttr("src", user.value.avatar_url)} alt="Avatar" class="w-24 h-24 rounded-full object-cover shadow-2xl border-4 border-white dark:border-slate-800" data-v-d902327d${_scopeId}>`);
            } else {
              _push2(`<div class="w-24 h-24 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-black text-4xl shadow-2xl border-4 border-white dark:border-slate-800" data-v-d902327d${_scopeId}>${ssrInterpolate(((_c = (_b = user.value) == null ? void 0 : _b.name) == null ? void 0 : _c.charAt(0).toUpperCase()) || "U")}</div>`);
            }
            _push2(`</div><div class="flex-1 text-center md:text-left min-w-0" data-v-d902327d${_scopeId}><h2 class="text-3xl font-black text-slate-800 dark:text-slate-100 truncate leading-tight transition-colors duration-500" data-v-d902327d${_scopeId}>${ssrInterpolate(((_d = user.value) == null ? void 0 : _d.name) || "User")}</h2><p class="text-slate-400 dark:text-slate-500 font-bold mt-1 transition-colors duration-500" data-v-d902327d${_scopeId}>${ssrInterpolate((_e = user.value) == null ? void 0 : _e.email)}</p><div class="flex flex-wrap justify-center md:justify-start gap-2 mt-4" data-v-d902327d${_scopeId}><span class="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black transition-colors duration-500" data-v-d902327d${_scopeId}>Platinum User</span><span class="px-4 py-1.5 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 rounded-full text-[10px] font-black transition-colors duration-500" data-v-d902327d${_scopeId}>Member #${ssrInterpolate((_f = user.value) == null ? void 0 : _f.id)}</span></div></div></div><div class="flex flex-col lg:flex-row gap-8" data-v-d902327d${_scopeId}>`);
            if (_ctx.isMobile) {
              _push2(`<div class="w-full flex overflow-x-auto no-scrollbar gap-2 pb-4 pt-2 -mx-2 px-2 sticky top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md z-40" data-v-d902327d${_scopeId}><!--[-->`);
              ssrRenderList(tabs, (tab) => {
                _push2(`<button${ssrRenderAttr("id", "mobile-tab-" + tab.id)} class="${ssrRenderClass([activeTab.value === tab.id ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-200 dark:shadow-none" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800", "whitespace-nowrap px-6 py-3 rounded-2xl font-black text-xs transition-all border flex items-center gap-2"])}" data-v-d902327d${_scopeId}><span data-v-d902327d${_scopeId}>${ssrInterpolate(tab.icon)}</span> ${ssrInterpolate(_ctx.$t(tab.tName, tab.name))}</button>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<aside class="w-full lg:w-80 shrink-0" data-v-d902327d${_scopeId}><div class="space-y-6 pt-2" data-v-d902327d${_scopeId}><nav id="desktop-settings-nav" class="space-y-1.5 p-3 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative z-10 transition-all duration-500" data-v-d902327d${_scopeId}><!--[-->`);
              ssrRenderList(tabs, (tab) => {
                _push2(`<button${ssrRenderAttr("id", "tab-" + tab.id)} class="${ssrRenderClass([activeTab.value === tab.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 dark:shadow-indigo-900/40 border border-indigo-500" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200", "w-full flex items-center gap-4 p-4 rounded-[1.8rem] transition-all duration-300 group text-left"])}" data-v-d902327d${_scopeId}><span class="text-2xl transition-transform group-hover:scale-110" data-v-d902327d${_scopeId}>${ssrInterpolate(tab.icon)}</span><div class="text-left" data-v-d902327d${_scopeId}><h4 class="${ssrRenderClass([activeTab.value === tab.id ? "text-white" : "text-slate-800 dark:text-slate-200", "text-sm font-black leading-none"])}" data-v-d902327d${_scopeId}>${ssrInterpolate(_ctx.$t(tab.tName, tab.name))}</h4><p class="${ssrRenderClass([activeTab.value === tab.id ? "text-indigo-100" : "text-slate-400", "text-[10px] font-bold mt-1 opacity-70"])}" data-v-d902327d${_scopeId}>${ssrInterpolate(_ctx.$t(tab.tDesc, tab.desc))}</p></div></button>`);
              });
              _push2(`<!--]--></nav><div class="bg-white dark:bg-slate-900 rounded-[2.2rem] p-4 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3 transition-all duration-500" data-v-d902327d${_scopeId}><div class="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-[1.5rem] border border-slate-100/50 dark:border-slate-700/50 transition-colors duration-500" data-v-d902327d${_scopeId}><span class="font-black text-slate-800 dark:text-slate-200 text-xs transition-colors duration-500" data-v-d902327d${_scopeId}>${ssrInterpolate(_ctx.$t("settings_lang_label", "Language"))}</span><div class="flex gap-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-inner transition-colors duration-500" data-v-d902327d${_scopeId}><button id="lang-switch-id" class="${ssrRenderClass([currentLocale.value === "id" ? "bg-indigo-600 text-white shadow-lg dark:shadow-none" : "text-slate-400 dark:text-slate-500", "px-4 py-1.5 rounded-lg text-[9px] font-black transition-all"])}" data-v-d902327d${_scopeId}>ID</button><button id="lang-switch-en" class="${ssrRenderClass([currentLocale.value === "en" ? "bg-indigo-600 text-white shadow-lg dark:shadow-none" : "text-slate-400 dark:text-slate-500", "px-4 py-1.5 rounded-lg text-[9px] font-black transition-all"])}" data-v-d902327d${_scopeId}>EN</button></div></div><button id="logout-btn" class="w-full bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 font-black py-4 rounded-[1.5rem] border border-rose-100 dark:border-rose-500/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-rose-100/50 dark:hover:bg-rose-500/20" data-v-d902327d${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                name: "logout",
                size: "18",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-[10px] font-black" data-v-d902327d${_scopeId}>Sign Out</span></button></div></div></aside>`);
            }
            _push2(`<main class="flex-grow bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-sm min-h-[600px] transition-all duration-500 relative" data-v-d902327d${_scopeId}><div class="max-w-3xl" data-v-d902327d${_scopeId}>`);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(currentTabComponent.value), {
              userSettings: __props.userSettings,
              mustVerifyEmail: __props.mustVerifyEmail,
              status: __props.status,
              hasPassword: __props.hasPassword,
              midtransClientKey: __props.midtrans_client_key
            }, null), _parent2, _scopeId);
            _push2(`</div>`);
            if (_ctx.isMobile) {
              _push2(`<div class="mt-12 space-y-4 pt-12 border-t border-slate-100 dark:border-slate-800" data-v-d902327d${_scopeId}><div class="flex items-center justify-between p-5 bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700" data-v-d902327d${_scopeId}><span class="font-black text-slate-800 dark:text-slate-200 text-xs" data-v-d902327d${_scopeId}>${ssrInterpolate(_ctx.$t("settings_lang_label"))}</span><div class="flex gap-1 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-700/50" data-v-d902327d${_scopeId}><button class="${ssrRenderClass([currentLocale.value === "id" ? "bg-indigo-600 text-white" : "text-slate-400", "px-5 py-2 rounded-xl text-[10px] font-black transition-all"])}" data-v-d902327d${_scopeId}>ID</button><button class="${ssrRenderClass([currentLocale.value === "en" ? "bg-indigo-600 text-white" : "text-slate-400", "px-5 py-2 rounded-xl text-[10px] font-black transition-all"])}" data-v-d902327d${_scopeId}>EN</button></div></div><button class="w-full bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 font-black py-5 rounded-3xl border border-rose-100 dark:border-rose-500/20 flex items-center justify-center gap-3" data-v-d902327d${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                name: "logout",
                size: "20",
                "stroke-width": "2.5"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-xs font-black" data-v-d902327d${_scopeId}>Sign Out</span></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</main></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-6xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-40 transition-all duration-500" }, [
                createVNode("div", { class: "mb-12 text-center md:text-left" }, [
                  createVNode("h1", { class: "text-4xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-500" }, toDisplayString(_ctx.$t("settings_header", "Account Settings")), 1),
                  createVNode("p", { class: "text-slate-400 dark:text-slate-500 font-bold mt-2 transition-colors duration-500" }, toDisplayString(_ctx.$t("settings_subheader", "Customize your productivity experience")), 1)
                ]),
                createVNode("div", { class: "bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-indigo-500/5 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 mb-10 relative overflow-hidden group transition-all duration-500" }, [
                  createVNode("div", { class: "absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full translate-x-1/2 -translate-y-1/2" }),
                  createVNode("div", { class: "relative shrink-0" }, [
                    ((_g = user.value) == null ? void 0 : _g.avatar_url) ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: user.value.avatar_url,
                      alt: "Avatar",
                      class: "w-24 h-24 rounded-full object-cover shadow-2xl border-4 border-white dark:border-slate-800"
                    }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "w-24 h-24 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-black text-4xl shadow-2xl border-4 border-white dark:border-slate-800"
                    }, toDisplayString(((_i = (_h = user.value) == null ? void 0 : _h.name) == null ? void 0 : _i.charAt(0).toUpperCase()) || "U"), 1))
                  ]),
                  createVNode("div", { class: "flex-1 text-center md:text-left min-w-0" }, [
                    createVNode("h2", { class: "text-3xl font-black text-slate-800 dark:text-slate-100 truncate leading-tight transition-colors duration-500" }, toDisplayString(((_j = user.value) == null ? void 0 : _j.name) || "User"), 1),
                    createVNode("p", { class: "text-slate-400 dark:text-slate-500 font-bold mt-1 transition-colors duration-500" }, toDisplayString((_k = user.value) == null ? void 0 : _k.email), 1),
                    createVNode("div", { class: "flex flex-wrap justify-center md:justify-start gap-2 mt-4" }, [
                      createVNode("span", { class: "px-4 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black transition-colors duration-500" }, "Platinum User"),
                      createVNode("span", { class: "px-4 py-1.5 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 rounded-full text-[10px] font-black transition-colors duration-500" }, "Member #" + toDisplayString((_l = user.value) == null ? void 0 : _l.id), 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex flex-col lg:flex-row gap-8" }, [
                  _ctx.isMobile ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "w-full flex overflow-x-auto no-scrollbar gap-2 pb-4 pt-2 -mx-2 px-2 sticky top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md z-40"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                      return createVNode("button", {
                        key: tab.id,
                        id: "mobile-tab-" + tab.id,
                        onClick: ($event) => activeTab.value = tab.id,
                        class: ["whitespace-nowrap px-6 py-3 rounded-2xl font-black text-xs transition-all border flex items-center gap-2", activeTab.value === tab.id ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-200 dark:shadow-none" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800"]
                      }, [
                        createVNode("span", null, toDisplayString(tab.icon), 1),
                        createTextVNode(" " + toDisplayString(_ctx.$t(tab.tName, tab.name)), 1)
                      ], 10, ["id", "onClick"]);
                    }), 64))
                  ])) : (openBlock(), createBlock("aside", {
                    key: 1,
                    class: "w-full lg:w-80 shrink-0"
                  }, [
                    createVNode("div", { class: "space-y-6 pt-2" }, [
                      createVNode("nav", {
                        id: "desktop-settings-nav",
                        class: "space-y-1.5 p-3 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative z-10 transition-all duration-500"
                      }, [
                        (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                          return createVNode("button", {
                            key: tab.id,
                            id: "tab-" + tab.id,
                            onClick: ($event) => activeTab.value = tab.id,
                            class: ["w-full flex items-center gap-4 p-4 rounded-[1.8rem] transition-all duration-300 group text-left", activeTab.value === tab.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 dark:shadow-indigo-900/40 border border-indigo-500" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"]
                          }, [
                            createVNode("span", { class: "text-2xl transition-transform group-hover:scale-110" }, toDisplayString(tab.icon), 1),
                            createVNode("div", { class: "text-left" }, [
                              createVNode("h4", {
                                class: ["text-sm font-black leading-none", activeTab.value === tab.id ? "text-white" : "text-slate-800 dark:text-slate-200"]
                              }, toDisplayString(_ctx.$t(tab.tName, tab.name)), 3),
                              createVNode("p", {
                                class: ["text-[10px] font-bold mt-1 opacity-70", activeTab.value === tab.id ? "text-indigo-100" : "text-slate-400"]
                              }, toDisplayString(_ctx.$t(tab.tDesc, tab.desc)), 3)
                            ])
                          ], 10, ["id", "onClick"]);
                        }), 64))
                      ]),
                      createVNode("div", { class: "bg-white dark:bg-slate-900 rounded-[2.2rem] p-4 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3 transition-all duration-500" }, [
                        createVNode("div", { class: "flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-[1.5rem] border border-slate-100/50 dark:border-slate-700/50 transition-colors duration-500" }, [
                          createVNode("span", { class: "font-black text-slate-800 dark:text-slate-200 text-xs transition-colors duration-500" }, toDisplayString(_ctx.$t("settings_lang_label", "Language")), 1),
                          createVNode("div", { class: "flex gap-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-inner transition-colors duration-500" }, [
                            createVNode("button", {
                              id: "lang-switch-id",
                              onClick: ($event) => switchLang("id"),
                              class: [currentLocale.value === "id" ? "bg-indigo-600 text-white shadow-lg dark:shadow-none" : "text-slate-400 dark:text-slate-500", "px-4 py-1.5 rounded-lg text-[9px] font-black transition-all"]
                            }, "ID", 10, ["onClick"]),
                            createVNode("button", {
                              id: "lang-switch-en",
                              onClick: ($event) => switchLang("en"),
                              class: [currentLocale.value === "en" ? "bg-indigo-600 text-white shadow-lg dark:shadow-none" : "text-slate-400 dark:text-slate-500", "px-4 py-1.5 rounded-lg text-[9px] font-black transition-all"]
                            }, "EN", 10, ["onClick"])
                          ])
                        ]),
                        createVNode("button", {
                          id: "logout-btn",
                          onClick: confirmLogout,
                          class: "w-full bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 font-black py-4 rounded-[1.5rem] border border-rose-100 dark:border-rose-500/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-rose-100/50 dark:hover:bg-rose-500/20"
                        }, [
                          createVNode(_sfc_main$6, {
                            name: "logout",
                            size: "18",
                            "stroke-width": "2.5"
                          }),
                          createVNode("span", { class: "text-[10px] font-black" }, "Sign Out")
                        ])
                      ])
                    ])
                  ])),
                  createVNode("main", { class: "flex-grow bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-sm min-h-[600px] transition-all duration-500 relative" }, [
                    createVNode("div", { class: "max-w-3xl" }, [
                      createVNode(Transition, {
                        mode: "out-in",
                        "enter-active-class": "transition duration-300 ease-out",
                        "enter-from-class": "opacity-0 translate-x-4",
                        "enter-to-class": "opacity-100 translate-x-0",
                        "leave-active-class": "transition duration-200 ease-in",
                        "leave-from-class": "opacity-100 translate-x-0",
                        "leave-to-class": "opacity-0 -translate-x-4"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(currentTabComponent.value), {
                            userSettings: __props.userSettings,
                            mustVerifyEmail: __props.mustVerifyEmail,
                            status: __props.status,
                            hasPassword: __props.hasPassword,
                            midtransClientKey: __props.midtrans_client_key
                          }, null, 8, ["userSettings", "mustVerifyEmail", "status", "hasPassword", "midtransClientKey"]))
                        ]),
                        _: 1
                      })
                    ]),
                    _ctx.isMobile ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-12 space-y-4 pt-12 border-t border-slate-100 dark:border-slate-800"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between p-5 bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700" }, [
                        createVNode("span", { class: "font-black text-slate-800 dark:text-slate-200 text-xs" }, toDisplayString(_ctx.$t("settings_lang_label")), 1),
                        createVNode("div", { class: "flex gap-1 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-700/50" }, [
                          createVNode("button", {
                            onClick: ($event) => switchLang("id"),
                            class: [currentLocale.value === "id" ? "bg-indigo-600 text-white" : "text-slate-400", "px-5 py-2 rounded-xl text-[10px] font-black transition-all"]
                          }, "ID", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => switchLang("en"),
                            class: [currentLocale.value === "en" ? "bg-indigo-600 text-white" : "text-slate-400", "px-5 py-2 rounded-xl text-[10px] font-black transition-all"]
                          }, "EN", 10, ["onClick"])
                        ])
                      ]),
                      createVNode("button", {
                        onClick: confirmLogout,
                        class: "w-full bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 font-black py-5 rounded-3xl border border-rose-100 dark:border-rose-500/20 flex items-center justify-center gap-3"
                      }, [
                        createVNode(_sfc_main$6, {
                          name: "logout",
                          size: "20",
                          "stroke-width": "2.5"
                        }),
                        createVNode("span", { class: "text-xs font-black" }, "Sign Out")
                      ])
                    ])) : createCommentVNode("", true)
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d902327d"]]);
export {
  Index as default
};
