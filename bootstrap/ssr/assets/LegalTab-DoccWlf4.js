import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div><h3 class="text-lg font-black text-slate-800 tracking-tight italic">${ssrInterpolate(_ctx.$t("legal_title", "Syarat & Ketentuan Serta Kebijakan"))}</h3><p class="text-xs font-bold text-slate-400 mt-1">${ssrInterpolate(_ctx.$t("legal_desc", "Halaman penting mengenai data dan privasi Anda di Oneformind."))}</p></div><div class="prose prose-sm font-bold text-slate-600 max-w-none space-y-6 italic leading-relaxed"><section class="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-all"><h4 class="text-slate-800 font-black mb-2 uppercase tracking-widest text-xs">${ssrInterpolate(_ctx.$t("legal_section_1_title", "1. Pengumpulan Data"))}</h4><p>${ssrInterpolate(_ctx.$t("legal_section_1_desc", "Kami mengumpulkan data yang Anda berikan secara langsung saat mendaftar, termasuk nama, email, dan konten yang Anda buat dalam aplikasi Oneformind seperti habit, jurnal, dan tugas harian."))}</p></section><section class="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-all"><h4 class="text-slate-800 font-black mb-2 uppercase tracking-widest text-xs">${ssrInterpolate(_ctx.$t("legal_section_2_title", "2. Keamanan Data"))}</h4><p>${ssrInterpolate(_ctx.$t("legal_section_2_desc", "Privasi Anda adalah prioritas kami. Data Anda disimpan dengan enkripsi standar industri. Kami tidak akan pernah menjual data pribadi Anda kepada pihak ketiga manapun."))}</p></section><section class="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-all"><h4 class="text-slate-800 font-black mb-2 uppercase tracking-widest text-xs">${ssrInterpolate(_ctx.$t("legal_section_3_title", "3. Pembayaran Premium"))}</h4><p>${ssrInterpolate(_ctx.$t("legal_section_3_desc", "Transaksi pembayaran diproses melalui gateway pihak ketiga yang aman (Midtrans). Kami tidak menyimpan informasi kartu kredit atau detail pembayaran sensitif lainnya di server kami."))}</p></section><div class="flex justify-center pt-4"><a href="/company/privacy" class="text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest">${ssrInterpolate(_ctx.$t("legal_link_privacy", "Baca Kebijakan Privasi Lengkap"))}</a></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Partials/LegalTab.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LegalTab = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  LegalTab as default
};
