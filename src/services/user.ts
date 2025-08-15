import { api } from '@/utils/request';
import type { 
  LoginParams, 
  LoginResponse, 
  UserInfo
} from '@/types/api';

// 用户 API 服务
export const userService = {
  // 用户登录
  login: (params: LoginParams) => 
    api.post<LoginResponse>('/auth/login', params),

  // 获取用户信息
  getUserInfo: () => 
    api.get<UserInfo>('/user/info'),

  // 更新用户信息
  updateUserInfo: (data: Partial<UserInfo>) => 
    api.put<UserInfo>('/user/info', data),

  // 修改密码
  changePassword: (data: { oldPassword: string; newPassword: string }) => 
    api.post('/user/change-password', data),

  // 上传头像
  uploadAvatar: (file: File) => 
    api.upload<{ url: string }>('/user/avatar', file),

  // 用户登出
  logout: () => 
    api.post('/auth/logout'),

  // 刷新 token
  refreshToken: (refreshToken: string) => 
    api.post<{ token: string }>('/auth/refresh', { refreshToken }),
}; 