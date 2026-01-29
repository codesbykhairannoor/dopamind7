<script setup>
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';

// 🔥 PERBAIKAN DI SINI: Nama props harus PERSIS dengan yang dikirim Index.vue
const props = defineProps({
    show: Boolean,         // Pastikan dikirim dari :show="isBatchModalOpen"
    form: Object,         // Pastikan dikirim dari :form="batchForm"
    close: Function,
    submit: Function,
    addRow: Function,
    removeRow: Function,
    switchToSingle: Function // Pastikan ini terdaftar!
});
</script>

<template>
    <Modal :show="show" @close="close" maxWidth="5xl">
        <div class="bg-white rounded-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            
            <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0 z-10">
                <h2 class="text-xl font-black text-slate-800 flex items-center gap-2">
                    <span class="w-2 h-8 rounded-full bg-emerald-500"></span>
                    Batch Entry Mode 🚀
                </h2>
                
                <div class="flex items-center gap-2">
                    <button @click="switchToSingle" 
                        type="button"
                        class="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition flex items-center gap-1">
                        ↩️ Switch to Single
                    </button>
                    <button @click="close" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-500 transition font-bold">✕</button>
                </div>
            </div>

            <div class="p-6 overflow-y-auto custom-scrollbar bg-slate-50/50">
                <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div class="grid grid-cols-12 gap-3 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <div class="col-span-5">Activity Name</div>
                        <div class="col-span-2 text-center">Start</div>
                        <div class="col-span-2 text-center">End</div>
                        <div class="col-span-2">Priority</div>
                        <div class="col-span-1 text-center">Action</div>
                    </div>

                    <div class="divide-y divide-slate-100">
                        <div v-for="(task, index) in form.tasks" :key="index" 
                            class="grid grid-cols-12 gap-3 px-4 py-3 items-start hover:bg-slate-50 transition-colors group">
                            
                            <div class="col-span-5">
                                <TextInput v-model="task.title" placeholder="Deep work..." class="w-full text-sm py-2 px-3 !rounded-lg" />
                                <div v-if="form.errors[`tasks.${index}.title`]" class="text-[10px] text-rose-500 mt-1 font-bold">Wajib diisi</div>
                            </div>

                            <div class="col-span-2">
                                <input type="time" v-model="task.start_time" class="w-full border-slate-300 rounded-lg text-sm py-2 px-1 text-center font-mono focus:ring-emerald-500" />
                            </div>

                            <div class="col-span-2">
                                <input type="time" v-model="task.end_time" class="w-full border-slate-300 rounded-lg text-sm py-2 px-1 text-center font-mono focus:ring-emerald-500" />
                            </div>

                            <div class="col-span-2">
                                <select v-model="task.type" class="w-full border-slate-300 rounded-lg text-sm py-2 focus:ring-emerald-500">
                                    <option :value="1">🔥 Urgent</option>
                                    <option :value="2">⚡ Work</option>
                                    <option :value="3">☕ Normal</option>
                                </select>
                            </div>

                            <div class="col-span-1 flex justify-center pt-1.5">
                                <button @click="removeRow(index)" type="button" class="text-slate-300 hover:text-rose-500 transition" :disabled="form.tasks.length <= 1">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <button @click="addRow" type="button" class="mt-4 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold hover:bg-emerald-50 hover:border-emerald-400 transition">
                    + Add New Task
                </button>
            </div>

            <div class="px-6 py-4 bg-white border-t border-slate-100 flex justify-end gap-3 shrink-0">
                <SecondaryButton @click="close">Cancel</SecondaryButton>
                <PrimaryButton @click="submit" :disabled="form.processing" class="!bg-emerald-500 hover:!bg-emerald-600">
                    💾 Save All ({{ form.tasks.length }})
                </PrimaryButton>
            </div>
        </div>
    </Modal>
</template>