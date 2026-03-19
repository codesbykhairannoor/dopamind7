<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    title: String,
    description: String,
    image: String,
    actionLabel: String,
    actionRoute: String,
});
</script>

<template>
    <div class="flex flex-col items-center justify-center py-12 px-6 text-center animate-in fade-in zoom-in duration-700">
        <div class="relative mb-8 group">
            <div class="absolute inset-0 bg-indigo-500/10 blur-[60px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000"></div>
            <img 
                :src="`/images/empty_states/${image}.png`" 
                :alt="title"
                class="relative z-10 w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl group-hover:-translate-y-4 transition-transform duration-700 ease-out"
            />
        </div>
        
        <h3 class="text-2xl md:text-3xl font-black text-slate-800 mb-3 tracking-tight">
            {{ title }}
        </h3>
        <p class="text-slate-500 font-medium max-w-sm leading-relaxed mb-8">
            {{ description }}
        </p>
        
        <Link 
            v-if="actionRoute" 
            :href="actionRoute"
            class="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1 transition-all active:scale-95"
        >
            {{ actionLabel }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
        </Link>
    </div>
</template>
