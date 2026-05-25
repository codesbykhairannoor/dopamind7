<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { 
    Terminal, Cpu, Sparkles, Clock, ArrowLeft, RefreshCw, 
    FileText, CheckCircle2, AlertTriangle, ShieldCheck, 
    Database, HardDrive, Network, FileJson, Info, ArrowRight, Check
} from 'lucide-vue-next';

const props = defineProps({
    material: { type: Object, required: true },
    user: { type: Object, required: true }
});

const isRefreshing = ref(false);
const logs = ref([]);
let logInterval = null;

const fetchLogs = async () => {
    try {
        const res = await fetch(route('study.portfolio.stream_logs'));
        const data = await res.json();
        if (data.logs) {
            const lines = data.logs.split('\n').filter(l => l.trim().length > 0);
            logs.value = lines.map(line => {
                const match = line.match(/^\[(.*?)\] (.*)/);
                if (match) {
                    return { timestamp: match[1], message: match[2] };
                }
                return { timestamp: '', message: line };
            });
        }
    } catch (e) {
        console.error("Failed to fetch logs:", e);
    }
};

onMounted(() => {
    fetchLogs();
    logInterval = setInterval(fetchLogs, 1000);
});

onUnmounted(() => {
    if (logInterval) clearInterval(logInterval);
});

const refreshLogs = async () => {
    isRefreshing.value = true;
    await fetchLogs();
    isRefreshing.value = false;
};

const getLogIcon = (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('initialize') || text.includes('start')) return Terminal;
    if (text.includes('extract') || text.includes('docx') || text.includes('pdf')) return FileText;
    if (text.includes('scikit-learn') || text.includes('python') || text.includes('pipeline.py')) return Cpu;
    if (text.includes('gemini') || text.includes('llm') || text.includes('prompt')) return Sparkles;
    if (text.includes('recalculat') || text.includes('global')) return Network;
    if (text.includes('complete') || text.includes('success')) return CheckCircle2;
    if (text.includes('error') || text.includes('fail') || text.includes('warn')) return AlertTriangle;
    return Info;
};

const getLogIconClass = (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('complete') || text.includes('success')) return 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50';
    if (text.includes('error') || text.includes('fail')) return 'bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/50';
    if (text.includes('warn') || text.includes('fallback') || text.includes('emergency')) return 'bg-amber-50 text-amber-500 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50';
    if (text.includes('gemini') || text.includes('llm')) return 'bg-purple-50 text-purple-500 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200/50 dark:border-purple-900/50';
    if (text.includes('python') || text.includes('scikit-learn')) return 'bg-blue-50 text-blue-500 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/50';
    return 'bg-slate-50 text-slate-500 dark:bg-slate-900/80 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/50';
};

const getLogCardClass = (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('complete') || text.includes('success')) return 'border-l-4 border-l-emerald-500';
    if (text.includes('error') || text.includes('fail')) return 'border-l-4 border-l-rose-500';
    if (text.includes('warn') || text.includes('fallback') || text.includes('emergency')) return 'border-l-4 border-l-amber-500';
    return '';
};

// State to expand JSON objects inside logs
const expandedLogs = ref({});
const toggleLogDetail = (index) => {
    expandedLogs.value[index] = !expandedLogs.value[index];
};

const hasDetail = (msg) => {
    return msg.includes('{') || msg.includes('[') || msg.includes('output received:');
};

const formatDetail = (msg) => {
    // Try to extract JSON from string
    try {
        const jsonMatch = msg.match(/(\{.*\}|\[.*\])/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return JSON.stringify(parsed, null, 2);
        }
    } catch (e) {}
    
    // Fallback split if there is colon
    if (msg.includes('received:') || msg.includes('found:')) {
        const parts = msg.split(/received:|found:/);
        if (parts.length > 1) {
            return parts[1].trim();
        }
    }
    return msg;
};

const getCleanMessage = (msg) => {
    if (msg.includes('received:')) {
        return msg.split('received:')[0] + 'received:';
    }
    if (msg.includes('found:')) {
        return msg.split('found:')[0] + 'found:';
    }
    return msg;
};
</script>

