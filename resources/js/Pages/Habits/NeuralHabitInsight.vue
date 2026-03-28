<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
    currentMood: String
});

const isAnalyzing = ref(false);
const showStack = ref(false);
const stackData = ref(null);
const moodAdvisory = ref(null);
const auditData = ref(null);
const showAudit = ref(false);

const getHabitStack = async () => {
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
        
        <!-- HABIT ALCHEMY (STACKING) TRIGGER -->
        <div v-if="!showStack" class="flex justify-center py-4">
            <button @click="getHabitStack" class="group flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl shadow-xl hover:scale-105 transition-all active:scale-95 border border-white/10">
                <div class="relative">
                    <OneForMindIcon name="sparkles" size="18" class="group-hover:rotate-12 transition-transform" />
                    <span class="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                </div>
                <span class="text-xs font-black uppercase tracking-widest">{{ $t('habit_btn_alchemy') }}</span>
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
