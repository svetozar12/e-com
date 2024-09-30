import { Divider, Heading } from '@chakra-ui/react';
import React from 'react';
import styles from './PopularInPCs.module.css';
import ProductCard from '../../../common/ProductCard/ProductCard';
import { useProductsQuery } from '../../../../graphql/generated';
import EmptyState from '../../../common/EmptyState';

const PopularInPCs = () => {
  const { data: res } = useProductsQuery({
    variables: { pagination: { limit: 10, page: 1, sortBy: 'name' } },
  });

  if (!res) return <EmptyState />;
  const {
    products: { data },
  } = res;

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
          <ProductCard key={product.name + product.price} {...product} />
        ))}
      </div>
    </div>
  );
};

export default PopularInPCs;
