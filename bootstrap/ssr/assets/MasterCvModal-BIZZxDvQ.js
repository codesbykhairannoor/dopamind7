import { computed, ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BvGLCgx4.js";
import { usePage } from "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "MasterCvModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["close", "saved"],
  setup(__props, { emit: __emit }) {
    const user = computed(() => usePage().props.auth.user);
    ref(null);
    const filePreview = ref(null);
    const fileName = ref(user.value.resume_filename || "");
    ref(null);
    const isLoading = ref(false);
    const error = ref("");
    onMounted(() => {
      console.log("[MasterCV] Initial State - Filename:", user.value.resume_filename);
      console.log("[MasterCV] Initial State - Has Text:", !!user.value.resume_text);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[100] flex items-center justify-center p-4" }, _attrs))}><div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div><div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300"><div class="flex items-center justify-between mb-8"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "job",
          size: "20"
        }, null, _parent));
        _push(`</div><h2 class="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">${ssrInterpolate(_ctx.$t("job_master_cv_setup", "Master CV Setup"))}</h2></div><button class="p-2 text-slate-400 hover:text-rose-500 transition-all">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "x",
          size: "20",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button></div><div class="space-y-6"><div class="${ssrRenderClass([[
          user.value.resume_text ? "border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-500/5" : "border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-500"
        ], "relative h-48 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all overflow-hidden"])}"><input type="file" class="hidden" accept=".pdf,image/*">`);
        if (!filePreview.value && !user.value.resume_text) {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "plus",
            size: "32",
            class: "text-slate-300"
          }, null, _parent));
          _push(`<p class="text-[10px] font-black text-slate-500 uppercase">${ssrInterpolate(_ctx.$t("job_master_cv_upload_label", "Upload PDF atau Gambar (Max 15MB)"))}</p><!--]-->`);
        } else if (user.value.resume_text && !filePreview.value) {
          _push(`<div class="relative z-10 text-center"><div class="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "check",
            size: "28",
            class: "text-emerald-500"
          }, null, _parent));
          _push(`</div><p class="text-xs font-black text-slate-800 dark:text-white truncate px-4 max-w-[250px]">${ssrInterpolate(user.value.resume_filename || "Master CV Active")}</p><p class="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase mt-1 tracking-widest"> Intelligence Connected </p></div>`);
        } else {
          _push(`<div class="relative z-10 text-center">`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "refresh",
            size: "32",
            class: "text-indigo-500 mx-auto mb-2 animate-spin-slow"
          }, null, _parent));
          _push(`<p class="text-xs font-black text-slate-800 dark:text-white truncate px-4 max-w-[250px]">${ssrInterpolate(fileName.value)}</p><p class="text-[9px] font-bold text-indigo-500 uppercase mt-1"> Ready to Intelligence-Sync </p></div>`);
        }
        _push(`</div><div class="space-y-3"><button${ssrIncludeBooleanAttr(isLoading.value || !filePreview.value) ? " disabled" : ""} class="${ssrRenderClass([[
          filePreview.value ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
        ], "w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50"])}">`);
        if (isLoading.value) {
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "refresh",
            class: "animate-spin",
            size: "16"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<span>${ssrInterpolate(isLoading.value ? _ctx.$t("job_master_cv_extracting", "Extracting Text Intelligence...") : user.value.resume_text ? _ctx.$t("job_master_cv_update", "Replace / Update CV") : _ctx.$t("job_master_cv_save", "Save & Extract CV"))}</span></button>`);
        if (error.value) {
          _push(`<p class="text-[10px] text-rose-500 font-bold text-center uppercase">${ssrInterpolate(error.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (user.value.resume_text && !filePreview.value) {
          _push(`<div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800"><p class="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest flex items-center gap-2">`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "sparkles",
            size: "10"
          }, null, _parent));
          _push(` Extracted Intelligence Preview </p><div class="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-h-24 overflow-y-auto custom-scrollbar">${ssrInterpolate(user.value.resume_text)}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-900/30"><p class="text-[10px] text-slate-400 font-bold text-center italic leading-relaxed"> 💡 ${ssrInterpolate(_ctx.$t("job_master_cv_storage_tip", "Storage Optimization: Large PDF files (MB) will be compressed by AI into pure text data (KB) for database efficiency & analysis speed."))}</p></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Job/MasterCvModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
