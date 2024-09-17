import { Button, Card, CardBody, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './ProductCard.module.css';
import { FiShoppingCart } from 'react-icons/fi';
import { sdk } from '../../../utils/sdk';
import { useQueryClient } from '@tanstack/react-query';

interface IProductCard {
  name: string;
  price: number;
  image: string;
  _id: string;
}

const ProductCard = (product: IProductCard) => {
  const { price, name, image } = product;
  const router = useRouter();
  const queryClient = useQueryClient();
  function handleOnClick(title: string) {
    router.push('/' + title);
  }

  async function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    localStorage.setItem('cartItems', JSON.stringify([product]));
    await sdk.cart().updateCart({ products: [product._id] });
    await queryClient.refetchQueries({ queryKey: ['cartItems'] });
  }

  return (
    <Card
      className={styles.container}
      onClick={() => handleOnClick(name)}
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
            src={`http://localhost:4001/static/${image}`}
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
