import { ref } from 'vue';

// State global agar saat diubah di Settings, seluruh app langsung tahu
const theme = ref('system');

export function useTheme() {
    const applyTheme = (val) => {
        const root = document.documentElement;
        if (val === 'dark' || (val === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    const initTheme = () => {
        const stored = localStorage.getItem('oneformind_theme');
        if (stored) {
            theme.value = stored;
        }
        applyTheme(theme.value);
    };

    const setTheme = (newTheme) => {
        theme.value = newTheme;
        localStorage.setItem('oneformind_theme', newTheme);
        applyTheme(newTheme);
    };

    return { theme, setTheme, initTheme };
}