import { ref, computed } from 'vue';
import dayjs from 'dayjs';
// Import composable format tadi
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

// Wajib import locale dayjs
import 'dayjs/locale/id';
import 'dayjs/locale/en'; 

export function useFinanceHistory(props) {
    // Ambil appLocale yang reaktif
    const { appLocale } = useFinanceFormat();
    
    const isArchiveOpen = ref(false);
    const selectedDayData = ref(null);
    const filterDate = ref('');

    const visibleStats = computed(() => {
        const groups = {};
        const data = props.transactions || [];
        
        // 1. Ambil value dari computed reactive
        let currentLang = appLocale.value;
        
        // 2. Bersihkan format (id-ID -> id)
        const dayjsLang = currentLang.includes('-') ? currentLang.split('-')[0] : currentLang;
        
        data.forEach(trx => {
            const dateKey = dayjs(trx.date).format('YYYY-MM-DD');
            
            if (!groups[dateKey]) {
                groups[dateKey] = {
                    date: dateKey,
                    // 3. Set locale ke dayjs (Otomatis update krn appLocale berubah)
                    dateObj: dayjs(trx.date).locale(dayjsLang),
                    transactions: [],
                    total_income: 0,
                    total_expense: 0
                };
            }
            
            groups[dateKey].transactions.push(trx);
            
            if (trx.type === 'income') {
                groups[dateKey].total_income += Number(trx.amount);
            } else {
                groups[dateKey].total_expense += Number(trx.amount);
            }
        });

        const sorted = Object.values(groups).sort((a, b) => b.dateObj - a.dateObj);

        if (filterDate.value) {
            return sorted.filter(day => day.date === filterDate.value);
        }
        return sorted.slice(0, 5); 
    });

    const openDetail = (dayData) => {
        selectedDayData.value = dayData;
        isArchiveOpen.value = true;
    };

    return {
        filterDate,
        visibleStats, 
        isArchiveOpen,
        selectedDayData,
        openDetail
    };
}