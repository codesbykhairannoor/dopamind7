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
const isSidebarOpen = ref(true); // Default open on desktop

// Advanced States
const isRecording = ref(false);
const selectedImage = ref(null);
const imagePreview = ref(null);
const fileInput = ref(null);
const isPending = ref(false);
const pendingTimer = ref(null);
const countdown = ref(3);
const editingIndex = ref(null);

// Voice to Text (Web Speech API)
const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Browser tidak mendukung pendiktean suara.');

    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.onstart = () => isRecording.value = true;
    recognition.onend = () => isRecording.value = false;
    recognition.onresult = (event) => {
        newMessage.value += ' ' + event.results[0][0].transcript;
    };
    recognition.start();
};

// Image Handling
const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
        selectedImage.value = file;
        const reader = new FileReader();
        reader.onload = (e) => imagePreview.value = e.target.result;
        reader.readAsDataURL(file);
    }
};

const removeImage = () => {
    selectedImage.value = null;
    imagePreview.value = null;
};

// Edit Functionality
const editMessage = (index) => {
    editingIndex.value = index;
    newMessage.value = messages.value[index].content;
};

// Cancellation logic
const cancelSend = () => {
    if (pendingTimer.value) {
        clearInterval(pendingTimer.value);
        pendingTimer.value = null;
        isPending.value = false;
        countdown.value = 3;
    }
};

const handleKeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
};

const scrollToBottom = async () => {
    await nextTick();
    if (scrollContainer.value) {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
};

const sendMessage = async () => {
    if ((!newMessage.value.trim() && !selectedImage.value) || isLoading.value) return;

    // Start Countdown (Delay System)
    isPending.value = true;
    countdown.value = 3;
    
    pendingTimer.value = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            clearInterval(pendingTimer.value);
            pendingTimer.value = null;
            isPending.value = false;
            executeSend();
        }
    }, 1000);
};

