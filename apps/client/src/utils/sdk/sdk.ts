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
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export function setSdkToken(token: string) {
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
}
