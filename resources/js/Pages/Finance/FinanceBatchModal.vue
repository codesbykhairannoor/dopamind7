<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { 
    Gem, Sparkle, ArrowRight, Wallet, 
    CheckCircle2, Sparkles, TrendingUp
} from 'lucide-vue-next';
import { useGating } from '@/Composables/useGating';
import { Link } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const { isExplorer } = useGating();
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
        <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] flex flex-col max-h-[90vh] relative overflow-hidden transition-all duration-500 border border-slate-100 dark:border-slate-800 shadow-2xl dark:shadow-none">
            
            <!-- [LOCKED STATE] Full Modal Cover -->
            <div v-if="isExplorer" class="flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 min-h-[500px]">
                <!-- Close Button for Locked State -->
                <button @click="close" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all z-50 font-bold">✕</button>
                
                <!-- Background Glow -->
                <div class="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
                <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px]"></div>

                <div class="relative z-10 max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <!-- Icon Stack -->
                    <div class="relative w-20 h-20 mx-auto">
                        <div class="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full"></div>
                        <div class="relative w-20 h-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-xl flex items-center justify-center">
                            <TrendingUp :size="32" class="text-cyan-600 dark:text-cyan-400" stroke-width="2.5" />
                        </div>
                    </div>

                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4 shadow-sm">
                            <Sparkle :size="10" class="text-cyan-500" fill="currentColor" />
                            <span class="text-[8px] font-black uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
                                {{ $t('gating.lock_title_required') }}
                            </span>
                        </div>
                        <h3 class="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter leading-tight">
                            {{ $t('gating.finance_trends.title') }}
                        </h3>
                        <p class="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                            {{ $t('gating.finance_trends.description') }}
                        </p>
                    </div>

                    <!-- Benefits -->
                    <div class="space-y-3 text-left">
                        <div v-for="i in [1, 2, 3]" :key="i" class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
                            <div class="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
                                <CheckCircle2 :size="12" />
                            </div>
                            <span class="text-[10px] font-black text-slate-700 dark:text-slate-300 tracking-tight">
                                {{ $t('gating.finance_trends.benefit_' + i) }}
                            </span>
                        </div>
                    </div>

                    <div class="pt-4 space-y-3">
                        <Link :href="route('billing')" class="w-full h-14 bg-slate-900 dark:bg-indigo-600 hover:scale-[1.01] text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest shadow-xl transition-all active:scale-95 group">
                            {{ $t('gating.btn_upgrade') }}
                            <ArrowRight :size="16" stroke-width="3" class="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button @click="close" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                             {{ $t('gating.btn_stay') }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- [ACTIVE STATE] Original Modal Content -->
            <template v-else>
                <div class="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0 z-20 rounded-t-[2.5rem] transition-colors duration-500" :class="{'mt-12': conflictError}">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl text-white shadow-lg dark:shadow-none shadow-indigo-100 dark:shadow-indigo-900/20">
                            ✨
                        </div>
                        <div>
                            <h2 class="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1.5 transition-colors duration-500">
                                {{ $t('batch_mode_title', 'Batch finance') }}
                            </h2>
                            <div class="relative">
                                <button type="button" @click="showDatePicker = !showDatePicker" class="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border border-indigo-100 dark:border-indigo-500/20 rounded-lg px-2.5 py-1 transition-all tracking-widest flex items-center gap-2">
                                    <span>{{ dateDisplay }}</span>
                                    <span>📅</span>
                                </button>
                                <transition enter-active-class="transition ease-out duration-[4200ms]" enter-from-class="opacity-0 translate-y-4 sm:translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4 sm:translate-y-2">
                                    <div v-if="showDatePicker" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:top-full sm:left-0 sm:mt-2 sm:origin-top-left sm:block sm:inset-auto">
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
                    
                    <div class="flex items-center gap-3">
                        <button @click="switchToSingle" type="button" class="hidden sm:flex text-[10px] font-black tracking-widest px-4 py-2 rounded-xl border-2 border-slate-50 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-500/20 transition-all active:scale-95 items-center gap-2">
                            <span>↩️</span> {{ $t('btn_single_mode', 'Single mode') }}
                        </button>
                        <button @click="close" class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90 flex items-center justify-center font-bold">
                            ✕
                        </button>
                    </div>
                </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-500">
                
                <div class="space-y-4">
                    <div v-for="(trx, index) in form.transactions" :key="index" 
                        class="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none relative group animate-in fade-in slide-in-from-bottom-4 duration-300 transition-colors duration-500">
                        
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-[10px] font-bold tracking-widest px-3 py-1 rounded-lg"
                                :class="trx.type === 'expense' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'">
                                {{ $t('transaction', 'Transaction') }} #{{ index + 1 }}
                            </span>
                            <button @click="removeRow(index)" type="button" class="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-500 dark:hover:text-rose-400 transition-all transition-colors duration-300" :disabled="form.transactions.length <= 1" :class="{'opacity-50 cursor-not-allowed': form.transactions.length <= 1}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            <div class="space-y-4">
                                <div>
                                    <label class="text-[9px] font-bold text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 ml-1 block transition-colors duration-500">{{ $t('type', 'Type') }}</label>
                                    <div class="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-xl h-11 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
                                        <button type="button" @click="changeType(index, 'expense')" class="flex-1 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center tracking-wider" :class="trx.type === 'expense' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm border border-slate-200 dark:border-slate-600' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'">
                                            {{ $t('out', 'Out') }}
                                        </button>
                                        <button type="button" @click="changeType(index, 'income')" class="flex-1 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center tracking-wider" :class="trx.type === 'income' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200 dark:border-slate-600' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'">
                                            {{ $t('in', 'In') }}
                                        </button>
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="text-[9px] font-bold text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 ml-1 block transition-colors duration-500">{{ $t('category', 'Category') }}</label>
                                    <div class="relative">
                                        <select v-model="trx.category" class="w-full pl-3 pr-8 h-11 !rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 font-bold text-slate-700 dark:text-slate-200 capitalize text-xs appearance-none cursor-pointer transition-all transition-colors duration-500"
                                            :class="[
                                                form.errors[`transactions.${index}.category`] ? '!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400' : '',
                                                trx.type === 'expense' ? 'focus:border-rose-400' : 'focus:border-emerald-400'
                                            ]">
                                            <option value="" disabled>{{ $t('select_placeholder', 'Choose...') }}</option>
                                            <option v-for="catSlug in getCategoriesByType(trx.type)" :key="catSlug" :value="catSlug">
                                                {{ getDetail(catSlug).icon }} {{ getDetail(catSlug).name }}
                                            </option>
                                        </select>
                                        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-600">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path d="M19 9l-7 7-7-7"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <div>
                                    <label class="text-[9px] font-bold tracking-widest mb-1.5 ml-1 block transition-colors duration-500" :class="trx.type === 'expense' ? 'text-rose-400 dark:text-rose-400/80' : 'text-emerald-400 dark:text-emerald-400/80'">{{ $t('amount', 'Amount') }}</label>
                                    <div class="relative group">
                                        <span class="absolute left-3 top-1/2 -translate-y-1/2 font-black text-[12px] transition-colors duration-500" :class="trx.type === 'expense' ? 'text-rose-500 dark:text-rose-400' : 'text-emerald-500 dark:text-emerald-400'">{{ currencySymbol }}</span>
                                        <input type="text" :value="formatDisplay(trx.amount)" @input="e => onInputAmount(e, index)" placeholder="0" 
                                            class="w-full h-11 pl-10 pr-3 !rounded-xl border-2 bg-white dark:bg-slate-900 focus:ring-0 font-black text-sm transition-all dark:text-white transition-colors duration-500"
                                            :class="[
                                                form.errors[`transactions.${index}.amount`] ? '!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200',
                                                trx.type === 'expense' ? 'focus:border-rose-500' : 'focus:border-emerald-500'
                                            ]"
                                        >
                                    </div>
                                </div>

                                <div>
                                    <label class="text-[9px] font-bold text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 ml-1 block transition-colors duration-500">{{ $t('description', 'Description') }}</label>
                                    <TextInput 
                                        v-model="trx.title" 
                                        :placeholder="$t('desc_placeholder', 'Cth: Kopi...')" 
                                        class="w-full text-xs font-bold h-11 px-3 !rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-all focus:ring-0 text-slate-700 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-colors duration-500" 
                                        :class="[
                                            form.errors[`transactions.${index}.title`] ? '!border-rose-300 dark:!border-rose-500/50 !bg-rose-50 dark:!bg-rose-500/10 text-rose-600 dark:text-rose-400' : '',
                                            trx.type === 'expense' ? 'focus:border-rose-400' : 'focus:border-emerald-400'
                                        ]"
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <button @click="addRow" type="button" class="mt-8 w-full py-4 border-2 border-dashed border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-2xl text-indigo-500 dark:text-indigo-400 font-bold tracking-widest text-[10px] hover:border-indigo-400 dark:hover:border-indigo-500/40 hover:bg-indigo-100 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm dark:shadow-none transition-colors duration-500">
                    <span class="w-5 h-5 rounded-md bg-indigo-200 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-200 flex items-center justify-center text-xs shadow-sm">+</span> 
                    {{ $t('btn_add_another_transaction', 'Add more transaction') }}
                </button>
                </div>

                <!-- Footer -->
                <div class="px-8 py-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 transition-colors">
                    <div class="text-[10px] font-bold text-slate-400 dark:text-slate-600 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                        {{ $t('total_label') }} <span class="text-indigo-600 dark:text-indigo-400 text-sm font-black">{{ form.transactions.length }}</span>
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
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; margin-block: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #1e293b; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #334155; }
</style>