<script setup>
import { computed } from 'vue';

const props = defineProps({
    show: Boolean,
    form: Object
});

const emit = defineEmits(['close', 'submit']);

const colorOptions = [
    { value: '#4f46e5', label: 'color_indigo' }, // Indigo
    { value: '#0ea5e9', label: 'color_sky' },    // Sky
    { value: '#10b981', label: 'color_emerald' }, // Emerald
    { value: '#f59e0b', label: 'color_amber' },  // Amber
    { value: '#f43f5e', label: 'color_rose' },   // Rose
    { value: '#8b5cf6', label: 'color_purple' }, // Purple
];
</script>

<template>
    <Teleport to="body">
        <transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="show" class="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
                
                <div class="absolute inset-0 bg-slate-900/30 backdrop-blur-md transition-opacity" @click="emit('close')"></div>

                <transition
                    enter-active-class="transform transition ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-8 scale-95"
                    enter-to-class="opacity-100 translate-y-0 scale-100"
                    leave-active-class="transform transition ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 scale-100"
                    leave-to-class="opacity-0 translate-y-8 scale-95"
                >
                    <div v-if="show" class="bg-white dark:bg-slate-900/95 backdrop-blur-xl rounded-[2rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-white/50">
                        
                        <div class="px-6 py-5 border-b border-slate-100/80 flex items-center justify-between">
                            <h3 class="text-lg font-black text-slate-800 flex items-center gap-3">
                                <span class="w-3 h-3 rounded-full shadow-inner" :style="`background-color: ${form.color}`"></span>
                                {{ form.id ? $t('calendar_edit_event', 'Edit Acara') : $t('calendar_new_event', 'Acara Baru') }}
                            </h3>
                            <button @click="emit('close')" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <div class="p-6 overflow-y-auto custom-scrollbar space-y-5">
                            
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('label_title', 'Judul Acara') }} <span class="text-rose-500">*</span></label>
                                <input v-model="form.title" type="text" class="w-full bg-slate-100/50 border-none rounded-xl px-4 py-3 text-slate-800 font-bold focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300" :placeholder="$t('ph_event_title', 'Cth: Rapat BEM')" required autofocus>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('label_start_date', 'Mulai') }}</label>
                                    <input v-model="form.start_date" type="date" class="w-full bg-slate-100/50 border-none rounded-xl px-4 py-3 text-slate-700 font-bold focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('label_end_date', 'Selesai (Opsional)') }}</label>
                                    <input v-model="form.end_date" type="date" class="w-full bg-slate-100/50 border-none rounded-xl px-4 py-3 text-slate-700 font-bold focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer">
                                </div>
                            </div>

                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                                    {{ $t('label_color', 'Warna Label') }} <span class="text-slate-300 ml-1">({{ $t(colorOptions.find(c => c.value === form.color)?.label || 'color_indigo') }})</span>
                                </label>
                                <div class="flex flex-wrap gap-3">
                                    <button v-for="c in colorOptions" :key="c.value" type="button"
                                        @click="form.color = c.value"
                                        class="w-8 h-8 rounded-full transition-all border-[3px] flex items-center justify-center"
                                        :class="form.color === c.value ? 'scale-125 shadow-md' : 'border-transparent hover:scale-110 hover:shadow-sm'"
                                        :style="form.color === c.value ? `background-color: ${c.value}; border-color: ${c.value}40;` : `background-color: ${c.value};`"
                                        :title="$t(c.label)"
                                    >
                                        <svg v-if="form.color === c.value" class="w-3.5 h-3.5 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('label_description', 'Catatan Tambahan') }}</label>
                                <textarea v-model="form.description" rows="3" class="w-full bg-slate-100/50 border-none rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300 resize-none" :placeholder="$t('ph_event_desc', 'Tulis detail acara di sini...')"></textarea>
                            </div>
                        </div>

                        <div class="p-5 border-t border-slate-100/80 bg-slate-50/50 flex gap-3">
                            <button @click="emit('close')" type="button" class="flex-1 py-3.5 rounded-xl font-bold text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 hover:bg-slate-50 transition-all active:scale-95">
                                {{ $t('btn_cancel', 'Batal') }}
                            </button>
                            
                            <button @click="emit('submit')" type="button" :disabled="form.processing" class="flex-1 py-3.5 rounded-xl font-black text-white transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2" :style="`background-color: ${form.color}; box-shadow: 0 10px 15px -3px ${form.color}50;`">
                                <span v-if="form.processing" class="animate-spin text-lg leading-none">↻</span>
                                <span>{{ form.processing ? $t('btn_saving', 'Menyimpan...') : $t('btn_save', 'Simpan Acara') }}</span>
                            </button>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </Teleport>
</template>