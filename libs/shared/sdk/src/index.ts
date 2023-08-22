import { Configuration, CartServiceApi } from './api/v1/cart';
import { NotificationServiceApi } from './api/v1/notification';
import { OrderServiceApi } from './api/v1/order';
import { ProducCatalogServiceApi } from './api/v1/product-catalog';
import { UserServiceApi, AuthenticationServiceApi } from './api/v1/user';

const API_URL = `${process.env['NEXT_PUBLIC_SCHEMA']}://${process.env['NEXT_PUBLIC_HOST']}:${process.env['NEXT_PUBLIC_PORT']}`;
const config = new Configuration({ basePath: API_URL });

export const initSdk = (sdkConfig: Configuration) => {
  return new Configuration(sdkConfig);
};

export const setToken = (token: string) => {
  if (!token) return;
  config.accessToken = token;
};

export const productCatalogApi = {
  instance: () => new ProducCatalogServiceApi(config),
};

export const userApi = {
  instance: () => new UserServiceApi(config),
};
export const authApi = {
  instance: () => new AuthenticationServiceApi(config),
};

export const cartApi = {
  instance: () => new CartServiceApi(config),
};

export const notificationApi = {
  instance: () => new NotificationServiceApi(config),
};

export const orderApi = {
  instance: () => new OrderServiceApi(config),
};

export * as UserAndAuth from './api/v1/user';
export * as Cart from './api/v1/cart';
export * as Notification from './api/v1/notification';
export * as ProductCatalog from './api/v1/product-catalog';
export * as Order from './api/v1/order';
