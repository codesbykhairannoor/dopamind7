<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import { useFinanceForm } from '@/Composables/Finance/useFinanceForm'; 
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';

const props = defineProps({
    expenseStats: { type: Object, default: () => ({}) },
    incomeStats: { type: Object, default: () => ({}) },
    budgets: { type: Array, default: () => [] }
});

const emit = defineEmits(['update-stats']);

const { formatMoney, cleanAmount, formatInputDisplay, activeCurrency } = useFinanceFormat();
const { submitTransaction, transactionForm } = useFinanceForm(); 

// --- STATE ASSETS ---
const assets = ref([]);
onMounted(() => {
    const saved = localStorage.getItem('OneForMind_assets');
    if (saved) assets.value = JSON.parse(saved);
});
watch(assets, (val) => localStorage.setItem('OneForMind_assets', JSON.stringify(val)), { deep: true });

// --- LOGIC: INVESTMENT LAB ---
const portfolioSummary = computed(() => {
    const currentValue = assets.value.reduce((a, b) => a + (Number(b.capital) * (1 + (Number(b.percent)/100))), 0);
    const totalCapital = assets.value.reduce((a, b) => a + Number(b.capital), 0);
    return { currentValue, totalReturn: currentValue - totalCapital };
});

// --- SWEET ALERT HANDLERS ---

