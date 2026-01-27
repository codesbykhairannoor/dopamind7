<script setup>
import { computed } from 'vue';

const props = defineProps({
    show: Boolean,
    form: Object,
    budgets: Array,
    close: Function,
    submit: Function
});

const availableCategories = computed(() => {
    const defaults = ['food', 'transport', 'bills', 'shopping', 'others'];
    const fromBudgets = props.budgets ? props.budgets.map(b => b.category) : [];
    return [...new Set([...defaults, ...fromBudgets])];
});

// Logic Format Titik Real-time
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
        <div @click="close" class="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"></div>
        
        <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl z-10 p-6 animate-in zoom-in duration-200">
            <h3 class="text-xl font-black text-slate-800 mb-6">✨ Catat Baru</h3>
            
            <form @submit.prevent="submit" class="space-y-4">
                <div class="flex bg-slate-100 p-1 rounded-xl">
                    <button type="button" @click="form.type = 'expense'" class="flex-1 py-2 rounded-lg text-sm font-bold transition" :class="form.type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'">Pengeluaran</button>
                    <button type="button" @click="form.type = 'income'" class="flex-1 py-2 rounded-lg text-sm font-bold transition" :class="form.type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'">Pemasukan</button>
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-500 mb-1">Untuk apa?</label>
                    <input v-model="form.title" type="text" placeholder="Contoh: Nasi Goreng" class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700">
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-500 mb-1">Nominal (Rp)</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                        <input 
                            type="text" 
                            :value="formatDisplay(form.amount)"
                            @input="onInput"
                            placeholder="0" 
                            class="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
                        >
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">Kategori</label>
                        <select v-model="form.category" class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 capitalize text-sm">
                            <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">Tanggal</label>
                        <input v-model="form.date" type="date" class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 text-sm">
                    </div>
                </div>

                <div class="flex gap-3 pt-4">
                    <button type="button" @click="close" class="flex-1 py-3 text-slate-500 font-bold">Batal</button>
                    <button type="submit" class="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</template>