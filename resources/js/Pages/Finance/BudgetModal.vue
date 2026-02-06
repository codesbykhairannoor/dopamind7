<script setup>
import { ref, watch } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import axios from 'axios';

const props = defineProps({
    show: Boolean,
    form: Object, 
    close: Function,
    submit: Function
});

const { saveCustomCategory, getCategoryDetails } = useFinanceFormat();

const customName = ref('');
const customIcon = ref('💸');
const isProcessing = ref(false); 
const showIconGrid = ref(false);
const iconPalette = ['🍔','🛵','⚡','🛍️','🏠','💊','📚','🎮','🍿','✈️','🐶','🔧','💄','⚽','💻','🎁'];

watch(() => props.show, (isOpen) => {
    if (isOpen) {
        showIconGrid.value = false;
        isProcessing.value = false;
        
        if (props.form.category) {
            const details = getCategoryDetails(props.form.category);
            customName.value = details.name || props.form.category;
            customIcon.value = details.icon || '💸';
        } else {
            customName.value = '';
            customIcon.value = '💸';
            props.form.reset();
        }
    }
});

const handleSave = async () => {
    if (!customName.value || isProcessing.value) return;
    isProcessing.value = true;

    try {
        // 1. Sinkronisasi Kategori (Rename atau Create Baru di DB)
        const finalSlug = await saveCustomCategory(
            props.form.category, // old slug
            customName.value, 
            customIcon.value, 
            'expense'
        );

        if (finalSlug) {
            // 2. Pastikan Kategori ini juga terdaftar di tabel finance_categories DB
            // Ini cadangan supaya kategori muncul di dropdown transaksi
            await axios.post(route('finance.categories.store'), {
                name: customName.value,
                type: 'expense',
                icon: customIcon.value
            });

            // 3. Masukkan slug hasil generate ke form budget
            props.form.category = finalSlug;

            // 4. Jalankan submit Inertia (Simpan ke finance_budgets)
            props.submit(); 
        }
    } catch (error) {
        console.error("Proses gagal:", error);
    } finally {
        isProcessing.value = false;
    }
};

const formatDisplay = (val) => val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '';
const onInput = (e) => {
    let value = e.target.value.replace(/\./g, '');
    if (!isNaN(value)) props.form.limit_amount = value;
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="close" class="absolute inset-0 bg-slate-900/30 backdrop-blur-md transition-opacity"></div>
        
        <div class="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl z-10 p-6 animate-in zoom-in-95 duration-200">
            <h3 class="text-xl font-black text-slate-800 mb-6">
                {{ form.id ? '✏️ Edit Budget' : '🎯 Atur Budget Baru' }}
            </h3>
            
            <form @submit.prevent="handleSave" class="space-y-5">
                <div>
                    <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Nama Pengeluaran</label>
                    <div class="flex gap-2">
                        <div class="relative">
                            <button type="button" @click="showIconGrid = !showIconGrid" class="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-xl text-2xl border border-slate-100 hover:bg-slate-100 transition">
                                {{ customIcon }}
                            </button>
                            <div v-if="showIconGrid" class="absolute top-14 left-0 w-64 p-3 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 grid grid-cols-6 gap-2 animate-in fade-in zoom-in-95 duration-100">
                                <button v-for="icon in iconPalette" :key="icon" type="button" @click="customIcon = icon; showIconGrid = false" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-indigo-50 text-lg transition">
                                    {{ icon }}
                                </button>
                            </div>
                            <div v-if="showIconGrid" @click="showIconGrid = false" class="fixed inset-0 z-40"></div>
                        </div>
                        <input v-model="customName" type="text" placeholder="Misal: Jajan" class="flex-1 px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700" required>
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Batas Maksimal</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                        <input type="text" :value="formatDisplay(form.limit_amount)" @input="onInput" placeholder="0" class="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-black text-lg text-slate-700" required>
                    </div>
                </div>

                <div class="flex gap-3 pt-2">
                    <button type="button" @click="close" class="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">Batal</button>
                    <button type="submit" :disabled="isProcessing" class="flex-[2] py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all disabled:opacity-50">
                        {{ isProcessing ? 'Processing...' : 'Simpan' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>