'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Input from '../common/Inputs/Input';
import Profile from './subComponents/Profile/Profile';
import Cart from './subComponents/Cart/Cart';
import Image from 'next/image';
import css from './Navbar.module.css';
import Dropdown from '../common/Dropdown/Dropdown';

const Navbar = () => {
  const pathname = usePathname();
  if (pathname === '/login') return null;
  return (
    <div className={css.container}>
      <Image src="/images/ecom-logo.png" alt="logo" width={100} height={100} />
      <Input
        className={css.search}
        type="search"
        placeholder="what are you searching for today ?"
      />
      <Dropdown label="Click me!">
        <a href="#">Action 1</a>
        <a href="#">Action 2</a>
        <a href="#">Action 3</a>
      </Dropdown>
      <Profile />
      <Cart />
    </div>
  );
};

export default Navbar;
