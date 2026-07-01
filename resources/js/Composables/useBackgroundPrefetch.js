import { router } from "@inertiajs/vue3";

/**
 * Background prefetch — safe version.
 *
 * Key changes vs the previous version:
 *  1. Uses requestIdleCallback so prefetch only fires when the browser
 *     has nothing else to do (no active navigation, no user interaction).
 *  2. Skips a slot if Inertia is currently navigating (isNavigating flag).
 *  3. Adds a minimum gap between individual requests (minGap) so we never
 *     fire two XHRs back-to-back and compete with the user.
 *  4. Falls back to setTimeout on browsers that don't support rIC (Safari < 16).
 *  5. Bails out entirely if the document is hidden (user switched tabs).
 */
export function useBackgroundPrefetch(user) {
    const handles = []; // rIC / setTimeout handles — for cleanup
    let isNavigating = false;

    // Track Inertia navigation state so we pause prefetch during transitions
    const unsubStart = router.on("start", () => {
        isNavigating = true;
    });
    const unsubFinish = router.on("finish", () => {
        isNavigating = false;
    });

    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------

    const rIC =
        typeof requestIdleCallback === "function"
            ? (cb, opts) => requestIdleCallback(cb, opts)
            : (cb) => setTimeout(cb, 200); // Safari fallback

    const cancelRIC =
        typeof cancelIdleCallback === "function"
            ? cancelIdleCallback
            : clearTimeout;

    // Attempt to prefetch a single URL — only when idle + not navigating.
    const prefetchOne = (getUrl) => {
        // Don't prefetch while navigating or tab is hidden
        if (isNavigating || document.hidden) return;

        try {
            const url = getUrl();
            // cacheFor 60 s — double the default so back-navigation is instant too
            router.prefetch(url, {}, { cacheFor: 60 });
        } catch (_) {
            // Route helper may throw if route doesn't exist in this build
        }
    };

    // ---------------------------------------------------------------------------
    // Main entry point
    // ---------------------------------------------------------------------------

    const run = () => {
        const u = user?.value;
        if (!u) return;

        const planType = u.plan_type ?? "explorer";
        const modules = u.settings?.modules ?? {};
        const isArchitect = ["architect", "quantum", "legendary"].includes(
            planType,
        );

        // Build ordered list — most-likely-visited routes first
        const targets = [];

        // Core (free for everyone)
        if (modules.habit !== false) targets.push(() => route("habits.index"));
        if (modules.finance !== false)
            targets.push(() => route("finance.index"));
        if (modules.planner !== false)
            targets.push(() => route("planner.dashboard"));

        // Architect+ only
        if (isArchitect) {
            if (modules.journal !== false)
                targets.push(() => route("journal.index"));
            if (modules.calendar !== false)
                targets.push(() => route("calendar.index"));
            if (modules.job !== false) targets.push(() => route("jobs.index"));
            if (modules.goal !== false)
                targets.push(() => route("goals.index"));
        }

        // Schedule each prefetch in its own idle callback, with a minimum
        // gap of 1 s between them so we never overwhelm the server.
        //
        // Timeline (example, 7 routes):
        //   idle slot 1 → habits   (fires when browser is idle after ~3 s)
        //   idle slot 2 → finance  (fires when browser is idle after ~4 s)
        //   …
        //
        // The timeout option tells the browser "please run this within N ms
        // even if not perfectly idle" — we use a generous 8 s max so it
        // doesn't just silently skip.
        const MIN_START_DELAY = 3000; // Wait at least 3 s after mount
        const GAP_BETWEEN = 1000; // At least 1 s between requests

        targets.forEach((getUrl, index) => {
            const minDelay = MIN_START_DELAY + index * GAP_BETWEEN;

            // Use a setTimeout outer shell to enforce the minimum delay,
            // then hand off to rIC for the actual "is the browser idle?" check.
            const outer = setTimeout(() => {
                const h = rIC(
                    () => prefetchOne(getUrl),
                    { timeout: 8000 }, // give up after 8 s if never idle
                );
                handles.push({ type: "ric", h });
            }, minDelay);

            handles.push({ type: "timeout", h: outer });
        });
    };

    // ---------------------------------------------------------------------------
    // Cleanup — call on onUnmounted
    // ---------------------------------------------------------------------------

    const cancel = () => {
        handles.forEach(({ type, h }) => {
            if (type === "timeout") clearTimeout(h);
            else cancelRIC(h);
        });
        handles.length = 0;

        // Remove Inertia event listeners
        unsubStart();
        unsubFinish();
    };

    return { run, cancel };
}
