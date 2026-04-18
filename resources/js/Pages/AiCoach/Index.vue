<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { Head, router } from "@inertiajs/vue3";
import { marked } from "marked";
import axios from "axios";
import Swal from "sweetalert2";

// Configure marked
marked.setOptions({ breaks: true, gfm: true });

const props = defineProps({
    sessions: { type: Array, default: () => [] },
    currentSessionId: { type: String, default: null },
    initialMessages: { type: Array, default: () => [] },
    userName: { type: String, default: "Kamu" },
});

const deleteSession = (sessionId) => {
    Swal.fire({
        title: 'Hapus Riwayat?',
        text: "Percakapan ini akan dihapus permanen.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#94a3b8',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(route('coach.session.destroy', sessionId), {
                preserveScroll: true,
                onSuccess: () => {
                    if (props.currentSessionId === sessionId) {
                        startNewChat();
                    }
                }
            });
        }
    });
};

// ── STATE ────────────────────────────────────────────────────────────────────
const messages = ref([...(props.initialMessages || [])]);
const newMessage = ref("");
const isLoading = ref(false);
const scrollContainer = ref(null);
const fileInput = ref(null);

const isSidebarOpen = ref(window.innerWidth >= 768);
const isRecording = ref(false);
const selectedImage = ref(null);
const imagePreview = ref(null);
const editingIndex = ref(null);

// ── COMPUTED ─────────────────────────────────────────────────────────────────
const isWelcomeState = computed(
    () => !props.currentSessionId || !messages.value.some((m) => m.role === "user"),
);

const firstName = computed(() => (props.userName ?? "Kamu").split(" ")[0]);

const renderMarkdown = (content) => {
    if (!content) return "";
    try {
        return marked.parse(content);
    } catch {
        return content;
    }
};

const sidebarClasses = computed(() =>
    isSidebarOpen.value
        ? "flex fixed md:relative h-full w-64 md:w-56 top-0 left-0 z-[70] md:z-auto"
        : "hidden md:flex md:w-0 md:overflow-hidden",
);

// ── QUICK ACTIONS ────────────────────────────────────────────────────────────
const quickActions = [
    {
        label: "Audit Kebiasaan",
        emoji: "🏃",
        color: "#7c3aed",
        prompt: "Berikan audit mendalam tentang kebiasaan saya minggu ini. Apa yang sudah berjalan baik dan apa yang perlu diperbaiki? Berikan saran konkret.",
    },
    {
        label: "Cek Keuangan",
        emoji: "💰",
        color: "#059669",
        prompt: "Analisis kondisi keuangan saya bulan ini. Identifikasi pola pengeluaran yang perlu diperhatikan dan bantu buat rencana yang lebih baik.",
    },
    {
        label: "Rencanakan Hari",
        emoji: "📋",
        color: "#2563eb",
        prompt: "Bantu saya membuat rencana hari ini yang produktif berdasarkan tugas dan tujuan yang ada. Prioritaskan hal yang paling berdampak.",
    },
    {
        label: "Brainstorm",
        emoji: "🧠",
        color: "#db2777",
        prompt: "Bantu saya brainstorm ide-ide kreatif untuk meningkatkan produktivitas dan mencapai tujuan lebih cepat. Berikan perspektif yang segar dan praktis.",
    },
    {
        label: "Susun Target",
        emoji: "🎯",
        color: "#d97706",
        prompt: "Bantu saya menyusun target yang SMART dan realistis untuk bulan depan berdasarkan progress dan kondisi saat ini.",
    },
    {
        label: "Review Jurnal",
        emoji: "📖",
        color: "#0891b2",
        prompt: "Bantu saya merefleksikan jurnal terbaru. Berikan insight tentang pola pikir, emosi, dan pertumbuhan saya berdasarkan apa yang sudah saya tuliskan.",
    },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────
const scrollToBottom = async () => {
    await nextTick();
    if (scrollContainer.value) {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
};

const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 180) + "px";
};

// ── VOICE ─────────────────────────────────────────────────────────────────────
const startRecording = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
        alert("Browser tidak mendukung pendiktean suara.");
        return;
    }
    const rec = new SR();
    rec.lang = "id-ID";
    rec.onstart = () => (isRecording.value = true);
    rec.onend = () => (isRecording.value = false);
    rec.onresult = (e) => {
        newMessage.value += " " + e.results[0][0].transcript;
    };
    rec.start();
};

