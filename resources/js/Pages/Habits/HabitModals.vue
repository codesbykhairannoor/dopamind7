<script setup>
defineProps({
    // States
    showDeleteModal: Boolean,
    showCopyModal: Boolean,
    showCreateModal: Boolean,
    isEditing: Boolean,
    
    // Data & Forms
    form: Object,
    habitToDelete: Object,
    iconList: Array,
    colorPalette: Array,
    
    // Actions
    closeModal: Function, // Untuk menutup semua modal
    submitHabit: Function,
    executeDelete: Function,
    executeCopy: Function,
    deleteFromEdit: Function,
    
    // Helper buat nutup spesifik modal (optional, bisa pake closeModal semua)
    setShowDeleteModal: Function,
    setShowCopyModal: Function,
    setShowCreateModal: Function,
});
</script>

<template>
    <Teleport to="body">
    <div v-if="showDeleteModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeModal"></div>
        
        <div class="bg-white rounded-[2rem] p-6 md:p-8 w-full max-w-sm relative z-10 shadow-2xl animate-in zoom-in-95 text-center overflow-hidden">
            <div class="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">
                🗑️
            </div>
            <h3 class="text-xl font-black text-slate-800 mb-2">{{ $t('habit_delete_title') }}</h3>
            <p class="text-sm text-slate-500 mb-6 leading-relaxed">
                {{ $t('habit_delete_desc') }} <br>
                <span class="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{{ habitToDelete?.name }}</span>?
            </p>
            <div class="flex gap-3">
                <button @click="closeModal" class="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition">
                    {{ $t('habit_btn_cancel') }}
                </button>
                <button @click="executeDelete" class="flex-1 py-3 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200 transition transform hover:-translate-y-0.5">
                    {{ $t('habit_btn_delete_confirm') }}
                </button>
            </div>
        </div>
    </div>

    <div v-if="showCopyModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeModal"></div>
        
        <div class="bg-white rounded-[2rem] p-6 md:p-8 w-full max-w-sm relative z-10 shadow-2xl animate-in zoom-in-95 text-center overflow-hidden border border-slate-100">
            <div class="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">
                📂
            </div>
            <h3 class="text-xl font-black text-slate-800 mb-2">{{ $t('habit_copy_title') }}</h3>
            <p class="text-sm text-slate-500 mb-8 leading-relaxed">{{ $t('habit_copy_desc') }}</p>
            <div class="flex gap-3">
                <button @click="closeModal" class="flex-1 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition">
                    {{ $t('habit_btn_cancel') }}
                </button>
                <button @click="executeCopy" class="flex-1 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5">
                    {{ $t('habit_btn_copy_confirm') }}
                </button>
            </div>
        </div>
    </div>
    
    <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="closeModal"></div>
        <div class="bg-white rounded-[2rem] p-6 md:p-8 w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95">
            
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl md:text-2xl font-black text-slate-800">
                    {{ isEditing ? 'Edit Habit' : $t('habit_modal_title') }}
                </h3>
                <button @click="closeModal" class="bg-slate-100 w-8 h-8 rounded-full text-slate-500 hover:bg-slate-200 flex items-center justify-center transition">✕</button>
            </div>

            <form @submit.prevent="submitHabit" class="space-y-5">
                <div>
                    <label class="text-xs font-bold text-slate-400 uppercase mb-2 block">{{ $t('habit_modal_question') }}</label>
                    <input v-model="form.name" class="w-full text-base md:text-lg font-bold py-3 px-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 transition" placeholder="Contoh: Lari Pagi" required>
                </div>

                <div>
                    <label class="text-xs font-bold text-slate-400 uppercase mb-2 block">{{ $t('habit_modal_icon') }}</label>
                    <div class="grid grid-cols-6 gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100 max-h-32 md:max-h-40 overflow-y-auto custom-scrollbar">
                        <button type="button" v-for="icon in iconList" :key="icon" @click="form.icon = icon"
                            class="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-lg md:text-xl hover:bg-white hover:shadow-sm transition"
                            :class="form.icon === icon ? 'bg-white shadow-md ring-2 ring-indigo-500 scale-110' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'">
                            {{ icon }}
                        </button>
                    </div>
                </div>

                <div class="flex gap-4 md:gap-6">
                    <div class="flex-1">
                        <label class="text-xs font-bold text-slate-400 uppercase mb-2 block">{{ $t('habit_modal_color') }}</label>
                        <div class="flex flex-wrap gap-2">
                            <button type="button" v-for="c in colorPalette" :key="c" @click="form.color = c" class="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition hover:scale-110" :style="{ backgroundColor: c }">
                                <span v-if="form.color === c" class="text-white font-bold text-xs">✓</span>
                            </button>
                        </div>
                    </div>
                    <div class="flex-1">
                        <label class="text-xs font-bold text-slate-400 uppercase mb-2 block">{{ $t('habit_modal_target') }}: {{ form.monthly_target }}</label>
                        <input v-model="form.monthly_target" type="range" min="1" max="31" class="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer">
                    </div>
                </div>

                <div class="flex gap-3 pt-2">
                    <button v-if="isEditing" type="button" @click="deleteFromEdit" class="px-4 py-3 rounded-xl font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 transition flex items-center justify-center border border-rose-100" title="Hapus Habit">
                        🗑️
                    </button>
                    <button type="submit" class="flex-1 py-3 md:py-4 rounded-xl font-bold text-white bg-indigo-950 hover:bg-indigo-900 shadow-xl transition transform hover:-translate-y-1" :disabled="form.processing">
                        {{ isEditing ? 'Update Habit' : $t('habit_modal_btn_save') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
    </Teleport>
</template>