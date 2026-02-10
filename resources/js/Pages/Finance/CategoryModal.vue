<script setup>
import { ref, watch } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import Swal from 'sweetalert2';

const props = defineProps({
    show: Boolean,
    categoryToEdit: Object, 
    close: Function
});

const form = useForm({ name: '', icon: '💰', type: 'income' });
const showIconGrid = ref(false);
const iconPalette = ['💰','💸','🏦','💎','🎥','🎤','🚗','🏠','🎓','🛒','🔧','🎨','🖥️','📱','🪙','💵'];

// Helper Toast
const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

watch(() => props.show, (val) => {
    if (val) {
        showIconGrid.value = false;
        if (props.categoryToEdit) {
            form.name = props.categoryToEdit.name;
            form.icon = props.categoryToEdit.icon;
        } else {
            form.reset();
            form.icon = '💰';
        }
    }
});

const submit = () => {
    const url = props.categoryToEdit 
        ? route('finance.categories.update', props.categoryToEdit.id) 
        : route('finance.categories.store');
    const method = props.categoryToEdit ? 'put' : 'post';

    form[method](url, {
        preserveScroll: true,
        onSuccess: () => { 
            form.reset(); 
            props.close();
            toast.fire({ icon: 'success', title: 'Berhasil disimpan' });
        },
        onError: (errors) => {
            const msg = Object.values(errors)[0] || 'Gagal menyimpan data.';
            Swal.fire({ icon: 'error', title: 'Ups!', text: msg });
        }
    });
};

const handleDelete = () => {
    Swal.fire({
        title: 'Hapus Kategori?',
        text: `Sumber dana "${props.categoryToEdit.name}" akan dihapus permanen.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f43f5e',
        cancelButtonColor: '#cbd5e1',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal',
        reverseButtons: true,
        customClass: {
            popup: 'rounded-[2rem]',
            confirmButton: 'rounded-xl',
            cancelButton: 'rounded-xl'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(route('finance.categories.destroy', props.categoryToEdit.id), {
                preserveScroll: true,
                onSuccess: () => {
                    props.close();
                    toast.fire({ icon: 'success', title: 'Kategori dihapus' });
                },
                onError: (errors) => {
                    const msg = errors.error || 'Gagal menghapus kategori.';
                    Swal.fire({ 
                        icon: 'error', 
                        title: 'Gagal Hapus', 
                        text: msg,
                        confirmButtonColor: '#f43f5e',
                        customClass: { popup: 'rounded-[2rem]', confirmButton: 'rounded-xl' }
                    });
                }
            });
        }
    });
};
</script>

<template>
    <Teleport to="body">
        <div v-if="show" class="fixed inset-0 z-[99] flex items-center justify-center p-4">
            
            <div @click="close" class="absolute inset-0 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-200"></div>
            
            <div class="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl z-10 p-6 animate-in zoom-in-95 duration-200">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-black text-slate-800">
                        {{ categoryToEdit ? '✏️ Edit Sumber Dana' : '✨ Tambah Sumber Dana' }}
                    </h3>
                    
                    <button 
                        v-if="categoryToEdit" 
                        @click="handleDelete" 
                        type="button"
                        class="text-rose-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-full transition-all"
                        title="Hapus Kategori Ini"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                </div>
                
                <form @submit.prevent="submit" class="space-y-5">
                    <div>
                        <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Nama</label>
                        <div class="flex gap-2">
                            <div class="relative">
                                <button type="button" @click="showIconGrid = !showIconGrid" class="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-xl text-2xl border border-slate-100 hover:bg-slate-100 transition active:scale-95">
                                    {{ form.icon }}
                                </button>
                                
                                <div v-if="showIconGrid" class="absolute top-14 left-0 w-64 p-3 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 grid grid-cols-6 gap-2 animate-in fade-in zoom-in-95 duration-100">
                                    <button v-for="icon in iconPalette" :key="icon" type="button" @click="form.icon = icon; showIconGrid = false" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-emerald-50 text-lg transition">
                                        {{ icon }}
                                    </button>
                                </div>
                                <div v-if="showIconGrid" @click="showIconGrid = false" class="fixed inset-0 z-40"></div>
                            </div>

                            <input v-model="form.name" type="text" placeholder="Misal: Gaji" class="flex-1 px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-700" required>
                        </div>
                    </div>

                    <div class="flex gap-2 pt-2">
                        <button type="button" @click="close" class="flex-1 py-3 text-slate-400 font-bold hover:bg-slate-50 hover:text-slate-600 rounded-xl transition">Batal</button>
                        <button type="submit" class="flex-[2] py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 active:scale-95 transition-all" :disabled="form.processing">
                            {{ form.processing ? 'Menyimpan...' : 'Simpan' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>