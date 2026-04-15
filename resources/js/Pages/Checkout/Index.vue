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

const displayPrice = computed(() => {
    if (!periodLabel.value.toLowerCase().includes('year')) return props.price;
    
    // Extract numbers from "Rp 79.000"
    const numericValue = parseInt(props.price.replace(/[^\d]/g, ''));
    if (isNaN(numericValue)) return props.price;
    
    const total = numericValue * 12;
    
    // Format back to "Rp XXX.XXX"
    return 'Rp ' + total.toLocaleString('id-ID');
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

        if (response.data.reference && typeof window.checkout !== 'undefined') {
            Swal.close();
            // Trigger Duitku POP
            window.checkout.process(response.data.reference, {
                successEvent: function(result){
                    Swal.fire('Success', 'Payment processed successfully!', 'success');
                    window.location.href = route('payment.finish') + '?resultCode=00';
                },
                pendingEvent: function(result){
                    Swal.fire('Pending', 'Waiting for your payment...', 'info');
                    window.location.href = route('payment.finish') + '?resultCode=01';
                },
                errorEvent: function(result){
                    Swal.fire('Error', 'Payment failed: ' + (result.statusMessage || 'Unknown error'), 'error');
                    window.location.href = route('payment.finish') + '?resultCode=02';
                },
                closeEvent: function(result){
                    console.log('Customer closed the popup without finishing the payment');
                    window.location.href = route('payment.finish') + '?resultCode=02';
                }
            });
        } else if (response.data.paymentUrl) {
            window.location.href = response.data.paymentUrl;
        } else {
            throw new Error('No payment URL received');
        }
    } catch (e) {
        console.error('Checkout API Error:', e.response?.data || e.message);
        Swal.fire({
            icon: 'error',
            title: 'Gateway Error',
            text: e.response?.data?.error || (e.response?.data ? 'Error: ' + JSON.stringify(e.response.data) : 'Gagal menghubungi server pembayaran. Silakan coba lagi.'),
            confirmButtonColor: '#4f46e5'
        });
    }
};
</script>

<template>
    <Head title="Checkout Summary" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
        
        <!-- Top Navigation -->
        <nav class="w-full px-6 py-10 flex items-center justify-between relative z-50">
            <div><!-- Brand removed as requested --></div>

            <Link :href="route('billing')" class="text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em] flex items-center gap-2 group">
                <OneForMindIcon name="chevron-left" size="14" class="transition-transform group-hover:-translate-x-1" stroke-width="4" />
                Back to Pricing
            </Link>
        </nav>

        <!-- Immersive Background Orbs -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full"></div>
            <div class="absolute top-[40%] -right-[10%] w-[30%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full"></div>
            <div class="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] bg-indigo-500/5 blur-[120px] rounded-full"></div>
        </div>

        <main class="w-full px-6 py-6 md:py-10 relative z-10">
            <div class="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                
                <!-- Left: Product Value -->
                <div class="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-black text-[10px] mb-4 uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                            🔒 Secure Subscription Checkout
                        </div>
                        <h1 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-[1.1] tracking-tighter">
                            Upgrade to <br/>
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-400 dark:to-indigo-200">{{ plan }}</span>
                        </h1>
                        <p class="text-base text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-md">
                            Bergabunglah dengan ribuan achiever lainnya yang telah mengoptimalkan hidup mereka dengan ekosistem kami.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div v-for="feat in features" :key="feat" class="flex gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:scale-105 duration-300">
                            <div class="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <OneForMindIcon name="check" size="12" class="text-emerald-500" stroke-width="4" />
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
                    
                    <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-100 dark:shadow-none ring-1 ring-slate-200/50 dark:ring-slate-800">
                        
                        <!-- Selected Summary -->
                        <div class="flex items-center justify-between mb-8 p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                            <div>
                                <h3 class="text-lg font-black text-slate-900 dark:text-white mb-1">Total Due</h3>
                                <p class="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{{ periodLabel }}</p>
                            </div>
                            <div class="text-right">
                                <span class="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{{ displayPrice }}</span>
                            </div>
                        </div>

                        <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 text-center">Select Payment</h2>
                        
                        <div class="space-y-4 mb-8">
                            <!-- Duitku -->
                            <button @click="initiatePayment('duitku')" class="w-full group relative overflow-hidden p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-white transition-all text-left shadow-sm">
                                <div class="flex items-center justify-between relative z-10">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110">🇮🇩</div>
                                        <div>
                                            <h4 class="font-black text-sm text-slate-800 dark:text-white">Duitku Local (IDR)</h4>
                                            <p class="text-[9px] font-bold text-slate-400">QRIS, Virtual Account, & Bank Transfer</p>
                                        </div>
                                    </div>
                                    <OneForMindIcon name="chevron-right" size="16" class="text-slate-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-1" stroke-width="4" />
                                </div>
                            </button>

                            <!-- PayPal -->
                            <button @click="initiatePayment('paypal')" class="w-full group relative overflow-hidden p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-white transition-all text-left shadow-sm">
                                <div class="flex items-center justify-between relative z-10">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110">🌍</div>
                                        <div>
                                            <h4 class="font-black text-sm text-slate-800 dark:text-white">PayPal / Card (USD)</h4>
                                            <p class="text-[9px] font-bold text-slate-400">International CC & PayPal Wallet</p>
                                        </div>
                                    </div>
                                    <OneForMindIcon name="chevron-right" size="16" class="text-slate-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-1" stroke-width="4" />
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
