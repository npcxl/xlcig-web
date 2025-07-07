import { _ as __nuxt_component_0 } from "./nuxt-link-CA9RiB7n.js";
import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useLocation } from "./useLocation-kga13ouX.js";
import { _ as _export_sfc, a as useUserStore } from "../server.mjs";
import "D:/codeGitee/xlweb/node_modules/hookable/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/ufo/dist/index.mjs";
import "seemly";
import "vooks";
import "vdirs";
import "css-render";
import "@css-render/plugin-bem";
import "lodash-es";
import "evtd";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlweb/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/codeGitee/xlweb/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/codeGitee/xlweb/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/klona/dist/index.mjs";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6" }, _attrs))} data-v-77fffe4b><div class="max-w-4xl mx-auto" data-v-77fffe4b><div class="text-center mb-8" data-v-77fffe4b><h1 class="text-4xl font-bold text-white mb-4" data-v-77fffe4b>🌍 IP位置定位测试</h1><p class="text-gray-300 text-lg" data-v-77fffe4b>测试首页IP获取、用户登录检测、高德API调用等完整流程</p></div><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-6" data-v-77fffe4b><h2 class="text-2xl font-semibold text-white mb-4 flex items-center" data-v-77fffe4b><i class="bi bi-person-check mr-3 text-cyan-400" data-v-77fffe4b></i> 用户登录状态检查 </h2><div class="grid md:grid-cols-2 gap-4" data-v-77fffe4b><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>前端登录检查</div><div class="text-lg font-medium" data-v-77fffe4b>`);
      if (unref(isUserLoggedIn)) {
        _push(`<span class="text-green-400" data-v-77fffe4b><i class="bi bi-check-circle mr-2" data-v-77fffe4b></i>已登录 (前端验证) </span>`);
      } else {
        _push(`<span class="text-red-400" data-v-77fffe4b><i class="bi bi-x-circle mr-2" data-v-77fffe4b></i>未登录 (前端验证) </span>`);
      }
      _push(`</div></div>`);
      if (unref(isUserLoggedIn)) {
        _push(`<div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>用户信息</div><div class="text-lg font-medium text-white" data-v-77fffe4b>${ssrInterpolate(unref(userStore).userDisplayName)} (ID: ${ssrInterpolate((_a = unref(userStore).user) == null ? void 0 : _a.id)}) </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass([unref(isUserLoggedIn) ? "bg-green-500/10 border border-green-500/30" : "bg-yellow-500/10 border border-yellow-500/30", "mt-4 p-4 rounded-lg"])}" data-v-77fffe4b><div class="flex items-start gap-3" data-v-77fffe4b><i class="${ssrRenderClass([unref(isUserLoggedIn) ? "text-green-400" : "text-yellow-400", "bi bi-info-circle text-lg mt-0.5"])}" data-v-77fffe4b></i><div data-v-77fffe4b><div class="${ssrRenderClass([unref(isUserLoggedIn) ? "text-green-300" : "text-yellow-300", "font-medium mb-2"])}" data-v-77fffe4b>${ssrInterpolate(unref(isUserLoggedIn) ? "完整功能模式" : "基础功能模式")}</div><div class="${ssrRenderClass([unref(isUserLoggedIn) ? "text-green-200" : "text-yellow-200", "text-sm"])}" data-v-77fffe4b>`);
      if (unref(isUserLoggedIn)) {
        _push(`<div data-v-77fffe4b> ✅ 前端已确认登录状态<br data-v-77fffe4b> ✅ API调用时会携带认证token<br data-v-77fffe4b> ✅ 后端会更新users表的loginIp和loginIpContent字段<br data-v-77fffe4b> ✅ 可以查看个人登录历史记录 </div>`);
      } else {
        _push(`<div data-v-77fffe4b> ℹ️ 仍可获取IP地址和位置信息<br data-v-77fffe4b> ℹ️ 数据会保存到ip_addresses表作为缓存<br data-v-77fffe4b> ⚠️ 不会更新个人用户档案<br data-v-77fffe4b> 💡 请登录以启用完整功能 </div>`);
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
              _push2(` 立即登录 `);
            } else {
              return [
                createTextVNode(" 立即登录 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-6" data-v-77fffe4b><h2 class="text-2xl font-semibold text-white mb-4 flex items-center" data-v-77fffe4b><i class="bi bi-geo-alt mr-3 text-cyan-400" data-v-77fffe4b></i> IP位置信息 </h2>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-8" data-v-77fffe4b><div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" data-v-77fffe4b></div><p class="text-white text-lg" data-v-77fffe4b>正在获取IP位置信息...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-8" data-v-77fffe4b><div class="text-red-400 text-6xl mb-4" data-v-77fffe4b><i class="bi bi-exclamation-triangle" data-v-77fffe4b></i></div><p class="text-red-400 text-lg mb-4" data-v-77fffe4b>${ssrInterpolate(unref(error))}</p><button class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors" data-v-77fffe4b><i class="bi bi-arrow-clockwise mr-2" data-v-77fffe4b></i> 重新获取 </button></div>`);
      } else if (unref(data)) {
        _push(`<div class="space-y-4" data-v-77fffe4b><div class="grid md:grid-cols-2 gap-4" data-v-77fffe4b><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>IP地址</div><div class="text-lg font-mono text-cyan-400" data-v-77fffe4b>${ssrInterpolate(unref(data).ip)}</div></div><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>位置</div><div class="text-lg text-white" data-v-77fffe4b>${ssrInterpolate(unref(getLocationText)())}</div></div></div>`);
        if (unref(data).location && !unref(data).location.error) {
          _push(`<div class="grid md:grid-cols-3 gap-4" data-v-77fffe4b>`);
          if (unref(data).location.province) {
            _push(`<div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>省份</div><div class="text-lg text-white" data-v-77fffe4b>${ssrInterpolate(unref(data).location.province)}</div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(data).location.city) {
            _push(`<div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>城市</div><div class="text-lg text-white" data-v-77fffe4b>${ssrInterpolate(unref(data).location.city)}</div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(data).location.adcode) {
            _push(`<div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>区域编码</div><div class="text-lg font-mono text-white" data-v-77fffe4b>${ssrInterpolate(unref(data).location.adcode)}</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid md:grid-cols-2 gap-4" data-v-77fffe4b><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>数据来源</div><div class="text-lg" data-v-77fffe4b>`);
        if (unref(data).cached) {
          _push(`<span class="text-green-400" data-v-77fffe4b><i class="bi bi-database mr-2" data-v-77fffe4b></i>数据库缓存 </span>`);
        } else {
          _push(`<span class="text-cyan-400" data-v-77fffe4b><i class="bi bi-cloud mr-2" data-v-77fffe4b></i>高德地图API </span>`);
        }
        _push(`</div></div>`);
        if (unref(userStore).isLoggedIn) {
          _push(`<div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><div class="text-sm text-gray-400 mb-1" data-v-77fffe4b>登录信息更新</div><div class="text-lg" data-v-77fffe4b>`);
          if (unref(isUserLocationUpdated)) {
            _push(`<span class="text-green-400" data-v-77fffe4b><i class="bi bi-check-circle mr-2" data-v-77fffe4b></i>已更新到数据库 </span>`);
          } else {
            _push(`<span class="text-yellow-400" data-v-77fffe4b><i class="bi bi-clock mr-2" data-v-77fffe4b></i>未更新 </span>`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex gap-4 pt-4" data-v-77fffe4b><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white rounded-lg transition-colors" data-v-77fffe4b><i class="${ssrRenderClass([{ "animate-spin": unref(loading) }, "bi bi-arrow-clockwise mr-2"])}" data-v-77fffe4b></i> 强制刷新 </button><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white rounded-lg transition-colors" data-v-77fffe4b><i class="bi bi-geo-alt mr-2" data-v-77fffe4b></i> 重新定位 </button>`);
        if (!unref(isUserLoggedIn)) {
          _push(`<button class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors" data-v-77fffe4b><i class="bi bi-person-plus mr-2" data-v-77fffe4b></i> 测试登录 </button>`);
        } else {
          _push(`<button class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors" data-v-77fffe4b><i class="bi bi-box-arrow-right mr-2" data-v-77fffe4b></i> 测试登出 </button>`);
        }
        _push(`</div><div class="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg" data-v-77fffe4b><div class="text-blue-300 text-sm" data-v-77fffe4b><i class="bi bi-info-circle mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>测试说明：</strong>&quot;测试登录&quot;仅用于演示前端登录状态检查，使用模拟token。 要测试完整的数据库更新功能，请使用真实账号`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "text-blue-400 underline ml-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`登录`);
            } else {
              return [
                createTextVNode("登录")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`。 </div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-77fffe4b><h2 class="text-2xl font-semibold text-white mb-4 flex items-center" data-v-77fffe4b><i class="bi bi-info-circle mr-3 text-cyan-400" data-v-77fffe4b></i> 功能说明 </h2><div class="space-y-4 text-gray-300" data-v-77fffe4b><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><h3 class="text-lg font-semibold text-white mb-2" data-v-77fffe4b>✅ 已实现的功能</h3><ul class="space-y-2 text-sm" data-v-77fffe4b><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>前端登录状态检查</strong>：检查localStorage中的认证信息</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>真实IP获取</strong>：使用ipinfo.io获取公网IP，避免代理问题</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>高德地图API调用</strong>：获取IP对应的省市地址信息</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>后端JWT验证</strong>：确保只有真实登录用户才能更新数据库</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>用户表更新</strong>：自动更新loginIp和loginIpContent字段</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>前端实时显示</strong>：显示位置信息和数据库更新状态</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>智能缓存机制</strong>：24小时内重复IP使用数据库缓存</li><li data-v-77fffe4b><i class="bi bi-check text-green-400 mr-2" data-v-77fffe4b></i><strong data-v-77fffe4b>双重安全保障</strong>：前端UX检查 + 后端安全验证</li></ul></div><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><h3 class="text-lg font-semibold text-white mb-2" data-v-77fffe4b>🔄 工作流程</h3><ol class="space-y-2 text-sm list-decimal list-inside" data-v-77fffe4b><li data-v-77fffe4b><strong data-v-77fffe4b>前端登录检查</strong>：首页加载时检查用户登录状态(localStorage)</li><li data-v-77fffe4b><strong data-v-77fffe4b>获取真实IP</strong>：HeaderLocation组件调用ipinfo.io获取公网IP</li><li data-v-77fffe4b><strong data-v-77fffe4b>API调用</strong>：前端调用/api/amap/ip/接口（携带认证token）</li><li data-v-77fffe4b><strong data-v-77fffe4b>后端验证</strong>：后端验证JWT token确认用户身份</li><li data-v-77fffe4b><strong data-v-77fffe4b>位置查询</strong>：检查数据库缓存或调用高德地图API获取省市信息</li><li data-v-77fffe4b><strong data-v-77fffe4b>数据库更新</strong>：如果用户已登录且验证通过，更新用户表</li><li data-v-77fffe4b><strong data-v-77fffe4b>前端显示</strong>：显示位置信息和更新状态</li></ol></div><div class="p-4 bg-gray-800/30 rounded-lg" data-v-77fffe4b><h3 class="text-lg font-semibold text-white mb-2" data-v-77fffe4b>🎯 登录状态判断逻辑</h3><div class="space-y-3 text-sm" data-v-77fffe4b><div class="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20" data-v-77fffe4b><div class="font-medium text-cyan-300 mb-1" data-v-77fffe4b>📱 前端判断（用户体验）</div><div class="text-cyan-200" data-v-77fffe4b> • 检查localStorage中的authToken和userInfo<br data-v-77fffe4b> • 提供即时的登录状态反馈<br data-v-77fffe4b> • 决定是否显示&quot;登录信息已更新&quot;等提示 </div></div><div class="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20" data-v-77fffe4b><div class="font-medium text-purple-300 mb-1" data-v-77fffe4b>🔒 后端验证（安全保证）</div><div class="text-purple-200" data-v-77fffe4b> • 验证JWT token的有效性和完整性<br data-v-77fffe4b> • 确保只有真正登录的用户才能更新数据库<br data-v-77fffe4b> • 防止恶意请求和数据篡改 </div></div></div></div></div></div></div></div>`);
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
export {
  locationTest as default
};
//# sourceMappingURL=location-test-IFtrobEa.js.map
