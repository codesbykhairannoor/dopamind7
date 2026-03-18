import { onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "PremiumSubscriptionForm",
  __ssrInlineRender: true,
  props: {
    midtransClientKey: String
  },
  setup(__props) {
    const props = __props;
    const user = usePage().props.auth.user;
    onMounted(() => {
      if (!window.snap) {
        const isProduction = usePage().props.midtrans_is_production;
        const script = document.createElement("script");
        script.src = isProduction ? "https://app.midtrans.com/snap/snap.js" : "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", props.midtransClientKey);
        document.head.appendChild(script);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><header><h2 class="text-lg font-black text-slate-800 uppercase tracking-widest">${ssrInterpolate(unref(user).is_premium ? "Premium Status" : "Upgrade to Premium")}</h2><p class="mt-1 text-sm text-slate-500 font-medium">${ssrInterpolate(unref(user).is_premium ? "Anda telah menikmati akses Premium. Terima kasih atas dukungan Anda!" : "Buka semua fitur eksklusif, limit lebih tinggi, dan dukung perkembangan platform ini.")}</p></header>`);
      if (unref(user).is_premium) {
        _push(`<div class="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4"><div class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-100"> ✨ </div><div><p class="text-sm font-black text-emerald-800 uppercase tracking-tight">Pro Plan Aktif</p>`);
        if (unref(user).premium_until) {
          _push(`<p class="text-xs text-emerald-600 font-bold"> Valid hingga: ${ssrInterpolate(new Date(unref(user).premium_until).toLocaleDateString())}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<div class="p-6 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:border-indigo-400"><div class="flex items-center gap-4"><div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-indigo-100"> 💎 </div><div><h3 class="text-xl font-black text-slate-900 tracking-tight">Architect Pro</h3><p class="text-sm text-indigo-600 font-bold">Hanya Rp 10.000 / Bulan</p></div></div><button class="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition transform hover:-translate-y-1 active:scale-95"> Upgrade Sekarang </button></div>`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/PremiumSubscriptionForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
