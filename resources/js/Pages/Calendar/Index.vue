<script setup>
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
    data: Object
});

defineOptions({ layout: AuthenticatedLayout });

// Tarik logic dari Composable
const {
    selectedDate, isEventModalOpen, isDetailModalOpen, eventForm,
    openEventModal, submitEvent, deleteEvent, openDayDetail, calendarDays
} = useCalendar(props);

// Logic Ganti Bulan yang Benar
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

    <div class="w-full min-h-screen bg-slate-50/50 pb-12 relative overflow-x-hidden">
        
        <CalendarHeader 
            :currentMonth="currentMonth"
            @change-month="changeMonth"
            @add-event="() => openEventModal()"
        />

        <div class="w-full px-4 py-6 sm:px-6 lg:px-8 max-w-full mx-auto">
            <CalendarGrid 
                :calendarDays="calendarDays"
                @open-detail="openDayDetail"
            />
        </div>

        <CalendarEventModal 
            :show="isEventModalOpen"
            :form="eventForm"
            @close="isEventModalOpen = false"
            @submit="submitEvent"
        />

        <CalendarDayDetail 
            :show="isDetailModalOpen"
            :date="selectedDate"
            :calendarDays="calendarDays"
            @close="isDetailModalOpen = false"
            @edit-event="openEventModal"
            @delete-event="deleteEvent"
        />

    </div>
</template>