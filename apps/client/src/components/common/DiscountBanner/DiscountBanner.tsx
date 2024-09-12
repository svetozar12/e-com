import { Container, Heading } from '@chakra-ui/react';
import React from 'react';
import styles from './DiscountBanner.module.css';

interface IDiscountBanner {
  title: string;
  timeLeft: string;
  image: JSX.Element;
}

const DiscountBanner = ({ image, timeLeft, title }: IDiscountBanner) => {
  return (
    <div className={styles.container}>
      <div>
        <Heading size="3xl" color="#FE5000">
          {title}
        </Heading>
        <Heading size="lg" as="p">
          {timeLeft}
        </Heading>
      </div>
      {image}
    </div>
  );
};

export default DiscountBanner;
