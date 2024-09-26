import { Heading } from '@chakra-ui/react';
import React from 'react';
import { toast } from 'react-toastify';
import CartItems from './subcomponents/CartItems';
import styles from './UserCart.module.css';
import NoCartItems from './subcomponents/NoCartItems';
import CartInfo from './subcomponents/CartInfo';
import { useQuery } from '@apollo/client';
import { cartQuery } from '../../graphql/queries/cart';
import { Cart } from '../../graphql/generated';

const UserCart = () => {
  const { data } = useQuery<Cart>(cartQuery, {
    onError(error) {
      toast.error(`${error.message}`);
    },
  });

  if (!data) {
    return <NoCartItems />;
  }

  return (
    <div className={styles.container}>
      <Heading>Cart for shopping</Heading>
      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          {data.products.map((product) => {
            if (!product) return;
            return <CartItems key={product._id} product={product} />;
          })}
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
