<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import FinanceDatePicker from './FinanceDatePicker.vue';

const props = defineProps({
    show: Boolean,
    form: Object,
    categories: Array,
    budgets: Array,
    conflictError: String,
    close: Function,
    submit: Function,
    addRow: Function,
    removeRow: Function,
    switchToSingle: Function
});

const { activeCurrency, getCategoryDetails, appLocale } = useFinanceFormat();
const showDatePicker = ref(false);

const isDotSeparator = computed(() => ['IDR', 'EUR', 'de-DE'].includes(activeCurrency.value));
const currencySymbol = computed(() => {
    const map = { IDR: 'Rp', USD: '$', GBP: '£', EUR: '€', JPY: '¥' };
    return map[activeCurrency.value] || activeCurrency.value;
});

const dateDisplay = computed(() => {
    if (!props.form.date) return '';
    const loc = appLocale.value ? appLocale.value.split('-')[0] : 'id';
    return dayjs(props.form.date).locale(loc).format('dddd, DD MMM YYYY');
});

const formatDisplay = (val) => {
    if (!val) return '';
    const str = val.toString();
    return isDotSeparator.value ? str.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const onInputAmount = (e, index) => {
    let cleanVal = isDotSeparator.value ? e.target.value.replace(/\./g, '') : e.target.value.replace(/,/g, '');
    if (!isNaN(cleanVal)) {
        props.form.transactions[index].amount = cleanVal;
    }
};

const getCategoriesByType = (type) => {
    if (type === 'income') {
        return props.categories.filter(c => c.type === 'income').map(c => c.slug);
    } else {
        return props.budgets.map(b => b.category);
    }
};

const getDetail = (slug) => getCategoryDetails(slug, props.categories);

const changeType = (index, type) => {
    props.form.transactions[index].type = type;
    props.form.transactions[index].category = ''; 
};
</script>

<template>
    <Modal :show="show" @close="close" maxWidth="2xl">
        <div class="bg-white rounded-[2.5rem] flex flex-col max-h-[90vh] relative overflow-hidden transition-all duration-300 border border-slate-100 shadow-2xl">
            
            <div v-if="conflictError" class="absolute top-0 left-0 right-0 bg-rose-500 text-white text-[10px] font-black px-6 py-3.5 text-center animate-in slide-in-from-top-full z-50 shadow-lg flex items-center justify-center gap-2 uppercase tracking-[0.1em] rounded-t-[2.5rem] shrink-0">
                <svg class="w-4 h-4 shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                <span>{{ conflictError }}</span>
            </div>

            <div class="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white shrink-0 z-20 rounded-t-[2.5rem]" :class="{'mt-12': conflictError}">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg shadow-indigo-100">
                        ✨
                    </div>
                    <div>
                        <h2 class="text-xl font-black text-slate-800 tracking-tight leading-none mb-1.5">
                            {{ $t('batch_mode_title', 'Batch Finance') }}
                        </h2>
                        <div class="relative">
                            <button type="button" @click="showDatePicker = !showDatePicker" class="text-[10px] font-black text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-lg px-2.5 py-1 transition-all uppercase tracking-widest flex items-center gap-2">
                                <span>{{ dateDisplay }}</span>
                                <span>📅</span>
                            </button>
                            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
                                <div v-if="showDatePicker" class="absolute top-full left-0 mt-2 z-[100] shadow-2xl rounded-3xl">
                                    <FinanceDatePicker 
                                        :show="true" 
                                        :modelValue="form.date"
                                        @update:modelValue="(val) => form.date = val"
                                        @close="showDatePicker = false"
                                    />
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center gap-3">
                    <button @click="switchToSingle" type="button" class="hidden sm:flex text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border-2 border-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95 items-center gap-2">
                        <span>↩️</span> {{ $t('btn_single_mode', 'Single Mode') }}
                    </button>
                    <button @click="close" class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90 flex items-center justify-center font-bold">
                        ✕
                    </button>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-4 md:p-8">
                
                <div class="space-y-4">
                    <div v-for="(trx, index) in form.transactions" :key="index" 
                        class="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm relative group animate-in fade-in slide-in-from-bottom-4 duration-300">
                        
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg"
                                :class="trx.type === 'expense' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'">
                                {{ $t('transaction', 'Transaksi') }} #{{ index + 1 }}
                            </span>
                            <button @click="removeRow(index)" type="button" class="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-rose-100 hover:text-rose-500 transition-all" :disabled="form.transactions.length <= 1" :class="{'opacity-50 cursor-not-allowed': form.transactions.length <= 1}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            <div class="space-y-4">
                                <div>
                                    <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block">{{ $t('type', 'Tipe') }}</label>
                                    <div class="flex bg-slate-50 p-1 rounded-xl h-11 border border-slate-100">
                                        <button type="button" @click="changeType(index, 'expense')" class="flex-1 rounded-lg text-[10px] font-black transition-all flex items-center justify-center tracking-wider uppercase" :class="trx.type === 'expense' ? 'bg-white text-rose-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'">
                                            {{ $t('out', 'Keluar') }}
                                        </button>
                                        <button type="button" @click="changeType(index, 'income')" class="flex-1 rounded-lg text-[10px] font-black transition-all flex items-center justify-center tracking-wider uppercase" :class="trx.type === 'income' ? 'bg-white text-emerald-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'">
                                            {{ $t('in', 'Masuk') }}
                                        </button>
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block">{{ $t('category', 'Kategori') }}</label>
                                    <div class="relative">
                                        <select v-model="trx.category" class="w-full pl-3 pr-8 h-11 !rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-0 font-bold text-slate-700 capitalize text-xs appearance-none cursor-pointer transition-all"
                                            :class="[
                                                form.errors[`transactions.${index}.category`] ? '!border-rose-300 !bg-rose-50 text-rose-600' : '',
                                                trx.type === 'expense' ? 'focus:border-rose-400' : 'focus:border-emerald-400'
                                            ]">
                                            <option value="" disabled>{{ $t('select_placeholder', 'Pilih...') }}</option>
                                            <option v-for="catSlug in getCategoriesByType(trx.type)" :key="catSlug" :value="catSlug">
                                                {{ getDetail(catSlug).icon }} {{ getDetail(catSlug).name }}
                                            </option>
                                        </select>
                                        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M19 9l-7 7-7-7"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <div>
                                    <label class="text-[9px] font-black uppercase tracking-widest mb-1.5 ml-1 block" :class="trx.type === 'expense' ? 'text-rose-400' : 'text-emerald-400'">{{ $t('amount', 'Nominal') }}</label>
                                    <div class="relative group">
                                        <span class="absolute left-3 top-1/2 -translate-y-1/2 font-black text-[12px]" :class="trx.type === 'expense' ? 'text-rose-500' : 'text-emerald-500'">{{ currencySymbol }}</span>
                                        <input type="text" :value="formatDisplay(trx.amount)" @input="e => onInputAmount(e, index)" placeholder="0" 
                                            class="w-full h-11 pl-10 pr-3 !rounded-xl border-2 bg-white focus:ring-0 font-black text-sm transition-all"
                                            :class="[
                                                form.errors[`transactions.${index}.amount`] ? '!border-rose-300 !bg-rose-50 text-rose-600' : 'border-slate-200 text-slate-700',
                                                trx.type === 'expense' ? 'focus:border-rose-500' : 'focus:border-emerald-500'
                                            ]"
                                        >
                                    </div>
                                </div>

                                <div>
                                    <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 block">{{ $t('description', 'Keterangan') }}</label>
                                    <TextInput 
                                        v-model="trx.title" 
                                        :placeholder="$t('desc_placeholder', 'Cth: Kopi...')" 
                                        class="w-full text-xs font-bold h-11 px-3 !rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white transition-all focus:ring-0" 
                                        :class="[
                                            form.errors[`transactions.${index}.title`] ? '!border-rose-300 !bg-rose-50 text-rose-600' : '',
                                            trx.type === 'expense' ? 'focus:border-rose-400' : 'focus:border-emerald-400'
                                        ]"
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <button @click="addRow" type="button" class="mt-8 w-full py-4 border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-2xl text-indigo-500 font-black uppercase tracking-widest text-[10px] hover:border-indigo-400 hover:bg-indigo-100 hover:text-indigo-600 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm">
                    <span class="w-5 h-5 rounded-md bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs shadow-sm">+</span> 
                    {{ $t('btn_add_another_transaction', 'Tambah Baris Transaksi') }}
                </button>
            </div>

            <div class="px-8 py-5 bg-white border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 rounded-b-[2.5rem]">
                <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                    {{ $t('total_label', 'Total Input:') }} <span class="text-indigo-600 text-sm font-black">{{ form.transactions.length }}</span>
                </div>
                
                <div class="flex gap-3 w-full sm:w-auto">
                    <SecondaryButton @click="close" class="flex-1 sm:flex-none !py-3 !rounded-xl !text-[10px] !font-black !uppercase !tracking-widest !border-2 !text-slate-400 hover:!text-slate-600">
                        {{ $t('btn_cancel', 'Batal') }}
                    </SecondaryButton>
                    
                    <PrimaryButton @click="submit" :disabled="form.processing || conflictError" 
                        class="flex-[2] sm:flex-none !bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !py-3 !px-8 shadow-xl shadow-indigo-100 transition-all transform active:scale-95 font-black uppercase tracking-widest text-[10px]"
                        :class="{'!bg-slate-300 !text-slate-500 !cursor-not-allowed !shadow-none !transform-none': conflictError}">
                        <span v-if="form.processing">...</span>
                        <span v-else>{{ $t('btn_save_all', 'Simpan Batch') }}</span>
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