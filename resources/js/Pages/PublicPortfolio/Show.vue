<script setup>
import { Head } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
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
    Sparkles, 
    FileText, 
    Eye,
    X,
    ShieldAlert,
    ExternalLink,
    ChevronRight,
    Award,
    Link2,
    Brain,
    Layers,
    Briefcase,
    CheckCircle,
    TrendingUp,
    Hash
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
    materials: {
        type: Array,
        default: () => []
    }
});

const { isDark } = useAppearance();

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
                    size: 11,
                    weight: '600'
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

const showArchetypes = computed(() => {
    return props.competency?.settings?.show_archetypes !== false;
});

const showMaterials = computed(() => {
    return props.competency?.settings?.show_materials !== false;
});

const showCareerTarget = computed(() => {
    return props.competency?.settings?.show_career_target === true && !!props.competency?.settings?.career_target;
});

const careerTarget = computed(() => {
    return props.competency?.settings?.career_target || '';
});

// Dynamic Custom Career Target Readiness Calculator
const careerReadinessResult = computed(() => {
    if (!careerTarget.value) return { score: 0, matches: [], missing: [], level: 'Basic', alignedArchetype: '' };

    const targetLower = careerTarget.value.toLowerCase();
    
    // Gather unique student keywords from materials
    const studentKeywords = new Set();
    props.materials.forEach(m => {
        if (m.metadata?.keywords) {
            m.metadata.keywords.forEach(kw => studentKeywords.add(kw.toLowerCase()));
        }
    });

    const competencies = props.competency?.competencies || {};
    
    let requiredKeywords = [];
    let alignedCompetencyKeys = [];
    let alignedArchetypeKey = '';

    if (targetLower.includes('machine learning') || targetLower.includes('ml') || targetLower.includes('ai') || targetLower.includes('data science') || targetLower.includes('artificial')) {
        requiredKeywords = ['python', 'scikit-learn', 'pytorch', 'tensorflow', 'pandas', 'numpy', 'model', 'data analysis', 'dataset', 'machine learning', 'neural'];
        alignedCompetencyKeys = ['Python Programming', 'Data Analytics', 'Machine Learning'];
        alignedArchetypeKey = 'Machine Learning Engineer';
    } else if (targetLower.includes('data engineer') || targetLower.includes('database') || targetLower.includes('etl') || targetLower.includes('sql') || targetLower.includes('warehouse')) {
        requiredKeywords = ['sql', 'python', 'spark', 'etl', 'database', 'postgresql', 'mysql', 'airflow', 'pipeline', 'query'];
        alignedCompetencyKeys = ['Database Systems', 'Python Programming', 'Data Analytics'];
        alignedArchetypeKey = 'Data Engineer';
    } else if (targetLower.includes('frontend') || targetLower.includes('web dev') || targetLower.includes('vue') || targetLower.includes('react') || targetLower.includes('javascript') || targetLower.includes('css') || targetLower.includes('ui') || targetLower.includes('ux') || targetLower.includes('design')) {
        requiredKeywords = ['html', 'css', 'vue', 'react', 'javascript', 'tailwind', 'frontend', 'vite', 'web development', 'typescript'];
        alignedCompetencyKeys = ['Web Development', 'Software Engineering'];
        alignedArchetypeKey = 'Frontend Architect';
    } else if (targetLower.includes('devops') || targetLower.includes('cloud') || targetLower.includes('docker') || targetLower.includes('kubernetes') || targetLower.includes('jenkins') || targetLower.includes('ci/cd') || targetLower.includes('aws') || targetLower.includes('terraform')) {
        requiredKeywords = ['docker', 'kubernetes', 'aws', 'ci/cd', 'git', 'terraform', 'cloud', 'nginx', 'linux', 'pipeline'];
        alignedCompetencyKeys = ['Software Engineering', 'Database Systems'];
        alignedArchetypeKey = 'DevOps Engineer';
    } else {
        // Generic fallback keyword set derived from target words
        const words = targetLower.split(/\s+/).filter(w => w.length > 2);
        requiredKeywords = [...new Set([...words, 'python', 'git', 'database', 'api', 'software', 'development'])];
        alignedCompetencyKeys = ['Software Engineering', 'Python Programming'];
        
        const archetypes = props.competency?.archetypes || {};
        if (Object.keys(archetypes).length > 0) {
            alignedArchetypeKey = Object.keys(archetypes).reduce((a, b) => archetypes[a] > archetypes[b] ? a : b);
        } else {
            alignedArchetypeKey = 'Backend Specialist';
        }
    }

    // Check matches
    const matches = [];
    const missing = [];
    requiredKeywords.forEach(kw => {
        let found = false;
        for (const skw of studentKeywords) {
            if (skw.includes(kw) || kw.includes(skw)) {
                found = true;
                break;
            }
        }
        if (found) {
            matches.push(kw);
        } else {
            missing.push(kw);
        }
    });

    // Base score from competency levels
    let competencySum = 0;
    let count = 0;
    alignedCompetencyKeys.forEach(k => {
        if (competencies[k] !== undefined) {
            competencySum += competencies[k];
            count++;
        }
    });
    const competencyAvg = count > 0 ? (competencySum / count) : 40;

    // Archetype alignment score
    const archetypes = props.competency?.archetypes || {};
    const archetypeScore = archetypes[alignedArchetypeKey] || 30;

    // Keyword density match score
    const keywordScore = requiredKeywords.length > 0 ? (matches.length / requiredKeywords.length) * 100 : 0;

    // Combined weighted score: 40% competency level, 40% archetype classifier fit, 20% keyword match density
    let finalScore = Math.round((competencyAvg * 0.4) + (archetypeScore * 0.4) + (keywordScore * 0.2));
    finalScore = Math.max(10, Math.min(98, finalScore));

    let level = 'Beginner';
    if (finalScore >= 85) level = 'Expert Readiness';
    else if (finalScore >= 70) level = 'Advanced Competence';
    else if (finalScore >= 50) level = 'Intermediate Fit';

    return {
        score: finalScore,
        matches: matches.map(w => w.charAt(0).toUpperCase() + w.slice(1)),
        missing: missing.map(w => w.charAt(0).toUpperCase() + w.slice(1)),
        level,
        alignedArchetype: alignedArchetypeKey
    };
});

