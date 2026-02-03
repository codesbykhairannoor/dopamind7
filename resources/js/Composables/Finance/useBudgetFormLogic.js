// resources/js/Composables/Finance/useBudgetFormLogic.js
import { ref, computed } from 'vue';

export function useBudgetFormLogic(props) {
    const isAddingNew = ref(false);
    const newCategoryInput = ref('');
    const newCategoryIcon = ref('📦');

    const CUSTOM_KEY = 'finance_custom_categories_v1';
    const readCustom = () => {
        try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) || '{}'); } catch(e){ return {}; }
    };

    // small reactive counter to force recompute when custom categories change
    const customVersion = ref(0);

    // Ambil kategori unik dari budget yang sudah ada + default + custom dari localStorage
    const categories = computed(() => {
        // depend on customVersion so it recomputes when we add new ones
        const _v = customVersion.value;
        const defaults = ['food', 'transport', 'bills', 'shopping', 'others'];
        const fromBudgets = (props.budgets || []).map(b => b.category);
        const custom = Object.keys(readCustom());
        return [...new Set([...defaults, ...fromBudgets, ...custom])];
    });

    const iconsPalette = ['🍔','🍜','☕','🛵','⚡','🛍️','💰','📦','🎯','🍎','🚕','🏠','💡','🧾','🍳','🍩','🥤','🎁','⚖️','📈'];

    const addNewCategory = () => {
        const name = newCategoryInput.value.trim();
        if (name) {
            const slug = name.toLowerCase().replace(/\s+/g, '_');
            // Simpan ke localStorage sebagai custom category dengan icon
            try {
                const map = readCustom();
                map[slug] = { name, icon: newCategoryIcon.value || '📦' };
                localStorage.setItem(CUSTOM_KEY, JSON.stringify(map));
                // bump version to make categories recompute reactively
                customVersion.value += 1;
                // notify other components to update
                window.dispatchEvent(new CustomEvent('finance:custom-updated'));
            } catch (e) { /* ignore */ }

            // Set form value ke slug yang baru dibuat
            props.form.category = slug;

            // Reset UI
            isAddingNew.value = false;
            newCategoryInput.value = '';
            newCategoryIcon.value = '📦';
        }
    };

    const updateCategoryIcon = (slug, icon) => {
        try {
            const map = readCustom();
            // create entry if not exist (allow overriding defaults)
            if (!map[slug]) map[slug] = { name: slug, icon: icon || '📦' };
            else map[slug].icon = icon || '📦';
            localStorage.setItem(CUSTOM_KEY, JSON.stringify(map));
            customVersion.value += 1;
            window.dispatchEvent(new CustomEvent('finance:custom-updated'));
            return true;
        } catch (e) { return false; }
    };

    const toggleNewCategory = () => {
        isAddingNew.value = !isAddingNew.value;
    };

    const deleteCustomCategory = (slug) => {
        try {
            const map = readCustom();
            if (!map[slug]) return false;
            delete map[slug];
            localStorage.setItem(CUSTOM_KEY, JSON.stringify(map));
            customVersion.value += 1;
            window.dispatchEvent(new CustomEvent('finance:custom-updated'));
            return true;
        } catch (e) { return false; }
    };

    return {
        categories,
        isAddingNew,
        newCategoryInput,
        newCategoryIcon,
        iconsPalette,
        addNewCategory,
        toggleNewCategory,
        updateCategoryIcon,
        deleteCustomCategory
    };
}