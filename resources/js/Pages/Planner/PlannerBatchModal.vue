<script setup>
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';

const props = defineProps({
    show: Boolean,         
    form: Object, 
    conflictError: String,
    close: Function,
    submit: Function,
    addRow: Function,
    removeRow: Function,
    switchToSingle: Function
});
</script>

<template>
    <Modal :show="show" @close="close" maxWidth="2xl">
        <div class="bg-white rounded-[2.5rem] flex flex-col max-h-[90vh] relative overflow-hidden transition-all duration-300 border border-slate-100 shadow-2xl">
            
            <div v-if="conflictError" class="absolute top-0 left-0 right-0 bg-rose-500 text-white text-[10px] font-black px-6 py-3.5 text-center animate-in slide-in-from-top-full z-50 shadow-lg flex items-center justify-center gap-2 uppercase tracking-[0.1em]">
                <svg class="w-4 h-4 shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                <span>{{ conflictError }}</span>
            </div>

            <div class="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white shrink-0 z-20" :class="{'mt-12': conflictError}">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg shadow-indigo-100">
                        ✨
                    </div>
                    <div>
                        <h2 class="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">
                            {{ $t('batch_mode_title') }}
                        </h2>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ $t('modal_new_simple_title') }}</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-3">
                    <button @click="switchToSingle" 
                        type="button"
                        class="hidden sm:flex text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border-2 border-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95 items-center gap-2">
                        <span>↩️</span> {{ $t('btn_single_mode') }}
                    </button>
                    <button @click="close" class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90 flex items-center justify-center font-bold">
                        ✕
                    </button>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-4 md:p-8">
                
                <div class="hidden md:grid grid-cols-12 gap-4 mb-4 px-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <div class="col-span-5 ml-1">{{ $t('col_activity') }} <span class="text-rose-500">*</span></div>
                    <div class="col-span-2 text-center">{{ $t('col_start') }}</div>
                    <div class="col-span-2 text-center">{{ $t('col_end') }}</div>
                    <div class="col-span-2 text-center">{{ $t('col_priority') }}</div>
                    <div class="col-span-1"></div>
                </div>

                <div class="space-y-4 md:space-y-3 mt-2">
                    <div v-for="(task, index) in form.tasks" :key="index" 
                        class="bg-white md:bg-transparent p-5 md:p-0 rounded-[2rem] md:rounded-none border border-slate-100 md:border-none shadow-sm md:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-300 group">
                        
                        <div class="grid grid-cols-12 gap-3 md:gap-4 items-center">
                            
                            <div class="col-span-12 md:col-span-5">
                                <label class="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block">{{ $t('col_activity') }}</label>
                                <TextInput 
                                    v-model="task.title" 
                                    :placeholder="$t('placeholder_activity')" 
                                    class="w-full text-sm font-bold py-3.5 px-4 !rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 transition-all bg-white" 
                                    :class="{'!border-rose-300 !bg-rose-50': form.errors[`tasks.${index}.title`]}"
                                />
                            </div>

                            <div class="col-span-6 md:col-span-2">
                                <label class="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block">{{ $t('col_start') }}</label>
                                <input 
                                    type="time" 
                                    v-model="task.start_time" 
                                    class="w-full border-2 border-slate-200 bg-white rounded-2xl text-sm py-3.5 px-1 text-center font-black text-slate-700 focus:border-indigo-500 focus:ring-0 cursor-pointer transition-all shadow-sm" 
                                    :class="{'!border-rose-500 !bg-rose-50 !text-rose-700': form.errors[`tasks.${index}.start_time`]}"
                                />
                            </div>

                            <div class="col-span-6 md:col-span-2">
                                <label class="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block">{{ $t('col_end') }}</label>
                                <input 
                                    type="time" 
                                    v-model="task.end_time" 
                                    class="w-full border-2 border-slate-200 bg-white rounded-2xl text-sm py-3.5 px-1 text-center font-black text-slate-700 focus:border-indigo-500 focus:ring-0 cursor-pointer transition-all shadow-sm" 
                                    :class="{'!border-rose-500 !bg-rose-50 !text-rose-700': form.errors[`tasks.${index}.end_time`]}"
                                />
                            </div>

                            <div class="col-span-10 md:col-span-2">
                                <label class="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block">{{ $t('col_priority') }}</label>
                                <div class="relative">
                                    <select v-model="task.type" class="w-full border-2 border-slate-200 rounded-2xl text-[10px] py-3.5 pl-3 pr-8 font-black uppercase tracking-tighter text-slate-700 focus:border-indigo-500 focus:ring-0 bg-white appearance-none cursor-pointer transition-all"
                                        :class="{
                                            '!text-rose-600 !bg-rose-50': task.type == 1,
                                            '!text-indigo-600 !bg-indigo-50': task.type == 2,
                                            '!text-emerald-600 !bg-emerald-50': task.type == 3
                                        }">
                                        <option :value="1">{{ $t('priority_urgent') }}</option>
                                        <option :value="2">{{ $t('priority_work') }}</option>
                                        <option :value="3">{{ $t('priority_normal') }}</option>
                                    </select>
                                    <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="4"><path d="M19 9l-7 7-7-7"/></svg>
                                    </div>
                                </div>
                            </div>

                            <div class="col-span-2 md:col-span-1 flex justify-center items-end md:items-center">
                                <button @click="removeRow(index)" type="button" 
                                    class="w-10 h-10 md:w-8 md:h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90"
                                    :disabled="form.tasks.length <= 1"
                                    :class="{'opacity-0 pointer-events-none': form.tasks.length <= 1}">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <button @click="addRow" type="button" class="mt-8 w-full py-4 border-2 border-dashed border-slate-200 rounded-[1.5rem] text-slate-400 font-black uppercase tracking-widest text-[10px] hover:border-indigo-400 hover:text-indigo-600 hover:bg-white transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-sm">
                    <span class="w-6 h-6 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">+</span> 
                    {{ $t('btn_add_another') }}
                </button>
            </div>

            <div class="px-8 py-6 bg-white border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
                <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                    {{ $t('total_label') }} <span class="text-indigo-600 text-sm font-black">{{ form.tasks.length }}</span> {{ $t('total_suffix') }}
                </div>
                
                <div class="flex gap-3 w-full sm:w-auto">
                    <SecondaryButton @click="close" class="flex-1 !py-3.5 !rounded-[1.2rem] !text-[10px] !font-black !uppercase !tracking-widest !border-2 !text-slate-400 hover:!text-slate-600">
                        {{ $t('btn_cancel') }}
                    </SecondaryButton>
                    
                    <PrimaryButton @click="submit" :disabled="form.processing || conflictError" 
                        class="flex-[2] !bg-indigo-600 hover:!bg-indigo-700 !rounded-[1.2rem] !py-3.5 !px-8 shadow-xl shadow-indigo-100 transition-all transform active:scale-95 font-black uppercase tracking-widest text-[10px]"
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
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e2e8f0; border-radius: 20px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #cbd5e1; }
input[type="time"]::-webkit-calendar-picker-indicator { display: none; }
</style>