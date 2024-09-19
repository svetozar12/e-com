import { Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Product } from '../../../utils/sdk/resources/product';
import styles from './CartInfo.module.css';

interface ICartInfo {
  products: Product[];
}

const CartInfo = ({ products }: ICartInfo) => {
  let totalPrice = 0;
  products.forEach(({ price }) => (totalPrice += price));

  return (
    <div style={{ width: '40%' }}>
      <div className={styles.container}>
        <Heading size="lg">Order Information</Heading>
        <Text>All products: {totalPrice}$</Text>
        <Heading size="lg">Total: {totalPrice}$</Heading>
      </div>
    </div>
  );
};

export default CartInfo;
