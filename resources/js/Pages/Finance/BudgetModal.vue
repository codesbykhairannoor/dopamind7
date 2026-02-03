<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';
import { useBudgetFormLogic } from '@/Composables/Finance/useBudgetFormLogic';

const props = defineProps({
    show: Boolean,
    form: Object,
    budgets: Array,
    close: Function,
    submit: Function
});

const { getCategoryDetails, formatRupiah, getCustomCategories } = useFinanceFormat();
const { 
    categories, isAddingNew, newCategoryInput, newCategoryIcon,
    iconsPalette, addNewCategory, toggleNewCategory, updateCategoryIcon, deleteCustomCategory
} = useBudgetFormLogic(props);

// local UI state
const showIconPicker = ref(false);
const editingIconFor = ref(null);
const refreshCounter = ref(0);

function openIconPickerFor(cat) {
    editingIconFor.value = cat;
    showIconPicker.value = true;
}

function selectIconFor(cat, icon) {
    const target = cat || editingIconFor.value;
    if (target) {
        updateCategoryIcon(target, icon);
        // small refresh so UI reflects new icon
        refreshCounter.value += 1;
    } else {
        newCategoryIcon.value = icon;
    }
    showIconPicker.value = false;
    editingIconFor.value = null;
}

function handleDeleteCategory(cat) {
    const name = getCategoryDetails(cat).name || cat;
    const ok = confirm(`Hapus kategori custom "${name}"? Budget yang sudah ada tidak akan dihapus; hanya ikon/nama custom akan dihilangkan.`);
    if (!ok) return;

    const deleted = deleteCustomCategory(cat);
    if (!deleted) {
        alert('Gagal menghapus kategori. Coba lagi.');
        return;
    }

    if (props.form.category === cat) props.form.category = 'others';
    refreshCounter.value += 1;
    showIconPicker.value = false;
    editingIconFor.value = null;
}