// ── IMAGE ─────────────────────────────────────────────────────────────────────
const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    selectedImage.value = file;
    const reader = new FileReader();
    reader.onload = (ev) => (imagePreview.value = ev.target.result);
    reader.readAsDataURL(file);
};

const removeImage = () => {
    selectedImage.value = null;
    imagePreview.value = null;
};

// ── EDIT ─────────────────────────────────────────────────────────────────────
const editMessage = (index) => {
    editingIndex.value = index;
    newMessage.value = messages.value[index].content;
};

// ── CANCEL ───────────────────────────────────────────────────────────────────
const abortController = ref(null);

const stopGeneration = () => {
    if (abortController.value) {
        abortController.value.abort();
        abortController.value = null;
    }
    isLoading.value = false;
};

const handleKeydown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
};

// ── SEND ──────────────────────────────────────────────────────────────────────
const sendMessage = () => {
    if (
        (!newMessage.value.trim() && !selectedImage.value) ||
        isLoading.value
    )
        return;
    executeSend();
};

const executeSend = async () => {
    const userText = newMessage.value;
    const userImg = imagePreview.value;

    if (editingIndex.value !== null) {
        messages.value[editingIndex.value].content = userText;
        editingIndex.value = null;
    } else {
        messages.value.push({
            role: "user",
            content: userText,
            image: userImg,
        });
    }

    newMessage.value = "";
    removeImage();
    isLoading.value = true;
    scrollToBottom();

    abortController.value = new AbortController();

    try {
        const res = await axios.post(route("coach.chat"), {
            session_id: props.currentSessionId,
            messages: messages.value,
        }, {
            signal: abortController.value.signal
        });
        messages.value.push({ role: "assistant", content: res.data.content });
    } catch (err) {
        if (axios.isCancel(err)) {
            messages.value.push({
                role: "assistant",
                content: "Berhenti menghasilkan respon.",
            });
        } else {
            let errorMsg = "Maaf, ada gangguan teknis sejenak. Coba lagi ya!";
            if (err.response?.status === 404) {
                errorMsg = "Neural OS Error: Gemini model tidak ditemukan. Silakan hubungi admin untuk update konfigurasi.";
            }
            messages.value.push({
                role: "assistant",
                content: errorMsg,
            });
        }
    } finally {
        isLoading.value = false;
        abortController.value = null;
        scrollToBottom();
    }
};

// ── NAVIGATION ───────────────────────────────────────────────────────────────
const startNewChat = () => router.get(route("coach.index", { new: 1 }));
const switchSession = (sid) => {
    isSidebarOpen.value = false;
    router.get(route("coach.index", { session: sid }));
};

// ── LIFECYCLE ─────────────────────────────────────────────────────────────────
onMounted(() => {
    scrollToBottom();
    const params = new URLSearchParams(window.location.search);
    const initMsg = params.get("initial_message");
    if (initMsg) {
        newMessage.value = initMsg;
        sendMessage();
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
        );
    }
});

watch(
    () => props.initialMessages,
    (val) => {
        messages.value = [...val];
        scrollToBottom();
    },
    { deep: true },
);

</script>

