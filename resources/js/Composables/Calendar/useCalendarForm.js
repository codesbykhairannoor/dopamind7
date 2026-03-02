import { ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';

export function useCalendarForm() {
    
    const t = (key, fallback) => {
        const result = trans(key);
        return result !== key ? result : fallback;
    };

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

    const isEventModalOpen = ref(false);
    
    const eventForm = useForm({
        id: null,
        title: '',
        description: '',
        type: 'event',
        color: '#4f46e5',
        start_date: dayjs().format('YYYY-MM-DD'),
        end_date: '',
        is_all_day: true,
        start_time: '',
        end_time: ''
    });

  // --- LOGIC CRUD ---
    const openEventModal = (dateStr = null, eventToEdit = null) => {
        eventForm.reset();
        eventForm.clearErrors();
        
        if (eventToEdit) {
            eventForm.id = eventToEdit.id;
            eventForm.title = eventToEdit.title;
            eventForm.description = eventToEdit.description || '';
            eventForm.type = eventToEdit.type || 'event';
            eventForm.color = eventToEdit.color || '#4f46e5';
            
            // 🔥 FIX: Gunakan dateStr (parameter pertama) jika ada, jika tidak baru ambil dari eventToEdit
            eventForm.start_date = dateStr || eventToEdit.start_date || dayjs().format('YYYY-MM-DD');
            
            eventForm.end_date = eventToEdit.end_date || '';
            eventForm.is_all_day = eventToEdit.is_all_day;
            eventForm.start_time = eventToEdit.start_time || '';
            eventForm.end_time = eventToEdit.end_time || '';
        } else {
            // Jika tambah baru, otomatis isi start_date dengan tanggal kotak yang diklik
            eventForm.start_date = dateStr || dayjs().format('YYYY-MM-DD');
        }
        
        isEventModalOpen.value = true;
    };

    // 🔥 TERAPKAN CALLBACK OPTIMISTIC UNTUK SUBMIT
    const submitEvent = (callbacks = {}) => {
        if (!eventForm.title) return fireToast('warning', t('warn_empty_title', 'Judul harus diisi!'));

        const isEditing = !!eventForm.id;
        const url = isEditing ? route('calendar.events.update', eventForm.id) : route('calendar.events.store');
        const method = isEditing ? 'put' : 'post';

        // 1. Buat Fake Data
        const tempId = eventForm.id || `temp_${Date.now()}`;
        const optimisticData = { ...eventForm.data(), id: tempId };

        // 2. Tutup Modal Secara Instan
        isEventModalOpen.value = false;

        // 3. Update Kalender di Layar Secara Instan
        if (callbacks.onOptimistic) callbacks.onOptimistic(optimisticData, isEditing);

        eventForm[method](url, {
            preserveScroll: true,
            preserveState: true,
            progress: false, // Hilangkan loading bar Inertia
            onSuccess: () => {
                fireToast('success', t('success_saved', 'Acara Berhasil Disimpan!'));
                eventForm.reset();
            },
            onError: (err) => {
                isEventModalOpen.value = true;
                fireToast('error', Object.values(err)[0]);
                if (callbacks.onError) callbacks.onError(tempId, isEditing);
            }
        });
    };

    // 🔥 TERAPKAN CALLBACK OPTIMISTIC UNTUK DELETE
    const deleteEvent = (id, callbacks = {}) => {
        Swal.fire({
            title: t('confirm_delete_title', 'Hapus Acara?'),
            text: t('confirm_delete_text', 'Data ini akan dihapus permanen.'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t('btn_yes_delete', 'Ya, Hapus'),
            cancelButtonText: t('btn_cancel', 'Batal'),
            customClass: {
                popup: 'rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl',
                title: 'text-2xl font-black text-slate-800 mb-2 font-sans',
                confirmButton: 'bg-rose-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl shadow-rose-200 active:scale-95 transition-all outline-none mx-2 tracking-wide',
                cancelButton: 'bg-slate-50 text-slate-400 font-bold py-3.5 px-8 rounded-2xl hover:bg-slate-100 active:scale-95 transition-all outline-none mx-2 tracking-wide',
                actions: 'mt-6 gap-3',
            },
            buttonsStyling: false,
        }).then((res) => {
            if (res.isConfirmed) {
                // Hapus data dari kalender secara instan (sebelum balasan server)
                if (callbacks.onOptimistic) callbacks.onOptimistic(id);

                router.delete(route('calendar.events.destroy', id), {
                    preserveScroll: true, 
                    preserveState: true, 
                    progress: false, // Hilangkan loading bar Inertia
                    onSuccess: () => {
                        fireToast('success', t('success_deleted', 'Berhasil Dihapus!'));
                    },
                    onError: () => {
                        if (callbacks.onError) callbacks.onError(id);
                    }
                });
            }
        });
    };

    return { t, fireToast, isEventModalOpen, eventForm, openEventModal, submitEvent, deleteEvent };
}