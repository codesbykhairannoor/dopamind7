<script setup>
const props = defineProps({
    show: Boolean,
    isEditing: Boolean,
    form: Object,
});

const emit = defineEmits(['close', 'submit']);

const statusOptions = [
    { value: 'wishlist', label: 'Wishlist' },
    { value: 'applied', label: 'Applied' },
    { value: 'interview', label: 'Interview' },
    { value: 'offer', label: 'Offer' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'accepted', label: 'Accepted' },
];
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
                <div class="fixed inset-0 bg-black/50" @click="emit('close')"></div>

                <div class="relative min-h-screen flex items-center justify-center p-4">
                    <div class="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
                        <!-- Header -->
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-black text-slate-800">
                                {{ isEditing ? 'Edit Job' : 'Add New Job' }}
                            </h2>
                            <button @click="emit('close')"
                                class="text-slate-400 hover:text-slate-600 transition-colors">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <!-- Form -->
                        <form @submit.prevent="emit('submit')" class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <!-- Title -->
                                <div>
                                    <label class="block text-sm font-bold text-slate-700 mb-2">Job Title *</label>
                                    <input v-model="form.title" type="text" required
                                        class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="e.g. Frontend Developer" />
                                </div>

                                <!-- Company -->
                                <div>
                                    <label class="block text-sm font-bold text-slate-700 mb-2">Company *</label>
                                    <input v-model="form.company" type="text" required
                                        class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="e.g. Google" />
                                </div>

                                <!-- Status -->
                                <div>
                                    <label class="block text-sm font-bold text-slate-700 mb-2">Status *</label>
                                    <select v-model="form.status" required
                                        class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                        <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </div>

                                <!-- Salary -->
                                <div>
                                    <label class="block text-sm font-bold text-slate-700 mb-2">Salary (IDR)</label>
                                    <input v-model="form.salary" type="number" step="0.01"
                                        class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="e.g. 15000000" />
                                </div>

                                <!-- Location -->
                                <div>
                                    <label class="block text-sm font-bold text-slate-700 mb-2">Location</label>
                                    <input v-model="form.location" type="text"
                                        class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="e.g. Jakarta, Indonesia" />
                                </div>

                                <!-- Applied Date -->
                                <div>
                                    <label class="block text-sm font-bold text-slate-700 mb-2">Applied Date</label>
                                    <input v-model="form.applied_date" type="date"
                                        class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                                </div>
                            </div>

                            <!-- Job URL -->
                            <div>
                                <label class="block text-sm font-bold text-slate-700 mb-2">Job URL</label>
                                <input v-model="form.job_url" type="url"
                                    class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="https://..." />
                            </div>

                            <!-- Notes -->
                            <div>
                                <label class="block text-sm font-bold text-slate-700 mb-2">Notes</label>
                                <textarea v-model="form.notes" rows="4"
                                    class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="Add any notes about this job..."></textarea>
                            </div>

                            <!-- Actions -->
                            <div class="flex gap-3 pt-4">
                                <button type="submit"
                                    class="flex-1 bg-indigo-600 text-white font-black py-3 px-6 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all">
                                    {{ isEditing ? 'Update Job' : 'Add Job' }}
                                </button>
                                <button type="button" @click="emit('close')"
                                    class="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 active:scale-95 transition-all">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
