import { Spin } from 'antd';
import React from 'react';

interface LoadingProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
  spinning?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'default',
  tip = '加载中...',
  spinning = true,
  children,
  style,
}) => {
  if (children) {
    return (
      <Spin size={size} tip={tip} spinning={spinning} style={style}>
        {children}
      </Spin>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        ...style,
      }}
    >
      <Spin size={size} tip={tip} />
    </div>
  );
};

export default Loading; 