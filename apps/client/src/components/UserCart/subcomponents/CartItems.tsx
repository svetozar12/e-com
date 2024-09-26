import React from 'react';
import Image from 'next/image';
import styles from './CartItems.module.css';
import { Heading, Link, Text } from '@chakra-ui/react';
import Spinner from '../../common/Spinner/Spinner';
import { CardProduct, Cart } from '../../../graphql/generated';
import { useMutation } from '@apollo/client';
import { updateCartMutation } from '../../../graphql/mutations/cart';
import { cartQuery } from '../../../graphql/queries/cart';
interface ICartItems {
  product: CardProduct;
}

const CartItems = ({ product }: ICartItems) => {
  const { image, name, description, price } = product;
  const [mutate, { loading }] = useMutation<Cart>(updateCartMutation, {
    refetchQueries: [{ query: cartQuery }],
  });

  return (
    <Spinner loading={loading}>
      <div className={styles.container}>
        <div className={styles.itemImage}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/static/${image}`}
            width={120}
            height={120}
            alt="logo"
          />
        </div>
        <div className={styles.itemInfo}>
          <div>
            <Text fontSize="24px" fontWeight="bold">
              {name}
            </Text>
            <Text fontWeight="normal">{description}</Text>
          </div>
          <div className={styles.itemPrice}>
            <Heading>{Math.floor(price) + 0.99}$</Heading>
            <Link
              onClick={() => {
                mutate({
                  variables: { deleteProducts: [product._id] },
                });
              }}
              color="red"
            >
              Delete from cart
            </Link>
          </div>
        </div>
      </div>
    </Spinner>
  );
};

export default CartItems;
