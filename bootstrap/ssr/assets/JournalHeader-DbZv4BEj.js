import { computed, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./OneForMindIcon-BiMr3Mnd.js";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-[60] transition-all bg-white dark:bg-slate-900 border-b shadow-sm border-slate-100 dark:border-slate-800 transition-colors duration-500" }, _attrs))}><div class="flex w-full min-w-0 flex-col items-stretch justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4 md:flex-row md:items-center"><div class="flex items-center gap-2 w-full min-w-0 md:w-auto md:max-w-[min(100%,28rem)]"><p class="shrink-0 text-[10px] font-black capitalize tracking-wide text-slate-400 dark:text-slate-600 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4">${ssrInterpolate(_ctx.$t("journal_title", "My Journal"))}</p><div class="flex min-w-0 flex-1 items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50 overflow-hidden">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "calendar",
        size: "14",
        class: "text-indigo-500 shrink-0"
      }, null, _parent));
      _push(`<span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 capitalize truncate">${ssrInterpolate(todayDisplay.value)}</span></div></div><div class="flex min-w-0 flex-wrap items-center w-full gap-3 md:w-auto md:flex-nowrap md:justify-end"><div class="hidden lg:flex items-center gap-5 px-5 border-x border-slate-200 dark:border-slate-800 h-10 transition-colors duration-500"><div class="flex flex-col justify-center"><span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 leading-none mb-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("journal_tasks", "Tugas"))}</span><span class="text-sm font-black text-slate-700 dark:text-slate-300 leading-none transition-colors duration-500">${ssrInterpolate(__props.synergy.tasks_completed)}/${ssrInterpolate(__props.synergy.tasks_total)}</span></div><div class="flex flex-col justify-center"><span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 leading-none mb-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("journal_habit", "Habit"))}</span><span class="text-sm font-black text-slate-700 dark:text-slate-300 leading-none transition-colors duration-500">${ssrInterpolate(__props.synergy.habits_completed)}</span></div><div class="flex flex-col justify-center"><span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 leading-none mb-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("journal_expense", "Keluar"))}</span><span class="text-sm font-black text-slate-700 dark:text-slate-300 leading-none font-mono transition-colors duration-500">${ssrInterpolate(unref(formatMoney)(__props.synergy.expense_total))}</span></div></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("journal.write"),
        class: "flex min-w-0 items-center justify-center flex-1 h-12 px-6 text-sm font-black text-white transition shadow-lg md:flex-none md:shrink-0 bg-indigo-600 rounded-2xl hover:bg-indigo-700 shadow-indigo-100 dark:shadow-none gap-2 active:scale-95 whitespace-nowrap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "plus",
              size: "18",
              "stroke-width": "3"
            }, null, _parent2, _scopeId));
            _push2(`<span class="tracking-tight md:inline"${_scopeId}>${ssrInterpolate(_ctx.$t("journal_add", "Tambah jurnal"))}</span>`);
          } else {
            return [
              createVNode(_sfc_main$1, {
                name: "plus",
                size: "18",
                "stroke-width": "3"
              }),
              createVNode("span", { class: "tracking-tight md:inline" }, toDisplayString(_ctx.$t("journal_add", "Tambah jurnal")), 1)
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
