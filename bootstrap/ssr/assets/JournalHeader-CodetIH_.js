import { computed, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { u as useFinanceFormat } from "./useFinanceFormat-CRSb1fg_.js";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "JournalHeader",
  __ssrInlineRender: true,
  props: {
    todayDate: String,
    synergy: Object
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const { formatMoney, appLocale } = useFinanceFormat();
    const todayDisplay = computed(() => {
      const currentLocale = (appLocale == null ? void 0 : appLocale.value) ? appLocale.value.split("-")[0] : page.props.locale || "id";
      return dayjs(props.todayDate).locale(currentLocale).format("dddd, D MMMM YYYY");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-[60] px-4 py-4 transition-all bg-white border-b shadow-sm border-slate-200 sm:px-6 lg:px-8 md:sticky md:top-0" }, _attrs))}><div class="flex flex-col items-center justify-between w-full gap-4 md:flex-row"><div class="flex items-center w-full gap-4 md:w-auto"><div class="flex items-center justify-center text-2xl text-white shadow-lg w-12 h-12 bg-indigo-600 rounded-xl shadow-indigo-200 shrink-0"> 📓 </div><div><h2 class="text-xl font-black leading-tight tracking-tight text-slate-800">${ssrInterpolate(_ctx.$t("journal_title", "My Journal"))}</h2><p class="mt-0.5 text-xs font-medium capitalize text-slate-500">${ssrInterpolate(todayDisplay.value)}</p></div></div><div class="flex items-center w-full gap-3 md:w-auto"><div class="hidden lg:flex items-center gap-5 px-5 border-x border-slate-200 h-10"><div class="flex flex-col justify-center"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">${ssrInterpolate(_ctx.$t("journal_tasks", "Tugas"))}</span><span class="text-sm font-black text-slate-700 leading-none">${ssrInterpolate(__props.synergy.tasks_completed)}/${ssrInterpolate(__props.synergy.tasks_total)}</span></div><div class="flex flex-col justify-center"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">${ssrInterpolate(_ctx.$t("journal_habit", "Habit"))}</span><span class="text-sm font-black text-slate-700 leading-none">${ssrInterpolate(__props.synergy.habits_completed)}</span></div><div class="flex flex-col justify-center"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">${ssrInterpolate(_ctx.$t("journal_expense", "Keluar"))}</span><span class="text-sm font-black text-slate-700 leading-none font-mono">${ssrInterpolate(unref(formatMoney)(__props.synergy.expense_total))}</span></div></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("journal.write"),
        class: "flex items-center justify-center flex-1 h-12 px-6 text-sm font-black text-white transition shadow-lg md:flex-none bg-indigo-600 rounded-2xl hover:bg-indigo-700 shadow-indigo-100 gap-2 active:scale-95 whitespace-nowrap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-xl"${_scopeId}>+</span><span class="tracking-tight md:inline"${_scopeId}>${ssrInterpolate(_ctx.$t("journal_add", "Tambah Jurnal"))}</span>`);
          } else {
            return [
              createVNode("span", { class: "text-xl" }, "+"),
              createVNode("span", { class: "tracking-tight md:inline" }, toDisplayString(_ctx.$t("journal_add", "Tambah Jurnal")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journal/JournalHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
