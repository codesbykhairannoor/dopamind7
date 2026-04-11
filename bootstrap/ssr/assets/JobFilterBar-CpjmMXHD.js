import { ref, computed, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "JobFilterBar",
  __ssrInlineRender: true,
  props: {
    filters: { type: Object, default: () => ({}) },
    uniqueTitles: { type: Array, default: () => [] },
    localJobs: { type: Array, default: () => [] },
    totalCount: { type: Number, default: 0 }
  },
  setup(__props) {
    const props = __props;
    ref(null);
    const search = ref(props.filters.search || "");
    const activeStatus = ref(props.filters.status || "all");
    const activeDays = ref(props.filters.days || null);
    const showDropdown = ref(false);
    const allUniqueTitles = computed(() => {
      const localTitles = props.localJobs.map((j) => j.title).filter(Boolean);
      return [.../* @__PURE__ */ new Set([...props.uniqueTitles, ...localTitles])].sort();
    });
    const suggestions = computed(() => {
      if (!search.value || search.value.length < 1) return [];
      const q = search.value.toLowerCase();
      return allUniqueTitles.value.filter((t) => t.toLowerCase().includes(q)).slice(0, 8);
    });
    const statusPills = [
      { key: "all", labelKey: "job_status_all", icon: "📋", color: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700" },
      { key: "wishlist", labelKey: "job_status_wishlist", icon: "💭", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20" },
      { key: "applied", labelKey: "job_status_applied", icon: "📤", color: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20 hover:bg-yellow-100 dark:hover:bg-yellow-500/20" },
      { key: "interview", labelKey: "job_status_interview", icon: "🎤", color: "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20 hover:bg-purple-100 dark:hover:bg-purple-500/20" },
      { key: "offer", labelKey: "job_status_offer", icon: "🎉", color: "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20 hover:bg-green-100 dark:hover:bg-green-500/20" },
      { key: "rejected", labelKey: "job_status_rejected", icon: "❌", color: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20" },
      { key: "accepted", labelKey: "job_status_accepted", icon: "✅", color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20" }
    ];
    const datePills = [
      { key: null, labelKey: "job_filter_all_time" },
      { key: 3, labelKey: "job_filter_3_days" },
      { key: 7, labelKey: "job_filter_7_days" },
      { key: 30, labelKey: "job_filter_30_days" },
      { key: 90, labelKey: "job_filter_90_days" }
    ];
    const activeFiltersCount = computed(() => {
      let count = 0;
      if (search.value) count++;
      if (activeStatus.value !== "all") count++;
      if (activeDays.value) count++;
      return count;
    });
    watch(search, (val) => {
      showDropdown.value = val.length > 0 && suggestions.value.length > 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-white/60 dark:border-slate-800 transition-colors duration-500" }, _attrs))}><div class="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-start sm:items-center overflow-visible transition-colors duration-500"><div class="relative flex-1 min-w-0"><div class="relative"><svg class="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><input${ssrRenderAttr("value", search.value)} type="text"${ssrRenderAttr("placeholder", _ctx.$t("job_filter_search_placeholder", "Cari posisi, perusahaan, lokasi..."))} class="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600">`);
      if (search.value) {
        _push(`<button class="absolute right-3 top-2.5 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showDropdown.value && suggestions.value.length > 0) {
        _push(`<div class="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden transition-colors duration-500"><div class="px-3 py-2 text-[11px] font-black capitalize tracking-wide text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800"> ✨ ${ssrInterpolate(_ctx.$t("job_filter_autocomplete_label", "Posisi yang kamu lamar"))}</div><!--[-->`);
        ssrRenderList(suggestions.value, (title) => {
          _push(`<button class="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors flex items-center gap-2.5"><span class="text-indigo-400">💼</span> ${ssrInterpolate(title)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-1.5 flex-wrap shrink-0"><span class="text-xs font-bold text-slate-400 mr-1">${ssrInterpolate(_ctx.$t("job_filter_applied_label", "Dilamar:"))}</span><!--[-->`);
      ssrRenderList(datePills, (d) => {
        _push(`<button class="${ssrRenderClass([
          "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
          activeDays.value === d.key ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100 dark:shadow-none" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
        ])}">${ssrInterpolate(_ctx.$t(d.labelKey))}</button>`);
      });
      _push(`<!--]--></div></div><div class="px-4 py-3 flex flex-wrap items-center gap-2"><span class="text-xs font-bold text-slate-400 mr-1">${ssrInterpolate(_ctx.$t("job_filter_status_label", "Status:"))}</span><!--[-->`);
      ssrRenderList(statusPills, (pill) => {
        _push(`<button class="${ssrRenderClass([
          "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5",
          activeStatus.value === pill.key ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100 dark:shadow-none scale-105" : pill.color + " border"
        ])}"><span>${ssrInterpolate(pill.icon)}</span> ${ssrInterpolate(_ctx.$t(pill.labelKey))}</button>`);
      });
      _push(`<!--]-->`);
      if (activeFiltersCount.value > 0) {
        _push(`<div class="ml-auto flex items-center gap-2"><span class="text-xs text-slate-500 font-medium">${ssrInterpolate(__props.totalCount)} ${ssrInterpolate(_ctx.$t("job_filter_results", "hasil"))}</span><button class="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg> ${ssrInterpolate(_ctx.$t("job_filter_clear", "Hapus Filter"))} (${ssrInterpolate(activeFiltersCount.value)}) </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Job/JobFilterBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
