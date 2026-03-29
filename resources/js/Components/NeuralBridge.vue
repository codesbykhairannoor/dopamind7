<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
    module: {
        type: String,
        required: true
    }
});

const synergy = ref(null);
const loading = ref(true);

const fetchSynergy = async () => {
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

onMounted(() => {
    fetchSynergy();
});
</script>

<template>
    <div v-if="loading || synergy" class="group relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5">
        <div class="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
            <OneForMindIcon name="sparkles" size="80" />
        </div>
        
        <div class="flex items-start gap-4 relative z-10">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                <OneForMindIcon name="sparkles" size="20" class="text-white" />
            </div>
            
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Neural Bridge</span>
                    <div class="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></div>
                </div>
                
                <div v-if="loading" class="space-y-2 py-1">
                    <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full animate-pulse"></div>
                    <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3 animate-pulse"></div>
                </div>
                
                <p v-else-if="synergy" class="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{{ synergy.bridge }}"
                </p>
            </div>
        </div>
    </div>
</template>
