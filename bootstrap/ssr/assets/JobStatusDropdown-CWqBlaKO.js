import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { u as useClickOutside } from "./useJobUI-ByDCvN_C.js";
const _sfc_main = {
  __name: "JobStatusDropdown",
  __ssrInlineRender: true,
  props: { modelValue: String },
  emits: ["update:modelValue", "save"],
  setup(__props, { emit: __emit }) {
    const isOpen = ref(false);
    const containerRef = useClickOutside(() => {
      isOpen.value = false;
    });
    const statusOptions = [
      { value: "wishlist", label: "job_status_wishlist", colorClass: "bg-blue-50 text-blue-700 border-blue-200", hex: "#60a5fa" },
      { value: "applied", label: "job_status_applied", colorClass: "bg-yellow-50 text-yellow-700 border-yellow-200", hex: "#facc15" },
      { value: "interview", label: "job_status_interview", colorClass: "bg-purple-50 text-purple-700 border-purple-200", hex: "#c084fc" },
      { value: "offer", label: "job_status_offer", colorClass: "bg-green-50 text-green-700 border-green-200", hex: "#4ade80" },
      { value: "rejected", label: "job_status_rejected", colorClass: "bg-rose-50 text-rose-700 border-rose-200", hex: "#fb7185" },
      { value: "accepted", label: "job_status_accepted", colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200", hex: "#34d399" }
    ];
    const getStatusOption = (val) => statusOptions.find((s) => s.value === val) || statusOptions[0];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative w-full h-full flex items-center px-3 cursor-pointer group",
        ref_key: "containerRef",
        ref: containerRef
      }, _attrs))}><span class="${ssrRenderClass([getStatusOption(__props.modelValue).colorClass, "px-3 py-1.5 rounded-lg text-sm font-bold transition-all border group-hover:shadow-sm"])}">${ssrInterpolate(_ctx.$t(getStatusOption(__props.modelValue).label, __props.modelValue))}</span>`);
      if (isOpen.value) {
        _push(`<div class="fixed sm:absolute top-1/2 sm:top-full left-1/2 sm:left-3 -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 sm:translate-y-0 mt-0 sm:mt-2 w-64 sm:w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 p-2 z-[100]"><div class="sm:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm -z-10"></div><!--[-->`);
        ssrRenderList(statusOptions, (opt) => {
          _push(`<div class="${ssrRenderClass([__props.modelValue === opt.value ? "bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400", "px-3 py-2.5 rounded-xl text-sm font-bold cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"])}"><span class="w-3 h-3 rounded-full flex-shrink-0" style="${ssrRenderStyle({ backgroundColor: opt.hex })}"></span><span class="truncate">${ssrInterpolate(_ctx.$t(opt.label, opt.value))}</span></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Job/JobStatusDropdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
