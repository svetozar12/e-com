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
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../utils/sdk';

NProgress.configure({ showSpinner: false, minimum: 0.5 });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer theme="dark" />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
