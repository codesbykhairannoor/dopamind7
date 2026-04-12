<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(['close']);

const page = usePage();
const user = page.props.auth.user;

// Preferensi lokal (clone dari user)
const preferences = ref({
    habit: { enabled: true, time: '07:00' },
    planner: { enabled: true, time: '08:00' },
    journal: { enabled: false, time: '20:00' },
    finance: { enabled: false, time: '09:00' },
});

onMounted(() => {
    if (user.notification_preferences) {
        preferences.value = JSON.parse(JSON.stringify(user.notification_preferences));
    }
});

const isSaving = ref(false);
const currentView = ref('inbox'); // 'inbox' or 'settings'

const savePreferences = () => {
    isSaving.value = true;
    router.post(route('notifications.update'), {
        preferences: preferences.value
    }, {
        onSuccess: () => {
            isSaving.value = false;
            currentView.value = 'inbox';
        },
        onError: () => {
            isSaving.value = false;
        }
    });
};

const modules = [
    { key: 'habit', label: 'Habit Tracker', icon: 'zap', color: 'text-orange-500' },
    { key: 'planner', label: 'Daily Planner', icon: 'calendar', color: 'text-indigo-500' },
    { key: 'journal', label: 'Daily Journal', icon: 'edit-3', color: 'text-emerald-500' },
    { key: 'finance', label: 'Finance Manager', icon: 'dollar-sign', color: 'text-rose-500' },
];

</script>

<template>
    <div v-if="isOpen" class="absolute right-0 top-full mt-2 z-[100] w-80 sm:w-96 origin-top-right">
        <!-- Overlay transparan untuk deteksi klik luar (opsional, tapi pakai ini agar simpel tanpa library) -->
        <div class="fixed inset-0 z-[-1]" @click="emit('close')"></div>

        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200">
            
            <!-- Header (Monday Style) -->
            <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <button 
                        v-if="currentView === 'settings'" 
                        @click="currentView = 'inbox'"
                        class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                    >
                        <OneForMindIcon name="chevron-left" size="16" stroke-width="2.5" />
                    </button>
                    <h3 class="text-sm font-black text-slate-800 dark:text-white tracking-tight">
                        {{ currentView === 'inbox' ? 'Notifications' : 'Email Reminders' }}
                    </h3>
                </div>
                <div class="flex items-center gap-1">
                    <button 
                        v-if="currentView === 'inbox'"
                        @click="currentView = 'settings'"
                        class="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all"
                        title="Reminder Settings"
                    >
                        <OneForMindIcon name="settings" size="16" />
                    </button>
                    <button @click="emit('close')" class="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                        <OneForMindIcon name="close" size="16" stroke-width="2.5" />
                    </button>
                </div>
            </div>

            <!-- Content Area -->
            <div class="max-h-[400px] overflow-y-auto">
                
                <!-- VIEW 1: INBOX (EMPTY STATE) -->
                <div v-if="currentView === 'inbox'" class="p-10 flex flex-col items-center text-center">
                    <div class="w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
                        <OneForMindIcon name="notification" size="48" stroke-width="1.5" class="text-indigo-500 opacity-60" />
                    </div>
                    <h4 class="text-base font-bold text-slate-700 dark:text-slate-200 mb-1">No new notifications</h4>
                    <p class="text-[12px] text-slate-500 dark:text-slate-400 max-w-[200px] leading-relaxed">
                        Kami akan memberi tahu jika ada sesuatu yang perlu perhatianmu.
                    </p>
                </div>

                <!-- VIEW 2: SETTINGS (REMINDERS) -->
                <div v-else class="p-5 space-y-4">
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium px-1 mb-2">
                        Atur waktu pengiriman reminder harian ke email kamu:
                    </p>
                    
                    <div v-for="mod in modules" :key="mod.key" 
                         class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm">
                        
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-lg flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <OneForMindIcon :name="mod.icon" size="16" :class="mod.color" />
                                </div>
                                <span class="text-[13px] font-bold text-slate-700 dark:text-slate-200">{{ mod.label }}</span>
                            </div>
                            <label class="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" v-model="preferences[mod.key].enabled" class="peer sr-only">
                                <div class="peer h-4 w-8 rounded-full bg-slate-200 dark:bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-focus:outline-none"></div>
                            </label>
                        </div>

                        <div v-if="preferences[mod.key].enabled" class="mt-3 flex items-center gap-3 pl-11">
                            <span class="text-[10px] font-black text-slate-400 tracking-wide">At:</span>
                            <input type="time" v-model="preferences[mod.key].time" 
                                   class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-[11px] font-bold text-slate-700 dark:text-white focus:ring-1 focus:ring-indigo-500 outline-none">
                        </div>
                    </div>

                    <!-- Action -->
                    <div class="pt-4 px-1">
                        <button 
                            @click="savePreferences"
                            :disabled="isSaving"
                            class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-[12px] uppercase tracking-wider transition-all active:scale-[0.97] flex items-center justify-center gap-2"
                        >
                            <svg v-if="isSaving" class="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            {{ isSaving ? 'Saving...' : 'Save Changes' }}
                        </button>
                    </div>
                </div>

            </div>

            <!-- Footer (Optional) -->
            <div v-if="currentView === 'inbox'" class="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                <button class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Mark all as read</button>
            </div>

        </div>
    </div>
</template>
