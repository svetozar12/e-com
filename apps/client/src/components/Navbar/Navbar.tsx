'use client';
import React from 'react';
import useSession from '../../hooks/useSession';
import { usePathname } from 'next/navigation';
import Input from '../common/Inputs/Input';
import { getEmailInitials } from '../../utils/getInitials';

const Navbar = () => {
  const { session } = useSession();
  const pathname = usePathname();
  if (pathname === '/login') return null;
  return (
    <div style={{ background: 'var(--primary-100)', display: 'flex' }}>
      <img src="./images/ecom-logo.png" width={100} height={100}></img>
      <Input
        type="search"
        placeholder="what are you searching for today ?"
      ></Input>
      {session && getEmailInitials(session.email)}
      <p>My account</p>
      {/* Profile component */}
      {/* Cart component */}
    </div>
  );
};

export default Navbar;
