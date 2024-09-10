import { Divider, Heading } from '@chakra-ui/react';
import React from 'react';
import styles from './PopularInPCs.module.css';
import ProductCard from '../../../common/ProductCard/ProductCard';

const PopularInPCs = () => {
  // replace with BE data
  const data = [
    { name: 'Pc', price: 12 },
    { name: 'Pc', price: 12 },
    { name: 'Pc', price: 12 },
    { name: 'Pc', price: 12 },
  ];
  return (
    <div className={styles.container}>
      <Heading>POPULAR IN PCs</Heading>
      <Divider
        width="25%"
        opacity={1}
        borderBottomWidth={4}
        color="black"
        borderColor="black"
        marginBottom={10}
      />
      <div className={styles.popularInPCs}>
        {data.map(({ name, price }) => (
          <ProductCard key={name + price} price={price} title={name} />
        ))}
      </div>
    </div>
  );
};

export default PopularInPCs;
