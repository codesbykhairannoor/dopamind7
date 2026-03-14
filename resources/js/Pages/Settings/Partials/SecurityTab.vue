<script setup>
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({ hasPassword: Boolean });

const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const deleteForm = useForm({
    password: '',
});

const showDeleteConfirm = ref(false);

const updatePassword = () => {
    passwordForm.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => passwordForm.reset(),
    });
};

const deleteAccount = () => {
    deleteForm.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => showDeleteConfirm.value = false,
    });
};
</script>

<template>
    <div class="space-y-12">
        <!-- Change Password -->
        <section class="space-y-6">
            <div>
                <h3 class="text-lg font-black text-slate-800 tracking-tight">{{ $t('security_title', 'Keamanan Akun') }}</h3>
                <p class="text-xs font-bold text-slate-400 mt-1">{{ $t('security_desc', 'Pastikan akun Anda tetap aman dengan password yang kuat.') }}</p>
            </div>

            <form @submit.prevent="updatePassword" class="space-y-5">
                <div v-if="hasPassword" class="space-y-1.5">
                    <label class="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">{{ $t('security_label_current_password', 'Password Saat Ini') }}</label>
                    <input type="password" v-model="passwordForm.current_password" class="w-full px-5 py-4 rounded-2xl border-slate-100 bg-slate-50/30 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all">
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="space-y-1.5">
                        <label class="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">{{ $t('security_label_new_password', 'Password Baru') }}</label>
                        <input type="password" v-model="passwordForm.password" class="w-full px-5 py-4 rounded-2xl border-slate-100 bg-slate-50/30 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all">
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">{{ $t('security_label_confirm_password', 'Konfirmasi Password') }}</label>
                        <input type="password" v-model="passwordForm.password_confirmation" class="w-full px-5 py-4 rounded-2xl border-slate-100 bg-slate-50/30 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all">
                    </div>
                </div>

                <div class="flex justify-end">
                    <button type="submit" :disabled="passwordForm.processing" class="bg-indigo-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 disabled:opacity-50">
                        {{ $t('security_btn_update', 'Perbarui Password') }}
                    </button>
                </div>
            </form>
        </section>

        <!-- Danger Zone -->
        <section class="pt-8 border-t border-slate-100 space-y-6">
            <div class="p-6 rounded-[2rem] bg-rose-50 border border-rose-100">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-white text-rose-600 flex items-center justify-center text-xl shadow-sm">⚠️</div>
                    <div>
                        <h4 class="font-black text-rose-900 text-sm italic">{{ $t('security_danger_zone', 'Zona Berbahaya') }}</h4>
                        <p class="text-xs font-bold text-rose-600/70">{{ $t('security_danger_desc', 'Hapus akun Anda secara permanen. Data tidak bisa dikembalikan.') }}</p>
                    </div>
                </div>

                <button @click="showDeleteConfirm = true" class="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-rose-200 text-rose-600 font-black text-xs hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all italic active:scale-95">
                    {{ $t('security_btn_delete_account', 'Hapus Seluruh Data Akun') }}
                </button>
            </div>
        </section>

        <!-- Delete Confirm Modal (Simple version for tab) -->
        <div v-if="showDeleteConfirm" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300">
                <h3 class="text-xl font-black text-slate-800 mb-2">{{ $t('security_confirm_delete_title', 'Konfirmasi Penghapusan') }}</h3>
                <p class="text-xs font-bold text-slate-500 mb-6 leading-relaxed">{{ $t('security_confirm_delete_desc', 'Masukkan password Anda untuk mengonfirmasi bahwa Anda benar-benar ingin menghapus akun Oneformind Anda.') }}</p>
                
                <input type="password" v-model="deleteForm.password" class="w-full px-5 py-4 rounded-2xl border-slate-100 bg-slate-50/30 text-slate-700 font-bold mb-6 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none" :placeholder="$t('security_placeholder_password', 'Password Anda...')">

                <div class="flex gap-4">
                    <button @click="showDeleteConfirm = false" class="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-600 font-black text-sm hover:bg-slate-200 transition-all">{{ $t('btn_cancel', 'Batal') }}</button>
                    <button @click="deleteAccount" :disabled="deleteForm.processing" class="flex-1 px-6 py-4 rounded-2xl bg-rose-600 text-white font-black text-sm hover:bg-rose-700 transition-all shadow-lg shadow-rose-200">{{ $t('security_btn_delete_account', 'Hapus Akun') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
