import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import styles from './Cart.module.css';
import { toast } from 'react-toastify';
import { cartQuery } from '../../../../graphql/queries/cart';
import { Cart as CartType } from '../../../../graphql/generated';
import { useQuery } from '@apollo/client';

const Cart = () => {
  const router = useRouter();

  const { data } = useQuery<CartType>(cartQuery, {
    onError(error) {
      toast.error(`${error.message}`);
    },
  });

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
