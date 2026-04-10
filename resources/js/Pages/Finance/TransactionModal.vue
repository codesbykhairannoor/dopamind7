<script setup>
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import FinanceDatePicker from './FinanceDatePicker.vue';

const props = defineProps({
    show: Boolean,
    form: Object,
    budgets: Array,    
    categories: Array,  
    close: Function,
    submit: Function
});

const emit = defineEmits(['switch-to-batch']);

const { activeCurrency, getCategoryDetails, cleanAmount, appLocale } = useFinanceFormat();
const showDatePicker = ref(false);

const availableCategories = computed(() => {
    if (props.form.type === 'income') {
        return props.categories.filter(c => c.type === 'income').map(c => c.slug);
    } else {
        return props.budgets.map(b => b.category);
    }
});

const getDetail = (slug) => getCategoryDetails(slug, props.categories);

watch(() => props.form.type, () => { props.form.category = ''; });

const isDotSeparator = computed(() => ['IDR', 'EUR', 'de-DE'].includes(activeCurrency.value));
const currencySymbol = computed(() => {
    const map = { IDR: 'Rp', USD: '$', GBP: '£', EUR: '€', JPY: '¥' };
    return map[activeCurrency.value] || activeCurrency.value;
});

const dateDisplay = computed(() => {
    if (!props.form.date) return '';
    const loc = appLocale.value ? appLocale.value.split('-')[0] : 'id';
    return dayjs(props.form.date).locale(loc).format('DD MMM YYYY');
});

