<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm, usePage, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const props = defineProps({
    mustVerifyEmail: { type: Boolean },
    status: { type: String },
});

// 🔥 Reaktif dari backend, kalau sukses upload, gambar otomatis kedip berubah!
const user = computed(() => usePage().props.auth.user);
const avatarInput = ref(null);

const form = useForm({
    name: user.value.name,
    email: user.value.email,
});

const selectNewPhoto = () => {
    avatarInput.value.click();
};

// 🔥 FUNGSI UPLOAD FOTO LANGSUNG KE BACKEND (Tanpa createObjectURL)
const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const photoForm = new FormData();
    photoForm.append('_method', 'patch'); 
    photoForm.append('name', user.value.name); 
    photoForm.append('email', user.value.email); 
    photoForm.append('avatar', file);

    router.post(route('profile.update'), photoForm, {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
            if (avatarInput.value) avatarInput.value.value = null;
        }
    });
};

const submitTextForm = () => {
    form.patch(route('profile.update'), {
        preserveScroll: true,
    });
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-black text-slate-800 uppercase tracking-widest">{{ $t('profile_info_title', 'Informasi Pribadi') }}</h2>
            <p class="mt-1 text-sm text-slate-500 font-medium">
                {{ $t('profile_info_desc', 'Perbarui foto profil, nama, dan alamat email akun Anda.') }}
            </p>
        </header>

        <div class="mt-8 space-y-6">
            
            <div class="flex items-center gap-6 p-5 bg-slate-50 rounded-3xl border border-slate-100">
                <div class="relative group cursor-pointer shrink-0" @click="selectNewPhoto">
                    <img :src="user.avatar_url" alt="Profile" class="w-24 h-24 rounded-full object-cover shadow-md border-4 border-white transition-all duration-300 group-hover:brightness-75 group-hover:scale-105">
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span class="text-white text-2xl drop-shadow-lg">📷</span>
                    </div>
                </div>
                
                <div class="flex-1">
                    <input type="file" ref="avatarInput" @change="handleAvatarUpload" class="hidden" accept="image/jpeg, image/png, image/jpg">
                    <button type="button" @click="selectNewPhoto" class="px-5 py-2.5 bg-white border-2 border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest text-indigo-600 shadow-sm hover:border-indigo-300 hover:bg-indigo-50 transition-all active:scale-95">
                        {{ $t('change_photo', 'Ganti Foto') }}
                    </button>
                    <InputError class="mt-2" :message="$page.props.errors.avatar" />
                    <p class="text-[10px] font-bold text-slate-400 mt-2 leading-relaxed">
                        {{ $t('photo_format_allowed', 'Format yang diizinkan: JPG, JPEG, PNG.') }} <br>
                        {{ $t('photo_max_size', 'Maksimal ukuran file: 2MB.') }}
                    </p>
                </div>
            </div>

            <form @submit.prevent="submitTextForm">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <InputLabel for="name" :value="$t('full_name', 'Nama Lengkap')" class="!text-[10px] !font-black !uppercase !tracking-widest !text-slate-400 mb-2" />
                        <TextInput
                            id="name"
                            type="text"
                            class="mt-1 block w-full !rounded-xl !border-slate-200 focus:!border-indigo-500 focus:!ring-0 font-bold text-slate-700 h-12 px-4"
                            v-model="form.name"
                            required
                            autofocus
                            autocomplete="name"
                        />
                        <InputError class="mt-2" :message="form.errors.name" />
                    </div>

                    <div>
                        <InputLabel for="email" :value="$t('email_address', 'Alamat Email')" class="!text-[10px] !font-black !uppercase !tracking-widest !text-slate-400 mb-2" />
                        <TextInput
                            id="email"
                            type="email"
                            class="mt-1 block w-full !rounded-xl !border-slate-200 focus:!border-indigo-500 focus:!ring-0 font-bold text-slate-700 h-12 px-4"
                            v-model="form.email"
                            required
                            autocomplete="username"
                        />
                        <InputError class="mt-2" :message="form.errors.email" />
                    </div>
                </div>

                <div class="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <PrimaryButton :disabled="form.processing" class="!rounded-xl !py-3.5 !px-8 !bg-indigo-600 hover:!bg-indigo-700 !shadow-lg !shadow-indigo-200 !text-[11px] !font-black !uppercase !tracking-widest transition-all active:scale-95">
                        {{ $t('save_changes', 'Simpan Perubahan') }}
                    </PrimaryButton>

                    <Transition enter-active-class="transition ease-out duration-300 transform" enter-from-class="opacity-0 translate-x-4" leave-active-class="transition ease-in duration-200" leave-to-class="opacity-0">
                        <p v-if="form.recentlySuccessful" class="text-[11px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                            {{ $t('saved', 'Tersimpan') }}
                        </p>
                    </Transition>
                </div>
            </form>
        </div>
    </section>
</template>