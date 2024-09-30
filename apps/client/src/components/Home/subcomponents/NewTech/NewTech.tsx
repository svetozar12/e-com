import { Divider, Heading } from '@chakra-ui/react';
import React from 'react';
import styles from './NewTech.module.css';
import ProductCard from '../../../common/ProductCard/ProductCard';
import { useProductsQuery } from '../../../../graphql/generated';
import EmptyState from '../../../common/EmptyState';

const NewTech = () => {
  const { data: res } = useProductsQuery({
    variables: { pagination: { limit: 8, page: 1, sortBy: 'createdAt' } },
  });
  if (!res) return <EmptyState />;
  const {
    products: { data },
  } = res;
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
        {data.map((product) => (
          <ProductCard key={product.name + product.price} {...product} />
        ))}
      </div>
    </div>
  );
};

export default NewTech;
