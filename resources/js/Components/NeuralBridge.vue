<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { router } from '@inertiajs/vue3';
import { useGating } from '@/Composables/useGating';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
    module: {
        type: String,
        required: true
    }
});

const { isQuantum } = useGating();
const synergy = ref(null);
const loading = ref(false);

const fetchSynergy = async () => {
    if (!isQuantum.value) {
        // Instead of redirecting, we can show a localized upgrade suggestion or do nothing
        // for "soft" experience, we let the UI handle the locked state.
        return;
    }
    loading.value = true;
    try {
        const response = await axios.post(route('coach.synergy'), { module: props.module });
        synergy.value = response.data;
    } catch (e) {
        console.error("Failed to fetch module synergy", e);
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="group relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5">
        <div class="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity pointer-events-none">
            <OneForMindIcon name="sparkles" size="80" />
        </div>
        
        <div class="flex items-start gap-4 relative z-10">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                <OneForMindIcon name="sparkles" size="20" class="text-white" />
            </div>
            
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Neural Bridge</span>
                    <div v-if="synergy" class="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></div>
                </div>
                
                <div v-if="loading" class="space-y-2 py-1">
                    <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full animate-pulse"></div>
                    <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3 animate-pulse"></div>
                </div>
                
                <div v-else-if="synergy">
                    <p class="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic">
                        "{{ synergy.bridge }}"
                    </p>
                </div>

                <div v-else class="py-1">
                    <template v-if="isQuantum">
                        <button @click="fetchSynergy" class="text-xs font-black text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95">
                            <span>Get Intelligence</span>
                            <OneForMindIcon name="chevron-right" size="12" stroke-width="4" />
                        </button>
                    </template>
                    <template v-else>
                        <div class="flex items-center justify-between">
                            <p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Neural insights require Quantum Plan</p>
                            <Link :href="route('billing')" class="text-[10px] font-black text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-indigo-200 dark:border-indigo-800 pb-0.5 transition-all">
                                Upgrade
                            </Link>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
