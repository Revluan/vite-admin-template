# 路由配置统一管理

项目采用统一的路由配置管理方式，确保数据唯一性和可维护性。

## 架构设计

### 1. 路由配置文件 (`src/routes/index.ts`)
```typescript
export const routes: RouteObject[] = [
  {
    path: '/login',
    async lazy() {
      const { default: Login } = await import('@/pages/Login');
      return { Component: Login };
    },
  },
  {
    path: '/',
    async lazy() {
      const { default: AppLayout } = await import('@/components/layout/AppLayout');
      return { Component: AppLayout };
    },
    children: [
      // 子路由配置...
    ],
  },
];
```

### 2. 应用入口 (`src/App.tsx`)
```typescript
import { routes } from '@/routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
```

## 优势

### 1. 数据唯一性
- 所有路由配置集中在 `routes/index.ts` 中
- 避免在多个文件中重复定义路由
- 确保路由配置的一致性

### 2. 懒加载优化
- 所有页面和布局组件都采用懒加载
- 自动代码分割，提升首屏加载性能
- 按需加载，减少初始包体积

### 3. 可维护性
- 统一的路由管理，便于维护和修改
- 使用别名导入，路径清晰
- TypeScript 类型安全

## 构建结果

使用统一路由配置后的构建结果：

```
dist/assets/List-*.js           0.35 kB  # List 页面
dist/assets/Admin-*.js          0.35 kB  # Admin 页面  
dist/assets/Welcome-*.js        0.47 kB  # Welcome 页面
dist/assets/Login-*.js          1.71 kB  # Login 页面
dist/assets/AppLayout-*.js      6.89 kB  # 布局组件
dist/assets/vendor-*.js        12.47 kB  # React 等基础库
dist/assets/router-*.js        75.91 kB  # 路由相关
dist/assets/antd-*.js       1,634.08 kB  # Ant Design 组件库
```

可以看到每个页面都被单独分割成了独立的 chunk，实现了最佳的代码分割效果。

## 添加新路由

### 1. 创建页面组件
```typescript
// src/pages/NewPage.tsx
import React from 'react';
import { ProCard } from '@ant-design/pro-components';

const NewPage: React.FC = () => {
  return (
    <ProCard>
      <h1>新页面</h1>
    </ProCard>
  );
};

export default NewPage;
```

### 2. 在路由配置中添加
```typescript
// src/routes/index.ts
{
  path: '/new-page',
  async lazy() {
    const { default: NewPage } = await import('@/pages/NewPage');
    return { Component: NewPage };
  },
}
```

### 3. 在菜单配置中添加（可选）
```typescript
// src/routes/menuConfig.tsx
{
  path: '/new-page',
  name: '新页面',
  icon: <YourIcon />,
}
```

## 路由结构

```
/                    # 根路径 (AppLayout)
├── /welcome         # 欢迎页
├── /admin/*         # 管理页面及子路由
├── /list/*          # 列表页面及子路由
└── /login           # 登录页 (独立布局)
```

## 注意事项

1. **懒加载**: 所有路由都使用 `lazy()` 函数进行懒加载
2. **别名导入**: 使用 `@/` 别名导入页面组件
3. **布局嵌套**: 主要页面都嵌套在 `AppLayout` 下
4. **独立页面**: 登录页等特殊页面使用独立布局
5. **菜单同步**: 菜单配置需要与路由配置保持同步 