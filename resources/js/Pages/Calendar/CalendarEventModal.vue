<script setup>
import { ref, computed } from 'vue';
import FinanceDatePicker from '../Finance/FinanceDatePicker.vue';
import dayjs from 'dayjs';
import { useFinanceFormat } from '@/Composables/Finance/useFinanceFormat';

const props = defineProps({
    show: Boolean,
    form: Object
});

const emit = defineEmits(['close', 'submit']);

const { appLocale } = useFinanceFormat();

const showStartDatePicker = ref(false);
const showEndDatePicker = ref(false);

const dateDisplay = (dateString, fallback = 'Pilih Tanggal') => {
    if (!dateString) return fallback;
    const loc = appLocale.value ? appLocale.value.split('-')[0] : 'id';
    return dayjs(dateString).locale(loc).format('DD MMM YYYY');
};

const colorOptions = [
    { value: '#4f46e5', label: 'color_indigo' }, 
    { value: '#0ea5e9', label: 'color_sky' },    
    { value: '#10b981', label: 'color_emerald' }, 
    { value: '#f59e0b', label: 'color_amber' },  
    { value: '#f43f5e', label: 'color_rose' },   
    { value: '#8b5cf6', label: 'color_purple' }, 
];
</script>

<template>
    <Teleport to="body">
        <transition
            enter-active-class="transition duration-300 ease-out" 
            enter-from-class="opacity-0 scale-95" 
            enter-to-class="opacity-100 scale-100" 
            leave-active-class="transition duration-200 ease-in" 
            leave-from-class="opacity-100 scale-100" 
            leave-to-class="opacity-0 scale-95"
        >
            <div v-if="show" class="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
                
                <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="emit('close')"></div>

                <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-white/50">
                    
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
                            <input v-model="form.title" type="text" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-800 font-bold focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300" :placeholder="$t('ph_event_title', 'Cth: Rapat BEM')" required autofocus>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="relative">
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('label_start_date', 'Mulai') }}</label>
                                <button type="button" @click="showStartDatePicker = !showStartDatePicker" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-700 font-bold hover:border-indigo-300 transition-all flex items-center justify-between">
                                    <span class="truncate">{{ dateDisplay(form.start_date, $t('select_date', 'Pilih Tanggal')) }}</span>
                                    <span class="text-slate-400">📅</span>
                                </button>
                                <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-4 sm:translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4 sm:translate-y-2">
                                    <div v-if="showStartDatePicker" class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:top-full sm:left-0 sm:mt-2 sm:origin-top-left sm:block sm:inset-auto">
                                        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm sm:hidden" @click="showStartDatePicker = false"></div>
                                        <FinanceDatePicker 
                                            :show="true" 
                                            :modelValue="form.start_date"
                                            @update:modelValue="(val) => form.start_date = val"
                                            @close="showStartDatePicker = false"
                                            class="relative z-10"
                                        />
                                    </div>
                                </transition>
                            </div>
                            <div class="relative">
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('label_end_date', 'Selesai (Opsional)') }}</label>
                                <button type="button" @click="showEndDatePicker = !showEndDatePicker" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-700 font-bold hover:border-indigo-300 transition-all flex items-center justify-between">
                                    <span class="truncate">{{ form.end_date ? dateDisplay(form.end_date) : $t('optional', 'Opsional') }}</span>
                                    <span v-if="form.end_date" @click.stop="form.end_date = ''" class="text-rose-400 hover:text-rose-600 transition-colors z-10 p-1">✕</span>
                                    <span v-else class="text-slate-400">📅</span>
                                </button>
                                <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-4 sm:translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4 sm:translate-y-2">
                                    <div v-if="showEndDatePicker" class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:top-full sm:right-0 sm:mt-2 sm:origin-top-right sm:block sm:inset-auto">
                                        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm sm:hidden" @click="showEndDatePicker = false"></div>
                                        <FinanceDatePicker 
                                            :show="true" 
                                            :modelValue="form.end_date"
                                            @update:modelValue="(val) => form.end_date = val"
                                            @close="showEndDatePicker = false"
                                            class="relative z-10"
                                        />
                                    </div>
                                </transition>
                            </div>
                        </div>

                        <div>
                            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                                {{ $t('label_color', 'Warna Label') }} <span class="text-slate-400 ml-1">({{ $t(colorOptions.find(c => c.value === form.color)?.label || 'color_indigo') }})</span>
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
                            <textarea v-model="form.description" rows="3" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300 resize-none" :placeholder="$t('ph_event_desc', 'Tulis detail acara di sini...')"></textarea>
                        </div>
                    </div>

                    <div class="p-5 border-t border-slate-100/80 bg-slate-50 flex gap-3">
                        <button @click="emit('close')" type="button" class="flex-1 py-3.5 rounded-xl font-bold text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 transition-all active:scale-95">
                            {{ $t('btn_cancel', 'Batal') }}
                        </button>
                        
                        <button @click="emit('submit')" type="button" :disabled="form.processing" class="flex-1 py-3.5 rounded-xl font-black text-white transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2" :style="`background-color: ${form.color}; box-shadow: 0 10px 15px -3px ${form.color}50;`">
                            <span v-if="form.processing" class="animate-spin text-lg leading-none">↻</span>
                            <span>{{ form.processing ? $t('btn_saving', 'Menyimpan...') : $t('btn_save', 'Simpan Acara') }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>