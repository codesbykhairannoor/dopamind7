import { ref, reactive, computed, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useHabitCore } from './Habits/useHabitCore';
import { useHabitDates } from './Habits/useHabitDates';
import { useHabitModals } from './Habits/useHabitModals';
import dayjs from 'dayjs';

export function useHabits(props) {
    const currentMonthKey = ref(props.monthQuery || dayjs().format('YYYY-MM'));

    // Sync currentMonthKey with props when page loads or navigation occurs
    watch(() => props.monthQuery, (newVal) => {
        if (newVal) currentMonthKey.value = newVal;
    });



    // 1. Ekstrak dari Core (Termasuk fungsi drag & select)
    const core = useHabitCore(props, currentMonthKey);
    
    // 2. Ekstrak dari Dates
    const dates = useHabitDates(props, currentMonthKey);

    // 3. Ekstrak dari Modals (gabungkan dengan data yang dihubungkan dengan activeHabits)
    const modals = useHabitModals(props, currentMonthKey, core.activeHabits);

    const page = usePage();

    const activeLocale = computed(() => page.props.locale || 'id');
    const currentMonthName = computed(() => {
        return dayjs(currentMonthKey.value + '-01').locale(activeLocale.value).format('MMMM YYYY');
    });

    const user = computed(() => page.props.auth.user);
    const planType = computed(() => user.value?.plan_type || 'explorer');
    const isExplorer = computed(() => planType.value === 'explorer');
    const habitsCount = computed(() => core.activeHabits.value?.length || 0);

    const hasPrevHabits = computed(() => {
        const prevMonthStr = dayjs(currentMonthKey.value + '-01').subtract(1, 'month').format('YYYY-MM');
        // Because localHabits contains the entire year's data, we can just check it locally
        // If it's a cross-year boundary, it will rely on the backend's props.hasPrevHabits
        return core.localHabits.value.some(h => h.period === prevMonthStr) || props.hasPrevHabits;
    });

    // Menggabungkan semua return dari 3 composable di atas
    return {
        // --- Dari Core ---
        user: core.user,
        localHabits: core.activeHabits, // Map activeHabits ke localHabits agar UI terfilter otomatis
        greetingKey: core.greetingKey,
        todayProgress: core.todayProgress,
        totalCompletions: core.totalCompletions,
        overallPercentage: core.overallPercentage,
        getStatus: core.getStatus,
        toggleStatus: core.toggleStatus,
        handleGridNav: core.handleGridNav,
        moodOptions: core.moodOptions,
        showMoodDropdown: core.showMoodDropdown,
        currentMoodData: core.currentMoodData,
        selectMood: core.selectMood,

        // 🔥 FITUR SPREADSHEET (SELECT)
        isDragging: core.isDragging,
        handleMouseDown: core.handleMouseDown,
        handleMouseEnter: core.handleMouseEnter,
        isCellSelected: core.isCellSelected,
        toggleSelectedCells: core.toggleSelectedCells,

        // 🔥 FITUR DRAG & DROP REORDER (Via VueDraggable)
        saveHabitOrder: core.saveHabitOrder,

        // --- Dari Dates ---
        todayDate: dates.todayDate,
        monthDates: dates.monthDates,
        changeMonth: dates.changeMonth,
        currentMonthKey,
        currentMonthName,

        // --- Dari Modals ---
        iconList: modals.iconList,
        colorPalette: modals.colorPalette,
        form: modals.form,
        showCreateModal: modals.showCreateModal,
        isEditing: modals.isEditing,
        openCreateModal: modals.openCreateModal,
        editHabit: modals.editHabit,
        closeModal: modals.closeModal,
        submitHabit: modals.submitHabit,

        showDeleteModal: modals.showDeleteModal,
        habitToDelete: modals.habitToDelete,
        confirmDelete: modals.confirmDelete,
        executeDelete: modals.executeDelete,
        deleteFromEdit: modals.deleteFromEdit,

        showCopyModal: modals.showCopyModal,
        openCopyModal: modals.openCopyModal,
        executeCopy: modals.executeCopy,

        // Gating
        isExplorer,
        habitsCount,
        planType,
        hasPrevHabits,

        // Batch Modal
        showBatchModal: modals.showBatchModal,
        batchForm: modals.batchForm,
        openBatchModal: modals.openBatchModal,
        closeBatchModal: modals.closeBatchModal,
        addBatchRow: modals.addBatchRow,
        removeBatchRow: modals.removeBatchRow,
        submitBatchHabit: modals.submitBatchHabit,
        switchToBatch: modals.switchToBatch,
        switchToSingle: modals.switchToSingle,
    };
}