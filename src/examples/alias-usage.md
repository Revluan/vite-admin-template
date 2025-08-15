# TypeScript 路径别名使用示例

项目已配置了以下路径别名，可以快速引用 src 目录下的文件：

## 配置的别名

- `@/*` → `src/*` (根目录别名)
- `@/components/*` → `src/components/*`
- `@/pages/*` → `src/pages/*` 
- `@/utils/*` → `src/utils/*`
- `@/types/*` → `src/types/*`
- `@/routes/*` → `src/routes/*`
- `@/constants/*` → `src/constants/*`

## 使用示例

### 之前的导入方式
```typescript
// 相对路径导入 - 复杂且容易出错
import AppLayout from './components/layout/AppLayout';
import { menuItems } from '../../routes/menuConfig';
import type { ApiResponse } from '../types';
import { formatDate } from '../../../utils';
```

### 现在的导入方式
```typescript
// 使用别名 - 简洁且清晰
import AppLayout from '@/components/layout/AppLayout';
import { menuItems } from '@/routes/menuConfig';
import type { ApiResponse } from '@/types';
import { formatDate } from '@/utils';
```

## 在不同文件中的使用

### 1. 在页面组件中
```typescript
// src/pages/Dashboard.tsx
import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { AppLayout } from '@/components/layout';
import { Loading } from '@/components/ui';
import { formatDate } from '@/utils';
import { APP_CONFIG } from '@/constants';
import type { User } from '@/types';
```

### 2. 在组件中
```typescript
// src/components/UserTable.tsx
import React from 'react';
import { Table } from 'antd';
import { api } from '@/utils/request';
import { PAGINATION_CONFIG } from '@/constants';
import type { User, TableColumn } from '@/types';
```

### 3. 在工具函数中
```typescript
// src/utils/auth.ts
import { storage } from '@/utils/storage';
import { STORAGE_KEYS, USER_ROLES } from '@/constants';
import type { User } from '@/types';
```

## 优势

1. **简洁性**: 不需要计算相对路径的层级
2. **可维护性**: 移动文件时不需要更新导入路径
3. **可读性**: 一眼就能看出导入的是哪个模块
4. **IDE 支持**: TypeScript 和编辑器能提供更好的自动补全和跳转

## 注意事项

1. 别名仅在 `src` 目录下的文件中使用
2. 确保 VSCode 等编辑器已正确识别 `tsconfig.app.json` 配置
3. 在动态导入中也可以使用别名 (如路由懒加载) 