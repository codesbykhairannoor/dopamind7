import { computed, ref, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderTeleport, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./InputError-CjMsDEOH.js";
import { _ as _sfc_main$2 } from "./InputLabel-BgCYZe1F.js";
import { P as PrimaryButton } from "./PrimaryButton-DPmleQI_.js";
import { _ as _sfc_main$3 } from "./TextInput-xTq3OG6l.js";
import { usePage, useForm } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "UpdateProfileInformationForm",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: { type: Boolean },
    status: { type: String }
  },
  setup(__props) {
    const user = computed(() => usePage().props.auth.user);
    ref(null);
    const photoPreview = ref(null);
    const form = useForm({
      _method: "patch",
      name: user.value.name,
      email: user.value.email,
      avatar: null
    });
    const showCropper = ref(false);
    const tempImageUrl = ref(null);
    ref(null);
    const imgRatio = ref(1);
    const zoom = ref(1);
    const panX = ref(0);
    const panY = ref(0);
    ref(false);
    ref({ x: 0, y: 0 });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-black text-slate-800 dark:text-white tracking-tight transition-colors duration-500">${ssrInterpolate(_ctx.$t("profile_info_title", "Informasi Pribadi"))}</h2><p class="mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors duration-500">${ssrInterpolate(_ctx.$t("profile_info_desc", "Perbarui foto profil, nama, dan alamat email akun Anda."))}</p></header><div class="mt-8 space-y-6"><div class="flex items-center gap-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 transition-colors duration-500"><div class="relative group cursor-pointer shrink-0"><img${ssrRenderAttr("src", photoPreview.value || user.value.avatar_url)} alt="Profile" class="w-24 h-24 rounded-full object-cover shadow-md dark:shadow-none border-4 border-white dark:border-slate-800 transition-all duration-300 group-hover:brightness-75 group-hover:scale-105">`);
      if (unref(form).processing && unref(form).avatar) {
        _push(`<div class="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full"><svg class="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
      } else {
        _push(`<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span class="text-white text-2xl drop-shadow-lg">📷</span></div>`);
      }
      _push(`</div><div class="flex-1"><input type="file" class="hidden" accept="image/jpeg, image/png, image/jpg, image/webp"><button type="button"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-5 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-black tracking-wide text-indigo-600 dark:text-indigo-400 shadow-sm dark:shadow-none hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all active:scale-95 disabled:opacity-50 transition-colors duration-500">${ssrInterpolate(_ctx.$t("change_photo", "Ganti Foto"))}</button>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mt-2",
        message: unref(form).errors.avatar
      }, null, _parent));
      _push(`<p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 leading-relaxed transition-colors duration-500">${ssrInterpolate(_ctx.$t("photo_adjust_instruction", "Pilih foto, lalu Anda dapat menyesuaikan posisi gambar sebelum diunggah."))} <br> ${ssrInterpolate(_ctx.$t("photo_format_allowed", "Format yang diizinkan: JPG, JPEG, PNG."))} <br> ${ssrInterpolate(_ctx.$t("photo_max_size", "Maksimal ukuran file: 2MB."))}</p></div></div><form><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "name",
        value: _ctx.$t("full_name", "Nama Lengkap"),
        class: "!text-[10px] !font-black !tracking-wide !text-slate-400 dark:!text-slate-500 mb-2 transition-colors duration-500"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "name",
        type: "text",
        class: "mt-1 block w-full !rounded-xl !border-slate-200 dark:!border-slate-800 focus:!border-indigo-500 focus:!ring-0 font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 h-12 px-4 transition-colors duration-500",
        modelValue: unref(form).name,
        "onUpdate:modelValue": ($event) => unref(form).name = $event,
        required: "",
        autofocus: "",
        autocomplete: "name"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mt-2",
        message: unref(form).errors.name
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "email",
        value: _ctx.$t("email_address", "Alamat Email"),
        class: "!text-[10px] !font-black !tracking-wide !text-slate-400 dark:!text-slate-500 mb-2 transition-colors duration-500"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "email",
        type: "email",
        class: "mt-1 block w-full !rounded-xl !border-slate-200 dark:!border-slate-800 focus:!border-indigo-500 focus:!ring-0 font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 h-12 px-4 transition-colors duration-500",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        required: "",
        autocomplete: "username"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mt-2",
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div></div><div class="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">`);
      _push(ssrRenderComponent(PrimaryButton, {
        disabled: unref(form).processing,
        class: "!rounded-xl !py-3.5 !px-8 !bg-indigo-600 hover:!bg-indigo-700 !shadow-lg !shadow-indigo-200 dark:!shadow-none !text-[11px] !font-black !tracking-wide transition-all active:scale-95 transition-colors duration-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("save_changes", "Simpan Perubahan"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("save_changes", "Simpan Perubahan")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(form).recentlySuccessful) {
        _push(`<p class="text-[11px] font-black text-emerald-500 tracking-wide flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-500/20 transition-colors duration-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> ${ssrInterpolate(_ctx.$t("saved", "Tersimpan"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showCropper.value) {
          _push2(`<div class="fixed inset-0 z-[9999] flex items-center justify-center p-4"><div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div><div class="relative bg-white dark:bg-slate-900 p-6 rounded-[2rem] w-full max-w-sm shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center transition-colors duration-500"><h3 class="font-black text-slate-800 dark:text-white mb-6 tracking-tight text-sm transition-colors duration-500">${ssrInterpolate(_ctx.$t("adjust_photo_title", "Sesuaikan Foto"))}</h3><div class="relative w-48 h-48 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden cursor-move border-4 border-dashed border-indigo-200 dark:border-indigo-500/30 shadow-inner transition-colors duration-500"><img${ssrRenderAttr("src", tempImageUrl.value)} class="absolute max-w-none pointer-events-none select-none" style="${ssrRenderStyle({
            transform: `translate(calc(-50% + ${panX.value}px), calc(-50% + ${panY.value}px)) scale(${zoom.value})`,
            top: "50%",
            left: "50%",
            width: imgRatio.value > 1 ? "auto" : "100%",
            height: imgRatio.value <= 1 ? "auto" : "100%"
          })}"></div><p class="mt-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wide transition-colors duration-500">${ssrInterpolate(_ctx.$t("pan_instruction", "Gunakan Mouse/Sentuhan Untuk Menggeser"))}</p><div class="w-full mt-6 flex items-center gap-3"><span class="text-sm text-slate-400 dark:text-slate-500 transition-colors duration-500">🔍</span><input type="range"${ssrRenderAttr("value", zoom.value)} min="0.5" max="2.5" step="0.05" class="w-full accent-indigo-600 dark:accent-indigo-400"></div><div class="flex gap-3 mt-8 w-full"><button type="button" class="flex-1 py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-black text-xs tracking-wide border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all transition-colors duration-500">${ssrInterpolate(_ctx.$t("cancel", "Batal"))}</button><button type="button" class="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-xs tracking-wide shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 active:scale-95 transition-all">${ssrInterpolate(_ctx.$t("save_photo", "Simpan Foto"))}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
