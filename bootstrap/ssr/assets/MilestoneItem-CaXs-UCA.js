import { ref, computed, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { Check, Trash2 } from "lucide-vue-next";
import { trans } from "laravel-vue-i18n";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "./GoalDatePicker-Di7v62U2.js";
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
    const page = usePage();
    const t = (key, fallback) => {
      const res = trans(key);
      return res !== key ? res : fallback;
    };
    ref(false);
    const isFocused = ref(false);
    const editTitle = ref(props.milestone.title || "");
    const editTargetDate = ref(props.milestone.target_date || null);
    ref(false);
    computed(() => {
      if (!editTargetDate.value) return t("milestone_target_date", "Set Date");
      const loc = page.props.locale || "id";
      return dayjs(editTargetDate.value).locale(loc).format("DD MMM YYYY");
    });
    watch(() => props.milestone.title, (newTitle) => {
      if (!isFocused.value) {
        editTitle.value = newTitle;
      }
    });
    watch(() => props.milestone.target_date, (newDate) => {
      editTargetDate.value = newDate;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex items-center group/ms gap-3 py-1.5 px-3 bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/5 rounded-2xl transition-all duration-300 relative border border-transparent hover:border-slate-100 dark:hover:border-slate-800", __props.milestone.is_saving ? "opacity-70" : ""]
      }, _attrs))} data-v-a0f4a8b2><button class="${ssrRenderClass([__props.milestone.is_completed || __props.milestone.completed ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-900/40" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500", "flex-shrink-0 w-[18px] h-[18px] rounded-lg border-2 flex items-center justify-center transition-all duration-300 focus:outline-none"])}" data-v-a0f4a8b2>`);
      if (__props.milestone.is_completed || __props.milestone.completed) {
        _push(ssrRenderComponent(unref(Check), {
          size: 12,
          "stroke-width": "4"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="flex-grow flex flex-col min-w-0" data-v-a0f4a8b2><input${ssrRenderAttr("value", editTitle.value)}${ssrRenderAttr("placeholder", t("milestone_placeholder", "Identify next step..."))} class="${ssrRenderClass([__props.milestone.is_completed || __props.milestone.completed ? "text-slate-400 dark:text-slate-500 line-through font-medium" : "text-slate-700 dark:text-slate-200 font-black", "w-full bg-transparent border-none focus:ring-0 p-0 text-sm placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-all font-bold"])}" data-v-a0f4a8b2></div><button class="opacity-0 group-hover/ms:opacity-100 p-1.5 text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 transition-all rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 focus:outline-none shrink-0" data-v-a0f4a8b2>`);
      _push(ssrRenderComponent(unref(Trash2), { size: 14 }, null, _parent));
      _push(`</button>`);
      if (__props.milestone.is_saving) {
        _push(`<div class="absolute right-3 bottom-1" data-v-a0f4a8b2><div class="w-2 h-2 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" data-v-a0f4a8b2></div></div>`);
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
const MilestoneItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a0f4a8b2"]]);
export {
  MilestoneItem as default
};
