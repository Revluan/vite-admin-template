// 应用配置
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_TITLE || '管理系统',
  version: '1.0.0',
  description: '基于 React + TypeScript + Vite + Ant Design Pro 的管理系统',
  author: 'Your Name',
  homepage: 'https://github.com/your-username/your-repo',
};

// API 配置
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  withCredentials: true,
};

// 存储键名
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  THEME: 'theme',
  LANGUAGE: 'language',
  SETTINGS: 'settings',
} as const;

// 路由路径
export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  WELCOME: '/welcome',
  ADMIN: '/admin',
  LIST: '/list',
  NOT_FOUND: '/404',
} as const;

// 用户角色
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;

// 主题配置
export const THEME_CONFIG = {
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
  },
  layout: {
    headerHeight: 64,
    siderWidth: 208,
    siderCollapsedWidth: 48,
  },
} as const;

// 分页配置
export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  pageSizeOptions: ['10', '20', '50', '100'],
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: (total: number, range: [number, number]) =>
    `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
} as const; 