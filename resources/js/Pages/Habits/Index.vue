<script setup>
// ==========================================
// 1. IMPORT & SETUP
// ==========================================
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en'; // Import locale Inggris juga
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

const props = defineProps({
    habits: Array,
    currentMonth: String,
    monthQuery: String, // Format: YYYY-MM
    hasPrevHabits: Boolean, // <--- Props Baru
    prevMonthQuery: String,
    savedMood: String
});

const user = usePage().props.auth.user;

// --- STATE LOKAL (OPTIMISTIC UI) ---
const localHabits = ref(JSON.parse(JSON.stringify(props.habits)));

// Sync kalau props berubah (misal ganti bulan)
watch(() => props.habits, (newVal) => {
    localHabits.value = JSON.parse(JSON.stringify(newVal));
}, { deep: true });

const showCreateModal = ref(false);
const todayDate = dayjs().locale('id').format('dddd, D MMMM YYYY'); // Tanggal hari ini tetap Indo

// Logic Sapaan
const greetingKey = computed(() => {
    const hour = dayjs().hour();
    if (hour < 11) return 'greet_morning';
    if (hour < 15) return 'greet_noon';
    if (hour < 19) return 'greet_afternoon';
    return 'greet_night';
});

// ==========================================
// 2. DATA STATIC (ICON & COLOR)
// ==========================================
const iconList = [
    '🔥', '💧', '🏃‍♂️', '📚', '🧘‍♂️', '💻', '💰', '💊', 
    '🥦', '💤', '🧹', '🎸', '🎨', '🐶', '🎓', '⚡',
    '🚫', '🥗', '🏋️', '🚴', '🤲', '🕌', '✈️', '🎵'
];

const colorPalette = [
    '#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', 
    '#3b82f6', '#6366f1', '#d946ef', '#8b5cf6', '#64748b'
];

const form = useForm({
    id: null, // <-- Tambah ini
    name: '', 
    icon: '⚡', 
    color: '#6366f1', 
    monthly_target: 20
});

// ==========================================
// 3. LOGIC TANGGALAN & STATS
// ==========================================
const monthDates = computed(() => {
    // 1. Cek Bahasa Aktif
    const activeLang = usePage().props.locale || 'id'; 
    dayjs.locale(activeLang); 

    // 2. Pake Bulan dari Controller (Navigasi)
    // Kalau props.monthQuery kosong, fallback ke hari ini
    const targetDate = props.monthQuery ? dayjs(props.monthQuery) : dayjs();
    
    const daysInMonth = targetDate.daysInMonth();
    let days = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
        const date = targetDate.date(i); 
        days.push({
            dateString: date.format('YYYY-MM-DD'),
            dayNumber: i,
            // Format 3 Huruf (Sen, Sel / Mon, Tue)
            dayName: date.format('ddd'), 
            isToday: date.isSame(dayjs(), 'day'),
            isFuture: date.isAfter(dayjs(), 'day')
        });
    }
    return days;
});

// Progress Hari Ini (Header)
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

// Stats Bawah
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

// ==========================================
// 4. ACTION HANDLERS (CRUD & TOGGLE)
// ==========================================
const changeMonth = (direction) => {
    // Logic ganti bulan (Maju/Mundur)
    const current = props.monthQuery ? dayjs(props.monthQuery) : dayjs();
    const newDate = direction === 'next' 
        ? current.add(1, 'month') 
        : current.subtract(1, 'month');
        
    router.get(route('habits.index'), { 
        month: newDate.format('YYYY-MM') 
    }, {
        preserveState: false, // Refresh data total
        preserveScroll: true 
    });
};

const getStatus = (habit, dateString) => {
    const log = habit.logs.find(l => l.date === dateString);
    return log ? log.status : 'empty';
};

