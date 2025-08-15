import React, { useState, useEffect } from 'react';
import { Button, Table, message, Space } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { userService, computeService } from '@/services';
import type { UserInfo, ComputeInstance, ListParams } from '@/types/api';

// 用户管理示例组件
const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(false);

  // 获取用户列表
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getUserInfo();
      // 注意：这里只是示例，实际应该是获取用户列表的 API
      setUsers([response.data]);
      message.success('用户数据加载成功');
    } catch (error) {
      // 错误已被请求拦截器处理
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: UserInfo) => (
        <Space>
          <Button size="small" onClick={() => handleEditUser(record.id)}>
            编辑
          </Button>
          <Button size="small" danger onClick={() => handleDeleteUser(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleEditUser = (userId: string) => {
    console.log('编辑用户:', userId);
    // 实现编辑逻辑
  };

  const handleDeleteUser = (userId: string) => {
    console.log('删除用户:', userId);
    // 实现删除逻辑
  };

  return (
    <ProCard title="用户管理" extra={<Button type="primary">新增用户</Button>}>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </ProCard>
  );
};

// 计算实例管理示例组件
const ComputeManagement: React.FC = () => {
  const [instances, setInstances] = useState<ComputeInstance[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 获取实例列表
  const fetchInstances = async (params?: Partial<ListParams>) => {
    setLoading(true);
    try {
      const queryParams: ListParams = {
        current: pagination.current,
        pageSize: pagination.pageSize,
        ...params,
      };

      const response = await computeService.getInstanceList(queryParams);
      const { list, total, current, pageSize } = response.data;

      setInstances(list);
      setPagination({ current, pageSize, total });
      
      message.success('实例数据加载成功');
    } catch (error) {
      // 错误已被请求拦截器处理
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstances();
  }, []);

  // 启动实例
  const handleStartInstance = async (id: string) => {
    try {
      await computeService.startInstance(id);
      message.success('实例启动成功');
      fetchInstances(); // 刷新列表
    } catch (error) {
      // 错误已被请求拦截器处理
    }
  };

  // 停止实例
  const handleStopInstance = async (id: string) => {
    try {
      await computeService.stopInstance(id);
      message.success('实例停止成功');
      fetchInstances(); // 刷新列表
    } catch (error) {
      // 错误已被请求拦截器处理
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '名称', dataIndex: 'name', key: 'name' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          running: { color: 'green', text: '运行中' },
          stopped: { color: 'red', text: '已停止' },
          pending: { color: 'orange', text: '启动中' },
          error: { color: 'red', text: '错误' },
        };
        const config = statusMap[status as keyof typeof statusMap];
        return <span style={{ color: config?.color }}>{config?.text}</span>;
      }
    },
    { title: 'CPU', dataIndex: 'cpu', key: 'cpu', render: (cpu: number) => `${cpu} 核` },
    { title: '内存', dataIndex: 'memory', key: 'memory', render: (memory: number) => `${memory} GB` },
    { title: 'IP地址', dataIndex: 'ip', key: 'ip' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ComputeInstance) => (
        <Space>
          {record.status === 'stopped' && (
            <Button 
              size="small" 
              type="primary" 
              onClick={() => handleStartInstance(record.id)}
            >
              启动
            </Button>
          )}
          {record.status === 'running' && (
            <Button 
              size="small" 
              onClick={() => handleStopInstance(record.id)}
            >
              停止
            </Button>
          )}
          <Button size="small">详情</Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (paginationConfig: any) => {
    fetchInstances({
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    });
  };

  return (
    <ProCard title="计算实例" extra={<Button type="primary">创建实例</Button>}>
      <Table
        columns={columns}
        dataSource={instances}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
        }}
        onChange={handleTableChange}
      />
    </ProCard>
  );
};

// 组合示例组件
const ServiceExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'compute'>('users');

  return (
    <div style={{ padding: '24px' }}>
      <Space style={{ marginBottom: '16px' }}>
        <Button 
          type={activeTab === 'users' ? 'primary' : 'default'}
          onClick={() => setActiveTab('users')}
        >
          用户管理
        </Button>
        <Button 
          type={activeTab === 'compute' ? 'primary' : 'default'}
          onClick={() => setActiveTab('compute')}
        >
          计算实例
        </Button>
      </Space>

      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'compute' && <ComputeManagement />}
    </div>
  );
};

export default ServiceExample; 