<template>
    <Head title="Neural OS" />

    <!--
        Full-screen AI Coach layout.
        Uses h-screen + overflow-hidden to create its own scrolling context
        inside the AuthenticatedLayout main slot.
        z-[60] ensures dropdowns/modals render above layout elements.
    -->
    <div
        class="flex-1 flex overflow-hidden bg-white dark:bg-slate-950 relative z-[60]"
    >
        <!-- ═══════ MOBILE SIDEBAR BACKDROP ═══════ -->
        <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isSidebarOpen"
                class="fixed inset-0 bg-slate-950/50  z-[69] md:hidden"
                @click="isSidebarOpen = false"
            ></div>
        </Transition>

        <!-- ═══════════════ SIDEBAR ═══════════════ -->
        <aside
            :class="sidebarClasses"
            class="flex-col shrink-0 bg-white dark:bg-[#0c0c0c] border-r border-slate-100 dark:border-white/[0.06] transition-all duration-300 overflow-hidden"
        >
            <!-- New Chat -->
            <div class="p-3 border-b border-slate-100 dark:border-white/[0.05]">
                <button
                    @click="startNewChat"
                    class="w-full flex items-center gap-2.5 px-3 h-10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 text-sm font-semibold transition-colors group"
                >
                    <div
                        class="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-black group-hover:scale-110 transition-transform shadow-sm"
                    >
                        +
                    </div>
                    Chat Baru
                </button>
            </div>

            <!-- Session list -->
            <div
                class="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 custom-scrollbar"
            >
                <p
                    v-if="sessions?.length"
                    class="px-3 py-2 text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]"
                >
                    Riwayat
                </p>

                <div
                    v-for="session in sessions"
                    :key="session.id"
                    class="relative group"
                >
                    <button
                        @click="switchSession(session.id)"
                        class="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors flex items-start gap-2.5"
                        :class="
                            currentSessionId === session.id
                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                        "
                    >
                        <svg
                            class="w-4 h-4 mt-0.5 shrink-0 opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                            />
                        </svg>
                        <div class="min-w-0 flex-1 pr-6">
                            <p class="font-semibold text-xs truncate">
                                {{ session.title }}
                            </p>
                            <p class="text-[10px] opacity-50 mt-0.5">
                                {{ session.date }}
                            </p>
                        </div>
                    </button>
                    <!-- Delete Button -->
                    <button
                        @click.stop="deleteSession(session.id)"
                        class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all"
                        title="Hapus Percakapan"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>

                <div v-if="!sessions?.length" class="px-3 py-8 text-center">
                    <p class="text-[11px] text-slate-400 dark:text-slate-600">
                        Belum ada percakapan
                    </p>
                </div>
            </div>
        </aside>

        <!-- ═══════════════ MAIN AREA ═══════════════ -->
        <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
            <!-- ── HEADER ── -->
            <header
                class="h-14 shrink-0 flex items-center px-4 gap-3 border-b border-slate-100 dark:border-white/[0.06] bg-white/80 dark:bg-[#0a0a0a]/80  z-10"
            >
                <!-- Sidebar toggle -->
                <button
                    @click="isSidebarOpen = !isSidebarOpen"
                    class="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors shrink-0"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>

                <!-- Branding -->
                <div class="flex items-center gap-2.5">
                    <div
                        class="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-300/30 dark:shadow-none select-none"
                    >
                        ✦
                    </div>
                    <div class="leading-none">
                        <p
                            class="text-[13px] font-black text-slate-900 dark:text-white"
                        >
                            Neural OS
                        </p>
                        <p
                            class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5"
                        >
                            AI Life Coach
                        </p>
                    </div>
                </div>

                <!-- Right -->
                <div class="ml-auto flex items-center gap-2">
                    <div
                        class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20"
                    >
                        <div
                            class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                        ></div>
                        <span
                            class="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider"
                            >Online</span
                        >
                    </div>
                    <button
                        @click="startNewChat"
                        class="sm:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors font-black text-lg"
                    >
                        +
                    </button>
                </div>
            </header>

            <!-- ── SCROLL AREA ── -->
            <div
                ref="scrollContainer"
                class="flex-1 overflow-y-auto custom-scrollbar"
            >
                <!-- ══════════ WELCOME STATE (Monday.com style) ══════════ -->
                <Transition
                    enter-active-class="transition-all duration-500 ease-out"
                    enter-from-class="opacity-0 translate-y-4"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                    mode="out-in"
                >
                    <div
                        v-if="isWelcomeState"
                        key="welcome"
                        class="min-h-full flex flex-col items-center justify-center px-4 py-10 md:py-16"
                    >
                        <!-- Glowing sparkle avatar -->
                        <div class="relative mb-7 md:mb-8">
                            <div
                                class="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl blur-3xl opacity-[0.18] scale-[2.5]"
                            ></div>
                            <div
                                class="relative w-[68px] h-[68px] md:w-[80px] md:h-[80px] rounded-[1.4rem] md:rounded-[1.6rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-300/30 dark:shadow-none select-none"
                            >
                                <span class="text-3xl md:text-4xl">✦</span>
                            </div>
                        </div>

                        <!-- Greeting -->
                        <h1
                            class="text-[2rem] md:text-[2.75rem] font-black text-slate-900 dark:text-white tracking-tight text-center leading-tight mb-2"
                        >
                            Hai {{ firstName }},
                        </h1>
                        <p
                            class="text-[15px] md:text-base text-slate-400 dark:text-slate-500 text-center mb-8 md:mb-10 max-w-[280px] md:max-w-sm leading-relaxed"
                        >
                            Apa yang ingin kamu capai hari ini?
                        </p>

                        <!-- ── Big Input Box (Monday.com rainbow glow) ── -->
                        <div
                            class="w-full max-w-xl md:max-w-2xl relative group/box mb-8 md:mb-10"
                        >
                            <!-- Rainbow gradient border on focus -->
                            <div
                                class="absolute -inset-[2px] rounded-[1.6rem] bg-gradient-to-r from-rose-400 via-purple-500 to-emerald-400 opacity-0 group-focus-within/box:opacity-70 transition-all duration-700 blur-[3px] pointer-events-none"
                            ></div>

                            <!-- Card -->
                            <div
                                class="relative bg-white dark:bg-[#111111] border border-slate-200/80 dark:border-white/[0.08] group-focus-within/box:border-transparent rounded-[1.5rem] shadow-2xl shadow-slate-200/40 dark:shadow-none transition-colors duration-300 overflow-hidden"
                            >
                                <!-- Textarea -->
                                <textarea
                                    v-model="newMessage"
                                    @keydown="handleKeydown"
                                    @input="autoResize"
                                    rows="3"
                                    placeholder="Tanyakan apa saja kepada Neural OS..."
                                    class="w-full bg-transparent px-5 pt-5 pb-3 text-[15px] font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 border-none focus:ring-0 resize-none leading-relaxed max-h-40 custom-scrollbar"
                                ></textarea>

                                <!-- Toolbar -->
                                <div
                                    class="flex items-center justify-between px-4 pb-4 pt-2 border-t border-slate-50 dark:border-white/[0.04]"
                                >
                                    <!-- Left: action icons -->
                                    <div class="flex items-center gap-1">
                                        <!-- Attach -->
                                        <button
                                            @click="fileInput?.click()"
                                            title="Lampirkan gambar"
                                            class="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-indigo-500 transition-all"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                            >
                                                <path
                                                    d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
                                                />
                                            </svg>
                                        </button>
                                        <!-- Voice -->
                                        <button
                                            @click="startRecording"
                                            title="Rekam suara"
                                            class="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                                            :class="
                                                isRecording
                                                    ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500 animate-pulse'
                                                    : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-indigo-500'
                                            "
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                            >
                                                <path
                                                    d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"
                                                />
                                                <path
                                                    d="M19 10v2a7 7 0 0 1-14 0v-2"
                                                />
                                                <line
                                                    x1="12"
                                                    y1="19"
                                                    x2="12"
                                                    y2="22"
                                                />
                                            </svg>
                                        </button>
                                        <input
                                            ref="fileInput"
                                            type="file"
                                            accept="image/*"
                                            class="hidden"
                                            @change="handleFile"
                                        />
                                    </div>

                                    <!-- Right: send -->
                                    <button
                                        @click="sendMessage"
                                        :disabled="
                                            (!newMessage.trim() &&
                                                !selectedImage) ||
                                            isLoading
                                        "
                                        class="h-9 px-5 rounded-[0.875rem] bg-indigo-600 text-white text-[13px] font-black hover:bg-indigo-700 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 flex items-center gap-2"
                                    >
                                        Kirim
                                        <kbd
                                            class="hidden sm:inline text-[10px] opacity-60 font-bold not-italic"
                                            >↵</kbd
                                        >
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- ── Quick Action Chips (Monday.com style) ── -->
                        <p
                            class="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] text-center mb-5"
                        >
                            Mulai dengan cepat
                        </p>

                        <div
                            class="flex gap-4 md:gap-6 overflow-x-auto pb-2 px-2 w-full max-w-xl md:max-w-2xl justify-start md:justify-center no-scrollbar"
                        >
                            <button
                                v-for="action in quickActions"
                                :key="action.label"
                                @click="
                                    () => {
                                        newMessage = action.prompt;
                                        sendMessage();
                                    }
                                "
                                class="flex flex-col items-center gap-2.5 group shrink-0"
                                style="width: 72px"
                            >
                                <div
                                    class="w-[56px] h-[56px] rounded-full flex items-center justify-center text-2xl transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1.5 group-active:scale-95"
                                    :style="{
                                        background: action.color + '14',
                                        border:
                                            '1.5px solid ' +
                                            action.color +
                                            '30',
                                        boxShadow:
                                            '0 4px 16px ' + action.color + '12',
                                    }"
                                >
                                    {{ action.emoji }}
                                </div>
                                <span
                                    class="text-[11px] font-semibold text-slate-500 dark:text-slate-400 text-center leading-tight"
                                    >{{ action.label }}</span
                                >
                            </button>
                        </div>

                        <p
                            class="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.25em] mt-10 md:mt-12"
                        >
                            Powered by Gemini Intelligence
                        </p>
                    </div>

                    <!-- ══════════ CHAT STATE (ChatGPT/Gemini style) ══════════ -->
                    <div v-else key="chat" class="py-6 pb-36 px-4">
                        <div class="max-w-5xl mx-auto space-y-5">
                            <template
                                v-for="(msg, index) in messages"
                                :key="index"
                            >
                                <div
                                    class="flex animate-in fade-in slide-in-from-bottom-2 duration-300"
                                    :class="
                                        msg.role === 'user'
                                            ? 'justify-end'
                                            : 'justify-start'
                                    "
                                >
                                    <!-- ── USER MESSAGE ── -->
                                    <div
                                        v-if="msg.role === 'user'"
                                        class="group relative max-w-[80%] md:max-w-[72%]"
                                    >
                                        <div
                                            class="bg-[#f4f4f5] dark:bg-[#2a2a2a] text-slate-900 dark:text-slate-100 px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed"
                                        >
                                            <img
                                                v-if="msg.image"
                                                :src="msg.image"
                                                class="max-w-[180px] mb-2.5 rounded-xl shadow-md"
                                            />
                                            <span class="font-medium">{{
                                                msg.content
                                            }}</span>
                                        </div>
                                        <!-- Edit on hover -->
                                        <button
                                            @click="editMessage(index)"
                                            class="absolute -left-8 top-2 w-6 h-6 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-indigo-500 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                            title="Edit pesan"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="11"
                                                height="11"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2.5"
                                            >
                                                <path
                                                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                                />
                                                <path
                                                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <!-- ── AI MESSAGE ── -->
                                    <div
                                        v-else
                                        class="flex gap-3 max-w-[94%] md:max-w-[86%]"
                                    >
                                        <!-- AI Avatar -->
                                        <div
                                            class="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5 shadow-md shadow-indigo-200/40 dark:shadow-none select-none"
                                        >
                                            ✦
                                        </div>
                                        <!-- AI Content with Markdown -->
                                        <div
                                            class="prose prose-sm dark:prose-invert max-w-none text-[13.5px] md:text-sm leading-relaxed text-slate-700 dark:text-slate-200 pt-0.5 [&>p]:mb-3 [&>p:last-child]:mb-0 [&>ul]:mt-1 [&>ul]:mb-3 [&>ul]:pl-5 [&>ol]:mt-1 [&>ol]:mb-3 [&>ol]:pl-5 [&>li]:mb-1 [&>li]:leading-relaxed [&>h1]:text-base [&>h1]:font-black [&>h1]:mt-4 [&>h1]:mb-2 [&>h1]:text-slate-900 [&>h1]:dark:text-white [&>h2]:text-[13px] [&>h2]:font-black [&>h2]:mt-3 [&>h2]:mb-1.5 [&>h2]:text-slate-900 [&>h2]:dark:text-white [&>h3]:text-[13px] [&>h3]:font-bold [&>h3]:mt-2.5 [&>h3]:mb-1 [&>h3]:text-slate-800 [&>h3]:dark:text-slate-100 [&>strong]:font-black [&>strong]:text-slate-900 [&>strong]:dark:text-white [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:bg-slate-100 [&_code]:dark:bg-slate-800 [&_code]:text-[12px] [&_code]:font-mono [&_code]:text-indigo-600 [&_code]:dark:text-indigo-400 [&_code]:not-prose [&>pre]:rounded-xl [&>pre]:bg-slate-900 [&>pre]:dark:bg-black [&>pre]:p-4 [&>pre]:text-xs [&>pre]:overflow-x-auto [&>pre]:my-3 [&>pre]:shadow-xl [&>blockquote]:border-l-[3px] [&>blockquote]:border-indigo-400 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-500 [&>blockquote]:dark:text-slate-400 [&>blockquote]:my-3 [&>hr]:border-slate-200 [&>hr]:dark:border-slate-800 [&>hr]:my-4"
                                            v-html="renderMarkdown(msg.content)"
                                        ></div>
                                    </div>
                                </div>
                            </template>

                            <!-- Loading dots -->
                            <div
                                v-if="isLoading"
                                class="flex gap-3 justify-start"
                            >
                                <div
                                    class="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5 shadow-md shadow-indigo-200/40 dark:shadow-none select-none"
                                >
                                    ✦
                                </div>
                                <div
                                    class="flex items-center gap-1.5 py-3 px-1"
                                >
                                    <div
                                        class="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce [animation-duration:1.2s]"
                                    ></div>
                                    <div
                                        class="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce [animation-duration:1.2s] [animation-delay:0.15s]"
                                    ></div>
                                    <div
                                        class="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce [animation-duration:1.2s] [animation-delay:0.3s]"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>

            <!-- ══════════ BOTTOM INPUT BAR (chat state only) ══════════ -->
            <div
                v-if="!isWelcomeState"
                class="shrink-0 border-t border-slate-100 dark:border-white/[0.05] bg-white/95 dark:bg-[#0a0a0a]/95  px-4 pt-3 pb-4 md:pb-5 z-10"
            >
                <!-- Image preview -->
                <div
                    v-if="imagePreview"
                    class="flex items-center gap-2 mb-2 w-fit"
                >
                    <div
                        class="relative p-1 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800"
                    >
                        <img
                            :src="imagePreview"
                            class="h-12 w-12 object-cover rounded-lg"
                        />
                        <button
                            @click="removeImage"
                            class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px] font-black hover:bg-rose-600 transition-colors shadow-md"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div class="max-w-5xl mx-auto">
                    <!-- Input row -->
                    <div
                        class="flex items-end gap-2 bg-[#f4f4f5] dark:bg-[#1c1c1c] border border-transparent dark:border-white/[0.06] rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400/30 dark:focus-within:ring-indigo-600/25 transition-all shadow-sm"
                    >
                        <!-- Attach + Voice -->
                        <div class="flex items-center gap-0.5 shrink-0 pb-1">
                            <button
                                @click="fileInput?.click()"
                                title="Lampirkan gambar"
                                class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:bg-white dark:hover:bg-white/5 transition-all"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
                                    />
                                </svg>
                            </button>
                            <button
                                @click="startRecording"
                                title="Rekam suara"
                                class="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                                :class="
                                    isRecording
                                        ? 'text-rose-500 bg-rose-50 dark:bg-rose-500/10 animate-pulse'
                                        : 'text-slate-400 hover:text-indigo-500 hover:bg-white dark:hover:bg-white/5'
                                "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"
                                    />
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                    <line x1="12" y1="19" x2="12" y2="22" />
                                </svg>
                            </button>
                            <input
                                ref="fileInput"
                                type="file"
                                accept="image/*"
                                class="hidden"
                                @change="handleFile"
                            />
                        </div>

                        <!-- Textarea -->
                        <textarea
                            v-model="newMessage"
                            @keydown="handleKeydown"
                            @input="autoResize"
                            rows="1"
                            :placeholder="
                                editingIndex !== null
                                    ? 'Revisi pesanmu...'
                                    : 'Pesan...'
                            "
                            class="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none py-2 min-h-[36px] max-h-[180px] leading-relaxed custom-scrollbar"
                        ></textarea>

                        <!-- Send/Stop button -->
                        <button
                            v-if="isLoading"
                            @click="stopGeneration"
                            class="w-9 h-9 shrink-0 mb-0.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition-all active:scale-90 shadow-md"
                            title="Stop"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="6" y="6" width="12" height="12" rx="2" ry="2" />
                            </svg>
                        </button>
                        <button
                            v-else
                            @click="sendMessage"
                            :disabled="(!newMessage.trim() && !selectedImage)"
                            class="w-9 h-9 shrink-0 mb-0.5 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-md shadow-indigo-200 dark:shadow-none"
                            title="Kirim (Enter)"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <line x1="12" y1="19" x2="12" y2="5" />
                                <polyline points="5 12 12 5 19 12" />
                            </svg>
                        </button>
                    </div>

                    <p
                        class="text-[9px] font-bold text-center text-slate-400 dark:text-slate-700 mt-2 uppercase tracking-widest"
                    >
                        Enter untuk kirim · Shift+Enter baris baru · Gemini AI
                    </p>
                </div>
            </div>
        </div>
        <!-- end main -->
    </div>
    <!-- end root -->
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 99px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #1e293b;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
