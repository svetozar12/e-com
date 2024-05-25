import React from 'react';
import { sdk } from '@e-com/sdk';

interface ICategory {
  categoryId: string;
}

const Category = async ({ categoryId }: ICategory) => {
  const [res, err] = await sdk.product().getProductList({
    categoryId,
    page: 1,
    limit: 10,
  });
  return <div>{JSON.stringify(res, null, 2)}</div>;
};

export default Category;