// ─── Profile Summary Computeds ───────────────────────────────────────────────

// Aggregate all unique keywords across every completed material
const allKeywords = computed(() => {
    const seen = new Set();
    const result = [];
    props.materials.forEach(m => {
        if (m.metadata?.keywords) {
            m.metadata.keywords.forEach(kw => {
                const norm = kw.toLowerCase();
                if (!seen.has(norm)) {
                    seen.add(norm);
                    result.push(kw);
                }
            });
        }
    });
    return result;
});

// Top archetype (highest ML score)
const topArchetype = computed(() => {
    const archetypes = props.competency?.archetypes;
    if (!archetypes || Object.keys(archetypes).length === 0) return null;
    return Object.entries(archetypes).reduce((a, b) => a[1] > b[1] ? a : b);
});

// Primary domain label derived from top archetype or career target
const primaryDomain = computed(() => {
    if (topArchetype.value) return topArchetype.value[0];
    if (props.competency?.settings?.career_target) return props.competency.settings.career_target;
    return 'Computer Science';
});

// Top competency (highest radar score)
const topCompetency = computed(() => {
    const comps = props.competency?.competencies;
    if (!comps || Object.keys(comps).length === 0) return null;
    return Object.entries(comps).reduce((a, b) => a[1] > b[1] ? a : b);
});

// Auto-generated natural language bio from ML outputs
const profileBio = computed(() => {
    const name = props.student.name.split(' ')[0];
    const count = props.materials.length;
    const domain = primaryDomain.value;
    const topComp = topCompetency.value ? topCompetency.value[0] : null;
    const verdict = props.competency?.verdict;
    const kwSlice = allKeywords.value.slice(0, 5).join(', ');

    if (verdict) return verdict;

    if (count === 0) {
        return `${name} is building their verified academic profile on Dopmymind. No coursework has been audited yet.`;
    }

    let bio = `${name} has ${count} verified coursework artifact${count > 1 ? 's' : ''} audited through the IPoW protocol, demonstrating proven academic work in the field of ${domain}.`;
    if (topComp) bio += ` Their strongest verified competency is ${topComp}.`;
    if (kwSlice) bio += ` Key technical skills include: ${kwSlice}.`;
    return bio;
});
</script>

