<script setup>
const props = defineProps({ stats: Object });

const statCards = [
    { key: 'total', label: 'job_status_all', fallback: 'Semua', icon: '💼', color: 'slate' },
    { key: 'applied', label: 'job_status_applied', fallback: 'Dilamar', icon: '🚀', color: 'blue' },
    { key: 'interview', label: 'job_status_interview', fallback: 'Interview', icon: '🎯', color: 'purple' },
    { key: 'offer', label: 'job_status_offer', fallback: 'Dapat Offering', icon: '🎉', color: 'emerald' },
];
</script>

<template>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8 transition-all">
        <div v-for="stat in statCards" :key="stat.key" 
            class="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[1.5rem] p-4 sm:p-5 border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-all hover:shadow-md hover:-translate-y-0.5">
            <div class="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-3xl shrink-0 transition-colors duration-500"
                :class="`bg-${stat.color}-50 dark:bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400`">
                {{ stat.icon }}
            </div>
            <div>
                <p class="text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5 sm:mb-1 transition-colors duration-500">
                    {{ $t(stat.label, stat.fallback) }}
                </p>
                <h3 class="text-xl sm:text-3xl font-black text-slate-800 dark:text-white leading-none transition-colors duration-500">
                    {{ stats[stat.key] || 0 }}
                </h3>
            </div>
        </div>
    </div>
</template>