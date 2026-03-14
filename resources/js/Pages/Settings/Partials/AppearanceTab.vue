<script setup>
import { useForm } from '@inertiajs/vue3';

const props = defineProps({ userSettings: Object });

const form = useForm({
    settings: {
        modules: {
            habit: props.userSettings?.modules?.habit ?? true, 
            planner: props.userSettings?.modules?.planner ?? true,
            finance: props.userSettings?.modules?.finance ?? true, 
            journal: props.userSettings?.modules?.journal ?? true, 
            calendar: props.userSettings?.modules?.calendar ?? true,
            job: props.userSettings?.modules?.job ?? true,
            goal: props.userSettings?.modules?.goal ?? true,
        }
    }
});

const saveSettings = () => {
    form.post(route('settings.update'), { 
        preserveScroll: true,
    });
};
</script>

<template>
    <div class="space-y-8">
        <div>
            <h3 class="text-lg font-black text-slate-800 tracking-tight">{{ $t('settings_modules_title', 'Modul Aplikasi') }}</h3>
            <p class="text-xs font-bold text-slate-400 mt-1">{{ $t('settings_modules_desc', 'Aktifkan atau nonaktifkan fitur yang ingin kamu gunakan.') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Loop through modules -->
            <div v-for="(enabled, key) in form.settings.modules" :key="key" 
                class="group flex items-center justify-between p-5 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-all">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                        <template v-if="key === 'habit'">🌱</template>
                        <template v-else-if="key === 'planner'">📋</template>
                        <template v-else-if="key === 'finance'">💸</template>
                        <template v-else-if="key === 'journal'">📓</template>
                        <template v-else-if="key === 'calendar'">📅</template>
                        <template v-else-if="key === 'job'">💼</template>
                        <template v-else-if="key === 'goal'">🎯</template>
                    </div>
                    <div>
                        <h4 class="font-black text-slate-700 text-sm capitalize">{{ key }}</h4>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ $t('module_status_active', 'Status Aktif') }}</p>
                    </div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="form.settings.modules[key]" class="sr-only peer" @change="saveSettings">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 shadow-inner border border-slate-100"></div>
                </label>
            </div>
        </div>

        <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="form.recentlySuccessful" class="text-center bg-emerald-50 text-emerald-600 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm shadow-emerald-100/50 flex items-center justify-center gap-2">
                <span>✨</span> {{ $t('settings_saved', 'Tersimpan!') }}
            </div>
        </transition>
    </div>
</template>
