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
const auditData = ref(null);
const showAudit = ref(false);
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

const runAudit = async (habitId) => {
    if (!isQuantum.value) {
        router.visit(route('billing'), { data: { from: 'habit_ai_audit' } });
        return;
    }
    isAnalyzing.value = true;
    showAudit.value = true;
    try {
        const res = await axios.post(route('coach.habit.audit'), { habit_id: habitId });
        auditData.value = res.data;
    } catch (e) {
        console.error(e);
    } finally {
        isAnalyzing.value = false;
    }
};

// Expose methods to parent
defineExpose({ runAudit, getMoodAdvisory });
</script>

<template>
    <div class="max-w-[95%] mx-auto space-y-6 px-2">
        
        <!-- STAGNANT HABIT ALERT (DORMANT WARNING) -->
        <Transition name="fade-slide">
            <div v-if="stagnantData" class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-rose-100 dark:border-rose-500/20 shadow-2xl shadow-rose-100 dark:shadow-none mb-8 relative overflow-hidden group transition-all duration-500">
                <div class="absolute -right-10 -top-10 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div class="flex items-start gap-6 relative z-10">
                    <div class="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0 shadow-sm border border-rose-100/50 dark:border-rose-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        <OneForMindIcon name="activity" size="28" class="animate-pulse" />
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <span class="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-[10px] font-black text-rose-600 dark:text-rose-400 tracking-wider">Neural alert</span>
                            <h4 class="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wide">{{ stagnantData.title }}</h4>
                        </div>
                        <p class="text-xl font-black text-slate-800 dark:text-white leading-tight mb-4">"{{ stagnantData.message }}"</p>
                        <div class="bg-slate-50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-inner">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                                <p class="text-[10px] font-black text-rose-500 dark:text-rose-400 tracking-widest">Recovery protocol</p>
                            </div>
                            <p class="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ stagnantData.action }}
                            </p>
                        </div>
                    </div>
                    <button @click="stagnantData = null" class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-90">
                        <OneForMindIcon name="x" size="20" stroke-width="2.5" />
                    </button>
                </div>
            </div>
        </Transition>

        <!-- AI COMMAND CENTER (TRIGGERS) -->
        <div v-if="!showStack" class="flex flex-col md:flex-row items-center justify-center gap-6 py-8 relative">
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

            <button @click="checkStagnation" :disabled="isAnalyzing" 
                class="group flex items-center gap-5 px-10 py-5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none hover:scale-105 transition-all active:scale-95 border border-slate-100 dark:border-slate-800 disabled:opacity-50 min-w-[280px]">
                <div class="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-100/50 dark:border-rose-500/10 shadow-sm">
                    <OneForMindIcon name="activity" size="24" class="text-rose-500 group-hover:scale-110 transition-transform" />
                </div>
                <div class="text-left">
                    <span class="block text-sm font-black tracking-tight leading-none mb-1">Audit habit health</span>
                    <span class="block text-[10px] font-bold text-slate-400 tracking-tight">Friction analysis</span>
                </div>
            </button>
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

        <!-- MOOD ADVISORY POPUP (Refined) -->
        <Transition name="fade-slide">
            <div v-if="moodAdvisory" class="fixed inset-x-4 bottom-24 md:bottom-10 md:right-10 md:left-auto md:w-[400px] z-[100] bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-indigo-100/50 dark:border-white/5 p-7 overflow-hidden transition-all">
                <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
                <div class="relative z-10">
                    <div class="flex items-center gap-4 mb-5">
                        <div class="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-none">
                            <OneForMindIcon name="sparkles" size="20" />
                        </div>
                        <div class="flex-1">
                            <h4 class="text-xs font-black text-slate-900 dark:text-white leading-none">{{ $t('habit_mod_title') }}</h4>
                            <p class="text-[9px] font-bold text-slate-400 tracking-widest mt-1">Real-time state adaptive</p>
                        </div>
                        <button @click="moodAdvisory = null" class="text-slate-300 hover:text-rose-500 transition-colors">
                            <OneForMindIcon name="x" size="14" stroke-width="3" />
                        </button>
                    </div>
                    <p class="text-sm font-bold text-slate-600 dark:text-slate-300 mb-6 leading-relaxed italic border-l-4 border-emerald-500 pl-4">"{{ moodAdvisory.message }}"</p>
                    <div class="space-y-3">
                        <div v-for="s in moodAdvisory.suggestions" :key="s.habit" class="group p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1">
                            <div class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
                                <OneForMindIcon name="zap" size="14" />
                            </div>
                            <div class="min-w-0 flex-1">
                                <p class="text-[9px] font-black text-indigo-600 dark:text-indigo-400 tracking-widest mb-1">{{ s.habit }}</p>
                                <p class="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate">{{ s.adjustment }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- FRICTION AUDIT MODAL (Refined) -->
        <Transition name="fade">
            <div v-if="showAudit" class="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
                <div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-10 overflow-hidden scale-in">
                    <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-indigo-500 to-emerald-400 animate-gradient-x"></div>
                    
                    <div class="flex flex-col items-center text-center gap-8">
                        <div class="w-20 h-20 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center shadow-2xl rotate-3 relative overflow-hidden group">
                            <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-transparent opacity-40"></div>
                            <OneForMindIcon name="sparkles" size="36" class="relative z-10" />
                        </div>
                        
                        <div v-if="isAnalyzing && !auditData" class="py-10">
                             <div class="w-14 h-14 border-[6px] border-indigo-50 border-t-indigo-600 rounded-full animate-spin"></div>
                             <p class="text-xs font-black tracking-widest text-slate-400 mt-6 animate-pulse">{{ $t('habit_audit_running') }}</p>
                        </div>

                        <div v-else-if="auditData" class="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div>
                                <h3 class="text-xs font-black text-slate-400 tracking-[0.2em] mb-4">{{ $t('habit_audit_title') }}</h3>
                                <p class="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-2">"{{ auditData.audit_question }}"</p>
                            </div>
                            
                            <div class="bg-indigo-50/50 dark:bg-indigo-500/10 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-500/20 text-left relative group/solution">
                                <div class="absolute -right-2 -top-2 w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg rotate-12 group-hover/solution:rotate-0 transition-transform">
                                    <OneForMindIcon name="zap" size="14" />
                                </div>
                                <p class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-widest mb-3">Neural solution found:</p>
                                <p class="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{{ auditData.solution }}</p>
                            </div>

                            <button @click="showAudit = false" class="w-full py-6 bg-slate-900 dark:bg-indigo-600 text-white rounded-[2rem] font-black text-xs tracking-[0.2em] shadow-2xl hover:bg-slate-800 dark:hover:bg-indigo-700 active:scale-95 transition-all outline-none">
                                {{ $t('habit_btn_audit_close') }}
                            </button>
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
