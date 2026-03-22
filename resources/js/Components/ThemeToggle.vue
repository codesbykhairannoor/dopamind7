<script setup>
import { useAppearance } from '@/Composables/useAppearance';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const { isDark, toggleTheme } = useAppearance();

const props = defineProps({
    collapsed: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <button 
        @click="toggleTheme" 
        class="group flex items-center gap-3 w-full rounded-xl transition-all duration-500 overflow-hidden relative"
        :class="[
            isDark ? 'bg-slate-800 text-amber-400 border-slate-700/50' : 'bg-slate-50 text-slate-500 border-slate-100/50',
            collapsed ? 'p-2 justify-center' : 'px-3 py-2.5 border'
        ]"
    >
        <!-- Background Animation -->
        <div 
            class="absolute inset-0 transition-transform duration-700 ease-in-out -z-10 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100"
            :class="isDark ? 'translate-x-full group-hover:translate-x-0' : '-translate-x-full group-hover:translate-x-0'"
        ></div>

        <div class="relative w-5 h-5 flex items-center justify-center shrink-0">
            <Transition name="theme-icon">
                <OneForMindIcon v-if="isDark" name="sun" size="18" stroke-width="2.5" class="absolute" />
                <OneForMindIcon v-else name="moon" size="18" stroke-width="2.5" class="absolute" />
            </Transition>
        </div>

        <Transition name="fade">
            <span v-if="!collapsed" class="text-xs font-bold whitespace-nowrap overflow-hidden">
                {{ isDark ? $t('theme_light', 'Light Mode') : $t('theme_dark', 'Dark Mode') }}
            </span>
        </Transition>

        <!-- Tooltip for Collapsed State -->
        <div v-if="collapsed" class="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-1 group-hover:translate-x-0 z-50 whitespace-nowrap">
            {{ isDark ? 'Light' : 'Dark' }}
        </div>
    </button>
</template>

<style scoped>
.theme-icon-enter-active, .theme-icon-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.theme-icon-enter-from {
    opacity: 0;
    transform: rotate(-90deg) scale(0.5);
}
.theme-icon-leave-to {
    opacity: 0;
    transform: rotate(90deg) scale(0.5);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateX(-5px);
}
</style>
