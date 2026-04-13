import { ref, onMounted, watch, unref, nextTick, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-CDxmFCGU.js";
import { _ as _sfc_main$1 } from "./OneForMindIcon-eY-202Xp.js";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useAppearance-rDoGVD4_.js";
import "./useGating-DZoi6H2L.js";
import "dayjs";
import "laravel-vue-i18n";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AuthenticatedLayout }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    sessions: Array,
    currentSessionId: String,
    initialMessages: Array,
    userName: String
  },
  setup(__props) {
    const props = __props;
    const messages = ref([...props.initialMessages || []]);
    const newMessage = ref("");
    const isLoading = ref(false);
    const scrollContainer = ref(null);
    const isSidebarOpen = ref(true);
    const isRecording = ref(false);
    const selectedImage = ref(null);
    const imagePreview = ref(null);
    ref(null);
    const isPending = ref(false);
    const pendingTimer = ref(null);
    const countdown = ref(3);
    const editingIndex = ref(null);
    const removeImage = () => {
      selectedImage.value = null;
      imagePreview.value = null;
    };
    const scrollToBottom = async () => {
      await nextTick();
      if (scrollContainer.value) {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
      }
    };
    const sendMessage = async () => {
      if (!newMessage.value.trim() && !selectedImage.value || isLoading.value) return;
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
      }, 1e3);
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
          image: userImg
        });
      }
      newMessage.value = "";
      removeImage();
      isLoading.value = true;
      scrollToBottom();
      try {
        const response = await axios.post(route("coach.chat"), {
          session_id: props.currentSessionId,
          messages: messages.value
        });
        messages.value.push({ role: "assistant", content: response.data.content });
      } catch (e) {
        messages.value.push({ role: "assistant", content: "Maaf, aku sedang mengalami gangguan teknis. Coba lagi nanti ya!" });
      } finally {
        isLoading.value = false;
        scrollToBottom();
      }
    };
    onMounted(() => {
      scrollToBottom();
      const urlParams = new URLSearchParams(window.location.search);
      const initialMsg = urlParams.get("initial_message");
      if (initialMsg) {
        userInput.value = initialMsg;
        sendMessage();
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    });
    watch(() => props.initialMessages, (newVal) => {
      messages.value = [...newVal];
      scrollToBottom();
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "AI Life Coach - Intelligence OS" }, null, _parent));
      _push(`<div class="flex h-screen overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500 relative z-[60]" data-v-596c761a><aside class="${ssrRenderClass([
        "border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col transition-all duration-300 z-20 overflow-hidden shadow-2xl md:shadow-none",
        isSidebarOpen.value ? "w-80 fixed md:relative h-full" : "w-0 opacity-0 pointer-events-none"
      ])}" data-v-596c761a><div class="p-6" data-v-596c761a><button class="w-full flex items-center justify-center gap-3 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 group" data-v-596c761a><div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform" data-v-596c761a>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "plus",
        size: "18",
        "stroke-width": "3"
      }, null, _parent));
      _push(`</div><span data-v-596c761a>New Discussion</span></button></div><div class="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-2" data-v-596c761a><!--[-->`);
      ssrRenderList(__props.sessions, (session) => {
        _push(`<div class="${ssrRenderClass([
          "group p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-4 border",
          __props.currentSessionId === session.id ? "bg-indigo-50/50 dark:bg-indigo-500/5 border-indigo-100 dark:border-indigo-500/20" : "bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
        ])}" data-v-596c761a><div class="${ssrRenderClass([__props.currentSessionId === session.id ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400", "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"])}" data-v-596c761a>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "18"
        }, null, _parent));
        _push(`</div><div class="flex-1 min-w-0" data-v-596c761a><p class="text-sm font-black truncate text-slate-800 dark:text-slate-100" data-v-596c761a>${ssrInterpolate(session.title)}</p><p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5" data-v-596c761a>${ssrInterpolate(session.date)}</p></div></div>`);
      });
      _push(`<!--]--></div><div class="p-6 border-t border-slate-100 dark:border-slate-800" data-v-596c761a><div class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50" data-v-596c761a><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs text-white font-black shadow-lg" data-v-596c761a>${ssrInterpolate(__props.userName.substring(0, 2).toUpperCase())}</div><div class="flex-1 min-w-0" data-v-596c761a><p class="text-xs font-black truncate dark:text-white" data-v-596c761a>${ssrInterpolate(__props.userName)}</p><div class="flex items-center gap-1.5 mt-0.5" data-v-596c761a><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" data-v-596c761a></span><p class="text-[8px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.15em]" data-v-596c761a>System Online</p></div></div></div></div></aside><main class="flex-1 flex flex-col relative bg-slate-50/30 dark:bg-slate-950" data-v-596c761a>`);
      if (isSidebarOpen.value) {
        _push(`<div class="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-10" data-v-596c761a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="h-20 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between px-6 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl z-20 transition-colors" data-v-596c761a><div class="flex items-center gap-4" data-v-596c761a><button class="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 transition-colors" data-v-596c761a>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: isSidebarOpen.value ? "chevron-left" : "menu",
        size: "20"
      }, null, _parent));
      _push(`</button><div class="flex items-center gap-3" data-v-596c761a><div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none" data-v-596c761a>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "sparkles",
        size: "20"
      }, null, _parent));
      _push(`</div><div data-v-596c761a><h1 class="font-black text-slate-900 dark:text-white text-sm uppercase tracking-[0.2em]" data-v-596c761a>Neural OS</h1><p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5" data-v-596c761a>Advanced Intelligence Companion</p></div></div></div><div class="hidden sm:flex items-center gap-4" data-v-596c761a><div class="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-2" data-v-596c761a><div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" data-v-596c761a></div><span class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest" data-v-596c761a>Active Synergy</span></div></div></header><div class="flex-1 overflow-y-auto py-10 scroll-smooth custom-scrollbar px-4 md:px-0" data-v-596c761a><div class="max-w-4xl mx-auto space-y-12 pb-48" data-v-596c761a>`);
      if (messages.value.length === 0) {
        _push(`<div class="text-center py-20 animate-in fade-in zoom-in duration-700" data-v-596c761a><div class="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-indigo-200 dark:shadow-none rotate-3 hover:rotate-0 transition-transform" data-v-596c761a>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "40"
        }, null, _parent));
        _push(`</div><h2 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-4" data-v-596c761a>Bagaimana saya bisa membantu hari ini?</h2><p class="text-slate-500 dark:text-slate-400 font-bold max-w-md mx-auto leading-relaxed text-sm" data-v-596c761a> Gunakan Neural OS untuk merancang kebiasaan, menganalisis keuangan, atau sekadar berdiskusi tentang produktivitas Anda. </p><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-2xl mx-auto" data-v-596c761a><button class="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-left hover:border-indigo-500 transition-all group shadow-sm" data-v-596c761a><p class="text-xs font-black text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600" data-v-596c761a>Audit Kebiasaan</p><p class="text-[10px] text-slate-400 font-bold" data-v-596c761a>Minta analisis mendalam tentang progress habit Anda.</p></button><button class="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-left hover:border-indigo-500 transition-all group shadow-sm" data-v-596c761a><p class="text-xs font-black text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600" data-v-596c761a>Perencanaan Keuangan</p><p class="text-[10px] text-slate-400 font-bold" data-v-596c761a>Dapatkan saran strategis untuk alokasi dana Anda.</p></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(messages.value, (msg, index) => {
        _push(`<div class="${ssrRenderClass([msg.role === "user" ? "justify-end" : "justify-start", "flex group animate-in slide-in-from-bottom-8 duration-500"])}" data-v-596c761a><div class="${ssrRenderClass([msg.role === "user" ? "flex-row-reverse" : "", "flex gap-6 max-w-[95%] md:max-w-[85%]"])}" data-v-596c761a><div class="${ssrRenderClass([msg.role === "user" ? "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700" : "bg-indigo-600 text-white shadow-indigo-200 dark:shadow-none", "shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center mt-1 shadow-xl"])}" data-v-596c761a>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: msg.role === "user" ? "avatar" : "sparkles",
          size: "18"
        }, null, _parent));
        _push(`</div><div class="relative group/msg" data-v-596c761a><div class="${ssrRenderClass([
          "px-8 py-6 rounded-[2rem] text-sm leading-relaxed whitespace-pre-wrap font-bold transition-all duration-500 shadow-sm",
          msg.role === "user" ? "bg-indigo-600 text-white rounded-tr-none shadow-indigo-200/50 dark:shadow-none" : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none"
        ])}" data-v-596c761a>`);
        if (msg.image) {
          _push(`<img${ssrRenderAttr("src", msg.image)} class="max-w-xs rounded-2xl mb-4 shadow-2xl border-4 border-white dark:border-slate-800" data-v-596c761a>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(msg.content)}</div><div class="${ssrRenderClass([msg.role === "user" ? "-left-12" : "-right-12", "absolute top-2 opacity-0 group-hover/msg:opacity-100 transition-opacity flex items-center gap-2"])}" data-v-596c761a>`);
        if (msg.role === "user") {
          _push(`<button class="p-2.5 bg-white dark:bg-slate-800 rounded-xl text-slate-400 hover:text-indigo-600 shadow-lg border border-slate-100 dark:border-slate-700 transition-all hover:scale-110" title="Edit Message" data-v-596c761a>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "planner",
            size: "14"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]-->`);
      if (isLoading.value) {
        _push(`<div class="flex justify-start" data-v-596c761a><div class="flex gap-6" data-v-596c761a><div class="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg" data-v-596c761a>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "18"
        }, null, _parent));
        _push(`</div><div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-8 py-6 rounded-[2rem] rounded-tl-none flex gap-2 items-center shadow-sm" data-v-596c761a><div class="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" data-v-596c761a></div><div class="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" data-v-596c761a></div><div class="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" data-v-596c761a></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-50/90 dark:via-slate-950/90 to-transparent pt-20" data-v-596c761a><div class="max-w-4xl mx-auto" data-v-596c761a>`);
      if (isPending.value) {
        _push(`<div class="flex justify-center mb-6" data-v-596c761a><div class="bg-slate-900 dark:bg-white text-white dark:text-slate-950 py-3 px-8 rounded-2xl flex items-center gap-6 text-xs font-black shadow-2xl animate-in zoom-in border border-white/10" data-v-596c761a><div class="flex items-center gap-2" data-v-596c761a><span class="w-2 h-2 rounded-full bg-indigo-500 animate-ping" data-v-596c761a></span><span class="uppercase tracking-[0.2em]" data-v-596c761a>Kirim dalam ${ssrInterpolate(countdown.value)}...</span></div><button class="text-rose-400 hover:text-rose-500 font-black uppercase tracking-widest border-l border-slate-700 dark:border-slate-200 pl-6 transition-colors" data-v-596c761a>Batalkan</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (imagePreview.value) {
        _push(`<div class="relative inline-block mb-6 p-3 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-4" data-v-596c761a><img${ssrRenderAttr("src", imagePreview.value)} class="h-24 w-24 object-cover rounded-2xl" data-v-596c761a><button class="absolute -top-3 -right-3 bg-rose-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform border-4 border-white dark:border-slate-900" data-v-596c761a>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "x",
          size: "14",
          "stroke-width": "4"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative group" data-v-596c761a><div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-20 transition duration-700" data-v-596c761a></div><div class="relative flex items-center gap-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-3 pl-6 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 dark:shadow-none transition-all duration-300 group-focus-within:border-indigo-500/50 group-focus-within:shadow-indigo-500/10" data-v-596c761a><div class="flex items-center gap-1 shrink-0" data-v-596c761a><button class="w-12 h-12 rounded-2xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 transition-all flex items-center justify-center" title="Upload Image" data-v-596c761a>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "plus",
        size: "20",
        "stroke-width": "3"
      }, null, _parent));
      _push(`</button><input type="file" class="hidden" accept="image/*" data-v-596c761a><button class="${ssrRenderClass([isRecording.value ? "bg-rose-500 text-white animate-pulse" : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600", "w-12 h-12 rounded-2xl transition-all flex items-center justify-center"])}" title="Voice Input" data-v-596c761a>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "sparkles",
        size: "20"
      }, null, _parent));
      _push(`</button></div><textarea rows="1"${ssrRenderAttr("placeholder", editingIndex.value !== null ? "Revisi pesanmu..." : "Tanyakan apa saja kepada Neural OS...")} class="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-800 dark:text-white placeholder:text-slate-400 resize-none py-3 custom-scrollbar" data-v-596c761a>${ssrInterpolate(newMessage.value)}</textarea><button${ssrIncludeBooleanAttr(!newMessage.value.trim() && !selectedImage.value || isLoading.value || isPending.value) ? " disabled" : ""} class="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center transition-all shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 disabled:opacity-30 disabled:grayscale active:scale-90 group/send overflow-hidden" data-v-596c761a><div class="relative" data-v-596c761a>`);
      if (!isLoading.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "send",
          size: "24",
          "stroke-width": "3",
          class: "group-hover/send:translate-x-12 transition-transform duration-500"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!isLoading.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "send",
          size: "24",
          "stroke-width": "3",
          class: "absolute top-0 -translate-x-12 group-hover/send:translate-x-0 transition-transform duration-500"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "refresh",
          size: "24",
          "stroke-width": "3",
          class: "animate-spin"
        }, null, _parent));
      }
      _push(`</div></button></div></div><p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] text-center mt-6" data-v-596c761a>Powered by Gemini Intelligence • Privacy Encrypted</p></div></div></main></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/AiCoach/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-596c761a"]]);
export {
  Index as default
};
