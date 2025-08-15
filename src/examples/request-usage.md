# Axios 请求工具使用指南

项目已集成 axios 并封装了完善的请求工具，提供统一的 API 调用方式。

## 🚀 功能特性

- ✅ **完整的拦截器**: 自动处理请求/响应、错误处理、token 管理
- ✅ **TypeScript 支持**: 完整的类型定义和智能提示
- ✅ **统一错误处理**: 自动显示错误消息和状态码处理
- ✅ **文件上传/下载**: 内置文件处理功能
- ✅ **开发调试**: 开发环境下的请求日志
- ✅ **缓存控制**: GET 请求自动添加时间戳防缓存

## 📁 文件结构

```
src/
├── utils/request.ts        # 核心请求工具
├── types/api.ts           # API 类型定义
├── services/             # API 服务层
│   ├── user.ts          # 用户相关 API
│   └── resource.ts      # 资源相关 API
└── constants/index.ts    # 常量配置
```

## 🛠️ 基础用法

### 1. 导入请求工具
```typescript
import { api } from '@/utils/request';
```

### 2. 基础请求方法
```typescript
// GET 请求
const getUserList = async () => {
  try {
    const response = await api.get<UserInfo[]>('/users');
    console.log(response.data); // TypeScript 智能提示
  } catch (error) {
    // 错误已被自动处理和显示
  }
};

// POST 请求
const createUser = async (userData: CreateUserParams) => {
  const response = await api.post<UserInfo>('/users', userData);
  return response.data;
};

// PUT 请求
const updateUser = async (id: string, userData: Partial<UserInfo>) => {
  const response = await api.put<UserInfo>(`/users/${id}`, userData);
  return response.data;
};

// DELETE 请求
const deleteUser = async (id: string) => {
  await api.delete(`/users/${id}`);
};
```

### 3. 带参数的请求
```typescript
// GET 请求参数
const getUsers = async (params: ListParams) => {
  const response = await api.get<PaginationResponse<UserInfo>>('/users', {
    current: 1,
    pageSize: 10,
    keyword: 'admin',
    status: 'active'
  });
  return response.data;
};

// 自定义配置
const getData = async () => {
  const response = await api.get('/sensitive-data', {}, {
    timeout: 30000, // 30秒超时
    headers: { 'Custom-Header': 'value' }
  });
  return response.data;
};
```

## 📂 文件操作

### 1. 文件上传
```typescript
const uploadFile = async (file: File) => {
  try {
    const response = await api.upload<UploadResponse>('/upload', file);
    console.log('上传成功:', response.data.url);
    return response.data;
  } catch (error) {
    console.error('上传失败');
  }
};

// 带额外参数的上传
const uploadWithData = async (file: File) => {
  const response = await api.upload<UploadResponse>(
    '/upload',
    file,
    { 
      category: 'avatar',
      compress: true 
    }
  );
  return response.data;
};
```

### 2. 文件下载
```typescript
const downloadFile = async () => {
  try {
    await api.download('/files/report.pdf', 'monthly-report.pdf');
    // 文件会自动触发下载
  } catch (error) {
    console.error('下载失败');
  }
};
```

## 🔧 服务层使用

### 1. 用户服务示例
```typescript
import { userService } from '@/services/user';

// 登录
const handleLogin = async (loginData: LoginParams) => {
  try {
    const response = await userService.login(loginData);
    const { token, userInfo } = response.data;
    
    // 存储 token
    localStorage.setItem('token', token);
    
    return userInfo;
  } catch (error) {
    // 错误已被统一处理
  }
};

// 获取用户信息
const getCurrentUser = async () => {
  const response = await userService.getUserInfo();
  return response.data;
};
```

### 2. 资源服务示例
```typescript
import { computeService } from '@/services/resource';

// 获取计算实例列表
const getInstances = async (params: ListParams) => {
  const response = await computeService.getInstanceList(params);
  return response.data;
};

// 启动实例
const startInstance = async (id: string) => {
  await computeService.startInstance(id);
  message.success('实例启动成功');
};
```

## 🎯 高级用法

### 1. 直接使用 axios 实例
```typescript
import { axiosInstance } from '@/utils/request';

// 对于特殊需求，可以直接使用 axios 实例
const customRequest = async () => {
  const response = await axiosInstance({
    method: 'POST',
    url: '/custom-endpoint',
    data: { custom: 'data' },
    transformRequest: [/* 自定义转换 */],
    transformResponse: [/* 自定义转换 */],
  });
  return response.data;
};
```

### 2. 取消请求
```typescript
import { axiosInstance } from '@/utils/request';

const cancelTokenSource = axios.CancelToken.source();

const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/data', {
      cancelToken: cancelTokenSource.token
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('请求被取消');
    }
  }
};

// 取消请求
cancelTokenSource.cancel('用户取消了请求');
```

## 🔐 认证处理

请求工具会自动处理认证相关逻辑：

1. **自动添加 Token**: 从 localStorage 读取 token 并添加到请求头
2. **401 处理**: 自动清除本地存储并跳转到登录页
3. **Token 刷新**: 可配合 refresh token 机制

```typescript
// 在登录成功后存储 token
localStorage.setItem('token', response.data.token);

// 后续请求会自动携带 Authorization header
```

## 📊 请求日志

开发环境下，所有请求都会打印详细日志：

```
🚀 Request: POST /auth/login { data: { username: 'admin' } }
✅ Response: /auth/login { code: 200, data: { token: '...' } }
```

## 🚨 错误处理

系统会自动处理各种错误场景：

- **401**: 登录过期，自动跳转登录页
- **403**: 权限不足提醒
- **404**: 资源不存在
- **422**: 参数错误
- **5xx**: 服务器错误
- **网络错误**: 超时、连接失败等

## 💡 最佳实践

1. **使用 TypeScript**: 充分利用类型定义获得智能提示
2. **服务层封装**: 将 API 调用封装到服务层，便于维护
3. **错误处理**: 依赖统一错误处理，避免重复代码
4. **参数类型**: 为请求参数定义明确的 TypeScript 接口
5. **响应类型**: 为 API 响应定义准确的类型定义

```typescript
// ✅ 推荐：明确的类型定义
interface CreateUserParams {
  username: string;
  email: string;
  role: string;
}

const createUser = (params: CreateUserParams) => 
  api.post<UserInfo>('/users', params);

// ❌ 不推荐：缺乏类型约束
const createUser = (params: any) => 
  api.post('/users', params);
``` 