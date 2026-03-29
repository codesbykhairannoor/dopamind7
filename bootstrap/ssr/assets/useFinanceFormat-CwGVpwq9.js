import { computed, ref } from "vue";
import { usePage } from "@inertiajs/vue3";
import { getActiveLanguage } from "laravel-vue-i18n";
const isBrowser = typeof window !== "undefined";
const activeCurrency = ref(isBrowser ? localStorage.getItem("finance_currency") || "IDR" : "IDR");
const currencyLocale = ref(isBrowser ? localStorage.getItem("finance_locale") || "id-ID" : "id-ID");
function useFinanceFormat() {
  var _a;
  const page = usePage();
  const user = computed(() => {
    var _a2, _b;
    return (_b = (_a2 = page == null ? void 0 : page.props) == null ? void 0 : _a2.auth) == null ? void 0 : _b.user;
  });
  if (((_a = user.value) == null ? void 0 : _a.currency) && isBrowser && activeCurrency.value !== user.value.currency) {
    const target = [
      { code: "IDR", locale: "id-ID" },
      { code: "USD", locale: "en-US" },
      { code: "GBP", locale: "en-GB" },
      { code: "EUR", locale: "de-DE" },
      { code: "JPY", locale: "ja-JP" }
    ].find((c) => c.code === user.value.currency);
    if (target) {
      activeCurrency.value = target.code;
      currencyLocale.value = target.locale;
    }
  }
  const appLocale = computed(() => {
    var _a2;
    return ((_a2 = page == null ? void 0 : page.props) == null ? void 0 : _a2.locale) || getActiveLanguage() || "id";
  });
  const supportedCurrencies = [
    { code: "IDR", locale: "id-ID", label: "Rupiah (Rp)", icon: "🇮🇩" },
    { code: "USD", locale: "en-US", label: "Dollar ($)", icon: "🇺🇸" },
    { code: "GBP", locale: "en-GB", label: "Pound (£)", icon: "🇬🇧" },
    { code: "EUR", locale: "de-DE", label: "Euro (€)", icon: "🇪🇺" },
    { code: "JPY", locale: "ja-JP", label: "Yen (¥)", icon: "🇯🇵" }
  ];
  const needsDecimal = computed(() => ["USD", "GBP", "EUR"].includes(activeCurrency.value));
  const setCurrency = (code) => {
    const target = supportedCurrencies.find((c) => c.code === code);
    if (target) {
      activeCurrency.value = target.code;
      currencyLocale.value = target.locale;
      if (isBrowser) {
        localStorage.setItem("finance_currency", target.code);
        localStorage.setItem("finance_locale", target.locale);
      }
    }
  };
  const formatInputDisplay = (val) => {
    if (!val && val !== 0) return "";
    const str = val.toString();
    if (["IDR", "EUR", "de-DE"].includes(activeCurrency.value)) {
      return str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };
  const formatMoney = (number) => {
    return new Intl.NumberFormat(currencyLocale.value, {
      style: "currency",
      currency: activeCurrency.value,
      minimumFractionDigits: needsDecimal.value ? 2 : 0,
      maximumFractionDigits: needsDecimal.value ? 2 : 0
    }).format(number);
  };
  const cleanAmount = (value) => {
    if (!value) return 0;
    let str = value.toString();
    if (["USD", "GBP"].includes(activeCurrency.value)) {
      str = str.replace(/,/g, "");
    } else if (["IDR", "EUR", "de-DE"].includes(activeCurrency.value)) {
      str = str.replace(/\./g, "").replace(/,/g, ".");
    }
    return parseFloat(str) || 0;
  };
  const getCategoryDetails = (slug, categories = []) => {
    if (!slug) return { name: "", icon: "❓" };
    const found = categories.find((c) => c.slug === slug);
    if (found) {
      return { name: found.name, icon: found.icon };
    }
    const name = slug.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    return { name, icon: "📦" };
  };
  return {
    activeCurrency,
    appLocale,
    supportedCurrencies,
    setCurrency,
    formatMoney,
    cleanAmount,
    formatInputDisplay,
    getCategoryDetails
  };
}
export {
  useFinanceFormat as u
};
