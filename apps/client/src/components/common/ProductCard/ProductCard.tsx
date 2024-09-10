import { Card, CardBody, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './ProductCard.module.css';

interface IProductCard {
  title: string;
  price: number;
}

const ProductCard = ({ price, title }: IProductCard) => {
  const router = useRouter();

  function handleOnClick(title: string) {
    router.push('/' + title);
  }

  return (
    <Card
      className={styles.container}
      onClick={() => handleOnClick(title)}
      cursor="pointer"
    >
      <CardBody>
        <Image src="/images/logo.png" alt="logo" width={250} height={250} />
        <Text>{title}</Text>
        <Text marginBottom={0} fontWeight="bold">
          ${price}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
