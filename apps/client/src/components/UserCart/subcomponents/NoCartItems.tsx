import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import styles from './NoCartItems.module.css';
import { useRouter } from 'next/router';

const NoCartItems = () => {
  const router = useRouter();
  return (
    <Alert status="info" borderRadius="10px">
      <AlertIcon />
      <AlertTitle>
        {' '}
        The shopping cart is empty. To add products to the cart, please return{' '}
        <Link
          onClick={() => router.push({ pathname: '/', query: { tab: 'Shop' } })}
          color="#3182ce"
        >
          to the homepage
        </Link>
        .
      </AlertTitle>
    </Alert>
  );
};

export default NoCartItems;
