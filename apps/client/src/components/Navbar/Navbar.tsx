import React from 'react';
import Logo from './subcomponents/Logo/Logo';
import styles from './Navbar.module.css';
import ShopTabs from './subcomponents/ShopTabs/ShopTabs';
import { usePathname } from 'next/navigation';
import ProfileAvatar from './subcomponents/ProfileAvatar/ProfileAvatar';
import Cart from './subcomponents/Cart/Cart';

const Navbar = () => {
  const pathname = usePathname();
  if (pathname.includes('/login')) return null;
  return (
    <div className={styles.container}>
      <Logo />
      <ShopTabs />
      <div className={`${styles.rightSide}`}>
        <ProfileAvatar />
        <Cart />
      </div>
    </div>
  );
};

export default Navbar;
