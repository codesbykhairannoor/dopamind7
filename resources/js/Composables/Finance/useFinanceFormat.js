import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { getActiveLanguage } from 'laravel-vue-i18n';

// State global untuk MATA UANG (Bukan Bahasa Aplikasi)
const activeCurrency = ref(localStorage.getItem('finance_currency') || 'IDR');
const currencyLocale = ref(localStorage.getItem('finance_locale') || 'id-ID');

export function useFinanceFormat() {
    
    // 🔥 FIX UTAMA: Gunakan usePage() untuk mendeteksi bahasa aplikasi secara Reaktif
    const appLocale = computed(() => {
        const page = usePage();
        // Cek props locale dari Inertia, atau fallback ke library, atau default 'id'
        return page.props.locale || getActiveLanguage() || 'id';
    });

    const supportedCurrencies = [
        { code: 'IDR', locale: 'id-ID', label: 'Rupiah (Rp)', icon: '🇮🇩' },
        { code: 'USD', locale: 'en-US', label: 'Dollar ($)', icon: '🇺🇸' },
        { code: 'GBP', locale: 'en-GB', label: 'Pound (£)', icon: '🇬🇧' },
        { code: 'EUR', locale: 'de-DE', label: 'Euro (€)', icon: '🇪🇺' },
        { code: 'JPY', locale: 'ja-JP', label: 'Yen (¥)', icon: '🇯🇵' },
    ];

    const needsDecimal = ['USD', 'GBP', 'EUR'].includes(activeCurrency.value);

    const setCurrency = (code) => {
        const target = supportedCurrencies.find(c => c.code === code);
        if (target) {
            activeCurrency.value = target.code;
            currencyLocale.value = target.locale;
            localStorage.setItem('finance_currency', target.code);
            localStorage.setItem('finance_locale', target.locale);
            // window.location.reload(); 
        }
    };

    const formatInputDisplay = (val) => {
        if (!val && val !== 0) return '';
        const str = val.toString();
        // Cek apakah mata uang pakai Titik atau Koma sebagai pemisah ribuan
        if (['IDR', 'EUR', 'de-DE'].includes(activeCurrency.value)) {
            // Indo/Jerman: Pake Titik (1.000.000)
            return str.replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
        } else {
            // US/Inggris: Pake Koma (1,000,000)
            return str.replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
        }
    };

    const formatMoney = (number) => {
        return new Intl.NumberFormat(currencyLocale.value, {
            style: 'currency', 
            currency: activeCurrency.value, 
            minimumFractionDigits: needsDecimal ? 2 : 0, 
            maximumFractionDigits: needsDecimal ? 2 : 0
        }).format(number);
    };

    const cleanAmount = (value) => {
        if (!value) return 0;
        let str = value.toString();
        if (['USD', 'GBP'].includes(activeCurrency.value)) {
            str = str.replace(/,/g, ''); 
        } else if (['IDR', 'EUR', 'de-DE'].includes(activeCurrency.value)) {
            str = str.replace(/\./g, '').replace(/,/g, '.');
        }
        return parseFloat(str) || 0;
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
        appLocale, // Export Reactive Locale
        supportedCurrencies,
        setCurrency,
        formatMoney,
        cleanAmount,
        formatInputDisplay,
        getCategoryDetails
    };
}