# 工具集合站

一个基于 React + TailwindCSS 开发的现代化在线工具集合网站。

## 🚀 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式框架**: TailwindCSS
- **路由**: React Router
- **开发规范**: ESLint + Prettier

## 📦 功能特色

### 工具分类
- 📝 **文本工具**: JSON格式化、Base64编解码、URL编解码等
- 🖼️ **图片工具**: 图片压缩、格式转换、二维码生成等
- ⚙️ **开发工具**: 颜色选择器、正则测试、Hash生成等
- 🔢 **计算工具**: 单位转换、百分比计算等

### 设计特点
- 🎨 现代化UI设计
- 📱 完全响应式布局
- ⚡ 快速加载和响应
- 🔒 本地处理，保护隐私
- 🌐 无需注册，开箱即用

## 🛠️ 开发指南

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

### 代码检查
```bash
npm run lint
```

### 代码格式化
```bash
npm run format
```

## 📁 项目结构

```
src/
├── components/          # 组件
│   ├── common/         # 通用组件
│   ├── layout/         # 布局组件
│   └── ui/             # UI基础组件
├── pages/              # 页面组件
│   ├── Home/           # 首页
│   └── Tools/          # 工具页面
├── services/           # 服务层
├── types/              # 类型定义
├── utils/              # 工具函数
├── hooks/              # 自定义Hook
└── styles/             # 样式文件
```

## 🚢 部署

### GitHub Pages
项目已配置 GitHub Actions 自动部署到 GitHub Pages。

推送到 `main` 分支即可自动部署：
```bash
git add .
git commit -m "feat: 新增功能"
git push origin main
```

### Vercel
也可以部署到 Vercel：
1. 连接 GitHub 仓库
2. 自动检测配置
3. 部署完成

## 📝 开发规范

### Git 提交规范
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具链相关

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Prettier 统一代码格式
- 组件使用函数式组件 + Hooks
- 样式使用 TailwindCSS 类名

## 🔧 工具开发

### 添加新工具
1. 在 `src/services/mockService.ts` 中添加工具数据
2. 在 `src/pages/Tools/` 中创建工具页面
3. 配置路由和导航

### 工具数据结构
```typescript
interface Tool {
  id: string
  name: string
  description: string
  category: string
  icon: string
  path: string
  isComingSoon?: boolean
  tags?: string[]
  featured?: boolean
}
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

⭐ 如果这个项目对您有帮助，请给个 Star 支持一下！ 