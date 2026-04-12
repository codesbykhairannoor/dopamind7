import { ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { marked } from "marked";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BiMr3Mnd.js";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ResumeAiModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    initialJobDescription: String,
    jobTitle: String,
    company: String
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const jobDescription = ref(props.initialJobDescription || "");
    const masterCvPreview = ref(localStorage.getItem("master_cv_preview"));
    const masterCvName = ref(localStorage.getItem("master_cv_name"));
    const isLoading = ref(false);
    const analysisResult = ref("");
    const error = ref("");
    const htmlAnalysis = computed(() => {
      if (!analysisResult.value) return "";
      return marked.parse(analysisResult.value);
    });
    const goToCoachLink = computed(() => {
      var _a;
      const msg = `Halo AI Coach, saya baru saja scan Master CV saya untuk posisi ${props.jobTitle} di ${props.company}. Berdasarkan scan, dapet skor ${((_a = analysisResult.value.match(/(\d+)%/)) == null ? void 0 : _a[0]) || ""}. Bisa bantu saya optimalkan CV atau simulasi interview?`;
      return route("coach.index", { initial_message: msg });
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[100] flex items-center justify-center p-4" }, _attrs))} data-v-19f11c4a><div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" data-v-19f11c4a></div><div class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300" data-v-19f11c4a><div class="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between" data-v-19f11c4a><div class="flex items-center gap-4" data-v-19f11c4a><div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white" data-v-19f11c4a>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "20"
        }, null, _parent));
        _push(`</div><h2 class="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight" data-v-19f11c4a>Neural Probability</h2></div><button class="p-2 text-slate-400 hover:text-rose-500 transition-all" data-v-19f11c4a>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "x",
          size: "20",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button></div><div class="p-8 space-y-6" data-v-19f11c4a><div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all" data-v-19f11c4a><div class="flex items-center gap-3 min-w-0" data-v-19f11c4a><div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0" data-v-19f11c4a>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "check",
          size: "16",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</div><span class="text-xs font-black text-slate-700 dark:text-slate-300 truncate" data-v-19f11c4a>${ssrInterpolate(masterCvName.value || "Belum ada Master CV")}</span></div>`);
        if (!masterCvPreview.value) {
          _push(`<div class="text-[10px] font-black text-rose-500 uppercase flex items-center gap-1" data-v-19f11c4a>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "x",
            size: "12"
          }, null, _parent));
          _push(` Perlu Setup </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-3" data-v-19f11c4a><label class="text-[10px] font-black uppercase tracking-widest text-slate-400" data-v-19f11c4a>Deskripsi Pekerjaan / Title</label><textarea class="w-full h-32 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-sm font-bold p-4 resize-none transition-all placeholder-slate-300 dark:placeholder-slate-700" placeholder="Masukkan deskripsi kerja atau posisi..." data-v-19f11c4a>${ssrInterpolate(jobDescription.value)}</textarea></div><button${ssrIncludeBooleanAttr(isLoading.value || !masterCvPreview.value || !jobDescription.value) ? " disabled" : ""} class="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale" data-v-19f11c4a>`);
        if (!isLoading.value) {
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "sparkles",
            size: "16",
            "stroke-width": "3"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "refresh",
            size: "16",
            class: "animate-spin"
          }, null, _parent));
        }
        _push(`<span data-v-19f11c4a>${ssrInterpolate(isLoading.value ? "Predicting Chance..." : "Hitung Persentase Peluang")}</span></button>`);
        if (analysisResult.value) {
          _push(`<div class="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 space-y-6" data-v-19f11c4a><div class="prose prose-slate dark:prose-invert prose-sm max-w-none prose-h1:text-3xl prose-h1:text-indigo-600 dark:prose-h1:text-indigo-400 prose-h1:font-black prose-p:font-bold prose-p:text-slate-700 dark:prose-p:text-slate-300" data-v-19f11c4a>${htmlAnalysis.value ?? ""}</div><div class="h-px bg-indigo-100 dark:bg-indigo-500/20" data-v-19f11c4a></div><div class="flex flex-col gap-3" data-v-19f11c4a>`);
          _push(ssrRenderComponent(unref(Link), {
            href: goToCoachLink.value,
            class: "w-full py-4 rounded-xl bg-indigo-600 text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  name: "premium",
                  size: "14"
                }, null, _parent2, _scopeId));
                _push2(` Diskusi Detail dengan AI Coach `);
              } else {
                return [
                  createVNode(_sfc_main$1, {
                    name: "premium",
                    size: "14"
                  }),
                  createTextVNode(" Diskusi Detail dengan AI Coach ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<p class="text-[9px] font-bold text-slate-400 text-center uppercase tracking-tighter" data-v-19f11c4a>AI Coach akan memberimu simulasi interview &amp; optimasi CV secara mendalam.</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (error.value) {
          _push(`<p class="text-center text-rose-500 text-xs font-bold" data-v-19f11c4a>${ssrInterpolate(error.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Job/ResumeAiModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ResumeAiModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-19f11c4a"]]);
export {
  ResumeAiModal as default
};
