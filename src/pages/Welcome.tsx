import { ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

const Welcome: React.FC = () => {
  return (
    <ProCard>
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <Title level={2}>欢迎使用管理系统</Title>
        <Paragraph>
          这是一个基于 Ant Design Pro 构建的企业级管理后台模板
        </Paragraph>
        <Paragraph>
          技术栈：React + TypeScript + Vite + Ant Design + Ant Design Pro
        </Paragraph>
      </div>
    </ProCard>
  );
};

export default Welcome; 