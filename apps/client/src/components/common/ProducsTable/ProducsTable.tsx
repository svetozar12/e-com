import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsTable.module.css';
import ProductsTableHeader from './subcomponents/ProductsTableHeader';

export type Pagination = { page: number; limit: number; total: number };
export type Data = { image: string; title: string; price: number };
// ADD SORTING
// FIX STYLE BUGS
export interface IProductsTable {
  dataSource: Array<Data>;
  pagination: Pagination;
}

const ProductsTable = (
  { dataSource, pagination }: IProductsTable = {
    dataSource: [],
    pagination: { page: 1, limit: 16, total: 10 },
  }
) => {
  return (
    <div>
      <ProductsTableHeader pagination={pagination} dataSource={dataSource} />
      <div className={styles.container}>
        {dataSource.map(({ image, price, title }) => (
          // TODO Use image when supported by backend
          <ProductCard
            title={title}
            price={price}
            image={image}
            key={image + price + title}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsTable;
