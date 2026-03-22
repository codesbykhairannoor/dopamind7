import { ref, watch, computed, resolveComponent, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-Ckw7xNt_.js";
import Swal from "sweetalert2";
import { trans } from "laravel-vue-i18n";
import { u as useGating } from "./useGating-BUjC1kMM.js";
import JobTable from "./JobTable-4B3oW692.js";
import _sfc_main$1 from "./JobStats-BpSSUFiH.js";
import _sfc_main$2 from "./JobFilterBar-CTKZd9Vu.js";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "./OneForMindIcon-Dc5dmmrC.js";
import "./useAppearance-rDoGVD4_.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./JobDatePicker-BnIcdi4y.js";
import "dayjs/plugin/localeData.js";
import "./useJobUI-ByDCvN_C.js";
import "./JobStatusDropdown-DkIU9YDv.js";
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
    const { isExplorer, canUse } = useGating();
    const props = __props;
    const {
      localJobs,
      selectedJobs,
      localStats,
      autoSaveRow,
      deleteJob,
      toggleSelection,
      selectAll,
      shiftSelect
    } = useJobs(props);
    const todayDate = computed(() => {
      const locale = usePage().props.locale || "id";
      return dayjs().locale(locale).format("dddd, D MMMM YYYY");
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_OneForMindIcon = resolveComponent("OneForMindIcon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("job_page_title", "Job Tracker")
      }, null, _parent));
      _push(`<div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors duration-500"><div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm transition-colors duration-500"><div class="w-full px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5"><div class="flex items-center justify-between gap-4"><div class="flex items-center gap-2.5 sm:gap-3 min-w-0"><div class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100 shrink-0">`);
      _push(ssrRenderComponent(_component_OneForMindIcon, {
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
      _push(`</h1><p class="mt-0.5 text-[10px] sm:text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 truncate transition-colors duration-500">${ssrInterpolate(todayDate.value)}</p></div></div><div class="hidden xl:flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-800 border-x border-slate-200 dark:border-slate-800 transition-colors"><div class="flex flex-col items-end"><span class="text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">${ssrInterpolate(_ctx.$t("quantum_feature", "Quantum AI"))}</span><span class="text-xs font-bold text-slate-400 dark:text-slate-500">${ssrInterpolate(_ctx.$t("job_ai_tailor", "Resume Tailor"))}</span></div><button${ssrIncludeBooleanAttr(!unref(canUse)("finance_ai_audit")) ? " disabled" : ""} class="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm opacity-50 grayscale cursor-not-allowed">`);
      if (!unref(canUse)("finance_ai_audit")) {
        _push(`<span>🔒</span>`);
      } else {
        _push(`<span>🤖</span>`);
      }
      _push(`</button></div><button class="bg-indigo-600 text-white font-black py-2.5 px-4 sm:px-6 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2 shrink-0 relative overflow-hidden">`);
      if (unref(isExplorer)) {
        _push(`<span class="mr-1">🔒</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_OneForMindIcon, {
        name: "plus",
        size: "18",
        "stroke-width": "4"
      }, null, _parent));
      _push(`<span class="hidden sm:inline">${ssrInterpolate(_ctx.$t("job_add_row", "Tambah Baris"))}</span></button></div></div></div><div class="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">`);
      if (unref(localStats)) {
        _push(ssrRenderComponent(_sfc_main$1, { stats: unref(localStats) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, {
        filters: __props.filters,
        "unique-titles": __props.uniqueTitles || [],
        "local-jobs": unref(localJobs),
        "total-count": ((_b = __props.pagination) == null ? void 0 : _b.total) || unref(localJobs).length
      }, null, _parent));
      if (unref(selectedJobs).length > 0) {
        _push(`<div class="mb-5 bg-indigo-600 text-white rounded-2xl p-4 shadow-lg shadow-indigo-200 flex items-center justify-between sticky top-24 z-30"><div class="flex items-center gap-3"><span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black">${ssrInterpolate(unref(selectedJobs).length)}</span><span class="font-bold text-sm sm:text-base tracking-wide">${ssrInterpolate(_ctx.$t("job_bulk_selected", "Baris Terpilih"))}</span></div><div class="flex items-center gap-2 sm:gap-4"><button class="px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">`);
        _push(ssrRenderComponent(_component_OneForMindIcon, {
          name: "planner",
          size: "16"
        }, null, _parent));
        _push(` <span class="hidden sm:inline">${ssrInterpolate(_ctx.$t("job_bulk_copy", "Duplikat"))}</span></button><button class="px-3 sm:px-4 py-2 bg-rose-500 hover:bg-rose-400 active:scale-95 text-white shadow-md shadow-rose-500/30 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">`);
        _push(ssrRenderComponent(_component_OneForMindIcon, {
          name: "trash",
          size: "16"
        }, null, _parent));
        _push(` <span class="hidden sm:inline">${ssrInterpolate(_ctx.$t("job_bulk_delete", "Hapus Sekaligus"))}</span></button><div class="w-px h-6 bg-white/20 mx-1"></div><button class="p-2 text-indigo-200 hover:text-white transition-colors" title="Batal Pilih Semua">`);
        _push(ssrRenderComponent(_component_OneForMindIcon, {
          name: "x",
          size: "20",
          "stroke-width": "2.5"
        }, null, _parent));
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(JobTable, {
        jobs: unref(localJobs),
        "selected-jobs": unref(selectedJobs),
        onToggleSelection: unref(toggleSelection),
        onShiftSelect: unref(shiftSelect),
        onSelectAll: unref(selectAll),
        onAutoSave: unref(autoSaveRow),
        onDelete: unref(deleteJob)
      }, null, _parent));
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
