import { router } from '@inertiajs/vue3';

/**
 * Proactively prefetch all accessible sidebar routes in the background.
 * Called once when AuthenticatedLayout mounts, with staggered delays
 * so we don't hammer the server all at once.
 *
 * This is why Notion/ClickUp feel instant: data is already in memory
 * BEFORE the user clicks anything.
 */
export function useBackgroundPrefetch(user) {
    const timeouts = [];

    const run = () => {
        const u = user?.value;
        if (!u) return;

        const planType = u.plan_type ?? 'explorer';
        const modules  = u.settings?.modules ?? {};
        const isArchitect = ['architect', 'quantum', 'legendary'].includes(planType);

        // Build the ordered list of URLs to prefetch
        const targets = [];

        // ---- Core (always free) ----
        if (modules.habit    !== false) targets.push(() => route('habits.index'));
        if (modules.finance  !== false) targets.push(() => route('finance.index'));
        if (modules.planner  !== false) targets.push(() => route('planner.index'));

        // ---- Architect+ only ----
        if (isArchitect) {
            if (modules.journal  !== false) targets.push(() => route('journal.index'));
            if (modules.calendar !== false) targets.push(() => route('calendar.index'));
            if (modules.job      !== false) targets.push(() => route('jobs.index'));
            if (modules.goal     !== false) targets.push(() => route('goals.index'));
        }

        // Stagger: start at 2 s, then +600 ms per route
        // → routes finish prefetching in the background before user typically navigates
        targets.forEach((getUrl, index) => {
            const delay = 2000 + index * 600;

            const t = setTimeout(() => {
                try {
                    const url = getUrl();
                    // cacheFor: 30 seconds — matches Inertia Link prefetch="hover" default
                    router.prefetch(url, {}, { cacheFor: 30 });
                } catch (_) {
                    // Silently ignore — route may not exist in this env / user navigated away
                }
            }, delay);

            timeouts.push(t);
        });
    };

    /** Call on onUnmounted to clear pending timers */
    const cancel = () => {
        timeouts.forEach(clearTimeout);
        timeouts.length = 0;
    };

    return { run, cancel };
}
