import { ref, onMounted, watch, unref, nextTick, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BuzclwEd.js";
import { _ as _sfc_main$1 } from "./OneForMindIcon-XdjRmiFl.js";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ThemeToggle-ByQSx4Ee.js";
import "./useAppearance-rDoGVD4_.js";
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
      _push(`<div class="flex h-screen overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500 relative z-[60]" data-v-bb7d8984><aside class="${ssrRenderClass([
        "border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl flex flex-col transition-all duration-300 z-20 overflow-hidden",
        isSidebarOpen.value ? "w-72 opacity-100" : "w-0 opacity-0 pointer-events-none"
      ])}" data-v-bb7d8984><div class="p-4" data-v-bb7d8984><button class="w-full flex items-center justify-center gap-2 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95" data-v-bb7d8984>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "plus",
        size: "18",
        "stroke-width": "3"
      }, null, _parent));
      _push(`<span data-v-bb7d8984>New Discussion</span></button></div><div class="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-1" data-v-bb7d8984><!--[-->`);
      ssrRenderList(__props.sessions, (session) => {
        _push(`<div class="${ssrRenderClass([
          "group p-3 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3",
          __props.currentSessionId === session.id ? "bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-800/50"
        ])}" data-v-bb7d8984><div class="${ssrRenderClass([__props.currentSessionId === session.id ? "bg-indigo-500" : "bg-slate-300 dark:bg-slate-600", "w-2 h-2 rounded-full"])}" data-v-bb7d8984></div><div class="flex-1 min-w-0" data-v-bb7d8984><p class="${ssrRenderClass([__props.currentSessionId === session.id ? "opacity-100" : "opacity-70", "text-sm font-bold truncate text-slate-700 dark:text-slate-200"])}" data-v-bb7d8984>${ssrInterpolate(session.title)}</p><p class="text-[10px] text-slate-400 font-medium uppercase tracking-tighter" data-v-bb7d8984>${ssrInterpolate(session.date)}</p></div></div>`);
      });
      _push(`<!--]--></div><div class="p-4 border-t border-slate-100 dark:border-slate-800" data-v-bb7d8984><div class="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm" data-v-bb7d8984><div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-black" data-v-bb7d8984>${ssrInterpolate(__props.userName.substring(0, 2).toUpperCase())}</div><div class="flex-1 min-w-0" data-v-bb7d8984><p class="text-xs font-black truncate dark:text-white" data-v-bb7d8984>${ssrInterpolate(__props.userName)}</p><p class="text-[8px] text-indigo-500 font-black uppercase tracking-widest" data-v-bb7d8984>Active Member</p></div></div></div></aside><main class="flex-1 flex flex-col relative" data-v-bb7d8984><button class="absolute top-4 left-4 z-40 w-10 h-10 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 transition-colors"${ssrRenderAttr("title", isSidebarOpen.value ? "Hide History" : "Show History")} data-v-bb7d8984>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: isSidebarOpen.value ? "chevron-left" : "menu",
        size: "20"
      }, null, _parent));
      _push(`</button><header class="h-16 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-10 transition-colors" data-v-bb7d8984><div class="flex items-center gap-3 ml-12" data-v-bb7d8984><div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white" data-v-bb7d8984>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "sparkles",
        size: "18"
      }, null, _parent));
      _push(`</div><h1 class="font-black text-slate-800 dark:text-white text-sm uppercase tracking-widest" data-v-bb7d8984>AI OS Coach</h1></div><div class="flex items-center gap-4" data-v-bb7d8984><span class="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full" data-v-bb7d8984><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" data-v-bb7d8984></span> Thinking Live </span></div></header><div class="flex-1 overflow-y-auto px-4 md:px-0 py-8 scroll-smooth custom-scrollbar bg-slate-50/20 dark:bg-slate-950" data-v-bb7d8984><div class="max-w-3xl mx-auto space-y-10 pb-40" data-v-bb7d8984><!--[-->`);
      ssrRenderList(messages.value, (msg, index) => {
        _push(`<div class="${ssrRenderClass([msg.role === "user" ? "justify-end" : "justify-start", "flex group animate-in slide-in-from-bottom-5 duration-500"])}" data-v-bb7d8984><div class="${ssrRenderClass([msg.role === "user" ? "flex-row-reverse" : "", "flex gap-4 max-w-[90%] md:max-w-[85%]"])}" data-v-bb7d8984><div class="${ssrRenderClass([msg.role === "user" ? "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400" : "bg-indigo-600 text-white", "shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-1 shadow-inner shadow-slate-200 dark:shadow-none"])}" data-v-bb7d8984>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: msg.role === "user" ? "avatar" : "sparkles",
          size: "14"
        }, null, _parent));
        _push(`</div><div class="relative group/msg" data-v-bb7d8984><div class="${ssrRenderClass([
          "px-6 py-4 rounded-[1.75rem] text-sm leading-relaxed whitespace-pre-wrap font-medium transition-colors duration-500",
          msg.role === "user" ? "bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-100 dark:shadow-none" : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm"
        ])}" data-v-bb7d8984>`);
        if (msg.image) {
          _push(`<img${ssrRenderAttr("src", msg.image)} class="max-w-xs rounded-xl mb-3 shadow-md" data-v-bb7d8984>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(msg.content)}</div>`);
        if (msg.role === "user") {
          _push(`<button class="absolute -left-10 top-2 p-2 text-slate-300 hover:text-indigo-500 opacity-0 group-hover/msg:opacity-100 transition-opacity" data-v-bb7d8984>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            name: "planner",
            size: "14"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]-->`);
      if (isLoading.value) {
        _push(`<div class="flex justify-start animate-pulse" data-v-bb7d8984><div class="flex gap-4" data-v-bb7d8984><div class="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white" data-v-bb7d8984>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "sparkles",
          size: "14"
        }, null, _parent));
        _push(`</div><div class="bg-indigo-50 dark:bg-indigo-500/10 px-6 py-4 rounded-[1.75rem] rounded-tl-none flex gap-1.5 items-center" data-v-bb7d8984><div class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" data-v-bb7d8984></div><div class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" data-v-bb7d8984></div><div class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" data-v-bb7d8984></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="absolute bottom-6 left-0 right-0 px-4 md:px-8 bg-gradient-to-t from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent pt-10" data-v-bb7d8984><div class="max-w-3xl mx-auto" data-v-bb7d8984>`);
      if (isPending.value) {
        _push(`<div class="flex justify-center mb-4" data-v-bb7d8984><div class="bg-slate-900 text-white py-2 px-6 rounded-full flex items-center gap-4 text-xs font-black shadow-2xl animate-in zoom-in" data-v-bb7d8984><span class="uppercase tracking-widest" data-v-bb7d8984>Kirim dalam ${ssrInterpolate(countdown.value)}...</span><button class="text-rose-400 hover:text-rose-300 uppercase tracking-tighter border-l border-white/20 pl-4 ml-2" data-v-bb7d8984>Batalkan</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (imagePreview.value) {
        _push(`<div class="relative inline-block mb-4 p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-2" data-v-bb7d8984><img${ssrRenderAttr("src", imagePreview.value)} class="h-20 w-20 object-cover rounded-xl" data-v-bb7d8984><button class="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" data-v-bb7d8984>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "x",
          size: "12",
          "stroke-width": "4"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative group" data-v-bb7d8984><div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-10 dark:opacity-20 group-focus-within:opacity-40 transition duration-500" data-v-bb7d8984></div><div class="relative flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2 pl-4 rounded-3xl shadow-2xl shadow-indigo-100 dark:shadow-none ring-1 ring-slate-900/5 transition-all" data-v-bb7d8984><button class="p-3 text-slate-400 hover:text-indigo-600 transition-colors" data-v-bb7d8984>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "plus",
        size: "20",
        "stroke-width": "3"
      }, null, _parent));
      _push(`</button><input type="file" class="hidden" accept="image/*" data-v-bb7d8984><textarea${ssrRenderAttr("placeholder", editingIndex.value !== null ? "Revisi pesanmu..." : "Apa rencanamu besok, " + __props.userName + "?")} class="flex-1 bg-transparent border-none py-4 text-sm font-bold text-slate-800 dark:text-white placeholder-slate-400 focus:ring-0 outline-none resize-none max-h-40 min-h-[48px]" rows="1" data-v-bb7d8984>${ssrInterpolate(newMessage.value)}</textarea><button class="${ssrRenderClass([
        "p-3 transition-all rounded-xl",
        isRecording.value ? "text-rose-500 scale-125 animate-pulse bg-rose-50" : "text-slate-400 hover:text-indigo-600"
      ])}" data-v-bb7d8984>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "sparkles",
        size: "20",
        "stroke-width": "3"
      }, null, _parent));
      _push(`</button><button${ssrIncludeBooleanAttr(isLoading.value || !newMessage.value.trim() && !selectedImage.value) ? " disabled" : ""} class="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale ml-2" data-v-bb7d8984>`);
      if (!isLoading.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "send",
          size: "18",
          "stroke-width": "3"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "refresh",
          size: "18",
          "stroke-width": "3",
          class: "animate-spin"
        }, null, _parent));
      }
      _push(`</button></div></div><p class="mt-4 text-[9px] text-center text-slate-400 font-black uppercase tracking-[0.2em] opacity-60" data-v-bb7d8984> Synthesized Personal Intelligence • Powered by OneForMind OS </p></div></div></main></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/AiCoach/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bb7d8984"]]);
export {
  Index as default
};
