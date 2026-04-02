import { ref, onMounted, onUnmounted } from "vue";
function useClickOutside(callback) {
  const containerRef = ref(null);
  const handleClickOutside = (event) => {
    if (containerRef.value && !containerRef.value.contains(event.target)) {
      callback();
    }
  };
  onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });
  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });
  return containerRef;
}
export {
  useClickOutside as u
};
