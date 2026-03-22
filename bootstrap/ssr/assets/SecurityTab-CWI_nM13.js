import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "SecurityTab",
  __ssrInlineRender: true,
  props: { hasPassword: Boolean },
  setup(__props) {
    const passwordForm = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    const deleteForm = useForm({
      password: ""
    });
    const showDeleteConfirm = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}><section class="space-y-6"><div><h3 class="text-lg font-black text-slate-800 dark:text-white tracking-tight transition-colors duration-500">${ssrInterpolate(_ctx.$t("security_title", "Keamanan Akun"))}</h3><p class="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("security_desc", "Pastikan akun Anda tetap aman dengan password yang kuat."))}</p></div><form class="space-y-5">`);
      if (__props.hasPassword) {
        _push(`<div class="space-y-1.5"><label class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("security_label_current_password", "Password Saat Ini"))}</label><input type="password"${ssrRenderAttr("value", unref(passwordForm).current_password)} class="w-full px-5 py-4 rounded-2xl border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-5"><div class="space-y-1.5"><label class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("security_label_new_password", "Password Baru"))}</label><input type="password"${ssrRenderAttr("value", unref(passwordForm).password)} class="w-full px-5 py-4 rounded-2xl border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"></div><div class="space-y-1.5"><label class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-500">${ssrInterpolate(_ctx.$t("security_label_confirm_password", "Konfirmasi Password"))}</label><input type="password"${ssrRenderAttr("value", unref(passwordForm).password_confirmation)} class="w-full px-5 py-4 rounded-2xl border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"></div></div><div class="flex justify-end"><button type="submit"${ssrIncludeBooleanAttr(unref(passwordForm).processing) ? " disabled" : ""} class="bg-indigo-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg dark:shadow-none active:scale-95 disabled:opacity-50">${ssrInterpolate(_ctx.$t("security_btn_update", "Perbarui Password"))}</button></div></form></section><section class="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-6 transition-colors duration-500"><div class="p-6 rounded-[2rem] bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 transition-colors duration-500"><div class="flex items-center gap-4 mb-4"><div class="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl shadow-sm dark:shadow-none transition-colors duration-500">⚠️</div><div><h4 class="font-black text-rose-900 dark:text-rose-100 text-sm transition-colors duration-500">${ssrInterpolate(_ctx.$t("security_danger_zone", "Zona Berbahaya"))}</h4><p class="text-xs font-bold text-rose-600/70 dark:text-rose-400/70 transition-colors duration-500">${ssrInterpolate(_ctx.$t("security_danger_desc", "Hapus akun Anda secara permanen. Data tidak bisa dikembalikan."))}</p></div></div><button class="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 font-black text-xs hover:bg-rose-600 dark:hover:bg-rose-500 hover:text-white dark:hover:text-white hover:border-rose-600 dark:hover:border-rose-500 transition-all active:scale-95">${ssrInterpolate(_ctx.$t("security_btn_delete_account", "Hapus Seluruh Data Akun"))}</button></div></section>`);
      if (showDeleteConfirm.value) {
        _push(`<div class="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"><div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in duration-300"><h3 class="text-xl font-black text-slate-800 dark:text-white mb-2">${ssrInterpolate(_ctx.$t("security_confirm_delete_title", "Konfirmasi Penghapusan"))}</h3><p class="text-xs font-bold text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">${ssrInterpolate(_ctx.$t("security_confirm_delete_desc", "Masukkan password Anda untuk mengonfirmasi bahwa Anda benar-benar ingin menghapus akun Oneformind Anda."))}</p><input type="password"${ssrRenderAttr("value", unref(deleteForm).password)} class="w-full px-5 py-4 rounded-2xl border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-bold mb-6 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"${ssrRenderAttr("placeholder", _ctx.$t("security_placeholder_password", "Password Anda..."))}><div class="flex gap-4"><button class="flex-1 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">${ssrInterpolate(_ctx.$t("btn_cancel", "Batal"))}</button><button${ssrIncludeBooleanAttr(unref(deleteForm).processing) ? " disabled" : ""} class="flex-1 px-6 py-4 rounded-2xl bg-rose-600 text-white font-black text-sm hover:bg-rose-700 transition-all shadow-lg dark:shadow-none shadow-rose-200 dark:shadow-rose-900/20">${ssrInterpolate(_ctx.$t("security_btn_delete_account", "Hapus Akun"))}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Partials/SecurityTab.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
