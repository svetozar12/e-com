import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export const sdk = {
  auth: () => ({ signUp, verify }),
};

let instance: AxiosInstance;

export function initAxiosInstance(config: CreateAxiosDefaults) {
  instance = axios.create(config);
}

async function signUp(): Promise<string> {
  try {
    const { data } = await instance.post('/auth/signUp');
    return data;
  } catch (error) {
    return 'Something went wrong';
  }
}

async function verify(reqData: {
  email: string;
  code: number;
}): Promise<string> {
  try {
    console.log(instance);
    const { data } = await instance.post('/auth/verify', reqData);
    return data;
  } catch (error) {
    return error;
  }
}
