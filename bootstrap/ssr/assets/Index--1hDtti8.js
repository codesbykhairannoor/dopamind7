import { useSSRContext, computed, unref, withCtx, createVNode, createTextVNode } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./OneForMindIcon-BiMr3Mnd.js";
import "sweetalert2";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    plan: {
      type: String,
      required: true
    },
    price: String,
    currency: String,
    features: Array
  },
  setup(__props) {
    const props = __props;
    computed(() => props.plan.toLowerCase().includes("architect"));
    computed(() => props.plan.toLowerCase().includes("quantum"));
    const isLegendary = computed(() => props.plan.toLowerCase().includes("lifetime") || props.plan.toLowerCase().includes("legendary"));
    const periodLabel = computed(() => {
      if (isLegendary.value) return "One-Time Payment";
      const priceStr = props.price.toLowerCase();
      if (priceStr.includes("79") || priceStr.includes("109")) return "per Year";
      return "per Month";
    });
    const displayPrice = computed(() => {
      if (!periodLabel.value.toLowerCase().includes("year")) return props.price;
      const numericValue = parseInt(props.price.replace(/[^\d]/g, ""));
      if (isNaN(numericValue)) return props.price;
      const total = numericValue * 12;
      return "Rp " + total.toLocaleString("id-ID");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Checkout Summary" }, null, _parent));
      _push(`<div class="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-indigo-100 dark:selection:bg-indigo-900/40" data-v-1c177ec2><nav class="w-full px-6 py-10 flex items-center justify-between relative z-50" data-v-1c177ec2><div data-v-1c177ec2></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("billing"),
        class: "text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em] flex items-center gap-2 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              name: "chevron-left",
              size: "14",
              class: "transition-transform group-hover:-translate-x-1",
              "stroke-width": "4"
            }, null, _parent2, _scopeId));
            _push2(` Back to Pricing `);
          } else {
            return [
              createVNode(_sfc_main$2, {
                name: "chevron-left",
                size: "14",
                class: "transition-transform group-hover:-translate-x-1",
                "stroke-width": "4"
              }),
              createTextVNode(" Back to Pricing ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="fixed inset-0 overflow-hidden pointer-events-none -z-10" data-v-1c177ec2><div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" data-v-1c177ec2></div><div class="absolute top-[40%] -right-[10%] w-[30%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" data-v-1c177ec2></div><div class="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] bg-indigo-500/5 blur-[120px] rounded-full" data-v-1c177ec2></div></div><main class="w-full px-6 py-12 md:py-20 lg:py-24 relative z-10" data-v-1c177ec2><div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center" data-v-1c177ec2><div class="space-y-12 animate-in fade-in slide-in-from-left-8 duration-700" data-v-1c177ec2><div data-v-1c177ec2><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-black text-[10px] mb-6 uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20 shadow-sm" data-v-1c177ec2> 🔒 Secure Subscription Checkout </div><h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter" data-v-1c177ec2> Upgrade to <br data-v-1c177ec2><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-400 dark:to-indigo-200" data-v-1c177ec2>${ssrInterpolate(__props.plan)} Experience</span></h1><p class="text-lg text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-md" data-v-1c177ec2> Bergabunglah dengan ribuan achiever lainnya yang telah mengoptimalkan hidup mereka dengan ekosistem kami. </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-1c177ec2><!--[-->`);
      ssrRenderList(__props.features, (feat) => {
        _push(`<div class="flex gap-4 p-4 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:scale-105 duration-300" data-v-1c177ec2><div class="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0" data-v-1c177ec2>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          name: "check",
          size: "14",
          class: "text-emerald-500",
          "stroke-width": "4"
        }, null, _parent));
        _push(`</div><span class="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight flex items-center" data-v-1c177ec2>${ssrInterpolate(feat)}</span></div>`);
      });
      _push(`<!--]--></div><div class="pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500" data-v-1c177ec2><div class="flex items-center gap-2" data-v-1c177ec2>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        name: "lock",
        size: "16",
        class: "text-slate-400"
      }, null, _parent));
      _push(`<span class="text-[10px] font-black uppercase tracking-widest text-slate-500" data-v-1c177ec2>Bank-Level Security</span></div><div class="flex items-center gap-2" data-v-1c177ec2>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        name: "shield-check",
        size: "16",
        class: "text-slate-400"
      }, null, _parent));
      _push(`<span class="text-[10px] font-black uppercase tracking-widest text-slate-500" data-v-1c177ec2>Certified Encryption</span></div></div></div><div class="relative animate-in fade-in slide-in-from-bottom-12 duration-1000" data-v-1c177ec2><div class="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/10 blur-[120px] rounded-full scale-150 -z-10" data-v-1c177ec2></div><div class="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-100 dark:shadow-none ring-1 ring-slate-200/50 dark:ring-slate-800" data-v-1c177ec2><div class="flex items-center justify-between mb-12 p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700" data-v-1c177ec2><div data-v-1c177ec2><h3 class="text-xl font-black text-slate-900 dark:text-white mb-1" data-v-1c177ec2>Total Due</h3><p class="text-[10px] font-black text-indigo-600 uppercase tracking-widest" data-v-1c177ec2>${ssrInterpolate(periodLabel.value)}</p></div><div class="text-right" data-v-1c177ec2><span class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter" data-v-1c177ec2>${ssrInterpolate(displayPrice.value)}</span></div></div><h2 class="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center" data-v-1c177ec2>Select Payment</h2><div class="space-y-5 mb-10" data-v-1c177ec2><button class="w-full group relative overflow-hidden p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-white transition-all text-left shadow-sm" data-v-1c177ec2><div class="flex items-center justify-between relative z-10" data-v-1c177ec2><div class="flex items-center gap-5" data-v-1c177ec2><div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-110" data-v-1c177ec2>🇮🇩</div><div data-v-1c177ec2><h4 class="font-black text-slate-800 dark:text-white" data-v-1c177ec2>Duitku Local (IDR)</h4><p class="text-[10px] font-bold text-slate-400" data-v-1c177ec2>QRIS, Virtual Account, &amp; Bank Transfer</p></div></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        name: "chevron-right",
        size: "18",
        class: "text-slate-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-1",
        "stroke-width": "4"
      }, null, _parent));
      _push(`</div></button><button class="w-full group relative overflow-hidden p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-white transition-all text-left shadow-sm" data-v-1c177ec2><div class="flex items-center justify-between relative z-10" data-v-1c177ec2><div class="flex items-center gap-5" data-v-1c177ec2><div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-110" data-v-1c177ec2>🌍</div><div data-v-1c177ec2><h4 class="font-black text-slate-800 dark:text-white" data-v-1c177ec2>PayPal / Card (USD)</h4><p class="text-[10px] font-bold text-slate-400" data-v-1c177ec2>International CC &amp; PayPal Wallet</p></div></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        name: "chevron-right",
        size: "18",
        class: "text-slate-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-1",
        "stroke-width": "4"
      }, null, _parent));
      _push(`</div></button></div><div class="text-center space-y-6" data-v-1c177ec2><p class="text-[10px] font-bold text-slate-400 italic" data-v-1c177ec2> Your subscription starts immediately upon successful payment. </p><div class="flex items-center justify-center gap-4" data-v-1c177ec2><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" class="h-4 opacity-40 grayscale group-hover:grayscale-0 transition-opacity" data-v-1c177ec2><div class="w-px h-4 bg-slate-200" data-v-1c177ec2></div><span class="text-[8px] font-black text-slate-400 uppercase tracking-widest" data-v-1c177ec2>Powered by Stripe &amp; Duitku</span></div></div></div></div></div></main><footer class="mt-auto py-12 text-center" data-v-1c177ec2><p class="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.4em]" data-v-1c177ec2>© 2026 OneForMind - The Infinite Ecosystem</p></footer></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Checkout/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1c177ec2"]]);
export {
  Index as default
};
