<script setup>
import { Head, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

defineProps({
    users: Array
});

const togglePremium = (user) => {
    router.post(route('admin.users.toggle-premium', user.id));
};

const toggleAdmin = (user) => {
    if (confirm(`Yakin ingin merubah status admin untuk ${user.name}?`)) {
        router.post(route('admin.users.toggle-admin', user.id));
    }
};

const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'N/A';
</script>

<template>
    <AdminLayout>
        <Head title="Admin | User Monitoring" />

        <div class="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
            <div class="flex items-center justify-between pb-8 border-b border-slate-200 dark:border-slate-800">
                <div>
                   <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">User Directory</h1>
                   <p class="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">Real-time monitoring of all community members</p>
                </div>
                <div class="px-6 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Total Connections: </span>
                    <span class="text-indigo-600 dark:text-indigo-400 font-black">{{ users.length }}</span>
                </div>
            </div>

            <!-- Dashboard Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 italic">Premium Users</p>
                    <h3 class="text-3xl font-black text-indigo-600 dark:text-indigo-400 leading-none">
                        {{ users.filter(u => u.is_premium).length }}
                    </h3>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mt-6">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50/50 dark:bg-slate-900/50">
                                <th class="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic">User Profile</th>
                                <th class="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic text-center">Plan</th>
                                <th class="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic text-center">Auth Level</th>
                                <th class="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic">Registered</th>
                                <th class="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 italic text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
                            <tr v-for="user in users" :key="user.id" class="group hover:bg-slate-50/30 dark:hover:bg-slate-900/20 transition-all duration-300">
                                <td class="px-8 py-6">
                                    <div class="flex items-center gap-4">
                                        <img :src="user.avatar_url" class="w-10 h-10 rounded-xl object-cover border border-slate-100 dark:border-slate-700 shadow-sm" />
                                        <div class="flex flex-col">
                                            <span class="text-slate-900 dark:text-white text-sm font-bold">{{ user.name }}</span>
                                            <span class="text-slate-400 text-[10px] font-medium leading-none mt-1">{{ user.email }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-8 py-6 text-center">
                                    <button @click="togglePremium(user)" 
                                            class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all"
                                            :class="user.is_premium 
                                                ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400' 
                                                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'"
                                    >
                                        {{ user.is_premium ? 'Elite Pro' : 'Free Core' }}
                                    </button>
                                </td>
                                <td class="px-8 py-6 text-center">
                                    <button @click="toggleAdmin(user)"
                                            class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all"
                                            :class="user.is_admin 
                                                ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400' 
                                                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'"
                                    >
                                        {{ user.is_admin ? 'Admin' : 'Member' }}
                                    </button>
                                </td>
                                <td class="px-8 py-6 text-xs font-bold text-slate-500 dark:text-slate-400 italic">
                                    {{ formatDate(user.created_at) }}
                                </td>
                                <td class="px-8 py-6 text-right">
                                    <button class="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                                        <OneForMindIcon name="settings" size="18" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
