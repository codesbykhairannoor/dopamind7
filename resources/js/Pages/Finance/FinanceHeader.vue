<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    currentMonth: String,
    stats: Object, // { income_target, balance, total_income, total_expense }
    onPrev: Function,
    onNext: Function,
    onAddClick: Function,
    onUpdateTarget: Function // Fungsi update gaji
});

const { formatRupiah } = useFinanceFormat();

// --- LOGIC EDIT GAJI ---
const isEditing = ref(false);
const inputRef = ref(null);
const rawSalary = ref(props.stats.income_target || 0);

// Sinkron data kalau bulan berubah
watch(() => props.stats.income_target, (val) => {
    rawSalary.value = val || 0;
});

// Auto focus input
watch(isEditing, (val) => {
    if (val) nextTick(() => inputRef.value?.focus());
});

// Format input (auto titik)
const displaySalary = computed({
    get: () => rawSalary.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    set: (val) => {
        const num = val.replace(/\./g, '').replace(/[^0-9]/g, '');
        rawSalary.value = num === '' ? 0 : parseInt(num);
    }
});

const saveSalary = () => {
    props.onUpdateTarget(rawSalary.value);
    isEditing.value = false;
};
</script>

<template>
    <div class="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 mb-6 -mx-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-2 bg-slate-100 rounded-full p-1">
                <button @click="onPrev" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition">←</button>
                <span class="px-4 text-xs font-bold uppercase tracking-widest text-slate-600">{{ currentMonth }}</span>
                <button @click="onNext" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition">→</button>
            </div>
            <button @click="onAddClick" class="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-lg hover:bg-indigo-700 transition">
                + Catat Transaksi
            </button>
        </div>
    </div>

    <div class="mb-6 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">💼</div>
            <div>
                <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Gaji / Modal Bulan Ini</p>
                
                <div v-if="!isEditing" @click="isEditing = true" class="group cursor-pointer flex items-center gap-2">
                    <h4 class="text-xl font-black text-indigo-900">{{ formatRupiah(stats.income_target) }}</h4>
                    <span class="opacity-0 group-hover:opacity-100 text-[10px] bg-white px-2 py-0.5 rounded border border-indigo-100 text-indigo-500 font-bold transition">EDIT</span>
                </div>

                <div v-else class="flex items-center gap-2">
                    <span class="text-indigo-400 font-bold">Rp</span>
                    <input 
                        ref="inputRef"
                        v-model="displaySalary" 
                        type="text" 
                        class="w-32 bg-white border-2 border-indigo-300 rounded-lg px-2 py-1 text-sm font-bold text-indigo-900 focus:outline-none focus:border-indigo-600"
                        @keyup.enter="saveSalary"
                        @blur="saveSalary"
                    >
                    <button @click="saveSalary" class="text-xs bg-indigo-600 text-white px-2 py-1.5 rounded-md font-bold">OK</button>
                </div>
            </div>
        </div>
        <div class="text-right hidden sm:block">
            <p class="text-[10px] text-indigo-400 font-bold">Info</p>
            <p class="text-xs text-indigo-800 font-medium">Angka ini akan menjadi saldo awalmu.</p>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        <div class="col-span-1 md:col-span-3 lg:col-span-1 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-xl">
            <p class="font-bold text-xs uppercase tracking-widest opacity-80 mb-1">Sisa Saldo Aktual</p>
            <h3 class="text-4xl font-black">{{ formatRupiah(stats.balance) }}</h3>
            <p class="text-[10px] mt-4 opacity-60">*Hasil dari (Gaji + Masuk) - Keluar</p>
        </div>

        <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Pemasukan Tambahan</p>
            <div class="flex justify-between items-center">
                <h3 class="text-2xl font-black text-slate-800">{{ formatRupiah(stats.total_income) }}</h3>
                <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">↓</div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Pengeluaran</p>
            <div class="flex justify-between items-center">
                <h3 class="text-2xl font-black text-slate-800">{{ formatRupiah(stats.total_expense) }}</h3>
                <div class="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">↑</div>
            </div>
        </div>

    </div>
</template>