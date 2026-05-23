<script setup>
import { computed } from 'vue';
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
import { BarChart3 } from 'lucide-vue-next';
import { useAppearance } from '@/Composables/useAppearance';
import { trans } from 'laravel-vue-i18n';

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler);

const props = defineProps({
    competency: {
        type: Object,
        default: null
    }
});

const { isDark } = useAppearance();

// Radar Chart Config
const chartData = computed(() => {
    const competencies = props.competency?.competencies || {};
    const labels = Object.keys(competencies);
    const data = Object.values(competencies);

    if (labels.length === 0) {
        // Visual placeholder
        return {
            labels: ['Python Programming', 'Database Systems', 'Software Engineering', 'Data Analytics', 'Machine Learning', 'Web Development'],
            datasets: [
                {
                    label: trans('study_no_data') || 'No Data Yet',
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
                label: 'Competency Level',
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
</script>

<template>
    <div class="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/80 shadow-[0_10px_45px_-4px_rgba(0,0,0,0.03)] hover:shadow-2xl transition duration-500">
        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 class="h-5 w-5 text-indigo-500" />
            {{ $t('study_radar_title', 'Competency Radar') }}
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-xs font-medium mb-6">
            {{ $t('study_radar_subtitle', 'Derived from your verified academic records') }}
        </p>

        <!-- Radar Canvas Area -->
        <div class="h-80 w-full relative flex items-center justify-center">
            <Radar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>
