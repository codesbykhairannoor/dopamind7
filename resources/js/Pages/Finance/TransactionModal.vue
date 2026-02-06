<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    show: Boolean,
    form: Object,
    budgets: Array,
    close: Function,
    submit: Function
});

const { getCategoryDetails, getCustomCategories } = useFinanceFormat();

// --- LOGIC KATEGORI DINAMIS ---
const defaultExpenseCats = ['food', 'transport', 'bills', 'shopping', 'others'];
const defaultIncomeCats = ['salary', 'freelance', 'ojol', 'trading', 'gift', 'income'];

// Trigger refresh saat ada kategori baru ditambahkan dari sidebar
const customVersion = ref(0);
const refreshHandler = () => customVersion.value++;

onMounted(() => window.addEventListener('finance:custom-updated', refreshHandler));
onUnmounted(() => window.removeEventListener('finance:custom-updated', refreshHandler));

const availableCategories = computed(() => {
    // Dependency palsu
    const _v = customVersion.value;
    const custom = Object.keys(getCustomCategories());

    if (props.form.type === 'income') {
        // Mode Pemasukan: Default Income + Custom Categories
        return [...new Set([...defaultIncomeCats, ...custom])];
    } else {
        // Mode Pengeluaran: Default Expense + Budget + Custom (Opsional: kalau mau custom muncul di expense juga, masukkan 'custom' disini)
        // Sesuai request: "Jangan sampai nyampur". Kita batasi Expense strictly.
        const budgetCats = props.budgets ? props.budgets.map(b => b.category) : [];
        return [...new Set([...defaultExpenseCats, ...budgetCats])];
    }
});

// Safety Watcher: Reset kategori kalau ganti tipe biar gak error
watch(() => props.form.type, (newType) => {
    if (newType === 'income') {
        props.form.category = 'freelance'; 
    } else {
        props.form.category = 'food';
    }
});

const formatDisplay = (val) => val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '';
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
                <button @click="close" class="bg-slate-50 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
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
                    <input v-model="form.title" type="text" placeholder="Contoh: Gaji / Project Website" 
                        class="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 placeholder:text-slate-300 transition-all">
                </div>

                <div>
                    <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Nominal (Rp)</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                        <input type="text" :value="formatDisplay(form.amount)" @input="onInput" placeholder="0" 
                            class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-black text-lg text-slate-700">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Kategori</label>
                        <div class="relative">
                            <select v-model="form.category" class="w-full pl-4 pr-8 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 capitalize text-sm appearance-none cursor-pointer">
                                <option v-for="cat in availableCategories" :key="cat" :value="cat">
                                    {{ getCategoryDetails(cat).icon }} {{ getCategoryDetails(cat).name }}
                                </option>
                            </select>
                            <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                        </div>
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Tanggal</label>
                        <input v-model="form.date" type="date" class="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 text-sm cursor-pointer">
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