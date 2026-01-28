<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
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

const chartData = computed(() => ({
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'Progres',
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

const topHabit = computed(() => {
  if (!props.localHabits?.length) return null
  return [...props.localHabits].sort(
    (a, b) => b.progress_count - a.progress_count
  )[0]
})
</script>
<template>
  <!-- FOOTER CONTAINER -->
  <section
    v-if="localHabits.length"
    class="mt-16 pb-16 w-full"
  >
    <div
      class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 px-4 md:px-0 md:max-w-[95%] mx-auto"
    >

      <!-- KONSISTENSI -->
      <div
        class="md:col-span-5 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 relative overflow-hidden"
      >
        <div class="relative z-10">
          <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">
            Konsistensi
          </span>

          <div class="flex items-end gap-1">
            <span class="text-4xl font-black text-slate-800">
              {{ overallPercentage }}
            </span>
            <span class="text-sm font-bold text-indigo-500 mb-1.5">%</span>
          </div>
        </div>

        <div class="absolute inset-x-0 bottom-0 h-24">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <!-- MVP HABIT -->
      <div
        class="md:col-span-3 bg-indigo-600 rounded-[2.5rem] p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden"
      >
        <div v-if="topHabit">
          <span class="text-[10px] font-black uppercase tracking-widest text-indigo-200 block mb-3">
            MVP Habit
          </span>
          <div class="text-3xl mb-1">{{ topHabit.icon }}</div>
          <div class="text-lg font-black truncate">
            {{ topHabit.name }}
          </div>
        </div>

        <div class="mt-4 flex justify-between items-center">
          <span class="text-[10px] font-bold uppercase text-indigo-200">
            Check-ins
          </span>
          <span class="text-xl font-black">
            {{ totalCompletions }}
          </span>
        </div>
      </div>

      <!-- MOOD SELECTOR -->
      <div class="md:col-span-4 relative">
        <button
          @click="showMoodDropdownLocal = !showMoodDropdownLocal"
          class="w-full h-full bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm flex items-center gap-5 text-left"
        >
          <div
            class="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-inner"
            :class="currentMoodData.color"
          >
            {{ currentMoodData.icon }}
          </div>

          <div class="flex-1 min-w-0">
            <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
              Status Mood
            </span>
            <div class="text-xl font-black truncate uppercase">
              {{ $t(currentMoodData.label_key) }}
            </div>
          </div>
        </button>

        <!-- DROPDOWN KE ATAS (FOOTER FRIENDLY) -->
        <Transition name="pop">
          <div
            v-if="showMoodDropdownLocal"
            class="absolute bottom-full mb-4 left-0 w-full bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-3 z-30 grid grid-cols-2 gap-2"
          >
            <button
              v-for="m in moodOptions"
              :key="m.code"
              @click="selectMood(m.code); showMoodDropdownLocal = false"
              class="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50"
              :class="savedMood === m.code ? 'bg-indigo-50' : ''"
            >
              <span class="text-xl">{{ m.icon }}</span>
              <span class="font-bold text-[10px] uppercase truncate">
                {{ $t(m.label_key).split(' ')[0] }}
              </span>
            </button>
          </div>
        </Transition>
      </div>

    </div>
  </section>
</template>
<style scoped>.pop-enter-active {
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