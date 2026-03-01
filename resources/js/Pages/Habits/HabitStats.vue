<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import dayjs from 'dayjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
)

const props = defineProps({
  localHabits: Array,
  overallPercentage: Number,
  totalCompletions: Number,
  currentMoodData: Object,
  moodOptions: Array,
  savedMood: String,
  selectMood: Function
})

const showMoodDropdownLocal = ref(false)

// --- CHART DATA ---
const chartData = computed(() => ({
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'Progress',
      data: [40, 60, 45, 70, 55, 80, props.overallPercentage],
      borderColor: '#818cf8',
      backgroundColor: (ctx) => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 100)
        g.addColorStop(0, 'rgba(129,140,248,0.4)')
        g.addColorStop(1, 'rgba(129,140,248,0)')
        return g
      },
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 3
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  },
  scales: {
    x: { display: false },
    y: { display: false, min: 0, max: 100 }
  }
}

// --- LOGIC STATISTIK BARU 🔥 ---

// 1. MVP Habit (Habit paling sering dilakukan)
const topHabit = computed(() => {
  if (!props.localHabits?.length) return null
  return [...props.localHabits].sort(
    (a, b) => b.progress_count - a.progress_count
  )[0]
})

// 2. Active Streak (Berapa hari beruntun user aktif ngerjain minimal 1 habit)
const currentStreak = computed(() => {
    if (!props.localHabits?.length) return 0;
    let streak = 0;
    let date = dayjs();
    
    // Cek apakah hari ini ada minimal 1 habit yang selesai
    let todayDone = props.localHabits.some(h => h.logs && h.logs[date.format('YYYY-MM-DD')] === 'completed');

    // Kalau hari ini belum ngerjain, kita kasih toleransi (hitung streak dari kemarin)
    if (!todayDone) {
        date = date.subtract(1, 'day');
    }

    // Hitung mundur ke belakang selama masih ada habit yang dicentang
    while (true) {
        const dStr = date.format('YYYY-MM-DD');
        const isDone = props.localHabits.some(h => h.logs && h.logs[dStr] === 'completed');
        if (isDone) {
            streak++;
            date = date.subtract(1, 'day');
        } else {
            break;
        }
    }
    return streak;
});

// 3. Perfect Days (Berapa hari di mana SEMUA habit dicentang)
const perfectDaysCount = computed(() => {
    if (!props.localHabits?.length) return 0;
    let count = 0;
    
    // Kumpulkan semua tanggal unik yang pernah ada interaksi
    const allDates = new Set();
    props.localHabits.forEach(h => {
        if (h.logs) Object.keys(h.logs).forEach(d => allDates.add(d));
    });

    // Cek satu-satu tanggalnya
    allDates.forEach(date => {
        const isPerfect = props.localHabits.every(h => h.logs && h.logs[date] === 'completed');
        if (isPerfect) count++;
    });
    
    return count;
});

</script>

