export function useFinanceFormat() {
    
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
        }).format(number);
    };

    const CUSTOM_KEY = 'finance_custom_categories_v1';

    const readCustomCategories = () => {
        try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) || '{}'); } catch (e) { return {}; }
    };

    const getCustomCategories = () => readCustomCategories();

    // 🔥 BARU: Hapus Kategori Custom
    const deleteCustomCategory = (slug) => {
        try {
            const map = readCustomCategories();
            if (map[slug]) {
                delete map[slug];
                localStorage.setItem(CUSTOM_KEY, JSON.stringify(map));
                return true;
            }
        } catch (e) { return false; }
    };

    // 🔥 BARU: Cek apakah ini kategori custom?
    const isCustomCategory = (slug) => {
        const custom = readCustomCategories();
        return !!custom[slug];
    };

    const writeCustomCategory = (slug, payload) => {
        try {
            const map = readCustomCategories();
            map[slug] = payload;
            localStorage.setItem(CUSTOM_KEY, JSON.stringify(map));
        } catch (e) { /* ignore */ }
    };

    const getCategoryDetails = (category) => {
        const defaults = {
            // Pengeluaran
            food: { icon: '🍔', color: 'text-orange-500', bg: 'bg-orange-50', name: 'Makan' },
            transport: { icon: '🛵', color: 'text-blue-500', bg: 'bg-blue-50', name: 'Transport' },
            bills: { icon: '⚡', color: 'text-yellow-500', bg: 'bg-yellow-50', name: 'Tagihan' },
            shopping: { icon: '🛍️', color: 'text-pink-500', bg: 'bg-pink-50', name: 'Belanja' },
            others: { icon: '📦', color: 'text-slate-500', bg: 'bg-slate-50', name: 'Lainnya' },
            // Pemasukan
            salary: { icon: '🏢', color: 'text-indigo-500', bg: 'bg-indigo-50', name: 'Gaji Tetap' },
            freelance: { icon: '💻', color: 'text-purple-500', bg: 'bg-purple-50', name: 'Freelance' },
            ojol: { icon: '🏍️', color: 'text-green-500', bg: 'bg-green-50', name: 'Ojol/Ride' },
            trading: { icon: '📈', color: 'text-emerald-500', bg: 'bg-emerald-50', name: 'Trading' },
            gift: { icon: '🎁', color: 'text-rose-500', bg: 'bg-rose-50', name: 'Hadiah' },
            income: { icon: '💰', color: 'text-emerald-600', bg: 'bg-emerald-50', name: 'Pemasukan' },
        };

        const custom = readCustomCategories();
        if (custom && custom[category]) {
            return { icon: custom[category].icon || '📦', color: 'text-slate-600', bg: 'bg-slate-50', name: custom[category].name || category };
        }

        return defaults[category] || { icon: '🔹', color: 'text-slate-500', bg: 'bg-slate-50', name: category };
    };

    const addCustomCategory = (slug, name, icon) => {
        writeCustomCategory(slug, { name: name || slug, icon: icon || '📦' });
    };

    return {
        formatRupiah,
        getCategoryDetails,
        addCustomCategory,
        getCustomCategories,
        deleteCustomCategory, // Export
        isCustomCategory      // Export
    };
}