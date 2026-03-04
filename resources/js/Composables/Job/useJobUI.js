import { ref, onMounted, onUnmounted } from 'vue';

export function useClickOutside(callback) {
    const containerRef = ref(null);

    const handleClickOutside = (event) => {
        // Kalau elemen yang diklik BUKAN bagian dari containerRef, jalankan fungsi callback (tutup)
        if (containerRef.value && !containerRef.value.contains(event.target)) {
            callback();
        }
    };

    onMounted(() => {
        document.addEventListener('mousedown', handleClickOutside);
    });

    onUnmounted(() => {
        document.removeEventListener('mousedown', handleClickOutside);
    });

    return containerRef;
}