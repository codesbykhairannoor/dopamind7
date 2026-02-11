<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
// 1. Import helper bahasa & locale dayjs
import { getActiveLanguage } from 'laravel-vue-i18n';
import 'dayjs/locale/id';
import 'dayjs/locale/en';

import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import Modal from '@/Components/Modal.vue';

const props = defineProps({
    show: Boolean,
    dayData: Object, 
    categories: Array, // Pastikan ini diterima dari parent
    close: Function,
    onDelete: Function,
    onEdit: Function 
});

const { formatMoney, getCategoryDetails } = useFinanceFormat();

// 2. Computed Date yang Dinamis (Ikut Bahasa Aplikasi)
const formattedDate = computed(() => {
    if (!props.dayData?.date) return '';
    
    // Ambil bahasa aplikasi saat ini (id/en)
    let lang = getActiveLanguage() || 'id';
    
    // Bersihkan format (id-ID -> id) agar dayjs paham
    if (lang.includes('-')) lang = lang.split('-')[0];

    // Format tanggal
    return dayjs(props.dayData.date).locale(lang).format('dddd, D MMMM YYYY');
});

const handleEditAction = (trx) => {
    props.close();
    props.onEdit(trx);
};
</script>

<template>
    <Modal :show="show" @close="close" maxWidth="lg">
        <div class="bg-white rounded-2xl overflow-hidden shadow-xl" v-if="dayData">
            
            <div class="bg-indigo-600 px-6 py-5 relative overflow-hidden text-white">
                <div class="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div class="relative z-10 flex justify-between items-start">
                    <div>
                        <span class="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">{{ $t('daily_detail') }}</span>
                        <h3 class="text-xl font-black mt-0.5 capitalize">{{ formattedDate }}</h3>
                    </div>
                    <button @click="close" class="bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition">✕</button>
                </div>
                
                <div class="flex gap-3 mt-4">
                    <div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex-1">
                        <span class="text-[10px] text-indigo-100 uppercase block font-bold">{{ $t('income') }}</span>
                        <span class="text-sm font-bold text-emerald-300">+ {{ formatMoney(dayData.total_income) }}</span>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex-1">
                        <span class="text-[10px] text-indigo-100 uppercase block font-bold">{{ $t('expense') }}</span>
                        <span class="text-sm font-bold text-rose-300">- {{ formatMoney(dayData.total_expense) }}</span>
                    </div>
                </div>
            </div>

            <div class="p-0 bg-slate-50 max-h-[60vh] overflow-y-auto">
                <div class="divide-y divide-slate-100">
                    <div v-for="trx in dayData.transactions" :key="trx.id" class="bg-white p-4 flex items-center gap-3 hover:bg-slate-50 transition group">
                        
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-colors" :class="getCategoryDetails(trx.category, categories).bg || 'bg-slate-100'">
                            {{ getCategoryDetails(trx.category, categories).icon }}
                        </div>
                        
                        <div class="flex-1 min-w-0">
                            <p class="font-bold text-slate-700 text-sm truncate">{{ trx.title }}</p>
                            <span class="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded capitalize">
                                {{ getCategoryDetails(trx.category, categories).name }}
                            </span>
                        </div>
                        
                        <div class="text-right">
                            <p class="font-bold text-sm font-mono mb-1" :class="trx.type === 'income' ? 'text-emerald-600' : 'text-slate-800'">
                                {{ trx.type === 'income' ? '+' : '-' }} {{ formatMoney(trx.amount) }}
                            </p>
                            <div class="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                <button @click="handleEditAction(trx)" class="text-[10px] font-bold text-indigo-500 hover:underline">{{ $t('edit') }}</button>
                                <button @click="onDelete(trx.id)" class="text-[10px] font-bold text-rose-400 hover:text-rose-600">{{ $t('delete') }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>