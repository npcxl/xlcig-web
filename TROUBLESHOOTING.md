# 运行错误说明文档

## 🚨 常见问题及解决方案

### 1. Node.js 版本兼容问题

#### 问题描述
项目在不同环境中运行时出现版本兼容性问题，特别是：
- **生产服务器**: Node.js 16.x
- **开发环境**: Node.js 18.x 或 22.x
- **团队成员**: 各种不同版本

#### 常见错误信息
```bash
# 错误1：语法不兼容
SyntaxError: Unexpected token '?'
SyntaxError: Unexpected token '??'

# 错误2：API不兼容
TypeError: fetch is not a function (Node.js < 18)
ReferenceError: AbortController is not defined

# 错误3：依赖包版本冲突
npm ERR! peer dep missing: node@>=18.0.0
npm ERR! engine node@16.x is incompatible with this module

# 错误4：构建失败
Error: Cannot find module 'node:fs'
Error: Cannot find module 'node:path'
```

#### 解决方案

##### 方案1：版本统一（推荐）
```bash
# 使用 .nvmrc 文件统一版本
echo "18.17.0" > .nvmrc

# 团队成员使用相同版本
nvm use
nvm install 18.17.0
nvm use 18.17.0
```

##### 方案2：兼容性处理
```bash
# 在 package.json 中指定引擎版本
{
  "engines": {
    "node": ">=16.0.0 <23.0.0",
    "npm": ">=8.0.0"
  }
}
```

##### 方案3：polyfill 处理
```bash
# 安装兼容性包
npm install --save-dev @babel/polyfill
npm install --save-dev core-js

# 或者使用条件导入
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}
```

### 2. 依赖包管理问题

#### 为什么需要删除 node_modules 和 package-lock.json

##### 问题根源
1. **幽灵依赖**: 包管理器缓存了错误的依赖关系
2. **版本冲突**: 不同版本的包之间存在不兼容
3. **安装损坏**: 网络问题导致包下载不完整
4. **缓存污染**: npm缓存中存储了损坏的包信息

##### 具体场景

**场景1：版本升级后的依赖冲突**
```bash
# 升级某个包后出现错误
npm install package@latest
# 错误：Cannot resolve dependency tree
```

**场景2：开发环境与生产环境差异**
```bash
# 本地正常，服务器部署失败
npm run build
# 错误：Module not found
```

**场景3：团队成员环境不一致**
```bash
# A同事能运行，B同事报错
npm start
# 错误：peer dependency missing
```

#### 标准清理流程

##### 完整清理（推荐）
```bash
# 1. 删除依赖文件
rm -rf node_modules
rm package-lock.json

# 2. 清理npm缓存
npm cache clean --force

# 3. 清理yarn缓存（如果使用yarn）
yarn cache clean

# 4. 重新安装
npm install

# 5. 验证安装
npm ls
```

##### 快速清理（Windows）
```powershell
# PowerShell 脚本
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm cache clean --force
npm install
```

##### 快速清理（Unix/Linux/Mac）
```bash
# Bash 脚本
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### 3. 特定错误解决方案

#### 错误1：Module not found
```bash
# 问题：找不到模块
Error: Cannot find module 'some-package'

# 解决方案
npm install some-package
# 或者
npm install --save some-package
```

#### 错误2：Peer dependency warning
```bash
# 问题：对等依赖警告
npm WARN peer dep missing: vue@>=3.0.0

# 解决方案
npm install vue@^3.0.0
# 或者忽略（如果确认不需要）
npm install --legacy-peer-deps
```

#### 错误3：Build 失败
```bash
# 问题：构建失败
Error: Cannot resolve dependency

# 解决方案
npm run build -- --legacy-peer-deps
# 或者
npm config set legacy-peer-deps true
```

### 4. 预防措施

#### 环境标准化
```bash
# 1. 创建 .nvmrc 文件
echo "18.17.0" > .nvmrc

# 2. 在 package.json 中设置引擎
{
  "engines": {
    "node": "18.17.0",
    "npm": "^8.0.0"
  }
}

# 3. 使用 volta 管理版本（推荐）
volta install node@18.17.0
volta pin node@18.17.0
```

#### 依赖管理最佳实践
```bash
# 1. 锁定版本
npm install --save-exact package-name

# 2. 定期更新依赖
npm audit
npm audit fix

# 3. 使用 .npmrc 配置
echo "save-exact=true" > .npmrc
echo "engine-strict=true" >> .npmrc
```

### 5. 调试工具

#### 环境检查脚本
```bash
# check-env.js
console.log('Node.js版本:', process.version);
console.log('npm版本:', process.env.npm_version);
console.log('操作系统:', process.platform);
console.log('CPU架构:', process.arch);

# 运行检查
node check-env.js
```

#### 依赖分析工具
```bash
# 安装分析工具
npm install -g npm-check-updates
npm install -g depcheck

# 检查过期依赖
ncu

# 检查无用依赖
depcheck
```

### 6. 紧急恢复方案

#### 回滚到上一个工作状态
```bash
# 1. 恢复 package.json
git checkout HEAD~1 package.json

# 2. 清理并重新安装
rm -rf node_modules package-lock.json
npm install

# 3. 测试运行
npm run dev
```

#### 使用备份配置
```bash
# 保存当前配置
cp package.json package.json.backup
cp package-lock.json package-lock.json.backup

# 恢复备份
cp package.json.backup package.json
cp package-lock.json.backup package-lock.json
npm install
```

### 7. 监控和预警

#### 设置依赖监控
```bash
# 安装监控工具
npm install -g npm-audit-resolver

# 定期检查安全漏洞
npm audit --audit-level moderate
```

#### CI/CD 中的版本检查
```yaml
# .github/workflows/check-deps.yml
name: Check Dependencies
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18.17.0'
      - run: npm ci
      - run: npm audit
      - run: npm run test
```

---

## 🆘 紧急联系

如果遇到无法解决的问题，请：

1. **记录错误信息**: 完整的错误日志
2. **记录环境信息**: Node.js版本、操作系统、npm版本
3. **尝试标准清理**: 删除node_modules和package-lock.json
4. **检查网络**: 确保npm registry可访问
5. **查阅文档**: 检查相关包的更新日志

---

## 📚 参考资料

- [Node.js 版本管理最佳实践](https://nodejs.org/en/docs/guides/)
- [npm 依赖管理指南](https://docs.npmjs.com/cli/v8/configuring-npm)
- [Nuxt.js 环境配置](https://nuxt.com/docs/getting-started/installation)
- [包管理器选择指南](https://pnpm.io/motivation) 