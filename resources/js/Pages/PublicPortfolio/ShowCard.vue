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

                <!-- 2. INSIGHTS & COMPETENCIES ROW -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- AI Verdict -->
                    <div v-if="props.material.metadata?.verdict" class="bg-gradient-to-br from-indigo-50/80 to-purple-50/50 dark:from-slate-900/80 dark:to-indigo-950/30 backdrop-blur-md p-8 rounded-[2rem] border border-indigo-100/80 dark:border-indigo-900/40 shadow-lg flex flex-col justify-center">
                        <h3 class="text-sm font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
                            <Sparkles class="h-5 w-5" />
                            AI Audit Insight
                        </h3>
                        <p class="text-base lg:text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                            "{{ props.material.metadata.verdict }}"
                        </p>
                    </div>

                    <!-- Verified Competencies -->
                    <div v-if="props.material.metadata?.competencies" class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/80 shadow-lg">
                        <h3 class="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                            <ShieldAlert class="h-5 w-5" />
                            Verified Skill Tags
                        </h3>
                        <div class="flex flex-wrap gap-2.5">
                            <span 
                                v-for="(score, comp) in props.material.metadata.competencies" 
                                :key="comp"
                                class="px-4 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-sm font-bold border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-default shadow-sm"
                            >
                                {{ comp }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- 3. RADAR CHART (If enabled) -->
                <div v-if="showRadar" class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/80 shadow-lg flex flex-col items-center">
                    <h3 class="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2 w-full justify-center">
                        <BarChart3 class="h-5 w-5 text-indigo-500" />
                        {{ $t('portfolio_verified_competencies', 'Verified Competencies Radar') }}
                    </h3>
                    <div class="h-80 w-full max-w-2xl relative flex items-center justify-center">
                        <Radar :data="chartData" :options="chartOptions" />
                    </div>
                </div>

                <!-- 4. ATTACHED DOCUMENTS -->
                <div class="space-y-6 mt-4">
                    <div v-if="props.material.context_data && props.material.context_data.length > 0">
                        <h3 class="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 px-2">Context Materials</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div v-for="(item, idx) in props.material.context_data" :key="'ctx-'+idx" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 hover:shadow-lg transition group">
                                <div class="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                                    <FileText v-if="item.type === 'file'" class="h-5 w-5" />
                                    <Link2 v-else-if="item.type === 'link'" class="h-5 w-5" />
                                    <BookOpen v-else class="h-5 w-5" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{{ item.type }}</h4>
                                    <a v-if="item.type === 'file'" :href="`/storage/${item.path}`" target="_blank" class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate block hover:text-indigo-500">{{ item.name }}</a>
                                    <a v-else-if="item.type === 'link'" :href="item.url" target="_blank" class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate block hover:text-indigo-500">{{ item.url }}</a>
                                    <p v-else class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{{ item.content }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="props.material.artifact_data && props.material.artifact_data.length > 0" class="pt-4">
                        <h3 class="text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-500 mb-4 px-2">Artifact Deliverables</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div v-for="(item, idx) in props.material.artifact_data" :key="'art-'+idx" class="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/30 p-5 rounded-2xl flex items-center gap-4 hover:shadow-lg shadow-emerald-500/5 transition group">
                                <div class="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                                    <FileText v-if="item.type === 'file'" class="h-5 w-5" />
                                    <Link2 v-else-if="item.type === 'link'" class="h-5 w-5" />
                                    <BookOpen v-else class="h-5 w-5" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="text-xs font-bold text-emerald-500/70 uppercase tracking-wider mb-1">{{ item.type }}</h4>
                                    <a v-if="item.type === 'file'" :href="`/storage/${item.path}`" target="_blank" class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate block hover:text-emerald-500">{{ item.name }}</a>
                                    <a v-else-if="item.type === 'link'" :href="item.url" target="_blank" class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate block hover:text-emerald-500">{{ item.url }}</a>
                                    <p v-else class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{{ item.content }}</p>
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
