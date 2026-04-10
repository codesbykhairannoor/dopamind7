import { ref, computed, onMounted, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-B-DYe1pG.js";
import { Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
import { u as useGating } from "./useGating-_5WV009x.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ThemeToggle-ByQSx4Ee.js";
import "./useAppearance-rDoGVD4_.js";
import "./Modal-b6JySqy_.js";
import "lucide-vue-next";
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
          name: "pricing_l1_name",
          slug: "explorer",
          tier: 1,
          price: "Free",
          period: "pricing_forever",
          desc: "pricing_l1_desc",
          features: [
            "pricing_feat_habits_limit",
            "pricing_feat_planner_basic",
            "pricing_feat_finance_basic"
          ],
          buttonText: "pricing_free_btn",
          theme: "slate"
        },
        {
          name: "pricing_l2_name",
          slug: "architect",
          tier: 2,
          price: isAnnual.value ? appLocale.value === "id" ? "Rp 79k" : "$4.99" : appLocale.value === "id" ? "Rp 99k" : "$6.99",
          initial: "pricing_l2_initial",
          recurring: "pricing_l2_recurring",
          desc: "pricing_l2_desc",
          features: [
            "pricing_feat_unlock_all",
            "pricing_feat_planner_batch",
            "pricing_feat_finance_adv",
            "pricing_feat_no_ai"
          ],
          buttonText: "pricing_pro_btn",
          theme: "indigo"
        },
        {
          name: "pricing_l3_name",
          slug: "quantum",
          tier: 3,
          price: isAnnual.value ? appLocale.value === "id" ? "Rp 109k" : "$6.99" : appLocale.value === "id" ? "Rp 159k" : "$9.99",
          initial: "pricing_l3_initial",
          recurring: "pricing_l3_recurring",
          desc: "pricing_l3_desc",
          features: [
            "pricing_feat_ai_chat",
            "pricing_feat_automated_insights",
            "pricing_feat_all_architect"
          ],
          buttonText: "pricing_ai_btn",
          highlight: true,
          theme: "premium",
          badge: "pricing_ai_badge",
          icon: "sparkles"
        },
        {
          name: "pricing_l4_name",
          slug: "legendary",
          tier: 4,
          price: appLocale.value === "id" ? "Rp 899k" : "$59.00",
          initial: "pricing_l4_initial",
          recurring: "pricing_l4_recurring",
          desc: "pricing_l4_desc",
          features: [
            "pricing_feat_lifetime_access",
            "pricing_feat_calendar_unlocked",
            "pricing_feat_ai_trial",
            "pricing_feat_ai_discount"
          ],
          buttonText: "pricing_l4_btn",
          theme: "dark",
          badge: "pricing_l4_badge",
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
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("pricing_meta_title")
      }, null, _parent));
      _push(ssrRenderComponent(AuthenticatedLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12 px-6 lg:px-12 max-w-[1600px] mx-auto min-h-screen" data-v-e7b5f6a5${_scopeId}><div class="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8" data-v-e7b5f6a5${_scopeId}><div class="max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700" data-v-e7b5f6a5${_scopeId}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white font-black text-[9px] mb-4 uppercase tracking-[0.2em] shadow-lg shadow-indigo-200 dark:shadow-none" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_sub_os"))}</div><h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_boost_potential"))}</h1><p class="text-slate-500 dark:text-slate-400 font-bold leading-relaxed" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_subtitle"))}</p></div><div class="flex items-center gap-4 bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm shrink-0" data-v-e7b5f6a5${_scopeId}><button class="${ssrRenderClass([!isAnnual.value ? "bg-slate-950 text-white shadow-lg" : "text-slate-400 hover:text-slate-900 dark:hover:text-white", "px-6 py-2.5 rounded-xl text-xs font-black transition-all"])}" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_monthly"))}</button><button class="${ssrRenderClass([isAnnual.value ? "bg-slate-950 text-white shadow-lg" : "text-slate-400 hover:text-slate-900 dark:hover:text-white", "px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2"])}" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_yearly"))} <span class="px-1.5 py-0.5 rounded-md bg-emerald-500 text-[8px] text-white" data-v-e7b5f6a5${_scopeId}>-40%</span></button></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-v-e7b5f6a5${_scopeId}><!--[-->`);
            ssrRenderList(plans.value, (plan, index) => {
              _push2(`<div class="${ssrRenderClass([[
                plan.tier === unref(userTier) ? "ring-4 ring-indigo-600/20 dark:ring-indigo-400/20 bg-indigo-50/10 dark:bg-indigo-500/5" : "bg-white dark:bg-slate-800/50",
                plan.highlight ? "border-indigo-500 shadow-2xl shadow-indigo-100 dark:shadow-none" : "border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none",
                plan.theme === "dark" ? "dark:bg-black" : ""
              ], "group relative flex flex-col p-8 rounded-[2.5rem] border transition-all duration-700"])}" data-v-e7b5f6a5${_scopeId}>`);
              if (plan.tier === unref(userTier)) {
                _push2(`<div class="absolute -top-3 left-8 px-4 py-1 rounded-full bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest shadow-lg" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_active_now"))}</div>`);
              } else if (plan.badge) {
                _push2(`<div class="absolute -top-3 left-8 px-4 py-1 rounded-full bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest shadow-lg" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t(plan.badge))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mb-10 flex justify-between items-start" data-v-e7b5f6a5${_scopeId}><div data-v-e7b5f6a5${_scopeId}><h3 class="text-[10px] font-black tracking-[0.2em] mb-4 uppercase opacity-50" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t(plan.name))}</h3><div class="flex items-baseline gap-1" data-v-e7b5f6a5${_scopeId}><span class="text-4xl font-black tracking-tighter text-slate-900 dark:text-white" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(plan.price)}</span>`);
              if (plan.slug !== "legendary" && plan.slug !== "explorer") {
                _push2(`<span class="text-xs font-bold text-slate-400" data-v-e7b5f6a5${_scopeId}>/bln</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              if (plan.icon) {
                _push2(`<div class="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-500" data-v-e7b5f6a5${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  name: plan.icon,
                  size: "24",
                  "stroke-width": "2.5"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-8 leading-relaxed min-h-[44px]" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t(plan.desc))}</p><div class="space-y-4 mb-10 flex-grow border-t border-slate-50 dark:border-slate-800 pt-8" data-v-e7b5f6a5${_scopeId}><!--[-->`);
              ssrRenderList(plan.features, (feat) => {
                _push2(`<div class="flex items-start gap-3" data-v-e7b5f6a5${_scopeId}><div class="mt-0.5 w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0" data-v-e7b5f6a5${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  name: "check",
                  size: "10",
                  class: "text-indigo-600 dark:text-indigo-400",
                  "stroke-width": "4"
                }, null, _parent2, _scopeId));
                _push2(`</div><span class="text-[11px] font-black leading-[1.3] text-slate-700 dark:text-slate-200" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t(feat))}</span></div>`);
              });
              _push2(`<!--]--></div><button${ssrIncludeBooleanAttr(plan.tier <= unref(userTier)) ? " disabled" : ""} class="${ssrRenderClass([[
                plan.tier === unref(userTier) ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 cursor-default opacity-100" : plan.tier < unref(userTier) ? "bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-50 cursor-not-allowed" : plan.highlight ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100 dark:shadow-none" : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02]"
              ], "w-full py-5 rounded-[1.75rem] font-black text-xs transition-all duration-300 transform active:scale-95 shadow-xl"])}" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(plan.tier === unref(userTier) ? _ctx.$t("pricing_already_active") : plan.tier < unref(userTier) ? _ctx.$t("pricing_basic_level") : _ctx.$t(plan.buttonText))}</button>`);
              if (plan.tier > unref(userTier) && plan.initial) {
                _push2(`<p class="text-center mt-4 text-[9px] font-bold text-indigo-500 animate-pulse" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t(plan.initial))}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div><div class="mt-32 max-w-4xl mx-auto" data-v-e7b5f6a5${_scopeId}><div class="text-center mb-16" data-v-e7b5f6a5${_scopeId}><h2 class="text-2xl font-black text-slate-900 dark:text-white mb-2" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_matrix_title"))}</h2><p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t("pricing_matrix_subtitle"))}</p></div><div class="space-y-3" data-v-e7b5f6a5${_scopeId}><!--[-->`);
            ssrRenderList([
              { name: "feat_habit_capacity", explorer: "5", architect: "Unlimited", quantum: "Unlimited" },
              { name: "feat_planner_batch_unlocked", explorer: "Standard", architect: "Terbuka", quantum: "Terbuka" },
              { name: "feat_finance_adv_unlocked", explorer: "Standard", architect: "Terbuka", quantum: "Terbuka" },
              { name: "feat_neural_coaching_unlocked", explorer: "—", architect: "—", quantum: "Terbuka" }
            ], (f) => {
              _push2(`<div class="flex items-center justify-between p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group hover:border-indigo-200 dark:hover:border-indigo-800 transition-all" data-v-e7b5f6a5${_scopeId}><span class="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(_ctx.$t(f.name))}</span><div class="flex gap-4 sm:gap-12" data-v-e7b5f6a5${_scopeId}><div class="flex flex-col items-center" data-v-e7b5f6a5${_scopeId}><span class="text-[8px] font-bold text-slate-400 uppercase" data-v-e7b5f6a5${_scopeId}>Free</span><span class="text-[10px] font-black text-slate-600 dark:text-slate-400" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(f.explorer)}</span></div><div class="flex flex-col items-center" data-v-e7b5f6a5${_scopeId}><span class="text-[8px] font-bold text-indigo-400 uppercase" data-v-e7b5f6a5${_scopeId}>Arch</span><span class="text-[10px] font-black text-indigo-600 dark:text-indigo-400" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(f.architect)}</span></div><div class="flex flex-col items-center" data-v-e7b5f6a5${_scopeId}><span class="text-[8px] font-bold text-amber-500 uppercase" data-v-e7b5f6a5${_scopeId}>Quant</span><span class="text-[10px] font-black text-amber-600 dark:text-amber-500" data-v-e7b5f6a5${_scopeId}>${ssrInterpolate(f.quantum)}</span></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12 px-6 lg:px-12 max-w-[1600px] mx-auto min-h-screen" }, [
                createVNode("div", { class: "mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8" }, [
                  createVNode("div", { class: "max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700" }, [
                    createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white font-black text-[9px] mb-4 uppercase tracking-[0.2em] shadow-lg shadow-indigo-200 dark:shadow-none" }, toDisplayString(_ctx.$t("pricing_sub_os")), 1),
                    createVNode("h1", { class: "text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4" }, toDisplayString(_ctx.$t("pricing_boost_potential")), 1),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400 font-bold leading-relaxed" }, toDisplayString(_ctx.$t("pricing_subtitle")), 1)
                  ]),
                  createVNode("div", { class: "flex items-center gap-4 bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm shrink-0" }, [
                    createVNode("button", {
                      onClick: ($event) => isAnnual.value = false,
                      class: ["px-6 py-2.5 rounded-xl text-xs font-black transition-all", !isAnnual.value ? "bg-slate-950 text-white shadow-lg" : "text-slate-400 hover:text-slate-900 dark:hover:text-white"]
                    }, toDisplayString(_ctx.$t("pricing_monthly")), 11, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => isAnnual.value = true,
                      class: ["px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2", isAnnual.value ? "bg-slate-950 text-white shadow-lg" : "text-slate-400 hover:text-slate-900 dark:hover:text-white"]
                    }, [
                      createTextVNode(toDisplayString(_ctx.$t("pricing_yearly")) + " ", 1),
                      createVNode("span", { class: "px-1.5 py-0.5 rounded-md bg-emerald-500 text-[8px] text-white" }, "-40%")
                    ], 10, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(plans.value, (plan, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: ["group relative flex flex-col p-8 rounded-[2.5rem] border transition-all duration-700", [
                        plan.tier === unref(userTier) ? "ring-4 ring-indigo-600/20 dark:ring-indigo-400/20 bg-indigo-50/10 dark:bg-indigo-500/5" : "bg-white dark:bg-slate-800/50",
                        plan.highlight ? "border-indigo-500 shadow-2xl shadow-indigo-100 dark:shadow-none" : "border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none",
                        plan.theme === "dark" ? "dark:bg-black" : ""
                      ]]
                    }, [
                      plan.tier === unref(userTier) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "absolute -top-3 left-8 px-4 py-1 rounded-full bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest shadow-lg"
                      }, toDisplayString(_ctx.$t("pricing_active_now")), 1)) : plan.badge ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "absolute -top-3 left-8 px-4 py-1 rounded-full bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest shadow-lg"
                      }, toDisplayString(_ctx.$t(plan.badge)), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "mb-10 flex justify-between items-start" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-[10px] font-black tracking-[0.2em] mb-4 uppercase opacity-50" }, toDisplayString(_ctx.$t(plan.name)), 1),
                          createVNode("div", { class: "flex items-baseline gap-1" }, [
                            createVNode("span", { class: "text-4xl font-black tracking-tighter text-slate-900 dark:text-white" }, toDisplayString(plan.price), 1),
                            plan.slug !== "legendary" && plan.slug !== "explorer" ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-xs font-bold text-slate-400"
                            }, "/bln")) : createCommentVNode("", true)
                          ])
                        ]),
                        plan.icon ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-500"
                        }, [
                          createVNode(_sfc_main$1, {
                            name: plan.icon,
                            size: "24",
                            "stroke-width": "2.5"
                          }, null, 8, ["name"])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("p", { class: "text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-8 leading-relaxed min-h-[44px]" }, toDisplayString(_ctx.$t(plan.desc)), 1),
                      createVNode("div", { class: "space-y-4 mb-10 flex-grow border-t border-slate-50 dark:border-slate-800 pt-8" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(plan.features, (feat) => {
                          return openBlock(), createBlock("div", {
                            key: feat,
                            class: "flex items-start gap-3"
                          }, [
                            createVNode("div", { class: "mt-0.5 w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0" }, [
                              createVNode(_sfc_main$1, {
                                name: "check",
                                size: "10",
                                class: "text-indigo-600 dark:text-indigo-400",
                                "stroke-width": "4"
                              })
                            ]),
                            createVNode("span", { class: "text-[11px] font-black leading-[1.3] text-slate-700 dark:text-slate-200" }, toDisplayString(_ctx.$t(feat)), 1)
                          ]);
                        }), 128))
                      ]),
                      createVNode("button", {
                        onClick: ($event) => checkout(plan),
                        disabled: plan.tier <= unref(userTier),
                        class: ["w-full py-5 rounded-[1.75rem] font-black text-xs transition-all duration-300 transform active:scale-95 shadow-xl", [
                          plan.tier === unref(userTier) ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 cursor-default opacity-100" : plan.tier < unref(userTier) ? "bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-50 cursor-not-allowed" : plan.highlight ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100 dark:shadow-none" : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02]"
                        ]]
                      }, toDisplayString(plan.tier === unref(userTier) ? _ctx.$t("pricing_already_active") : plan.tier < unref(userTier) ? _ctx.$t("pricing_basic_level") : _ctx.$t(plan.buttonText)), 11, ["onClick", "disabled"]),
                      plan.tier > unref(userTier) && plan.initial ? (openBlock(), createBlock("p", {
                        key: 2,
                        class: "text-center mt-4 text-[9px] font-bold text-indigo-500 animate-pulse"
                      }, toDisplayString(_ctx.$t(plan.initial)), 1)) : createCommentVNode("", true)
                    ], 2);
                  }), 128))
                ]),
                createVNode("div", { class: "mt-32 max-w-4xl mx-auto" }, [
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("h2", { class: "text-2xl font-black text-slate-900 dark:text-white mb-2" }, toDisplayString(_ctx.$t("pricing_matrix_title")), 1),
                    createVNode("p", { class: "text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]" }, toDisplayString(_ctx.$t("pricing_matrix_subtitle")), 1)
                  ]),
                  createVNode("div", { class: "space-y-3" }, [
                    (openBlock(), createBlock(Fragment, null, renderList([
                      { name: "feat_habit_capacity", explorer: "5", architect: "Unlimited", quantum: "Unlimited" },
                      { name: "feat_planner_batch_unlocked", explorer: "Standard", architect: "Terbuka", quantum: "Terbuka" },
                      { name: "feat_finance_adv_unlocked", explorer: "Standard", architect: "Terbuka", quantum: "Terbuka" },
                      { name: "feat_neural_coaching_unlocked", explorer: "—", architect: "—", quantum: "Terbuka" }
                    ], (f) => {
                      return createVNode("div", {
                        key: f.name,
                        class: "flex items-center justify-between p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group hover:border-indigo-200 dark:hover:border-indigo-800 transition-all"
                      }, [
                        createVNode("span", { class: "text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter" }, toDisplayString(_ctx.$t(f.name)), 1),
                        createVNode("div", { class: "flex gap-4 sm:gap-12" }, [
                          createVNode("div", { class: "flex flex-col items-center" }, [
                            createVNode("span", { class: "text-[8px] font-bold text-slate-400 uppercase" }, "Free"),
                            createVNode("span", { class: "text-[10px] font-black text-slate-600 dark:text-slate-400" }, toDisplayString(f.explorer), 1)
                          ]),
                          createVNode("div", { class: "flex flex-col items-center" }, [
                            createVNode("span", { class: "text-[8px] font-bold text-indigo-400 uppercase" }, "Arch"),
                            createVNode("span", { class: "text-[10px] font-black text-indigo-600 dark:text-indigo-400" }, toDisplayString(f.architect), 1)
                          ]),
                          createVNode("div", { class: "flex flex-col items-center" }, [
                            createVNode("span", { class: "text-[8px] font-bold text-amber-500 uppercase" }, "Quant"),
                            createVNode("span", { class: "text-[10px] font-black text-amber-600 dark:text-amber-500" }, toDisplayString(f.quantum), 1)
                          ])
                        ])
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
const Pricing = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e7b5f6a5"]]);
export {
  Pricing as default
};
