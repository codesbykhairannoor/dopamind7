<script setup>
import { usePage } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';

const props = defineProps({
    midtransClientKey: String
});

const user = usePage().props.auth.user;

const checkout = () => {
    fetch(route('payment.checkout'), {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': usePage().props.csrf_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
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
    });
};

onMounted(() => {
    if (!window.snap) {
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', props.midtransClientKey);
        document.head.appendChild(script);
    }
});
</script>

<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-black text-slate-800 uppercase tracking-widest">
                {{ user.is_premium ? 'Premium Status' : 'Upgrade to Premium' }}
            </h2>
            <p class="mt-1 text-sm text-slate-500 font-medium">
                {{ user.is_premium 
                    ? 'Anda telah menikmati akses Premium. Terima kasih atas dukungan Anda!' 
                    : 'Buka semua fitur eksklusif, limit lebih tinggi, dan dukung perkembangan platform ini.' }}
            </p>
        </header>

        <div v-if="user.is_premium" class="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4">
            <div class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-100">
                ✨
            </div>
            <div>
                <p class="text-sm font-black text-emerald-800 uppercase tracking-tight">Pro Plan Aktif</p>
                <p class="text-xs text-emerald-600 font-bold" v-if="user.premium_until">
                    Valid hingga: {{ new Date(user.premium_until).toLocaleDateString() }}
                </p>
            </div>
        </div>

        <div v-else class="p-6 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:border-indigo-400">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-indigo-100">
                    💎
                </div>
                <div>
                    <h3 class="text-xl font-black text-slate-900 tracking-tight">Architect Pro</h3>
                    <p class="text-sm text-indigo-600 font-bold">Hanya Rp 10.000 / Bulan</p>
                </div>
            </div>
            
            <button 
                @click="checkout"
                class="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition transform hover:-translate-y-1 active:scale-95"
            >
                Upgrade Sekarang
            </button>
        </div>
    </section>
</template>
