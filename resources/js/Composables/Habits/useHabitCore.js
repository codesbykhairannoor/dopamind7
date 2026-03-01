import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import axios from 'axios';

export function useHabitCore(props) {
    const user = usePage().props.auth.user;
    
    // State Data (Optimistic UI)
    const localHabits = ref(JSON.parse(JSON.stringify(props.habits.data)));

    watch(() => props.habits, (newVal) => {
        localHabits.value = JSON.parse(JSON.stringify(newVal.data));
    }, { deep: true });

    // --- GREETING & STATS ---
    const greetingKey = computed(() => {
        const hour = dayjs().hour();
        if (hour < 11) return 'greet_morning';
        if (hour < 15) return 'greet_noon';
        if (hour < 19) return 'greet_afternoon';
        return 'greet_night';
    });

    const todayProgress = computed(() => {
        if (localHabits.value.length === 0) return 0;
        const todayStr = dayjs().format('YYYY-MM-DD');
        let completed = 0;
        
        localHabits.value.forEach(h => {
            if (h.logs && h.logs[todayStr] === 'completed') {
                completed++;
            }
        });
        return Math.round((completed / localHabits.value.length) * 100);
    });

    const totalCompletions = computed(() => {
        let total = 0;
        localHabits.value.forEach(h => total += h.progress_count);
        return total;
    });

    const overallPercentage = computed(() => {
        if (localHabits.value.length === 0) return 0;
        let totalPercent = 0;
        localHabits.value.forEach(h => totalPercent += h.progress_percent);
        return Math.round(totalPercent / localHabits.value.length);
    });

    const getStatus = (habit, dateString) => {
        return habit.logs && habit.logs[dateString] ? habit.logs[dateString] : 'empty';
    };

    // --- SPREADSHEET-LIKE DRAG & SELECT LOGIC 🔥 ---
    const isDragging = ref(false);
    const selectedCells = ref(new Set()); // Set agar tidak ada duplikat 'habitId_date'

    // Format ID unik untuk sel: "habitId|dateString"
    const getCellId = (habitId, dateString) => `${habitId}|${dateString}`;

    // 1. Mouse ditekan (Mulai Blok)
    const handleMouseDown = (habitId, dateString) => {
        if (dayjs(dateString).isAfter(dayjs(), 'day')) return; // Jangan bisa blok masa depan
        isDragging.value = true;
        
        // Opsional: Kalau ditekan tanpa shift/ctrl, reset blok yang lama
        if (!window.event.ctrlKey && !window.event.shiftKey) {
            selectedCells.value.clear();
        }
        
        selectedCells.value.add(getCellId(habitId, dateString));
    };

    // 2. Mouse digeser sambil ditekan (Meluaskan Blok)
    const handleMouseEnter = (habitId, dateString) => {
        if (!isDragging.value) return;
        if (dayjs(dateString).isAfter(dayjs(), 'day')) return;
        selectedCells.value.add(getCellId(habitId, dateString));
    };

    // 3. Mouse dilepas (Selesai Blokir)
    const handleMouseUp = () => {
        isDragging.value = false;
    };

    // Cek apakah sel ini lagi di-blok? (Buat UI css)
    const isCellSelected = (habitId, dateString) => {
        return selectedCells.value.has(getCellId(habitId, dateString));
    };

    // Supaya kalau user ngelepas klik di luar grid, drag-nya tetep berhenti
    onMounted(() => window.addEventListener('mouseup', handleMouseUp));
    onUnmounted(() => window.removeEventListener('mouseup', handleMouseUp));

    // --- SINGLE TOGGLE ---
    const toggleStatus = async (habitId, dateString, forceStatus = null) => {
        if (dayjs(dateString).isAfter(dayjs(), 'day')) return;

        const habitIndex = localHabits.value.findIndex(h => h.id === habitId);
        if (habitIndex === -1) return;
        const habit = localHabits.value[habitIndex];

        const currentStatus = habit.logs[dateString] || 'empty';

        let newStatus = 'completed';
        if (forceStatus) {
            newStatus = (currentStatus === forceStatus) ? 'uncheck' : forceStatus;
        } else {
            newStatus = (currentStatus === 'completed' || currentStatus === 'skipped') ? 'uncheck' : 'completed';
        }

        // Optimistic UI
        if (newStatus === 'uncheck') {
            delete habit.logs[dateString];
        } else {
            habit.logs[dateString] = newStatus;
        }

        // Recalculate
        const newCompletedCount = Object.values(habit.logs).filter(status => status === 'completed').length;
        habit.progress_count = newCompletedCount;
        habit.progress_percent = habit.monthly_target > 0
            ? Math.min(100, Math.round((newCompletedCount / habit.monthly_target) * 100))
            : 0;

        try {
            await axios.post(route('habits.log', habitId), { date: dateString, status: newStatus });
        } catch (e) {
            console.error("Gagal save:", e);
        }
    };

    // --- MULTI-TOGGLE (SPASI PADA SEL YG DIBLOK) 🔥 ---
    const toggleSelectedCells = async () => {
        if (selectedCells.value.size === 0) return;

        // Asumsi: Kita akan nembak semua cell jadi 'completed' (atau 'uncheck' kalau udah komplit semua)
        // Cek dulu apakah mayoritas udah completed?
        let isAllCompleted = true;
        let payloadQueue = [];

        // Loop untuk update UI secara Optimistic seketika!
        selectedCells.value.forEach(cellId => {
            const [hIdStr, dStr] = cellId.split('|');
            const hId = parseInt(hIdStr);
            const habit = localHabits.value.find(h => h.id === hId);
            
            if (habit) {
                if (habit.logs[dStr] !== 'completed') isAllCompleted = false;
            }
        });

        // Tentukan target status massalnya (Kalau full centang, maka dibikin kosong. Sebaliknya jadi centang)
        const targetStatus = isAllCompleted ? 'uncheck' : 'completed';

        // Apply ke memori UI
        selectedCells.value.forEach(cellId => {
            const [hIdStr, dStr] = cellId.split('|');
            const hId = parseInt(hIdStr);
            const habit = localHabits.value.find(h => h.id === hId);
            
            if (habit) {
                if (targetStatus === 'uncheck') {
                    delete habit.logs[dStr];
                } else {
                    habit.logs[dStr] = targetStatus;
                }

                // Kalkulasi ulang bar
                const newCompletedCount = Object.values(habit.logs).filter(status => status === 'completed').length;
                habit.progress_count = newCompletedCount;
                habit.progress_percent = habit.monthly_target > 0
                    ? Math.min(100, Math.round((newCompletedCount / habit.monthly_target) * 100))
                    : 0;

                // Masukkan ke antrian untuk ditembak ke DB
                payloadQueue.push({ habit_id: hId, date: dStr, status: targetStatus });
            }
        });

        // Kosongkan blok seleksi setelah selesai
        selectedCells.value.clear();

        // Tembak massal ke server! (Gunakan endpoint log yang sama, bisa dioptimasi kalau server punya batch logic)
        try {
            // Karena ini pakai axios bawaan Laravel, ngirim N buah request sekaligus pakai Promise.all
            // (Batas aman: biasanya < 20 sel sekali blok gak masalah)
            await Promise.all(
                payloadQueue.map(p => axios.post(route('habits.log', p.habit_id), { date: p.date, status: p.status }))
            );
        } catch (e) {
            console.error("Gagal save massal:", e);
        }
    };


    // --- KEYBOARD NAV ---
    const handleGridNav = (e, hIndex, dIndex, habitId, dateString) => {
        const key = e.key;

        // 🔥 BATCH TOGGLE TRIGGER (SPACE BAR)
        if (key === ' ') {
            e.preventDefault();
            // Jika ada sel yang terblok, toggle semuanya. Kalau cuma 1 yang difokus, toggle 1 aja.
            if (selectedCells.value.size > 1) {
                toggleSelectedCells();
            } else {
                toggleStatus(habitId, dateString);
                // Biar jelas seleksinya ilang
                selectedCells.value.clear();
            }
            return;
        }

        // Kalau Esc, batalin blok
        if (key === 'Escape') {
            selectedCells.value.clear();
            return;
        }

        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) return;
        e.preventDefault();

        let targetH = hIndex;
        let targetD = dIndex;
        if (key === 'ArrowUp') targetH--;
        if (key === 'ArrowDown') targetH++;
        if (key === 'ArrowLeft') targetD--;
        if (key === 'ArrowRight') targetD++;

        const targetId = `cell-${targetH}-${targetD}`;
        const el = document.getElementById(targetId);
        if (el) {
            el.focus();
            el.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' });

            // Kalau user nahan SHIFT + Arah, langsung ke-blok! (Kayak Excel sungguhan)
            if (e.shiftKey) {
                // Di sini lu butuh parse ID asli target untuk di add ke selectedCells
                // Kita sederhanakan dengan cara nembak function aja (lihat di HabitGrid.vue)
            } else {
                // Kalau gerak biasa tanpa shift, ilangin seleksi
                selectedCells.value.clear();
            }
        }
    };

    // --- MOOD LOGIC ---
    const moodOptions = [
        { code: 'fire', icon: '🔥', label_key: 'mood_fire', color: 'bg-amber-100 text-amber-600' },
        { code: 'happy', icon: '😄', label_key: 'mood_happy', color: 'bg-emerald-100 text-emerald-600' },
        { code: 'neutral', icon: '😐', label_key: 'mood_neutral', color: 'bg-slate-100 text-slate-600' },
        { code: 'sad', icon: '😢', label_key: 'mood_sad', color: 'bg-blue-100 text-blue-600' },
        { code: 'stress', icon: '🤯', label_key: 'mood_stress', color: 'bg-rose-100 text-rose-600' },
        { code: 'sick', icon: '🤒', label_key: 'mood_sick', color: 'bg-purple-100 text-purple-600' },
    ];
    const showMoodDropdown = ref(false);

    const currentMoodData = computed(() => {
        if (!props.savedMood) return moodOptions[0];
        return moodOptions.find(m => m.code === props.savedMood) || moodOptions[0];
    });

    const selectMood = (code) => {
        showMoodDropdown.value = false;
        router.post(route('habits.mood'), {
            mood_code: code,
            period: props.monthQuery
        }, { preserveScroll: true });
    };
/// ==========================================
    // 🔥 DRAG & DROP REORDER (VIA VUEDRAGGABLE) 🔥
    // ==========================================
    const saveHabitOrder = async (newHabitsList) => {
        // 1. Update state lokal seketika (Optimistic UI)
        localHabits.value = newHabitsList;

        // 2. Siapkan data untuk dikirim ke backend
        const orderedHabits = newHabitsList.map((habit, index) => ({
            id: habit.id,
            position: index
        }));

        // 3. Tembak ke server secara background
        try {
            await axios.post(route('habits.reorder'), { habits: orderedHabits });
        } catch (e) {
            console.error("Gagal simpan urutan", e);
        }
    };

    return {
        user, localHabits, greetingKey,
        todayProgress, totalCompletions, overallPercentage,
        getStatus, toggleStatus, handleGridNav,
        isDragging, handleMouseDown, handleMouseEnter, isCellSelected, toggleSelectedCells,
        
        // 🔥 EKSPOR FUNGSI BARU INI AJA
        saveHabitOrder,

        moodOptions, showMoodDropdown, currentMoodData, selectMood
    };
   
}