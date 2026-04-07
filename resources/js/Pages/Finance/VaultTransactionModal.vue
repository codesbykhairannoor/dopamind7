<script setup>
import { ref, computed } from 'vue';
import { X, Target, Save, CheckCircle2, TrendingUp, ArrowDownCircle, ArrowUpCircle } from 'lucide-vue-next';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    show: Boolean,
    saving: Object,
    type: String, // 'deposit' | 'withdraw'
    onClose: Function,
    onSave: Function,
    processing: Boolean
});

const emit = defineEmits(['close', 'save']);
const { formatMoney } = useFinanceFormat();

const amount = ref('');
const date = ref(new Date().toISOString().split('T')[0]);

const presets = [50000, 100000, 500000, 1000000];

const handleClose = () => {
    amount.value = '';
    emit('close');
};

const handleSave = () => {
    if (!amount.value || isNaN(amount.value) || amount.value <= 0) return;
    
    if (props.type === 'withdraw' && Number(amount.value) > props.saving.current_amount) {
        alert('Insufficient funds!');
        return;
    }

    emit('save', {
        amount: Number(amount.value),
        date: date.value,
        type: props.type
    });
    amount.value = '';
};

const setAmount = (val) => {
    amount.value = val;
};
</script>

<template>
    <Teleport to="body">
        <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md transition-opacity" @click="handleClose"></div>

            <div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                
                <!-- Quick Header -->
                <div class="p-8 pb-0 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" 
                             :style="{ backgroundColor: (saving?.color || '#6366f1') + '20' }">
                            {{ saving?.icon || '🏦' }}
                        </div>
                        <div>
                            <h2 class="text-xl font-black text-slate-800 dark:text-white">
                                {{ type === 'deposit' ? 'Add Fuel' : 'Withdraw' }}
                            </h2>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                {{ saving?.title }}
                            </p>
                        </div>
                    </div>
                    <button @click="handleClose" class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all active:scale-95">
                        <X :size="20" />
                    </button>
                </div>

                <div class="p-8 space-y-6">
                    <!-- Current Status -->
                    <div class="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 flex justify-between items-center transition-all">
                        <div>
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Available in Vault</p>
                            <p class="text-lg font-black text-slate-800 dark:text-white tabular-nums">
                                {{ formatMoney(saving?.current_amount || 0) }}
                            </p>
                        </div>
                        <div class="text-right">
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Target</p>
                            <p class="text-xs font-bold text-indigo-500 tabular-nums">
                                {{ formatMoney(saving?.target_amount || 0) }}
                            </p>
                        </div>
                    </div>

                    <!-- Input Box -->
                    <div class="space-y-4">
                        <div class="relative group">
                            <label class="absolute -top-2.5 left-5 bg-white dark:bg-slate-900 px-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest z-10">
                                {{ type === 'deposit' ? 'Deposit Amount' : 'Withdrawal Amount' }}
                            </label>
                            <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 border-2 border-transparent focus-within:border-indigo-500/20 focus-within:bg-white dark:focus-within:bg-slate-800 rounded-[1.5rem] px-5 py-4 transition-all shadow-inner">
                                <span class="text-slate-400 font-black text-lg">Rp</span>
                                <input v-model="amount" type="number" 
                                       class="w-full bg-transparent border-none p-0 text-2xl font-black text-slate-800 dark:text-white placeholder-slate-300 focus:ring-0"
                                       placeholder="0" autofocus />
                            </div>
                        </div>

                        <!-- Presets -->
                        <div class="grid grid-cols-4 gap-2">
                            <button v-for="p in presets" :key="p"
                                    @click="setAmount(p)"
                                    class="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-[9px] font-black text-slate-500 dark:text-slate-400 hover:bg-indigo-500 hover:text-white transition-all active:scale-95 border border-slate-100 dark:border-slate-800">
                                {{ Math.floor(p/1000) }}k
                            </button>
                        </div>
                    </div>

                    <!-- Date Input -->
                    <div class="space-y-1">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transaction Date</label>
                        <input v-model="date" type="date" 
                               class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer" />
                    </div>
                </div>

                <!-- Footer Action -->
                <div class="p-8 pt-0">
                    <button @click="handleSave"
                            :disabled="processing || !amount"
                            class="w-full relative group overflow-hidden py-4 rounded-2xl font-black text-sm transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                            :class="type === 'deposit' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-rose-500 text-white shadow-xl shadow-rose-500/20'">
                        <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span class="relative flex items-center justify-center gap-3">
                            <component :is="type === 'deposit' ? ArrowDownCircle : ArrowUpCircle" :size="18" />
                            {{ processing ? 'Processing...' : (type === 'deposit' ? 'Secure Funds' : 'Confirm Withdrawal') }}
                        </span>
                    </button>
                    <p v-if="type === 'withdraw'" class="text-center text-[10px] font-bold text-slate-400 mt-4">
                         Money will be moved back to your main wallet immediately.
                    </p>
                </div>
            </div>
        </div>
    </Teleport>
</template>
