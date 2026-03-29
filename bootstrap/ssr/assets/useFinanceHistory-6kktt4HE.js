import { ref, computed } from "vue";
import dayjs from "dayjs";
import { u as useFinanceFormat } from "./useFinanceFormat-CwGVpwq9.js";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
function useFinanceHistory(props) {
  const { appLocale } = useFinanceFormat();
  const isArchiveOpen = ref(false);
  ref(false);
  const selectedDayData = ref(null);
  const filterDate = ref("");
  const groupTransactions = (data, locale) => {
    const groups = {};
    const dayjsLang = locale.includes("-") ? locale.split("-")[0] : locale;
    data.forEach((trx) => {
      const dateKey = dayjs(trx.date).format("YYYY-MM-DD");
      if (!groups[dateKey]) {
        groups[dateKey] = {
          date: dateKey,
          dateObj: dayjs(trx.date).locale(dayjsLang),
          transactions: [],
          total_income: 0,
          total_expense: 0
        };
      }
      groups[dateKey].transactions.push(trx);
      if (trx.type === "income") groups[dateKey].total_income += Number(trx.amount);
      else groups[dateKey].total_expense += Number(trx.amount);
    });
    return Object.values(groups).sort((a, b) => b.dateObj - a.dateObj);
  };
  const visibleStats = computed(() => {
    const sorted = groupTransactions(props.transactions || [], appLocale.value);
    if (filterDate.value) {
      return sorted.filter((day) => day.date === filterDate.value);
    }
    return sorted.slice(0, 5);
  });
  const allStats = computed(() => groupTransactions(props.transactions || [], appLocale.value));
  const openDetail = (dayData) => {
    selectedDayData.value = dayData;
    isArchiveOpen.value = true;
  };
  return {
    filterDate,
    visibleStats,
    allStats,
    isArchiveOpen,
    selectedDayData,
    openDetail
  };
}
export {
  useFinanceHistory as u
};
