<script setup>
import { onMounted } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import canvasConfetti from 'canvas-confetti';

const props = defineProps({
    plan: String,
    userName: String
});

onMounted(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        canvasConfetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        canvasConfetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
});
</script>

<template>
    <Head title="Welcome to the Ecosystem!" />

    <AuthenticatedLayout>
        <div class="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50/30 dark:bg-slate-950/20">
            <div class="max-w-xl w-full text-center animate-in fade-in zoom-in-95 duration-1000">
                
                <!-- Success Icon -->
                <div class="relative inline-block mb-10">
                    <div class="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 scale-150 animate-pulse"></div>
                    <div class="relative w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-200 dark:shadow-none rotate-6 hover:rotate-0 transition-transform duration-500">
                        <OneForMindIcon name="shield-check" size="64" />
                    </div>
                    <div class="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg animate-bounce">
                        <OneForMindIcon name="check" size="20" stroke-width="4" />
                    </div>
                </div>

                <!-- Text Content -->
                <h1 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
                    {{ $t('payment_success_title', 'Upgrade Complete!') }}
                </h1>
                <p class="text-lg md:text-xl font-bold text-slate-500 dark:text-slate-400 mb-10">
                    {{ $t('payment_welcome_msg', 'Welcome to the elite ecosystem,') }} <span class="text-indigo-600 dark:text-indigo-400">{{ userName }}</span>. 
                    {{ $t('payment_quantum_praise', 'Your potential is now officially expanded.') }}
                </p>

                <!-- Plan Badge -->
                <div class="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
                    <div class="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
                    <span class="text-xs font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">
                        {{ plan }} Membership Active
                    </span>
                </div>

                <!-- Action Buttons -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link 
                        href="/dashboard" 
                        class="px-8 py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
                    >
                        {{ $t('payment_btn_dashboard', 'Go to Dashboard') }}
                    </Link>
                    <Link 
                        href="/coach" 
                        class="px-8 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                    >
                        {{ $t('payment_btn_ai', 'Talk to AI Coach') }}
                    </Link>
                </div>

                <div class="mt-16 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center justify-center gap-4">
                    <span class="w-12 h-px bg-slate-200"></span>
                    SECURE ACCESS GRANTED
                    <span class="w-12 h-px bg-slate-200"></span>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
@keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
