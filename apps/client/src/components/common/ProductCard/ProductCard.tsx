import { Button, Card, CardBody, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './ProductCard.module.css';
import { FiShoppingCart } from 'react-icons/fi';
import useSession from '../../../hooks/useSession';
import {
  Cart,
  MutationUpdateCartArgs,
  Product,
} from '../../../graphql/generated';
import { useMutation } from '@apollo/client';
import { updateCartMutation } from '../../../graphql/mutations/cart';
import { cartQuery } from '../../../graphql/queries/cart';

const ProductCard = (product: Product) => {
  const { session } = useSession();
  const { price, name, image, _id } = product;
  const router = useRouter();
  const [updateCart] = useMutation<Cart, MutationUpdateCartArgs>(
    updateCartMutation,
    {
      refetchQueries: [{ query: cartQuery }],
    }
  );
  function handleOnClick() {
    router.push('/products/' + _id);
  }

  async function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    // localStorage.setItem('cartItems', JSON.stringify([product]));
    if (session) {
      await updateCart({ variables: { products: [product] } });
    }
  }

  return (
    <Card
      className={styles.container}
      onClick={() => handleOnClick()}
      cursor="pointer"
    >
      <CardBody>
        <div
          style={{
            width: '100%',
            height: '250px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/static/${image}`}
            width={200}
            height={200}
            alt="logo"
          />
        </div>
        <Text height={90}>{name}</Text>
        <Text marginBottom={0} fontWeight="bold">
          ${price}
        </Text>
        <Button
          leftIcon={<FiShoppingCart></FiShoppingCart>}
          mt="10px"
          width="100%"
          colorScheme="blue"
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
