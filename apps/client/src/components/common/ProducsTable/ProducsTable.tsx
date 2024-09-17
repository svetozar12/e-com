import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsTable.module.css';
import ProductsTableHeader from './subcomponents/ProductsTableHeader';

export type Pagination = { page: number; limit: number; total: number };
export type Data = { image: string; name: string; price: number };
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
        {dataSource.map(({ image, price, name }) => (
          <ProductCard
            title={name}
            price={price}
            image={image}
            key={image + price + name}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsTable;
