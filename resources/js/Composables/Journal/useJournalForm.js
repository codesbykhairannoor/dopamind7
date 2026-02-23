import { ref, watch } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';

export function useJournalForm(journal, date) {
    const isSaving = ref(false);
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

    const silentSave = (isManual = false) => {
        const plainText = form.content.replace(/<[^>]*>?/gm, '').trim();
        if (!form.id && !form.title && plainText === '' && !form.mood) return;

        // 🔥 KUNCI PENCEGAH DOUBLE CARD: 
        // Jika belum punya ID dan Inertia masih memproses request sebelumnya, BATALKAN POST ini.
        // Nanti triggerAutoSave akan otomatis mencoba lagi.
        if (!form.id && form.processing) return;

        isSaving.value = true;

        if (form.id) {
            // PATCH (Update)
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
            // POST (Create)
            form.post(route('journal.store'), {
                preserveScroll: true,
                preserveState: true, // preserveState mencegah Editor mereset ketikan kamu
                progress: false,
                onSuccess: (page) => {
                    isSaving.value = false;
                    // Ambil ID dari prop journal yang dikirim redirect()
                    if (page.props.journal && page.props.journal.id) {
                        form.id = page.props.journal.id;
                    }
                    if (isManual) fireToast('success', t('status_saved', 'Berhasil Disimpan!'));
                },
                onError: () => { isSaving.value = false; }
            });
        }
    };

    const triggerAutoSave = () => {
        isSaving.value = true;
        if (saveTimeout) clearTimeout(saveTimeout);
        
        saveTimeout = setTimeout(() => {
            // Kalau masih loading bikin jurnal pertama, TUNDA requestnya lalu coba lagi 1 detik ke depan
            if (!form.id && form.processing) {
                triggerAutoSave();
            } else {
                silentSave(false);
            }
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
        buttonsStyling: false
    }).then((res) => {
        if (res.isConfirmed) {
            router.delete(route('journal.destroy', form.id), { 
                progress: false,
                onSuccess: () => fireToast('success', t('success_deleted', 'Berhasil Dihapus!'))
            });
        }
    });
};

    watch(() => [form.title, form.content, form.mood], (newVal, oldVal) => {
        if (oldVal[0] === undefined && !newVal[0]) return;
        
        // Abaikan auto-save kalau editor cuman ngerender <p></p> kosong tanpa teks real
        const oldText = oldVal[1] ? oldVal[1].replace(/<[^>]*>?/gm, '').trim() : '';
        const newText = newVal[1] ? newVal[1].replace(/<[^>]*>?/gm, '').trim() : '';
        if (oldVal[0] === newVal[0] && oldVal[2] === newVal[2] && oldText === newText) return;
        
        triggerAutoSave();
    }, { deep: true });

    return { form, isSaving, handleImageUpload, removeImage, deleteFullJournal, silentSave, t };
}