const toggleStatus = (habitId, dateString) => {
    if (dayjs(dateString).isAfter(dayjs(), 'day')) return;

    // 1. Update Lokal Dulu (Optimistic)
    const habitIndex = localHabits.value.findIndex(h => h.id === habitId);
    if (habitIndex === -1) return;
    const habit = localHabits.value[habitIndex];
    
    const logIndex = habit.logs.findIndex(l => l.date === dateString);
    const currentStatus = logIndex !== -1 ? habit.logs[logIndex].status : 'empty';
    
    // LOGIC BARU: CUMA 2 STATUS (CENTANG / KOSONG)
    let newStatus = 'completed';
    if (currentStatus === 'completed') {
        newStatus = 'uncheck';
    }

    if (logIndex !== -1) {
        if (newStatus === 'uncheck') habit.logs.splice(logIndex, 1);
        else habit.logs[logIndex].status = newStatus;
    } else if (newStatus !== 'uncheck') {
        habit.logs.push({ date: dateString, status: newStatus });
    }

    // Recalculate Progress Habit Lokal
    const newCompletedCount = habit.logs.filter(l => l.status === 'completed').length;
    habit.progress_count = newCompletedCount;
    habit.progress_percent = Math.min(100, Math.round((newCompletedCount / habit.monthly_target) * 100));

    // 2. Kirim Server (Silent)
    router.post(route('habits.log', habitId), {
        date: dateString, status: newStatus
    }, { preserveScroll: true, preserveState: true });
};

// --- UPDATE FUNGSI SUBMIT ---
const submitHabit = () => {
    // Kita "inject" data periode ke dalam form sebelum dikirim
    // props.monthQuery isinya "2026-01" (dari controller)
    form.transform((data) => ({
        ...data,
        period: props.monthQuery 
    }));

    if (isEditing.value) {
        // KALAU EDIT
        form.patch(route('habits.update', form.id), {
            onSuccess: () => { showCreateModal.value = false; form.reset(); }
        });
    } else {
        // KALAU BARU
        form.post(route('habits.store'), {
            onSuccess: () => { showCreateModal.value = false; form.reset(); }
        });
    }
};

// --- TAMBAH FUNGSI COPY ---
// Pasang ini di tombol "Salin dari Bulan Lalu"
// --- STATE MODAL COPY ---
const showCopyModal = ref(false);

// 1. Fungsi Buka Modal (Dipasang di tombol "Salin dari Bulan Lalu")
const openCopyModal = () => {
    showCopyModal.value = true;
};

// 2. Eksekusi Salin (Dipasang di tombol "Ya" dalam Modal)
const executeCopy = () => {
    router.post(route('habits.copy'), {
        current_period: props.monthQuery,
        prev_period: props.prevMonthQuery
    }, {
        preserveScroll: true,
        onSuccess: () => {
            showCopyModal.value = false; // Tutup modal kalau sukses
        }
    });
};

const deleteHabit = (id, name) => {
    if (confirm(`Hapus habit "${name}"?`)) {
        router.delete(route('habits.destroy', id), { preserveScroll: true });
    }
};


const deleteFromEdit = () => {
    showCreateModal.value = false;
    const habitData = localHabits.value.find(h => h.id === form.id);
    confirmDelete(habitData);
};

const isEditing = ref(false); // Penanda status

// Fungsi Buka Modal buat Edit
const editHabit = (habit) => {
    isEditing.value = true;
    showCreateModal.value = true;

    // Isi form dengan data habit yang mau diedit
    form.id = habit.id;
    form.name = habit.name;
    form.icon = habit.icon;
    form.color = habit.color;
    form.monthly_target = habit.monthly_target;
};

// Fungsi Buka Modal buat Baru (Reset dulu)
const openCreateModal = () => {
    isEditing.value = false;
    form.reset(); // Kosongkan form
    form.id = null;
    showCreateModal.value = true;
};

// Fungsi Tutup Modal & Bersihkan State
    const closeModal = () => {
        showCreateModal.value = false;
        
        // Tunggu animasi tutup bentar (opsional), lalu reset
        setTimeout(() => {
            isEditing.value = false;
            form.reset();
            form.id = null;
        }, 200);
    };

    // --- STATE DELETE MODAL ---
const showDeleteModal = ref(false);
const habitToDelete = ref(null); // Nyimpen object habit yg lagi dipilih

// 1. Buka Modal Konfirmasi
const confirmDelete = (habit) => {
    habitToDelete.value = habit;
    showDeleteModal.value = true;
};

