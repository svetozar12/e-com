import { Container } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { sdk } from '../../../../utils/sdk';
import styles from './Cart.module.css';
import { toast } from 'react-toastify';

const Cart = () => {
  const router = useRouter();

  const { data, error } = useQuery({
    queryKey: ['cartItems'],
    queryFn: sdk.cart().getCart,
  });

  console.log(data);

  if (error) {
    toast.error(`${error.message}`);
  }

  const cartLength = data?.products?.length || 0;

  return (
    <Container
      cursor="pointer"
      centerContent
      display="flex"
      flexDir="row"
      position="relative"
      gap={2}
      onClick={() => router.push('/cart')}
    >
      {cartLength > 0 && <div className={styles.cartCounter}>{cartLength}</div>}
      <FiShoppingCart className="hover-effect" size="40px" />
    </Container>
  );
};

export default Cart;
