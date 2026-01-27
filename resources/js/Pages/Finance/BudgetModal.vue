<script setup>
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import { useBudgetFormLogic } from '@/Composables/Finance/useBudgetFormLogic';

const props = defineProps({
    show: Boolean,
    form: Object,
    budgets: Array,
    close: Function,
    submit: Function
});

const { getCategoryDetails, formatRupiah } = useFinanceFormat();
const { 
    categories, isAddingNew, newCategoryInput, 
    addNewCategory, toggleNewCategory 
} = useBudgetFormLogic(props);

// Logic Format Titik Real-time
const formatDisplay = (val) => {
    if (!val) return '';
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const onInput = (e) => {
    let value = e.target.value.replace(/\./g, ''); // Buang titiknya pas simpan ke form
    if (!isNaN(value)) props.form.limit_amount = value;
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="close" class="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"></div>
        
        <div class="bg-white w-full max-w-sm rounded-3xl shadow-2xl z-10 p-6 animate-in zoom-in duration-200">
            <h3 class="text-xl font-black text-slate-800 mb-6">
                {{ form.id ? '✏️ Edit Budget' : '🎯 Atur Budget' }}
            </h3>
            
            <form @submit.prevent="submit" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-500 mb-2">Kategori</label>
                    <div class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                        <div v-for="cat in categories" :key="cat" class="relative">
                            <input type="radio" :id="'bud-'+cat" :value="cat" v-model="form.category" class="peer sr-only">
                            <label :for="'bud-'+cat" class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 cursor-pointer peer-checked:bg-indigo-50 peer-checked:border-indigo-500 transition-all">
                                <span class="text-xs font-bold capitalize">
                                    {{ getCategoryDetails(cat).icon }} {{ cat }}
                                </span>
                            </label>
                        </div>
                        <button v-if="!isAddingNew" @click="toggleNewCategory" type="button" class="p-2 rounded-xl border border-dashed border-slate-300 text-xs font-bold text-slate-400 hover:bg-slate-50">+ Baru</button>
                    </div>

                    <div v-if="isAddingNew" class="mt-2 flex gap-2">
                        <input v-model="newCategoryInput" type="text" placeholder="Nama..." class="flex-1 px-3 py-2 text-xs border rounded-lg outline-none" @keyup.enter="addNewCategory">
                        <button @click="addNewCategory" type="button" class="px-3 py-2 bg-indigo-500 text-white text-xs rounded-lg">OK</button>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-500 mb-1">Batas Maksimal (Rp)</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                        <input 
                            type="text" 
                            :value="formatDisplay(form.limit_amount)" 
                            @input="onInput"
                            placeholder="0"
                            class="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500"
                        >
                    </div>
                </div>

                <div class="flex gap-3 pt-4">
                    <button type="button" @click="close" class="flex-1 py-3 text-slate-500 font-bold">Batal</button>
                    <button type="submit" class="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform">
                        {{ form.id ? 'Simpan' : 'Set Budget' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>