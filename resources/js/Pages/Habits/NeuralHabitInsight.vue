<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { router } from '@inertiajs/vue3';
import { useGating } from '@/Composables/useGating';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import Swal from 'sweetalert2';

const props = defineProps({
    currentMood: String
});

const { isQuantum } = useGating();
const isAnalyzing = ref(false);
const showStack = ref(false);
const stackData = ref(null);
const moodAdvisory = ref(null);
const stagnantData = ref(null);

const checkStagnation = async () => {
    if (!isQuantum.value) {
        router.visit(route('billing'), { data: { from: 'habit_ai_stagnation' } });
        return;
    }
    isAnalyzing.value = true;
    try {
        const res = await axios.post(route('coach.habit.stagnation'));
        if (res.data.action) {
            stagnantData.value = res.data;
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Habit Health OK',
                text: 'Belum ada habit yang stagnan atau dormant. Terus pertahankan!',
                confirmButtonColor: '#4f46e5'
            });
        }
    } catch (e) {
        console.error(e);
    } finally {
        isAnalyzing.value = false;
    }
};

const getHabitStack = async () => {
    if (!isQuantum.value) {
        router.visit(route('billing'), { data: { from: 'habit_ai_stack' } });
        return;
    }
    isAnalyzing.value = true;
    showStack.value = true;
    try {
        const res = await axios.post(route('coach.habit.stack'));
        stackData.value = res.data;
    } catch (e) {
        console.error(e);
    } finally {
        isAnalyzing.value = false;
    }
};

const getMoodAdvisory = async (mood) => {
    if (!mood) return;
    if (!isQuantum.value) return; // Silent lock for automated calls
    isAnalyzing.value = true;
    try {
        const res = await axios.post(route('coach.habit.mood'), { mood });
        moodAdvisory.value = res.data;
    } catch (e) {
        console.error(e);
    } finally {
        isAnalyzing.value = false;
    }
};

// Expose methods to parent
defineExpose({ getMoodAdvisory });
</script>

<template>
    <div class="max-w-[95%] mx-auto space-y-6 px-2">
        
        <!-- AI COMMAND CENTER (REFINED TRIGGERS) -->
        <div v-if="!showStack" class="space-y-8 animate-in fade-in duration-700">
            <!-- Hero Visual Card -->
            <div class="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[3rem] overflow-hidden shadow-2xl group/hero border border-slate-100 dark:border-slate-800">
                <img src="/images/neural_habit_ai.png" class="w-full h-full object-cover transition-transform duration-[10s] group-hover/hero:scale-110" alt="Neural AI Visual" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                    <div class="flex items-center gap-3 mb-3">
                        <span class="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                        <span class="text-[10px] font-black text-indigo-400 tracking-[0.3em] uppercase">Core intelligence</span>
                    </div>
                    <h2 class="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight max-w-xl">
                        Map your habits through the <span class="text-indigo-400 underline decoration-indigo-500/30">neural pathways</span>.
                    </h2>
                </div>
            </div>

            <div class="flex flex-col md:flex-row items-center justify-center gap-6 py-4 relative">
                <button @click="getHabitStack" :disabled="isAnalyzing" 
                    class="group relative overflow-hidden flex items-center gap-5 px-10 py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-[2rem] shadow-2xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50 min-w-[280px]">
                    <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                        <OneForMindIcon name="sparkles" size="24" class="group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    <div class="text-left">
                        <span class="block text-sm font-black tracking-tight leading-none mb-1">{{ $t('habit_btn_alchemy') }}</span>
                        <span class="block text-[10px] font-bold text-indigo-300 tracking-tight">AI stacking protocol</span>
                    </div>
                </button>
            </div>
        </div>

        <!-- AI INSIGHT CARD (STACKING) -->
        <Transition name="fade-slide">
            <div v-if="showStack" class="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-100/40 dark:shadow-none p-1 md:p-2 transition-all duration-500">
                <div class="bg-slate-50/50 dark:bg-slate-800/30 rounded-[2.8rem] p-6 md:p-10 relative overflow-hidden">
                    <!-- Glass Background Elements -->
                    <div class="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full"></div>
                    <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full"></div>

                    <div class="flex items-center justify-between mb-10 relative z-10">
                        <div class="flex items-center gap-6">
                            <div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 dark:bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-200 dark:shadow-none rotate-6 group-hover:rotate-0 transition-transform duration-500">
                                <OneForMindIcon name="sparkles" size="32" />
                            </div>
                            <div>
                                <h3 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5">{{ $t('habit_neural_title') }}</h3>
                                <p class="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-[0.2em]">{{ $t('habit_neural_protocol') }}</p>
                            </div>
                        </div>
                        <button @click="showStack = false" class="w-12 h-12 rounded-[1.25rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-all active:scale-90">
                            <OneForMindIcon name="x" size="24" stroke-width="2.5" />
                        </button>
                    </div>

                    <div v-if="isAnalyzing && !stackData" class="flex flex-col items-center py-20 gap-6">
                        <div class="relative">
                            <div class="w-16 h-16 border-[6px] border-indigo-50 dark:border-indigo-500/5 border-t-indigo-600 rounded-full animate-spin"></div>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="w-6 h-6 bg-indigo-600 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <p class="text-xs font-black text-slate-400 tracking-widest animate-pulse">{{ $t('habit_analyzing') }}</p>
                    </div>

                    <div v-else-if="stackData" class="space-y-8 animate-in fade-in zoom-in-95 duration-700">
                        <div class="group/stack bg-white dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none relative overflow-hidden">
                            <div class="absolute top-0 right-0 p-6 opacity-5 group-hover/stack:opacity-10 transition-opacity">
                                <OneForMindIcon name="sparkles" size="80" />
                            </div>
                            <span class="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-widest mb-6 border border-indigo-100/50 dark:border-indigo-500/20 shadow-sm">Neural suggestion</span>
                            <p class="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">"{{ stackData.stack }}"</p>
                        </div>
                        
                        <div class="flex gap-4 items-start px-4">
                             <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100/50 dark:border-emerald-500/10 shadow-sm">
                                <OneForMindIcon name="info" size="20" />
                            </div>
                            <div>
                                <h5 class="text-[10px] font-black text-slate-400 tracking-widest mb-1.5">Architecture logic</h5>
                                <p class="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                    {{ stackData.reason }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>


    </div>
</template>

<style scoped>
.fade-slide-enter-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-slide-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-slide-enter-from { opacity: 0; transform: translateY(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(10px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
</style>
