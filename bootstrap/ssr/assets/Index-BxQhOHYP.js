import { unref, withCtx, createVNode, withDirectives, vModelCheckbox, Transition, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-B2_TjefJ.js";
import { useForm, Head } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { userSettings: Object },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    const props = __props;
    const form = useForm({
      settings: {
        modules: {
          habit: ((_b = (_a = props.userSettings) == null ? void 0 : _a.modules) == null ? void 0 : _b.habit) ?? true,
          planner: ((_d = (_c = props.userSettings) == null ? void 0 : _c.modules) == null ? void 0 : _d.planner) ?? true,
          finance: ((_f = (_e = props.userSettings) == null ? void 0 : _e.modules) == null ? void 0 : _f.finance) ?? true
          // Pastikan ini ada
        }
      }
    });
    const saveSettings = () => {
      form.post(route("settings.update"), {
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Pengaturan" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-2xl mx-auto py-12 px-4"${_scopeId}><div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"${_scopeId}><h2 class="text-2xl font-black text-slate-800 mb-2"${_scopeId}>Atur Aplikasi Kamu</h2><p class="text-slate-400 mb-8"${_scopeId}>Pilih fitur mana saja yang ingin kamu tampilkan di sidebar.</p><form class="space-y-4"${_scopeId}><div class="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 transition hover:border-indigo-200"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm"${_scopeId}>🌱</div><div${_scopeId}><h4 class="font-bold text-slate-700 text-lg"${_scopeId}>Habit Tracker</h4><p class="text-xs text-slate-400"${_scopeId}>Pantau kebiasaan harianmu</p></div></div><label class="relative inline-flex items-center cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).settings.modules.habit) ? ssrLooseContain(unref(form).settings.modules.habit, null) : unref(form).settings.modules.habit) ? " checked" : ""} class="sr-only peer"${_scopeId}><div class="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500"${_scopeId}></div></label></div><div class="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 transition hover:border-indigo-200"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm"${_scopeId}>📅</div><div${_scopeId}><h4 class="font-bold text-slate-700 text-lg"${_scopeId}>Daily Planner</h4><p class="text-xs text-slate-400"${_scopeId}>Jadwal &amp; Agenda Harian</p></div></div><label class="relative inline-flex items-center cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).settings.modules.planner) ? ssrLooseContain(unref(form).settings.modules.planner, null) : unref(form).settings.modules.planner) ? " checked" : ""} class="sr-only peer"${_scopeId}><div class="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500"${_scopeId}></div></label></div><div class="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 transition hover:border-indigo-200"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm"${_scopeId}>💸</div><div${_scopeId}><h4 class="font-bold text-slate-700 text-lg"${_scopeId}>Finance Management</h4><p class="text-xs text-slate-400"${_scopeId}>Atur budget &amp; pengeluaran</p></div></div><label class="relative inline-flex items-center cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).settings.modules.finance) ? ssrLooseContain(unref(form).settings.modules.finance, null) : unref(form).settings.modules.finance) ? " checked" : ""} class="sr-only peer"${_scopeId}><div class="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500"${_scopeId}></div></label></div>`);
            if (unref(form).recentlySuccessful) {
              _push2(`<div class="text-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg text-sm font-bold border border-emerald-100 mt-4"${_scopeId}> ✨ Pengaturan tersimpan otomatis! </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-2xl mx-auto py-12 px-4" }, [
                createVNode("div", { class: "bg-white rounded-3xl p-8 shadow-sm border border-slate-100" }, [
                  createVNode("h2", { class: "text-2xl font-black text-slate-800 mb-2" }, "Atur Aplikasi Kamu"),
                  createVNode("p", { class: "text-slate-400 mb-8" }, "Pilih fitur mana saja yang ingin kamu tampilkan di sidebar."),
                  createVNode("form", { class: "space-y-4" }, [
                    createVNode("div", { class: "flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 transition hover:border-indigo-200" }, [
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode("div", { class: "w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm" }, "🌱"),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-bold text-slate-700 text-lg" }, "Habit Tracker"),
                          createVNode("p", { class: "text-xs text-slate-400" }, "Pantau kebiasaan harianmu")
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
                        createVNode("div", { class: "w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500" })
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 transition hover:border-indigo-200" }, [
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode("div", { class: "w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm" }, "📅"),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-bold text-slate-700 text-lg" }, "Daily Planner"),
                          createVNode("p", { class: "text-xs text-slate-400" }, "Jadwal & Agenda Harian")
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
                        createVNode("div", { class: "w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500" })
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 transition hover:border-indigo-200" }, [
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode("div", { class: "w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm" }, "💸"),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-bold text-slate-700 text-lg" }, "Finance Management"),
                          createVNode("p", { class: "text-xs text-slate-400" }, "Atur budget & pengeluaran")
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
                        createVNode("div", { class: "w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500" })
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
                          class: "text-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg text-sm font-bold border border-emerald-100 mt-4"
                        }, " ✨ Pengaturan tersimpan otomatis! ")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
