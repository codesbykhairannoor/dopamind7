<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    transactions: Array,
    onDelete: Function
});

const { formatRupiah, getCategoryDetails } = useFinanceFormat();

// Logic grouping: { "2026-01-20": [data, data], ... }
const groupedTransactions = computed(() => {
    const groups = {};
    props.transactions.forEach(trx => {
        const date = dayjs(trx.date).locale('id').format('dddd, D MMMM YYYY');
        if (!groups[date]) groups[date] = [];
        groups[date].push(trx);
    });
    return groups;
});
</script>

<template>
    <div class="space-y-6">
        <h3 class="text-lg font-bold text-slate-800">Riwayat Transaksi</h3>

        <div v-if="transactions.length === 0" class="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <span class="text-4xl">🍃</span>
            <p class="text-slate-400 font-medium mt-2">Belum ada transaksi bulan ini</p>
        </div>

        <div v-for="(items, date) in groupedTransactions" :key="date">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">{{ date }}</h4>
            
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
                <div v-for="trx in items" :key="trx.id" class="p-4 flex items-center justify-between hover:bg-slate-50 transition group">
                    <div class="flex items-center gap-4">
                        <div 
                            class="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                            :class="getCategoryDetails(trx.category).bg"
                        >
                            {{ getCategoryDetails(trx.category).icon }}
                        </div>
                        <div>
                            <p class="font-bold text-slate-700">{{ trx.title }}</p>
                            <p class="text-xs text-slate-400 capitalize">{{ trx.category }}</p>
                        </div>
                    </div>

                    <div class="text-right">
                        <p 
                            class="font-bold font-mono"
                            :class="trx.type === 'income' ? 'text-emerald-500' : 'text-slate-800'"
                        >
                            {{ trx.type === 'income' ? '+' : '-' }} {{ formatRupiah(trx.amount) }}
                        </p>
                        <button @click="onDelete(trx.id)" class="text-[10px] text-rose-400 opacity-0 group-hover:opacity-100 hover:underline">
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>