import { ref, computed, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { Check, Calendar, Trash2 } from "lucide-vue-next";
import { trans } from "laravel-vue-i18n";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import _sfc_main$1 from "./GoalDatePicker-Di7v62U2.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "dayjs/plugin/localeData.js";
import "dayjs/locale/en.js";
const _sfc_main = {
  __name: "MilestoneItem",
  __ssrInlineRender: true,
  props: { milestone: Object },
  emits: ["toggle", "delete", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const page = usePage();
    const t = (key, fallback) => {
      const res = trans(key);
      return res !== key ? res : fallback;
    };
    const isEditing = ref(props.milestone.is_new || false);
    const editTitle = ref(props.milestone.title || "");
    const editTargetDate = ref(props.milestone.target_date || null);
    const showDatePicker = ref(false);
    let saveTimeout = null;
    const handleSave = () => {
      clearTimeout(saveTimeout);
      if (editTitle.value.trim() !== "") {
        emit("save", {
          ...props.milestone,
          title: editTitle.value.trim(),
          target_date: editTargetDate.value
        });
        isEditing.value = false;
      }
    };
    const handleDatePick = (val) => {
      editTargetDate.value = val;
      showDatePicker.value = false;
      handleSave();
    };
    const dateDisplay = computed(() => {
      if (!editTargetDate.value) return t("milestone_target_date", "Set Date");
      const loc = page.props.locale || "id";
      return dayjs(editTargetDate.value).locale(loc).format("DD MMM YYYY");
    });
    watch(() => props.milestone.title, (newTitle) => {
      editTitle.value = newTitle;
    });
    watch(() => props.milestone.target_date, (newDate) => {
      editTargetDate.value = newDate;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex items-center group/ms gap-3 py-1.5 px-3 bg-transparent hover:bg-slate-50/50 rounded-2xl transition-all duration-300 relative border border-transparent hover:border-slate-100", __props.milestone.is_saving ? "opacity-70" : ""]
      }, _attrs))} data-v-6a815ab0><button class="${ssrRenderClass([__props.milestone.is_completed || __props.milestone.completed ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-200" : "border-slate-200 bg-white hover:border-indigo-400", "flex-shrink-0 w-[18px] h-[18px] rounded-lg border-2 flex items-center justify-center transition-all duration-300 focus:outline-none"])}" data-v-6a815ab0>`);
      if (__props.milestone.is_completed || __props.milestone.completed) {
        _push(ssrRenderComponent(unref(Check), {
          size: 12,
          "stroke-width": "4"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="flex-grow flex flex-col min-w-0" data-v-6a815ab0><input${ssrRenderAttr("value", editTitle.value)}${ssrRenderAttr("placeholder", t("milestone_placeholder", "Identify next step..."))} class="${ssrRenderClass([__props.milestone.is_completed || __props.milestone.completed ? "text-slate-400 line-through font-medium" : "text-slate-700 font-black", "w-full bg-transparent border-none focus:ring-0 p-0 text-sm placeholder:text-slate-300 transition-all"])}" data-v-6a815ab0><div class="flex items-center gap-2 mt-0.5" data-v-6a815ab0><button class="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md hover:bg-slate-100 transition-colors group/date" data-v-6a815ab0>`);
      _push(ssrRenderComponent(unref(Calendar), {
        size: 10,
        class: __props.milestone.is_completed || __props.milestone.completed ? "text-slate-300" : "text-slate-400 group-hover/date:text-indigo-500"
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([__props.milestone.is_completed || __props.milestone.completed ? "text-slate-300" : "text-slate-400 group-hover/date:text-slate-600", "text-[9px] font-black uppercase tracking-widest"])}" data-v-6a815ab0>${ssrInterpolate(dateDisplay.value)}</span></button></div></div><button class="opacity-0 group-hover/ms:opacity-100 p-1.5 text-slate-300 hover:text-rose-500 transition-all rounded-xl hover:bg-rose-50 focus:outline-none shrink-0" data-v-6a815ab0>`);
      _push(ssrRenderComponent(unref(Trash2), { size: 14 }, null, _parent));
      _push(`</button>`);
      if (showDatePicker.value) {
        _push(`<div class="absolute left-10 top-full mt-2 z-50 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 animate-in fade-in zoom-in duration-200" data-v-6a815ab0>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          show: true,
          modelValue: editTargetDate.value,
          "onUpdate:modelValue": handleDatePick,
          onClose: ($event) => showDatePicker.value = false
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.milestone.is_saving) {
        _push(`<div class="absolute right-3 bottom-1" data-v-6a815ab0><div class="w-2 h-2 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" data-v-6a815ab0></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/MilestoneItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MilestoneItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6a815ab0"]]);
export {
  MilestoneItem as default
};
