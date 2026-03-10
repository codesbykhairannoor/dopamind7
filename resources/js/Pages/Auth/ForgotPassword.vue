<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3';
import InputError from '@/Components/InputError.vue';

defineProps({
    status: { type: String },
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <Head title="Reset Password" />

    <div class="relative min-h-screen flex flex-col items-center justify-center bg-white selection:bg-indigo-100 selection:text-indigo-700 p-6 overflow-hidden">
        
        <div class="absolute top-0 w-full h-96 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-blue-50/50 blur-3xl -z-10 pointer-events-none"></div>

        <div class="w-full max-w-[420px] flex flex-col relative z-10">
            <div class="flex justify-center mb-8">
                <a :href="route('home')" class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 transition-transform duration-500 hover:rotate-[360deg]">
                    <img src="/favicon.svg?v=2" alt="OneForMind Logo" class="h-8 w-8 brightness-0 invert" />
                </a>
            </div>

            <div class="text-center mb-8">
                <h1 class="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                    {{ $t('auth_reset_title', 'Reset password') }}
                </h1>
                <p class="text-sm font-medium text-slate-500 leading-relaxed px-4">
                    {{ $t('auth_reset_desc', "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.") }}
                </p>
            </div>

            <div v-if="status" class="mb-6 font-bold text-sm text-indigo-600 bg-indigo-50 p-4 rounded-xl border border-indigo-100/50 flex items-center justify-center gap-3 text-center">
                <span class="text-lg">📧</span> {{ status }}
            </div>

            <form @submit.prevent="submit" class="space-y-4">
                <div>
                    <input
                        id="email"
                        type="email"
                        v-model="form.email"
                        :placeholder="$t('auth_placeholder_email')"
                        class="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 transition-all outline-none"
                        :class="form.errors.email ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'focus:border-indigo-500 focus:ring-indigo-500/10'"
                        required
                        autofocus
                    />
                    <InputError class="mt-1.5 ml-1" :message="form.errors.email" />
                </div>

                <button
                    type="submit"
                    :disabled="form.processing"
                    class="w-full mt-4 bg-indigo-600 text-white font-black py-3 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-75 flex items-center justify-center gap-2"
                >
                    <span>{{ $t('auth_btn_reset', 'Send Recovery Link') }}</span>
                    <svg v-if="!form.processing" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </button>

                <div class="text-center mt-6">
                    <Link :href="route('login')" class="text-sm font-bold text-slate-500 hover:text-indigo-600 transition inline-flex items-center justify-center gap-1.5 group">
                        <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        {{ $t('auth_back_login', 'Back to sign in') }}
                    </Link>
                </div>
            </form>
            
            <div class="mt-10 text-center font-medium">
                 <a :href="route('resources.help')" class="text-[11px] text-slate-500 hover:text-indigo-600 transition-colors">{{ $t('auth_footer_help') }}</a>
            </div>
            
        </div>
    </div>
</template>