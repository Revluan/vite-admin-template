import axios, { AxiosError } from 'axios';
import type { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  InternalAxiosRequestConfig 
} from 'axios';
import { message } from 'antd';
import type { ApiResponse } from '@/types/api';
import { STORAGE_KEYS } from '@/constants';

// 请求配置
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const TIMEOUT = 10000;

// 创建 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加认证 token
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    // 打印请求日志（开发环境）
    if (import.meta.env.DEV) {
      console.log('🚀 Request:', config.method?.toUpperCase(), config.url, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 打印响应日志（开发环境）
    if (import.meta.env.DEV) {
      console.log('✅ Response:', response.config.url, response.data);
    }

    const { data } = response;

    // 统一处理业务错误
    if (data.code !== undefined && data.code !== 200 && data.code !== 0) {
      message.error(data.message || '请求失败');
      return Promise.reject(new Error(data.message || '请求失败'));
    }

    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    console.error('❌ Response Error:', error);

    // 处理 HTTP 错误
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          message.error('登录已过期，请重新登录');
          // 清除本地存储
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER_INFO);
          // 跳转到登录页
          window.location.href = '/login';
          break;
        case 403:
          message.error('权限不足，无法访问');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 422:
          message.error(data?.message || '请求参数错误');
          break;
        case 500:
          message.error('服务器内部错误，请稍后重试');
          break;
        case 502:
          message.error('网关错误，请稍后重试');
          break;
        case 503:
          message.error('服务暂时不可用，请稍后重试');
          break;
        default:
          message.error(data?.message || `请求失败 (${status})`);
      }
    } else if (error.request) {
      // 网络错误
      if (error.code === 'ECONNABORTED') {
        message.error('请求超时，请检查网络连接');
      } else {
        message.error('网络连接失败，请检查网络');
      }
    } else {
      message.error('请求配置错误');
    }

    return Promise.reject(error);
  }
);

// 通用请求函数
const request = <T = any>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return axiosInstance.request<ApiResponse<T>>(config).then(res => res.data);
};

// 封装常用请求方法
export const api = {
  // GET 请求
  get: <T = any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'GET', url, params }),

  // POST 请求
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'POST', url, data }),

  // PUT 请求
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'PUT', url, data }),

  // DELETE 请求
  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'DELETE', url }),

  // PATCH 请求
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'PATCH', url, data }),

  // 文件上传
  upload: <T = any>(url: string, file: File, data?: Record<string, any>, config?: AxiosRequestConfig) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // 添加其他字段
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }

    return request<T>({
      ...config,
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 下载文件
  download: (url: string, filename?: string, params?: Record<string, any>) => {
    return axiosInstance.get(url, {
      params,
      responseType: 'blob',
    }).then(response => {
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    });
  },
};

// 导出 axios 实例（用于特殊需求）
export { axiosInstance };

export default request; 