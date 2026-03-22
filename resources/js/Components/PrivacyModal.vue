<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    show: Boolean
});

defineEmits(['close']);
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm p-4" @click.self="$emit('close')">
        <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[85vh] shadow-2xl dark:shadow-none border border-transparent dark:border-slate-800 flex flex-col relative overflow-hidden transition-colors duration-500">
            
            <div class="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10 transition-colors duration-500">
                <h2 class="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-500">Privacy Policy</h2>
                <button @click="$emit('close')" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-8 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 transition-colors duration-500">
                <article class="prose prose-slate dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-li:text-slate-600 dark:prose-li:text-slate-300 max-w-none">
                    
                    <h1>Privacy Policy for Oneformind</h1>
                    <p>At Oneformind, accessible from https://oneformind.com, one of our main priorities is the privacy of our visitors...</p>
                    
                    <h2>Consent</h2>
                    <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

                    <h2>Information we collect</h2>
                    <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
                    
                    </article>
            </div>

            <div class="px-8 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-800/50 transition-colors duration-500">
                <button @click="$emit('close')" class="px-6 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition-all">
                    I Understand
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>