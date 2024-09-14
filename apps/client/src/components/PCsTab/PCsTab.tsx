import React, { useEffect, useState } from 'react';
import DiscountBanner from '../common/DiscountBanner/DiscountBanner';
import Image from 'next/image';
import styles from './PCsTab.module.css';
import ProductsTable from '../common/ProducsTable/ProducsTable';
import { Button } from '@chakra-ui/react';

const PCsTab = () => {
  const [data, setData] = useState([]);
  function fetch() {
    const dataSource = [] as any;
    for (let i = 10; i > 0; i--) {
      dataSource.push({
        image: '', // Placeholder for the image
        price: 120, // Fixed price for each item
        title: 'test' + i, // Placeholder title
      });
    }
    console.log(dataSource);
    setData((prev) => [...prev, ...dataSource]);
  }
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <DiscountBanner
        image={
          <Image
            src="/images/logo.png"
            alt="logo"
            width={200}
            height={200}
          ></Image>
        }
        timeLeft={new Date().toDateString()}
        title="PCs DISCOUNT 80% OFF"
      />
      <ProductsTable
        dataSource={data}
        pagination={{ page: 1, limit: 16, total: data.length }}
        sort
      ></ProductsTable>
      <Button onClick={fetch}>Explore more</Button>
    </div>
  );
};

export default PCsTab;
