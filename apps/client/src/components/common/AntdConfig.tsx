'use client';
import { ConfigProvider, theme } from 'antd';
import React from 'react';

interface IAntdConfig {
  children: React.ReactNode;
}

const AntdConfig = ({ children }: IAntdConfig) => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      {children}
    </ConfigProvider>
  );
};

export default AntdConfig;
