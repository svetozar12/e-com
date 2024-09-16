import React from 'react';
import styles from './ExclusiveTech.module.css';
import Image from 'next/image';
import { Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const ExclusiveTech = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>
        <Heading size="2xl">
          Exclusive <br /> Offers For You
        </Heading>
        <Heading size="md">Only best offers for you</Heading>
        <Button
          onClick={() =>
            router.push(
              { pathname: router.pathname, query: { tab: 'PCs' } },
              undefined,
              { shallow: true }
            )
          }
          colorScheme="orange"
          color="white"
          paddingX={5}
          paddingY={10}
          marginTop={10}
          className={styles.button}
        >
          <Heading size="lg">Check now</Heading>
        </Button>
      </div>
      <Image src="/images/whitePc.png" alt="logo" width={400} height={400} />
    </div>
  );
};

export default ExclusiveTech;
