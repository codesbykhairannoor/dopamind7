<script setup>
import Modal from '@/Components/Modal.vue'; 
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { ref } from 'vue';

const props = defineProps({
    show: Boolean,
    form: Object,
    isEditing: Boolean,
    conflictError: String,
    close: Function,
    submit: Function,
    remove: Function
});

// 🔥 1. WAJIB DITAMBAH: Definisi Emits biar Vue tau ada event ini
const emit = defineEmits(['switch-to-batch']);

// State lokal untuk switch antara tampilan FORM dan tampilan KONFIRMASI HAPUS
const isConfirmingDeletion = ref(false);

const handleClose = () => {
    isConfirmingDeletion.value = false;
    props.close();
};

const requestDelete = () => {
    isConfirmingDeletion.value = true;
};

const cancelDelete = () => {
    isConfirmingDeletion.value = false;
};

const confirmDelete = () => {
    props.remove(props.form.id);
    isConfirmingDeletion.value = false;
};
</script>

<template>
    <Modal :show="show" @close="handleClose">
        <div class="bg-white rounded-2xl relative overflow-hidden transition-all duration-300">
            
            <div v-if="isConfirmingDeletion" class="p-8 text-center animate-in fade-in zoom-in duration-200">
                <div class="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
                
                <h3 class="text-xl font-black text-slate-800 mb-2">Hapus Aktivitas?</h3>
                <p class="text-slate-500 text-sm mb-8 px-4">
                    Apakah kamu yakin ingin menghapus <span class="font-bold text-rose-600">"{{ form.title || 'Aktivitas ini' }}"</span>? Tindakan ini tidak bisa dibatalkan.
                </p>

                <div class="flex gap-3 justify-center">
                    <button @click="cancelDelete" class="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition">
                        {{ $t('btn_cancel') || 'Batal' }}
                    </button>
                    <button @click="confirmDelete" class="px-6 py-2.5 rounded-xl bg-rose-500 text-white font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition transform active:scale-95">
                        {{ $t('btn_delete') || 'Ya, Hapus' }}
                    </button>
                </div>
            </div>

            <div v-else>
                <div v-if="conflictError" class="absolute top-0 left-0 right-0 bg-rose-500 text-white text-xs font-bold px-6 py-2 text-center animate-pulse z-50 shadow-md">
                    {{ conflictError }}
                </div>

                <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center mt-2">
                    <h2 class="text-xl font-black text-slate-800 flex items-center gap-2">
                        <span class="w-2 h-8 bg-indigo-500 rounded-full"></span>
                        {{ isEditing ? $t('modal_title_edit') : $t('modal_title_new') }}
                    </h2>
                    
                    <div class="flex items-center gap-2">
                        <button v-if="!isEditing" 
                            @click="$emit('switch-to-batch')"
                            type="button"
                            class="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 hover:text-indigo-700 transition flex items-center gap-1">
                            ✨ Batch Mode
                        </button>
                        <button @click="handleClose" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-500 transition font-bold">✕</button>
                    </div>
                </div>
                
                <div class="p-6 space-y-5">
                    <div>
                        <InputLabel :value="$t('label_activity')" />
                        <TextInput v-model="form.title" class="w-full text-lg font-medium" :placeholder="$t('placeholder_activity')" autofocus />
                        <div v-if="form.errors?.title" class="text-rose-500 text-xs mt-1">{{ form.errors.title }}</div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel :value="$t('label_start_time')" />
                            <input type="time" v-model="form.start_time"
                                :class="{'!border-rose-500 !bg-rose-50 !text-rose-900': conflictError}"
                                class="w-full border-slate-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-bold text-slate-700 transition-colors" />
                        </div>
                        <div>
                            <InputLabel :value="$t('label_end_time')" />
                            <input type="time" v-model="form.end_time"
                                :class="{'!border-rose-500 !bg-rose-50 !text-rose-900': conflictError}"
                                class="w-full border-slate-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-bold text-slate-700 transition-colors" />
                        </div>
                    </div>

                    <div>
                        <InputLabel :value="$t('label_priority')" />
                        <div class="grid grid-cols-3 gap-3 mt-1">
                            <label v-for="type in [1, 2, 3]" :key="type" class="cursor-pointer">
                                <input type="radio" v-model="form.type" :value="type" class="hidden peer">
                                <div class="py-3 px-2 text-center rounded-xl border-2 border-slate-100 text-slate-500 transition peer-checked:font-bold"
                                    :class="{
                                        'peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-700': type === 1,
                                        'peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-700': type === 2,
                                        'peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700': type === 3,
                                    }">
                                    {{ type === 1 ? $t('priority_urgent') : type === 2 ? $t('priority_work') : $t('priority_normal') }}
                                </div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <InputLabel :value="$t('label_notes')" />
                        <textarea v-model="form.notes" 
                            class="w-full border-slate-300 rounded-xl shadow-sm h-24 focus:border-indigo-500 focus:ring-indigo-500 resize-none p-3 text-sm"
                            :placeholder="$t('placeholder_notes')"></textarea>
                    </div>

                    <div class="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
                        <button v-if="isEditing" @click="requestDelete" type="button" 
                            class="text-rose-500 font-bold hover:text-rose-700 text-sm px-3 py-2 rounded-lg hover:bg-rose-50 transition flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            {{ $t('btn_delete') }}
                        </button>
                        <div v-else></div>

                        <div class="flex gap-3">
                            <SecondaryButton @click="handleClose">{{ $t('btn_cancel') }}</SecondaryButton>
                            <PrimaryButton @click="submit" :disabled="form.processing || conflictError" 
                                :class="[ '!rounded-xl !py-3 !px-6 transition-all', conflictError ? '!bg-slate-300 !cursor-not-allowed' : 'hover:shadow-lg hover:-translate-y-0.5 active:scale-95' ]">
                                {{ isEditing ? $t('btn_save') : $t('btn_create') }}
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </Modal>
</template>