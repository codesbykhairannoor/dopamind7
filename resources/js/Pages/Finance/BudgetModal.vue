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
</script>

<template>
    <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="close" class="absolute inset-0 bg-slate-900/30 backdrop-blur-md transition-opacity"></div>
        
        <div class="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl z-10 p-6 animate-in zoom-in-95 duration-200">
            <h3 class="text-xl font-black text-slate-800 mb-6">
                {{ form.id ? '✏️ ' + $t('edit_budget') : '🎯 ' + $t('new_budget') }}
            </h3>
            
            <form @submit.prevent="submit" class="space-y-5">
                <div>
                    <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">{{ $t('category_name') }}</label>
                    <div class="flex gap-2">
                        <div class="relative">
                            <button type="button" @click="showIconGrid = !showIconGrid" class="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-xl text-2xl border border-slate-100 hover:bg-slate-100 transition">
                                {{ form.icon }}
                            </button>
                            <div v-if="showIconGrid" class="absolute top-14 left-0 w-64 p-3 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 grid grid-cols-6 gap-2 animate-in fade-in zoom-in-95 duration-100">
                                <button v-for="icon in iconPalette" :key="icon" type="button" @click="form.icon = icon; showIconGrid = false" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-indigo-50 text-lg transition">
                                    {{ icon }}
                                </button>
                            </div>
                            <div v-if="showIconGrid" @click="showIconGrid = false" class="fixed inset-0 z-40"></div>
                        </div>

                        <input v-model="form.name" @input="onNameInput" type="text" :placeholder="$t('placeholder_name')" class="flex-1 px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700">
                    </div>
                    <p v-if="form.id" class="text-[10px] text-slate-400 mt-1 italic">*{{ $t('budget_warning') }}</p>
                </div>

                <div>
                    <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">{{ $t('budget_limit') }}</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{{ currencySymbol }}</span>
                        <input type="text" :value="formatDisplay(form.limit_amount)" @input="onInputAmount" placeholder="0" class="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-black text-lg text-slate-700">
                    </div>
                </div>

                <div class="flex gap-3 pt-2">
                    <button type="button" @click="close" class="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">{{ $t('cancel') }}</button>
                    <button type="submit" :disabled="form.processing" class="flex-[2] py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all disabled:opacity-50">
                        {{ form.processing ? $t('saving') : $t('save') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
    </Teleport>
</template>