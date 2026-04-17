<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-vue-next';

const page = usePage();
const user = page.props.auth.user;

const form = useForm({
    subject: '',
    message: '',
});

const isSent = ref(false);

const sendSupport = () => {
    form.post(route('settings.help.send'), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            isSent.value = true;
            setTimeout(() => {
                isSent.value = false;
            }, 5000);
        },
    });
};

const supportOptions = [
    { title: 'Technical Support', desc: 'Issues with tools, lag, or bugs.', icon: 'settings' },
    { title: 'Feature Request', desc: 'Suggestions for new additions.', icon: 'goal' },
    { title: 'Billing & Plan', desc: 'Subscription and payment queries.', icon: 'finance' },
];
</script>

<template>
    <div class="space-y-10">
        <!-- Header Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div v-for="opt in supportOptions" :key="opt.title" 
                 class="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all group">
                <div class="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <OneForMindIcon :name="opt.icon" size="20" class="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 class="text-sm font-bold text-slate-800 dark:text-white">{{ opt.title }}</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{{ opt.desc }}</p>
            </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
            <div class="flex items-center gap-3 mb-8">
                <div class="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Mail class="w-6 h-6" />
                </div>
                <div>
                    <h3 class="text-lg font-black text-slate-800 dark:text-white tracking-tight">Direct Support</h3>
                    <p class="text-xs font-bold text-slate-400 dark:text-slate-500">Send a message directly to oneformindapp@gmail.com</p>
                </div>
            </div>

            <form @submit.prevent="sendSupport" class="space-y-6">
                <!-- Subject -->
                <div class="space-y-1.5">
                    <label class="text-xs font-black text-slate-500 dark:text-slate-400 tracking-wide ml-1 uppercase">Subject</label>
                    <input 
                        type="text" 
                        v-model="form.subject" 
                        required
                        class="w-full px-5 py-4 rounded-2xl border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" 
                        placeholder="What can we help you with?"
                    >
                    <div v-if="form.errors.subject" class="text-rose-500 text-[10px] font-bold mt-1 ml-1">{{ form.errors.subject }}</div>
                </div>

                <!-- Message -->
                <div class="space-y-1.5">
                    <label class="text-xs font-black text-slate-500 dark:text-slate-400 tracking-wide ml-1 uppercase">Message</label>
                    <textarea 
                        v-model="form.message" 
                        required
                        rows="5"
                        class="w-full px-5 py-4 rounded-2xl border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none" 
                        placeholder="Describe your issue or feedback in detail..."
                    ></textarea>
                    <div v-if="form.errors.message" class="text-rose-500 text-[10px] font-bold mt-1 ml-1">{{ form.errors.message }}</div>
                </div>

                <div class="flex items-center justify-between gap-4">
                    <transition name="fade">
                        <div v-if="isSent" class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-xl">
                            <CheckCircle2 class="w-4 h-4" />
                            Message sent successfully!
                        </div>
                    </transition>

                    <div class="flex-grow"></div>

                    <button 
                        type="submit" 
                        :disabled="form.processing"
                        class="group flex items-center gap-2 bg-indigo-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-50"
                    >
                        <span>{{ form.processing ? 'Sending...' : 'Send Message' }}</span>
                        <Send v-if="!form.processing" class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </form>
        </div>

        <!-- FAQ CTA -->
        <div class="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white relative overflow-hidden shadow-xl">
            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="text-center md:text-left">
                    <h3 class="text-xl font-black">Need a quick answer?</h3>
                    <p class="text-indigo-100 text-sm mt-1 font-medium">Check our documentation and guide for common questions.</p>
                </div>
                <a :href="route('resources.guide')" class="px-6 py-3 bg-white text-indigo-600 rounded-xl font-black text-sm hover:bg-indigo-50 transition-all active:scale-95 whitespace-nowrap shadow-lg">
                    View Guide
                </a>
            </div>
            <!-- Decorative circle -->
            <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
