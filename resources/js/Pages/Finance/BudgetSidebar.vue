<script setup>
import { ref, computed } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import CategoryModal from './CategoryModal.vue'; 

const props = defineProps({
    budgets: Array,
    categories: Array, // 🔥 Data dari DB
    expenseStats: Object,
    incomeStats: Object 
});

const emit = defineEmits(['add', 'delete-budget', 'edit-budget']);

// Logic Format Rupiah Simple
const formatRupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

// Helper Get Detail Kategori dari Array DB
const getCat = (slug) => {
    return props.categories.find(c => c.slug === slug) || { name: slug, icon: '📦' };
};

const activeTab = ref('expense');
const showCategoryModal = ref(false);
const incomeToEdit = ref(null);

// LIST INCOME (Filter dari DB categories type='income')
const incomeList = computed(() => {
    // Ambil kategori income dari DB
    const dbIncomes = props.categories.filter(c => c.type === 'income');
    
    return dbIncomes.map(cat => ({
        ...cat,
        amount: props.incomeStats[cat.slug] || 0
    })).sort((a, b) => b.amount - a.amount);
});

// CRUD HANDLERS
const openAddIncome = () => {
    incomeToEdit.value = null;
    showCategoryModal.value = true;
};

const openEditIncome = (cat) => {
    incomeToEdit.value = cat; // Pass object category full
    showCategoryModal.value = true;
};

const deleteIncomeCategory = (cat) => {
    if(confirm(`Hapus sumber dana "${cat.name}"?`)) {
        router.delete(route('finance.categories.destroy', cat.id), {
            preserveScroll: true,
            onError: (errors) => alert(errors.error || 'Gagal menghapus.')
        });
    }
};

// ... logic progress bar budget ...
const getProgress = (cat, limit) => limit > 0 ? Math.min(((props.expenseStats[cat]||0)/limit)*100, 100) : 0;
const getBarColor = (p) => p > 90 ? 'bg-rose-500' : p > 75 ? 'bg-orange-500' : 'bg-indigo-500';
const totalBudgetStats = computed(() => {
    let l=0, u=0; props.budgets.forEach(b => { l+=parseFloat(b.limit_amount); u+=parseFloat(props.expenseStats[b.category]||0); });
    const p = l>0?(u/l)*100:0;
    return { status: p>100?'Over! 🚨':p>80?'Waspada ⚠️':'Aman 👌', color: p>100?'text-rose-600':p>80?'text-orange-600':'text-emerald-600' };
});
</script>

<template>
    <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit sticky top-6 flex flex-col gap-6">
        
        <div class="flex p-1 bg-slate-50 rounded-xl border border-slate-100">
            <button @click="activeTab = 'expense'" class="flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all" :class="activeTab === 'expense' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">Pengeluaran</button>
            <button @click="activeTab = 'income'" class="flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all" :class="activeTab === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">Pemasukan</button>
        </div>

        <div v-if="activeTab === 'expense'" class="animate-in fade-in slide-in-from-left-4 duration-300 space-y-6">
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-slate-800 text-sm">Target Budget</h3>
                <button @click="$emit('add')" class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-100">+ Atur</button>
            </div>

            <div v-if="budgets.length === 0" class="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">Belum ada budget.</div>
            
            <div v-else class="space-y-5">
                <div v-for="b in budgets" :key="b.id" class="group">
                    <div class="flex justify-between text-sm mb-1">
                        <div class="flex items-center gap-2">
                            <span>{{ getCat(b.category).icon }}</span>
                            <span class="font-bold text-slate-700 capitalize text-xs">{{ getCat(b.category).name }}</span>
                        </div>
                        <span class="text-[10px] text-slate-400">{{ formatRupiah(props.expenseStats[b.category]||0) }} / {{ formatRupiah(b.limit_amount) }}</span>
                    </div>
                    <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full transition-all duration-1000 rounded-full" :class="getBarColor(getProgress(b.category, b.limit_amount))" :style="{ width: `${getProgress(b.category, b.limit_amount)}%` }"></div>
                    </div>
                    <div class="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-all">
                         <button @click="$emit('edit-budget', b)" class="text-[10px] text-indigo-500 font-bold">Edit</button>
                         <button @click="$emit('delete-budget', b.id)" class="text-[10px] text-rose-500 font-bold">Hapus</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="activeTab === 'income'" class="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-slate-800 text-sm">Sumber Dana</h3>
                <button @click="openAddIncome" class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">+ Kategori</button>
            </div>

            <div v-if="incomeList.length === 0" class="text-center py-8 text-xs text-slate-400 border border-dashed rounded-xl">Belum ada sumber dana.</div>

            <div v-else class="space-y-3">
                <div v-for="item in incomeList" :key="item.id" class="flex justify-between items-center p-3 bg-white rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-sm transition-all group">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shadow-inner">{{ item.icon }}</div>
                        <div class="flex flex-col">
                            <span class="font-bold text-slate-700 capitalize text-xs">{{ item.name }}</span>
                            <span class="text-[10px] text-slate-400">{{ item.amount > 0 ? 'Aktif' : 'Kosong' }}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-black text-emerald-600 text-sm">+{{ formatRupiah(item.amount) }}</span>
                        <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button @click="openEditIncome(item)" class="p-1 text-indigo-400 hover:text-indigo-600">✎</button>
                            <button @click="deleteIncomeCategory(item)" class="p-1 text-rose-400 hover:text-rose-600">✕</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <CategoryModal :show="showCategoryModal" :categoryToEdit="incomeToEdit" :close="() => showCategoryModal = false" />
    </div>
</template>