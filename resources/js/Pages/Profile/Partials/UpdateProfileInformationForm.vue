<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const props = defineProps({
    mustVerifyEmail: { type: Boolean },
    status: { type: String },
});

const user = computed(() => usePage().props.auth.user);
const avatarInput = ref(null);
const photoPreview = ref(null);

// Form Utama
const form = useForm({
    _method: 'patch',
    name: user.value.name,
    email: user.value.email,
    avatar: null,
});

// ==========================================
// 🔥 CROPPER LOGIC (PREVIEW & DRAG GAMBAR)
// ==========================================
const showCropper = ref(false);
const tempImageUrl = ref(null);
const cropImg = ref(null);
const imgRatio = ref(1);

// State untuk posisi & zoom
const zoom = ref(1);
const panX = ref(0);
const panY = ref(0);

// State untuk drag
const isDragging = ref(false);
const startPoint = ref({ x: 0, y: 0 });

const selectNewPhoto = () => {
    avatarInput.value.click();
};

const handleAvatarSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset state & Tampilkan modal crop
    zoom.value = 1;
    panX.value = 0;
    panY.value = 0;
    tempImageUrl.value = URL.createObjectURL(file);
    showCropper.value = true;
};

const onImgLoad = (e) => {
    imgRatio.value = e.target.naturalWidth / e.target.naturalHeight;
};

// Logika Geser (Mouse & Touch)
const startDrag = (e) => {
    isDragging.value = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startPoint.value = { x: clientX - panX.value, y: clientY - panY.value };
};

const onDrag = (e) => {
    if (!isDragging.value) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    panX.value = clientX - startPoint.value.x;
    panY.value = clientY - startPoint.value.y;
};

const stopDrag = () => {
    isDragging.value = false;
};

const cancelCrop = () => {
    showCropper.value = false;
    tempImageUrl.value = null;
    if (avatarInput.value) avatarInput.value.value = null;
};

// Terapkan Crop via Canvas lalu Upload
const applyCropAndUpload = () => {
    const canvas = document.createElement('canvas');
    const FINAL_SIZE = 256; // Ukuran foto HD yang akan disimpan
    canvas.width = FINAL_SIZE;
    canvas.height = FINAL_SIZE;
    const ctx = canvas.getContext('2d');

    const img = cropImg.value;
    if (!img) return;

    const cSize = 192; // Ukuran container UI (w-48 = 192px)
    let renderWidth, renderHeight;

    if (imgRatio.value > 1) {
        renderHeight = cSize;
        renderWidth = cSize * imgRatio.value;
    } else {
        renderWidth = cSize;
        renderHeight = cSize / imgRatio.value;
    }

    const scaleRatio = FINAL_SIZE / cSize;
    ctx.save();
    ctx.scale(scaleRatio, scaleRatio);
    ctx.translate(cSize / 2, cSize / 2); // Ke tengah
    ctx.scale(zoom.value, zoom.value);
    ctx.translate(panX.value, panY.value); // Terapkan pergeseran dari user

    // Gambar di tengah canvas
    ctx.drawImage(img, -renderWidth / 2, -renderHeight / 2, renderWidth, renderHeight);
    ctx.restore();

    // Export Canvas menjadi file asli (JPEG)
    canvas.toBlob((blob) => {
        const croppedFile = new File([blob], "avatar.jpg", { type: "image/jpeg", lastModified: Date.now() });
        
        // Tutup Modal & Update Preview Instan
        showCropper.value = false;
        photoPreview.value = URL.createObjectURL(blob);

        // Upload ke Backend
        form.avatar = croppedFile;
        form.post(route('profile.update'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                if (avatarInput.value) avatarInput.value.value = null;
                form.avatar = null;
            }
        });
    }, 'image/jpeg', 0.95);
};
// ==========================================

