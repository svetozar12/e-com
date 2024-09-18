import { Divider, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from './NewTech.module.css';
import ProductCard from '../../../common/ProductCard/ProductCard';
import { sdk } from '../../../../utils/sdk';
import { Data } from '../../../common/ProducsTable/ProducsTable';

const NewTech = () => {
  const [data, setData] = useState<Data[]>([]);

  const fetch = async () => {
    const res = await sdk
      .product()
      .getProducts({ limit: 8, page: 1, sortBy: 'createdAt' });
    setData(res?.data.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <Heading>NEW TECH</Heading>
      <Divider
        width="25%"
        opacity={1}
        borderBottomWidth={4}
        color="black"
        borderColor="black"
        marginBottom={10}
      />
      <div className={styles.newTech}>
        {data?.map((product) => (
          <ProductCard key={product.name + product.price} {...product} />
        ))}
      </div>
    </div>
  );
};

export default NewTech;
