<script setup>
import { ref, onMounted } from 'vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
    post: Object,
    categories: Array
});

const isEditing = !!props.post;

const form = useForm({
    title: props.post?.title || '',
    content: props.post?.content || '',
    category_id: props.post?.category_id || (props.categories?.[0]?.id || ''),
    excerpt: props.post?.excerpt || '',
    is_published: props.post?.is_published || false,
    featured_image: null,
    meta_title: props.post?.meta_title || '',
    meta_description: props.post?.meta_description || '',
});

const previewUrl = ref(props.post?.featured_image_url || null);

const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        form.featured_image = file;
        previewUrl.value = URL.createObjectURL(file);
    }
};

const submit = () => {
    if (isEditing) {
        form.post(route('admin.blog.update', props.post.id) + '?_method=PATCH', {
            forceFormData: true
        });
    } else {
        form.post(route('admin.blog.store'), {
            forceFormData: true
        });
    }
};

onMounted(() => {
    if (!form.category_id && props.categories?.length) {
        form.category_id = props.categories[0].id;
    }
});
</script>

<template>
    <AdminLayout>
        <Head :title="isEditing ? 'Edit Post | Admin' : 'New Post | Admin'" />

        <div class="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
            <!-- Header Section -->
            <div class="flex items-center justify-between pb-8 border-b border-slate-200 dark:border-slate-800">
                <div>
                   <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{{ isEditing ? 'Edit Knowledge Transmission' : 'Draft New Stream' }}</h2>
                   <p class="text-slate-500 dark:text-slate-400 text-sm mt-3 font-medium italic">Configure content parameters for global broadcast</p>
                </div>
                <div class="flex gap-3">
                    <Link :href="route('admin.blog.index')" class="px-6 py-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:bg-slate-50">
                        Cancel
                    </Link>
                    <button @click="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-100 dark:shadow-none flex items-center gap-2 active:scale-95">
                        <OneForMindIcon name="sparkles" size="14" />
                        {{ isEditing ? 'Push Changes' : 'Publish Stream' }}
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-12 gap-8">
                <!-- MAIN CONTENT COLUMN -->
                <div class="col-span-12 lg:col-span-8 space-y-6">
                    <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden p-10 space-y-8">
                        <div class="space-y-3">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1 italic">Headline Title</label>
                            <input v-model="form.title" type="text" placeholder="Post title..." class="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-5 text-slate-900 dark:text-white text-xl font-bold focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all" required />
                            <div v-if="form.errors.title" class="text-rose-500 text-[10px] font-bold uppercase mt-1">{{ form.errors.title }}</div>
                        </div>

                        <div class="space-y-3">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1 italic">Content Engine (Markdown Enabled)</label>
                            <textarea v-model="form.content" rows="18" placeholder="Begin writing..." class="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-8 text-slate-700 dark:text-slate-300 font-medium leading-relaxed focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all custom-scrollbar" required></textarea>
                            <div v-if="form.errors.content" class="text-rose-500 text-[10px] font-bold uppercase mt-1">{{ form.errors.content }}</div>
                        </div>
                    </div>
                </div>

                <!-- SECONDARY MODULE: PARAMETERS -->
                <div class="col-span-12 lg:col-span-4 space-y-6">
                    
                    <!-- FEATURED IMAGE -->
                    <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 space-y-6">
                        <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700/50 pb-4 italic">Featured Media</h4>
                        
                        <div class="relative group">
                            <div class="aspect-video bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col items-center justify-center transition-all group-hover:border-indigo-500/30">
                                <img v-if="previewUrl" :src="previewUrl" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div v-else class="flex flex-col items-center gap-3 text-slate-400">
                                    <OneForMindIcon name="plus" size="32" class="opacity-20" />
                                    <span class="text-[10px] font-bold uppercase tracking-widest italic">No Image Payload</span>
                                </div>
                                
                                <div class="absolute inset-0 bg-indigo-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" @click="$refs.fileInput.click()">
                                    <span class="text-white text-[10px] font-black uppercase tracking-widest">Update Transmission Image</span>
                                </div>
                            </div>
                            <input ref="fileInput" type="file" class="hidden" @change="onFileChange" accept="image/*" />
                            <div v-if="form.errors.featured_image" class="text-rose-500 text-[10px] font-bold uppercase mt-2 italic text-center">{{ form.errors.featured_image }}</div>
                        </div>
                    </div>

                    <!-- Publishing Card -->
                    <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 space-y-6">
                         <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700/50 pb-4 italic">Publish Parameters</h4>
                         
                         <div class="space-y-3">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic block">Category Classification</label>
                            <select v-model="form.category_id" class="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-xl p-4 text-slate-700 dark:text-slate-300 text-xs font-bold focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all uppercase tracking-wider">
                                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                            </select>
                         </div>

                         <div class="space-y-3 pt-2">
                             <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                                 <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Visibilty: Live</span>
                                 <button type="button" @click="form.is_published = !form.is_published" class="w-12 h-6 rounded-full relative transition-all duration-300" :class="form.is_published ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'">
                                     <div class="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md" :style="form.is_published ? 'left: calc(100% - 1.25rem)' : 'left: 0.25rem'"></div>
                                 </button>
                             </div>
                         </div>
                    </div>

                    <!-- SEO Metadata Card -->
                    <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 space-y-6">
                         <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700/50 pb-4 italic">SEO Optimization</h4>
                         
                         <div class="space-y-2">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic block">Meta Header</label>
                            <input v-model="form.meta_title" type="text" placeholder="Title for Search Engines..." class="w-full bg-slate-50 dark:bg-slate-900 border border-transparent rounded-xl p-4 text-slate-700 dark:text-slate-300 text-xs font-medium focus:border-indigo-500/20 transition-all shadow-inner" />
                         </div>

                         <div class="space-y-2">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic block">Neural Excerpt</label>
                            <textarea v-model="form.excerpt" rows="2" placeholder="Brief summary for indexing..." class="w-full bg-slate-50 dark:bg-slate-900 border border-transparent rounded-xl p-4 text-slate-700 dark:text-slate-300 text-xs font-medium focus:border-indigo-500/20 transition-all shadow-inner"></textarea>
                         </div>
                    </div>

                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
</style>
