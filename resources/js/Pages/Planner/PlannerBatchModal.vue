<script setup>
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';

const props = defineProps({
    show: Boolean,        
    form: Object, 
    conflictError: String, // 🔥 Menerima pesan error dari parent logic
    close: Function,
    submit: Function,
    addRow: Function,
    removeRow: Function,
    switchToSingle: Function
});
</script>

<template>
    <Modal :show="show" @close="close">
        <div class="bg-white rounded-2xl flex flex-col max-h-[85vh] relative overflow-hidden transition-all duration-300">
            
            <div v-if="conflictError" class="absolute top-0 left-0 right-0 bg-rose-500 text-white text-xs font-bold px-6 py-3 text-center animate-in slide-in-from-top-2 z-50 shadow-md flex items-center justify-center gap-2">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                <span>{{ conflictError }}</span>
            </div>

            <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0 z-20" :class="{'mt-10': conflictError}">
                <h2 class="text-xl font-black text-slate-800 flex items-center gap-2">
                    <span class="w-2 h-8 rounded-full bg-emerald-500"></span>
                    {{ $t('batch_mode_title') }}
                </h2>
                
                <div class="flex items-center gap-2">
                    <button @click="switchToSingle" 
                        type="button"
                        class="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition flex items-center gap-1">
                        ↩️ {{ $t('btn_single_mode') }}
                    </button>
                    <button @click="close" class="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-rose-100 hover:text-rose-500 transition font-bold flex items-center justify-center">
                        ✕
                    </button>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar bg-white p-6">
                
                <div class="grid grid-cols-12 gap-2 mb-2 px-1 text-[10px] font-black text-slate-400 uppercase tracking-widest sticky top-0 bg-white z-10 py-2 border-b border-slate-50">
                    <div class="col-span-5 pl-1">{{ $t('col_activity') }} <span class="text-rose-500">*</span></div>
                    <div class="col-span-2 text-center">{{ $t('col_start') }}</div>
                    <div class="col-span-2 text-center">{{ $t('col_end') }}</div>
                    <div class="col-span-2">{{ $t('col_priority') }}</div>
                    <div class="col-span-1"></div>
                </div>

                <div class="space-y-3 mt-2">
                    <div v-for="(task, index) in form.tasks" :key="index" 
                        class="grid grid-cols-12 gap-2 items-start animate-in fade-in slide-in-from-bottom-2 duration-300 group">
                        
                        <div class="col-span-5">
                            <TextInput 
                                v-model="task.title" 
                                :placeholder="$t('placeholder_activity')" 
                                class="w-full text-sm py-2 px-3 !rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 transition-shadow" 
                                :class="{'!border-rose-300 !bg-rose-50': form.errors[`tasks.${index}.title`]}"
                            />
                        </div>

                        <div class="col-span-2">
                            <input 
                                type="time" 
                                v-model="task.start_time" 
                                class="w-full border-slate-200 rounded-xl text-sm py-2 px-1 text-center font-bold text-slate-600 focus:border-emerald-500 focus:ring-emerald-500 cursor-pointer hover:bg-slate-50 transition-colors" 
                                :class="{'!border-rose-500 !bg-rose-100 !text-rose-700': form.errors[`tasks.${index}.start_time`]}"
                            />
                        </div>

                        <div class="col-span-2">
                            <input 
                                type="time" 
                                v-model="task.end_time" 
                                class="w-full border-slate-200 rounded-xl text-sm py-2 px-1 text-center font-bold text-slate-600 focus:border-emerald-500 focus:ring-emerald-500 cursor-pointer hover:bg-slate-50 transition-colors" 
                                :class="{'!border-rose-500 !bg-rose-100 !text-rose-700': form.errors[`tasks.${index}.end_time`]}"
                            />
                        </div>

                        <div class="col-span-2">
                            <div class="relative">
                                <select v-model="task.type" class="w-full border-slate-200 rounded-xl text-xs py-2.5 pl-2 pr-5 font-bold text-slate-600 focus:border-emerald-500 focus:ring-emerald-500 appearance-none cursor-pointer hover:bg-slate-50 transition-colors"
                                    :class="{
                                        'text-rose-600 bg-rose-50 border-rose-100': task.type == 1,
                                        'text-indigo-600 bg-indigo-50 border-indigo-100': task.type == 2,
                                        'text-emerald-600 bg-emerald-50 border-emerald-100': task.type == 3
                                    }">
                                    <option :value="1">{{ $t('prio_urgent') }}</option>
                                    <option :value="2">{{ $t('prio_work') }}</option>
                                    <option :value="3">{{ $t('prio_normal') }}</option>
                                </select>
                                <div class="absolute inset-y-0 right-1 flex items-center pointer-events-none text-slate-400 text-[10px]">▼</div>
                            </div>
                        </div>

                        <div class="col-span-1 flex justify-center pt-1">
                            <button @click="removeRow(index)" type="button" 
                                class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition opacity-0 group-hover:opacity-100"
                                :disabled="form.tasks.length <= 1"
                                :class="{'!opacity-0 pointer-events-none': form.tasks.length <= 1}">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <button @click="addRow" type="button" class="mt-6 w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition flex items-center justify-center gap-2 group">
                    <span class="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs group-hover:bg-emerald-200 group-hover:text-emerald-700 transition">+</span> 
                    {{ $t('btn_add_another') }}
                </button>
            </div>

            <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0">
                <div class="text-xs text-slate-400 font-medium">
                    {{ $t('total_label') }} <span class="text-slate-800 font-bold">{{ form.tasks.length }}</span> {{ $t('total_suffix') }}
                </div>
                <div class="flex gap-3">
                    <SecondaryButton @click="close">{{ $t('btn_cancel') }}</SecondaryButton>
                    
                    <PrimaryButton @click="submit" :disabled="form.processing || conflictError" 
                        class="!bg-emerald-500 hover:!bg-emerald-600 !rounded-xl !py-2.5 !px-6 shadow-lg shadow-emerald-200 transition-all transform active:scale-95"
                        :class="{'!bg-slate-300 !text-slate-500 !cursor-not-allowed !shadow-none !transform-none': conflictError}">
                        <span v-if="form.processing">{{ $t('btn_saving') }}</span>
                        <span v-else>{{ $t('btn_save_all') }}</span>
                    </PrimaryButton>
                </div>
            </div>
            
        </div>
    </Modal>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
</style>