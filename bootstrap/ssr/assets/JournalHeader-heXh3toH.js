import { computed, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./OneForMindIcon-Dc5dmmrC.js";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-[60] px-4 py-4 transition-all bg-white dark:bg-slate-900 border-b shadow-sm border-slate-200 dark:border-slate-800 sm:px-6 lg:px-8 md:sticky md:top-0" }, _attrs))}><div class="flex flex-col items-center justify-between w-full gap-4 md:flex-row"><div class="flex items-center w-full gap-4 md:w-auto"><div class="flex items-center justify-center text-white shadow-lg w-12 h-12 bg-indigo-600 rounded-xl shadow-indigo-200 dark:shadow-none shrink-0">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "journal",
        size: "28"
      }, null, _parent));
      _push(`</div><div><h2 class="text-xl md:text-2xl font-black leading-tight tracking-tight text-slate-800 dark:text-white transition-colors duration-500">${ssrInterpolate(_ctx.$t("journal_title", "My Journal"))}</h2><p class="mt-0.5 text-sm font-medium capitalize text-slate-500 dark:text-slate-400 transition-colors duration-500">${ssrInterpolate(todayDisplay.value)}</p></div></div><div class="flex items-center w-full gap-3 md:w-auto"><div class="hidden lg:flex items-center gap-5 px-5 border-x border-slate-200 dark:border-slate-800 h-10 transition-colors duration-500"><div class="flex flex-col justify-center"><span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("journal_tasks", "Tugas"))}</span><span class="text-sm font-black text-slate-700 dark:text-slate-300 leading-none transition-colors duration-500">${ssrInterpolate(__props.synergy.tasks_completed)}/${ssrInterpolate(__props.synergy.tasks_total)}</span></div><div class="flex flex-col justify-center"><span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("journal_habit", "Habit"))}</span><span class="text-sm font-black text-slate-700 dark:text-slate-300 leading-none transition-colors duration-500">${ssrInterpolate(__props.synergy.habits_completed)}</span></div><div class="flex flex-col justify-center"><span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("journal_expense", "Keluar"))}</span><span class="text-sm font-black text-slate-700 dark:text-slate-300 leading-none font-mono transition-colors duration-500">${ssrInterpolate(unref(formatMoney)(__props.synergy.expense_total))}</span></div></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("journal.write"),
        class: "flex items-center justify-center flex-1 h-12 px-6 text-sm font-black text-white transition shadow-lg md:flex-none bg-indigo-600 rounded-2xl hover:bg-indigo-700 shadow-indigo-100 dark:shadow-none gap-2 active:scale-95 whitespace-nowrap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "plus",
              size: "18",
              "stroke-width": "3"
            }, null, _parent2, _scopeId));
            _push2(`<span class="tracking-tight md:inline"${_scopeId}>${ssrInterpolate(_ctx.$t("journal_add", "Tambah Jurnal"))}</span>`);
          } else {
            return [
              createVNode(_sfc_main$1, {
                name: "plus",
                size: "18",
                "stroke-width": "3"
              }),
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
