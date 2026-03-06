import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "MilestoneItem",
  __ssrInlineRender: true,
  props: {
    milestone: Object,
    goal: Object,
    onToggle: Function,
    onDelete: Function,
    onSave: Function
  },
  setup(__props) {
    const props = __props;
    const isEditing = ref(false);
    const editTitle = ref(props.milestone.title);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center group gap-3 py-2 px-1 hover:bg-white/50 rounded-xl transition-colors" }, _attrs))}><button class="${ssrRenderClass([__props.milestone.completed ? "bg-indigo-500 border-indigo-500 text-white" : "border-slate-200 bg-white hover:border-indigo-400", "flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300"])}">`);
      if (__props.milestone.completed) {
        _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="flex-grow min-w-0">`);
      if (isEditing.value || __props.milestone.is_new) {
        _push(`<input${ssrRenderAttr("value", editTitle.value)} autofocus${ssrRenderAttr("placeholder", _ctx.$t("milestone_placeholder", "Langkah baru..."))} class="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-medium text-slate-700 placeholder-slate-400">`);
      } else {
        _push(`<span class="${ssrRenderClass([__props.milestone.completed ? "text-slate-400 line-through" : "text-slate-700", "block text-sm font-medium transition-all duration-300 cursor-text truncate"])}">${ssrInterpolate(__props.milestone.title || _ctx.$t("milestone_edit_placeholder", "Klik untuk mengedit..."))}</span>`);
      }
      _push(`</div><button class="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-all rounded-lg hover:bg-rose-50"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/MilestoneItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
