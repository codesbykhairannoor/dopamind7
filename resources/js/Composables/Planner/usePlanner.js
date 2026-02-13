import { usePlannerTasks } from './usePlannerTasks';
import { usePlannerDrag } from './usePlannerDrag';
import { ref, watch } from 'vue';
import axios from 'axios';
import { router } from '@inertiajs/vue3';
import Swal from 'sweetalert2';

const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

export function usePlanner(props) {
    const taskLogic = usePlannerTasks(props);
    const dragLogic = usePlannerDrag(taskLogic.localTasks);
    const localNotes = ref(props.dailyLog?.notes || '');
    const localMeals = ref(props.dailyLog?.meals || { breakfast: '', lunch: '', dinner: '' });
    const activeModalType = ref('full');

    const saveLogSilent = debounce(async (data) => {
        try {
            await axios.post(route('planner.updateLog'), data);
        } catch (e) { console.error("Auto-save failed:", e); }
    }, 1000);

    watch(localNotes, (val) => saveLogSilent({ notes: val }));
    watch(localMeals, (val) => saveLogSilent({ meals: val }), { deep: true });

    const timeSlots = Array.from({ length: 18 }, (_, i) => `${(i + 6).toString().padStart(2, '0')}:00`);
    
    const getTypeColor = (type) => {
        const colors = { 1: 'bg-rose-50 text-rose-700 border-rose-200', 2: 'bg-indigo-50 text-indigo-700 border-indigo-200', 3: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
        return colors[type] || 'bg-white text-slate-700 border-slate-200';
    };

    // 🔥 FULL SWEET ALERT RESET BOARD
    const resetBoard = () => {
        Swal.fire({
            title: 'Hapus Semua Jadwal?',
            text: "Aksi ini tidak bisa dibatalkan, Bro!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Bersihkan!',
            cancelButtonText: 'Batal',
            buttonsStyling: false,
            // Custom Class untuk mengikuti tema Rounded OneForMind
            customClass: {
                popup: 'rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl',
                title: 'text-2xl font-black text-slate-800 mb-2 font-sans',
                htmlContainer: 'text-sm text-slate-500 font-bold mb-4',
                confirmButton: 'bg-rose-500 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-rose-200 active:scale-95 transition-all mx-2',
                cancelButton: 'bg-slate-100 text-slate-400 font-black py-4 px-8 rounded-2xl hover:bg-slate-200 active:scale-95 transition-all mx-2',
                actions: 'mt-6 gap-2'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Optimistic UI: Reset Frontend Langsung
                localNotes.value = '';
                localMeals.value = { breakfast: '', lunch: '', dinner: '' };
                taskLogic.localTasks.value = []; 

                // Reset Database via Inertia
                router.post(route('planner.reset'), {}, {
                    preserveScroll: true,
                    onSuccess: () => {
                        // Reset LocalStorage secara global (memicu listener di Sidebar)
                        window.dispatchEvent(new Event('reset-local-storage'));
                        
                        // Opsional: Alert sukses kecil di pojok
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 1500,
                            background: '#4f46e5', // Indigo solid
                            iconColor: '#ffffff',
                            icon: 'success',
                            title: '<span style="color: white; font-weight: 900;">Jadwal Direset!</span>',
                            customClass: {
                                container: '!fixed !top-5 !right-5 !z-[100000]',
                                popup: '!rounded-full !shadow-2xl'
                            }
                        });
                    }
                });
            }
        });
    };

    const openPlannerModal = (task = null, timeSlot = null, type = 'full') => {
        activeModalType.value = type;
        taskLogic.openModal(task, timeSlot);
    };

    return { 
        ...taskLogic, ...dragLogic, 
        openModal: openPlannerModal,
        activeModalType, resetBoard, timeSlots, getTypeColor, localNotes, localMeals 
    };
}