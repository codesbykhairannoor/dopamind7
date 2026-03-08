import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import dayjs from "dayjs";
import GoalDatePicker from "./GoalDatePicker-BSC27_Du.js";
import { Check, Calendar, Clock, Edit3, Trash2 } from "lucide-vue-next";
import { trans } from "laravel-vue-i18n";
import "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "MilestoneItem",
  __ssrInlineRender: true,
  props: {
    milestone: Object
  },
  emits: ["save", "toggle", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const page = usePage();
    const t = (key, fallback) => {
      const res = trans(key);
      return res !== key ? res : fallback;
    };
    const isEditing = ref(false);
    const editTitle = ref(props.milestone.title);
    const editTargetDate = ref(props.milestone.target_date);
    const showDatePicker = ref(false);
    const dateDisplay = computed(() => {
      if (!editTargetDate.value) return t("milestone_target_date", "Set Date");
      const loc = page.props.locale || "id";
      return dayjs(editTargetDate.value).locale(loc).format("DD MMM YYYY");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center group gap-3 py-2 px-3 bg-slate-50/50 hover:bg-white rounded-xl transition-all duration-300 border border-transparent hover:border-slate-100 hover:shadow-md hover:shadow-indigo-500/5 relative" }, _attrs))}><button class="${ssrRenderClass([__props.milestone.completed ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" : "border-slate-200 bg-white hover:border-indigo-400", "flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300"])}">`);
      if (__props.milestone.completed) {
        _push(ssrRenderComponent(unref(Check), {
          size: 12,
          "stroke-width": "4"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="flex-grow min-w-0">`);
      if (isEditing.value || __props.milestone.is_new) {
        _push(`<div class="flex flex-col"><input${ssrRenderAttr("value", editTitle.value)} autofocus${ssrRenderAttr("placeholder", t("milestone_placeholder", "Nama langkah..."))} class="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-bold text-slate-700 placeholder:text-slate-300"><div class="flex items-center gap-2.5 mt-1"><div class="relative"><button type="button" class="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all flex items-center gap-1.5">`);
        _push(ssrRenderComponent(unref(Calendar), { size: 9 }, null, _parent));
        _push(` ${ssrInterpolate(dateDisplay.value)}</button>`);
        if (showDatePicker.value) {
          _push(`<div class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:bottom-full sm:left-0 sm:mb-2 sm:origin-bottom-left sm:block sm:inset-auto"><div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm sm:hidden"></div>`);
          _push(ssrRenderComponent(GoalDatePicker, {
            show: true,
            modelValue: editTargetDate.value,
            "onUpdate:modelValue": (val) => {
              editTargetDate.value = val;
              showDatePicker.value = false;
            },
            onClose: ($event) => showDatePicker.value = false,
            class: "relative z-10"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button class="text-[8px] font-black uppercase tracking-widest text-indigo-600 hover:tracking-[0.1em] transition-all">${ssrInterpolate(t("btn_save", "Save"))}</button></div></div>`);
      } else {
        _push(`<div class="cursor-pointer group/text relative py-0.5"><span class="${ssrRenderClass([__props.milestone.completed ? "text-slate-300 line-through" : "text-slate-700 group-hover/text:text-indigo-600", "block text-xs font-bold transition-all duration-300 truncate"])}">${ssrInterpolate(__props.milestone.title || t("milestone_edit_placeholder", "Untitled Step"))}</span>`);
        if (__props.milestone.target_date) {
          _push(`<span class="text-[8px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1 mt-0.5">`);
          _push(ssrRenderComponent(unref(Clock), { size: 8 }, null, _parent));
          _push(` ${ssrInterpolate(__props.milestone.target_date)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="absolute -right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/text:opacity-100 transition-opacity">`);
        _push(ssrRenderComponent(unref(Edit3), {
          size: 10,
          class: "text-indigo-400"
        }, null, _parent));
        _push(`</div></div>`);
      }
      _push(`</div><button class="opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-rose-500 transition-all rounded-lg hover:bg-rose-50">`);
      _push(ssrRenderComponent(unref(Trash2), { size: 12 }, null, _parent));
      _push(`</button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Goal/MilestoneItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
