import Image from 'next/image';
import React from 'react';
import styles from './NewCollection.module.css';
import { Button, Heading } from '@chakra-ui/react';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import { useRouter } from 'next/router';

const NewCollection = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div>
        <Heading size="md">Don&apos;t miss these offers</Heading>
        <Heading size="3xl">
          New 💻
          <br /> Laptops <br />
          For Everyone
        </Heading>
        <Button
          onClick={() =>
            router.push(
              { pathname: router.pathname, query: { tab: 'Laptops' } },
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
          rightIcon={<MdOutlineArrowRightAlt size="50px" />}
        >
          <Heading size="lg">Latest Laptops</Heading>
        </Button>
      </div>
      <Image
        src="/images/macbook.png"
        alt="logo"
        width={600}
        height={375}
      ></Image>
    </div>
  );
};

export default NewCollection;
