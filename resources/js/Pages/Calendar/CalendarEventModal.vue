<script setup>
import { computed } from 'vue';

const props = defineProps({
    show: Boolean,
    form: Object
});

const emit = defineEmits(['close', 'submit']);

const colorOptions = [
    { value: '#4f46e5', label: 'Indigo' }, // Default
    { value: '#0ea5e9', label: 'Sky' },
    { value: '#10b981', label: 'Emerald' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#f43f5e', label: 'Rose' },
    { value: '#8b5cf6', label: 'Purple' },
];
</script>

<template>
    <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            
            <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" @click="emit('close')"></div>

            <transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
            >
                <div v-if="show" class="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
                    
                    <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 class="text-xl font-black text-slate-800">
                            {{ form.id ? $t('calendar_edit_event', 'Edit Acara') : $t('calendar_add_event', 'Acara Baru') }}
                        </h3>
                        <button @click="emit('close')" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition-colors">
                            ✕
                        </button>
                    </div>

                    <div class="p-6 overflow-y-auto custom-scrollbar space-y-5">
                        
                        <div>
                            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('label_title', 'Judul Acara') }} <span class="text-rose-500">*</span></label>
                            <input v-model="form.title" type="text" class="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 font-bold focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300 placeholder:font-medium" :placeholder="$t('ph_event_title', 'Cth: Rapat BEM')" required autofocus>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('label_start_date', 'Mulai') }}</label>
                                <input v-model="form.start_date" type="date" class="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 font-bold focus:ring-2 focus:ring-indigo-500 transition-all">
                            </div>
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('label_end_date', 'Selesai (Opsional)') }}</label>
                                <input v-model="form.end_date" type="date" class="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 font-bold focus:ring-2 focus:ring-indigo-500 transition-all">
                            </div>
                        </div>

                        <div>
                            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('label_color', 'Warna Label') }}</label>
                            <div class="flex flex-wrap gap-3">
                                <button v-for="c in colorOptions" :key="c.value" type="button"
                                    @click="form.color = c.value"
                                    class="w-8 h-8 rounded-full transition-all border-2 flex items-center justify-center"
                                    :class="form.color === c.value ? 'scale-125 border-white shadow-md' : 'border-transparent hover:scale-110'"
                                    :style="`background-color: ${c.value};`">
                                    <span v-if="form.color === c.value" class="text-white text-xs">✓</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('label_description', 'Catatan Tambahan') }}</label>
                            <textarea v-model="form.description" rows="3" class="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300 resize-none" :placeholder="$t('ph_event_desc', 'Tulis detail acara di sini...')"></textarea>
                        </div>

                    </div>

                    <div class="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                        <button @click="emit('close')" type="button" class="flex-1 py-3.5 rounded-xl font-bold text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 transition-all active:scale-95">
                            {{ $t('btn_cancel', 'Batal') }}
                        </button>
                        <button @click="emit('submit')" type="button" :disabled="form.processing" class="flex-1 py-3.5 rounded-xl font-black text-white bg-indigo-600 shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2">
                            <span v-if="form.processing" class="animate-spin text-lg leading-none">↻</span>
                            <span>{{ form.processing ? $t('btn_saving', 'Menyimpan...') : $t('btn_save', 'Simpan Acara') }}</span>
                        </button>
                    </div>

                </div>
            </transition>
        </div>
    </transition>
</template>