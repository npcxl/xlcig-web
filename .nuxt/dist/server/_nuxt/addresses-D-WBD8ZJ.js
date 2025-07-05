import { defineComponent, ref, reactive, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import "./apiClient-C7W98XI_.js";
import { _ as __nuxt_component_0 } from "./AppHeader-D4R1WNqE.js";
import { c as createDiscreteApi } from "./useLocation-DU515pZE.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./nuxt-link-qhU_stN5.js";
import "D:/codeGitee/xlweb/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlweb/node_modules/hookable/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/codeGitee/xlweb/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/codeGitee/xlweb/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/klona/dist/index.mjs";
import "./AppLogo-B7Z3yKfV.js";
import "seemly";
import "treemate";
import "vooks";
import "vdirs";
import "lodash-es";
import "css-render";
import "evtd";
import "@css-render/plugin-bem";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-1b5b1e9c><div class="fixed inset-0 pointer-events-none" data-v-1b5b1e9c><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-1b5b1e9c></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-1b5b1e9c></div></div>`);
      _push(ssrRenderComponent(__nuxt_component_0, {
        "show-back-button": false,
        "show-nav-menu": false,
        "show-breadcrumb": true,
        "show-location": false,
        "show-search-button": false,
        "show-notification-button": false,
        "show-decorations": false,
        "logo-size": "medium",
        "current-page-title": "收货地址"
      }, null, _parent));
      _push(`<div class="relative z-10 py-8" data-v-1b5b1e9c><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-v-1b5b1e9c><div class="mb-8 animate-fade-in-up" data-v-1b5b1e9c><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-1b5b1e9c><div class="flex items-center justify-between" data-v-1b5b1e9c><div data-v-1b5b1e9c><h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3" data-v-1b5b1e9c><i class="bi bi-geo-alt-fill text-cyan-400 text-3xl animate-bounce-gentle" data-v-1b5b1e9c></i> 收货地址管理 </h1><p class="text-gray-300 text-lg" data-v-1b5b1e9c>管理您的收货地址，支持多个地址并设置默认地址</p></div><button class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2" data-v-1b5b1e9c><i class="bi bi-plus-circle text-lg" data-v-1b5b1e9c></i> 添加新地址 </button></div></div></div>`);
      if (loading.value) {
        _push(`<div class="animate-fade-in-up animation-delay-200" data-v-1b5b1e9c><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center" data-v-1b5b1e9c><div class="loading-spinner mx-auto mb-4" data-v-1b5b1e9c></div><p class="text-gray-300" data-v-1b5b1e9c>正在加载地址列表...</p></div></div>`);
      } else if (addresses2.value.length === 0) {
        _push(`<div class="animate-fade-in-up animation-delay-200" data-v-1b5b1e9c><div class="glass-card-dark rounded-2xl p-16 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center" data-v-1b5b1e9c><i class="bi bi-geo-alt text-6xl text-gray-400 mb-6" data-v-1b5b1e9c></i><h3 class="text-xl font-semibold text-white mb-4" data-v-1b5b1e9c>暂无收货地址</h3><p class="text-gray-400 mb-8" data-v-1b5b1e9c>添加您的第一个收货地址，让购物更加便捷</p><button class="btn-premium-dark px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-1b5b1e9c><i class="bi bi-plus-circle mr-2" data-v-1b5b1e9c></i> 添加收货地址 </button></div></div>`);
      } else {
        _push(`<div class="space-y-6 animate-fade-in-up animation-delay-200" data-v-1b5b1e9c><!--[-->`);
        ssrRenderList(addresses2.value, (address) => {
          _push(`<div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1" data-v-1b5b1e9c><div class="flex items-start justify-between" data-v-1b5b1e9c><div class="flex-1" data-v-1b5b1e9c><div class="flex items-center gap-3 mb-4" data-v-1b5b1e9c><h3 class="text-xl font-semibold text-white" data-v-1b5b1e9c>${ssrInterpolate(address.name)}</h3><span class="text-gray-300" data-v-1b5b1e9c>${ssrInterpolate(address.phone)}</span>`);
          if (address.is_default) {
            _push(`<span class="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-full" data-v-1b5b1e9c><i class="bi bi-star-fill mr-1" data-v-1b5b1e9c></i> 默认地址 </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-gray-300 leading-relaxed" data-v-1b5b1e9c><p class="text-lg" data-v-1b5b1e9c>${ssrInterpolate(address.province)} ${ssrInterpolate(address.city)} ${ssrInterpolate(address.district)}</p><p class="text-gray-400 mt-1" data-v-1b5b1e9c>${ssrInterpolate(address.detail)}</p>`);
          if (address.postal_code) {
            _push(`<p class="text-gray-400 text-sm mt-1" data-v-1b5b1e9c>邮政编码：${ssrInterpolate(address.postal_code)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex flex-col space-y-2 ml-6" data-v-1b5b1e9c>`);
          if (!address.is_default) {
            _push(`<button${ssrIncludeBooleanAttr(settingDefault.value) ? " disabled" : ""} class="btn-outline-dark px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50" data-v-1b5b1e9c><i class="bi bi-star mr-1" data-v-1b5b1e9c></i> 设为默认 </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="btn-outline-dark px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-1b5b1e9c><i class="bi bi-pencil mr-1" data-v-1b5b1e9c></i> 编辑 </button><button${ssrIncludeBooleanAttr(deleting.value) ? " disabled" : ""} class="btn-danger px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50" data-v-1b5b1e9c><i class="bi bi-trash mr-1" data-v-1b5b1e9c></i> 删除 </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      if (showAddModal.value || showEditModal.value) {
        _push(`<div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4" data-v-1b5b1e9c><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-scale-in w-full max-w-2xl max-h-[90vh] overflow-y-auto" data-v-1b5b1e9c><div class="p-8" data-v-1b5b1e9c><h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-1b5b1e9c><i class="bi bi-geo-alt text-cyan-400" data-v-1b5b1e9c></i> ${ssrInterpolate(isEditing.value ? "编辑地址" : "添加新地址")}</h3><form class="space-y-6" data-v-1b5b1e9c><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-1b5b1e9c><div class="space-y-2" data-v-1b5b1e9c><label for="name" class="block text-sm font-medium text-cyan-400" data-v-1b5b1e9c>收货人姓名 *</label><input id="name"${ssrRenderAttr("value", form.name)} type="text" class="input-dark w-full" placeholder="请输入收货人姓名" required data-v-1b5b1e9c></div><div class="space-y-2" data-v-1b5b1e9c><label for="phone" class="block text-sm font-medium text-cyan-400" data-v-1b5b1e9c>手机号码 *</label><input id="phone"${ssrRenderAttr("value", form.phone)} type="tel" class="input-dark w-full" placeholder="请输入手机号码" required data-v-1b5b1e9c></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-1b5b1e9c><div class="space-y-2" data-v-1b5b1e9c><label for="province" class="block text-sm font-medium text-cyan-400" data-v-1b5b1e9c>省份 *</label><select id="province" class="input-dark w-full" required data-v-1b5b1e9c><option value="" data-v-1b5b1e9c${ssrIncludeBooleanAttr(Array.isArray(form.province) ? ssrLooseContain(form.province, "") : ssrLooseEqual(form.province, "")) ? " selected" : ""}>请选择省份</option><!--[-->`);
        ssrRenderList(provinces.value, (province) => {
          _push(`<option${ssrRenderAttr("value", province.name)} data-v-1b5b1e9c${ssrIncludeBooleanAttr(Array.isArray(form.province) ? ssrLooseContain(form.province, province.name) : ssrLooseEqual(form.province, province.name)) ? " selected" : ""}>${ssrInterpolate(province.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2" data-v-1b5b1e9c><label for="city" class="block text-sm font-medium text-cyan-400" data-v-1b5b1e9c>城市 *</label><select id="city" class="input-dark w-full" required data-v-1b5b1e9c><option value="" data-v-1b5b1e9c${ssrIncludeBooleanAttr(Array.isArray(form.city) ? ssrLooseContain(form.city, "") : ssrLooseEqual(form.city, "")) ? " selected" : ""}>请选择城市</option><!--[-->`);
        ssrRenderList(cities.value, (city) => {
          _push(`<option${ssrRenderAttr("value", city.name)} data-v-1b5b1e9c${ssrIncludeBooleanAttr(Array.isArray(form.city) ? ssrLooseContain(form.city, city.name) : ssrLooseEqual(form.city, city.name)) ? " selected" : ""}>${ssrInterpolate(city.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2" data-v-1b5b1e9c><label for="district" class="block text-sm font-medium text-cyan-400" data-v-1b5b1e9c>区县 *</label><select id="district" class="input-dark w-full" required data-v-1b5b1e9c><option value="" data-v-1b5b1e9c${ssrIncludeBooleanAttr(Array.isArray(form.district) ? ssrLooseContain(form.district, "") : ssrLooseEqual(form.district, "")) ? " selected" : ""}>请选择区县</option><!--[-->`);
        ssrRenderList(districts.value, (district) => {
          _push(`<option${ssrRenderAttr("value", district.name)} data-v-1b5b1e9c${ssrIncludeBooleanAttr(Array.isArray(form.district) ? ssrLooseContain(form.district, district.name) : ssrLooseEqual(form.district, district.name)) ? " selected" : ""}>${ssrInterpolate(district.name)}</option>`);
        });
        _push(`<!--]--></select></div></div><div class="space-y-2" data-v-1b5b1e9c><label for="detail" class="block text-sm font-medium text-cyan-400" data-v-1b5b1e9c>详细地址 *</label><textarea id="detail" class="input-dark w-full h-24 resize-none" placeholder="请输入详细地址，如街道、门牌号、楼层等" required data-v-1b5b1e9c>${ssrInterpolate(form.detail)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-1b5b1e9c><div class="space-y-2" data-v-1b5b1e9c><label for="postal_code" class="block text-sm font-medium text-cyan-400" data-v-1b5b1e9c>邮政编码</label><input id="postal_code"${ssrRenderAttr("value", form.postal_code)} type="text" class="input-dark w-full" placeholder="请输入邮政编码（可选）" data-v-1b5b1e9c></div><div class="space-y-2 flex items-end" data-v-1b5b1e9c><label class="flex items-center space-x-2" data-v-1b5b1e9c><input${ssrIncludeBooleanAttr(Array.isArray(form.is_default) ? ssrLooseContain(form.is_default, null) : form.is_default) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-cyan-500 bg-transparent border-2 border-cyan-500 rounded focus:ring-cyan-500" data-v-1b5b1e9c><span class="text-sm text-gray-300" data-v-1b5b1e9c>设为默认地址</span></label></div></div><div class="flex justify-end space-x-4 pt-6" data-v-1b5b1e9c><button type="button" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-1b5b1e9c><i class="bi bi-x-circle mr-2" data-v-1b5b1e9c></i> 取消 </button><button type="submit"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-1b5b1e9c>`);
        if (submitting.value) {
          _push(`<span class="loading loading-spinner loading-sm mr-2" data-v-1b5b1e9c></span>`);
        } else {
          _push(`<i class="bi bi-check-circle mr-2" data-v-1b5b1e9c></i>`);
        }
        _push(` ${ssrInterpolate(submitting.value ? "保存中..." : isEditing.value ? "保存修改" : "添加地址")}</button></div></form></div></div></div>`);
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
const addresses = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1b5b1e9c"]]);
export {
  addresses as default
};
//# sourceMappingURL=addresses-D-WBD8ZJ.js.map
