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
    <div class="max-w-[95%] mx-auto space-y-4 px-2">
        
        <!-- STAGNANT HABIT ALERT (DORMANT WARNING) -->
        <Transition name="fade-slide">
            <div v-if="stagnantData" class="bg-gradient-to-r from-rose-500 to-orange-600 rounded-3xl p-5 shadow-xl shadow-rose-100 dark:shadow-none mb-6 relative overflow-hidden group">
                <div class="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div class="flex items-start gap-4 relative">
                    <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
                        <OneForMindIcon name="sparkles" size="24" class="animate-pulse" />
                    </div>
                    <div class="flex-1">
                        <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-white/80 mb-1">{{ stagnantData.title }}</h4>
                        <p class="text-sm font-black text-white leading-tight mb-2">"{{ stagnantData.message }}"</p>
                        <div class="bg-black/20 rounded-xl p-3 border border-white/10">
                            <p class="text-[10px] font-bold text-white/90 leading-relaxed italic">
                                <span class="text-orange-300 font-black">AI RECOVERY STEP:</span> {{ stagnantData.action }}
                            </p>
                        </div>
                    </div>
                    <button @click="stagnantData = null" class="text-white/40 hover:text-white transition-colors">
                        <OneForMindIcon name="x" size="14" />
                    </button>
                </div>
            </div>
        </Transition>

        <!-- HABIT ALCHEMY (STACKING) TRIGGER -->
        <div v-if="!showStack" class="flex flex-wrap justify-center gap-4 py-4 relative group">
            <button @click="getHabitStack" :disabled="isAnalyzing" class="group flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl shadow-xl hover:scale-105 transition-all active:scale-95 border border-white/10 disabled:opacity-50">
                <div class="relative">
                    <OneForMindIcon name="sparkles" size="18" class="group-hover:rotate-12 transition-transform" />
                    <span class="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                </div>
                <span class="text-xs font-black uppercase tracking-widest">{{ $t('habit_btn_alchemy') }}</span>
            </button>

            <button @click="checkStagnation" :disabled="isAnalyzing" class="group flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl shadow-lg hover:scale-105 transition-all active:scale-95 border border-slate-100 dark:border-slate-700 disabled:opacity-50">
                <OneForMindIcon name="activity" size="18" class="text-rose-500" />
                <span class="text-xs font-black uppercase tracking-widest">Audit Habit Health</span>
            </button>
        </div>

        <!-- AI INSIGHT CARD (STACKING) -->
        <Transition name="fade-slide">
            <div v-if="showStack" class="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-100/50 dark:shadow-none p-6 md:p-8">
                <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                
                <div class="flex items-start justify-between mb-6">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                            <OneForMindIcon name="sparkles" size="20" />
                        </div>
                        <div>
                            <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">{{ $t('habit_neural_title') }}</h3>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ $t('habit_neural_protocol') }}</p>
                        </div>
                    </div>
                    <button @click="showStack = false" class="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                        <OneForMindIcon name="x" size="16" />
                    </button>
                </div>

                <div v-if="isAnalyzing && !stackData" class="flex flex-col items-center py-10 gap-4">
                    <div class="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">{{ $t('habit_analyzing') }}</p>
                </div>

                <div v-else-if="stackData" class="space-y-6">
                    <div class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                        <p class="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 italic">Suggested Stack:</p>
                        <p class="text-lg md:text-xl font-black text-slate-800 dark:text-white leading-tight">"{{ stackData.stack }}"</p>
                    </div>
                    <div class="flex gap-4 items-start px-2">
                        <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                        <p class="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic">
                            {{ stackData.reason }}
                        </p>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- MOOD ADVISORY MODAL/POPUP -->
        <Transition name="fade-slide">
            <div v-if="moodAdvisory" class="fixed inset-x-4 bottom-24 md:bottom-10 md:right-10 md:left-auto md:w-96 z-[100] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-indigo-100 dark:border-indigo-500/20 p-6 overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full"></div>
                <div class="relative">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                            <OneForMindIcon name="sparkles" size="16" />
                        </div>
                        <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white">{{ $t('habit_mod_title') }}</h4>
                        <button @click="moodAdvisory = null" class="ml-auto text-slate-400">
                            <OneForMindIcon name="x" size="12" />
                        </button>
                    </div>
                    <p class="text-xs font-bold text-slate-600 dark:text-slate-300 mb-4 leading-relaxed italic">"{{ moodAdvisory.message }}"</p>
                    <div class="space-y-2">
                        <div v-for="s in moodAdvisory.suggestions" :key="s.habit" class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 transition-transform hover:scale-[1.02]">
                            <span class="text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase shrink-0">⚡ Adjust:</span>
                            <span class="text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate">{{ s.habit }}: {{ s.adjustment }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- FRICTION AUDIT MODAL -->
        <Transition name="fade">
            <div v-if="showAudit" class="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-8 overflow-hidden scale-in">
                    <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-indigo-500 to-emerald-400"></div>
                    
                    <div class="flex flex-col items-center text-center gap-6">
                        <div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center shadow-xl rotate-3">
                            <OneForMindIcon name="sparkles" size="32" />
                        </div>
                        
                        <div v-if="isAnalyzing && !auditData">
                             <div class="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                             <p class="text-xs font-black uppercase tracking-widest text-slate-400 mt-4 animate-pulse">{{ $t('habit_audit_running') }}</p>
                        </div>

                        <div v-else-if="auditData" class="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div>
                                <h3 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4">{{ $t('habit_audit_title') }}</h3>
                                <p class="text-lg font-black text-rose-500 leading-tight italic">"{{ auditData.audit_question }}"</p>
                            </div>
                            
                            <div class="bg-indigo-50 dark:bg-indigo-500/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 text-left">
                                <p class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">{{ $t('habit_audit_solution') }}:</p>
                                <p class="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{{ auditData.solution }}</p>
                            </div>

                            <button @click="showAudit = false" class="w-full py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">{{ $t('habit_btn_audit_close') }}</button>
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
