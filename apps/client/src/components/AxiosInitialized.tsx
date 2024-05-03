'use client';
import { initAxiosInstance, setSdkToken } from '@e-com/sdk';
import { getCookie } from 'cookies-next';
import React, { useEffect } from 'react';
import { ACCESS_TOKEN } from '../constants/cookies';

const AxiosInitialized = () => {
  const token = getCookie(ACCESS_TOKEN);
  useEffect(() => {
    initAxiosInstance({
      baseURL: 'http://localhost:4000/api',
    });
    setSdkToken(token || '');
  }, []);
  return null;
};

export default AxiosInitialized;
