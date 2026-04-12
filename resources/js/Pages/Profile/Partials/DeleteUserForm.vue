<script setup>
import DangerButton from '@/Components/DangerButton.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import Modal from '@/Components/Modal.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';
import { nextTick, ref } from 'vue';

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
    password: '',
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;
    nextTick(() => passwordInput.value.focus());
};

const deleteUser = () => {
    form.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;
    form.reset();
};
</script>

<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-black text-rose-600 dark:text-rose-400 tracking-tight flex items-center gap-2 transition-colors duration-500">
                ⚠️ {{ $t('delete_account_title', 'Hapus Akun') }}
            </h2>
            <p class="mt-1 text-sm text-rose-500/80 dark:text-rose-400/80 font-medium transition-colors duration-500">
                {{ $t('delete_account_desc', 'Setelah akun Anda dihapus, semua data dan sumber daya yang terkait akan dihapus secara permanen. Pastikan Anda telah mengunduh data apa pun yang ingin Anda simpan.') }}
            </p>
        </header>

        <DangerButton @click="confirmUserDeletion" class="!rounded-xl !py-3.5 !px-8 !bg-rose-500 hover:!bg-rose-600 !shadow-lg !shadow-rose-200 dark:!shadow-none !text-[11px] !font-black !tracking-wide transition-all active:scale-95 transition-colors duration-500">
            {{ $t('delete_account_btn', 'Hapus Akun Permanen') }}
        </DangerButton>

        <Modal :show="confirmingUserDeletion" @close="closeModal" maxWidth="md">
            <div class="p-8 bg-white dark:bg-slate-900 rounded-[2rem] transition-colors duration-500">
                <div class="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-3xl mb-6 mx-auto transition-colors duration-500">
                    🚨
                </div>
                
                <h2 class="text-xl font-black text-slate-800 dark:text-slate-100 text-center mb-2 leading-tight transition-colors duration-500">
                    {{ $t('delete_account_confirm_title', 'Apakah Anda yakin ingin menghapus akun Anda?') }}
                </h2>
                <p class="text-sm text-slate-500 dark:text-slate-400 text-center mb-6 font-medium transition-colors duration-500">
                    {{ $t('delete_account_confirm_desc', 'Tindakan ini tidak dapat dibatalkan. Masukkan sandi Anda untuk mengonfirmasi.') }}
                </p>

                <div class="mt-6">
                    <InputLabel for="password" :value="$t('your_password', 'Sandi Anda')" class="sr-only" />
                    <TextInput
                        id="password"
                        ref="passwordInput"
                        v-model="form.password"
                        type="password"
                        class="mt-1 block w-full !rounded-xl !border-slate-200 dark:!border-slate-800 focus:!border-rose-500 focus:!ring-0 font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 h-14 px-4 text-center transition-colors duration-500"
                        :placeholder="$t('enter_password_placeholder', 'Masukkan sandi...')"
                        @keyup.enter="deleteUser"
                    />
                    <InputError :message="form.errors.password" class="mt-2 text-center" />
                </div>

                <div class="mt-6 flex gap-3">
                    <SecondaryButton @click="closeModal" class="flex-1 !py-3.5 !rounded-xl !border-2 !border-slate-200 dark:!border-slate-700 !text-slate-500 dark:!text-slate-400 hover:!bg-slate-50 dark:hover:!bg-slate-800 hover:!text-slate-700 dark:hover:!text-slate-200 justify-center !text-[11px] !font-black !tracking-wide transition-colors duration-500">
                        {{ $t('cancel', 'Batal') }}
                    </SecondaryButton>

                    <DangerButton class="flex-1 justify-center !rounded-xl !py-3.5 !bg-rose-600 hover:!bg-rose-700 !text-[11px] !font-black !tracking-wide shadow-lg shadow-rose-200 dark:shadow-none transition-colors duration-500" :class="{ 'opacity-25': form.processing }" :disabled="form.processing" @click="deleteUser">
                        {{ $t('yes_delete', 'Ya, Hapus') }}
                    </DangerButton>
                </div>
            </div>
        </Modal>
    </section>
</template>