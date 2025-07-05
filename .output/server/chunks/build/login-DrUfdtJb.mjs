import { _ as _export_sfc, u as useUserStore, a as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './AppLogo-DGHjqzot.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-D8iHomBq.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderDynamicModel, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate } from 'vue/server-renderer';
import { u as useLocation } from './useLocation-CdbkT8tR.mjs';
import { u as useAddressStore } from './address-CU5h3OeV.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';
import 'seemly';
import 'vooks';
import 'vdirs';
import 'css-render';
import '@css-render/plugin-bem';
import 'lodash-es';
import 'evtd';
import './addresses-CWcJVVLV.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    useAddressStore();
    useLocation();
    const loading = ref(false);
    const isPostLoginLoading = ref(false);
    const showPassword = ref(false);
    const rememberMe = ref(false);
    const loginForm = reactive({
      email: "",
      password: ""
    });
    const message = ref({
      show: false,
      type: "success",
      text: ""
    });
    const getLoginButtonText = () => {
      if (loading.value) return "\u767B\u5F55\u4E2D...";
      if (isPostLoginLoading.value) return "\u6B63\u5728\u521D\u59CB\u5316...";
      return "\u7ACB\u5373\u767B\u5F55";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingScreen = __nuxt_component_0;
      const _component_AppLogo = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-fb70e37b>`);
      _push(ssrRenderComponent(_component_LoadingScreen, { show: isPostLoginLoading.value }, null, _parent));
      _push(`<div class="fixed inset-0 pointer-events-none" data-v-fb70e37b><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-fb70e37b></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-fb70e37b></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-fb70e37b></div></div><nav class="relative z-10 w-full px-6 py-4" data-v-fb70e37b><div class="flex items-center justify-between" data-v-fb70e37b><div class="flex items-center space-x-4" data-v-fb70e37b>`);
      _push(ssrRenderComponent(_component_AppLogo, { size: "small" }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-arrow-left mr-2 text-lg" data-v-fb70e37b${_scopeId}></i><span class="text-sm font-medium" data-v-fb70e37b${_scopeId}>\u8FD4\u56DE\u9996\u9875</span>`);
          } else {
            return [
              createVNode("i", { class: "bi bi-arrow-left mr-2 text-lg" }),
              createVNode("span", { class: "text-sm font-medium" }, "\u8FD4\u56DE\u9996\u9875")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-sm font-medium" data-v-fb70e37b${_scopeId}>\u6CA1\u6709\u8D26\u53F7\uFF1F\u7ACB\u5373\u6CE8\u518C</span>`);
          } else {
            return [
              createVNode("span", { class: "text-sm font-medium" }, "\u6CA1\u6709\u8D26\u53F7\uFF1F\u7ACB\u5373\u6CE8\u518C")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></nav><div class="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6" data-v-fb70e37b><div class="w-full max-w-md" data-v-fb70e37b><div class="text-center mb-8" data-v-fb70e37b>`);
      _push(ssrRenderComponent(_component_AppLogo, { size: "medium" }, null, _parent));
      _push(`<h1 class="text-3xl font-bold text-white mt-6 mb-2" data-v-fb70e37b>\u6B22\u8FCE\u56DE\u6765</h1><p class="text-gray-400" data-v-fb70e37b>\u767B\u5F55\u60A8\u7684\u8D26\u6237\uFF0C\u7EE7\u7EED\u60A8\u7684\u88C5\u673A\u4E4B\u65C5</p></div><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-fb70e37b><form class="space-y-6" data-v-fb70e37b><div data-v-fb70e37b><label for="email" class="block text-sm font-medium text-white mb-2" data-v-fb70e37b>\u8D26\u53F7</label><div class="relative" data-v-fb70e37b><input id="email"${ssrRenderAttr("value", loginForm.email)} type="text" required placeholder="\u8BF7\u8F93\u5165\u90AE\u7BB1/\u7528\u6237\u540D/\u624B\u673A\u53F7" class="w-full px-4 py-3 pl-12 bg-gray-800/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 focus:bg-gray-800/90" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-fb70e37b><i class="bi bi-person absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" data-v-fb70e37b></i></div><p class="mt-2 text-xs text-gray-500" data-v-fb70e37b>\u652F\u6301\u90AE\u7BB1\u3001\u7528\u6237\u540D\u6216\u624B\u673A\u53F7\u767B\u5F55</p></div><div data-v-fb70e37b><label for="password" class="block text-sm font-medium text-white mb-2" data-v-fb70e37b>\u5BC6\u7801</label><div class="relative" data-v-fb70e37b><input id="password"${ssrRenderDynamicModel(showPassword.value ? "text" : "password", loginForm.password, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} required minlength="6" placeholder="\u8BF7\u8F93\u5165\u60A8\u7684\u5BC6\u7801" class="w-full px-4 py-3 pl-12 pr-12 bg-gray-800/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 focus:bg-gray-800/90" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-fb70e37b><i class="bi bi-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" data-v-fb70e37b></i><button type="button" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200" data-v-fb70e37b><i class="${ssrRenderClass([showPassword.value ? "bi bi-eye-slash" : "bi bi-eye", "text-lg"])}" data-v-fb70e37b></i></button></div></div><div class="flex items-center justify-between" data-v-fb70e37b><label class="flex items-center cursor-pointer group" data-v-fb70e37b><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(rememberMe.value) ? ssrLooseContain(rememberMe.value, null) : rememberMe.value) ? " checked" : ""} class="sr-only" data-v-fb70e37b><div class="relative" data-v-fb70e37b><div class="${ssrRenderClass([
        "w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center",
        rememberMe.value ? "bg-cyan-500 border-cyan-500 shadow-md shadow-cyan-500/30" : "border-gray-500 group-hover:border-cyan-400 bg-transparent"
      ])}" data-v-fb70e37b>`);
      if (rememberMe.value) {
        _push(`<i class="bi bi-check text-white text-xs leading-none" data-v-fb70e37b></i>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><span class="ml-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200 select-none" data-v-fb70e37b>\u8BB0\u4F4F\u6211</span></label><a href="#" class="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200" data-v-fb70e37b>\u5FD8\u8BB0\u5BC6\u7801\uFF1F</a></div><button type="submit"${ssrIncludeBooleanAttr(loading.value || isPostLoginLoading.value) ? " disabled" : ""} class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed flex items-center justify-center gap-2" data-v-fb70e37b>`);
      if (loading.value || isPostLoginLoading.value) {
        _push(`<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" data-v-fb70e37b></div>`);
      } else {
        _push(`<i class="bi bi-box-arrow-in-right text-lg" data-v-fb70e37b></i>`);
      }
      _push(` ${ssrInterpolate(getLoginButtonText())}</button></form><div class="relative my-6" data-v-fb70e37b><div class="absolute inset-0 flex items-center" data-v-fb70e37b><div class="w-full border-t border-gray-600" data-v-fb70e37b></div></div><div class="relative flex justify-center text-sm" data-v-fb70e37b><span class="px-2 bg-gray-800 text-gray-400" data-v-fb70e37b>\u6216\u8005</span></div></div><div class="text-center" data-v-fb70e37b><p class="text-gray-400 text-sm" data-v-fb70e37b> \u8FD8\u6CA1\u6709\u8D26\u53F7\uFF1F `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u7ACB\u5373\u6CE8\u518C `);
          } else {
            return [
              createTextVNode(" \u7ACB\u5373\u6CE8\u518C ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div><div class="text-center mt-8" data-v-fb70e37b><p class="text-gray-500 text-xs" data-v-fb70e37b> \u767B\u5F55\u5373\u8868\u793A\u60A8\u540C\u610F\u6211\u4EEC\u7684 <a href="#" class="text-cyan-400 hover:text-cyan-300" data-v-fb70e37b>\u670D\u52A1\u6761\u6B3E</a> \u548C <a href="#" class="text-cyan-400 hover:text-cyan-300" data-v-fb70e37b>\u9690\u79C1\u653F\u7B56</a></p></div></div></div>`);
      if (message.value.show) {
        _push(`<div class="${ssrRenderClass([
          "fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300",
          message.value.type === "success" ? "bg-green-500/20 border border-green-500/30 text-green-300" : "bg-red-500/20 border border-red-500/30 text-red-300"
        ])}" data-v-fb70e37b><div class="flex items-center gap-3" data-v-fb70e37b><i class="${ssrRenderClass([message.value.type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle", "text-lg"])}" data-v-fb70e37b></i><span data-v-fb70e37b>${ssrInterpolate(message.value.text)}</span><button class="ml-2 hover:opacity-75" data-v-fb70e37b><i class="bi bi-x text-lg" data-v-fb70e37b></i></button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fb70e37b"]]);

export { login as default };
//# sourceMappingURL=login-DrUfdtJb.mjs.map
