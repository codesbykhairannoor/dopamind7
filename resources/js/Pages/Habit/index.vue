<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

const props = defineProps({
    period: Object,
    user: Object
});
</script>

<template>
    <Head title="Habit Tracker" />

    <AuthenticatedLayout>
        
        <div class="flex justify-between items-end mb-8">
            <div>
                <h1 class="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Habit Tracker</h1>
                <p class="text-gray-500 dark:text-gray-400 mt-1">Bangun konsistensi lo di bulan ini.</p>
            </div>
            
            <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition shadow-lg shadow-indigo-500/30">
                + New Habit
            </button>
        </div>

        <div v-if="!period" class="p-10 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100">
            <p class="text-gray-500">Belum ada periode aktif.</p>
        </div>

        <div v-else>
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                <div v-for="habit in period.trackers" :key="habit.id" 
                     class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition group">
                    
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-2xl flex items-center justify-center">
                            {{ habit.icon }}
                        </div>
                        <div class="text-right">
                            <span class="text-xs font-bold text-gray-400 uppercase">Target</span>
                            <div class="font-mono font-bold text-gray-700 dark:text-gray-200">
                                {{ habit.target_value }} {{ habit.unit }}
                            </div>
                        </div>
                    </div>

                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 group-hover:text-indigo-600 transition">
                        {{ habit.name }}
                    </h3>

                    <div class="flex items-center justify-between text-sm text-gray-500 border-t pt-4 dark:border-gray-700">
                        <span>Progress Mingguan</span>
                        <span class="font-bold text-indigo-600">
                            {{ habit.entries.length }} Checklist
                        </span>
                    </div>
                </div>

            </div>
        </div>

    </AuthenticatedLayout>
</template>