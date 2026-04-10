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

const dateDisplay = (dateString, fallback = 'Select date') => {
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

                <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl dark:shadow-none w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-white/50 dark:ring-slate-800 transition-colors duration-500">
                    
                    <div class="px-8 py-6 border-b border-slate-100/80 dark:border-slate-800 flex items-center justify-between transition-colors duration-500">
                        <h3 class="text-xl font-black text-slate-800 dark:text-white flex items-center gap-4 transition-colors duration-500">
                            <span class="w-4 h-4 rounded-full shadow-lg" :style="`background-color: ${form.color}`"></span>
                            {{ form.id ? $t('calendar_edit_event', 'Edit event') : $t('calendar_new_event', 'Create new event') }}
                        </h3>
                        <button @click="emit('close')" class="w-10 h-10 flex items-center justify-center rounded-[1rem] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <div class="p-8 overflow-y-auto custom-scrollbar space-y-6 bg-slate-50/20 dark:bg-slate-950/20">
                        <div>
                            <label class="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500 ml-1 uppercase tracking-widest">{{ $t('label_title', 'Event title') }} <span class="text-rose-500">*</span></label>
                            <input v-model="form.title" type="text" class="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-800 dark:text-white font-black text-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 transition-colors duration-500 shadow-sm" :placeholder="$t('ph_event_title', 'E.g. Strategy session')" required autofocus>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div class="relative">
                                <label class="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500 ml-1 uppercase tracking-widest">{{ $t('label_start_date', 'Start date') }}</label>
                                <button type="button" @click="showStartDatePicker = !showStartDatePicker" class="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-700 dark:text-slate-300 font-bold hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all flex items-center justify-between transition-colors duration-500 shadow-sm">
                                    <span class="truncate">{{ dateDisplay(form.start_date, $t('select_date', 'Select date')) }}</span>
                                    <span class="text-slate-400 dark:text-slate-600 opacity-50">📅</span>
                                </button>
                                <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4">
                                    <div v-if="showStartDatePicker" class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:top-full sm:left-0 sm:mt-3 sm:origin-top-left sm:block sm:inset-auto">
                                        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm sm:hidden" @click="showStartDatePicker = false"></div>
                                        <FinanceDatePicker 
                                            :show="true" 
                                            :modelValue="form.start_date"
                                            @update:modelValue="(val) => form.start_date = val"
                                            @close="showStartDatePicker = false"
                                            class="relative z-10 shadow-2xl"
                                        />
                                    </div>
                                </transition>
                            </div>
                            <div class="relative">
                                <label class="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500 ml-1 uppercase tracking-widest">{{ $t('label_end_date', 'End date') }}</label>
                                <button type="button" @click="showEndDatePicker = !showEndDatePicker" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-700 dark:text-slate-300 font-bold hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all flex items-center justify-between transition-colors duration-500 shadow-sm">
                                    <span class="truncate">{{ form.end_date ? dateDisplay(form.end_date) : $t('optional', 'Optional') }}</span>
                                    <span v-if="form.end_date" @click.stop="form.end_date = ''" class="text-rose-400 hover:text-rose-600 transition-colors z-10 p-1">✕</span>
                                    <span v-else class="text-slate-400 dark:text-slate-600 opacity-50">📅</span>
                                </button>
                                <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4">
                                    <div v-if="showEndDatePicker" class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-0 sm:absolute sm:top-full sm:right-0 sm:mt-3 sm:origin-top-right sm:block sm:inset-auto">
                                        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm sm:hidden" @click="showEndDatePicker = false"></div>
                                        <FinanceDatePicker 
                                            :show="true" 
                                            :modelValue="form.end_date"
                                            @update:modelValue="(val) => form.end_date = val"
                                            @close="showEndDatePicker = false"
                                            class="relative z-10 shadow-2xl"
                                        />
                                    </div>
                                </transition>
                            </div>
                        </div>

                        <div>
                            <label class="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-3 transition-colors duration-500 ml-1 uppercase tracking-widest">
                                {{ $t('label_color', 'Pick a category color') }}
                            </label>
                            <div class="flex flex-wrap gap-4">
                                <button v-for="c in colorOptions" :key="c.value" type="button"
                                    @click="form.color = c.value"
                                    class="w-10 h-10 rounded-2xl transition-all border-4 flex items-center justify-center shadow-sm"
                                    :class="form.color === c.value ? 'scale-110' : 'border-transparent hover:scale-105 opacity-60 hover:opacity-100'"
                                    :style="form.color === c.value ? `background-color: ${c.value}; border-color: ${c.value}30;` : `background-color: ${c.value};`"
                                    :title="$t(c.label)"
                                >
                                    <svg v-if="form.color === c.value" class="w-4 h-4 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path></svg>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label class="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 transition-colors duration-500 ml-1 uppercase tracking-widest">{{ $t('label_description', 'Notes') }}</label>
                            <textarea v-model="form.description" rows="4" class="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] px-5 py-4 text-slate-700 dark:text-slate-300 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none transition-colors duration-500 shadow-sm" :placeholder="$t('ph_event_desc', 'Briefly describe this event...')"></textarea>
                        </div>
                    </div>

                    <div class="p-8 border-t border-slate-100/80 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex gap-4 transition-colors duration-500">
                        <button @click="emit('close')" type="button" class="flex-1 py-4 rounded-2xl font-black text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                            {{ $t('btn_cancel', 'Cancel') }}
                        </button>
                        
                        <button @click="emit('submit')" type="button" :disabled="form.processing" class="flex-1 py-4 rounded-2xl font-black text-white transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 transition-all duration-500" :style="`background-color: ${form.color}; box-shadow: ${$page.props.isDark ? 'none' : '0 15px 25px -5px ' + form.color + '50'};`" text-white>
                            <span v-if="form.processing" class="animate-spin text-xl leading-none">↻</span>
                            <span>{{ form.processing ? $t('btn_saving', 'Saving...') : $t('btn_save', 'Save event') }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<style scoped>
/* Custom styled scrollbar for a premium feel */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-slate-200 dark:bg-slate-800 rounded-full;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    @apply bg-slate-300 dark:bg-slate-700;
}
</style>