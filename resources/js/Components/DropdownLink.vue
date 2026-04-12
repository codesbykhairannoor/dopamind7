<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    href: {
        type: String,
        required: true,
    },
    prefetch: {
        type: [String, Array, Boolean],
        default: false,
    },
    viewTransition: {
        type: Boolean,
        default: false,
    }
});
</script>

<template>
    <Link
        :href="href"
        :prefetch="prefetch"
        :view-transition="viewTransition"
        class="block w-full px-4 py-2 text-start text-sm leading-5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800 transition duration-150 ease-in-out"
    >
        <slot />
    </Link>
</template>
