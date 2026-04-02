import { ref, resolveComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$2 from "./JobDatePicker-CBKaXF-H.js";
import _sfc_main$1 from "./JobStatusDropdown-CWqBlaKO.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "dayjs";
import "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "@inertiajs/vue3";
import "./useJobUI-ByDCvN_C.js";
const _sfc_main = {
  __name: "JobTable",
  __ssrInlineRender: true,
  props: { jobs: Array },
  emits: ["autoSave", "delete", "scan"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_OneForMindIcon = resolveComponent("OneForMindIcon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))} data-v-9d2e49de><div class="sm:hidden space-y-4" data-v-9d2e49de><!--[-->`);
      ssrRenderList(__props.jobs, (job, index) => {
        _push(`<div class="group relative transition-all duration-300 active:scale-[0.99] z-10 hover:z-20 focus-within:z-30" data-v-9d2e49de><div class="absolute inset-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md rounded-[2.5rem] -z-10 border border-white/60 dark:border-slate-800 transition-colors duration-500" data-v-9d2e49de></div><div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-[2rem] border border-slate-200/60 dark:border-slate-800 p-5 shadow-sm transition-all duration-300" data-v-9d2e49de><div class="flex items-start gap-4" data-v-9d2e49de><div class="flex-1 min-w-0 space-y-4" data-v-9d2e49de><div class="space-y-1" data-v-9d2e49de><input${ssrRenderAttr("value", job.company)} type="text" class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-bold text-sm text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 transition-colors duration-500"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_company", "Perusahaan"))} data-v-9d2e49de><input${ssrRenderAttr("value", job.title)} type="text" class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-bold text-sm text-slate-600 dark:text-slate-400 placeholder-slate-300 dark:placeholder-slate-700 transition-colors duration-500"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_title", "Posisi Pekerjaan"))} data-v-9d2e49de></div><div class="h-px bg-slate-100 dark:bg-slate-800 -mx-4 transition-colors duration-500" data-v-9d2e49de></div><div class="grid grid-cols-1 gap-4" data-v-9d2e49de><div class="space-y-1" data-v-9d2e49de><label class="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1 transition-colors duration-500" data-v-9d2e49de> 📍 ${ssrInterpolate(_ctx.$t("job_col_location", "Lokasi"))}</label><input${ssrRenderAttr("value", job.location)} type="text" class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-bold text-sm text-slate-700 dark:text-slate-300 placeholder-slate-300 dark:placeholder-slate-700 transition-colors duration-500"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_location", "Remote / ID"))} data-v-9d2e49de></div></div><div class="flex items-center gap-2 pt-1 overflow-visible" data-v-9d2e49de><div class="flex-1 min-w-0" data-v-9d2e49de>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          modelValue: job.status,
          "onUpdate:modelValue": ($event) => job.status = $event,
          onSave: ($event) => emit("autoSave", job)
        }, null, _parent));
        _push(`</div><div class="flex-1 min-w-0" data-v-9d2e49de>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          modelValue: job.applied_date,
          "onUpdate:modelValue": ($event) => job.applied_date = $event,
          onSave: ($event) => emit("autoSave", job)
        }, null, _parent));
        _push(`</div></div><button class="w-full py-3 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all" data-v-9d2e49de>`);
        _push(ssrRenderComponent(_component_OneForMindIcon, {
          name: "sparkles",
          size: "14",
          "stroke-width": "3"
        }, null, _parent));
        _push(` AI Resume Match Scan </button></div><button class="p-2 text-slate-300 dark:text-slate-700 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all" data-v-9d2e49de><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-9d2e49de><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-9d2e49de></path></svg></button></div></div></div>`);
      });
      _push(`<!--]-->`);
      if (__props.jobs.length === 0) {
        _push(`<div class="py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-sm transition-colors duration-500" data-v-9d2e49de><div class="flex flex-col items-center gap-4" data-v-9d2e49de><span class="text-5xl text-slate-300 dark:text-slate-700 animate-bounce" data-v-9d2e49de>📥</span><p class="text-sm font-bold text-slate-400 dark:text-slate-500 px-8 transition-colors duration-500" data-v-9d2e49de>${ssrInterpolate(_ctx.$t("job_empty_table", "Belum ada data. Tambahkan baris baru di pojok kanan atas."))}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden sm:block bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative transition-colors duration-500" data-v-9d2e49de><div class="overflow-x-auto custom-scrollbar min-h-[500px]" data-v-9d2e49de><table class="w-full text-sm border-collapse whitespace-nowrap text-left relative select-none sm:select-text" data-v-9d2e49de><thead class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-20 shadow-sm transition-colors duration-500" data-v-9d2e49de><tr data-v-9d2e49de><th class="border-r border-slate-200 dark:border-slate-700 px-5 py-3.5 font-extrabold text-slate-600 dark:text-slate-300 min-w-[220px]" data-v-9d2e49de>${ssrInterpolate(_ctx.$t("job_col_company", "Perusahaan"))} <span class="text-rose-500" data-v-9d2e49de>*</span></th><th class="border-r border-slate-200 dark:border-slate-700 px-5 py-3.5 font-extrabold text-slate-600 dark:text-slate-300 min-w-[220px]" data-v-9d2e49de>${ssrInterpolate(_ctx.$t("job_col_title", "Pekerjaan"))} <span class="text-rose-500" data-v-9d2e49de>*</span></th><th class="border-r border-slate-200 dark:border-slate-700 px-5 py-3.5 font-extrabold text-slate-600 dark:text-slate-300 min-w-[180px]" data-v-9d2e49de>${ssrInterpolate(_ctx.$t("job_col_location", "Lokasi"))}</th><th class="border-r border-slate-200 dark:border-slate-700 px-5 py-3.5 font-extrabold text-slate-600 dark:text-slate-300 min-w-[160px]" data-v-9d2e49de>${ssrInterpolate(_ctx.$t("job_col_applied", "Tgl Melamar"))}</th><th class="border-r border-slate-200 dark:border-slate-700 px-5 py-3.5 font-extrabold text-slate-600 dark:text-slate-300 min-w-[160px]" data-v-9d2e49de>${ssrInterpolate(_ctx.$t("job_col_status", "Status"))}</th><th class="border-r border-slate-200 dark:border-slate-700 px-5 py-3.5 font-extrabold text-indigo-600 dark:text-indigo-400 min-w-[100px] text-center" data-v-9d2e49de>Neural</th><th class="px-4 py-3.5 text-center font-extrabold text-slate-400 dark:text-slate-500 w-14" data-v-9d2e49de>🗑️</th></tr></thead><tbody data-v-9d2e49de><!--[-->`);
      ssrRenderList(__props.jobs, (job, index) => {
        _push(`<tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-indigo-50/10 dark:hover:bg-indigo-500/5 focus-within:bg-indigo-50/30 dark:focus-within:bg-indigo-500/10 transition-colors group relative" data-v-9d2e49de><td class="border-r border-slate-100 dark:border-slate-800 p-0 relative" data-v-9d2e49de><input${ssrRenderAttr("value", job.company)} type="text"${ssrRenderAttr("data-nav-row", index)} data-nav-col="0" class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-sm text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 transition-all font-sans"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_company", "Ketik perusahaan..."))} data-v-9d2e49de></td><td class="border-r border-slate-100 dark:border-slate-800 p-0 relative" data-v-9d2e49de><input${ssrRenderAttr("value", job.title)} type="text"${ssrRenderAttr("data-nav-row", index)} data-nav-col="1" class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-sm text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 transition-all font-sans"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_title", "Cth: Frontend Dev"))} data-v-9d2e49de></td><td class="border-r border-slate-100 dark:border-slate-800 p-0 relative" data-v-9d2e49de><input${ssrRenderAttr("value", job.location)} type="text"${ssrRenderAttr("data-nav-row", index)} data-nav-col="2" class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-medium text-sm text-slate-600 dark:text-slate-400 placeholder-slate-300 dark:placeholder-slate-700 transition-all font-sans"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_location", "Remote / ID"))} data-v-9d2e49de></td><td class="border-r border-slate-100 dark:border-slate-800 p-0 relative" data-v-9d2e49de>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          modelValue: job.applied_date,
          "onUpdate:modelValue": ($event) => job.applied_date = $event,
          onSave: ($event) => emit("autoSave", job)
        }, null, _parent));
        _push(`</td><td class="border-r border-slate-100 dark:border-slate-800 p-0 relative" data-v-9d2e49de>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          modelValue: job.status,
          "onUpdate:modelValue": ($event) => job.status = $event,
          onSave: ($event) => emit("autoSave", job)
        }, null, _parent));
        _push(`</td><td class="border-r border-slate-100 dark:border-slate-800 p-0 relative text-center align-middle" data-v-9d2e49de><button class="w-full h-full min-h-[56px] flex items-center justify-center text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all" data-v-9d2e49de>`);
        _push(ssrRenderComponent(_component_OneForMindIcon, {
          name: "sparkles",
          size: "18",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</button></td><td class="p-0 text-center align-middle" data-v-9d2e49de><button tabindex="-1" class="w-full h-full min-h-[56px] flex items-center justify-center text-slate-300 dark:text-slate-700 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-200" data-v-9d2e49de><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-9d2e49de><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-9d2e49de></path></svg></button></td></tr>`);
      });
      _push(`<!--]-->`);
      if (__props.jobs.length === 0) {
        _push(`<tr data-v-9d2e49de><td colspan="7" class="px-4 py-20 text-center text-slate-400 dark:text-slate-500 bg-slate-50/30 dark:bg-slate-800/20 font-medium transition-colors duration-500" data-v-9d2e49de><div class="flex flex-col items-center gap-3" data-v-9d2e49de><span class="text-4xl text-slate-300 dark:text-slate-700 animate-bounce mt-2" data-v-9d2e49de>📥</span> ${ssrInterpolate(_ctx.$t("job_empty_table", "Belum ada data. Tambahkan baris baru di pojok kanan atas."))}</div></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Job/JobTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const JobTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9d2e49de"]]);
export {
  JobTable as default
};
