import React from 'react';
import Logo from './subcomponents/Logo/Logo';
import styles from './Navbar.module.css';
import ShopTabs from './subcomponents/ShopTabs/ShopTabs';
import { Button } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Logo />
      <ShopTabs />
      <div className={`${styles.rightSide}`}>
        <Button
          onClick={() => router.push('/login')}
          colorScheme="blue"
          variant="outline"
        >
          Login
        </Button>
        <FiShoppingCart size="40px" />
      </div>
    </div>
  );
};

export default Navbar;
