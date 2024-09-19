import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsTable.module.css';
import ProductsTableHeader from './subcomponents/ProductsTableHeader';
import { Product } from '../../../utils/sdk/resources/product';

export type Pagination = { page: number; limit: number; total: number };
// ADD SORTING
// FIX STYLE BUGS
export interface IProductsTable {
  dataSource: Array<Product>;
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
        {dataSource.map((product) => (
          <ProductCard
            {...product}
            key={product.image + product.price + product.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsTable;
