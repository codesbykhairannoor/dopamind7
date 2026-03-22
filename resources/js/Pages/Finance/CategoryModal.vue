<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    show: Boolean,
    form: Object, 
    close: Function,
    submit: Function
});

const showIconGrid = ref(false);
const iconPalette = ['💰','💸','🏦','💎','🎥','🎤','🚗','🏠','🎓','🛒','🔧','🎨','🖥️','📱','🪙','💵'];

watch(() => props.show, (val) => {
    if (val) {
        showIconGrid.value = false;
    }
});
</script>

<template>
    <Teleport to="body">
        <div v-if="show" class="fixed inset-0 z-[101] flex items-center justify-center p-4">
            
            <div @click="close" class="absolute inset-0 bg-slate-900/30 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-200"></div>
            
            <div class="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] shadow-2xl dark:shadow-none z-10 p-6 animate-in zoom-in-95 duration-200 border border-transparent dark:border-slate-800 transition-all duration-500 transition-colors duration-500">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-black text-slate-800 dark:text-white transition-colors duration-500">
                        {{ form.id ? '✏️ ' + $t('edit_source') : '✨ ' + $t('add_source') }}
                    </h3>
                    <button @click="close" class="bg-slate-50 dark:bg-slate-800 p-2 rounded-full text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300">✕</button>
                </div>
                
                <form @submit.prevent="submit" class="space-y-5">
                    <div>
                        <label class="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-600 tracking-widest mb-1.5 transition-colors duration-500">{{ $t('name') }}</label>
                        <div class="flex gap-2">
                            <div class="relative">
                                <button type="button" @click="showIconGrid = !showIconGrid" class="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl text-2xl border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-95 duration-300">
                                    {{ form.icon }}
                                </button>
                                
                                <div v-if="showIconGrid" class="absolute top-14 left-0 w-64 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-700 z-50 grid grid-cols-6 gap-2 animate-in fade-in zoom-in-95 duration-100">
                                    <button v-for="icon in iconPalette" :key="icon" type="button" @click="form.icon = icon; showIconGrid = false" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-lg transition-all duration-300">
                                        {{ icon }}
                                    </button>
                                </div>
                                <div v-if="showIconGrid" @click="showIconGrid = false" class="fixed inset-0 z-40"></div>
                            </div>

                            <input v-model="form.name" type="text" :placeholder="$t('placeholder_name')" class="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-700 dark:text-slate-200 transition-all duration-500 placeholder:dark:text-slate-600">
                        </div>
                    </div>

                    <div class="flex gap-2 pt-2">
                        <button type="button" @click="close" class="flex-1 py-3 text-slate-400 dark:text-slate-500 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 rounded-xl transition-all duration-300">{{ $t('cancel') }}</button>
                        <button type="submit" class="flex-[2] py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg dark:shadow-none shadow-emerald-200 dark:shadow-emerald-900/20 active:scale-95 transition-all duration-300" :disabled="form.processing">
                            {{ form.processing ? $t('saving') : $t('save') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>