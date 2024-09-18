import React, { useEffect, useState } from 'react';
import DiscountBanner from '../common/DiscountBanner/DiscountBanner';
import Image from 'next/image';
import styles from './PCsTab.module.css';
import ProductsTable from '../common/ProducsTable/ProducsTable';
import { Button } from '@chakra-ui/react';
import { sdk } from '../../utils/sdk';

const PCsTab = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const fetch = async () => {
    const res = await sdk.product().getProducts({ limit: 8, page });
    setData((prev) => [...(prev as any), ...(res?.data.data as any)] as any);
    setIsLoadMore(res?.data.next.page !== 0);
    console.log(res?.data.next.page);
  };

  useEffect(() => {
    fetch();
  }, [page]);

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
      ></ProductsTable>
      <Button
        marginTop={10}
        isDisabled={!isLoadMore}
        onClick={() => setPage(page + 1)}
      >
        Explore more
      </Button>
    </div>
  );
};

export default PCsTab;