<template>
  <section v-if="localHabits.length" class="mt-16 pb-16 w-full">
    
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 px-4 md:px-0 md:max-w-[95%] mx-auto">

      <div class="md:col-span-5 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 relative overflow-hidden">
        <div class="relative z-10">
          <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">
            {{ $t('label_consistency', 'Konsistensi Bulan Ini') }}
          </span>
          <div class="flex items-end gap-1">
            <span class="text-4xl font-black text-slate-800">{{ overallPercentage }}</span>
            <span class="text-sm font-bold text-indigo-500 mb-1.5">%</span>
          </div>
        </div>
        <div class="absolute inset-x-0 bottom-0 h-24">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <div class="md:col-span-3 bg-indigo-600 rounded-[2.5rem] p-6 text-white shadow-xl shadow-indigo-100 flex flex-col justify-between group overflow-hidden relative">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        
        <div v-if="topHabit" class="relative z-10">
          <span class="text-[10px] font-black uppercase tracking-widest text-indigo-200 block mb-3">
            🏆 {{ $t('label_mvp_habit', 'Habit Terbaik') }}
          </span>
          <div class="text-3xl mb-1">{{ topHabit.icon }}</div>
          <div class="text-lg font-black truncate">{{ topHabit.name }}</div>
        </div>

        <div v-if="topHabit" class="mt-4 flex justify-between items-end relative z-10">
          <span class="text-[10px] font-bold uppercase text-indigo-200 leading-none">
            {{ $t('label_completed', 'Selesai') }}
          </span>
          <span class="text-2xl font-black leading-none">
            {{ topHabit.progress_count }}<span class="text-sm text-indigo-200">x</span>
          </span>
        </div>
      </div>

      <div class="md:col-span-4 relative">
        <button
          @click="showMoodDropdownLocal = !showMoodDropdownLocal"
          class="w-full h-full bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm flex items-center gap-5 text-left transition hover:border-indigo-200 hover:shadow-md"
        >
          <div class="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-inner shrink-0" :class="currentMoodData.color">
            {{ currentMoodData.icon }}
          </div>

          <div class="flex-1 min-w-0">
            <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
              {{ $t('label_mood_status', 'Mood Bulan Ini') }}
            </span>
            <div class="text-xl font-black truncate uppercase text-slate-800">
              {{ $t(currentMoodData.label_key) }}
            </div>
          </div>
        </button>

        <Transition name="pop">
          <div v-if="showMoodDropdownLocal" class="absolute bottom-full mb-4 left-0 w-full bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-3 z-30 grid grid-cols-2 gap-2">
            <button
              v-for="m in moodOptions"
              :key="m.code"
              @click="selectMood(m.code); showMoodDropdownLocal = false"
              class="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition"
              :class="savedMood === m.code ? 'bg-indigo-50 border border-indigo-100' : 'border border-transparent'"
            >
              <span class="text-xl">{{ m.icon }}</span>
              <span class="font-bold text-[10px] uppercase truncate">{{ $t(m.label_key).split(' ')[0] }}</span>
            </button>
          </div>
        </Transition>
      </div>

      <div class="md:col-span-4 bg-orange-50 border border-orange-100 rounded-[2.5rem] p-6 flex items-center gap-5 shadow-sm transform hover:-translate-y-1 transition duration-300">
        <div class="w-14 h-14 bg-white rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm text-orange-500 shrink-0">
          🔥
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-1">{{ $t('label_current_streak', 'Aktif Beruntun') }}</div>
          <div class="text-2xl font-black text-orange-600 leading-none">
            {{ currentStreak }} <span class="text-sm font-bold opacity-70">{{ $t('label_days', 'Hari') }}</span>
          </div>
        </div>
      </div>

      <div class="md:col-span-4 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] p-6 flex items-center gap-5 shadow-sm transform hover:-translate-y-1 transition duration-300">
        <div class="w-14 h-14 bg-white rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm text-emerald-500 shrink-0">
          🌟
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">{{ $t('label_perfect_days', 'Hari Sempurna') }}</div>
          <div class="text-2xl font-black text-emerald-600 leading-none">
            {{ perfectDaysCount }} <span class="text-sm font-bold opacity-70">{{ $t('label_days', 'Hari') }}</span>
          </div>
        </div>
      </div>

      <div class="md:col-span-4 bg-blue-50 border border-blue-100 rounded-[2.5rem] p-6 flex items-center gap-5 shadow-sm transform hover:-translate-y-1 transition duration-300">
        <div class="w-14 h-14 bg-white rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm text-blue-500 shrink-0">
          📝
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">{{ $t('label_total_checkins', 'Total Eksekusi') }}</div>
          <div class="text-2xl font-black text-blue-600 leading-none">
            {{ totalCompletions }} <span class="text-sm font-bold opacity-70">{{ $t('label_times', 'Kali') }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.pop-enter-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-leave-active {
  transition: all 0.2s ease-in;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
</style>