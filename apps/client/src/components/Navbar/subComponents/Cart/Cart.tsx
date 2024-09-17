import { Container } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { sdk } from '../../../../utils/sdk';

const Cart = () => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['cartItems'],
    queryFn: sdk.cart().getCart,
  });

  return (
    <Container
      cursor="pointer"
      centerContent
      display="flex"
      flexDir="row"
      gap={2}
      onClick={() => router.push('/cart')}
    >
      {JSON.stringify(data?.[0]?.data.cart.products.length, null, 2)}
      <FiShoppingCart className="hover-effect" size="40px" />
    </Container>
  );
};

export default Cart;
