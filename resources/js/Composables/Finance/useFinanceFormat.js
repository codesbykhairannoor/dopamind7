export function useFinanceFormat() {
    
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
        }).format(number);
    };

    // Helper sederhana untuk fallback icon jika data DB belum load/error
    const getCategoryDetails = (slug, categories = []) => {
        if (!slug) return { name: '', icon: '❓' };
        
        const found = categories.find(c => c.slug === slug);
        if (found) {
            return { name: found.name, icon: found.icon };
        }
        
        // Fallback formatting slug ke nama readable
        const name = slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return { name: name, icon: '📦' };
    };

    return {
        formatRupiah,
        getCategoryDetails
    };
}