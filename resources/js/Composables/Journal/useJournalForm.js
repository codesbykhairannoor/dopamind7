import { ref, watch } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import axios from 'axios';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';

export function useJournalForm(journal, date) {
    const isSaving = ref(false);
    const isCreating = ref(false); 
    const currentImageUrl = ref(journal?.image_url || null); 
    let saveTimeout = null;

    const t = (key, fallback) => {
        const result = trans(key);
        return result !== key ? result : fallback;
    };

    const form = useForm({
        id: journal?.id || null,
        date: date,
        title: journal?.title || '',
        content: journal?.content || '',
        mood: journal?.mood || ''
    });

    const fireToast = (icon, message) => {
        Swal.fire({
            toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true,
            background: '#4f46e5', iconColor: '#ffffff', icon: icon,
            title: `<span style="color: white; font-weight: 900; font-size: 14px; line-height: 1.2;">${message}</span>`,
            customClass: {
                container: '!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end',
                popup: '!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !m-0 !w-auto !min-w-[280px]',
                timerProgressBar: '!bg-white/40 !h-1 !rounded-b-full'
            }
        });
    };

    const silentSave = async (isManual = false) => {
        const plainText = form.content.replace(/<[^>]*>?/gm, '').trim();
        if (!form.id && !form.title && plainText === '' && !form.mood) return;
        
        // Mencegah penembakan request Create ganda
        if (!form.id && isCreating.value) return; 

        isSaving.value = true;
        if (!form.id) {
            isCreating.value = true;
        }

        const url = form.id ? route('journal.update', form.id) : route('journal.store');
        
        // 🔥 FIX 2: METHOD SPOOFING (Cegah Error 405)
        // Kita paksa Axios selalu menembak sebagai POST.
        // Tapi kita selipkan `_method: 'patch'` agar Laravel menganggapnya sebagai PATCH.
        const payload = form.data();
        if (form.id) {
            payload._method = 'patch';
        }

        try {
            // Selalu gunakan axios.post
            const res = await axios.post(url, payload, {
                headers: {
                    'Accept': 'application/json' // Beri tahu Laravel untuk merespon dengan JSON
                }
            });
            
            // Tangkap ID yang baru saja dibuat
            if (res.data?.data?.id && !form.id) {
                form.id = res.data.data.id;
                window.history.replaceState({}, '', route('journal.write', form.id));
            }
            if (isManual) fireToast('success', t('status_saved', 'Berhasil Disimpan!'));
        } catch (err) {
            console.error("Auto-save failed", err);
        } finally {
            isSaving.value = false;
            isCreating.value = false;
        }
    };

    const triggerAutoSave = () => {
        isSaving.value = true;
        if (saveTimeout) clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            silentSave(false);
        }, 1000);
    };

    const compressImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const MAX = 1200;
                    let w = img.width; let h = img.height;
                    if (w > h && w > MAX) { h *= MAX / w; w = MAX; }
                    else if (h > MAX) { w *= MAX / h; h = MAX; }
                    canvas.width = w; canvas.height = h;
                    ctx.drawImage(img, 0, 0, w, h);
                    canvas.toBlob((blob) => resolve(new File([blob], file.name, { type: 'image/jpeg' })), 'image/jpeg', 0.7);
                };
            };
        });
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (saveTimeout) clearTimeout(saveTimeout);

        if (isCreating.value) {
            fireToast('warning', 'Menyiapkan jurnal, coba sedetik lagi.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            currentImageUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
        
        isSaving.value = true;
        if (!form.id) isCreating.value = true;

        const compressedFile = await compressImage(file);
        
        const formData = new FormData();
        formData.append('image', compressedFile);
        formData.append('date', date);
        if (form.id) formData.append('id', form.id);

        try {
            const response = await axios.post(route('journal.uploadImage'), formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json' 
                }
            });

            if (response.data.success) {
                if (!form.id && response.data.journal_id) {
                    form.id = response.data.journal_id;
                    window.history.replaceState({}, '', route('journal.write', form.id));
                    
                    // Lanjutkan save teks yang tertunda
                    silentSave(false); 
                }
                currentImageUrl.value = response.data.url;
                fireToast('success', t('status_image_saved', 'Gambar Tersimpan!'));
            }
        } catch (error) {
            console.error("Upload Image Error:", error);
            currentImageUrl.value = null; 
        } finally {
            isSaving.value = false;
            isCreating.value = false; 
        }
    };

    const removeImage = async () => {
        if (!form.id) return;
        
        isSaving.value = true;
        
        try {
            const response = await axios.delete(route('journal.deleteImage', form.id));
            if (response.data.success) {
                currentImageUrl.value = null; 
                fireToast('success', t('status_image_deleted', 'Gambar Dihapus!')); 
            }
        } catch (error) {
            console.error("Delete Image Error:", error);
        } finally {
            isSaving.value = false; 
        }
    };

    const deleteFullJournal = () => {
        if (!form.id) { 
            router.get(route('journal.index')); 
            return; 
        }

        Swal.fire({
            title: t('journal_confirm_delete', 'Hapus Jurnal?'),
            text: t('journal_delete_warn', 'Data ini akan hilang selamanya.'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t('btn_yes_delete', 'Ya, Hapus'),
            cancelButtonText: t('btn_cancel', 'Batal'),
            customClass: { 
                confirmButton: 'bg-rose-500 text-white font-bold py-3 px-6 rounded-xl mx-2 shadow-lg', 
                cancelButton: 'bg-slate-100 text-slate-500 font-bold py-3 px-6 rounded-xl mx-2' 
            }, 
            buttonsStyling: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return new Promise((resolve) => {
                    router.delete(route('journal.destroy', form.id), { 
                        progress: false,
                        onSuccess: () => {
                            fireToast('success', t('status_deleted', 'Berhasil Dihapus!'));
                            resolve();
                        }
                    });
                });
            }
        });
    };

    watch(() => [form.title, form.content, form.mood], (newVal, oldVal) => {
        if (oldVal[0] === undefined && !newVal[0]) return;
        const oldText = oldVal[1] ? oldVal[1].replace(/<[^>]*>?/gm, '').trim() : '';
        const newText = newVal[1] ? newVal[1].replace(/<[^>]*>?/gm, '').trim() : '';
        if (oldVal[0] === newVal[0] && oldVal[2] === newVal[2] && oldText === newText) return;
        
        triggerAutoSave();
    }, { deep: true });

    return { form, isSaving, currentImageUrl, handleImageUpload, removeImage, deleteFullJournal, silentSave, t };
}