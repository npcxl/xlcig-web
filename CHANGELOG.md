# 更新日志

所有关于此项目的重要更改都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/spec/v2.0.0.html)。

## [未发布]

### 待完成
- [ ] 替换 Babylon.js 为 Three.js 重新实现 3D 加载动画（解决 SSR 渲染冲突问题）
- [ ] 优化 SSR 兼容性
---


## [0.2.0] - 2025-07-05 04:10 此版本未发布至服务器

### 🎉 新增功能
- **3D加载屏幕**: 开始开发3D加载动画效果
  - 创建 `LoadingScreen3D.vue` 组件
  - 添加 Babylon.js 3D 渲染支持

### 🔧 改进
- **用户状态管理**: 解决登录状态闪烁问题
  - 在 `app.vue` 中添加用户状态初始化逻辑
  - 避免 SSR 环境下的状态不一致
  - 改善用户体验，消除页面加载时的状态跳跃

### 📦 依赖管理
- 添加 Babylon.js 相关依赖
  - `@babylonjs/core`: 核心3D渲染引擎
  - `@babylonjs/loaders`: 模型加载器
  - `@babylonjs/materials`: 材质库

### 🐛 已知问题
- **Babylon.js SSR 兼容性**: 在 Nuxt.js SSR 环境中存在兼容性问题
  - `camera.attachControls is not a function`
  - `Cannot read properties of undefined (setting 'isScatteringEnabled')`
  - Shadow generator 相关错误
- **解决方案**: 计划改用 Three.js 替代 Babylon.js

---

## [0.1.0] 初始化

### 🎉 项目初始化
- **项目结构重构**: 从 monorepo 转换为纯前端项目
  - 移除所有后端相关文件 (Docker, nginx, 部署脚本等)
  - 将 `frontend/` 目录内容移动到根目录
  - 清理不必要的配置文件

### 🔧 环境配置
- **依赖管理**: 修复缺失的依赖问题
  - 解决 `Cannot find module 'concurrently'` 错误
  - 运行 `npm install` 安装所有必需依赖

### 📁 文件结构
```
xlweb/
├── components/           # Vue 组件
│   ├── LoadingScreen.vue
│   ├── LoadingScreen3D.vue
│   └── ...
├── pages/               # 页面路由
├── stores/              # 状态管理
├── utils/               # 工具函数
├── composables/         # 组合式函数
└── assets/              # 静态资源
```

### 🚀 核心功能
- **Nuxt.js 3**: 基于 Vue 3 的现代化框架
- **Tailwind CSS**: 实用优先的CSS框架
- **TypeScript**: 类型安全的JavaScript
- **用户认证**: 完整的登录/注册系统
- **API 集成**: 完整的后端API调用封装

---

## 更新说明

### 版本号规则
- **主版本号**: 不兼容的API修改
- **次版本号**: 向下兼容的功能性新增
- **修订号**: 向下兼容的问题修正

### 变更类型
- **🎉 新增功能**: 新增的功能
- **🔧 改进**: 对现有功能的改进
- **🐛 修复**: 错误修复
- **📦 依赖管理**: 依赖包的变更
- **🔒 安全**: 安全性相关修复
- **📚 文档**: 文档更新
- **🎨 样式**: 代码格式、UI/UX改进
- **⚡ 性能**: 性能优化
- **🔨 重构**: 代码重构
- **🗑️ 移除**: 移除的功能或文件

