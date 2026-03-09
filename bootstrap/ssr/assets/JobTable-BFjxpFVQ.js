import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$2 from "./JobDatePicker-BnIcdi4y.js";
import _sfc_main$1 from "./JobStatusDropdown-DkIU9YDv.js";
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
  emits: ["toggleSelection", "selectAll", "autoSave", "delete", "shiftSelect"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))} data-v-8232cb5d><div class="sm:hidden space-y-4" data-v-8232cb5d><!--[-->`);
      ssrRenderList(__props.jobs, (job, index) => {
        _push(`<div class="group relative transition-all duration-300 active:scale-[0.99] z-10 hover:z-20 focus-within:z-30" data-v-8232cb5d><div class="absolute inset-0 bg-white/40 backdrop-blur-md rounded-[2.5rem] -z-10 border border-white/60" data-v-8232cb5d></div><div class="${ssrRenderClass([{ "ring-2 ring-indigo-500 bg-white/90": __props.selectedJobs.includes(job.id) }, "bg-white/70 backdrop-blur-md rounded-[2rem] border border-slate-200/60 p-5 shadow-sm transition-all duration-300"])}" data-v-8232cb5d><div class="flex items-start gap-4" data-v-8232cb5d><div class="flex items-center h-10 shrink-0" data-v-8232cb5d><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedJobs.includes(job.id)) ? " checked" : ""} class="rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5 transition-transform active:scale-125" data-v-8232cb5d></div><div class="flex-1 min-w-0 space-y-4" data-v-8232cb5d><div class="space-y-1" data-v-8232cb5d><input${ssrRenderAttr("value", job.company)} type="text" class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-black text-lg text-slate-800 placeholder-slate-300"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_company", "Perusahaan"))} data-v-8232cb5d><input${ssrRenderAttr("value", job.title)} type="text" class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-bold text-sm text-slate-600 placeholder-slate-300"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_title", "Posisi Pekerjaan"))} data-v-8232cb5d></div><div class="h-px bg-slate-100 -mx-4" data-v-8232cb5d></div><div class="grid grid-cols-2 gap-4" data-v-8232cb5d><div class="space-y-1" data-v-8232cb5d><label class="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1" data-v-8232cb5d> 📍 ${ssrInterpolate(_ctx.$t("job_col_location", "Lokasi"))}</label><input${ssrRenderAttr("value", job.location)} type="text" class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-bold text-xs text-slate-700 placeholder-slate-300"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_location", "Remote / ID"))} data-v-8232cb5d></div><div class="space-y-1" data-v-8232cb5d><label class="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1" data-v-8232cb5d> 💰 ${ssrInterpolate(_ctx.$t("job_col_salary", "Gaji"))}</label><input${ssrRenderAttr("value", job.salary)} type="number" class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-bold text-xs font-mono text-slate-700 placeholder-slate-300" placeholder="0" data-v-8232cb5d></div></div><div class="flex items-center gap-2 pt-1 overflow-visible" data-v-8232cb5d><div class="flex-1 min-w-0" data-v-8232cb5d>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          modelValue: job.status,
          "onUpdate:modelValue": ($event) => job.status = $event,
          onSave: ($event) => emit("autoSave", job)
        }, null, _parent));
        _push(`</div><div class="flex-1 min-w-0" data-v-8232cb5d>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          modelValue: job.applied_date,
          "onUpdate:modelValue": ($event) => job.applied_date = $event,
          onSave: ($event) => emit("autoSave", job)
        }, null, _parent));
        _push(`</div></div></div><button class="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" data-v-8232cb5d><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-8232cb5d><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-8232cb5d></path></svg></button></div></div></div>`);
      });
      _push(`<!--]-->`);
      if (__props.jobs.length === 0) {
        _push(`<div class="py-20 text-center bg-white rounded-[2rem] border border-slate-200/60 shadow-sm" data-v-8232cb5d><div class="flex flex-col items-center gap-4" data-v-8232cb5d><span class="text-5xl text-slate-300 animate-bounce" data-v-8232cb5d>📥</span><p class="text-sm font-bold text-slate-400 px-8" data-v-8232cb5d>${ssrInterpolate(_ctx.$t("job_empty_table", "Belum ada data. Tambahkan baris baru di pojok kanan atas."))}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden sm:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative" data-v-8232cb5d><div class="overflow-x-auto custom-scrollbar min-h-[500px]" data-v-8232cb5d><table class="w-full text-sm border-collapse whitespace-nowrap text-left relative select-none sm:select-text" data-v-8232cb5d><thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-20 shadow-sm" data-v-8232cb5d><tr data-v-8232cb5d><th class="border-r border-slate-200 px-4 py-3.5 w-12 text-center relative group" data-v-8232cb5d><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedJobs.length === __props.jobs.length && __props.jobs.length > 0) ? " checked" : ""} class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4 peer" data-v-8232cb5d><div class="absolute inset-0 bg-indigo-500/10 opacity-0 peer-checked:opacity-100 peer-hover:opacity-50 transition-opacity pointer-events-none" data-v-8232cb5d></div></th><th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[220px]" data-v-8232cb5d>${ssrInterpolate(_ctx.$t("job_col_company", "Perusahaan"))} <span class="text-rose-500" data-v-8232cb5d>*</span></th><th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[220px]" data-v-8232cb5d>${ssrInterpolate(_ctx.$t("job_col_title", "Pekerjaan"))} <span class="text-rose-500" data-v-8232cb5d>*</span></th><th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[180px]" data-v-8232cb5d>${ssrInterpolate(_ctx.$t("job_col_location", "Lokasi"))}</th><th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[160px]" data-v-8232cb5d>${ssrInterpolate(_ctx.$t("job_col_applied", "Tgl Melamar"))}</th><th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[160px]" data-v-8232cb5d>${ssrInterpolate(_ctx.$t("job_col_status", "Status"))}</th><th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[180px]" data-v-8232cb5d>${ssrInterpolate(_ctx.$t("job_col_salary", "Gaji (Opsional)"))}</th><th class="px-4 py-3.5 text-center font-extrabold text-slate-400 w-14" data-v-8232cb5d>🗑️</th></tr></thead><tbody data-v-8232cb5d><!--[-->`);
      ssrRenderList(__props.jobs, (job, index) => {
        _push(`<tr class="${ssrRenderClass([{ "bg-indigo-50/50 hover:bg-indigo-50/70": __props.selectedJobs.includes(job.id) }, "border-b border-slate-100 hover:bg-indigo-50/10 focus-within:bg-indigo-50/30 transition-colors group relative"])}" data-v-8232cb5d><td class="${ssrRenderClass([{ "!bg-indigo-100/50": __props.selectedJobs.includes(job.id) }, "border-r border-slate-100 px-4 py-0 text-center align-middle bg-slate-50/40 group-focus-within:bg-transparent"])}" data-v-8232cb5d><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedJobs.includes(job.id)) ? " checked" : ""} class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4" data-v-8232cb5d></td><td class="border-r border-slate-100 p-0 relative" data-v-8232cb5d><input${ssrRenderAttr("value", job.company)} type="text"${ssrRenderAttr("data-nav-row", index)} data-nav-col="0" class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-slate-800 placeholder-slate-300 transition-all font-sans"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_company", "Ketik perusahaan..."))} data-v-8232cb5d></td><td class="border-r border-slate-100 p-0 relative" data-v-8232cb5d><input${ssrRenderAttr("value", job.title)} type="text"${ssrRenderAttr("data-nav-row", index)} data-nav-col="1" class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-slate-800 placeholder-slate-300 transition-all font-sans"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_title", "Cth: Frontend Dev"))} data-v-8232cb5d></td><td class="border-r border-slate-100 p-0 relative" data-v-8232cb5d><input${ssrRenderAttr("value", job.location)} type="text"${ssrRenderAttr("data-nav-row", index)} data-nav-col="2" class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-medium text-slate-600 placeholder-slate-300 transition-all font-sans"${ssrRenderAttr("placeholder", _ctx.$t("job_ph_location", "Remote / ID"))} data-v-8232cb5d></td><td class="border-r border-slate-100 p-0 relative" data-v-8232cb5d>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          modelValue: job.applied_date,
          "onUpdate:modelValue": ($event) => job.applied_date = $event,
          onSave: ($event) => emit("autoSave", job)
        }, null, _parent));
        _push(`</td><td class="border-r border-slate-100 p-0 relative" data-v-8232cb5d>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          modelValue: job.status,
          "onUpdate:modelValue": ($event) => job.status = $event,
          onSave: ($event) => emit("autoSave", job)
        }, null, _parent));
        _push(`</td><td class="border-r border-slate-100 p-0 relative" data-v-8232cb5d><input${ssrRenderAttr("value", job.salary)} type="number"${ssrRenderAttr("data-nav-row", index)} data-nav-col="3" class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-mono font-medium text-slate-600 placeholder-slate-300 transition-all" placeholder="0" data-v-8232cb5d></td><td class="p-0 text-center align-middle" data-v-8232cb5d><button tabindex="-1" class="w-full h-full min-h-[56px] flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-200" data-v-8232cb5d><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" data-v-8232cb5d><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-8232cb5d></path></svg></button></td></tr>`);
      });
      _push(`<!--]-->`);
      if (__props.jobs.length === 0) {
        _push(`<tr data-v-8232cb5d><td colspan="8" class="px-4 py-20 text-center text-slate-400 bg-slate-50/30 font-medium" data-v-8232cb5d><div class="flex flex-col items-center gap-3" data-v-8232cb5d><span class="text-4xl text-slate-300 animate-bounce mt-2" data-v-8232cb5d>📥</span> ${ssrInterpolate(_ctx.$t("job_empty_table", "Belum ada data. Tambahkan baris baru di pojok kanan atas."))}</div></td></tr>`);
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
const JobTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8232cb5d"]]);
export {
  JobTable as default
};
