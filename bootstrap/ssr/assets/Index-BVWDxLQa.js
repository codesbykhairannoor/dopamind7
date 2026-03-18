import { ref, computed, unref, withCtx, createVNode, resolveDynamicComponent, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-B7tFTTzr.js";
import { Head } from "@inertiajs/vue3";
import _sfc_main$1 from "./GeneralTab-jh2_fkQD.js";
import _sfc_main$5 from "./ProfileTab-YSyKXz_T.js";
import _sfc_main$4 from "./AppearanceTab-bThUkc9n.js";
import _sfc_main$3 from "./SecurityTab-BDDE6Gj3.js";
import _sfc_main$2 from "./BillingTab-BEujgxcn.js";
import LegalTab from "./LegalTab-DoccWlf4.js";
import "./OneForMindIcon-BLGVXpxK.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("settings_title", "Pengaturan")
      }, null, _parent));
      _push(ssrRenderComponent(AuthenticatedLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-6xl mx-auto py-12 px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-500"${_scopeId}><div class="mb-10 text-center md:text-left"${_scopeId}><h1 class="text-4xl font-black text-slate-800 tracking-tighter italic"${_scopeId}>${ssrInterpolate(_ctx.$t("settings_header", "Pusat Kendali Akun"))}</h1><p class="text-sm font-bold text-slate-400 mt-2 italic"${_scopeId}>${ssrInterpolate(_ctx.$t("settings_subheader", "Atur segalanya tentang pengalaman produktivitas Anda di sini."))}</p></div><div class="flex flex-col lg:flex-row gap-8"${_scopeId}><aside class="w-full lg:w-72 shrink-0"${_scopeId}><nav class="space-y-1.5 p-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-8"${_scopeId}><!--[-->`);
            ssrRenderList(tabs, (tab) => {
              _push2(`<button class="${ssrRenderClass([activeTab.value === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-600 hover:bg-slate-50", "w-full flex items-center gap-4 p-4 rounded-[2rem] transition-all duration-300 group"])}"${_scopeId}><span class="text-xl transition-transform group-hover:scale-110"${_scopeId}>${ssrInterpolate(tab.icon)}</span><div class="text-left"${_scopeId}><h4 class="${ssrRenderClass([activeTab.value === tab.id ? "text-white" : "text-slate-800", "text-sm font-black leading-none"])}"${_scopeId}>${ssrInterpolate(_ctx.$t(tab.tName, tab.name))}</h4><p class="${ssrRenderClass([activeTab.value === tab.id ? "text-indigo-100" : "text-slate-400", "text-[10px] font-bold mt-1 opacity-70 italic"])}"${_scopeId}>${ssrInterpolate(_ctx.$t(tab.tDesc, tab.desc))}</p></div>`);
              if (activeTab.value === tab.id) {
                _push2(`<div class="ml-auto"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"${_scopeId}></path></svg></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button>`);
            });
            _push2(`<!--]--></nav></aside><main class="flex-grow bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-sm min-h-[500px]"${_scopeId}><div class="max-w-2xl"${_scopeId}>`);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(currentTabComponent.value), {
              userSettings: __props.userSettings,
              mustVerifyEmail: __props.mustVerifyEmail,
              status: __props.status,
              hasPassword: __props.hasPassword,
              midtransClientKey: __props.midtrans_client_key
            }, null), _parent2, _scopeId);
            _push2(`</div></main></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-6xl mx-auto py-12 px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-500" }, [
                createVNode("div", { class: "mb-10 text-center md:text-left" }, [
                  createVNode("h1", { class: "text-4xl font-black text-slate-800 tracking-tighter italic" }, toDisplayString(_ctx.$t("settings_header", "Pusat Kendali Akun")), 1),
                  createVNode("p", { class: "text-sm font-bold text-slate-400 mt-2 italic" }, toDisplayString(_ctx.$t("settings_subheader", "Atur segalanya tentang pengalaman produktivitas Anda di sini.")), 1)
                ]),
                createVNode("div", { class: "flex flex-col lg:flex-row gap-8" }, [
                  createVNode("aside", { class: "w-full lg:w-72 shrink-0" }, [
                    createVNode("nav", { class: "space-y-1.5 p-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-8" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                        return createVNode("button", {
                          key: tab.id,
                          onClick: ($event) => activeTab.value = tab.id,
                          class: ["w-full flex items-center gap-4 p-4 rounded-[2rem] transition-all duration-300 group", activeTab.value === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-600 hover:bg-slate-50"]
                        }, [
                          createVNode("span", { class: "text-xl transition-transform group-hover:scale-110" }, toDisplayString(tab.icon), 1),
                          createVNode("div", { class: "text-left" }, [
                            createVNode("h4", {
                              class: ["text-sm font-black leading-none", activeTab.value === tab.id ? "text-white" : "text-slate-800"]
                            }, toDisplayString(_ctx.$t(tab.tName, tab.name)), 3),
                            createVNode("p", {
                              class: ["text-[10px] font-bold mt-1 opacity-70 italic", activeTab.value === tab.id ? "text-indigo-100" : "text-slate-400"]
                            }, toDisplayString(_ctx.$t(tab.tDesc, tab.desc)), 3)
                          ]),
                          activeTab.value === tab.id ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "ml-auto"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "3",
                                d: "M9 5l7 7-7 7"
                              })
                            ]))
                          ])) : createCommentVNode("", true)
                        ], 10, ["onClick"]);
                      }), 64))
                    ])
                  ]),
                  createVNode("main", { class: "flex-grow bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-sm min-h-[500px]" }, [
                    createVNode("div", { class: "max-w-2xl" }, [
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
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
