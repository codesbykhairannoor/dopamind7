<script setup>
import { usePage } from '@inertiajs/vue3';

const props = defineProps({ midtransClientKey: String });
const user = usePage().props.auth.user;

const checkout = () => {
    import('axios').then(axios => {
        axios.default.post(route('payment.checkout'), {}, {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            const data = response.data;
            if (data.snap_token) {
                window.snap.pay(data.snap_token, {
                    onSuccess: function(result) {
                        window.location.reload();
                    },
                    onPending: function(result) {
                        alert('Payment pending.');
                    },
                    onError: function(result) {
                        alert('Payment failed.');
                    }
                });
            } else {
                alert('Checkout error: ' + (data.error || 'Unknown error'));
            }
        })
        .catch(error => {
            console.error(error);
            alert('Checkout error: ' + (error.response?.data?.error || error.message || 'Unknown error'));
        });
    });
};
</script>

<template>
    <div class="space-y-8">
        <div>
            <h3 class="text-lg font-black text-slate-800 tracking-tight">Langganan & Billing</h3>
            <p class="text-xs font-bold text-slate-400 mt-1">Kelola paket langganan dan fitur premium Anda.</p>
        </div>

        <div v-if="user.is_premium" class="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
            <div class="relative z-10">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">✨</div>
                    <span class="text-xs font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">Paket Premium</span>
                </div>
                <h4 class="text-2xl font-black mb-2 leading-tight">Terima kasih atas dukungannya!</h4>
                <p class="text-sm font-bold text-indigo-100 opacity-90 max-w-sm mb-6">Akun Anda saat ini aktif sebagai anggota Premium. Nikmati akses tanpa batas ke semua fitur produktivitas.</p>
                
                <div class="flex items-center gap-2 text-xs font-black">
                    <span class="opacity-70 italic">Berlaku sampai:</span>
                    <span class="bg-indigo-500/50 px-3 py-1 rounded-lg">{{ user.premium_until ? new Date(user.premium_until).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Selamanya' }}</span>
                </div>
            </div>
            
            <!-- Abstract Shapes -->
            <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
            <div class="absolute -left-12 -top-12 w-48 h-48 bg-indigo-400 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div v-else class="grid grid-cols-1 gap-6">
            <div class="bg-white rounded-[2.5rem] border-2 border-indigo-100 p-8 shadow-sm hover:shadow-md transition-all">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <span class="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">Sekali Bayar</span>
                            <h4 class="text-2xl font-black text-slate-800 tracking-tight italic">Premium Oneformind</h4>
                        </div>
                        <p class="text-sm font-bold text-slate-400">Upgrade ke level produktivitas baru dengan fitur eksklusif.</p>
                    </div>
                    <div class="text-left md:text-right">
                        <span class="text-xs font-bold text-slate-400">Hanya</span>
                        <div class="text-3xl font-black text-indigo-600">Rp 10.000 <span class="text-sm text-slate-400">/ selamanya</span></div>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div v-for="feature in [
                        'Goal Tracker tanpa batas', 
                        'Job Tracker Advanced', 
                        'Data Analytics & Statistik', 
                        'Cloud Sync Otomatis', 
                        'Support Prioritas',
                        'Tanpa Iklan / Sponsor'
                    ]" :key="feature" class="flex items-center gap-3">
                        <div class="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span class="text-xs font-bold text-slate-600 italic">{{ feature }}</span>
                    </div>
                </div>

                <button @click="checkout" class="w-full bg-indigo-600 hover:bg-slate-900 text-white py-5 rounded-3xl font-black text-sm tracking-tight transition-all active:scale-95 shadow-xl shadow-indigo-100 flex items-center justify-center gap-3">
                    🚀 Upgrade Sekarang
                </button>
            </div>
        </div>
    </div>
</template>
