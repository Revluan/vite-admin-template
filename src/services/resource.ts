import { api } from '@/utils/request';
import type { 
  ComputeInstance, 
  StorageVolume, 
  PaginationResponse, 
  ListParams 
} from '@/types/api';

// 计算资源 API 服务
export const computeService = {
  // 获取计算实例列表
  getInstanceList: (params?: ListParams) => 
    api.get<PaginationResponse<ComputeInstance>>('/compute/instances', params),

  // 获取单个实例详情
  getInstanceDetail: (id: string) => 
    api.get<ComputeInstance>(`/compute/instances/${id}`),

  // 创建计算实例
  createInstance: (data: Partial<ComputeInstance>) => 
    api.post<ComputeInstance>('/compute/instances', data),

  // 启动实例
  startInstance: (id: string) => 
    api.post(`/compute/instances/${id}/start`),

  // 停止实例
  stopInstance: (id: string) => 
    api.post(`/compute/instances/${id}/stop`),

  // 重启实例
  rebootInstance: (id: string) => 
    api.post(`/compute/instances/${id}/reboot`),

  // 删除实例
  deleteInstance: (id: string) => 
    api.delete(`/compute/instances/${id}`),
};

// 存储资源 API 服务
export const storageService = {
  // 获取存储卷列表
  getVolumeList: (params?: ListParams) => 
    api.get<PaginationResponse<StorageVolume>>('/storage/volumes', params),

  // 获取单个存储卷详情
  getVolumeDetail: (id: string) => 
    api.get<StorageVolume>(`/storage/volumes/${id}`),

  // 创建存储卷
  createVolume: (data: Partial<StorageVolume>) => 
    api.post<StorageVolume>('/storage/volumes', data),

  // 挂载存储卷
  attachVolume: (id: string, instanceId: string) => 
    api.post(`/storage/volumes/${id}/attach`, { instanceId }),

  // 卸载存储卷
  detachVolume: (id: string) => 
    api.post(`/storage/volumes/${id}/detach`),

  // 删除存储卷
  deleteVolume: (id: string) => 
    api.delete(`/storage/volumes/${id}`),
}; 