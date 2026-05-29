<script setup>
import { ref, watch, reactive, onMounted } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import { useCalendar } from '@/Composables/Calendar/useCalendar';
import { useGating } from '@/Composables/useGating';
import dayjs from 'dayjs';

// Import Komponen Anak
import CalendarHeader from './CalendarHeader.vue';
import CalendarGrid from './CalendarGrid.vue';
import CalendarEventModal from './CalendarEventModal.vue';
import CalendarDayDetail from './CalendarDayDetail.vue';
import NeuralBridge from '@/Components/NeuralBridge.vue';

const props = defineProps({
    currentMonth: String, 
    data: [Object, Array] // Menerima data Event dari Laravel
});


// ==========================================
// 🔥 MEMORI OPTIMISTIC UI (STATE LOKAL)
// ==========================================
// Clone data dari server menjadi milik kita sendiri
const localData = ref(Array.isArray(props.data) ? [...props.data] : JSON.parse(JSON.stringify(props.data || {})));

// Selalu sinkronkan memori kita secara diam-diam jika server merespon success
watch(() => props.data, (newVal) => {
    localData.value = Array.isArray(newVal) ? [...newVal] : JSON.parse(JSON.stringify(newVal || {}));
}, { deep: true });

const currentMonthKey = ref(props.currentMonth || dayjs().format('YYYY-MM'));

watch(() => props.currentMonth, (newVal) => {
    if (newVal) currentMonthKey.value = newVal;
});

// Jadikan Props palsu agar useCalendar hanya membaca punya lokal
const calendarProps = reactive({
    ...props,
    get currentMonth() { return currentMonthKey.value; },
    get data() { return localData.value; }
});

const {
    selectedDate, isEventModalOpen, isDetailModalOpen, eventForm,
    openEventModal, submitEvent, deleteEvent, openDayDetail, calendarDays
} = useCalendar(calendarProps);

const { isExplorer } = useGating();

onMounted(() => {
    if (isExplorer.value) {
        router.visit(route('billing'));
    }
});

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

// Logic Ganti Bulan — 100% instan lokal dalam tahun yang sama.
const changeMonth = (newMonthPayload) => {
    const oldYear = dayjs(currentMonthKey.value + '-01').format('YYYY');
    const newYear = dayjs(newMonthPayload + '-01').format('YYYY');
    
    currentMonthKey.value = newMonthPayload;
    
    if (oldYear !== newYear) {
        router.get(route('calendar.index'), { month: newMonthPayload }, { 
            preserveScroll: true,
            preserveState: true,
            only: ['currentMonth', 'data']
        });
    }
};

// Prefetch adjacent months dynamically when crossing years
watch(currentMonthKey, (newMonth) => {
    if (newMonth && typeof router.prefetch === 'function') {
        const current = dayjs(newMonth + '-01');
        const prevMonth = current.subtract(1, 'month').format('YYYY-MM');
        const nextMonth = current.add(1, 'month').format('YYYY-MM');
        router.prefetch(route('calendar.index'), { method: 'get', data: { month: prevMonth } }, { cacheFor: '5m' });
        router.prefetch(route('calendar.index'), { method: 'get', data: { month: nextMonth } }, { cacheFor: '5m' });
    }
}, { immediate: true });
</script>

<template>
    <Head :title="$t('calendar_page_title', 'Master Calendar')" />

    <div class="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-12 relative overflow-x-hidden transition-colors duration-500">
        
        <CalendarHeader 
            :currentMonth="currentMonthKey"
            @change-month="changeMonth"
            @add-event="() => openEventModal()"
        />

        <div class="w-full max-w-[1600px] mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6 min-w-0">
            <NeuralBridge module="Calendar" />
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