// 2. Eksekusi Hapus (Ke Server)
const executeDelete = () => {
    if (!habitToDelete.value) return;

    router.delete(route('habits.destroy', habitToDelete.value.id), {
        preserveScroll: true,
        onSuccess: () => {
            showDeleteModal.value = false;
            habitToDelete.value = null; // Reset
        }
    });
};

// --- LOGIC KEYBOARD NAVIGATION & SPASI ---
// 🔥 UPDATE: Tambahkan parameter habitId & dateString biar spasi jalan
const handleGridNav = (e, hIndex, dIndex, habitId, dateString) => {
    const key = e.key;

    // 1. LOGIC SPASI (Manual Toggle)
    if (key === ' ') {
        e.preventDefault(); // Cegah layar scroll ke bawah saat spasi
        toggleStatus(habitId, dateString); // 🔥 Eksekusi centang/uncentang
        return; 
    }

    // 2. LOGIC PANAH (Navigasi)
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) return;

    e.preventDefault(); // Cegah scroll browser bawaan

    let targetH = hIndex;
    let targetD = dIndex;

    // Hitung Koordinat Baru
    if (key === 'ArrowUp') targetH--;
    if (key === 'ArrowDown') targetH++;
    if (key === 'ArrowLeft') targetD--;
    if (key === 'ArrowRight') targetD++;

    // Cari elemen tetangga
    const targetId = `cell-${targetH}-${targetD}`;
    const el = document.getElementById(targetId);

    if (el) {
        // A. Pindahkan Fokus (Biar ring pink pindah)
        el.focus();

        // B. AUTO SCROLL (Biar ngikutin zoom level berapapun)
        // 'nearest' artinya: "Geser scroll CUMA KALAU elemennya ketutupan/kepotong"
        el.scrollIntoView({ 
            behavior: 'auto', // Gerakannya halus
            block: 'nearest',   // Vertikal: Jaga posisi atas/bawah
            inline: 'nearest'   // Horizontal: Jaga posisi kiri/kanan (PENTING BUAT TABEL)
        });
    }
};


// ==========================================
// LOGIC MOOD TRACKER (DROPDOWN)
// ==========================================

// 1. Data Opsi Mood
// 1. Data Opsi Mood (Labelnya sekarang pakai KUNCI KAMUS)
    const moodOptions = [
        { code: 'fire', icon: '🔥', label_key: 'mood_fire', color: 'bg-amber-100 text-amber-600' },
        { code: 'happy', icon: '😄', label_key: 'mood_happy', color: 'bg-emerald-100 text-emerald-600' },
        { code: 'neutral', icon: '😐', label_key: 'mood_neutral', color: 'bg-slate-100 text-slate-600' },
        { code: 'sad', icon: '😢', label_key: 'mood_sad', color: 'bg-blue-100 text-blue-600' },
        { code: 'stress', icon: '🤯', label_key: 'mood_stress', color: 'bg-rose-100 text-rose-600' },
        { code: 'sick', icon: '🤒', label_key: 'mood_sick', color: 'bg-purple-100 text-purple-600' },
    ];
// 2. State Dropdown
const showMoodDropdown = ref(false);

// 3. Computed: Mood apa yang aktif sekarang?
const currentMoodData = computed(() => {
    // Kalau database kosong, default ke 'fire' (biar kayak tampilan awal kamu)
    if (!props.savedMood) return moodOptions[0]; 
    // Kalau ada, cari datanya
    return moodOptions.find(m => m.code === props.savedMood) || moodOptions[0];
});

// 4. Action: Pilih Mood
const selectMood = (code) => {
    showMoodDropdown.value = false; // Tutup menu
    router.post(route('habits.mood'), {
        mood_code: code,
        period: props.monthQuery
    }, { preserveScroll: true });
};
</script>

