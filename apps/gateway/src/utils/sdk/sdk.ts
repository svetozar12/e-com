import axios from 'axios';
import { auth } from './resources/auth';
import { cart } from './resources/cart';
import { product } from './resources/product';
import { search } from './resources/search';

export const sdk = {
  auth,
  cart,
  product,
  search,
};

export const instance = axios.create({
  baseURL: process.env.GATEWAY_API_SDK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
