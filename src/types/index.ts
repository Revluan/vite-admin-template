// 用户相关类型
export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  role: string;
  permissions?: string[];
}

// 菜单项类型
export interface MenuItem {
  path?: string;
  name: string;
  icon?: React.ReactNode | string;
  access?: string;
  component?: string;
  routes?: MenuItem[];
  target?: string;
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
}

// 重新导出 API 相关类型
export * from './api';

// 表格列配置
export interface TableColumn {
  title: string;
  dataIndex: string;
  key?: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: any, index: number) => React.ReactNode;
  sorter?: boolean;
  filters?: Array<{ text: string; value: any }>;
} 