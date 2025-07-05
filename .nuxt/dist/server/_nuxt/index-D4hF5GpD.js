import { _ as __nuxt_component_0 } from "./PageLoader-GhT5s0Gy.js";
import { _ as __nuxt_component_0$1 } from "./AppHeader-D4R1WNqE.js";
import { _ as __nuxt_component_0$2 } from "./nuxt-link-qhU_stN5.js";
import { _ as __nuxt_component_0$3 } from "./AppLogo-B7Z3yKfV.js";
import { ref, watch, mergeProps, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, nextTick, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { p as productsApi } from "./products-suYGsOwB.js";
import { useRouter, useRoute } from "vue-router";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlweb/node_modules/hookable/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/codeGitee/xlweb/node_modules/defu/dist/defu.mjs";
import "D:/codeGitee/xlweb/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/ufo/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/klona/dist/index.mjs";
import "./useLocation-DU515pZE.js";
import "./apiClient-C7W98XI_.js";
import "seemly";
import "vooks";
import "vdirs";
import "css-render";
import "@css-render/plugin-bem";
import "lodash-es";
import "evtd";
import "treemate";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const featuredProducts = ref([]);
    const configurations = ref([]);
    const isPageLoading = ref(true);
    const isDataLoading = ref(true);
    const hasError = ref(false);
    const errorMessage = ref("");
    const loadPageData = async () => {
      try {
        console.log("首页开始加载数据...");
        isPageLoading.value = true;
        isDataLoading.value = true;
        hasError.value = false;
        const [products, configs] = await Promise.all([
          fetchFeaturedProducts(),
          fetchConfigurations()
        ]);
        console.log("首页数据加载完成:", {
          productsCount: products.length,
          configsCount: configs.length
        });
        await nextTick();
        isPageLoading.value = false;
        isDataLoading.value = false;
        console.log("首页状态更新完成:", {
          isPageLoading: isPageLoading.value,
          isDataLoading: isDataLoading.value,
          productsCount: featuredProducts.value.length,
          configsCount: configurations.value.length
        });
      } catch (error) {
        console.error("首页数据加载失败:", error);
        hasError.value = true;
        errorMessage.value = error.message || "页面加载失败";
        isPageLoading.value = false;
        isDataLoading.value = false;
      }
    };
    const reloadPage = () => {
      loadPageData();
    };
    watch(() => route.path, (newPath, oldPath) => {
      console.log("首页路由变化:", oldPath, "->", newPath);
      if (newPath === "/") {
        console.log("返回首页，重新加载数据");
        loadPageData();
      }
    });
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsApi.getHotProducts(4);
        if (response.success && response.data) {
          const products = response.data.map((config) => ({
            id: config.id,
            name: config.name,
            price: config.price,
            rating: 4.5,
            // 默认评分
            image: config.images && config.images.length > 0 ? config.images[0] : "",
            description: config.description || "专业电脑配置"
          }));
          featuredProducts.value = products;
          return products;
        } else {
          featuredProducts.value = [];
          return [];
        }
      } catch (error) {
        console.error("获取热门产品失败:", error);
        featuredProducts.value = [];
        return [];
      }
    };
    const fetchConfigurations = async () => {
      try {
        const response = await productsApi.getFeaturedProducts({ limit: 3 });
        if (response.success && response.data && response.data.length > 0) {
          const configs = response.data.map((config, index2) => {
            const badges = ["超值", "推荐", "顶级"];
            const badgeClasses = [
              "px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium",
              "px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium",
              "px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium"
            ];
            let components = [];
            if (config.specs) {
              try {
                const specs = typeof config.specs === "string" ? JSON.parse(config.specs) : config.specs;
                components = Object.entries(specs).slice(0, 4).map(([key, value]) => ({
                  type: getSpecDisplayName(key),
                  name: value
                }));
              } catch (e) {
                console.error("解析配置规格失败:", e);
                components = [];
              }
            }
            return {
              id: config.id,
              name: config.name,
              price: config.price,
              score: 85 + index2 * 5,
              // 模拟性能分数
              badge: badges[index2] || "推荐",
              badgeClass: badgeClasses[index2] || badgeClasses[1],
              description: config.description || getCategoryDescription(config.category),
              components
            };
          });
          configurations.value = configs;
          return configs;
        } else {
          configurations.value = [];
          return [];
        }
      } catch (error) {
        console.error("获取配置推荐失败:", error);
        configurations.value = [];
        return [];
      }
    };
    const getSpecDisplayName = (key) => {
      const specNames = {
        cpu: "CPU",
        gpu: "显卡",
        motherboard: "主板",
        memory: "内存",
        storage: "存储",
        power: "电源",
        case: "机箱",
        cooler: "散热器",
        display: "显示器"
      };
      return specNames[key] || key.toUpperCase();
    };
    const getCategoryDescription = (category) => {
      const descriptions = {
        office: "适合日常办公和学习使用的高性价比配置",
        gaming: "专为游戏优化的高性能配置",
        workstation: "专业工作站配置，适合内容创作和专业应用"
      };
      return descriptions[category] || "专业电脑配置方案";
    };
    const viewProduct = (productId) => {
      router.push(`/products/${productId}`);
    };
    const getHomeProductIcon = (productName) => {
      if (productName.includes("RTX") || productName.includes("RX") || productName.includes("显卡")) {
        return "bi bi-gpu-card text-cyan-400 text-4xl";
      }
      if (productName.includes("Intel") || productName.includes("AMD") || productName.includes("Ryzen") || productName.includes("Core")) {
        return "bi bi-cpu text-orange-400 text-4xl";
      }
      if (productName.includes("主板") || productName.includes("STRIX") || productName.includes("MAG")) {
        return "bi bi-motherboard text-green-400 text-4xl";
      }
      if (productName.includes("电源") || productName.includes("PSU") || productName.includes("Power")) {
        return "bi bi-lightning text-yellow-400 text-4xl";
      }
      return "bi bi-pc-display text-gray-400 text-4xl";
    };
    const getProductTypeName = (productName) => {
      if (productName.includes("RTX") || productName.includes("RX") || productName.includes("显卡")) {
        return "显卡";
      }
      if (productName.includes("Intel") || productName.includes("AMD") || productName.includes("Ryzen") || productName.includes("Core")) {
        return "CPU";
      }
      if (productName.includes("主板") || productName.includes("STRIX") || productName.includes("MAG")) {
        return "主板";
      }
      if (productName.includes("电源") || productName.includes("PSU") || productName.includes("Power")) {
        return "电源";
      }
      return "PC配件";
    };
    console.log("首页组件渲染, 状态:", {
      isPageLoading: isPageLoading.value,
      isDataLoading: isDataLoading.value,
      hasError: hasError.value,
      productsCount: featuredProducts.value.length,
      configsCount: configurations.value.length
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageLoader = __nuxt_component_0;
      const _component_AppHeader = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_AppLogo = __nuxt_component_0$3;
      _push(ssrRenderComponent(_component_PageLoader, mergeProps({
        "is-page-loading": isPageLoading.value,
        "is-data-loading": isDataLoading.value,
        "has-error": hasError.value,
        "error-message": errorMessage.value,
        "loading-title": "正在加载热门产品...",
        "loading-message": "请稍候",
        onRetry: reloadPage
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" data-v-0eb23aaf${_scopeId}><div class="fixed inset-0 pointer-events-none" data-v-0eb23aaf${_scopeId}><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-0eb23aaf${_scopeId}></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-0eb23aaf${_scopeId}></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-0eb23aaf${_scopeId}></div></div>`);
            _push2(ssrRenderComponent(_component_AppHeader, {
              "show-back-button": false,
              "show-nav-menu": true,
              "show-breadcrumb": false,
              "show-location": true,
              "show-search-button": true,
              "show-notification-button": true,
              "show-decorations": true,
              "logo-size": "large"
            }, null, _parent2, _scopeId));
            _push2(`<section class="relative z-10 py-20" data-v-0eb23aaf${_scopeId}><div class="container mx-auto px-6" data-v-0eb23aaf${_scopeId}><div class="text-center" data-v-0eb23aaf${_scopeId}><div class="glass-card-dark rounded-3xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-4xl mx-auto" data-v-0eb23aaf${_scopeId}><h1 class="text-5xl md:text-7xl font-bold text-white leading-tight mb-8" data-v-0eb23aaf${_scopeId}> 专业<span class="text-cyan-400" data-v-0eb23aaf${_scopeId}>xlCig</span><br data-v-0eb23aaf${_scopeId}><span class="text-3xl md:text-5xl text-gray-300 font-normal" data-v-0eb23aaf${_scopeId}>PC硬件专家</span></h1><p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed" data-v-0eb23aaf${_scopeId}> 为您提供专业的PC硬件产品和装机建议，助您打造梦想中的高性能电脑 </p><div class="flex flex-col sm:flex-row gap-4 justify-center items-center" data-v-0eb23aaf${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/products",
              class: "inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1 group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="bi bi-lightning-fill mr-2 group-hover:animate-bounce" data-v-0eb23aaf${_scopeId2}></i> 立即开始 `);
                } else {
                  return [
                    createVNode("i", { class: "bi bi-lightning-fill mr-2 group-hover:animate-bounce" }),
                    createTextVNode(" 立即开始 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="inline-flex items-center px-8 py-3 border-2 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:bg-cyan-500/10 transform hover:-translate-y-1" data-v-0eb23aaf${_scopeId}><i class="bi bi-play-circle mr-2" data-v-0eb23aaf${_scopeId}></i> 观看演示 </button></div></div></div></div></section><section class="relative z-10 py-16" data-v-0eb23aaf${_scopeId}><div class="container mx-auto px-6" data-v-0eb23aaf${_scopeId}><div class="text-center mb-16" data-v-0eb23aaf${_scopeId}><h2 class="text-4xl font-bold text-white mb-4" data-v-0eb23aaf${_scopeId}>我们的服务</h2><p class="text-gray-300 text-lg" data-v-0eb23aaf${_scopeId}>专业的硬件选择和装机服务</p></div><div class="grid md:grid-cols-3 gap-8" data-v-0eb23aaf${_scopeId}><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" data-v-0eb23aaf${_scopeId}><div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center" data-v-0eb23aaf${_scopeId}><i class="bi bi-star-fill text-white text-2xl" data-v-0eb23aaf${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-0eb23aaf${_scopeId}>精选产品</h3><p class="text-gray-300 leading-relaxed" data-v-0eb23aaf${_scopeId}>精心挑选的高品质PC硬件，确保性能与价格的完美平衡</p></div><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" data-v-0eb23aaf${_scopeId}><div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center" data-v-0eb23aaf${_scopeId}><i class="bi bi-currency-dollar text-white text-2xl" data-v-0eb23aaf${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-0eb23aaf${_scopeId}>优惠价格</h3><p class="text-gray-300 leading-relaxed" data-v-0eb23aaf${_scopeId}>直接与厂商合作，为您提供最具竞争力的价格和促销活动</p></div><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" data-v-0eb23aaf${_scopeId}><div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center" data-v-0eb23aaf${_scopeId}><i class="bi bi-joystick text-white text-2xl" data-v-0eb23aaf${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-0eb23aaf${_scopeId}>游戏体验</h3><p class="text-gray-300 leading-relaxed" data-v-0eb23aaf${_scopeId}>针对游戏需求优化的配置方案，让您享受极致的游戏体验</p></div></div></div></section><section class="relative z-10 py-16" data-v-0eb23aaf${_scopeId}><div class="container mx-auto px-6" data-v-0eb23aaf${_scopeId}><div class="text-center mb-16" data-v-0eb23aaf${_scopeId}><h2 class="text-4xl font-bold text-white mb-4" data-v-0eb23aaf${_scopeId}>热门产品</h2><p class="text-gray-300 text-lg" data-v-0eb23aaf${_scopeId}>最受欢迎的PC硬件产品</p></div>`);
            if (featuredProducts.value.length === 0) {
              _push2(`<div class="text-center py-16" data-v-0eb23aaf${_scopeId}><div class="glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto" data-v-0eb23aaf${_scopeId}><div class="text-8xl mb-8 text-cyan-400 opacity-50" data-v-0eb23aaf${_scopeId}><i class="bi bi-inbox" data-v-0eb23aaf${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-0eb23aaf${_scopeId}>暂无热门产品</h3><p class="text-gray-400 mb-8 text-lg" data-v-0eb23aaf${_scopeId}>商家还没有上传产品，请稍后再来查看</p><button class="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-0eb23aaf${_scopeId}><i class="bi bi-arrow-clockwise mr-2" data-v-0eb23aaf${_scopeId}></i> 重新加载 </button></div></div>`);
            } else {
              _push2(`<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-v-0eb23aaf${_scopeId}><!--[-->`);
              ssrRenderList(featuredProducts.value, (product) => {
                _push2(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2 group" data-v-0eb23aaf${_scopeId}><div class="relative h-48 bg-gradient-to-br from-gray-800/50 to-gray-900/50" data-v-0eb23aaf${_scopeId}>`);
                if (product.image) {
                  _push2(`<div class="home-product-image-container" data-v-0eb23aaf${_scopeId}><img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" data-v-0eb23aaf${_scopeId}></div>`);
                } else {
                  _push2(`<div class="home-product-placeholder" data-v-0eb23aaf${_scopeId}><i class="${ssrRenderClass(getHomeProductIcon(product.name))}" data-v-0eb23aaf${_scopeId}></i><span class="home-product-type" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(getProductTypeName(product.name))}</span></div>`);
                }
                _push2(`<div class="absolute top-3 right-3" data-v-0eb23aaf${_scopeId}><span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30" data-v-0eb23aaf${_scopeId}><i class="bi bi-fire mr-1" data-v-0eb23aaf${_scopeId}></i>热门 </span></div></div><div class="p-6" data-v-0eb23aaf${_scopeId}><h3 class="font-semibold text-white text-lg mb-2 line-clamp-2" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(product.name)}</h3><p class="text-gray-400 text-sm mb-4 line-clamp-2" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(product.description)}</p><div class="flex items-center justify-between" data-v-0eb23aaf${_scopeId}><div class="text-2xl font-bold text-cyan-400" data-v-0eb23aaf${_scopeId}>¥${ssrInterpolate(product.price.toLocaleString())}</div><div class="flex" data-v-0eb23aaf${_scopeId}><!--[-->`);
                ssrRenderList(5, (i) => {
                  _push2(`<i class="${ssrRenderClass([i <= product.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-sm"])}" data-v-0eb23aaf${_scopeId}></i>`);
                });
                _push2(`<!--]--></div></div><button class="w-full mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-all duration-300" data-v-0eb23aaf${_scopeId}> 查看详情 </button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            if (featuredProducts.value.length > 0) {
              _push2(`<div class="text-center mt-12" data-v-0eb23aaf${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/products",
                class: "inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1 group"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="bi bi-collection mr-2 group-hover:animate-bounce" data-v-0eb23aaf${_scopeId2}></i> 浏览产品 `);
                  } else {
                    return [
                      createVNode("i", { class: "bi bi-collection mr-2 group-hover:animate-bounce" }),
                      createTextVNode(" 浏览产品 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></section><section class="relative z-10 py-16" data-v-0eb23aaf${_scopeId}><div class="container mx-auto px-6" data-v-0eb23aaf${_scopeId}><div class="text-center mb-16" data-v-0eb23aaf${_scopeId}><h2 class="text-4xl font-bold text-white mb-4" data-v-0eb23aaf${_scopeId}>装机配置推荐</h2><p class="text-gray-300 text-lg" data-v-0eb23aaf${_scopeId}>根据不同需求精心搭配的配置方案</p></div>`);
            if (configurations.value.length === 0) {
              _push2(`<div class="text-center py-16" data-v-0eb23aaf${_scopeId}><div class="glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto" data-v-0eb23aaf${_scopeId}><div class="text-8xl mb-8 text-cyan-400 opacity-50" data-v-0eb23aaf${_scopeId}><i class="bi bi-cpu" data-v-0eb23aaf${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-0eb23aaf${_scopeId}>暂无配置推荐</h3><p class="text-gray-400 mb-8 text-lg" data-v-0eb23aaf${_scopeId}>商家还没有上传配置方案，请稍后再来查看</p><button class="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-0eb23aaf${_scopeId}><i class="bi bi-arrow-clockwise mr-2" data-v-0eb23aaf${_scopeId}></i> 重新加载 </button></div></div>`);
            } else {
              _push2(`<div class="grid md:grid-cols-3 gap-8" data-v-0eb23aaf${_scopeId}><!--[-->`);
              ssrRenderList(configurations.value, (config) => {
                _push2(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" data-v-0eb23aaf${_scopeId}><div class="p-6 border-b border-gray-700/50" data-v-0eb23aaf${_scopeId}><div class="flex items-center justify-between mb-4" data-v-0eb23aaf${_scopeId}><h3 class="text-2xl font-semibold text-white" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(config.name)}</h3><span class="${ssrRenderClass(config.badgeClass)}" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(config.badge)}</span></div><p class="text-gray-300 mb-4" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(config.description)}</p><div class="text-3xl font-bold text-cyan-400 mb-2" data-v-0eb23aaf${_scopeId}>¥${ssrInterpolate(config.price.toLocaleString())}</div><div class="text-sm text-gray-400" data-v-0eb23aaf${_scopeId}>预估性能分数：${ssrInterpolate(config.score)}</div></div><div class="p-6" data-v-0eb23aaf${_scopeId}><div class="space-y-3 mb-6" data-v-0eb23aaf${_scopeId}><!--[-->`);
                ssrRenderList(config.components, (component) => {
                  _push2(`<div class="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg" data-v-0eb23aaf${_scopeId}><span class="text-gray-300 text-sm" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(component.type)}</span><span class="text-white text-sm font-medium" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(component.name)}</span></div>`);
                });
                _push2(`<!--]--></div><button class="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300" data-v-0eb23aaf${_scopeId}> 选择此配置 </button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></section><footer class="relative z-10 mt-20" data-v-0eb23aaf${_scopeId}><div class="container mx-auto px-6 py-12" data-v-0eb23aaf${_scopeId}><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-0eb23aaf${_scopeId}><div class="text-center" data-v-0eb23aaf${_scopeId}><div class="flex justify-center mb-4" data-v-0eb23aaf${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppLogo, {
              size: "medium",
              "show-decorations": false
            }, null, _parent2, _scopeId));
            _push2(`</div><p class="text-gray-300 mb-6" data-v-0eb23aaf${_scopeId}>专业的PC硬件产品和装机服务</p><div class="flex justify-center space-x-6 text-gray-400" data-v-0eb23aaf${_scopeId}><a href="#" class="hover:text-cyan-400 transition-colors duration-200" data-v-0eb23aaf${_scopeId}>关于我们</a><a href="#" class="hover:text-cyan-400 transition-colors duration-200" data-v-0eb23aaf${_scopeId}>联系方式</a><a href="#" class="hover:text-cyan-400 transition-colors duration-200" data-v-0eb23aaf${_scopeId}>服务条款</a><a href="#" class="hover:text-cyan-400 transition-colors duration-200" data-v-0eb23aaf${_scopeId}>隐私政策</a></div><div class="mt-6 pt-6 border-t border-gray-700/50 text-gray-500 text-sm" data-v-0eb23aaf${_scopeId}> © 2024 xlCig. 保留所有权利. </div></div></div></div></footer></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, [
                createVNode("div", { class: "fixed inset-0 pointer-events-none" }, [
                  createVNode("div", { class: "absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" }),
                  createVNode("div", { class: "absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" }),
                  createVNode("div", { class: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" })
                ]),
                createVNode(_component_AppHeader, {
                  "show-back-button": false,
                  "show-nav-menu": true,
                  "show-breadcrumb": false,
                  "show-location": true,
                  "show-search-button": true,
                  "show-notification-button": true,
                  "show-decorations": true,
                  "logo-size": "large"
                }),
                createVNode("section", { class: "relative z-10 py-20" }, [
                  createVNode("div", { class: "container mx-auto px-6" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "glass-card-dark rounded-3xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-4xl mx-auto" }, [
                        createVNode("h1", { class: "text-5xl md:text-7xl font-bold text-white leading-tight mb-8" }, [
                          createTextVNode(" 专业"),
                          createVNode("span", { class: "text-cyan-400" }, "xlCig"),
                          createVNode("br"),
                          createVNode("span", { class: "text-3xl md:text-5xl text-gray-300 font-normal" }, "PC硬件专家")
                        ]),
                        createVNode("p", { class: "text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed" }, " 为您提供专业的PC硬件产品和装机建议，助您打造梦想中的高性能电脑 "),
                        createVNode("div", { class: "flex flex-col sm:flex-row gap-4 justify-center items-center" }, [
                          createVNode(_component_NuxtLink, {
                            to: "/products",
                            class: "inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1 group"
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "bi bi-lightning-fill mr-2 group-hover:animate-bounce" }),
                              createTextVNode(" 立即开始 ")
                            ]),
                            _: 1
                          }),
                          createVNode("button", { class: "inline-flex items-center px-8 py-3 border-2 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:bg-cyan-500/10 transform hover:-translate-y-1" }, [
                            createVNode("i", { class: "bi bi-play-circle mr-2" }),
                            createTextVNode(" 观看演示 ")
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("section", { class: "relative z-10 py-16" }, [
                  createVNode("div", { class: "container mx-auto px-6" }, [
                    createVNode("div", { class: "text-center mb-16" }, [
                      createVNode("h2", { class: "text-4xl font-bold text-white mb-4" }, "我们的服务"),
                      createVNode("p", { class: "text-gray-300 text-lg" }, "专业的硬件选择和装机服务")
                    ]),
                    createVNode("div", { class: "grid md:grid-cols-3 gap-8" }, [
                      createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" }, [
                        createVNode("div", { class: "w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center" }, [
                          createVNode("i", { class: "bi bi-star-fill text-white text-2xl" })
                        ]),
                        createVNode("h3", { class: "text-2xl font-semibold text-white mb-4" }, "精选产品"),
                        createVNode("p", { class: "text-gray-300 leading-relaxed" }, "精心挑选的高品质PC硬件，确保性能与价格的完美平衡")
                      ]),
                      createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" }, [
                        createVNode("div", { class: "w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center" }, [
                          createVNode("i", { class: "bi bi-currency-dollar text-white text-2xl" })
                        ]),
                        createVNode("h3", { class: "text-2xl font-semibold text-white mb-4" }, "优惠价格"),
                        createVNode("p", { class: "text-gray-300 leading-relaxed" }, "直接与厂商合作，为您提供最具竞争力的价格和促销活动")
                      ]),
                      createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" }, [
                        createVNode("div", { class: "w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center" }, [
                          createVNode("i", { class: "bi bi-joystick text-white text-2xl" })
                        ]),
                        createVNode("h3", { class: "text-2xl font-semibold text-white mb-4" }, "游戏体验"),
                        createVNode("p", { class: "text-gray-300 leading-relaxed" }, "针对游戏需求优化的配置方案，让您享受极致的游戏体验")
                      ])
                    ])
                  ])
                ]),
                createVNode("section", { class: "relative z-10 py-16" }, [
                  createVNode("div", { class: "container mx-auto px-6" }, [
                    createVNode("div", { class: "text-center mb-16" }, [
                      createVNode("h2", { class: "text-4xl font-bold text-white mb-4" }, "热门产品"),
                      createVNode("p", { class: "text-gray-300 text-lg" }, "最受欢迎的PC硬件产品")
                    ]),
                    featuredProducts.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-16"
                    }, [
                      createVNode("div", { class: "glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto" }, [
                        createVNode("div", { class: "text-8xl mb-8 text-cyan-400 opacity-50" }, [
                          createVNode("i", { class: "bi bi-inbox" })
                        ]),
                        createVNode("h3", { class: "text-2xl font-semibold text-white mb-4" }, "暂无热门产品"),
                        createVNode("p", { class: "text-gray-400 mb-8 text-lg" }, "商家还没有上传产品，请稍后再来查看"),
                        createVNode("button", {
                          onClick: reloadPage,
                          class: "px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                        }, [
                          createVNode("i", { class: "bi bi-arrow-clockwise mr-2" }),
                          createTextVNode(" 重新加载 ")
                        ])
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(featuredProducts.value, (product) => {
                        return openBlock(), createBlock("div", {
                          key: product.id,
                          class: "glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2 group"
                        }, [
                          createVNode("div", { class: "relative h-48 bg-gradient-to-br from-gray-800/50 to-gray-900/50" }, [
                            product.image ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "home-product-image-container"
                            }, [
                              createVNode("img", {
                                src: product.image,
                                alt: product.name,
                                class: "w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300",
                                onError: ($event) => $event.target.style.display = "none"
                              }, null, 40, ["src", "alt", "onError"])
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "home-product-placeholder"
                            }, [
                              createVNode("i", {
                                class: getHomeProductIcon(product.name)
                              }, null, 2),
                              createVNode("span", { class: "home-product-type" }, toDisplayString(getProductTypeName(product.name)), 1)
                            ])),
                            createVNode("div", { class: "absolute top-3 right-3" }, [
                              createVNode("span", { class: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30" }, [
                                createVNode("i", { class: "bi bi-fire mr-1" }),
                                createTextVNode("热门 ")
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "p-6" }, [
                            createVNode("h3", { class: "font-semibold text-white text-lg mb-2 line-clamp-2" }, toDisplayString(product.name), 1),
                            createVNode("p", { class: "text-gray-400 text-sm mb-4 line-clamp-2" }, toDisplayString(product.description), 1),
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("div", { class: "text-2xl font-bold text-cyan-400" }, "¥" + toDisplayString(product.price.toLocaleString()), 1),
                              createVNode("div", { class: "flex" }, [
                                (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                  return createVNode("i", {
                                    key: i,
                                    class: [i <= product.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-sm"]
                                  }, null, 2);
                                }), 64))
                              ])
                            ]),
                            createVNode("button", {
                              onClick: ($event) => viewProduct(product.id),
                              class: "w-full mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-all duration-300"
                            }, " 查看详情 ", 8, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ])),
                    featuredProducts.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "text-center mt-12"
                    }, [
                      createVNode(_component_NuxtLink, {
                        to: "/products",
                        class: "inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1 group"
                      }, {
                        default: withCtx(() => [
                          createVNode("i", { class: "bi bi-collection mr-2 group-hover:animate-bounce" }),
                          createTextVNode(" 浏览产品 ")
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("section", { class: "relative z-10 py-16" }, [
                  createVNode("div", { class: "container mx-auto px-6" }, [
                    createVNode("div", { class: "text-center mb-16" }, [
                      createVNode("h2", { class: "text-4xl font-bold text-white mb-4" }, "装机配置推荐"),
                      createVNode("p", { class: "text-gray-300 text-lg" }, "根据不同需求精心搭配的配置方案")
                    ]),
                    configurations.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-16"
                    }, [
                      createVNode("div", { class: "glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto" }, [
                        createVNode("div", { class: "text-8xl mb-8 text-cyan-400 opacity-50" }, [
                          createVNode("i", { class: "bi bi-cpu" })
                        ]),
                        createVNode("h3", { class: "text-2xl font-semibold text-white mb-4" }, "暂无配置推荐"),
                        createVNode("p", { class: "text-gray-400 mb-8 text-lg" }, "商家还没有上传配置方案，请稍后再来查看"),
                        createVNode("button", {
                          onClick: reloadPage,
                          class: "px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                        }, [
                          createVNode("i", { class: "bi bi-arrow-clockwise mr-2" }),
                          createTextVNode(" 重新加载 ")
                        ])
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "grid md:grid-cols-3 gap-8"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(configurations.value, (config) => {
                        return openBlock(), createBlock("div", {
                          key: config.id,
                          class: "glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2"
                        }, [
                          createVNode("div", { class: "p-6 border-b border-gray-700/50" }, [
                            createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                              createVNode("h3", { class: "text-2xl font-semibold text-white" }, toDisplayString(config.name), 1),
                              createVNode("span", {
                                class: config.badgeClass
                              }, toDisplayString(config.badge), 3)
                            ]),
                            createVNode("p", { class: "text-gray-300 mb-4" }, toDisplayString(config.description), 1),
                            createVNode("div", { class: "text-3xl font-bold text-cyan-400 mb-2" }, "¥" + toDisplayString(config.price.toLocaleString()), 1),
                            createVNode("div", { class: "text-sm text-gray-400" }, "预估性能分数：" + toDisplayString(config.score), 1)
                          ]),
                          createVNode("div", { class: "p-6" }, [
                            createVNode("div", { class: "space-y-3 mb-6" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(config.components, (component) => {
                                return openBlock(), createBlock("div", {
                                  key: component.type,
                                  class: "flex justify-between items-center p-3 bg-gray-800/30 rounded-lg"
                                }, [
                                  createVNode("span", { class: "text-gray-300 text-sm" }, toDisplayString(component.type), 1),
                                  createVNode("span", { class: "text-white text-sm font-medium" }, toDisplayString(component.name), 1)
                                ]);
                              }), 128))
                            ]),
                            createVNode("button", {
                              onClick: ($event) => viewProduct(config.id),
                              class: "w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300"
                            }, " 选择此配置 ", 8, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ]))
                  ])
                ]),
                createVNode("footer", { class: "relative z-10 mt-20" }, [
                  createVNode("div", { class: "container mx-auto px-6 py-12" }, [
                    createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("div", { class: "flex justify-center mb-4" }, [
                          createVNode(_component_AppLogo, {
                            size: "medium",
                            "show-decorations": false
                          })
                        ]),
                        createVNode("p", { class: "text-gray-300 mb-6" }, "专业的PC硬件产品和装机服务"),
                        createVNode("div", { class: "flex justify-center space-x-6 text-gray-400" }, [
                          createVNode("a", {
                            href: "#",
                            class: "hover:text-cyan-400 transition-colors duration-200"
                          }, "关于我们"),
                          createVNode("a", {
                            href: "#",
                            class: "hover:text-cyan-400 transition-colors duration-200"
                          }, "联系方式"),
                          createVNode("a", {
                            href: "#",
                            class: "hover:text-cyan-400 transition-colors duration-200"
                          }, "服务条款"),
                          createVNode("a", {
                            href: "#",
                            class: "hover:text-cyan-400 transition-colors duration-200"
                          }, "隐私政策")
                        ]),
                        createVNode("div", { class: "mt-6 pt-6 border-t border-gray-700/50 text-gray-500 text-sm" }, " © 2024 xlCig. 保留所有权利. ")
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0eb23aaf"]]);
export {
  index as default
};
//# sourceMappingURL=index-D4hF5GpD.js.map
