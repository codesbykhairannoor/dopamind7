<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import { useFinanceForm } from '@/Composables/Finance/useFinanceForm'; 
import dayjs from 'dayjs';
import Swal from 'sweetalert2'; // Wajib import ini

const props = defineProps({
    expenseStats: { type: Object, default: () => ({}) },
    incomeStats: { type: Object, default: () => ({}) },
    budgets: { type: Array, default: () => [] }
});

const { formatMoney, cleanAmount } = useFinanceFormat();
const { submitTransaction, transactionForm, t } = useFinanceForm(); 

// --- STATE ASSETS ---
const assets = ref([]);
onMounted(() => {
    const saved = localStorage.getItem('OneForMind_assets');
    if (saved) assets.value = JSON.parse(saved);
});
watch(assets, (val) => localStorage.setItem('OneForMind_assets', JSON.stringify(val)), { deep: true });

// --- LOGIC 1: DAILY ALLOWANCE ---
const dailyAllowance = computed(() => {
    const today = dayjs();
    const lastDay = today.endOf('month').date();
    const remainingDays = (lastDay - today.date()) + 1;
    const totalIn = Object.values(props.incomeStats).reduce((a, b) => Number(a) + Number(b), 0) || 0;
    const totalOut = Object.values(props.expenseStats).reduce((a, b) => Number(a) + Number(b), 0) || 0;
    const currentBalance = totalIn - totalOut; 
    const safeDaily = currentBalance > 0 ? currentBalance / remainingDays : 0;
    return { safeDaily, remainingDays, progress: (today.date() / lastDay) * 100 };
});

// --- LOGIC 2: INVESTMENT LAB ---
const portfolioSummary = computed(() => {
    const currentValue = assets.value.reduce((a, b) => a + (Number(b.capital) * (1 + (Number(b.percent)/100))), 0);
    const totalCapital = assets.value.reduce((a, b) => a + Number(b.capital), 0);
    return { currentValue, totalReturn: currentValue - totalCapital };
});

// --- SWEET ALERT HANDLERS ---

// 1. TAMBAH ASET (EXPENSE)
const handleAddAsset = () => {
    Swal.fire({
        title: '<span class="text-xl font-black text-slate-800">Alokasi Aset Baru</span>',
        html: `
            <div class="flex flex-col gap-3 text-left">
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Nama Aset</label>
                    <input id="swal-name" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Contoh: Saham BBCA">
                </div>
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Modal (Rp)</label>
                    <input id="swal-capital" type="number" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="0">
                    <p class="text-[10px] text-rose-500 mt-1 font-bold italic">*Akan tercatat sebagai Pengeluaran.</p>
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Konfirmasi & Bayar',
        cancelButtonText: 'Batal',
        // Styling SweetAlert Biar Mirip OneForMind
        customClass: {
            popup: '!rounded-[2.5rem] !p-8 !border !border-slate-100 !shadow-2xl',
            confirmButton: '!bg-indigo-600 !text-white !font-bold !py-3 !px-6 !rounded-xl !shadow-lg !shadow-indigo-200 !text-xs !uppercase !tracking-widest',
            cancelButton: '!bg-slate-100 !text-slate-500 !font-bold !py-3 !px-6 !rounded-xl !text-xs !uppercase !tracking-widest',
            actions: '!mt-6 !gap-2'
        },
        backdrop: `rgba(15, 23, 42, 0.6) backdrop-blur-sm`, // 🔥 EFEK BLUR TELEPORT
        preConfirm: () => {
            const name = document.getElementById('swal-name').value;
            const capitalRaw = document.getElementById('swal-capital').value;
            const capital = cleanAmount(capitalRaw); // Pakai formatter lu

            if (!name || capital <= 0) {
                Swal.showValidationMessage('Nama dan Modal wajib diisi!');
                return false;
            }
            return { name, capital };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { name, capital } = result.value;

            // Logic Submit Transaction (EXPENSE)
            transactionForm.reset();
            transactionForm.title = `Invest: ${name}`;
            transactionForm.amount = capital;
            transactionForm.type = 'expense';
            transactionForm.category = 'investment'; // Pastikan kategori ini ada
            transactionForm.date = dayjs().format('YYYY-MM-DD');
            transactionForm.notes = `Modal awal investasi ${name}`;

            submitTransaction(() => {
                // Simpan ke Local Aset setelah sukses DB
                assets.value.push({
                    id: Date.now(),
                    name: name,
                    capital: capital,
                    percent: 0
                });
            });
        }
    });
};

// 2. QUIT ASET (INCOME)
const handleQuit = (asset) => {
    const finalValue = asset.capital * (1 + (asset.percent / 100));
    const profit = finalValue - asset.capital;

    Swal.fire({
        title: '<span class="text-xl font-black text-slate-800">Withdraw Aset?</span>',
        html: `
            <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-2">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-[10px] font-bold text-slate-400 uppercase">Modal Awal</span>
                    <span class="text-xs font-black text-slate-600">${formatMoney(asset.capital)}</span>
                </div>
                <div class="flex justify-between items-center mb-2">
                    <span class="text-[10px] font-bold text-slate-400 uppercase">Return (${asset.percent}%)</span>
                    <span class="text-xs font-black ${asset.percent >= 0 ? 'text-emerald-500' : 'text-rose-500'}">
                        ${asset.percent >= 0 ? '+' : ''}${formatMoney(profit)}
                    </span>
                </div>
                <div class="border-t border-slate-200 my-2"></div>
                <div class="flex justify-between items-center">
                    <span class="text-[10px] font-bold text-slate-800 uppercase">Total Cair</span>
                    <span class="text-sm font-black text-indigo-600">${formatMoney(finalValue)}</span>
                </div>
            </div>
            <p class="text-xs font-bold text-slate-400">Dana akan dikembalikan ke saldo utama.</p>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Cairkan',
        cancelButtonText: 'Batal',
        customClass: {
            popup: '!rounded-[2.5rem] !p-8 !border !border-slate-100 !shadow-2xl',
            confirmButton: '!bg-rose-500 !text-white !font-bold !py-3 !px-6 !rounded-xl !shadow-lg !shadow-rose-200 !text-xs !uppercase !tracking-widest',
            cancelButton: '!bg-slate-100 !text-slate-500 !font-bold !py-3 !px-6 !rounded-xl !text-xs !uppercase !tracking-widest',
            actions: '!mt-4 !gap-2'
        },
        backdrop: `rgba(15, 23, 42, 0.6) backdrop-blur-sm`
    }).then((result) => {
        if (result.isConfirmed) {
            // Logic Submit Transaction (INCOME)
            transactionForm.reset();
            transactionForm.title = `Withdraw: ${asset.name}`;
            transactionForm.amount = finalValue;
            transactionForm.type = 'income';
            transactionForm.category = 'investment';
            transactionForm.date = dayjs().format('YYYY-MM-DD');
            transactionForm.notes = `Return: ${formatMoney(profit)} (${asset.percent}%)`;

            submitTransaction(() => {
                assets.value = assets.value.filter(a => a.id !== asset.id);
            });
        }
    });
};
</script>

