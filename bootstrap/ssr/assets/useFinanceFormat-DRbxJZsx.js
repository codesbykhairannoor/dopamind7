import { computed, ref } from "vue";
import { usePage } from "@inertiajs/vue3";
import { getActiveLanguage } from "laravel-vue-i18n";
const activeCurrency = ref(localStorage.getItem("finance_currency") || "IDR");
const currencyLocale = ref(localStorage.getItem("finance_locale") || "id-ID");
function useFinanceFormat() {
  const appLocale = computed(() => {
    const page = usePage();
    return page.props.locale || getActiveLanguage() || "id";
  });
  const supportedCurrencies = [
    { code: "IDR", locale: "id-ID", label: "Rupiah (Rp)", icon: "🇮🇩" },
    { code: "USD", locale: "en-US", label: "Dollar ($)", icon: "🇺🇸" },
    { code: "GBP", locale: "en-GB", label: "Pound (£)", icon: "🇬🇧" },
    { code: "EUR", locale: "de-DE", label: "Euro (€)", icon: "🇪🇺" },
    { code: "JPY", locale: "ja-JP", label: "Yen (¥)", icon: "🇯🇵" }
  ];
  const needsDecimal = ["USD", "GBP", "EUR"].includes(activeCurrency.value);
  const setCurrency = (code) => {
    const target = supportedCurrencies.find((c) => c.code === code);
    if (target) {
      activeCurrency.value = target.code;
      currencyLocale.value = target.locale;
      localStorage.setItem("finance_currency", target.code);
      localStorage.setItem("finance_locale", target.locale);
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
      minimumFractionDigits: needsDecimal ? 2 : 0,
      maximumFractionDigits: needsDecimal ? 2 : 0
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
    // Export Reactive Locale
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
