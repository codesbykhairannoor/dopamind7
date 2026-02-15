import { unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./GuestLayout-DzhHOkcN.js";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manifesto & Filosofi" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto overflow-hidden"${_scopeId}><div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700"${_scopeId}>${ssrInterpolate(_ctx.$t("about_badge"))}</div><h1 class="text-5xl md:text-7xl font-black mb-6 text-gray-900 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both"${_scopeId}>${ssrInterpolate(_ctx.$t("about_title_1"))} <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500"${_scopeId}>${ssrInterpolate(_ctx.$t("about_title_2"))}</span></h1><p class="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both"${_scopeId}>${ssrInterpolate(_ctx.$t("about_desc"))}</p></div><div class="max-w-6xl mx-auto px-6 pb-24 space-y-24 overflow-hidden"${_scopeId}><div class="grid md:grid-cols-2 gap-12 items-center"${_scopeId}><div class="order-2 md:order-1 animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both"${_scopeId}><h2 class="text-3xl font-black mb-6 text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("story_1_title"))}</h2><p class="text-gray-500 text-lg leading-relaxed mb-6"${_scopeId}>${ssrInterpolate(_ctx.$t("story_1_p1"))}</p><p class="text-gray-500 text-lg leading-relaxed mb-6"${_scopeId}><strong${_scopeId}>${ssrInterpolate(_ctx.$t("story_1_p2"))}</strong></p><div class="flex gap-4 mt-8"${_scopeId}><div class="bg-red-50 p-4 rounded-2xl w-full text-center border border-red-100 hover:-translate-y-1 transition duration-300"${_scopeId}><div class="text-2xl mb-2"${_scopeId}>🤯</div><div class="font-bold text-red-800 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("story_1_card_1"))}</div></div><div class="bg-orange-50 p-4 rounded-2xl w-full text-center border border-orange-100 hover:-translate-y-1 transition duration-300 delay-75"${_scopeId}><div class="text-2xl mb-2"${_scopeId}>🔔</div><div class="font-bold text-orange-800 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("story_1_card_2"))}</div></div></div></div><div class="order-1 md:order-2 relative h-96 bg-gray-100 rounded-[3rem] overflow-hidden flex items-center justify-center animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both"${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 opacity-50"${_scopeId}></div><div class="relative z-10 text-center transform rotate-3 transition hover:rotate-0 duration-500"${_scopeId}><div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs mx-auto animate-pulse duration-[4000ms]"${_scopeId}><div class="flex justify-between text-xs text-gray-500 mb-4 font-bold tracking-widest uppercase"${_scopeId}>My To-Do List</div><div class="space-y-3"${_scopeId}><div class="h-3 bg-red-200 rounded w-full"${_scopeId}></div><div class="h-3 bg-red-200 rounded w-3/4"${_scopeId}></div><div class="h-3 bg-red-200 rounded w-5/6"${_scopeId}></div></div><div class="mt-4 text-red-500 font-bold text-sm"${_scopeId}>⚠️ Overdue (99+)</div></div></div></div></div><div class="grid md:grid-cols-2 gap-12 items-center"${_scopeId}><div class="relative h-96 bg-gray-100 rounded-[3rem] overflow-hidden flex items-center justify-center animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both"${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-100 opacity-50"${_scopeId}></div><div class="text-9xl relative z-10 animate-bounce duration-[3000ms]"${_scopeId}>🧘‍♂️</div></div><div class="animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both"${_scopeId}><h2 class="text-3xl font-black mb-6 text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("story_2_title"))}</h2><p class="text-gray-500 text-lg leading-relaxed mb-6"${_scopeId}>${ssrInterpolate(_ctx.$t("story_2_p1"))}</p><div class="border-l-4 border-indigo-600 pl-6 py-4 bg-indigo-50/50 rounded-r-xl mb-6"${_scopeId}><p class="text-indigo-900 font-bold italic text-lg"${_scopeId}>&quot;${ssrInterpolate(_ctx.$t("story_2_quote"))}&quot;</p></div><p class="text-gray-500 text-lg leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("story_2_p2"))}</p></div></div></div><div class="bg-indigo-950 text-white py-24 rounded-t-[3rem] md:rounded-[3rem] md:mx-6 mb-24 relative overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-100 fill-mode-both"${_scopeId}><div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-30 -mr-20 -mt-20 animate-pulse duration-[5000ms]"${_scopeId}></div><div class="max-w-6xl mx-auto px-6 relative z-10"${_scopeId}><div class="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both"${_scopeId}><h2 class="text-indigo-400 font-bold tracking-widest uppercase mb-2 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("manifesto_badge"))}</h2><h3 class="text-4xl md:text-5xl font-black"${_scopeId}>${ssrInterpolate(_ctx.$t("manifesto_title"))}</h3></div><div class="grid md:grid-cols-3 gap-8"${_scopeId}><div class="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-indigo-500 hover:bg-white/10 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both"${_scopeId}><div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 transition"${_scopeId}>🛡️</div><h4 class="text-xl font-bold mb-3"${_scopeId}>${ssrInterpolate(_ctx.$t("manifesto_1_title"))}</h4><p class="text-indigo-200 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("manifesto_1_desc"))}</p></div><div class="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-indigo-500 hover:bg-white/10 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 fill-mode-both"${_scopeId}><div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 transition"${_scopeId}>🔄</div><h4 class="text-xl font-bold mb-3"${_scopeId}>${ssrInterpolate(_ctx.$t("manifesto_2_title"))}</h4><p class="text-indigo-200 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("manifesto_2_desc"))}</p></div><div class="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-indigo-500 hover:bg-white/10 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both"${_scopeId}><div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 transition"${_scopeId}>🌱</div><h4 class="text-xl font-bold mb-3"${_scopeId}>${ssrInterpolate(_ctx.$t("manifesto_3_title"))}</h4><p class="text-indigo-200 leading-relaxed"${_scopeId}>${ssrInterpolate(_ctx.$t("manifesto_3_desc"))}</p></div></div></div></div><div class="max-w-6xl mx-auto px-6 pb-32 pt-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both"${_scopeId}><h2 class="text-3xl md:text-4xl font-black mb-16 text-center text-indigo-950"${_scopeId}>${ssrInterpolate(_ctx.$t("team_title"))}</h2><div class="grid md:grid-cols-2 gap-8"${_scopeId}><div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-2 transition duration-300 group relative overflow-hidden"${_scopeId}><div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-indigo-100 transition"${_scopeId}></div><div class="relative z-10"${_scopeId}><div class="flex items-center gap-4 mb-6"${_scopeId}><div class="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm"${_scopeId}> 👨‍💻 </div><div${_scopeId}><h3 class="text-xl font-bold text-indigo-950"${_scopeId}>${ssrInterpolate(_ctx.$t("dev_name"))}</h3><span class="text-xs font-bold tracking-wider text-indigo-500 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100"${_scopeId}>${ssrInterpolate(_ctx.$t("dev_role"))}</span></div></div><p class="text-slate-600 leading-relaxed text-lg"${_scopeId}> &quot;${ssrInterpolate(_ctx.$t("dev_desc"))}&quot; </p></div></div><div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-100 hover:-translate-y-2 transition duration-300 group relative overflow-hidden"${_scopeId}><div class="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-100 transition"${_scopeId}></div><div class="relative z-10"${_scopeId}><div class="flex items-center gap-4 mb-6"${_scopeId}><div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm"${_scopeId}> 🚀 </div><div${_scopeId}><h3 class="text-xl font-bold text-indigo-950"${_scopeId}>${ssrInterpolate(_ctx.$t("user_name"))}</h3><span class="text-xs font-bold tracking-wider text-purple-500 uppercase bg-purple-50 px-3 py-1 rounded-full border border-purple-100"${_scopeId}>${ssrInterpolate(_ctx.$t("user_role"))}</span></div></div><p class="text-slate-600 leading-relaxed text-lg"${_scopeId}> &quot;${ssrInterpolate(_ctx.$t("user_desc"))}&quot; </p></div></div></div><div class="mt-12 text-center"${_scopeId}><p class="text-slate-400 text-sm font-medium"${_scopeId}>${ssrInterpolate(_ctx.$t("team_connect"))} <a href="#" class="text-indigo-600 hover:text-indigo-800 underline decoration-indigo-200 hover:decoration-indigo-600 transition underline-offset-4"${_scopeId}> Say Hi on Twitter/X </a></p></div></div><div class="bg-indigo-50 border-t border-indigo-100 py-24 text-center overflow-hidden"${_scopeId}><div class="max-w-3xl mx-auto px-6 animate-in zoom-in-95 fade-in duration-700 delay-100 fill-mode-both"${_scopeId}><h2 class="text-4xl font-black mb-6 text-indigo-900"${_scopeId}>${ssrInterpolate(_ctx.$t("cta_about_title"))}</h2><p class="text-xl text-indigo-700/70 mb-10"${_scopeId}>${ssrInterpolate(_ctx.$t("cta_about_desc"))}</p><div class="flex justify-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("cta_about_btn"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("cta_about_btn")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><p class="mt-6 text-sm text-indigo-400"${_scopeId}>${ssrInterpolate(_ctx.$t("cta_about_sub"))}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "pt-32 pb-20 px-6 text-center max-w-4xl mx-auto overflow-hidden" }, [
                createVNode("div", { class: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700" }, toDisplayString(_ctx.$t("about_badge")), 1),
                createVNode("h1", { class: "text-5xl md:text-7xl font-black mb-6 text-gray-900 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both" }, [
                  createTextVNode(toDisplayString(_ctx.$t("about_title_1")) + " ", 1),
                  createVNode("span", { class: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500" }, toDisplayString(_ctx.$t("about_title_2")), 1)
                ]),
                createVNode("p", { class: "text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both" }, toDisplayString(_ctx.$t("about_desc")), 1)
              ]),
              createVNode("div", { class: "max-w-6xl mx-auto px-6 pb-24 space-y-24 overflow-hidden" }, [
                createVNode("div", { class: "grid md:grid-cols-2 gap-12 items-center" }, [
                  createVNode("div", { class: "order-2 md:order-1 animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both" }, [
                    createVNode("h2", { class: "text-3xl font-black mb-6 text-gray-900" }, toDisplayString(_ctx.$t("story_1_title")), 1),
                    createVNode("p", { class: "text-gray-500 text-lg leading-relaxed mb-6" }, toDisplayString(_ctx.$t("story_1_p1")), 1),
                    createVNode("p", { class: "text-gray-500 text-lg leading-relaxed mb-6" }, [
                      createVNode("strong", null, toDisplayString(_ctx.$t("story_1_p2")), 1)
                    ]),
                    createVNode("div", { class: "flex gap-4 mt-8" }, [
                      createVNode("div", { class: "bg-red-50 p-4 rounded-2xl w-full text-center border border-red-100 hover:-translate-y-1 transition duration-300" }, [
                        createVNode("div", { class: "text-2xl mb-2" }, "🤯"),
                        createVNode("div", { class: "font-bold text-red-800 text-sm" }, toDisplayString(_ctx.$t("story_1_card_1")), 1)
                      ]),
                      createVNode("div", { class: "bg-orange-50 p-4 rounded-2xl w-full text-center border border-orange-100 hover:-translate-y-1 transition duration-300 delay-75" }, [
                        createVNode("div", { class: "text-2xl mb-2" }, "🔔"),
                        createVNode("div", { class: "font-bold text-orange-800 text-sm" }, toDisplayString(_ctx.$t("story_1_card_2")), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "order-1 md:order-2 relative h-96 bg-gray-100 rounded-[3rem] overflow-hidden flex items-center justify-center animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both" }, [
                    createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 opacity-50" }),
                    createVNode("div", { class: "relative z-10 text-center transform rotate-3 transition hover:rotate-0 duration-500" }, [
                      createVNode("div", { class: "bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs mx-auto animate-pulse duration-[4000ms]" }, [
                        createVNode("div", { class: "flex justify-between text-xs text-gray-500 mb-4 font-bold tracking-widest uppercase" }, "My To-Do List"),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("div", { class: "h-3 bg-red-200 rounded w-full" }),
                          createVNode("div", { class: "h-3 bg-red-200 rounded w-3/4" }),
                          createVNode("div", { class: "h-3 bg-red-200 rounded w-5/6" })
                        ]),
                        createVNode("div", { class: "mt-4 text-red-500 font-bold text-sm" }, "⚠️ Overdue (99+)")
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid md:grid-cols-2 gap-12 items-center" }, [
                  createVNode("div", { class: "relative h-96 bg-gray-100 rounded-[3rem] overflow-hidden flex items-center justify-center animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both" }, [
                    createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-100 opacity-50" }),
                    createVNode("div", { class: "text-9xl relative z-10 animate-bounce duration-[3000ms]" }, "🧘‍♂️")
                  ]),
                  createVNode("div", { class: "animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both" }, [
                    createVNode("h2", { class: "text-3xl font-black mb-6 text-gray-900" }, toDisplayString(_ctx.$t("story_2_title")), 1),
                    createVNode("p", { class: "text-gray-500 text-lg leading-relaxed mb-6" }, toDisplayString(_ctx.$t("story_2_p1")), 1),
                    createVNode("div", { class: "border-l-4 border-indigo-600 pl-6 py-4 bg-indigo-50/50 rounded-r-xl mb-6" }, [
                      createVNode("p", { class: "text-indigo-900 font-bold italic text-lg" }, '"' + toDisplayString(_ctx.$t("story_2_quote")) + '"', 1)
                    ]),
                    createVNode("p", { class: "text-gray-500 text-lg leading-relaxed" }, toDisplayString(_ctx.$t("story_2_p2")), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "bg-indigo-950 text-white py-24 rounded-t-[3rem] md:rounded-[3rem] md:mx-6 mb-24 relative overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-100 fill-mode-both" }, [
                createVNode("div", { class: "absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-30 -mr-20 -mt-20 animate-pulse duration-[5000ms]" }),
                createVNode("div", { class: "max-w-6xl mx-auto px-6 relative z-10" }, [
                  createVNode("div", { class: "text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both" }, [
                    createVNode("h2", { class: "text-indigo-400 font-bold tracking-widest uppercase mb-2 text-sm" }, toDisplayString(_ctx.$t("manifesto_badge")), 1),
                    createVNode("h3", { class: "text-4xl md:text-5xl font-black" }, toDisplayString(_ctx.$t("manifesto_title")), 1)
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-3 gap-8" }, [
                    createVNode("div", { class: "bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-indigo-500 hover:bg-white/10 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both" }, [
                      createVNode("div", { class: "w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 transition" }, "🛡️"),
                      createVNode("h4", { class: "text-xl font-bold mb-3" }, toDisplayString(_ctx.$t("manifesto_1_title")), 1),
                      createVNode("p", { class: "text-indigo-200 leading-relaxed" }, toDisplayString(_ctx.$t("manifesto_1_desc")), 1)
                    ]),
                    createVNode("div", { class: "bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-indigo-500 hover:bg-white/10 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 fill-mode-both" }, [
                      createVNode("div", { class: "w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 transition" }, "🔄"),
                      createVNode("h4", { class: "text-xl font-bold mb-3" }, toDisplayString(_ctx.$t("manifesto_2_title")), 1),
                      createVNode("p", { class: "text-indigo-200 leading-relaxed" }, toDisplayString(_ctx.$t("manifesto_2_desc")), 1)
                    ]),
                    createVNode("div", { class: "bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-indigo-500 hover:bg-white/10 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both" }, [
                      createVNode("div", { class: "w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 transition" }, "🌱"),
                      createVNode("h4", { class: "text-xl font-bold mb-3" }, toDisplayString(_ctx.$t("manifesto_3_title")), 1),
                      createVNode("p", { class: "text-indigo-200 leading-relaxed" }, toDisplayString(_ctx.$t("manifesto_3_desc")), 1)
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "max-w-6xl mx-auto px-6 pb-32 pt-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both" }, [
                createVNode("h2", { class: "text-3xl md:text-4xl font-black mb-16 text-center text-indigo-950" }, toDisplayString(_ctx.$t("team_title")), 1),
                createVNode("div", { class: "grid md:grid-cols-2 gap-8" }, [
                  createVNode("div", { class: "bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-2 transition duration-300 group relative overflow-hidden" }, [
                    createVNode("div", { class: "absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-indigo-100 transition" }),
                    createVNode("div", { class: "relative z-10" }, [
                      createVNode("div", { class: "flex items-center gap-4 mb-6" }, [
                        createVNode("div", { class: "w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm" }, " 👨‍💻 "),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-xl font-bold text-indigo-950" }, toDisplayString(_ctx.$t("dev_name")), 1),
                          createVNode("span", { class: "text-xs font-bold tracking-wider text-indigo-500 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100" }, toDisplayString(_ctx.$t("dev_role")), 1)
                        ])
                      ]),
                      createVNode("p", { class: "text-slate-600 leading-relaxed text-lg" }, ' "' + toDisplayString(_ctx.$t("dev_desc")) + '" ', 1)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-100 hover:-translate-y-2 transition duration-300 group relative overflow-hidden" }, [
                    createVNode("div", { class: "absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-100 transition" }),
                    createVNode("div", { class: "relative z-10" }, [
                      createVNode("div", { class: "flex items-center gap-4 mb-6" }, [
                        createVNode("div", { class: "w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm" }, " 🚀 "),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-xl font-bold text-indigo-950" }, toDisplayString(_ctx.$t("user_name")), 1),
                          createVNode("span", { class: "text-xs font-bold tracking-wider text-purple-500 uppercase bg-purple-50 px-3 py-1 rounded-full border border-purple-100" }, toDisplayString(_ctx.$t("user_role")), 1)
                        ])
                      ]),
                      createVNode("p", { class: "text-slate-600 leading-relaxed text-lg" }, ' "' + toDisplayString(_ctx.$t("user_desc")) + '" ', 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "mt-12 text-center" }, [
                  createVNode("p", { class: "text-slate-400 text-sm font-medium" }, [
                    createTextVNode(toDisplayString(_ctx.$t("team_connect")) + " ", 1),
                    createVNode("a", {
                      href: "#",
                      class: "text-indigo-600 hover:text-indigo-800 underline decoration-indigo-200 hover:decoration-indigo-600 transition underline-offset-4"
                    }, " Say Hi on Twitter/X ")
                  ])
                ])
              ]),
              createVNode("div", { class: "bg-indigo-50 border-t border-indigo-100 py-24 text-center overflow-hidden" }, [
                createVNode("div", { class: "max-w-3xl mx-auto px-6 animate-in zoom-in-95 fade-in duration-700 delay-100 fill-mode-both" }, [
                  createVNode("h2", { class: "text-4xl font-black mb-6 text-indigo-900" }, toDisplayString(_ctx.$t("cta_about_title")), 1),
                  createVNode("p", { class: "text-xl text-indigo-700/70 mb-10" }, toDisplayString(_ctx.$t("cta_about_desc")), 1),
                  createVNode("div", { class: "flex justify-center gap-4" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("register"),
                      class: "bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("cta_about_btn")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("p", { class: "mt-6 text-sm text-indigo-400" }, toDisplayString(_ctx.$t("cta_about_sub")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