onMounted(() => {
    const handler = () => refreshCounter.value += 1;
    window.addEventListener('finance:custom-updated', handler);
    // also respond to generic event name in case other code dispatches it
    window.addEventListener('finance:custom-updated', handler);
    // store for cleanup
    window.__finance_budget_modal_handler = handler;
});
onUnmounted(() => {
    const handler = window.__finance_budget_modal_handler;
    if (handler) window.removeEventListener('finance:custom-updated', handler);
    delete window.__finance_budget_modal_handler;
});
// Logic Format Titik Real-time
const formatDisplay = (val) => {
    if (!val) return '';
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const onInput = (e) => {
    let value = e.target.value.replace(/\./g, ''); // Buang titiknya pas simpan ke form
    if (!isNaN(value)) props.form.limit_amount = value;
};
</script>

<template>
    <div v-if="show" :key="refreshCounter" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="close" class="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"></div>
        
        <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl z-10 p-8 animate-in zoom-in duration-200 relative">
            <h3 class="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6">
                {{ form.id ? '✏️ Edit Budget' : '🎯 Atur Budget' }}
            </h3>
            
            <form @submit.prevent="submit" class="space-y-4">
                <div>
                    <label class="block text-sm font-bold text-slate-600 mb-3">Kategori</label>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-44 overflow-y-auto p-2">
                        <div v-for="cat in categories" :key="cat" class="relative group">
                            <input type="radio" :id="'bud-'+cat" :value="cat" v-model="form.category" class="peer sr-only">
                            <label :for="'bud-'+cat" class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer peer-checked:bg-indigo-50 peer-checked:border-indigo-500 transition-all min-w-0">
                                <span class="w-8 h-8 flex items-center justify-center rounded-md bg-slate-50 text-lg">{{ getCategoryDetails(cat).icon }}</span>
                                <span class="text-sm font-semibold truncate">{{ getCategoryDetails(cat).name || cat }}</span>
                            </label>

                            <!-- Edit/Delete icons shown only for custom categories and on hover -->
                            <div v-if="getCustomCategories()[cat]" class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-2">
                                <button type="button" @click.prevent="(editingIconFor = cat, showIconPicker = true)" class="w-7 h-7 flex items-center justify-center rounded-md bg-white border text-slate-500 hover:bg-slate-50" title="Ubah ikon" aria-label="Ubah ikon">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/></svg>
                                </button>
                                <button type="button" @click.prevent="handleDeleteCategory(cat)" class="w-7 h-7 flex items-center justify-center rounded-md bg-white border text-rose-500 hover:bg-rose-50" title="Hapus kategori" aria-label="Hapus kategori">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 9a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1zm4 0a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1zM5 4a1 1 0 011-1h8a1 1 0 011 1v1H5V4z" clip-rule="evenodd"/></svg>
                                </button>
                            </div>
                        </div>
                        <button v-if="!isAddingNew" @click="toggleNewCategory" type="button" class="p-2 rounded-xl border border-dashed border-slate-300 text-xs font-bold text-slate-400 hover:bg-slate-50">+ Baru</button>
                    </div>

                    <div v-if="isAddingNew" class="mt-3 space-y-3">
                        <div class="flex gap-3">
                            <input v-model="newCategoryInput" type="text" placeholder="Nama kategori (contoh: Makan Malam)" class="flex-1 px-4 py-3 text-sm border rounded-lg outline-none" @keyup.enter="addNewCategory">
                            <div class="flex flex-col w-28">
                                <input v-model="newCategoryIcon" type="text" placeholder="Ikon (emoji)" class="w-full px-3 py-2 text-sm border rounded-lg outline-none text-center" maxlength="2">
                                <button type="button" @click.prevent="(editingIconFor = null, showIconPicker = !showIconPicker)" class="mt-2 text-xs text-slate-500 bg-slate-50 rounded-md py-1">Pilih ikon</button>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 flex items-center justify-center text-2xl rounded-md bg-slate-50 border">{{ newCategoryIcon }}</div>
                            <div class="text-sm text-slate-500">Preview: <span class="font-bold">{{ newCategoryInput || 'Nama' }}</span></div>
                            <div class="ml-auto flex gap-3">
                                <button @click="addNewCategory" type="button" class="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg shadow">Tambah</button>
                                <button @click="toggleNewCategory" type="button" class="px-4 py-2 bg-slate-100 text-slate-600 text-sm rounded-lg">Batal</button>
                            </div>
                        </div>

                    </div>

                    <!-- Absolute icon picker popover (does not expand modal) -->
                    <div v-if="showIconPicker" class="absolute z-40 right-6 top-24 p-3 bg-white border rounded-lg shadow-lg w-[260px]">
                        <div class="flex items-center justify-between mb-3">
                            <div class="text-sm font-bold">Pilih Ikon</div>
                            <button type="button" @click.prevent="(showIconPicker = false, editingIconFor = null)" class="text-xs text-slate-500 px-2 py-1 rounded-md hover:bg-slate-50">Tutup</button>
                        </div>
                        <div class="grid grid-cols-5 gap-2 max-h-44 overflow-y-auto">
                            <button v-for="ic in iconsPalette" :key="ic" type="button" @click.prevent="selectIconFor(editingIconFor, ic)" class="p-2 rounded-md bg-white border text-xl flex items-center justify-center">{{ ic }}</button>
                        </div>
                    </div>
                </div>


                <div>
                    <label class="block text-xs font-bold text-slate-500 mb-1">Batas Maksimal (Rp)</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                        <input 
                            type="text" 
                            :value="formatDisplay(form.limit_amount)" 
                            @input="onInput"
                            placeholder="0"
                            class="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500"
                        >
                    </div>
                </div>

                <div class="flex gap-3 pt-4">
                    <button type="button" @click="close" class="flex-1 py-3 text-slate-500 font-bold">Batal</button>
                    <button type="submit" class="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform">
                        {{ form.id ? 'Simpan' : 'Set Budget' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>