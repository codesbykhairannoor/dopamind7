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

    // Helper buat icon/warna kategori
    const getCategoryDetails = (category) => {
        const map = {
            food: { icon: '🍔', color: 'text-orange-500', bg: 'bg-orange-50' },
            transport: { icon: '🛵', color: 'text-blue-500', bg: 'bg-blue-50' },
            bills: { icon: '⚡', color: 'text-yellow-500', bg: 'bg-yellow-50' },
            shopping: { icon: '🛍️', color: 'text-pink-500', bg: 'bg-pink-50' },
            income: { icon: '💰', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            others: { icon: '📦', color: 'text-slate-500', bg: 'bg-slate-50' },
        };
        return map[category] || map['others'];
    };

    return {
        formatRupiah,
        getCategoryDetails
    };
}