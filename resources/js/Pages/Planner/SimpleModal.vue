<script setup>
import Modal from '@/Components/Modal.vue'; 
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';

defineProps({
    show: Boolean,
    form: Object,
    close: Function,
    submit: Function,
    remove: Function,
    isEditing: Boolean
});

// Helper untuk visual warna pilihan
const getTypeClass = (type) => {
    if (type === 1) return 'bg-blue-100 border-blue-500 text-blue-700';
    if (type === 2) return 'bg-emerald-100 border-emerald-500 text-emerald-700';
    if (type === 3) return 'bg-rose-100 border-rose-500 text-rose-700';
    return 'bg-slate-100 border-slate-300';
};
</script>

<template>
    <Modal :show="show" @close="close" maxWidth="md">
        <div class="p-6">
            <h2 class="text-lg font-black text-slate-800 mb-5 flex items-center gap-2">
                {{ isEditing ? '✏️ Edit Tugas' : '✨ Tugas Cepat' }}
            </h2>
            
            <div class="space-y-5">
                <div>
                    <InputLabel value="Nama Tugas" />
                    <TextInput 
                        v-model="form.title" 
                        class="w-full text-lg font-bold placeholder-slate-300" 
                        placeholder="Contoh: Beli Kopi..." 
                        autofocus 
                        @keyup.enter="submit"
                    />
                </div>

                <div>
                    <InputLabel value="Label Warna" class="mb-2" />
                    <div class="flex gap-3">
                        <label class="cursor-pointer">
                            <input type="radio" v-model="form.type" :value="1" class="hidden peer">
                            <div class="w-10 h-10 rounded-full bg-blue-100 border-2 border-transparent peer-checked:border-blue-600 peer-checked:scale-110 flex items-center justify-center transition hover:bg-blue-200">
                                💼
                            </div>
                        </label>

                        <label class="cursor-pointer">
                            <input type="radio" v-model="form.type" :value="2" class="hidden peer">
                            <div class="w-10 h-10 rounded-full bg-emerald-100 border-2 border-transparent peer-checked:border-emerald-600 peer-checked:scale-110 flex items-center justify-center transition hover:bg-emerald-200">
                                🧘
                            </div>
                        </label>

                        <label class="cursor-pointer">
                            <input type="radio" v-model="form.type" :value="3" class="hidden peer">
                            <div class="w-10 h-10 rounded-full bg-rose-100 border-2 border-transparent peer-checked:border-rose-600 peer-checked:scale-110 flex items-center justify-center transition hover:bg-rose-200">
                                🔥
                            </div>
                        </label>
                    </div>
                </div>

                <div class="flex justify-between items-center pt-4 border-t border-slate-50 mt-4">
                    <button 
                        v-if="isEditing" 
                        @click="remove(form.id)" 
                        type="button" 
                        class="text-rose-500 font-bold text-xs hover:bg-rose-50 px-3 py-2 rounded-lg transition"
                    >
                        🗑️ Hapus
                    </button>
                    <div v-else></div>

                    <div class="flex gap-2">
                        <SecondaryButton @click="close">Batal</SecondaryButton>
                        <PrimaryButton @click="submit" :disabled="form.processing">
                            {{ isEditing ? 'Update' : 'Simpan' }}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>