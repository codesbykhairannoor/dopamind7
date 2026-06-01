import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import axios from 'axios';
import confetti from 'canvas-confetti';

export function useHabitCore(props, currentMonthKey) {
    const user = usePage().props.auth.user;

    // State Data (Optimistic UI)
    const localHabits = ref([]);
    
    const getHabitsArray = (h) => {
        if (Array.isArray(h)) return h;
        if (h && typeof h === 'object') {
            if (Array.isArray(h.data)) return h.data;
            return Object.values(h);
        }
        return [];
    };

    localHabits.value = JSON.parse(JSON.stringify(getHabitsArray(props.habits)));

    watch(() => props.habits, (newVal) => {
        localHabits.value = JSON.parse(JSON.stringify(getHabitsArray(newVal)));
        // Re-calc streaks on new data
        localHabits.value.forEach(h => {
            h.streak = calculateStreak(h);
        });
    }, { deep: true });

    const activeHabits = computed(() => {
        const month = currentMonthKey.value;
        return localHabits.value.filter(h => h.period === month).map(h => {
            const count = Object.keys(h.logs || {})
                .filter(date => date.startsWith(month) && h.logs[date] === 'completed')
                .length;
            return {
                ...h,
                streak: calculateStreak(h),
                progress_count: count,
                progress_percent: h.monthly_target > 0 ? Math.min(100, Math.round((count / h.monthly_target) * 100)) : 0
            };
        });
    });

    const localSavedMoods = ref(JSON.parse(JSON.stringify(props.savedMoods || {})));

    watch(() => props.savedMoods, (newVal) => {
        if (newVal) localSavedMoods.value = JSON.parse(JSON.stringify(newVal));
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
        if (!activeHabits.value || activeHabits.value.length === 0) return 0;
        const todayStr = dayjs().format('YYYY-MM-DD');
        let completed = 0;

        activeHabits.value.forEach(h => {
            if (h.logs && h.logs[todayStr] === 'completed') {
                completed++;
            }
        });
        return Math.round((completed / activeHabits.value.length) * 100);
    });

    const totalCompletions = computed(() => {
        let total = 0;
        activeHabits.value.forEach(h => total += (h.progress_count || 0));
        return total;
    });

    const overallPercentage = computed(() => {
        if (!activeHabits.value || activeHabits.value.length === 0) return 0;
        let totalPercent = 0;
        activeHabits.value.forEach(h => totalPercent += (h.progress_percent || 0));
        return Math.round(totalPercent / activeHabits.value.length);
    });

    const calculateStreak = (habit) => {
        let streak = 0;
        let checkDate = dayjs();
        const logs = habit.logs || {};

        // Jika hari ini belum selesai, cek mulai kemarin
        const todayStr = checkDate.format('YYYY-MM-DD');
        if (logs[todayStr] !== 'completed') {
            checkDate = checkDate.subtract(1, 'day');
        }

        while (true) {
            const dateStr = checkDate.format('YYYY-MM-DD');
            if (logs[dateStr] === 'completed') {
                streak++;
                checkDate = checkDate.subtract(1, 'day');
            } else if (logs[dateStr] === 'skipped') {
                // Skip tidak memutus streak, tapi tidak menambah hitungan
                checkDate = checkDate.subtract(1, 'day');
            } else {
                // Kosong atau Uncheck memutus streak
                break;
            }

            // Limit prevent infinite loop (hanya cek data yang ada di logs)
            if (streak > 31) break;
        }
        return streak;
    };

    const getStatus = (habit, dateString) => {
        return habit.logs && habit.logs[dateString] ? habit.logs[dateString] : 'empty';
    };

    // Initialize streaks if data exists
    if (localHabits.value && localHabits.value.length > 0) {
        localHabits.value.forEach(h => {
            h.streak = calculateStreak(h);
        });
    }

    // --- CONFETTI CELEBRATION 🎊 ---
    watch(todayProgress, (newVal, oldVal) => {
        if (newVal === 100 && oldVal < 100) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#4f46e5', '#818cf8', '#ffffff', '#10b981']
            });
        }
    });

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

        // Recalculate stats & streak
        const newCompletedCount = Object.values(habit.logs).filter(status => status === 'completed').length;
        habit.progress_count = newCompletedCount;
        habit.progress_percent = habit.monthly_target > 0
            ? Math.min(100, Math.round((newCompletedCount / habit.monthly_target) * 100))
            : 0;
        habit.streak = calculateStreak(habit);

        // Haptic Feedback for Premium Feel 📱
        if (newStatus === 'completed' && window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }

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
        const activeMoodCode = localSavedMoods.value?.[currentMonthKey.value] || props.savedMood;
        if (!activeMoodCode) return moodOptions[0];
        return moodOptions.find(m => m.code === activeMoodCode) || moodOptions[0];
    });

    const selectMood = (code) => {
        showMoodDropdown.value = false;
        localSavedMoods.value[currentMonthKey.value] = code;
        router.post(route('habits.mood'), {
            mood_code: code,
            period: currentMonthKey.value
        }, { preserveScroll: true });
    };

    // --- DRAG & DROP REORDER (VIA VUEDRAGGABLE) ---
    const saveHabitOrder = async (newHabitsList) => {
        // newHabitsList only contains the current month's habits, ordered.
        // We need to update the position of these habits in localHabits without deleting other months.
        
        // Update positions based on the new array order
        newHabitsList.forEach((habit, index) => {
            const hIndex = localHabits.value.findIndex(h => h.id === habit.id);
            if (hIndex !== -1) {
                localHabits.value[hIndex].position = index;
            }
        });

        // Sort localHabits by period and then by position so the drag order persists visually if they change back and forth
        localHabits.value.sort((a, b) => {
            if (a.period !== b.period) return a.period.localeCompare(b.period);
            return (a.position || 0) - (b.position || 0);
        });

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
        user, localHabits, activeHabits, greetingKey,
        todayProgress, totalCompletions, overallPercentage,
        getStatus, toggleStatus, handleGridNav,
        isDragging, handleMouseDown, handleMouseEnter, isCellSelected, toggleSelectedCells,
        saveHabitOrder,
        moodOptions, showMoodDropdown, currentMoodData, selectMood
    };
}