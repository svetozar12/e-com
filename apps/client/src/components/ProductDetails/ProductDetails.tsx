import React from 'react';
import { toast } from 'react-toastify';
import { sdk } from '../../utils/sdk';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const ProductDetails = () => {
  const router = useRouter();
  const { data, error } = useQuery({
    queryKey: ['product', router.query.id],
    queryFn: () =>
      sdk.product().getProductById({ id: String(router.query.id) }),
  });

  if (error) {
    toast.error(`${error.message}`);
  }

  if (!data) {
    return <>no data</>;
  }
  return <div>{JSON.stringify(data)}</div>;
};

export default ProductDetails;
