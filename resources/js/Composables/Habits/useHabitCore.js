import { ref, computed, watch } from 'vue';
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
            const log = h.logs.find(l => l.date === todayStr);
            if (log && log.status === 'completed') completed++;
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

    // --- TOGGLE LOGIC ---
    const getStatus = (habit, dateString) => {
        const log = habit.logs.find(l => l.date === dateString);
        return log ? log.status : 'empty';
    };

    const toggleStatus = async (habitId, dateString, forceStatus = null) => {
        if (dayjs(dateString).isAfter(dayjs(), 'day')) return;

        const habitIndex = localHabits.value.findIndex(h => h.id === habitId);
        if (habitIndex === -1) return;
        const habit = localHabits.value[habitIndex];

        const logIndex = habit.logs.findIndex(l => l.date === dateString);
        const currentStatus = logIndex !== -1 ? habit.logs[logIndex].status : 'empty';

        let newStatus = 'completed';
        if (forceStatus) {
            newStatus = (currentStatus === forceStatus) ? 'uncheck' : forceStatus;
        } else {
            newStatus = (currentStatus === 'completed' || currentStatus === 'skipped') ? 'uncheck' : 'completed';
        }

        if (logIndex !== -1) {
            if (newStatus === 'uncheck') habit.logs.splice(logIndex, 1);
            else habit.logs[logIndex].status = newStatus;
        } else if (newStatus !== 'uncheck') {
            habit.logs.push({ date: dateString, status: newStatus });
        }

        // Recalculate Progress
        const newCompletedCount = habit.logs.filter(l => l.status === 'completed').length;
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

    // --- KEYBOARD NAV ---
    const handleGridNav = (e, hIndex, dIndex, habitId, dateString) => {
        const key = e.key;
        if (key === ' ') {
            e.preventDefault();
            toggleStatus(habitId, dateString);
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

    return {
        user, localHabits, greetingKey,
        todayProgress, totalCompletions, overallPercentage,
        getStatus, toggleStatus, handleGridNav,
        moodOptions, showMoodDropdown, currentMoodData, selectMood
    };
}