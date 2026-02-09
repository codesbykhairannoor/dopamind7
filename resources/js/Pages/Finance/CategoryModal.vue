<script setup>
import { ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';

const props = defineProps({
    show: Boolean,
    categoryToEdit: Object, 
    close: Function
});

const form = useForm({ name: '', icon: '💰', type: 'income' });
const showIconGrid = ref(false);
const iconPalette = ['💰','💸','🏦','💎','🎥','🎤','🚗','🏠','🎓','🛒','🔧','🎨','🖥️','📱','🪙','💵'];

watch(() => props.show, (val) => {
    if (val) {
        showIconGrid.value = false;
        if (props.categoryToEdit) {
            form.name = props.categoryToEdit.name;
            form.icon = props.categoryToEdit.icon;
        } else {
            form.reset();
        }
    }
});

const submit = () => {
    const url = props.categoryToEdit 
        ? route('finance.categories.update', props.categoryToEdit.id) 
        : route('finance.categories.store');
    const method = props.categoryToEdit ? 'put' : 'post';

    form[method](url, {
        onSuccess: () => { form.reset(); props.close(); },
        onError: () => alert('Gagal simpan kategori')
    });
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-[99] flex items-center justify-center p-4">
        <div @click="close" class="absolute inset-0 bg-slate-900/40 backdrop-blur-md"></div>
        <div class="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl z-10 p-6 animate-in zoom-in-95">
            <h3 class="text-xl font-black text-slate-800 mb-6">{{ categoryToEdit ? '✏️ Edit Sumber Dana' : '✨ Tambah Sumber Dana' }}</h3>
            <form @submit.prevent="submit" class="space-y-5">
                <div>
                    <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Nama</label>
                    <div class="flex gap-2">
                        <div class="relative">
                            <button type="button" @click="showIconGrid = !showIconGrid" class="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-xl text-2xl border border-slate-100">{{ form.icon }}</button>
                            <div v-if="showIconGrid" class="absolute top-14 left-0 w-64 p-3 bg-white rounded-2xl shadow-xl z-50 grid grid-cols-6 gap-2">
                                <button v-for="icon in iconPalette" :key="icon" type="button" @click="form.icon = icon; showIconGrid = false" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-emerald-50 text-lg">{{ icon }}</button>
                            </div>
                            <div v-if="showIconGrid" @click="showIconGrid = false" class="fixed inset-0 z-40"></div>
                        </div>
                        <input v-model="form.name" type="text" placeholder="Misal: Gaji" class="flex-1 px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-700" required>
                    </div>
                </div>
                <div class="flex gap-2 pt-2">
                    <button type="button" @click="close" class="flex-1 py-3 text-slate-400 font-bold hover:bg-slate-50 rounded-xl">Batal</button>
                    <button type="submit" class="flex-[2] py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg" :disabled="form.processing">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</template>