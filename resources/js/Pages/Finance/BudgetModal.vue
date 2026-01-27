<script setup>
import { ref, computed } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    show: Boolean,
    form: Object,
    budgets: Array, // Ambil budget yang ada buat list kategori
    close: Function,
    submit: Function
});

const { getCategoryDetails } = useFinanceFormat();
const isAddingNew = ref(false);
const newCategoryInput = ref('');

// Ambil kategori unik dari budget yang sudah ada + default
const categories = computed(() => {
    const defaults = ['food', 'transport', 'bills', 'shopping', 'others'];
    const fromBudgets = props.budgets.map(b => b.category);
    return [...new Set([...defaults, ...fromBudgets])];
});

const addNewCategory = () => {
    if (newCategoryInput.value.trim()) {
        const slug = newCategoryInput.value.toLowerCase().replace(/\s+/g, '_');
        props.form.category = slug;
        isAddingNew.value = false;
        newCategoryInput.value = '';
    }
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="close" class="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"></div>
        
        <div class="bg-white w-full max-w-sm rounded-3xl shadow-2xl z-10 p-6 animate-in zoom-in duration-200">
            <h3 class="text-xl font-black text-slate-800 mb-6">🎯 Atur Budget</h3>
            
            <form @submit.prevent="submit" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-500 mb-2">Pilih atau Tambah Kategori</label>
                    <div class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                        <div v-for="cat in categories" :key="cat" class="relative">
                            <input type="radio" :id="'bud-'+cat" :value="cat" v-model="form.category" class="peer sr-only">
                            <label :for="'bud-'+cat" class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 cursor-pointer peer-checked:bg-indigo-50 peer-checked:border-indigo-500 transition-all">
                                <span class="text-xs font-bold capitalize">{{ getCategoryDetails(cat).icon }} {{ cat }}</span>
                            </label>
                        </div>
                        
                        <button v-if="!isAddingNew" @click="isAddingNew = true" type="button" class="p-2 rounded-xl border border-dashed border-slate-300 text-xs font-bold text-slate-400 hover:bg-slate-50">
                            + Kategori Baru
                        </button>
                    </div>

                    <div v-if="isAddingNew" class="mt-2 flex gap-2">
                        <input v-model="newCategoryInput" type="text" placeholder="Nama kategori..." class="flex-1 px-3 py-2 text-xs border rounded-lg outline-none focus:ring-1 focus:ring-indigo-500">
                        <button @click="addNewCategory" type="button" class="px-3 py-2 bg-indigo-500 text-white text-xs rounded-lg font-bold">OK</button>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-500 mb-1">Batas Maksimal (Rp)</label>
                    <input v-model="form.limit_amount" type="number" class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none font-bold text-slate-700">
                </div>

                <div class="flex gap-3 pt-4">
                    <button type="button" @click="close" class="flex-1 py-3 text-slate-500 font-bold">Batal</button>
                    <button type="submit" class="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</template>