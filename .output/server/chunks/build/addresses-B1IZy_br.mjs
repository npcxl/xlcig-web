import { defineComponent, ref, reactive, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { c as createDiscreteApi } from './useLocation-CdbkT8tR.mjs';
import { _ as __nuxt_component_0 } from './AppHeader-Baa9wtq1.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'seemly';
import 'vooks';
import 'vdirs';
import 'css-render';
import '@css-render/plugin-bem';
import 'lodash-es';
import 'evtd';
import './nuxt-link-D8iHomBq.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './AppLogo-DGHjqzot.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'treemate';
import 'pinia';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "addresses",
  __ssrInlineRender: true,
  setup(__props) {
    const { message } = createDiscreteApi(["message"]);
    const loading = ref(true);
    const submitting = ref(false);
    const settingDefault = ref(false);
    const deleting = ref(false);
    const addresses2 = ref([]);
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const editingAddress = ref(null);
    const form = reactive({
      name: "",
      phone: "",
      province: "",
      city: "",
      district: "",
      detail: "",
      postal_code: "",
      is_default: false
    });
    const provinces = ref([]);
    const cities = ref([]);
    const districts = ref([]);
    const isEditing = computed(() => editingAddress.value !== null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-fbf233ed><div class="fixed inset-0 pointer-events-none" data-v-fbf233ed><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-fbf233ed></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-fbf233ed></div></div>`);
      _push(ssrRenderComponent(__nuxt_component_0, {
        "show-back-button": false,
        "show-nav-menu": false,
        "show-breadcrumb": true,
        "show-location": false,
        "show-search-button": false,
        "show-notification-button": false,
        "show-decorations": false,
        "logo-size": "medium",
        "current-page-title": "\u6536\u8D27\u5730\u5740"
      }, null, _parent));
      _push(`<div class="relative z-10 py-8" data-v-fbf233ed><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-v-fbf233ed><div class="mb-8 animate-fade-in-up" data-v-fbf233ed><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-fbf233ed><div class="flex items-center justify-between" data-v-fbf233ed><div data-v-fbf233ed><h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3" data-v-fbf233ed><i class="bi bi-geo-alt-fill text-cyan-400 text-3xl animate-bounce-gentle" data-v-fbf233ed></i> \u6536\u8D27\u5730\u5740\u7BA1\u7406 </h1><p class="text-gray-300 text-lg" data-v-fbf233ed>\u7BA1\u7406\u60A8\u7684\u6536\u8D27\u5730\u5740\uFF0C\u652F\u6301\u591A\u4E2A\u5730\u5740\u5E76\u8BBE\u7F6E\u9ED8\u8BA4\u5730\u5740</p></div><button class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2" data-v-fbf233ed><i class="bi bi-plus-circle text-lg" data-v-fbf233ed></i> \u6DFB\u52A0\u65B0\u5730\u5740 </button></div></div></div>`);
      if (loading.value) {
        _push(`<div class="animate-fade-in-up animation-delay-200" data-v-fbf233ed><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center" data-v-fbf233ed><div class="loading-spinner mx-auto mb-4" data-v-fbf233ed></div><p class="text-gray-300" data-v-fbf233ed>\u6B63\u5728\u52A0\u8F7D\u5730\u5740\u5217\u8868...</p></div></div>`);
      } else if (addresses2.value.length === 0) {
        _push(`<div class="animate-fade-in-up animation-delay-200" data-v-fbf233ed><div class="glass-card-dark rounded-2xl p-16 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center" data-v-fbf233ed><i class="bi bi-geo-alt text-6xl text-gray-400 mb-6" data-v-fbf233ed></i><h3 class="text-xl font-semibold text-white mb-4" data-v-fbf233ed>\u6682\u65E0\u6536\u8D27\u5730\u5740</h3><p class="text-gray-400 mb-8" data-v-fbf233ed>\u6DFB\u52A0\u60A8\u7684\u7B2C\u4E00\u4E2A\u6536\u8D27\u5730\u5740\uFF0C\u8BA9\u8D2D\u7269\u66F4\u52A0\u4FBF\u6377</p><button class="btn-premium-dark px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-fbf233ed><i class="bi bi-plus-circle mr-2" data-v-fbf233ed></i> \u6DFB\u52A0\u6536\u8D27\u5730\u5740 </button></div></div>`);
      } else {
        _push(`<div class="space-y-6 animate-fade-in-up animation-delay-200" data-v-fbf233ed><!--[-->`);
        ssrRenderList(addresses2.value, (address) => {
          _push(`<div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1" data-v-fbf233ed><div class="flex items-start justify-between" data-v-fbf233ed><div class="flex-1" data-v-fbf233ed><div class="flex items-center gap-3 mb-4" data-v-fbf233ed><h3 class="text-xl font-semibold text-white" data-v-fbf233ed>${ssrInterpolate(address.name)}</h3><span class="text-gray-300" data-v-fbf233ed>${ssrInterpolate(address.phone)}</span>`);
          if (address.is_default) {
            _push(`<span class="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-full" data-v-fbf233ed><i class="bi bi-star-fill mr-1" data-v-fbf233ed></i> \u9ED8\u8BA4\u5730\u5740 </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-gray-300 leading-relaxed" data-v-fbf233ed><p class="text-lg" data-v-fbf233ed>${ssrInterpolate(address.province)} ${ssrInterpolate(address.city)} ${ssrInterpolate(address.district)}</p><p class="text-gray-400 mt-1" data-v-fbf233ed>${ssrInterpolate(address.detail)}</p>`);
          if (address.postal_code) {
            _push(`<p class="text-gray-400 text-sm mt-1" data-v-fbf233ed>\u90AE\u653F\u7F16\u7801\uFF1A${ssrInterpolate(address.postal_code)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex flex-col space-y-2 ml-6" data-v-fbf233ed>`);
          if (!address.is_default) {
            _push(`<button${ssrIncludeBooleanAttr(settingDefault.value) ? " disabled" : ""} class="btn-outline-dark px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50" data-v-fbf233ed><i class="bi bi-star mr-1" data-v-fbf233ed></i> \u8BBE\u4E3A\u9ED8\u8BA4 </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="btn-outline-dark px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-fbf233ed><i class="bi bi-pencil mr-1" data-v-fbf233ed></i> \u7F16\u8F91 </button><button${ssrIncludeBooleanAttr(deleting.value) ? " disabled" : ""} class="btn-danger px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50" data-v-fbf233ed><i class="bi bi-trash mr-1" data-v-fbf233ed></i> \u5220\u9664 </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      if (showAddModal.value || showEditModal.value) {
        _push(`<div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4" data-v-fbf233ed><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-scale-in w-full max-w-2xl max-h-[90vh] overflow-y-auto" data-v-fbf233ed><div class="p-8" data-v-fbf233ed><h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-fbf233ed><i class="bi bi-geo-alt text-cyan-400" data-v-fbf233ed></i> ${ssrInterpolate(isEditing.value ? "\u7F16\u8F91\u5730\u5740" : "\u6DFB\u52A0\u65B0\u5730\u5740")}</h3><form class="space-y-6" data-v-fbf233ed><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-fbf233ed><div class="space-y-2" data-v-fbf233ed><label for="name" class="block text-sm font-medium text-cyan-400" data-v-fbf233ed>\u6536\u8D27\u4EBA\u59D3\u540D *</label><input id="name"${ssrRenderAttr("value", form.name)} type="text" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA\u59D3\u540D" required data-v-fbf233ed></div><div class="space-y-2" data-v-fbf233ed><label for="phone" class="block text-sm font-medium text-cyan-400" data-v-fbf233ed>\u624B\u673A\u53F7\u7801 *</label><input id="phone"${ssrRenderAttr("value", form.phone)} type="tel" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801" required data-v-fbf233ed></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-fbf233ed><div class="space-y-2" data-v-fbf233ed><label for="province" class="block text-sm font-medium text-cyan-400" data-v-fbf233ed>\u7701\u4EFD *</label><select id="province" class="input-dark w-full" required data-v-fbf233ed><option value="" data-v-fbf233ed${ssrIncludeBooleanAttr(Array.isArray(form.province) ? ssrLooseContain(form.province, "") : ssrLooseEqual(form.province, "")) ? " selected" : ""}>\u8BF7\u9009\u62E9\u7701\u4EFD</option><!--[-->`);
        ssrRenderList(provinces.value, (province) => {
          _push(`<option${ssrRenderAttr("value", province.name)} data-v-fbf233ed${ssrIncludeBooleanAttr(Array.isArray(form.province) ? ssrLooseContain(form.province, province.name) : ssrLooseEqual(form.province, province.name)) ? " selected" : ""}>${ssrInterpolate(province.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2" data-v-fbf233ed><label for="city" class="block text-sm font-medium text-cyan-400" data-v-fbf233ed>\u57CE\u5E02 *</label><select id="city" class="input-dark w-full" required data-v-fbf233ed><option value="" data-v-fbf233ed${ssrIncludeBooleanAttr(Array.isArray(form.city) ? ssrLooseContain(form.city, "") : ssrLooseEqual(form.city, "")) ? " selected" : ""}>\u8BF7\u9009\u62E9\u57CE\u5E02</option><!--[-->`);
        ssrRenderList(cities.value, (city) => {
          _push(`<option${ssrRenderAttr("value", city.name)} data-v-fbf233ed${ssrIncludeBooleanAttr(Array.isArray(form.city) ? ssrLooseContain(form.city, city.name) : ssrLooseEqual(form.city, city.name)) ? " selected" : ""}>${ssrInterpolate(city.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2" data-v-fbf233ed><label for="district" class="block text-sm font-medium text-cyan-400" data-v-fbf233ed>\u533A\u53BF *</label><select id="district" class="input-dark w-full" required data-v-fbf233ed><option value="" data-v-fbf233ed${ssrIncludeBooleanAttr(Array.isArray(form.district) ? ssrLooseContain(form.district, "") : ssrLooseEqual(form.district, "")) ? " selected" : ""}>\u8BF7\u9009\u62E9\u533A\u53BF</option><!--[-->`);
        ssrRenderList(districts.value, (district) => {
          _push(`<option${ssrRenderAttr("value", district.name)} data-v-fbf233ed${ssrIncludeBooleanAttr(Array.isArray(form.district) ? ssrLooseContain(form.district, district.name) : ssrLooseEqual(form.district, district.name)) ? " selected" : ""}>${ssrInterpolate(district.name)}</option>`);
        });
        _push(`<!--]--></select></div></div><div class="space-y-2" data-v-fbf233ed><label for="detail" class="block text-sm font-medium text-cyan-400" data-v-fbf233ed>\u8BE6\u7EC6\u5730\u5740 *</label><textarea id="detail" class="input-dark w-full h-24 resize-none" placeholder="\u8BF7\u8F93\u5165\u8BE6\u7EC6\u5730\u5740\uFF0C\u5982\u8857\u9053\u3001\u95E8\u724C\u53F7\u3001\u697C\u5C42\u7B49" required data-v-fbf233ed>${ssrInterpolate(form.detail)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-fbf233ed><div class="space-y-2" data-v-fbf233ed><label for="postal_code" class="block text-sm font-medium text-cyan-400" data-v-fbf233ed>\u90AE\u653F\u7F16\u7801</label><input id="postal_code"${ssrRenderAttr("value", form.postal_code)} type="text" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u90AE\u653F\u7F16\u7801\uFF08\u53EF\u9009\uFF09" data-v-fbf233ed></div><div class="space-y-2 flex items-end" data-v-fbf233ed><label class="flex items-center space-x-2" data-v-fbf233ed><input${ssrIncludeBooleanAttr(Array.isArray(form.is_default) ? ssrLooseContain(form.is_default, null) : form.is_default) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-cyan-500 bg-transparent border-2 border-cyan-500 rounded focus:ring-cyan-500" data-v-fbf233ed><span class="text-sm text-gray-300" data-v-fbf233ed>\u8BBE\u4E3A\u9ED8\u8BA4\u5730\u5740</span></label></div></div><div class="flex justify-end space-x-4 pt-6" data-v-fbf233ed><button type="button" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-fbf233ed><i class="bi bi-x-circle mr-2" data-v-fbf233ed></i> \u53D6\u6D88 </button><button type="submit"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-fbf233ed>`);
        if (submitting.value) {
          _push(`<span class="loading loading-spinner loading-sm mr-2" data-v-fbf233ed></span>`);
        } else {
          _push(`<i class="bi bi-check-circle mr-2" data-v-fbf233ed></i>`);
        }
        _push(` ${ssrInterpolate(submitting.value ? "\u4FDD\u5B58\u4E2D..." : isEditing.value ? "\u4FDD\u5B58\u4FEE\u6539" : "\u6DFB\u52A0\u5730\u5740")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/addresses.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const addresses = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fbf233ed"]]);

export { addresses as default };
//# sourceMappingURL=addresses-B1IZy_br.mjs.map
