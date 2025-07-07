import { _ as __nuxt_component_0 } from "./PageLoader-D_8ePMtq.js";
import { _ as __nuxt_component_0$1 } from "./AppHeader-DNVnt9sJ.js";
import { ref, computed, readonly, mergeProps, unref, useSSRContext, watch, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, nextTick } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, u as useRouter } from "../server.mjs";
import "D:/codeGitee/xlweb/node_modules/hookable/dist/index.mjs";
import { _ as __nuxt_component_0$2 } from "./nuxt-link-CA9RiB7n.js";
import { _ as __nuxt_component_0$3 } from "./AppLogo-B139whIQ.js";
import { p as productsApi } from "./products-Djdy7C0u.js";
import { useRouter as useRouter$1, useRoute } from "vue-router";
import "./useLocation-kga13ouX.js";
import "seemly";
import "vooks";
import "vdirs";
import "css-render";
import "@css-render/plugin-bem";
import "lodash-es";
import "evtd";
import "treemate";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlweb/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/codeGitee/xlweb/node_modules/defu/dist/defu.mjs";
import "D:/codeGitee/xlweb/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/ufo/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/klona/dist/index.mjs";
const _sfc_main$1 = {
  __name: "SteamCarousel",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    useRouter();
    const gpus = ref([
      {
        id: 1,
        title: "RTX 5090",
        model: "旗舰级显卡",
        rating: "9.8",
        releaseYear: "2025",
        originalPrice: 22999,
        salePrice: 19999,
        image: "",
        description: "革命性Blackwell架构，32GB GDDR7显存，专为8K游戏和AI应用而生。支持最新DLSS 4技术，提供前所未有的游戏性能和AI加速能力。",
        specs: {
          memory: "32GB GDDR7",
          cores: "21504 CUDA",
          boost: "2900 MHz",
          power: "600W"
        },
        features: ["DLSS 4", "8K游戏", "AI超采样", "实时光追"]
      },
      {
        id: 2,
        title: "RTX 5080",
        model: "高端游戏显卡",
        rating: "9.5",
        releaseYear: "2025",
        originalPrice: 14999,
        salePrice: 12999,
        image: "",
        description: "次旗舰级性能，16GB GDDR7显存，完美支持4K高帧率游戏。配备先进的Ada Lovelace升级架构，为高端游戏玩家提供极致体验。",
        specs: {
          memory: "16GB GDDR7",
          cores: "14080 CUDA",
          boost: "2700 MHz",
          power: "400W"
        },
        features: ["DLSS 4", "4K 120FPS", "光追优化", "创作加速"]
      },
      {
        id: 3,
        title: "RTX 5070 Ti",
        model: "性能级显卡",
        rating: "9.2",
        releaseYear: "2025",
        originalPrice: 8999,
        salePrice: 7999,
        image: "",
        description: "主流性能王者，12GB GDDR7显存，1440p游戏最佳选择。采用最新架构优化，提供出色的性价比和游戏表现。",
        specs: {
          memory: "12GB GDDR7",
          cores: "8960 CUDA",
          boost: "2600 MHz",
          power: "285W"
        },
        features: ["DLSS 4", "1440p极致", "效率优化", "温控出色"]
      },
      {
        id: 4,
        title: "RTX 5070",
        model: "主流游戏显卡",
        rating: "8.9",
        releaseYear: "2025",
        originalPrice: 6999,
        salePrice: 5999,
        image: "",
        description: "主流游戏新标杆，12GB GDDR6X显存，提供1440p高设置游戏体验。出色的能效比和先进的AI功能，满足大多数玩家需求。",
        specs: {
          memory: "12GB GDDR6X",
          cores: "5888 CUDA",
          boost: "2500 MHz",
          power: "220W"
        },
        features: ["DLSS 4", "1440p高画质", "低功耗", "静音运行"]
      },
      {
        id: 5,
        title: "RTX 5060 Ti",
        model: "入门级显卡",
        rating: "8.6",
        releaseYear: "2025",
        originalPrice: 4999,
        salePrice: 3999,
        image: "",
        description: "入门级RTX体验，8GB GDDR6X显存，1080p光追游戏首选。为预算有限的玩家提供RTX技术和AI功能体验。",
        specs: {
          memory: "8GB GDDR6X",
          cores: "4352 CUDA",
          boost: "2400 MHz",
          power: "165W"
        },
        features: ["DLSS 4", "1080p光追", "节能设计", "超值选择"]
      }
    ]);
    const currentIndex = ref(0);
    const rotation = ref(0);
    const autoRotate = ref(true);
    const isHovered = ref(false);
    ref(/* @__PURE__ */ new Set());
    const selectedGpu = computed(() => gpus.value[currentIndex.value]);
    const selectGpu = (index2) => {
      if (index2 === currentIndex.value) return;
      currentIndex.value = index2;
      rotation.value = -index2 * (360 / gpus.value.length);
      if ((void 0).vibrate) {
        (void 0).vibrate(50);
      }
      autoRotate.value = false;
      setTimeout(() => {
        if (!isHovered.value) {
          autoRotate.value = true;
        }
      }, 3e3);
    };
    const nextGpu = () => {
      const nextIndex = (currentIndex.value + 1) % gpus.value.length;
      selectGpu(nextIndex);
    };
    const prevGpu = () => {
      const prevIndex = currentIndex.value === 0 ? gpus.value.length - 1 : currentIndex.value - 1;
      selectGpu(prevIndex);
    };
    ref(0);
    ref(0);
    ref(null);
    ref(false);
    __expose({
      nextGpu,
      prevGpu,
      selectGpu,
      currentIndex: readonly(currentIndex),
      selectedGpu: readonly(selectedGpu)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "steam-carousel-container" }, _attrs))} data-v-29472115><div class="particle-system" data-v-29472115><!--[-->`);
      ssrRenderList(50, (i) => {
        _push(`<div class="particle" style="${ssrRenderStyle({
          "--delay": `${Math.random() * 5}s`,
          "--duration": `${3 + Math.random() * 4}s`,
          "--x": `${Math.random() * 100}%`,
          "--y": `${Math.random() * 100}%`,
          "--size": `${2 + Math.random() * 3}px`
        })}" data-v-29472115></div>`);
      });
      _push(`<!--]--></div><div class="carousel-background" data-v-29472115><div class="bg-pattern" data-v-29472115></div><div class="bg-glow-1" data-v-29472115></div><div class="bg-glow-2" data-v-29472115></div><div class="bg-glow-3" data-v-29472115></div><div class="light-sweep" data-v-29472115></div><div class="energy-field" data-v-29472115></div></div><div class="text-center mb-16" data-v-29472115><h3 class="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4" data-v-29472115><i class="bi bi-gpu-card text-cyan-400 shadow-lg shadow-cyan-400/50 text-6xl pulse-icon" data-v-29472115></i> RTX 50系列显卡 </h3><p class="text-gray-300 text-xl" data-v-29472115>下一代AI游戏的革命性体验</p><div class="title-underline" data-v-29472115></div></div><div class="carousel-3d-scene" data-v-29472115><div class="carousel-environment" data-v-29472115><div class="env-ring ring-1" data-v-29472115></div><div class="env-ring ring-2" data-v-29472115></div><div class="env-ring ring-3" data-v-29472115></div></div><div class="carousel-3d-stage" style="${ssrRenderStyle({ transform: `rotateY(${unref(rotation)}deg)` })}" data-v-29472115><!--[-->`);
      ssrRenderList(unref(gpus), (gpu, index2) => {
        _push(`<div class="${ssrRenderClass([{ "active": index2 === unref(currentIndex) }, "carousel-3d-item"])}" style="${ssrRenderStyle({
          transform: `rotateY(${index2 * (360 / unref(gpus).length)}deg) translateZ(500px)`,
          "--delay": `${index2 * 0.1}s`,
          "--rotation": `${index2 * (360 / unref(gpus).length)}deg`
        })}" tabindex="0"${ssrRenderAttr("aria-label", `显卡: ${gpu.title}`)} data-v-29472115><div class="game-cover glass-morphism-enhanced" data-v-29472115><div class="hologram-effect" data-v-29472115></div>`);
        if (gpu.image) {
          _push(`<div class="gpu-image-container" data-v-29472115><img${ssrRenderAttr("src", gpu.image)}${ssrRenderAttr("alt", gpu.title)} loading="lazy" data-v-29472115></div>`);
        } else {
          _push(`<div class="gpu-placeholder" data-v-29472115><i class="bi bi-gpu-card" data-v-29472115></i><span class="gpu-model-name" data-v-29472115>${ssrInterpolate(gpu.title)}</span></div>`);
        }
        _push(`<div class="game-glow" data-v-29472115></div><div class="glass-overlay-advanced" data-v-29472115></div><div class="glass-reflection-advanced" data-v-29472115></div><div class="${ssrRenderClass([{ "scanning": index2 === unref(currentIndex) }, "light-scan-advanced"])}" data-v-29472115></div><div class="game-info-advanced" data-v-29472115><h4 class="game-title-advanced" data-v-29472115>${ssrInterpolate(gpu.title)}</h4><p class="game-genre-advanced" data-v-29472115>${ssrInterpolate(gpu.model)}</p><div class="game-stats-advanced" data-v-29472115><div class="game-rating-advanced" data-v-29472115><i class="bi bi-star-fill" data-v-29472115></i><span data-v-29472115>${ssrInterpolate(gpu.rating)}</span></div><div class="game-year-advanced" data-v-29472115>${ssrInterpolate(gpu.releaseYear)}</div></div></div><div class="game-price-advanced" data-v-29472115>`);
        if (gpu.originalPrice > 0) {
          _push(`<span class="original-price-advanced" data-v-29472115>¥${ssrInterpolate(gpu.originalPrice)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="sale-price-advanced" data-v-29472115>${ssrInterpolate(gpu.salePrice > 0 ? `¥${gpu.salePrice}` : "免费")}</span></div><div class="active-border-advanced" style="${ssrRenderStyle(index2 === unref(currentIndex) ? null : { display: "none" })}" data-v-29472115></div><div class="glass-frame-advanced" data-v-29472115><div class="glass-corner-advanced top-left" data-v-29472115></div><div class="glass-corner-advanced top-right" data-v-29472115></div><div class="glass-corner-advanced bottom-left" data-v-29472115></div><div class="glass-corner-advanced bottom-right" data-v-29472115></div></div><div class="energy-orbs" data-v-29472115><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="energy-orb" style="${ssrRenderStyle({ "--index": i })}" data-v-29472115></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="carousel-controls-advanced" role="navigation" aria-label="显卡轮播控制" data-v-29472115><button class="control-btn-advanced prev glass-button-advanced" aria-label="上一个显卡" tabindex="0" data-v-29472115><i class="bi bi-chevron-left" aria-hidden="true" data-v-29472115></i><div class="button-glow" data-v-29472115></div></button><div class="game-indicators-advanced" role="tablist" aria-label="显卡选择指示器" data-v-29472115><!--[-->`);
      ssrRenderList(unref(gpus), (gpu, index2) => {
        _push(`<button class="${ssrRenderClass([{ "active": index2 === unref(currentIndex) }, "indicator-advanced"])}" role="tab"${ssrRenderAttr("aria-selected", index2 === unref(currentIndex))}${ssrRenderAttr("aria-label", `选择显卡: ${gpu.title}`)}${ssrRenderAttr("tabindex", index2 === unref(currentIndex) ? 0 : -1)} data-v-29472115><div class="indicator-inner" data-v-29472115></div><div class="indicator-ripple" data-v-29472115></div><span class="indicator-tooltip-advanced" data-v-29472115>${ssrInterpolate(gpu.title)}</span></button>`);
      });
      _push(`<!--]--></div><button class="control-btn-advanced next glass-button-advanced" aria-label="下一个显卡" tabindex="0" data-v-29472115><i class="bi bi-chevron-right" aria-hidden="true" data-v-29472115></i><div class="button-glow" data-v-29472115></div></button></div><div class="current-game-info-advanced" role="main" aria-label="当前选中显卡详情" data-v-29472115><div class="glass-card-premium rounded-2xl p-10 max-w-6xl mx-auto border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-29472115><div class="grid md:grid-cols-5 gap-10 items-center" data-v-29472115><div class="md:col-span-2" data-v-29472115><div class="game-detail-cover-advanced" data-v-29472115>`);
      if (unref(selectedGpu).image) {
        _push(`<div class="detail-image-container" data-v-29472115><img${ssrRenderAttr("src", unref(selectedGpu).image)}${ssrRenderAttr("alt", `${unref(selectedGpu).title} 显卡封面`)} class="w-full rounded-lg shadow-lg" loading="lazy" data-v-29472115></div>`);
      } else {
        _push(`<div class="detail-gpu-placeholder" data-v-29472115><i class="bi bi-gpu-card" data-v-29472115></i><span class="detail-gpu-name" data-v-29472115>${ssrInterpolate(unref(selectedGpu).title)}</span><span class="detail-gpu-model" data-v-29472115>${ssrInterpolate(unref(selectedGpu).model)}</span></div>`);
      }
      _push(`<div class="cover-overlay-advanced" data-v-29472115><button class="play-button-advanced" aria-label="在Steam上查看显卡" tabindex="0" data-v-29472115><i class="bi bi-play-fill" aria-hidden="true" data-v-29472115></i><div class="play-ripple" data-v-29472115></div></button></div><div class="detail-glass-overlay-advanced" data-v-29472115></div><div class="cover-energy-field" data-v-29472115></div></div></div><div class="md:col-span-3" data-v-29472115><header data-v-29472115><h2 class="text-4xl font-bold text-white mb-6 neon-text-advanced" data-v-29472115>${ssrInterpolate(unref(selectedGpu).title)}</h2></header><p class="text-gray-300 text-lg mb-8 leading-relaxed" data-v-29472115>${ssrInterpolate(unref(selectedGpu).description)}</p><div class="game-badges-advanced mb-8" role="list" aria-label="显卡信息标签" data-v-29472115><span class="badge-advanced genre-badge" role="listitem" data-v-29472115><i class="bi bi-tag" aria-hidden="true" data-v-29472115></i><span class="sr-only" data-v-29472115>显卡类型：</span>${ssrInterpolate(unref(selectedGpu).model)}</span><span class="badge-advanced rating-badge" role="listitem" data-v-29472115><i class="bi bi-star-fill" aria-hidden="true" data-v-29472115></i><span class="sr-only" data-v-29472115>评分：</span>${ssrInterpolate(unref(selectedGpu).rating)}</span><span class="badge-advanced year-badge" role="listitem" data-v-29472115><i class="bi bi-calendar" aria-hidden="true" data-v-29472115></i><span class="sr-only" data-v-29472115>发布年份：</span>${ssrInterpolate(unref(selectedGpu).releaseYear)}</span></div><div class="gpu-specs-grid mb-8" data-v-29472115><div class="spec-item" data-v-29472115><i class="bi bi-memory text-cyan-400" data-v-29472115></i><span class="spec-label" data-v-29472115>显存</span><span class="spec-value" data-v-29472115>${ssrInterpolate(unref(selectedGpu).specs.memory)}</span></div><div class="spec-item" data-v-29472115><i class="bi bi-cpu text-cyan-400" data-v-29472115></i><span class="spec-label" data-v-29472115>CUDA核心</span><span class="spec-value" data-v-29472115>${ssrInterpolate(unref(selectedGpu).specs.cores)}</span></div><div class="spec-item" data-v-29472115><i class="bi bi-speedometer2 text-cyan-400" data-v-29472115></i><span class="spec-label" data-v-29472115>加速频率</span><span class="spec-value" data-v-29472115>${ssrInterpolate(unref(selectedGpu).specs.boost)}</span></div><div class="spec-item" data-v-29472115><i class="bi bi-lightning text-cyan-400" data-v-29472115></i><span class="spec-label" data-v-29472115>功耗</span><span class="spec-value" data-v-29472115>${ssrInterpolate(unref(selectedGpu).specs.power)}</span></div></div><div class="gpu-features mb-8" data-v-29472115><h4 class="text-lg font-semibold text-white mb-4 flex items-center gap-2" data-v-29472115><i class="bi bi-gear-fill text-cyan-400" data-v-29472115></i> 核心特性 </h4><div class="feature-tags" data-v-29472115><!--[-->`);
      ssrRenderList(unref(selectedGpu).features, (feature) => {
        _push(`<span class="feature-tag" data-v-29472115><i class="bi bi-check-circle-fill text-green-400" data-v-29472115></i> ${ssrInterpolate(feature)}</span>`);
      });
      _push(`<!--]--></div></div><div class="flex items-center justify-between" data-v-29472115><div class="price-section-advanced" role="region" aria-label="价格信息" data-v-29472115>`);
      if (unref(selectedGpu).originalPrice > 0) {
        _push(`<span class="text-gray-400 text-xl line-through mr-4" aria-label="原价" data-v-29472115>¥${ssrInterpolate(unref(selectedGpu).originalPrice.toLocaleString())}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-4xl font-bold text-cyan-400 neon-text-price" aria-label="当前价格" data-v-29472115>¥${ssrInterpolate(unref(selectedGpu).salePrice.toLocaleString())}</span>`);
      if (unref(selectedGpu).originalPrice > 0 && unref(selectedGpu).salePrice > 0) {
        _push(`<span class="text-green-400 text-lg ml-4 discount-badge" aria-label="折扣" data-v-29472115> -${ssrInterpolate(Math.round((1 - unref(selectedGpu).salePrice / unref(selectedGpu).originalPrice) * 100))}% </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="btn-premium-advanced px-8 py-3 rounded-2xl font-bold text-lg flex items-center gap-3 relative overflow-hidden" aria-label="查看显卡详情" tabindex="0" data-v-29472115><i class="bi bi-eye mr-3" aria-hidden="true" data-v-29472115></i> 查看详情 <div class="btn-energy-field" data-v-29472115></div></button></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SteamCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-29472115"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter$1();
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
      const _component_SteamCarousel = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_AppLogo = __nuxt_component_0$3;
      _push(ssrRenderComponent(_component_PageLoader, mergeProps({
        "is-page-loading": unref(isPageLoading),
        "is-data-loading": unref(isDataLoading),
        "has-error": unref(hasError),
        "error-message": unref(errorMessage),
        "loading-title": "正在加载热门产品...",
        "loading-message": "请稍候",
        onRetry: reloadPage
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" data-v-e38ebb7b${_scopeId}><div class="fixed inset-0 pointer-events-none" data-v-e38ebb7b${_scopeId}><div class="meteors-container" data-v-e38ebb7b${_scopeId}><div class="meteor meteor-1" data-v-e38ebb7b${_scopeId}></div><div class="meteor meteor-2" data-v-e38ebb7b${_scopeId}></div><div class="meteor meteor-3" data-v-e38ebb7b${_scopeId}></div><div class="meteor meteor-4" data-v-e38ebb7b${_scopeId}></div><div class="meteor meteor-5" data-v-e38ebb7b${_scopeId}></div><div class="meteor meteor-6" data-v-e38ebb7b${_scopeId}></div><div class="meteor meteor-7" data-v-e38ebb7b${_scopeId}></div><div class="meteor meteor-8" data-v-e38ebb7b${_scopeId}></div></div><div class="stars-container" data-v-e38ebb7b${_scopeId}><div class="stars stars-1" data-v-e38ebb7b${_scopeId}></div><div class="stars stars-2" data-v-e38ebb7b${_scopeId}></div><div class="stars stars-3" data-v-e38ebb7b${_scopeId}></div></div><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-e38ebb7b${_scopeId}></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-e38ebb7b${_scopeId}></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-e38ebb7b${_scopeId}></div></div>`);
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
            _push2(`<section class="relative z-10 py-8" data-v-e38ebb7b${_scopeId}><div class="container mx-auto px-6" data-v-e38ebb7b${_scopeId}><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl" data-v-e38ebb7b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_SteamCarousel, null, null, _parent2, _scopeId));
            _push2(`</div></div></section><section class="relative z-10 py-16" data-v-e38ebb7b${_scopeId}><div class="container mx-auto px-6" data-v-e38ebb7b${_scopeId}><div class="text-center mb-16" data-v-e38ebb7b${_scopeId}><h2 class="text-4xl font-bold text-white mb-4" data-v-e38ebb7b${_scopeId}>热门产品</h2><p class="text-gray-300 text-lg" data-v-e38ebb7b${_scopeId}>最受欢迎的PC硬件产品</p></div>`);
            if (unref(featuredProducts).length === 0) {
              _push2(`<div class="text-center py-16" data-v-e38ebb7b${_scopeId}><div class="glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto" data-v-e38ebb7b${_scopeId}><div class="text-8xl mb-8 text-cyan-400 opacity-50" data-v-e38ebb7b${_scopeId}><i class="bi bi-inbox" data-v-e38ebb7b${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-e38ebb7b${_scopeId}>暂无热门产品</h3><p class="text-gray-400 mb-8 text-lg" data-v-e38ebb7b${_scopeId}>商家还没有上传产品，请稍后再来查看</p><button class="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-e38ebb7b${_scopeId}><i class="bi bi-arrow-clockwise mr-2" data-v-e38ebb7b${_scopeId}></i> 重新加载 </button></div></div>`);
            } else {
              _push2(`<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-v-e38ebb7b${_scopeId}><!--[-->`);
              ssrRenderList(unref(featuredProducts), (product) => {
                _push2(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2 group" data-v-e38ebb7b${_scopeId}><div class="relative h-48 bg-gradient-to-br from-gray-800/50 to-gray-900/50" data-v-e38ebb7b${_scopeId}>`);
                if (product.image) {
                  _push2(`<div class="home-product-image-container" data-v-e38ebb7b${_scopeId}><img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" data-v-e38ebb7b${_scopeId}></div>`);
                } else {
                  _push2(`<div class="home-product-placeholder" data-v-e38ebb7b${_scopeId}><i class="${ssrRenderClass(getHomeProductIcon(product.name))}" data-v-e38ebb7b${_scopeId}></i><span class="home-product-type" data-v-e38ebb7b${_scopeId}>${ssrInterpolate(getProductTypeName(product.name))}</span></div>`);
                }
                _push2(`<div class="absolute top-3 right-3" data-v-e38ebb7b${_scopeId}><span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30" data-v-e38ebb7b${_scopeId}><i class="bi bi-fire mr-1" data-v-e38ebb7b${_scopeId}></i>热门 </span></div></div><div class="p-6" data-v-e38ebb7b${_scopeId}><h3 class="font-semibold text-white text-lg mb-2 line-clamp-2" data-v-e38ebb7b${_scopeId}>${ssrInterpolate(product.name)}</h3><p class="text-gray-400 text-sm mb-4 line-clamp-2" data-v-e38ebb7b${_scopeId}>${ssrInterpolate(product.description)}</p><div class="flex items-center justify-between" data-v-e38ebb7b${_scopeId}><div class="text-2xl font-bold text-cyan-400" data-v-e38ebb7b${_scopeId}>¥${ssrInterpolate(product.price.toLocaleString())}</div><div class="flex" data-v-e38ebb7b${_scopeId}><!--[-->`);
                ssrRenderList(5, (i) => {
                  _push2(`<i class="${ssrRenderClass([i <= product.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-sm"])}" data-v-e38ebb7b${_scopeId}></i>`);
                });
                _push2(`<!--]--></div></div><button class="w-full mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-all duration-300" data-v-e38ebb7b${_scopeId}> 查看详情 </button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            if (unref(featuredProducts).length > 0) {
              _push2(`<div class="text-center mt-12" data-v-e38ebb7b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/products",
                class: "inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1 group"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="bi bi-collection mr-2 group-hover:animate-bounce" data-v-e38ebb7b${_scopeId2}></i> 浏览产品 `);
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
            _push2(`</div></section><section class="relative z-10 py-16" data-v-e38ebb7b${_scopeId}><div class="container mx-auto px-6" data-v-e38ebb7b${_scopeId}><div class="text-center mb-16" data-v-e38ebb7b${_scopeId}><h2 class="text-4xl font-bold text-white mb-4" data-v-e38ebb7b${_scopeId}>装机配置推荐</h2><p class="text-gray-300 text-lg" data-v-e38ebb7b${_scopeId}>根据不同需求精心搭配的配置方案</p></div>`);
            if (unref(configurations).length === 0) {
              _push2(`<div class="text-center py-16" data-v-e38ebb7b${_scopeId}><div class="glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto" data-v-e38ebb7b${_scopeId}><div class="text-8xl mb-8 text-cyan-400 opacity-50" data-v-e38ebb7b${_scopeId}><i class="bi bi-cpu" data-v-e38ebb7b${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-e38ebb7b${_scopeId}>暂无配置推荐</h3><p class="text-gray-400 mb-8 text-lg" data-v-e38ebb7b${_scopeId}>商家还没有上传配置方案，请稍后再来查看</p><button class="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-e38ebb7b${_scopeId}><i class="bi bi-arrow-clockwise mr-2" data-v-e38ebb7b${_scopeId}></i> 重新加载 </button></div></div>`);
            } else {
              _push2(`<div class="grid md:grid-cols-3 gap-8" data-v-e38ebb7b${_scopeId}><!--[-->`);
              ssrRenderList(unref(configurations), (config) => {
                _push2(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" data-v-e38ebb7b${_scopeId}><div class="p-6 border-b border-gray-700/50" data-v-e38ebb7b${_scopeId}><div class="flex items-center justify-between mb-4" data-v-e38ebb7b${_scopeId}><h3 class="text-2xl font-semibold text-white" data-v-e38ebb7b${_scopeId}>${ssrInterpolate(config.name)}</h3><span class="${ssrRenderClass(config.badgeClass)}" data-v-e38ebb7b${_scopeId}>${ssrInterpolate(config.badge)}</span></div><p class="text-gray-300 mb-4" data-v-e38ebb7b${_scopeId}>${ssrInterpolate(config.description)}</p><div class="text-3xl font-bold text-cyan-400 mb-2" data-v-e38ebb7b${_scopeId}>¥${ssrInterpolate(config.price.toLocaleString())}</div><div class="text-sm text-gray-400" data-v-e38ebb7b${_scopeId}>预估性能分数：${ssrInterpolate(config.score)}</div></div><div class="p-6" data-v-e38ebb7b${_scopeId}><div class="space-y-3 mb-6" data-v-e38ebb7b${_scopeId}><!--[-->`);
                ssrRenderList(config.components, (component) => {
                  _push2(`<div class="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg" data-v-e38ebb7b${_scopeId}><span class="text-gray-300 text-sm" data-v-e38ebb7b${_scopeId}>${ssrInterpolate(component.type)}</span><span class="text-white text-sm font-medium" data-v-e38ebb7b${_scopeId}>${ssrInterpolate(component.name)}</span></div>`);
                });
                _push2(`<!--]--></div><button class="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300" data-v-e38ebb7b${_scopeId}> 选择此配置 </button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></section><section class="relative z-10 py-16" data-v-e38ebb7b${_scopeId}><div class="container mx-auto px-6" data-v-e38ebb7b${_scopeId}><div class="text-center mb-16" data-v-e38ebb7b${_scopeId}><h2 class="text-4xl font-bold text-white mb-4" data-v-e38ebb7b${_scopeId}>我们的服务</h2><p class="text-gray-300 text-lg" data-v-e38ebb7b${_scopeId}>专业的硬件选择和装机服务</p></div><div class="grid md:grid-cols-3 gap-8" data-v-e38ebb7b${_scopeId}><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" data-v-e38ebb7b${_scopeId}><div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center" data-v-e38ebb7b${_scopeId}><i class="bi bi-star-fill text-white text-2xl" data-v-e38ebb7b${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-e38ebb7b${_scopeId}>精选产品</h3><p class="text-gray-300 leading-relaxed" data-v-e38ebb7b${_scopeId}>精心挑选的高品质PC硬件，确保性能与价格的完美平衡</p></div><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" data-v-e38ebb7b${_scopeId}><div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center" data-v-e38ebb7b${_scopeId}><i class="bi bi-currency-dollar text-white text-2xl" data-v-e38ebb7b${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-e38ebb7b${_scopeId}>优惠价格</h3><p class="text-gray-300 leading-relaxed" data-v-e38ebb7b${_scopeId}>直接与厂商合作，为您提供最具竞争力的价格和促销活动</p></div><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2" data-v-e38ebb7b${_scopeId}><div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center" data-v-e38ebb7b${_scopeId}><i class="bi bi-joystick text-white text-2xl" data-v-e38ebb7b${_scopeId}></i></div><h3 class="text-2xl font-semibold text-white mb-4" data-v-e38ebb7b${_scopeId}>游戏体验</h3><p class="text-gray-300 leading-relaxed" data-v-e38ebb7b${_scopeId}>针对游戏需求优化的配置方案，让您享受极致的游戏体验</p></div></div></div></section><footer class="relative z-10 mt-20" data-v-e38ebb7b${_scopeId}><div class="container mx-auto px-6 py-12" data-v-e38ebb7b${_scopeId}><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-e38ebb7b${_scopeId}><div class="text-center" data-v-e38ebb7b${_scopeId}><div class="flex justify-center mb-4" data-v-e38ebb7b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppLogo, {
              size: "medium",
              "show-decorations": false
            }, null, _parent2, _scopeId));
            _push2(`</div><p class="text-gray-300 mb-6" data-v-e38ebb7b${_scopeId}>专业的PC硬件产品和装机服务</p><div class="flex justify-center space-x-6 text-gray-400" data-v-e38ebb7b${_scopeId}><a href="#" class="hover:text-cyan-400 transition-colors duration-200" data-v-e38ebb7b${_scopeId}>关于我们</a><a href="#" class="hover:text-cyan-400 transition-colors duration-200" data-v-e38ebb7b${_scopeId}>联系方式</a><a href="#" class="hover:text-cyan-400 transition-colors duration-200" data-v-e38ebb7b${_scopeId}>服务条款</a><a href="#" class="hover:text-cyan-400 transition-colors duration-200" data-v-e38ebb7b${_scopeId}>隐私政策</a></div><div class="mt-6 pt-6 border-t border-gray-700/50 text-gray-500 text-sm" data-v-e38ebb7b${_scopeId}> © 2024 xlCig. 保留所有权利. </div></div></div></div></footer></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, [
                createVNode("div", { class: "fixed inset-0 pointer-events-none" }, [
                  createVNode("div", { class: "meteors-container" }, [
                    createVNode("div", { class: "meteor meteor-1" }),
                    createVNode("div", { class: "meteor meteor-2" }),
                    createVNode("div", { class: "meteor meteor-3" }),
                    createVNode("div", { class: "meteor meteor-4" }),
                    createVNode("div", { class: "meteor meteor-5" }),
                    createVNode("div", { class: "meteor meteor-6" }),
                    createVNode("div", { class: "meteor meteor-7" }),
                    createVNode("div", { class: "meteor meteor-8" })
                  ]),
                  createVNode("div", { class: "stars-container" }, [
                    createVNode("div", { class: "stars stars-1" }),
                    createVNode("div", { class: "stars stars-2" }),
                    createVNode("div", { class: "stars stars-3" })
                  ]),
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
                createVNode("section", { class: "relative z-10 py-8" }, [
                  createVNode("div", { class: "container mx-auto px-6" }, [
                    createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl" }, [
                      createVNode(_component_SteamCarousel)
                    ])
                  ])
                ]),
                createVNode("section", { class: "relative z-10 py-16" }, [
                  createVNode("div", { class: "container mx-auto px-6" }, [
                    createVNode("div", { class: "text-center mb-16" }, [
                      createVNode("h2", { class: "text-4xl font-bold text-white mb-4" }, "热门产品"),
                      createVNode("p", { class: "text-gray-300 text-lg" }, "最受欢迎的PC硬件产品")
                    ]),
                    unref(featuredProducts).length === 0 ? (openBlock(), createBlock("div", {
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
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(featuredProducts), (product) => {
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
                    unref(featuredProducts).length > 0 ? (openBlock(), createBlock("div", {
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
                    unref(configurations).length === 0 ? (openBlock(), createBlock("div", {
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
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(configurations), (config) => {
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e38ebb7b"]]);
export {
  index as default
};
//# sourceMappingURL=index-CK1NITyQ.js.map
