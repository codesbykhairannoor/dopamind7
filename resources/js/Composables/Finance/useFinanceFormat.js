// resources/js/Composables/Finance/useFinanceFormat.js

export function useFinanceFormat() {
    
    // Format: Rp 150.000
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    // LOCAL STORAGE: custom categories map (slug -> { name, icon })
    const CUSTOM_KEY = 'finance_custom_categories_v1';

    const readCustomCategories = () => {
        try {
            const raw = localStorage.getItem(CUSTOM_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    };

    const writeCustomCategory = (slug, payload) => {
        try {
            const map = readCustomCategories();
            map[slug] = payload;
            localStorage.setItem(CUSTOM_KEY, JSON.stringify(map));
        } catch (e) {
            // ignore
        }
    };

    const getCustomCategories = () => readCustomCategories();

    // Helper buat icon/warna kategori
    const getCategoryDetails = (category) => {
        const defaults = {
            food: { icon: '🍔', color: 'text-orange-500', bg: 'bg-orange-50', name: 'food' },
            transport: { icon: '🛵', color: 'text-blue-500', bg: 'bg-blue-50', name: 'transport' },
            bills: { icon: '⚡', color: 'text-yellow-500', bg: 'bg-yellow-50', name: 'bills' },
            shopping: { icon: '🛍️', color: 'text-pink-500', bg: 'bg-pink-50', name: 'shopping' },
            income: { icon: '💰', color: 'text-emerald-500', bg: 'bg-emerald-50', name: 'income' },
            others: { icon: '📦', color: 'text-slate-500', bg: 'bg-slate-50', name: 'others' },
        };

        // Prioritaskan custom categories dari localStorage
        const custom = readCustomCategories();
        if (custom && custom[category]) {
            return { icon: custom[category].icon || '📦', color: 'text-slate-600', bg: 'bg-slate-50', name: custom[category].name || category };
        }

        return defaults[category] || defaults['others'];
    };

    const addCustomCategory = (slug, name, icon) => {
        writeCustomCategory(slug, { name: name || slug, icon: icon || '📦' });
    };

    return {
        formatRupiah,
        getCategoryDetails,
        addCustomCategory,
        getCustomCategories
    };
}