<template>
    <Head title="Habit Tracker" />

    <AuthenticatedLayout>

        <div v-if="showDeleteModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
            
            <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showDeleteModal = false"></div>
            
            <div class="bg-white rounded-[2rem] p-6 md:p-8 w-full max-w-sm relative z-10 shadow-2xl animate-in zoom-in-95 text-center overflow-hidden">
                
                <div class="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">
                    🗑️
                </div>

                <h3 class="text-xl font-black text-slate-800 mb-2">
                    {{ $t('habit_delete_title') }}
                </h3>
                
                <p class="text-sm text-slate-500 mb-6 leading-relaxed">
                    {{ $t('habit_delete_desc') }} <br>
                    <span class="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        {{ habitToDelete?.name }}
                    </span>?
                </p>

                <div class="flex gap-3">
                    <button 
                        @click="showDeleteModal = false"
                        class="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                    >
                        {{ $t('habit_btn_cancel') }}
                    </button>
                    
                    <button 
                        @click="executeDelete"
                        class="flex-1 py-3 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200 transition transform hover:-translate-y-0.5"
                    >
                        {{ $t('habit_btn_delete_confirm') }}
                    </button>
                </div>

            </div>
        </div>

        <div v-if="showCopyModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showCopyModal = false"></div>
            
            <div class="bg-white rounded-[2rem] p-6 md:p-8 w-full max-w-sm relative z-10 shadow-2xl animate-in zoom-in-95 text-center overflow-hidden border border-slate-100">
                
                <div class="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">
                    📂
                </div>

                <h3 class="text-xl font-black text-slate-800 mb-2">
                    {{ $t('habit_copy_title') }}
                </h3>
                
                <p class="text-sm text-slate-500 mb-8 leading-relaxed">
                    {{ $t('habit_copy_desc') }}
                </p>

                <div class="flex gap-3">
                    <button 
                        @click="showCopyModal = false"
                        class="flex-1 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                    >
                        {{ $t('habit_btn_cancel') }}
                    </button>
                    
                    <button 
                        @click="executeCopy"
                        class="flex-1 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5"
                    >
                        {{ $t('habit_btn_copy_confirm') }}
                    </button>
                </div>

            </div>
        </div>
        
        <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showCreateModal = false"></div>
            <div class="bg-white rounded-[2rem] p-6 md:p-8 w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95">
                <div class="flex justify-between items-center mb-6">
    <h3 class="text-xl md:text-2xl font-black text-slate-800">
        {{ isEditing ? 'Edit Habit' : $t('habit_modal_title') }}
    </h3>
    
    <button @click="closeModal" class="bg-slate-100 w-8 h-8 rounded-full text-slate-500 hover:bg-slate-200 flex items-center justify-center transition">
        ✕
    </button>
</div>

                <form @submit.prevent="submitHabit" class="space-y-5">
                    <div>
                        <label class="text-xs font-bold text-slate-400 uppercase mb-2 block">{{ $t('habit_modal_question') }}</label>
                        <input v-model="form.name" class="w-full text-base md:text-lg font-bold py-3 px-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 transition" placeholder="Contoh: Lari Pagi" required>
                    </div>

                    <div>
                        <label class="text-xs font-bold text-slate-400 uppercase mb-2 block">{{ $t('habit_modal_icon') }}</label>
                        <div class="grid grid-cols-6 gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100 max-h-32 md:max-h-40 overflow-y-auto custom-scrollbar">
                            <button type="button" v-for="icon in iconList" :key="icon" @click="form.icon = icon"
                                class="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-lg md:text-xl hover:bg-white hover:shadow-sm transition"
                                :class="form.icon === icon ? 'bg-white shadow-md ring-2 ring-indigo-500 scale-110' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'">
                                {{ icon }}
                            </button>
                        </div>
                    </div>

                    <div class="flex gap-4 md:gap-6">
                        <div class="flex-1">
                            <label class="text-xs font-bold text-slate-400 uppercase mb-2 block">{{ $t('habit_modal_color') }}</label>
                            <div class="flex flex-wrap gap-2">
                                <button type="button" v-for="c in colorPalette" :key="c" @click="form.color = c" class="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition hover:scale-110" :style="{ backgroundColor: c }">
                                    <span v-if="form.color === c" class="text-white font-bold text-xs">✓</span>
                                </button>
                            </div>
                        </div>
                        <div class="flex-1">
                            <label class="text-xs font-bold text-slate-400 uppercase mb-2 block">{{ $t('habit_modal_target') }}: {{ form.monthly_target }}</label>
                            <input v-model="form.monthly_target" type="range" min="1" max="31" class="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer">
                        </div>
                    </div>

                    <div class="flex gap-3 pt-2">
    
    <button 
        v-if="isEditing"
        type="button" 
        @click="deleteFromEdit" 
        class="px-4 py-3 rounded-xl font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 transition flex items-center justify-center border border-rose-100"
        title="Hapus Habit"
    >
        🗑️
    </button>

    <button type="submit" class="flex-1 py-3 md:py-4 rounded-xl font-bold text-white bg-indigo-950 hover:bg-indigo-900 shadow-xl transition transform hover:-translate-y-1" :disabled="form.processing">
        {{ isEditing ? 'Update Habit' : $t('habit_modal_btn_save') }}
    </button>

