import { ref, onMounted, withCtx, unref, createTextVNode, createVNode, toDisplayString, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-CR7A3CPQ.js";
import { _ as _sfc_main$2 } from "./OneForMindIcon-XdjRmiFl.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useAppearance-rDoGVD4_.js";
const _sfc_main = {
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    post: Object,
    categories: Array
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const props = __props;
    const isEditing = !!props.post;
    const form = useForm({
      title: ((_a = props.post) == null ? void 0 : _a.title) || "",
      content: ((_b = props.post) == null ? void 0 : _b.content) || "",
      category_id: ((_c = props.post) == null ? void 0 : _c.category_id) || (((_e = (_d = props.categories) == null ? void 0 : _d[0]) == null ? void 0 : _e.id) || ""),
      excerpt: ((_f = props.post) == null ? void 0 : _f.excerpt) || "",
      is_published: ((_g = props.post) == null ? void 0 : _g.is_published) || false,
      featured_image: null,
      meta_title: ((_h = props.post) == null ? void 0 : _h.meta_title) || "",
      meta_description: ((_i = props.post) == null ? void 0 : _i.meta_description) || ""
    });
    const previewUrl = ref(((_j = props.post) == null ? void 0 : _j.featured_image_url) || null);
    const onFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        form.featured_image = file;
        previewUrl.value = URL.createObjectURL(file);
      }
    };
    const submit = () => {
      if (isEditing) {
        form.post(route("admin.blog.update", props.post.id), {
          forceFormData: true,
          _method: "PATCH",
          // Manual spoofing is safer for file uploads in Inertia
          onSuccess: () => {
          }
        });
      } else {
        form.post(route("admin.blog.store"), {
          forceFormData: true
        });
      }
    };
    onMounted(() => {
      var _a2, _b2;
      if (!form.category_id && ((_a2 = props.categories) == null ? void 0 : _a2.length)) {
        form.category_id = props.categories[0].id;
      }
      if ((_b2 = props.post) == null ? void 0 : _b2.featured_image_url) {
        previewUrl.value = props.post.featured_image_url;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: isEditing ? "Edit Post | Admin" : "New Post | Admin"
            }, null, _parent2, _scopeId));
            _push2(`<div class="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700" data-v-76360a8d${_scopeId}><div class="flex items-center justify-between pb-8 border-b border-slate-200 dark:border-slate-800" data-v-76360a8d${_scopeId}><div data-v-76360a8d${_scopeId}><h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight" data-v-76360a8d${_scopeId}>${ssrInterpolate(isEditing ? "Edit Knowledge Transmission" : "Draft New Stream")}</h2><p class="text-slate-500 dark:text-slate-400 text-sm mt-3 font-medium italic" data-v-76360a8d${_scopeId}>Configure content parameters for global broadcast</p></div><div class="flex gap-3" data-v-76360a8d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.blog.index"),
              class: "px-6 py-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:bg-slate-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-100 dark:shadow-none flex items-center gap-2 active:scale-95" data-v-76360a8d${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              name: "sparkles",
              size: "14"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(isEditing ? "Push Changes" : "Publish Stream")}</button></div></div><div class="grid grid-cols-12 gap-8" data-v-76360a8d${_scopeId}><div class="col-span-12 lg:col-span-8 space-y-6" data-v-76360a8d${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden p-10 space-y-8" data-v-76360a8d${_scopeId}><div class="space-y-3" data-v-76360a8d${_scopeId}><label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1 italic" data-v-76360a8d${_scopeId}>Headline Title</label><input${ssrRenderAttr("value", unref(form).title)} type="text" placeholder="Post title..." class="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-5 text-slate-900 dark:text-white text-xl font-bold focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all" required data-v-76360a8d${_scopeId}>`);
            if (unref(form).errors.title) {
              _push2(`<div class="text-rose-500 text-[10px] font-bold uppercase mt-1" data-v-76360a8d${_scopeId}>${ssrInterpolate(unref(form).errors.title)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-3" data-v-76360a8d${_scopeId}><label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1 italic" data-v-76360a8d${_scopeId}>Content Engine (Markdown Enabled)</label><textarea rows="18" placeholder="Begin writing..." class="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-8 text-slate-700 dark:text-slate-300 font-medium leading-relaxed focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all custom-scrollbar" required data-v-76360a8d${_scopeId}>${ssrInterpolate(unref(form).content)}</textarea>`);
            if (unref(form).errors.content) {
              _push2(`<div class="text-rose-500 text-[10px] font-bold uppercase mt-1" data-v-76360a8d${_scopeId}>${ssrInterpolate(unref(form).errors.content)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="col-span-12 lg:col-span-4 space-y-6" data-v-76360a8d${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 space-y-6" data-v-76360a8d${_scopeId}><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700/50 pb-4 italic" data-v-76360a8d${_scopeId}>Featured Media</h4><div class="relative group" data-v-76360a8d${_scopeId}><div class="aspect-video bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col items-center justify-center transition-all group-hover:border-indigo-500/30" data-v-76360a8d${_scopeId}>`);
            if (previewUrl.value) {
              _push2(`<img${ssrRenderAttr("src", previewUrl.value)} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-v-76360a8d${_scopeId}>`);
            } else {
              _push2(`<div class="flex flex-col items-center gap-3 text-slate-400" data-v-76360a8d${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                name: "plus",
                size: "32",
                class: "opacity-20"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-[10px] font-bold uppercase tracking-widest italic" data-v-76360a8d${_scopeId}>No Image Payload</span></div>`);
            }
            _push2(`<div class="absolute inset-0 bg-indigo-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" data-v-76360a8d${_scopeId}><span class="text-white text-[10px] font-black uppercase tracking-widest" data-v-76360a8d${_scopeId}>Update Transmission Image</span></div></div><input type="file" class="hidden" accept="image/*" data-v-76360a8d${_scopeId}>`);
            if (unref(form).errors.featured_image) {
              _push2(`<div class="text-rose-500 text-[10px] font-bold uppercase mt-2 italic text-center" data-v-76360a8d${_scopeId}>${ssrInterpolate(unref(form).errors.featured_image)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 space-y-6" data-v-76360a8d${_scopeId}><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700/50 pb-4 italic" data-v-76360a8d${_scopeId}>Publish Parameters</h4><div class="space-y-3" data-v-76360a8d${_scopeId}><label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic block" data-v-76360a8d${_scopeId}>Category Classification</label><select class="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-xl p-4 text-slate-700 dark:text-slate-300 text-xs font-bold focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all uppercase tracking-wider" data-v-76360a8d${_scopeId}><!--[-->`);
            ssrRenderList(__props.categories, (cat) => {
              _push2(`<option${ssrRenderAttr("value", cat.id)} data-v-76360a8d${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, cat.id) : ssrLooseEqual(unref(form).category_id, cat.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(cat.name)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="space-y-3 pt-2" data-v-76360a8d${_scopeId}><div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700/50" data-v-76360a8d${_scopeId}><span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic" data-v-76360a8d${_scopeId}>Visibilty: Live</span><button type="button" class="${ssrRenderClass([unref(form).is_published ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700", "w-12 h-6 rounded-full relative transition-all duration-300"])}" data-v-76360a8d${_scopeId}><div class="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md" style="${ssrRenderStyle(unref(form).is_published ? "left: calc(100% - 1.25rem)" : "left: 0.25rem")}" data-v-76360a8d${_scopeId}></div></button></div></div></div><div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 space-y-6" data-v-76360a8d${_scopeId}><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700/50 pb-4 italic" data-v-76360a8d${_scopeId}>SEO Optimization</h4><div class="space-y-2" data-v-76360a8d${_scopeId}><label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic block" data-v-76360a8d${_scopeId}>Meta Header</label><input${ssrRenderAttr("value", unref(form).meta_title)} type="text" placeholder="Title for Search Engines..." class="w-full bg-slate-50 dark:bg-slate-900 border border-transparent rounded-xl p-4 text-slate-700 dark:text-slate-300 text-xs font-medium focus:border-indigo-500/20 transition-all shadow-inner" data-v-76360a8d${_scopeId}></div><div class="space-y-2" data-v-76360a8d${_scopeId}><label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic block" data-v-76360a8d${_scopeId}>Neural Excerpt</label><textarea rows="2" placeholder="Brief summary for indexing..." class="w-full bg-slate-50 dark:bg-slate-900 border border-transparent rounded-xl p-4 text-slate-700 dark:text-slate-300 text-xs font-medium focus:border-indigo-500/20 transition-all shadow-inner" data-v-76360a8d${_scopeId}>${ssrInterpolate(unref(form).excerpt)}</textarea></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: isEditing ? "Edit Post | Admin" : "New Post | Admin"
              }, null, 8, ["title"]),
              createVNode("div", { class: "max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700" }, [
                createVNode("div", { class: "flex items-center justify-between pb-8 border-b border-slate-200 dark:border-slate-800" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight" }, toDisplayString(isEditing ? "Edit Knowledge Transmission" : "Draft New Stream"), 1),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400 text-sm mt-3 font-medium italic" }, "Configure content parameters for global broadcast")
                  ]),
                  createVNode("div", { class: "flex gap-3" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin.blog.index"),
                      class: "px-6 py-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:bg-slate-50"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cancel ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("button", {
                      onClick: submit,
                      class: "bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-100 dark:shadow-none flex items-center gap-2 active:scale-95"
                    }, [
                      createVNode(_sfc_main$2, {
                        name: "sparkles",
                        size: "14"
                      }),
                      createTextVNode(" " + toDisplayString(isEditing ? "Push Changes" : "Publish Stream"), 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-12 gap-8" }, [
                  createVNode("div", { class: "col-span-12 lg:col-span-8 space-y-6" }, [
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden p-10 space-y-8" }, [
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("label", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1 italic" }, "Headline Title"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          type: "text",
                          placeholder: "Post title...",
                          class: "w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-5 text-slate-900 dark:text-white text-xl font-bold focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).title]
                        ]),
                        unref(form).errors.title ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-rose-500 text-[10px] font-bold uppercase mt-1"
                        }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("label", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1 italic" }, "Content Engine (Markdown Enabled)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).content = $event,
                          rows: "18",
                          placeholder: "Begin writing...",
                          class: "w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-8 text-slate-700 dark:text-slate-300 font-medium leading-relaxed focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all custom-scrollbar",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).content]
                        ]),
                        unref(form).errors.content ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-rose-500 text-[10px] font-bold uppercase mt-1"
                        }, toDisplayString(unref(form).errors.content), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-span-12 lg:col-span-4 space-y-6" }, [
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 space-y-6" }, [
                      createVNode("h4", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700/50 pb-4 italic" }, "Featured Media"),
                      createVNode("div", { class: "relative group" }, [
                        createVNode("div", { class: "aspect-video bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col items-center justify-center transition-all group-hover:border-indigo-500/30" }, [
                          previewUrl.value ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: previewUrl.value,
                            class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex flex-col items-center gap-3 text-slate-400"
                          }, [
                            createVNode(_sfc_main$2, {
                              name: "plus",
                              size: "32",
                              class: "opacity-20"
                            }),
                            createVNode("span", { class: "text-[10px] font-bold uppercase tracking-widest italic" }, "No Image Payload")
                          ])),
                          createVNode("div", {
                            class: "absolute inset-0 bg-indigo-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer",
                            onClick: ($event) => _ctx.$refs.fileInput.click()
                          }, [
                            createVNode("span", { class: "text-white text-[10px] font-black uppercase tracking-widest" }, "Update Transmission Image")
                          ], 8, ["onClick"])
                        ]),
                        createVNode("input", {
                          ref: "fileInput",
                          type: "file",
                          class: "hidden",
                          onChange: onFileChange,
                          accept: "image/*"
                        }, null, 544),
                        unref(form).errors.featured_image ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-rose-500 text-[10px] font-bold uppercase mt-2 italic text-center"
                        }, toDisplayString(unref(form).errors.featured_image), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 space-y-6" }, [
                      createVNode("h4", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700/50 pb-4 italic" }, "Publish Parameters"),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("label", { class: "text-[10px] font-bold text-slate-500 uppercase tracking-widest italic block" }, "Category Classification"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).category_id = $event,
                          class: "w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-xl p-4 text-slate-700 dark:text-slate-300 text-xs font-bold focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all uppercase tracking-wider"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                            return openBlock(), createBlock("option", {
                              key: cat.id,
                              value: cat.id
                            }, toDisplayString(cat.name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).category_id]
                        ])
                      ]),
                      createVNode("div", { class: "space-y-3 pt-2" }, [
                        createVNode("div", { class: "flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700/50" }, [
                          createVNode("span", { class: "text-[10px] font-bold text-slate-500 uppercase tracking-widest italic" }, "Visibilty: Live"),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => unref(form).is_published = !unref(form).is_published,
                            class: ["w-12 h-6 rounded-full relative transition-all duration-300", unref(form).is_published ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"]
                          }, [
                            createVNode("div", {
                              class: "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md",
                              style: unref(form).is_published ? "left: calc(100% - 1.25rem)" : "left: 0.25rem"
                            }, null, 4)
                          ], 10, ["onClick"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 space-y-6" }, [
                      createVNode("h4", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700/50 pb-4 italic" }, "SEO Optimization"),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", { class: "text-[10px] font-bold text-slate-500 uppercase tracking-widest italic block" }, "Meta Header"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).meta_title = $event,
                          type: "text",
                          placeholder: "Title for Search Engines...",
                          class: "w-full bg-slate-50 dark:bg-slate-900 border border-transparent rounded-xl p-4 text-slate-700 dark:text-slate-300 text-xs font-medium focus:border-indigo-500/20 transition-all shadow-inner"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).meta_title]
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", { class: "text-[10px] font-bold text-slate-500 uppercase tracking-widest italic block" }, "Neural Excerpt"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).excerpt = $event,
                          rows: "2",
                          placeholder: "Brief summary for indexing...",
                          class: "w-full bg-slate-50 dark:bg-slate-900 border border-transparent rounded-xl p-4 text-slate-700 dark:text-slate-300 text-xs font-medium focus:border-indigo-500/20 transition-all shadow-inner"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).excerpt]
                        ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Blog/Form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Form = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-76360a8d"]]);
export {
  Form as default
};
