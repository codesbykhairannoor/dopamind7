import { computed, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Error",
  __ssrInlineRender: true,
  props: { status: Number },
  setup(__props) {
    const props = __props;
    const title = computed(() => {
      return {
        503: "503: Service Unavailable",
        500: "500: Server Error",
        404: "404: Page Not Found",
        403: "403: Forbidden"
      }[props.status] || "Error";
    });
    const description = computed(() => {
      return {
        503: "Maaf bro, server lagi maintenance sebentar. Balik lagi nanti ya!",
        500: "Waduh, ada kabel putus di server kita. Tim OneForMind lagi benerin!",
        404: "Halaman yang lu cari nggak ada bro, mungkin nyasar.",
        403: "Eits, lu nggak punya akses masuk ke sini!"
      }[props.status] || "Ada kendala teknis yang nggak terduga.";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: title.value }, null, _parent));
      _push(`<div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center"><div class="bg-white p-10 rounded-[3rem] shadow-2xl max-w-md border border-slate-100 animate-in zoom-in-95 duration-300"><div class="text-7xl mb-6">🛠️</div><h1 class="text-3xl font-black text-slate-800 mb-2">${ssrInterpolate(title.value)}</h1><p class="text-slate-500 font-bold mb-8 leading-relaxed">${ssrInterpolate(description.value)}</p><a href="/dashboard" class="inline-block w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 active:scale-95 transition-all"> Gaskeun Balik ke Dashboard! </a></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
