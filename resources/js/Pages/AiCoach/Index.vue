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
        newMessage.value = initialMsg;
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
                'border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col transition-all duration-300 z-20 overflow-hidden shadow-2xl md:shadow-none',
                isSidebarOpen ? 'w-80 fixed md:relative h-full' : 'w-0 opacity-0 pointer-events-none'
            ]"
        >
            <div class="p-6">
                <button 
                    @click="startNewChat"
                    class="w-full flex items-center justify-center gap-3 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 group"
                >
                    <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform">
                        <OneForMindIcon name="plus" size="18" stroke-width="3" />
                    </div>
                    <span>New Discussion</span>
                </button>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-2">
                <div v-for="session in sessions" :key="session.id"
                    @click="switchSession(session.id)"
                    :class="[
                        'group p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-4 border',
                        currentSessionId === session.id 
                            ? 'bg-indigo-50/50 dark:bg-indigo-500/5 border-indigo-100 dark:border-indigo-500/20' 
                            : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    ]"
                >
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                        :class="currentSessionId === session.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'"
                    >
                        <OneForMindIcon name="sparkles" size="18" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-black truncate text-slate-800 dark:text-slate-100">
                            {{ session.title }}
                        </p>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{{ session.date }}</p>
                    </div>
                </div>
            </div>

            <div class="p-6 border-t border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs text-white font-black shadow-lg">
                        {{ userName.substring(0,2).toUpperCase() }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-xs font-black truncate dark:text-white">{{ userName }}</p>
                        <div class="flex items-center gap-1.5 mt-0.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <p class="text-[8px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.15em]">System Online</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        <!-- MAIN CHAT AREA -->
        <main class="flex-1 flex flex-col relative bg-slate-50/30 dark:bg-slate-950">
            
            <!-- Mobile Sidebar Toggle Overlay -->
            <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-10"></div>

            <!-- Chat Header -->
            <header class="h-20 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between px-6 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl z-20 transition-colors">
                <div class="flex items-center gap-4">
                    <button 
                        @click="isSidebarOpen = !isSidebarOpen"
                        class="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 transition-colors"
                    >
                        <OneForMindIcon :name="isSidebarOpen ? 'chevron-left' : 'menu'" size="20" />
                    </button>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                            <OneForMindIcon name="sparkles" size="20" />
                        </div>
                        <div>
                            <h1 class="font-black text-slate-900 dark:text-white text-sm uppercase tracking-[0.2em]">Neural OS</h1>
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Advanced Intelligence Companion</p>
                        </div>
                    </div>
                </div>
                <div class="hidden sm:flex items-center gap-4">
                    <div class="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Active Synergy</span>
                    </div>
                </div>
            </header>

            <!-- Messages Container -->
            <div ref="scrollContainer" class="flex-1 overflow-y-auto py-10 scroll-smooth custom-scrollbar px-4 md:px-0">
                <div class="max-w-4xl mx-auto space-y-12 pb-48">
                    
                    <!-- Welcome Message (If no messages) -->
                    <div v-if="messages.length === 0" class="text-center py-20 animate-in fade-in zoom-in duration-700">
                        <div class="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-indigo-200 dark:shadow-none rotate-3 hover:rotate-0 transition-transform">
                            <OneForMindIcon name="sparkles" size="40" />
                        </div>
                        <h2 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">Bagaimana saya bisa membantu hari ini?</h2>
                        <p class="text-slate-500 dark:text-slate-400 font-bold max-w-md mx-auto leading-relaxed text-sm">
                            Gunakan Neural OS untuk merancang kebiasaan, menganalisis keuangan, atau sekadar berdiskusi tentang produktivitas Anda.
                        </p>
                        
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-2xl mx-auto">
                            <button @click="newMessage = 'Berikan audit singkat tentang kebiasaan saya minggu ini'" class="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-left hover:border-indigo-500 transition-all group shadow-sm">
                                <p class="text-xs font-black text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600">Audit Kebiasaan</p>
                                <p class="text-[10px] text-slate-400 font-bold">Minta analisis mendalam tentang progress habit Anda.</p>
                            </button>
                            <button @click="newMessage = 'Bantu saya membuat rencana keuangan untuk bulan depan'" class="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-left hover:border-indigo-500 transition-all group shadow-sm">
                                <p class="text-xs font-black text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600">Perencanaan Keuangan</p>
                                <p class="text-[10px] text-slate-400 font-bold">Dapatkan saran strategis untuk alokasi dana Anda.</p>
                            </button>
                        </div>
                    </div>

                    <div v-for="(msg, index) in messages" :key="index" 
                        class="flex group animate-in slide-in-from-bottom-8 duration-500"
                        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
                    >
                        <div class="flex gap-6 max-w-[95%] md:max-w-[85%]" :class="msg.role === 'user' ? 'flex-row-reverse' : ''">
                            <!-- Avatar -->
                            <div class="shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center mt-1 shadow-xl"
                                :class="msg.role === 'user' 
                                    ? 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700' 
                                    : 'bg-indigo-600 text-white shadow-indigo-200 dark:shadow-none'"
                            >
                                <OneForMindIcon :name="msg.role === 'user' ? 'avatar' : 'sparkles'" size="18" />
                            </div>

                            <!-- Content -->
                            <div class="relative group/msg">
                                <div :class="[
                                    'px-8 py-6 rounded-[2rem] text-sm leading-relaxed whitespace-pre-wrap font-bold transition-all duration-500 shadow-sm',
                                    msg.role === 'user' 
                                        ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-200/50 dark:shadow-none' 
                                        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none'
                                ]">
                                    <img v-if="msg.image" :src="msg.image" class="max-w-xs rounded-2xl mb-4 shadow-2xl border-4 border-white dark:border-slate-800" />
                                    {{ msg.content }}
                                </div>

                                <!-- Action Buttons -->
                                <div class="absolute top-2 opacity-0 group-hover/msg:opacity-100 transition-opacity flex items-center gap-2"
                                    :class="msg.role === 'user' ? '-left-12' : '-right-12'"
                                >
                                    <button v-if="msg.role === 'user'" 
                                        @click="editMessage(index)"
                                        class="p-2.5 bg-white dark:bg-slate-800 rounded-xl text-slate-400 hover:text-indigo-600 shadow-lg border border-slate-100 dark:border-slate-700 transition-all hover:scale-110"
                                        title="Edit Message"
                                    >
                                        <OneForMindIcon name="planner" size="14" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Loading State -->
                    <div v-if="isLoading" class="flex justify-start">
                        <div class="flex gap-6">
                            <div class="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                                <OneForMindIcon name="sparkles" size="18" />
                            </div>
                            <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-8 py-6 rounded-[2rem] rounded-tl-none flex gap-2 items-center shadow-sm">
                                <div class="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></div>
                                <div class="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></div>
                                <div class="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enhanced Input Bar -->
            <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-50/90 dark:via-slate-950/90 to-transparent pt-20">
                <div class="max-w-4xl mx-auto">
                    
                    <!-- Pending Cancellation Overlay -->
                    <Transition name="fade">
                        <div v-if="isPending" class="flex justify-center mb-6">
                            <div class="bg-slate-900 dark:bg-white text-white dark:text-slate-950 py-3 px-8 rounded-2xl flex items-center gap-6 text-xs font-black shadow-2xl animate-in zoom-in border border-white/10">
                                <div class="flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                                    <span class="uppercase tracking-[0.2em]">Kirim dalam {{ countdown }}...</span>
                                </div>
                                <button @click="cancelSend" class="text-rose-400 hover:text-rose-500 font-black uppercase tracking-widest border-l border-slate-700 dark:border-slate-200 pl-6 transition-colors">Batalkan</button>
                            </div>
                        </div>
                    </Transition>

                    <!-- Image Preview -->
                    <div v-if="imagePreview" class="relative inline-block mb-6 p-3 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-4">
                        <img :src="imagePreview" class="h-24 w-24 object-cover rounded-2xl" />
                        <button @click="removeImage" class="absolute -top-3 -right-3 bg-rose-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform border-4 border-white dark:border-slate-900">
                            <OneForMindIcon name="x" size="14" stroke-width="4" />
                        </button>
                    </div>

                    <div class="relative group">
                        <!-- Glow Effect -->
                        <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-20 transition duration-700"></div>
                        
                        <div class="relative flex items-center gap-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-3 pl-6 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 dark:shadow-none transition-all duration-300 group-focus-within:border-indigo-500/50 group-focus-within:shadow-indigo-500/10">
                            
                            <!-- Media Actions -->
                            <div class="flex items-center gap-1 shrink-0">
                                <button @click="fileInput.click()" class="w-12 h-12 rounded-2xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 transition-all flex items-center justify-center" title="Upload Image">
                                    <OneForMindIcon name="plus" size="20" stroke-width="3" />
                                </button>
                                <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFile" />
                                
                                <button @click="startRecording" 
                                    class="w-12 h-12 rounded-2xl transition-all flex items-center justify-center"
                                    :class="isRecording ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600'"
                                    title="Voice Input"
                                >
                                    <OneForMindIcon name="sparkles" size="20" />
                                </button>
                            </div>

                            <!-- Text Input -->
                            <textarea 
                                v-model="newMessage"
                                @keydown="handleKeydown"
                                rows="1"
                                :placeholder="editingIndex !== null ? 'Revisi pesanmu...' : 'Tanyakan apa saja kepada Neural OS...'"
                                class="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-800 dark:text-white placeholder:text-slate-400 resize-none py-3 custom-scrollbar"
                                @input="e => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }"
                            ></textarea>

                            <!-- Send Button -->
                            <button 
                                @click="sendMessage"
                                :disabled="(!newMessage.trim() && !selectedImage) || isLoading || isPending"
                                class="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center transition-all shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 disabled:opacity-30 disabled:grayscale active:scale-90 group/send overflow-hidden"
                            >
                                <div class="relative">
                                    <OneForMindIcon v-if="!isLoading" name="send" size="24" stroke-width="3" class="group-hover/send:translate-x-12 transition-transform duration-500" />
                                    <OneForMindIcon v-if="!isLoading" name="send" size="24" stroke-width="3" class="absolute top-0 -translate-x-12 group-hover/send:translate-x-0 transition-transform duration-500" />
                                    <OneForMindIcon v-else name="refresh" size="24" stroke-width="3" class="animate-spin" />
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] text-center mt-6">Powered by Gemini Intelligence • Privacy Encrypted</p>
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
