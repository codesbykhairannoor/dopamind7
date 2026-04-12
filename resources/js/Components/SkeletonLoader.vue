<script setup>
defineProps({
    width: { type: String, default: '100%' },
    height: { type: String, default: '20px' },
    borderRadius: { type: String, default: '0.5rem' },
    className: { type: String, default: '' }
});
</script>

<template>
    <div 
        class="skeleton-shimmer bg-slate-200 dark:bg-slate-800"
        :class="className"
        :style="{ 
            width: width, 
            height: height, 
            borderRadius: borderRadius 
        }"
    ></div>
</template>

<style scoped>
.skeleton-shimmer {
    position: relative;
    overflow: hidden;
}

.skeleton-shimmer::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.2) 20%,
        rgba(255, 255, 255, 0.5) 60%,
        rgba(255, 255, 255, 0)
    );
    animation: shimmer 2s infinite;
}

.dark .skeleton-shimmer::after {
    background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.05) 20%,
        rgba(255, 255, 255, 0.1) 60%,
        rgba(255, 255, 255, 0)
    );
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>
