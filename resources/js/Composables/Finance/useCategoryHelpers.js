import { computed } from 'vue';

export function useCategoryHelpers(props) {
    
    // Helper Translate Sederhana (Cek window.trans)
    const t = (key, fallback) => {
        if (typeof window.trans === 'function') {
            const res = window.trans(key);
            return res !== key ? res : fallback;
        }
        return fallback;
    };

    const availableCategories = computed(() => {
        const defaults = ['food', 'transport', 'bills', 'shopping', 'others'];
        // Ambil kategori dari budgets yang sudah ada (jika ada)
        const fromBudgets = props.budgets ? props.budgets.map(b => b.category) : [];
        
        // Gabung dan Hapus Duplikat pakai Set
        return [...new Set([...defaults, ...fromBudgets])];
    });

    /**
     * Helper untuk mengubah slug 'food' menjadi 'Makanan' (sesuai bahasa)
     * Berguna di dropdown atau label
     */
    const getCategoryLabel = (slug) => {
        // Coba cari di kamus dengan key 'cat_slug' (misal: cat_food)
        // Jika tidak ada, format slug-nya jadi Title Case
        return t(`cat_${slug}`, slug.charAt(0).toUpperCase() + slug.slice(1));
    };

    return { 
        availableCategories,
        getCategoryLabel 
    };
}