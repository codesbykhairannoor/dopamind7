import { ref, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import "./OneForMindIcon-BiMr3Mnd.js";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-1GGCUMc2.js";
import "dayjs";
import Swal from "sweetalert2";
import _sfc_main$1 from "./JournalHeader-C3kcXlPX.js";
import _sfc_main$3 from "./JournalCard-Kt1rBUv7.js";
import { _ as _sfc_main$2 } from "./NeuralBridge-B9eXD-Ar.js";
import { u as useGating } from "./useGating-DZoi6H2L.js";
import "./useAppearance-rDoGVD4_.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useFinanceFormat-CwGVpwq9.js";
import "laravel-vue-i18n";
import "dayjs/locale/id.js";
import "dayjs/locale/en.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AuthenticatedLayout }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    journals: Array,
    todayDate: String,
    synergy: Object
  },
  setup(__props) {
    const props = __props;
    const { isExplorer } = useGating();
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
    const deleteJournal = (id) => {
      var _a, _b, _c, _d;
      Swal.fire({
        title: ((_a = props.t) == null ? void 0 : _a.call(props, "journal_confirm_delete")) || "Hapus Jurnal?",
        text: ((_b = props.t) == null ? void 0 : _b.call(props, "journal_delete_warn")) || "Data ini akan hilang selamanya.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: ((_c = props.t) == null ? void 0 : _c.call(props, "btn_yes_delete")) || "Ya, Hapus",
        cancelButtonText: ((_d = props.t) == null ? void 0 : _d.call(props, "btn_cancel")) || "Batal",
        customClass: {
          confirmButton: "bg-rose-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl active:scale-95 transition-all outline-none mx-2 tracking-wide",
          cancelButton: "bg-slate-50 text-slate-400 font-bold py-3.5 px-8 rounded-2xl hover:bg-slate-100 active:scale-95 transition-all outline-none mx-2 tracking-wide",
          popup: "rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl",
          title: "text-2xl font-black text-slate-800 mb-2 font-sans",
          actions: "mt-6 gap-3"
        },
        buttonsStyling: false
      }).then((result) => {
        var _a2;
        if (result.isConfirmed) {
          fireToast("success", ((_a2 = props.t) == null ? void 0 : _a2.call(props, "success_deleted")) || "Berhasil dihapus!");
          router.delete(route("journal.destroy", id), {
            preserveScroll: true,
            preserveState: true,
            progress: false
          });
        }
      });
    };
    ref(false);
    const openPremiumPreview = () => router.visit(route("billing"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$t("journal_title", "Journal Dashboard")
      }, null, _parent));
      _push(`<div class="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-12 transition-colors duration-500">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        todayDate: __props.todayDate,
        synergy: __props.synergy
      }, null, _parent));
      _push(`<div class="w-full px-4 py-8 sm:px-6 lg:px-8 md:py-12 space-y-8">`);
      _push(ssrRenderComponent(_sfc_main$2, { module: "Journal" }, null, _parent));
      _push(`<div class="flex items-center justify-between"><h3 class="text-xl font-black text-slate-800 dark:text-white transition-colors duration-500">${ssrInterpolate(_ctx.$t("journal_history", "Story History"))}</h3></div>`);
      if (__props.journals.length === 0) {
        _push(`<div class="py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-sm dark:shadow-none mt-4 transition-all duration-500"><div class="flex flex-col items-center gap-4"><span class="text-5xl animate-bounce">📓</span><h4 class="text-lg font-black text-slate-800 dark:text-slate-100 transition-colors duration-500">${ssrInterpolate(_ctx.$t("journal_empty_title", "Belum ada cerita."))}</h4><p class="text-sm font-bold text-slate-400 dark:text-slate-500 px-8 transition-colors duration-500">${ssrInterpolate(_ctx.$t("journal_empty_subtitle", "Mulai tulis jurnal pertamamu hari ini!"))}</p><button class="mt-2 bg-indigo-600 text-white font-black py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 active:scale-95 transition-all outline-none"> + ${ssrInterpolate(_ctx.$t("journal_add", "Tambah jurnal"))}</button></div></div>`);
      } else {
        _push(`<div class="grid items-start grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"><!--[-->`);
        ssrRenderList(__props.journals, (journal) => {
          _push(ssrRenderComponent(_sfc_main$3, {
            key: journal.id,
            journal,
            isExplorer: unref(isExplorer),
            onDelete: deleteJournal,
            onOpenPreview: openPremiumPreview
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journal/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
