import { ref, watch, computed, onMounted, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, router, Head } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-B-DYe1pG.js";
import Swal from "sweetalert2";
import { trans } from "laravel-vue-i18n";
import axios from "axios";
import { u as useGating } from "./useGating-_5WV009x.js";
import JobTable from "./JobTable-B6_Jsbzz.js";
import _sfc_main$3 from "./JobStats-BpSSUFiH.js";
import _sfc_main$4 from "./JobFilterBar-Bzn_Jmcz.js";
import ResumeAiModal from "./ResumeAiModal-g2p5-kTe.js";
import _sfc_main$5 from "./MasterCvModal-DL_SGPF3.js";
import { _ as _sfc_main$2 } from "./NeuralBridge-CPYzz-Jv.js";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import "./ThemeToggle-ByQSx4Ee.js";
import "./useAppearance-rDoGVD4_.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Modal-b6JySqy_.js";
import "lucide-vue-next";
import "./JobDatePicker-CBKaXF-H.js";
import "dayjs/plugin/localeData.js";
import "./useJobUI-ByDCvN_C.js";
import "./JobStatusDropdown-CWqBlaKO.js";
import "marked";
function useJobs(props) {
  const { isExplorer } = useGating();
  const localJobs = ref(props.jobs ? props.jobs.map((j) => ({ ...j, _key: "db_" + j.id, _original_status: j.status })) : []);
  const selectedJobs = ref([]);
  const localStats = ref(props.stats ? { ...props.stats } : { total: 0, wishlist: 0, applied: 0, interview: 0, offer: 0, rejected: 0, accepted: 0 });
  watch(() => props.jobs, (newJobs) => {
    const unsavedJobs = localJobs.value.filter((j) => j.is_new);
    const incomingJobs = (newJobs || []).map((j) => ({ ...j, _key: "db_" + j.id, _original_status: j.status }));
    localJobs.value = [...unsavedJobs, ...incomingJobs];
  }, { deep: true });
  watch(() => props.stats, (newStats) => {
    if (newStats) localStats.value = { ...newStats };
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
    if (isExplorer.value && localJobs.value.length >= 1) {
      fireError("Explorer limit: 1 Job Tracked. Upgrade to Architect for unlimited tracking!");
      return;
    }
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
    if (!job.is_new && String(job.id).startsWith("temp_")) {
      console.log("Menunggu ID asli dari server...");
      return;
    }
    if (job.is_saving) return;
    job.is_saving = true;
    if (!job.is_new && job._original_status !== job.status) {
      localStats.value[job._original_status] = Math.max(0, (localStats.value[job._original_status] || 1) - 1);
      localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
      job._original_status = job.status;
    }
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
    if (isNew || String(id).startsWith("temp_")) {
      localJobs.value = localJobs.value.filter((j) => j.id !== id);
      return;
    }
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
      fireErrorWrapper(t("job_error_save", "Gagal menghapus dari server!"));
    }
  };
  const toggleSelection = (jobId, index = -1) => {
    const selIndex = selectedJobs.value.indexOf(jobId);
    selIndex > -1 ? selectedJobs.value.splice(selIndex, 1) : selectedJobs.value.push(jobId);
  };
  const shiftSelect = (index, jobId) => {
    if (selectedJobs.value.length === 0) {
      selectedJobs.value.push(jobId);
      return;
    }
    const lastSelectedId = selectedJobs.value[selectedJobs.value.length - 1];
    const lastIndex = localJobs.value.findIndex((j) => j.id === lastSelectedId);
    if (lastIndex === -1) {
      selectedJobs.value.push(jobId);
      return;
    }
    const start = Math.min(lastIndex, index);
    const end = Math.max(lastIndex, index);
    for (let i = start; i <= end; i++) {
      const id = localJobs.value[i].id;
      if (!selectedJobs.value.includes(id)) {
        selectedJobs.value.push(id);
      }
    }
  };
  const selectAll = () => {
    selectedJobs.value.length === localJobs.value.length ? selectedJobs.value = [] : selectedJobs.value = localJobs.value.map((j) => j.id);
  };
  const bulkDelete = async () => {
    if (selectedJobs.value.length === 0) return;
    if (!confirm(t("job_bulk_delete_confirm", `Hapus ${selectedJobs.value.length} lamaran sekaligus?`))) return;
    const idsToDelete = [...selectedJobs.value];
    const validIds = idsToDelete.filter((id) => !String(id).startsWith("temp_"));
    idsToDelete.forEach((id) => {
      const job = localJobs.value.find((j) => j.id === id);
      if (job) {
        localStats.value.total = Math.max(0, (localStats.value.total || 1) - 1);
        localStats.value[job.status] = Math.max(0, (localStats.value[job.status] || 1) - 1);
      }
    });
    localJobs.value = localJobs.value.filter((j) => !idsToDelete.includes(j.id));
    selectedJobs.value = [];
    if (validIds.length > 0) {
      try {
        await axios.post(route("jobs.bulk-delete"), { ids: validIds }, {
          headers: { "Accept": "application/json" }
        });
        fireError(t("job_bulk_delete_success", "Berhasil dihapus!"), "success", "#10b981");
      } catch (e) {
        fireError(t("job_error_save", "Gagal menghapus masal!"));
      }
    }
  };
  const bulkDuplicate = () => {
    if (selectedJobs.value.length === 0) return;
    const jobsToCopy = localJobs.value.filter((j) => selectedJobs.value.includes(j.id));
    [...jobsToCopy].reverse().forEach((job) => {
      const newJob = {
        ...job,
        id: "temp_" + Date.now() + Math.random().toString(36).substr(2, 5),
        _key: "temp_key_" + Date.now() + Math.random().toString(36).substr(2, 5),
        is_new: true,
        is_saving: false
      };
      localJobs.value.unshift(newJob);
      setTimeout(() => autoSaveRow(newJob), 100);
    });
    selectedJobs.value = [];
    fireError(t("job_bulk_copy_success", `${jobsToCopy.length} baris diduplikasi.`));
  };
  const fireCustomTip = (message, icon = "success", color = "#10b981") => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3e3,
      background: color,
      iconColor: "#ffffff",
      icon,
      title: `<span style="color: white; font-weight: 700; font-size: 14px;">${message}</span>`,
      customClass: { popup: "!rounded-xl !shadow-lg !m-4" }
    });
  };
  const fireErrorWrapper = (msg, icon = "error", color = "#e11d48") => {
    if (icon === "success") {
      fireCustomTip(msg, icon, color);
    } else {
      fireError(msg);
    }
  };
  return {
    localJobs,
    selectedJobs,
    localStats,
    addEmptyRow,
    autoSaveRow,
    deleteJob,
    toggleSelection,
    selectAll,
    shiftSelect,
    bulkDelete,
    bulkDuplicate,
    fireError: fireErrorWrapper
    // Expose for custom alerts if needed
  };
}
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AuthenticatedLayout }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    jobs: Array,
    stats: Object,
    filters: Object,
    uniqueTitles: Array,
    pagination: Object
  },
  setup(__props) {
    const { isExplorer } = useGating();
    const props = __props;
    const {
      localJobs,
      localStats,
      autoSaveRow,
      deleteJob
    } = useJobs(props);
    const todayDate = computed(() => {
      const locale = usePage().props.locale || "id";
      return dayjs().locale(locale).format("dddd, D MMMM YYYY");
    });
    const isAiModalOpen = ref(false);
    const activeJobForScan = ref(null);
    const isMasterModalOpen = ref(false);
    const user = computed(() => usePage().props.auth.user);
    const hasMasterCv = computed(() => !!user.value.resume_text);
    const handleOpenScan = (job) => {
      activeJobForScan.value = job;
      isAiModalOpen.value = true;
    };
    const onMasterSaved = () => {
    };
    onMounted(() => {
      if (isExplorer.value) {
        router.visit(route("billing"));
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("job_page_title", "Job Tracker")
      }, null, _parent));
      _push(`<div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors duration-500"><div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm transition-colors duration-500"><div class="w-full px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5"><div class="flex items-center justify-between gap-4"><div class="flex items-center gap-2.5 sm:gap-3 min-w-0"><div class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none shrink-0 group-hover:scale-110 transition-transform duration-500">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "job",
        size: "24",
        "stroke-width": 3
      }, null, _parent));
      _push(`</div><div class="min-w-0"><h1 class="text-lg sm:text-2xl font-black leading-tight tracking-tight text-slate-800 dark:text-white flex items-center gap-1.5 sm:gap-2 transition-colors duration-500"><span class="truncate">${ssrInterpolate(_ctx.$t("job_page_title", "Job Tracker"))}</span>`);
      if ((_a = __props.pagination) == null ? void 0 : _a.total) {
        _push(`<span class="text-[10px] sm:text-sm font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 sm:px-2.5 py-0.5 rounded-full shrink-0 transition-colors duration-500">${ssrInterpolate(__props.pagination.total)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="mt-0.5 text-[10px] sm:text-sm font-bold text-slate-400 dark:text-slate-500 truncate transition-colors duration-500">${ssrInterpolate(todayDate.value)}</p></div></div><div class="flex items-center gap-3"><button class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2 group relative">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "job",
        size: "18",
        class: hasMasterCv.value ? "text-emerald-500" : "text-slate-400"
      }, null, _parent));
      _push(`<span class="text-[10px] font-bold hidden lg:inline">${ssrInterpolate(hasMasterCv.value ? _ctx.$t("job_master_cv_ready", "CV Ready") : _ctx.$t("job_master_cv_needs_setup", "Setup Master CV"))}</span>`);
      if (!hasMasterCv.value) {
        _push(`<div class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><button class="bg-indigo-600 text-white font-black py-2.5 px-4 sm:px-6 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 shrink-0 relative overflow-hidden group"><div class="bg-white/20 rounded-lg p-0.5 group-hover:rotate-90 transition-transform duration-500">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "plus",
        size: "18",
        "stroke-width": "4"
      }, null, _parent));
      _push(`</div><span class="hidden sm:inline text-xs font-bold">${ssrInterpolate(_ctx.$t("job_add_row", "Tambah Baris"))}</span></button></div></div></div></div><div class="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">`);
      _push(ssrRenderComponent(_sfc_main$2, { module: "Job" }, null, _parent));
      if (unref(localStats)) {
        _push(ssrRenderComponent(_sfc_main$3, { stats: unref(localStats) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$4, {
        filters: __props.filters,
        "unique-titles": __props.uniqueTitles || [],
        "local-jobs": unref(localJobs),
        "total-count": ((_b = __props.pagination) == null ? void 0 : _b.total) || unref(localJobs).length
      }, null, _parent));
      _push(ssrRenderComponent(JobTable, {
        jobs: unref(localJobs),
        onAutoSave: unref(autoSaveRow),
        onDelete: unref(deleteJob),
        onScan: handleOpenScan
      }, null, _parent));
      if (isAiModalOpen.value) {
        _push(ssrRenderComponent(ResumeAiModal, {
          show: isAiModalOpen.value,
          "initial-job-description": ((_c = activeJobForScan.value) == null ? void 0 : _c.notes) || ((_d = activeJobForScan.value) == null ? void 0 : _d.title),
          "job-title": (_e = activeJobForScan.value) == null ? void 0 : _e.title,
          company: (_f = activeJobForScan.value) == null ? void 0 : _f.company,
          onClose: ($event) => isAiModalOpen.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isMasterModalOpen.value) {
        _push(ssrRenderComponent(_sfc_main$5, {
          show: isMasterModalOpen.value,
          onClose: ($event) => isMasterModalOpen.value = false,
          onSaved: onMasterSaved
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-5 flex items-center justify-start"><p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 bg-indigo-50/50 dark:bg-indigo-500/10 px-4 py-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900/30 shadow-sm transition-all duration-500"><span class="text-indigo-500 dark:text-indigo-400 text-base">💡</span> ${ssrInterpolate(_ctx.$t("job_tips", "Tips: Klik sel pada tabel untuk mengedit. Data otomatis tersimpan saat berpindah sel."))}</p></div></div></div><!--]-->`);
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
