import { ssrRenderTeleport, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { ref, useSSRContext } from "vue";
import _sfc_main$1 from "./FinanceDatePicker-CxOhCf2w.js";
import dayjs from "dayjs";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
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
    const dateDisplay = (dateString, fallback = "Pilih Tanggal") => {
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
        var _a;
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div><div class="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl dark:shadow-none w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-white/50 dark:ring-slate-800 transition-colors duration-500"><div class="px-6 py-5 border-b border-slate-100/80 dark:border-slate-800 flex items-center justify-between transition-colors duration-500"><h3 class="text-lg font-black text-slate-800 dark:text-white flex items-center gap-3 transition-colors duration-500"><span class="w-3 h-3 rounded-full shadow-inner" style="${ssrRenderStyle(`background-color: ${__props.form.color}`)}"></span> ${ssrInterpolate(__props.form.id ? _ctx.$t("calendar_edit_event", "Edit Acara") : _ctx.$t("calendar_new_event", "Acara Baru"))}</h3><button class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6 overflow-y-auto custom-scrollbar space-y-5"><div><label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500">${ssrInterpolate(_ctx.$t("label_title", "Judul Acara"))} <span class="text-rose-500">*</span></label><input${ssrRenderAttr("value", __props.form.title)} type="text" class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-800 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-colors duration-500"${ssrRenderAttr("placeholder", _ctx.$t("ph_event_title", "Cth: Rapat BEM"))} required autofocus></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="relative"><label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500">${ssrInterpolate(_ctx.$t("label_start_date", "Mulai"))}</label><button type="button" class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 font-bold hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all flex items-center justify-between transition-colors duration-500"><span class="truncate">${ssrInterpolate(dateDisplay(__props.form.start_date, _ctx.$t("select_date", "Pilih Tanggal")))}</span><span class="text-slate-400 dark:text-slate-500">📅</span></button>`);
          if (showStartDatePicker.value) {
            _push2(`<div class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:top-full sm:left-0 sm:mt-2 sm:origin-top-left sm:block sm:inset-auto"><div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm sm:hidden"></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: true,
              modelValue: __props.form.start_date,
              "onUpdate:modelValue": (val) => __props.form.start_date = val,
              onClose: ($event) => showStartDatePicker.value = false,
              class: "relative z-10"
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="relative"><label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500">${ssrInterpolate(_ctx.$t("label_end_date", "Selesai (Opsional)"))}</label><button type="button" class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 font-bold hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all flex items-center justify-between transition-colors duration-500"><span class="truncate">${ssrInterpolate(__props.form.end_date ? dateDisplay(__props.form.end_date) : _ctx.$t("optional", "Opsional"))}</span>`);
          if (__props.form.end_date) {
            _push2(`<span class="text-rose-400 hover:text-rose-600 transition-colors z-10 p-1">✕</span>`);
          } else {
            _push2(`<span class="text-slate-400 dark:text-slate-500">📅</span>`);
          }
          _push2(`</button>`);
          if (showEndDatePicker.value) {
            _push2(`<div class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:top-full sm:right-0 sm:mt-2 sm:origin-top-right sm:block sm:inset-auto"><div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm sm:hidden"></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: true,
              modelValue: __props.form.end_date,
              "onUpdate:modelValue": (val) => __props.form.end_date = val,
              onClose: ($event) => showEndDatePicker.value = false,
              class: "relative z-10"
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div><label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500">${ssrInterpolate(_ctx.$t("label_color", "Warna Label"))} <span class="text-slate-400 dark:text-slate-500 ml-1">(${ssrInterpolate(_ctx.$t(((_a = colorOptions.find((c) => c.value === __props.form.color)) == null ? void 0 : _a.label) || "color_indigo"))})</span></label><div class="flex flex-wrap gap-3"><!--[-->`);
          ssrRenderList(colorOptions, (c) => {
            _push2(`<button type="button" class="${ssrRenderClass([__props.form.color === c.value ? "scale-125 shadow-md dark:shadow-none" : "border-transparent hover:scale-110", "w-8 h-8 rounded-full transition-all border-[3px] flex items-center justify-center transform active:scale-95"])}" style="${ssrRenderStyle(__props.form.color === c.value ? `background-color: ${c.value}; border-color: ${c.value}40;` : `background-color: ${c.value};`)}"${ssrRenderAttr("title", _ctx.$t(c.label))}>`);
            if (__props.form.color === c.value) {
              _push2(`<svg class="w-3.5 h-3.5 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button>`);
          });
          _push2(`<!--]--></div></div><div><label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500">${ssrInterpolate(_ctx.$t("label_description", "Catatan Tambahan"))}</label><textarea rows="3" class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 font-medium focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 resize-none transition-colors duration-500"${ssrRenderAttr("placeholder", _ctx.$t("ph_event_desc", "Tulis detail acara di sini..."))}>${ssrInterpolate(__props.form.description)}</textarea></div></div><div class="p-5 border-t border-slate-100/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex gap-3 transition-colors duration-500"><button type="button" class="flex-1 py-3.5 rounded-xl font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95 transition-colors duration-500">${ssrInterpolate(_ctx.$t("btn_cancel", "Batal"))}</button><button type="button"${ssrIncludeBooleanAttr(__props.form.processing) ? " disabled" : ""} class="flex-1 py-3.5 rounded-xl font-black text-white transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 transition-all duration-300" style="${ssrRenderStyle(`background-color: ${__props.form.color}; box-shadow: ${_ctx.$page.props.isDark ? "none" : "0 10px 15px -3px " + __props.form.color + "50"};`)}">`);
          if (__props.form.processing) {
            _push2(`<span class="animate-spin text-lg leading-none">↻</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<span>${ssrInterpolate(__props.form.processing ? _ctx.$t("btn_saving", "Menyimpan...") : _ctx.$t("btn_save", "Simpan Acara"))}</span></button></div></div></div>`);
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
export {
  _sfc_main as default
};
