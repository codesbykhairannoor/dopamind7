<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';

const user = usePage().props.auth.user;

const form = useForm({
    name: user.name,
    email: user.email,
    avatar: null,
});

const avatarPreview = ref(user.avatar_url || (user.avatar_path ? (user.avatar_path.startsWith('http') ? user.avatar_path : `/storage/${user.avatar_path}`) : `https://ui-avatars.com/api/?name=${user.name}&background=random`));

const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        form.avatar = file;
        const reader = new FileReader();
        reader.onload = (e) => avatarPreview.value = e.target.result;
        reader.readAsDataURL(file);
    }
};

const updateProfile = () => {
    form.post(route('profile.update'), {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
            // Success logic if needed
        },
    });
};
</script>

<template>
    <div class="space-y-8">
        <div>
            <h3 class="text-lg font-black text-slate-800 tracking-tight">{{ $t('profile_info_title', 'Informasi Profil') }}</h3>
            <p class="text-xs font-bold text-slate-400 mt-1">{{ $t('profile_info_desc', 'Perbarui nama, email, dan foto profil Anda.') }}</p>
        </div>

        <form @submit.prevent="updateProfile" class="space-y-6">
            <!-- Avatar Upload -->
            <div class="flex flex-col items-center sm:flex-row gap-6 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                <div class="relative group">
                    <img :src="avatarPreview" class="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-md group-hover:opacity-90 transition-opacity" alt="Avatar">
                    <div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" @change="handleAvatarChange">
                    </div>
                </div>
                <div class="flex-grow space-y-1 text-center sm:text-left">
                    <h4 class="font-black text-slate-700 text-sm">{{ $t('profile_avatar_title', 'Foto Profil') }}</h4>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ $t('profile_avatar_format', 'JPG, PNG atau WEBP Max 2MB') }}</p>
                    <button type="button" class="mt-2 text-xs font-black text-indigo-600 hover:text-indigo-700 text-left">{{ $t('profile_avatar_remove', 'Hapus Foto') }}</button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name -->
                <div class="space-y-1.5">
                    <label class="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">{{ $t('profile_label_name', 'Nama Lengkap') }}</label>
                    <input type="text" v-model="form.name" class="w-full px-5 py-4 rounded-2xl border-slate-100 bg-slate-50/30 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" :placeholder="$t('profile_placeholder_name', 'Masukkan nama...')">
                </div>

                <!-- Email -->
                <div class="space-y-1.5">
                    <label class="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">{{ $t('profile_label_email', 'Email') }}</label>
                    <input type="email" v-model="form.email" class="w-full px-5 py-4 rounded-2xl border-slate-100 bg-slate-50/30 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" :placeholder="$t('profile_placeholder_email', 'name@example.com')">
                </div>
            </div>

            <div class="flex justify-end pt-2">
                <button type="submit" :disabled="form.processing" 
                    class="bg-indigo-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-indigo-200 disabled:opacity-50">
                    {{ form.processing ? $t('status_saving', 'Menyimpan...') : $t('profile_btn_save', 'Simpan Perubahan') }}
                </button>
            </div>
        </form>
    </div>
</template>
