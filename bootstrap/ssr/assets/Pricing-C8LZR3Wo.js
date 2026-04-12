import { ref, computed, onMounted, unref, withCtx, createVNode, resolveDynamicComponent, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderVNode, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-LxN20lxq.js";
import { Head, router } from "@inertiajs/vue3";
import "./OneForMindIcon-BiMr3Mnd.js";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
import { u as useGating } from "./useGating-DZoi6H2L.js";
import { ListChecks, Lock, Calendar, Zap, Wallet, MousePointer2, Sparkles, Brain, Star, Infinity, Globe, Shield, ShieldCheck, MessageSquare, ArrowRight } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useAppearance-rDoGVD4_.js";
import "laravel-vue-i18n";
import "dayjs";
const _sfc_main = {
  __name: "Pricing",
  __ssrInlineRender: true,
  setup(__props) {
    const { appLocale } = useFinanceFormat();
    const { tier: userTier } = useGating();
    const isAnnual = ref(true);
    const plans = computed(() => {
      return [
        {
          name: "Explorer",
          slug: "explorer",
          tier: 1,
          price: "Free",
          period: "pricing_forever",
          desc: "pricing_explorer_desc",
          features: [
            { text: "pricing_f_habit_open", icon: ListChecks },
            { text: "pricing_f_batch_habit_locked", icon: Lock, isLocked: true },
            { text: "pricing_f_planner_tab_open", icon: Calendar },
            { text: "pricing_f_batch_planner_locked", icon: Lock, isLocked: true },
            { text: "pricing_f_vault_locked", icon: Lock, isLocked: true },
            { text: "pricing_f_lab_locked", icon: Lock, isLocked: true },
            { text: "pricing_f_trends_locked", icon: Lock, isLocked: true }
          ],
          buttonText: "pricing_btn_current",
          theme: "slate"
        },
        {
          name: "Architect",
          slug: "architect",
          tier: 2,
          price: isAnnual.value ? appLocale.value === "id" ? "Rp 79k" : "$4.99" : appLocale.value === "id" ? "Rp 99k" : "$6.99",
          period: "pricing_per_year",
          desc: "pricing_architect_desc",
          features: [
            { text: "pricing_feature_header_explorer_plus", isHeader: true },
            { text: "pricing_f_all_tabs_open", icon: ListChecks },
            { text: "pricing_f_batch_unlocked", icon: Zap },
            { text: "pricing_f_financial_ecosystem", icon: Wallet },
            { text: "pricing_f_custom_themes", icon: MousePointer2 },
            { text: "pricing_f_ai_coach_locked", icon: Lock, isLocked: true }
          ],
          buttonText: "pricing_btn_upgrade",
          theme: "indigo"
        },
        {
          name: "Quantum",
          slug: "quantum",
          tier: 3,
          price: isAnnual.value ? appLocale.value === "id" ? "Rp 109k" : "$6.99" : appLocale.value === "id" ? "Rp 159k" : "$9.99",
          period: "pricing_per_year",
          desc: "pricing_quantum_desc",
          features: [
            { text: "pricing_feature_header_architect_plus", isHeader: true },
            { text: "pricing_f_ai_full_access", icon: Sparkles },
            { text: "pricing_f_ai_insights", icon: Brain },
            { text: "pricing_f_ai_finance_insights", icon: Star },
            { text: "pricing_f_neural_sync", icon: Infinity },
            { text: "pricing_f_early_access", icon: Globe }
          ],
          buttonText: "pricing_btn_unleash",
          highlight: true,
          theme: "premium",
          badge: "pricing_badge_popular",
          icon: "sparkles"
        },
        {
          name: "Legendary",
          slug: "legendary",
          tier: 4,
          price: appLocale.value === "id" ? "Rp 899k" : "$59.00",
          period: "pricing_lifetime",
          desc: "pricing_legendary_desc",
          features: [
            { text: "pricing_feature_header_quantum_plus", isHeader: true },
            { text: "pricing_f_lifetime_access", icon: Infinity },
            { text: "pricing_f_legendary_trial_ai", icon: Zap },
            { text: "pricing_f_vvip_support", icon: Shield },
            { text: "pricing_f_founder_badge", icon: ShieldCheck },
            { text: "pricing_f_onboarding", icon: MessageSquare }
          ],
          buttonText: "pricing_btn_legendary",
          theme: "dark",
          badge: "pricing_badge_limited",
          icon: "infinity"
        }
      ];
    });
    const checkout = (plan) => {
      if (plan.tier <= userTier.value) return;
      router.visit(route("payment.summary"), {
        data: {
          plan: plan.slug,
          billing: isAnnual.value ? "yearly" : "monthly"
        }
      });
    };
    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const planSlug = urlParams.get("plan");
      if (planSlug) {
        const targetPlan = plans.value.find((p) => p.slug === planSlug);
        if (targetPlan && targetPlan.tier > userTier.value) {
          checkout(targetPlan);
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Pricing & Plans" }, null, _parent));
      _push(ssrRenderComponent(AuthenticatedLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-slate-50 dark:bg-slate-950 min-h-screen pb-32 pt-20 px-4 md:px-8" data-v-538bf425${_scopeId}><h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_hero_title"))} <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_hero_highlight"))}</span></h1><p class="text-slate-500 dark:text-slate-400 font-bold max-w-xl mx-auto leading-relaxed" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_hero_desc"))}</p><div class="inline-flex items-center p-1 bg-white dark:bg-slate-900 rounded-[1.8rem] border border-slate-100 dark:border-slate-800 shadow-sm mt-8 scale-110" data-v-538bf425${_scopeId}><button class="${ssrRenderClass([!isAnnual.value ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xl" : "text-slate-400 hover:text-slate-600", "px-8 py-3 rounded-[1.6rem] text-xs font-black transition-all"])}" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_billing_monthly"))}</button><button class="${ssrRenderClass([isAnnual.value ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xl" : "text-slate-400 hover:text-slate-600", "px-8 py-3 rounded-[1.6rem] text-xs font-black transition-all relative flex items-center gap-2"])}" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_billing_yearly"))} <span class="absolute -top-4 -right-2 px-2 py-1 rounded-lg bg-emerald-500 text-[8px] text-white animate-bounce shadow-lg" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_billing_save"))}</span></button></div><div class="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-v-538bf425${_scopeId}><!--[-->`);
            ssrRenderList(plans.value, (plan, index) => {
              _push2(`<div class="${ssrRenderClass([[
                plan.highlight ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-slate-100 dark:border-slate-800",
                plan.theme === "dark" ? "dark:bg-indigo-950 border-indigo-900" : ""
              ], "group relative flex flex-col p-8 rounded-[3rem] border transition-all duration-700 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 hover:shadow-2xl"])}" data-v-538bf425${_scopeId}>`);
              if (plan.badge) {
                _push2(`<div class="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-indigo-600 text-white text-[9px] font-black tracking-wide shadow-xl" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t(plan.badge))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mb-8" data-v-538bf425${_scopeId}><h3 class="text-xs font-black tracking-wide text-slate-400 dark:text-slate-500 mb-6" data-v-538bf425${_scopeId}>${ssrInterpolate(plan.name)}</h3><div class="flex items-baseline gap-2" data-v-538bf425${_scopeId}><span class="text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tighter" data-v-538bf425${_scopeId}>${ssrInterpolate(plan.price)}</span>`);
              if (plan.tier > 1) {
                _push2(`<span class="text-[10px] font-bold text-slate-400 mb-1" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t(plan.period))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><p class="text-[11px] font-bold text-slate-500 leading-relaxed min-h-[44px] mb-8" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t(plan.desc))}</p><div class="space-y-4 mb-10 flex-grow border-t border-slate-50 dark:border-slate-800 pt-8" data-v-538bf425${_scopeId}><!--[-->`);
              ssrRenderList(plan.features, (feat, fIdx) => {
                _push2(`<div class="${ssrRenderClass([feat.isLocked ? "opacity-40" : "", "flex items-start gap-4"])}" data-v-538bf425${_scopeId}>`);
                if (feat.isHeader) {
                  _push2(`<p class="text-[9px] font-black text-slate-400 tracking-wide mt-2 mb-1 w-full" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t(feat.text))}</p>`);
                } else {
                  _push2(`<!--[--><div class="mt-1 flex items-center justify-center shrink-0" data-v-538bf425${_scopeId}>`);
                  ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(feat.icon), {
                    size: 14,
                    class: feat.isLocked ? "text-slate-500" : "text-indigo-500",
                    "stroke-width": "2.5"
                  }, null), _parent2, _scopeId);
                  _push2(`</div><span class="${ssrRenderClass([feat.isLocked ? "text-slate-500" : "text-slate-700 dark:text-slate-200", "text-[11px] font-black leading-tight"])}" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t(feat.text))}</span><!--]-->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div><div class="mt-auto" data-v-538bf425${_scopeId}><button${ssrIncludeBooleanAttr(plan.tier <= unref(userTier)) ? " disabled" : ""} class="${ssrRenderClass([[
                plan.tier === unref(userTier) ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default" : plan.highlight ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/40" : "bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800"
              ], "w-full py-5 rounded-[2rem] font-black text-xs transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 group/btn shadow-xl shadow-slate-200 dark:shadow-none"])}" data-v-538bf425${_scopeId}>${ssrInterpolate(plan.tier === unref(userTier) ? _ctx.$t("pricing_btn_current") : _ctx.$t(plan.buttonText))} `);
              if (plan.tier > unref(userTier)) {
                _push2(ssrRenderComponent(unref(ArrowRight), {
                  size: 16,
                  class: "group-hover/btn:translate-x-1 transition-transform"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button>`);
              if (plan.tier > unref(userTier) && plan.initial) {
                _push2(`<p class="text-center mt-4 text-[9px] font-bold text-indigo-500" data-v-538bf425${_scopeId}> Guaranteed Lifetime Access </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div><div class="mt-40 max-w-5xl mx-auto animate-in slide-in-from-bottom-12 duration-1000" data-v-538bf425${_scopeId}><div class="text-center mb-16" data-v-538bf425${_scopeId}><h2 class="text-3xl font-black text-slate-900 dark:text-white mb-4" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_comparison_title"))}</h2><p class="text-xs font-bold text-slate-400 capitalize tracking-widest" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_comparison_subtitle"))}</p></div><div class="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl" data-v-538bf425${_scopeId}><table class="w-full text-left border-collapse" data-v-538bf425${_scopeId}><thead data-v-538bf425${_scopeId}><tr class="bg-slate-50 dark:bg-slate-800/50" data-v-538bf425${_scopeId}><th class="p-8 text-[10px] font-black tracking-wide text-slate-400" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_feature_col_name"))}</th><th class="p-8 text-[10px] font-black tracking-wide text-slate-900 dark:text-white text-center" data-v-538bf425${_scopeId}>Explorer</th><th class="p-8 text-[10px] font-black tracking-wide text-indigo-500 text-center" data-v-538bf425${_scopeId}>Architect</th><th class="p-8 text-[10px] font-black tracking-wide text-amber-500 text-center" data-v-538bf425${_scopeId}>Quantum</th></tr></thead><tbody class="divide-y divide-slate-50 dark:divide-slate-800" data-v-538bf425${_scopeId}><!--[-->`);
            ssrRenderList([
              { name: _ctx.$t("pricing_f_active_habits"), explorer: "5 Habits", architect: _ctx.$t("pricing_v_unlimited"), quantum: _ctx.$t("pricing_v_unlimited") },
              { name: _ctx.$t("pricing_f_planner_engine"), explorer: _ctx.$t("pricing_v_standard"), architect: _ctx.$t("pricing_v_batch"), quantum: _ctx.$t("pricing_v_ai_powered") },
              { name: _ctx.$t("pricing_f_vault_savings"), explorer: _ctx.$t("pricing_v_locked"), architect: _ctx.$t("pricing_v_unlimited"), quantum: _ctx.$t("pricing_v_unlimited") },
              { name: _ctx.$t("pricing_f_ai_assistant"), explorer: "—", architect: "—", quantum: "24/7 Access" },
              { name: _ctx.$t("pricing_f_life_insights"), explorer: "Basic", architect: _ctx.$t("pricing_v_advanced"), quantum: _ctx.$t("pricing_v_predictive") },
              { name: _ctx.$t("pricing_f_custom_modules"), explorer: "—", architect: _ctx.$t("pricing_v_partial"), quantum: _ctx.$t("pricing_v_full") }
            ], (row) => {
              _push2(`<tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors" data-v-538bf425${_scopeId}><td class="p-8 text-xs font-black text-slate-700 dark:text-slate-200" data-v-538bf425${_scopeId}>${ssrInterpolate(row.name)}</td><td class="p-8 text-xs font-bold text-slate-400 text-center" data-v-538bf425${_scopeId}>${ssrInterpolate(row.explorer)}</td><td class="p-8 text-xs font-black text-indigo-600 dark:text-indigo-400 text-center" data-v-538bf425${_scopeId}>${ssrInterpolate(row.architect)}</td><td class="p-8 text-xs font-black text-amber-600 dark:text-amber-500 text-center" data-v-538bf425${_scopeId}>${ssrInterpolate(row.quantum)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="mt-16 text-center" data-v-538bf425${_scopeId}><p class="text-[10px] font-black text-slate-400 tracking-wide mb-4" data-v-538bf425${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_infra_badge"))}</p><div class="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale contrast-125" data-v-538bf425${_scopeId}><div class="flex items-center gap-2" data-v-538bf425${_scopeId}><div class="w-2 h-2 bg-slate-900 dark:bg-white rounded-full" data-v-538bf425${_scopeId}></div><span class="font-black dark:text-white tracking-tight text-[10px]" data-v-538bf425${_scopeId}>Asana Strength</span></div><div class="flex items-center gap-2" data-v-538bf425${_scopeId}><div class="w-2 h-2 bg-slate-900 dark:bg-white rounded-full" data-v-538bf425${_scopeId}></div><span class="font-black dark:text-white tracking-tight text-[10px]" data-v-538bf425${_scopeId}>ClickUp Power</span></div><div class="flex items-center gap-2" data-v-538bf425${_scopeId}><div class="w-2 h-2 bg-slate-900 dark:bg-white rounded-full" data-v-538bf425${_scopeId}></div><span class="font-black dark:text-white tracking-tight text-[10px]" data-v-538bf425${_scopeId}>Notion Clarity</span></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-slate-50 dark:bg-slate-950 min-h-screen pb-32 pt-20 px-4 md:px-8" }, [
                createVNode("h1", { class: "text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter" }, [
                  createTextVNode(toDisplayString(_ctx.$t("pricing_hero_title")) + " ", 1),
                  createVNode("span", { class: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" }, toDisplayString(_ctx.$t("pricing_hero_highlight")), 1)
                ]),
                createVNode("p", { class: "text-slate-500 dark:text-slate-400 font-bold max-w-xl mx-auto leading-relaxed" }, toDisplayString(_ctx.$t("pricing_hero_desc")), 1),
                createVNode("div", { class: "inline-flex items-center p-1 bg-white dark:bg-slate-900 rounded-[1.8rem] border border-slate-100 dark:border-slate-800 shadow-sm mt-8 scale-110" }, [
                  createVNode("button", {
                    onClick: ($event) => isAnnual.value = false,
                    class: ["px-8 py-3 rounded-[1.6rem] text-xs font-black transition-all", !isAnnual.value ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xl" : "text-slate-400 hover:text-slate-600"]
                  }, toDisplayString(_ctx.$t("pricing_billing_monthly")), 11, ["onClick"]),
                  createVNode("button", {
                    onClick: ($event) => isAnnual.value = true,
                    class: ["px-8 py-3 rounded-[1.6rem] text-xs font-black transition-all relative flex items-center gap-2", isAnnual.value ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xl" : "text-slate-400 hover:text-slate-600"]
                  }, [
                    createTextVNode(toDisplayString(_ctx.$t("pricing_billing_yearly")) + " ", 1),
                    createVNode("span", { class: "absolute -top-4 -right-2 px-2 py-1 rounded-lg bg-emerald-500 text-[8px] text-white animate-bounce shadow-lg" }, toDisplayString(_ctx.$t("pricing_billing_save")), 1)
                  ], 10, ["onClick"])
                ]),
                createVNode("div", { class: "max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(plans.value, (plan, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: ["group relative flex flex-col p-8 rounded-[3rem] border transition-all duration-700 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 hover:shadow-2xl", [
                        plan.highlight ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-slate-100 dark:border-slate-800",
                        plan.theme === "dark" ? "dark:bg-indigo-950 border-indigo-900" : ""
                      ]]
                    }, [
                      plan.badge ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-indigo-600 text-white text-[9px] font-black tracking-wide shadow-xl"
                      }, toDisplayString(_ctx.$t(plan.badge)), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "mb-8" }, [
                        createVNode("h3", { class: "text-xs font-black tracking-wide text-slate-400 dark:text-slate-500 mb-6" }, toDisplayString(plan.name), 1),
                        createVNode("div", { class: "flex items-baseline gap-2" }, [
                          createVNode("span", { class: "text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tighter" }, toDisplayString(plan.price), 1),
                          plan.tier > 1 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-[10px] font-bold text-slate-400 mb-1"
                          }, toDisplayString(_ctx.$t(plan.period)), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("p", { class: "text-[11px] font-bold text-slate-500 leading-relaxed min-h-[44px] mb-8" }, toDisplayString(_ctx.$t(plan.desc)), 1),
                      createVNode("div", { class: "space-y-4 mb-10 flex-grow border-t border-slate-50 dark:border-slate-800 pt-8" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(plan.features, (feat, fIdx) => {
                          return openBlock(), createBlock("div", {
                            key: fIdx,
                            class: ["flex items-start gap-4", feat.isLocked ? "opacity-40" : ""]
                          }, [
                            feat.isHeader ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-[9px] font-black text-slate-400 tracking-wide mt-2 mb-1 w-full"
                            }, toDisplayString(_ctx.$t(feat.text)), 1)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createVNode("div", { class: "mt-1 flex items-center justify-center shrink-0" }, [
                                (openBlock(), createBlock(resolveDynamicComponent(feat.icon), {
                                  size: 14,
                                  class: feat.isLocked ? "text-slate-500" : "text-indigo-500",
                                  "stroke-width": "2.5"
                                }, null, 8, ["class"]))
                              ]),
                              createVNode("span", {
                                class: ["text-[11px] font-black leading-tight", feat.isLocked ? "text-slate-500" : "text-slate-700 dark:text-slate-200"]
                              }, toDisplayString(_ctx.$t(feat.text)), 3)
                            ], 64))
                          ], 2);
                        }), 128))
                      ]),
                      createVNode("div", { class: "mt-auto" }, [
                        createVNode("button", {
                          onClick: ($event) => checkout(plan),
                          disabled: plan.tier <= unref(userTier),
                          class: ["w-full py-5 rounded-[2rem] font-black text-xs transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 group/btn shadow-xl shadow-slate-200 dark:shadow-none", [
                            plan.tier === unref(userTier) ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default" : plan.highlight ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/40" : "bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800"
                          ]]
                        }, [
                          createTextVNode(toDisplayString(plan.tier === unref(userTier) ? _ctx.$t("pricing_btn_current") : _ctx.$t(plan.buttonText)) + " ", 1),
                          plan.tier > unref(userTier) ? (openBlock(), createBlock(unref(ArrowRight), {
                            key: 0,
                            size: 16,
                            class: "group-hover/btn:translate-x-1 transition-transform"
                          })) : createCommentVNode("", true)
                        ], 10, ["onClick", "disabled"]),
                        plan.tier > unref(userTier) && plan.initial ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-center mt-4 text-[9px] font-bold text-indigo-500"
                        }, " Guaranteed Lifetime Access ")) : createCommentVNode("", true)
                      ])
                    ], 2);
                  }), 128))
                ]),
                createVNode("div", { class: "mt-40 max-w-5xl mx-auto animate-in slide-in-from-bottom-12 duration-1000" }, [
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("h2", { class: "text-3xl font-black text-slate-900 dark:text-white mb-4" }, toDisplayString(_ctx.$t("pricing_comparison_title")), 1),
                    createVNode("p", { class: "text-xs font-bold text-slate-400 capitalize tracking-widest" }, toDisplayString(_ctx.$t("pricing_comparison_subtitle")), 1)
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl" }, [
                    createVNode("table", { class: "w-full text-left border-collapse" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "bg-slate-50 dark:bg-slate-800/50" }, [
                          createVNode("th", { class: "p-8 text-[10px] font-black tracking-wide text-slate-400" }, toDisplayString(_ctx.$t("pricing_feature_col_name")), 1),
                          createVNode("th", { class: "p-8 text-[10px] font-black tracking-wide text-slate-900 dark:text-white text-center" }, "Explorer"),
                          createVNode("th", { class: "p-8 text-[10px] font-black tracking-wide text-indigo-500 text-center" }, "Architect"),
                          createVNode("th", { class: "p-8 text-[10px] font-black tracking-wide text-amber-500 text-center" }, "Quantum")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-slate-50 dark:divide-slate-800" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList([
                          { name: _ctx.$t("pricing_f_active_habits"), explorer: "5 Habits", architect: _ctx.$t("pricing_v_unlimited"), quantum: _ctx.$t("pricing_v_unlimited") },
                          { name: _ctx.$t("pricing_f_planner_engine"), explorer: _ctx.$t("pricing_v_standard"), architect: _ctx.$t("pricing_v_batch"), quantum: _ctx.$t("pricing_v_ai_powered") },
                          { name: _ctx.$t("pricing_f_vault_savings"), explorer: _ctx.$t("pricing_v_locked"), architect: _ctx.$t("pricing_v_unlimited"), quantum: _ctx.$t("pricing_v_unlimited") },
                          { name: _ctx.$t("pricing_f_ai_assistant"), explorer: "—", architect: "—", quantum: "24/7 Access" },
                          { name: _ctx.$t("pricing_f_life_insights"), explorer: "Basic", architect: _ctx.$t("pricing_v_advanced"), quantum: _ctx.$t("pricing_v_predictive") },
                          { name: _ctx.$t("pricing_f_custom_modules"), explorer: "—", architect: _ctx.$t("pricing_v_partial"), quantum: _ctx.$t("pricing_v_full") }
                        ], (row) => {
                          return openBlock(), createBlock("tr", {
                            key: row.name,
                            class: "hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                          }, [
                            createVNode("td", { class: "p-8 text-xs font-black text-slate-700 dark:text-slate-200" }, toDisplayString(row.name), 1),
                            createVNode("td", { class: "p-8 text-xs font-bold text-slate-400 text-center" }, toDisplayString(row.explorer), 1),
                            createVNode("td", { class: "p-8 text-xs font-black text-indigo-600 dark:text-indigo-400 text-center" }, toDisplayString(row.architect), 1),
                            createVNode("td", { class: "p-8 text-xs font-black text-amber-600 dark:text-amber-500 text-center" }, toDisplayString(row.quantum), 1)
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mt-16 text-center" }, [
                    createVNode("p", { class: "text-[10px] font-black text-slate-400 tracking-wide mb-4" }, toDisplayString(_ctx.$t("pricing_infra_badge")), 1),
                    createVNode("div", { class: "flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale contrast-125" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "w-2 h-2 bg-slate-900 dark:bg-white rounded-full" }),
                        createVNode("span", { class: "font-black dark:text-white tracking-tight text-[10px]" }, "Asana Strength")
                      ]),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "w-2 h-2 bg-slate-900 dark:bg-white rounded-full" }),
                        createVNode("span", { class: "font-black dark:text-white tracking-tight text-[10px]" }, "ClickUp Power")
                      ]),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "w-2 h-2 bg-slate-900 dark:bg-white rounded-full" }),
                        createVNode("span", { class: "font-black dark:text-white tracking-tight text-[10px]" }, "Notion Clarity")
                      ])
                    ])
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
const Pricing = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-538bf425"]]);
export {
  Pricing as default
};
