import type { RouteObject } from 'react-router-dom';

// 路由配置，使用别名导入
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
      {
        index: true,
        async lazy() {
          const { default: Welcome } = await import('@/pages/Welcome');
          return { Component: Welcome };
        },
      },
      {
        path: 'welcome',
        async lazy() {
          const { default: Welcome } = await import('@/pages/Welcome');
          return { Component: Welcome };
        },
      },
      {
        path: 'resource/compute',
        async lazy() {
          const { default: Compute } = await import('@/pages/resource/compute');
          return { Component: Compute };
        },
      },
      {
        path: 'resource/storage',
        async lazy() {
          const { default: Storage } = await import('@/pages/resource/storage');
          return { Component: Storage };
        },
      },
      {
        path: 'list/*',
        async lazy() {
          const { default: List } = await import('@/pages/List');
          return { Component: List };
        },
      },
    ],
  },
];

export default routes; 