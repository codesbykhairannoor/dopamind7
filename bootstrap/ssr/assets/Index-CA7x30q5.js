import { withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-DQTQlmu-.js";
import { _ as _sfc_main$2 } from "./OneForMindIcon-CpE9XZu-.js";
import "./useAppearance-rDoGVD4_.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    users: Array
  },
  setup(__props) {
    const togglePremium = (user) => {
      router.post(route("admin.users.toggle-premium", user.id));
    };
    const toggleAdmin = (user) => {
      if (confirm(`Yakin ingin merubah status admin untuk ${user.name}?`)) {
        router.post(route("admin.users.toggle-admin", user.id));
      }
    };
    const formatDate = (date) => date ? new Date(date).toLocaleDateString() : "N/A";
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Admin | User Monitoring" }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto"${_scopeId}><div class="flex items-center justify-between pb-8 border-b border-slate-200 dark:border-slate-800"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"${_scopeId}>User Directory</h1><p class="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium"${_scopeId}>Real-time monitoring of all community members</p></div><div class="px-6 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"${_scopeId}><span class="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none"${_scopeId}>Total Connections: </span><span class="text-indigo-600 dark:text-indigo-400 font-black"${_scopeId}>${ssrInterpolate(__props.users.length)}</span></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6"${_scopeId}><div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm"${_scopeId}><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 italic"${_scopeId}>Premium Users</p><h3 class="text-3xl font-black text-indigo-600 dark:text-indigo-400 leading-none"${_scopeId}>${ssrInterpolate(__props.users.filter((u) => u.is_premium).length)}</h3></div></div><div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mt-6"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left border-collapse"${_scopeId}><thead${_scopeId}><tr class="bg-slate-50/50 dark:bg-slate-900/50"${_scopeId}><th class="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic"${_scopeId}>User Profile</th><th class="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic text-center"${_scopeId}>Plan</th><th class="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic text-center"${_scopeId}>Auth Level</th><th class="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic"${_scopeId}>Registered</th><th class="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic text-right"${_scopeId}>Operations</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.users, (user) => {
              _push2(`<tr class="group hover:bg-slate-50/30 dark:hover:bg-slate-900/20 transition-all duration-300"${_scopeId}><td class="px-8 py-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><img${ssrRenderAttr("src", user.avatar_url)} class="w-10 h-10 rounded-xl object-cover border border-slate-100 dark:border-slate-700 shadow-sm"${_scopeId}><div class="flex flex-col"${_scopeId}><span class="text-slate-900 dark:text-white text-sm font-bold"${_scopeId}>${ssrInterpolate(user.name)}</span><span class="text-slate-400 text-[10px] font-medium leading-none mt-1"${_scopeId}>${ssrInterpolate(user.email)}</span></div></div></td><td class="px-8 py-6 text-center"${_scopeId}><button class="${ssrRenderClass([user.is_premium ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400" : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400", "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all"])}"${_scopeId}>${ssrInterpolate(user.is_premium ? "Elite Pro" : "Free Core")}</button></td><td class="px-8 py-6 text-center"${_scopeId}><button class="${ssrRenderClass([user.is_admin ? "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400" : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400", "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all"])}"${_scopeId}>${ssrInterpolate(user.is_admin ? "Admin" : "Member")}</button></td><td class="px-8 py-6 text-xs font-bold text-slate-500 dark:text-slate-400 italic"${_scopeId}>${ssrInterpolate(formatDate(user.created_at))}</td><td class="px-8 py-6 text-right"${_scopeId}><button class="p-2 text-slate-300 hover:text-indigo-600 transition-colors"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                name: "settings",
                size: "18"
              }, null, _parent2, _scopeId));
              _push2(`</button></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Admin | User Monitoring" }),
              createVNode("div", { class: "space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto" }, [
                createVNode("div", { class: "flex items-center justify-between pb-8 border-b border-slate-200 dark:border-slate-800" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight" }, "User Directory"),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium" }, "Real-time monitoring of all community members")
                  ]),
                  createVNode("div", { class: "px-6 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm" }, [
                    createVNode("span", { class: "text-xs font-bold text-slate-400 uppercase tracking-widest leading-none" }, "Total Connections: "),
                    createVNode("span", { class: "text-indigo-600 dark:text-indigo-400 font-black" }, toDisplayString(__props.users.length), 1)
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-6" }, [
                  createVNode("div", { class: "bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm" }, [
                    createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 italic" }, "Premium Users"),
                    createVNode("h3", { class: "text-3xl font-black text-indigo-600 dark:text-indigo-400 leading-none" }, toDisplayString(__props.users.filter((u) => u.is_premium).length), 1)
                  ])
                ]),
                createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mt-6" }, [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-left border-collapse" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "bg-slate-50/50 dark:bg-slate-900/50" }, [
                          createVNode("th", { class: "px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic" }, "User Profile"),
                          createVNode("th", { class: "px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic text-center" }, "Plan"),
                          createVNode("th", { class: "px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic text-center" }, "Auth Level"),
                          createVNode("th", { class: "px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic" }, "Registered"),
                          createVNode("th", { class: "px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic text-right" }, "Operations")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-slate-100 dark:divide-slate-700" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.users, (user) => {
                          return openBlock(), createBlock("tr", {
                            key: user.id,
                            class: "group hover:bg-slate-50/30 dark:hover:bg-slate-900/20 transition-all duration-300"
                          }, [
                            createVNode("td", { class: "px-8 py-6" }, [
                              createVNode("div", { class: "flex items-center gap-4" }, [
                                createVNode("img", {
                                  src: user.avatar_url,
                                  class: "w-10 h-10 rounded-xl object-cover border border-slate-100 dark:border-slate-700 shadow-sm"
                                }, null, 8, ["src"]),
                                createVNode("div", { class: "flex flex-col" }, [
                                  createVNode("span", { class: "text-slate-900 dark:text-white text-sm font-bold" }, toDisplayString(user.name), 1),
                                  createVNode("span", { class: "text-slate-400 text-[10px] font-medium leading-none mt-1" }, toDisplayString(user.email), 1)
                                ])
                              ])
                            ]),
                            createVNode("td", { class: "px-8 py-6 text-center" }, [
                              createVNode("button", {
                                onClick: ($event) => togglePremium(user),
                                class: ["px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all", user.is_premium ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400" : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"]
                              }, toDisplayString(user.is_premium ? "Elite Pro" : "Free Core"), 11, ["onClick"])
                            ]),
                            createVNode("td", { class: "px-8 py-6 text-center" }, [
                              createVNode("button", {
                                onClick: ($event) => toggleAdmin(user),
                                class: ["px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all", user.is_admin ? "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400" : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"]
                              }, toDisplayString(user.is_admin ? "Admin" : "Member"), 11, ["onClick"])
                            ]),
                            createVNode("td", { class: "px-8 py-6 text-xs font-bold text-slate-500 dark:text-slate-400 italic" }, toDisplayString(formatDate(user.created_at)), 1),
                            createVNode("td", { class: "px-8 py-6 text-right" }, [
                              createVNode("button", { class: "p-2 text-slate-300 hover:text-indigo-600 transition-colors" }, [
                                createVNode(_sfc_main$2, {
                                  name: "settings",
                                  size: "18"
                                })
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/User/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
