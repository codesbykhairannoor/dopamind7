import { ssrRenderTeleport, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { ref, computed, watch, useSSRContext } from "vue";
import { u as useFinanceFormat } from "./useFinanceFormat-CRSb1fg_.js";
import "@inertiajs/vue3";
import "laravel-vue-i18n";
const _sfc_main = {
  __name: "BudgetModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    form: Object,
    categories: Array,
    close: Function,
    submit: Function
  },
  setup(__props) {
    const props = __props;
    const { activeCurrency } = useFinanceFormat();
    const showIconGrid = ref(false);
    const iconPalette = ["🍔", "🛵", "⚡", "🛍️", "🏠", "💊", "📚", "🎮", "🍿", "✈️", "🐶", "🔧", "💄", "⚽", "💻", "🎁", "💸", "⛽", "👗"];
    const isDotSeparator = computed(() => ["IDR", "EUR", "de-DE"].includes(activeCurrency.value));
    const currencySymbol = computed(() => {
      const map = { IDR: "Rp", USD: "$", GBP: "£", EUR: "€", JPY: "¥" };
      return map[activeCurrency.value] || activeCurrency.value;
    });
    const formatDisplay = (val) => {
      if (!val) return "";
      const str = val.toString();
      return isDotSeparator.value ? str.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    watch(() => props.show, (isOpen) => {
      if (isOpen) {
        showIconGrid.value = false;
        if (props.form.id && props.form.category) {
          const existing = props.categories.find((c) => c.slug === props.form.category);
          if (existing) {
            props.form.name = existing.name;
            props.form.icon = existing.icon;
          }
        } else if (!props.form.id) {
          props.form.reset();
          props.form.icon = "💸";
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"><div class="absolute inset-0 bg-slate-900/30 backdrop-blur-md transition-opacity"></div><div class="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl z-10 p-6 animate-in zoom-in-95 duration-200"><h3 class="text-xl font-black text-slate-800 mb-6">${ssrInterpolate(__props.form.id ? "✏️ " + _ctx.$t("edit_budget") : "🎯 " + _ctx.$t("new_budget"))}</h3><form class="space-y-5"><div><label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">${ssrInterpolate(_ctx.$t("category_name"))}</label><div class="flex gap-2"><div class="relative"><button type="button" class="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-xl text-2xl border border-slate-100 hover:bg-slate-100 transition">${ssrInterpolate(__props.form.icon)}</button>`);
          if (showIconGrid.value) {
            _push2(`<div class="absolute top-14 left-0 w-64 p-3 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 grid grid-cols-6 gap-2 animate-in fade-in zoom-in-95 duration-100"><!--[-->`);
            ssrRenderList(iconPalette, (icon) => {
              _push2(`<button type="button" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-indigo-50 text-lg transition">${ssrInterpolate(icon)}</button>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showIconGrid.value) {
            _push2(`<div class="fixed inset-0 z-40"></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><input${ssrRenderAttr("value", __props.form.name)} type="text"${ssrRenderAttr("placeholder", _ctx.$t("placeholder_name"))} class="flex-1 px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"></div>`);
          if (__props.form.id) {
            _push2(`<p class="text-[10px] text-slate-400 mt-1 italic">*${ssrInterpolate(_ctx.$t("budget_warning"))}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div><label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">${ssrInterpolate(_ctx.$t("budget_limit"))}</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">${ssrInterpolate(currencySymbol.value)}</span><input type="text"${ssrRenderAttr("value", formatDisplay(__props.form.limit_amount))} placeholder="0" class="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-black text-lg text-slate-700"></div></div><div class="flex gap-3 pt-2"><button type="button" class="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition">${ssrInterpolate(_ctx.$t("cancel"))}</button><button type="submit" class="flex-[2] py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-all">${ssrInterpolate(_ctx.$t("save"))}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finance/BudgetModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
