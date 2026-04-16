<script setup>
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { 
    Gem, Sparkle, ArrowRight, ShieldCheck, 
    Zap, CheckCircle2, Sparkles 
} from 'lucide-vue-next';
import { useGating } from '@/Composables/useGating';
import { Link } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const { isExplorer } = useGating();

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
        <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] flex flex-col max-h-[90vh] relative overflow-hidden transition-all duration-300 border border-slate-100 dark:border-slate-800 shadow-2xl will-change-transform">
            
            <div v-if="conflictError" class="absolute top-0 left-0 right-0 bg-rose-500 text-white text-[10px] font-black px-6 py-3.5 text-center animate-in slide-in-from-top-full z-50 shadow-lg flex items-center justify-center gap-2 tracking-[0.05em]">
                <svg class="w-4 h-4 shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                <span>{{ conflictError }}</span>
            </div>

            <!-- [LOCKED STATE] Full Modal Cover -->
            <div v-if="isExplorer" class="flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 min-h-[500px]">
                <button @click="close" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all z-50 font-bold">✕</button>
                
                <div class="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
                <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]"></div>

                <div class="relative z-10 max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div class="relative w-20 h-20 mx-auto">
                        <div class="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full"></div>
                        <div class="relative w-20 h-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-xl flex items-center justify-center">
                            <Zap :size="32" class="text-indigo-600 dark:text-indigo-400" stroke-width="2.5" />
                        </div>
                    </div>

                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 shadow-sm">
                            <Sparkle :size="10" class="text-indigo-500" fill="currentColor" />
                            <span class="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
                                {{ $t('gating.lock_title_required') }}
                            </span>
                        </div>
                        <h3 class="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter leading-tight">
                            {{ $t('gating.planner_batch.title') }}
                        </h3>
                        <p class="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                            {{ $t('gating.planner_batch.description') }}
                        </p>
                    </div>

                    <div class="space-y-3">
                        <div v-for="i in [1, 2, 3]" :key="i" class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
                            <div class="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                                <CheckCircle2 :size="12" />
                            </div>
                            <span class="text-[10px] font-black text-slate-700 dark:text-slate-300 tracking-tight">
                                {{ $t('gating.planner_batch.benefit_' + i) }}
                            </span>
                        </div>
                    </div>

                    <div class="pt-4 space-y-3">
                        <Link :href="route('billing')" class="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest shadow-xl shadow-indigo-200 dark:shadow-none transition-all active:scale-95 group">
                            {{ $t('gating.btn_upgrade') }}
                            <ArrowRight :size="16" stroke-width="3" class="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button @click="close" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                             {{ $t('gating.btn_stay') }}
                        </button>
                    </div>
                </div>
            </div>

            <template v-else>
                <div class="px-6 md:px-8 py-5 md:py-7 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0 z-20 transition-colors" :class="{'mt-12': conflictError}">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-xl text-white shadow-xl shadow-indigo-500/20">
                            ✨
                        </div>
                        <div>
                            <h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1.5 transition-colors">
                                {{ $t('batch_mode_title', 'Batch Entry Mode') }}
                            </h2>
                            <p class="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] transition-colors">
                                {{ $t('modal_new_simple_title', 'Collective scheduling') }}
                            </p>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-2 md:gap-3">
                        <button @click="switchToSingle" 
                            type="button"
                            class="hidden sm:flex h-10 text-[9px] font-black uppercase tracking-widest px-5 rounded-xl border-2 border-slate-50 dark:border-slate-800 text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95 items-center gap-2">
                            <span>↩️</span> {{ $t('btn_single_mode', 'Single') }}
                        </button>
                        <button @click="close" class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold">
                            ✕
                        </button>
                    </div>
                </div>

                <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30 p-4 md:p-8 transition-colors relative">
                    <div class="space-y-6">
                        <div v-for="(task, index) in form.tasks" :key="index" 
                            class="bg-white dark:bg-slate-900 p-6 md:p-7 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none relative group animate-in fade-in duration-200">
                            
                            <!-- Card Header -->
                            <div class="flex justify-between items-center mb-6">
                                <span class="text-[10px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-500/20">
                                    {{ $t('task_label') }} #{{ index + 1 }}
                                </span>
                                <button @click="removeRow(index)" type="button" 
                                    class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 transition-all shadow-sm"
                                    :disabled="form.tasks.length <= 1"
                                    :class="{'opacity-50 cursor-not-allowed': form.tasks.length <= 1}">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>

                            <div class="space-y-6">
                                <!-- Row 1: Activity Title (Full Width) -->
                                <div class="space-y-2">
                                    <label class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1.5 ml-1 block">{{ $t('col_activity') }}</label>
                                    <TextInput 
                                        v-model="task.title" 
                                        :placeholder="$t('placeholder_activity')" 
                                        class="w-full text-sm font-bold h-14 px-5 !rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all dark:text-white shadow-sm" 
                                        :class="{'!border-rose-300 !bg-rose-50 dark:!bg-rose-950/20': form.errors[`tasks.${index}.title`]}"
                                    />
                                </div>

                                <!-- Row 2: Times and Priority (Split) -->
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div class="space-y-2">
                                        <label class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1.5 ml-1 block">{{ $t('time_range') }}</label>
                                        <div class="flex items-center gap-2">
                                            <input type="time" v-model="task.start_time" 
                                                class="flex-1 h-14 border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 rounded-2xl text-xs text-center font-black text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm" :class="{'!border-rose-500': form.errors[`tasks.${index}.start_time`]}" />
                                            <span class="text-slate-300 dark:text-slate-700 font-bold">-</span>
                                            <input type="time" v-model="task.end_time" 
                                                class="flex-1 h-14 border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 rounded-2xl text-xs text-center font-black text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-0 transition-all shadow-sm" :class="{'!border-rose-500': form.errors[`tasks.${index}.end_time`]}" />
                                        </div>
                                    </div>

                                    <div class="space-y-2">
                                        <label class="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1.5 ml-1 block">{{ $t('col_priority') }}</label>
                                        <div class="relative">
                                            <select v-model="task.type" class="w-full h-14 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] pl-5 pr-10 font-black text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-0 bg-slate-50 dark:bg-slate-950 appearance-none cursor-pointer transition-all shadow-sm"
                                                :class="{
                                                    '!text-rose-600 dark:!text-rose-400 !bg-rose-50 dark:!bg-rose-500/10': task.type == 1,
                                                    '!text-indigo-600 dark:!text-indigo-400 !bg-indigo-50 dark:!bg-indigo-500/10': task.type == 2,
                                                    '!text-emerald-600 dark:!text-emerald-400 !bg-emerald-50 dark:!bg-emerald-500/10': task.type == 3
                                                }">
                                                <option :value="1">{{ $t('priority_urgent') }}</option>
                                                <option :value="2">{{ $t('priority_work') }}</option>
                                                <option :value="3">{{ $t('priority_normal') }}</option>
                                            </select>
                                            <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="4"><path d="M19 9l-7 7-7-7"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button @click="addRow" type="button" class="mt-8 w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] text-slate-400 dark:text-slate-600 font-bold text-[10px] hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-sm">
                            <span class="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">+</span> 
                            {{ $t('btn_add_another') }}
                        </button>
                    </div>
                </div>

                <!-- Footer -->
                <div class="px-8 py-6 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 transition-colors">
                    <div class="text-[10px] font-bold text-slate-400 dark:text-slate-600 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                        {{ $t('total_label') }} <span class="text-indigo-600 dark:text-indigo-400 text-sm font-black">{{ form.tasks.length }}</span> {{ $t('total_suffix') }}
                    </div>
                    
                    <div class="flex gap-3 w-full sm:w-auto">
                        <SecondaryButton @click="close" class="flex-1 !py-3.5 !rounded-xl !text-[10px] !font-bold !border-2 !text-slate-400 hover:!text-slate-600">
                            {{ $t('btn_cancel') }}
                        </SecondaryButton>
                        
                        <PrimaryButton @click="submit" :disabled="form.processing || conflictError" 
                            class="flex-[2] !bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-3.5 !px-8 shadow-xl shadow-indigo-100 dark:shadow-none transition-all transform active:scale-95 font-bold text-[10px]"
                            :class="{'!bg-slate-300 !text-slate-500 !cursor-not-allowed !shadow-none !transform-none': conflictError}">
                            <span v-if="form.processing">{{ $t('btn_saving') }}</span>
                            <span v-else>{{ $t('btn_save_all') }}</span>
                        </PrimaryButton>
                    </div>
                </div>
            </template>
        </div>
    </Modal>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e2e8f0; border-radius: 20px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #1e293b; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #cbd5e1; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #334155; }
input[type="time"]::-webkit-calendar-picker-indicator { display: none; }
</style>