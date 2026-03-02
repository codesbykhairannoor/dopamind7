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
    data: [Object, Array] // Biasanya data berisi array list event dari backend
});

defineOptions({ layout: AuthenticatedLayout });

// ==========================================
// 🔥 MAGIC OPTIMISTIC UI: Buat Local State 
// ==========================================
// Deep clone data bawaan dari Laravel
const localData = ref(Array.isArray(props.data) ? [...props.data] : JSON.parse(JSON.stringify(props.data)));

// Pantau jika ada pembaruan sukses yang datang dari server (Background sync)
watch(() => props.data, (newVal) => {
    localData.value = Array.isArray(newVal) ? [...newVal] : JSON.parse(JSON.stringify(newVal));
}, { deep: true });

// Bungkus props menggunakan 'reactive' agar composable useCalendar membaca localData (bukan props)
const calendarProps = reactive({
    ...props,
    get data() { return localData.value; }
});

// Tarik logic dari Composable dengan mem-passing calendarProps (Local State)
const {
    selectedDate, isEventModalOpen, isDetailModalOpen, eventForm,
    openEventModal, submitEvent, deleteEvent, openDayDetail, calendarDays
} = useCalendar(calendarProps);


// ==========================================
// 🔥 TRIGGER OPTIMISTIC SUBMIT / DELETE
// ==========================================
const triggerSubmitEvent = () => {
    submitEvent({
        onOptimistic: (newData, isEditing) => {
            // Asumsi localData berupa Array. Jika objek (misal: paginasi/data wrap), ubah ke localData.value.data
            const targetArray = Array.isArray(localData.value) ? localData.value : localData.value.data;

            if (targetArray) {
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
    isDetailModalOpen.value = false; // Tutup day detail instan
    deleteEvent(id, {
        onOptimistic: (targetId) => {
            if (Array.isArray(localData.value)) {
                localData.value = localData.value.filter(e => e.id !== targetId);
            } else if (localData.value.data) {
                localData.value.data = localData.value.data.filter(e => e.id !== targetId);
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