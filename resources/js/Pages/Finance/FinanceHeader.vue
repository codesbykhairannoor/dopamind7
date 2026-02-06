<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

const props = defineProps({
    currentMonth: String,
    currentMonthKey: String,
    stats: Object,
    onChangeDate: Function,
    onAddClick: Function,
    onUpdateTarget: Function
});

const { formatRupiah } = useFinanceFormat();

// --- LOGIC DROPDOWN (TETAP SAMA) ---
const isDropdownOpen = ref(false);
const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const activeYear = computed(() => 
    props.currentMonthKey ? dayjs(props.currentMonthKey).year() : dayjs().year()
);
const activeMonthNum = computed(() => 
    props.currentMonthKey ? dayjs(props.currentMonthKey).month() : dayjs().month()
);

const selectMonth = (monthIndex) => {
    const month = String(monthIndex + 1).padStart(2, '0');
    const payload = `${activeYear.value}-${month}`;
    isDropdownOpen.value = false;
    props.onChangeDate(payload);
};

const changeYear = (offset) => {
    const newYear = activeYear.value + offset;
    const month = String(activeMonthNum.value + 1).padStart(2, '0');
    props.onChangeDate(`${newYear}-${month}`);
};

// --- LOGIC EDIT GAJI (DI-UPGRADE) ---
const isEditingSalary = ref(false);
const inputSalaryRef = ref(null);
const rawSalary = ref(props.stats.income_target || 0);

watch(() => props.stats.income_target, (val) => {
    if (!isEditingSalary.value) {
        rawSalary.value = val || 0;
    }
});

const displaySalary = computed({
    get: () => rawSalary.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    set: (val) => {
        const num = val.replace(/\./g, '').replace(/[^0-9]/g, '');
        rawSalary.value = num === '' ? 0 : parseInt(num);
    }
});

const startEditing = () => {
    rawSalary.value = props.stats.income_target; // Reset value saat mulai
    isEditingSalary.value = true;
    nextTick(() => inputSalaryRef.value?.focus());
};

const cancelEdit = () => {
    isEditingSalary.value = false;
    rawSalary.value = props.stats.income_target; // Balikin ke nilai asli
};

const saveSalary = () => {
    if (rawSalary.value !== props.stats.income_target) {
        props.onUpdateTarget(rawSalary.value);
    }
    isEditingSalary.value = false;
};
</script>

