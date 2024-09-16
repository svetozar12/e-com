import { Card, CardBody, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './ProductCard.module.css';

interface IProductCard {
  title: string;
  price: number;
  image: string;
}

const ProductCard = ({ price, title, image }: IProductCard) => {
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
        <Text>{title}</Text>
        <Text marginBottom={0} fontWeight="bold">
          ${price}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
