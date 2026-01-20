<script setup>
import Modal from '@/Components/Modal.vue'; 
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
defineProps({
    show: Boolean,
    form: Object,
    isEditing: Boolean,
    conflictError: String,
    close: Function,
    submit: Function,
    remove: Function
});
</script>

<template>
    <Modal :show="show" @close="close">
        <div class="p-6 bg-white rounded-2xl relative overflow-hidden transition-all">
            
            <div v-if="conflictError" class="absolute top-0 left-0 right-0 bg-rose-500 text-white text-xs font-bold px-6 py-2 text-center animate-pulse z-50 shadow-md">
                {{ conflictError }}
            </div>

            <div class="flex justify-between items-center mb-6 mt-2">
                <h2 class="text-xl font-black text-slate-800 flex items-center gap-2">
                    {{ isEditing ? $t('modal_title_edit') : $t('modal_title_new') }}
                </h2>
                <button @click="close" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-500 transition font-bold">✕</button>
            </div>
            
            <div class="space-y-5">
                <div>
                    <InputLabel :value="$t('label_activity')" />
                    <TextInput v-model="form.title" class="w-full text-lg font-medium" :placeholder="$t('placeholder_activity')" autofocus />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel :value="$t('label_start_time')" />
                        <input 
                            type="time" 
                            v-model="form.start_time"
                            :class="{'!border-rose-500 !bg-rose-50 !text-rose-900': conflictError}"
                            class="w-full border-slate-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-bold text-slate-700 transition-colors"
                        />
                    </div>
                    <div>
                        <InputLabel :value="$t('label_end_time')" />
                        <input 
                            type="time" 
                            v-model="form.end_time"
                            :class="{'!border-rose-500 !bg-rose-50 !text-rose-900': conflictError}"
                            class="w-full border-slate-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-bold text-slate-700 transition-colors"
                        />
                    </div>
                </div>

                <p v-if="conflictError" class="text-rose-500 text-xs font-bold mt-[-10px] flex items-center gap-1">
                    {{ $t('error_conflict') }}
                </p>

                <div>
                    <InputLabel :value="$t('label_priority')" />
                    <div class="grid grid-cols-3 gap-3 mt-1">
                        <label class="cursor-pointer">
                            <input type="radio" v-model="form.type" :value="1" class="hidden peer">
                            <div class="py-3 px-2 text-center rounded-xl border-2 border-slate-100 text-slate-500 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 font-bold text-sm transition">
                                {{ $t('priority_work') }}
                            </div>
                        </label>
                        <label class="cursor-pointer">
                            <input type="radio" v-model="form.type" :value="2" class="hidden peer">
                            <div class="py-3 px-2 text-center rounded-xl border-2 border-slate-100 text-slate-500 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 font-bold text-sm transition">
                                {{ $t('priority_normal') }}
                            </div>
                        </label>
                        <label class="cursor-pointer">
                            <input type="radio" v-model="form.type" :value="3" class="hidden peer">
                            <div class="py-3 px-2 text-center rounded-xl border-2 border-slate-100 text-slate-500 peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-700 font-bold text-sm transition">
                                {{ $t('priority_urgent') }}
                            </div>
                        </label>
                    </div>
                </div>

                <div>
                    <InputLabel :value="$t('label_notes')" />
                    <textarea 
                        v-model="form.notes" 
                        class="w-full border-slate-300 rounded-xl shadow-sm h-24 focus:border-indigo-500 focus:ring-indigo-500 resize-none p-3 text-sm"
                        :placeholder="$t('placeholder_notes')"
                    ></textarea>
                </div>

                <div class="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
                    <button 
                        v-if="isEditing" 
                        @click="remove(form.id)" 
                        type="button" 
                        class="text-rose-500 font-bold hover:text-rose-700 text-sm px-2 py-1 rounded hover:bg-rose-50 transition"
                    >
                        {{ $t('btn_delete') }}
                    </button>
                    <div v-else></div>

                    <div class="flex gap-3">
                        <SecondaryButton @click="close">{{ $t('btn_cancel') }}</SecondaryButton>
                        
                        <PrimaryButton 
                            @click="submit" 
                            :disabled="form.processing || conflictError" 
                            :class="[
                                '!rounded-xl !py-3 !px-6 transition-all',
                                conflictError 
                                    ? '!bg-slate-300 !cursor-not-allowed hover:!bg-slate-300 ring-0' 
                                    : 'hover:shadow-lg hover:-translate-y-0.5'
                            ]"
                        >
                            {{ isEditing ? $t('btn_save') : $t('btn_create') }}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>