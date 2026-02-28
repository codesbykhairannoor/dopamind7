<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';

const props = defineProps({
    show: Boolean,
    form: Object,
    iconList: Array,
    colorPalette: Array,
    close: Function,
    submit: Function,
    addRow: Function,
    removeRow: Function,
    switchToSingle: Function
});

// State untuk mengatur dropdown ikon mana yang sedang terbuka
const openIconDropdown = ref(null);

// Fungsi native untuk menutup dropdown jika klik di luar area
const closeDropdown = (e) => {
    if (!e.target.closest('.icon-dropdown-container')) {
        openIconDropdown.value = null;
    }
};

onMounted(() => {
    document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown);
});
</script>

<template>
    <Modal :show="show" @close="close" maxWidth="2xl">
        <div class="bg-white dark:bg-slate-900 flex flex-col max-h-[85vh] relative overflow-hidden transition-all duration-300 border border-slate-200 shadow-2xl rounded-[2.5rem]">
            
            <div class="px-6 md:px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white dark:bg-slate-900 z-20 shrink-0">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-200 shrink-0">
                        ⚡
                    </div>
                    <div>
                        <h3 class="text-xl font-black text-slate-800 tracking-tight leading-none mb-1.5">
                            {{ $t('batch_habit_title', 'Batch Habit') }}
                        </h3>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {{ $t('batch_habit_subtitle', 'Catat banyak habit sekaligus') }}
                        </p>
                    </div>
                </div>
                
                <div class="flex items-center gap-3">
                    <button @click="switchToSingle" type="button" class="hidden sm:flex text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl border-2 border-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95 items-center gap-2">
                        <span>↩️</span> {{ $t('btn_single_mode', 'Single Mode') }}
                    </button>
                    <button @click="close" class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90 flex items-center justify-center font-bold">
                        ✕
                    </button>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-4 md:p-8">
                
                <div class="hidden md:grid grid-cols-12 gap-3 mb-3 px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <div class="col-span-4">{{ $t('habit_name', 'Nama Habit') }}</div>
                    <div class="col-span-2 text-center">{{ $t('habit_icon', 'Ikon') }}</div>
                    <div class="col-span-3 text-center">{{ $t('habit_color', 'Warna') }}</div>
                    <div class="col-span-2 text-center">{{ $t('target', 'Target') }}</div>
                    <div class="col-span-1 text-center">{{ $t('action', 'Aksi') }}</div>
                </div>

                <div class="space-y-4 md:space-y-3">
                    <div v-for="(trx, index) in form.habits" :key="index" 
                        class="bg-white dark:bg-slate-900 md:bg-transparent p-5 md:p-0 rounded-[2rem] md:rounded-none border border-slate-100 md:border-none shadow-sm md:shadow-none relative group animate-in fade-in slide-in-from-bottom-4 duration-300">
                        
                        <div class="flex justify-between items-center mb-4 md:hidden">
                            <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-indigo-50 text-indigo-500">
                                {{ $t('habit_label', 'Habit') }} #{{ index + 1 }}
                            </span>
                            <button @click="removeRow(index)" type="button" class="w-8 h-8 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 transition-all" :disabled="form.habits.length <= 1" :class="{'opacity-50 cursor-not-allowed': form.habits.length <= 1}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3 items-center md:bg-white dark:bg-slate-900 md:p-2.5 md:rounded-2xl md:border md:border-slate-200 md:shadow-sm">
                            
                            <div class="col-span-1 md:col-span-4">
                                <label class="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{{ $t('habit_name', 'Nama Habit') }}</label>
                                <input v-model="trx.name" :placeholder="$t('habit_name_placeholder', 'Cth: Lari Pagi...')" 
                                    class="w-full text-xs font-bold h-12 md:h-11 px-4 !rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white dark:bg-slate-900 focus:border-indigo-500 transition-all focus:ring-0" 
                                    :class="{'!border-rose-300 !bg-rose-50 placeholder-rose-300': form.errors?.[`habits.${index}.name`]}" />
                            </div>

                            <div class="col-span-1 md:col-span-2 relative icon-dropdown-container">
                                <label class="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{{ $t('habit_icon', 'Ikon') }}</label>
                                
                                <button type="button" @click="openIconDropdown = openIconDropdown === index ? null : index" 
                                    class="w-full h-12 md:h-11 flex items-center justify-center gap-2 border-2 border-slate-200 bg-slate-50 hover:bg-white dark:bg-slate-900 rounded-xl transition-all focus:border-indigo-500"
                                    :class="openIconDropdown === index ? 'border-indigo-500 ring-2 ring-indigo-100 bg-white dark:bg-slate-900' : ''">
                                    <span class="text-xl">{{ trx.icon }}</span>
                                    <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M19 9l-7 7-7-7"/></svg>
                                </button>

                                <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                                    <div v-if="openIconDropdown === index" class="absolute z-[100] top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl shadow-xl p-3 grid grid-cols-4 gap-2 origin-top max-h-48 overflow-y-auto custom-scrollbar">
                                        <button type="button" v-for="icon in iconList" :key="icon" 
                                            @click="trx.icon = icon; openIconDropdown = null"
                                            class="w-8 h-8 flex items-center justify-center text-lg rounded-lg hover:bg-indigo-50 hover:scale-110 transition-all"
                                            :class="trx.icon === icon ? 'bg-indigo-100 shadow-sm' : 'opacity-70'">
                                            {{ icon }}
                                        </button>
                                    </div>
                                </transition>
                            </div>

                            <div class="col-span-1 md:col-span-3 flex justify-center">
                                <label class="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block w-full text-left">{{ $t('habit_color', 'Warna') }}</label>
                                <div class="flex flex-wrap justify-center gap-1.5 md:gap-1.5 p-1 bg-slate-50 rounded-xl border border-slate-100 w-full md:w-auto">
                                    <button type="button" v-for="c in colorPalette" :key="c" @click="trx.color = c" 
                                        class="w-6 h-6 md:w-5 md:h-5 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm" 
                                        :class="trx.color === c ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : 'opacity-80'"
                                        :style="{ backgroundColor: c }">
                                    </button>
                                </div>
                            </div>

                            <div class="col-span-1 md:col-span-2">
                                <label class="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{{ $t('target_days', 'Target (Hari)') }}</label>
                                <div class="relative flex items-center">
                                    <input type="number" v-model="trx.monthly_target" min="1" max="31" 
                                        class="w-full text-center text-xs font-black h-12 md:h-11 pl-2 pr-6 !rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white dark:bg-slate-900 focus:border-indigo-500 transition-all focus:ring-0 text-indigo-700" 
                                        :class="{'!border-rose-300 !bg-rose-50 text-rose-600': form.errors?.[`habits.${index}.monthly_target`]}" />
                                    <span class="absolute right-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest pointer-events-none">Hr</span>
                                </div>
                            </div>

                            <div class="hidden md:flex col-span-1 justify-center items-center">
                                <button @click="removeRow(index)" type="button" 
                                    class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-rose-50 transition-all active:scale-90"
                                    :disabled="form.habits.length <= 1"
                                    :class="form.habits.length <= 1 ? 'opacity-0 pointer-events-none' : 'text-slate-300 hover:text-rose-500'">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <button @click="addRow" type="button" class="mt-6 w-full py-4 border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-2xl text-indigo-600 font-black uppercase tracking-widest text-[10px] hover:border-indigo-400 hover:bg-indigo-100 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm">
                    <span class="w-5 h-5 rounded-md bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs shadow-sm">+</span> 
                    {{ $t('btn_add_habit_row', 'Tambah Baris Habit') }}
                </button>
            </div>

            <div class="px-6 md:px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 z-20 rounded-b-[2.5rem]">
                <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                    {{ $t('total_input', 'Total Input:') }} <span class="text-indigo-600 text-sm font-black">{{ form.habits.length }}</span>
                </div>
                
                <div class="flex gap-3 w-full sm:w-auto">
                    <SecondaryButton @click="close" class="flex-1 sm:flex-none !py-3.5 !rounded-xl !text-[11px] !font-black !uppercase !tracking-widest !border-2 !text-slate-400 hover:!text-slate-600">
                        {{ $t('btn_cancel', 'Batal') }}
                    </SecondaryButton>
                    
                    <PrimaryButton @click="submit" :disabled="form.processing" class="flex-[2] sm:flex-none !bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-3.5 !px-8 shadow-xl shadow-indigo-100 transition-all transform active:scale-95 font-black uppercase tracking-widest text-[11px]">
                        <span v-if="form.processing" class="flex items-center gap-2 justify-center">
                            <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        </span>
                        <span v-else>{{ $t('btn_save_batch', 'Simpan Batch') }}</span>
                    </PrimaryButton>
                </div>
            </div>
            
        </div>
    </Modal>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; margin-block: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
</style>