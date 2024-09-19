import axios from 'axios';
import { auth } from './resources/auth';
import { cart } from './resources/cart';
import { product } from './resources/product';

export const sdk = {
  auth,
  cart,
  product,
};

export const instance = axios.create({
  baseURL: process.env.GATEWAY_API_SDK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setSdkToken(token: string) {
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
}
