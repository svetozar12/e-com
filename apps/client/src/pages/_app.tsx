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
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { getCookie } from 'cookies-next';
import { ACCESS_TOKEN } from '../constants/cookies';

NProgress.configure({ showSpinner: false, minimum: 0.5 });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const authLink = new ApolloLink((operation, forward) => {
  // Get the authentication token from local storage (or from any secure storage)
  const token = getCookie(ACCESS_TOKEN) || '';

  // Add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  // Call the next link in the chain
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_BASE_URL, // replace with your GraphQL endpoint
});

const link = ApolloLink.from([httpLink, authLink]);

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_BASE_URL,
  cache: new InMemoryCache(),
  link,
});

/* 
- Create empty state reusable component
- finish migration to gql on frontend
- think of a way to serve static images through the gateway or some other way
- make frontend better looking if possible (wink wink ;/)
- add to BE and FE logic to subscribe to email newsletter
*/

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer />
        <Footer />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
