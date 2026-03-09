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
      { key: "all", labelKey: "job_status_all", icon: "📋", color: "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200" },
      { key: "wishlist", labelKey: "job_status_wishlist", icon: "💭", color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" },
      { key: "applied", labelKey: "job_status_applied", icon: "📤", color: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100" },
      { key: "interview", labelKey: "job_status_interview", icon: "🎤", color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100" },
      { key: "offer", labelKey: "job_status_offer", icon: "🎉", color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" },
      { key: "rejected", labelKey: "job_status_rejected", icon: "❌", color: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100" },
      { key: "accepted", labelKey: "job_status_accepted", icon: "✅", color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm border-white/60" }, _attrs))}><div class="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center overflow-visible"><div class="relative flex-1 min-w-0"><div class="relative"><svg class="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><input${ssrRenderAttr("value", search.value)} type="text"${ssrRenderAttr("placeholder", _ctx.$t("job_filter_search_placeholder", "Cari posisi, perusahaan, lokasi..."))} class="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all font-medium text-slate-700 placeholder:text-slate-400">`);
      if (search.value) {
        _push(`<button class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showDropdown.value && suggestions.value.length > 0) {
        _push(`<div class="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"><div class="px-3 py-2 text-[11px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100"> ✨ ${ssrInterpolate(_ctx.$t("job_filter_autocomplete_label", "Posisi yang kamu lamar"))}</div><!--[-->`);
        ssrRenderList(suggestions.value, (title) => {
          _push(`<button class="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center gap-2.5"><span class="text-indigo-400">💼</span> ${ssrInterpolate(title)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-1.5 flex-wrap shrink-0"><span class="text-xs font-bold text-slate-400 mr-1">${ssrInterpolate(_ctx.$t("job_filter_applied_label", "Dilamar:"))}</span><!--[-->`);
      ssrRenderList(datePills, (d) => {
        _push(`<button class="${ssrRenderClass([
          "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
          activeDays.value === d.key ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200" : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
        ])}">${ssrInterpolate(_ctx.$t(d.labelKey))}</button>`);
      });
      _push(`<!--]--></div></div><div class="px-4 py-3 flex flex-wrap items-center gap-2"><span class="text-xs font-bold text-slate-400 mr-1">${ssrInterpolate(_ctx.$t("job_filter_status_label", "Status:"))}</span><!--[-->`);
      ssrRenderList(statusPills, (pill) => {
        _push(`<button class="${ssrRenderClass([
          "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5",
          activeStatus.value === pill.key ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200 scale-105" : pill.color + " border"
        ])}"><span>${ssrInterpolate(pill.icon)}</span> ${ssrInterpolate(_ctx.$t(pill.labelKey))}</button>`);
      });
      _push(`<!--]-->`);
      if (activeFiltersCount.value > 0) {
        _push(`<div class="ml-auto flex items-center gap-2"><span class="text-xs text-slate-500 font-medium">${ssrInterpolate(__props.totalCount)} ${ssrInterpolate(_ctx.$t("job_filter_results", "hasil"))}</span><button class="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-all flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg> ${ssrInterpolate(_ctx.$t("job_filter_clear", "Hapus Filter"))} (${ssrInterpolate(activeFiltersCount.value)}) </button></div>`);
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
