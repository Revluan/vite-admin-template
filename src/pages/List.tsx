import { ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

const List: React.FC = () => {
  return (
    <ProCard>
      <div style={{ padding: '24px' }}>
        <Title level={2}>列表页面</Title>
        <Paragraph>
          这里是列表功能模块，可以展示和管理各种数据列表。
        </Paragraph>
      </div>
    </ProCard>
  );
};

export default List; 