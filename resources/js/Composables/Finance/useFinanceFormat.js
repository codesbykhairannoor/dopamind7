import { ref } from 'vue';

// State global
const activeCurrency = ref(localStorage.getItem('finance_currency') || 'IDR');
const activeLocale = ref(localStorage.getItem('finance_locale') || 'id-ID');

export function useFinanceFormat() {
    
    const supportedCurrencies = [
        { code: 'IDR', locale: 'id-ID', label: 'Rupiah (Rp)', icon: '🇮🇩' },
        { code: 'USD', locale: 'en-US', label: 'Dollar ($)', icon: '🇺🇸' },
        { code: 'GBP', locale: 'en-GB', label: 'Pound (£)', icon: '🇬🇧' },
        { code: 'EUR', locale: 'de-DE', label: 'Euro (€)', icon: '🇪🇺' },
        { code: 'JPY', locale: 'ja-JP', label: 'Yen (¥)', icon: '🇯🇵' },
    ];

    const setCurrency = (code) => {
        const target = supportedCurrencies.find(c => c.code === code);
        if (target) {
            activeCurrency.value = target.code;
            activeLocale.value = target.locale;
            localStorage.setItem('finance_currency', target.code);
            localStorage.setItem('finance_locale', target.locale);
            window.location.reload(); 
        }
    };

    const formatMoney = (number) => {
        return new Intl.NumberFormat(activeLocale.value, {
            style: 'currency', 
            currency: activeCurrency.value, 
            minimumFractionDigits: 0, 
            maximumFractionDigits: 0
        }).format(number);
    };

    // --- ALIAS (PENTING BIAR GAK WHITE SCREEN) ---
    // Komponen lama (TransactionList dll) masih manggil formatRupiah
    const formatRupiah = formatMoney; 

    const cleanAmount = (value) => {
        if (!value) return 0;
        const str = value.toString();
        if (['IDR', 'EUR', 'de-DE'].includes(activeCurrency.value)) {
            return str.replace(/\./g, '');
        } 
        return str.replace(/,/g, '');
    };

    const formatInputDisplay = (value) => {
        if (!value) return '';
        const raw = value.toString().replace(/\D/g, ''); 
        return new Intl.NumberFormat(activeLocale.value).format(raw);
    };

    const getCategoryDetails = (slug, categories = []) => {
        if (!slug) return { name: '', icon: '❓' };
        const found = categories.find(c => c.slug === slug);
        if (found) { return { name: found.name, icon: found.icon }; }
        const name = slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return { name: name, icon: '📦' };
    };

    return {
        activeCurrency,
        supportedCurrencies,
        setCurrency,
        formatMoney,
        formatRupiah, // Export alias ini
        cleanAmount,
        formatInputDisplay,
        getCategoryDetails
    };
}