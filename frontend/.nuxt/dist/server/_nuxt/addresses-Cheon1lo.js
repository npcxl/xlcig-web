import { _ as __nuxt_component_0 } from "./AppLogo-C8xp92Ad.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-Dq0IxfZC.js";
import { defineComponent, ref, reactive, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import "./apiClient-Hs_n9WkJ.js";
import { M as createDiscreteApi } from "./discrete-DcZNj1Jm.js";
import { _ as _export_sfc } from "../server.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/ufo/dist/index.mjs";
import "seemly";
import "vooks";
import "vdirs";
import "css-render";
import "@css-render/plugin-bem";
import "lodash-es";
import "evtd";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlcig-web/frontend/node_modules/hookable/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/codeGitee/xlcig-web/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/codeGitee/xlcig-web/frontend/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/klona/dist/index.mjs";
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
      "北京市",
      "上海市",
      "天津市",
      "重庆市",
      "河北省",
      "山西省",
      "辽宁省",
      "吉林省",
      "黑龙江省",
      "江苏省",
      "浙江省",
      "安徽省",
      "福建省",
      "江西省",
      "山东省",
      "河南省",
      "湖北省",
      "湖南省",
      "广东省",
      "海南省",
      "四川省",
      "贵州省",
      "云南省",
      "陕西省",
      "甘肃省",
      "青海省",
      "内蒙古自治区",
      "广西壮族自治区",
      "西藏自治区",
      "宁夏回族自治区",
      "新疆维吾尔自治区"
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
      _push(`<div class="h-6 w-px bg-gray-600" data-v-b50377c2></div><button class="group relative inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden" data-v-b50377c2><div class="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-xl transition-all duration-300 group-hover:from-cyan-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30" data-v-b50377c2></div><div class="absolute inset-0 border-2 border-cyan-500/30 rounded-xl transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-lg group-hover:shadow-cyan-400/25" data-v-b50377c2></div><div class="absolute inset-0 rounded-xl overflow-hidden" data-v-b50377c2><div class="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "20%", "left": "15%", "animation-delay": "0s" })}" data-v-b50377c2></div><div class="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "60%", "left": "80%", "animation-delay": "0.2s" })}" data-v-b50377c2></div><div class="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "80%", "left": "30%", "animation-delay": "0.4s" })}" data-v-b50377c2></div></div><div class="relative flex items-center" data-v-b50377c2><div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mr-3 transition-all duration-300 group-hover:from-cyan-400/40 group-hover:to-blue-400/40 group-hover:scale-110" data-v-b50377c2><i class="bi bi-arrow-left text-cyan-400 text-lg transition-all duration-300 group-hover:text-white group-hover:-translate-x-1" data-v-b50377c2></i></div><div class="text-left" data-v-b50377c2><div class="text-white text-sm font-semibold transition-all duration-300 group-hover:text-cyan-100" data-v-b50377c2>返回</div><div class="text-gray-400 text-xs transition-all duration-300 group-hover:text-cyan-300" data-v-b50377c2>Back</div></div></div><div class="absolute right-3 top-1/2 transform -translate-y-1/2" data-v-b50377c2><div class="flex flex-col space-y-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300" data-v-b50377c2><div class="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full transition-all duration-300 group-hover:w-8" data-v-b50377c2></div><div class="w-4 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full transition-all duration-300 group-hover:w-6 delay-75" data-v-b50377c2></div><div class="w-2 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full transition-all duration-300 group-hover:w-4 delay-150" data-v-b50377c2></div></div></div></button></div><nav class="text-sm text-gray-400" data-v-b50377c2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-cyan-400 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`首页`);
          } else {
            return [
              createTextVNode("首页")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-b50377c2></i><span class="text-white font-medium" data-v-b50377c2>收货地址</span></nav></div></div></div></nav><div class="relative z-10 py-8" data-v-b50377c2><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-v-b50377c2><div class="mb-8 animate-fade-in-up" data-v-b50377c2><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-b50377c2><div class="flex items-center justify-between" data-v-b50377c2><div data-v-b50377c2><h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3" data-v-b50377c2><i class="bi bi-geo-alt-fill text-cyan-400 text-3xl animate-bounce-gentle" data-v-b50377c2></i> 收货地址管理 </h1><p class="text-gray-300 text-lg" data-v-b50377c2>管理您的收货地址，支持多个地址并设置默认地址</p></div><button class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2" data-v-b50377c2><i class="bi bi-plus-circle text-lg" data-v-b50377c2></i> 添加新地址 </button></div></div></div>`);
      if (loading.value) {
        _push(`<div class="animate-fade-in-up animation-delay-200" data-v-b50377c2><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center" data-v-b50377c2><div class="loading-spinner mx-auto mb-4" data-v-b50377c2></div><p class="text-gray-300" data-v-b50377c2>正在加载地址列表...</p></div></div>`);
      } else if (addresses2.value.length === 0) {
        _push(`<div class="animate-fade-in-up animation-delay-200" data-v-b50377c2><div class="glass-card-dark rounded-2xl p-16 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center" data-v-b50377c2><i class="bi bi-geo-alt text-6xl text-gray-400 mb-6" data-v-b50377c2></i><h3 class="text-xl font-semibold text-white mb-4" data-v-b50377c2>暂无收货地址</h3><p class="text-gray-400 mb-8" data-v-b50377c2>添加您的第一个收货地址，让购物更加便捷</p><button class="btn-premium-dark px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-b50377c2><i class="bi bi-plus-circle mr-2" data-v-b50377c2></i> 添加收货地址 </button></div></div>`);
      } else {
        _push(`<div class="space-y-6 animate-fade-in-up animation-delay-200" data-v-b50377c2><!--[-->`);
        ssrRenderList(addresses2.value, (address) => {
          _push(`<div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1" data-v-b50377c2><div class="flex items-start justify-between" data-v-b50377c2><div class="flex-1" data-v-b50377c2><div class="flex items-center gap-3 mb-4" data-v-b50377c2><h3 class="text-xl font-semibold text-white" data-v-b50377c2>${ssrInterpolate(address.name)}</h3><span class="text-gray-300" data-v-b50377c2>${ssrInterpolate(address.phone)}</span>`);
          if (address.is_default) {
            _push(`<span class="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-full" data-v-b50377c2><i class="bi bi-star-fill mr-1" data-v-b50377c2></i> 默认地址 </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-gray-300 leading-relaxed" data-v-b50377c2><p class="text-lg" data-v-b50377c2>${ssrInterpolate(address.province)} ${ssrInterpolate(address.city)} ${ssrInterpolate(address.district)}</p><p class="text-gray-400 mt-1" data-v-b50377c2>${ssrInterpolate(address.detail)}</p>`);
          if (address.postal_code) {
            _push(`<p class="text-gray-400 text-sm mt-1" data-v-b50377c2>邮政编码：${ssrInterpolate(address.postal_code)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex flex-col space-y-2 ml-6" data-v-b50377c2>`);
          if (!address.is_default) {
            _push(`<button${ssrIncludeBooleanAttr(settingDefault.value) ? " disabled" : ""} class="btn-outline-dark px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50" data-v-b50377c2><i class="bi bi-star mr-1" data-v-b50377c2></i> 设为默认 </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="btn-outline-dark px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-b50377c2><i class="bi bi-pencil mr-1" data-v-b50377c2></i> 编辑 </button><button${ssrIncludeBooleanAttr(deleting.value) ? " disabled" : ""} class="btn-danger px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50" data-v-b50377c2><i class="bi bi-trash mr-1" data-v-b50377c2></i> 删除 </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      if (showAddModal.value || showEditModal.value) {
        _push(`<div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4" data-v-b50377c2><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-scale-in w-full max-w-2xl max-h-[90vh] overflow-y-auto" data-v-b50377c2><div class="p-8" data-v-b50377c2><h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-b50377c2><i class="bi bi-geo-alt text-cyan-400" data-v-b50377c2></i> ${ssrInterpolate(isEditing.value ? "编辑地址" : "添加新地址")}</h3><form class="space-y-6" data-v-b50377c2><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-b50377c2><div class="space-y-2" data-v-b50377c2><label for="name" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>收货人姓名 *</label><input id="name"${ssrRenderAttr("value", form.name)} type="text" class="input-dark w-full" placeholder="请输入收货人姓名" required data-v-b50377c2></div><div class="space-y-2" data-v-b50377c2><label for="phone" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>手机号码 *</label><input id="phone"${ssrRenderAttr("value", form.phone)} type="tel" class="input-dark w-full" placeholder="请输入手机号码" required data-v-b50377c2></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-b50377c2><div class="space-y-2" data-v-b50377c2><label for="province" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>省份 *</label><select id="province" class="input-dark w-full" required data-v-b50377c2><option value="" data-v-b50377c2${ssrIncludeBooleanAttr(Array.isArray(form.province) ? ssrLooseContain(form.province, "") : ssrLooseEqual(form.province, "")) ? " selected" : ""}>请选择省份</option><!--[-->`);
        ssrRenderList(provinces.value, (province) => {
          _push(`<option${ssrRenderAttr("value", province)} data-v-b50377c2${ssrIncludeBooleanAttr(Array.isArray(form.province) ? ssrLooseContain(form.province, province) : ssrLooseEqual(form.province, province)) ? " selected" : ""}>${ssrInterpolate(province)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2" data-v-b50377c2><label for="city" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>城市 *</label><select id="city" class="input-dark w-full" required data-v-b50377c2><option value="" data-v-b50377c2${ssrIncludeBooleanAttr(Array.isArray(form.city) ? ssrLooseContain(form.city, "") : ssrLooseEqual(form.city, "")) ? " selected" : ""}>请选择城市</option><!--[-->`);
        ssrRenderList(cities.value, (city) => {
          _push(`<option${ssrRenderAttr("value", city)} data-v-b50377c2${ssrIncludeBooleanAttr(Array.isArray(form.city) ? ssrLooseContain(form.city, city) : ssrLooseEqual(form.city, city)) ? " selected" : ""}>${ssrInterpolate(city)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2" data-v-b50377c2><label for="district" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>区县 *</label><select id="district" class="input-dark w-full" required data-v-b50377c2><option value="" data-v-b50377c2${ssrIncludeBooleanAttr(Array.isArray(form.district) ? ssrLooseContain(form.district, "") : ssrLooseEqual(form.district, "")) ? " selected" : ""}>请选择区县</option><!--[-->`);
        ssrRenderList(districts.value, (district) => {
          _push(`<option${ssrRenderAttr("value", district)} data-v-b50377c2${ssrIncludeBooleanAttr(Array.isArray(form.district) ? ssrLooseContain(form.district, district) : ssrLooseEqual(form.district, district)) ? " selected" : ""}>${ssrInterpolate(district)}</option>`);
        });
        _push(`<!--]--></select></div></div><div class="space-y-2" data-v-b50377c2><label for="detail" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>详细地址 *</label><textarea id="detail" class="input-dark w-full h-24 resize-none" placeholder="请输入详细地址，如街道、门牌号、楼层等" required data-v-b50377c2>${ssrInterpolate(form.detail)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-b50377c2><div class="space-y-2" data-v-b50377c2><label for="postal_code" class="block text-sm font-medium text-cyan-400" data-v-b50377c2>邮政编码</label><input id="postal_code"${ssrRenderAttr("value", form.postal_code)} type="text" class="input-dark w-full" placeholder="请输入邮政编码（可选）" data-v-b50377c2></div><div class="space-y-2 flex items-end" data-v-b50377c2><label class="flex items-center space-x-2" data-v-b50377c2><input${ssrIncludeBooleanAttr(Array.isArray(form.is_default) ? ssrLooseContain(form.is_default, null) : form.is_default) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-cyan-500 bg-transparent border-2 border-cyan-500 rounded focus:ring-cyan-500" data-v-b50377c2><span class="text-sm text-gray-300" data-v-b50377c2>设为默认地址</span></label></div></div><div class="flex justify-end space-x-4 pt-6" data-v-b50377c2><button type="button" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-b50377c2><i class="bi bi-x-circle mr-2" data-v-b50377c2></i> 取消 </button><button type="submit"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-b50377c2>`);
        if (submitting.value) {
          _push(`<span class="loading loading-spinner loading-sm mr-2" data-v-b50377c2></span>`);
        } else {
          _push(`<i class="bi bi-check-circle mr-2" data-v-b50377c2></i>`);
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
const addresses = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b50377c2"]]);
export {
  addresses as default
};
//# sourceMappingURL=addresses-Cheon1lo.js.map