const submitTextForm = () => {
    form.post(route('profile.update'), {
        preserveScroll: true,
        forceFormData: true,
    });
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-black text-slate-800 dark:text-white uppercase tracking-widest transition-colors duration-500">{{ $t('profile_info_title', 'Informasi Pribadi') }}</h2>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors duration-500">
                {{ $t('profile_info_desc', 'Perbarui foto profil, nama, dan alamat email akun Anda.') }}
            </p>
        </header>

        <div class="mt-8 space-y-6">
            
            <div class="flex items-center gap-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 transition-colors duration-500">
                <div class="relative group cursor-pointer shrink-0" @click="selectNewPhoto">
                    <img :src="photoPreview || user.avatar_url" alt="Profile" class="w-24 h-24 rounded-full object-cover shadow-md dark:shadow-none border-4 border-white dark:border-slate-800 transition-all duration-300 group-hover:brightness-75 group-hover:scale-105">
                    
                    <div v-if="form.processing && form.avatar" class="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                        <svg class="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </div>
                    
                    <div v-else class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span class="text-white text-2xl drop-shadow-lg">📷</span>
                    </div>
                </div>
                
                <div class="flex-1">
                    <input type="file" ref="avatarInput" @change="handleAvatarSelect" class="hidden" accept="image/jpeg, image/png, image/jpg, image/webp">
                    <button type="button" @click="selectNewPhoto" :disabled="form.processing" class="px-5 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 shadow-sm dark:shadow-none hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all active:scale-95 disabled:opacity-50 transition-colors duration-500">
                        {{ $t('change_photo', 'Ganti Foto') }}
                    </button>
                    <InputError class="mt-2" :message="form.errors.avatar" />
                    <p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 leading-relaxed transition-colors duration-500">
                        {{ $t('photo_adjust_instruction', 'Pilih foto, lalu Anda dapat menyesuaikan posisi gambar sebelum diunggah.') }} <br>
                        {{ $t('photo_format_allowed', 'Format yang diizinkan: JPG, JPEG, PNG.') }} <br>
                        {{ $t('photo_max_size', 'Maksimal ukuran file: 2MB.') }}
                    </p>
                </div>
            </div>

            <form @submit.prevent="submitTextForm">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <InputLabel for="name" :value="$t('full_name', 'Nama Lengkap')" class="!text-[10px] !font-black !uppercase !tracking-widest !text-slate-400 dark:!text-slate-500 mb-2 transition-colors duration-500" />
                        <TextInput id="name" type="text" class="mt-1 block w-full !rounded-xl !border-slate-200 dark:!border-slate-800 focus:!border-indigo-500 focus:!ring-0 font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 h-12 px-4 transition-colors duration-500" v-model="form.name" required autofocus autocomplete="name" />
                        <InputError class="mt-2" :message="form.errors.name" />
                    </div>

                    <div>
                        <InputLabel for="email" :value="$t('email_address', 'Alamat Email')" class="!text-[10px] !font-black !uppercase !tracking-widest !text-slate-400 dark:!text-slate-500 mb-2 transition-colors duration-500" />
                        <TextInput id="email" type="email" class="mt-1 block w-full !rounded-xl !border-slate-200 dark:!border-slate-800 focus:!border-indigo-500 focus:!ring-0 font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 h-12 px-4 transition-colors duration-500" v-model="form.email" required autocomplete="username" />
                        <InputError class="mt-2" :message="form.errors.email" />
                    </div>
                </div>

                <div class="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
                    <PrimaryButton :disabled="form.processing" class="!rounded-xl !py-3.5 !px-8 !bg-indigo-600 hover:!bg-indigo-700 !shadow-lg !shadow-indigo-200 dark:!shadow-none !text-[11px] !font-black !uppercase !tracking-widest transition-all active:scale-95 transition-colors duration-500">
                        {{ $t('save_changes', 'Simpan Perubahan') }}
                    </PrimaryButton>

                    <Transition enter-active-class="transition ease-out duration-300 transform" enter-from-class="opacity-0 translate-x-4" leave-active-class="transition ease-in duration-200" leave-to-class="opacity-0">
                        <p v-if="form.recentlySuccessful" class="text-[11px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-500/20 transition-colors duration-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                            {{ $t('saved', 'Tersimpan') }}
                        </p>
                    </Transition>
                </div>
            </form>
        </div>

        <Teleport to="body">
            <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                <div v-if="showCropper" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md" @click="cancelCrop"></div>
                    <div class="relative bg-white dark:bg-slate-900 p-6 rounded-[2rem] w-full max-w-sm shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center transition-colors duration-500">
                        <h3 class="font-black text-slate-800 dark:text-white mb-6 uppercase tracking-widest text-sm transition-colors duration-500">{{ $t('adjust_photo_title', 'Sesuaikan Foto') }}</h3>
                        
                        <div 
                            class="relative w-48 h-48 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden cursor-move border-4 border-dashed border-indigo-200 dark:border-indigo-500/30 shadow-inner transition-colors duration-500"
                            @mousedown="startDrag" @touchstart="startDrag"
                            @mousemove="onDrag" @touchmove="onDrag"
                            @mouseup="stopDrag" @mouseleave="stopDrag" @touchend="stopDrag"
                        >
                            <img 
                                ref="cropImg"
                                :src="tempImageUrl" 
                                @load="onImgLoad"
                                class="absolute max-w-none pointer-events-none select-none"
                                :style="{
                                    transform: `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px)) scale(${zoom})`,
                                    top: '50%', left: '50%',
                                    width: imgRatio > 1 ? 'auto' : '100%',
                                    height: imgRatio <= 1 ? 'auto' : '100%'
                                }"
                            >
                        </div>
                        
                        <p class="mt-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-500">{{ $t('pan_instruction', 'Gunakan Mouse/Sentuhan Untuk Menggeser') }}</p>

                        <div class="w-full mt-6 flex items-center gap-3">
                            <span class="text-sm text-slate-400 dark:text-slate-500 transition-colors duration-500">🔍</span>
                            <input type="range" v-model="zoom" min="0.5" max="2.5" step="0.05" class="w-full accent-indigo-600 dark:accent-indigo-400">
                        </div>

                        <div class="flex gap-3 mt-8 w-full">
                            <button @click="cancelCrop" type="button" class="flex-1 py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all transition-colors duration-500">
                                {{ $t('cancel', 'Batal') }}
                            </button>
                            <button @click="applyCropAndUpload" type="button" class="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 active:scale-95 transition-all">
                                {{ $t('save_photo', 'Simpan Foto') }}
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </section>
</template>