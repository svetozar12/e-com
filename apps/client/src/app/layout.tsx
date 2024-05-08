import React from 'react';
import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { initAxiosInstance, sdk, setSdkToken } from '@e-com/sdk';
import AxiosInitialized from '../components/common/AxiosInitialized';
import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar/Navbar';
import LoadingBarClient from '../components/common/LoadingBar';
export const metadata = {
  title: 'Welcome to client',
  description: 'Generated by create-nx-workspace',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  initAxiosInstance({
    baseURL: 'http://localhost:4000/api',
  });

  const headersList = headers();
  const pathname = headersList.get('x-pathname');
  const isAuthenticated = await isAuth();

  if (isAuthenticated && pathname === '/login') {
    return redirect('/');
  }

  const cartData = await sdk.cart().get();
  console.log(cartData);
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <AxiosInitialized />
        <LoadingBarClient />
        <ToastContainer theme="dark" />
      </body>
    </html>
  );
}

export async function isAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;
  setSdkToken(token || '');
  if (!token) {
    return false;
  }
  const [res, err] = await sdk.auth().verifyToken(token);
  if (err) {
    return false;
  }
  const { status } = res || {};
  if (status === 200) {
    return false;
  }
  return status === 200;
}
