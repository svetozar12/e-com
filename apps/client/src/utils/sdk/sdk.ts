import axios from 'axios';
import { auth } from './resources/auth';
import { cart } from './resources/cart';

export const sdk = {
  auth,
  cart,
};

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export function setSdkToken(token: string) {
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
}
