<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

defineProps({
    posts: Array
});

const formatDate = (dateString) => {
    if (!dateString) return 'DRAFT';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

const deletePost = (post) => {
    if (confirm(`Yakin ingin menghapus postingan "${post.title}"?`)) {
        router.delete(route('admin.blog.destroy', post.id));
    }
};
</script>

<template>
    <AdminLayout>
        <Head title="Admin Dashboard | Content" />

        <div class="space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <!-- Header Section -->
            <div class="flex items-center justify-between pb-8 border-b border-slate-200 dark:border-slate-800">
                <div>
                   <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">Content Strategy</h1>
                   <p class="text-slate-500 dark:text-slate-400 text-sm mt-3 font-medium">Manage and monitor all blog transmissions</p>
                </div>
                <Link :href="route('admin.blog.create')" class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-3 active:scale-95">
                    <OneForMindIcon name="journal" size="16" />
                    New Post
                </Link>
            </div>

            <!-- Dashboard Stats Summary -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between group transition-all hover:border-indigo-500/20">
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-3 italic">Total Broadcasts</p>
                        <h3 class="text-4xl font-black text-slate-900 dark:text-white leading-none">{{ posts.length }}</h3>
                    </div>
                    <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <OneForMindIcon name="habit" size="24" />
                    </div>
                </div>
                <!-- Other stats could go here -->
            </div>

            <!-- Content Table -->
            <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50 dark:bg-slate-900/50">
                                <th class="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Post Title</th>
                                <th class="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</th>
                                <th class="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Status</th>
                                <th class="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Published</th>
                                <th class="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right pr-10">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
                            <tr v-for="post in posts" :key="post.id" class="group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                                <td class="px-8 py-6">
                                    <div class="flex flex-col">
                                        <span class="text-slate-900 dark:text-white text-base font-bold">{{ post.title }}</span>
                                        <span class="text-slate-400 text-[10px] font-medium leading-none tracking-tight mt-1 opacity-60">ID: #{{ post.id }} / {{ post.slug }}</span>
                                    </div>
                                </td>
                                <td class="px-8 py-6">
                                    <span class="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-[10px] font-bold uppercase italic tracking-widest">
                                        {{ post.category?.name || 'Standard' }}
                                    </span>
                                </td>
                                <td class="px-8 py-6">
                                    <div class="flex items-center justify-center">
                                        <div v-if="post.is_published" 
                                             class="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                                            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                            <span class="text-[9px] font-bold uppercase tracking-wider">Live</span>
                                        </div>
                                        <div v-else 
                                             class="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full border border-slate-200 dark:border-slate-700">
                                            <div class="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                            <span class="text-[9px] font-bold uppercase tracking-wider">Draft</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-8 py-6">
                                    <span class="text-slate-500 dark:text-slate-400 text-xs font-bold leading-none">{{ formatDate(post.published_at) }}</span>
                                </td>
                                <td class="px-8 py-6 text-right pr-8">
                                    <div class="flex items-center justify-end gap-2 group-hover:translate-x-0 transition-transform">
                                        <Link :href="route('admin.blog.edit', post.id)" 
                                              class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all"
                                              title="Edit Task">
                                            <OneForMindIcon name="habit" size="18" />
                                        </Link>
                                        <button @click="deletePost(post)" 
                                                class="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all"
                                                title="Delete Task">
                                            <OneForMindIcon name="logout" size="18" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="posts.length === 0">
                                <td colspan="5" class="py-24 text-center">
                                    <div class="flex flex-col items-center gap-3">
                                        <div class="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300">
                                            <OneForMindIcon name="sparkles" size="32" />
                                        </div>
                                        <p class="text-slate-400 text-sm font-medium">No posts found in the system</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