const executeSend = async () => {
    const userText = newMessage.value;
    const userImg = imagePreview.value;

    if (editingIndex.value !== null) {
        messages.value[editingIndex.value].content = userText;
        editingIndex.value = null;
    } else {
        messages.value.push({ 
            role: 'user', 
            content: userText,
            image: userImg 
        });
    }

    newMessage.value = '';
    removeImage();
    isLoading.value = true;
    scrollToBottom();

    try {
        const response = await axios.post(route('coach.chat'), {
            session_id: props.currentSessionId,
            messages: messages.value,
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
    router.get(route('coach.index', { new: 1 }));
};

const switchSession = (sid) => {
    router.get(route('coach.index', { session: sid }));
};

onMounted(() => {
    scrollToBottom();
    
    // Handle initial message from URL (e.g., from Resume Scan)
    const urlParams = new URLSearchParams(window.location.search);
    const initialMsg = urlParams.get('initial_message');
    if (initialMsg) {
        userInput.value = initialMsg;
        sendMessage();
        
        // Clean URL without refreshing
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

watch(() => props.initialMessages, (newVal) => {
    messages.value = [...newVal];
    scrollToBottom();
}, { deep: true });

defineOptions({ layout: AuthenticatedLayout });
</script>

<template>
    <Head title="AI Life Coach - Intelligence OS" />

    <div class="flex h-screen overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500 relative z-[60]">
        
        <!-- SIDEBAR - Discussion History (Middle Panel) -->
        <aside 
            :class="[
                'border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl flex flex-col transition-all duration-300 z-20 overflow-hidden',
                isSidebarOpen ? 'w-72 opacity-100' : 'w-0 opacity-0 pointer-events-none'
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
            
            <!-- Floating Sidebar Toggle (Both Desktop & Mobile) -->
            <button 
                @click="isSidebarOpen = !isSidebarOpen"
                class="absolute top-4 left-4 z-40 w-10 h-10 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 transition-colors"
                :title="isSidebarOpen ? 'Hide History' : 'Show History'"
            >
                <OneForMindIcon :name="isSidebarOpen ? 'chevron-left' : 'menu'" size="20" />
            </button>

            <!-- Chat Header -->
            <header class="h-16 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-10 transition-colors">
                <div class="flex items-center gap-3 ml-12">
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
                <div class="max-w-3xl mx-auto space-y-10 pb-40"> <!-- Increased PB for input area -->
                    
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
                            <div class="relative group/msg">
                                <div :class="[
                                    'px-6 py-4 rounded-[1.75rem] text-sm leading-relaxed whitespace-pre-wrap font-medium transition-colors duration-500',
                                    msg.role === 'user' 
                                        ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-100 dark:shadow-none' 
                                        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm'
                                ]">
                                    <img v-if="msg.image" :src="msg.image" class="max-w-xs rounded-xl mb-3 shadow-md" />
                                    {{ msg.content }}
                                </div>

                                <!-- Edit Button (User only) -->
                                <button v-if="msg.role === 'user'" 
                                    @click="editMessage(index)"
                                    class="absolute -left-10 top-2 p-2 text-slate-300 hover:text-indigo-500 opacity-0 group-hover/msg:opacity-100 transition-opacity"
                                >
                                    <OneForMindIcon name="planner" size="14" />
                                </button>
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
            <div class="absolute bottom-6 left-0 right-0 px-4 md:px-8 bg-gradient-to-t from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent pt-10">
                <div class="max-w-3xl mx-auto">
                    
                    <!-- Pending Cancellation Overlay -->
                    <Transition name="fade">
                        <div v-if="isPending" class="flex justify-center mb-4">
                            <div class="bg-slate-900 text-white py-2 px-6 rounded-full flex items-center gap-4 text-xs font-black shadow-2xl animate-in zoom-in">
                                <span class="uppercase tracking-widest">Kirim dalam {{ countdown }}...</span>
                                <button @click="cancelSend" class="text-rose-400 hover:text-rose-300 uppercase tracking-tighter border-l border-white/20 pl-4 ml-2">Batalkan</button>
                            </div>
                        </div>
                    </Transition>

                    <!-- Image Preview -->
                    <div v-if="imagePreview" class="relative inline-block mb-4 p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-2">
                        <img :src="imagePreview" class="h-20 w-20 object-cover rounded-xl" />
                        <button @click="removeImage" class="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <OneForMindIcon name="x" size="12" stroke-width="4" />
                        </button>
                    </div>

                    <div class="relative group">
                        <div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-10 dark:opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                        <div class="relative flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2 pl-4 rounded-3xl shadow-2xl shadow-indigo-100 dark:shadow-none ring-1 ring-slate-900/5 transition-all">
                            
                            <!-- Attach Button -->
                            <button @click="fileInput.click()" class="p-3 text-slate-400 hover:text-indigo-600 transition-colors">
                                <OneForMindIcon name="plus" size="20" stroke-width="3" />
                            </button>
                            <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFile" />

                            <textarea 
                                v-model="newMessage"
                                @keydown="handleKeydown"
                                :placeholder="editingIndex !== null ? 'Revisi pesanmu...' : 'Apa rencanamu besok, ' + userName + '?'" 
                                class="flex-1 bg-transparent border-none py-4 text-sm font-bold text-slate-800 dark:text-white placeholder-slate-400 focus:ring-0 outline-none resize-none max-h-40 min-h-[48px]"
                                rows="1"
                                @input="e => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }"
                            ></textarea>

                            <!-- Voice Button -->
                            <button @click="startRecording" 
                                :class="[
                                    'p-3 transition-all rounded-xl',
                                    isRecording ? 'text-rose-500 scale-125 animate-pulse bg-rose-50' : 'text-slate-400 hover:text-indigo-600'
                                ]"
                            >
                                <OneForMindIcon name="sparkles" size="20" stroke-width="3" />
                            </button>

                            <button 
                                @click="sendMessage"
                                :disabled="isLoading || (!newMessage.trim() && !selectedImage)"
                                class="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale ml-2"
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

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