<template>
    <div class="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
     

        <div class="bg-indigo-900 rounded-[2.5rem] p-1 shadow-2xl shadow-indigo-200/50 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-900"></div>
            <div class="absolute -right-10 -top-10 w-40 h-40 bg-white dark:bg-slate-900/10 rounded-full blur-3xl group-hover:bg-white dark:bg-slate-900/20 transition-all duration-1000"></div>

            <div class="relative z-10 p-6">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-lg">🧪</span>
                            <p class="text-indigo-200 text-[10px] font-black uppercase tracking-[0.2em]">Investment Lab</p>
                        </div>
                        <h4 class="text-2xl font-black text-white tracking-tighter">{{ formatMoney(portfolioSummary.currentValue) }}</h4>
                        <p class="text-[10px] font-bold mt-1" :class="portfolioSummary.totalReturn >= 0 ? 'text-emerald-300' : 'text-rose-300'">
                            {{ portfolioSummary.totalReturn >= 0 ? '+' : '' }}{{ formatMoney(portfolioSummary.totalReturn) }} (Total P/L)
                        </p>
                    </div>
                    <button @click="handleAddAsset" class="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900/10 hover:bg-white dark:bg-slate-900/20 backdrop-blur-md flex items-center justify-center text-xl text-white border border-white/10 transition-all active:scale-95 shadow-lg">
                        ＋
                    </button>
                </div>

                <div v-if="assets.length > 0" class="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                    <div v-for="asset in assets" :key="asset.id" class="bg-indigo-800/40 border border-indigo-500/20 rounded-2xl p-3 flex items-center justify-between group/card hover:bg-indigo-800/60 transition-colors">
                        <div class="flex-1 min-w-0 mr-3">
                            <div class="flex items-center gap-2 mb-1">
                                <h5 class="text-xs font-black text-white truncate">{{ asset.name }}</h5>
                                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900/10 text-white/70">{{ formatMoney(asset.capital) }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <input type="number" v-model="asset.percent" class="w-10 bg-transparent border-b border-white/20 text-[10px] font-black text-center text-yellow-300 focus:outline-none focus:border-yellow-300 p-0">
                                <span class="text-[9px] text-indigo-300">% Growth</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-black tracking-tight mb-1" :class="asset.percent >= 0 ? 'text-emerald-400' : 'text-rose-400'">
                                {{ formatMoney(asset.capital * (1 + (asset.percent/100))) }}
                            </p>
                            <button @click="handleQuit(asset)" class="text-[9px] font-bold text-white bg-rose-500/80 hover:bg-rose-500 px-3 py-1 rounded-lg transition-all shadow-md active:scale-95 opacity-60 group-hover/card:opacity-100">
                                QUIT
                            </button>
                        </div>
                    </div>
                </div>

                <div v-else class="py-8 text-center border-2 border-dashed border-white/10 rounded-3xl opacity-50">
                    <p class="text-[10px] font-bold text-white uppercase tracking-widest">Lab Kosong</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
</style>