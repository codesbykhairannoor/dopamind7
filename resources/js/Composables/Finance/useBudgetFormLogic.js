// resources/js/Composables/Finance/useBudgetFormLogic.js
import { ref, computed } from 'vue';

export function useBudgetFormLogic(props) {
    const isAddingNew = ref(false);
    const newCategoryInput = ref('');

    // Ambil kategori unik dari budget yang sudah ada + default
    const categories = computed(() => {
        const defaults = ['food', 'transport', 'bills', 'shopping', 'others'];
        // Pastikan props.budgets ada sebelum di-map
        const fromBudgets = (props.budgets || []).map(b => b.category);
        return [...new Set([...defaults, ...fromBudgets])];
    });

    const addNewCategory = () => {
        if (newCategoryInput.value.trim()) {
            // Ubah input jadi slug (contoh: "Makan Malam" -> "makan_malam")
            const slug = newCategoryInput.value.toLowerCase().replace(/\s+/g, '_');
            
            // Update langsung ke form yang dipassing lewat props
            props.form.category = slug;
            
            // Reset state input
            isAddingNew.value = false;
            newCategoryInput.value = '';
        }
    };

    const toggleNewCategory = () => {
        isAddingNew.value = !isAddingNew.value;
    };

    return {
        categories,
        isAddingNew,
        newCategoryInput,
        addNewCategory,
        toggleNewCategory
    };
}