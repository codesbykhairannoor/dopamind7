<script setup>
import { ref } from 'vue';
import { useClickOutside } from '@/Composables/Job/useJobUI';

const props = defineProps({ modelValue: String });
const emit = defineEmits(['update:modelValue', 'save']);

const isOpen = ref(false);

const containerRef = useClickOutside(() => { isOpen.value = false; });

const statusOptions = [
    { value: 'wishlist', label: 'job_status_wishlist', colorClass: 'bg-blue-50 text-blue-700 border-blue-200', hex: '#60a5fa' },
    { value: 'applied', label: 'job_status_applied', colorClass: 'bg-yellow-50 text-yellow-700 border-yellow-200', hex: '#facc15' },
    { value: 'interview', label: 'job_status_interview', colorClass: 'bg-purple-50 text-purple-700 border-purple-200', hex: '#c084fc' },
    { value: 'offer', label: 'job_status_offer', colorClass: 'bg-green-50 text-green-700 border-green-200', hex: '#4ade80' },
    { value: 'rejected', label: 'job_status_rejected', colorClass: 'bg-rose-50 text-rose-700 border-rose-200', hex: '#fb7185' },
    { value: 'accepted', label: 'job_status_accepted', colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200', hex: '#34d399' },
];

const getStatusOption = (val) => statusOptions.find(s => s.value === val) || statusOptions[0];

const selectStatus = (val) => {
    // Kalo milih status yg sama, ya biarin aja
    if (props.modelValue === val) {
        isOpen.value = false;
        return;
    }
    emit('update:modelValue', val);
    emit('save'); // Memicu auto-save instan di useJobs
    isOpen.value = false;
};
</script>

<template>
    <div class="relative w-full h-full flex items-center px-3 cursor-pointer group" ref="containerRef" @click="isOpen = !isOpen">
        <span class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border group-hover:shadow-sm"
            :class="getStatusOption(modelValue).colorClass">
            {{ $t(getStatusOption(modelValue).label, modelValue) }}
        </span>

        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
            <div v-if="isOpen" class="absolute top-full left-3 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                <div v-for="opt in statusOptions" :key="opt.value" @click.stop="selectStatus(opt.value)"
                    class="px-3 py-2.5 rounded-xl text-sm font-bold cursor-pointer hover:bg-slate-50 transition-colors flex items-center gap-3"
                    :class="modelValue === opt.value ? 'bg-slate-50 text-indigo-600' : 'text-slate-600'">
                    <span class="w-3 h-3 rounded-full flex-shrink-0" :style="{ backgroundColor: opt.hex }"></span>
                    <span class="truncate">{{ $t(opt.label, opt.value) }}</span>
                </div>
            </div>
        </Transition>
    </div>
</template>