import { ref, watch } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';

export function useJournalForm(journal, date) {
    const isSaving = ref(false);
    let saveTimeout = null;

    // --- 1. TRANSLASI HELPER ---
    const t = (key, fallback) => {
        const result = trans(key);
        return result !== key ? result : fallback;
    };

    // --- 2. FORM INIT ---
    const form = useForm({
        id: journal?.id || null,
        date: date,
        title: journal?.title || '',
        content: journal?.content || '',
        mood: journal?.mood || ''
    });

    // --- 3. TOAST DESIGN (Consistent with Finance) ---
    const fireToast = (icon, message) => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            background: '#4f46e5',
            iconColor: '#ffffff',
            icon: icon,
            title: `<span style="color: white; font-weight: 900; font-size: 14px; line-height: 1.2;">${message}</span>`,
            customClass: {
                container: '!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end',
                popup: '!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !m-0 !w-auto !min-w-[280px]',
                timerProgressBar: '!bg-white/40 !h-1 !rounded-b-full'
            }
        });
    };

    // --- 4. CORE LOGIC (SAVE) ---
    const silentSave = (isManual = false) => {
        if (!form.title && !form.content && !form.mood) return;

        isSaving.value = true;

        if (form.id) {
            form.patch(route('journal.update', form.id), {
                preserveScroll: true,
                preserveState: true,
                progress: false,
                onSuccess: () => {
                    isSaving.value = false;
                    if (isManual) fireToast('success', t('status_saved', 'Berhasil Disimpan!'));
                },
                onError: () => { isSaving.value = false; }
            });
        } else {
            form.post(route('journal.store'), {
                preserveScroll: true,
                preserveState: true,
                progress: false,
                onSuccess: (page) => {
                    isSaving.value = false;
                    if (page.props.journal) form.id = page.props.journal.id;
                    if (isManual) fireToast('success', t('status_saved', 'Berhasil Disimpan!'));
                },
                onError: () => { isSaving.value = false; }
            });
        }
    };

    const triggerAutoSave = () => {
        isSaving.value = true;
        if (saveTimeout) clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => silentSave(false), 1000);
    };

    // --- 5. IMAGE LOGIC ---
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
                    let w = img.width;
                    let h = img.height;
                    if (w > h && w > MAX) { h *= MAX / w; w = MAX; }
                    else if (h > MAX) { w *= MAX / h; h = MAX; }
                    canvas.width = w; canvas.height = h;
                    ctx.drawImage(img, 0, 0, w, h);
                    canvas.toBlob((blob) => {
                        resolve(new File([blob], file.name, { type: 'image/jpeg' }));
                    }, 'image/jpeg', 0.7);
                };
            };
        });
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        isSaving.value = true;
        const compressedFile = await compressImage(file);
        const imageForm = useForm({ id: form.id, date: date, image: compressedFile });

        imageForm.post(route('journal.uploadImage'), {
            preserveScroll: true, preserveState: true, progress: false, forceFormData: true,
            onSuccess: (page) => {
                isSaving.value = false;
                if (!form.id && page.props.journal) form.id = page.props.journal.id;
                fireToast('success', 'Gambar Tersimpan!');
            },
            onError: () => { isSaving.value = false; }
        });
    };

    const removeImage = () => {
        if (!form.id) return;
        isSaving.value = true;
        router.delete(route('journal.deleteImage', form.id), {
            preserveScroll: true, preserveState: true, progress: false,
            onSuccess: () => { isSaving.value = false; }
        });
    };

    // --- 6. DELETE LOGIC ---
    const deleteFullJournal = () => {
        if (!form.id) { router.get(route('journal.index')); return; }
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
            buttonsStyling: false
        }).then((res) => {
            if (res.isConfirmed) {
                router.delete(route('journal.destroy', form.id), { progress: false });
            }
        });
    };

    // --- 7. WATCHERS ---
    watch(() => [form.title, form.content, form.mood], (newVal, oldVal) => {
        if (oldVal[0] === undefined && !newVal[0]) return;
        triggerAutoSave();
    }, { deep: true });

    // --- 8. RETURN (LAST) ---
    return { 
        form, 
        isSaving, 
        handleImageUpload, 
        removeImage, 
        deleteFullJournal, 
        silentSave,
        t 
    };
}