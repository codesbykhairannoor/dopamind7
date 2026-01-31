<script setup>
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';

// Props sesuai request (Wajib sama dengan Parent)
const props = defineProps({
    show: Boolean,        
    form: Object,        
    close: Function,
    submit: Function,
    addRow: Function,
    removeRow: Function,
    switchToSingle: Function
});
</script>

<template>
    <Modal :show="show" @close="close" maxWidth="4xl">
        <div class="bg-white rounded-2xl flex flex-col h-[80vh] shadow-2xl overflow-hidden relative">
            
            <div class="px-8 py-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 flex justify-between items-center shrink-0 z-20">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
                        <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-200 text-lg">
                            🚀
                        </span>
                        Batch Entry Mode
                    </h2>
                    <p class="text-slate-500 text-xs font-medium mt-1 ml-13">Input banyak task sekaligus dengan cepat.</p>
                </div>
                
                <div class="flex items-center gap-3">
                    <button @click="switchToSingle" 
                        type="button"
                        class="text-xs font-bold px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all flex items-center gap-2 group">
                        <span class="group-hover:-translate-x-0.5 transition-transform">↩️</span> 
                        Single Mode
                    </button>
                    <button @click="close" class="w-9 h-9 flex items-center justify-center rounded-full bg-white text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition shadow-sm border border-slate-100">
                        ✕
                    </button>
                </div>
            </div>

            <div class="flex-1 overflow-hidden flex flex-col bg-white relative">
                
                <div class="px-8 py-3 bg-slate-50 border-b border-slate-200 grid grid-cols-12 gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest sticky top-0 z-10 shadow-sm">
                    <div class="col-span-5 pl-2">Activity Name</div>
                    <div class="col-span-2 text-center">Start</div>
                    <div class="col-span-2 text-center">End</div>
                    <div class="col-span-2">Priority</div>
                    <div class="col-span-1 text-center">Action</div>
                </div>

                <div class="overflow-y-auto custom-scrollbar p-6 space-y-2">
                    <div v-for="(task, index) in form.tasks" :key="index" 
                        class="group grid grid-cols-12 gap-4 items-center p-2 rounded-xl border border-transparent hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200">
                        
                        <div class="col-span-5 relative">
                            <input 
                                type="text" 
                                v-model="task.title" 
                                placeholder="Tulis nama task..." 
                                class="w-full bg-slate-50 border-none rounded-lg text-sm font-semibold text-slate-700 placeholder-slate-400 px-3 py-2.5 focus:bg-white focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                autofocus
                            />
                            <div v-if="form.errors[`tasks.${index}.title`]" class="absolute -bottom-4 left-2 text-[9px] font-bold text-rose-500">
                                *Wajib diisi
                            </div>
                        </div>

                        <div class="col-span-2">
                            <input 
                                type="time" 
                                v-model="task.start_time" 
                                class="w-full bg-slate-50 border-none rounded-lg text-sm font-mono font-bold text-slate-600 text-center py-2.5 focus:bg-white focus:ring-2 focus:ring-emerald-500/50 cursor-pointer" 
                            />
                        </div>

                        <div class="col-span-2">
                            <input 
                                type="time" 
                                v-model="task.end_time" 
                                class="w-full bg-slate-50 border-none rounded-lg text-sm font-mono font-bold text-slate-600 text-center py-2.5 focus:bg-white focus:ring-2 focus:ring-emerald-500/50 cursor-pointer" 
                            />
                        </div>

                        <div class="col-span-2 relative">
                            <select v-model="task.type" class="w-full appearance-none bg-slate-50 border-none rounded-lg text-sm font-bold text-slate-600 py-2.5 pl-3 pr-8 focus:bg-white focus:ring-2 focus:ring-emerald-500/50 cursor-pointer">
                                <option :value="1">🔥 Urgent</option>
                                <option :value="2">⚡ Work</option>
                                <option :value="3">☕ Normal</option>
                            </select>
                            <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xs text-slate-400">▼</div>
                        </div>

                        <div class="col-span-1 flex justify-center">
                            <button @click="removeRow(index)" type="button" 
                                class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:bg-rose-100 hover:text-rose-500 transition-colors"
                                :class="{'opacity-0 pointer-events-none': form.tasks.length <= 1}"
                                title="Hapus baris ini">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>

                    <button @click="addRow" type="button" class="group w-full py-4 mt-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 transition-all flex items-center justify-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-emerald-200 group-hover:text-emerald-700 flex items-center justify-center text-xs transition-colors">+</span>
                        Tambah Baris Baru
                    </button>
                    
                    <div class="h-4"></div>
                </div>
            </div>

            <div class="px-8 py-5 bg-white border-t border-slate-100 flex justify-between items-center shrink-0 z-20">
                <div class="text-xs font-medium text-slate-400">
                    Total: <span class="font-bold text-slate-800">{{ form.tasks.length }} Tasks</span>
                </div>
                <div class="flex gap-3">
                    <SecondaryButton @click="close" class="border-none shadow-none text-slate-400 hover:text-slate-600 bg-transparent hover:bg-slate-50">
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton @click="submit" :disabled="form.processing" class="!bg-emerald-500 hover:!bg-emerald-600 !px-6 !py-3 !rounded-xl shadow-lg shadow-emerald-200 !text-sm flex items-center gap-2">
                        <span v-if="form.processing" class="animate-spin">⏳</span>
                        <span v-else>💾</span>
                        Save All Tasks
                    </PrimaryButton>
                </div>
            </div>
            
        </div>
    </Modal>
</template>

<style scoped>
/* Custom Scrollbar biar cantik di dalam modal */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #94a3b8;
}
</style>