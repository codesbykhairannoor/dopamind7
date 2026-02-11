<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    show: Boolean,
    form: Object, // Terima form dari parent
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
            
            <div @click="close" class="absolute inset-0 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-200"></div>
            
            <div class="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl z-10 p-6 animate-in zoom-in-95 duration-200">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-black text-slate-800">
                        {{ form.id ? '✏️ ' + $t('edit_source') : '✨ ' + $t('add_source') }}
                    </h3>
                    <button @click="close" class="bg-slate-50 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition">✕</button>
                </div>
                
                <form @submit.prevent="submit" class="space-y-5">
                    <div>
                        <label class="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">{{ $t('name') }}</label>
                        <div class="flex gap-2">
                            <div class="relative">
                                <button type="button" @click="showIconGrid = !showIconGrid" class="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-xl text-2xl border border-slate-100 hover:bg-slate-100 transition active:scale-95">
                                    {{ form.icon }}
                                </button>
                                
                                <div v-if="showIconGrid" class="absolute top-14 left-0 w-64 p-3 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 grid grid-cols-6 gap-2 animate-in fade-in zoom-in-95 duration-100">
                                    <button v-for="icon in iconPalette" :key="icon" type="button" @click="form.icon = icon; showIconGrid = false" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-emerald-50 text-lg transition">
                                        {{ icon }}
                                    </button>
                                </div>
                                <div v-if="showIconGrid" @click="showIconGrid = false" class="fixed inset-0 z-40"></div>
                            </div>

                            <input v-model="form.name" type="text" :placeholder="$t('placeholder_name')" class="flex-1 px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-700" required>
                        </div>
                    </div>

                    <div class="flex gap-2 pt-2">
                        <button type="button" @click="close" class="flex-1 py-3 text-slate-400 font-bold hover:bg-slate-50 hover:text-slate-600 rounded-xl transition">{{ $t('cancel') }}</button>
                        <button type="submit" class="flex-[2] py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 active:scale-95 transition-all" :disabled="form.processing">
                            {{ form.processing ? $t('saving') : $t('save') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>