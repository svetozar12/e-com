import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { asyncHandler } from './utils';

export const sdk = {
  auth: () => ({ signUp: asyncHandler(signUp), verify: asyncHandler(verify) }),
};

let instance: AxiosInstance;

export function initAxiosInstance(config: CreateAxiosDefaults) {
  instance = axios.create(config);
}

async function signUp(reqData: { email: string }) {
  return instance.post('/auth/signUp', reqData);
}

async function verify(reqData: { email: string; code: string }) {
  return instance.post('/auth/verify', reqData);
}
