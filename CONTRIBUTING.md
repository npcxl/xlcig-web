# 贡献指南

欢迎为 xlCig 项目贡献代码！🎉

## 🚀 开始贡献

### 准备工作

1. **Fork 项目**
   ```bash
   # 点击页面右上角的 Fork 按钮
   ```

2. **克隆到本地**
   ```bash
   git clone https://gitee.com/你的用户名/xlweb.git
   cd xlweb
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **启动开发环境**
   ```bash
   npm run dev
   ```

### 开发流程

1. **创建分支**
   ```bash
   git checkout -b feature/你的功能名称
   # 或
   git checkout -b fix/修复的问题
   ```

2. **编写代码**
   - 遵循现有的代码风格
   - 添加必要的注释
   - 确保功能完整

3. **测试验证**
   ```bash
   npm run build  # 确保构建成功
   npm run preview  # 预览生产版本
   ```

4. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   # 或
   git commit -m "fix: 修复具体问题"
   ```

5. **推送分支**
   ```bash
   git push origin feature/你的功能名称
   ```

6. **创建 Pull Request**
   - 在 Gitee 上创建 PR
   - 详细描述你的改动
   - 等待代码审查

## 📝 代码规范

### 提交信息格式

```
<类型>: <简短描述>

<详细描述>
```

**类型标识：**
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat: 添加商品搜索功能

- 实现商品名称搜索
- 支持分类筛选
- 添加价格区间筛选
```

### 代码风格

- **缩进**: 使用 2 个空格
- **字符串**: 优先使用单引号
- **分号**: 语句末尾添加分号
- **命名**: 使用驼峰命名法
- **注释**: 为复杂逻辑添加注释

## 🏗️ 项目结构

```
xlweb/
├── components/          # Vue 组件
├── composables/         # 组合式函数
├── layouts/            # 布局组件
├── middleware/         # 中间件
├── pages/              # 页面组件
├── public/             # 静态资源
├── stores/             # 状态管理
├── types/              # TypeScript 类型定义
├── utils/              # 工具函数
└── assets/             # 资源文件
```

## 🤝 贡献类型

### 欢迎的贡献
- 🐛 修复 bug
- ✨ 添加新功能
- 📚 改进文档
- 🎨 优化 UI/UX
- ⚡ 性能优化
- 🔧 配置优化
- 🧪 添加测试

### 功能建议
如果你有新的功能想法，请先创建 Issue 讨论：

1. 描述功能需求
2. 说明使用场景
3. 提供设计思路
4. 等待社区反馈

## 🔍 问题报告

发现 bug？请创建 Issue 并包含以下信息：

- **环境信息**: 操作系统、浏览器版本、Node.js 版本
- **重现步骤**: 详细的操作步骤
- **预期行为**: 期望的正确行为
- **实际行为**: 当前的错误行为
- **截图**: 如果可能，提供截图
- **错误日志**: 控制台错误信息

## 📞 联系方式

- **Gitee Issues**: [提交问题](https://gitee.com/leheya/xlweb/issues)
- **在线客服**: [https://xlcig.cn/customer-service](https://xlcig.cn/customer-service)

## 📄 许可证

本项目采用 MIT 许可证，详见 [LICENSE](./LICENSE) 文件。

---

感谢你的贡献！让我们一起让 xlCig 变得更好！ 🚀 