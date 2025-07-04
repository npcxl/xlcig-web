import { _ as __nuxt_component_0 } from "./AppLogo-C8xp92Ad.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-Dq0IxfZC.js";
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderDynamicModel, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate } from "vue/server-renderer";
import "./apiClient-Hs_n9WkJ.js";
import { u as useUserStore } from "./user-C81snHaJ.js";
import { _ as _export_sfc } from "../server.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/ufo/dist/index.mjs";
import "pinia";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlcig-web/frontend/node_modules/hookable/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/h3/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/codeGitee/xlcig-web/frontend/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    const loading = ref(false);
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-55b785bf><div class="fixed inset-0 pointer-events-none" data-v-55b785bf><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-55b785bf></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-55b785bf></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-55b785bf></div></div><nav class="relative z-10 w-full px-6 py-4" data-v-55b785bf><div class="flex items-center justify-between" data-v-55b785bf><div class="flex items-center space-x-4" data-v-55b785bf>`);
      _push(ssrRenderComponent(_component_AppLogo, { size: "small" }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-arrow-left mr-2 text-lg" data-v-55b785bf${_scopeId}></i><span class="text-sm font-medium" data-v-55b785bf${_scopeId}>返回首页</span>`);
          } else {
            return [
              createVNode("i", { class: "bi bi-arrow-left mr-2 text-lg" }),
              createVNode("span", { class: "text-sm font-medium" }, "返回首页")
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
            _push2(`<span class="text-sm font-medium" data-v-55b785bf${_scopeId}>没有账号？立即注册</span>`);
          } else {
            return [
              createVNode("span", { class: "text-sm font-medium" }, "没有账号？立即注册")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></nav><div class="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6" data-v-55b785bf><div class="w-full max-w-md" data-v-55b785bf><div class="text-center mb-8" data-v-55b785bf>`);
      _push(ssrRenderComponent(_component_AppLogo, { size: "medium" }, null, _parent));
      _push(`<h1 class="text-3xl font-bold text-white mt-6 mb-2" data-v-55b785bf>欢迎回来</h1><p class="text-gray-400" data-v-55b785bf>登录您的账户，继续您的装机之旅</p></div><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-55b785bf><form class="space-y-6" data-v-55b785bf><div data-v-55b785bf><label for="email" class="block text-sm font-medium text-white mb-2" data-v-55b785bf>账号</label><div class="relative" data-v-55b785bf><input id="email"${ssrRenderAttr("value", loginForm.email)} type="text" required placeholder="请输入邮箱/用户名/手机号" class="w-full px-4 py-3 pl-12 bg-gray-800/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 focus:bg-gray-800/90" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-55b785bf><i class="bi bi-person absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" data-v-55b785bf></i></div><p class="mt-2 text-xs text-gray-500" data-v-55b785bf>支持邮箱、用户名或手机号登录</p></div><div data-v-55b785bf><label for="password" class="block text-sm font-medium text-white mb-2" data-v-55b785bf>密码</label><div class="relative" data-v-55b785bf><input id="password"${ssrRenderDynamicModel(showPassword.value ? "text" : "password", loginForm.password, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} required minlength="6" placeholder="请输入您的密码" class="w-full px-4 py-3 pl-12 pr-12 bg-gray-800/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 focus:bg-gray-800/90" style="${ssrRenderStyle({ "color": "#ffffff !important", "background-color": "rgba(31, 41, 55, 0.8) !important" })}" data-v-55b785bf><i class="bi bi-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" data-v-55b785bf></i><button type="button" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200" data-v-55b785bf><i class="${ssrRenderClass([showPassword.value ? "bi bi-eye-slash" : "bi bi-eye", "text-lg"])}" data-v-55b785bf></i></button></div></div><div class="flex items-center justify-between" data-v-55b785bf><label class="flex items-center cursor-pointer group" data-v-55b785bf><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(rememberMe.value) ? ssrLooseContain(rememberMe.value, null) : rememberMe.value) ? " checked" : ""} class="sr-only" data-v-55b785bf><div class="relative" data-v-55b785bf><div class="${ssrRenderClass([
        "w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center",
        rememberMe.value ? "bg-cyan-500 border-cyan-500 shadow-md shadow-cyan-500/30" : "border-gray-500 group-hover:border-cyan-400 bg-transparent"
      ])}" data-v-55b785bf>`);
      if (rememberMe.value) {
        _push(`<i class="bi bi-check text-white text-xs leading-none" data-v-55b785bf></i>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><span class="ml-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200 select-none" data-v-55b785bf>记住我</span></label><a href="#" class="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200" data-v-55b785bf>忘记密码？</a></div><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed flex items-center justify-center gap-2" data-v-55b785bf>`);
      if (loading.value) {
        _push(`<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" data-v-55b785bf></div>`);
      } else {
        _push(`<i class="bi bi-box-arrow-in-right text-lg" data-v-55b785bf></i>`);
      }
      _push(` ${ssrInterpolate(loading.value ? "登录中..." : "立即登录")}</button></form><div class="relative my-6" data-v-55b785bf><div class="absolute inset-0 flex items-center" data-v-55b785bf><div class="w-full border-t border-gray-600" data-v-55b785bf></div></div><div class="relative flex justify-center text-sm" data-v-55b785bf><span class="px-2 bg-gray-800 text-gray-400" data-v-55b785bf>或者</span></div></div><div class="text-center" data-v-55b785bf><p class="text-gray-400 text-sm" data-v-55b785bf> 还没有账号？ `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 立即注册 `);
          } else {
            return [
              createTextVNode(" 立即注册 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div><div class="text-center mt-8" data-v-55b785bf><p class="text-gray-500 text-xs" data-v-55b785bf> 登录即表示您同意我们的 <a href="#" class="text-cyan-400 hover:text-cyan-300" data-v-55b785bf>服务条款</a> 和 <a href="#" class="text-cyan-400 hover:text-cyan-300" data-v-55b785bf>隐私政策</a></p></div></div></div>`);
      if (message.value.show) {
        _push(`<div class="${ssrRenderClass([
          "fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300",
          message.value.type === "success" ? "bg-green-500/20 border border-green-500/30 text-green-300" : "bg-red-500/20 border border-red-500/30 text-red-300"
        ])}" data-v-55b785bf><div class="flex items-center gap-3" data-v-55b785bf><i class="${ssrRenderClass([message.value.type === "success" ? "bi bi-check-circle" : "bi bi-exclamation-circle", "text-lg"])}" data-v-55b785bf></i><span data-v-55b785bf>${ssrInterpolate(message.value.text)}</span><button class="ml-2 hover:opacity-75" data-v-55b785bf><i class="bi bi-x text-lg" data-v-55b785bf></i></button></div></div>`);
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
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-55b785bf"]]);
export {
  login as default
};
//# sourceMappingURL=login-mDztMcSh.js.map
