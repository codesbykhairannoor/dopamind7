import { ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import axios from "axios";
import { _ as _sfc_main$1 } from "./OneForMindIcon-P6BN87YE.js";
const _sfc_main = {
  __name: "NeuralBridge",
  __ssrInlineRender: true,
  props: {
    module: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const synergy = ref(null);
    const loading = ref(true);
    const fetchSynergy = async () => {
      loading.value = true;
      try {
        const response = await axios.post(route("coach.synergy"), { module: props.module });
        synergy.value = response.data;
      } catch (e) {
        console.error("Failed to fetch module synergy", e);
      } finally {
        loading.value = false;
      }
    };
    onMounted(() => {
      fetchSynergy();
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (loading.value || synergy.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "group relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5" }, _attrs))}><div class="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "80"
        }, null, _parent));
        _push(`</div><div class="flex items-start gap-4 relative z-10"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "20",
          class: "text-white"
        }, null, _parent));
        _push(`</div><div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1"><span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Neural Bridge</span><div class="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></div></div>`);
        if (loading.value) {
          _push(`<div class="space-y-2 py-1"><div class="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full animate-pulse"></div><div class="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3 animate-pulse"></div></div>`);
        } else if (synergy.value) {
          _push(`<p class="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic"> &quot;${ssrInterpolate(synergy.value.bridge)}&quot; </p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NeuralBridge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