</div>
                </form>
            </div>
        </div>

        <div class="bg-white border-b border-slate-100 sticky top-0 z-40">
            <div class="max-w-full mx-auto px-4 py-4 md:py-6">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    <div class="w-full md:w-auto text-left">
                        <div class="inline-flex items-center gap-2 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">
                            <span>📅</span> {{ todayDate }}
                        </div>
                        <h1 class="text-xl md:text-3xl font-black text-slate-800 tracking-tight">
                            {{ $t(greetingKey) }}, <span class="text-indigo-600">{{ user.name.split(' ')[0] }}</span>!
                        </h1>
                        <p class="text-slate-500 text-sm mt-1 hidden md:block">{{ $t('greet_subtitle') }}</p>
                    </div>

                    <div class="flex items-center justify-between w-full md:w-auto gap-3">
                        <div class="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1 flex-1 md:flex-none justify-center">
                            <button @click="changeMonth('prev')" class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition">‹</button>
                            
                            <span class="px-2 md:px-4 text-[10px] md:text-xs font-bold text-slate-700 uppercase tracking-wide min-w-[80px] text-center">{{ props.currentMonth }}</span>
                            
                            <button @click="changeMonth('next')" class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition">›</button>
                        </div>

                        <div class="hidden md:flex flex-col items-end mr-2">
                            <span class="text-[10px] font-bold text-slate-400 uppercase">Today</span>
                            <div class="flex items-center gap-2">
                                <div class="w-16 md:w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div class="h-full bg-emerald-500 rounded-full transition-all duration-500" :style="{ width: todayProgress + '%' }"></div>
                                </div>
                                <span class="text-xs font-black text-slate-700">{{ todayProgress }}%</span>
                            </div>
                        </div>

                        <button @click="openCreateModal" class="flex-shrink-0 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-lg hover:bg-indigo-700 transition">
                            <span>+</span> <span class="hidden sm:inline">{{ $t('habit_btn_new') }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full md:max-w-[95%] mx-auto md:px-2 pt-4 md:pt-8 pb-20">
            
            <div v-if="localHabits.length > 0" class="bg-white md:rounded-3xl shadow-sm md:shadow-[0_2px_20px_rgba(0,0,0,0.04)] border-y md:border border-slate-100 overflow-hidden relative">
                
                <div class="overflow-x-auto custom-scrollbar relative">
                    <div class="min-w-max">
                        
                        <div class="sticky top-0 z-30 bg-white border-b border-slate-100 flex shadow-sm">
                            
                            <div class="sticky left-0 z-40 bg-white w-36 md:w-72 border-r border-slate-100 p-3 md:p-4 flex items-center font-bold text-slate-400 text-[10px] md:text-xs uppercase tracking-wider">
                                <span class="truncate">Kebiasaan</span>
                            </div>

                            <div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5">
                                <div v-for="day in monthDates" :key="day.dateString" 
                                     class="w-8 flex flex-col items-center gap-1">
                                    <span class="text-[9px] md:text-[10px] font-bold text-slate-400 capitalize">
                                        {{ day.dayName }}
                                    </span>
                                    <span class="text-[10px] md:text-xs font-black text-slate-600" :class="day.isToday ? 'text-indigo-600 bg-indigo-50 px-1.5 rounded' : ''">{{ day.dayNumber }}</span>
                                </div>
                            </div>

                            <div class="hidden md:flex sticky right-0 z-40 bg-white w-32 p-4 border-l border-slate-100 items-center justify-end font-bold text-slate-400 text-xs uppercase tracking-wider shadow-[-10px_0_20px_rgba(255,255,255,0.8)]">
                                {{ $t('habit_table_total') }}
                            </div>
                        </div>



                        <div class="divide-y divide-slate-50">
                            <div v-for="(habit, hIndex) in localHabits" :key="habit.id" class="flex hover:bg-slate-50/50 transition-colors group">
                                
                              <div class="sticky left-0 z-20 w-36 md:w-72 bg-white group-hover:bg-slate-50 transition-colors border-r border-slate-100 p-3 md:p-4 flex items-center gap-3 md:gap-4 flex-shrink-0">
    
    <div class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center text-base md:text-xl bg-slate-50 border border-slate-100" :style="{ color: habit.color }">
        {{ habit.icon }}
    </div>
    
    <div class="min-w-0 flex-1">
                                        <h4 class="font-bold text-slate-700 truncate text-xs md:text-sm">
                                            {{ habit.name }}
                                        </h4>
                                        
                                        <div class="flex items-center gap-1 text-[10px] font-medium text-slate-400 mb-1.5 mt-0.5">
                                            <span>🎯 Target: {{ habit.monthly_target }}</span>
                                        </div>
                                        
                                        <div class="flex items-center gap-2">
                                            <div class="h-1 md:h-1.5 w-10 md:w-16 bg-slate-100 rounded-full overflow-hidden">
                                                <div class="h-full rounded-full transition-all duration-300" :style="{ width: habit.progress_percent + '%', backgroundColor: habit.color }"></div>
                                            </div>

                                            <button 
                                                @click="editHabit(habit)" 
                                                class="md:hidden text-slate-400 hover:text-indigo-600 px-1 active:scale-95 transition"
                                            >
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                            </button>

                                            <div class="hidden md:flex opacity-0 group-hover:opacity-100 transition items-center gap-1 bg-white/80 backdrop-blur-sm px-1 rounded-md absolute right-2 top-1/2 -translate-y-1/2 shadow-sm border border-slate-100 z-50">
                                                <button @click="editHabit(habit)" class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="Edit">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                </button>
                                                <button @click="confirmDelete(habit)" class="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition" title="Hapus">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
</div>

                                <div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5">
    
    <div v-for="(day, dIndex) in monthDates" :key="day.dateString" class="w-8 flex justify-center">
        
       <button 
    :id="`cell-${hIndex}-${dIndex}`"
    @keydown="handleGridNav($event, hIndex, dIndex, habit.id, day.dateString)"
    @click="toggleStatus(habit.id, day.dateString)"
    :disabled="day.isFuture"
    
    class="
        scroll-mt-24 md:scroll-mt-32 scroll-ml-36 md:scroll-ml-72 
        w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg flex items-center justify-center transition-all duration-75 relative outline-none focus:ring-4 focus:ring-fuchsia-400 focus:ring-offset-2 z-0 focus:z-20
    " 
    
    :class="{
        'shadow-sm text-white scale-100': getStatus(habit, day.dateString) === 'completed',
        'bg-slate-100 text-slate-400': getStatus(habit, day.dateString) === 'skipped',
        'bg-white border border-slate-200 hover:border-indigo-300': getStatus(habit, day.dateString) === 'empty' && !day.isFuture,
        'bg-slate-50 border border-slate-50 opacity-30 cursor-not-allowed': day.isFuture,
        'ring-2 ring-indigo-500 ring-offset-1 z-10': day.isToday
    }"
    :style="getStatus(habit, day.dateString) === 'completed' ? { backgroundColor: habit.color } : {}"
