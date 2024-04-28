'use client';
import React from 'react';
import useSession from '../../hooks/useSession';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { session } = useSession();
  const pathname = usePathname();
  if (pathname === '/login') return null;
  return <div>Navbar</div>;
};

export default Navbar;
