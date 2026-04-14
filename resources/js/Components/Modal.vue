<script setup>
import { computed, onUnmounted, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['close']);

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

watch(
    () => props.show,
    (isOpen) => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', closeOnEscape);
            return;
        }

        document.body.style.overflow = null;
        document.removeEventListener('keydown', closeOnEscape);
    },
    { immediate: true }
);

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
    return {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[props.maxWidth];
});
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="ease-out duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="ease-in duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="show" class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-[80] flex items-center justify-center" scroll-region>
                <Transition
                    enter-active-class="ease-out duration-200"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-150"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div class="fixed inset-0 transform transition-all" @click="close">
                        <div class="absolute inset-0 bg-slate-500/70 dark:bg-slate-950/75" />
                    </div>
                </Transition>

                <Transition
                    enter-active-class="ease-out duration-200"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-150"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        class="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-visible shadow-xl dark:shadow-none transform transition-all sm:w-full sm:mx-auto border border-transparent dark:border-slate-800 m-auto"
                        :class="maxWidthClass"
                    >
                        <slot />
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
