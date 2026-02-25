import { unref, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
const _sfc_main = {
  __name: "JournalCard",
  __ssrInlineRender: true,
  props: {
    journal: Object
  },
  emits: ["delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formatDate = (date) => dayjs(date).locale("id").format("dddd, DD MMM YYYY");
    const handleDelete = (event) => {
      event.preventDefault();
      event.stopPropagation();
      emit("delete", props.journal.id);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: _ctx.route("journal.write", __props.journal.id),
        class: "bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group relative"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-md text-rose-500 rounded-full flex items-center justify-center shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100 md:scale-90 md:group-hover:scale-100 hover:bg-rose-500 hover:text-white active:scale-95 sm:opacity-80"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg></button>`);
            if (__props.journal.image_url) {
              _push2(`<div class="w-full h-48 bg-slate-100 overflow-hidden relative"${_scopeId}><img${ssrRenderAttr("src", __props.journal.image_url)} alt="Cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"${_scopeId}><div class="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"${_scopeId}></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="p-6 md:p-8 flex flex-col flex-1"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><span class="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg"${_scopeId}>${ssrInterpolate(formatDate(__props.journal.date))}</span>`);
            if (__props.journal.mood) {
              _push2(`<span class="text-2xl" title="Mood"${_scopeId}>${ssrInterpolate(__props.journal.mood === "awesome" ? "🤩" : __props.journal.mood === "good" ? "😊" : __props.journal.mood === "okay" ? "😐" : __props.journal.mood === "sad" ? "😢" : "😡")}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><h3 class="text-xl font-black text-slate-800 mb-3 line-clamp-2"${_scopeId}>${ssrInterpolate(__props.journal.title || _ctx.$t("journal_untitled", "Cerita Hari Ini"))}</h3><p class="text-sm font-medium text-slate-500 line-clamp-4 flex-1 leading-relaxed"${_scopeId}>${(__props.journal.content ? __props.journal.content.replace(/<[^>]*>?/gm, "") : _ctx.$t("journal_no_content", "Tidak ada teks...")) ?? ""}</p></div>`);
          } else {
            return [
              createVNode("button", {
                onClick: handleDelete,
                class: "absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-md text-rose-500 rounded-full flex items-center justify-center shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100 md:scale-90 md:group-hover:scale-100 hover:bg-rose-500 hover:text-white active:scale-95 sm:opacity-80"
              }, [
                (openBlock(), createBlock("svg", {
                  class: "w-5 h-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  "stroke-width": "2.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  })
                ]))
              ]),
              __props.journal.image_url ? (openBlock(), createBlock("div", {
                key: 0,
                class: "w-full h-48 bg-slate-100 overflow-hidden relative"
              }, [
                createVNode("img", {
                  src: __props.journal.image_url,
                  alt: "Cover",
                  class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                }, null, 8, ["src"]),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" })
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "p-6 md:p-8 flex flex-col flex-1" }, [
                createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                  createVNode("span", { class: "text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg" }, toDisplayString(formatDate(__props.journal.date)), 1),
                  __props.journal.mood ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-2xl",
                    title: "Mood"
                  }, toDisplayString(__props.journal.mood === "awesome" ? "🤩" : __props.journal.mood === "good" ? "😊" : __props.journal.mood === "okay" ? "😐" : __props.journal.mood === "sad" ? "😢" : "😡"), 1)) : createCommentVNode("", true)
                ]),
                createVNode("h3", { class: "text-xl font-black text-slate-800 mb-3 line-clamp-2" }, toDisplayString(__props.journal.title || _ctx.$t("journal_untitled", "Cerita Hari Ini")), 1),
                createVNode("p", {
                  class: "text-sm font-medium text-slate-500 line-clamp-4 flex-1 leading-relaxed",
                  innerHTML: __props.journal.content ? __props.journal.content.replace(/<[^>]*>?/gm, "") : _ctx.$t("journal_no_content", "Tidak ada teks...")
                }, null, 8, ["innerHTML"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journal/JournalCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
