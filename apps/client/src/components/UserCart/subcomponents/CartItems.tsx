import React from 'react';
import { Product } from '../../../utils/sdk/resources/product';
import Image from 'next/image';
import styles from './CartItems.module.css';
import { Heading, Link, Text } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sdk } from '../../../utils/sdk';
import Spinner from '../../common/Spinner/Spinner';
interface ICartItems {
  product: Product;
}

const CartItems = ({ product }: ICartItems) => {
  const { image, name, description, price } = product;
  const queryClient = useQueryClient();
  const { data: cartData, refetch } = useQuery({
    queryKey: ['cartItems'],
    queryFn: sdk.cart().getCart,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: sdk.cart().updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
  });
  return (
    <Spinner loading={isPending}>
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
                  deleteProducts: [product._id],
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
