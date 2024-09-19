import { Card, Heading } from '@chakra-ui/react';
import React from 'react';
import { toast } from 'react-toastify';
import { sdk } from '../../utils/sdk';
import { useQuery } from '@tanstack/react-query';
import CartItems from './subcomponents/CartItems';
import styles from './UserCart.module.css';
import NoCartItems from './subcomponents/NoCartItems';
import CartInfo from './subcomponents/CartInfo';

const UserCart = () => {
  const { data, error } = useQuery({
    queryKey: ['cartItems'],
    queryFn: sdk.cart().getCart,
  });

  if (error) {
    toast.error(`${error.message}`);
  }

  if (!data) {
    return <NoCartItems />;
  }

  return (
    <div className={styles.container}>
      <Heading>Cart for shopping</Heading>
      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          {data?.products.map((product) => (
            <CartItems key={product._id} product={product} />
          ))}
          {data?.products.length === 0 && <NoCartItems />}
        </div>
        {data?.products.length > 0 && (
          <CartInfo products={data?.products || []} />
        )}
      </div>
    </div>
  );
};

export default UserCart;
