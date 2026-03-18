<script setup>
import { usePage } from '@inertiajs/vue3';

const props = defineProps({ midtransClientKey: String });
const user = usePage().props.auth.user;

const checkout = (plan) => {
    import('axios').then(axios => {
        axios.default.post(route('payment.checkout'), { plan }, {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            const data = response.data;
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
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
            <h3 class="text-lg font-black text-slate-800 tracking-tight">{{ $t('billing_title', 'Langganan & Billing') }}</h3>
            <p class="text-xs font-bold text-slate-400 mt-1">{{ $t('billing_desc', 'Pilih paket yang sesuai untuk membuka lebih banyak fitur produktivitas.') }}</p>
        </div>

        <div v-if="user.is_premium" class="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
            <div class="relative z-10">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">✨</div>
                    <span class="text-xs font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">{{ $t('billing_premium_badge', 'Paket Premium') }}</span>
                </div>
                <h4 class="text-2xl font-black mb-2 leading-tight">{{ $t('billing_premium_thanks', 'Terima kasih atas dukungannya!') }}</h4>
                <p class="text-sm font-bold text-indigo-100 opacity-90 max-w-sm mb-6">{{ $t('billing_premium_desc', 'Akun Anda saat ini aktif sebagai anggota Premium. Nikmati akses tanpa batas ke semua fitur produktivitas.') }}</p>
                
                <div class="flex items-center gap-2 text-xs font-black">
                    <span class="opacity-70 italic">{{ $t('billing_valid_until', 'Berlaku sampai') }}:</span>
                    <span class="bg-indigo-500/50 px-3 py-1 rounded-lg">{{ user.premium_until ? new Date(user.premium_until).toLocaleDateString($t('locale', 'id-ID'), { day: 'numeric', month: 'long', year: 'numeric' }) : $t('billing_forever', 'Selamanya') }}</span>
                </div>
            </div>
            
            <!-- Abstract Shapes -->
            <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
            <div class="absolute -left-12 -top-12 w-48 h-48 bg-indigo-400 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            <!-- Free -->
            <div class="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col h-full">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{{ $t('pricing_free_name', 'Explorer') }}</h4>
                <div class="text-2xl font-black text-slate-900 mb-4">Rp 0</div>
                <ul class="space-y-3 mb-6 flex-grow text-xs text-slate-600 font-bold">
                    <li class="flex items-center gap-2"><span class="text-emerald-500">✓</span> 5 Habits Max</li>
                    <li class="flex items-center gap-2"><span class="text-emerald-500">✓</span> Basic Finance</li>
                </ul>
                <button disabled class="w-full py-3 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs">{{ $t('billing_current_plan', 'Paket Saat Ini') }}</button>
            </div>

            <!-- Architect (Pro) -->
            <div class="bg-white p-6 rounded-[2rem] border-2 border-indigo-100 shadow-lg shadow-indigo-50/50 flex flex-col h-full relative">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Populer</div>
                <h4 class="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">{{ $t('pricing_pro_name', 'Architect') }}</h4>
                <div class="text-2xl font-black text-slate-900 leading-none">Rp 25.000</div>
                <div class="text-[10px] text-indigo-500 font-black italic mb-4">Lalu Rp 15rb/bln</div>
                <ul class="space-y-3 mb-6 flex-grow text-xs text-slate-600 font-bold">
                    <li class="flex items-center gap-2"><span class="text-emerald-500">✓</span> Buka Semua Modul</li>
                    <li class="flex items-center gap-2"><span class="text-emerald-500">✓</span> Trial 1 Bulan</li>
                    <li class="flex items-center gap-2"><span class="text-indigo-500">✓</span> Pro Analytics</li>
                </ul>
                <button @click="checkout('architect')" class="w-full py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-bold text-xs shadow-md shadow-indigo-200">Beli Sekarang</button>
            </div>

            <!-- Quantum (AI) -->
            <div class="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-200 shadow-sm flex flex-col h-full relative">
                <h4 class="text-xs font-black text-indigo-700 uppercase tracking-widest mb-2">{{ $t('pricing_ai_name', 'Quantum') }}</h4>
                <div class="text-2xl font-black text-slate-900 leading-none">Rp 49.000</div>
                <div class="text-[10px] text-indigo-500 font-black italic mb-4">/bulan</div>
                <ul class="space-y-3 mb-6 flex-grow text-xs text-slate-700 font-bold">
                    <li class="flex items-center gap-2"><span class="text-indigo-600">🤖</span> AI Chat Assistant</li>
                    <li class="flex items-center gap-2"><span class="text-indigo-600">✓</span> Automated Insights</li>
                </ul>
                <button @click="checkout('quantum')" class="w-full py-3 rounded-xl bg-slate-900 text-white hover:bg-black transition font-bold text-xs shadow-md">Beli Sekarang</button>
            </div>

            <!-- Lifetime -->
            <div class="bg-slate-900 p-6 rounded-[2rem] shadow-xl flex flex-col h-full text-white">
                <h4 class="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">{{ $t('pricing_life_name', 'Mind Master') }}</h4>
                <div class="text-2xl font-black mb-4">Rp 249.000</div>
                <ul class="space-y-3 mb-6 flex-grow text-xs text-slate-300 font-bold">
                    <li class="flex items-center gap-2"><span class="text-indigo-400">★</span> Buka Semua Selamanya</li>
                    <li class="flex items-center gap-2"><span class="text-indigo-400">★</span> Bebas Biaya Bulanan</li>
                    <li class="flex items-center gap-2"><span class="text-indigo-400">★</span> Priority Support</li>
                </ul>
                <button @click="checkout('lifetime')" class="w-full py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 transition font-black text-xs">Beli Lifetime</button>
            </div>
        </div>
    </div>
</template>
