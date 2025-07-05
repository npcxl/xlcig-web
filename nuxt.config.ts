// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devServer: {
    port: 8888,
    host: '0.0.0.0'
  },
  devtools: { 
    enabled: process.env.NODE_ENV === 'development' 
  },
  ssr: true,
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  
  // 页面过渡配置
  app: {
    pageTransition: { 
      name: 'page', 
      mode: 'out-in',
      duration: 400
    },
    layoutTransition: { 
      name: 'layout', 
      mode: 'out-in',
      duration: 400
    },
    head: {
      title: 'xlCig - 专业PC硬件产品和装机服务',

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '专业的PC硬件产品和装机建议，助您打造梦想中的高性能电脑' },
        { name: 'keywords', content: 'xlCig,PC硬件,电脑配置,显卡,CPU,装机' },
        { name: 'author', content: 'xlCig' },
        { property: 'og:title', content: 'xlCig - 专业PC硬件产品和装机服务' },
        { property: 'og:description', content: '专业的PC硬件产品和装机建议，助您打造梦想中的高性能电脑' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#00f5ff' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/logo.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/logo.png' }
      ]
    }
  },
  
  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'production' 
        ? 'https://api.xlcig.cn'  // 生产环境使用API子域名
        : 'http://192.168.11.193:9999'  // 开发环境保持不变
    }
  },
  
  build: {
    transpile: ['naive-ui', 'vueuc', '@css-render/vue3-ssr']
  },
  
  vite: {
    optimizeDeps: {
      include: ['naive-ui']
    }
  },
  
  // 优化SSR性能
  nitro: {
    compressPublicAssets: true
  }
}) 