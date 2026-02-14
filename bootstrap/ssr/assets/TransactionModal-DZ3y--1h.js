import { ssrRenderTeleport, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from "vue/server-renderer";
import { ref, computed, watch, useSSRContext } from "vue";
import dayjs from "dayjs";
import { u as useFinanceFormat } from "./useFinanceFormat-DRbxJZsx.js";
import _sfc_main$1 from "./FinanceDatePicker-Br0HfQLf.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
import "dayjs/plugin/localeData.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
const _sfc_main = {
  __name: "TransactionModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    form: Object,
    budgets: Array,
    categories: Array,
    close: Function,
    submit: Function
  },
  setup(__props) {
    const props = __props;
    const { activeCurrency, getCategoryDetails, appLocale } = useFinanceFormat();
    const showDatePicker = ref(false);
    const availableCategories = computed(() => {
      if (props.form.type === "income") {
        return props.categories.filter((c) => c.type === "income").map((c) => c.slug);
      } else {
        const budgetSlugs = props.budgets.map((b) => b.category);
        return budgetSlugs;
      }
    });
    const getDetail = (slug) => getCategoryDetails(slug, props.categories);
    watch(() => props.form.type, () => {
      props.form.category = "";
    });
    const isDotSeparator = computed(() => ["IDR", "EUR", "de-DE"].includes(activeCurrency.value));
    const currencySymbol = computed(() => {
      const map = { IDR: "Rp", USD: "$", GBP: "£", EUR: "€", JPY: "¥" };
      return map[activeCurrency.value] || activeCurrency.value;
    });
    const dateDisplay = computed(() => {
      if (!props.form.date) return "";
      const loc = appLocale.value ? appLocale.value.split("-")[0] : "id";
      return dayjs(props.form.date).locale(loc).format("dddd, DD MMMM YYYY");
    });
    const formatDisplay = (val) => {
      if (!val) return "";
      const str = val.toString();
      if (isDotSeparator.value) {
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } else {
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4"><div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div><div class="bg-white w-full max-w-md rounded-[2rem] shadow-2xl z-10 p-6 animate-in zoom-in-95 duration-200 border border-slate-100 relative overflow-visible"><div class="flex justify-between items-center mb-6"><h3 class="text-xl font-black text-slate-800">✨ ${ssrInterpolate(_ctx.$t("record_transaction"))}</h3><button class="bg-slate-50 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">✕</button></div><form class="space-y-5"><div class="flex bg-slate-100 p-1.5 rounded-2xl"><button type="button" class="${ssrRenderClass([props.form.type === "expense" ? "bg-white text-rose-600 shadow-sm" : "text-slate-400 hover:text-slate-600", "flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"])}"> 💸 ${ssrInterpolate(_ctx.$t("expense"))}</button><button type="button" class="${ssrRenderClass([props.form.type === "income" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600", "flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"])}"> 💰 ${ssrInterpolate(_ctx.$t("income"))}</button></div><div><label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">${ssrInterpolate(_ctx.$t("description"))}</label><input${ssrRenderAttr("value", __props.form.title)} type="text"${ssrRenderAttr("placeholder", _ctx.$t("desc_placeholder"))} class="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 placeholder:text-slate-300 transition-all"></div><div><label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">${ssrInterpolate(_ctx.$t("amount"))} (${ssrInterpolate(currencySymbol.value)})</label><div class="relative group"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">${ssrInterpolate(currencySymbol.value)}</span><input type="text"${ssrRenderAttr("value", formatDisplay(__props.form.amount))} placeholder="0" class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-black text-lg text-slate-700 placeholder:text-slate-300 transition-all"></div></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">${ssrInterpolate(_ctx.$t("category"))}</label><div class="relative"><select class="w-full pl-4 pr-8 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 capitalize text-sm appearance-none cursor-pointer hover:bg-slate-50"><option value="" disabled selected>${ssrInterpolate(_ctx.$t("select_placeholder"))}</option><!--[-->`);
          ssrRenderList(availableCategories.value, (catSlug) => {
            _push2(`<option${ssrRenderAttr("value", catSlug)}${ssrIncludeBooleanAttr(Array.isArray(__props.form.category) ? ssrLooseContain(__props.form.category, catSlug) : ssrLooseEqual(__props.form.category, catSlug)) ? " selected" : ""}>${ssrInterpolate(getDetail(catSlug).icon)} ${ssrInterpolate(getDetail(catSlug).name)}</option>`);
          });
          _push2(`<!--]--></select><div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div></div>`);
          if (__props.form.type === "expense" && availableCategories.value.length === 0) {
            _push2(`<p class="text-[9px] text-rose-500 mt-1">${ssrInterpolate(_ctx.$t("create_budget_first"))}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="relative"><label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">${ssrInterpolate(_ctx.$t("date"))}</label><button type="button" class="${ssrRenderClass([showDatePicker.value ? "ring-2 ring-indigo-500 bg-white" : "", "w-full px-4 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-left font-bold text-slate-700 text-sm transition-all flex items-center justify-between"])}"><span class="truncate">${ssrInterpolate(dateDisplay.value)}</span><span class="text-slate-400 text-xs">📅</span></button>`);
          if (showDatePicker.value) {
            _push2(`<div class="absolute bottom-full right-0 mb-2 z-50 shadow-2xl rounded-3xl origin-bottom-right">`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: true,
              modelValue: __props.form.date,
              "onUpdate:modelValue": (val) => __props.form.date = val,
              onClose: ($event) => showDatePicker.value = false
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="flex gap-3 pt-4"><button type="button" class="flex-1 py-3.5 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition">${ssrInterpolate(_ctx.$t("btn_cancel"))}</button><button type="submit" class="${ssrRenderClass([__props.form.type === "expense" ? "bg-rose-500 hover:bg-rose-600 shadow-rose-200" : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200", "flex-[2] py-3.5 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all flex justify-center items-center gap-2"])}">${ssrInterpolate(_ctx.$t("btn_save"))}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/TransactionModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
