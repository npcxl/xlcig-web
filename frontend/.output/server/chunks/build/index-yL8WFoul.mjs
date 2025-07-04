import { _ as __nuxt_component_0 } from './AppLogo-C8xp92Ad.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dq0IxfZC.mjs';
import { ref, mergeProps, withCtx, createVNode, unref, computed, readonly, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, a as useRouter } from './server.mjs';
import { u as useHead } from './v3-B75LsvLO.mjs';
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

const _sfc_main$1 = {
  __name: "SteamCarousel",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    useRouter();
    const gpus = ref([
      {
        id: 1,
        title: "RTX 5090",
        model: "\u65D7\u8230\u7EA7\u663E\u5361",
        rating: "9.8",
        releaseYear: "2025",
        originalPrice: 22999,
        salePrice: 19999,
        image: "",
        description: "\u9769\u547D\u6027Blackwell\u67B6\u6784\uFF0C32GB GDDR7\u663E\u5B58\uFF0C\u4E13\u4E3A8K\u6E38\u620F\u548CAI\u5E94\u7528\u800C\u751F\u3002\u652F\u6301\u6700\u65B0DLSS 4\u6280\u672F\uFF0C\u63D0\u4F9B\u524D\u6240\u672A\u6709\u7684\u6E38\u620F\u6027\u80FD\u548CAI\u52A0\u901F\u80FD\u529B\u3002",
        specs: {
          memory: "32GB GDDR7",
          cores: "21504 CUDA",
          boost: "2900 MHz",
          power: "600W"
        },
        features: ["DLSS 4", "8K\u6E38\u620F", "AI\u8D85\u91C7\u6837", "\u5B9E\u65F6\u5149\u8FFD"]
      },
      {
        id: 2,
        title: "RTX 5080",
        model: "\u9AD8\u7AEF\u6E38\u620F\u663E\u5361",
        rating: "9.5",
        releaseYear: "2025",
        originalPrice: 14999,
        salePrice: 12999,
        image: "",
        description: "\u6B21\u65D7\u8230\u7EA7\u6027\u80FD\uFF0C16GB GDDR7\u663E\u5B58\uFF0C\u5B8C\u7F8E\u652F\u63014K\u9AD8\u5E27\u7387\u6E38\u620F\u3002\u914D\u5907\u5148\u8FDB\u7684Ada Lovelace\u5347\u7EA7\u67B6\u6784\uFF0C\u4E3A\u9AD8\u7AEF\u6E38\u620F\u73A9\u5BB6\u63D0\u4F9B\u6781\u81F4\u4F53\u9A8C\u3002",
        specs: {
          memory: "16GB GDDR7",
          cores: "14080 CUDA",
          boost: "2700 MHz",
          power: "400W"
        },
        features: ["DLSS 4", "4K 120FPS", "\u5149\u8FFD\u4F18\u5316", "\u521B\u4F5C\u52A0\u901F"]
      },
      {
        id: 3,
        title: "RTX 5070 Ti",
        model: "\u6027\u80FD\u7EA7\u663E\u5361",
        rating: "9.2",
        releaseYear: "2025",
        originalPrice: 8999,
        salePrice: 7999,
        image: "",
        description: "\u4E3B\u6D41\u6027\u80FD\u738B\u8005\uFF0C12GB GDDR7\u663E\u5B58\uFF0C1440p\u6E38\u620F\u6700\u4F73\u9009\u62E9\u3002\u91C7\u7528\u6700\u65B0\u67B6\u6784\u4F18\u5316\uFF0C\u63D0\u4F9B\u51FA\u8272\u7684\u6027\u4EF7\u6BD4\u548C\u6E38\u620F\u8868\u73B0\u3002",
        specs: {
          memory: "12GB GDDR7",
          cores: "8960 CUDA",
          boost: "2600 MHz",
          power: "285W"
        },
        features: ["DLSS 4", "1440p\u6781\u81F4", "\u6548\u7387\u4F18\u5316", "\u6E29\u63A7\u51FA\u8272"]
      },
      {
        id: 4,
        title: "RTX 5070",
        model: "\u4E3B\u6D41\u6E38\u620F\u663E\u5361",
        rating: "8.9",
        releaseYear: "2025",
        originalPrice: 6999,
        salePrice: 5999,
        image: "",
        description: "\u4E3B\u6D41\u6E38\u620F\u65B0\u6807\u6746\uFF0C12GB GDDR6X\u663E\u5B58\uFF0C\u63D0\u4F9B1440p\u9AD8\u8BBE\u7F6E\u6E38\u620F\u4F53\u9A8C\u3002\u51FA\u8272\u7684\u80FD\u6548\u6BD4\u548C\u5148\u8FDB\u7684AI\u529F\u80FD\uFF0C\u6EE1\u8DB3\u5927\u591A\u6570\u73A9\u5BB6\u9700\u6C42\u3002",
        specs: {
          memory: "12GB GDDR6X",
          cores: "5888 CUDA",
          boost: "2500 MHz",
          power: "220W"
        },
        features: ["DLSS 4", "1440p\u9AD8\u753B\u8D28", "\u4F4E\u529F\u8017", "\u9759\u97F3\u8FD0\u884C"]
      },
      {
        id: 5,
        title: "RTX 5060 Ti",
        model: "\u5165\u95E8\u7EA7\u663E\u5361",
        rating: "8.6",
        releaseYear: "2025",
        originalPrice: 4999,
        salePrice: 3999,
        image: "",
        description: "\u5165\u95E8\u7EA7RTX\u4F53\u9A8C\uFF0C8GB GDDR6X\u663E\u5B58\uFF0C1080p\u5149\u8FFD\u6E38\u620F\u9996\u9009\u3002\u4E3A\u9884\u7B97\u6709\u9650\u7684\u73A9\u5BB6\u63D0\u4F9BRTX\u6280\u672F\u548CAI\u529F\u80FD\u4F53\u9A8C\u3002",
        specs: {
          memory: "8GB GDDR6X",
          cores: "4352 CUDA",
          boost: "2400 MHz",
          power: "165W"
        },
        features: ["DLSS 4", "1080p\u5149\u8FFD", "\u8282\u80FD\u8BBE\u8BA1", "\u8D85\u503C\u9009\u62E9"]
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "steam-carousel-container" }, _attrs))} data-v-e826ad3e><div class="particle-system" data-v-e826ad3e><!--[-->`);
      ssrRenderList(50, (i) => {
        _push(`<div class="particle" style="${ssrRenderStyle({
          "--delay": `${Math.random() * 5}s`,
          "--duration": `${3 + Math.random() * 4}s`,
          "--x": `${Math.random() * 100}%`,
          "--y": `${Math.random() * 100}%`,
          "--size": `${2 + Math.random() * 3}px`
        })}" data-v-e826ad3e></div>`);
      });
      _push(`<!--]--></div><div class="carousel-background" data-v-e826ad3e><div class="bg-pattern" data-v-e826ad3e></div><div class="bg-glow-1" data-v-e826ad3e></div><div class="bg-glow-2" data-v-e826ad3e></div><div class="bg-glow-3" data-v-e826ad3e></div><div class="light-sweep" data-v-e826ad3e></div><div class="energy-field" data-v-e826ad3e></div></div><div class="text-center mb-16" data-v-e826ad3e><h3 class="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4" data-v-e826ad3e><i class="bi bi-gpu-card text-cyan-400 shadow-lg shadow-cyan-400/50 text-6xl pulse-icon" data-v-e826ad3e></i> RTX 50\u7CFB\u5217\u663E\u5361 </h3><p class="text-gray-300 text-xl" data-v-e826ad3e>\u4E0B\u4E00\u4EE3AI\u6E38\u620F\u7684\u9769\u547D\u6027\u4F53\u9A8C</p><div class="title-underline" data-v-e826ad3e></div></div><div class="carousel-3d-scene" data-v-e826ad3e><div class="carousel-environment" data-v-e826ad3e><div class="env-ring ring-1" data-v-e826ad3e></div><div class="env-ring ring-2" data-v-e826ad3e></div><div class="env-ring ring-3" data-v-e826ad3e></div></div><div class="carousel-3d-stage" style="${ssrRenderStyle({ transform: `rotateY(${unref(rotation)}deg)` })}" data-v-e826ad3e><!--[-->`);
      ssrRenderList(unref(gpus), (gpu, index2) => {
        _push(`<div class="${ssrRenderClass([{ "active": index2 === unref(currentIndex) }, "carousel-3d-item"])}" style="${ssrRenderStyle({
          transform: `rotateY(${index2 * (360 / unref(gpus).length)}deg) translateZ(500px)`,
          "--delay": `${index2 * 0.1}s`,
          "--rotation": `${index2 * (360 / unref(gpus).length)}deg`
        })}" tabindex="0"${ssrRenderAttr("aria-label", `\u663E\u5361: ${gpu.title}`)} data-v-e826ad3e><div class="game-cover glass-morphism-enhanced" data-v-e826ad3e><div class="hologram-effect" data-v-e826ad3e></div>`);
        if (gpu.image) {
          _push(`<div class="gpu-image-container" data-v-e826ad3e><img${ssrRenderAttr("src", gpu.image)}${ssrRenderAttr("alt", gpu.title)} loading="lazy" data-v-e826ad3e></div>`);
        } else {
          _push(`<div class="gpu-placeholder" data-v-e826ad3e><i class="bi bi-gpu-card" data-v-e826ad3e></i><span class="gpu-model-name" data-v-e826ad3e>${ssrInterpolate(gpu.title)}</span></div>`);
        }
        _push(`<div class="game-glow" data-v-e826ad3e></div><div class="glass-overlay-advanced" data-v-e826ad3e></div><div class="glass-reflection-advanced" data-v-e826ad3e></div><div class="${ssrRenderClass([{ "scanning": index2 === unref(currentIndex) }, "light-scan-advanced"])}" data-v-e826ad3e></div><div class="game-info-advanced" data-v-e826ad3e><h4 class="game-title-advanced" data-v-e826ad3e>${ssrInterpolate(gpu.title)}</h4><p class="game-genre-advanced" data-v-e826ad3e>${ssrInterpolate(gpu.model)}</p><div class="game-stats-advanced" data-v-e826ad3e><div class="game-rating-advanced" data-v-e826ad3e><i class="bi bi-star-fill" data-v-e826ad3e></i><span data-v-e826ad3e>${ssrInterpolate(gpu.rating)}</span></div><div class="game-year-advanced" data-v-e826ad3e>${ssrInterpolate(gpu.releaseYear)}</div></div></div><div class="game-price-advanced" data-v-e826ad3e>`);
        if (gpu.originalPrice > 0) {
          _push(`<span class="original-price-advanced" data-v-e826ad3e>\xA5${ssrInterpolate(gpu.originalPrice)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="sale-price-advanced" data-v-e826ad3e>${ssrInterpolate(gpu.salePrice > 0 ? `\xA5${gpu.salePrice}` : "\u514D\u8D39")}</span></div><div class="active-border-advanced" style="${ssrRenderStyle(index2 === unref(currentIndex) ? null : { display: "none" })}" data-v-e826ad3e></div><div class="glass-frame-advanced" data-v-e826ad3e><div class="glass-corner-advanced top-left" data-v-e826ad3e></div><div class="glass-corner-advanced top-right" data-v-e826ad3e></div><div class="glass-corner-advanced bottom-left" data-v-e826ad3e></div><div class="glass-corner-advanced bottom-right" data-v-e826ad3e></div></div><div class="energy-orbs" data-v-e826ad3e><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="energy-orb" style="${ssrRenderStyle({ "--index": i })}" data-v-e826ad3e></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="carousel-controls-advanced" role="navigation" aria-label="\u663E\u5361\u8F6E\u64AD\u63A7\u5236" data-v-e826ad3e><button class="control-btn-advanced prev glass-button-advanced" aria-label="\u4E0A\u4E00\u4E2A\u663E\u5361" tabindex="0" data-v-e826ad3e><i class="bi bi-chevron-left" aria-hidden="true" data-v-e826ad3e></i><div class="button-glow" data-v-e826ad3e></div></button><div class="game-indicators-advanced" role="tablist" aria-label="\u663E\u5361\u9009\u62E9\u6307\u793A\u5668" data-v-e826ad3e><!--[-->`);
      ssrRenderList(unref(gpus), (gpu, index2) => {
        _push(`<button class="${ssrRenderClass([{ "active": index2 === unref(currentIndex) }, "indicator-advanced"])}" role="tab"${ssrRenderAttr("aria-selected", index2 === unref(currentIndex))}${ssrRenderAttr("aria-label", `\u9009\u62E9\u663E\u5361: ${gpu.title}`)}${ssrRenderAttr("tabindex", index2 === unref(currentIndex) ? 0 : -1)} data-v-e826ad3e><div class="indicator-inner" data-v-e826ad3e></div><div class="indicator-ripple" data-v-e826ad3e></div><span class="indicator-tooltip-advanced" data-v-e826ad3e>${ssrInterpolate(gpu.title)}</span></button>`);
      });
      _push(`<!--]--></div><button class="control-btn-advanced next glass-button-advanced" aria-label="\u4E0B\u4E00\u4E2A\u663E\u5361" tabindex="0" data-v-e826ad3e><i class="bi bi-chevron-right" aria-hidden="true" data-v-e826ad3e></i><div class="button-glow" data-v-e826ad3e></div></button></div><div class="current-game-info-advanced" role="main" aria-label="\u5F53\u524D\u9009\u4E2D\u663E\u5361\u8BE6\u60C5" data-v-e826ad3e><div class="glass-card-premium rounded-2xl p-10 max-w-6xl mx-auto border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-e826ad3e><div class="grid md:grid-cols-5 gap-10 items-center" data-v-e826ad3e><div class="md:col-span-2" data-v-e826ad3e><div class="game-detail-cover-advanced" data-v-e826ad3e>`);
      if (unref(selectedGpu).image) {
        _push(`<div class="detail-image-container" data-v-e826ad3e><img${ssrRenderAttr("src", unref(selectedGpu).image)}${ssrRenderAttr("alt", `${unref(selectedGpu).title} \u663E\u5361\u5C01\u9762`)} class="w-full rounded-lg shadow-lg" loading="lazy" data-v-e826ad3e></div>`);
      } else {
        _push(`<div class="detail-gpu-placeholder" data-v-e826ad3e><i class="bi bi-gpu-card" data-v-e826ad3e></i><span class="detail-gpu-name" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).title)}</span><span class="detail-gpu-model" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).model)}</span></div>`);
      }
      _push(`<div class="cover-overlay-advanced" data-v-e826ad3e><button class="play-button-advanced" aria-label="\u5728Steam\u4E0A\u67E5\u770B\u663E\u5361" tabindex="0" data-v-e826ad3e><i class="bi bi-play-fill" aria-hidden="true" data-v-e826ad3e></i><div class="play-ripple" data-v-e826ad3e></div></button></div><div class="detail-glass-overlay-advanced" data-v-e826ad3e></div><div class="cover-energy-field" data-v-e826ad3e></div></div></div><div class="md:col-span-3" data-v-e826ad3e><header data-v-e826ad3e><h2 class="text-4xl font-bold text-white mb-6 neon-text-advanced" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).title)}</h2></header><p class="text-gray-300 text-lg mb-8 leading-relaxed" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).description)}</p><div class="game-badges-advanced mb-8" role="list" aria-label="\u663E\u5361\u4FE1\u606F\u6807\u7B7E" data-v-e826ad3e><span class="badge-advanced genre-badge" role="listitem" data-v-e826ad3e><i class="bi bi-tag" aria-hidden="true" data-v-e826ad3e></i><span class="sr-only" data-v-e826ad3e>\u663E\u5361\u7C7B\u578B\uFF1A</span>${ssrInterpolate(unref(selectedGpu).model)}</span><span class="badge-advanced rating-badge" role="listitem" data-v-e826ad3e><i class="bi bi-star-fill" aria-hidden="true" data-v-e826ad3e></i><span class="sr-only" data-v-e826ad3e>\u8BC4\u5206\uFF1A</span>${ssrInterpolate(unref(selectedGpu).rating)}</span><span class="badge-advanced year-badge" role="listitem" data-v-e826ad3e><i class="bi bi-calendar" aria-hidden="true" data-v-e826ad3e></i><span class="sr-only" data-v-e826ad3e>\u53D1\u5E03\u5E74\u4EFD\uFF1A</span>${ssrInterpolate(unref(selectedGpu).releaseYear)}</span></div><div class="gpu-specs-grid mb-8" data-v-e826ad3e><div class="spec-item" data-v-e826ad3e><i class="bi bi-memory text-cyan-400" data-v-e826ad3e></i><span class="spec-label" data-v-e826ad3e>\u663E\u5B58</span><span class="spec-value" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).specs.memory)}</span></div><div class="spec-item" data-v-e826ad3e><i class="bi bi-cpu text-cyan-400" data-v-e826ad3e></i><span class="spec-label" data-v-e826ad3e>CUDA\u6838\u5FC3</span><span class="spec-value" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).specs.cores)}</span></div><div class="spec-item" data-v-e826ad3e><i class="bi bi-speedometer2 text-cyan-400" data-v-e826ad3e></i><span class="spec-label" data-v-e826ad3e>\u52A0\u901F\u9891\u7387</span><span class="spec-value" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).specs.boost)}</span></div><div class="spec-item" data-v-e826ad3e><i class="bi bi-lightning text-cyan-400" data-v-e826ad3e></i><span class="spec-label" data-v-e826ad3e>\u529F\u8017</span><span class="spec-value" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).specs.power)}</span></div></div><div class="gpu-features mb-8" data-v-e826ad3e><h4 class="text-lg font-semibold text-white mb-4 flex items-center gap-2" data-v-e826ad3e><i class="bi bi-gear-fill text-cyan-400" data-v-e826ad3e></i> \u6838\u5FC3\u7279\u6027 </h4><div class="feature-tags" data-v-e826ad3e><!--[-->`);
      ssrRenderList(unref(selectedGpu).features, (feature) => {
        _push(`<span class="feature-tag" data-v-e826ad3e><i class="bi bi-check-circle-fill text-green-400" data-v-e826ad3e></i> ${ssrInterpolate(feature)}</span>`);
      });
      _push(`<!--]--></div></div><div class="flex items-center justify-between" data-v-e826ad3e><div class="price-section-advanced" role="region" aria-label="\u4EF7\u683C\u4FE1\u606F" data-v-e826ad3e>`);
      if (unref(selectedGpu).originalPrice > 0) {
        _push(`<span class="text-gray-400 text-xl line-through mr-4" aria-label="\u539F\u4EF7" data-v-e826ad3e>\xA5${ssrInterpolate(unref(selectedGpu).originalPrice.toLocaleString())}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-4xl font-bold text-cyan-400 neon-text-price" aria-label="\u5F53\u524D\u4EF7\u683C" data-v-e826ad3e>\xA5${ssrInterpolate(unref(selectedGpu).salePrice.toLocaleString())}</span>`);
      if (unref(selectedGpu).originalPrice > 0 && unref(selectedGpu).salePrice > 0) {
        _push(`<span class="text-green-400 text-lg ml-4 discount-badge" aria-label="\u6298\u6263" data-v-e826ad3e> -${ssrInterpolate(Math.round((1 - unref(selectedGpu).salePrice / unref(selectedGpu).originalPrice) * 100))}% </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="btn-premium-advanced px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 relative overflow-hidden" aria-label="\u67E5\u770B\u663E\u5361\u8BE6\u60C5" tabindex="0" data-v-e826ad3e><i class="bi bi-eye mr-3" aria-hidden="true" data-v-e826ad3e></i> \u67E5\u770B\u8BE6\u60C5 <div class="btn-energy-field" data-v-e826ad3e></div></button></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SteamCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e826ad3e"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref([]);
    const categories = ref([]);
    const brands = ref([]);
    const loading = ref(true);
    const meta = ref({ total: 0, page: 1, limit: 12, totalPages: 1 });
    const selectedCategory = ref("all");
    const selectedBrand = ref("all");
    const priceRange = ref("");
    const sortBy = ref("");
    const searchTerm = ref("");
    const getCategoryName = (categoryId) => {
      const category = categories.value.find((cat) => cat.id === categoryId);
      return (category == null ? void 0 : category.name) || "All Products";
    };
    const getMainSpecs = (product) => {
      const specs = product.specs || {};
      return Object.entries(specs).slice(0, 2).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    };
    const translateSpecKey = (key) => {
      const translations = {
        memory: "\u663E\u5B58",
        power: "\u529F\u8017",
        cores: "\u6838\u5FC3",
        threads: "\u7EBF\u7A0B",
        socket: "\u63D2\u69FD",
        chipset: "\u82AF\u7247\u7EC4",
        wattage: "\u529F\u7387",
        efficiency: "\u6548\u7387",
        size: "\u5C3A\u5BF8",
        resolution: "\u5206\u8FA8\u7387"
      };
      return translations[key] || key;
    };
    const translateFeature = (feature) => {
      const translations = {
        "\u5149\u7EBF\u8FFD\u8E2A": "Ray Tracing",
        "DLSS 3.0": "DLSS 3.0",
        "RDNA 3": "RDNA 3",
        "FSR 3.0": "FSR 3.0",
        "\u8D85\u7EBF\u7A0B": "Hyper-Threading",
        "DDR5\u652F\u6301": "DDR5 Support",
        "PCIe 5.0": "PCIe 5.0",
        "WiFi 6E": "WiFi 6E",
        "80+ \u91D1\u724C": "80+ Gold",
        "\u5168\u6A21\u7EC4": "Fully Modular",
        "4K UHD": "4K UHD",
        "144Hz": "144Hz",
        "HDR10": "HDR10"
      };
      return translations[feature] || feature;
    };
    const getProductIcon = (category) => {
      const icons = {
        graphics: "bi bi-gpu-card text-cyan-400",
        cpu: "bi bi-cpu text-orange-400",
        motherboard: "bi bi-motherboard text-green-400",
        power: "bi bi-lightning text-yellow-400",
        monitor: "bi bi-display text-purple-400"
      };
      return icons[category] || "bi bi-pc-display text-gray-400";
    };
    const getCategoryDisplayName = (category) => {
      const names = {
        graphics: "\u663E\u5361",
        cpu: "\u5904\u7406\u5668",
        motherboard: "\u4E3B\u677F",
        power: "\u7535\u6E90",
        monitor: "\u663E\u793A\u5668"
      };
      return names[category] || "\u786C\u4EF6";
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });
    };
    useHead({
      title: "\u4EA7\u54C1\u4E2D\u5FC3 - xlCig",
      meta: [
        { name: "description", content: "\u6D4F\u89C8\u6211\u4EEC\u7CBE\u9009\u7684PC\u786C\u4EF6\u4EA7\u54C1\uFF0C\u5305\u62EC\u663E\u5361\u3001CPU\u3001\u4E3B\u677F\u7B49" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_SteamCarousel = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen relative" }, _attrs))} data-v-43890541><div class="bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" data-v-43890541><div class="fixed inset-0 pointer-events-none" data-v-43890541><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-43890541></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-43890541></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-43890541></div></div><section class="relative z-10" data-v-43890541><div class="container mx-auto px-6 py-8" data-v-43890541><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-43890541><div class="flex items-center justify-between" data-v-43890541><div class="flex items-center space-x-6" data-v-43890541>`);
      _push(ssrRenderComponent(_component_AppLogo, {
        size: "medium",
        "show-decorations": false
      }, null, _parent));
      _push(`<div class="h-6 w-px bg-gray-600" data-v-43890541></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-house-door mr-2 text-lg" data-v-43890541${_scopeId}></i><span class="text-sm font-medium" data-v-43890541${_scopeId}>\u9996\u9875</span>`);
          } else {
            return [
              createVNode("i", { class: "bi bi-house-door mr-2 text-lg" }),
              createVNode("span", { class: "text-sm font-medium" }, "\u9996\u9875")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="text-sm text-gray-400" data-v-43890541><span data-v-43890541>\u9996\u9875</span><i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-43890541></i><span class="text-white font-medium" data-v-43890541>\u4EA7\u54C1\u4E2D\u5FC3</span></nav></div><div class="mt-6" data-v-43890541><h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3" data-v-43890541><i class="bi bi-grid-3x3-gap text-cyan-400 text-3xl" data-v-43890541></i> \u4EA7\u54C1\u4E2D\u5FC3 </h1><p class="text-gray-300 text-lg" data-v-43890541>\u4E13\u4E1A\u7684PC\u786C\u4EF6\u4EA7\u54C1\uFF0C\u4E3A\u60A8\u7684\u9879\u76EE\u63D0\u4F9B\u53EF\u9760\u7684\u89E3\u51B3\u65B9\u6848</p></div></div></div></section><section class="relative z-10" data-v-43890541><div class="container mx-auto px-6 py-6" data-v-43890541><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-43890541>`);
      _push(ssrRenderComponent(_component_SteamCarousel, null, null, _parent));
      _push(`</div></div></section><div class="h-40 bg-gradient-to-b from-transparent via-gray-800/20 via-gray-700/40 via-gray-600/60 to-gray-100 relative z-10" data-v-43890541></div></div><div class="bg-gray-100 min-h-screen relative" data-v-43890541><div class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200" data-v-43890541><div class="container mx-auto px-6 py-4" data-v-43890541><div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200" data-v-43890541><div class="mb-6" data-v-43890541><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2" data-v-43890541><i class="bi bi-funnel text-blue-600" data-v-43890541></i> \u4EA7\u54C1\u5206\u7C7B </h3><div class="flex flex-wrap gap-3" data-v-43890541><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<button class="${ssrRenderClass([
          "flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300",
          unref(selectedCategory) === cat.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
        ])}" data-v-43890541><i class="${ssrRenderClass([cat.icon, "mr-2 text-lg"])}" data-v-43890541></i><span data-v-43890541>${ssrInterpolate(cat.name)}</span><span class="ml-2 text-sm opacity-75" data-v-43890541>(${ssrInterpolate(cat.count)})</span></button>`);
      });
      _push(`<!--]--></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-43890541><div data-v-43890541><label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2" data-v-43890541><i class="bi bi-bookmark text-blue-600" data-v-43890541></i> \u54C1\u724C </label><select class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-sm" data-v-43890541><option value="all" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrand)) ? ssrLooseContain(unref(selectedBrand), "all") : ssrLooseEqual(unref(selectedBrand), "all")) ? " selected" : ""}>\u5168\u90E8\u54C1\u724C</option><!--[-->`);
      ssrRenderList(unref(brands), (brand) => {
        _push(`<option${ssrRenderAttr("value", brand.id)} data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrand)) ? ssrLooseContain(unref(selectedBrand), brand.id) : ssrLooseEqual(unref(selectedBrand), brand.id)) ? " selected" : ""}>${ssrInterpolate(brand.name)} (${ssrInterpolate(brand.count)}) </option>`);
      });
      _push(`<!--]--></select></div><div data-v-43890541><label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2" data-v-43890541><i class="bi bi-currency-dollar text-blue-600" data-v-43890541></i> \u4EF7\u683C\u533A\u95F4 </label><select class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-sm" data-v-43890541><option value="" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "") : ssrLooseEqual(unref(priceRange), "")) ? " selected" : ""}>\u4EFB\u610F\u4EF7\u683C</option><option value="0-3600" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "0-3600") : ssrLooseEqual(unref(priceRange), "0-3600")) ? " selected" : ""}>3600\u5143\u4EE5\u4E0B</option><option value="3600-7200" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "3600-7200") : ssrLooseEqual(unref(priceRange), "3600-7200")) ? " selected" : ""}>3600-7200\u5143</option><option value="7200-10800" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "7200-10800") : ssrLooseEqual(unref(priceRange), "7200-10800")) ? " selected" : ""}>7200-10800\u5143</option><option value="10800-14400" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "10800-14400") : ssrLooseEqual(unref(priceRange), "10800-14400")) ? " selected" : ""}>10800-14400\u5143</option><option value="14400-99999" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "14400-99999") : ssrLooseEqual(unref(priceRange), "14400-99999")) ? " selected" : ""}>14400\u5143\u4EE5\u4E0A</option></select></div><div data-v-43890541><label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2" data-v-43890541><i class="bi bi-sort-down text-blue-600" data-v-43890541></i> \u6392\u5E8F </label><select class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-sm" data-v-43890541><option value="" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "") : ssrLooseEqual(unref(sortBy), "")) ? " selected" : ""}>\u63A8\u8350</option><option value="price_asc" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "price_asc") : ssrLooseEqual(unref(sortBy), "price_asc")) ? " selected" : ""}>\u4EF7\u683C\uFF1A\u4ECE\u4F4E\u5230\u9AD8</option><option value="price_desc" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "price_desc") : ssrLooseEqual(unref(sortBy), "price_desc")) ? " selected" : ""}>\u4EF7\u683C\uFF1A\u4ECE\u9AD8\u5230\u4F4E</option><option value="rating" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "rating") : ssrLooseEqual(unref(sortBy), "rating")) ? " selected" : ""}>\u8BC4\u5206\u6700\u9AD8</option><option value="newest" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "newest") : ssrLooseEqual(unref(sortBy), "newest")) ? " selected" : ""}>\u6700\u65B0\u53D1\u5E03</option><option value="popular" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "popular") : ssrLooseEqual(unref(sortBy), "popular")) ? " selected" : ""}>\u6700\u53D7\u6B22\u8FCE</option></select></div><div data-v-43890541><label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2" data-v-43890541><i class="bi bi-search text-blue-600" data-v-43890541></i> \u641C\u7D22\u4EA7\u54C1 </label><input${ssrRenderAttr("value", unref(searchTerm))} placeholder="\u8F93\u5165\u4EA7\u54C1\u540D\u79F0..." class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-sm placeholder-gray-500" data-v-43890541></div></div><div class="mt-4 flex justify-end" data-v-43890541><button class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 flex items-center gap-2" data-v-43890541><i class="bi bi-arrow-clockwise" data-v-43890541></i> \u91CD\u7F6E\u7B5B\u9009 </button></div></div></div></div><main class="container mx-auto px-6 py-8" data-v-43890541><div class="bg-white rounded-xl shadow-lg border border-gray-200 mb-6" data-v-43890541><div class="px-6 py-4 flex items-center justify-between border-b border-gray-200" data-v-43890541><div class="flex items-center" data-v-43890541><h2 class="text-xl font-semibold text-gray-800" data-v-43890541>${ssrInterpolate(getCategoryName(unref(selectedCategory)))}</h2><span class="ml-3 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full" data-v-43890541>(${ssrInterpolate(unref(meta).total)} \u4E2A\u4EA7\u54C1)</span></div><div class="text-sm text-gray-500" data-v-43890541> \u627E\u5230 ${ssrInterpolate(unref(meta).total)} \u4E2A\u7B26\u5408\u6761\u4EF6\u7684\u4EA7\u54C1 </div></div></div>`);
      if (!unref(loading)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-v-43890541><!--[-->`);
        ssrRenderList(unref(products), (product) => {
          _push(`<div class="bg-white rounded-xl shadow-lg border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group overflow-hidden" data-v-43890541><div class="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100" data-v-43890541>`);
          if (product.image) {
            _push(`<div class="product-list-image-container" data-v-43890541><img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" data-v-43890541></div>`);
          } else {
            _push(`<div class="product-list-placeholder-light" data-v-43890541><i class="${ssrRenderClass(getProductIcon(product.category))}" data-v-43890541></i><span class="product-category-name-light" data-v-43890541>${ssrInterpolate(getCategoryDisplayName(product.category))}</span></div>`);
          }
          if (product.originalPrice && product.originalPrice > product.price) {
            _push(`<div class="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold" data-v-43890541> -${ssrInterpolate(Math.round((1 - product.price / product.originalPrice) * 100))}% </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="absolute top-3 right-3" data-v-43890541>`);
          if (!product.inStock) {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600 border border-red-200" data-v-43890541><i class="bi bi-x-circle mr-1" data-v-43890541></i>\u7F3A\u8D27 </span>`);
          } else if (product.stockCount <= 5) {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600 border border-orange-200" data-v-43890541><i class="bi bi-exclamation-triangle mr-1" data-v-43890541></i>\u5269\u4F59${ssrInterpolate(product.stockCount)}</span>`);
          } else {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 border border-green-200" data-v-43890541><i class="bi bi-check-circle mr-1" data-v-43890541></i>\u73B0\u8D27 </span>`);
          }
          _push(`</div></div><div class="p-6" data-v-43890541><div class="mb-4" data-v-43890541><div class="flex items-center justify-between mb-3" data-v-43890541><span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-600 border border-blue-200" data-v-43890541>${ssrInterpolate(product.brand)}</span></div><h3 class="font-semibold text-gray-800 text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200" data-v-43890541>${ssrInterpolate(product.name)}</h3><p class="text-gray-600 text-sm leading-relaxed line-clamp-2" data-v-43890541>${ssrInterpolate(product.description)}</p></div><div class="flex items-center gap-2 mb-4" data-v-43890541><div class="flex" data-v-43890541><!--[-->`);
          ssrRenderList(5, (i) => {
            _push(`<i class="${ssrRenderClass([i <= product.rating ? "text-yellow-400" : "text-gray-300", "bi bi-star-fill text-sm"])}" data-v-43890541></i>`);
          });
          _push(`<!--]--></div><span class="text-sm font-medium text-gray-800" data-v-43890541>${ssrInterpolate(product.rating)}</span><span class="text-xs text-gray-500" data-v-43890541>(${ssrInterpolate(product.reviewCount)})</span></div><div class="space-y-2 mb-4" data-v-43890541><!--[-->`);
          ssrRenderList(getMainSpecs(product), (value, key) => {
            _push(`<div class="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-sm border border-gray-100" data-v-43890541><span class="text-gray-600 font-medium" data-v-43890541>${ssrInterpolate(translateSpecKey(key))}</span><span class="font-semibold text-gray-800" data-v-43890541>${ssrInterpolate(value)}</span></div>`);
          });
          _push(`<!--]--></div><div class="flex flex-wrap gap-2 mb-4" data-v-43890541><!--[-->`);
          ssrRenderList(product.features.slice(0, 3), (feature) => {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100" data-v-43890541>${ssrInterpolate(translateFeature(feature))}</span>`);
          });
          _push(`<!--]--></div><div class="border-t border-gray-200 pt-4" data-v-43890541><div class="flex items-center justify-between mb-4" data-v-43890541><div data-v-43890541><div class="text-2xl font-bold text-blue-600" data-v-43890541> $${ssrInterpolate(product.price.toLocaleString())}</div>`);
          if (product.originalPrice && product.originalPrice > product.price) {
            _push(`<div class="text-sm text-gray-500 line-through" data-v-43890541> MSRP $${ssrInterpolate(product.originalPrice.toLocaleString())}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-right text-xs text-gray-500" data-v-43890541><div data-v-43890541>\u53D1\u5E03\u65E5\u671F</div><div data-v-43890541>${ssrInterpolate(formatDate(product.releaseDate))}</div></div></div><div class="grid grid-cols-2 gap-3" data-v-43890541><button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40" data-v-43890541> \u67E5\u770B\u8BE6\u60C5 </button><button class="px-4 py-2 border border-gray-300 hover:border-blue-400 text-gray-600 hover:text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-1" data-v-43890541><i class="bi bi-heart" data-v-43890541></i> \u6536\u85CF </button></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="text-center py-16" data-v-43890541><div class="inline-flex flex-col items-center bg-white rounded-xl border border-gray-200 p-12 shadow-lg" data-v-43890541><div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6" data-v-43890541></div><p class="text-xl font-medium text-gray-800" data-v-43890541>\u6B63\u5728\u52A0\u8F7D\u4EA7\u54C1...</p><p class="text-gray-600 mt-2" data-v-43890541>\u8BF7\u7A0D\u5019</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && unref(products).length === 0) {
        _push(`<div class="text-center py-16" data-v-43890541><div class="bg-white rounded-xl border border-gray-200 p-16 shadow-lg max-w-md mx-auto" data-v-43890541><div class="text-8xl mb-8 text-blue-400 opacity-50" data-v-43890541><i class="bi bi-inbox" data-v-43890541></i></div><h3 class="text-2xl font-semibold text-gray-800 mb-4" data-v-43890541>\u672A\u627E\u5230\u4EA7\u54C1</h3><p class="text-gray-600 mb-8 text-lg" data-v-43890541>\u8BF7\u5C1D\u8BD5\u8C03\u6574\u7B5B\u9009\u6761\u4EF6\u6216\u641C\u7D22\u5173\u952E\u8BCD</p><button class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40" data-v-43890541><i class="bi bi-arrow-clockwise mr-2" data-v-43890541></i> \u91CD\u7F6E\u7B5B\u9009 </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-43890541"]]);

export { index as default };
//# sourceMappingURL=index-yL8WFoul.mjs.map
