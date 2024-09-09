/******************************************************************************
 * Copyright (c) Hilscher Gesellschaft fuer Systemautomation mbH
 * See Hilscher_netFIELD_Source_Code_License.pdf
 ******************************************************************************/

import { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { initAxiosInstance } from '@e-com/sdk';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Navbar/Navbar';

NProgress.configure({ showSpinner: false, minimum: 0.5 });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }: AppProps) {
  initAxiosInstance({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });
  return (
    <ChakraProvider>
      <Navbar></Navbar>
      <Component {...pageProps} />
      <ToastContainer theme="dark" />
    </ChakraProvider>
  );
}

export default App;