<template>
    <div class="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100/80 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 mb-6 transition-all">
        <div class="max-w-7xl mx-auto flex justify-between items-center gap-4">
            
            <div class="relative">
                <button 
                    @click="isDropdownOpen = !isDropdownOpen"
                    class="flex items-center gap-2 bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 pl-3 pr-2 py-2 rounded-xl transition-all group active:scale-95"
                >
                    <span class="text-xs font-black text-slate-700 uppercase tracking-wide group-hover:text-indigo-600 transition-colors">
                        {{ currentMonth }}
                    </span>
                    <div class="bg-white p-1 rounded-md shadow-sm border border-slate-100 group-hover:bg-indigo-50 transition-colors">
                        <svg class="w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-transform duration-300" :class="{'rotate-180': isDropdownOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </button>

                <Transition name="slide-fade">
                    <div v-if="isDropdownOpen" class="absolute left-0 mt-2 w-72 bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 p-4 z-50 ring-1 ring-slate-900/5">
                        <div class="flex items-center justify-between mb-4 px-2">
                            <button @click="changeYear(-1)" class="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="2.5"></path></svg></button>
                            <span class="text-base font-black text-slate-800 tracking-tight">{{ activeYear }}</span>
                            <button @click="changeYear(1)" class="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="2.5"></path></svg></button>
                        </div>
                        <div class="grid grid-cols-3 gap-2">
                            <button v-for="(month, index) in months" :key="month" @click="selectMonth(index)"
                                :class="[
                                    'py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest',
                                    activeMonthNum === index 
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                                        : 'bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
                                ]">
                                {{ month.slice(0, 3) }}
                            </button>
                        </div>
                    </div>
                </Transition>
                <div v-if="isDropdownOpen" @click="isDropdownOpen = false" class="fixed inset-0 z-40 bg-transparent"></div>
            </div>

            <button @click="onAddClick" class="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white pl-3 pr-4 py-2 rounded-xl shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
                <div class="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-widest">Transaksi</span>
            </button>
        </div>
    </div>

    <div class="animate-in fade-in slide-in-from-bottom-4 duration-700 mb-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-stretch">
            
            <div class="lg:col-span-7 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 p-6 md:p-8 text-white shadow-2xl shadow-indigo-200/50 flex flex-col justify-center min-h-[200px]">
                
                <div class="relative z-10 flex flex-col h-full justify-between">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-bold text-[10px] uppercase tracking-widest text-indigo-100/80 mb-2">Sisa Saldo Tersedia</p>
                            <h3 class="text-4xl md:text-5xl font-black tracking-tight leading-none">
                                {{ formatRupiah(stats.balance) }}
                            </h3>
                        </div>
                        <div class="bg-white/10 p-2 rounded-xl backdrop-blur-md">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                        </div>
                    </div>

                    <div class="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                         <div class="flex -space-x-2">
                            <div class="w-6 h-6 rounded-full bg-indigo-300 border-2 border-indigo-600"></div>
                            <div class="w-6 h-6 rounded-full bg-violet-300 border-2 border-indigo-600"></div>
                         </div>
                         <span class="text-[10px] font-medium text-indigo-100">Keuanganmu bulan ini</span>
                    </div>
                </div>

                <div class="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
            </div>

            <div class="lg:col-span-5 grid grid-rows-2 gap-4">
                
                <div class="bg-white border border-slate-100 rounded-[2rem] px-6 py-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group flex items-center justify-between">
                    
                    <div class="flex-1 min-w-0"> <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                            Base / Modal
                            <span v-if="!isEditingSalary" class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-500 transition-colors"></span>
                        </p>
                        
                        <div v-if="!isEditingSalary" class="flex items-center justify-between">
                            <h4 class="text-xl md:text-2xl font-black text-slate-800 truncate pr-2">
                                {{ formatRupiah(stats.income_target) }}
                            </h4>
                            <button @click="startEditing" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 shadow-sm">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </button>
                        </div>

                        <div v-else class="flex items-center gap-2 animate-in zoom-in-95 duration-200">
                            <input 
                                ref="inputSalaryRef"
                                v-model="displaySalary" 
                                type="text" 
                                class="w-full bg-indigo-50/50 border border-indigo-200 rounded-lg px-2 py-1 text-lg font-black text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                @keyup.enter="saveSalary"
                            >
                            <button @click="saveSalary" class="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm transition active:scale-90">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                            </button>
                            <button @click="cancelEdit" class="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition active:scale-90">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-emerald-50/40 border border-emerald-100/60 rounded-[2rem] p-5 flex flex-col justify-center relative overflow-hidden group hover:bg-emerald-50 transition-colors">
                        <div class="flex items-center justify-between mb-1">
                            <p class="text-[9px] font-bold text-emerald-600/60 uppercase tracking-widest">Masuk</p>
                            <div class="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-[10px] text-emerald-600 group-hover:scale-110 transition">↓</div>
                        </div>
                        <h4 class="text-lg md:text-xl font-black text-emerald-700 truncate">
                            {{ formatRupiah(stats.total_income) }}
                        </h4>
                    </div>

                    <div class="bg-rose-50/40 border border-rose-100/60 rounded-[2rem] p-5 flex flex-col justify-center relative overflow-hidden group hover:bg-rose-50 transition-colors">
                        <div class="flex items-center justify-between mb-1">
                            <p class="text-[9px] font-bold text-rose-600/60 uppercase tracking-widest">Keluar</p>
                            <div class="w-5 h-5 bg-rose-100 rounded-full flex items-center justify-center text-[10px] text-rose-600 group-hover:scale-110 transition">↑</div>
                        </div>
                        <h4 class="text-lg md:text-xl font-black text-rose-700 truncate">
                            {{ formatRupiah(stats.total_expense) }}
                        </h4>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.slide-fade-enter-active { transition: all 0.2s ease-out; }
.slide-fade-leave-active { transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1); }
.slide-fade-enter-from, .slide-fade-leave-to { transform: translateY(-10px); opacity: 0; }
</style>