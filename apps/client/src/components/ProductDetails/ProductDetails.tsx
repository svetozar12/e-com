import React from 'react';
import { toast } from 'react-toastify';
import { Product, QueryProductByIdArgs } from '../../graphql/generated';
import { useQuery } from '@apollo/client';
import { productByIdQuery } from '../../graphql/queries/products';

const ProductDetails = () => {
  const { data } = useQuery<Product, QueryProductByIdArgs>(productByIdQuery, {
    onError(error) {
      toast.error(`${error.message}`);
    },
  });

  return <div>{JSON.stringify(data)}</div>;
};

export default ProductDetails;
