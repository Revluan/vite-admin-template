import {
  CloudFilled,
  CrownFilled,
  DatabaseFilled,
  SmileFilled,
} from '@ant-design/icons';

export interface MenuItem {
  path?: string;
  name: string;
  icon?: React.ReactNode | string;
  access?: string;
  component?: string;
  routes?: MenuItem[];
  target?: string;
}

export const menuItems: MenuItem[] = [
  {
    path: '/welcome',
    name: '欢迎',
    icon: <SmileFilled />,
    component: './Welcome',
  },
  {
    path: '/resource',
    name: '资源',
    icon: <CrownFilled />,
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/resource/compute',
        name: '计算资源',
        icon: <CloudFilled />,
        component: './Welcome',
      },
      {
        path: '/resource/storage',
        name: '存储资源',
        icon: <DatabaseFilled />,
        component: './Welcome',
      }
    ]
  }
];