>
    <span v-if="getStatus(habit, day.dateString) === 'completed'" class="text-[10px] md:text-xs font-bold">✓</span>
    <span v-if="getStatus(habit, day.dateString) === 'skipped'" class="text-[10px] md:text-xs font-bold">-</span>
</button>
        
    </div>
</div>

                                <div class="hidden md:flex sticky right-0 z-20 w-32 bg-white group-hover:bg-slate-50 transition-colors border-l border-slate-100 p-4 flex-col justify-center shadow-[-10px_0_20px_rgba(255,255,255,0.8)]">
                                    <div class="flex justify-between items-end mb-1">
                                        <span class="text-lg font-black text-slate-700">{{ habit.progress_count }}</span>
                                        <span class="text-[10px] font-bold text-slate-400 mb-1">{{ Math.round(habit.progress_percent) }}%</span>
                                    </div>
                                    <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                        <div class="h-full rounded-full transition-all duration-500" :style="{ width: habit.progress_percent + '%', backgroundColor: habit.color }"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="bg-white rounded-3xl p-8 md:p-12 text-center shadow-lg border border-slate-100 mt-6 mx-4 md:mx-0">
    <div class="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-3xl md:text-4xl mx-auto mb-4">🌱</div>
    
    <h3 class="text-lg md:text-xl font-bold text-slate-800">{{ $t('habit_empty_title') }}</h3>
    <p class="text-sm md:text-base text-slate-500 mb-6">{{ $t('habit_empty_desc') }}</p>
    
    <div class="flex flex-col md:flex-row items-center justify-center gap-4">
        <button @click="openCreateModal" class="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition transform hover:-translate-y-1">
            + {{ $t('habit_btn_new') }}
        </button>

        <button 
            v-if="hasPrevHabits" 
            @click="openCopyModal" 
            class="px-6 py-3 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition"
        >
            📂 {{ $t('habit_salin_btn') }}
        </button>
    </div>
