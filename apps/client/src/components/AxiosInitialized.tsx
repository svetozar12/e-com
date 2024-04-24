'use client';
import { initAxiosInstance } from '@e-com/sdk';
import React, { useEffect } from 'react';

const AxiosInitialized = () => {
  useEffect(() => {
    initAxiosInstance({
      baseURL: 'http://localhost:3000/api', // Example Base URL
      // other configuration settings...
    });
  }, []);
  return null;
};

export default AxiosInitialized;
