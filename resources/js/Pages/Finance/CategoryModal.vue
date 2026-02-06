<script setup>
import { ref } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    show: Boolean,
    close: Function
});

const { addCustomCategory } = useFinanceFormat();

const form = ref({ name: '', icon: '💰' });
const iconPalette = ['💰','💸','🏦','💎','🎥','🎤','🚗','🏠','🎓','🎮','🛒','💊','🔧','🎨','🖥️','📱','🎸','🧸','🍔','☕'];

const submit = () => {
    if (!form.value.name) return;
    
    // Bikin slug (nama_kategori)
    const slug = form.value.name.toLowerCase().replace(/\s+/g, '_');
    
    // Simpan ke LocalStorage
    addCustomCategory(slug, form.value.name, form.value.icon);
    
    // Trigger event biar komponen lain (Sidebar/Transaction) tau ada data baru
    window.dispatchEvent(new CustomEvent('finance:custom-updated'));
    
    // Reset & Tutup
    form.value.name = '';
    form.value.icon = '💰';
    props.close();
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="close" class="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"></div>
        
        <div class="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl z-10 p-6 animate-in zoom-in-95 duration-200">
            <h3 class="text-lg font-black text-slate-800 mb-4">✨ Tambah Sumber Dana</h3>
            
            <form @submit.prevent="submit" class="space-y-4">
                <div class="flex gap-3">
                    <div class="relative group w-16">
                        <select v-model="form.icon" class="w-full p-3 rounded-xl bg-slate-50 border-none text-center text-2xl appearance-none cursor-pointer focus:ring-2 focus:ring-indigo-500">
                            <option v-for="icon in iconPalette" :key="icon" :value="icon">{{ icon }}</option>
                        </select>
                    </div>
                    <input v-model="form.name" type="text" placeholder="Nama (mis: Jualan Kue)" 
                        class="flex-1 px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
                        autoFocus
                    >
                </div>

                <div class="flex gap-2 pt-2">
                    <button type="button" @click="close" class="flex-1 py-3 text-slate-400 font-bold hover:text-slate-600">Batal</button>
                    <button type="submit" class="flex-[2] py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</template>