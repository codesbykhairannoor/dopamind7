import { ref, computed, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import dayjs from 'dayjs';

export function useJournalCore(props) {
    // State lokal untuk 0ms update
    const localJournals = ref([...(props.journals || [])]);
    const currentDate = ref(props.filters?.date || dayjs().format('YYYY-MM-DD'));

    // Sinkronisasi jika ada data baru dari server (setelah save/upload)
    watch(() => props.journals, (newVals) => {
        localJournals.value = [...newVals];
    }, { deep: true });

    // Ambil jurnal untuk hari yang sedang dipilih
    const activeJournal = computed(() => {
        return localJournals.value.find(j => j.date === currentDate.value) || null;
    });

    // Fungsi ganti tanggal
    const changeDate = (newDateStr) => {
        const oldMonth = dayjs(currentDate.value).format('YYYY-MM');
        const newMonth = dayjs(newDateStr).format('YYYY-MM');
        
        currentDate.value = newDateStr;

        // Jika pindah bulan, kita minta data bulan tersebut ke server secara background
        if (oldMonth !== newMonth) {
            router.get(route('journal.index'), 
                { date: newDateStr, month: newMonth }, 
                { 
                    preserveState: true, 
                    preserveScroll: true,
                    only: ['journals', 'filters'], // Minta data jurnal aja
                    replace: true
                }
            );
        } else {
            // Jika masih di bulan yang sama, cukup update URL tanpa request (sangat cepat)
            window.history.replaceState({}, '', `/journal?date=${newDateStr}`);
        }
    };

    return {
        localJournals,
        currentDate,
        activeJournal,
        changeDate
    };
}