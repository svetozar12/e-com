import React from 'react';
import styles from './SubscribeToOffers.module.css';
import Image from 'next/image';
import {
  Text,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';

const SubscribeToOffers = () => {
  function handleClick() {
    console.log('SUBSCRIBE');
  }

  return (
    <div className={styles.container}>
      <Heading>Get Exclusive Offers On Your Email</Heading>
      <Text>Subscribe to our newsletter and stay updated</Text>
      <InputGroup>
        <Input
          height="60px"
          borderRadius="50px"
          placeholder="Your Email Address..."
          size="md"
          type="email"
        />
        <InputRightElement width="140px" height="60px">
          <Button
            borderRadius={50}
            colorScheme="yellow"
            color="white"
            h="60px"
            size="lg"
            onClick={handleClick}
          >
            SUBSCRIBE
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};

export default SubscribeToOffers;
