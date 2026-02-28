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
        <div class="bg-slate-50 flex flex-col max-h-[85vh] relative overflow-hidden transition-all duration-300 border border-slate-200 shadow-2xl rounded-[2.5rem]">
            
            <div class="px-6 md:px-8 py-6 border-b border-slate-200 flex justify-between items-center bg-white dark:bg-slate-900 z-20 shrink-0">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-200 shrink-0">
                        ✨
                    </div>
                    <div>
                        <h3 class="text-xl font-black text-slate-800 tracking-tight leading-none mb-2">
                            {{ form.id ? $t('edit_transaction', 'Edit Transaksi') : $t('record_transaction', 'Catat Transaksi') }}
                        </h3>
                        <button v-if="!form.id" @click="$emit('switch-to-batch')" type="button" 
                            class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition flex items-center gap-1.5 active:scale-95 w-fit border border-indigo-100">
                            <span>⚡</span> {{ $t('batch_mode_title', 'Batch Mode') }}
                        </button>
                    </div>
                </div>
                <button @click="close" class="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 hover:bg-rose-100 hover:text-rose-500 transition-all active:scale-90 flex items-center justify-center font-bold">
                    ✕
                </button>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-5">
                
                <div class="flex bg-slate-100 p-1.5 rounded-2xl">
                    <button type="button" @click="form.type = 'expense'" class="flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2" :class="form.type === 'expense' ? 'bg-white dark:bg-slate-900 text-rose-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">
                        {{ $t('out', 'Keluar') }}
                    </button>
                    <button type="button" @click="form.type = 'income'" class="flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2" :class="form.type === 'income' ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">
                        {{ $t('in', 'Masuk') }}
                    </button>
                </div>

                <div>
                    <label class="block text-[10px] uppercase font-black tracking-widest mb-2" :class="form.type === 'expense' ? 'text-rose-400' : 'text-emerald-400'">
                        {{ $t('amount', 'Nominal') }}
                    </label>
                    <div class="relative group">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg" :class="form.type === 'expense' ? 'text-rose-500' : 'text-emerald-500'">{{ currencySymbol }}</span>
                        <input type="text" :value="formatDisplay(form.amount)" @input="onInput" placeholder="0" 
                            class="w-full pl-12 pr-4 h-14 rounded-xl border-2 bg-white dark:bg-slate-900 focus:ring-0 font-black text-2xl transition-all"
                            :class="[
                                form.errors?.amount ? '!border-rose-300 !bg-rose-50 text-rose-600' : 'border-slate-200 text-slate-700',
                                form.type === 'expense' ? 'focus:border-rose-500' : 'focus:border-emerald-500'
                            ]">
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">{{ $t('description', 'Keterangan') }}</label>
                    <input v-model="form.title" type="text" :placeholder="$t('desc_placeholder', 'Cth: Kopi, Gaji...')" 
                        class="w-full px-4 h-12 rounded-xl border-2 border-slate-200 bg-white dark:bg-slate-900 focus:border-indigo-500 focus:ring-0 font-bold text-sm text-slate-700 transition-all"
                        :class="{'!border-rose-300 !bg-rose-50 text-rose-600 placeholder-rose-300': form.errors?.title}">
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">{{ $t('category', 'Kategori') }}</label>
                        <div class="relative">
                            <select v-model="form.category" class="w-full pl-4 pr-8 h-12 rounded-xl border-2 border-slate-200 bg-white dark:bg-slate-900 focus:border-indigo-500 focus:ring-0 font-bold text-slate-700 capitalize text-sm appearance-none cursor-pointer transition-all"
                                :class="{'!border-rose-300 !bg-rose-50 text-rose-600': form.errors?.category}">
                                <option value="" disabled>{{ $t('select_placeholder', 'Pilih...') }}</option>
                                <option v-for="catSlug in availableCategories" :key="catSlug" :value="catSlug">
                                    {{ getDetail(catSlug).icon }} {{ getDetail(catSlug).name }}
                                </option>
                            </select>
                            <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M19 9l-7 7-7-7"/></svg>
                            </div>
                        </div>
                    </div>

                    <div class="relative">
                        <label class="block text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">{{ $t('date', 'Tanggal') }}</label>
                        <button type="button" @click="showDatePicker = !showDatePicker" class="w-full px-4 h-12 rounded-xl border-2 border-slate-200 bg-white dark:bg-slate-900 hover:border-indigo-300 font-bold text-slate-700 text-sm transition-all flex items-center justify-between">
                            <span class="truncate">{{ dateDisplay }}</span>
                            <span class="text-slate-400">📅</span>
                        </button>
                        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
                            <div v-if="showDatePicker" class="absolute bottom-full right-0 mb-2 z-[100] shadow-2xl rounded-3xl origin-bottom-right">
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

            <div class="px-6 md:px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 flex gap-3 z-20 shrink-0">
                <SecondaryButton @click="close" class="flex-1 !py-3.5 !rounded-xl !text-[11px] !font-black !uppercase !tracking-widest !border-2 !text-slate-400 hover:!text-slate-600 hover:bg-slate-50 bg-white dark:bg-slate-900">
                    {{ $t('btn_cancel', 'Batal') }}
                </SecondaryButton>
                
                <PrimaryButton @click="submit" :disabled="form.processing" class="flex-[2] !rounded-xl !py-3.5 shadow-xl transition-all transform active:scale-95 font-black uppercase tracking-widest text-[11px] justify-center"
                    :class="form.type === 'expense' ? '!bg-rose-500 hover:!bg-rose-600 shadow-rose-200' : '!bg-emerald-500 hover:!bg-emerald-600 shadow-emerald-200'">
                    <span v-if="form.processing" class="flex items-center gap-2">
                        <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </span>
                    <span v-else>{{ $t('btn_save', 'Simpan Transaksi') }}</span>
                </PrimaryButton>
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