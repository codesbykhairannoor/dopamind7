<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import Modal from '@/Components/Modal.vue'; // Sesuaikan path komponen Modal bawaan lu

const props = defineProps({
    show: Boolean,
    dayData: Object, 
    close: Function,
    onDelete: Function
});

const { formatRupiah, getCategoryDetails } = useFinanceFormat();

const formattedDate = computed(() => {
    if (!props.dayData?.date) return '';
    return dayjs(props.dayData.date).locale('id').format('dddd, D MMMM YYYY');
});
</script>

<template>
    <Modal :show="show" @close="close" maxWidth="lg">
        <div class="bg-white rounded-2xl overflow-hidden shadow-xl" v-if="dayData">
            
            <div class="bg-indigo-600 px-6 py-5 relative overflow-hidden">
                <div class="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                
                <div class="relative z-10 flex justify-between items-start">
                    <div>
                        <span class="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">Detail Harian</span>
                        <h3 class="text-xl font-black text-white mt-0.5">{{ formattedDate }}</h3>
                    </div>
                    <button @click="close" class="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-colors">
                        ✕
                    </button>
                </div>

                <div class="flex gap-3 mt-4">
                    <div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex-1">
                        <span class="text-[10px] text-indigo-100 uppercase block font-bold">Masuk</span>
                        <span class="text-sm font-bold text-emerald-300">+ {{ formatRupiah(dayData.total_income) }}</span>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex-1">
                        <span class="text-[10px] text-indigo-100 uppercase block font-bold">Keluar</span>
                        <span class="text-sm font-bold text-rose-300">- {{ formatRupiah(dayData.total_expense) }}</span>
                    </div>
                </div>
            </div>

            <div class="p-0 bg-slate-50 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div class="divide-y divide-slate-100">
                    <div v-for="trx in dayData.transactions" :key="trx.id" class="bg-white p-4 flex items-center gap-3 hover:bg-slate-50 transition group">
                        
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                            :class="getCategoryDetails(trx.category).bg">
                            {{ getCategoryDetails(trx.category).icon }}
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="font-bold text-slate-700 text-sm truncate">{{ trx.title }}</p>
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded capitalize">
                                    {{ trx.category }}
                                </span>
                            </div>
                        </div>

                        <div class="text-right">
                            <p class="font-bold text-sm font-mono" :class="trx.type === 'income' ? 'text-emerald-600' : 'text-slate-800'">
                                {{ trx.type === 'income' ? '+' : '-' }} {{ formatRupiah(trx.amount) }}
                            </p>
                            <button @click="onDelete(trx.id)" class="text-[10px] font-bold text-rose-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </Modal>
</template>