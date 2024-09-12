import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsTable.module.css';

// ADD SORTING
// FIX STYLE BUGS
interface IProductsTable {
  dataSource: Array<{ image: string; title: string; price: number }>;
  pagination: { page: number; limit: number; total: number };
}

const ProductsTable = (
  { dataSource, pagination: { page, limit, total } }: IProductsTable = {
    dataSource: [],
    pagination: { page: 1, limit: 16, total: 10 },
  }
) => {
  const calcTotal = limit * page > total ? total : limit * page;
  return (
    <div>
      Showing {page} - {calcTotal} out of {total}
      <div className={styles.container}>
        {dataSource.map(({ image, price, title }) => (
          // TODO Use image when supported by backend
          <ProductCard
            title={title}
            price={price}
            key={image + price + title}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsTable;
