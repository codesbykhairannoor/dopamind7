import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { getActiveLanguage } from 'laravel-vue-i18n';

// Helper untuk cek apakah kita sedang di browser atau di server (SSR)
const isBrowser = typeof window !== 'undefined';

// State global dengan proteksi SSR
// Jika di server, kita kasih nilai default dulu
const activeCurrency = ref(isBrowser ? (localStorage.getItem('finance_currency') || 'IDR') : 'IDR');
const currencyLocale = ref(isBrowser ? (localStorage.getItem('finance_locale') || 'id-ID') : 'id-ID');

export function useFinanceFormat() {
    const page = usePage();
    const user = computed(() => page?.props?.auth?.user);
    
    // 🔥 SYNC DENGAN DATABASE (User Settings)
    if (user.value?.currency && isBrowser && activeCurrency.value !== user.value.currency) {
        const target = [
            { code: 'IDR', locale: 'id-ID' },
            { code: 'USD', locale: 'en-US' },
            { code: 'GBP', locale: 'en-GB' },
            { code: 'EUR', locale: 'de-DE' },
            { code: 'JPY', locale: 'ja-JP' },
        ].find(c => c.code === user.value.currency);
        
        if (target) {
            activeCurrency.value = target.code;
            currencyLocale.value = target.locale;
        }
    }

    const appLocale = computed(() => {
        return page?.props?.locale || getActiveLanguage() || 'id';
    });

    const supportedCurrencies = [
        { code: 'IDR', locale: 'id-ID', label: 'Rupiah (Rp)', icon: '🇮🇩' },
        { code: 'USD', locale: 'en-US', label: 'Dollar ($)', icon: '🇺🇸' },
        { code: 'GBP', locale: 'en-GB', label: 'Pound (£)', icon: '🇬🇧' },
        { code: 'EUR', locale: 'de-DE', label: 'Euro (€)', icon: '🇪🇺' },
        { code: 'JPY', locale: 'ja-JP', label: 'Yen (¥)', icon: '🇯🇵' },
    ];

    const needsDecimal = computed(() => ['USD', 'GBP', 'EUR'].includes(activeCurrency.value));

    const setCurrency = (code) => {
        const target = supportedCurrencies.find(c => c.code === code);
        if (target) {
            activeCurrency.value = target.code;
            currencyLocale.value = target.locale;
            
            // Cek browser sebelum nulis ke localStorage
            if (isBrowser) {
                localStorage.setItem('finance_currency', target.code);
                localStorage.setItem('finance_locale', target.locale);
            }
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
            minimumFractionDigits: needsDecimal.value ? 2 : 0, 
            maximumFractionDigits: needsDecimal.value ? 2 : 0
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
        appLocale, 
        supportedCurrencies,
        setCurrency,
        formatMoney,
        cleanAmount,
        formatInputDisplay,
        getCategoryDetails
    };
}