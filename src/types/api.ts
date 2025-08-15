// API 请求相关类型定义

// 通用 API 响应类型
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success?: boolean;
  timestamp?: number;
}

// 分页请求参数
export interface PaginationParams {
  current: number;
  pageSize: number;
  keyword?: string;
  sorter?: Record<string, 'ascend' | 'descend'>;
  filter?: Record<string, any>;
}

// 分页响应数据
export interface PaginationResponse<T = any> {
  list: T[];
  total: number;
  current: number;
  pageSize: number;
  pages?: number;
}

// 文件上传响应
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  type: string;
}

// 用户相关 API 类型
export interface LoginParams {
  username: string;
  password: string;
  captcha?: string;
  remember?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  userInfo: UserInfo;
  permissions?: string[];
}

export interface UserInfo {
  id: string;
  username: string;
  nickname?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  role: string;
  status: number;
  lastLoginTime?: string;
}

// 资源相关 API 类型
export interface ComputeInstance {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'pending' | 'error';
  cpu: number;
  memory: number;
  disk: number;
  ip: string;
  createTime: string;
  region: string;
}

export interface StorageVolume {
  id: string;
  name: string;
  size: number;
  type: 'ssd' | 'hdd';
  status: 'available' | 'in-use' | 'error';
  attachedTo?: string;
  createTime: string;
}

// 通用列表查询参数
export interface ListParams extends PaginationParams {
  status?: string;
  region?: string;
  startTime?: string;
  endTime?: string;
} 