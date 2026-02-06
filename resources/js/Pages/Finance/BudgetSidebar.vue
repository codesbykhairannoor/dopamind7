<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import CategoryModal from './CategoryModal.vue'; // 🔥 Import Modal Baru

const props = defineProps({
    budgets: Array,
    expenseStats: Object,
    incomeStats: Object 
});

const emit = defineEmits(['add', 'delete-budget', 'edit-budget']);
const { formatRupiah, getCategoryDetails, getCustomCategories } = useFinanceFormat();

const activeTab = ref('expense');
const showCategoryModal = ref(false); // State buat modal kategori
const refreshCounter = ref(0);

onMounted(() => {
    const handler = () => refreshCounter.value += 1;
    window.addEventListener('finance:custom-updated', handler);
    window.__finance_budget_sidebar_handler = handler;
});
onUnmounted(() => {
    const h = window.__finance_budget_sidebar_handler;
    if (h) window.removeEventListener('finance:custom-updated', h);
    delete window.__finance_budget_sidebar_handler;
});

const getProgress = (category, limit) => {
    const used = props.expenseStats[category] || 0;
    return limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
};

const getBarColor = (percent) => {
    if(percent > 90) return 'bg-rose-500';
    if(percent > 75) return 'bg-orange-500';
    return 'bg-indigo-500';
};

// --- DATA PEMASUKAN (Gabungan yang ada duitnya + Custom kosong) ---
const incomeList = computed(() => {
    // 1. Ambil yang ada transaksinya
    const fromStats = Object.keys(props.incomeStats || {}).map(key => ({
        category: key,
        amount: props.incomeStats[key]
    }));

    // 2. Ambil kategori custom (biar user liat hasil tambahannya meski saldo 0)
    // Dependency ke refreshCounter biar reaktif pas nambah
    const _v = refreshCounter.value; 
    const customCats = Object.keys(getCustomCategories());
    
    // Gabungin dan Hapus Duplikat
    const merged = [...fromStats];
    customCats.forEach(cat => {
        if (!merged.find(i => i.category === cat)) {
            merged.push({ category: cat, amount: 0 }); // Tampilkan dengan Rp 0
        }
    });

    return merged.sort((a, b) => b.amount - a.amount);
});

// Total Budget Stats
const totalBudgetStats = computed(() => {
    let totalLimit = 0;
    let totalUsed = 0;
    props.budgets.forEach(b => {
        totalLimit += parseFloat(b.limit_amount);
        totalUsed += parseFloat(props.expenseStats[b.category] || 0);
    });
    const percent = totalLimit > 0 ? (totalUsed / totalLimit) * 100 : 0;
    let status = 'Aman 👌', statusColor = 'text-emerald-600';
    if (percent > 100) { status = 'Over! 🚨'; statusColor = 'text-rose-600'; }
    else if (percent > 80) { status = 'Waspada ⚠️'; statusColor = 'text-orange-600'; }
    return { totalLimit, totalUsed, percent, status, statusColor };
});
</script>

<template>
    <div :key="refreshCounter" class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit sticky top-6 flex flex-col gap-6">
        
        <div class="flex p-1 bg-slate-50 rounded-xl border border-slate-100">
            <button @click="activeTab = 'expense'" class="flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all" :class="activeTab === 'expense' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">Pengeluaran</button>
            <button @click="activeTab = 'income'" class="flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all" :class="activeTab === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">Pemasukan</button>
        </div>

        <div v-if="activeTab === 'expense'" class="animate-in fade-in slide-in-from-left-4 duration-300">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-slate-800 text-sm">Target Budget</h3>
                <button @click="$emit('add')" class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg hover:bg-indigo-100 transition border border-indigo-100">+ Atur</button>
            </div>

            <div v-if="budgets.length === 0" class="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p class="text-xs text-slate-400 font-medium">Belum ada budget.</p>
            </div>

            <div v-else class="space-y-6">
                <div v-for="budget in budgets" :key="budget.id" class="group">
                    <div class="flex justify-between text-sm mb-1.5 items-end">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-lg shadow-sm border border-slate-100">{{ getCategoryDetails(budget.category).icon }}</div>
                            <div class="flex flex-col">
                                <span class="font-bold text-slate-700 capitalize text-xs">{{ getCategoryDetails(budget.category).name || budget.category }}</span>
                                <div class="flex gap-2 mt-0.5 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                                    <button @click="$emit('edit-budget', budget)" class="text-[10px] text-indigo-500 font-bold uppercase">Edit</button>
                                    <span class="text-[10px] text-slate-200">|</span>
                                    <button @click="$emit('delete-budget', budget.id)" class="text-[10px] text-rose-400 font-bold uppercase">Hapus</button>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                             <span class="text-slate-800 font-black text-xs block">{{ formatRupiah(props.expenseStats[budget.category] || 0) }}</span>
                            <span class="text-slate-400 text-[10px] block font-medium">/ {{ formatRupiah(budget.limit_amount) }}</span>
                        </div>
                    </div>
                    <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full transition-all duration-1000 ease-out rounded-full shadow-sm" :class="getBarColor(getProgress(budget.category, budget.limit_amount))" :style="{ width: `${getProgress(budget.category, budget.limit_amount)}%` }"></div>
                    </div>
                </div>
            </div>
            
            <div v-if="budgets.length > 0" class="mt-4 pt-4 border-t border-slate-100">
                <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <div class="flex justify-between items-center mb-2">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Alokasi</p>
                        <p class="text-[10px] font-black uppercase tracking-widest" :class="totalBudgetStats.statusColor">{{ totalBudgetStats.status }}</p>
                    </div>
                    <div class="relative h-2 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                        <div class="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000" :style="{ width: `${Math.min(totalBudgetStats.percent, 100)}%` }"></div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="activeTab === 'income'" class="animate-in fade-in slide-in-from-right-4 duration-300">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-slate-800 text-sm">Sumber Dana</h3>
                <button @click="showCategoryModal = true" class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition border border-emerald-100">+ Kategori</button>
            </div>

            <div v-if="incomeList.length === 0" class="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p class="text-xs text-slate-400 font-medium">Belum ada sumber dana.</p>
            </div>

            <div v-else class="space-y-3">
                <div v-for="(item, idx) in incomeList" :key="idx" class="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-sm transition-all group">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shadow-inner border border-emerald-100/50">
                            {{ getCategoryDetails(item.category).icon }}
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-slate-700 capitalize text-xs">{{ getCategoryDetails(item.category).name }}</span>
                            <span v-if="item.amount > 0" class="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Aktif</span>
                            <span v-else class="text-[9px] text-slate-300 font-medium italic">Belum ada transaksi</span>
                        </div>
                    </div>
                    <span class="font-black text-emerald-600 text-sm">+{{ formatRupiah(item.amount) }}</span>
                </div>
            </div>
        </div>

        <CategoryModal :show="showCategoryModal" :close="() => showCategoryModal = false" />

    </div>
</template>