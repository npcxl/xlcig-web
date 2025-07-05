import { _ as __nuxt_component_0 } from './nuxt-link-qhU_stN5.mjs';
import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useLocation } from './useLocation-DU515pZE.mjs';
import { u as useUserStore } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './apiClient-C7W98XI_.mjs';
import 'seemly';
import 'vooks';
import 'vdirs';
import 'css-render';
import '@css-render/plugin-bem';
import 'lodash-es';
import 'evtd';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';

const _sfc_main = {
  __name: "location-test",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const {
      loading,
      data,
      error,
      getLocationText,
      isUserLocationUpdated,
      isUserLoggedIn
    } = useLocation();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6" }, _attrs))} data-v-77fffe4b><div class="max-w-4xl mx-auto" data-v-77fffe4b><div class="text-center mb-8" data-v-77fffe4b><h1 class="text-4xl font-bold text-white mb-4" data-v-77fffe4b>\u{1F30D} IP\u4F4D\u7F6E\u5B9A\u4F4D\u6D4B\u8BD5</h1><p class="text-gray-300 text-lg" data-v-77fffe4b>\u6D4B\u8BD5\u9996\u9875IP\u83B7\u53D6\u3001\u7528\u6237\u767B\u5F55\u68C0\u6D4B\u3001\u9AD8\u5FB7API\u8C03\u7528\u7B49\u5B8C\u6574\u6D41\u7A0B</p></div><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-6" data-v-77fffe4b><h2 class="text-2xl font-semibold text-white mb-4 flex items-center" data-v-77fffe4b><i class="bi bi-person-check mr-3 text-cyan-400" data-v-77fffe4b></i> \u7528\u6237\u767B\u5F55\u72B6\u6001\u68C0\u67E5 </h2><div class="grid md:grid-cols-2 gap-4" data-v-77fffe4b><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>\u524D\u7AEF\u767B\u5F55\u68C0\u67E5</div><div class="text-lg font-medium" data-v-77fffe4b>`);
      if (unref(isUserLoggedIn)) {
        _push(`<span class="text-green-400" data-v-77fffe4b><i class="bi bi-check-circle mr-2" data-v-77fffe4b></i>\u5DF2\u767B\u5F55 (\u524D\u7AEF\u9A8C\u8BC1) </span>`);
      } else {
        _push(`<span class="text-red-400" data-v-77fffe4b><i class="bi bi-x-circle mr-2" data-v-77fffe4b></i>\u672A\u767B\u5F55 (\u524D\u7AEF\u9A8C\u8BC1) </span>`);
      }
      _push(`</div></div>`);
      if (unref(isUserLoggedIn)) {
        _push(`<div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>\u7528\u6237\u4FE1\u606F</div><div class="text-lg font-medium text-white" data-v-77fffe4b>${ssrInterpolate(unref(userStore).userDisplayName)} (ID: ${ssrInterpolate((_a = unref(userStore).user) == null ? void 0 : _a.id)}) </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass([unref(isUserLoggedIn) ? "bg-green-500/10 border border-green-500/30" : "bg-yellow-500/10 border border-yellow-500/30", "mt-4 p-4 rounded-lg"])}" data-v-77fffe4b><div class="flex items-start gap-3" data-v-77fffe4b><i class="${ssrRenderClass([unref(isUserLoggedIn) ? "text-green-400" : "text-yellow-400", "bi bi-info-circle text-lg mt-0.5"])}" data-v-77fffe4b></i><div data-v-77fffe4b><div class="${ssrRenderClass([unref(isUserLoggedIn) ? "text-green-300" : "text-yellow-300", "font-medium mb-2"])}" data-v-77fffe4b>${ssrInterpolate(unref(isUserLoggedIn) ? "\u5B8C\u6574\u529F\u80FD\u6A21\u5F0F" : "\u57FA\u7840\u529F\u80FD\u6A21\u5F0F")}</div><div class="${ssrRenderClass([unref(isUserLoggedIn) ? "text-green-200" : "text-yellow-200", "text-sm"])}" data-v-77fffe4b>`);
      if (unref(isUserLoggedIn)) {
        _push(`<div data-v-77fffe4b> \u2705 \u524D\u7AEF\u5DF2\u786E\u8BA4\u767B\u5F55\u72B6\u6001<br data-v-77fffe4b> \u2705 API\u8C03\u7528\u65F6\u4F1A\u643A\u5E26\u8BA4\u8BC1token<br data-v-77fffe4b> \u2705 \u540E\u7AEF\u4F1A\u66F4\u65B0users\u8868\u7684loginIp\u548CloginIpContent\u5B57\u6BB5<br data-v-77fffe4b> \u2705 \u53EF\u4EE5\u67E5\u770B\u4E2A\u4EBA\u767B\u5F55\u5386\u53F2\u8BB0\u5F55 </div>`);
      } else {
        _push(`<div data-v-77fffe4b> \u2139\uFE0F \u4ECD\u53EF\u83B7\u53D6IP\u5730\u5740\u548C\u4F4D\u7F6E\u4FE1\u606F<br data-v-77fffe4b> \u2139\uFE0F \u6570\u636E\u4F1A\u4FDD\u5B58\u5230ip_addresses\u8868\u4F5C\u4E3A\u7F13\u5B58<br data-v-77fffe4b> \u26A0\uFE0F \u4E0D\u4F1A\u66F4\u65B0\u4E2A\u4EBA\u7528\u6237\u6863\u6848<br data-v-77fffe4b> \u{1F4A1} \u8BF7\u767B\u5F55\u4EE5\u542F\u7528\u5B8C\u6574\u529F\u80FD </div>`);
      }
      _push(`</div>`);
      if (!unref(isUserLoggedIn)) {
        _push(`<div class="mt-3" data-v-77fffe4b>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm transition-colors"
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
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-6" data-v-77fffe4b><h2 class="text-2xl font-semibold text-white mb-4 flex items-center" data-v-77fffe4b><i class="bi bi-geo-alt mr-3 text-cyan-400" data-v-77fffe4b></i> IP\u4F4D\u7F6E\u4FE1\u606F </h2>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-8" data-v-77fffe4b><div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" data-v-77fffe4b></div><p class="text-white text-lg" data-v-77fffe4b>\u6B63\u5728\u83B7\u53D6IP\u4F4D\u7F6E\u4FE1\u606F...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-8" data-v-77fffe4b><div class="text-red-400 text-6xl mb-4" data-v-77fffe4b><i class="bi bi-exclamation-triangle" data-v-77fffe4b></i></div><p class="text-red-400 text-lg mb-4" data-v-77fffe4b>${ssrInterpolate(unref(error))}</p><button class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors" data-v-77fffe4b><i class="bi bi-arrow-clockwise mr-2" data-v-77fffe4b></i> \u91CD\u65B0\u83B7\u53D6 </button></div>`);
      } else if (unref(data)) {
        _push(`<div class="space-y-4" data-v-77fffe4b><div class="grid md:grid-cols-2 gap-4" data-v-77fffe4b><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>IP\u5730\u5740</div><div class="text-lg font-mono text-cyan-400" data-v-77fffe4b>${ssrInterpolate(unref(data).ip)}</div></div><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>\u4F4D\u7F6E</div><div class="text-lg text-white" data-v-77fffe4b>${ssrInterpolate(unref(getLocationText)())}</div></div></div>`);
        if (unref(data).location && !unref(data).location.error) {
          _push(`<div class="grid md:grid-cols-3 gap-4" data-v-77fffe4b>`);
          if (unref(data).location.province) {
            _push(`<div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>\u7701\u4EFD</div><div class="text-lg text-white" data-v-77fffe4b>${ssrInterpolate(unref(data).location.province)}</div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(data).location.city) {
            _push(`<div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>\u57CE\u5E02</div><div class="text-lg text-white" data-v-77fffe4b>${ssrInterpolate(unref(data).location.city)}</div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(data).location.adcode) {
            _push(`<div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>\u533A\u57DF\u7F16\u7801</div><div class="text-lg font-mono text-white" data-v-77fffe4b>${ssrInterpolate(unref(data).location.adcode)}</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid md:grid-cols-2 gap-4" data-v-77fffe4b><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>\u6570\u636E\u6765\u6E90</div><div class="text-lg" data-v-77fffe4b>`);
        if (unref(data).cached) {
          _push(`<span class="text-green-400" data-v-77fffe4b><i class="bi bi-database mr-2" data-v-77fffe4b></i>\u6570\u636E\u5E93\u7F13\u5B58 </span>`);
        } else {
          _push(`<span class="text-cyan-400" data-v-77fffe4b><i class="bi bi-cloud mr-2" data-v-77fffe4b></i>\u9AD8\u5FB7\u5730\u56FEAPI </span>`);
        }
        _push(`</div></div>`);
        if (unref(userStore).isLoggedIn) {
          _push(`<div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>\u767B\u5F55\u4FE1\u606F\u66F4\u65B0</div><div class="text-lg" data-v-77fffe4b>`);
          if (unref(isUserLocationUpdated)) {
            _push(`<span class="text-green-400" data-v-77fffe4b><i class="bi bi-check-circle mr-2" data-v-77fffe4b></i>\u5DF2\u66F4\u65B0\u5230\u6570\u636E\u5E93 </span>`);
          } else {
            _push(`<span class="text-yellow-400" data-v-77fffe4b><i class="bi bi-clock mr-2" data-v-77fffe4b></i>\u672A\u66F4\u65B0 </span>`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex gap-4 pt-4" data-v-77fffe4b><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white rounded-lg transition-colors" data-v-77fffe4b><i class="${ssrRenderClass([{ "animate-spin": unref(loading) }, "bi bi-arrow-clockwise mr-2"])}" data-v-77fffe4b></i> \u5F3A\u5236\u5237\u65B0 </button><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white rounded-lg transition-colors" data-v-77fffe4b><i class="bi bi-geo-alt mr-2" data-v-77fffe4b></i> \u91CD\u65B0\u5B9A\u4F4D </button>`);
        if (!unref(isUserLoggedIn)) {
          _push(`<button class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors" data-v-77fffe4b><i class="bi bi-person-plus mr-2" data-v-77fffe4b></i> \u6D4B\u8BD5\u767B\u5F55 </button>`);
        } else {
          _push(`<button class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors" data-v-77fffe4b><i class="bi bi-box-arrow-right mr-2" data-v-77fffe4b></i> \u6D4B\u8BD5\u767B\u51FA </button>`);
        }
        _push(`</div><div class="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg" data-v-77fffe4b><div class="text-blue-300 text-sm" data-v-77fffe4b><i class="bi bi-info-circle mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>\u6D4B\u8BD5\u8BF4\u660E\uFF1A</strong>&quot;\u6D4B\u8BD5\u767B\u5F55&quot;\u4EC5\u7528\u4E8E\u6F14\u793A\u524D\u7AEF\u767B\u5F55\u72B6\u6001\u68C0\u67E5\uFF0C\u4F7F\u7528\u6A21\u62DFtoken\u3002 \u8981\u6D4B\u8BD5\u5B8C\u6574\u7684\u6570\u636E\u5E93\u66F4\u65B0\u529F\u80FD\uFF0C\u8BF7\u4F7F\u7528\u771F\u5B9E\u8D26\u53F7`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "text-blue-400 underline ml-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u767B\u5F55`);
            } else {
              return [
                createTextVNode("\u767B\u5F55")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`\u3002 </div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-77fffe4b><h2 class="text-2xl font-semibold text-white mb-4 flex items-center" data-v-77fffe4b><i class="bi bi-info-circle mr-3 text-cyan-400" data-v-77fffe4b></i> \u529F\u80FD\u8BF4\u660E </h2><div class="space-y-4 text-gray-300" data-v-77fffe4b><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><h3 class="text-lg font-semibold text-white mb-2" data-v-77fffe4b>\u2705 \u5DF2\u5B9E\u73B0\u7684\u529F\u80FD</h3><ul class="space-y-2 text-sm" data-v-77fffe4b><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>\u524D\u7AEF\u767B\u5F55\u72B6\u6001\u68C0\u67E5</strong>\uFF1A\u68C0\u67E5localStorage\u4E2D\u7684\u8BA4\u8BC1\u4FE1\u606F</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>\u771F\u5B9EIP\u83B7\u53D6</strong>\uFF1A\u4F7F\u7528ipinfo.io\u83B7\u53D6\u516C\u7F51IP\uFF0C\u907F\u514D\u4EE3\u7406\u95EE\u9898</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>\u9AD8\u5FB7\u5730\u56FEAPI\u8C03\u7528</strong>\uFF1A\u83B7\u53D6IP\u5BF9\u5E94\u7684\u7701\u5E02\u5730\u5740\u4FE1\u606F</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>\u540E\u7AEFJWT\u9A8C\u8BC1</strong>\uFF1A\u786E\u4FDD\u53EA\u6709\u771F\u5B9E\u767B\u5F55\u7528\u6237\u624D\u80FD\u66F4\u65B0\u6570\u636E\u5E93</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>\u7528\u6237\u8868\u66F4\u65B0</strong>\uFF1A\u81EA\u52A8\u66F4\u65B0loginIp\u548CloginIpContent\u5B57\u6BB5</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>\u524D\u7AEF\u5B9E\u65F6\u663E\u793A</strong>\uFF1A\u663E\u793A\u4F4D\u7F6E\u4FE1\u606F\u548C\u6570\u636E\u5E93\u66F4\u65B0\u72B6\u6001</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>\u667A\u80FD\u7F13\u5B58\u673A\u5236</strong>\uFF1A24\u5C0F\u65F6\u5185\u91CD\u590DIP\u4F7F\u7528\u6570\u636E\u5E93\u7F13\u5B58</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>\u53CC\u91CD\u5B89\u5168\u4FDD\u969C</strong>\uFF1A\u524D\u7AEFUX\u68C0\u67E5 + \u540E\u7AEF\u5B89\u5168\u9A8C\u8BC1</li></ul></div><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><h3 class="text-lg font-semibold text-white mb-2" data-v-77fffe4b>\u{1F504} \u5DE5\u4F5C\u6D41\u7A0B</h3><ol class="space-y-2 text-sm list-decimal list-inside" data-v-77fffe4b><li data-v-77fffe4b><strong data-v-77fffe4b>\u524D\u7AEF\u767B\u5F55\u68C0\u67E5</strong>\uFF1A\u9996\u9875\u52A0\u8F7D\u65F6\u68C0\u67E5\u7528\u6237\u767B\u5F55\u72B6\u6001(localStorage)</li><li data-v-77fffe4b><strong data-v-77fffe4b>\u83B7\u53D6\u771F\u5B9EIP</strong>\uFF1AHeaderLocation\u7EC4\u4EF6\u8C03\u7528ipinfo.io\u83B7\u53D6\u516C\u7F51IP</li><li data-v-77fffe4b><strong data-v-77fffe4b>API\u8C03\u7528</strong>\uFF1A\u524D\u7AEF\u8C03\u7528/api/amap/ip/\u63A5\u53E3\uFF08\u643A\u5E26\u8BA4\u8BC1token\uFF09</li><li data-v-77fffe4b><strong data-v-77fffe4b>\u540E\u7AEF\u9A8C\u8BC1</strong>\uFF1A\u540E\u7AEF\u9A8C\u8BC1JWT token\u786E\u8BA4\u7528\u6237\u8EAB\u4EFD</li><li data-v-77fffe4b><strong data-v-77fffe4b>\u4F4D\u7F6E\u67E5\u8BE2</strong>\uFF1A\u68C0\u67E5\u6570\u636E\u5E93\u7F13\u5B58\u6216\u8C03\u7528\u9AD8\u5FB7\u5730\u56FEAPI\u83B7\u53D6\u7701\u5E02\u4FE1\u606F</li><li data-v-77fffe4b><strong data-v-77fffe4b>\u6570\u636E\u5E93\u66F4\u65B0</strong>\uFF1A\u5982\u679C\u7528\u6237\u5DF2\u767B\u5F55\u4E14\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u66F4\u65B0\u7528\u6237\u8868</li><li data-v-77fffe4b><strong data-v-77fffe4b>\u524D\u7AEF\u663E\u793A</strong>\uFF1A\u663E\u793A\u4F4D\u7F6E\u4FE1\u606F\u548C\u66F4\u65B0\u72B6\u6001</li></ol></div><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><h3 class="text-lg font-semibold text-white mb-2" data-v-77fffe4b>\u{1F3AF} \u767B\u5F55\u72B6\u6001\u5224\u65AD\u903B\u8F91</h3><div class="space-y-3 text-sm" data-v-77fffe4b><div class="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20" data-v-77fffe4b><div class="font-medium text-cyan-300 mb-1" data-v-77fffe4b>\u{1F4F1} \u524D\u7AEF\u5224\u65AD\uFF08\u7528\u6237\u4F53\u9A8C\uFF09</div><div class="text-cyan-200" data-v-77fffe4b> \u2022 \u68C0\u67E5localStorage\u4E2D\u7684authToken\u548CuserInfo<br data-v-77fffe4b> \u2022 \u63D0\u4F9B\u5373\u65F6\u7684\u767B\u5F55\u72B6\u6001\u53CD\u9988<br data-v-77fffe4b> \u2022 \u51B3\u5B9A\u662F\u5426\u663E\u793A&quot;\u767B\u5F55\u4FE1\u606F\u5DF2\u66F4\u65B0&quot;\u7B49\u63D0\u793A </div></div><div class="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20" data-v-77fffe4b><div class="font-medium text-purple-300 mb-1" data-v-77fffe4b>\u{1F512} \u540E\u7AEF\u9A8C\u8BC1\uFF08\u5B89\u5168\u4FDD\u8BC1\uFF09</div><div class="text-purple-200" data-v-77fffe4b> \u2022 \u9A8C\u8BC1JWT token\u7684\u6709\u6548\u6027\u548C\u5B8C\u6574\u6027<br data-v-77fffe4b> \u2022 \u786E\u4FDD\u53EA\u6709\u771F\u6B63\u767B\u5F55\u7684\u7528\u6237\u624D\u80FD\u66F4\u65B0\u6570\u636E\u5E93<br data-v-77fffe4b> \u2022 \u9632\u6B62\u6076\u610F\u8BF7\u6C42\u548C\u6570\u636E\u7BE1\u6539 </div></div></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/location-test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const locationTest = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77fffe4b"]]);

export { locationTest as default };
//# sourceMappingURL=location-test-HVvjxCSH.mjs.map
