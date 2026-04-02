import { ref, computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-XnqvYLta.js";
import { Head } from "@inertiajs/vue3";
import axios from "axios";
import Swal from "sweetalert2";
import { _ as _sfc_main$1 } from "./OneForMindIcon-P6BN87YE.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useAppearance-rDoGVD4_.js";
const _sfc_main = {
  __name: "Pricing",
  __ssrInlineRender: true,
  setup(__props) {
    const isAnnual = ref(true);
    const plans = computed(() => [
      {
        name: "pricing_l1_name",
        slug: "explorer",
        price: "0",
        period: "pricing_forever",
        desc: "pricing_l1_desc",
        features: [
          "pricing_feat_l1_habits",
          "pricing_feat_l1_finance"
        ],
        buttonText: "pricing_free_btn",
        buttonLink: "#",
        highlight: false,
        theme: "slate"
      },
      {
        name: "pricing_l2_name",
        slug: "architect",
        price: isAnnual.value ? "Rp 59k" : "Rp 89k",
        initial: "pricing_l2_initial",
        recurring: "pricing_l2_recurring",
        desc: "pricing_l2_desc",
        features: [
          "pricing_feat_l2_habits",
          "pricing_feat_l2_finance",
          "pricing_feat_month_trial"
        ],
        buttonText: "pricing_pro_btn",
        buttonLink: "#",
        highlight: false,
        theme: "indigo"
      },
      {
        name: "pricing_l3_name",
        slug: "quantum",
        price: isAnnual.value ? "Rp 99k" : "Rp 129k",
        initial: "pricing_l3_initial",
        recurring: "pricing_l3_recurring",
        desc: "pricing_l3_desc",
        features: [
          "pricing_feat_l3_ai_coach",
          "pricing_feat_l3_wealth",
          "pricing_feat_l3_insights"
        ],
        buttonText: "pricing_ai_btn",
        buttonLink: "#",
        highlight: true,
        theme: "premium",
        badge: "pricing_ai_badge"
      },
      {
        name: "pricing_l4_name",
        slug: "lifetime",
        price: isAnnual.value ? "Rp 159k" : "Rp 199k",
        initial: "pricing_l4_initial",
        recurring: "pricing_l4_recurring",
        desc: "pricing_l4_desc",
        features: [
          "pricing_feat_l4_triggers",
          "pricing_feat_l4_war_room",
          "pricing_feat_l4_vip"
        ],
        buttonText: "pricing_l4_btn",
        buttonLink: "#",
        highlight: false,
        theme: "dark",
        badge: "pricing_l4_badge"
      }
    ]);
    const checkout = async (plan) => {
      var _a, _b;
      if (plan.slug === "explorer") return;
      try {
        Swal.fire({
          title: "Preparing Secure Checkout...",
          html: "Connecting to Duitku safe gateway",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        const response = await axios.post(route("payment.checkout"), {
          plan: plan.slug
        });
        if (response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          throw new Error("Failed to get payment URL");
        }
      } catch (error) {
        console.error("Checkout error:", error);
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || "Sedang terjadi gangguan pada server pembayaran. Mohon coba beberapa saat lagi.",
          confirmButtonColor: "#4f46e5"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("pricing_meta_title")
      }, null, _parent));
      _push(ssrRenderComponent(AuthenticatedLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen bg-slate-50/30 dark:bg-slate-900/10" data-v-80f5dfee${_scopeId}><div class="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700" data-v-80f5dfee${_scopeId}><div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-black text-[10px] mb-6 uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20 shadow-sm" data-v-80f5dfee${_scopeId}> ✨ ${ssrInterpolate(_ctx.$t("pricing_badge"))}</div><h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_title_1"))} <span class="text-indigo-600 dark:text-indigo-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_title_2"))}</span></h1><p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-bold" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_subtitle"))}</p><div class="flex items-center justify-center gap-6" data-v-80f5dfee${_scopeId}><span class="${ssrRenderClass([!isAnnual.value ? "text-slate-900 dark:text-white" : "text-slate-400", "text-sm font-black transition-colors duration-300"])}" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_monthly"))}</span><button class="relative w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-800 p-1 transition-all duration-500 hover:ring-4 hover:ring-indigo-100 dark:hover:ring-indigo-900/30" data-v-80f5dfee${_scopeId}><div class="${ssrRenderClass([isAnnual.value ? "translate-x-8" : "translate-x-0", "w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-lg transform transition-transform duration-500 ease-in-out"])}" data-v-80f5dfee${_scopeId}></div></button><span class="${ssrRenderClass([isAnnual.value ? "text-slate-900 dark:text-white" : "text-slate-400", "text-sm font-black transition-colors duration-300"])}" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_yearly"))}</span><div class="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-tighter border border-emerald-200 dark:border-emerald-500/20 shadow-sm" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_save_amount"))}</div></div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch" data-v-80f5dfee${_scopeId}><!--[-->`);
            ssrRenderList(plans.value, (plan, index) => {
              _push2(`<div class="${ssrRenderClass([[
                plan.highlight ? "bg-white dark:bg-slate-800 border-indigo-600 dark:border-indigo-500 shadow-2xl shadow-indigo-100 dark:shadow-none scale-105 z-10" : "bg-white/70 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-100 dark:shadow-none",
                plan.theme === "premium" ? "ring-4 ring-indigo-600/5 dark:ring-indigo-400/5" : "",
                plan.theme === "dark" ? "bg-slate-900 dark:bg-black text-white border-slate-800" : ""
              ], "group relative flex flex-col p-6 rounded-[2.5rem] transition-all duration-500 border hover:-translate-y-2"])}" data-v-80f5dfee${_scopeId}>`);
              if (plan.badge) {
                _push2(`<div class="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white text-[8px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t(plan.badge))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mb-6" data-v-80f5dfee${_scopeId}><h3 class="${ssrRenderClass([plan.theme === "dark" ? "text-indigo-400" : "text-slate-400 dark:text-slate-500", "text-[10px] font-black uppercase tracking-widest mb-3"])}" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t(plan.name))}</h3><div class="flex items-baseline gap-2" data-v-80f5dfee${_scopeId}><span class="${ssrRenderClass([plan.theme === "dark" ? "text-white" : "text-slate-900 dark:text-white", "text-3xl font-black tracking-tighter"])}" data-v-80f5dfee${_scopeId}>${ssrInterpolate(plan.price)}</span><span class="${ssrRenderClass([plan.theme === "dark" ? "text-slate-500" : "text-slate-400 dark:text-slate-500", "font-bold text-xs"])}" data-v-80f5dfee${_scopeId}>/${ssrInterpolate(_ctx.$t(plan.period || "pricing_month"))}</span></div>`);
              if (plan.initial) {
                _push2(`<div class="mt-2 space-y-0.5" data-v-80f5dfee${_scopeId}><p class="${ssrRenderClass([plan.theme === "dark" ? "text-indigo-400" : "text-indigo-600 dark:text-indigo-400", "text-[10px] font-black uppercase tracking-tight"])}" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t(plan.initial))}</p><p class="${ssrRenderClass([plan.theme === "dark" ? "text-slate-600" : "text-slate-400 dark:text-slate-500", "text-[9px] font-bold italic"])}" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t(plan.recurring))}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><p class="${ssrRenderClass([plan.theme === "dark" ? "text-slate-400" : "text-slate-500 dark:text-slate-400", "text-xs font-medium mb-8 leading-relaxed min-h-[40px]"])}" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t(plan.desc))}</p><ul class="space-y-3 mb-8 flex-grow" data-v-80f5dfee${_scopeId}><!--[-->`);
              ssrRenderList(plan.features, (feat) => {
                _push2(`<li class="flex items-start gap-3" data-v-80f5dfee${_scopeId}><div class="${ssrRenderClass([plan.theme === "dark" ? "bg-indigo-500/20" : "bg-emerald-50 dark:bg-emerald-500/10", "mt-1 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"])}" data-v-80f5dfee${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  name: "check",
                  size: "8",
                  class: plan.theme === "dark" ? "text-indigo-400" : "text-emerald-500",
                  "stroke-width": "4"
                }, null, _parent2, _scopeId));
                _push2(`</div><span class="${ssrRenderClass([plan.theme === "dark" ? "text-slate-300" : "text-slate-700 dark:text-slate-300", "text-[11px] font-bold leading-tight"])}" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t(feat))}</span></li>`);
              });
              _push2(`<!--]--></ul><button class="${ssrRenderClass([[
                plan.highlight ? "bg-indigo-600 dark:bg-indigo-50 text-white dark:text-indigo-600 hover:bg-indigo-700 dark:hover:bg-white" : plan.theme === "dark" ? "bg-white text-slate-900 hover:bg-indigo-50 shadow-white/10" : plan.theme === "premium" ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-black dark:hover:bg-indigo-50" : "bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600"
              ], "w-full py-4 rounded-3xl font-black text-xs transition-all duration-300 transform active:scale-95 shadow-lg"])}" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t(plan.buttonText))}</button></div>`);
            });
            _push2(`<!--]--></div><div class="mt-32 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300" data-v-80f5dfee${_scopeId}><div class="text-center mb-16" data-v-80f5dfee${_scopeId}><h2 class="text-3xl font-black text-slate-900 dark:text-white mb-4" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("compare_title"))}</h2><p class="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_trust_3_title"))}</p></div><div class="overflow-hidden rounded-[3rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-xl shadow-slate-200/50 dark:shadow-none" data-v-80f5dfee${_scopeId}><table class="w-full text-left border-collapse" data-v-80f5dfee${_scopeId}><thead data-v-80f5dfee${_scopeId}><tr class="bg-slate-50/50 dark:bg-slate-800/50" data-v-80f5dfee${_scopeId}><th class="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 w-1/3" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("compare_feature"))}</th><th class="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 text-center" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("compare_explorer"))}</th><th class="p-6 text-[10px] font-black uppercase tracking-widest text-indigo-600 border-b border-slate-100 dark:border-slate-800 text-center" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("compare_architect"))}</th><th class="p-6 text-[10px] font-black uppercase tracking-widest text-amber-500 border-b border-slate-100 dark:border-slate-800 text-center" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("compare_quantum"))}</th><th class="p-6 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 text-center" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("compare_legendary"))}</th></tr></thead><tbody class="divide-y divide-slate-50 dark:divide-slate-800/50" data-v-80f5dfee${_scopeId}><tr class="bg-indigo-50/10 dark:bg-indigo-500/5" data-v-80f5dfee${_scopeId}><td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("group_habits"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_habit_limit"))}</td><td class="p-6 text-xs font-black text-center text-slate-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_habit_limit_val_l1"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_habit_limit_val_l2"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_habit_limit_val_l2"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_habit_limit_val_l2"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_detailed_analytics"))}</td><td class="p-6 text-xs font-black text-center text-slate-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_val_basic"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_val_advanced"))}</td><td class="p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_val_predictive"))}</td><td class="p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_val_predictive"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_detailed_analytics"))}</td><td class="p-6 text-xs font-black text-center text-slate-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_val_basic"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_val_advanced"))}</td><td class="p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_val_predictive"))}</td><td class="p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_val_predictive"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_habit_freeze"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_ai_stacking"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr class="bg-indigo-50/10 dark:bg-indigo-500/5" data-v-80f5dfee${_scopeId}><td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("group_finance"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_finance_entry"))}</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_budgeting"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_receipt_scanning"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_multi_currency"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_net_worth"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_shared_wallet"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_ai_audit"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr class="bg-indigo-50/10 dark:bg-indigo-500/5" data-v-80f5dfee${_scopeId}><td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("group_planner"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_planner_view"))}</td><td class="p-6 text-xs font-black text-center text-slate-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_planner_view_val_l1"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_planner_view_val_l2"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_planner_view_val_l2"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_planner_view_val_l2"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_recurring_tasks"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_kanban_board"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_focus_timer"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_energy_scheduling"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr class="bg-indigo-50/10 dark:bg-indigo-500/5" data-v-80f5dfee${_scopeId}><td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("group_journal"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_journal_type"))}</td><td class="p-6 text-xs font-black text-center text-slate-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_journal_type_val_l1"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_journal_type_val_l2"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_journal_type_val_l2"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_journal_type_val_l2"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_sentiment_ai"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_journal_lock"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr class="bg-indigo-50/10 dark:bg-indigo-500/5" data-v-80f5dfee${_scopeId}><td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("group_goals"))} &amp; ${ssrInterpolate(_ctx.$t("group_jobs"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_goal_limit"))}</td><td class="p-6 text-xs font-black text-center text-slate-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_goal_limit_val_l1"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_goal_limit_val_l2"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_goal_limit_val_l2"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_goal_limit_val_l2"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_job_limit"))}</td><td class="p-6 text-xs font-black text-center text-slate-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_job_limit_val_l1"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_job_limit_val_l2"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_job_limit_val_l2"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_job_limit_val_l2"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_resume_ai"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_vision_board"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr class="bg-indigo-50/10 dark:bg-indigo-500/5" data-v-80f5dfee${_scopeId}><td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("group_calendar"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_calendar_timeline"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_ai_scheduling"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr class="bg-indigo-50/10 dark:bg-indigo-500/5" data-v-80f5dfee${_scopeId}><td colspan="5" class="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("group_support"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_support_priority"))}</td><td class="p-6 text-xs font-black text-center text-slate-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("support_standard"))}</td><td class="p-6 text-xs font-black text-center text-slate-900 dark:text-white" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("support_standard"))}</td><td class="p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("support_priority"))}</td><td class="p-6 text-xs font-black text-center text-amber-500" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("support_vip"))}</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_early_beta"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr><tr data-v-80f5dfee${_scopeId}><td class="p-6 text-sm font-bold text-slate-700 dark:text-slate-300" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("feat_data_export"))}</td><td class="p-6 text-center text-slate-200 dark:text-slate-800" data-v-80f5dfee${_scopeId}>✕</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td><td class="p-6 text-center text-emerald-500 font-black" data-v-80f5dfee${_scopeId}>✓</td></tr></tbody></table></div></div><div class="mt-40 relative overflow-hidden rounded-[4rem] bg-slate-900 border border-slate-800 p-8 md:p-20 group" data-v-80f5dfee${_scopeId}><div class="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full group-hover:bg-indigo-500/20 transition-all duration-700" data-v-80f5dfee${_scopeId}></div><div class="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full" data-v-80f5dfee${_scopeId}></div><div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" data-v-80f5dfee${_scopeId}><div data-v-80f5dfee${_scopeId}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest mb-6" data-v-80f5dfee${_scopeId}> LEADERSHIP &amp; PERFORMANCE </div><h2 class="text-3xl md:text-5xl font-black text-white leading-tight mb-8" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("quantum_feature"))} <br data-v-80f5dfee${_scopeId}><span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_elite_title"))}</span></h2><div class="space-y-6" data-v-80f5dfee${_scopeId}><!--[-->`);
            ssrRenderList(3, (i) => {
              _push2(`<div class="flex gap-4" data-v-80f5dfee${_scopeId}><div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-xl" data-v-80f5dfee${_scopeId}>${ssrInterpolate(i === 1 ? "🧠" : i === 2 ? "⚡" : "🌈")}</div><div data-v-80f5dfee${_scopeId}><h4 class="text-white font-black text-sm mb-1" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t(`pricing_elite_feat${i}_title`))}</h4><p class="text-slate-400 text-xs leading-relaxed font-bold" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t(`pricing_elite_feat${i}_desc`))}</p></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="relative group/card" data-v-80f5dfee${_scopeId}><div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-amber-500/20 blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" data-v-80f5dfee${_scopeId}></div><div class="relative aspect-square rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-8 shadow-2xl overflow-hidden" data-v-80f5dfee${_scopeId}><div class="absolute top-0 right-0 p-8 transform rotate-12 group-hover/card:rotate-0 transition-transform duration-700" data-v-80f5dfee${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "shield-check",
              size: "120",
              class: "text-amber-400/10"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="h-full flex flex-col justify-end" data-v-80f5dfee${_scopeId}><div class="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md" data-v-80f5dfee${_scopeId}><div class="flex items-center gap-4 mb-4" data-v-80f5dfee${_scopeId}><div class="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-black" data-v-80f5dfee${_scopeId}>Q</div><div data-v-80f5dfee${_scopeId}><p class="text-white font-black text-xs" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_elite_card_title"))}</p><p class="text-[10px] text-slate-500 font-bold uppercase" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_elite_card_status"))}</p></div></div><div class="h-1 bg-white/10 rounded-full overflow-hidden" data-v-80f5dfee${_scopeId}><div class="h-full w-2/3 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" data-v-80f5dfee${_scopeId}></div></div></div></div></div></div></div></div><div class="mt-40 max-w-3xl mx-auto pb-32" data-v-80f5dfee${_scopeId}><div class="text-center mb-16" data-v-80f5dfee${_scopeId}><h2 class="text-3xl font-black text-slate-900 dark:text-white mb-4" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("faq_title"))}</h2><p class="text-slate-500 dark:text-slate-400 font-bold text-sm" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_subtitle"))}</p></div><div class="space-y-4" data-v-80f5dfee${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 transition-all hover:shadow-lg hover:shadow-slate-100 dark:hover:shadow-none" data-v-80f5dfee${_scopeId}><h4 class="text-lg font-black text-slate-900 dark:text-white mb-3 flex items-center gap-3" data-v-80f5dfee${_scopeId}><span class="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs" data-v-80f5dfee${_scopeId}>Q</span> ${ssrInterpolate(_ctx.$t(`faq_${i}_q`))}</h4><p class="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed pl-11" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t(`faq_${i}_a`))}</p></div>`);
            });
            _push2(`<!--]--></div></div><div class="pt-24 border-t border-slate-100 dark:border-slate-800" data-v-80f5dfee${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center" data-v-80f5dfee${_scopeId}><!--[-->`);
            ssrRenderList(3, (i) => {
              _push2(`<div class="p-4" data-v-80f5dfee${_scopeId}><div class="w-16 h-16 rounded-3xl bg-white dark:bg-slate-800 shadow-xl shadow-slate-100 dark:shadow-none border border-slate-50 dark:border-slate-700 flex items-center justify-center text-3xl mx-auto mb-6" data-v-80f5dfee${_scopeId}>${ssrInterpolate(i === 1 ? "🔒" : i === 2 ? "⚡" : "✨")}</div><h4 class="text-lg font-black text-slate-900 dark:text-white mb-2" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t(`pricing_trust_${i}_title`))}</h4><p class="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed" data-v-80f5dfee${_scopeId}>${ssrInterpolate(_ctx.$t(`pricing_trust_${i}_desc`))}</p></div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen bg-slate-50/30 dark:bg-slate-900/10" }, [
                createVNode("div", { class: "text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700" }, [
                  createVNode("div", { class: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-black text-[10px] mb-6 uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20 shadow-sm" }, " ✨ " + toDisplayString(_ctx.$t("pricing_badge")), 1),
                  createVNode("h1", { class: "text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6" }, [
                    createTextVNode(toDisplayString(_ctx.$t("pricing_title_1")) + " ", 1),
                    createVNode("span", { class: "text-indigo-600 dark:text-indigo-400" }, toDisplayString(_ctx.$t("pricing_title_2")), 1)
                  ]),
                  createVNode("p", { class: "text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-bold" }, toDisplayString(_ctx.$t("pricing_subtitle")), 1),
                  createVNode("div", { class: "flex items-center justify-center gap-6" }, [
                    createVNode("span", {
                      class: ["text-sm font-black transition-colors duration-300", !isAnnual.value ? "text-slate-900 dark:text-white" : "text-slate-400"]
                    }, toDisplayString(_ctx.$t("pricing_monthly")), 3),
                    createVNode("button", {
                      onClick: ($event) => isAnnual.value = !isAnnual.value,
                      class: "relative w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-800 p-1 transition-all duration-500 hover:ring-4 hover:ring-indigo-100 dark:hover:ring-indigo-900/30"
                    }, [
                      createVNode("div", {
                        class: ["w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-lg transform transition-transform duration-500 ease-in-out", isAnnual.value ? "translate-x-8" : "translate-x-0"]
                      }, null, 2)
                    ], 8, ["onClick"]),
                    createVNode("span", {
                      class: ["text-sm font-black transition-colors duration-300", isAnnual.value ? "text-slate-900 dark:text-white" : "text-slate-400"]
                    }, toDisplayString(_ctx.$t("pricing_yearly")), 3),
                    createVNode("div", { class: "px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-tighter border border-emerald-200 dark:border-emerald-500/20 shadow-sm" }, toDisplayString(_ctx.$t("pricing_save_amount")), 1)
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(plans.value, (plan, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: ["group relative flex flex-col p-6 rounded-[2.5rem] transition-all duration-500 border hover:-translate-y-2", [
                        plan.highlight ? "bg-white dark:bg-slate-800 border-indigo-600 dark:border-indigo-500 shadow-2xl shadow-indigo-100 dark:shadow-none scale-105 z-10" : "bg-white/70 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-100 dark:shadow-none",
                        plan.theme === "premium" ? "ring-4 ring-indigo-600/5 dark:ring-indigo-400/5" : "",
                        plan.theme === "dark" ? "bg-slate-900 dark:bg-black text-white border-slate-800" : ""
                      ]]
                    }, [
                      plan.badge ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white text-[8px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap"
                      }, toDisplayString(_ctx.$t(plan.badge)), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "mb-6" }, [
                        createVNode("h3", {
                          class: ["text-[10px] font-black uppercase tracking-widest mb-3", plan.theme === "dark" ? "text-indigo-400" : "text-slate-400 dark:text-slate-500"]
                        }, toDisplayString(_ctx.$t(plan.name)), 3),
                        createVNode("div", { class: "flex items-baseline gap-2" }, [
                          createVNode("span", {
                            class: ["text-3xl font-black tracking-tighter", plan.theme === "dark" ? "text-white" : "text-slate-900 dark:text-white"]
                          }, toDisplayString(plan.price), 3),
                          createVNode("span", {
                            class: ["font-bold text-xs", plan.theme === "dark" ? "text-slate-500" : "text-slate-400 dark:text-slate-500"]
                          }, "/" + toDisplayString(_ctx.$t(plan.period || "pricing_month")), 3)
                        ]),
                        plan.initial ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 space-y-0.5"
                        }, [
                          createVNode("p", {
                            class: ["text-[10px] font-black uppercase tracking-tight", plan.theme === "dark" ? "text-indigo-400" : "text-indigo-600 dark:text-indigo-400"]
                          }, toDisplayString(_ctx.$t(plan.initial)), 3),
                          createVNode("p", {
                            class: ["text-[9px] font-bold italic", plan.theme === "dark" ? "text-slate-600" : "text-slate-400 dark:text-slate-500"]
                          }, toDisplayString(_ctx.$t(plan.recurring)), 3)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("p", {
                        class: ["text-xs font-medium mb-8 leading-relaxed min-h-[40px]", plan.theme === "dark" ? "text-slate-400" : "text-slate-500 dark:text-slate-400"]
                      }, toDisplayString(_ctx.$t(plan.desc)), 3),
                      createVNode("ul", { class: "space-y-3 mb-8 flex-grow" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(plan.features, (feat) => {
                          return openBlock(), createBlock("li", {
                            key: feat,
                            class: "flex items-start gap-3"
                          }, [
                            createVNode("div", {
                              class: ["mt-1 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0", plan.theme === "dark" ? "bg-indigo-500/20" : "bg-emerald-50 dark:bg-emerald-500/10"]
                            }, [
                              createVNode(_sfc_main$1, {
                                name: "check",
                                size: "8",
                                class: plan.theme === "dark" ? "text-indigo-400" : "text-emerald-500",
                                "stroke-width": "4"
                              }, null, 8, ["class"])
                            ], 2),
                            createVNode("span", {
                              class: ["text-[11px] font-bold leading-tight", plan.theme === "dark" ? "text-slate-300" : "text-slate-700 dark:text-slate-300"]
                            }, toDisplayString(_ctx.$t(feat)), 3)
                          ]);
                        }), 128))
                      ]),
                      createVNode("button", {
                        onClick: ($event) => checkout(plan),
                        class: ["w-full py-4 rounded-3xl font-black text-xs transition-all duration-300 transform active:scale-95 shadow-lg", [
                          plan.highlight ? "bg-indigo-600 dark:bg-indigo-50 text-white dark:text-indigo-600 hover:bg-indigo-700 dark:hover:bg-white" : plan.theme === "dark" ? "bg-white text-slate-900 hover:bg-indigo-50 shadow-white/10" : plan.theme === "premium" ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-black dark:hover:bg-indigo-50" : "bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600"
                        ]]
                      }, toDisplayString(_ctx.$t(plan.buttonText)), 11, ["onClick"])
                    ], 2);
                  }), 128))
                ]),
                createVNode("div", { class: "mt-32 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300" }, [
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("h2", { class: "text-3xl font-black text-slate-900 dark:text-white mb-4" }, toDisplayString(_ctx.$t("compare_title")), 1),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]" }, toDisplayString(_ctx.$t("pricing_trust_3_title")), 1)
                  ]),
                  createVNode("div", { class: "overflow-hidden rounded-[3rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-xl shadow-slate-200/50 dark:shadow-none" }, [
                    createVNode("table", { class: "w-full text-left border-collapse" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "bg-slate-50/50 dark:bg-slate-800/50" }, [
                          createVNode("th", { class: "p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 w-1/3" }, toDisplayString(_ctx.$t("compare_feature")), 1),
                          createVNode("th", { class: "p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 text-center" }, toDisplayString(_ctx.$t("compare_explorer")), 1),
                          createVNode("th", { class: "p-6 text-[10px] font-black uppercase tracking-widest text-indigo-600 border-b border-slate-100 dark:border-slate-800 text-center" }, toDisplayString(_ctx.$t("compare_architect")), 1),
                          createVNode("th", { class: "p-6 text-[10px] font-black uppercase tracking-widest text-amber-500 border-b border-slate-100 dark:border-slate-800 text-center" }, toDisplayString(_ctx.$t("compare_quantum")), 1),
                          createVNode("th", { class: "p-6 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 text-center" }, toDisplayString(_ctx.$t("compare_legendary")), 1)
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-slate-50 dark:divide-slate-800/50" }, [
                        createVNode("tr", { class: "bg-indigo-50/10 dark:bg-indigo-500/5" }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800"
                          }, toDisplayString(_ctx.$t("group_habits")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_habit_limit")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-400" }, toDisplayString(_ctx.$t("feat_habit_limit_val_l1")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_habit_limit_val_l2")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_habit_limit_val_l2")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_habit_limit_val_l2")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_detailed_analytics")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-400" }, toDisplayString(_ctx.$t("feat_val_basic")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_val_advanced")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400" }, toDisplayString(_ctx.$t("feat_val_predictive")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400" }, toDisplayString(_ctx.$t("feat_val_predictive")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_detailed_analytics")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-400" }, toDisplayString(_ctx.$t("feat_val_basic")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_val_advanced")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400" }, toDisplayString(_ctx.$t("feat_val_predictive")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400" }, toDisplayString(_ctx.$t("feat_val_predictive")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_habit_freeze")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_ai_stacking")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", { class: "bg-indigo-50/10 dark:bg-indigo-500/5" }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800"
                          }, toDisplayString(_ctx.$t("group_finance")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_finance_entry")), 1),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_budgeting")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_receipt_scanning")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_multi_currency")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_net_worth")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_shared_wallet")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_ai_audit")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", { class: "bg-indigo-50/10 dark:bg-indigo-500/5" }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800"
                          }, toDisplayString(_ctx.$t("group_planner")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_planner_view")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-400" }, toDisplayString(_ctx.$t("feat_planner_view_val_l1")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_planner_view_val_l2")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_planner_view_val_l2")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_planner_view_val_l2")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_recurring_tasks")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_kanban_board")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_focus_timer")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_energy_scheduling")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", { class: "bg-indigo-50/10 dark:bg-indigo-500/5" }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800"
                          }, toDisplayString(_ctx.$t("group_journal")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_journal_type")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-400" }, toDisplayString(_ctx.$t("feat_journal_type_val_l1")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_journal_type_val_l2")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_journal_type_val_l2")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_journal_type_val_l2")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_sentiment_ai")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_journal_lock")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", { class: "bg-indigo-50/10 dark:bg-indigo-500/5" }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800"
                          }, toDisplayString(_ctx.$t("group_goals")) + " & " + toDisplayString(_ctx.$t("group_jobs")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_goal_limit")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-400" }, toDisplayString(_ctx.$t("feat_goal_limit_val_l1")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_goal_limit_val_l2")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_goal_limit_val_l2")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_goal_limit_val_l2")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_job_limit")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-400" }, toDisplayString(_ctx.$t("feat_job_limit_val_l1")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_job_limit_val_l2")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_job_limit_val_l2")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("feat_job_limit_val_l2")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_resume_ai")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_vision_board")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", { class: "bg-indigo-50/10 dark:bg-indigo-500/5" }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800"
                          }, toDisplayString(_ctx.$t("group_calendar")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_calendar_timeline")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_ai_scheduling")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", { class: "bg-indigo-50/10 dark:bg-indigo-500/5" }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-800"
                          }, toDisplayString(_ctx.$t("group_support")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_support_priority")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-400" }, toDisplayString(_ctx.$t("support_standard")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-slate-900 dark:text-white" }, toDisplayString(_ctx.$t("support_standard")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-indigo-500 dark:text-indigo-400" }, toDisplayString(_ctx.$t("support_priority")), 1),
                          createVNode("td", { class: "p-6 text-xs font-black text-center text-amber-500" }, toDisplayString(_ctx.$t("support_vip")), 1)
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_early_beta")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", { class: "p-6 text-sm font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(_ctx.$t("feat_data_export")), 1),
                          createVNode("td", { class: "p-6 text-center text-slate-200 dark:text-slate-800" }, "✕"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓"),
                          createVNode("td", { class: "p-6 text-center text-emerald-500 font-black" }, "✓")
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "mt-40 relative overflow-hidden rounded-[4rem] bg-slate-900 border border-slate-800 p-8 md:p-20 group" }, [
                  createVNode("div", { class: "absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full group-hover:bg-indigo-500/20 transition-all duration-700" }),
                  createVNode("div", { class: "absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full" }),
                  createVNode("div", { class: "relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest mb-6" }, " LEADERSHIP & PERFORMANCE "),
                      createVNode("h2", { class: "text-3xl md:text-5xl font-black text-white leading-tight mb-8" }, [
                        createTextVNode(toDisplayString(_ctx.$t("quantum_feature")) + " ", 1),
                        createVNode("br"),
                        createVNode("span", { class: "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200" }, toDisplayString(_ctx.$t("pricing_elite_title")), 1)
                      ]),
                      createVNode("div", { class: "space-y-6" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                          return createVNode("div", {
                            key: i,
                            class: "flex gap-4"
                          }, [
                            createVNode("div", { class: "w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-xl" }, toDisplayString(i === 1 ? "🧠" : i === 2 ? "⚡" : "🌈"), 1),
                            createVNode("div", null, [
                              createVNode("h4", { class: "text-white font-black text-sm mb-1" }, toDisplayString(_ctx.$t(`pricing_elite_feat${i}_title`)), 1),
                              createVNode("p", { class: "text-slate-400 text-xs leading-relaxed font-bold" }, toDisplayString(_ctx.$t(`pricing_elite_feat${i}_desc`)), 1)
                            ])
                          ]);
                        }), 64))
                      ])
                    ]),
                    createVNode("div", { class: "relative group/card" }, [
                      createVNode("div", { class: "absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-amber-500/20 blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" }),
                      createVNode("div", { class: "relative aspect-square rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-8 shadow-2xl overflow-hidden" }, [
                        createVNode("div", { class: "absolute top-0 right-0 p-8 transform rotate-12 group-hover/card:rotate-0 transition-transform duration-700" }, [
                          createVNode(_sfc_main$1, {
                            name: "shield-check",
                            size: "120",
                            class: "text-amber-400/10"
                          })
                        ]),
                        createVNode("div", { class: "h-full flex flex-col justify-end" }, [
                          createVNode("div", { class: "p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md" }, [
                            createVNode("div", { class: "flex items-center gap-4 mb-4" }, [
                              createVNode("div", { class: "w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-black" }, "Q"),
                              createVNode("div", null, [
                                createVNode("p", { class: "text-white font-black text-xs" }, toDisplayString(_ctx.$t("pricing_elite_card_title")), 1),
                                createVNode("p", { class: "text-[10px] text-slate-500 font-bold uppercase" }, toDisplayString(_ctx.$t("pricing_elite_card_status")), 1)
                              ])
                            ]),
                            createVNode("div", { class: "h-1 bg-white/10 rounded-full overflow-hidden" }, [
                              createVNode("div", { class: "h-full w-2/3 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" })
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "mt-40 max-w-3xl mx-auto pb-32" }, [
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("h2", { class: "text-3xl font-black text-slate-900 dark:text-white mb-4" }, toDisplayString(_ctx.$t("faq_title")), 1),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400 font-bold text-sm" }, toDisplayString(_ctx.$t("pricing_subtitle")), 1)
                  ]),
                  createVNode("div", { class: "space-y-4" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: "group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 transition-all hover:shadow-lg hover:shadow-slate-100 dark:hover:shadow-none"
                      }, [
                        createVNode("h4", { class: "text-lg font-black text-slate-900 dark:text-white mb-3 flex items-center gap-3" }, [
                          createVNode("span", { class: "w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs" }, "Q"),
                          createTextVNode(" " + toDisplayString(_ctx.$t(`faq_${i}_q`)), 1)
                        ]),
                        createVNode("p", { class: "text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed pl-11" }, toDisplayString(_ctx.$t(`faq_${i}_a`)), 1)
                      ]);
                    }), 64))
                  ])
                ]),
                createVNode("div", { class: "pt-24 border-t border-slate-100 dark:border-slate-800" }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-12 text-center" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: "p-4"
                      }, [
                        createVNode("div", { class: "w-16 h-16 rounded-3xl bg-white dark:bg-slate-800 shadow-xl shadow-slate-100 dark:shadow-none border border-slate-50 dark:border-slate-700 flex items-center justify-center text-3xl mx-auto mb-6" }, toDisplayString(i === 1 ? "🔒" : i === 2 ? "⚡" : "✨"), 1),
                        createVNode("h4", { class: "text-lg font-black text-slate-900 dark:text-white mb-2" }, toDisplayString(_ctx.$t(`pricing_trust_${i}_title`)), 1),
                        createVNode("p", { class: "text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed" }, toDisplayString(_ctx.$t(`pricing_trust_${i}_desc`)), 1)
                      ]);
                    }), 64))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Pricing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Pricing = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-80f5dfee"]]);
export {
  Pricing as default
};
