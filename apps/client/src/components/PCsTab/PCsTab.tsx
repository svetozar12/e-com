import React, { useEffect, useState } from 'react';
import DiscountBanner from '../common/DiscountBanner/DiscountBanner';
import Image from 'next/image';
import styles from './PCsTab.module.css';
import ProductsTable from '../common/ProducsTable/ProducsTable';
import { Button } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import {
  ProductResponse,
  QueryProductsArgs,
  useProductsQuery,
} from '../../graphql/generated';

const PCsTab = () => {
  const {
    data: res,
    error,
    refetch,
  } = useProductsQuery({
    onCompleted({ products: { next } }) {
      setIsLoadMore(next.page !== 0);
    },
  });
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    refetch({ pagination: { limit: 8, page } });
  }, [page]);
  if (error || !res) return;

  const {
    products: { data },
  } = res;
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
