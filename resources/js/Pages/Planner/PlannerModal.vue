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
        <div class="bg-white rounded-2xl relative overflow-hidden transition-all duration-300 border border-slate-100 shadow-2xl">
            
            <div v-if="isConfirmingDeletion" class="p-8 text-center animate-in fade-in zoom-in duration-200">
                <div class="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
               <h3 class="text-xl font-black text-slate-800 mb-2">
    {{ $t('delete_activity_title') }}
</h3>
<p class="text-slate-500 text-sm mb-8 px-4 font-medium leading-relaxed">
    {{ $t('delete_activity_desc', { title: form.title || $t('default_activity_name') }) }}
</p>
                <div class="flex gap-3 justify-center">
                    <button @click="cancelDelete" class="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-400 font-bold hover:bg-slate-50 transition active:scale-95">
                        {{ $t('btn_cancel') }}
                    </button>
                    <button @click="confirmDelete" class="px-6 py-2.5 rounded-xl bg-rose-500 text-white font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition transform active:scale-95">
                        {{ $t('btn_delete') }}
                    </button>
                </div>
            </div>

            <div v-else>
                <div v-if="conflictError" class="absolute top-0 left-0 right-0 bg-rose-500 text-white text-[10px] font-black px-6 py-2.5 text-center animate-in slide-in-from-top-full z-50 shadow-md flex items-center justify-center gap-2 uppercase">
                    <svg class="w-4 h-4 shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    <span>{{ conflictError }}</span>
                </div>

                <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center mt-1" :class="{'mt-10': conflictError}">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg shadow-indigo-100">
                            ✨
                        </div>
                        <div>
                            <h2 class="text-lg font-black text-slate-800 tracking-tight leading-none mb-1">
                                {{ isEditing ? $t('modal_title_edit') : $t('modal_title_new') }}
                            </h2>
                            <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{{ $t('modal_new_simple_title') }}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <button v-if="!isEditing" @click="$emit('switch-to-batch')" type="button" 
                            class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition flex items-center gap-1 active:scale-95">
                            Batch
                        </button>
                        <button @click="handleClose" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-500 transition font-bold">✕</button>
                    </div>
                </div>
                
                <div class="p-6 space-y-5 bg-white">
                    <div>
                        <InputLabel :value="$t('label_activity')" class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1" />
                        <TextInput 
                            v-model="form.title" 
                            class="w-full text-sm font-bold py-3 px-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 transition-all bg-white" 
                            :placeholder="$t('placeholder_activity')" 
                            autofocus 
                        />
                        <div v-if="form.errors?.title" class="text-rose-500 text-[10px] font-black mt-1 uppercase tracking-wide ml-1">{{ form.errors.title }}</div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel :value="$t('label_start_time')" class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1" />
                            <input type="time" v-model="form.start_time"
                                class="w-full border-2 border-slate-200 rounded-xl py-2.5 px-4 font-black text-slate-700 focus:border-indigo-500 focus:ring-0 transition-all cursor-pointer" />
                        </div>
                        <div>
                            <InputLabel :value="$t('label_end_time')" class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1" />
                            <input type="time" v-model="form.end_time"
                                class="w-full border-2 border-slate-200 rounded-xl py-2.5 px-4 font-black text-slate-700 focus:border-indigo-500 focus:ring-0 transition-all cursor-pointer" />
                        </div>
                    </div>

                    <div>
                        <InputLabel :value="$t('label_priority')" class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1" />
                        <div class="grid grid-cols-3 gap-3">
                            <label v-for="type in [1, 2, 3]" :key="type" class="cursor-pointer group">
                                <input type="radio" v-model="form.type" :value="type" class="hidden peer">
                                <div class="py-3 px-1 text-center rounded-xl border-2 border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all peer-checked:shadow-sm"
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
                        <InputLabel :value="$t('label_notes')" class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1" />
                        <textarea v-model="form.notes" 
                            class="w-full border-2 border-slate-200 rounded-xl h-24 focus:border-indigo-500 focus:ring-0 resize-none p-4 text-sm font-medium text-slate-600 bg-white"
                            :placeholder="$t('placeholder_notes')"></textarea>
                    </div>

                    <div class="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                        <button v-if="isEditing" @click="requestDelete" type="button" 
                            class="text-rose-400 font-black text-[10px] uppercase tracking-widest hover:text-rose-600 transition px-2 flex items-center gap-1 active:scale-95">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            {{ $t('btn_delete') }}
                        </button>
                        <div v-else></div>

                        <div class="flex gap-3">
                            <SecondaryButton @click="handleClose" class="!rounded-xl !py-2.5 !px-6 !text-xs !font-black !uppercase !tracking-widest">{{ $t('btn_cancel') }}</SecondaryButton>
                            <PrimaryButton @click="submit" :disabled="form.processing || conflictError" 
                                class="!bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-2.5 !px-8 shadow-xl shadow-indigo-100 font-black uppercase tracking-widest text-xs transition-all active:scale-95"
                                :class="{'!bg-slate-300 !cursor-not-allowed !shadow-none': conflictError}">
                                {{ isEditing ? $t('btn_save') : $t('btn_create') }}
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </Modal>
</template>