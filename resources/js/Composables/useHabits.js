import { useHabitCore } from './Habits/useHabitCore';
import { useHabitDates } from './Habits/useHabitDates';
import { useHabitModals } from './Habits/useHabitModals';

export function useHabits(props) {
    // 1. Ekstrak dari Core (Termasuk fungsi drag & select)
    const core = useHabitCore(props);
    
    // 2. Ekstrak dari Dates
    const dates = useHabitDates(props);

    // 3. Ekstrak dari Modals (gabungkan dengan data yang dibutuhkan)
    const modals = useHabitModals(props, core.localHabits);

    // Menggabungkan semua return dari 3 composable di atas
    return {
        // --- Dari Core ---
        user: core.user,
        localHabits: core.localHabits,
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