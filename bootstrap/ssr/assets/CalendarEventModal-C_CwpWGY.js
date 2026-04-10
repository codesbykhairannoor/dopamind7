import { ssrRenderTeleport, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { ref, useSSRContext } from "vue";
import _sfc_main$1 from "./FinanceDatePicker-CxOhCf2w.js";
import dayjs from "dayjs";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "CalendarEventModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    form: Object
  },
  emits: ["close", "submit"],
  setup(__props, { emit: __emit }) {
    const { appLocale } = useFinanceFormat();
    const showStartDatePicker = ref(false);
    const showEndDatePicker = ref(false);
    const dateDisplay = (dateString, fallback = "Select date") => {
      if (!dateString) return fallback;
      const loc = appLocale.value ? appLocale.value.split("-")[0] : "id";
      return dayjs(dateString).locale(loc).format("DD MMM YYYY");
    };
    const colorOptions = [
      { value: "#4f46e5", label: "color_indigo" },
      { value: "#0ea5e9", label: "color_sky" },
      { value: "#10b981", label: "color_emerald" },
      { value: "#f59e0b", label: "color_amber" },
      { value: "#f43f5e", label: "color_rose" },
      { value: "#8b5cf6", label: "color_purple" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6" data-v-c6760812><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" data-v-c6760812></div><div class="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl dark:shadow-none w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-white/50 dark:ring-slate-800 transition-colors duration-500" data-v-c6760812><div class="px-8 py-6 border-b border-slate-100/80 dark:border-slate-800 flex items-center justify-between transition-colors duration-500" data-v-c6760812><h3 class="text-xl font-black text-slate-800 dark:text-white flex items-center gap-4 transition-colors duration-500" data-v-c6760812><span class="w-4 h-4 rounded-full shadow-lg" style="${ssrRenderStyle(`background-color: ${__props.form.color}`)}" data-v-c6760812></span> ${ssrInterpolate(__props.form.id ? _ctx.$t("calendar_edit_event", "Edit event") : _ctx.$t("calendar_new_event", "Create new event"))}</h3><button class="w-10 h-10 flex items-center justify-center rounded-[1rem] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 transition-colors" data-v-c6760812><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c6760812><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" data-v-c6760812></path></svg></button></div><div class="p-8 overflow-y-auto custom-scrollbar space-y-6 bg-slate-50/20 dark:bg-slate-950/20" data-v-c6760812><div data-v-c6760812><label class="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500 ml-1 tracking-widest" data-v-c6760812>${ssrInterpolate(_ctx.$t("label_title", "Event title"))} <span class="text-rose-500" data-v-c6760812>*</span></label><input${ssrRenderAttr("value", __props.form.title)} type="text" class="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-black text-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 transition-colors duration-500 shadow-sm"${ssrRenderAttr("placeholder", _ctx.$t("ph_event_title", "E.g. Strategy session"))} required autofocus data-v-c6760812></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-5" data-v-c6760812><div class="relative" data-v-c6760812><label class="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500 ml-1 tracking-widest" data-v-c6760812>${ssrInterpolate(_ctx.$t("label_start_date", "Start date"))}</label><button type="button" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-700 dark:text-slate-300 font-bold hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all flex items-center justify-between transition-colors duration-500 shadow-sm" data-v-c6760812><span class="truncate" data-v-c6760812>${ssrInterpolate(dateDisplay(__props.form.start_date, _ctx.$t("select_date", "Select date")))}</span><span class="text-slate-400 dark:text-slate-600 opacity-50" data-v-c6760812>📅</span></button>`);
          if (showStartDatePicker.value) {
            _push2(`<div class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:top-full sm:left-0 sm:mt-3 sm:origin-top-left sm:block sm:inset-auto" data-v-c6760812><div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm sm:hidden" data-v-c6760812></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: true,
              modelValue: __props.form.start_date,
              "onUpdate:modelValue": (val) => __props.form.start_date = val,
              onClose: ($event) => showStartDatePicker.value = false,
              class: "relative z-10 shadow-2xl"
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="relative" data-v-c6760812><label class="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500 ml-1 tracking-widest" data-v-c6760812>${ssrInterpolate(_ctx.$t("label_end_date", "End date"))}</label><button type="button" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-700 dark:text-slate-300 font-bold hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all flex items-center justify-between transition-colors duration-500 shadow-sm" data-v-c6760812><span class="truncate" data-v-c6760812>${ssrInterpolate(__props.form.end_date ? dateDisplay(__props.form.end_date) : _ctx.$t("optional", "Optional"))}</span>`);
          if (__props.form.end_date) {
            _push2(`<span class="text-rose-400 hover:text-rose-600 transition-colors z-10 p-1" data-v-c6760812>✕</span>`);
          } else {
            _push2(`<span class="text-slate-400 dark:text-slate-600 opacity-50" data-v-c6760812>📅</span>`);
          }
          _push2(`</button>`);
          if (showEndDatePicker.value) {
            _push2(`<div class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:top-full sm:right-0 sm:mt-3 sm:origin-top-right sm:block sm:inset-auto" data-v-c6760812><div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm sm:hidden" data-v-c6760812></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: true,
              modelValue: __props.form.end_date,
              "onUpdate:modelValue": (val) => __props.form.end_date = val,
              onClose: ($event) => showEndDatePicker.value = false,
              class: "relative z-10 shadow-2xl"
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div data-v-c6760812><label class="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-3 transition-colors duration-500 ml-1 tracking-widest" data-v-c6760812>${ssrInterpolate(_ctx.$t("label_color", "Pick a category color"))}</label><div class="flex flex-wrap gap-4" data-v-c6760812><!--[-->`);
          ssrRenderList(colorOptions, (c) => {
            _push2(`<button type="button" class="${ssrRenderClass([__props.form.color === c.value ? "scale-110" : "border-transparent hover:scale-105 opacity-60 hover:opacity-100", "w-10 h-10 rounded-2xl transition-all border-4 flex items-center justify-center shadow-sm"])}" style="${ssrRenderStyle(__props.form.color === c.value ? `background-color: ${c.value}; border-color: ${c.value}30;` : `background-color: ${c.value};`)}"${ssrRenderAttr("title", _ctx.$t(c.label))} data-v-c6760812>`);
            if (__props.form.color === c.value) {
              _push2(`<svg class="w-4 h-4 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c6760812><path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7" data-v-c6760812></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button>`);
          });
          _push2(`<!--]--></div></div><div data-v-c6760812><label class="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500 ml-1 tracking-widest" data-v-c6760812>${ssrInterpolate(_ctx.$t("label_description", "Notes"))}</label><textarea rows="4" class="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] px-5 py-4 text-slate-700 dark:text-slate-300 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none transition-colors duration-500 shadow-sm"${ssrRenderAttr("placeholder", _ctx.$t("ph_event_desc", "Briefly describe this event..."))} data-v-c6760812>${ssrInterpolate(__props.form.description)}</textarea></div></div><div class="p-8 border-t border-slate-100/80 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex gap-4 transition-colors duration-500" data-v-c6760812><button type="button" class="flex-1 py-4 rounded-2xl font-black text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm" data-v-c6760812>${ssrInterpolate(_ctx.$t("btn_cancel", "Cancel"))}</button><button type="button"${ssrIncludeBooleanAttr(__props.form.processing) ? " disabled" : ""} class="flex-1 py-4 rounded-2xl font-black text-white transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 transition-all duration-500" style="${ssrRenderStyle(`background-color: ${__props.form.color}; box-shadow: ${_ctx.$page.props.isDark ? "none" : "0 15px 25px -5px " + __props.form.color + "50"};`)}" text-white data-v-c6760812>`);
          if (__props.form.processing) {
            _push2(`<span class="animate-spin text-xl leading-none" data-v-c6760812>↻</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<span data-v-c6760812>${ssrInterpolate(__props.form.processing ? _ctx.$t("btn_saving", "Saving...") : _ctx.$t("btn_save", "Save event"))}</span></button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Calendar/CalendarEventModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CalendarEventModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c6760812"]]);
export {
  CalendarEventModal as default
};
