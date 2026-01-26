import { ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';

export function useHabitModals(props, localHabits) {
    
    // --- DATA STATIC ---
    const iconList = [
        '🔥', '💧', '🏃‍♂️', '📚', '🧘‍♂️', '💻', '💰', '💊',
        '🥦', '💤', '🧹', '🎸', '🎨', '🐶', '🎓', '⚡',
        '🚫', '🥗', '🏋️', '🚴', '🤲', '🕌', '✈️', '🎵'
    ];

    const colorPalette = [
        '#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4',
        '3b82f6', '#6366f1', '#d946ef', '#8b5cf6', '#64748b'
    ];

    // --- STATE ---
    const showCreateModal = ref(false);
    const isEditing = ref(false);
    
    // Kita tetap pakai useForm untuk handling input, tapi submitnya manual pakai router
    const form = useForm({
        id: null, name: '', icon: '⚡', color: '#6366f1', monthly_target: 20, 
        period: props.monthQuery 
    });

    // --- MODAL ACTIONS ---
    const editHabit = (habit) => {
        isEditing.value = true;
        showCreateModal.value = true;
        // Copy data ke form
        form.id = habit.id;
        form.name = habit.name;
        form.icon = habit.icon;
        form.color = habit.color;
        form.monthly_target = habit.monthly_target;
    };

    const openCreateModal = () => {
        isEditing.value = false;
        form.reset();
        form.id = null;
        showCreateModal.value = true;
    };

    const closeModal = () => {
        showCreateModal.value = false;
        showCopyModal.value = false;
        showDeleteModal.value = false;
        
        // Kasih delay dikit buat reset form biar animasi modal kelar dulu
        setTimeout(() => {
            isEditing.value = false;
            form.reset();
            form.id = null;
        }, 300);
    };

    // 🔥 LOGIC INI YANG BIKIN INSTAN (CRUD SAT-SET) 🔥
    const submitHabit = () => {
        // 1. Tangkap data detik ini juga
        const payload = { 
            ...form.data(), 
            period: props.monthQuery 
        };

        // 2. LANGSUNG UPDATE ARRAY DI LAYAR (JANGAN TUNGGU SERVER)
        if (isEditing.value) {
            // -- LOGIC EDIT INSTAN --
            const index = localHabits.value.findIndex(h => h.id === form.id);
            if (index !== -1) {
                // Update tampilan langsung
                Object.assign(localHabits.value[index], payload);
            }
            
            // Simpan ID untuk request background
            const targetId = form.id;
            
            // 3. TUTUP MODAL DETIK ITU JUGA
            closeModal();

            // 4. KIRIM DATA KE SERVER (DI BELAKANG LAYAR)
            router.patch(route('habits.update', targetId), payload, {
                preserveScroll: true,
                preserveState: true, // PENTING: Biar gak reload ulang layar
                onError: (err) => console.error(err)
            });

        } else {
            // -- LOGIC CREATE INSTAN --
            
            // Bikin ID palsu sementara biar bisa nampil di layar
            const tempId = 'temp_' + Date.now(); 
            
            // Push ke array lokal
            localHabits.value.push({
                ...payload,
                id: tempId,
                logs: [], // Habit baru log-nya kosong
                completed_count: 0
            });

            // 3. TUTUP MODAL DETIK ITU JUGA
            closeModal();

            // 4. KIRIM DATA KE SERVER
            router.post(route('habits.store'), payload, {
                preserveScroll: true,
                // Kita biarkan preserveState: false (default behavior) atau true
                // Kalau false, Inertia akan refresh props dan mengganti 'tempId' dengan ID asli dari DB
                onSuccess: () => { /* Data sudah sinkron otomatis */ },
                onError: (err) => {
                    // Kalau gagal, hapus item palsu tadi (jarang terjadi)
                    localHabits.value = localHabits.value.filter(h => h.id !== tempId);
                    alert("Gagal menyimpan habit.");
                }
            });
        }
    };

    // --- COPY MODAL ---
    const showCopyModal = ref(false);
    const openCopyModal = () => { showCopyModal.value = true; };
    
    const executeCopy = () => {
        // Copy gak bisa optimis karena datanya banyak, tapi kita tutup modal duluan
        showCopyModal.value = false; 
        
        router.post(route('habits.copy'), {
            current_period: props.monthQuery,
            prev_period: props.prevMonthQuery
        }, {
            preserveScroll: true,
        });
    };

    // --- DELETE MODAL ---
    const showDeleteModal = ref(false);
    const habitToDelete = ref(null);

    const confirmDelete = (habit) => {
        habitToDelete.value = habit;
        showDeleteModal.value = true;
    };

    // 🔥 LOGIC DELETE INSTAN 🔥
    const executeDelete = () => {
        if (!habitToDelete.value) return;

        const id = habitToDelete.value.id;

        // 1. HAPUS DARI LAYAR DETIK ITU JUGA
        localHabits.value = localHabits.value.filter(h => h.id !== id);

        // 2. TUTUP MODAL
        showDeleteModal.value = false;
        habitToDelete.value = null;

        // 3. KIRIM DELETE REQUEST (BACKGROUND)
        router.delete(route('habits.destroy', id), {
            preserveScroll: true,
            preserveState: true, // Jangan reload state, kita udah hapus manual
            onError: () => alert("Gagal menghapus habit.")
        });
    };

    const deleteFromEdit = () => {
        // Tutup modal edit dulu, baru buka modal delete
        showCreateModal.value = false; 
        const habitData = localHabits.value.find(h => h.id === form.id);
        
        // Kasih delay dikit biar transisi mulus
        setTimeout(() => {
            if(habitData) confirmDelete(habitData);
        }, 200);
    };

    return {
        iconList, colorPalette, form,
        showCreateModal, isEditing, editHabit, openCreateModal, closeModal, submitHabit,
        showCopyModal, openCopyModal, executeCopy,
        showDeleteModal, habitToDelete, confirmDelete, executeDelete, deleteFromEdit
    };
}