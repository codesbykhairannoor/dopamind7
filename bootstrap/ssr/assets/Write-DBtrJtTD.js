import { ref, watch, onMounted, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { useForm, router, Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import Swal from "sweetalert2";
import { trans } from "laravel-vue-i18n";
import { u as useGating } from "./useGating-ch70vxdD.js";
import { T as ThemeToggle } from "./ThemeToggle-CFl5Vgy9.js";
import { u as useAppearance } from "./useAppearance-rDoGVD4_.js";
import dayjs from "dayjs";
import "dayjs/locale/id.js";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { _ as _sfc_main$1 } from "./OneForMindIcon-CpE9XZu-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
function useJournalForm(journal, date) {
  const { canUse } = useGating();
  const isSaving = ref(false);
  const isCreating = ref(false);
  const currentImageUrl = ref((journal == null ? void 0 : journal.image_url) || null);
  let saveTimeout = null;
  const t = (key, fallback) => {
    const result = trans(key);
    return result !== key ? result : fallback;
  };
  const form = useForm({
    id: (journal == null ? void 0 : journal.id) || null,
    date,
    title: (journal == null ? void 0 : journal.title) || "",
    content: (journal == null ? void 0 : journal.content) || "",
    mood: (journal == null ? void 0 : journal.mood) || ""
  });
  const fireToast = (icon, message) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2e3,
      timerProgressBar: true,
      background: "#4f46e5",
      iconColor: "#ffffff",
      icon,
      title: `<span style="color: white; font-weight: 900; font-size: 14px; line-height: 1.2;">${message}</span>`,
      customClass: {
        container: "!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end",
        popup: "!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !m-0 !w-auto !min-w-[280px]",
        timerProgressBar: "!bg-white/40 !h-1 !rounded-b-full"
      }
    });
  };
  const silentSave = async (isManual = false) => {
    var _a, _b;
    const plainText = form.content.replace(/<[^>]*>?/gm, "").trim();
    if (!form.id && !form.title && plainText === "" && !form.mood) return;
    if (!form.id && isCreating.value) return;
    isSaving.value = true;
    if (!form.id) {
      isCreating.value = true;
    }
    const url = form.id ? route("journal.update", form.id) : route("journal.store");
    const payload = form.data();
    if (form.id) {
      payload._method = "patch";
    }
    try {
      const res = await axios.post(url, payload, {
        headers: {
          "Accept": "application/json"
          // Beri tahu Laravel untuk merespon dengan JSON
        }
      });
      if (((_b = (_a = res.data) == null ? void 0 : _a.data) == null ? void 0 : _b.id) && !form.id) {
        form.id = res.data.data.id;
        window.history.replaceState({}, "", route("journal.write", form.id));
      }
      if (isManual) fireToast("success", t("status_saved", "Berhasil Disimpan!"));
    } catch (err) {
      console.error("Auto-save failed", err);
    } finally {
      isSaving.value = false;
      isCreating.value = false;
    }
  };
  const triggerAutoSave = () => {
    isSaving.value = true;
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      silentSave(false);
    }, 1e3);
  };
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const MAX = 1200;
          let w = img.width;
          let h = img.height;
          if (w > h && w > MAX) {
            h *= MAX / w;
            w = MAX;
          } else if (h > MAX) {
            w *= MAX / h;
            h = MAX;
          }
          canvas.width = w;
          canvas.height = h;
          ctx.drawImage(img, 0, 0, w, h);
          canvas.toBlob((blob) => resolve(new File([blob], file.name, { type: "image/jpeg" })), "image/jpeg", 0.7);
        };
      };
    });
  };
  const handleImageUpload = async (event) => {
    if (!canUse("planner_recurring")) {
      fireToast("error", t("warn_premium_feature_image", "Fitur Lampiran Foto tersedia di paket Architect!"));
      return;
    }
    const file = event.target.files[0];
    if (!file) return;
    if (saveTimeout) clearTimeout(saveTimeout);
    if (isCreating.value) {
      fireToast("warning", "Menyiapkan jurnal, coba sedetik lagi.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      currentImageUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
    isSaving.value = true;
    if (!form.id) isCreating.value = true;
    const compressedFile = await compressImage(file);
    const formData = new FormData();
    formData.append("image", compressedFile);
    formData.append("date", date);
    if (form.id) formData.append("id", form.id);
    try {
      const response = await axios.post(route("journal.uploadImage"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json"
        }
      });
      if (response.data.success) {
        if (!form.id && response.data.journal_id) {
          form.id = response.data.journal_id;
          window.history.replaceState({}, "", route("journal.write", form.id));
          silentSave(false);
        }
        currentImageUrl.value = response.data.url;
        fireToast("success", t("status_image_saved", "Gambar Tersimpan!"));
      }
    } catch (error) {
      console.error("Upload Image Error:", error);
      currentImageUrl.value = null;
    } finally {
      isSaving.value = false;
      isCreating.value = false;
    }
  };
  const removeImage = async () => {
    if (!form.id) return;
    isSaving.value = true;
    try {
      const response = await axios.delete(route("journal.deleteImage", form.id));
      if (response.data.success) {
        currentImageUrl.value = null;
        fireToast("success", t("status_image_deleted", "Gambar Dihapus!"));
      }
    } catch (error) {
      console.error("Delete Image Error:", error);
    } finally {
      isSaving.value = false;
    }
  };
  const deleteFullJournal = () => {
    if (!form.id) {
      router.get(route("journal.index"));
      return;
    }
    Swal.fire({
      title: t("journal_confirm_delete", "Hapus Jurnal?"),
      text: t("journal_delete_warn", "Data ini akan hilang selamanya."),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("btn_yes_delete", "Ya, Hapus"),
      cancelButtonText: t("btn_cancel", "Batal"),
      customClass: {
        confirmButton: "bg-rose-500 text-white font-bold py-3 px-6 rounded-xl mx-2 shadow-lg",
        cancelButton: "bg-slate-100 text-slate-500 font-bold py-3 px-6 rounded-xl mx-2"
      },
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve) => {
          router.delete(route("journal.destroy", form.id), {
            progress: false,
            onSuccess: () => {
              fireToast("success", t("status_deleted", "Berhasil Dihapus!"));
              resolve();
            }
          });
        });
      }
    });
  };
  watch(() => [form.title, form.content, form.mood], (newVal, oldVal) => {
    if (oldVal[0] === void 0 && !newVal[0]) return;
    const oldText = oldVal[1] ? oldVal[1].replace(/<[^>]*>?/gm, "") : "";
    const newText = newVal[1] ? newVal[1].replace(/<[^>]*>?/gm, "") : "";
    if (oldVal[0] === newVal[0] && oldVal[2] === newVal[2] && oldText === newText) return;
    triggerAutoSave();
  }, { deep: true });
  return { form, isSaving, currentImageUrl, handleImageUpload, removeImage, deleteFullJournal, silentSave, t };
}
const _sfc_main = {
  __name: "Write",
  __ssrInlineRender: true,
  props: {
    journal: Object,
    date: String
  },
  setup(__props) {
    var _a;
    const props = __props;
    const { form, isSaving, currentImageUrl } = useJournalForm(props.journal, props.date);
    const { isExplorer } = useGating();
    const { initTheme } = useAppearance();
    onMounted(() => {
      initTheme();
    });
    ref(null);
    const moods = [
      { slug: "awesome", emoji: "🤩", label: "Luar Biasa" },
      { slug: "good", emoji: "😊", label: "Senang" },
      { slug: "okay", emoji: "😐", label: "Biasa Saja" },
      { slug: "sad", emoji: "😢", label: "Sedih" },
      { slug: "angry", emoji: "😡", label: "Marah" }
    ];
    const editor = useEditor({
      content: ((_a = props.journal) == null ? void 0 : _a.content) || "",
      extensions: [
        StarterKit,
        Placeholder.configure({ placeholder: "Mulai menulis cerita harimu..." })
      ],
      editorProps: {
        attributes: { class: "prose prose-slate prose-lg md:prose-xl dark:prose-invert max-w-none focus:outline-none min-h-[50vh] text-slate-700 dark:text-slate-300 font-medium leading-relaxed pb-20 transition-colors duration-500" }
      },
      onUpdate: ({ editor: editor2 }) => {
        form.content = editor2.getHTML();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Menulis Jurnal - ${__props.date}`
      }, null, _parent));
      _push(`<div class="min-h-screen bg-slate-50 dark:bg-slate-950 relative selection:bg-indigo-100 dark:selection:bg-indigo-900/40 pb-32 transition-colors duration-500"><div class="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 md:px-6 py-4 flex items-center justify-between shadow-sm transition-colors duration-500">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("journal.index"),
        class: "text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-3 md:px-4 py-2 rounded-xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>←</span> <span class="hidden sm:inline"${_scopeId}>${ssrInterpolate(_ctx.$t("btn_back_dashboard", "Kembali ke Dashboard"))}</span>`);
          } else {
            return [
              createVNode("span", null, "←"),
              createTextVNode(),
              createVNode("span", { class: "hidden sm:inline" }, toDisplayString(_ctx.$t("btn_back_dashboard", "Kembali ke Dashboard")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-4"><div class="w-10 h-10 md:w-32">`);
      _push(ssrRenderComponent(ThemeToggle, { collapsed: true }, null, _parent));
      _push(`</div><div class="text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl flex items-center gap-2 transition-colors duration-500">`);
      if (unref(isSaving)) {
        _push(`<span class="text-indigo-500 dark:text-indigo-400 animate-pulse flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span class="hidden sm:inline">${ssrInterpolate(_ctx.$t("status_saving", "Saving..."))}</span></span>`);
      } else {
        _push(`<span class="text-emerald-500 dark:text-emerald-400 flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" stroke-width="2.5"></path></svg><span class="hidden sm:inline">${ssrInterpolate(_ctx.$t("status_saved", "Saved"))}</span></span>`);
      }
      _push(`</div><button${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} class="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-4 md:px-6 py-2 md:py-2.5 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 disabled:opacity-50">${ssrInterpolate(_ctx.$t("btn_save_manual", "Save"))}</button></div></div><div class="max-w-3xl mx-auto w-full px-4 py-8 md:py-12"><div class="bg-white dark:bg-slate-900 p-6 md:p-14 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative transition-colors duration-500"><div class="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6 flex items-center gap-2"><span>📅</span> ${ssrInterpolate(unref(dayjs)(__props.date).locale(_ctx.$page.props.locale || "id").format("dddd, DD MMMM YYYY"))}</div><input${ssrRenderAttr("value", unref(form).title)} type="text"${ssrRenderAttr("placeholder", _ctx.$t("journal_title_placeholder", "Beri judul harimu..."))} class="w-full text-3xl md:text-5xl font-black text-slate-800 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-700 border-none bg-transparent focus:ring-0 p-0 mb-8 tracking-tight leading-tight transition-colors duration-500"><div class="flex flex-wrap items-center gap-3 mb-10"><span class="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mr-2">${ssrInterpolate(_ctx.$t("journal_mood_label", "Mood Hari Ini:"))}</span><!--[-->`);
      ssrRenderList(moods, (mood) => {
        _push(`<button class="${ssrRenderClass([unref(form).mood === mood.slug ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/50 scale-110 shadow-sm" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 grayscale hover:grayscale-0", "w-10 h-10 md:w-12 md:h-12 rounded-2xl text-xl md:text-2xl flex items-center justify-center transition-all border-2"])}"${ssrRenderAttr("title", mood.label)}>${ssrInterpolate(mood.emoji)}</button>`);
      });
      _push(`<!--]--></div><div class="mb-10 group relative"><input type="file" class="hidden" accept="image/jpeg, image/png, image/webp">`);
      if (unref(currentImageUrl)) {
        _push(`<div class="relative rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-500"><img${ssrRenderAttr("src", unref(currentImageUrl))} alt="Journal Image" class="w-full h-auto max-h-[500px] object-cover"><button type="button" class="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur text-rose-500 rounded-full flex items-center justify-center shadow-lg hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 z-10 cursor-pointer"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div>`);
      } else {
        _push(`<button class="w-full py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer relative overflow-hidden group">`);
        if (unref(isExplorer)) {
          _push(`<div class="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center"><span class="text-xl mb-1">🔒</span><span class="text-[8px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">${ssrInterpolate(_ctx.$t("premium_badge", "Architect Feature"))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="text-2xl mb-2">📸</span><span class="text-[9px] font-black uppercase tracking-widest">${ssrInterpolate(_ctx.$t("journal_add_photo", "Sisipkan Foto Jurnal"))}</span></button>`);
      }
      _push(`</div>`);
      if (unref(editor)) {
        _push(`<div class="sticky top-20 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex gap-1 mb-10 w-fit transition-all duration-300"><button class="${ssrRenderClass([{ "bg-indigo-600 text-white shadow-lg shadow-indigo-100": unref(editor).isActive("bold") }, "w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"])}">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "bold",
          size: "18",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button><button class="${ssrRenderClass([{ "bg-indigo-600 text-white shadow-lg shadow-indigo-100": unref(editor).isActive("italic") }, "w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"])}">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "italic",
          size: "18",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button><div class="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1 self-center"></div><button class="${ssrRenderClass([{ "bg-indigo-600 text-white shadow-lg shadow-indigo-100": unref(editor).isActive("heading", { level: 2 }) }, "w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"])}">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "heading",
          size: "18",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button><button class="${ssrRenderClass([{ "bg-indigo-600 text-white shadow-lg shadow-indigo-100": unref(editor).isActive("bulletList") }, "w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"])}">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          name: "list",
          size: "18",
          "stroke-width": "3"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(EditorContent), { editor: unref(editor) }, null, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journal/Write.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
