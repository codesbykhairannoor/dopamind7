<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value.focus();
            }
            if (form.errors.current_password) {
                form.reset('current_password');
                currentPasswordInput.value.focus();
            }
        },
    });
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                🔒 {{ $t('password_security_title', 'Keamanan Sandi') }}
            </h2>
            <p class="mt-1 text-sm text-slate-500 font-medium">
                {{ $t('password_security_desc', 'Pastikan akun Anda menggunakan kata sandi acak yang panjang agar tetap aman.') }}
            </p>
        </header>

        <form @submit.prevent="updatePassword" class="mt-8 space-y-6">
            <div>
                <InputLabel for="current_password" :value="$t('current_password', 'Sandi Saat Ini')" class="!text-[10px] !font-black !uppercase !tracking-widest !text-slate-400 mb-2" />
                <TextInput
                    id="current_password"
                    ref="currentPasswordInput"
                    v-model="form.current_password"
                    type="password"
                    class="mt-1 block w-full !rounded-xl !border-slate-200 focus:!border-indigo-500 focus:!ring-0 font-bold text-slate-700 h-12 px-4"
                    autocomplete="current-password"
                />
                <InputError :message="form.errors.current_password" class="mt-2" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <InputLabel for="password" :value="$t('new_password', 'Sandi Baru')" class="!text-[10px] !font-black !uppercase !tracking-widest !text-slate-400 mb-2" />
                    <TextInput
                        id="password"
                        ref="passwordInput"
                        v-model="form.password"
                        type="password"
                        class="mt-1 block w-full !rounded-xl !border-slate-200 focus:!border-indigo-500 focus:!ring-0 font-bold text-slate-700 h-12 px-4"
                        autocomplete="new-password"
                    />
                    <InputError :message="form.errors.password" class="mt-2" />
                </div>

                <div>
                    <InputLabel for="password_confirmation" :value="$t('confirm_new_password', 'Konfirmasi Sandi Baru')" class="!text-[10px] !font-black !uppercase !tracking-widest !text-slate-400 mb-2" />
                    <TextInput
                        id="password_confirmation"
                        v-model="form.password_confirmation"
                        type="password"
                        class="mt-1 block w-full !rounded-xl !border-slate-200 focus:!border-indigo-500 focus:!ring-0 font-bold text-slate-700 h-12 px-4"
                        autocomplete="new-password"
                    />
                    <InputError :message="form.errors.password_confirmation" class="mt-2" />
                </div>
            </div>

            <div class="flex items-center gap-4 pt-4">
                <PrimaryButton :disabled="form.processing" class="!rounded-xl !py-3.5 !px-8 !bg-slate-800 hover:!bg-slate-900 !shadow-lg !shadow-slate-200 !text-[11px] !font-black !uppercase !tracking-widest transition-all active:scale-95">
                    {{ $t('update_password', 'Perbarui Sandi') }}
                </PrimaryButton>

                <Transition enter-active-class="transition ease-out duration-300 transform" enter-from-class="opacity-0 translate-x-4" leave-active-class="transition ease-in duration-200" leave-to-class="opacity-0">
                    <p v-if="form.recentlySuccessful" class="text-[11px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        {{ $t('password_updated', 'Sandi Berubah') }}
                    </p>
                </Transition>
            </div>
        </form>
    </section>
</template>