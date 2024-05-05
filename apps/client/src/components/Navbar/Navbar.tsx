'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Profile from './subComponents/Profile/Profile';
import Cart from './subComponents/Cart/Cart';
import css from './Navbar.module.css';
import Search from './subComponents/Search/Search';
import Logo from './subComponents/Logo/Logo';

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === '/login') return null;
  return (
    <div className={css.container}>
      <Logo />
      <Search />
      <Profile />
      <Cart />
    </div>
  );
};

export default Navbar;
