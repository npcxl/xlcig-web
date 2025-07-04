import { _ as __nuxt_component_0 } from "./AppLogo-C8xp92Ad.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-Dq0IxfZC.js";
import { ref, computed, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderDynamicModel, ssrLooseContain } from "vue/server-renderer";
import "D:/codeGitee/xlcig-web/frontend/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-B75LsvLO.js";
import { _ as _export_sfc } from "../server.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/ufo/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlcig-web/frontend/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/codeGitee/xlcig-web/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/codeGitee/xlcig-web/frontend/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/klona/dist/index.mjs";
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
      const texts = ["很弱", "较弱", "一般", "较强", "很强"];
      return texts[strength] || "很弱";
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
      title: "注册 - xlCig",
      meta: [
        { name: "description", content: "注册xlCig账户，享受专业的PC硬件产品和服务" }
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
            _push2(`<i class="bi bi-arrow-left mr-2 text-lg" data-v-db881404${_scopeId}></i><span class="text-sm font-medium" data-v-db881404${_scopeId}>返回首页</span>`);
          } else {
            return [
              createVNode("i", { class: "bi bi-arrow-left mr-2 text-lg" }),
              createVNode("span", { class: "text-sm font-medium" }, "返回首页")
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
      _push(`</div><h1 class="text-2xl font-bold text-white mb-2" data-v-db881404>创建新账户</h1><p class="text-gray-300" data-v-db881404>加入xlCig，开始您的专业装机之旅</p></div><form class="space-y-6" data-v-db881404><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-person mr-2 text-cyan-400" data-v-db881404></i> 用户名 <span class="text-gray-400 text-xs" data-v-db881404>(登录账号)</span></label><input${ssrRenderAttr("value", unref(form).username)} type="text" required placeholder="设置您的登录用户名" class="${ssrRenderClass([
        "w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).username ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404>`);
      if (unref(errors).username) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).username)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form).username && !unref(errors).username) {
        _push(`<p class="mt-2 text-sm text-green-400" data-v-db881404><i class="bi bi-check-circle mr-1" data-v-db881404></i>用户名可用 </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-emoji-smile mr-2 text-cyan-400" data-v-db881404></i> 昵称 <span class="text-gray-400 text-xs" data-v-db881404>(显示名称，可选)</span></label><input${ssrRenderAttr("value", unref(form).nickname)} type="text" placeholder="设置您的显示昵称" class="${ssrRenderClass([
        "w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).nickname ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404>`);
      if (unref(errors).nickname) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).nickname)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(form).nickname) {
        _push(`<p class="mt-2 text-sm text-gray-400" data-v-db881404><i class="bi bi-info-circle mr-1" data-v-db881404></i>未设置昵称时将显示用户名 </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-envelope mr-2 text-cyan-400" data-v-db881404></i> 邮箱地址 </label><input${ssrRenderAttr("value", unref(form).email)} type="email" required placeholder="输入您的邮箱地址" class="${ssrRenderClass([
        "w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).email ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404>`);
      if (unref(errors).email) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-shield-check mr-2 text-cyan-400" data-v-db881404></i> 邮箱验证码 </label><div class="flex gap-3" data-v-db881404><input${ssrRenderAttr("value", unref(form).emailCode)} type="text" required placeholder="输入6位验证码" maxlength="6" class="${ssrRenderClass([
        "flex-1 px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).emailCode ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404><button type="button"${ssrIncludeBooleanAttr(!unref(form).email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(unref(form).email) || unref(sendingCode) || unref(countdown) > 0) ? " disabled" : ""} class="${ssrRenderClass([
        "px-6 py-3 font-medium text-sm rounded-lg transition-all duration-300 whitespace-nowrap",
        !unref(form).email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(unref(form).email) || unref(sendingCode) || unref(countdown) > 0 ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
      ])}" data-v-db881404>`);
      if (unref(sendingCode)) {
        _push(`<div class="flex items-center gap-2" data-v-db881404><div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" data-v-db881404></div><span data-v-db881404>发送中</span></div>`);
      } else if (unref(countdown) > 0) {
        _push(`<span data-v-db881404>${ssrInterpolate(unref(countdown))}s</span>`);
      } else {
        _push(`<span data-v-db881404>发送验证码</span>`);
      }
      _push(`</button></div>`);
      if (unref(errors).emailCode) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).emailCode)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(emailCodeSent) && !unref(errors).emailCode) {
        _push(`<p class="mt-2 text-sm text-green-400" data-v-db881404><i class="bi bi-check-circle mr-1" data-v-db881404></i>验证码已发送到您的邮箱，请查收 </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-lock mr-2 text-cyan-400" data-v-db881404></i> 密码 </label><div class="relative" data-v-db881404><input${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).password, null)}${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} required placeholder="设置您的密码" class="${ssrRenderClass([
        "w-full px-4 py-3 pr-12 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).password ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404><button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200" data-v-db881404><i class="${ssrRenderClass([unref(showPassword) ? "bi bi-eye-slash" : "bi bi-eye", "text-lg"])}" data-v-db881404></i></button></div>`);
      if (unref(errors).password) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form).password) {
        _push(`<div class="mt-3" data-v-db881404><div class="flex items-center gap-2 mb-2" data-v-db881404><span class="text-sm text-gray-300" data-v-db881404>密码强度:</span><span class="${ssrRenderClass([unref(passwordStrengthClass), "text-sm font-medium"])}" data-v-db881404>${ssrInterpolate(unref(passwordStrengthText))}</span></div><div class="w-full bg-gray-700/50 rounded-full h-2" data-v-db881404><div class="${ssrRenderClass([unref(passwordStrengthClass), "h-2 rounded-full transition-all duration-300"])}" style="${ssrRenderStyle({ width: `${unref(passwordStrength) * 25}%` })}" data-v-db881404></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-shield-check mr-2 text-cyan-400" data-v-db881404></i> 确认密码 </label><div class="relative" data-v-db881404><input${ssrRenderDynamicModel(unref(showConfirmPassword) ? "text" : "password", unref(form).confirmPassword, null)}${ssrRenderAttr("type", unref(showConfirmPassword) ? "text" : "password")} required placeholder="再次输入您的密码" class="${ssrRenderClass([
        "w-full px-4 py-3 pr-12 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).confirmPassword ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404><button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200" data-v-db881404><i class="${ssrRenderClass([unref(showConfirmPassword) ? "bi bi-eye-slash" : "bi bi-eye", "text-lg"])}" data-v-db881404></i></button></div>`);
      if (unref(errors).confirmPassword) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).confirmPassword)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form).confirmPassword && unref(form).password === unref(form).confirmPassword && unref(form).password.length >= 6) {
        _push(`<p class="mt-2 text-sm text-green-400" data-v-db881404><i class="bi bi-check-circle mr-1" data-v-db881404></i>密码匹配 </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-db881404><label class="block text-sm font-semibold text-white mb-2" data-v-db881404><i class="bi bi-phone mr-2 text-cyan-400" data-v-db881404></i> 手机号码 <span class="text-gray-400 text-xs" data-v-db881404>(可选)</span></label><input${ssrRenderAttr("value", unref(form).phone)} type="tel" placeholder="输入您的手机号码" class="${ssrRenderClass([
        "w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90",
        unref(errors).phone ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" : "border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      ])}" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-db881404>`);
      if (unref(errors).phone) {
        _push(`<p class="mt-2 text-sm text-red-400" data-v-db881404>${ssrInterpolate(unref(errors).phone)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-4" data-v-db881404><label class="flex items-start gap-3" data-v-db881404><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).agreeToTerms) ? ssrLooseContain(unref(form).agreeToTerms, null) : unref(form).agreeToTerms) ? " checked" : ""} type="checkbox" required class="w-4 h-4 text-cyan-500 bg-gray-800/50 border-gray-600/50 rounded focus:ring-cyan-500 focus:ring-2 mt-1" data-v-db881404><span class="text-sm text-gray-300 leading-relaxed" data-v-db881404> 我已阅读并同意 <button type="button" class="text-cyan-400 hover:text-cyan-300 underline" data-v-db881404>用户服务协议</button> 和 <button type="button" class="text-cyan-400 hover:text-cyan-300 underline" data-v-db881404>隐私政策</button></span></label><label class="flex items-start gap-3" data-v-db881404><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).subscribeNewsletter) ? ssrLooseContain(unref(form).subscribeNewsletter, null) : unref(form).subscribeNewsletter) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-cyan-500 bg-gray-800/50 border-gray-600/50 rounded focus:ring-cyan-500 focus:ring-2 mt-1" data-v-db881404><span class="text-sm text-gray-300 leading-relaxed" data-v-db881404> 订阅我们的产品动态和优惠信息 </span></label></div><button type="submit"${ssrIncludeBooleanAttr(unref(loading) || !unref(form).agreeToTerms || !unref(emailCodeSent) || !unref(form).emailCode) ? " disabled" : ""} class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed flex items-center justify-center gap-3" data-v-db881404>`);
      if (unref(loading)) {
        _push(`<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" data-v-db881404></div>`);
      } else {
        _push(`<i class="bi bi-person-plus" data-v-db881404></i>`);
      }
      _push(` ${ssrInterpolate(unref(loading) ? "注册中..." : "创建账户")}</button></form><div class="relative my-8" data-v-db881404><div class="absolute inset-0 flex items-center" data-v-db881404><div class="w-full border-t border-gray-600/50" data-v-db881404></div></div><div class="relative flex justify-center text-sm" data-v-db881404><span class="px-4 bg-gray-900 text-gray-400" data-v-db881404>或者使用</span></div></div><div class="space-y-3" data-v-db881404><button class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg" data-v-db881404><i class="bi bi-google text-lg" data-v-db881404></i> 使用 Google 注册 </button><button class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg" data-v-db881404><i class="bi bi-github text-lg" data-v-db881404></i> 使用 GitHub 注册 </button></div><div class="mt-8 text-center" data-v-db881404><p class="text-gray-300" data-v-db881404> 已有账户？ `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/login",
        class: "text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 立即登录 `);
          } else {
            return [
              createTextVNode(" 立即登录 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div>`);
      if (unref(showTerms)) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-db881404><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" data-v-db881404><h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-db881404><i class="bi bi-file-text text-cyan-400" data-v-db881404></i> 用户服务协议 </h3><div class="text-gray-300 space-y-4 text-sm leading-relaxed" data-v-db881404><h4 class="text-lg font-semibold text-white" data-v-db881404>1. 服务条款</h4><p data-v-db881404>欢迎使用xlCig服务。通过访问或使用我们的服务，您同意遵守本协议的所有条款和条件。</p><h4 class="text-lg font-semibold text-white" data-v-db881404>2. 用户账户</h4><p data-v-db881404>您有责任维护账户信息的安全性和准确性。您不得与他人共享您的账户凭据。</p><h4 class="text-lg font-semibold text-white" data-v-db881404>3. 使用规范</h4><p data-v-db881404>您同意不会使用我们的服务进行任何非法、有害或不当的活动。</p><h4 class="text-lg font-semibold text-white" data-v-db881404>4. 隐私保护</h4><p data-v-db881404>我们重视您的隐私。请参阅我们的隐私政策了解我们如何收集和使用您的信息。</p></div><div class="flex gap-3 mt-8" data-v-db881404><button class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-db881404> 同意并继续 </button><button class="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-db881404> 关闭 </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showPrivacy)) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-db881404><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" data-v-db881404><h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-db881404><i class="bi bi-shield-check text-cyan-400" data-v-db881404></i> 隐私政策 </h3><div class="text-gray-300 space-y-4 text-sm leading-relaxed" data-v-db881404><h4 class="text-lg font-semibold text-white" data-v-db881404>信息收集</h4><p data-v-db881404>我们收集您提供的信息以及您使用我们服务时自动收集的信息。</p><h4 class="text-lg font-semibold text-white" data-v-db881404>信息使用</h4><p data-v-db881404>我们使用收集的信息来提供、维护和改善我们的服务。</p><h4 class="text-lg font-semibold text-white" data-v-db881404>信息分享</h4><p data-v-db881404>我们不会向第三方出售、交易或以其他方式转移您的个人信息。</p><h4 class="text-lg font-semibold text-white" data-v-db881404>数据安全</h4><p data-v-db881404>我们采用适当的安全措施来保护您的个人信息。</p></div><div class="flex gap-3 mt-8" data-v-db881404><button class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-db881404> 同意并继续 </button><button class="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-db881404> 关闭 </button></div></div></div>`);
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
export {
  register as default
};
//# sourceMappingURL=register-BKHGSNdb.js.map