<template>
    <Head :title="`${props.student.name} - Interactive Proof of Work Portfolio`" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 relative overflow-hidden font-sans">
        <!-- Floating Glow effects for premium aesthetic -->
        <div class="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <div class="absolute bottom-[-15%] right-[-5%] w-[700px] h-[700px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

        <!-- Main Showcase Area -->
        <main class="w-full mx-auto px-6 lg:px-12 py-12">
            
            <!-- ═══════════════════════════════════════════════════════════ -->
            <!-- PROFILE IDENTITY SUMMARY CARD                               -->
            <!-- ═══════════════════════════════════════════════════════════ -->
            <section class="mb-10 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white/80 via-white/70 to-indigo-50/40 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-indigo-950/30 border border-slate-200/60 dark:border-slate-800/80 shadow-[0_20px_60px_-8px_rgba(99,102,241,0.08)] backdrop-blur-xl p-8 md:p-10">
                <!-- Decorative glow blobs inside card -->
                <div class="absolute -top-12 -right-12 w-52 h-52 bg-indigo-500/10 dark:bg-indigo-500/8 rounded-full blur-3xl pointer-events-none"></div>
                <div class="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-500/8 dark:bg-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>

                <!-- Top row: Avatar + Identity + Stats -->
                <div class="relative z-10 flex flex-col lg:flex-row lg:items-start gap-8">

                    <!-- Left: Avatar + Name block -->
                    <div class="flex items-center gap-5 shrink-0">
                        <!-- Avatar -->
                        <div v-if="props.student.avatar_url" class="h-24 w-24 rounded-[2rem] overflow-hidden border-2 border-white dark:border-slate-800 shadow-xl ring-2 ring-indigo-500/20">
                            <img :src="props.student.avatar_url" :alt="props.student.name" class="h-full w-full object-cover" />
                        </div>
                        <div v-else class="h-24 w-24 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-4xl font-black tracking-tight shadow-xl ring-2 ring-indigo-500/30">
                            {{ props.student.name.charAt(0) }}
                        </div>

                        <div>
                            <!-- Verified badge -->
                            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/8 text-emerald-600 dark:text-emerald-400 font-extrabold text-[9px] uppercase tracking-wider mb-2 border border-emerald-200/40 dark:border-emerald-800/40">
                                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                IPoW Verified
                            </div>
                            <h1 class="text-3xl md:text-4xl font-[900] tracking-[-0.04em] text-slate-900 dark:text-white leading-none">
                                {{ props.student.name }}
                            </h1>
                            <p class="text-slate-400 dark:text-slate-500 text-sm font-semibold mt-1.5 flex items-center gap-2">
                                <span>@{{ props.student.username }}</span>
                                <span class="text-slate-300 dark:text-slate-700">•</span>
                                <span class="text-indigo-500 dark:text-indigo-400 font-bold">{{ primaryDomain }}</span>
                            </p>
                        </div>
                    </div>

                    <!-- Divider (desktop only) -->
                    <div class="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-800 to-transparent mx-2"></div>

                    <!-- Right: Key stats row -->
                    <div class="flex flex-wrap gap-4 lg:gap-6 items-start flex-1">

                        <!-- Stat: Verified Cards -->
                        <div class="flex flex-col gap-1">
                            <span class="text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                <Layers class="h-3 w-3" /> {{ $t('portfolio_stat_verified_cards', 'Verified Cards') }}
                            </span>
                            <span class="text-3xl font-[900] text-slate-900 dark:text-white leading-none">
                                {{ props.materials.length }}
                            </span>
                            <span class="text-[10px] text-slate-400 font-semibold">{{ $t('portfolio_stat_coursework_artifacts', 'coursework artifacts') }}</span>
                        </div>

                        <!-- Stat: Top Archetype -->
                        <div v-if="topArchetype" class="flex flex-col gap-1">
                            <span class="text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                <Brain class="h-3 w-3" /> {{ $t('portfolio_stat_ml_archetype', 'ML Archetype Fit') }}
                            </span>
                            <span class="text-xl font-[900] text-indigo-600 dark:text-indigo-400 leading-tight">
                                {{ topArchetype[0] }}
                            </span>
                            <span class="text-[10px] text-slate-400 font-semibold">{{ topArchetype[1] }}% {{ $t('portfolio_stat_confidence', 'confidence') }}</span>
                        </div>

                        <!-- Stat: Top Competency -->
                        <div v-if="topCompetency" class="flex flex-col gap-1">
                            <span class="text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                <TrendingUp class="h-3 w-3" /> {{ $t('portfolio_stat_strongest_skill', 'Strongest Skill') }}
                            </span>
                            <span class="text-xl font-[900] text-purple-600 dark:text-purple-400 leading-tight">
                                {{ topCompetency[0] }}
                            </span>
                            <span class="text-[10px] text-slate-400 font-semibold">{{ topCompetency[1] }}% {{ $t('portfolio_stat_mastery_index', 'mastery index') }}</span>
                        </div>

                        <!-- Stat: Unique skill tags -->
                        <div v-if="allKeywords.length > 0" class="flex flex-col gap-1">
                            <span class="text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                <Hash class="h-3 w-3" /> {{ $t('portfolio_stat_unique_tags', 'Unique Skill Tags') }}
                            </span>
                            <span class="text-3xl font-[900] text-slate-900 dark:text-white leading-none">
                                {{ allKeywords.length }}
                            </span>
                            <span class="text-[10px] text-slate-400 font-semibold">{{ $t('portfolio_stat_extracted_by_ai', 'extracted by AI') }}</span>
                        </div>

                        <!-- Badge: Security audit -->
                        <div class="ml-auto self-start">
                            <span class="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                <Award class="h-3.5 w-3.5" />
                                SKLEARN-SECURE-AUTO
                            </span>
                        </div>
                    </div>
                </div>

                <!-- AI Bio Narrative -->
                <div class="relative z-10 mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/60">
                    <div class="flex items-start gap-3">
                        <div class="shrink-0 h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                            <Sparkles class="h-4 w-4 text-white" />
                        </div>
                        <div class="flex-1">
                            <span class="text-[9px] uppercase font-black tracking-widest text-indigo-500 dark:text-indigo-400 block mb-1">{{ $t('portfolio_neural_summary_label', 'Neural Profile Summary') }}</span>
                            <p class="text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                                <!-- If ML verdict exists, show it directly (it's AI-generated, stays as-is) -->
                                <template v-if="props.competency?.verdict">{{ props.competency.verdict }}</template>
                                <!-- No materials yet -->
                                <template v-else-if="props.materials.length === 0">
                                    {{ props.student.name.split(' ')[0] }} {{ $t('portfolio_bio_empty', 'is building their verified academic profile on Dopmymind. No coursework has been audited yet.') }}
                                </template>
                                <!-- Auto-generated bio from data -->
                                <template v-else>
                                    {{ props.student.name.split(' ')[0] }} {{ $t('portfolio_bio_has', 'has') }} {{ props.materials.length }} {{ $t('portfolio_bio_in_field', 'verified coursework artifact(s) audited through the IPoW protocol, demonstrating proven academic work in the field of') }} {{ primaryDomain }}.
                                    <template v-if="topCompetency"> {{ $t('portfolio_bio_strongest', 'Strongest verified competency:') }} {{ topCompetency[0] }}.</template>
                                    <template v-if="allKeywords.length > 0"> {{ $t('portfolio_bio_key_skills', 'Key technical skills include:') }} {{ allKeywords.slice(0, 5).join(', ') }}.</template>
                                </template>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Aggregated Skill Tags Cloud -->
                <div v-if="allKeywords.length > 0" class="relative z-10 mt-6">
                    <span class="text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 block mb-3 flex items-center gap-1.5">
                        <CheckCircle class="h-3 w-3 text-emerald-500" />
                        {{ $t('portfolio_all_skill_tags_label', 'All Verified Skill Tags Across Coursework') }}
                    </span>
                    <div class="flex flex-wrap gap-2">
                        <span 
                            v-for="kw in allKeywords" 
                            :key="kw"
                            class="px-3 py-1 rounded-full bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 text-[11px] font-bold border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-default"
                        >
                            {{ kw }}
                        </span>
                    </div>
                </div>
            </section>

            <!-- Bento Grid Section -->
            <div v-if="showRadar || showArchetypes || showCareerTarget" class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                
                <!-- Radar Competencies -->
                <div v-if="showRadar" :class="[showArchetypes || showCareerTarget ? 'lg:col-span-6' : 'lg:col-span-12', 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/80 shadow-[0_10px_45px_-4px_rgba(0,0,0,0.02)] hover:shadow-2xl transition duration-500']">
                    <h2 class="text-lg font-extrabold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                        <BarChart3 class="h-5 w-5 text-indigo-500" />
                        {{ $t('portfolio_verified_competencies', 'Verified Competencies') }}
                    </h2>
                    <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold mb-6">
                        {{ $t('portfolio_competency_subtitle', 'Competency indices mapped dynamically from raw academic files') }}
                    </p>

                    <!-- Radar canvas -->
                    <div class="h-80 w-full relative flex items-center justify-center">
                        <Radar :data="chartData" :options="chartOptions" />
                    </div>
                </div>

                <!-- Career Alignment & Verdict / Custom Career Target -->
                <div v-if="showArchetypes || showCareerTarget" :class="[showRadar ? 'lg:col-span-6' : 'lg:col-span-12', 'flex flex-col gap-8']">
                    
                    <!-- Custom Career Target Card -->
                    <div v-if="showCareerTarget" class="bg-gradient-to-br from-indigo-50/40 to-purple-50/30 dark:from-slate-900/50 dark:to-indigo-950/20 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-indigo-100/50 dark:border-indigo-900/30 shadow-[0_10px_35px_-4px_rgba(99,102,241,0.05)] relative overflow-hidden group">
                        <!-- Abstract glow asset -->
                        <div class="absolute -right-10 -bottom-10 h-40 w-40 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-125 transition duration-500"></div>
                        
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                                <span class="text-indigo-500">🎯</span>
                                {{ $t('portfolio_target_career_prefix', 'Target Career Fit:') }} {{ careerTarget }}
                            </h2>
                            <span class="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                                {{ careerReadinessResult.level }}
                            </span>
                        </div>
                        
                        <div class="flex flex-col sm:flex-row items-center gap-6 mt-4">
                            <!-- Circular Progress / Percentage Badge -->
                            <div class="relative shrink-0 flex items-center justify-center h-24 w-24">
                                <svg class="w-24 h-24 transform -rotate-90">
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" class="text-slate-200 dark:text-slate-800" stroke-width="8" fill="transparent" />
                                    <circle cx="48" cy="48" r="40" stroke="url(#indigoGrad)" stroke-width="8" fill="transparent"
                                        :stroke-dasharray="2 * Math.PI * 40"
                                        :stroke-dashoffset="2 * Math.PI * 40 * (1 - careerReadinessResult.score / 100)"
                                        stroke-linecap="round"
                                        class="transition-all duration-700 ease-out"
                                    />
                                    <defs>
                                        <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#6366f1" />
                                            <stop offset="100%" stop-color="#a855f7" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div class="absolute text-center">
                                    <span class="text-2xl font-black text-slate-800 dark:text-white leading-none">
                                        {{ careerReadinessResult.score }}%
                                    </span>
                                    <span class="block text-[8px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">{{ $t('portfolio_ready_label', 'Ready') }}</span>
                                </div>
                            </div>
                            
                            <div class="flex-1 space-y-3">
                                <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                                    {{ $t('portfolio_career_readiness_desc', 'Your coursework matches') }} <span class="text-indigo-600 dark:text-indigo-400 font-bold">{{ careerReadinessResult.score }}%</span> {{ $t('portfolio_career_readiness_of', 'of requirements for a role in') }} <span class="text-indigo-600 dark:text-indigo-400 font-bold">{{ careerTarget }}</span>, {{ $t('portfolio_career_readiness_align', 'aligning with the dynamically predicted') }} <span class="text-indigo-600 dark:text-indigo-400 font-bold">{{ careerReadinessResult.alignedArchetype }}</span> {{ $t('portfolio_career_readiness_archetype', 'archetype.') }}
                                </p>
                                
                                <!-- Present Skills List -->
                                <div v-if="careerReadinessResult.matches.length > 0">
                                    <span class="text-[9px] uppercase font-bold tracking-wider text-emerald-500 dark:text-emerald-400 block mb-1">{{ $t('portfolio_acquired_skills_label', 'Acquired Skills Matching Goal') }}</span>
                                    <div class="flex flex-wrap gap-1">
                                        <span v-for="match in careerReadinessResult.matches" :key="match" class="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold border border-emerald-100/50 dark:border-emerald-900/20">
                                            ✓ {{ match }}
                                        </span>
                                    </div>
                                </div>
                                
                                <!-- Missing / Recommended Skills List -->
                                <div v-if="careerReadinessResult.missing.length > 0">
                                    <span class="text-[9px] uppercase font-bold tracking-wider text-amber-500 dark:text-amber-400 block mb-1">{{ $t('portfolio_recommended_skills_label', 'Recommended Skill Additions') }}</span>
                                    <div class="flex flex-wrap gap-1">
                                        <span v-for="miss in careerReadinessResult.missing" :key="miss" class="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-500 text-[9px] font-extrabold border border-amber-100/50 dark:border-amber-900/20">
                                            + {{ miss }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Archetype Progress Bars -->
                    <div v-if="showArchetypes" class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/80 shadow-[0_10px_45px_-4px_rgba(0,0,0,0.02)] hover:shadow-2xl transition duration-500 flex-1">
                        <h2 class="text-lg font-extrabold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                            <Sparkles class="h-5 w-5 text-indigo-500" />
                            {{ $t('portfolio_ml_archetypes_title', 'Dynamic Archetype Fits') }}
                        </h2>
                        <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold mb-6">
                            {{ $t('portfolio_archetypes_subtitle', 'Career path alignment calculated via dynamic ML analysis') }}
                        </p>

                        <!-- Archetypes Alignment -->
                        <div v-if="props.competency?.archetypes" class="space-y-4">
                            <div 
                                v-for="(score, archetype) in props.competency.archetypes" 
                                :key="archetype"
                                class="space-y-1.5"
                            >
                                <div class="flex items-center justify-between text-xs font-bold">
                                    <span class="text-slate-700 dark:text-slate-300">{{ archetype }}</span>
                                    <span class="text-indigo-600 dark:text-indigo-400">{{ score }}%</span>
                                </div>
                                <div class="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
                                    <div 
                                        class="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500" 
                                        :style="`width: ${score}%`"
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <!-- Empty state archetypes -->
                        <div v-else class="py-6 text-center text-slate-400 dark:text-slate-600 text-xs font-semibold">
                            {{ $t('portfolio_no_alignment', 'No career alignment analysis available.') }}
                        </div>
                    </div>

                    <!-- Classifier Verdict -->
                    <div v-if="showArchetypes && props.competency?.verdict" class="p-6 rounded-[2.5rem] bg-indigo-600 text-white shadow-xl shadow-indigo-600/10 border border-indigo-500 relative overflow-hidden group">
                        <!-- Abstract design asset -->
                        <div class="absolute right-0 top-0 h-32 w-32 bg-white/5 rounded-full translate-x-12 -translate-y-12 blur-xl transition group-hover:scale-125 duration-500"></div>
                        
                        <div class="flex items-start gap-4 relative z-10">
                            <span class="text-3xl select-none">🤖</span>
                            <div>
                                <h4 class="text-xs font-extrabold uppercase tracking-widest text-indigo-200">{{ $t('portfolio_neural_verdict_label', 'Neural Classifier Verdict') }}</h4>
                                <p class="text-sm font-semibold mt-2 leading-relaxed text-indigo-50">
                                    {{ props.competency.verdict }}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <!-- Fallback if all settings are turned off -->
            <div v-if="!showRadar && !showArchetypes && !showCareerTarget && !showMaterials" class="py-24 text-center">
                <div class="inline-flex h-20 w-20 rounded-[2.5rem] bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                    <ShieldAlert class="h-10 w-10" />
                </div>
                <h2 class="text-2xl font-black text-slate-800 dark:text-white">{{ $t('portfolio_content_hidden_title', 'Portfolio Content Hidden') }}</h2>
                <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2 text-sm font-semibold">
                    {{ $t('portfolio_content_hidden_desc', 'The student has configured their portfolio display settings to hide academic competencies, career target indicators, and coursework list.') }}
                </p>
            </div>

            <!-- Coursework Audited Archive -->
            <section v-if="showMaterials" class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/80 shadow-[0_10px_45px_-4px_rgba(0,0,0,0.02)] hover:shadow-2xl transition duration-500">
                <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                    <BookOpen class="h-5 w-5 text-indigo-500" />
                    {{ $t('portfolio_audited_coursework_title', 'Audited Coursework & Documents') }}
                </h2>
                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold mb-6">
                    {{ $t('portfolio_coursework_subtitle', 'A secure repository of coursework materials. Click on any document to audit the content inline.') }}
                </p>

                <!-- Materials List -->
                <div v-if="props.materials.length === 0" class="py-12 text-center text-slate-400 dark:text-slate-600 text-sm font-medium">
                    {{ $t('portfolio_no_coursework', 'No coursework records verified yet for this student.') }}
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a 
                        v-for="material in props.materials" 
                        :key="material.id"
                        :href="route('portfolio.card', { username: props.student.username, id: material.id })"
                        class="p-5 bg-slate-50/50 dark:bg-slate-950/20 hover:bg-white dark:hover:bg-slate-900 border border-slate-100 dark:border-slate-900/40 hover:border-slate-200 dark:hover:border-slate-800 hover:shadow-xl rounded-3xl transition duration-300 flex flex-col justify-between gap-4 cursor-pointer group"
                    >
                        <div>
                            <!-- Badge Header -->
                            <div class="flex items-center gap-2 mb-2">
                                <span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider"
                                    :class="material.type === 'context' 
                                        ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/40' 
                                        : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/40'"
                                >
                                    {{ material.type === 'context' ? $t('portfolio_material_type_context', 'Context') : $t('portfolio_material_type_artifact', 'Artifact') }}
                                </span>

                                <span v-if="material.week" class="text-[10px] text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1">
                                    <Clock class="h-3 w-3" />
                                    {{ material.week }}
                                </span>

                                <span v-if="material.grade !== null" class="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[9px] font-bold">
                                    Grade: {{ material.grade }}
                                </span>
                            </div>

                            <h3 class="text-sm font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition line-clamp-1">
                                {{ material.course_name }}
                            </h3>
                            
                            <p class="text-xs text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1.5">
                                <template v-if="material.embed_url">
                                    <Link2 class="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                                    <span class="truncate block max-w-[200px] sm:max-w-[280px] underline hover:text-indigo-600 dark:hover:text-indigo-400">{{ material.embed_url }}</span>
                                </template>
                                <template v-else-if="material.rich_text">
                                    <BookOpen class="h-3.5 w-3.5 text-purple-500 shrink-0" />
                                    <span class="truncate block max-w-[200px] sm:max-w-[280px] italic">"{{ material.rich_text.substring(0, 60) }}..."</span>
                                </template>
                                <template v-else>
                                    <FileText class="h-3.5 w-3.5 text-blue-500 shrink-0" />
                                    <span class="truncate block max-w-[200px] sm:max-w-[280px]">{{ material.file_name }}</span>
                                </template>
                            </p>
                        </div>

                        <!-- Keywords tags -->
                        <div v-if="material.metadata?.keywords && material.metadata.keywords.length > 0" class="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-900/50">
                            <span 
                                v-for="kw in material.metadata.keywords.slice(0, 4)" 
                                :key="kw"
                                class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-[9px] font-bold border border-slate-200/30 dark:border-slate-800/30"
                            >
                                {{ kw }}
                            </span>
                            <span v-if="material.metadata.keywords.length > 4" class="text-[9px] text-slate-400 dark:text-slate-500 font-bold self-center pl-1">
                                +{{ material.metadata.keywords.length - 4 }} more
                            </span>
                        </div>

                        <!-- Read button action hover -->
                        <div class="mt-2 flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition pt-1">
                            <span class="flex items-center gap-1 text-[11px]">
                                <ExternalLink class="h-3.5 w-3.5" />
                                {{ $t('portfolio_audit_action', 'Audit coursework') }}
                            </span>
                            <ChevronRight class="h-4 w-4 transform group-hover:translate-x-1 transition duration-300" />
                        </div>
                    </a>
                </div>
            </section>
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
.animate-scale-up {
    animation: scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
@keyframes scale-up {
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
</style>
