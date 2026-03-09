import { ref, watch, unref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { Target, Upload, X, Award, CheckCircle2, Calendar, Zap, Plus } from "lucide-vue-next";
import { trans } from "laravel-vue-i18n";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import _sfc_main$1 from "./GoalDatePicker-Di7v62U2.js";
import MilestoneItem from "./MilestoneItem-k7xkfgWU.js";
import "sweetalert2";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "dayjs/plugin/localeData.js";
const _sfc_main = {
  __name: "GoalModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    goal: Object,
    onClose: Function,
    onSave: Function,
    onUploadImage: Function
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const page = usePage();
    const form = ref({
      title: "",
      color: "#6366f1",
      type: "daily",
      status: "active",
      priority: "important",
      reward: "",
      target_value: 0,
      current_value: 0,
      start_date: dayjs().format("YYYY-MM-DD"),
      end_date: null,
      cover_image_url: "",
      cover_image_path: "",
      milestones: []
    });
    const imagePreview = ref(null);
    const isUploading = ref(false);
    ref(null);
    const showStartPicker = ref(false);
    const showEndPicker = ref(false);
    const dateDisplay = (date) => {
      if (!date) return t("goal_ph_date", "Pilih Tanggal");
      const loc = page.props.locale || "id";
      return dayjs(date).locale(loc).format("DD MMM YYYY");
    };
    watch(() => props.goal, (newGoal) => {
      if (newGoal) {
        form.value = JSON.parse(JSON.stringify(newGoal));
        imagePreview.value = newGoal.cover_image_url || null;
      }
    }, { immediate: true });
    const t = (key, fallback) => {
      const res = trans(key);
      return res !== key ? res : fallback;
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        var _a, _b, _c;
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4" data-v-d62ecfe3><div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" data-v-d62ecfe3></div><div class="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]" data-v-d62ecfe3><div class="relative h-44 bg-slate-100 shrink-0 group rounded-t-[2.5rem] overflow-hidden" data-v-d62ecfe3>`);
          if (imagePreview.value) {
            _push2(`<div class="absolute inset-0 transition-transform duration-700 group-hover:scale-105" data-v-d62ecfe3><img${ssrRenderAttr("src", imagePreview.value)} class="w-full h-full object-cover" data-v-d62ecfe3><div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" data-v-d62ecfe3></div></div>`);
          } else {
            _push2(`<div class="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white/10" data-v-d62ecfe3>`);
            _push2(ssrRenderComponent(unref(Target), {
              size: 100,
              "stroke-width": "1",
              class: "animate-pulse"
            }, null, _parent));
            _push2(`</div>`);
          }
          _push2(`<div class="absolute inset-x-6 bottom-5 flex justify-between items-end" data-v-d62ecfe3><div class="flex-grow min-w-0" data-v-d62ecfe3><span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest mb-1.5" data-v-d62ecfe3>${ssrInterpolate(((_a = __props.goal) == null ? void 0 : _a.id) ? t("goal_edit", "Update Vision") : t("goal_new", "Create New Vision"))}</span><h2 class="text-2xl font-black text-white drop-shadow-md truncate pr-4" data-v-d62ecfe3>${ssrInterpolate(form.value.title || t("goal_placeholder_title", "What is your dream?"))}</h2></div><button type="button" class="shrink-0 w-11 h-11 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110 active:scale-95 shadow-xl" data-v-d62ecfe3>`);
          if (!isUploading.value) {
            _push2(ssrRenderComponent(unref(Upload), { size: 18 }, null, _parent));
          } else {
            _push2(`<div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" data-v-d62ecfe3></div>`);
          }
          _push2(`</button><input type="file" class="hidden" accept="image/*" data-v-d62ecfe3></div><button class="absolute top-5 right-5 w-9 h-9 bg-black/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-10" data-v-d62ecfe3>`);
          _push2(ssrRenderComponent(unref(X), { size: 18 }, null, _parent));
          _push2(`</button></div><div class="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-6 pb-40" data-v-d62ecfe3><div class="space-y-2" data-v-d62ecfe3><label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1" data-v-d62ecfe3>${ssrInterpolate(t("goal_label_title", "Goal Title"))}</label><div class="relative group" data-v-d62ecfe3><input${ssrRenderAttr("value", form.value.title)} type="text" class="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-5 text-slate-700 font-bold focus:bg-white focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 placeholder:text-slate-300 transition-all text-lg shadow-sm"${ssrRenderAttr("placeholder", t("goal_placeholder_title", "Tuliskan impianmu disini..."))} data-v-d62ecfe3>`);
          _push2(ssrRenderComponent(unref(Target), {
            size: 20,
            class: "absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors pointer-events-none"
          }, null, _parent));
          _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-d62ecfe3><div class="space-y-2" data-v-d62ecfe3><label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1" data-v-d62ecfe3>${ssrInterpolate(t("goal_label_priority", "Priority"))}</label><div class="flex gap-2 p-1.5 bg-slate-100 rounded-2xl" data-v-d62ecfe3><!--[-->`);
          ssrRenderList(["vital", "important", "optional"], (p) => {
            _push2(`<button class="${ssrRenderClass([
              "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              form.value.priority === p ? "bg-white text-indigo-600 shadow-md" : "text-slate-400 hover:text-slate-600"
            ])}" data-v-d62ecfe3>${ssrInterpolate(t(`priority_${p}`, p))}</button>`);
          });
          _push2(`<!--]--></div></div><div class="space-y-2" data-v-d62ecfe3><label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1" data-v-d62ecfe3>${ssrInterpolate(t("goal_label_reward", "Self Reward"))}</label><div class="relative group" data-v-d62ecfe3><input${ssrRenderAttr("value", form.value.reward)} type="text" class="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 text-slate-700 font-bold focus:bg-white focus:border-amber-500/20 focus:ring-4 focus:ring-amber-500/5 transition-all"${ssrRenderAttr("placeholder", t("goal_placeholder_reward", "Rayakan saat tercapai!"))} data-v-d62ecfe3>`);
          _push2(ssrRenderComponent(unref(Award), {
            size: 20,
            class: "absolute right-5 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none"
          }, null, _parent));
          _push2(`</div></div></div><div class="space-y-2" data-v-d62ecfe3><label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1" data-v-d62ecfe3>${ssrInterpolate(t("goal_label_color", "Goal Color Theme"))}</label><div class="flex flex-wrap gap-3 p-4 bg-slate-50 rounded-[2rem] border border-slate-100/50 shadow-inner" data-v-d62ecfe3><!--[-->`);
          ssrRenderList(["#6366f1", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6", "#0ea5e9", "#0f172a"], (c) => {
            _push2(`<button type="button" style="${ssrRenderStyle({ backgroundColor: c })}" class="${ssrRenderClass([form.value.color === c ? "ring-4 ring-offset-4 ring-indigo-500/20 shadow-xl" : "opacity-60 hover:opacity-100", "w-10 h-10 rounded-2xl transition-all group relative flex items-center justify-center overflow-hidden hover:scale-110 active:scale-90"])}" data-v-d62ecfe3>`);
            if (form.value.color === c) {
              _push2(`<div class="text-white drop-shadow-md" data-v-d62ecfe3>`);
              _push2(ssrRenderComponent(unref(CheckCircle2), { size: 20 }, null, _parent));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button>`);
          });
          _push2(`<!--]--></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-50" data-v-d62ecfe3><div class="space-y-2 relative" data-v-d62ecfe3><label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1" data-v-d62ecfe3>${ssrInterpolate(t("goal_label_start", "Start Date"))}</label><div class="relative" data-v-d62ecfe3><button type="button" class="w-full bg-slate-50 border-2 border-transparent hover:border-indigo-100 rounded-2xl px-5 py-4 text-slate-700 font-bold text-left transition-all flex justify-between items-center group" data-v-d62ecfe3><span data-v-d62ecfe3>${ssrInterpolate(dateDisplay(form.value.start_date))}</span>`);
          _push2(ssrRenderComponent(unref(Calendar), {
            size: 18,
            class: "text-slate-300 group-hover:text-indigo-500"
          }, null, _parent));
          _push2(`</button>`);
          if (showStartPicker.value) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: true,
              teleport: true,
              modelValue: form.value.start_date,
              "onUpdate:modelValue": (val) => {
                form.value.start_date = val;
                showStartPicker.value = false;
              },
              onClose: ($event) => showStartPicker.value = false
            }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="space-y-2 relative" data-v-d62ecfe3><label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1" data-v-d62ecfe3>${ssrInterpolate(t("goal_label_end", "Target Deadline"))}</label><div class="relative" data-v-d62ecfe3><button type="button" class="w-full bg-slate-50 border-2 border-transparent hover:border-rose-100 rounded-2xl px-5 py-4 text-slate-700 font-bold text-left transition-all flex justify-between items-center group" data-v-d62ecfe3><span class="${ssrRenderClass(!form.value.end_date ? "text-slate-300" : "")}" data-v-d62ecfe3>${ssrInterpolate(dateDisplay(form.value.end_date))}</span>`);
          _push2(ssrRenderComponent(unref(Zap), {
            size: 18,
            class: form.value.end_date ? "text-rose-500" : "text-slate-300 group-hover:text-rose-400"
          }, null, _parent));
          _push2(`</button>`);
          if (showEndPicker.value) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: true,
              teleport: true,
              modelValue: form.value.end_date,
              "onUpdate:modelValue": (val) => {
                form.value.end_date = val;
                showEndPicker.value = false;
              },
              onClose: ($event) => showEndPicker.value = false
            }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div><div class="space-y-4 pt-4 border-t border-slate-100" data-v-d62ecfe3><div class="flex items-center justify-between px-1" data-v-d62ecfe3><label class="text-[11px] font-black text-slate-400 uppercase tracking-widest" data-v-d62ecfe3>${ssrInterpolate(t("goal_milestones_title", "Mastery Steps"))}</label><span class="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-lg" data-v-d62ecfe3>${ssrInterpolate(((_b = form.value.milestones) == null ? void 0 : _b.length) || 0)} Steps</span></div><div class="space-y-3" data-v-d62ecfe3><!--[-->`);
          ssrRenderList(form.value.milestones, (m, idx) => {
            _push2(ssrRenderComponent(MilestoneItem, {
              key: m.id || idx,
              milestone: m,
              onSave: (data) => Object.assign(m, data),
              onToggle: ($event) => m.completed = !m.completed,
              onDelete: ($event) => form.value.milestones.splice(idx, 1)
            }, null, _parent));
          });
          _push2(`<!--]--><button type="button" class="w-full py-4 rounded-2xl border-2 border-dashed border-slate-100 text-slate-400 hover:border-indigo-100 hover:text-indigo-500 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group/add" data-v-d62ecfe3>`);
          _push2(ssrRenderComponent(unref(Plus), {
            size: 16,
            class: "group-hover/add:rotate-90 transition-transform"
          }, null, _parent));
          _push2(`<span class="text-[11px] font-black uppercase tracking-widest" data-v-d62ecfe3>${ssrInterpolate(t("goal_btn_add_milestone", "Add Step"))}</span></button></div></div></div><div class="p-6 bg-slate-50/80 backdrop-blur-sm shrink-0 flex items-center justify-between border-t border-slate-100 relative z-50" data-v-d62ecfe3><button class="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors px-4 py-2" data-v-d62ecfe3>${ssrInterpolate(t("btn_cancel", "Cancel"))}</button><button class="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-3" data-v-d62ecfe3>`);
          _push2(ssrRenderComponent(unref(CheckCircle2), { size: 16 }, null, _parent));
          _push2(` ${ssrInterpolate(((_c = __props.goal) == null ? void 0 : _c.id) ? t("goal_btn_save", "Update Vision") : t("goal_btn_create", "Manifest Goal"))}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/GoalModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GoalModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d62ecfe3"]]);
export {
  GoalModal as default
};
