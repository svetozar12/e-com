import { Divider, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from './NewTech.module.css';
import ProductCard from '../../../common/ProductCard/ProductCard';
import { sdk } from '../../../../utils/sdk';

const NewTech = () => {
  const [data, setData] = useState([]);

  const fetch = async () => {
    const [res, err] = await sdk
      .product()
      .getProducts({ limit: 8, page: 1, sortBy: 'createdAt' });
    console.log(res, err);
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
        {data?.map(({ name, price, image }) => (
          <ProductCard
            key={name + price}
            price={price}
            title={name}
            image={image}
          />
        ))}
      </div>
    </div>
  );
};

export default NewTech;
