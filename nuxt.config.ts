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
        // 百度站点验证
        { name: 'baidu-site-verification', content: 'codeva-2z90c1PlRw' },
        // SEO meta tags
        { property: 'og:title', content: 'xlCig - 专业PC硬件产品和装机服务' },
        { property: 'og:description', content: '专业的PC硬件产品和装机建议，助您打造梦想中的高性能电脑' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.xlcig.cn' },
        { property: 'og:site_name', content: 'xlCig' },
        { name: 'theme-color', content: '#00f5ff' },
        // robots meta
        { name: 'robots', content: 'index, follow' }
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
      // API 基础地址
      apiBase: process.env.NUXT_PUBLIC_API_BASE || (
        process.env.NODE_ENV === 'production' 
          ? 'https://api.xlcig.cn'  // 生产环境
          : 'http://192.168.11.194:9999'  // 开发环境
      ),
      
      // WebSocket 地址
      wsUrl: process.env.NUXT_PUBLIC_WS_URL || (
        process.env.NODE_ENV === 'production'
          ? 'wss://api.xlcig.cn/websocket'  // 生产环境使用wss
          : 'ws://192.168.11.194:9999/websocket'  // 开发环境使用ws
      ),
      
      // 应用信息
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'xlCig',
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION || '1.0.0',
      
      // 调试模式
      debug: process.env.NUXT_PUBLIC_DEBUG === 'true' || process.env.NODE_ENV === 'development',
      
      // 环境标识
      environment: process.env.NODE_ENV || 'development'
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
  
  // 优化SSR性能和开发代理
  nitro: {
    compressPublicAssets: true,
    // 开发环境代理配置
    devProxy: {
      '/api': {
        target: 'http://192.168.11.194:9999/api',
        changeOrigin: true,
        prependPath: true,
      },
      '/websocket': {
        target: 'ws://192.168.11.194:9999',
        ws: true,
        changeOrigin: true,
      }
    }
  }
}) 