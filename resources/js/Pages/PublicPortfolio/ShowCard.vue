<script setup>
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';
import { useAppearance } from '@/Composables/useAppearance';
import { Radar } from 'vue-chartjs';
import { 
    Chart as ChartJS, 
    Title, 
    Tooltip, 
    Legend, 
    RadialLinearScale, 
    PointElement, 
    LineElement, 
    Filler 
} from 'chart.js';
import { 
    GraduationCap, 
    BookOpen, 
    Clock, 
    BarChart3, 
    FileText, 
    Eye,
    ArrowLeft,
    ExternalLink,
    Award,
    Download,
    Link2,
    ShieldAlert
} from 'lucide-vue-next';
import ThemeToggle from '@/Components/ThemeToggle.vue';

// Override default AuthenticatedLayout by setting layout to null
defineOptions({
    layout: null
});

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler);

const props = defineProps({
    student: {
        type: Object,
        required: true
    },
    competency: {
        type: Object,
        default: null
    },
    material: {
        type: Object,
        required: true
    },
    materials: {
        type: Array,
        default: () => []
    }
});

const { isDark } = useAppearance();

// Stream route for PDF iframe
const pdfStreamUrl = computed(() => {
    return route('portfolio.file', { 
        username: props.student.username, 
        id: props.material.id 
    });
});

// Radar Chart Config
const chartData = computed(() => {
    const competencies = props.competency?.competencies || {};
    // Split long labels to prevent shrinking the chart
    const labels = Object.entries(competencies).map(([label, value]) => {
        const displayLabel = `${label} (${value}%)`;
        if (displayLabel.length > 20) {
            const words = displayLabel.split(' ');
            if (words.length > 1) {
                const mid = Math.ceil(words.length / 2);
                return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
            }
        }
        return displayLabel;
    });
    const data = Object.values(competencies);

    if (labels.length === 0) {
        return {
            labels: ['Python Programming', 'Database Systems', 'Software Engineering', 'Data Analytics', 'Machine Learning', 'Web Development'],
            datasets: [
                {
                    label: 'No Verified Records',
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                    borderColor: 'rgba(99, 102, 241, 0.15)',
                    borderWidth: 1,
                    pointBackgroundColor: 'rgba(99, 102, 241, 0.15)',
                }
            ]
        };
    }

    return {
        labels: labels,
        datasets: [
            {
                label: 'Verified Skill Level',
                data: data,
                backgroundColor: isDark.value ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.15)',
                borderColor: '#6366f1',
                borderWidth: 3,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#6366f1',
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    };
});

const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: isDark.value ? '#0f172a' : '#ffffff',
            titleColor: isDark.value ? '#f8fafc' : '#0f172a',
            bodyColor: isDark.value ? '#cbd5e1' : '#475569',
            borderColor: isDark.value ? '#334155' : '#e2e8f0',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 16,
            displayColors: false,
            titleFont: {
                family: 'Plus Jakarta Sans',
                weight: 'bold'
            },
            bodyFont: {
                family: 'Plus Jakarta Sans'
            }
        }
    },
    scales: {
        r: {
            angleLines: {
                color: isDark.value ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'
            },
            grid: {
                color: isDark.value ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'
            },
            pointLabels: {
                color: isDark.value ? '#cbd5e1' : '#1e293b',
                padding: 30, // Significant padding for better label distribution
                font: {
                    family: 'Plus Jakarta Sans',
                    size: 11,
                    weight: '800'
                }
            },
            ticks: {
                backdropColor: 'transparent',
                color: isDark.value ? '#64748b' : '#94a3b8',
                font: {
                    family: 'Plus Jakarta Sans',
                    size: 9
                },
                beginAtZero: true,
                min: 0,
                max: 100,
                stepSize: 20,
                display: false
            }
        }
    }
}));

// Display visibility settings computed from props
const showRadar = computed(() => {
    return props.competency?.settings?.show_radar !== false;
});

const showMaterials = computed(() => {
    return props.competency?.settings?.show_materials !== false;
});
</script>

