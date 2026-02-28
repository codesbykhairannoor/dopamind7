<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    show: Boolean
});

defineEmits(['close']);
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4" @click.self="$emit('close')">
        <div class="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] shadow-2xl flex flex-col relative overflow-hidden">
            
            <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 class="text-2xl font-bold text-slate-800">Privacy Policy</h2>
                <button @click="$emit('close')" class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-8 overflow-y-auto custom-scrollbar">
                <article class="prose prose-slate prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600 max-w-none">
                    
                    <h1>Privacy Policy for Oneformind</h1>
                    <p>At Oneformind, accessible from https://oneformind.com, one of our main priorities is the privacy of our visitors...</p>
                    
                    <h2>Consent</h2>
                    <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

                    <h2>Information we collect</h2>
                    <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
                    
                    </article>
            </div>

            <div class="px-8 py-4 border-t border-slate-100 flex justify-end bg-slate-50">
                <button @click="$emit('close')" class="px-6 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all">
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
    background: #f1f5f9;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>