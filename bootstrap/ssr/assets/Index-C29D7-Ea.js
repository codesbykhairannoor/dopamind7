import { computed, unref, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, withDirectives, vModelCheckbox, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-Dr4uklmL.js";
import { usePage, useForm, Head, router } from "@inertiajs/vue3";
import "./OneForMindIcon-Dwf7AvKJ.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { userSettings: Object },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    const props = __props;
    const page = usePage();
    const currentLang = computed(() => page.props.locale || "id");
    const form = useForm({
      settings: {
        modules: {
          habit: ((_b = (_a = props.userSettings) == null ? void 0 : _a.modules) == null ? void 0 : _b.habit) ?? true,
          planner: ((_d = (_c = props.userSettings) == null ? void 0 : _c.modules) == null ? void 0 : _d.planner) ?? true,
          finance: ((_f = (_e = props.userSettings) == null ? void 0 : _e.modules) == null ? void 0 : _f.finance) ?? true,
          journal: ((_h = (_g = props.userSettings) == null ? void 0 : _g.modules) == null ? void 0 : _h.journal) ?? true,
          calendar: ((_j = (_i = props.userSettings) == null ? void 0 : _i.modules) == null ? void 0 : _j.calendar) ?? true,
          job: ((_l = (_k = props.userSettings) == null ? void 0 : _k.modules) == null ? void 0 : _l.job) ?? true,
          goal: ((_n = (_m = props.userSettings) == null ? void 0 : _m.modules) == null ? void 0 : _n.goal) ?? true
        }
      }
    });
    const saveSettings = () => {
      form.post(route("settings.update"), {
        preserveScroll: true
      });
    };
    const switchLang = (lang) => {
      if (currentLang.value === lang) return;
      router.get(route("lang.switch", lang), {}, {
        preserveState: false,
        preserveScroll: false,
        replace: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("settings_title", "Pengaturan")
      }, null, _parent));
      _push(ssrRenderComponent(AuthenticatedLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-3xl mx-auto py-12 px-4 sm:px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-black text-slate-800 tracking-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("settings_title", "Pengaturan"))}</h1><p class="text-sm font-medium text-slate-500 mt-1"${_scopeId}>${ssrInterpolate(_ctx.$t("settings_desc", "Sesuaikan pengalaman aplikasi Oneformind Anda."))}</p></div><div class="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-sm border border-slate-100"${_scopeId}><div class="flex items-center gap-3 mb-6"${_scopeId}><div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl"${_scopeId}>🌐</div><div${_scopeId}><h2 class="text-lg font-black text-slate-800 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("settings_language_title", "Bahasa Aplikasi"))}</h2><p class="text-xs font-bold text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.$t("settings_language_desc", "Pilih bahasa antarmuka aplikasi."))}</p></div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><button class="${ssrRenderClass([currentLang.value === "id" ? "border-indigo-600 bg-indigo-50/50 shadow-md" : "border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50", "relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300"])}"${_scopeId}><span class="text-4xl mb-2 drop-shadow-sm"${_scopeId}>🇮🇩</span><span class="${ssrRenderClass([currentLang.value === "id" ? "text-indigo-800" : "text-slate-600", "font-black text-sm"])}"${_scopeId}>Indonesia</span>`);
            if (currentLang.value === "id") {
              _push2(`<div class="absolute top-3 right-3 text-indigo-600"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button><button class="${ssrRenderClass([currentLang.value === "en" ? "border-indigo-600 bg-indigo-50/50 shadow-md" : "border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50", "relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300"])}"${_scopeId}><span class="text-4xl mb-2 drop-shadow-sm"${_scopeId}>🇬🇧</span><span class="${ssrRenderClass([currentLang.value === "en" ? "text-indigo-800" : "text-slate-600", "font-black text-sm"])}"${_scopeId}>English</span>`);
            if (currentLang.value === "en") {
              _push2(`<div class="absolute top-3 right-3 text-indigo-600"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button></div></div><div class="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-sm border border-slate-100"${_scopeId}><div class="flex items-center gap-3 mb-6"${_scopeId}><div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl"${_scopeId}>🧩</div><div${_scopeId}><h2 class="text-lg font-black text-slate-800 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("settings_modules_title", "Modul Aplikasi"))}</h2><p class="text-xs font-bold text-slate-400"${_scopeId}>${ssrInterpolate(_ctx.$t("settings_modules_desc", "Aktifkan atau nonaktifkan fitur yang ingin kamu gunakan."))}</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div class="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform"${_scopeId}>🌱</div><div${_scopeId}><h4 class="font-black text-slate-700 text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("habit_page_title", "Habit Tracker"))}</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("module_habit_short", "Daily Habits"))}</p></div></div><label class="relative inline-flex items-center cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).settings.modules.habit) ? ssrLooseContain(unref(form).settings.modules.habit, null) : unref(form).settings.modules.habit) ? " checked" : ""} class="sr-only peer"${_scopeId}><div class="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner"${_scopeId}></div></label></div><div class="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform"${_scopeId}>📋</div><div${_scopeId}><h4 class="font-black text-slate-700 text-sm"${_scopeId}>Daily Planner</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-tight"${_scopeId}>Agenda &amp; Focus</p></div></div><label class="relative inline-flex items-center cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).settings.modules.planner) ? ssrLooseContain(unref(form).settings.modules.planner, null) : unref(form).settings.modules.planner) ? " checked" : ""} class="sr-only peer"${_scopeId}><div class="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner"${_scopeId}></div></label></div><div class="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform"${_scopeId}>💸</div><div${_scopeId}><h4 class="font-black text-slate-700 text-sm"${_scopeId}>Finance Plan</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-tight"${_scopeId}>Money &amp; Budget</p></div></div><label class="relative inline-flex items-center cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).settings.modules.finance) ? ssrLooseContain(unref(form).settings.modules.finance, null) : unref(form).settings.modules.finance) ? " checked" : ""} class="sr-only peer"${_scopeId}><div class="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner"${_scopeId}></div></label></div><div class="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform"${_scopeId}>📓</div><div${_scopeId}><h4 class="font-black text-slate-700 text-sm"${_scopeId}>Digital Journal</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-tight"${_scopeId}>Writing &amp; Thoughts</p></div></div><label class="relative inline-flex items-center cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).settings.modules.journal) ? ssrLooseContain(unref(form).settings.modules.journal, null) : unref(form).settings.modules.journal) ? " checked" : ""} class="sr-only peer"${_scopeId}><div class="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner"${_scopeId}></div></label></div><div class="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform"${_scopeId}>📅</div><div${_scopeId}><h4 class="font-black text-slate-700 text-sm"${_scopeId}>Calendar View</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-tight"${_scopeId}>Global Schedule</p></div></div><label class="relative inline-flex items-center cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).settings.modules.calendar) ? ssrLooseContain(unref(form).settings.modules.calendar, null) : unref(form).settings.modules.calendar) ? " checked" : ""} class="sr-only peer"${_scopeId}><div class="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner"${_scopeId}></div></label></div><div class="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform"${_scopeId}>💼</div><div${_scopeId}><h4 class="font-black text-slate-700 text-sm"${_scopeId}>Job Tracker</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-tight"${_scopeId}>Career &amp; Apps</p></div></div><label class="relative inline-flex items-center cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).settings.modules.job) ? ssrLooseContain(unref(form).settings.modules.job, null) : unref(form).settings.modules.job) ? " checked" : ""} class="sr-only peer"${_scopeId}><div class="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner"${_scopeId}></div></label></div><div class="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform"${_scopeId}>🎯</div><div${_scopeId}><h4 class="font-black text-slate-700 text-sm"${_scopeId}>Goal Tracker</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-tight"${_scopeId}>Vision &amp; Success</p></div></div><label class="relative inline-flex items-center cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).settings.modules.goal) ? ssrLooseContain(unref(form).settings.modules.goal, null) : unref(form).settings.modules.goal) ? " checked" : ""} class="sr-only peer"${_scopeId}><div class="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner"${_scopeId}></div></label></div></div>`);
            if (unref(form).recentlySuccessful) {
              _push2(`<div class="text-center bg-emerald-50 text-emerald-600 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100 mt-6 shadow-sm"${_scopeId}> ✨ ${ssrInterpolate(_ctx.$t("settings_saved", "Pengaturan tersimpan otomatis!"))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-3xl mx-auto py-12 px-4 sm:px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" }, [
                createVNode("div", null, [
                  createVNode("h1", { class: "text-3xl font-black text-slate-800 tracking-tight" }, toDisplayString(_ctx.$t("settings_title", "Pengaturan")), 1),
                  createVNode("p", { class: "text-sm font-medium text-slate-500 mt-1" }, toDisplayString(_ctx.$t("settings_desc", "Sesuaikan pengalaman aplikasi Oneformind Anda.")), 1)
                ]),
                createVNode("div", { class: "bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-sm border border-slate-100" }, [
                  createVNode("div", { class: "flex items-center gap-3 mb-6" }, [
                    createVNode("div", { class: "w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl" }, "🌐"),
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-lg font-black text-slate-800 leading-tight" }, toDisplayString(_ctx.$t("settings_language_title", "Bahasa Aplikasi")), 1),
                      createVNode("p", { class: "text-xs font-bold text-slate-400" }, toDisplayString(_ctx.$t("settings_language_desc", "Pilih bahasa antarmuka aplikasi.")), 1)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("button", {
                      onClick: ($event) => switchLang("id"),
                      class: ["relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300", currentLang.value === "id" ? "border-indigo-600 bg-indigo-50/50 shadow-md" : "border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50"]
                    }, [
                      createVNode("span", { class: "text-4xl mb-2 drop-shadow-sm" }, "🇮🇩"),
                      createVNode("span", {
                        class: ["font-black text-sm", currentLang.value === "id" ? "text-indigo-800" : "text-slate-600"]
                      }, "Indonesia", 2),
                      currentLang.value === "id" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "absolute top-3 right-3 text-indigo-600"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "3"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M5 13l4 4L19 7"
                          })
                        ]))
                      ])) : createCommentVNode("", true)
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => switchLang("en"),
                      class: ["relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300", currentLang.value === "en" ? "border-indigo-600 bg-indigo-50/50 shadow-md" : "border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50"]
                    }, [
                      createVNode("span", { class: "text-4xl mb-2 drop-shadow-sm" }, "🇬🇧"),
                      createVNode("span", {
                        class: ["font-black text-sm", currentLang.value === "en" ? "text-indigo-800" : "text-slate-600"]
                      }, "English", 2),
                      currentLang.value === "en" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "absolute top-3 right-3 text-indigo-600"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "stroke-width": "3"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M5 13l4 4L19 7"
                          })
                        ]))
                      ])) : createCommentVNode("", true)
                    ], 10, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-sm border border-slate-100" }, [
                  createVNode("div", { class: "flex items-center gap-3 mb-6" }, [
                    createVNode("div", { class: "w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl" }, "🧩"),
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-lg font-black text-slate-800 leading-tight" }, toDisplayString(_ctx.$t("settings_modules_title", "Modul Aplikasi")), 1),
                      createVNode("p", { class: "text-xs font-bold text-slate-400" }, toDisplayString(_ctx.$t("settings_modules_desc", "Aktifkan atau nonaktifkan fitur yang ingin kamu gunakan.")), 1)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode("div", { class: "flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group" }, [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform" }, "🌱"),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-black text-slate-700 text-sm" }, toDisplayString(_ctx.$t("habit_page_title", "Habit Tracker")), 1),
                          createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-tight" }, toDisplayString(_ctx.$t("module_habit_short", "Daily Habits")), 1)
                        ])
                      ]),
                      createVNode("label", { class: "relative inline-flex items-center cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": ($event) => unref(form).settings.modules.habit = $event,
                          class: "sr-only peer",
                          onChange: saveSettings
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).settings.modules.habit]
                        ]),
                        createVNode("div", { class: "w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner" })
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group" }, [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform" }, "📋"),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-black text-slate-700 text-sm" }, "Daily Planner"),
                          createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-tight" }, "Agenda & Focus")
                        ])
                      ]),
                      createVNode("label", { class: "relative inline-flex items-center cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": ($event) => unref(form).settings.modules.planner = $event,
                          class: "sr-only peer",
                          onChange: saveSettings
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).settings.modules.planner]
                        ]),
                        createVNode("div", { class: "w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner" })
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group" }, [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform" }, "💸"),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-black text-slate-700 text-sm" }, "Finance Plan"),
                          createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-tight" }, "Money & Budget")
                        ])
                      ]),
                      createVNode("label", { class: "relative inline-flex items-center cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": ($event) => unref(form).settings.modules.finance = $event,
                          class: "sr-only peer",
                          onChange: saveSettings
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).settings.modules.finance]
                        ]),
                        createVNode("div", { class: "w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner" })
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group" }, [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform" }, "📓"),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-black text-slate-700 text-sm" }, "Digital Journal"),
                          createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-tight" }, "Writing & Thoughts")
                        ])
                      ]),
                      createVNode("label", { class: "relative inline-flex items-center cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": ($event) => unref(form).settings.modules.journal = $event,
                          class: "sr-only peer",
                          onChange: saveSettings
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).settings.modules.journal]
                        ]),
                        createVNode("div", { class: "w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner" })
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group" }, [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform" }, "📅"),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-black text-slate-700 text-sm" }, "Calendar View"),
                          createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-tight" }, "Global Schedule")
                        ])
                      ]),
                      createVNode("label", { class: "relative inline-flex items-center cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": ($event) => unref(form).settings.modules.calendar = $event,
                          class: "sr-only peer",
                          onChange: saveSettings
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).settings.modules.calendar]
                        ]),
                        createVNode("div", { class: "w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner" })
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group" }, [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform" }, "💼"),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-black text-slate-700 text-sm" }, "Job Tracker"),
                          createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-tight" }, "Career & Apps")
                        ])
                      ]),
                      createVNode("label", { class: "relative inline-flex items-center cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": ($event) => unref(form).settings.modules.job = $event,
                          class: "sr-only peer",
                          onChange: saveSettings
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).settings.modules.job]
                        ]),
                        createVNode("div", { class: "w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner" })
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group" }, [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform" }, "🎯"),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-black text-slate-700 text-sm" }, "Goal Tracker"),
                          createVNode("p", { class: "text-[10px] font-bold text-slate-400 uppercase tracking-tight" }, "Vision & Success")
                        ])
                      ]),
                      createVNode("label", { class: "relative inline-flex items-center cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": ($event) => unref(form).settings.modules.goal = $event,
                          class: "sr-only peer",
                          onChange: saveSettings
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).settings.modules.goal]
                        ]),
                        createVNode("div", { class: "w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner" })
                      ])
                    ])
                  ]),
                  createVNode(Transition, {
                    "enter-active-class": "transition duration-300 ease-out",
                    "enter-from-class": "opacity-0 -translate-y-2",
                    "enter-to-class": "opacity-100 translate-y-0",
                    "leave-active-class": "transition duration-200 ease-in",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      unref(form).recentlySuccessful ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center bg-emerald-50 text-emerald-600 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100 mt-6 shadow-sm"
                      }, " ✨ " + toDisplayString(_ctx.$t("settings_saved", "Pengaturan tersimpan otomatis!")), 1)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
