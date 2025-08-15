import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Spin } from 'antd';
import { routes } from '@/routes';

// 全局加载组件
const GlobalLoading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <Spin size="large" />
  </div>
);

// 创建路由实例
const router = createBrowserRouter(routes);

function App() {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;