import React from 'react';
import '../styles/global.css';
import { initAxiosInstance, sdk } from '@e-com/sdk';
import AxiosInitialized from '../components/AxiosInitialized';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { redirect, usePathname } from 'next/navigation';
import { headers } from 'next/headers';
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
  if ((await isAuth()) && !pathname?.includes('/login')) {
    return redirect('/login');
  }

  return (
    <html lang="en">
      <AxiosInitialized></AxiosInitialized>
      <body>{children}</body>
    </html>
  );
}

async function isAuth() {
  const token = getCookie('token') || '';
  if (!token) return false;
  const [res] = await sdk.auth().verifyToken(token);
  const { status } = res || {};
  return status !== 200;
}
