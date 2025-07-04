import { _ as __nuxt_component_0 } from './AppLogo-C8xp92Ad.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dq0IxfZC.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useUserStore } from './user-C81snHaJ.mjs';
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
import 'pinia';
import 'seemly';
import 'vooks';
import 'vdirs';
import 'css-render';
import '@css-render/plugin-bem';
import 'lodash-es';
import 'evtd';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    const { message } = createDiscreteApi(["message"]);
    const userInfo = ref(null);
    ref(true);
    const updating = ref(false);
    const changingPassword = ref(false);
    const showAvatarModal = ref(false);
    const uploadingAvatar = ref(false);
    const avatarPreview = ref(null);
    const selectedFile = ref(null);
    const activeTab = ref("info");
    const tabs = [
      { key: "info", label: "\u57FA\u672C\u4FE1\u606F", icon: "bi bi-person" },
      { key: "edit", label: "\u7F16\u8F91\u8D44\u6599", icon: "bi bi-pencil-square" },
      { key: "password", label: "\u4FEE\u6539\u5BC6\u7801", icon: "bi bi-shield-lock" }
    ];
    const editForm = reactive({
      username: "",
      nickname: "",
      phone: ""
    });
    const passwordForm = reactive({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    const roleStyles = {
      user: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
      merchant: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
      admin: "bg-red-500/20 text-red-300 border border-red-500/30"
    };
    const roleLabels = {
      user: "\u666E\u901A\u7528\u6237",
      merchant: "\u5546\u5BB6",
      admin: "\u7BA1\u7406\u5458"
    };
    const statusStyles = {
      active: "bg-green-500/20 text-green-300 border border-green-500/30",
      inactive: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
      banned: "bg-red-500/20 text-red-300 border border-red-500/30"
    };
    const statusLabels = {
      active: "\u6B63\u5E38",
      inactive: "\u672A\u6FC0\u6D3B",
      banned: "\u5DF2\u5C01\u7981"
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("zh-CN");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
      const _component_AppLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-2280b1c4><div class="fixed inset-0 pointer-events-none" data-v-2280b1c4><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-2280b1c4></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-2280b1c4></div></div><nav class="relative z-10" data-v-2280b1c4><div class="container mx-auto px-6 py-6" data-v-2280b1c4><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-2280b1c4><div class="flex items-center justify-between" data-v-2280b1c4><div class="flex items-center space-x-6" data-v-2280b1c4>`);
      _push(ssrRenderComponent(_component_AppLogo, {
        size: "medium",
        "show-decorations": false
      }, null, _parent));
      _push(`<div class="h-6 w-px bg-gray-600" data-v-2280b1c4></div><button class="group relative inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden" data-v-2280b1c4><div class="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-xl transition-all duration-300 group-hover:from-cyan-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30" data-v-2280b1c4></div><div class="absolute inset-0 border-2 border-cyan-500/30 rounded-xl transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-lg group-hover:shadow-cyan-400/25" data-v-2280b1c4></div><div class="absolute inset-0 rounded-xl overflow-hidden" data-v-2280b1c4><div class="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "20%", "left": "15%", "animation-delay": "0s" })}" data-v-2280b1c4></div><div class="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "60%", "left": "80%", "animation-delay": "0.2s" })}" data-v-2280b1c4></div><div class="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "80%", "left": "30%", "animation-delay": "0.4s" })}" data-v-2280b1c4></div></div><div class="relative flex items-center" data-v-2280b1c4><div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mr-3 transition-all duration-300 group-hover:from-cyan-400/40 group-hover:to-blue-400/40 group-hover:scale-110" data-v-2280b1c4><i class="bi bi-arrow-left text-cyan-400 text-lg transition-all duration-300 group-hover:text-white group-hover:-translate-x-1" data-v-2280b1c4></i></div><div class="text-left" data-v-2280b1c4><div class="text-white text-sm font-semibold transition-all duration-300 group-hover:text-cyan-100" data-v-2280b1c4>\u8FD4\u56DE</div><div class="text-gray-400 text-xs transition-all duration-300 group-hover:text-cyan-300" data-v-2280b1c4>Back</div></div></div><div class="absolute right-3 top-1/2 transform -translate-y-1/2" data-v-2280b1c4><div class="flex flex-col space-y-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300" data-v-2280b1c4><div class="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full transition-all duration-300 group-hover:w-8" data-v-2280b1c4></div><div class="w-4 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full transition-all duration-300 group-hover:w-6 delay-75" data-v-2280b1c4></div><div class="w-2 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full transition-all duration-300 group-hover:w-4 delay-150" data-v-2280b1c4></div></div></div></button></div><nav class="text-sm text-gray-400" data-v-2280b1c4>`);
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
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-2280b1c4></i><span class="text-white font-medium" data-v-2280b1c4>\u4E2A\u4EBA\u4E2D\u5FC3</span></nav></div></div></div></nav><div class="relative z-10 py-8" data-v-2280b1c4><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-v-2280b1c4><div class="mb-8 animate-fade-in-up" data-v-2280b1c4><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-2280b1c4><h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3" data-v-2280b1c4><i class="bi bi-person-circle text-cyan-400 text-3xl animate-bounce-gentle" data-v-2280b1c4></i> \u4E2A\u4EBA\u4E2D\u5FC3 </h1><p class="text-gray-300 text-lg" data-v-2280b1c4>\u7BA1\u7406\u60A8\u7684\u4E2A\u4EBA\u4FE1\u606F\u548C\u8D26\u6237\u8BBE\u7F6E</p></div></div><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-6 animate-fade-in-up animation-delay-200" data-v-2280b1c4><div class="flex items-center space-x-6" data-v-2280b1c4><div class="relative group" data-v-2280b1c4><div class="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 transform group-hover:scale-105 overflow-hidden" data-v-2280b1c4>`);
      if ((_a = userInfo.value) == null ? void 0 : _a.avatar) {
        _push(`<img${ssrRenderAttr("src", userInfo.value.avatar)}${ssrRenderAttr("alt", (((_b = userInfo.value) == null ? void 0 : _b.nickname) || ((_c = userInfo.value) == null ? void 0 : _c.username) || "U") + "\u7684\u5934\u50CF")} class="w-full h-full object-cover" data-v-2280b1c4>`);
      } else {
        _push(`<span data-v-2280b1c4>${ssrInterpolate((((_d = userInfo.value) == null ? void 0 : _d.nickname) || ((_e = userInfo.value) == null ? void 0 : _e.username) || "U").charAt(0).toUpperCase())}</span>`);
      }
      _push(`</div><button class="absolute bottom-0 right-0 bg-cyan-500 text-white rounded-full p-2 hover:bg-cyan-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-cyan-500/20" data-v-2280b1c4><i class="bi bi-camera text-sm" data-v-2280b1c4></i></button></div><div class="flex-1" data-v-2280b1c4><h2 class="text-2xl font-bold text-white mb-2" data-v-2280b1c4>${ssrInterpolate(((_f = userInfo.value) == null ? void 0 : _f.nickname) || ((_g = userInfo.value) == null ? void 0 : _g.username) || "\u52A0\u8F7D\u4E2D...")}</h2><p class="text-gray-300 mb-1" data-v-2280b1c4>${ssrInterpolate(((_h = userInfo.value) == null ? void 0 : _h.email) || "")}</p>`);
      if (((_i = userInfo.value) == null ? void 0 : _i.nickname) && ((_j = userInfo.value) == null ? void 0 : _j.username)) {
        _push(`<p class="text-sm text-gray-400" data-v-2280b1c4>\u7528\u6237\u540D: ${ssrInterpolate(userInfo.value.username)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center space-x-4 mt-3" data-v-2280b1c4><span class="${ssrRenderClass([roleStyles[((_k = userInfo.value) == null ? void 0 : _k.role) || "user"], "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"])}" data-v-2280b1c4>${ssrInterpolate(roleLabels[((_l = userInfo.value) == null ? void 0 : _l.role) || "user"])}</span><span class="${ssrRenderClass([statusStyles[((_m = userInfo.value) == null ? void 0 : _m.status) || "active"], "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"])}" data-v-2280b1c4>${ssrInterpolate(statusLabels[((_n = userInfo.value) == null ? void 0 : _n.status) || "active"])}</span></div></div><div class="flex flex-col space-y-3" data-v-2280b1c4><button class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-2280b1c4><i class="bi bi-pencil-square mr-2" data-v-2280b1c4></i> \u7F16\u8F91\u8D44\u6599 </button><button class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-2280b1c4><i class="bi bi-shield-lock mr-2" data-v-2280b1c4></i> \u4FEE\u6539\u5BC6\u7801 </button></div></div></div><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in-up animation-delay-400" data-v-2280b1c4><div class="border-b border-gray-700/50" data-v-2280b1c4><nav class="flex space-x-8" data-v-2280b1c4><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass([
          "py-4 px-6 text-sm font-medium border-b-2 transition-all duration-300 flex items-center gap-2",
          activeTab.value === tab.key ? "border-cyan-500 text-cyan-400 bg-cyan-500/10" : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
        ])}" data-v-2280b1c4><i class="${ssrRenderClass(tab.icon)}" data-v-2280b1c4></i> ${ssrInterpolate(tab.label)}</button>`);
      });
      _push(`<!--]--></nav></div><div class="p-8" data-v-2280b1c4>`);
      if (activeTab.value === "info") {
        _push(`<div class="space-y-6 animate-fade-in" data-v-2280b1c4><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-2280b1c4><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-2280b1c4><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-2280b1c4>\u7528\u6237\u540D</label><p class="text-white text-lg" data-v-2280b1c4>${ssrInterpolate(((_o = userInfo.value) == null ? void 0 : _o.username) || "-")}</p></div><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-2280b1c4><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-2280b1c4>\u6635\u79F0</label><p class="text-white text-lg" data-v-2280b1c4>${ssrInterpolate(((_p = userInfo.value) == null ? void 0 : _p.nickname) || "-")}</p></div><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-2280b1c4><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-2280b1c4>\u90AE\u7BB1</label><p class="text-white text-lg" data-v-2280b1c4>${ssrInterpolate(((_q = userInfo.value) == null ? void 0 : _q.email) || "-")}</p></div><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-2280b1c4><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-2280b1c4>\u624B\u673A\u53F7</label><p class="text-white text-lg" data-v-2280b1c4>${ssrInterpolate(((_r = userInfo.value) == null ? void 0 : _r.phone) || "-")}</p></div><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 md:col-span-2" data-v-2280b1c4><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-2280b1c4>\u6CE8\u518C\u65F6\u95F4</label><p class="text-white text-lg" data-v-2280b1c4>${ssrInterpolate(formatDate((_s = userInfo.value) == null ? void 0 : _s.created_at) || "-")}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "edit") {
        _push(`<div class="space-y-6 animate-fade-in" data-v-2280b1c4><form data-v-2280b1c4><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-2280b1c4><div class="space-y-2" data-v-2280b1c4><label for="username" class="block text-sm font-medium text-cyan-400" data-v-2280b1c4>\u7528\u6237\u540D</label><input id="username"${ssrRenderAttr("value", editForm.username)} type="text" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u7528\u6237\u540D" data-v-2280b1c4></div><div class="space-y-2" data-v-2280b1c4><label for="nickname" class="block text-sm font-medium text-cyan-400" data-v-2280b1c4>\u6635\u79F0</label><input id="nickname"${ssrRenderAttr("value", editForm.nickname)} type="text" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u6635\u79F0" data-v-2280b1c4></div><div class="space-y-2 md:col-span-2" data-v-2280b1c4><label for="phone" class="block text-sm font-medium text-cyan-400" data-v-2280b1c4>\u624B\u673A\u53F7</label><input id="phone"${ssrRenderAttr("value", editForm.phone)} type="tel" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u624B\u673A\u53F7" data-v-2280b1c4></div></div><div class="flex justify-end space-x-4 mt-8" data-v-2280b1c4><button type="button" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-2280b1c4><i class="bi bi-arrow-clockwise mr-2" data-v-2280b1c4></i> \u91CD\u7F6E </button><button type="submit"${ssrIncludeBooleanAttr(updating.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-2280b1c4>`);
        if (updating.value) {
          _push(`<span class="loading loading-spinner loading-sm mr-2" data-v-2280b1c4></span>`);
        } else {
          _push(`<i class="bi bi-check-circle mr-2" data-v-2280b1c4></i>`);
        }
        _push(` ${ssrInterpolate(updating.value ? "\u4FDD\u5B58\u4E2D..." : "\u4FDD\u5B58\u4FEE\u6539")}</button></div></form></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "password") {
        _push(`<div class="space-y-6 animate-fade-in" data-v-2280b1c4><form data-v-2280b1c4><div class="max-w-md space-y-6" data-v-2280b1c4><div class="space-y-2" data-v-2280b1c4><label for="currentPassword" class="block text-sm font-medium text-cyan-400" data-v-2280b1c4>\u5F53\u524D\u5BC6\u7801</label><input id="currentPassword"${ssrRenderAttr("value", passwordForm.currentPassword)} type="password" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u5F53\u524D\u5BC6\u7801" required data-v-2280b1c4></div><div class="space-y-2" data-v-2280b1c4><label for="newPassword" class="block text-sm font-medium text-cyan-400" data-v-2280b1c4>\u65B0\u5BC6\u7801</label><input id="newPassword"${ssrRenderAttr("value", passwordForm.newPassword)} type="password" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801\uFF08\u81F3\u5C116\u4F4D\uFF09" required minlength="6" data-v-2280b1c4></div><div class="space-y-2" data-v-2280b1c4><label for="confirmPassword" class="block text-sm font-medium text-cyan-400" data-v-2280b1c4>\u786E\u8BA4\u65B0\u5BC6\u7801</label><input id="confirmPassword"${ssrRenderAttr("value", passwordForm.confirmPassword)} type="password" class="input-dark w-full" placeholder="\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801" required data-v-2280b1c4></div></div><div class="flex justify-end space-x-4 mt-8" data-v-2280b1c4><button type="button" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-2280b1c4><i class="bi bi-arrow-clockwise mr-2" data-v-2280b1c4></i> \u91CD\u7F6E </button><button type="submit"${ssrIncludeBooleanAttr(changingPassword.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-2280b1c4>`);
        if (changingPassword.value) {
          _push(`<span class="loading loading-spinner loading-sm mr-2" data-v-2280b1c4></span>`);
        } else {
          _push(`<i class="bi bi-shield-check mr-2" data-v-2280b1c4></i>`);
        }
        _push(` ${ssrInterpolate(changingPassword.value ? "\u4FEE\u6539\u4E2D..." : "\u4FEE\u6539\u5BC6\u7801")}</button></div></form></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
      if (showAvatarModal.value) {
        _push(`<div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" data-v-2280b1c4><div class="glass-card-dark rounded-2xl p-6 max-w-md w-full mx-4 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-scale-in" data-v-2280b1c4><h3 class="text-xl font-semibold text-white mb-6 flex items-center gap-3" data-v-2280b1c4><i class="bi bi-camera text-cyan-400" data-v-2280b1c4></i> \u4E0A\u4F20\u5934\u50CF </h3><div class="space-y-6" data-v-2280b1c4><div class="flex justify-center" data-v-2280b1c4><div class="relative" data-v-2280b1c4><input id="avatar-input" type="file" accept="image/*" class="hidden" data-v-2280b1c4><div class="w-32 h-32 border-2 border-dashed border-cyan-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 transition-colors duration-300 cursor-pointer overflow-hidden" data-v-2280b1c4>`);
        if (avatarPreview.value) {
          _push(`<img${ssrRenderAttr("src", avatarPreview.value)} alt="\u5934\u50CF\u9884\u89C8" class="w-full h-full object-cover" data-v-2280b1c4>`);
        } else {
          _push(`<div class="text-center" data-v-2280b1c4><i class="bi bi-cloud-upload text-3xl text-cyan-400 mb-2 block" data-v-2280b1c4></i><span class="text-sm text-gray-400" data-v-2280b1c4>\u70B9\u51FB\u9009\u62E9\u56FE\u7247</span></div>`);
        }
        _push(`</div>`);
        if (avatarPreview.value) {
          _push(`<button class="absolute top-0 right-0 bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-400 transition-colors duration-200" data-v-2280b1c4><i class="bi bi-pencil text-xs" data-v-2280b1c4></i></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (selectedFile.value) {
          _push(`<div class="text-center" data-v-2280b1c4><p class="text-sm text-gray-400" data-v-2280b1c4>${ssrInterpolate(selectedFile.value.name)}</p><p class="text-xs text-gray-500" data-v-2280b1c4>${ssrInterpolate((selectedFile.value.size / 1024 / 1024).toFixed(2))} MB</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="text-center text-gray-400 text-sm" data-v-2280b1c4> \u652F\u6301 JPG\u3001PNG\u3001GIF\u3001WebP \u683C\u5F0F<br data-v-2280b1c4> \u6587\u4EF6\u5927\u5C0F\u4E0D\u8D85\u8FC7 2MB </p><div class="flex justify-end space-x-4" data-v-2280b1c4><button class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-2280b1c4><i class="bi bi-x-circle mr-2" data-v-2280b1c4></i> \u53D6\u6D88 </button><button${ssrIncludeBooleanAttr(!selectedFile.value || uploadingAvatar.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-2280b1c4>`);
        if (uploadingAvatar.value) {
          _push(`<span class="loading loading-spinner loading-sm mr-2" data-v-2280b1c4></span>`);
        } else {
          _push(`<i class="bi bi-check-circle mr-2" data-v-2280b1c4></i>`);
        }
        _push(` ${ssrInterpolate(uploadingAvatar.value ? "\u4E0A\u4F20\u4E2D..." : "\u786E\u5B9A\u4E0A\u4F20")}</button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2280b1c4"]]);

export { profile as default };
//# sourceMappingURL=profile-LlOnCpGB.mjs.map
