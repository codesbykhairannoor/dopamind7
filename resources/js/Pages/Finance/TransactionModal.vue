<script setup>
import { ref, computed, watch } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    show: Boolean,
    form: Object,
    budgets: Array,     // Data Budget (Expense) dari DB
    categories: Array,  // Data Categories (Income/Expense) dari DB
    close: Function,
    submit: Function
});

const { getCategoryDetails } = useFinanceFormat();

// --- LOGIC KATEGORI ---
const availableCategories = computed(() => {
    
    if (props.form.type === 'income') {
        // 🔥 LOGIC INCOME: Ambil dari tabel 'finance_categories' yang type='income'
        // Filter array props.categories yang dikirim dari controller
        return (props.categories || [])
            .filter(c => c.type === 'income')
            .map(c => c.slug);
    } else {
        // 🔥 LOGIC EXPENSE: HANYA Ambil dari Budget yang sudah di-set
        // Karena expense wajib punya budget dulu
        return (props.budgets || []).map(b => b.category);
    }
});

// Helper buat dapetin detail (Nama & Icon) dari DB Categories atau fallback
const getDetail = (slug) => {
    // Coba cari di props.categories
    const found = (props.categories || []).find(c => c.slug === slug);
    if (found) return { icon: found.icon, name: found.name };
    
    // Kalau gak ketemu (misal data lama), pake helper default
    return getCategoryDetails(slug);
};

// Reset kategori saat ganti tipe (biar gak nyampur)
watch(() => props.form.type, (newType) => {
    props.form.category = ''; 
});

// Format Rupiah di Input
const formatDisplay = (val) => {
    if (!val) return '';
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const onInput = (e) => {
    let value = e.target.value.replace(/\./g, '');
    if (!isNaN(value)) props.form.amount = value;
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="close" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>
        
        <div class="bg-white w-full max-w-md rounded-[2rem] shadow-2xl z-10 p-6 animate-in zoom-in-95 duration-200 border border-slate-100">
            
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-black text-slate-800">✨ Catat Transaksi</h3>
                <button @click="close" class="bg-slate-50 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">✕</button>
            </div>
            
            <form @submit.prevent="submit" class="space-y-5">
                
                <div class="flex bg-slate-100 p-1.5 rounded-2xl">
                    <button type="button" @click="props.form.type = 'expense'" 
                        class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2" 
                        :class="props.form.type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">
                        💸 Pengeluaran
                    </button>
                    <button type="button" @click="props.form.type = 'income'" 
                        class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2" 
                        :class="props.form.type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">
                        💰 Pemasukan
                    </button>
                </div>

                <div>
                    <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Keterangan</label>
                    <input v-model="form.title" type="text" placeholder="Catatan transaksi..." class="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 placeholder:text-slate-300 transition-all">
                </div>

                <div>
                    <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Nominal (Rp)</label>
                    <div class="relative group">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-indigo-500 transition-colors">Rp</span>
                        <input type="text" :value="formatDisplay(form.amount)" @input="onInput" placeholder="0" 
                            class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-black text-lg text-slate-700 placeholder:text-slate-300 transition-all">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Kategori</label>
                        <div class="relative">
                            <select v-model="form.category" class="w-full pl-4 pr-8 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 capitalize text-sm appearance-none cursor-pointer transition-all hover:bg-slate-50">
                                <option value="" disabled selected>Pilih...</option>
                                
                                <option v-for="catSlug in availableCategories" :key="catSlug" :value="catSlug">
                                    {{ getDetail(catSlug).icon }} {{ getDetail(catSlug).name }}
                                </option>
                            </select>
                            
                            <div v-if="availableCategories.length === 0" class="absolute top-12 left-0 w-[200px] text-[10px] text-rose-500 font-bold leading-tight animate-pulse">
                                {{ form.type === 'expense' ? 'Belum ada budget! Atur di Sidebar.' : 'Belum ada sumber dana! Tambah di Sidebar.' }}
                            </div>

                            <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                        </div>
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Tanggal</label>
                        <input v-model="form.date" type="date" class="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 text-sm cursor-pointer transition-all hover:bg-slate-50">
                    </div>
                </div>

                <div class="flex gap-3 pt-4">
                    <button type="button" @click="close" class="flex-1 py-3.5 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition">Batal</button>
                    <button type="submit" class="flex-[2] py-3.5 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all flex justify-center items-center gap-2"
                        :class="form.type === 'expense' ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-200' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200'"
                    >
                        <span>{{ form.type === 'expense' ? '💸' : '💰' }}</span>
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>