import axios from 'axios';
import { router } from '@inertiajs/vue3';

export function useFinanceFormat() {
    
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
        }).format(number);
    };

    const CUSTOM_KEY = 'finance_custom_categories_v3';

    const readCustomCategories = () => {
        try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) || '{}'); } catch (e) { return {}; }
    };

    const saveToStorage = (map) => {
        localStorage.setItem(CUSTOM_KEY, JSON.stringify(map));
        window.dispatchEvent(new CustomEvent('finance:custom-updated'));
    };

    const getCustomCategories = () => readCustomCategories();

    // 🔥 FUNGSI UTAMA: Simpan / Edit (dengan Rename DB)
    const saveCustomCategory = async (oldSlug, newName, icon, type) => {
        const newSlug = newName.toLowerCase().replace(/\s+/g, '_');
        const map = readCustomCategories();

        // 1. Kalau Edit & Nama Berubah -> Panggil Server buat Rename DB
        if (oldSlug && oldSlug !== newSlug) {
            try {
                await axios.post(route('finance.category.rename'), {
                    old_category: oldSlug,
                    new_category: newSlug
                });
                
                // Hapus entry lama di LocalStorage
                delete map[oldSlug];
            } catch (error) {
                console.error("Gagal rename database", error);
                alert("Gagal update data lama. Coba lagi.");
                return false;
            }
        }

        // 2. Simpan Data Baru/Update di LocalStorage
        map[newSlug] = { name: newName, icon, type };
        saveToStorage(map);
        return newSlug; // Return slug baru biar form bisa update
    };

    // 🔥 FUNGSI UTAMA: Hapus Aman (Cek Server Dulu)
    const deleteCustomCategorySafe = async (slug) => {
        try {
            // 1. Tanya Server: Kategori ini dipake gak?
            const { data } = await axios.get(route('finance.category.check', slug));
            
            if (data.used) {
                alert(`⚠️ Gagal Hapus!\n\nKategori ini masih digunakan dalam ${data.count} data (Transaksi/Budget).\nHapus dulu data tersebut atau Edit nama kategori ini saja.`);
                return false;
            }

            // 2. Kalau aman, hapus dari LocalStorage
            const map = readCustomCategories();
            if (map[slug]) {
                delete map[slug];
                saveToStorage(map);
                return true;
            }
        } catch (error) {
            console.error(error);
            alert('Gagal mengecek data.');
        }
        return false;
    };

    // Helper (Legacy add, redirect ke saveCustomCategory buat simple use)
    const addCustomCategory = (slug, name, icon, type) => {
        const map = readCustomCategories();
        map[slug] = { name, icon, type };
        saveToStorage(map);
    };

    const getCategoryDetails = (category) => {
        const custom = readCustomCategories();
        if (custom[category]) {
            return custom[category];
        }
        return { icon: '📦', name: category, type: 'unknown' };
    };

    return {
        formatRupiah,
        getCategoryDetails,
        addCustomCategory, // Legacy
        saveCustomCategory,      // 🔥 Pakai ini buat modal
        deleteCustomCategorySafe, // 🔥 Pakai ini buat hapus
        getCustomCategories
    };
}