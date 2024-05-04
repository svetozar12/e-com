'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Profile from './subComponents/Profile/Profile';
import Cart from './subComponents/Cart/Cart';
import Image from 'next/image';
import css from './Navbar.module.css';
import Search from './subComponents/Search/Search';

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === '/login') return null;
  return (
    <div className={css.container}>
      <Image src="/images/ecom-logo.png" alt="logo" width={100} height={100} />
      <Search />
      <Profile />
      <Cart />
    </div>
  );
};

export default Navbar;
