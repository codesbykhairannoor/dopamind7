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
    ArrowLeft,
    ExternalLink,
    Award,
    Link2,
    ShieldAlert
} from 'lucide-vue-next';

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
    const labels = Object.keys(competencies);
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
                color: isDark.value ? '#94a3b8' : '#475569',
                font: {
                    family: 'Plus Jakarta Sans',
                    size: 10,
                    weight: '600'
                }
            },
            ticks: {
                backdropColor: 'transparent',
                color: isDark.value ? '#64748b' : '#94a3b8',
                font: {
                    family: 'Plus Jakarta Sans',
                    size: 8
                },
                beginAtZero: true,
                max: 100,
                stepSize: 20
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
        <!-- Floating Glow effects for premium aesthetic -->
        <div class="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <div class="absolute bottom-[-15%] right-[-5%] w-[700px] h-[700px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

        <!-- Top Header Navigation -->
        <nav class="border-b border-slate-200/60 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md sticky top-0 z-40">
            <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <span class="text-xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span class="text-indigo-600 dark:text-indigo-400">ONE</span>FOR<span class="text-indigo-600 dark:text-indigo-400">MIND</span>
                    </span>
                    <span class="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                        IPoW Audited Profile
                    </span>
                </div>
                <a 
                    href="https://oneformind.com" 
                    target="_blank"
                    class="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-1"
                >
                    {{ $t('portfolio_learn_about_ipow', 'Learn about IPoW') }}
                    <ExternalLink class="h-3 w-3" />
                </a>
            </div>
        </nav>

        <!-- Main Showcase Area -->
        <main class="max-w-7xl mx-auto px-6 py-12">
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

            <!-- Responsive Bento Details Grid -->
            <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <!-- LEFT COLUMN: Profile info & Metadata -->
                <div class="lg:col-span-4 flex flex-col gap-6">
                    
                    <!-- Student Identity Card -->
                    <div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/80 shadow-md">
                        <div class="flex items-center gap-4">
                            <!-- Avatar fallback -->
                            <div v-if="props.student.avatar_url" class="h-14 w-14 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
                                <img :src="props.student.avatar_url" :alt="props.student.name" class="h-full w-full object-cover" />
                            </div>
                            <div v-else class="h-14 w-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-black tracking-tight shadow-md border border-indigo-500 shrink-0">
                                {{ props.student.name.charAt(0) }}
                            </div>

                            <div class="min-w-0">
                                <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-extrabold text-[8px] uppercase tracking-wider mb-1">
                                    <span class="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></span>
                                    {{ $t('portfolio_ipow_verified', 'IPoW Verified') }}
                                </div>
                                <h2 class="text-md font-bold text-slate-900 dark:text-white truncate leading-tight">
                                    {{ props.student.name }}
                                </h2>
                                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold mt-0.5">
                                    @{{ props.student.username }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Card Coursework Metadata -->
                    <div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/80 shadow-md flex flex-col gap-4">
                        <h3 class="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {{ $t('portfolio_card_details_label', 'Coursework Details') }}
                        </h3>

                        <div class="space-y-3">
                            <div class="flex items-center justify-between text-xs font-semibold">
                                <span class="text-slate-400">{{ $t('portfolio_card_course_label', 'Course / Class') }}</span>
                                <span class="text-slate-800 dark:text-slate-200 font-extrabold text-right ml-4 truncate max-w-[180px]">
                                    {{ props.material.course_name }}
                                </span>
                            </div>

                            <div class="flex items-center justify-between text-xs font-semibold">
                                <span class="text-slate-400">{{ $t('portfolio_card_category_label', 'Card Category') }}</span>
                                <span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/40">
                                    Coursework Material
                                </span>
                            </div>

                            <div v-if="props.material.week" class="flex items-center justify-between text-xs font-semibold">
                                <span class="text-slate-400">{{ $t('portfolio_card_period_label', 'Audit Period') }}</span>
                                <span class="text-slate-800 dark:text-slate-200 font-bold flex items-center gap-1">
                                    <Clock class="h-3 w-3 text-indigo-500" />
                                    {{ props.material.week }}
                                </span>
                            </div>

                            <div v-if="props.material.grade !== null" class="flex items-center justify-between text-xs font-semibold">
                                <span class="text-slate-400">{{ $t('portfolio_card_score_label', 'Academic Score') }}</span>
                                <span class="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-black border border-emerald-100/30 dark:border-emerald-900/30">
                                    {{ props.material.grade }}
                                </span>
                            </div>
                        </div>

                        <!-- Keywords / Competency Tags -->
                        <div v-if="props.material.metadata?.competencies" class="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                            <span class="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block mb-2">{{ $t('portfolio_card_skill_tags_label', 'Verified Skill Tags') }}</span>
                            <div class="flex flex-wrap gap-1.5">
                                <span 
                                    v-for="(score, comp) in props.material.metadata.competencies" 
                                    :key="comp"
                                    class="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-[10px] font-bold border border-slate-200/30 dark:border-slate-800/30"
                                >
                                    {{ comp }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Radar Competency Chart -->
                    <div v-if="showRadar" class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/80 shadow-md">
                        <h3 class="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
                            <BarChart3 class="h-4 w-4 text-indigo-500" />
                            {{ $t('portfolio_verified_competencies', 'Verified Competencies') }}
                        </h3>
                        <div class="h-64 w-full relative flex items-center justify-center">
                            <Radar :data="chartData" :options="chartOptions" />
                        </div>
                    </div>

                </div>

                <!-- RIGHT COLUMN: Main Document Viewer -->
                <div class="lg:col-span-8 flex flex-col gap-6">
                    
                    <!-- Context Data Section -->
                    <div v-if="props.material.context_data" class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/80 shadow-md space-y-6">
                        <h4 class="text-xs uppercase font-extrabold tracking-widest text-indigo-500 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/50 pb-2">Context Material</h4>
                        
                        <!-- Context Files -->
                        <div v-if="props.material.context_data.files && props.material.context_data.files.length" class="space-y-4">
                            <div v-for="(file, idx) in props.material.context_data.files" :key="idx" class="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                <div class="px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                    <FileText class="h-4 w-4" /> {{ file.name }}
                                </div>
                                <div class="h-[60vh] w-full" v-if="file.path.endsWith('.pdf')">
                                    <iframe :src="`/storage/${file.path}`" class="w-full h-full border-0" title="Document Viewer" allow="fullscreen"></iframe>
                                </div>
                                <div v-else class="p-6 text-center text-sm text-slate-500">
                                    File cannot be previewed inline. <a :href="`/storage/${file.path}`" target="_blank" class="text-indigo-500 underline ml-2">Download File</a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Context Link -->
                        <div v-if="props.material.context_data.link" class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                            <div class="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center shrink-0">
                                <Link2 class="h-6 w-6 text-indigo-500" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <h5 class="text-xs font-bold text-slate-400 uppercase">External Link</h5>
                                <a :href="props.material.context_data.link" target="_blank" class="text-sm font-bold text-indigo-600 dark:text-indigo-400 underline truncate block">{{ props.material.context_data.link }}</a>
                            </div>
                        </div>

                        <!-- Context Text -->
                        <div v-if="props.material.context_data.text" class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h5 class="text-xs font-bold text-slate-400 uppercase mb-2">Notes</h5>
                            <p class="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{{ props.material.context_data.text }}</p>
                        </div>
                    </div>

                    <!-- Artifact Data Section -->
                    <div v-if="props.material.artifact_data" class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/80 shadow-md space-y-6">
                        <h4 class="text-xs uppercase font-extrabold tracking-widest text-emerald-500 dark:text-emerald-400 border-b border-emerald-100 dark:border-emerald-900/50 pb-2">Artifact Material</h4>
                        
                        <!-- Artifact Files -->
                        <div v-if="props.material.artifact_data.files && props.material.artifact_data.files.length" class="space-y-4">
                            <div v-for="(file, idx) in props.material.artifact_data.files" :key="idx" class="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                <div class="px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                    <FileText class="h-4 w-4" /> {{ file.name }}
                                </div>
                                <div class="h-[60vh] w-full" v-if="file.path.endsWith('.pdf')">
                                    <iframe :src="`/storage/${file.path}`" class="w-full h-full border-0" title="Document Viewer" allow="fullscreen"></iframe>
                                </div>
                                <div v-else class="p-6 text-center text-sm text-slate-500">
                                    File cannot be previewed inline. <a :href="`/storage/${file.path}`" target="_blank" class="text-emerald-500 underline ml-2">Download File</a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Artifact Link -->
                        <div v-if="props.material.artifact_data.link" class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                            <div class="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0">
                                <Link2 class="h-6 w-6 text-emerald-500" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <h5 class="text-xs font-bold text-slate-400 uppercase">External Link</h5>
                                <a :href="props.material.artifact_data.link" target="_blank" class="text-sm font-bold text-emerald-600 dark:text-emerald-400 underline truncate block">{{ props.material.artifact_data.link }}</a>
                            </div>
                        </div>

                        <!-- Artifact Text -->
                        <div v-if="props.material.artifact_data.text" class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h5 class="text-xs font-bold text-slate-400 uppercase mb-2">Notes</h5>
                            <p class="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{{ props.material.artifact_data.text }}</p>
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
