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
</script>

<template>
    <Modal :show="show" @close="close" maxWidth="sm">
        <div class="p-6 bg-white rounded-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

            <div class="flex justify-between items-center mb-6 relative z-10">
                <h2 class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <span v-if="isEditing" class="text-indigo-600">✏️</span>
                    <span v-else class="text-indigo-600">✨</span>
                    {{ isEditing ? $t('modal_edit_simple_title') : $t('modal_new_simple_title') }}
                </h2>
                <button @click="close" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">
                    ✕
                </button>
            </div>
            
            <form @submit.prevent="submit" class="space-y-6 relative z-10">
                <div>
                    <InputLabel :value="$t('modal_label_task_name')" class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2" />
                    <TextInput 
                        v-model="form.title" 
                        class="w-full text-lg font-bold placeholder-slate-300 border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 rounded-xl px-4 py-3 transition-all shadow-sm" 
                        :placeholder="$t('modal_placeholder_simple_task')" 
                        autofocus 
                    />
                </div>

                <div>
                    <InputLabel :value="$t('modal_label_priority')" class="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400" />
                    <div class="grid grid-cols-1 gap-3">
                        
                        <label class="cursor-pointer group relative">
                            <input type="radio" v-model="form.type" :value="1" class="hidden peer">
                            <div class="p-3 rounded-xl border-2 border-slate-100 bg-white peer-checked:border-rose-500 peer-checked:bg-rose-50/50 flex items-center gap-4 transition-all hover:border-rose-200">
                                <div class="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-lg shadow-sm">
                                    🔥
                                </div>
                                <div class="flex-1">
                                    <div class="font-bold text-slate-700 peer-checked:text-rose-700">{{ $t('prio_important') }}</div>
                                    <div class="text-[10px] text-slate-400 font-medium">{{ $t('prio_important_desc') }}</div>
                                </div>
                                <div class="w-5 h-5 rounded-full border-2 border-slate-200 peer-checked:border-rose-500 peer-checked:bg-rose-500 transition-all"></div>
                            </div>
                        </label>

                        <label class="cursor-pointer group relative">
                            <input type="radio" v-model="form.type" :value="2" class="hidden peer">
                            <div class="p-3 rounded-xl border-2 border-slate-100 bg-white peer-checked:border-indigo-500 peer-checked:bg-indigo-50/50 flex items-center gap-4 transition-all hover:border-indigo-200">
                                <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg shadow-sm">
                                    ⚡
                                </div>
                                <div class="flex-1">
                                    <div class="font-bold text-slate-700 peer-checked:text-indigo-700">{{ $t('prio_normal') }}</div>
                                    <div class="text-[10px] text-slate-400 font-medium">{{ $t('prio_normal_desc') }}</div>
                                </div>
                                <div class="w-5 h-5 rounded-full border-2 border-slate-200 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 transition-all"></div>
                            </div>
                        </label>

                        <label class="cursor-pointer group relative">
                            <input type="radio" v-model="form.type" :value="3" class="hidden peer">
                            <div class="p-3 rounded-xl border-2 border-slate-100 bg-white peer-checked:border-slate-500 peer-checked:bg-slate-50 flex items-center gap-4 transition-all hover:border-slate-300">
                                <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-lg shadow-sm">
                                    ☕
                                </div>
                                <div class="flex-1">
                                    <div class="font-bold text-slate-700 peer-checked:text-slate-700">{{ $t('prio_optional') }}</div>
                                    <div class="text-[10px] text-slate-400 font-medium">{{ $t('prio_optional_desc') }}</div>
                                </div>
                                <div class="w-5 h-5 rounded-full border-2 border-slate-200 peer-checked:border-slate-500 peer-checked:bg-slate-500 transition-all"></div>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="flex justify-between items-center pt-4 border-t border-slate-100">
                    <button 
                        v-if="isEditing" 
                        @click="remove(form.id)" 
                        type="button" 
                        class="text-rose-500 font-bold text-xs hover:bg-rose-50 px-3 py-2 rounded-lg transition flex items-center gap-1"
                    >
                        🗑️ {{ $t('btn_delete') }}
                    </button>
                    <div v-else></div>

                    <div class="flex gap-3">
                        <SecondaryButton @click="close" class="border-none shadow-none text-slate-400 hover:text-slate-600">
                            {{ $t('btn_cancel') }}
                        </SecondaryButton>
                        <PrimaryButton 
                            @click="submit" 
                            :disabled="form.processing" 
                            class="bg-indigo-600 hover:bg-indigo-700 px-6 rounded-xl shadow-lg shadow-indigo-200"
                        >
                            {{ isEditing ? $t('btn_update') : $t('btn_add_task') }}
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    </Modal>
</template>