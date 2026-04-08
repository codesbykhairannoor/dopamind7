<script setup>
import { computed } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
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

const isQuantum = computed(() => props.plan.toLowerCase() === 'quantum');
const isLegendary = computed(() => props.plan.toLowerCase() === 'lifetime');

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
            plan: props.plan.toLowerCase()
        });

        if (response.data.paymentUrl) {
            window.location.href = response.data.paymentUrl;
        } else {
            throw new Error('No payment URL received');
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Gateway Error',
            text: 'Gagal menghubungi server pembayaran. Silakan coba lagi.',
            confirmButtonColor: '#4f46e5'
        });
    }
};
</script>

<template>
    <Head title="Checkout Summary" />

    <AuthenticatedLayout>
        <div class="min-h-screen py-12 px-4 bg-slate-50/30 dark:bg-slate-950/20">
            <div class="max-w-4xl mx-auto">
                
                <!-- Back Button -->
                <button @click="window.history.back()" class="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors mb-8 uppercase tracking-widest">
                    <OneForMindIcon name="chevron-left" size="14" stroke-width="4" />
                    Back to Selection
                </button>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    <!-- Left: Order Summary -->
                    <div class="space-y-6">
                        <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                            <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Order Summary</h2>
                            
                            <div class="flex items-center gap-4 mb-8">
                                <div class="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none">
                                    <OneForMindIcon :name="isQuantum || isLegendary ? 'sparkles' : 'shield-check'" size="32" />
                                </div>
                                <div class="min-w-0">
                                    <h3 class="text-2xl font-black text-slate-900 dark:text-white truncate">OneForMind {{ plan }}</h3>
                                    <p class="text-sm font-bold text-indigo-600 dark:text-indigo-400 capitalize">{{ price }} / {{ isLegendary ? 'Lifetime' : 'Yearly' }}</p>
                                </div>
                            </div>

                            <div class="space-y-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                                <div v-for="feat in features" :key="feat" class="flex gap-3">
                                    <OneForMindIcon name="check" size="14" class="text-emerald-500 shrink-0 mt-0.5" stroke-width="4" />
                                    <span class="text-xs font-bold text-slate-600 dark:text-slate-400">{{ feat }}</span>
                                </div>
                            </div>

                            <div class="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                                <div class="flex justify-between items-center text-slate-800 dark:text-white">
                                    <span class="text-sm font-black">Total Amount</span>
                                    <span class="text-xl font-black tracking-tight">{{ price }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Trust Badge -->
                        <div class="flex items-center justify-center gap-6 opacity-40 grayscale">
                            <OneForMindIcon name="lock" size="24" />
                            <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Bank-Level Security & SSL Encryption</span>
                        </div>
                    </div>

                    <!-- Right: Payment Methods -->
                    <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Select Payment Method</h2>
                        
                        <div class="space-y-4">
                            <!-- Duitku -->
                            <button @click="initiatePayment('duitku')" class="w-full group relative overflow-hidden p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 transition-all text-left">
                                <div class="flex items-center justify-between relative z-10">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl">🇮🇩</div>
                                        <div>
                                            <h4 class="font-black text-slate-800 dark:text-white">Duitku (IDR)</h4>
                                            <p class="text-[10px] font-bold text-slate-400">QRIS, Virtual Account, & Bank Transfer</p>
                                        </div>
                                    </div>
                                    <OneForMindIcon name="chevron-right" size="16" class="text-slate-300 group-hover:text-indigo-600 transition-colors" stroke-width="4" />
                                </div>
                            </button>

                            <!-- PayPal -->
                            <button @click="initiatePayment('paypal')" class="w-full group relative overflow-hidden p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 transition-all text-left">
                                <div class="flex items-center justify-between relative z-10">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl">🌍</div>
                                        <div>
                                            <h4 class="font-black text-slate-800 dark:text-white">PayPal / Card (USD)</h4>
                                            <p class="text-[10px] font-bold text-slate-400">International Credit Card & PayPal Wallet</p>
                                        </div>
                                    </div>
                                    <OneForMindIcon name="chevron-right" size="16" class="text-slate-300 group-hover:text-indigo-600 transition-colors" stroke-width="4" />
                                </div>
                            </button>
                        </div>

                        <div class="mt-8 text-center text-[10px] font-medium text-slate-400 leading-relaxed italic">
                            By clicking a payment method, you will be securely redirected to our payment partner. Your subscription will be active immediately after successful payment.
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