<template>
    <Head :title="`Pipeline Logs: ${material.course_name}`" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 transition-colors overflow-x-hidden">
        <!-- Ambient Background Gradients -->
        <div class="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px]"></div>
            <div class="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px]"></div>
        </div>

        <!-- Header -->
        <header class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-5 flex items-center justify-between sticky top-0 z-50">
            <div class="flex items-center gap-5">
                <Link :href="route('study.portfolio')" class="group p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-500 active:scale-90 border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                    <ArrowLeft class="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <h1 class="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1.5 tracking-tight">AI & ML Pipeline Logs</h1>
                    <div class="flex items-center gap-2">
                        <span class="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        <p class="text-[10px] font-black text-indigo-500 tracking-[0.25em]">MLOPS PROCESS LOGS</p>
                    </div>
                </div>
            </div>

            <button @click="refreshLogs" :disabled="isRefreshing" 
                class="flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-black text-[11px] tracking-wider transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-indigo-500/10 group">
                <RefreshCw class="h-4 w-4" :class="{'animate-spin text-indigo-400': isRefreshing || material.status === 'processing'}" />
                <span>{{ material.status === 'processing' ? 'Processing...' : 'Refresh Logs' }}</span>
            </button>
        </header>

        <main class="max-w-[1400px] mx-auto px-6 py-12 relative z-10">
            <!-- Summary Info Bar -->
            <div class="mb-12 p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/80 shadow-[0_10px_50px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-xl border border-indigo-100/50 dark:border-indigo-900/40">
                        {{ material.metadata?.field_of_study || 'Determining field...' }}
                    </span>
                    <h2 class="text-3xl font-black text-slate-900 dark:text-white mt-3 mb-1 tracking-tight">
                        {{ material.course_name }}
                    </h2>
                    <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold">
                        Material ID: #{{ material.id }} &bull; Semester: {{ material.week || 'N/A' }}
                    </p>
                </div>
                
                <div class="flex items-center gap-6">
                    <div class="text-right hidden sm:block">
                        <p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">PIPELINE STATUS</p>
                        <p class="text-sm font-black" :class="{'text-indigo-500': material.status === 'processing', 'text-emerald-500': material.status === 'completed', 'text-rose-500': material.status === 'failed'}">
                            {{ material.status.toUpperCase() }}
                        </p>
                    </div>
                    <div class="h-16 w-16 rounded-2xl flex items-center justify-center border shadow-inner"
                        :class="{
                            'bg-indigo-50 border-indigo-100 text-indigo-600 dark:bg-indigo-950/30 dark:border-indigo-900/50 dark:text-indigo-400': material.status === 'processing',
                            'bg-emerald-50 border-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:border-emerald-900/50 dark:text-emerald-400': material.status === 'completed',
                            'bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-950/30 dark:border-rose-900/50 dark:text-rose-400': material.status === 'failed'
                        }"
                    >
                        <Cpu v-if="material.status === 'processing'" class="h-8 w-8 animate-spin" />
                        <CheckCircle2 v-else-if="material.status === 'completed'" class="h-8 w-8" />
                        <AlertTriangle v-else class="h-8 w-8" />
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <!-- Left: Pipeline Steps Terminal (7/12) -->
                <div class="lg:col-span-7 space-y-8">
                    <div class="bg-slate-900 dark:bg-black rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
                        <!-- Terminal Bar -->
                        <div class="bg-slate-950 border-b border-slate-800 px-8 py-4 flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="h-3.5 w-3.5 rounded-full bg-rose-500/80"></span>
                                <span class="h-3.5 w-3.5 rounded-full bg-amber-500/80"></span>
                                <span class="h-3.5 w-3.5 rounded-full bg-emerald-500/80"></span>
                            </div>
                            <span class="text-[10px] font-mono text-slate-500 tracking-wider flex items-center gap-2">
                                <Terminal class="h-3.5 w-3.5" /> dopamind@mlops:~/pipeline
                            </span>
                        </div>

                        <!-- Terminal Output Content -->
                        <div class="p-8 flex-1 font-mono text-xs text-slate-300 space-y-6 overflow-y-auto max-h-[800px] custom-scrollbar">
                            <div v-if="logs.length === 0" class="text-center py-20 text-slate-500">
                                <Terminal class="h-12 w-12 mx-auto mb-4 animate-pulse opacity-40" />
                                <p>No logs found. Waiting for pipeline execution to report...</p>
                                <p class="text-[10px] mt-2">If coursework was recently added, wait a moment and refresh.</p>
                            </div>
                            
                            <div v-else class="space-y-6 relative border-l border-slate-800 pl-6 ml-4">
                                <div 
                                    v-for="(log, idx) in logs" 
                                    :key="idx" 
                                    class="relative group"
                                >
                                    <!-- Time Dot -->
                                    <div class="absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full flex items-center justify-center p-1"
                                        :class="getLogIconClass(log.message)"
                                    >
                                        <component :is="getLogIcon(log.message)" class="h-2.5 w-2.5" />
                                    </div>

                                    <!-- Log Box -->
                                    <div class="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-950/80 transition-all"
                                        :class="getLogCardClass(log.message)"
                                    >
                                        <div class="flex items-center justify-between text-[10px] text-slate-500 mb-2">
                                            <span class="font-bold flex items-center gap-1.5">
                                                <Clock class="h-3 w-3" /> {{ log.timestamp }}
                                            </span>
                                            <span class="bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded text-[8px]">
                                                STEP {{ idx + 1 }}
                                            </span>
                                        </div>

                                        <p class="text-slate-300 leading-relaxed font-semibold text-xs whitespace-pre-wrap">
                                            {{ getCleanMessage(log.message) }}
                                        </p>

                                        <!-- Expandable Accordion for nested JSON / detail dumps -->
                                        <div v-if="hasDetail(log.message)" class="mt-3">
                                            <button 
                                                @click="toggleLogDetail(idx)"
                                                class="flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-indigo-950/50 hover:text-indigo-400 border border-slate-800 text-[10px] text-slate-400 rounded-lg transition-all"
                                            >
                                                <FileJson class="h-3 w-3" />
                                                <span>{{ expandedLogs[idx] ? 'Hide Payload Output' : 'View Payload Output' }}</span>
                                            </button>
                                            
                                            <div v-if="expandedLogs[idx]" class="mt-3 p-4 bg-black rounded-xl border border-slate-800/80 text-[10px] text-indigo-300 overflow-x-auto whitespace-pre font-mono custom-scrollbar">
                                                {{ formatDetail(log.message) }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Explanatory Science Hub (5/12) -->
                <div class="lg:col-span-5 space-y-8">
                    <!-- Science Explanation -->
                    <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[3.25rem] border border-slate-200/50 dark:border-slate-800/80 shadow-2xl shadow-indigo-500/5">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/40 shadow-sm">
                                <Database class="h-6 w-6" />
                            </div>
                            <div>
                                <h3 class="text-xl font-black text-slate-900 dark:text-white">MLOps & Serialization</h3>
                                <p class="text-[9px] font-black text-indigo-500 tracking-wider uppercase">HOW THE SYSTEM WORKS</p>
                            </div>
                        </div>

                        <div class="space-y-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                            <!-- TF-IDF section -->
                            <div class="p-5 bg-slate-100/50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                                <h4 class="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2 mb-2">
                                    <span class="h-2 w-2 rounded-full bg-blue-500"></span> 1. TF-IDF & Naive Bayes Model
                                </h4>
                                <p class="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                    Text-text akademik diekstraksi dari dokumen pendukung (syllabus) dan tugas. Sistem menggunakan model <strong>TF-IDF Vectorizer</strong> untuk menghitung frekuensi kata bermakna unik, lalu model <strong>Naive Bayes (MultinomialNB)</strong> memprediksi kecocokan dengan karir impian Anda.
                                </p>
                            </div>

                            <!-- Pickle section -->
                            <div class="p-5 bg-slate-100/50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                                <h4 class="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2 mb-2">
                                    <span class="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span> 2. Pickle Serialization (.pkl)
                                </h4>
                                <p class="text-xs leading-relaxed text-slate-500 dark:text-slate-400 mb-2">
                                    File <code>.pkl</code> (seperti <code>tfidf_vectorizer.pkl</code>) terlihat berantakan karena berisi <strong>data biner terkompresi</strong>. Ini adalah format standard di Python untuk membekukan (*serialize*) konfigurasi model dan koefisien bobot setelah latihan selesai.
                                </p>
                                <div class="flex items-center gap-2.5 text-[10px] font-mono bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
                                    <span class="text-indigo-400">Model Python</span>
                                    <ArrowRight class="h-3 w-3 text-slate-400" />
                                    <span class="text-emerald-400">pickle.dump()</span>
                                    <ArrowRight class="h-3 w-3 text-slate-400" />
                                    <span class="text-amber-400">file.pkl (Biner)</span>
                                </div>
                            </div>

                            <!-- Continuous learning section -->
                            <div class="p-5 bg-slate-100/50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                                <h4 class="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2 mb-2">
                                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span> 3. Continuous Learning
                                </h4>
                                <p class="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                    Setiap kali Anda menekan "Feedback" untuk memperbaiki hasil model, text tugas beserta label koreksi akan dimasukkan ke <code>dataset.csv</code>. Script <code>retrain.py</code> dipanggil secara *background* untuk melatih ulang model dan menulis ulang berkas biner `.pkl` tersebut secara *live*!
                                </p>
                            </div>

                            <!-- Hybrid AI fallback -->
                            <div class="p-5 bg-slate-100/50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                                <h4 class="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2 mb-2">
                                    <span class="h-2 w-2 rounded-full bg-purple-500"></span> 4. Hybrid Generative AI Guard
                                </h4>
                                <p class="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                    Jika probabilitas hasil prediksi Scikit-Learn sangat rendah (nilai keyakinan &lt; 10%), sistem mendeteksi ambiguitas dan melakukan *fallback* ke Gemini API secara langsung untuk mengklasifikasi coursework secara semantik, memastikan akurasi tetap 99%!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 9999px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25);
}
</style>
