# 管理系统

基于 React + TypeScript + Vite + Ant Design Pro 构建的现代化企业级管理后台模板。

## 技术栈

- **前端框架**: React 19
- **类型系统**: TypeScript
- **构建工具**: Vite
- **UI 组件库**: Ant Design + Ant Design Pro
- **路由管理**: React Router DOM
- **样式方案**: CSS-in-JS (emotion)
- **包管理器**: pnpm

## 项目特性

✨ **现代化技术栈**: 使用最新的前端技术栈，保证项目的先进性和可维护性

🎨 **优雅的 UI**: 基于 Ant Design 设计语言，提供企业级的用户体验

🚀 **开箱即用**: 完整的项目结构和配置，快速启动开发

📱 **响应式设计**: 完美适配桌面端和移动端

🔧 **TypeScript**: 完整的类型定义，提升开发效率和代码质量

📦 **组件化开发**: 高度模块化的组件设计，便于复用和维护

## 项目结构

```
src/
├── components/          # 通用组件
│   ├── layout/         # 布局组件
│   └── ui/             # UI 组件
├── pages/              # 页面组件
├── routes/             # 路由配置
├── types/              # 类型定义
├── utils/              # 工具函数
├── App.tsx             # 应用入口
├── main.tsx            # 项目入口
└── index.css           # 全局样式
```

## 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 功能特性

### 🔐 登录系统
- 用户名/密码登录
- 登录状态管理
- 路由守卫

### 📊 仪表盘
- 数据可视化
- 统计信息展示
- 快捷操作入口

### 👥 用户管理
- 用户列表
- 用户信息编辑
- 权限管理

### 📝 内容管理
- 文章管理
- 分类管理
- 标签管理

### ⚙️ 系统设置
- 主题切换
- 布局配置
- 系统参数配置

## 开发指南

### 添加新页面

1. 在 `src/pages` 目录下创建页面组件
2. 在 `src/routes` 目录下添加路由配置
3. 在 `src/routes/menuConfig.tsx` 中添加菜单项

### 创建新组件

1. 在 `src/components` 目录下创建组件
2. 导出组件到对应的 `index.ts` 文件
3. 添加必要的类型定义

### 添加工具函数

1. 在 `src/utils` 目录下创建工具文件
2. 在 `src/utils/index.ts` 中导出
3. 添加相应的类型定义

## 配置说明

### 环境变量

项目支持以下环境变量：

- `VITE_APP_TITLE`: 应用标题
- `VITE_API_BASE_URL`: API 基础地址
- `VITE_APP_ENV`: 应用环境

### 主题配置

项目使用 Ant Design 的主题系统，可以在 `src/App.tsx` 中配置主题。

## 部署指南

### 构建

```bash
pnpm build
```

### 部署到 Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://your-api-server;
    }
}
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

[MIT License](LICENSE)

## 支持

如果您觉得这个项目对您有帮助，请给一个 ⭐️ 支持！

## 联系方式

- Issue: [GitHub Issues](https://github.com/your-username/your-repo/issues)
- Email: your-email@example.com