<template>
    <Head :title="`${props.material.course_name} - Coursework Audit`" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 relative overflow-hidden font-sans">
        <!-- Theme Toggle -->
        <div class="absolute top-6 right-6 z-50">
            <ThemeToggle />
        </div>

        <!-- Floating Glow effects for premium aesthetic -->
        <div class="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <div class="absolute bottom-[-15%] right-[-5%] w-[700px] h-[700px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

        <!-- Main Showcase Area -->
        <main class="w-full mx-auto px-6 lg:px-12 py-12">
            <!-- Back navigation button -->
            <div class="mb-6">
                <a 
                    :href="route('portfolio.show', props.student.username)"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md transition"
                >
                    <ArrowLeft class="h-3.5 w-3.5" />
                    {{ $t('portfolio_back_to_profile', 'Back to Public Profile') }}
                </a>
            </div>

            <!-- Privacy Policy Check: if student hides coursework, block display -->
            <div v-if="!showMaterials" class="py-24 text-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/80 shadow-lg">
                <div class="inline-flex h-20 w-20 rounded-[2.5rem] bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                    <ShieldAlert class="h-10 w-10" />
                </div>
                <h2 class="text-2xl font-black text-slate-800 dark:text-white">{{ $t('portfolio_card_hidden_title', 'Coursework Document Hidden') }}</h2>
                <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2 text-sm font-semibold">
                    {{ $t('portfolio_card_hidden_desc', 'The student has configured their portfolio display settings to hide coursework audits.') }}
                </p>
            </div>

            <!-- Premium Stacked Details Layout -->
            <div v-else class="flex flex-col gap-8">
                
                <!-- 1. HERO BANNER -->
                <div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-8 lg:p-10 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/80 shadow-lg relative overflow-hidden">
                    <!-- Decorative Background -->
                    <div class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div class="flex-1">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-extrabold text-[10px] uppercase tracking-wider mb-4 border border-indigo-100/50 dark:border-indigo-900/50">
                                <Award class="h-3.5 w-3.5" />
                                Coursework Material
                            </div>
                            <h1 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                {{ props.material.course_name }}
                            </h1>
                            <div class="flex flex-wrap items-center gap-4 mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                                <div class="flex items-center gap-1.5">
                                    <Clock class="h-4 w-4 text-slate-400" />
                                    {{ props.material.week || 'No Period Set' }}
                                </div>
                                <div v-if="props.material.grade !== null" class="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30">
                                    Grade: <span class="font-black">{{ props.material.grade }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Student Badge -->
                        <div class="bg-slate-50/80 dark:bg-slate-950/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 min-w-[250px]">
                            <div v-if="props.student.avatar_url" class="h-12 w-12 rounded-xl overflow-hidden shadow-sm shrink-0">
                                <img :src="props.student.avatar_url" :alt="props.student.name" class="h-full w-full object-cover" />
                            </div>
                            <div v-else class="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-md shrink-0">
                                {{ props.student.name.charAt(0) }}
                            </div>
                            <div>
                                <div class="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-0.5">
                                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    IPoW Verified
                                </div>
                                <h2 class="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                                    {{ props.student.name }}
                                </h2>
                                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold">
                                    @{{ props.student.username }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. DASHBOARD ROW (Radar + Insights) -->
                <div class="flex flex-col gap-8">
                    <!-- INSIGHTS & SKILLS -->
                    <div class="flex flex-col md:flex-row gap-6">
                        <!-- AI Verdict -->
                        <div v-if="props.material.metadata?.verdict" class="flex-1 bg-gradient-to-br from-indigo-50/80 to-purple-50/50 dark:from-slate-900/80 dark:to-indigo-950/30 backdrop-blur-md p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 shadow-lg flex flex-col justify-center">
                            <h3 class="text-sm font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
                                <Sparkles class="h-5 w-5" />
                                AI Audit Insight
                            </h3>
                            <p class="text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
                                "{{ props.material.metadata.verdict }}"
                            </p>
                        </div>

                        <!-- Verified Competencies -->
                        <div v-if="props.material.metadata?.competencies" class="md:w-1/3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/80 shadow-lg">
                            <h3 class="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                                <ShieldAlert class="h-5 w-5" />
                                Verified Skill Tags
                            </h3>
                            <div class="flex flex-wrap gap-2">
                                <span 
                                    v-for="(score, comp) in props.material.metadata.competencies" 
                                    :key="comp"
                                    class="px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200/50 dark:border-slate-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition cursor-default shadow-sm"
                                >
                                    {{ comp }}
                                    <span class="ml-1 text-indigo-500">{{ score }}%</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- RADAR CHART -->
                    <div v-if="showRadar" class="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/80 shadow-lg flex flex-col items-center justify-center mt-4">
                        <h3 class="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2 w-full justify-center text-center">
                            <BarChart3 class="h-5 w-5 text-indigo-500" />
                            {{ $t('portfolio_verified_competencies', 'Verified Competencies Radar') }}
                        </h3>
                        <div class="h-[400px] w-full max-w-3xl mx-auto relative flex items-center justify-center">
                            <Radar :data="chartData" :options="chartOptions" />
                        </div>
                    </div>
                </div>

                <!-- 5. NEURAL AUDIT VIEWER -->
                <div v-if="props.material.file_path" class="w-full bg-slate-900/95 p-2 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden mt-4 min-h-[600px] flex flex-col relative group">
                    <!-- Premium Header for Viewer -->
                    <div class="p-6 flex items-center justify-between border-b border-white/5 relative z-10">
                        <div class="flex items-center gap-3">
                            <div class="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                                <FileText class="h-4 w-4" />
                            </div>
                            <div>
                                <h3 class="text-sm font-black text-white tracking-widest uppercase">Original Artifact Neural Audit</h3>
                                <p class="text-[10px] font-bold text-slate-500 tracking-wider">SECURE PROXY-STREAMED FROM IPoW REPOSITORY</p>
                            </div>
                        </div>
                        <a :href="pdfStreamUrl" target="_blank" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/10 transition flex items-center gap-2">
                            <ExternalLink class="h-3 w-3" />
                            Expand View
                        </a>
                    </div>

                    <!-- PDF Viewer -->
                    <div class="flex-1 w-full relative z-10 bg-slate-950/50">
                        <iframe 
                            :src="pdfStreamUrl" 
                            class="w-full h-[600px] border-none"
                            title="Audit View"
                        ></iframe>
                    </div>

                    <!-- Background Decor -->
                    <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <!-- RADAR CHART -->
                    <div v-if="showRadar" class="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/80 shadow-lg mt-4">
                        <h3 class="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8 flex items-center gap-2">
                            <BarChart3 class="h-5 w-5 text-indigo-500" />
                            {{ $t('portfolio_verified_competencies', 'Verified Competencies Radar') }}
                        </h3>
                        
                        <div class="flex flex-col lg:flex-row items-center gap-12">
                            <!-- Left: Radar Chart -->
                            <div class="h-[400px] w-full lg:w-3/5 relative flex items-center justify-center">
                                <Radar :data="chartData" :options="chartOptions" />
                            </div>
                            
                            <!-- Right: Competency List -->
                            <div class="w-full lg:w-2/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                <div v-for="(score, name) in (props.competency?.competencies || {})" :key="name" 
                                    class="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 transition hover:border-indigo-300 dark:hover:border-indigo-700 group">
                                    <span class="text-[11px] font-black text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 transition truncate mr-2">{{ name }}</span>
                                    <div class="flex items-center gap-2">
                                        <div class="w-16 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div class="h-full bg-indigo-500 transition-all duration-1000" :style="{ width: score + '%' }"></div>
                                        </div>
                                        <span class="text-[10px] font-black text-indigo-500 w-10 text-right">{{ score }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 4. EVIDENCE & AUDITABLE ARTIFACTS -->
                <div class="mt-12 space-y-8">
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center gap-4">
                            <h2 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{{ $t('portfolio_evidence_vault_title', 'Verified Evidence Vault') }}</h2>
                            <div class="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent"></div>
                        </div>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ $t('portfolio_evidence_vault_subtitle', 'Auditable materials secured via IPoW protocol') }}</p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Context Materials -->
                        <div v-if="props.material.context_data && (props.material.context_data.link || (props.material.context_data.files && props.material.context_data.files.length > 0))" class="space-y-4">
                            <div class="flex items-center gap-2 px-2">
                                <div class="h-2 w-2 rounded-full bg-indigo-500"></div>
                                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">{{ $t('study_context_evidence', 'Verification Context') }}</h3>
                            </div>
                            <div class="flex flex-col gap-3">
                                <!-- Link -->
                                <a v-if="props.material.context_data.link" :href="props.material.context_data.link" target="_blank" 
                                    class="group/item flex items-center justify-between p-5 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-indigo-500/5">
                                    <div class="flex items-center gap-4">
                                        <div class="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50">
                                            <Link2 class="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ $t('portfolio_context_reference', 'Context Reference') }}</p>
                                            <p class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ props.material.context_data.link_name || $t('portfolio_view_reference', 'View Reference Link') }}</p>
                                        </div>
                                    </div>
                                    <ExternalLink class="h-5 w-5 text-slate-300 group-hover/item:text-indigo-500 transition transform group-hover/item:translate-x-1" />
                                </a>

                                <!-- Files -->
                                <div v-for="(file, idx) in props.material.context_data.files" :key="'ctx-f-'+idx"
                                    class="group/item flex items-center justify-between p-5 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-indigo-500/5">
                                    <div class="flex items-center gap-4">
                                        <div class="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50">
                                            <FileText class="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ $t('portfolio_context_artifact', 'Context Artifact') }}</p>
                                            <p class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">{{ file.name }}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <button @click="() => { window.scrollTo({ top: document.querySelector('iframe')?.offsetTop - 100, behavior: 'smooth' }) }"
                                            class="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-500 transition border border-slate-100 dark:border-slate-700">
                                            <Eye class="h-4 w-4" />
                                        </button>
                                        <a :href="route('portfolio.file.download', { username: props.student.username, path: file.path })" download
                                            class="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-500 transition border border-slate-100 dark:border-slate-700">
                                            <Download class="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Artifact Deliverables -->
                        <div v-if="props.material.artifact_data && (props.material.artifact_data.link || (props.material.artifact_data.files && props.material.artifact_data.files.length > 0))" class="space-y-4">
                            <div class="flex items-center gap-2 px-2">
                                <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
                                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">{{ $t('study_artifact_deliverables', 'Verified Deliverables') }}</h3>
                            </div>
                            <div class="flex flex-col gap-3">
                                <!-- Link -->
                                <a v-if="props.material.artifact_data.link" :href="props.material.artifact_data.link" target="_blank" 
                                    class="group/item flex items-center justify-between p-5 bg-white/50 dark:bg-slate-900/50 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl hover:border-emerald-500/50 transition-all shadow-sm hover:shadow-emerald-500/5">
                                    <div class="flex items-center gap-4">
                                        <div class="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50">
                                            <Link2 class="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p class="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest mb-1">{{ $t('portfolio_external_artifact', 'External Artifact') }}</p>
                                            <p class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ props.material.artifact_data.link_name || $t('portfolio_view_deliverable', 'View Deliverable Link') }}</p>
                                        </div>
                                    </div>
                                    <ExternalLink class="h-5 w-5 text-slate-300 group-hover/item:text-emerald-500 transition transform group-hover/item:translate-x-1" />
                                </a>

                                <!-- Files -->
                                <div v-for="(file, idx) in props.material.artifact_data.files" :key="'art-f-'+idx"
                                    class="group/item flex items-center justify-between p-5 bg-white/50 dark:bg-slate-900/50 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl hover:border-emerald-500/50 transition-all shadow-sm hover:shadow-emerald-500/5">
                                    <div class="flex items-center gap-4">
                                        <div class="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50">
                                            <FileText class="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p class="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest mb-1">{{ $t('portfolio_verified_audit_pdf', 'Verified Audit PDF') }}</p>
                                            <p class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">{{ file.name }}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <button @click="() => { window.scrollTo({ top: document.querySelector('iframe')?.offsetTop - 100, behavior: 'smooth' }) }"
                                            class="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 transition border border-slate-100 dark:border-slate-700">
                                            <Eye class="h-4 w-4" />
                                        </button>
                                        <a :href="route('portfolio.file.download', { username: props.student.username, path: file.path })" download
                                            class="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 transition border border-slate-100 dark:border-slate-700">
                                            <Download class="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    </div>
</template>

<style scoped>
@keyframes pulse-slow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.4; }
}
.animate-pulse-slow {
    animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
