import Image from 'next/image';
import React from 'react';
import styles from './NewCollection.module.css';
import { Button, Heading } from '@chakra-ui/react';
import { MdOutlineArrowRightAlt } from 'react-icons/md';

const NewCollection = () => {
  return (
    <div className={styles.container}>
      <div>
        <Heading size="lg">Don&apos;t miss these offers</Heading>
        <Heading size="3xl">
          new 💻
          <br /> computers <br />
          for everyone
        </Heading>
        <Button
          colorScheme="yellow"
          color="white"
          paddingX={5}
          paddingY={10}
          marginTop={10}
          className={styles.button}
          rightIcon={<MdOutlineArrowRightAlt size="50px" />}
        >
          <Heading size="lg">Latest tech</Heading>
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
