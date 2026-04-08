<script setup>
import { computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const props = defineProps({
    plan: {
        type: String,
        required: true
    },
    price: String,
    currency: String,
    features: Array
});

const isArchitect = computed(() => props.plan.toLowerCase().includes('architect'));
const isQuantum = computed(() => props.plan.toLowerCase().includes('quantum'));
const isLegendary = computed(() => props.plan.toLowerCase().includes('lifetime') || props.plan.toLowerCase().includes('legendary'));

const periodLabel = computed(() => {
    if (isLegendary.value) return 'One-Time Payment';
    const priceStr = props.price.toLowerCase();
    if (priceStr.includes('79') || priceStr.includes('109')) return 'per Year';
    return 'per Month';
});

const initiatePayment = async (method) => {
    const routeName = method === 'paypal' ? 'paypal.checkout' : 'payment.checkout';
    
    Swal.fire({
        title: 'Redirecting to Gateway...',
        html: `Securing connection to ${method === 'paypal' ? 'PayPal' : 'Duitku'}...`,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        const response = await axios.post(route(routeName), {
            plan: props.plan.toLowerCase(),
            billing: periodLabel.value.toLowerCase().includes('year') ? 'yearly' : 'monthly'
        });

        if (response.data.paymentUrl) {
            window.location.href = response.data.paymentUrl;
        } else {
            throw new Error('No payment URL received');
        }
    } catch (e) {
        console.error('Checkout API Error:', e.response?.data || e.message);
        Swal.fire({
            icon: 'error',
            title: 'Gateway Error',
            text: e.response?.data?.error || 'Gagal menghubungi server pembayaran. Silakan coba lagi.',
            confirmButtonColor: '#4f46e5'
        });
    }
};
</script>

<template>
    <Head title="Checkout Summary" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
        
        <!-- Top Navigation -->
        <nav class="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
            <Link href="/" class="group flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-200 dark:shadow-none transition-transform group-hover:scale-110">
                    <ApplicationLogo class="w-8 h-8 fill-current" />
                </div>
                <span class="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase transition-colors group-hover:text-indigo-600">OneForMind</span>
            </Link>
            
            <Link :href="route('billing')" class="text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em] flex items-center gap-2 group">
                <OneForMindIcon name="chevron-left" size="14" class="transition-transform group-hover:-translate-x-1" stroke-width="4" />
                Back to Pricing
            </Link>
        </nav>

        <main class="max-w-6xl mx-auto px-6 py-12 md:py-20 lg:py-32">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                
                <!-- Left: Product Value -->
                <div class="space-y-12 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-black text-[10px] mb-6 uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                            🔒 Secure Subscription Checkout
                        </div>
                        <h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                            Upgrade to <br/>
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-400 dark:to-indigo-200">{{ plan }} Experience</span>
                        </h1>
                        <p class="text-lg text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-md">
                            Bergabunglah dengan ribuan achiever lainnya yang telah mengoptimalkan hidup mereka dengan ekosistem kami.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div v-for="feat in features" :key="feat" class="flex gap-4 p-4 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:scale-105 duration-300">
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <OneForMindIcon name="check" size="14" class="text-emerald-500" stroke-width="4" />
                            </div>
                            <span class="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight flex items-center">{{ feat }}</span>
                        </div>
                    </div>

                    <div class="pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        <div class="flex items-center gap-2">
                             <OneForMindIcon name="lock" size="16" class="text-slate-400" />
                             <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Bank-Level Security</span>
                        </div>
                        <div class="flex items-center gap-2">
                             <OneForMindIcon name="shield-check" size="16" class="text-slate-400" />
                             <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Certified Encryption</span>
                        </div>
                    </div>
                </div>

                <!-- Right: Payment Card -->
                <div class="relative animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <!-- Dynamic Glow -->
                    <div class="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/10 blur-[120px] rounded-full scale-150 -z-10"></div>
                    
                    <div class="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-100 dark:shadow-none ring-1 ring-slate-200/50 dark:ring-slate-800">
                        
                        <!-- Selected Summary -->
                        <div class="flex items-center justify-between mb-12 p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                            <div>
                                <h3 class="text-xl font-black text-slate-900 dark:text-white mb-1">Total Due</h3>
                                <p class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{{ periodLabel }}</p>
                            </div>
                            <div class="text-right">
                                <span class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{{ price }}</span>
                            </div>
                        </div>

                        <h2 class="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center">Select Payment</h2>
                        
                        <div class="space-y-4 mb-10">
                            <!-- Duitku -->
                            <button @click="initiatePayment('duitku')" class="w-full group relative overflow-hidden p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-slate-50 transition-all text-left">
                                <div class="flex items-center justify-between relative z-10">
                                    <div class="flex items-center gap-5">
                                        <div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-110">🇮🇩</div>
                                        <div>
                                            <h4 class="font-black text-slate-800 dark:text-white">Duitku Local (IDR)</h4>
                                            <p class="text-[10px] font-bold text-slate-400">QRIS, Virtual Account, & Bank Transfer</p>
                                        </div>
                                    </div>
                                    <OneForMindIcon name="chevron-right" size="18" class="text-slate-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-1" stroke-width="4" />
                                </div>
                            </button>

                            <!-- PayPal -->
                            <button @click="initiatePayment('paypal')" class="w-full group relative overflow-hidden p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-slate-50 transition-all text-left">
                                <div class="flex items-center justify-between relative z-10">
                                    <div class="flex items-center gap-5">
                                        <div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-110">🌍</div>
                                        <div>
                                            <h4 class="font-black text-slate-800 dark:text-white">PayPal / Card (USD)</h4>
                                            <p class="text-[10px] font-bold text-slate-400">International CC & PayPal Wallet</p>
                                        </div>
                                    </div>
                                    <OneForMindIcon name="chevron-right" size="18" class="text-slate-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-1" stroke-width="4" />
                                </div>
                            </button>
                        </div>

                        <div class="text-center space-y-6">
                            <p class="text-[10px] font-bold text-slate-400 italic">
                                Your subscription starts immediately upon successful payment.
                            </p>
                            <div class="flex items-center justify-center gap-4">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" class="h-4 opacity-40 grayscale group-hover:grayscale-0 transition-opacity" />
                                <div class="w-px h-4 bg-slate-200"></div>
                                <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Powered by Stripe & Duitku</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
        
        <!-- Bottom Guard -->
        <footer class="mt-auto py-12 text-center">
            <p class="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.4em]">© 2026 OneForMind - The Infinite Ecosystem</p>
        </footer>
    </div>
</template>

<style scoped>
@keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
