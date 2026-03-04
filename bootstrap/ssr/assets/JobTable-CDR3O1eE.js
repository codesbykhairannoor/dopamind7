import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./JobDatePicker-Dwgp0-b9.js";
import _sfc_main$2 from "./JobStatusDropdown-BIHrp-JG.js";
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
  props: { jobs: Array, selectedJobs: Array },
  emits: ["toggleSelection", "selectAll", "autoSave", "delete"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl shadow-sm border border-slate-200 relative" }, _attrs))} data-v-18a6134b><div class="overflow-x-auto custom-scrollbar min-h-[400px] sm:min-h-[500px]" data-v-18a6134b><table class="w-full text-sm border-collapse whitespace-nowrap text-left relative" data-v-18a6134b><thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-20 shadow-sm" data-v-18a6134b><tr data-v-18a6134b><th class="border-r border-slate-200 px-4 py-3.5 w-12 text-center" data-v-18a6134b><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedJobs.length === __props.jobs.length && __props.jobs.length > 0) ? " checked" : ""} class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4" data-v-18a6134b></th><th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[220px]" data-v-18a6134b>${ssrInterpolate(_ctx.$t("job_col_company", "Perusahaan"))} <span class="text-rose-500" data-v-18a6134b>*</span></th><th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[220px]" data-v-18a6134b>${ssrInterpolate(_ctx.$t("job_col_title", "Pekerjaan"))} <span class="text-rose-500" data-v-18a6134b>*</span></th><th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[180px]" data-v-18a6134b>${ssrInterpolate(_ctx.$t("job_col_location", "Lokasi"))}</th><th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[160px]" data-v-18a6134b>${ssrInterpolate(_ctx.$t("job_col_applied", "Tgl Melamar"))}</th><th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[160px]" data-v-18a6134b>${ssrInterpolate(_ctx.$t("job_col_status", "Status"))}</th><th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[180px]" data-v-18a6134b>${ssrInterpolate(_ctx.$t("job_col_salary", "Gaji (Opsional)"))}</th><th class="px-4 py-3.5 text-center font-extrabold text-slate-400 w-14" data-v-18a6134b>🗑️</th></tr></thead><tbody data-v-18a6134b><!--[-->`);
      ssrRenderList(__props.jobs, (job) => {
        _push(`<tr class="border-b border-slate-100 hover:bg-indigo-50/10 focus-within:bg-indigo-50/30 transition-colors group" data-v-18a6134b><td class="border-r border-slate-100 px-4 py-0 text-center align-middle bg-slate-50/40 group-focus-within:bg-transparent" data-v-18a6134b><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedJobs.includes(job.id)) ? " checked" : ""} class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4" data-v-18a6134b></td><td class="border-r border-slate-100 p-0 relative" data-v-18a6134b><input${ssrRenderAttr("value", job.company)} type="text" class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-slate-800 placeholder-slate-300 transition-all"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_company", "Ketik perusahaan..."))} data-v-18a6134b></td><td class="border-r border-slate-100 p-0 relative" data-v-18a6134b><input${ssrRenderAttr("value", job.title)} type="text" class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-slate-800 placeholder-slate-300 transition-all"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_title", "Cth: Frontend Dev"))} data-v-18a6134b></td><td class="border-r border-slate-100 p-0 relative" data-v-18a6134b><input${ssrRenderAttr("value", job.location)} type="text" class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-medium text-slate-600 placeholder-slate-300 transition-all"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_location", "Remote / ID"))} data-v-18a6134b></td><td class="border-r border-slate-100 p-0 relative" data-v-18a6134b>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          modelValue: job.applied_date,
          "onUpdate:modelValue": ($event) => job.applied_date = $event,
          onSave: ($event) => emit("autoSave", job)
        }, null, _parent));
        _push(`</td><td class="border-r border-slate-100 p-0 relative" data-v-18a6134b>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          modelValue: job.status,
          "onUpdate:modelValue": ($event) => job.status = $event,
          onSave: ($event) => emit("autoSave", job)
        }, null, _parent));
        _push(`</td><td class="border-r border-slate-100 p-0 relative" data-v-18a6134b><input${ssrRenderAttr("value", job.salary)} type="number" class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-mono font-medium text-slate-600 placeholder-slate-300 transition-all" placeholder="0" data-v-18a6134b></td><td class="p-0 text-center align-middle" data-v-18a6134b><button tabindex="-1" class="w-full h-full min-h-[56px] flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all" data-v-18a6134b><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-18a6134b><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-18a6134b></path></svg></button></td></tr>`);
      });
      _push(`<!--]-->`);
      if (__props.jobs.length === 0) {
        _push(`<tr data-v-18a6134b><td colspan="8" class="px-4 py-20 text-center text-slate-400 bg-slate-50/30 font-medium" data-v-18a6134b><div class="flex flex-col items-center gap-3" data-v-18a6134b><span class="text-4xl" data-v-18a6134b>📄</span> ${ssrInterpolate(_ctx.$t("job_empty_table", 'Belum ada data. Klik tombol "+ Tambah Baris" di atas.'))}</div></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Job/JobTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const JobTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-18a6134b"]]);
export {
  JobTable as default
};
