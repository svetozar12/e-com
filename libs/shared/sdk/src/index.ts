import {
  AuthenticationServiceApi,
  UserServiceApi,
  Configuration,
} from './api/v1/user';
import { ImageUploadServiceApi } from './api/v1/file-upload';
export * from './api/v1/user';
// eslint-disable-next-line max-len
const API_URL = `${process.env['NEXT_PUBLIC_SCHEMA']}://${process.env['NEXT_PUBLIC_HOST']}:${process.env['NEXT_PUBLIC_PORT']}`;
let config = new Configuration({ basePath: API_URL });

export const initSdk = (sdkConfig: Configuration) => {
  config = new Configuration(sdkConfig);
};

export const sdk = {
  auth: new AuthenticationServiceApi(config),
  user: new UserServiceApi(config),
  fileUpload: new ImageUploadServiceApi(config),
};
