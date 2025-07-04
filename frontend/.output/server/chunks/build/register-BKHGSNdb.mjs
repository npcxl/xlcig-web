import { _ as __nuxt_component_0 } from './AppLogo-C8xp92Ad.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dq0IxfZC.mjs';
import { ref, computed, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderDynamicModel, ssrLooseContain } from 'vue/server-renderer';
import { u as useHead } from './v3-B75LsvLO.mjs';
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
import 'pinia';
import 'vue-router';

const _sfc_main = {
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      username: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      agreeToTerms: false,
      subscribeNewsletter: false,
      emailCode: ""
    });
    const errors = ref({
      username: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      emailCode: ""
    });
    const loading = ref(false);
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const showTerms = ref(false);
    const showPrivacy = ref(false);
    const sendingCode = ref(false);
    const countdown = ref(0);
    const emailCodeSent = ref(false);
    const message = ref({
      show: false,
      type: "success",
      text: ""
    });
    const passwordStrength = computed(() => {
      const password = form.value.password;
      let strength = 0;
      if (password.length >= 6) strength++;
      if (password.length >= 10) strength++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
      return Math.min(strength, 4);
    });
    const passwordStrengthText = computed(() => {
      const strength = passwordStrength.value;
      const texts = ["\u5F88\u5F31", "\u8F83\u5F31", "\u4E00\u822C", "\u8F83\u5F3A", "\u5F88\u5F3A"];
      return texts[strength] || "\u5F88\u5F31";
    });
    const passwordStrengthClass = computed(() => {
      const strength = passwordStrength.value;
      const classes = [
        "bg-red-500 text-red-400",
        "bg-orange-500 text-orange-400",
        "bg-yellow-500 text-yellow-400",
        "bg-blue-500 text-blue-400",
        "bg-green-500 text-green-400"
      ];
      return classes[strength] || classes[0];
    });
    useHead({
      title: "\u6CE8\u518C - xlCig",
      meta: [
        { name: "description", content: "\u6CE8\u518CxlCig\u8D26\u6237\uFF0C\u4EAB\u53D7\u4E13\u4E1A\u7684PC\u786C\u4EF6\u4EA7\u54C1\u548C\u670D\u52A1" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden flex items-center justify-center py-12" }, _attrs))} data-v-db881404><div class="fixed inset-0 pointer-events-none" data-v-db881404><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-db881404></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-db881404></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-db881404></div></div><div class="absolute top-6 left-6 z-20" data-v-db881404><div class="flex items-center space-x-4" data-v-db881404>`);
      _push(ssrRenderComponent(_component_AppLogo, { size: "small" }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-arrow-left mr-2 text-lg" data-v-db881404${_scopeId}></i><span class="text-sm font-medium" data-v-db881404${_scopeId}>\u8FD4\u56DE\u9996\u9875</span>`);
          } else {
            return [
              createVNode("i", { class: "bi bi-arrow-left mr-2 text-lg" }),
              createVNode("span", { class: "text-sm font-medium" }, "\u8FD4\u56DE\u9996\u9875")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="relative z-10 w-full max-w-lg px-6" data-v-db881404><div class="glass-card-dark rounded-3xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-db881404><div class="text-center mb-8" data-v-db881404><div class="flex justify-center mb-4" data-v-db881404>`);
      _push(ssrRenderComponent(_component_AppLogo, {
        size: "medium",
        "show-decorations": false
      }, null, _parent));
      _push(`</div><h1 class="text-2xl font-bold text-white mb-2" data-v-db881404>\u521B\u5EFA\u65B0\u8D26\u6237</h1><p class="text-gray-300" data-v-db881404>\u52A0\u5165xlCig\uFF0C\u5F00\u59CB\u60A8\u7684\u4E13\u4E1A\u88C5\u673A\u4E4B\u65C5</p></div><form class="space-y-6" data-v-db881404><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-person mr-2 text-cyan-400" data-v-db881404></i> \u7528\u6237\u540D <span class="text-gray-400 text-xs" data-v-db881404>(\u767B\u5F55\u8D26\u53F7)</span></label><input${ssrRenderAttr("value", unref(form).username)} type="text" required placeholder="\u8BBE\u7F6E\u60A8\u7684\u767B\u5F55\u7528\u6237\u540D" class="${ssrRenderClass([
        "w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).username ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404>`);
      if (unref(errors).username) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).username)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form).username && !unref(errors).username) {
        _push(`<p class="mt-2 text-sm text-green-400" data-v-db881404><i class="bi bi-check-circle mr-1" data-v-db881404></i>\u7528\u6237\u540D\u53EF\u7528 </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-emoji-smile mr-2 text-cyan-400" data-v-db881404></i> \u6635\u79F0 <span class="text-gray-400 text-xs" data-v-db881404>(\u663E\u793A\u540D\u79F0\uFF0C\u53EF\u9009)</span></label><input${ssrRenderAttr("value", unref(form).nickname)} type="text" placeholder="\u8BBE\u7F6E\u60A8\u7684\u663E\u793A\u6635\u79F0" class="${ssrRenderClass([
        "w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).nickname ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404>`);
      if (unref(errors).nickname) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).nickname)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(form).nickname) {
        _push(`<p class="mt-2 text-sm text-gray-400" data-v-db881404><i class="bi bi-info-circle mr-1" data-v-db881404></i>\u672A\u8BBE\u7F6E\u6635\u79F0\u65F6\u5C06\u663E\u793A\u7528\u6237\u540D </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-envelope mr-2 text-cyan-400" data-v-db881404></i> \u90AE\u7BB1\u5730\u5740 </label><input${ssrRenderAttr("value", unref(form).email)} type="email" required placeholder="\u8F93\u5165\u60A8\u7684\u90AE\u7BB1\u5730\u5740" class="${ssrRenderClass([
        "w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).email ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404>`);
      if (unref(errors).email) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-shield-check mr-2 text-cyan-400" data-v-db881404></i> \u90AE\u7BB1\u9A8C\u8BC1\u7801 </label><div class="flex gap-3" data-v-db881404><input${ssrRenderAttr("value", unref(form).emailCode)} type="text" required placeholder="\u8F93\u51656\u4F4D\u9A8C\u8BC1\u7801" maxlength="6" class="${ssrRenderClass([
        "flex-1 px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).emailCode ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404><button type="button"${ssrIncludeBooleanAttr(!unref(form).email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(unref(form).email) || unref(sendingCode) || unref(countdown) > 0) ? " disabled" : ""} class="${ssrRenderClass([
        "px-6 py-3 font-medium text-sm rounded-lg transition-all duration-300 whitespace-nowrap",
        !unref(form).email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(unref(form).email) || unref(sendingCode) || unref(countdown) > 0 ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
      ])}" data-v-db881404>`);
      if (unref(sendingCode)) {
        _push(`<div class="flex items-center gap-2" data-v-db881404><div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" data-v-db881404></div><span data-v-db881404>\u53D1\u9001\u4E2D</span></div>`);
      } else if (unref(countdown) > 0) {
        _push(`<span data-v-db881404>${ssrInterpolate(unref(countdown))}s</span>`);
      } else {
        _push(`<span data-v-db881404>\u53D1\u9001\u9A8C\u8BC1\u7801</span>`);
      }
      _push(`</button></div>`);
      if (unref(errors).emailCode) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).emailCode)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(emailCodeSent) && !unref(errors).emailCode) {
        _push(`<p class="mt-2 text-sm text-green-400" data-v-db881404><i class="bi bi-check-circle mr-1" data-v-db881404></i>\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001\u5230\u60A8\u7684\u90AE\u7BB1\uFF0C\u8BF7\u67E5\u6536 </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-lock mr-2 text-cyan-400" data-v-db881404></i> \u5BC6\u7801 </label><div class="relative" data-v-db881404><input${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).password, null)}${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} required placeholder="\u8BBE\u7F6E\u60A8\u7684\u5BC6\u7801" class="${ssrRenderClass([
        "w-full px-4 py-3 pr-12 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).password ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404><button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200" data-v-db881404><i class="${ssrRenderClass([unref(showPassword) ? "bi bi-eye-slash" : "bi bi-eye", "text-lg"])}" data-v-db881404></i></button></div>`);
      if (unref(errors).password) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form).password) {
        _push(`<div class="mt-3" data-v-db881404><div class="flex items-center gap-2 mb-2" data-v-db881404><span class="text-sm text-gray-300" data-v-db881404>\u5BC6\u7801\u5F3A\u5EA6:</span><span class="${ssrRenderClass([unref(passwordStrengthClass), "text-sm font-medium"])}" data-v-db881404>${ssrInterpolate(unref(passwordStrengthText))}</span></div><div class="w-full bg-gray-700/50 rounded-full h-2" data-v-db881404><div class="${ssrRenderClass([unref(passwordStrengthClass), "h-2 rounded-full transition-all duration-300"])}" style="${ssrRenderStyle({ width: `${unref(passwordStrength) * 25}%` })}" data-v-db881404></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-shield-check mr-2 text-cyan-400" data-v-db881404></i> \u786E\u8BA4\u5BC6\u7801 </label><div class="relative" data-v-db881404><input${ssrRenderDynamicModel(unref(showConfirmPassword) ? "text" : "password", unref(form).confirmPassword, null)}${ssrRenderAttr("type", unref(showConfirmPassword) ? "text" : "password")} required placeholder="\u518D\u6B21\u8F93\u5165\u60A8\u7684\u5BC6\u7801" class="${ssrRenderClass([
        "w-full px-4 py-3 pr-12 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).confirmPassword ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404><button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200" data-v-db881404><i class="${ssrRenderClass([unref(showConfirmPassword) ? "bi bi-eye-slash" : "bi bi-eye", "text-lg"])}" data-v-db881404></i></button></div>`);
      if (unref(errors).confirmPassword) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).confirmPassword)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form).confirmPassword && unref(form).password === unref(form).confirmPassword && unref(form).password.length >= 6) {
        _push(`<p class="mt-2 text-sm text-green-400" data-v-db881404><i class="bi bi-check-circle mr-1" data-v-db881404></i>\u5BC6\u7801\u5339\u914D </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-phone mr-2 text-cyan-400" data-v-db881404></i> \u624B\u673A\u53F7\u7801 <span class="text-gray-400 text-xs" data-v-db881404>(\u53EF\u9009)</span></label><input${ssrRenderAttr("value", unref(form).phone)} type="tel" placeholder="\u8F93\u5165\u60A8\u7684\u624B\u673A\u53F7\u7801" class="${ssrRenderClass([
        "w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).phone ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404>`);
      if (unref(errors).phone) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).phone)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-4" data-v-db881404><label class="flex items-start gap-3" data-v-db881404><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).agreeToTerms) ? ssrLooseContain(unref(form).agreeToTerms, null) : unref(form).agreeToTerms) ? " checked" : ""} type="checkbox" required class="w-4 h-4 text-cyan-500 bg-gray-800/50 border-gray-600/50 rounded focus:ring-cyan-500 focus:ring-2 mt-1" data-v-db881404><span class="text-sm text-gray-300 leading-relaxed" data-v-db881404> \u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F <button type="button" class="text-cyan-400 hover:text-cyan-300 underline" data-v-db881404>\u7528\u6237\u670D\u52A1\u534F\u8BAE</button> \u548C <button type="button" class="text-cyan-400 hover:text-cyan-300 underline" data-v-db881404>\u9690\u79C1\u653F\u7B56</button></span></label><label class="flex items-start gap-3" data-v-db881404><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).subscribeNewsletter) ? ssrLooseContain(unref(form).subscribeNewsletter, null) : unref(form).subscribeNewsletter) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-cyan-500 bg-gray-800/50 border-gray-600/50 rounded focus:ring-cyan-500 focus:ring-2 mt-1" data-v-db881404><span class="text-sm text-gray-300 leading-relaxed" data-v-db881404> \u8BA2\u9605\u6211\u4EEC\u7684\u4EA7\u54C1\u52A8\u6001\u548C\u4F18\u60E0\u4FE1\u606F </span></label></div><button type="submit"${ssrIncludeBooleanAttr(unref(loading) || !unref(form).agreeToTerms || !unref(emailCodeSent) || !unref(form).emailCode) ? " disabled" : ""} class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed flex items-center justify-center gap-3" data-v-db881404>`);
      if (unref(loading)) {
        _push(`<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" data-v-db881404></div>`);
      } else {
        _push(`<i class="bi bi-person-plus" data-v-db881404></i>`);
      }
      _push(` ${ssrInterpolate(unref(loading) ? "\u6CE8\u518C\u4E2D..." : "\u521B\u5EFA\u8D26\u6237")}</button></form><div class="relative my-8" data-v-db881404><div class="absolute inset-0 flex items-center" data-v-db881404><div class="w-full border-t border-gray-600/50" data-v-db881404></div></div><div class="relative flex justify-center text-sm" data-v-db881404><span class="px-4 bg-gray-900 text-gray-400" data-v-db881404>\u6216\u8005\u4F7F\u7528</span></div></div><div class="space-y-3" data-v-db881404><button class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg" data-v-db881404><i class="bi bi-google text-lg" data-v-db881404></i> \u4F7F\u7528 Google \u6CE8\u518C </button><button class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg" data-v-db881404><i class="bi bi-github text-lg" data-v-db881404></i> \u4F7F\u7528 GitHub \u6CE8\u518C </button></div><div class="mt-8 text-center" data-v-db881404><p class="text-gray-300" data-v-db881404> \u5DF2\u6709\u8D26\u6237\uFF1F `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/login",
        class: "text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u7ACB\u5373\u767B\u5F55 `);
          } else {
            return [
              createTextVNode(" \u7ACB\u5373\u767B\u5F55 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div>`);
      if (unref(showTerms)) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-db881404><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" data-v-db881404><h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-db881404><i class="bi bi-file-text text-cyan-400" data-v-db881404></i> \u7528\u6237\u670D\u52A1\u534F\u8BAE </h3><div class="text-gray-300 space-y-4 text-sm leading-relaxed" data-v-db881404><h4 class="text-lg font-semibold text-white" data-v-db881404>1. \u670D\u52A1\u6761\u6B3E</h4><p data-v-db881404>\u6B22\u8FCE\u4F7F\u7528xlCig\u670D\u52A1\u3002\u901A\u8FC7\u8BBF\u95EE\u6216\u4F7F\u7528\u6211\u4EEC\u7684\u670D\u52A1\uFF0C\u60A8\u540C\u610F\u9075\u5B88\u672C\u534F\u8BAE\u7684\u6240\u6709\u6761\u6B3E\u548C\u6761\u4EF6\u3002</p><h4 class="text-lg font-semibold text-white" data-v-db881404>2. \u7528\u6237\u8D26\u6237</h4><p data-v-db881404>\u60A8\u6709\u8D23\u4EFB\u7EF4\u62A4\u8D26\u6237\u4FE1\u606F\u7684\u5B89\u5168\u6027\u548C\u51C6\u786E\u6027\u3002\u60A8\u4E0D\u5F97\u4E0E\u4ED6\u4EBA\u5171\u4EAB\u60A8\u7684\u8D26\u6237\u51ED\u636E\u3002</p><h4 class="text-lg font-semibold text-white" data-v-db881404>3. \u4F7F\u7528\u89C4\u8303</h4><p data-v-db881404>\u60A8\u540C\u610F\u4E0D\u4F1A\u4F7F\u7528\u6211\u4EEC\u7684\u670D\u52A1\u8FDB\u884C\u4EFB\u4F55\u975E\u6CD5\u3001\u6709\u5BB3\u6216\u4E0D\u5F53\u7684\u6D3B\u52A8\u3002</p><h4 class="text-lg font-semibold text-white" data-v-db881404>4. \u9690\u79C1\u4FDD\u62A4</h4><p data-v-db881404>\u6211\u4EEC\u91CD\u89C6\u60A8\u7684\u9690\u79C1\u3002\u8BF7\u53C2\u9605\u6211\u4EEC\u7684\u9690\u79C1\u653F\u7B56\u4E86\u89E3\u6211\u4EEC\u5982\u4F55\u6536\u96C6\u548C\u4F7F\u7528\u60A8\u7684\u4FE1\u606F\u3002</p></div><div class="flex gap-3 mt-8" data-v-db881404><button class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-db881404> \u540C\u610F\u5E76\u7EE7\u7EED </button><button class="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-db881404> \u5173\u95ED </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showPrivacy)) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-db881404><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" data-v-db881404><h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-db881404><i class="bi bi-shield-check text-cyan-400" data-v-db881404></i> \u9690\u79C1\u653F\u7B56 </h3><div class="text-gray-300 space-y-4 text-sm leading-relaxed" data-v-db881404><h4 class="text-lg font-semibold text-white" data-v-db881404>\u4FE1\u606F\u6536\u96C6</h4><p data-v-db881404>\u6211\u4EEC\u6536\u96C6\u60A8\u63D0\u4F9B\u7684\u4FE1\u606F\u4EE5\u53CA\u60A8\u4F7F\u7528\u6211\u4EEC\u670D\u52A1\u65F6\u81EA\u52A8\u6536\u96C6\u7684\u4FE1\u606F\u3002</p><h4 class="text-lg font-semibold text-white" data-v-db881404>\u4FE1\u606F\u4F7F\u7528</h4><p data-v-db881404>\u6211\u4EEC\u4F7F\u7528\u6536\u96C6\u7684\u4FE1\u606F\u6765\u63D0\u4F9B\u3001\u7EF4\u62A4\u548C\u6539\u5584\u6211\u4EEC\u7684\u670D\u52A1\u3002</p><h4 class="text-lg font-semibold text-white" data-v-db881404>\u4FE1\u606F\u5206\u4EAB</h4><p data-v-db881404>\u6211\u4EEC\u4E0D\u4F1A\u5411\u7B2C\u4E09\u65B9\u51FA\u552E\u3001\u4EA4\u6613\u6216\u4EE5\u5176\u4ED6\u65B9\u5F0F\u8F6C\u79FB\u60A8\u7684\u4E2A\u4EBA\u4FE1\u606F\u3002</p><h4 class="text-lg font-semibold text-white" data-v-db881404>\u6570\u636E\u5B89\u5168</h4><p data-v-db881404>\u6211\u4EEC\u91C7\u7528\u9002\u5F53\u7684\u5B89\u5168\u63AA\u65BD\u6765\u4FDD\u62A4\u60A8\u7684\u4E2A\u4EBA\u4FE1\u606F\u3002</p></div><div class="flex gap-3 mt-8" data-v-db881404><button class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-db881404> \u540C\u610F\u5E76\u7EE7\u7EED </button><button class="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-db881404> \u5173\u95ED </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(message).show) {
        _push(`<div class="${ssrRenderClass([
          "fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300",
          unref(message).type === "success" ? "bg-green-500/20 border border-green-500/30 text-green-300" : "bg-red-500/20 border border-red-500/30 text-red-300"
        ])}" data-v-db881404><div class="flex items-center gap-3" data-v-db881404><i class="${ssrRenderClass([unref(message).type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle", "text-lg"])}" data-v-db881404></i><span data-v-db881404>${ssrInterpolate(unref(message).text)}</span><button class="ml-2 hover:opacity-75" data-v-db881404><i class="bi bi-x text-lg" data-v-db881404></i></button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-db881404"]]);

export { register as default };
//# sourceMappingURL=register-BKHGSNdb.mjs.map
