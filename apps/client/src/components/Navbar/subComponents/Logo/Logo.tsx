import Image from 'next/image';
import React from 'react';
import styles from './Logo.module.css';
import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Logo = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.push('/')} className={styles.container}>
      <Image src="/images/logo.png" alt="logo" width={50} height={50}></Image>
      <Heading className={styles.heading}>SNAPPER</Heading>
    </div>
  );
};

export default Logo;
