<script setup>
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

// Import Kalender Custom
import FinanceDatePicker from './FinanceDatePicker.vue';

const props = defineProps({
    show: Boolean,
    form: Object,
    budgets: Array,    
    categories: Array,  
    close: Function,
    submit: Function
});

// Ambil logic formatting & Locale
const { activeCurrency, getCategoryDetails, cleanAmount, appLocale } = useFinanceFormat();

// State untuk Kalender
const showDatePicker = ref(false);

// --- LOGIC KATEGORI ---
const availableCategories = computed(() => {
    if (props.form.type === 'income') {
        return props.categories.filter(c => c.type === 'income').map(c => c.slug);
    } else {
        const budgetSlugs = props.budgets.map(b => b.category);
        return budgetSlugs;
    }
});

const getDetail = (slug) => getCategoryDetails(slug, props.categories);

// Reset category kalo ganti tipe
watch(() => props.form.type, () => { props.form.category = ''; });

// --- LOGIC MATA UANG DINAMIS ---
const isDotSeparator = computed(() => ['IDR', 'EUR', 'de-DE'].includes(activeCurrency.value));

const currencySymbol = computed(() => {
    const map = { IDR: 'Rp', USD: '$', GBP: '£', EUR: '€', JPY: '¥' };
    return map[activeCurrency.value] || activeCurrency.value;
});

// --- LOGIC TAMPILAN TANGGAL DI INPUT ---
const dateDisplay = computed(() => {
    if (!props.form.date) return '';
    // Ambil locale code (id, en)
    const loc = appLocale.value ? appLocale.value.split('-')[0] : 'id';
    return dayjs(props.form.date).locale(loc).format('dddd, DD MMMM YYYY');
});

// Format Tampilan Uang
const formatDisplay = (val) => {
    if (!val) return '';
    const str = val.toString();
    if (isDotSeparator.value) {
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
    } else {
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    }
};

// Handle Input Uang
const onInput = (e) => {
    let rawValue = e.target.value;
    let cleanVal;

    if (isDotSeparator.value) {
        cleanVal = rawValue.replace(/\./g, ''); 
    } else {
        cleanVal = rawValue.replace(/,/g, ''); 
    }

    if (!isNaN(cleanVal)) {
        props.form.amount = cleanVal;
    }
};
</script>

<template>
    <Teleport to="body">
        <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            <div @click="close" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div>
            
            <div class="bg-white w-full max-w-md rounded-[2rem] shadow-2xl z-10 p-6 animate-in zoom-in-95 duration-200 border border-slate-100 relative overflow-visible"> <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-black text-slate-800">✨ {{ $t('record_transaction') }}</h3>
                    <button @click="close" class="bg-slate-50 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">✕</button>
                </div>
                
                <form @submit.prevent="submit" class="space-y-5">
                    <div class="flex bg-slate-100 p-1.5 rounded-2xl">
                        <button type="button" @click="props.form.type = 'expense'" class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2" :class="props.form.type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">
                            💸 {{ $t('expense') }}
                        </button>
                        <button type="button" @click="props.form.type = 'income'" class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2" :class="props.form.type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'">
                            💰 {{ $t('income') }}
                        </button>
                    </div>

                    <div>
                        <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">{{ $t('description') }}</label>
                        <input v-model="form.title" type="text" :placeholder="$t('desc_placeholder')" class="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 placeholder:text-slate-300 transition-all">
                    </div>

                    <div>
                        <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">{{ $t('amount') }} ({{ currencySymbol }})</label>
                        <div class="relative group">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{{ currencySymbol }}</span>
                            <input type="text" :value="formatDisplay(form.amount)" @input="onInput" placeholder="0" class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-black text-lg text-slate-700 placeholder:text-slate-300 transition-all">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">{{ $t('category') }}</label>
                            <div class="relative">
                                <select v-model="form.category" class="w-full pl-4 pr-8 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 capitalize text-sm appearance-none cursor-pointer hover:bg-slate-50">
                                    <option value="" disabled selected>{{ $t('select_placeholder') }}</option>
                                    <option v-for="catSlug in availableCategories" :key="catSlug" :value="catSlug">
                                        {{ getDetail(catSlug).icon }} {{ getDetail(catSlug).name }}
                                    </option>
                                </select>
                                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                            </div>
                            <p v-if="form.type === 'expense' && availableCategories.length === 0" class="text-[9px] text-rose-500 mt-1">{{ $t('create_budget_first') }}</p>
                        </div>

                        <div class="relative">
                            <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">{{ $t('date') }}</label>
                            
                            <button 
                                type="button"
                                @click="showDatePicker = !showDatePicker"
                                class="w-full px-4 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-left font-bold text-slate-700 text-sm transition-all flex items-center justify-between"
                                :class="showDatePicker ? 'ring-2 ring-indigo-500 bg-white' : ''"
                            >
                                <span class="truncate">{{ dateDisplay }}</span>
                                <span class="text-slate-400 text-xs">📅</span>
                            </button>

                            <transition
                                enter-active-class="transition ease-out duration-200"
                                enter-from-class="opacity-0 translate-y-2"
                                enter-to-class="opacity-100 translate-y-0"
                                leave-active-class="transition ease-in duration-150"
                                leave-from-class="opacity-100 translate-y-0"
                                leave-to-class="opacity-0 translate-y-2"
                            >
                                <div v-if="showDatePicker" class="absolute bottom-full right-0 mb-2 z-50 shadow-2xl rounded-3xl origin-bottom-right">
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

                    <div class="flex gap-3 pt-4">
                        <button type="button" @click="close" class="flex-1 py-3.5 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition">{{ $t('btn_cancel') }}</button>
                        <button type="submit" class="flex-[2] py-3.5 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all flex justify-center items-center gap-2" :class="form.type === 'expense' ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-200' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200'">
                            {{ $t('btn_save') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>