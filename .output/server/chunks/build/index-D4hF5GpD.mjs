import { _ as __nuxt_component_0 } from './PageLoader-GhT5s0Gy.mjs';
import { _ as __nuxt_component_0$1 } from './AppHeader-D4R1WNqE.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-qhU_stN5.mjs';
import { _ as __nuxt_component_0$3 } from './AppLogo-B7Z3yKfV.mjs';
import { useSSRContext, ref, watch, mergeProps, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, nextTick } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { p as productsApi } from './products-suYGsOwB.mjs';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './server.mjs';
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
import './useLocation-DU515pZE.mjs';
import './apiClient-C7W98XI_.mjs';
import 'seemly';
import 'vooks';
import 'vdirs';
import 'css-render';
import '@css-render/plugin-bem';
import 'lodash-es';
import 'evtd';
import 'treemate';

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
        console.log("\u9996\u9875\u5F00\u59CB\u52A0\u8F7D\u6570\u636E...");
        isPageLoading.value = true;
        isDataLoading.value = true;
        hasError.value = false;
        const [products, configs] = await Promise.all([
          fetchFeaturedProducts(),
          fetchConfigurations()
        ]);
        console.log("\u9996\u9875\u6570\u636E\u52A0\u8F7D\u5B8C\u6210:", {
          productsCount: products.length,
          configsCount: configs.length
        });
        await nextTick();
        isPageLoading.value = false;
        isDataLoading.value = false;
        console.log("\u9996\u9875\u72B6\u6001\u66F4\u65B0\u5B8C\u6210:", {
          isPageLoading: isPageLoading.value,
          isDataLoading: isDataLoading.value,
          productsCount: featuredProducts.value.length,
          configsCount: configurations.value.length
        });
      } catch (error) {
        console.error("\u9996\u9875\u6570\u636E\u52A0\u8F7D\u5931\u8D25:", error);
        hasError.value = true;
        errorMessage.value = error.message || "\u9875\u9762\u52A0\u8F7D\u5931\u8D25";
        isPageLoading.value = false;
        isDataLoading.value = false;
      }
    };
    const reloadPage = () => {
      loadPageData();
    };
    watch(() => route.path, (newPath, oldPath) => {
      console.log("\u9996\u9875\u8DEF\u7531\u53D8\u5316:", oldPath, "->", newPath);
      if (newPath === "/") {
        console.log("\u8FD4\u56DE\u9996\u9875\uFF0C\u91CD\u65B0\u52A0\u8F7D\u6570\u636E");
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
            description: config.description || "\u4E13\u4E1A\u7535\u8111\u914D\u7F6E"
          }));
          featuredProducts.value = products;
          return products;
        } else {
          featuredProducts.value = [];
          return [];
        }
      } catch (error) {
        console.error("\u83B7\u53D6\u70ED\u95E8\u4EA7\u54C1\u5931\u8D25:", error);
        featuredProducts.value = [];
        return [];
      }
    };
    const fetchConfigurations = async () => {
      try {
        const response = await productsApi.getFeaturedProducts({ limit: 3 });
        if (response.success && response.data && response.data.length > 0) {
          const configs = response.data.map((config, index2) => {
            const badges = ["\u8D85\u503C", "\u63A8\u8350", "\u9876\u7EA7"];
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
                console.error("\u89E3\u6790\u914D\u7F6E\u89C4\u683C\u5931\u8D25:", e);
                components = [];
              }
            }
            return {
              id: config.id,
              name: config.name,
              price: config.price,
              score: 85 + index2 * 5,
              // 模拟性能分数
              badge: badges[index2] || "\u63A8\u8350",
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
        console.error("\u83B7\u53D6\u914D\u7F6E\u63A8\u8350\u5931\u8D25:", error);
        configurations.value = [];
        return [];
      }
    };
    const getSpecDisplayName = (key) => {
      const specNames = {
        cpu: "CPU",
        gpu: "\u663E\u5361",
        motherboard: "\u4E3B\u677F",
        memory: "\u5185\u5B58",
        storage: "\u5B58\u50A8",
        power: "\u7535\u6E90",
        case: "\u673A\u7BB1",
        cooler: "\u6563\u70ED\u5668",
        display: "\u663E\u793A\u5668"
      };
      return specNames[key] || key.toUpperCase();
    };
    const getCategoryDescription = (category) => {
      const descriptions = {
        office: "\u9002\u5408\u65E5\u5E38\u529E\u516C\u548C\u5B66\u4E60\u4F7F\u7528\u7684\u9AD8\u6027\u4EF7\u6BD4\u914D\u7F6E",
        gaming: "\u4E13\u4E3A\u6E38\u620F\u4F18\u5316\u7684\u9AD8\u6027\u80FD\u914D\u7F6E",
        workstation: "\u4E13\u4E1A\u5DE5\u4F5C\u7AD9\u914D\u7F6E\uFF0C\u9002\u5408\u5185\u5BB9\u521B\u4F5C\u548C\u4E13\u4E1A\u5E94\u7528"
      };
      return descriptions[category] || "\u4E13\u4E1A\u7535\u8111\u914D\u7F6E\u65B9\u6848";
    };
    const viewProduct = (productId) => {
      router.push(`/products/${productId}`);
    };
    const getHomeProductIcon = (productName) => {
      if (productName.includes("RTX") || productName.includes("RX") || productName.includes("\u663E\u5361")) {
        return "bi bi-gpu-card text-cyan-400 text-4xl";
      }
      if (productName.includes("Intel") || productName.includes("AMD") || productName.includes("Ryzen") || productName.includes("Core")) {
        return "bi bi-cpu text-orange-400 text-4xl";
      }
      if (productName.includes("\u4E3B\u677F") || productName.includes("STRIX") || productName.includes("MAG")) {
        return "bi bi-motherboard text-green-400 text-4xl";
      }
      if (productName.includes("\u7535\u6E90") || productName.includes("PSU") || productName.includes("Power")) {
        return "bi bi-lightning text-yellow-400 text-4xl";
      }
      return "bi bi-pc-display text-gray-400 text-4xl";
    };
    const getProductTypeName = (productName) => {
      if (productName.includes("RTX") || productName.includes("RX") || productName.includes("\u663E\u5361")) {
        return "\u663E\u5361";
      }
      if (productName.includes("Intel") || productName.includes("AMD") || productName.includes("Ryzen") || productName.includes("Core")) {
        return "CPU";
      }
      if (productName.includes("\u4E3B\u677F") || productName.includes("STRIX") || productName.includes("MAG")) {
        return "\u4E3B\u677F";
      }
      if (productName.includes("\u7535\u6E90") || productName.includes("PSU") || productName.includes("Power")) {
        return "\u7535\u6E90";
      }
      return "PC\u914D\u4EF6";
    };
    console.log("\u9996\u9875\u7EC4\u4EF6\u6E32\u67D3, \u72B6\u6001:", {
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
        "loading-title": "\u6B63\u5728\u52A0\u8F7D\u70ED\u95E8\u4EA7\u54C1...",
        "loading-message": "\u8BF7\u7A0D\u5019",
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
            _push2(`<section class="relative z-10 py-20" data-v-0eb23aaf${_scopeId}><div class="container mx-auto px-6" data-v-0eb23aaf${_scopeId}><div class="text-center" data-v-0eb23aaf${_scopeId}><div class="glass-card-dark rounded-3xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-4xl mx-auto" data-v-0eb23aaf${_scopeId}><h1 class="text-5xl md:text-7xl font-bold text-white leading-tight mb-8" data-v-0eb23aaf${_scopeId}> \u4E13\u4E1A<span class="text-cyan-400" data-v-0eb23aaf${_scopeId}>xlCig</span><br data-v-0eb23aaf${_scopeId}><span class="text-3xl md:text-5xl text-gray-300 font-normal" data-v-0eb23aaf${_scopeId}>PC\u786C\u4EF6\u4E13\u5BB6</span></h1><p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed" data-v-0eb23aaf${_scopeId}> \u4E3A\u60A8\u63D0\u4F9B\u4E13\u4E1A\u7684PC\u786C\u4EF6\u4EA7\u54C1\u548C\u88C5\u673A\u5EFA\u8BAE\uFF0C\u52A9\u60A8\u6253\u9020\u68A6\u60F3\u4E2D\u7684\u9AD8\u6027\u80FD\u7535\u8111 </p><div class="flex flex-col sm:flex-row gap-4 justify-center items-center" data-v-0eb23aaf${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/products",
              class: "inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1 group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="bi bi-lightning-fill mr-2 group-hover:animate-bounce" data-v-0eb23aaf${_scopeId2}></i> \u7ACB\u5373\u5F00\u59CB `);
                } else {
                  return [
                    createVNode("i", { class: "bi bi-lightning-fill mr-2 group-hover:animate-bounce" }),
                    createTextVNode(" \u7ACB\u5373\u5F00\u59CB ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="inline-flex items-center px-8 py-3 border-2 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:bg-cyan-500/10 transform hover:-translate-y-1" data-v-0eb23aaf${_scopeId}><i class="bi bi-play-circle mr-2" data-v-0eb23aaf${_scopeId}></i> \u89C2\u770B\u6F14\u793A </button></div></div></div></div></section><section class="relative z-10 py-16" data-v-0eb23aaf${_scopeId}><div class="container mx-auto px-6" data-v-0eb23aaf${_scopeId}><div class="text-center mb-16" data-v-0eb23aaf${_scopeId}><h2 class="text-4xl font-bold text-white mb-4" data-v-0eb23aaf${_scopeId}>\u6211\u4EEC\u7684\u670D\u52A1</h2><p class="text-gray-300 text-lg" data-v-0eb23aaf${_scopeId}>\u4E13\u4E1A\u7684\u786C\u4EF6\u9009\u62E9\u548C\u88C5\u673A\u670D\u52A1</p></div><div class="grid md:grid-cols-3 gap-8" data-v-0eb23aaf${_scopeId}><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" data-v-0eb23aaf${_scopeId}><div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center" data-v-0eb23aaf${_scopeId}><i class="bi bi-star-fill text-white text-2xl" data-v-0eb23aaf${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-0eb23aaf${_scopeId}>\u7CBE\u9009\u4EA7\u54C1</h3><p class="text-gray-300 leading-relaxed" data-v-0eb23aaf${_scopeId}>\u7CBE\u5FC3\u6311\u9009\u7684\u9AD8\u54C1\u8D28PC\u786C\u4EF6\uFF0C\u786E\u4FDD\u6027\u80FD\u4E0E\u4EF7\u683C\u7684\u5B8C\u7F8E\u5E73\u8861</p></div><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" data-v-0eb23aaf${_scopeId}><div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center" data-v-0eb23aaf${_scopeId}><i class="bi bi-currency-dollar text-white text-2xl" data-v-0eb23aaf${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-0eb23aaf${_scopeId}>\u4F18\u60E0\u4EF7\u683C</h3><p class="text-gray-300 leading-relaxed" data-v-0eb23aaf${_scopeId}>\u76F4\u63A5\u4E0E\u5382\u5546\u5408\u4F5C\uFF0C\u4E3A\u60A8\u63D0\u4F9B\u6700\u5177\u7ADE\u4E89\u529B\u7684\u4EF7\u683C\u548C\u4FC3\u9500\u6D3B\u52A8</p></div><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" data-v-0eb23aaf${_scopeId}><div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center" data-v-0eb23aaf${_scopeId}><i class="bi bi-joystick text-white text-2xl" data-v-0eb23aaf${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-0eb23aaf${_scopeId}>\u6E38\u620F\u4F53\u9A8C</h3><p class="text-gray-300 leading-relaxed" data-v-0eb23aaf${_scopeId}>\u9488\u5BF9\u6E38\u620F\u9700\u6C42\u4F18\u5316\u7684\u914D\u7F6E\u65B9\u6848\uFF0C\u8BA9\u60A8\u4EAB\u53D7\u6781\u81F4\u7684\u6E38\u620F\u4F53\u9A8C</p></div></div></div></section><section class="relative z-10 py-16" data-v-0eb23aaf${_scopeId}><div class="container mx-auto px-6" data-v-0eb23aaf${_scopeId}><div class="text-center mb-16" data-v-0eb23aaf${_scopeId}><h2 class="text-4xl font-bold text-white mb-4" data-v-0eb23aaf${_scopeId}>\u70ED\u95E8\u4EA7\u54C1</h2><p class="text-gray-300 text-lg" data-v-0eb23aaf${_scopeId}>\u6700\u53D7\u6B22\u8FCE\u7684PC\u786C\u4EF6\u4EA7\u54C1</p></div>`);
            if (featuredProducts.value.length === 0) {
              _push2(`<div class="text-center py-16" data-v-0eb23aaf${_scopeId}><div class="glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto" data-v-0eb23aaf${_scopeId}><div class="text-8xl mb-8 text-cyan-400 opacity-50" data-v-0eb23aaf${_scopeId}><i class="bi bi-inbox" data-v-0eb23aaf${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-0eb23aaf${_scopeId}>\u6682\u65E0\u70ED\u95E8\u4EA7\u54C1</h3><p class="text-gray-400 mb-8 text-lg" data-v-0eb23aaf${_scopeId}>\u5546\u5BB6\u8FD8\u6CA1\u6709\u4E0A\u4F20\u4EA7\u54C1\uFF0C\u8BF7\u7A0D\u540E\u518D\u6765\u67E5\u770B</p><button class="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-0eb23aaf${_scopeId}><i class="bi bi-arrow-clockwise mr-2" data-v-0eb23aaf${_scopeId}></i> \u91CD\u65B0\u52A0\u8F7D </button></div></div>`);
            } else {
              _push2(`<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-v-0eb23aaf${_scopeId}><!--[-->`);
              ssrRenderList(featuredProducts.value, (product) => {
                _push2(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2 group" data-v-0eb23aaf${_scopeId}><div class="relative h-48 bg-gradient-to-br from-gray-800/50 to-gray-900/50" data-v-0eb23aaf${_scopeId}>`);
                if (product.image) {
                  _push2(`<div class="home-product-image-container" data-v-0eb23aaf${_scopeId}><img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" data-v-0eb23aaf${_scopeId}></div>`);
                } else {
                  _push2(`<div class="home-product-placeholder" data-v-0eb23aaf${_scopeId}><i class="${ssrRenderClass(getHomeProductIcon(product.name))}" data-v-0eb23aaf${_scopeId}></i><span class="home-product-type" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(getProductTypeName(product.name))}</span></div>`);
                }
                _push2(`<div class="absolute top-3 right-3" data-v-0eb23aaf${_scopeId}><span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30" data-v-0eb23aaf${_scopeId}><i class="bi bi-fire mr-1" data-v-0eb23aaf${_scopeId}></i>\u70ED\u95E8 </span></div></div><div class="p-6" data-v-0eb23aaf${_scopeId}><h3 class="font-semibold text-white text-lg mb-2 line-clamp-2" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(product.name)}</h3><p class="text-gray-400 text-sm mb-4 line-clamp-2" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(product.description)}</p><div class="flex items-center justify-between" data-v-0eb23aaf${_scopeId}><div class="text-2xl font-bold text-cyan-400" data-v-0eb23aaf${_scopeId}>\xA5${ssrInterpolate(product.price.toLocaleString())}</div><div class="flex" data-v-0eb23aaf${_scopeId}><!--[-->`);
                ssrRenderList(5, (i) => {
                  _push2(`<i class="${ssrRenderClass([i <= product.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-sm"])}" data-v-0eb23aaf${_scopeId}></i>`);
                });
                _push2(`<!--]--></div></div><button class="w-full mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-all duration-300" data-v-0eb23aaf${_scopeId}> \u67E5\u770B\u8BE6\u60C5 </button></div></div>`);
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
                    _push3(`<i class="bi bi-collection mr-2 group-hover:animate-bounce" data-v-0eb23aaf${_scopeId2}></i> \u6D4F\u89C8\u4EA7\u54C1 `);
                  } else {
                    return [
                      createVNode("i", { class: "bi bi-collection mr-2 group-hover:animate-bounce" }),
                      createTextVNode(" \u6D4F\u89C8\u4EA7\u54C1 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></section><section class="relative z-10 py-16" data-v-0eb23aaf${_scopeId}><div class="container mx-auto px-6" data-v-0eb23aaf${_scopeId}><div class="text-center mb-16" data-v-0eb23aaf${_scopeId}><h2 class="text-4xl font-bold text-white mb-4" data-v-0eb23aaf${_scopeId}>\u88C5\u673A\u914D\u7F6E\u63A8\u8350</h2><p class="text-gray-300 text-lg" data-v-0eb23aaf${_scopeId}>\u6839\u636E\u4E0D\u540C\u9700\u6C42\u7CBE\u5FC3\u642D\u914D\u7684\u914D\u7F6E\u65B9\u6848</p></div>`);
            if (configurations.value.length === 0) {
              _push2(`<div class="text-center py-16" data-v-0eb23aaf${_scopeId}><div class="glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto" data-v-0eb23aaf${_scopeId}><div class="text-8xl mb-8 text-cyan-400 opacity-50" data-v-0eb23aaf${_scopeId}><i class="bi bi-cpu" data-v-0eb23aaf${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-0eb23aaf${_scopeId}>\u6682\u65E0\u914D\u7F6E\u63A8\u8350</h3><p class="text-gray-400 mb-8 text-lg" data-v-0eb23aaf${_scopeId}>\u5546\u5BB6\u8FD8\u6CA1\u6709\u4E0A\u4F20\u914D\u7F6E\u65B9\u6848\uFF0C\u8BF7\u7A0D\u540E\u518D\u6765\u67E5\u770B</p><button class="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-0eb23aaf${_scopeId}><i class="bi bi-arrow-clockwise mr-2" data-v-0eb23aaf${_scopeId}></i> \u91CD\u65B0\u52A0\u8F7D </button></div></div>`);
            } else {
              _push2(`<div class="grid md:grid-cols-3 gap-8" data-v-0eb23aaf${_scopeId}><!--[-->`);
              ssrRenderList(configurations.value, (config) => {
                _push2(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" data-v-0eb23aaf${_scopeId}><div class="p-6 border-b border-gray-700/50" data-v-0eb23aaf${_scopeId}><div class="flex items-center justify-between mb-4" data-v-0eb23aaf${_scopeId}><h3 class="text-2xl font-semibold text-white" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(config.name)}</h3><span class="${ssrRenderClass(config.badgeClass)}" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(config.badge)}</span></div><p class="text-gray-300 mb-4" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(config.description)}</p><div class="text-3xl font-bold text-cyan-400 mb-2" data-v-0eb23aaf${_scopeId}>\xA5${ssrInterpolate(config.price.toLocaleString())}</div><div class="text-sm text-gray-400" data-v-0eb23aaf${_scopeId}>\u9884\u4F30\u6027\u80FD\u5206\u6570\uFF1A${ssrInterpolate(config.score)}</div></div><div class="p-6" data-v-0eb23aaf${_scopeId}><div class="space-y-3 mb-6" data-v-0eb23aaf${_scopeId}><!--[-->`);
                ssrRenderList(config.components, (component) => {
                  _push2(`<div class="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg" data-v-0eb23aaf${_scopeId}><span class="text-gray-300 text-sm" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(component.type)}</span><span class="text-white text-sm font-medium" data-v-0eb23aaf${_scopeId}>${ssrInterpolate(component.name)}</span></div>`);
                });
                _push2(`<!--]--></div><button class="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300" data-v-0eb23aaf${_scopeId}> \u9009\u62E9\u6B64\u914D\u7F6E </button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></section><footer class="relative z-10 mt-20" data-v-0eb23aaf${_scopeId}><div class="container mx-auto px-6 py-12" data-v-0eb23aaf${_scopeId}><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-0eb23aaf${_scopeId}><div class="text-center" data-v-0eb23aaf${_scopeId}><div class="flex justify-center mb-4" data-v-0eb23aaf${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppLogo, {
              size: "medium",
              "show-decorations": false
            }, null, _parent2, _scopeId));
            _push2(`</div><p class="text-gray-300 mb-6" data-v-0eb23aaf${_scopeId}>\u4E13\u4E1A\u7684PC\u786C\u4EF6\u4EA7\u54C1\u548C\u88C5\u673A\u670D\u52A1</p><div class="flex justify-center space-x-6 text-gray-400" data-v-0eb23aaf${_scopeId}><a href="#" class="hover:text-cyan-400 transition-colors duration-200" data-v-0eb23aaf${_scopeId}>\u5173\u4E8E\u6211\u4EEC</a><a href="#" class="hover:text-cyan-400 transition-colors duration-200" data-v-0eb23aaf${_scopeId}>\u8054\u7CFB\u65B9\u5F0F</a><a href="#" class="hover:text-cyan-400 transition-colors duration-200" data-v-0eb23aaf${_scopeId}>\u670D\u52A1\u6761\u6B3E</a><a href="#" class="hover:text-cyan-400 transition-colors duration-200" data-v-0eb23aaf${_scopeId}>\u9690\u79C1\u653F\u7B56</a></div><div class="mt-6 pt-6 border-t border-gray-700/50 text-gray-500 text-sm" data-v-0eb23aaf${_scopeId}> \xA9 2024 xlCig. \u4FDD\u7559\u6240\u6709\u6743\u5229. </div></div></div></div></footer></div>`);
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
                          createTextVNode(" \u4E13\u4E1A"),
                          createVNode("span", { class: "text-cyan-400" }, "xlCig"),
                          createVNode("br"),
                          createVNode("span", { class: "text-3xl md:text-5xl text-gray-300 font-normal" }, "PC\u786C\u4EF6\u4E13\u5BB6")
                        ]),
                        createVNode("p", { class: "text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed" }, " \u4E3A\u60A8\u63D0\u4F9B\u4E13\u4E1A\u7684PC\u786C\u4EF6\u4EA7\u54C1\u548C\u88C5\u673A\u5EFA\u8BAE\uFF0C\u52A9\u60A8\u6253\u9020\u68A6\u60F3\u4E2D\u7684\u9AD8\u6027\u80FD\u7535\u8111 "),
                        createVNode("div", { class: "flex flex-col sm:flex-row gap-4 justify-center items-center" }, [
                          createVNode(_component_NuxtLink, {
                            to: "/products",
                            class: "inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1 group"
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "bi bi-lightning-fill mr-2 group-hover:animate-bounce" }),
                              createTextVNode(" \u7ACB\u5373\u5F00\u59CB ")
                            ]),
                            _: 1
                          }),
                          createVNode("button", { class: "inline-flex items-center px-8 py-3 border-2 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:bg-cyan-500/10 transform hover:-translate-y-1" }, [
                            createVNode("i", { class: "bi bi-play-circle mr-2" }),
                            createTextVNode(" \u89C2\u770B\u6F14\u793A ")
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("section", { class: "relative z-10 py-16" }, [
                  createVNode("div", { class: "container mx-auto px-6" }, [
                    createVNode("div", { class: "text-center mb-16" }, [
                      createVNode("h2", { class: "text-4xl font-bold text-white mb-4" }, "\u6211\u4EEC\u7684\u670D\u52A1"),
                      createVNode("p", { class: "text-gray-300 text-lg" }, "\u4E13\u4E1A\u7684\u786C\u4EF6\u9009\u62E9\u548C\u88C5\u673A\u670D\u52A1")
                    ]),
                    createVNode("div", { class: "grid md:grid-cols-3 gap-8" }, [
                      createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" }, [
                        createVNode("div", { class: "w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center" }, [
                          createVNode("i", { class: "bi bi-star-fill text-white text-2xl" })
                        ]),
                        createVNode("h3", { class: "text-2xl font-semibold text-white mb-4" }, "\u7CBE\u9009\u4EA7\u54C1"),
                        createVNode("p", { class: "text-gray-300 leading-relaxed" }, "\u7CBE\u5FC3\u6311\u9009\u7684\u9AD8\u54C1\u8D28PC\u786C\u4EF6\uFF0C\u786E\u4FDD\u6027\u80FD\u4E0E\u4EF7\u683C\u7684\u5B8C\u7F8E\u5E73\u8861")
                      ]),
                      createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" }, [
                        createVNode("div", { class: "w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center" }, [
                          createVNode("i", { class: "bi bi-currency-dollar text-white text-2xl" })
                        ]),
                        createVNode("h3", { class: "text-2xl font-semibold text-white mb-4" }, "\u4F18\u60E0\u4EF7\u683C"),
                        createVNode("p", { class: "text-gray-300 leading-relaxed" }, "\u76F4\u63A5\u4E0E\u5382\u5546\u5408\u4F5C\uFF0C\u4E3A\u60A8\u63D0\u4F9B\u6700\u5177\u7ADE\u4E89\u529B\u7684\u4EF7\u683C\u548C\u4FC3\u9500\u6D3B\u52A8")
                      ]),
                      createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" }, [
                        createVNode("div", { class: "w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center" }, [
                          createVNode("i", { class: "bi bi-joystick text-white text-2xl" })
                        ]),
                        createVNode("h3", { class: "text-2xl font-semibold text-white mb-4" }, "\u6E38\u620F\u4F53\u9A8C"),
                        createVNode("p", { class: "text-gray-300 leading-relaxed" }, "\u9488\u5BF9\u6E38\u620F\u9700\u6C42\u4F18\u5316\u7684\u914D\u7F6E\u65B9\u6848\uFF0C\u8BA9\u60A8\u4EAB\u53D7\u6781\u81F4\u7684\u6E38\u620F\u4F53\u9A8C")
                      ])
                    ])
                  ])
                ]),
                createVNode("section", { class: "relative z-10 py-16" }, [
                  createVNode("div", { class: "container mx-auto px-6" }, [
                    createVNode("div", { class: "text-center mb-16" }, [
                      createVNode("h2", { class: "text-4xl font-bold text-white mb-4" }, "\u70ED\u95E8\u4EA7\u54C1"),
                      createVNode("p", { class: "text-gray-300 text-lg" }, "\u6700\u53D7\u6B22\u8FCE\u7684PC\u786C\u4EF6\u4EA7\u54C1")
                    ]),
                    featuredProducts.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-16"
                    }, [
                      createVNode("div", { class: "glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto" }, [
                        createVNode("div", { class: "text-8xl mb-8 text-cyan-400 opacity-50" }, [
                          createVNode("i", { class: "bi bi-inbox" })
                        ]),
                        createVNode("h3", { class: "text-2xl font-semibold text-white mb-4" }, "\u6682\u65E0\u70ED\u95E8\u4EA7\u54C1"),
                        createVNode("p", { class: "text-gray-400 mb-8 text-lg" }, "\u5546\u5BB6\u8FD8\u6CA1\u6709\u4E0A\u4F20\u4EA7\u54C1\uFF0C\u8BF7\u7A0D\u540E\u518D\u6765\u67E5\u770B"),
                        createVNode("button", {
                          onClick: reloadPage,
                          class: "px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                        }, [
                          createVNode("i", { class: "bi bi-arrow-clockwise mr-2" }),
                          createTextVNode(" \u91CD\u65B0\u52A0\u8F7D ")
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
                                createTextVNode("\u70ED\u95E8 ")
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "p-6" }, [
                            createVNode("h3", { class: "font-semibold text-white text-lg mb-2 line-clamp-2" }, toDisplayString(product.name), 1),
                            createVNode("p", { class: "text-gray-400 text-sm mb-4 line-clamp-2" }, toDisplayString(product.description), 1),
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("div", { class: "text-2xl font-bold text-cyan-400" }, "\xA5" + toDisplayString(product.price.toLocaleString()), 1),
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
                            }, " \u67E5\u770B\u8BE6\u60C5 ", 8, ["onClick"])
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
                          createTextVNode(" \u6D4F\u89C8\u4EA7\u54C1 ")
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("section", { class: "relative z-10 py-16" }, [
                  createVNode("div", { class: "container mx-auto px-6" }, [
                    createVNode("div", { class: "text-center mb-16" }, [
                      createVNode("h2", { class: "text-4xl font-bold text-white mb-4" }, "\u88C5\u673A\u914D\u7F6E\u63A8\u8350"),
                      createVNode("p", { class: "text-gray-300 text-lg" }, "\u6839\u636E\u4E0D\u540C\u9700\u6C42\u7CBE\u5FC3\u642D\u914D\u7684\u914D\u7F6E\u65B9\u6848")
                    ]),
                    configurations.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-16"
                    }, [
                      createVNode("div", { class: "glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto" }, [
                        createVNode("div", { class: "text-8xl mb-8 text-cyan-400 opacity-50" }, [
                          createVNode("i", { class: "bi bi-cpu" })
                        ]),
                        createVNode("h3", { class: "text-2xl font-semibold text-white mb-4" }, "\u6682\u65E0\u914D\u7F6E\u63A8\u8350"),
                        createVNode("p", { class: "text-gray-400 mb-8 text-lg" }, "\u5546\u5BB6\u8FD8\u6CA1\u6709\u4E0A\u4F20\u914D\u7F6E\u65B9\u6848\uFF0C\u8BF7\u7A0D\u540E\u518D\u6765\u67E5\u770B"),
                        createVNode("button", {
                          onClick: reloadPage,
                          class: "px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                        }, [
                          createVNode("i", { class: "bi bi-arrow-clockwise mr-2" }),
                          createTextVNode(" \u91CD\u65B0\u52A0\u8F7D ")
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
                            createVNode("div", { class: "text-3xl font-bold text-cyan-400 mb-2" }, "\xA5" + toDisplayString(config.price.toLocaleString()), 1),
                            createVNode("div", { class: "text-sm text-gray-400" }, "\u9884\u4F30\u6027\u80FD\u5206\u6570\uFF1A" + toDisplayString(config.score), 1)
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
                            }, " \u9009\u62E9\u6B64\u914D\u7F6E ", 8, ["onClick"])
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
                        createVNode("p", { class: "text-gray-300 mb-6" }, "\u4E13\u4E1A\u7684PC\u786C\u4EF6\u4EA7\u54C1\u548C\u88C5\u673A\u670D\u52A1"),
                        createVNode("div", { class: "flex justify-center space-x-6 text-gray-400" }, [
                          createVNode("a", {
                            href: "#",
                            class: "hover:text-cyan-400 transition-colors duration-200"
                          }, "\u5173\u4E8E\u6211\u4EEC"),
                          createVNode("a", {
                            href: "#",
                            class: "hover:text-cyan-400 transition-colors duration-200"
                          }, "\u8054\u7CFB\u65B9\u5F0F"),
                          createVNode("a", {
                            href: "#",
                            class: "hover:text-cyan-400 transition-colors duration-200"
                          }, "\u670D\u52A1\u6761\u6B3E"),
                          createVNode("a", {
                            href: "#",
                            class: "hover:text-cyan-400 transition-colors duration-200"
                          }, "\u9690\u79C1\u653F\u7B56")
                        ]),
                        createVNode("div", { class: "mt-6 pt-6 border-t border-gray-700/50 text-gray-500 text-sm" }, " \xA9 2024 xlCig. \u4FDD\u7559\u6240\u6709\u6743\u5229. ")
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

export { index as default };
//# sourceMappingURL=index-D4hF5GpD.mjs.map