// 1. TAMBAH ASET (EXPENSE)
const handleAddAsset = () => {
    Swal.fire({
        title: `<span class="text-xl font-black text-slate-800">${trans('invest_new')}</span>`,
        html: `
            <div class="flex flex-col gap-4 text-left">
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">${trans('asset_name')}</label>
                    <input id="swal-name" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300" placeholder="${trans('asset_name_placeholder')}">
                </div>
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">${trans('capital_invest')}</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">
                            ${['USD', 'GBP', 'EUR'].includes(activeCurrency.value) ? activeCurrency.value : 'Rp'}
                        </span>
                        <input id="swal-capital" type="text" inputmode="numeric" class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-base font-black text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300 placeholder:font-medium" placeholder="0">
                    </div>
                    <p class="text-[10px] text-rose-500 mt-1.5 font-bold italic flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ${trans('invest_expense_warn')}
                    </p>
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: trans('confirm_pay'),
        cancelButtonText: trans('cancel'),
        customClass: {
            popup: '!rounded-[2rem] !p-8 !border !border-slate-100 !shadow-2xl',
            confirmButton: '!bg-indigo-600 !text-white !font-bold !py-3.5 !px-6 !rounded-xl !shadow-lg !shadow-indigo-200 !text-xs !uppercase !tracking-widest !w-full sm:!w-auto',
            cancelButton: '!bg-slate-100 !text-slate-500 !font-bold !py-3.5 !px-6 !rounded-xl !text-xs !uppercase !tracking-widest !w-full sm:!w-auto',
            actions: '!mt-8 flex flex-col-reverse sm:flex-row !gap-3'
        },
        backdrop: `rgba(15, 23, 42, 0.6) backdrop-blur-sm`, 
        didOpen: () => {
            const input = document.getElementById('swal-capital');
            input.addEventListener('input', (e) => {
                let rawValue = e.target.value.replace(/[^0-9]/g, '');
                if (rawValue) {
                    e.target.value = formatInputDisplay(rawValue);
                } else {
                    e.target.value = '';
                }
            });
        },
        preConfirm: () => {
            const name = document.getElementById('swal-name').value;
            const capitalRaw = document.getElementById('swal-capital').value;
            const capital = cleanAmount(capitalRaw);

            if (!name || capital <= 0) {
                Swal.showValidationMessage(trans('invest_validation'));
                return false;
            }
            return { name, capital };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { name, capital } = result.value;

            transactionForm.reset();
            transactionForm.title = `Invest: ${name}`;
            transactionForm.amount = capital;
            transactionForm.type = 'expense';
            transactionForm.category = 'investment'; 
            transactionForm.date = dayjs().format('YYYY-MM-DD');
            transactionForm.notes = `Modal awal investasi ${name}`;

            emit('update-stats', transactionForm.data());

            submitTransaction({
                onOptimistic: () => {
                    assets.value.push({
                        id: Date.now(),
                        name: name,
                        capital: capital,
                        percent: 0
                    });
                }
            });
        }
    });
};

// 2. QUIT ASET (INCOME)
const handleQuit = (asset) => {
    const finalValue = asset.capital * (1 + (asset.percent / 100));
    const profit = finalValue - asset.capital;

    Swal.fire({
        title: `<span class="text-xl font-black text-slate-800">${trans('withdraw_asset')}</span>`,
        html: `
            <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-4 mt-2 text-left">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${trans('initial_capital')}</span>
                    <span class="text-sm font-black text-slate-700">${formatMoney(asset.capital)}</span>
                </div>
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${trans('return_text')} (${asset.percent}%)</span>
                    <span class="text-xs font-black ${asset.percent >= 0 ? 'text-emerald-500' : 'text-rose-500'} bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">
                        ${asset.percent >= 0 ? '+' : ''}${formatMoney(profit)}
                    </span>
                </div>
                <div class="border-t border-dashed border-slate-200 my-2"></div>
                <div class="flex justify-between items-end">
                    <span class="text-[10px] font-black text-slate-800 uppercase tracking-widest">${trans('total_withdraw')}</span>
                    <span class="text-lg font-black text-indigo-600">${formatMoney(finalValue)}</span>
                </div>
            </div>
            <p class="text-[10px] font-bold text-slate-400 text-left">${trans('withdraw_notice')}</p>
        `,
        icon: 'success',
        iconColor: '#4f46e5',
        showCancelButton: true,
        confirmButtonText: trans('yes_withdraw'),
        cancelButtonText: trans('cancel'),
        customClass: {
            popup: '!rounded-[2rem] !p-8 !border !border-slate-100 !shadow-2xl',
            confirmButton: '!bg-indigo-600 !text-white !font-bold !py-3.5 !px-6 !rounded-xl !shadow-lg !shadow-indigo-200 !text-xs !uppercase !tracking-widest !w-full sm:!w-auto',
            cancelButton: '!bg-slate-100 !text-slate-500 !font-bold !py-3.5 !px-6 !rounded-xl !text-xs !uppercase !tracking-widest !w-full sm:!w-auto',
            actions: '!mt-6 flex flex-col-reverse sm:flex-row !gap-3'
        },
        backdrop: `rgba(15, 23, 42, 0.6) backdrop-blur-sm`
    }).then((result) => {
        if (result.isConfirmed) {
            transactionForm.reset();
            transactionForm.title = `Withdraw: ${asset.name}`;
            transactionForm.amount = finalValue;
            transactionForm.type = 'income';
            transactionForm.category = 'investment';
            transactionForm.date = dayjs().format('YYYY-MM-DD');
            transactionForm.notes = `Return: ${formatMoney(profit)} (${asset.percent}%)`;

            emit('update-stats', transactionForm.data());

            submitTransaction({
                onOptimistic: () => {
                    assets.value = assets.value.filter(a => a.id !== asset.id);
                }
            });
        }
    });
};
</script>

<template>
    <div class="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div class="bg-indigo-900 rounded-[2rem] p-1 shadow-2xl shadow-indigo-200/50 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-900"></div>
            <div class="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-1000"></div>

            <div class="relative z-10 p-5">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <div class="flex items-center gap-1.5 mb-1.5">
                            <span class="text-lg">🧪</span>
                            <p class="text-indigo-200 text-[9px] font-black uppercase tracking-[0.2em]">{{ $t('investment_lab') }}</p>
                        </div>
                        <h4 class="text-2xl font-black text-white tracking-tighter">{{ formatMoney(portfolioSummary.currentValue) }}</h4>
                        <div class="inline-flex items-center gap-1.5 mt-1 bg-black/20 px-2.5 py-1 rounded-md border border-white/5 backdrop-blur-sm">
                            <span class="w-1.5 h-1.5 rounded-full" :class="portfolioSummary.totalReturn >= 0 ? 'bg-emerald-400' : 'bg-rose-400'"></span>
                            <p class="text-[9px] font-bold" :class="portfolioSummary.totalReturn >= 0 ? 'text-emerald-300' : 'text-rose-300'">
                                {{ portfolioSummary.totalReturn >= 0 ? '+' : '' }}{{ formatMoney(portfolioSummary.totalReturn) }} {{ $t('total_pl') }}
                            </p>
                        </div>
                    </div>
                    <button @click="handleAddAsset" class="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-xl text-white border border-white/20 transition-all active:scale-95 shadow-md">
                        ＋
                    </button>
                </div>

                <div v-if="assets.length > 0" class="space-y-2 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
                    <div v-for="asset in assets" :key="asset.id" class="bg-indigo-950/50 border border-indigo-500/30 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group/card hover:bg-indigo-800/80 transition-all">
                        
                        <div class="flex flex-col gap-2 flex-1 min-w-0">
                            <div class="flex items-center gap-2">
                                <h5 class="text-sm font-black text-white truncate">{{ asset.name }}</h5>
                                <span class="text-[8px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-500/30">
                                    {{ formatMoney(asset.capital) }}
                                </span>
                            </div>
                            
                            <div class="flex items-center w-fit bg-black/30 rounded-lg border border-white/10 overflow-hidden focus-within:border-yellow-400/50 transition-all">
                                <div class="bg-white/5 px-2 py-1 border-r border-white/10">
                                    <svg class="w-3 h-3 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                </div>
                                <input type="number" v-model="asset.percent" class="w-16 bg-transparent border-none text-sm font-black text-center text-yellow-400 focus:outline-none focus:ring-0 py-1 px-1 placeholder:text-yellow-700/50" placeholder="0">
                                <div class="bg-white/5 px-2 py-1 border-l border-white/10">
                                    <span class="text-[8px] font-bold text-indigo-200 uppercase">{{ $t('growth') }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-2 sm:pt-0 mt-1 sm:mt-0 border-t sm:border-none border-indigo-500/20 gap-2">
                            <div class="text-left sm:text-right">
                                <p class="text-[8px] text-indigo-300 mb-0.5 uppercase tracking-widest font-bold">{{ $t('est_total') }}</p>
                                <p class="text-sm font-black tracking-tight" :class="asset.percent >= 0 ? 'text-emerald-400' : 'text-rose-400'">
                                    {{ formatMoney(asset.capital * (1 + (asset.percent/100))) }}
                                </p>
                            </div>
                            <button @click="handleQuit(asset)" class="text-[9px] font-black tracking-widest text-white bg-rose-500/90 hover:bg-rose-500 px-4 py-1.5 rounded-lg transition-all shadow-sm active:scale-95">
                                {{ $t('quit') }}
                            </button>
                        </div>
                    </div>
                </div>

                <div v-else class="py-8 flex flex-col items-center justify-center border border-dashed border-indigo-400/30 rounded-xl bg-indigo-950/30 mt-2">
                    <span class="text-2xl mb-2 opacity-50 grayscale">🕸️</span>
                    <p class="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em]">{{ $t('lab_empty') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>