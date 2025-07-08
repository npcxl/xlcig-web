# xlCig项目介绍网站

基于Vue 3 + Vite构建的xlCig项目详细介绍和技术文档网站。

## 🚀 快速开始

### 环境要求

- Node.js 18.0+
- npm 9.0+ 或 pnpm 8.0+

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

服务器将在 [http://localhost:3000](http://localhost:3000) 启动

### 构建生产版本

```bash
npm run build
# 或
pnpm build
```

### 预览生产构建

```bash
npm run preview
# 或
pnpm preview
```

## 📁 项目结构

```
introduction/
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── components/         # 通用组件
│   ├── views/              # 页面组件
│   │   ├── Home.vue           # 项目概述
│   │   ├── Installation.vue   # 安装指南
│   │   ├── TechStack.vue      # 技术栈
│   │   ├── ProjectStructure.vue # 项目结构
│   │   ├── Dependencies.vue   # 依赖管理
│   │   ├── Features.vue       # 功能特性
│   │   └── Troubleshooting.vue # 故障排除
│   ├── App.vue             # 主应用组件
│   ├── main.js             # 应用入口
│   └── style.css           # 全局样式
├── index.html              # HTML模板
├── package.json            # 依赖配置
├── vite.config.js          # Vite配置
├── tailwind.config.js      # TailwindCSS配置
└── postcss.config.js       # PostCSS配置
```

## 🎨 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - Vue.js官方路由管理器
- **TailwindCSS** - 原子化CSS框架
- **PostCSS** - CSS后处理器

## 📖 页面介绍

### 🏠 项目概述 (/)
- 项目基本信息和特性介绍
- 核心技术栈展示
- 快速开始指南

### 📥 安装指南 (/installation)
- 环境要求详解
- 分步安装指导
- 常见安装问题解决

### 🔧 技术栈 (/tech-stack)
- 详细技术栈介绍
- 技术选择理由
- 性能特点分析

### 📁 项目结构 (/structure)
- 完整目录结构展示
- 各目录功能说明
- 开发规范指导

### 📦 依赖管理 (/dependencies)
- 核心依赖详解
- 依赖分析和优化
- 安全性检查

### ⭐ 功能特性 (/features)
- 核心功能模块介绍
- 电商平台特性
- 高级技术特性

### 🔧 故障排除 (/troubleshooting)
- 常见问题分类
- 详细解决方案
- 调试技巧分享

## 🎯 设计特色

### 玻璃拟态设计
- 采用现代玻璃拟态(Glassmorphism)设计风格
- 半透明背景与毛玻璃效果
- 优雅的视觉层次和深度感

### 渐变背景动画
- 动态多色渐变背景
- 平滑的颜色过渡动画
- 与主项目保持一致的青色主题

### 响应式布局
- 移动优先设计理念
- 完美适配各种屏幕尺寸
- 触摸友好的交互体验

### 动画效果
- 页面切换动画
- 元素进入动画
- 悬停交互效果

## 🛠️ 开发指南

### 添加新页面

1. 在 `src/views/` 目录下创建新的Vue组件
2. 在 `src/main.js` 中添加路由配置
3. 在 `App.vue` 的导航栏中添加链接

### 修改样式主题

主题配置位于：
- `tailwind.config.js` - TailwindCSS主题配置
- `src/style.css` - 全局样式和动画

### 自定义组件

通用组件放在 `src/components/` 目录下，支持：
- 自动导入
- TypeScript类型推断
- 热重载更新

## 🔗 相关链接

- [xlCig主项目](https://gitee.com/leheya/xlweb)
- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 文档](https://cn.vitejs.dev/)
- [TailwindCSS 文档](https://tailwindcss.com/)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issues和Pull Requests来改进这个项目介绍网站。

---

**注意**: 这是xlCig项目的技术文档网站，用于展示主项目的架构、特性和使用指南。 