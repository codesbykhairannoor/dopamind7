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
    const selectedCells = ref(new Set());

    const getCellId = (habitId, dateString) => `${habitId}|${dateString}`;

    // 1. Mouse ditekan (Mulai Blok)
    const handleMouseDown = (e, habitId, dateString) => {
        if (dayjs(dateString).isAfter(dayjs(), 'day')) return;
        isDragging.value = true;

        const isMulti = e && (e.ctrlKey || e.shiftKey);
        if (!isMulti) {
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
        if (!isDragging.value) return;
        isDragging.value = false;

        // 🔥 FIX SESUAI REQUEST 🔥
        // Jika size cuma 1 (artinya user cuma klik biasa, bukan nge-drag massal)
        // Kita HAPUS seleksinya supaya @click bawaan Vue ngeksekusi toggle dengan lancar tanpa meninggalkan ring/blok biru.
        if (selectedCells.value.size <= 1) {
            selectedCells.value.clear();
        }
        // JIKA SIZE > 1 (User nge-drag), kita JANGAN clear, dan JANGAN auto-save.
        // Biarkan terblok biru di layar, menunggu user memencet tombol SPACE.
    };

    const isCellSelected = (habitId, dateString) => {
        return selectedCells.value.has(getCellId(habitId, dateString));
    };

    onMounted(() => window.addEventListener('mouseup', handleMouseUp));
    onUnmounted(() => window.removeEventListener('mouseup', handleMouseUp));

    // --- SINGLE TOGGLE ---
    const toggleStatus = async (habitId, dateString, forceStatus = null) => {
        if (dayjs(dateString).isAfter(dayjs(), 'day')) return;

        // 🔥 FIX: Mencegah request 'temp_' id ke backend (invalid bigint)
        if (String(habitId).startsWith('temp_')) {
            console.warn("Please wait for habit to be saved before logging.");
            return;
        }

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

    const toggleSelectedCells = async () => {
        if (selectedCells.value.size === 0) return;

        let isAllCompleted = true;
        let logsPayload = [];
        let validHabitsCount = 0; // 🔥 TRACK VALID HABITS

        selectedCells.value.forEach(cellId => {
            const [hIdStr, dStr] = cellId.split('|');
            if (String(hIdStr).startsWith('temp_')) return; // SKIP OPTIMISTIC

            const hId = parseInt(hIdStr);
            const habit = localHabits.value.find(h => h.id === hId);
            if (habit) {
                validHabitsCount++;
                if (habit.logs[dStr] !== 'completed') isAllCompleted = false;
            }
        });

        if (validHabitsCount === 0) {
            selectedCells.value.clear();
            return;
        }

        const targetStatus = isAllCompleted ? 'uncheck' : 'completed';

        selectedCells.value.forEach(cellId => {
            const [hIdStr, dStr] = cellId.split('|');
            if (String(hIdStr).startsWith('temp_')) return; // SKIP OPTIMISTIC

            const hId = parseInt(hIdStr);
            const habit = localHabits.value.find(h => h.id === hId);

            if (habit) {
                // Update UI Instan
                if (targetStatus === 'uncheck') { delete habit.logs[dStr]; }
                else { habit.logs[dStr] = targetStatus; }

                // Masukkan ke payload
                logsPayload.push({
                    habit_id: hId,
                    date: dStr,
                    status: targetStatus
                });

                // Update Progress UI massal seketika
                const newCompletedCount = Object.values(habit.logs).filter(status => status === 'completed').length;
                habit.progress_count = newCompletedCount;
                habit.progress_percent = habit.monthly_target > 0
                    ? Math.min(100, Math.round((newCompletedCount / habit.monthly_target) * 100))
                    : 0;
            }
        });

        // Clear blok warna setelah sukses dieksekusi oleh spasi
        selectedCells.value.clear();

        // 🔥 HANYA 1 REQUEST UNTUK SEMUA SEL
        try {
            await axios.post(route('habits.batch-log'), { logs: logsPayload });
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
            if (selectedCells.value.size > 1) {
                // Eksekusi semua sel yang terblokir drag mouse
                toggleSelectedCells();
            } else {
                // Eksekusi sel saat ini saja
                toggleStatus(habitId, dateString);
                selectedCells.value.clear();
            }
            return;
        }

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

            if (e.shiftKey) {
                selectedCells.value.add(getCellId(habitId, dateString));
            } else {
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

    // --- DRAG & DROP REORDER (VIA VUEDRAGGABLE) ---
    const saveHabitOrder = async (newHabitsList) => {
        localHabits.value = newHabitsList;

        const orderedHabits = newHabitsList
            .filter(habit => !String(habit.id).startsWith('temp_')) // 🔥 FIX FILTER
            .map((habit, index) => ({
                id: habit.id,
                position: index
            }));

        if (orderedHabits.length === 0) return; // FIX PREVENT EMPTY REQUEST

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
        saveHabitOrder,
        moodOptions, showMoodDropdown, currentMoodData, selectMood
    };
}