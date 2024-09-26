import { Divider, Heading } from '@chakra-ui/react';
import React from 'react';
import styles from './PopularInPCs.module.css';
import ProductCard from '../../../common/ProductCard/ProductCard';
import {
  ProductResponse,
  QueryProductsArgs,
} from '../../../../graphql/generated';
import { useQuery } from '@apollo/client';
import { productsQuery } from '../../../../graphql/queries/products';

const PopularInPCs = () => {
  const { data } = useQuery<ProductResponse, QueryProductsArgs>(productsQuery, {
    variables: { pagination: { limit: 10, page: 1, sortBy: 'name' } },
  });

  // TODO MAKE COMPONENT FOR NO DATA STATE
  if (!data) return <>no data</>;
  const { data: products } = data;

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
        {products.map((product) => (
          <ProductCard key={product.name + product.price} {...product} />
        ))}
      </div>
    </div>
  );
};

export default PopularInPCs;
