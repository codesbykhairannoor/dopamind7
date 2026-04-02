import { withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-CKmlSQrm.js";
import { _ as _sfc_main$2 } from "./OneForMindIcon-P6BN87YE.js";
import "./useAppearance-rDoGVD4_.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    posts: Array
  },
  setup(__props) {
    const formatDate = (dateString) => {
      if (!dateString) return "DRAFT";
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const deletePost = (post) => {
      if (confirm(`Yakin ingin menghapus postingan "${post.title}"?`)) {
        router.delete(route("admin.blog.destroy", post.id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Admin Dashboard | Content" }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700"${_scopeId}><div class="flex items-center justify-between pb-8 border-b border-slate-200 dark:border-slate-800"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none"${_scopeId}>Content Strategy</h1><p class="text-slate-500 dark:text-slate-400 text-sm mt-3 font-medium"${_scopeId}>Manage and monitor all blog transmissions</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.blog.create"),
              class: "bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-3 active:scale-95"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    name: "journal",
                    size: "16"
                  }, null, _parent3, _scopeId2));
                  _push3(` New Post `);
                } else {
                  return [
                    createVNode(_sfc_main$2, {
                      name: "journal",
                      size: "16"
                    }),
                    createTextVNode(" New Post ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-6"${_scopeId}><div class="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between group transition-all hover:border-indigo-500/20"${_scopeId}><div${_scopeId}><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-3 italic"${_scopeId}>Total Broadcasts</p><h3 class="text-4xl font-black text-slate-900 dark:text-white leading-none"${_scopeId}>${ssrInterpolate(__props.posts.length)}</h3></div><div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              name: "habit",
              size: "24"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left border-collapse"${_scopeId}><thead${_scopeId}><tr class="bg-slate-50 dark:bg-slate-900/50"${_scopeId}><th class="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400"${_scopeId}>Post Title</th><th class="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400"${_scopeId}>Category</th><th class="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center"${_scopeId}>Status</th><th class="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400"${_scopeId}>Published</th><th class="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right pr-10"${_scopeId}>Actions</th></tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.posts, (post) => {
              var _a;
              _push2(`<tr class="group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/20"${_scopeId}><td class="px-8 py-6"${_scopeId}><div class="flex flex-col"${_scopeId}><span class="text-slate-900 dark:text-white text-base font-bold"${_scopeId}>${ssrInterpolate(post.title)}</span><span class="text-slate-400 text-[10px] font-medium leading-none tracking-tight mt-1 opacity-60"${_scopeId}>ID: #${ssrInterpolate(post.id)} / ${ssrInterpolate(post.slug)}</span></div></td><td class="px-8 py-6"${_scopeId}><span class="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-[10px] font-bold uppercase italic tracking-widest"${_scopeId}>${ssrInterpolate(((_a = post.category) == null ? void 0 : _a.name) || "Standard")}</span></td><td class="px-8 py-6"${_scopeId}><div class="flex items-center justify-center"${_scopeId}>`);
              if (post.is_published) {
                _push2(`<div class="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-500/20"${_scopeId}><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"${_scopeId}></div><span class="text-[9px] font-bold uppercase tracking-wider"${_scopeId}>Live</span></div>`);
              } else {
                _push2(`<div class="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full border border-slate-200 dark:border-slate-700"${_scopeId}><div class="w-1.5 h-1.5 rounded-full bg-slate-400"${_scopeId}></div><span class="text-[9px] font-bold uppercase tracking-wider"${_scopeId}>Draft</span></div>`);
              }
              _push2(`</div></td><td class="px-8 py-6"${_scopeId}><span class="text-slate-500 dark:text-slate-400 text-xs font-bold leading-none"${_scopeId}>${ssrInterpolate(formatDate(post.published_at))}</span></td><td class="px-8 py-6 text-right pr-8"${_scopeId}><div class="flex items-center justify-end gap-2 group-hover:translate-x-0 transition-transform"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin.blog.edit", post.id),
                class: "p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all",
                title: "Edit Task"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$2, {
                      name: "habit",
                      size: "18"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$2, {
                        name: "habit",
                        size: "18"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all" title="Delete Task"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                name: "logout",
                size: "18"
              }, null, _parent2, _scopeId));
              _push2(`</button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.posts.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="py-24 text-center"${_scopeId}><div class="flex flex-col items-center gap-3"${_scopeId}><div class="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                name: "sparkles",
                size: "32"
              }, null, _parent2, _scopeId));
              _push2(`</div><p class="text-slate-400 text-sm font-medium"${_scopeId}>No posts found in the system</p></div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Admin Dashboard | Content" }),
              createVNode("div", { class: "space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700" }, [
                createVNode("div", { class: "flex items-center justify-between pb-8 border-b border-slate-200 dark:border-slate-800" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none" }, "Content Strategy"),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400 text-sm mt-3 font-medium" }, "Manage and monitor all blog transmissions")
                  ]),
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.blog.create"),
                    class: "bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-3 active:scale-95"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, {
                        name: "journal",
                        size: "16"
                      }),
                      createTextVNode(" New Post ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6 py-6" }, [
                  createVNode("div", { class: "bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between group transition-all hover:border-indigo-500/20" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-3 italic" }, "Total Broadcasts"),
                      createVNode("h3", { class: "text-4xl font-black text-slate-900 dark:text-white leading-none" }, toDisplayString(__props.posts.length), 1)
                    ]),
                    createVNode("div", { class: "w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" }, [
                      createVNode(_sfc_main$2, {
                        name: "habit",
                        size: "24"
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden" }, [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-left border-collapse" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "bg-slate-50 dark:bg-slate-900/50" }, [
                          createVNode("th", { class: "px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400" }, "Post Title"),
                          createVNode("th", { class: "px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400" }, "Category"),
                          createVNode("th", { class: "px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center" }, "Status"),
                          createVNode("th", { class: "px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400" }, "Published"),
                          createVNode("th", { class: "px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right pr-10" }, "Actions")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-slate-100 dark:divide-slate-700" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.posts, (post) => {
                          var _a;
                          return openBlock(), createBlock("tr", {
                            key: post.id,
                            class: "group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/20"
                          }, [
                            createVNode("td", { class: "px-8 py-6" }, [
                              createVNode("div", { class: "flex flex-col" }, [
                                createVNode("span", { class: "text-slate-900 dark:text-white text-base font-bold" }, toDisplayString(post.title), 1),
                                createVNode("span", { class: "text-slate-400 text-[10px] font-medium leading-none tracking-tight mt-1 opacity-60" }, "ID: #" + toDisplayString(post.id) + " / " + toDisplayString(post.slug), 1)
                              ])
                            ]),
                            createVNode("td", { class: "px-8 py-6" }, [
                              createVNode("span", { class: "px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-[10px] font-bold uppercase italic tracking-widest" }, toDisplayString(((_a = post.category) == null ? void 0 : _a.name) || "Standard"), 1)
                            ]),
                            createVNode("td", { class: "px-8 py-6" }, [
                              createVNode("div", { class: "flex items-center justify-center" }, [
                                post.is_published ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-500/20"
                                }, [
                                  createVNode("div", { class: "w-1.5 h-1.5 rounded-full bg-emerald-500" }),
                                  createVNode("span", { class: "text-[9px] font-bold uppercase tracking-wider" }, "Live")
                                ])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full border border-slate-200 dark:border-slate-700"
                                }, [
                                  createVNode("div", { class: "w-1.5 h-1.5 rounded-full bg-slate-400" }),
                                  createVNode("span", { class: "text-[9px] font-bold uppercase tracking-wider" }, "Draft")
                                ]))
                              ])
                            ]),
                            createVNode("td", { class: "px-8 py-6" }, [
                              createVNode("span", { class: "text-slate-500 dark:text-slate-400 text-xs font-bold leading-none" }, toDisplayString(formatDate(post.published_at)), 1)
                            ]),
                            createVNode("td", { class: "px-8 py-6 text-right pr-8" }, [
                              createVNode("div", { class: "flex items-center justify-end gap-2 group-hover:translate-x-0 transition-transform" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin.blog.edit", post.id),
                                  class: "p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all",
                                  title: "Edit Task"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$2, {
                                      name: "habit",
                                      size: "18"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => deletePost(post),
                                  class: "p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all",
                                  title: "Delete Task"
                                }, [
                                  createVNode(_sfc_main$2, {
                                    name: "logout",
                                    size: "18"
                                  })
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128)),
                        __props.posts.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "py-24 text-center"
                          }, [
                            createVNode("div", { class: "flex flex-col items-center gap-3" }, [
                              createVNode("div", { class: "w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300" }, [
                                createVNode(_sfc_main$2, {
                                  name: "sparkles",
                                  size: "32"
                                })
                              ]),
                              createVNode("p", { class: "text-slate-400 text-sm font-medium" }, "No posts found in the system")
                            ])
                          ])
                        ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Blog/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
