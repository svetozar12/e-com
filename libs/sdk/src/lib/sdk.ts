import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { auth } from './resources/auth';
import { cart } from './resources/cart';

export const sdk = {
  auth,
  cart,
};

export let instance: AxiosInstance;

export function initAxiosInstance(config: CreateAxiosDefaults) {
  instance = axios.create(config);
}

export function setSdkToken(token: string) {
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
}