const formatDisplay = (val) => {
    if (!val) return '';
    const str = val.toString();
    return isDotSeparator.value ? str.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const onInput = (e) => {
    let rawValue = e.target.value;
    let cleanVal = isDotSeparator.value ? rawValue.replace(/\./g, '') : rawValue.replace(/,/g, '');
    if (!isNaN(cleanVal)) {
        props.form.amount = cleanVal;
    }
};
</script>

<template>
    <Modal :show="show" @close="close" maxWidth="md">
        <div class="bg-slate-50 dark:bg-slate-950 flex flex-col max-h-[85vh] relative overflow-visible transition-all duration-500 border border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-none rounded-[2.5rem]">
            
            <div class="px-6 md:px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 z-20 shrink-0 transition-colors duration-500">
                <div class="flex items-center gap-4 transition-colors duration-500">
                    <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg dark:shadow-none shadow-indigo-200 dark:shadow-indigo-900/20 shrink-0">
                        ✨
                    </div>
                    <div>
                        <h3 class="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-2 transition-colors duration-500">
                            {{ form.id ? $t('edit_transaction', 'Edit transaction') : $t('record_transaction', 'Record transaction') }}
                        </h3>
                        <button v-if="!form.id" @click="$emit('switch-to-batch')" type="button" 
                            class="text-[10px] font-bold tracking-tight px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition duration-300 flex items-center gap-1.5 active:scale-95 w-fit border border-indigo-100 dark:border-indigo-500/20">
                            <span>⚡</span> {{ $t('batch_mode_title', 'Collective record') }}
                        </button>
                    </div>
                </div>
                <button @click="close" class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold">
                    ✕
                </button>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-5">
                
                <div class="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl transition-colors duration-500">
                    <button type="button" @click="form.type = 'expense'" class="flex-1 py-3 rounded-xl text-[10px] font-bold tracking-tight transition-all flex items-center justify-center gap-2 transition-colors duration-300" :class="form.type === 'expense' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm dark:shadow-none' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'">
                        <span v-if="form.type === 'expense'">🔴</span> {{ $t('out', 'Expense') }}
                    </button>
                    <button type="button" @click="form.type = 'income'" class="flex-1 py-3 rounded-xl text-[10px] font-bold tracking-tight transition-all flex items-center justify-center gap-2 transition-colors duration-300" :class="form.type === 'income' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm dark:shadow-none' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'">
                        <span v-if="form.type === 'income'">🟢</span> {{ $t('in', 'Income') }}
                    </button>
                </div>

                <div>
                    <label class="block text-[10px] font-bold tracking-tight mb-2 transition-colors duration-500 ml-1" :class="form.type === 'expense' ? 'text-rose-400 dark:text-rose-400/80' : 'text-emerald-400 dark:text-emerald-400/80'">
                        {{ $t('amount') }}
                    </label>
                    <div class="relative group">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg transition-colors duration-500" :class="form.type === 'expense' ? 'text-rose-500 dark:text-rose-400' : 'text-emerald-500 dark:text-emerald-400'">{{ currencySymbol }}</span>
                        <input type="text" :value="formatDisplay(form.amount)" @input="onInput" placeholder="0" 
                            class="w-full pl-12 pr-4 h-14 rounded-xl border-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-0 font-black text-2xl transition-all dark:text-white"
                            :class="[
                                form.errors?.amount ? '!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200',
                                form.type === 'expense' ? 'focus:border-rose-500' : 'focus:border-emerald-500'
                            ]">
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-600 mb-2 transition-colors duration-500 ml-1 tracking-tight">{{ $t('description') }}</label>
                    <input v-model="form.title" type="text" :placeholder="$t('desc_placeholder', 'Cth: Kopi, Gaji...')" 
                        class="w-full px-4 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-indigo-500 focus:ring-0 font-bold text-sm text-slate-700 dark:text-slate-200 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                        :class="{'!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400 placeholder-rose-300': form.errors?.title}">
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-600 mb-2 transition-colors duration-500 ml-1 tracking-tight">{{ $t('category') }}</label>
                        <div class="relative">
                            <select v-model="form.category" class="w-full pl-4 pr-8 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-indigo-500 focus:ring-0 font-bold text-slate-700 dark:text-slate-200 text-sm appearance-none cursor-pointer transition-all"
                                :class="{'!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400': form.errors?.category}">
                                <option value="" disabled>{{ $t('select_placeholder', 'Select category...') }}</option>
                                <option v-for="catSlug in availableCategories" :key="catSlug" :value="catSlug">
                                    {{ getDetail(catSlug).icon }} {{ getDetail(catSlug).name }}
                                </option>
                            </select>
                            <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-600">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M19 9l-7 7-7-7"/></svg>
                            </div>
                        </div>
                    </div>

                    <div class="relative">
                        <label class="block text-[10px] font-bold text-slate-400 dark:text-slate-600 mb-2 transition-colors duration-500 ml-1 tracking-tight">{{ $t('date') }}</label>
                        <button type="button" @click="showDatePicker = !showDatePicker" class="w-full px-4 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-500/40 font-bold text-slate-700 dark:text-slate-200 text-sm transition-all flex items-center justify-between transition-colors duration-500">
                            <span class="truncate">{{ dateDisplay }}</span>
                            <span class="text-slate-400 dark:text-slate-600">📅</span>
                        </button>
                        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-4 sm:translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4 sm:translate-y-2">
                            <div v-if="showDatePicker" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:bottom-full sm:right-0 sm:mb-2 sm:origin-bottom-right sm:block sm:inset-auto">
                                <div class="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm sm:hidden" @click="showDatePicker = false"></div>
                                <FinanceDatePicker 
                                    :show="true" 
                                    :modelValue="form.date"
                                    @update:modelValue="(val) => form.date = val"
                                    @close="showDatePicker = false"
                                    class="relative z-10"
                                />
                            </div>
                        </transition>
                    </div>
                </div>

            </div>

            <div class="px-6 md:px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-3 z-20 shrink-0 transition-colors duration-500">
                <SecondaryButton @click="close" class="flex-1 !py-3.5 !rounded-xl !text-[11px] !font-bold !border-2 dark:!border-slate-700 !text-slate-400 dark:!text-slate-600 hover:!text-slate-600 dark:hover:!text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 transition-all duration-300">
                    {{ $t('btn_cancel') }}
                </SecondaryButton>
                
                <PrimaryButton @click="submit" :disabled="form.processing" class="flex-[2] !rounded-xl !py-3.5 shadow-xl dark:shadow-none transition-all transform active:scale-95 font-bold text-[11px] justify-center transition-all duration-300"
                    :class="form.type === 'expense' ? '!bg-rose-500 hover:!bg-rose-600 shadow-rose-200 dark:shadow-rose-900/40' : '!bg-emerald-500 hover:!bg-emerald-600 shadow-emerald-200 dark:shadow-emerald-900/40'">
                    <span v-if="form.processing" class="flex items-center gap-2">
                        <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </span>
                    <span v-else>{{ $t('btn_save_manual') }}</span>
                </PrimaryButton>
            </div>

        </div>
    </Modal>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; margin-block: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #334155; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #475569; }
</style>