<script setup>
import { ref, watch, reactive } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useCalendar } from '@/Composables/Calendar/useCalendar';
import dayjs from 'dayjs';

// Import Komponen Anak
import CalendarHeader from './CalendarHeader.vue';
import CalendarGrid from './CalendarGrid.vue';
import CalendarEventModal from './CalendarEventModal.vue';
import CalendarDayDetail from './CalendarDayDetail.vue';

const props = defineProps({
    currentMonth: String, 
    data: [Object, Array] // Menerima data Event dari Laravel
});

defineOptions({ layout: AuthenticatedLayout });

// ==========================================
// 🔥 MEMORI OPTIMISTIC UI (STATE LOKAL)
// ==========================================
// Clone data dari server menjadi milik kita sendiri
const localData = ref(Array.isArray(props.data) ? [...props.data] : JSON.parse(JSON.stringify(props.data || {})));

// Selalu sinkronkan memori kita secara diam-diam jika server merespon success
watch(() => props.data, (newVal) => {
    localData.value = Array.isArray(newVal) ? [...newVal] : JSON.parse(JSON.stringify(newVal || {}));
}, { deep: true });

// Jadikan Props palsu agar useCalendar hanya membaca punya lokal
const calendarProps = reactive({
    ...props,
    get data() { return localData.value; }
});

const {
    selectedDate, isEventModalOpen, isDetailModalOpen, eventForm,
    openEventModal, submitEvent, deleteEvent, openDayDetail, calendarDays
} = useCalendar(calendarProps);


// ==========================================
// 🔥 EKSEKUSI TRIGGER INSTAN KE LAYAR
// ==========================================
const triggerSubmitEvent = () => {
    submitEvent({
        onOptimistic: (newData, isEditing) => {
            // Cek apakah data dari laravel bentuknya array atau terbungkus object
            const targetArray = Array.isArray(localData.value) ? localData.value : (localData.value.events || localData.value);

            if (targetArray && Array.isArray(targetArray)) {
                if (isEditing) {
                    const idx = targetArray.findIndex(e => e.id === newData.id);
                    if (idx !== -1) Object.assign(targetArray[idx], newData);
                } else {
                    targetArray.push(newData);
                }
            }
        }
    });
};

const triggerDeleteEvent = (id) => {
    isDetailModalOpen.value = false; // Tutup detail instan
    
    deleteEvent(id, {
        onOptimistic: (targetId) => {
            if (Array.isArray(localData.value)) {
                localData.value = localData.value.filter(e => e.id !== targetId);
            } else if (localData.value.events) {
                localData.value.events = localData.value.events.filter(e => e.id !== targetId);
            }
        }
    });
};

// Logic Ganti Bulan
const changeMonth = (newMonthPayload) => {
    router.get(route('calendar.index'), { month: newMonthPayload }, { 
        preserveState: true, 
        preserveScroll: true,
        progress: false 
    });
};
</script>

<template>
    <Head :title="$t('calendar_title', 'Master Calendar')" />

    <div class="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-12 relative overflow-x-hidden transition-colors duration-500">
        
        <CalendarHeader 
            :currentMonth="currentMonth"
            @change-month="changeMonth"
            @add-event="() => openEventModal()"
        />

        <div class="w-full px-4 py-6 sm:px-6 lg:px-8 max-w-full mx-auto">
            <CalendarGrid 
                :calendarDays="calendarDays"
                :selectedDate="selectedDate"
                @open-detail="openDayDetail"
                @open-event-modal="() => openEventModal()"
            />
        </div>

        <CalendarEventModal 
            :show="isEventModalOpen"
            :form="eventForm"
            @close="isEventModalOpen = false"
            @submit="triggerSubmitEvent"
        />

        <CalendarDayDetail 
            :show="isDetailModalOpen"
            :date="selectedDate"
            :calendarDays="calendarDays"
            @close="isDetailModalOpen = false"
            @edit-event="openEventModal"
            @delete-event="triggerDeleteEvent"
        />

    </div>
</template>