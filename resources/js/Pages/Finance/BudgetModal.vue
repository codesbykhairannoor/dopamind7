<script setup>
import { ref, watch, computed } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    show: Boolean,
    form: Object, 
    categories: Array, 
    close: Function,
    submit: Function
});

const { activeCurrency } = useFinanceFormat();
const showIconGrid = ref(false);
const iconPalette = ['🍔','🛵','⚡','🛍️','🏠','💊','📚','🎮','🍿','✈️','🐶','🔧','💄','⚽','💻','🎁','💸','⛽','👗'];

const isDotSeparator = computed(() => ['IDR', 'EUR', 'de-DE'].includes(activeCurrency.value));
const currencySymbol = computed(() => {
    const map = { IDR: 'Rp', USD: '$', GBP: '£', EUR: '€', JPY: '¥' };
    return map[activeCurrency.value] || activeCurrency.value;
});

const formatDisplay = (val) => {
    if(!val) return '';
    const str = val.toString();
    return isDotSeparator.value 
        ? str.replace(/\B(?=(\d{3})+(?!\d))/g, ".") 
        : str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const onInputAmount = (e) => {
    let value = isDotSeparator.value 
        ? e.target.value.replace(/\./g, '') 
        : e.target.value.replace(/,/g, '');
    if (!isNaN(value)) props.form.limit_amount = value;
};

watch(() => props.show, (isOpen) => {
    if (isOpen) {
        showIconGrid.value = false;
        if (props.form.id && props.form.category) {
            const existing = props.categories.find(c => c.slug === props.form.category);
            if (existing) {
                props.form.name = existing.name;
                props.form.icon = existing.icon;
            }
        } else if (!props.form.id) {
            props.form.reset();
            props.form.icon = '💸';
        }
    }
});

const onNameInput = (e) => {
    if (!props.form.id) {
        props.form.category = e.target.value.toLowerCase().trim().replace(/\s+/g, '_');
    }
};

// 🔥 KUNCI UTAMA INSTAN: Fungsi untuk tembak API dan tutup Modal bersamaan!
const handleInstantSubmit = () => {
    props.submit(); // Jalankan request dan Optimistic Update di background
    props.close();  // Langsung hancurkan modal dari layar (0ms Delay)
};
</script>

<template>
    <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="close" class="absolute inset-0 bg-slate-900/30 dark:bg-black/60 backdrop-blur-md transition-all duration-300"></div>
        
        <div class="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] shadow-2xl dark:shadow-none z-10 p-6 animate-in zoom-in-95 duration-200 border border-transparent dark:border-slate-800 transition-all duration-500">
            <h3 class="text-xl font-black text-slate-800 dark:text-white mb-6 transition-colors duration-500">
                {{ form.id ? '✏️ ' + $t('edit_budget') : '🎯 ' + $t('new_budget') }}
            </h3>
            
            <form @submit.prevent="handleInstantSubmit" class="space-y-5">
                <div>
                    <label class="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 transition-colors duration-500">{{ $t('category_name') }}</label>
                    <div class="flex gap-2">
                        <div class="relative">
                            <button type="button" @click="showIconGrid = !showIconGrid" class="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl text-2xl border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300">
                                {{ form.icon }}
                            </button>
                            <div v-if="showIconGrid" class="absolute top-14 left-0 w-64 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-700 z-50 grid grid-cols-6 gap-2 animate-in fade-in zoom-in-95 duration-100">
                                <button v-for="icon in iconPalette" :key="icon" type="button" @click="form.icon = icon; showIconGrid = false" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-lg transition-all duration-300">
                                    {{ icon }}
                                </button>
                            </div>
                            <div v-if="showIconGrid" @click="showIconGrid = false" class="fixed inset-0 z-40"></div>
                        </div>

                        <input v-model="form.name" @input="onNameInput" type="text" :placeholder="$t('placeholder_name')" class="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 dark:text-slate-200 transition-all duration-500 placeholder:dark:text-slate-600">
                    </div>
                    <p v-if="form.id" class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 italic transition-colors duration-500">*{{ $t('budget_warning') }}</p>
                </div>

                <div>
                    <label class="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 transition-colors duration-500">{{ $t('budget_limit') }}</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold transition-colors duration-500">{{ currencySymbol }}</span>
                        <input type="text" :value="formatDisplay(form.limit_amount)" @input="onInputAmount" placeholder="0" class="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 font-black text-lg text-slate-700 dark:text-white transition-all duration-500">
                    </div>
                </div>

                <div class="flex gap-3 pt-2">
                    <button type="button" @click="close" class="flex-1 py-3 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 rounded-xl transition-all duration-300">{{ $t('cancel') }}</button>
                    <button type="submit" class="flex-[2] py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg dark:shadow-none shadow-indigo-200 dark:shadow-indigo-900/20 hover:bg-indigo-700 active:scale-95 transition-all duration-300">
                        {{ $t('save') }}
                    </button>
                </div>
                
            </form>
        </div>
    </div>
    </Teleport>
</template>