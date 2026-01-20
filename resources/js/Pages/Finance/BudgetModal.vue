<script setup>
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    show: Boolean,
    form: Object,
    close: Function,
    submit: Function
});

const { getCategoryDetails } = useFinanceFormat();

// List Kategori (Manual dulu sesuai DB)
const categories = ['food', 'transport', 'bills', 'shopping', 'others'];
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="close" class="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"></div>
        
        <div class="bg-white w-full max-w-sm rounded-3xl shadow-2xl z-10 p-6 animate-in fade-in zoom-in duration-200">
            <h3 class="text-xl font-black text-slate-800 mb-6">🎯 Atur Budget</h3>
            
            <form @submit.prevent="submit" class="space-y-4">
                
                <div>
                    <label class="block text-xs font-bold text-slate-500 mb-1">Kategori</label>
                    <div class="grid grid-cols-2 gap-2">
                        <div v-for="cat in categories" :key="cat" class="relative">
                            <input 
                                type="radio" 
                                :id="cat" 
                                :value="cat" 
                                v-model="form.category" 
                                class="peer sr-only"
                            >
                            <label 
                                :for="cat"
                                class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:text-indigo-700 transition-all"
                            >
                                <span>{{ getCategoryDetails(cat).icon }}</span>
                                <span class="text-xs font-bold capitalize">{{ cat }}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-500 mb-1">Batas Maksimal (Rp)</label>
                    <input 
                        v-model="form.limit_amount" 
                        type="number" 
                        placeholder="Contoh: 2000000" 
                        class="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
                    >
                </div>

                <div class="flex gap-3 pt-4">
                    <button type="button" @click="close" class="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">Batal</button>
                    <button type="submit" class="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</template>