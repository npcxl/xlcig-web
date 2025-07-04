import { _ as __nuxt_component_0 } from './AppLogo-C8xp92Ad.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dq0IxfZC.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { K as createDiscreteApi } from './discrete-DcZNj1Jm.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'seemly';
import 'vooks';
import 'vdirs';
import 'css-render';
import '@css-render/plugin-bem';
import 'lodash-es';
import 'evtd';
import 'pinia';
import 'vue-router';

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
    const provinces = ref([
      "\u5317\u4EAC\u5E02",
      "\u4E0A\u6D77\u5E02",
      "\u5929\u6D25\u5E02",
      "\u91CD\u5E86\u5E02",
      "\u6CB3\u5317\u7701",
      "\u5C71\u897F\u7701",
      "\u8FBD\u5B81\u7701",
      "\u5409\u6797\u7701",
      "\u9ED1\u9F99\u6C5F\u7701",
      "\u6C5F\u82CF\u7701",
      "\u6D59\u6C5F\u7701",
      "\u5B89\u5FBD\u7701",
      "\u798F\u5EFA\u7701",
      "\u6C5F\u897F\u7701",
      "\u5C71\u4E1C\u7701",
      "\u6CB3\u5357\u7701",
      "\u6E56\u5317\u7701",
      "\u6E56\u5357\u7701",
      "\u5E7F\u4E1C\u7701",
      "\u6D77\u5357\u7701",
      "\u56DB\u5DDD\u7701",
      "\u8D35\u5DDE\u7701",
      "\u4E91\u5357\u7701",
      "\u9655\u897F\u7701",
      "\u7518\u8083\u7701",
      "\u9752\u6D77\u7701",
      "\u5185\u8499\u53E4\u81EA\u6CBB\u533A",
      "\u5E7F\u897F\u58EE\u65CF\u81EA\u6CBB\u533A",
      "\u897F\u85CF\u81EA\u6CBB\u533A",
      "\u5B81\u590F\u56DE\u65CF\u81EA\u6CBB\u533A",
      "\u65B0\u7586\u7EF4\u543E\u5C14\u81EA\u6CBB\u533A"
    ]);
    const cities = ref([]);
    const districts = ref([]);
    const isEditing = computed(() => editingAddress.value !== null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-b50377c2><div class="fixed inset-0 pointer-events-none" data-v-b50377c2><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-b50377c2></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-b50377c2></div></div><nav class="relative z-10" data-v-b50377c2><div class="container mx-auto px-6 py-6" data-v-b50377c2><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-b50377c2><div class="flex items-center justify-between" data-v-b50377c2><div class="flex items-center space-x-6" data-v-b50377c2>`);
      _push(ssrRenderComponent(_component_AppLogo, {
        size: "medium",
        "show-decorations": false
      }, null, _parent));
      _push(`<div class="h-6 w-px bg-gray-600" data-v-b50377c2></div><button class="group relative inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden" data-v-b50377c2><div class="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-xl transition-all duration-300 group-hover:from-cyan-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30" data-v-b50377c2></div><div class="absolute inset-0 border-2 border-cyan-500/30 rounded-xl transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-lg group-hover:shadow-cyan-400/25" data-v-b50377c2></div><div class="absolute inset-0 rounded-xl overflow-hidden" data-v-b50377c2><div class="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "20%", "left": "15%", "animation-delay": "0s" })}" data-v-b50377c2></div><div class="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "60%", "left": "80%", "animation-delay": "0.2s" })}" data-v-b50377c2></div><div class="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "80%", "left": "30%", "animation-delay": "0.4s" })}" data-v-b50377c2></div></div><div class="relative flex items-center" data-v-b50377c2><div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mr-3 transition-all duration-300 group-hover:from-cyan-400/40 group-hover:to-blue-400/40 group-hover:scale-110" data-v-b50377c2><i class="bi bi-arrow-left text-cyan-400 text-lg transition-all duration-300 group-hover:text-white group-hover:-translate-x-1" data-v-b50377c2></i></div><div class="text-left" data-v-b50377c2><div class="text-white text-sm font-semibold transition-all duration-300 group-hover:text-cyan-100" data-v-b50377c2>\u8FD4\u56DE</div><div class="text-gray-400 text-xs transition-all duration-300 group-hover:text-cyan-300" data-v-b50377c2>Back</div></div></div><div class="absolute right-3 top-1/2 transform -translate-y-1/2" data-v-b50377c2><div class="flex flex-col space-y-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300" data-v-b50377c2><div class="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full transition-all duration-300 group-hover:w-8" data-v-b50377c2></div><div class="w-4 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full transition-all duration-300 group-hover:w-6 delay-75" data-v-b50377c2></div><div class="w-2 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full transition-all duration-300 group-hover:w-4 delay-150" data-v-b50377c2></div></div></div></button></div><nav class="text-sm text-gray-400" data-v-b50377c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-cyan-400 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u9996\u9875`);
          } else {
            return [
              createTextVNode("\u9996\u9875")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-b50377c2></i><span class="text-white font-medium" data-v-b50377c2>\u6536\u8D27\u5730\u5740</span></nav></div></div></div></nav><div class="relative z-10 py-8" data-v-b50377c2><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-v-b50377c2><div class="mb-8 animate-fade-in-up" data-v-b50377c2><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-b50377c2><div class="flex items-center justify-between" data-v-b50377c2><div data-v-b50377c2><h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3" data-v-b50377c2><i class="bi bi-geo-alt-fill text-cyan-400 text-3xl animate-bounce-gentle" data-v-b50377c2></i> \u6536\u8D27\u5730\u5740\u7BA1\u7406 </h1><p class="text-gray-300 text-lg" data-v-b50377c2>\u7BA1\u7406\u60A8\u7684\u6536\u8D27\u5730\u5740\uFF0C\u652F\u6301\u591A\u4E2A\u5730\u5740\u5E76\u8BBE\u7F6E\u9ED8\u8BA4\u5730\u5740</p></div><button class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2" data-v-b50377c2><i class="bi bi-plus-circle text-lg" data-v-b50377c2></i> \u6DFB\u52A0\u65B0\u5730\u5740 </button></div></div></div>`);
      if (loading.value) {
        _push(`<div class="animate-fade-in-up animation-delay-200" data-v-b50377c2><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center" data-v-b50377c2><div class="loading-spinner mx-auto mb-4" data-v-b50377c2></div><p class="text-gray-300" data-v-b50377c2>\u6B63\u5728\u52A0\u8F7D\u5730\u5740\u5217\u8868...</p></div></div>`);
      } else if (addresses2.value.length === 0) {
        _push(`<div class="animate-fade-in-up animation-delay-200" data-v-b50377c2><div class="glass-card-dark rounded-2xl p-16 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center" data-v-b50377c2><i class="bi bi-geo-alt text-6xl text-gray-400 mb-6" data-v-b50377c2></i><h3 class="text-xl font-semibold text-white mb-4" data-v-b50377c2>\u6682\u65E0\u6536\u8D27\u5730\u5740</h3><p class="text-gray-400 mb-8" data-v-b50377c2>\u6DFB\u52A0\u60A8\u7684\u7B2C\u4E00\u4E2A\u6536\u8D27\u5730\u5740\uFF0C\u8BA9\u8D2D\u7269\u66F4\u52A0\u4FBF\u6377</p><button class="btn-premium-dark px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-b50377c2><i class="bi bi-plus-circle mr-2" data-v-b50377c2></i> \u6DFB\u52A0\u6536\u8D27\u5730\u5740 </button></div></div>`);
      } else {
        _push(`<div class="space-y-6 animate-fade-in-up animation-delay-200" data-v-b50377c2><!--[-->`);
        ssrRenderList(addresses2.value, (address) => {
          _push(`<div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1" data-v-b50377c2><div class="flex items-start justify-between" data-v-b50377c2><div class="flex-1" data-v-b50377c2><div class="flex items-center gap-3 mb-4" data-v-b50377c2><h3 class="text-xl font-semibold text-white" data-v-b50377c2>${ssrInterpolate(address.name)}</h3><span class="text-gray-300" data-v-b50377c2>${ssrInterpolate(address.phone)}</span>`);
          if (address.is_default) {
            _push(`<span class="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-full" data-v-b50377c2><i class="bi bi-star-fill mr-1" data-v-b50377c2></i> \u9ED8\u8BA4\u5730\u5740 </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-gray-300 leading-relaxed" data-v-b50377c2><p class="text-lg" data-v-b50377c2>${ssrInterpolate(address.province)} ${ssrInterpolate(address.city)} ${ssrInterpolate(address.district)}</p><p class="text-gray-400 mt-1" data-v-b50377c2>${ssrInterpolate(address.detail)}</p>`);
          if (address.postal_code) {
            _push(`<p class="text-gray-400 text-sm mt-1" data-v-b50377c2>\u90AE\u653F\u7F16\u7801\uFF1A${ssrInterpolate(address.postal_code)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex flex-col space-y-2 ml-6" data-v-b50377c2>`);
          if (!address.is_default) {
            _push(`<button${ssrIncludeBooleanAttr(settingDefault.value) ? " disabled" : ""} class="btn-outline-dark px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50" data-v-b50377c2><i class="bi bi-star mr-1" data-v-b50377c2></i> \u8BBE\u4E3A\u9ED8\u8BA4 </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="btn-outline-dark px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-b50377c2><i class="bi bi-pencil mr-1" data-v-b50377c2></i> \u7F16\u8F91 </button><button${ssrIncludeBooleanAttr(deleting.value) ? " disabled" : ""} class="btn-danger px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50" data-v-b50377c2><i class="bi bi-trash mr-1" data-v-b50377c2></i> \u5220\u9664 </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      if (showAddModal.value || showEditModal.value) {
        _push(`<div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4" data-v-b50377c2><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-scale-in w-full max-w-2xl max-h-[90vh] overflow-y-auto" data-v-b50377c2><div class="p-8" data-v-b50377c2><h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-b50377c2><i class="bi bi-geo-alt text-cyan-400" data-v-b50377c2></i> ${ssrInterpolate(isEditing.value ? "\u7F16\u8F91\u5730\u5740" : "\u6DFB\u52A0\u65B0\u5730\u5740")}</h3><form class="space-y-6" data-v-b50377c2><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-b50377c2><div class="space-y-2" data-v-b50377c2><label for="name" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>\u6536\u8D27\u4EBA\u59D3\u540D *</label><input id="name"${ssrRenderAttr("value", form.name)} type="text" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA\u59D3\u540D" required data-v-b50377c2></div><div class="space-y-2" data-v-b50377c2><label for="phone" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>\u624B\u673A\u53F7\u7801 *</label><input id="phone"${ssrRenderAttr("value", form.phone)} type="tel" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801" required data-v-b50377c2></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-b50377c2><div class="space-y-2" data-v-b50377c2><label for="province" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>\u7701\u4EFD *</label><select id="province" class="input-dark w-full" required data-v-b50377c2><option value="" data-v-b50377c2${ssrIncludeBooleanAttr(Array.isArray(form.province) ? ssrLooseContain(form.province, "") : ssrLooseEqual(form.province, "")) ? " selected" : ""}>\u8BF7\u9009\u62E9\u7701\u4EFD</option><!--[-->`);
        ssrRenderList(provinces.value, (province) => {
          _push(`<option${ssrRenderAttr("value", province)} data-v-b50377c2${ssrIncludeBooleanAttr(Array.isArray(form.province) ? ssrLooseContain(form.province, province) : ssrLooseEqual(form.province, province)) ? " selected" : ""}>${ssrInterpolate(province)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2" data-v-b50377c2><label for="city" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>\u57CE\u5E02 *</label><select id="city" class="input-dark w-full" required data-v-b50377c2><option value="" data-v-b50377c2${ssrIncludeBooleanAttr(Array.isArray(form.city) ? ssrLooseContain(form.city, "") : ssrLooseEqual(form.city, "")) ? " selected" : ""}>\u8BF7\u9009\u62E9\u57CE\u5E02</option><!--[-->`);
        ssrRenderList(cities.value, (city) => {
          _push(`<option${ssrRenderAttr("value", city)} data-v-b50377c2${ssrIncludeBooleanAttr(Array.isArray(form.city) ? ssrLooseContain(form.city, city) : ssrLooseEqual(form.city, city)) ? " selected" : ""}>${ssrInterpolate(city)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2" data-v-b50377c2><label for="district" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>\u533A\u53BF *</label><select id="district" class="input-dark w-full" required data-v-b50377c2><option value="" data-v-b50377c2${ssrIncludeBooleanAttr(Array.isArray(form.district) ? ssrLooseContain(form.district, "") : ssrLooseEqual(form.district, "")) ? " selected" : ""}>\u8BF7\u9009\u62E9\u533A\u53BF</option><!--[-->`);
        ssrRenderList(districts.value, (district) => {
          _push(`<option${ssrRenderAttr("value", district)} data-v-b50377c2${ssrIncludeBooleanAttr(Array.isArray(form.district) ? ssrLooseContain(form.district, district) : ssrLooseEqual(form.district, district)) ? " selected" : ""}>${ssrInterpolate(district)}</option>`);
        });
        _push(`<!--]--></select></div></div><div class="space-y-2" data-v-b50377c2><label for="detail" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>\u8BE6\u7EC6\u5730\u5740 *</label><textarea id="detail" class="input-dark w-full h-24 resize-none" placeholder="\u8BF7\u8F93\u5165\u8BE6\u7EC6\u5730\u5740\uFF0C\u5982\u8857\u9053\u3001\u95E8\u724C\u53F7\u3001\u697C\u5C42\u7B49" required data-v-b50377c2>${ssrInterpolate(form.detail)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-b50377c2><div class="space-y-2" data-v-b50377c2><label for="postal_code" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>\u90AE\u653F\u7F16\u7801</label><input id="postal_code"${ssrRenderAttr("value", form.postal_code)} type="text" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u90AE\u653F\u7F16\u7801\uFF08\u53EF\u9009\uFF09" data-v-b50377c2></div><div class="space-y-2 flex items-end" data-v-b50377c2><label class="flex items-center space-x-2" data-v-b50377c2><input${ssrIncludeBooleanAttr(Array.isArray(form.is_default) ? ssrLooseContain(form.is_default, null) : form.is_default) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-cyan-500 bg-transparent border-2 border-cyan-500 rounded focus:ring-cyan-500" data-v-b50377c2><span class="text-sm text-gray-300" data-v-b50377c2>\u8BBE\u4E3A\u9ED8\u8BA4\u5730\u5740</span></label></div></div><div class="flex justify-end space-x-4 pt-6" data-v-b50377c2><button type="button" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-b50377c2><i class="bi bi-x-circle mr-2" data-v-b50377c2></i> \u53D6\u6D88 </button><button type="submit"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-b50377c2>`);
        if (submitting.value) {
          _push(`<span class="loading loading-spinner loading-sm mr-2" data-v-b50377c2></span>`);
        } else {
          _push(`<i class="bi bi-check-circle mr-2" data-v-b50377c2></i>`);
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
const addresses = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b50377c2"]]);

export { addresses as default };
//# sourceMappingURL=addresses-Cheon1lo.mjs.map