</div>



    <div v-if="localHabits.length > 0" class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-in slide-in-from-bottom-5 px-4 md:px-0">
                
                <div class="bg-indigo-600 rounded-2xl p-5 md:p-6 text-white shadow-xl shadow-indigo-200">
                    <div class="text-indigo-200 text-[10px] md:text-xs font-bold uppercase mb-1">{{ $t('stats_consistency') }}</div>
                    <div class="text-3xl md:text-4xl font-black mb-2">{{ overallPercentage }}%</div>
                    <div class="w-full bg-indigo-800 rounded-full h-2">
                        <div class="bg-white h-2 rounded-full" :style="{ width: overallPercentage + '%' }"></div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl md:text-2xl">✅</div>
                    <div>
                        <div class="text-slate-400 text-[10px] md:text-xs font-bold uppercase">{{ $t('stats_total_check') }}</div>
                        <div class="text-xl md:text-2xl font-black text-slate-800">{{ totalCompletions }}</div>
                    </div>
                </div>

               <div class="relative">
                    
                    <div v-if="showMoodDropdown" @click="showMoodDropdown = false" class="fixed inset-0 z-10 cursor-default"></div>

                    <button 
                        @click="showMoodDropdown = !showMoodDropdown"
                        class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition cursor-pointer text-left w-full h-full relative z-20"
                        :class="showMoodDropdown ? 'ring-2 ring-indigo-500 border-transparent' : ''"
                    >
                        <div 
                            class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl md:text-2xl transition-colors shrink-0"
                            :class="currentMoodData.color"
                        >
                            {{ currentMoodData.icon }}
                        </div>
                        
                        <div class="flex-1 min-w-0">
                            <div class="text-slate-400 text-[10px] md:text-xs font-bold uppercase flex justify-between items-center">
                                <span>{{ $t('stats_mood') }}</span>
                                <span class="text-[10px] opacity-50">▼</span>
                            </div>
                            <div class="text-lg md:text-xl font-black text-slate-800 truncate">
                                {{ $t(currentMoodData.label_key) }}
                            </div>
                        </div>
                    </button>

                    <div 
                        v-if="showMoodDropdown" 
                        class="absolute bottom-full mb-2 left-0 w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30 animate-in slide-in-from-bottom-2 grid grid-cols-1 gap-1 max-h-64 overflow-y-auto custom-scrollbar"
                    >
                        <button 
                            v-for="m in moodOptions" 
                            :key="m.code"
                            @click="selectMood(m.code)"
                            class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition w-full text-left"
                            :class="savedMood === m.code ? 'bg-indigo-50 border border-indigo-100' : ''"
                        >
                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0" :class="m.color">
                                {{ m.icon }}
                            </div>
                            
                            <span class="font-bold text-sm text-slate-700">{{ $t(m.label_key) }}</span>
                            
                            <span v-if="savedMood === m.code" class="ml-auto text-indigo-600 font-bold">✓</span>
                        </button>
                    </div>

                </div>
            </div>

        </div>
    </AuthenticatedLayout>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>