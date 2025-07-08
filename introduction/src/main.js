import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// 导入页面组件
import Home from './views/Home.vue'
import ProjectStructure from './views/ProjectStructure.vue'
import Dependencies from './views/Dependencies.vue'
import TechStack from './views/TechStack.vue'
import Troubleshooting from './views/Troubleshooting.vue'
import Installation from './views/Installation.vue'
import Features from './views/Features.vue'

// 路由配置
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/structure', name: 'ProjectStructure', component: ProjectStructure },
  { path: '/dependencies', name: 'Dependencies', component: Dependencies },
  { path: '/tech-stack', name: 'TechStack', component: TechStack },
  { path: '/troubleshooting', name: 'Troubleshooting', component: Troubleshooting },
  { path: '/installation', name: 'Installation', component: Installation },
  { path: '/features', name: 'Features', component: Features },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app') 