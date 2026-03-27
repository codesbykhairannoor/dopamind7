<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import axios from 'axios';

const props = defineProps({
    sessions: Array,
    currentSessionId: String,
    initialMessages: Array,
    userName: String
});

const messages = ref([...(props.initialMessages || [])]);
const newMessage = ref('');
const isLoading = ref(false);
const scrollContainer = ref(null);

// Sidebar Mobile Toggle
const isSidebarOpen = ref(false);

const scrollToBottom = async () => {
    await nextTick();
    if (scrollContainer.value) {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
};

const sendMessage = async () => {
    if (!newMessage.value.trim() || isLoading.value) return;

    const userText = newMessage.value;
    messages.value.push({ role: 'user', content: userText });
    newMessage.value = '';
    isLoading.value = true;
    scrollToBottom();

    try {
        const response = await axios.post(route('coach.chat'), {
            session_id: props.currentSessionId,
            messages: messages.value
        });
        messages.value.push({ role: 'assistant', content: response.data.content });
    } catch (e) {
        messages.value.push({ role: 'assistant', content: 'Maaf, aku sedang mengalami gangguan teknis. Coba lagi nanti ya!' });
    } finally {
        isLoading.value = false;
        scrollToBottom();
    }
};

const startNewChat = () => {
    router.get(route('coach.index'));
};

const switchSession = (sid) => {
    router.get(route('coach.index', { session: sid }));
};

onMounted(() => {
    scrollToBottom();
});

watch(() => props.initialMessages, (newVal) => {
    messages.value = [...newVal];
    scrollToBottom();
}, { deep: true });

defineOptions({ layout: AuthenticatedLayout });
</script>

<template>
    <Head title="AI Life Coach - Intelligence OS" />

    <div class="flex h-[calc(100vh-64px)] overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
        
        <!-- SIDEBAR - ChatGPT Style -->
        <aside 
            :class="[
                'w-72 border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl flex flex-col transition-all duration-300 z-20',
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 absolute lg:relative h-full'
            ]"
        >
            <div class="p-4">
                <button 
                    @click="startNewChat"
                    class="w-full flex items-center justify-center gap-2 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
                >
                    <OneForMindIcon name="plus" size="18" stroke-width="3" />
                    <span>New Discussion</span>
                </button>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-1">
                <div v-for="session in sessions" :key="session.id"
                    @click="switchSession(session.id)"
                    :class="[
                        'group p-3 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3',
                        currentSessionId === session.id 
                            ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700' 
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    ]"
                >
                    <div class="w-2 h-2 rounded-full" :class="currentSessionId === session.id ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'"></div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold truncate text-slate-700 dark:text-slate-200" :class="currentSessionId === session.id ? 'opacity-100' : 'opacity-70'">
                            {{ session.title }}
                        </p>
                        <p class="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{{ session.date }}</p>
                    </div>
                </div>
            </div>

            <div class="p-4 border-t border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-black">
                        {{ userName.substring(0,2).toUpperCase() }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-xs font-black truncate dark:text-white">{{ userName }}</p>
                        <p class="text-[8px] text-indigo-500 font-black uppercase tracking-widest">Active Member</p>
                    </div>
                </div>
            </div>
        </aside>

        <!-- MAIN CHAT AREA -->
        <main class="flex-1 flex flex-col relative">
            
            <!-- Floating Mobile Sidebar Toggle -->
            <button 
                @click="isSidebarOpen = !isSidebarOpen"
                class="lg:hidden absolute top-4 left-4 z-30 w-10 h-10 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center"
            >
                <OneForMindIcon :name="isSidebarOpen ? 'close' : 'menu'" size="20" />
            </button>

            <!-- Chat Header -->
            <header class="h-16 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-10 transition-colors">
                <div class="flex items-center gap-3 lg:ml-0 ml-12">
                    <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                        <OneForMindIcon name="sparkles" size="18" />
                    </div>
                    <h1 class="font-black text-slate-800 dark:text-white text-sm uppercase tracking-widest">AI OS Coach</h1>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Thinking Live
                    </span>
                </div>
            </header>

            <!-- Messages Container -->
            <div ref="scrollContainer" class="flex-1 overflow-y-auto px-4 md:px-0 py-8 scroll-smooth custom-scrollbar bg-slate-50/20 dark:bg-slate-950">
                <div class="max-w-3xl mx-auto space-y-10 pb-20">
                    
                    <div v-for="(msg, index) in messages" :key="index" 
                        class="flex group animate-in slide-in-from-bottom-5 duration-500"
                        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
                    >
                        <div class="flex gap-4 max-w-[90%] md:max-w-[85%]" :class="msg.role === 'user' ? 'flex-row-reverse' : ''">
                            <!-- Avatar -->
                            <div class="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-1 shadow-inner shadow-slate-200 dark:shadow-none"
                                :class="msg.role === 'user' 
                                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400' 
                                    : 'bg-indigo-600 text-white'"
                            >
                                <OneForMindIcon :name="msg.role === 'user' ? 'avatar' : 'sparkles'" size="14" />
                            </div>

                            <!-- Content -->
                            <div :class="[
                                'px-6 py-4 rounded-[1.75rem] text-sm leading-relaxed whitespace-pre-wrap font-medium transition-colors duration-500',
                                msg.role === 'user' 
                                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-100 dark:shadow-none' 
                                    : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm'
                            ]">
                                {{ msg.content }}
                            </div>
                        </div>
                    </div>

                    <div v-if="isLoading" class="flex justify-start animate-pulse">
                        <div class="flex gap-4">
                            <div class="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                                <OneForMindIcon name="sparkles" size="14" />
                            </div>
                            <div class="bg-indigo-50 dark:bg-indigo-500/10 px-6 py-4 rounded-[1.75rem] rounded-tl-none flex gap-1.5 items-center">
                                <div class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></div>
                                <div class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></div>
                                <div class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enhanced Input Bar -->
            <div class="absolute bottom-8 left-0 right-0 px-4 md:px-8">
                <div class="max-w-3xl mx-auto">
                    <div class="relative group">
                        <div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-10 dark:opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                        <div class="relative flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2 pl-6 rounded-3xl shadow-2xl shadow-indigo-100 dark:shadow-none ring-1 ring-slate-900/5 transition-all">
                            <input 
                                v-model="newMessage"
                                @keyup.enter="sendMessage"
                                type="text" 
                                placeholder="Apa rencanamu besok?" 
                                class="flex-1 bg-transparent border-none py-4 text-sm font-bold text-slate-800 dark:text-white placeholder-slate-400 focus:ring-0 outline-none"
                            />
                            <button 
                                @click="sendMessage"
                                :disabled="isLoading || !newMessage.trim()"
                                class="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                            >
                                <OneForMindIcon v-if="!isLoading" name="send" size="18" stroke-width="3" />
                                <OneForMindIcon v-else name="refresh" size="18" stroke-width="3" class="animate-spin" />
                            </button>
                        </div>
                    </div>
                    <p class="mt-4 text-[9px] text-center text-slate-400 font-black uppercase tracking-[0.2em] opacity-60">
                        Synthesized Personal Intelligence • Powered by OneForMind OS
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { 
    background: #e2e8f0; border-radius: 10px; 
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; }

@keyframes pulse-soft {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(0.98); }
}
</style>
