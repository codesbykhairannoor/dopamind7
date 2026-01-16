<script setup>
import Modal from '@/Components/Modal.vue'; 
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';

defineProps({
    show: Boolean,
    form: Object,
    isEditing: Boolean,
    close: Function,
    submit: Function,
    remove: Function
});
</script>

<template>
    <Modal :show="show" @close="close">
        <div class="p-6 bg-white rounded-2xl">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-black text-slate-800 flex items-center gap-2">
                    {{ isEditing ? '✏️ Edit Rencana' : '✨ Rencana Baru' }}
                </h2>
                <button @click="close" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-500 transition font-bold">✕</button>
            </div>
            
            <div class="space-y-5">
                <div>
                    <InputLabel value="Nama Kegiatan" />
                    <TextInput v-model="form.title" class="w-full text-lg font-medium" placeholder="Contoh: Belajar Coding..." autofocus />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel value="Jam Mulai" />
                        <input 
                            type="time" 
                            v-model="form.start_time"
                            class="w-full border-slate-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-bold text-slate-700"
                        />
                    </div>
                    <div>
                        <InputLabel value="Jam Selesai (Opsional)" />
                        <input 
                            type="time" 
                            v-model="form.end_time"
                            class="w-full border-slate-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-bold text-slate-700"
                        />
                    </div>
                </div>

                <div>
                    <InputLabel value="Prioritas / Kategori" />
                    <div class="grid grid-cols-3 gap-3 mt-1">
                        <label class="cursor-pointer">
                            <input type="radio" v-model="form.type" :value="1" class="hidden peer">
                            <div class="py-3 px-2 text-center rounded-xl border-2 border-slate-100 text-slate-500 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 font-bold text-sm transition">
                                💼 Work
                            </div>
                        </label>
                        <label class="cursor-pointer">
                            <input type="radio" v-model="form.type" :value="2" class="hidden peer">
                            <div class="py-3 px-2 text-center rounded-xl border-2 border-slate-100 text-slate-500 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 font-bold text-sm transition">
                                🧘 Normal
                            </div>
                        </label>
                        <label class="cursor-pointer">
                            <input type="radio" v-model="form.type" :value="3" class="hidden peer">
                            <div class="py-3 px-2 text-center rounded-xl border-2 border-slate-100 text-slate-500 peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-700 font-bold text-sm transition">
                                🔥 Urgent
                            </div>
                        </label>
                    </div>
                </div>

                <div>
                    <InputLabel value="Catatan / Notes" />
                    <textarea 
                        v-model="form.notes" 
                        class="w-full border-slate-300 rounded-xl shadow-sm h-24 focus:border-indigo-500 focus:ring-indigo-500 resize-none p-3 text-sm"
                        placeholder="Detail tambahan..."
                    ></textarea>
                </div>

                <div class="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
                    <button 
                        v-if="isEditing" 
                        @click="remove(form.id)" 
                        type="button" 
                        class="text-rose-500 font-bold hover:text-rose-700 text-sm px-2 py-1 rounded hover:bg-rose-50 transition"
                    >
                        🗑️ Hapus
                    </button>
                    <div v-else></div>

                    <div class="flex gap-3">
                        <SecondaryButton @click="close">Batal</SecondaryButton>
                        <PrimaryButton @click="submit" :disabled="form.processing" class="!rounded-xl !py-3 !px-6">
                            {{ isEditing ? 'Simpan Perubahan' : 'Buat Jadwal' }}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>