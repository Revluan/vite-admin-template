import { ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

const Admin: React.FC = () => {
  return (
    <ProCard>
      <div style={{ padding: '24px' }}>
        <Title level={2}>管理页面</Title>
        <Paragraph>
          这里是管理功能模块，可以管理系统的各种配置和数据。
        </Paragraph>
      </div>
    </ProCard>
  );
};

export default Admin; 