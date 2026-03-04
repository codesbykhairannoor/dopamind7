import { ref, watch, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-B_-qrFxu.js";
import Swal from "sweetalert2";
import { trans } from "laravel-vue-i18n";
import axios from "axios";
import JobTable from "./JobTable-CDR3O1eE.js";
import _sfc_main$1 from "./JobStats-XE_mcy9P.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./JobDatePicker-Dwgp0-b9.js";
import "dayjs";
import "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "./useJobUI-ByDCvN_C.js";
import "./JobStatusDropdown-BIHrp-JG.js";
function useJobs(props) {
  const localJobs = ref(props.jobs ? props.jobs.map((j) => ({ ...j, _key: "db_" + j.id, _original_status: j.status })) : []);
  const selectedJobs = ref([]);
  const localStats = ref(props.stats ? { ...props.stats } : { total: 0, wishlist: 0, applied: 0, interview: 0, offer: 0, rejected: 0, accepted: 0 });
  watch(() => props.jobs, (newJobs) => {
    const unsavedJobs = localJobs.value.filter((j) => j.is_new);
    const incomingJobs = (newJobs || []).map((j) => ({ ...j, _key: "db_" + j.id, _original_status: j.status }));
    localJobs.value = [...unsavedJobs, ...incomingJobs];
  }, { deep: true });
  const t = (key, fallback) => {
    const result = trans(key);
    return result !== key ? result : fallback;
  };
  const fireError = (message) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3e3,
      background: "#e11d48",
      iconColor: "#ffffff",
      icon: "error",
      title: `<span style="color: white; font-weight: 700; font-size: 14px;">${message}</span>`,
      customClass: { popup: "!rounded-xl !shadow-lg !m-4" }
    });
  };
  const addEmptyRow = () => {
    localJobs.value.unshift({
      id: "temp_" + Date.now(),
      _key: "temp_key_" + Date.now(),
      is_new: true,
      title: "",
      company: "",
      status: "wishlist",
      _original_status: "wishlist",
      location: "",
      applied_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      salary: null,
      is_saving: false
    });
  };
  const autoSaveRow = async (job) => {
    if (!job.title || !job.company) return;
    if (!job.is_new && job._original_status !== job.status) {
      localStats.value[job._original_status] = Math.max(0, (localStats.value[job._original_status] || 1) - 1);
      localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
      job._original_status = job.status;
    }
    if (job.is_saving) return;
    job.is_saving = true;
    const payload = {
      title: job.title,
      company: job.company,
      status: job.status,
      location: job.location,
      applied_date: job.applied_date,
      salary: job.salary || null
    };
    try {
      if (job.is_new) {
        const response = await axios.post(route("jobs.store"), payload, {
          headers: { "Accept": "application/json" }
        });
        job.id = response.data.data ? response.data.data.id : response.data.id;
        job.is_new = false;
        job._original_status = job.status;
        localStats.value.total = (localStats.value.total || 0) + 1;
        localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
      } else {
        await axios.patch(route("jobs.update", job.id), payload, {
          headers: { "Accept": "application/json" }
        });
      }
    } catch (error) {
      console.error(error);
      fireError(t("job_error_save", "Gagal menyimpan! Cek koneksi."));
      if (!job.is_new && job._original_status !== job.status) {
        localStats.value[job.status] = Math.max(0, (localStats.value[job.status] || 1) - 1);
        job.status = job._original_status;
        localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
      }
    } finally {
      job.is_saving = false;
    }
  };
  const deleteJob = async (id, isNew = false) => {
    if (isNew) {
      localJobs.value = localJobs.value.filter((j) => j.id !== id);
      return;
    }
    if (confirm(t("job_confirm_delete_simple", "Hapus baris ini?"))) {
      const jobToDelete = localJobs.value.find((j) => j.id === id);
      if (jobToDelete) {
        localStats.value.total = Math.max(0, (localStats.value.total || 1) - 1);
        localStats.value[jobToDelete.status] = Math.max(0, (localStats.value[jobToDelete.status] || 1) - 1);
      }
      localJobs.value = localJobs.value.filter((j) => j.id !== id);
      try {
        await axios.delete(route("jobs.destroy", id), {
          headers: { "Accept": "application/json" }
        });
      } catch (e) {
        fireError(t("job_error_save", "Gagal menghapus dari server!"));
      }
    }
  };
  const toggleSelection = (jobId) => {
    const index = selectedJobs.value.indexOf(jobId);
    index > -1 ? selectedJobs.value.splice(index, 1) : selectedJobs.value.push(jobId);
  };
  const selectAll = () => {
    selectedJobs.value.length === localJobs.value.length ? selectedJobs.value = [] : selectedJobs.value = localJobs.value.map((j) => j.id);
  };
  return {
    localJobs,
    selectedJobs,
    localStats,
    addEmptyRow,
    autoSaveRow,
    deleteJob,
    toggleSelection,
    selectAll
  };
}
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AuthenticatedLayout }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    jobs: Array,
    stats: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const {
      localJobs,
      selectedJobs,
      localStats,
      // Wajib tarik localStats dari composable
      autoSaveRow,
      deleteJob,
      toggleSelection,
      selectAll
    } = useJobs(props);
    const searchQuery = ref(props.filters.search || "");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("job_page_title", "Job Tracker")
      }, null, _parent));
      _push(`<div class="min-h-screen bg-[#f8fafc] pb-24"><div class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm"><div class="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5"><div class="flex flex-col md:flex-row md:items-center justify-between gap-4"><div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 w-full md:w-auto"><h1 class="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2 shrink-0"> 💼 ${ssrInterpolate(_ctx.$t("job_page_title", "Job Tracker"))}</h1><div class="h-6 w-px bg-slate-300 hidden sm:block"></div><div class="relative w-full sm:w-72"><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", _ctx.$t("job_search", "Cari posisi/perusahaan..."))} class="w-full pl-10 pr-4 py-2 sm:py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 transition-all font-medium text-slate-700"><span class="absolute left-3 top-2.5 sm:top-3 text-slate-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></span></div></div><button class="w-full md:w-auto justify-center bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center gap-2"><span class="text-xl leading-none mb-0.5">+</span> ${ssrInterpolate(_ctx.$t("job_add_row", "Tambah Baris"))}</button></div></div></div><div class="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">`);
      if (unref(localStats)) {
        _push(ssrRenderComponent(_sfc_main$1, { stats: unref(localStats) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(JobTable, {
        jobs: unref(localJobs),
        "selected-jobs": unref(selectedJobs),
        onToggleSelection: unref(toggleSelection),
        onSelectAll: unref(selectAll),
        onAutoSave: unref(autoSaveRow),
        onDelete: unref(deleteJob)
      }, null, _parent));
      _push(`<div class="mt-5 flex items-center justify-start"><p class="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-2 bg-indigo-50/50 px-4 py-2.5 rounded-xl border border-indigo-100 shadow-sm"><span class="text-indigo-500 text-base">💡</span> ${ssrInterpolate(_ctx.$t("job_tips", "Tips: Klik sel pada tabel untuk mengedit. Data otomatis tersimpan saat berpindah sel."))}</p></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Job/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
