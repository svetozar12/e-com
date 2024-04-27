import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { asyncHandler } from './utils';

export const sdk = {
  auth: () => ({
    signUp: asyncHandler(signUp),
    verify: asyncHandler(verify),
    verifyToken: asyncHandler(verifyToken),
  }),
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

async function verifyToken(token: string) {
  return instance.get('/auth/verify', {
    headers: { Authorization: `Bearer ${token}` },
  });
}
