import { Divider, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from './PopularInPCs.module.css';
import ProductCard from '../../../common/ProductCard/ProductCard';
import { sdk } from '../../../../utils/sdk';

const PopularInPCs = () => {
  const [data, setData] = useState([]);

  const fetch = async () => {
    const [res, err] = await sdk
      .product()
      .getProducts({ limit: 4, page: 1 }, 'PCs');
    console.log(res, err);
    setData(res?.data.data);
  };

  useEffect(() => {
    fetch();
  }, []);

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
        {data.map((product) => (
          <ProductCard key={name + product.price} {...product} />
        ))}
      </div>
    </div>
  );
};

export default PopularInPCs;
