import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import css from './Logo.module.css';
import cx from 'classnames';

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      className={cx(css.container, 'hover-effect')}
      onClick={() => router.push('/')}
      src="/images/ecom-logo.png"
      alt="logo"
      width={100}
      height={100}
    />
  );
};

export default Logo;
