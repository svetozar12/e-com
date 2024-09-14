import React from 'react';
import { IProductsTable } from '../ProducsTable';
import style from './ProductsTableHeader.module.css';

type IProductsTableHeader = IProductsTable;

const ProductsTableHeader = ({
  pagination: { limit, page, total },
}: IProductsTableHeader) => {
  const calcTotal = limit * page > total ? total : limit * page;

  return (
    <div className={style.container}>
      <>
        Showing {page} - {calcTotal} out of {total}
      </>
    </div>
  );
};

export default ProductsTableHeader;
